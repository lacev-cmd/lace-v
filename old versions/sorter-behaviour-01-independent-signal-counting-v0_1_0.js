// ══════════════════════════════════════════════════════════
// SORTER BEHAVIOUR — 01  Independent Signal Counting  v0.1.0
// Portable sorter primitive. Self-contained config.
// No engine code here. No domain assumptions.
//
// Purpose: prevent repeated wording from creating false
// strength. A signal is counted by independent appearances
// across time or context — not by raw mention frequency.
//
// One entry mentioning a topic five times is one signal event.
// Three entries across three separate days is a strong signal.
// ══════════════════════════════════════════════════════════

const BehaviourIndependentSignalCounting = {

  id:       'independent-signal-counting',
  name:     'Independent Signal Counting',
  version:  '0.1.0',

  purpose:
    'Prevent repeated wording from creating false strength. Count independent appearances across time or context, not raw mentions.',

  coreRule:
    'One entry mentioning a topic five times is one signal event. Three entries on three separate days is a strong signal. Emotional intensity does not equal evidence.',


  // ── Confidence Ladder ─────────────────────────────────────
  // Default tiers. Override per deployment as needed.

  confidenceLadder: [
    {
      independentDays: 0,
      label:  'Open gap',
      weight: 0,
      desc:   'No independent signal detected.',
    },
    {
      independentDays: 1,
      entryLengthShort: true,
      label:  'Thin signal',
      weight: 1,
      desc:   'One brief mention. Insufficient to read as pattern.',
    },
    {
      independentDays: 1,
      entryLengthShort: false,
      label:  'Weak signal',
      weight: 2,
      desc:   'One substantive appearance. Present but unconfirmed.',
    },
    {
      independentDays: 2,
      label:  'Moderate signal',
      weight: 3,
      desc:   'Two independent days. Pattern beginning to show.',
    },
    {
      independentDays: 3,
      label:  'Strong signal',
      weight: 4,
      desc:   'Three or more independent days. Reliable pattern.',
    },
  ],


  // ── Correction Modifiers ──────────────────────────────────

  correctionModifiers: {
    stale:   'Stale signal regardless of previous strength.',
    primary: 'Promote one tier unless already stale.',
  },


  // ── Counting Rules ────────────────────────────────────────

  countingRules: {
    independenceUnit:
      'calendar day — two entries on the same day count as one independent event',
    negationHandling:
      'apply negation filter before counting — "not a problem" must not count as a positive signal',
    lengthThreshold:
      'entry length above 100 characters treated as substantive for tier resolution',
    recencyWeight:
      'optional — recent entries may be weighted higher if deployment requires it',
    flaggedEntryWeight:
      'optional — entries marked significant may be weighted higher if deployment requires it',
  },


  // ── What This Prevents ────────────────────────────────────

  prevents: [
    'Same-day repetition pretending to be evidence.',
    'Emotional intensity pretending to be evidence.',
    'Keyword frequency pretending to be pattern.',
    'A single long entry overweighting the map.',
    'Premature certainty from thin material.',
  ],


  // ── Failure Modes ─────────────────────────────────────────

  failureModes: [
    'Too strict: misses real one-off decisive events.',
    'Too loose: counts same-day repeated material as independent.',
    'Bad date handling produces wrong independence count.',
    'Weak negation filter causes false positive signals.',
    'Over-reliance on entry length as proxy for substance.',
  ],


  // ── Boundary ──────────────────────────────────────────────

  boundary:
    'Independent signal count measures recurrence inside provided material only. It does not prove factual truth. Repeated false statements can still recur. External verification requires a separate system.',


  // ── Test Cases ────────────────────────────────────────────

  testCases: [
    {
      id:       'ISC-01',
      input:    'One entry mentions the same pressure five times.',
      expected: 'One independent signal — not five.',
    },
    {
      id:       'ISC-02',
      input:    'Three entries on three different days mention the same pressure.',
      expected: 'Strong signal or strong candidate signal.',
    },
    {
      id:       'ISC-03',
      input:    'Two entries on the same day mention the same issue.',
      expected: 'One independent day — not two.',
    },
    {
      id:       'ISC-04',
      input:    'Entry says "this is no longer a problem."',
      expected: 'Must not count as a current positive signal.',
    },
    {
      id:       'ISC-05',
      input:    'User correction marks signal as stale.',
      expected: 'Signal becomes stale regardless of previous strength.',
    },
  ],

};
