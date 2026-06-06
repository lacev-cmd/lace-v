// ══════════════════════════════════════════════════════════
// SORTER BEHAVIOUR — 14  Competing Priorities  v0.1.0
// Portable sorter primitive. Self-contained config.
// No engine code here. No domain assumptions.
//
// Purpose: hold situations where multiple valid things are
// pulling against each other with no clean resolution path.
// This is not contradiction — both things are legitimate.
// This is not avoidance — the person is not dodging either.
// This is genuine competition between real demands.
// ══════════════════════════════════════════════════════════

const BehaviourCompetingPriorities = {

  id:       'competing-priorities',
  name:     'Competing Priorities',
  version:  '0.1.0',

  purpose:
    'Hold situations where multiple valid priorities are in genuine competition. Name the competition without forcing a resolution. A person pulled in two real directions is not contradicting themselves — they are in a real bind.',

  coreRule:
    'Competing priorities are not contradictions. Both things are real. Both have legitimate claim. The sorter names the competition and what it costs — it does not decide which priority should win.',


  // ── Competition Types ─────────────────────────────────────

  competitionTypes: [
    {
      key:   'time',
      label: 'Time competition',
      desc:  'Two valid demands cannot both be fully met within available time.',
    },
    {
      key:   'energy',
      label: 'Energy competition',
      desc:  'Two valid demands cannot both be sustained on available capacity.',
    },
    {
      key:   'relational',
      label: 'Relational competition',
      desc:  'Meeting one person\'s or relationship\'s needs makes it harder to meet another\'s.',
    },
    {
      key:   'identity',
      label: 'Identity competition',
      desc:  'Two valid self-descriptions or roles are in tension — what is required of one conflicts with what is required of the other.',
    },
    {
      key:   'values',
      label: 'Values competition',
      desc:  'Two genuinely held values pull toward different actions in the same situation.',
    },
    {
      key:   'short_long',
      label: 'Short-term vs long-term competition',
      desc:  'What is needed now conflicts with what is needed over time. Both are real needs.',
    },
    {
      key:   'self_other',
      label: 'Self vs other competition',
      desc:  'What the person needs for themselves conflicts with what someone else needs from them.',
    },
    {
      key:   'institutional',
      label: 'Institutional competition',
      desc:  'Requirements from different systems, organisations, or authorities conflict with each other.',
    },
  ],


  // ── Detection Rules ───────────────────────────────────────

  detectionRules: {
    bothMustBeReal:
      'Both competing demands must have genuine evidence in the material. A competition between a real demand and a stated preference is not this behaviour — it may be avoidance or contradiction.',
    notContradiction:
      'Contradiction (Behaviour 06) is when the map holds opposing claims. Competing priorities is when the map holds opposing valid demands. The difference is legitimacy — both sides here are real.',
    notAvoidance:
      'Avoidance (Behaviour 04) is movement away from something known to matter. Competing priorities is movement constrained by two things that both matter. The person is not dodging — they are caught.',
    costVisible:
      'Every competition has a cost. The map should name what is not being served when one priority takes precedence — not as a failure, but as a real consequence.',
    resolutionNotRequired:
      'The sorter does not resolve the competition. It holds it. Resolution belongs to the person — and may not be possible without external change.',
  },


  // ── Cost Detection ────────────────────────────────────────
  // What is not getting served. Named as consequence, not failure.

  costSignals: [
    { key: 'relationship_cost', rx: /\b(I have not been there|I have not called|I missed|I let them down|they needed me|I was not present|no time for|neglecting)\b/i },
    { key: 'health_cost',       rx: /\b(I have not slept|I have not eaten|I have not exercised|I am running on empty|my health|I am not looking after|I am depleted)\b/i },
    { key: 'work_cost',         rx: /\b(I am behind|I have not done|work is suffering|I missed the deadline|I cannot focus|I am not performing|I am letting things slip)\b/i },
    { key: 'recovery_cost',     rx: /\b(I have not been to|I have not kept|I missed the session|I have not been looking after|the recovery|my programme)\b/i },
    { key: 'self_cost',         rx: /\b(I have nothing left|I am losing myself|I do not know what I want|I have forgotten|I have no time for myself|I am disappearing)\b/i },
  ],


  // ── Output Shape ──────────────────────────────────────────

  outputShape: {
    name:     'Name both competing demands clearly.',
    cost:     'Name what is not being served and what that costs.',
    noVerdict:'Do not decide which priority should win.',
    hold:     'State that both are real — the competition is the situation, not a failure of the person.',
  },


  // ── What This Prevents ────────────────────────────────────

  prevents: [
    'Treating a genuine bind as a failure to prioritise.',
    'Collapsing a real competition into a single recommended action.',
    'Missing the cost of what is not being served.',
    'Treating competing priorities as contradiction or avoidance.',
    'Implying the person simply needs to "choose."',
  ],


  // ── Failure Modes ─────────────────────────────────────────

  failureModes: [
    'One priority treated as obviously correct — competition flattened.',
    'Cost of the unserved priority not named.',
    'Competition between real demand and preference misread as genuine competition.',
    'Avoidance misread as competing priorities — person is actually avoiding one side.',
    'Resolution implied where none is available without external change.',
  ],


  // ── Boundary ──────────────────────────────────────────────

  boundary:
    'This behaviour does not decide which priority is more important. That is for the person. It holds the real cost of a genuine bind — not as a prompt to choose better, but as an honest read of the situation.',


  // ── Test Cases ────────────────────────────────────────────

  testCases: [
    {
      id:       'CP-01',
      input:    'Person is caring for a parent and trying to maintain employment. Both are described as non-negotiable.',
      expected: 'Time and energy competition. Cost to both named. No resolution recommended.',
    },
    {
      id:       'CP-02',
      input:    'Recovery requires avoiding certain people. Those people are family.',
      expected: 'Recovery vs relational competition. Both real. Cost named on each side.',
    },
    {
      id:       'CP-03',
      input:    'Person wants to pursue education but income requires full-time work.',
      expected: 'Short-term vs long-term competition. Not avoidance — both demands are real.',
    },
    {
      id:       'CP-04',
      input:    'Person says family is priority but entries show consistent work focus.',
      expected: 'Check for contradiction (Behaviour 06) first — may not be competing priorities.',
    },
    {
      id:       'CP-05',
      input:    'Two institutional requirements conflict — meeting one breaches the other.',
      expected: 'Institutional competition. Both demands real. External constraint also present — see Behaviour 15.',
    },
  ],

};
