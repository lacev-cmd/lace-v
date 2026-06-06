// ══════════════════════════════════════════════════════════
// SORTER BEHAVIOUR — 06  Contradiction Holding  v0.1.0
// Portable sorter primitive. Self-contained config.
// No engine code here. No domain assumptions.
//
// Purpose: hold conflicting signals as a real map state
// instead of flattening them into a false conclusion.
// Two opposed signals may both be real. The sorter names
// the tension — it does not resolve it prematurely.
// ══════════════════════════════════════════════════════════

const BehaviourContradictionHolding = {

  id:       'contradiction-holding',
  name:     'Contradiction Holding',
  version:  '0.1.0',

  purpose:
    'Hold conflicting signals as a real map state. Name the tension without deciding which side is the truth.',

  coreRule:
    'Humans and systems often contain true tensions. Two opposed signals may both be real. The sorter names the tension — it does not resolve it, judge it, or treat it as dishonesty.',


  // ── Contradiction Types ───────────────────────────────────

  contradictionTypes: [
    {
      key:   'unresolved_tension',
      label: 'Unresolved tension',
      desc:  'Two opposing signals are both present. Neither is clearly dominant.',
    },
    {
      key:   'direction_behaviour',
      label: 'Direction–behaviour tension',
      desc:  'Stated direction and actual behaviour in entries point in different ways.',
    },
    {
      key:   'claimed_change_vs_pattern',
      label: 'Claimed change vs repeated pattern',
      desc:  '"I have changed" and evidence of the same pattern both appear.',
    },
    {
      key:   'stated_goal_vs_reality',
      label: 'Stated goal vs current reality',
      desc:  'A goal is named but entries show no movement toward it.',
    },
    {
      key:   'capability_vs_breakdown',
      label: 'Capability vs breakdown',
      desc:  'A capability is claimed and breakdown of that capability also appears.',
    },
    {
      key:   'motivation_vs_non_contact',
      label: 'Motivation vs loss of contact',
      desc:  'Motivation is stated toward something but actual contact or action is absent.',
    },
    {
      key:   'evidence_conflict',
      label: 'Evidence conflict',
      desc:  'Two entries provide directly conflicting factual accounts.',
    },
    {
      key:   'requires_context',
      label: 'Requires context',
      desc:  'Contradiction detected but correction or context may explain it — flag but do not assert.',
    },
  ],


  // ── Detection Pattern Shape ───────────────────────────────
  // Each contradiction pair requires two regex patterns (a and b)
  // and a text output that names the tension without resolving it.
  // Deployments supply their own contradiction pairs.

  detectionShape: {
    a:    'Pattern matching the first signal.',
    b:    'Pattern matching the opposing signal.',
    text: 'Output text naming the tension. Must not assign cause or resolve the tension.',
  },


  // ── Output Rules ──────────────────────────────────────────

  outputRules: {
    nameOnly:     'The output names the tension. It does not say which side is true.',
    noMotive:     'Do not assign motive, dishonesty, or weakness to the contradiction.',
    bothReal:     'State that both signals may be real — this is not resolved by the sorter.',
    correction:   'If a correction explains the contradiction, adjust output — but do not blindly suppress the tension if entries still show it.',
    evidenceFirst: 'If specific evidence opposes a general statement, the specific evidence is the more reliable signal. Name this explicitly.',
  },


  // ── What Contradiction Can Mean ───────────────────────────

  possibleMeanings: [
    'Transition — genuine change that is partial or incomplete.',
    'Competing pressures pulling in different directions.',
    'Incomplete information — one side of the tension is underwritten.',
    'Shame preventing honest account of one side.',
    'Context shift — different entries reflect different moments.',
    'Unresolved state — both things are true at different times.',
  ],


  // ── What This Prevents ────────────────────────────────────

  prevents: [
    'False resolution — collapsing tension into a clean conclusion.',
    'Moral judgement.',
    'Overconfidence in either direction.',
    'Treating contradiction as proof of dishonesty.',
    'Losing the most informative part of the map.',
  ],


  // ── Failure Modes ─────────────────────────────────────────

  failureModes: [
    'Detection pattern too broad — false contradictions across unrelated entries.',
    'No evidence snippets — output is generic and unhelpful.',
    'Contradiction output resolves rather than names.',
    'Contradiction treated as failure state rather than live map state.',
    'Correction not applied — tension repeats after user has explained it.',
  ],


  // ── Boundary ──────────────────────────────────────────────

  boundary:
    'Do not use contradiction as proof of lying. Contradiction is a map state — not a verdict. The sorter names the tension only.',


  // ── Test Cases ────────────────────────────────────────────

  testCases: [
    {
      id:       'CTH-01',
      input:    '"I have changed" appears. "Same mistake again" appears.',
      expected: 'Stated change and same pattern both visible. Tension named, not resolved.',
    },
    {
      id:       'CTH-02',
      input:    '"Family is my goal" appears. "No contact for weeks" appears.',
      expected: 'Goal and reality tension named.',
    },
    {
      id:       'CTH-03',
      input:    '"Project is priority" appears. No action appears across entries.',
      expected: 'Priority–action tension named.',
    },
    {
      id:       'CTH-04',
      input:    '"Ready for release" appears. Incident appears in same period.',
      expected: 'Release-readiness tension named.',
    },
    {
      id:       'CTH-05',
      input:    'User correction explains the context of the contradiction.',
      expected: 'Tension adjusted — not blindly repeated.',
    },
  ],

};
