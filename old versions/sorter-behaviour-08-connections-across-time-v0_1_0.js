// ══════════════════════════════════════════════════════════
// SORTER BEHAVIOUR — 08  Connections Across Time  v0.1.0
// Portable sorter primitive. Self-contained config.
// No engine code here. No domain assumptions.
//
// Purpose: detect recurring patterns separated by time.
// People and systems often miss recurrence because events
// are not adjacent. Time separation can increase meaning.
// A connection is a recurrence prompt — not a conclusion.
// ══════════════════════════════════════════════════════════

const BehaviourConnectionsAcrossTime = {

  id:       'connections-across-time',
  name:     'Connections Across Time',
  version:  '0.1.0',

  purpose:
    'Detect recurring patterns separated by time. Surface recurrence that would be missed by reading only adjacent entries.',

  coreRule:
    'A pressure, skill, stuck point, or pattern appearing weeks apart may be more significant than material repeated yesterday. Time separation can increase meaning. A connection is a prompt — not a conclusion.',


  // ── Connection Types ──────────────────────────────────────

  connectionTypes: [
    {
      key:   'repeating_pressure',
      label: 'Repeating pressure pattern',
      desc:  'The same pressure signal has appeared across a meaningful time gap.',
    },
    {
      key:   'repeating_stuck',
      label: 'Repeating stuck pattern',
      desc:  'The same stuck or non-movement signal has appeared across a meaningful time gap.',
    },
    {
      key:   'repeating_capability',
      label: 'Repeating capability',
      desc:  'The same skill or positive signal has appeared across a meaningful time gap.',
    },
    {
      key:   'positive_connection',
      label: 'Positive connection',
      desc:  'A strength or capability is recurring — this is the map reinforcing something working.',
    },
    {
      key:   'negative_connection',
      label: 'Negative connection',
      desc:  'A pressure or breakdown is recurring — this is the map surfacing a pattern.',
    },
    {
      key:   'user_confirmed',
      label: 'User confirmed connection',
      desc:  'User has acknowledged the connection as meaningful.',
    },
    {
      key:   'user_dismissed',
      label: 'User dismissed connection',
      desc:  'User has indicated the connection is not meaningful. Downgrade unless pattern reappears.',
    },
    {
      key:   'watch_only',
      label: 'Connection remains watch-only',
      desc:  'Connection detected but not yet confirmed or dismissed. Monitor for recurrence.',
    },
  ],


  // ── Detection Rules ───────────────────────────────────────

  detectionRules: {
    minimumSeparation:
      'Connections should require a minimum time gap between appearances to qualify. Suggested minimum: 14 days. Deployments may adjust.',
    strengthByRecurrence:
      'A pattern appearing three or more times across separate periods is stronger than one appearing twice.',
    contextRequired:
      'Two entries sharing a word but describing different contexts should not produce a strong connection. Match requires semantic proximity, not just keyword match.',
    dismissalRespected:
      'A user-dismissed connection must not reappear in the same form unless the pattern resurfaces significantly.',
    dismissalThreshold:
      'Three dismissed instances of the same signal may re-surface as a watch-pattern regardless of dismissal.',
  },


  // ── What This Prevents ────────────────────────────────────

  prevents: [
    'Missing recurrence across non-adjacent entries.',
    'Treating incidents as isolated when they are part of a pattern.',
    'Losing long-range signal in a high-volume record.',
    'Forgetting earlier material that is still relevant.',
    'Repeating a connection the user has already dismissed.',
  ],


  // ── Failure Modes ─────────────────────────────────────────

  failureModes: [
    'Too many weak connections — noise overwhelms signal.',
    'Same topic, different meaning — false connection.',
    'No context around matched entries — connection is hollow.',
    'User dismissal not stored or respected.',
    'Old connections dominate the current map.',
    'Connections treated as proof rather than prompt.',
  ],


  // ── Boundary ──────────────────────────────────────────────

  boundary:
    'Do not treat a connection as causation. A connection is a recurrence prompt. It needs context before any action or conclusion.',


  // ── Test Cases ────────────────────────────────────────────

  testCases: [
    {
      id:       'CAT-01',
      input:    'Same pressure signal appears 20 days apart.',
      expected: 'Connection across time surfaced.',
    },
    {
      id:       'CAT-02',
      input:    'Same skill signal appears 30 days apart.',
      expected: 'Positive connection — capability recurring.',
    },
    {
      id:       'CAT-03',
      input:    'User marks connection as "nothing."',
      expected: 'Connection downgraded unless pattern reappears significantly.',
    },
    {
      id:       'CAT-04',
      input:    'Three dismissed instances of the same signal appear over time.',
      expected: 'May re-surface as watch pattern despite prior dismissals.',
    },
    {
      id:       'CAT-05',
      input:    'Two entries share a word but the context is clearly different.',
      expected: 'No strong connection without stronger semantic match.',
    },
  ],

};
