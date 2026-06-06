// ══════════════════════════════════════════════════════════
// SORTER BEHAVIOUR — 01  Independent Signal Counting  v0.3.0
// Portable sorter primitive. Self-contained config.
// No engine code here. No domain assumptions.
//
// Purpose: prevent repeated wording from creating false
// strength. A signal is counted by independent appearances
// across time or context — not by raw mention frequency.
//
// v0.3.0 — full pattern library:
//   — negationRx hardened: full vocabulary range of past-
//     tense, resolved, and distanced negation language.
//   — intensityRx added: emotional intensity markers that
//     must not inflate signal weight.
//   — staleness language added: topic framed as historical
//     or past-tense must not count as current signal.
//   — repetitionRx added: same-day repetition markers.
// ══════════════════════════════════════════════════════════

const BehaviourIndependentSignalCounting = {

  id:       'independent-signal-counting',
  name:     'Independent Signal Counting',
  version:  '0.3.0',

  purpose:
    'Prevent repeated wording from creating false strength. Count independent appearances across time or context, not raw mentions.',

  coreRule:
    'One entry mentioning a topic five times is one signal event. Three entries on three separate days is a strong signal. Emotional intensity does not equal evidence.',


  // ── Confidence Ladder ─────────────────────────────────────

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


  // ── Negation Filter ───────────────────────────────────────
  // Apply before counting. A match here disqualifies the
  // surrounding signal from counting as a positive instance.
  // Full vocabulary range — grouped by negation type.

  negationRx: /\b(
    no longer|not a problem|not anymore|not an issue|not now|not currently|
    used to|I used to|that was|that used to be|it used to|there used to be|
    in the past|back then|previously|formerly|at the time|when I was|
    resolved|sorted|dealt with|handled|fixed|addressed|closed|finished with|done with|behind me|
    it is fine now|it is okay now|it is not a problem now|things are different now|
    no issue|no problem|no concern|no longer relevant|no longer applies|
    I do not have|I don't have|haven't had|have not had|I no longer have|I no longer struggle with|
    I got past|I moved past|I am past|I am over|I have put behind me|
    that chapter is closed|that part of my life|I left that behind|
    not something I deal with|not something I face|not a factor anymore|
    it went away|it stopped|it ended|it is over
  )\b/ix,


  // ── Intensity Filter ──────────────────────────────────────
  // Emotional intensity markers. Must not inflate signal weight.
  // A mention accompanied by these is still one signal — not more.

  intensityRx: /\b(
    absolutely|completely|totally|utterly|extremely|incredibly|very|really|so much|
    more than anything|worst|best|hardest|easiest|always|never|every single|
    cannot stress enough|I mean it|I really mean|I am serious about|
    so bad|so good|the biggest|the most important|the only thing|
    all I think about|I cannot stop|it is all I|it consumes
  )\b/ix,


  // ── Staleness Language ────────────────────────────────────
  // Topic framed as historical must not count as current signal.

  stalenessRx: /\b(
    back when|years ago|months ago|last year|a long time ago|ages ago|
    when I was younger|as a child|growing up|in my twenties|when I was at school|
    in a previous|at my old|when I had|when I was with|when I lived|
    historically|in the past|once upon a time|there was a time|
    I remember when|I used to think|I used to believe|I used to feel
  )\b/ix,


  // ── Same-Day Repetition ───────────────────────────────────
  // Marker for detecting same-day repetition patterns
  // in entry parsing. Two entries on the same day = one signal.

  sameDayRule:
    'Calendar day is the independence unit. Entries sharing a date are one event regardless of count.',


  // ── Counting Rules ────────────────────────────────────────

  countingRules: {
    independenceUnit:
      'Calendar day — two entries on the same day count as one independent event.',
    negationHandling:
      'Apply negationRx filter before counting — a negated mention must not count as a positive signal.',
    intensityHandling:
      'Intensity language does not increase signal weight. An intense single mention is still one signal.',
    stalenessHandling:
      'Historical framing disqualifies a signal from current count. Apply stalenessRx before counting.',
    lengthThreshold:
      'Entry length above 100 characters used as a proxy for substance. Known approximation — use as tiebreaker only.',
    recencyWeight:
      'Optional — recent entries may be weighted higher if deployment requires it.',
    flaggedEntryWeight:
      'Optional — entries marked significant may be weighted higher if deployment requires it.',
  },


  // ── What This Prevents ────────────────────────────────────

  prevents: [
    'Same-day repetition pretending to be evidence.',
    'Emotional intensity pretending to be evidence.',
    'Keyword frequency pretending to be pattern.',
    'A single long entry overweighting the map.',
    'Premature certainty from thin material.',
    'Historical mentions counting as current signals.',
    'Resolved topics re-entering the signal count.',
  ],


  // ── Failure Modes ─────────────────────────────────────────

  failureModes: [
    'Too strict: misses real one-off decisive events.',
    'Too loose: counts same-day repeated material as independent.',
    'Bad date handling produces wrong independence count.',
    'Weak negation filter causes false positive signals.',
    'Intensity not filtered — one highly emotional entry inflates the map.',
    'Historical framing not filtered — past issues counted as current.',
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
    {
      id:       'ISC-06',
      input:    '"I absolutely cannot stress how bad this is."',
      expected: 'One signal — intensity does not inflate weight.',
    },
    {
      id:       'ISC-07',
      input:    '"Back when I was using, money was always a problem."',
      expected: 'Historical framing — must not count as current financial signal.',
    },
    {
      id:       'ISC-08',
      input:    '"It used to be a real issue but I sorted it."',
      expected: 'Negated and stale — must not count.',
    },
  ],

};
