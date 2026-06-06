// ══════════════════════════════════════════════════════════
// ADAPTIVE COMPONENT — 13  Horizon Map  v0.1.0
// Upper-layer response module. Self-contained config.
// No engine code here. No domain assumptions.
//
// Tags: planning, case-system, workflow, agent
//
// Acts on mapped state. Does not read material directly.
// Does not replace behaviours or guides.
//
// Purpose: hold the comparison surface between the
// projected state and the intended state at a named
// horizon. Update it as new entries arrive. The gap
// between projected and intended is the planning surface
// — it either closes, holds, or widens over time, and
// that movement is itself a signal.
//
// Depends on: horizon-reading (Behaviour 17)
//
// !! EXTRAPOLATION WARNING !!
// This component works with projections — not readings.
// ══════════════════════════════════════════════════════════

const AdaptiveComponentHorizonMap = {

  id:      'horizon-map',
  name:    'Horizon Map',
  version: '0.1.0',
  tags:    ['planning', 'case-system', 'workflow', 'agent'],

  purpose:
    'Hold the comparison surface between the projected state (where the current arc points) and the intended state (where the person says they want to be) at a named horizon. Track how the gap between them moves as new entries arrive. The gap movement is a planning signal in its own right.',

  coreRule:
    'The horizon map holds two states: projected and intended. It does not merge them. It does not resolve the gap. It surfaces the gap clearly and tracks whether it is closing, holding, or widening. A closing gap is not success — it is direction. A widening gap is not failure — it is information.',


  // ── Horizon Map State ─────────────────────────────────────
  // Initialised empty. Populated on first execute().
  // Persists across sessions via saveState() / loadState().

  horizonMapState: {
    horizon:              null,    // Active horizon config { key, days, label }.
    intendedState:        null,    // Parsed from direction language in material.
    projectedState:       null,    // Extrapolated from current arc.
    gapType:              null,    // One of BehaviourHorizonReading.gapTypes keys.
    gapDescription:       null,    // One or two sentences on the gap.
    projectionConfidence: null,    // One of BehaviourHorizonReading.projectionConfidenceTiers keys.
    activeBlockers:       [],      // Active projection blockers.
    planningPrompt:       null,    // Structural question raised by the gap.
    lastUpdated:          null,    // ISO date of last update.
    history:              [],      // Prior gap states — enables gap movement tracking.
    projectable:          false,   // Whether current arc meets minimum threshold.
  },


  // ── Gap Movement State ────────────────────────────────────
  // Tracks how the gap between projected and intended
  // is moving across sessions. Gap movement is a signal —
  // not just the current gap.

  gapMovementState: {
    trend:          null,   // 'closing', 'holding', 'widening', 'reversed', 'new'
    periodsTracked: 0,
    lastGapType:    null,
    movementNote:   null,   // Plain-language description of gap movement.
  },


  // ── Gap Movement Rules ────────────────────────────────────

  gapMovementRules: {
    minimumPeriodsForTrend:
      'At least two gap readings separated by a meaningful interval before a trend is named.',
    closingSignal:
      'Gap type moves from diverging → widening → holding → closing → aligned across sessions.',
    wideningSignal:
      'Gap type moves from aligned → closing → holding → widening → diverging across sessions.',
    reversalSignal:
      'A significant single-session shift in gap type — e.g. closing to widening — is a reversal. Name it explicitly.',
    holdingCaution:
      'A gap that has held across multiple sessions without movement warrants a note. Holding is not neutral indefinitely — it may indicate structural resistance.',
    newIntendedState:
      'If the intended state changes materially between sessions, reset gap movement tracking. A new destination produces a new gap — prior trend does not carry over.',
  },


  // ── Horizon Configuration ─────────────────────────────────
  // Deployment sets the active horizon. Can be overridden
  // by the person explicitly stating a time horizon.

  horizonConfig: {
    active:          'medium',   // Default. Override per deployment.
    userOverridable: true,       // Person can name their own horizon in entries.
    userHorizonRx:   /\b(
      in (\d+) (days?|weeks?|months?|years?)|
      by (january|february|march|april|may|june|july|august|
          september|october|november|december)|
      by (next year|end of year|end of the year)|
      within (\d+) (days?|weeks?|months?)|
      this time next (week|month|year)|
      before (christmas|the new year|summer|winter|spring|autumn|fall)|
      in the next (\d+) (days?|weeks?|months?)
    )\b/ix,
  },


  // ── Update Rules ──────────────────────────────────────────
  // When and how the horizon map updates.

  updateRules: {
    updateOnNewEntry:
      'Re-run horizon-reading behaviour after each new entry. Update the map state with the new projection.',
    archivePriorState:
      'Before updating, archive the current gap state to history. Minimum: gapType, projectionConfidence, date.',
    intendedStateStability:
      'Do not update the intended state on a single new mention. Require two independent appearances of a new direction before updating the intended state.',
    projectedStateUpdate:
      'Update the projected state on every execute() once the arc meets minimum thresholds.',
    blockerUpdate:
      'Re-evaluate active blockers on every execute(). Blockers that have resolved should be removed. New blockers should be added.',
    gapMovementUpdate:
      'After updating the gap type, compare to prior gap type and update gapMovementState accordingly.',
  },


  // ── Planning Surface ──────────────────────────────────────
  // The planning surface is what the person actually uses.
  // It is not a list of recommendations. It is a structured
  // view of the gap — what it is, what is producing it,
  // and what structural question it raises.

  planningSurface: {

    sections: [

      {
        key:   'where_arc_points',
        label: 'Where the arc is pointing',
        desc:  'The projected state at the horizon. Labelled as projection. Confidence stated.',
        rule:  'Never present this as "what will happen". Present as "where the current arc points".',
      },

      {
        key:   'where_you_said_you_want_to_be',
        label: 'Where you said you want to be',
        desc:  'The intended state — drawn from stated direction in the material.',
        rule:  'Use the person\'s own language where possible. Do not reframe their intention.',
      },

      {
        key:   'the_gap',
        label: 'The gap',
        desc:  'The structural relationship between projected and intended. Gap type named. Gap description in plain language.',
        rule:  'One or two sentences. Not a diagnosis. Not a verdict. A structural observation.',
      },

      {
        key:   'gap_movement',
        label: 'How the gap has moved',
        desc:  'Whether the gap is closing, holding, or widening since last reading. Only present if two or more readings exist.',
        rule:  'Name the trend. Do not assign cause. A closing gap does not mean success is assured. A widening gap does not mean failure is inevitable.',
      },

      {
        key:   'what_is_affecting_the_projection',
        label: 'What is affecting the projection',
        desc:  'Active blockers and their severity. Load conditions. Constraint state. Recent state changes.',
        rule:  'Name what is making the projection less reliable. Do not suppress blockers to produce a cleaner output.',
      },

      {
        key:   'planning_prompt',
        label: 'A question the gap raises',
        desc:  'One structural question about the gap. Not a recommendation. Not a next move.',
        rule:  'The question must come from the gap itself — not from general planning theory. It should be specific to this person\'s arc and this gap.',
      },

    ],

    outputRegister:
      'Written for the person themselves — not for a professional, case worker, or third party. Plain language. Honest about uncertainty. Not motivational. Not clinical. A working document the person can think with.',

  },


  // ── Behaviour Inputs ──────────────────────────────────────

  behaviourInputs: [
    'horizon-reading',           // Primary. Required. Produces the projection.
    'baseline-vs-live-material', // Reads intended state from direction language.
    'connections-across-time',   // Arc material — recurrence and pattern.
    'state-change-detection',    // Arc velocity — is the arc shifting?
    'load-sensitive-capability', // Load effects on projection reliability.
    'external-constraint-reading', // Constraint blockers on projection.
    'consequence-propagation',   // Optional. Downstream effects on horizon.
  ],


  // ── Component Inputs ──────────────────────────────────────
  // Other adaptive components that feed this one.

  componentInputs: [
    // confidence-gated-output — gates the planning surface by
    // projection confidence before surfacing to the person.
  ],


  // ── What This Enables ─────────────────────────────────────

  enables: [
    'Personal planning tool that updates as the person writes — not a static document.',
    'Case worker support tool — shows the gap between client\'s stated direction and current arc.',
    'Reentry planning — horizon at licence completion date.',
    'Recovery planning — horizon at a named milestone.',
    'Career or life planning — horizon at a personally stated date.',
    'Engineering project — horizon at delivery date, gap between current trajectory and specification.',
  ],


  // ── Boundary ──────────────────────────────────────────────

  boundary:
    'The horizon map holds projections — not readings. It is not a prediction of what will happen. It is a structural comparison of where the arc points versus where the person says they want to go. It does not tell the person what to do. It does not assign probability to outcomes. It does not produce a verdict on whether the person will succeed or fail. It surfaces the gap clearly and honestly, labels its confidence, names what is affecting reliability, and asks one structural question. Nothing more.',


  // ── Test Cases ────────────────────────────────────────────

  testCases: [
    {
      id:       'HM-01',
      input:    'First execute(). Strong arc. Clear intended state. 90-day horizon.',
      expected: 'Horizon map initialised. Projected state set. Intended state set. Gap type assessed. Planning prompt generated. History empty — gap movement not yet tracked.',
    },
    {
      id:       'HM-02',
      input:    'Second execute(). New entry. Arc has strengthened. Gap type was holding, now closing.',
      expected: 'Prior state archived to history. Gap type updated: closing. Gap movement trend: closing. Planning prompt updated.',
    },
    {
      id:       'HM-03',
      input:    'Third execute(). New entry. Person states a new intended state materially different from prior.',
      expected: 'Intended state updated. Gap movement tracking reset — new destination. Note: prior trend does not carry over.',
    },
    {
      id:       'HM-04',
      input:    'Execute() with arc below minimum thresholds.',
      expected: 'projectable: false. Planning surface not generated. Reason named. Direction to add more material.',
    },
    {
      id:       'HM-05',
      input:    'Gap has held across three sessions without movement.',
      expected: 'Gap movement trend: holding. Note added: holding across multiple sessions may indicate structural resistance.',
    },
    {
      id:       'HM-06',
      input:    'Gap was closing. New entry shows significant load increase and arc deceleration. Gap now widening.',
      expected: 'Gap movement: reversal detected. Prior trend was closing. Now widening. Blocker: high_load added. Note: reversal named explicitly.',
    },
    {
      id:       'HM-07',
      input:    'Person states a time horizon explicitly in an entry: "by this time next year".',
      expected: 'User horizon override applied. Horizon updated to extended (365 days). Map re-evaluated at new horizon.',
    },
    {
      id:       'HM-08',
      input:    'Planning surface requested. Projection confidence is wide_uncertainty.',
      expected: 'Planning surface generated with confidence label prominent. Sections rendered but each marked as wide uncertainty. Planning prompt still generated — the gap is real even if the projection is uncertain.',
    },
  ],

};
