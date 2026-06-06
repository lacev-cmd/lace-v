// ══════════════════════════════════════════════════════════
// SORTER SPINE  v0.4.0
//
// Inert nucleus. Accepts behaviours, guides, and adaptive
// components as attachments. Has no domain knowledge.
// Has no reading logic. Becomes a model by virtue of
// what is attached to it.
//
// v0.4.0 additions over v0.3.0:
//   — Adaptive Component attachment: attachComponent(),
//     detachComponent(), listComponents(), getComponent().
//     Formal COMPONENT_REQUIRED contract defined.
//     Components are composed after guide layer and before
//     run() returns state.
//   — Processing order updated: behaviours 12–16 inserted
//     in correct sequence. External Constraint Reading
//     sits before Avoidance Detection and Load-Sensitive
//     Capability — it disambiguates won't vs can't before
//     those behaviours read non-movement.
//   — Array-safe guide composition hardened: ARRAY_EXTEND_FIELDS
//     now also covers adaptive component array fields.
//     All steer-level array merges are extend-not-overwrite.
//   — describe() now returns full assembly description:
//     behaviours, guides by type, components by tag,
//     processing order, input state, and composition summary.
//     Suitable for audit, handover, and cartridge inspection.
//   — Component dependency checking: if a component declares
//     behaviourInputs or componentInputs, the spine warns
//     on run() if declared dependencies are not attached.
//
// v0.3.0 additions over v0.2.0:
//   — Array merge fix for known array fields.
//   — Processing order contract exposed on contracts.
//
// v0.2.0 additions over v0.1.0:
//   — Guide inheritance: sub-guides compose from parent.
//   — Guide type awareness: sector | subsector | output.
//   — describe() configuration summary.
//
// Four attachment types:
//   behaviour          — a reading primitive
//   guide              — a steering layer (sector | subsector | output)
//   adaptive component — a response module (acts on mapped state)
//   input              — the material to be read
//
// The spine holds the composition.
// Behaviours, guides, and components do not know about each other.
// The spine does not know what domain it is in.
//
// Different configurations produce different models.
// ══════════════════════════════════════════════════════════

const SorterSpine = (() => {

  // ── Internal registry ─────────────────────────────────────

  let _behaviours  = {};
  let _guides      = {};
  let _components  = {};   // Adaptive components
  let _input       = null;
  let _state       = {};


  // ── Attachment contracts ──────────────────────────────────

  const BEHAVIOUR_REQUIRED  = ['id', 'version', 'purpose', 'coreRule', 'boundary'];
  const GUIDE_REQUIRED      = ['id', 'version', 'type', 'purpose', 'sector', 'steer'];
  const COMPONENT_REQUIRED  = ['id', 'version', 'tags', 'purpose', 'coreRule', 'boundary'];
  const INPUT_REQUIRED      = ['baseline', 'entries'];


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


  // ── Guide merge ───────────────────────────────────────────
  //
  // Known array fields that must be extended — not overwritten —
  // when a child guide or component steers on top of a parent.
  // Prevents silent array overwrite in stacked guide composition.

  const ARRAY_EXTEND_FIELDS = [
    'movementEvidence',
    'notMovement',
    'defaultLoadSignals',
    'notAvoidance',
    'priorityGaps',
    'requiredCaveats',
    'prevents',
    'failureModes',
    'watchPatterns',
    'keyEventTypes',
    'hintTypes',
    'costSignals',
    'readinessSignals',
    'thinningIndicators',
    'deepeningIndicators',
    'honestySignals',
    'performanceSignals',
    'constraintTypes',
    'competitionTypes',
    'changeTypes',
    'confidenceTiers',
    'enables',
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
  //
  // Builds effective config for each behaviour by layering:
  //   1. Behaviour's own defaults
  //   2. Sector guide steers       (in attachment order)
  //   3. Sub-sector guide steers   (in attachment order)
  //   4. Output guide steers       (in attachment order, last)
  //
  // Output guides apply last — they shape output register
  // without disrupting domain reading config.

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
            // Use array-safe merge for each steer layer
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


  // ── Component dependency check ────────────────────────────
  //
  // Warns if a component declares dependencies that are not
  // attached. Warns only — does not throw. Missing dependencies
  // may be intentional in partial assemblies.

  function _checkComponentDependencies() {
    const warnings = [];

    Object.values(_components).forEach(component => {

      if (Array.isArray(component.behaviourInputs)) {
        component.behaviourInputs.forEach(depId => {
          if (!_behaviours[depId]) {
            warnings.push(
              `Component "${component.id}" declares behaviour dependency "${depId}" — not attached.`
            );
          }
        });
      }

      if (Array.isArray(component.componentInputs)) {
        component.componentInputs.forEach(depId => {
          if (!_components[depId]) {
            warnings.push(
              `Component "${component.id}" declares component dependency "${depId}" — not attached.`
            );
          }
        });
      }

    });

    return warnings;
  }


  // ── Processing Order Contract ─────────────────────────────
  //
  // Engine implementations MUST follow this sequence.
  // Deviation produces silent failures.
  //
  // Key sequencing decisions:
  //
  //   — Corrections run first. Always. Corrected material must
  //     be what all downstream behaviours read.
  //
  //   — External Constraint Reading (15) runs BEFORE Avoidance
  //     Detection (04) and Load-Sensitive Capability (05).
  //     It disambiguates won't vs can't before those behaviours
  //     read non-movement. Without this, genuine blocks are
  //     misread as avoidance.
  //
  //   — Confidence Calibration (12) runs AFTER signal counting
  //     and gap detection — it needs those reads to exist before
  //     it can label their certainty.
  //
  //   — State Change Detection (13) runs AFTER baseline reading
  //     — it needs the baseline state established first.
  //
  //   — Competing Priorities (14) runs AFTER contradiction
  //     holding — contradiction must be checked before a tension
  //     is classified as a genuine competition.
  //
  //   — Meta Reading (16) runs last in the behaviour stack —
  //     it reads the person's engagement with the map as a whole,
  //     so the full map must exist first.
  //
  //   — Adaptive components run AFTER the full behaviour stack.
  //     They act on the mapped state — they do not participate
  //     in reading material.

  const PROCESSING_ORDER = [

    // ── Behaviour stack ──────────────────────────────────────

    // 1. Corrections — must run before everything else
    'correction-as-governance',

    // 2. Baseline — read corrected material against baseline
    'baseline-vs-live-material',

    // 3. Gaps — detect open gaps on corrected material
    'open-gap-discipline',

    // 4. Signals — count independent signals
    'independent-signal-counting',

    // 5. External constraints — disambiguate won't vs can't
    //    MUST precede avoidance-detection and load-sensitive-capability
    'external-constraint-reading',

    // 6. Movement — read movement / non-movement
    'movement-non-movement-reading',

    // 7. Avoidance — detect avoidance patterns
    //    Runs after external-constraint-reading
    'avoidance-detection',

    // 8. Load — read load-sensitive capability
    //    Runs after external-constraint-reading
    'load-sensitive-capability',

    // 9. Contradiction — hold contradictions
    'contradiction-holding',

    // 10. Competing priorities — genuine competition between valid demands
    //     Runs after contradiction-holding
    'competing-priorities',

    // 11. Connections — surface cross-time patterns
    'connections-across-time',

    // 12. State change — detect genuine directional shift
    //     Runs after baseline and connections
    'state-change-detection',

    // 13. Confidence — label map certainty
    //     Runs after all signal and gap reads
    'confidence-calibration',

    // 14. Next move — produce bounded next useful move
    'next-useful-move',

    // 15. Handover — structure output if requested
    'private-record-to-optional-handover',

    // 16. Meta reading — read engagement with the map
    //     Runs last — needs the full map to exist
    'meta-reading',

    // ── Adaptive component layer ─────────────────────────────
    // Components run after the full behaviour stack.
    // They act on mapped state — they do not read material.
    // Order within the component layer is deployment-defined.
    // The spine surfaces the component list — engine decides
    // component execution sequence.

  ];


  // ── Run ───────────────────────────────────────────────────

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
    }));
  }


  // ── Assembly description ──────────────────────────────────
  //
  // Returns a full human-readable assembly description.
  // Suitable for audit, handover, cartridge inspection,
  // and deployment documentation.

  function describe() {
    const guides     = listGuides();
    const components = listComponents();

    // Group components by tag
    const componentsByTag = {};
    components.forEach(c => {
      c.tags.forEach(tag => {
        if (!componentsByTag[tag]) componentsByTag[tag] = [];
        componentsByTag[tag].push(c);
      });
    });

    // Identify behaviours in processing order vs attached
    const attachedIds = new Set(Object.keys(_behaviours));
    const orderedAttached = PROCESSING_ORDER.filter(id => attachedIds.has(id));
    const unordered = [...attachedIds].filter(id => !PROCESSING_ORDER.includes(id));

    // Dependency warnings snapshot
    const warnings = _checkComponentDependencies();

    return {
      assembly: {
        behaviourCount:  Object.keys(_behaviours).length,
        guideCount:      Object.keys(_guides).length,
        componentCount:  Object.keys(_components).length,
        hasInput:        !!_input,
        inputEntries:    _input ? _input.entries.length : 0,
        inputCorrections:_input ? _input.corrections.length : 0,
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
        all:      components,
        byTag:    componentsByTag,
      },
      processingOrder: PROCESSING_ORDER,
      dependencyWarnings: warnings,
    };
  }


  // ── Reset ─────────────────────────────────────────────────

  function reset() {
    _behaviours = {};
    _guides     = {};
    _components = {};
    _input      = null;
    _state      = {};
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

    // Input
    setInput,

    // Execution
    run,

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

    // Contracts — exposed for cartridge and engine authors
    contracts: {
      behaviour:       BEHAVIOUR_REQUIRED,
      guide:           GUIDE_REQUIRED,
      component:       COMPONENT_REQUIRED,
      input:           INPUT_REQUIRED,
      processingOrder: PROCESSING_ORDER,
    },
  };

})();
