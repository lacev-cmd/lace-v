// ══════════════════════════════════════════════════════════
// SORTER SPINE  v0.1.0
//
// Inert nucleus. Accepts behaviours and guides as attachments.
// Has no domain knowledge. Has no reading logic.
// Becomes a model by virtue of what is attached to it.
//
// Three attachment types:
//   behaviour  — a reading primitive (how to read material)
//   guide      — a steering layer (what to read toward)
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

  let _behaviours = {};   // keyed by behaviour id
  let _guides     = {};   // keyed by guide id
  let _input      = null; // the material being read
  let _state      = {};   // composed state — built at run time


  // ── Attachment contracts ──────────────────────────────────
  //
  // BEHAVIOUR contract — minimum required fields:
  //   id        {string}   unique identifier
  //   version   {string}   semver
  //   purpose   {string}   what this behaviour does
  //   coreRule  {string}   the single governing rule
  //   boundary  {string}   what this behaviour must not do
  //
  // GUIDE contract — minimum required fields:
  //   id        {string}   unique identifier
  //   version   {string}   semver
  //   purpose   {string}   what this guide steers toward
  //   sector    {string}   the domain or context being steered for
  //   steer     {object}   keyed overrides — behaviour id → override config
  //
  // INPUT contract — minimum required fields:
  //   baseline  {string}   the declared starting state
  //   entries   {Array}    list of { date: ISO string, text: string }
  //
  // Optional input fields:
  //   corrections  {Array}   list of { text: string }
  //   connections  {Array}   list of prior connections
  //   meta         {object}  any deployment-specific metadata

  const BEHAVIOUR_REQUIRED = ['id', 'version', 'purpose', 'coreRule', 'boundary'];
  const GUIDE_REQUIRED     = ['id', 'version', 'purpose', 'sector',   'steer'];
  const INPUT_REQUIRED     = ['baseline', 'entries'];


  // ── Validation ────────────────────────────────────────────

  function _validateBehaviour(b) {
    const missing = BEHAVIOUR_REQUIRED.filter(k => !b[k]);
    if (missing.length)
      throw new Error(`Behaviour "${b.id || '?'}" missing required fields: ${missing.join(', ')}`);
    return true;
  }

  function _validateGuide(g) {
    const missing = GUIDE_REQUIRED.filter(k => !g[k]);
    if (missing.length)
      throw new Error(`Guide "${g.id || '?'}" missing required fields: ${missing.join(', ')}`);
    if (typeof g.steer !== 'object' || Array.isArray(g.steer))
      throw new Error(`Guide "${g.id}" steer must be a plain object keyed by behaviour id.`);
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
    return SorterSpine;  // chainable
  }

  function attachGuide(guide) {
    _validateGuide(guide);
    _guides[guide.id] = guide;
    return SorterSpine;  // chainable
  }

  function detachBehaviour(id) {
    delete _behaviours[id];
    return SorterSpine;
  }

  function detachGuide(id) {
    delete _guides[id];
    return SorterSpine;
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
  // compose() builds the effective config for each behaviour
  // by applying any guide overrides on top of the behaviour's
  // own defaults. Guides do not change behaviour logic —
  // they change the config the behaviour operates with.
  //
  // Override priority (highest to lowest):
  //   1. Guide steer config for this behaviour id
  //   2. Behaviour's own config
  //
  // If multiple guides steer the same behaviour, they are
  // merged in registration order. Later guides win on conflict.

  function _compose() {
    const composed = {};

    Object.values(_behaviours).forEach(behaviour => {
      // Start with a shallow copy of the behaviour
      const effective = Object.assign({}, behaviour);

      // Apply guide overrides in registration order
      Object.values(_guides).forEach(guide => {
        const steer = guide.steer[behaviour.id];
        if (steer) {
          Object.assign(effective, steer);
        }
      });

      composed[behaviour.id] = effective;
    });

    return composed;
  }


  // ── State snapshot ────────────────────────────────────────
  //
  // run() produces a state snapshot — what the spine currently
  // holds after composition. It does not perform analysis.
  // Analysis is the responsibility of whatever consumes the spine.
  //
  // The snapshot exposes:
  //   composed    — each behaviour's effective config after guides
  //   input       — the material
  //   behaviourIds — ordered list of registered behaviour ids
  //   guideIds     — ordered list of registered guide ids
  //   meta         — any deployment metadata from input

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

  function getBehaviour(id) {
    return _behaviours[id] || null;
  }

  function getGuide(id) {
    return _guides[id] || null;
  }

  function listBehaviours() {
    return Object.values(_behaviours).map(b => ({
      id:      b.id,
      version: b.version,
      purpose: b.purpose,
    }));
  }

  function listGuides() {
    return Object.values(_guides).map(g => ({
      id:      g.id,
      version: g.version,
      purpose: g.purpose,
      sector:  g.sector,
    }));
  }

  function describe() {
    return {
      behaviours: listBehaviours(),
      guides:     listGuides(),
      hasInput:   !!_input,
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

    // Attachment
    attachBehaviour,
    attachGuide,
    detachBehaviour,
    detachGuide,

    // Input
    setInput,

    // Execution
    run,

    // Introspection
    getBehaviour,
    getGuide,
    listBehaviours,
    listGuides,
    describe,

    // Reset
    reset,

    // Contracts (exposed for validation by consuming systems)
    contracts: {
      behaviour: BEHAVIOUR_REQUIRED,
      guide:     GUIDE_REQUIRED,
      input:     INPUT_REQUIRED,
    },

  };

})();
