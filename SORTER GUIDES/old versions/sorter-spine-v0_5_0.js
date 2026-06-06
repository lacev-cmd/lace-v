// ══════════════════════════════════════════════════════════
// SORTER SPINE  v0.5.0
//
// Inert nucleus + execution engine.
//
// v0.5.0 additions over v0.4.0:
//   — execute() method: runs behaviours in PROCESSING_ORDER
//     via runtime adapter, then runs components via component
//     runtime adapter. Returns { map, responses, warnings, trace }.
//   — Runtime adapter contracts: spine accepts
//     SorterSpine.setRuntime(runtimeAdapter) and
//     SorterSpine.setComponentRuntime(componentRuntimeAdapter).
//     Adapters provide read() and respond() implementations.
//   — Execution trace: execute({ trace: true }) returns
//     step-by-step log of what each behaviour changed,
//     what confidence was set, what gaps opened or closed.
//   — Output gating: post-execution gate layer enforces
//     confidence and boundary requirements. If a component
//     returns { action: 'output' } and confidence is below
//     the deployment minimum, the spine reroutes automatically.
//   — Cartridge serialisation: exportCartridge() and
//     SorterSpine.load(cartridgeJSON) for portable assembly.
//   — Formalised runtime interfaces exposed on contracts:
//     contracts.behaviourInterface and contracts.componentInterface.
//
// Config files (behaviours, guides, components) remain pure
// config. Runtime logic lives in separate adapter files:
//   sorter-runtime-v0_1_0.js           — behaviour read() impls
//   sorter-runtime-components-v0_1_0.js — component respond() impls
//
// The spine calls the adapters. It does not know their internals.
// Different runtime implementations can be swapped without
// changing config files or the spine.
// ══════════════════════════════════════════════════════════

const SorterSpine = (() => {

  // ── Internal registry ─────────────────────────────────────

  let _behaviours       = {};
  let _guides           = {};
  let _components       = {};
  let _input            = null;
  let _state            = {};
  let _runtime          = null;   // Behaviour runtime adapter
  let _componentRuntime = null;   // Component runtime adapter


  // ── Attachment contracts ──────────────────────────────────

  const BEHAVIOUR_REQUIRED  = ['id', 'version', 'purpose', 'coreRule', 'boundary'];
  const GUIDE_REQUIRED      = ['id', 'version', 'type', 'purpose', 'sector', 'steer'];
  const COMPONENT_REQUIRED  = ['id', 'version', 'tags', 'purpose', 'coreRule', 'boundary'];
  const INPUT_REQUIRED      = ['baseline', 'entries'];

  // Runtime interface contracts — what adapters must provide
  const BEHAVIOUR_INTERFACE  = ['read'];    // read(input, accumulatedMap, composedConfig) → updatedMap
  const COMPONENT_INTERFACE  = ['respond']; // respond(finalMap, componentConfig) → { action, payload, warnings }


  // ── Validation ────────────────────────────────────────────

  function _validateBehaviour(b) {
    const missing = BEHAVIOUR_REQUIRED.filter(k => !b[k]);
    if (missing.length)
      throw new Error(`Behaviour "${b.id || '?'}" missing required fields: ${missing.join(', ')}`);
    return true;
  }

  function _validateGuide(g) {
    const missing = GUIDE_REQUIRED.filter(k => !(k in g));
    if (missing.length)
      throw new Error(`Guide "${g.id || '?'}" missing required fields: ${missing.join(', ')}`);
    if (!['sector', 'subsector', 'output'].includes(g.type))
      throw new Error(`Guide "${g.id}" type must be 'sector', 'subsector', or 'output'.`);
    if (g.type === 'subsector' && !g.parent)
      throw new Error(`Guide "${g.id}" is type 'subsector' but has no parent id.`);
    if (g.type === 'subsector' && !_guides[g.parent])
      throw new Error(`Guide "${g.id}" parent "${g.parent}" must be attached before the sub-guide.`);
    return true;
  }

  function _validateComponent(c) {
    const missing = COMPONENT_REQUIRED.filter(k => !(k in c));
    if (missing.length)
      throw new Error(`Adaptive Component "${c.id || '?'}" missing required fields: ${missing.join(', ')}`);
    if (!Array.isArray(c.tags) || c.tags.length === 0)
      throw new Error(`Adaptive Component "${c.id}" must have at least one tag.`);
    return true;
  }

  function _validateInput(input) {
    const missing = INPUT_REQUIRED.filter(k => !(k in input));
    if (missing.length)
      throw new Error(`Input missing required fields: ${missing.join(', ')}`);
    if (!Array.isArray(input.entries))
      throw new Error('Input entries must be an array.');
    return true;
  }

  function _validateRuntime(adapter) {
    const missing = BEHAVIOUR_INTERFACE.filter(k => typeof adapter[k] !== 'function');
    if (missing.length)
      throw new Error(`Behaviour runtime adapter missing required methods: ${missing.join(', ')}`);
    return true;
  }

  function _validateComponentRuntime(adapter) {
    const missing = COMPONENT_INTERFACE.filter(k => typeof adapter[k] !== 'function');
    if (missing.length)
      throw new Error(`Component runtime adapter missing required methods: ${missing.join(', ')}`);
    return true;
  }


  // ── Registration — Behaviours ─────────────────────────────

  function attachBehaviour(behaviour) {
    _validateBehaviour(behaviour);
    _behaviours[behaviour.id] = behaviour;
    return SorterSpine;
  }

  function detachBehaviour(id) {
    delete _behaviours[id];
    return SorterSpine;
  }


  // ── Registration — Guides ─────────────────────────────────

  function attachGuide(guide) {
    _validateGuide(guide);
    if (guide.type === 'subsector') {
      const parent = _guides[guide.parent];
      _guides[guide.id] = guide.composeFrom
        ? guide.composeFrom(parent)
        : _mergeGuide(parent, guide);
    } else {
      _guides[guide.id] = guide;
    }
    return SorterSpine;
  }

  function detachGuide(id) {
    delete _guides[id];
    return SorterSpine;
  }


  // ── Registration — Adaptive Components ───────────────────

  function attachComponent(component) {
    _validateComponent(component);
    _components[component.id] = component;
    return SorterSpine;
  }

  function detachComponent(id) {
    delete _components[id];
    return SorterSpine;
  }


  // ── Runtime Adapters ──────────────────────────────────────

  function setRuntime(adapter) {
    _validateRuntime(adapter);
    _runtime = adapter;
    return SorterSpine;
  }

  function setComponentRuntime(adapter) {
    _validateComponentRuntime(adapter);
    _componentRuntime = adapter;
    return SorterSpine;
  }


  // ── Guide merge ───────────────────────────────────────────

  const ARRAY_EXTEND_FIELDS = [
    'movementEvidence', 'notMovement', 'defaultLoadSignals',
    'notAvoidance', 'priorityGaps', 'requiredCaveats',
    'prevents', 'failureModes', 'watchPatterns', 'keyEventTypes',
    'hintTypes', 'costSignals', 'readinessSignals',
    'thinningIndicators', 'deepeningIndicators', 'honestySignals',
    'performanceSignals', 'constraintTypes', 'competitionTypes',
    'changeTypes', 'confidenceTiers', 'enables',
  ];

  function _mergeSteer(parent, child) {
    const merged = Object.assign({}, parent, child);
    ARRAY_EXTEND_FIELDS.forEach(field => {
      if (Array.isArray(parent[field]) && Array.isArray(child[field])) {
        merged[field] = [...parent[field], ...child[field]];
      }
    });
    return merged;
  }

  function _mergeGuide(parent, child) {
    const merged = Object.assign({}, child);
    merged.steer = {};
    const allKeys = new Set([
      ...Object.keys(parent.steer || {}),
      ...Object.keys(child.steer  || {}),
    ]);
    allKeys.forEach(behaviourId => {
      const p = parent.steer[behaviourId] || {};
      const c = child.steer[behaviourId]  || {};
      merged.steer[behaviourId] = _mergeSteer(p, c);
    });
    return merged;
  }


  // ── Input ─────────────────────────────────────────────────

  function setInput(input) {
    _validateInput(input);
    _input = {
      baseline:    input.baseline    || '',
      entries:     input.entries     || [],
      corrections: input.corrections || [],
      connections: input.connections || [],
      meta:        input.meta        || {},
    };
    return SorterSpine;
  }


  // ── Composition ───────────────────────────────────────────

  function _compose() {
    const composed = {};
    const sectorGuides    = Object.values(_guides).filter(g => g.type === 'sector');
    const subsectorGuides = Object.values(_guides).filter(g => g.type === 'subsector');
    const outputGuides    = Object.values(_guides).filter(g => g.type === 'output');

    Object.values(_behaviours).forEach(behaviour => {
      const effective = Object.assign({}, behaviour);
      [sectorGuides, subsectorGuides, outputGuides].forEach(layer => {
        layer.forEach(guide => {
          const steer = guide.steer[behaviour.id];
          if (steer) {
            Object.keys(steer).forEach(field => {
              if (
                ARRAY_EXTEND_FIELDS.includes(field) &&
                Array.isArray(effective[field]) &&
                Array.isArray(steer[field])
              ) {
                effective[field] = [...effective[field], ...steer[field]];
              } else {
                effective[field] = steer[field];
              }
            });
          }
        });
      });
      composed[behaviour.id] = effective;
    });

    return composed;
  }


  // ── Component order resolution ────────────────────────────
  // Respects component.priority (lower = earlier) and
  // component.runAfter (array of component ids).
  // Falls back to attachment order if neither is declared.

  function _resolveComponentOrder() {
    const components = Object.values(_components);

    // Topological sort by runAfter dependencies
    const resolved = [];
    const visited  = new Set();

    function visit(component) {
      if (visited.has(component.id)) return;
      visited.add(component.id);
      if (Array.isArray(component.runAfter)) {
        component.runAfter.forEach(depId => {
          if (_components[depId]) visit(_components[depId]);
        });
      }
      resolved.push(component);
    }

    // Sort by priority first, then resolve dependencies
    const sorted = [...components].sort((a, b) =>
      (a.priority || 50) - (b.priority || 50)
    );
    sorted.forEach(visit);

    return resolved;
  }


  // ── Component dependency check ────────────────────────────

  function _checkComponentDependencies() {
    const warnings = [];
    Object.values(_components).forEach(component => {
      if (Array.isArray(component.behaviourInputs)) {
        component.behaviourInputs.forEach(depId => {
          if (!_behaviours[depId])
            warnings.push(`Component "${component.id}" declares behaviour dependency "${depId}" — not attached.`);
        });
      }
      if (Array.isArray(component.componentInputs)) {
        component.componentInputs.forEach(depId => {
          if (!_components[depId])
            warnings.push(`Component "${component.id}" declares component dependency "${depId}" — not attached.`);
        });
      }
    });
    return warnings;
  }


  // ── Processing Order ──────────────────────────────────────

  const PROCESSING_ORDER = [
    'correction-as-governance',
    'baseline-vs-live-material',
    'open-gap-discipline',
    'independent-signal-counting',
    'external-constraint-reading',
    'movement-non-movement-reading',
    'avoidance-detection',
    'load-sensitive-capability',
    'contradiction-holding',
    'competing-priorities',
    'connections-across-time',
    'state-change-detection',
    'confidence-calibration',
    'next-useful-move',
    'private-record-to-optional-handover',
    'meta-reading',
  ];


  // ── Output gate ───────────────────────────────────────────
  //
  // Enforces minimum confidence requirements after component
  // execution. If a component returns { action: 'output' }
  // but confidence is below the deployment minimum, the spine
  // reroutes to the configured fallback action.
  //
  // minConfidenceLevel: 'not_readable' | 'inferred' | 'thin' |
  //                     'partial' | 'supported' | 'strong'

  const CONFIDENCE_RANK = {
    'not_readable': 0,
    'inferred':     1,
    'thin':         2,
    'partial':      3,
    'supported':    4,
    'strong':       5,
  };

  function _applyOutputGate(responses, map, gateConfig) {
    if (!gateConfig) return responses;

    const minRank   = CONFIDENCE_RANK[gateConfig.minConfidenceLevel] ?? 0;
    const mapRank   = CONFIDENCE_RANK[map.confidence?.overall] ?? 0;
    const fallback  = gateConfig.fallbackAction || 'hold';

    return responses.map(response => {
      if (response.action === 'output' && mapRank < minRank) {
        return {
          ...response,
          action:       fallback,
          gateTriggered: true,
          gateReason:   `Confidence "${map.confidence?.overall || 'unknown'}" below minimum "${gateConfig.minConfidenceLevel}". Rerouted to "${fallback}".`,
        };
      }
      return response;
    });
  }


  // ── Execute ───────────────────────────────────────────────
  //
  // Runs the full stack:
  //   1. Compose effective configs
  //   2. Run behaviours in PROCESSING_ORDER via runtime adapter
  //   3. Run components in resolved order via component runtime
  //   4. Apply output gate
  //   5. Return { map, responses, warnings, trace? }
  //
  // Options:
  //   trace: true          — include step-by-step execution log
  //   gateConfig: { minConfidenceLevel, fallbackAction }
  //   componentOrder: []   — explicit component execution order (overrides auto)

  function execute(options = {}) {
    if (!_input)
      throw new Error('No input set. Call SorterSpine.setInput() before execute().');
    if (!_runtime)
      throw new Error('No runtime set. Call SorterSpine.setRuntime() before execute().');

    const traceEnabled = options.trace === true;
    const gateConfig   = options.gateConfig || null;
    const trace        = [];
    const warnings     = _checkComponentDependencies();

    // Step 1 — Compose
    const composed = _compose();

    // Step 2 — Run behaviours in processing order
    let map = {
      confidence:  { overall: 'not_readable', byBehaviour: {} },
      gaps:        [],
      signals:     {},
      movement:    {},
      avoidance:   {},
      constraints: {},
      contradictions: [],
      competingPriorities: [],
      connections: [],
      stateChanges: [],
      nextMove:    null,
      handover:    null,
      metaReading: null,
      corrections: _input.corrections || [],
    };

    const behaviourOrder = options.behaviourOrder || PROCESSING_ORDER;

    for (const behaviourId of behaviourOrder) {
      const behaviourConfig = composed[behaviourId];
      if (!behaviourConfig) continue;

      const before = traceEnabled ? JSON.parse(JSON.stringify(map)) : null;

      try {
        map = _runtime.read(_input, map, behaviourConfig);
      } catch (err) {
        warnings.push(`Behaviour "${behaviourId}" threw during read(): ${err.message}`);
        if (traceEnabled) {
          trace.push({
            step:        behaviourId,
            status:      'error',
            error:       err.message,
            mapSnapshot: null,
          });
        }
        continue;
      }

      if (traceEnabled) {
        trace.push({
          step:        behaviourId,
          status:      'ok',
          changes:     _diffMap(before, map),
          mapSnapshot: JSON.parse(JSON.stringify(map)),
        });
      }
    }

    // Step 3 — Run components
    const responses      = [];
    const componentOrder = options.componentOrder
      ? options.componentOrder.map(id => _components[id]).filter(Boolean)
      : _resolveComponentOrder();

    if (_componentRuntime) {
      for (const component of componentOrder) {
        const before = traceEnabled ? JSON.parse(JSON.stringify(map)) : null;

        let response;
        try {
          response = _componentRuntime.respond(map, component);
        } catch (err) {
          warnings.push(`Component "${component.id}" threw during respond(): ${err.message}`);
          if (traceEnabled) {
            trace.push({
              step:   `component:${component.id}`,
              status: 'error',
              error:  err.message,
            });
          }
          continue;
        }

        responses.push({ componentId: component.id, ...response });

        // Components may update the map (e.g. trust drift, faction memory)
        if (response.mapUpdate) {
          map = { ...map, ...response.mapUpdate };
        }

        if (traceEnabled) {
          trace.push({
            step:     `component:${component.id}`,
            status:   'ok',
            response: response,
            changes:  before ? _diffMap(before, map) : null,
          });
        }
      }
    }

    // Step 4 — Apply output gate
    const gatedResponses = _applyOutputGate(responses, map, gateConfig);

    // Step 5 — Return result
    const result = {
      map,
      responses: gatedResponses,
      warnings,
    };

    if (traceEnabled) result.trace = trace;

    _state = {
      ...result,
      composed,
      input:           _input,
      behaviourIds:    Object.keys(_behaviours),
      guideIds:        Object.keys(_guides),
      componentIds:    Object.keys(_components),
      processingOrder: PROCESSING_ORDER,
      meta:            _input.meta,
    };

    return result;
  }


  // ── Map diff (for trace) ──────────────────────────────────
  // Produces a shallow diff of top-level map keys for trace output.

  function _diffMap(before, after) {
    if (!before) return null;
    const changes = {};
    Object.keys(after).forEach(key => {
      const bVal = JSON.stringify(before[key]);
      const aVal = JSON.stringify(after[key]);
      if (bVal !== aVal) changes[key] = { before: before[key], after: after[key] };
    });
    return Object.keys(changes).length ? changes : null;
  }


  // ── run() — compose only, no execution ───────────────────
  // Preserved from v0.4.0 for backwards compatibility.
  // Returns composed state without running behaviours.

  function run() {
    if (!_input)
      throw new Error('No input set. Call SorterSpine.setInput() before run().');

    const dependencyWarnings = _checkComponentDependencies();

    _state = {
      composed:            _compose(),
      input:               _input,
      behaviourIds:        Object.keys(_behaviours),
      guideIds:            Object.keys(_guides),
      componentIds:        Object.keys(_components),
      processingOrder:     PROCESSING_ORDER,
      dependencyWarnings:  dependencyWarnings,
      meta:                _input.meta,
    };

    if (dependencyWarnings.length) {
      console.warn('SorterSpine dependency warnings:', dependencyWarnings);
    }

    return _state;
  }


  // ── Cartridge serialisation ───────────────────────────────

  function exportCartridge() {
    return JSON.stringify({
      version:    '0.5.0',
      exportedAt: new Date().toISOString(),
      behaviours: Object.values(_behaviours).map(b => ({
        id: b.id, version: b.version, purpose: b.purpose,
        coreRule: b.coreRule, boundary: b.boundary,
        // Config fields — runtime read() not serialised
      })),
      guides: Object.values(_guides).map(g => ({
        id: g.id, version: g.version, type: g.type,
        sector: g.sector, purpose: g.purpose,
        parent: g.parent || null, steer: g.steer,
      })),
      components: Object.values(_components).map(c => ({
        id: c.id, version: c.version, tags: c.tags,
        purpose: c.purpose, coreRule: c.coreRule,
        boundary: c.boundary,
        behaviourInputs: c.behaviourInputs || [],
        componentInputs: c.componentInputs || [],
        priority: c.priority || 50,
        runAfter: c.runAfter || [],
      })),
    }, null, 2);
  }

  function loadCartridge(cartridgeJSON) {
    let cartridge;
    try {
      cartridge = typeof cartridgeJSON === 'string'
        ? JSON.parse(cartridgeJSON)
        : cartridgeJSON;
    } catch (e) {
      throw new Error(`loadCartridge: invalid JSON — ${e.message}`);
    }

    if (cartridge.behaviours) {
      cartridge.behaviours.forEach(b => {
        _validateBehaviour(b);
        _behaviours[b.id] = b;
      });
    }

    if (cartridge.guides) {
      // Attach sector and output guides first, then subsectors
      const sector    = cartridge.guides.filter(g => g.type === 'sector');
      const subsector = cartridge.guides.filter(g => g.type === 'subsector');
      const output    = cartridge.guides.filter(g => g.type === 'output');
      [...sector, ...output, ...subsector].forEach(g => attachGuide(g));
    }

    if (cartridge.components) {
      cartridge.components.forEach(c => {
        _validateComponent(c);
        _components[c.id] = c;
      });
    }

    return SorterSpine;
  }


  // ── Introspection ─────────────────────────────────────────

  function getBehaviour(id)  { return _behaviours[id] || null; }
  function getGuide(id)      { return _guides[id]     || null; }
  function getComponent(id)  { return _components[id] || null; }

  function listBehaviours() {
    return Object.values(_behaviours).map(b => ({
      id: b.id, version: b.version, purpose: b.purpose,
    }));
  }

  function listGuides() {
    return Object.values(_guides).map(g => ({
      id: g.id, version: g.version, type: g.type,
      sector: g.sector, purpose: g.purpose, parent: g.parent || null,
    }));
  }

  function listComponents() {
    return Object.values(_components).map(c => ({
      id: c.id, version: c.version, tags: c.tags, purpose: c.purpose,
      behaviourInputs: c.behaviourInputs || [],
      componentInputs: c.componentInputs || [],
      priority: c.priority || 50,
      runAfter: c.runAfter || [],
    }));
  }

  function describe() {
    const guides     = listGuides();
    const components = listComponents();

    const componentsByTag = {};
    components.forEach(c => {
      c.tags.forEach(tag => {
        if (!componentsByTag[tag]) componentsByTag[tag] = [];
        componentsByTag[tag].push(c);
      });
    });

    const attachedIds     = new Set(Object.keys(_behaviours));
    const orderedAttached = PROCESSING_ORDER.filter(id => attachedIds.has(id));
    const unordered       = [...attachedIds].filter(id => !PROCESSING_ORDER.includes(id));
    const warnings        = _checkComponentDependencies();

    return {
      assembly: {
        behaviourCount:   Object.keys(_behaviours).length,
        guideCount:       Object.keys(_guides).length,
        componentCount:   Object.keys(_components).length,
        hasInput:         !!_input,
        hasRuntime:       !!_runtime,
        hasComponentRuntime: !!_componentRuntime,
        inputEntries:     _input ? _input.entries.length : 0,
        inputCorrections: _input ? _input.corrections.length : 0,
      },
      behaviours: {
        inProcessingOrder: orderedAttached,
        notInOrder:        unordered,
        all:               listBehaviours(),
      },
      guides: {
        sector:    guides.filter(g => g.type === 'sector'),
        subsector: guides.filter(g => g.type === 'subsector'),
        output:    guides.filter(g => g.type === 'output'),
      },
      components: {
        all:   components,
        byTag: componentsByTag,
        order: _resolveComponentOrder().map(c => c.id),
      },
      processingOrder:    PROCESSING_ORDER,
      dependencyWarnings: warnings,
    };
  }


  // ── Reset ─────────────────────────────────────────────────

  function reset() {
    _behaviours       = {};
    _guides           = {};
    _components       = {};
    _input            = null;
    _state            = {};
    _runtime          = null;
    _componentRuntime = null;
    return SorterSpine;
  }


  // ── Public API ────────────────────────────────────────────

  return {
    // Attachment
    attachBehaviour,
    attachGuide,
    attachComponent,
    detachBehaviour,
    detachGuide,
    detachComponent,

    // Runtime adapters
    setRuntime,
    setComponentRuntime,

    // Input
    setInput,

    // Execution
    execute,
    run,          // Compose only — backwards compatible

    // Cartridge
    exportCartridge,
    loadCartridge,

    // Introspection
    getBehaviour,
    getGuide,
    getComponent,
    listBehaviours,
    listGuides,
    listComponents,
    describe,

    // Reset
    reset,

    // Contracts
    contracts: {
      behaviour:          BEHAVIOUR_REQUIRED,
      guide:              GUIDE_REQUIRED,
      component:          COMPONENT_REQUIRED,
      input:              INPUT_REQUIRED,
      processingOrder:    PROCESSING_ORDER,
      behaviourInterface: BEHAVIOUR_INTERFACE,
      componentInterface: COMPONENT_INTERFACE,
    },
  };

})();
