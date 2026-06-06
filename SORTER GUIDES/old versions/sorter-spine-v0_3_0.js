// ══════════════════════════════════════════════════════════
// SORTER SPINE  v0.3.0
//
// Inert nucleus. Accepts behaviours and guides as attachments.
// Has no domain knowledge. Has no reading logic.
// Becomes a model by virtue of what is attached to it.
//
// v0.3.0 additions over v0.2.0:
//   — Array merge fix: known array fields (movementEvidence,
//     defaultLoadSignals, etc.) are now extended rather than
//     overwritten when guides compose.
//   — Processing order contract: PROCESSING_ORDER constant
//     defines the required engine sequence. Exposed on contracts.
//
// v0.2.0 additions over v0.1.0:
//   — Guide inheritance: sub-guides compose from parent
//     automatically on attachment. Parent must be attached first.
//   — Guide type awareness: 'sector', 'subsector', 'output'
//   — Third-ring output guides steer output shape only —
//     they do not override sector steer unless explicitly set.
//   — describe() now shows configuration summary by type.
//
// Three attachment types:
//   behaviour  — a reading primitive (how to read material)
//   guide      — a steering layer (sector | subsector | output)
//   input      — the material to be read
//
// The spine holds the composition.
// The behaviours and guides do not know about each other.
// The spine does not know what domain it is in.
//
// Different configurations produce different models.
// ══════════════════════════════════════════════════════════

const SorterSpine = (() => {

  // ── Internal registry ─────────────────────────────────────

  let _behaviours = {};
  let _guides     = {};
  let _input      = null;
  let _state      = {};


  // ── Attachment contracts ──────────────────────────────────

  const BEHAVIOUR_REQUIRED = ['id', 'version', 'purpose', 'coreRule', 'boundary'];
  const GUIDE_REQUIRED     = ['id', 'version', 'type', 'purpose', 'sector', 'steer'];
  const INPUT_REQUIRED     = ['baseline', 'entries'];


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

  function _validateInput(input) {
    const missing = INPUT_REQUIRED.filter(k => !(k in input));
    if (missing.length)
      throw new Error(`Input missing required fields: ${missing.join(', ')}`);
    if (!Array.isArray(input.entries))
      throw new Error('Input entries must be an array.');
    return true;
  }


  // ── Registration ──────────────────────────────────────────

  function attachBehaviour(behaviour) {
    _validateBehaviour(behaviour);
    _behaviours[behaviour.id] = behaviour;
    return SorterSpine;
  }

  function attachGuide(guide) {
    _validateGuide(guide);

    // Sub-guides compose from parent on attachment
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

  function detachBehaviour(id) {
    delete _behaviours[id];
    return SorterSpine;
  }

  function detachGuide(id) {
    delete _guides[id];
    return SorterSpine;
  }


  // ── Guide merge (fallback if no composeFrom on guide) ─────

  // Known array fields that should be extended, not overwritten,
  // when a child guide steers on top of a parent.
  const ARRAY_EXTEND_FIELDS = [
    'movementEvidence',
    'notMovement',
    'defaultLoadSignals',
    'notAvoidance',
    'priorityGaps',
    'requiredCaveats',
    'prevents',
    'failureModes',
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
          if (steer) Object.assign(effective, steer);
        });
      });

      composed[behaviour.id] = effective;
    });

    return composed;
  }


  // ── Processing Order Contract ─────────────────────────────
  //
  // Engine implementations MUST follow this sequence.
  // Deviation produces silent failures — corrections applied
  // after reading have no effect on what the map already drew.
  //
  //   1. corrections   — apply all user corrections to input
  //   2. baseline      — parse baseline against corrected input
  //   3. gaps          — detect open gaps on corrected material
  //   4. signals       — count independent signals (Behaviour 01)
  //   5. movement      — read movement / non-movement (Behaviour 09)
  //   6. avoidance     — detect avoidance patterns (Behaviour 04)
  //   7. load          — read load-sensitive capability (Behaviour 05)
  //   8. contradiction — hold contradictions (Behaviour 06)
  //   9. connections   — surface cross-time patterns (Behaviour 08)
  //  10. next move     — produce next useful move (Behaviour 10)
  //  11. handover      — structure output if requested (Behaviour 11)

  const PROCESSING_ORDER = [
    'correction-as-governance',
    'baseline-vs-live-material',
    'open-gap-discipline',
    'independent-signal-counting',
    'movement-non-movement-reading',
    'avoidance-detection',
    'load-sensitive-capability',
    'contradiction-holding',
    'connections-across-time',
    'next-useful-move',
    'private-record-to-optional-handover',
  ];


  // ── Run ───────────────────────────────────────────────────

  function run() {
    if (!_input)
      throw new Error('No input set. Call SorterSpine.setInput() before run().');

    _state = {
      composed:     _compose(),
      input:        _input,
      behaviourIds: Object.keys(_behaviours),
      guideIds:     Object.keys(_guides),
      meta:         _input.meta,
    };

    return _state;
  }


  // ── Introspection ─────────────────────────────────────────

  function getBehaviour(id)  { return _behaviours[id] || null; }
  function getGuide(id)      { return _guides[id]     || null; }

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

  function describe() {
    const guides = listGuides();
    return {
      behaviours: listBehaviours(),
      guides: {
        sector:    guides.filter(g => g.type === 'sector'),
        subsector: guides.filter(g => g.type === 'subsector'),
        output:    guides.filter(g => g.type === 'output'),
      },
      hasInput: !!_input,
    };
  }


  // ── Reset ─────────────────────────────────────────────────

  function reset() {
    _behaviours = {};
    _guides     = {};
    _input      = null;
    _state      = {};
    return SorterSpine;
  }


  // ── Public API ────────────────────────────────────────────

  return {
    attachBehaviour,
    attachGuide,
    detachBehaviour,
    detachGuide,
    setInput,
    run,
    getBehaviour,
    getGuide,
    listBehaviours,
    listGuides,
    describe,
    reset,
    contracts: {
      behaviour:       BEHAVIOUR_REQUIRED,
      guide:           GUIDE_REQUIRED,
      input:           INPUT_REQUIRED,
      processingOrder: PROCESSING_ORDER,
    },
  };

})();
