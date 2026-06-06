// ══════════════════════════════════════════════════════════
// SORTER BEHAVIOUR — 14  Competing Priorities  v0.2.0
// v0.2.0: competitionLanguageRx, bindLanguageRx,
//         costLanguageRx expanded.
// ══════════════════════════════════════════════════════════

const BehaviourCompetingPriorities = {

  id:       'competing-priorities',
  name:     'Competing Priorities',
  version:  '0.2.0',

  purpose:
    'Hold situations where multiple valid priorities are in genuine competition. Name the competition without forcing a resolution.',

  coreRule:
    'Competing priorities are not contradictions. Both things are real. Both have legitimate claim. The sorter names the competition and what it costs — it does not decide which priority should win.',

  competitionTypes: [
    { key: 'time',         label: 'Time competition',          desc: 'Two valid demands cannot both be fully met within available time.' },
    { key: 'energy',       label: 'Energy competition',        desc: 'Two valid demands cannot both be sustained on available capacity.' },
    { key: 'relational',   label: 'Relational competition',    desc: 'Meeting one person\'s needs makes meeting another\'s harder.' },
    { key: 'identity',     label: 'Identity competition',      desc: 'Two valid roles or self-descriptions are in tension.' },
    { key: 'values',       label: 'Values competition',        desc: 'Two genuinely held values pull toward different actions.' },
    { key: 'short_long',   label: 'Short vs long term',        desc: 'What is needed now conflicts with what is needed over time.' },
    { key: 'self_other',   label: 'Self vs other',             desc: 'What the person needs for themselves conflicts with what someone else needs from them.' },
    { key: 'institutional',label: 'Institutional competition', desc: 'Requirements from different systems conflict.' },
  ],


  // ── Competition Language ──────────────────────────────────
  // Language naming a genuine pull in two directions.

  competitionLanguageRx: /\b(
    on one hand|on the other hand|at the same time|but also|and yet|
    I want both|I need both|both matter|both are important|both are real|
    I cannot do both|I cannot have both|I cannot be in two places|
    torn between|pulled in two directions|caught between|stuck between|
    I have to choose between|I do not know which to|
    both things are true|both things are valid|both things matter to me|
    one thing I need and another thing I need|two things pulling|
    I am being pulled|I feel the pull of|I feel the pressure of both
  )\b/ix,


  // ── Bind Language ─────────────────────────────────────────
  // Genuine bind — neither option resolves cleanly.

  bindLanguageRx: /\b(
    there is no easy answer|there is no good answer|there is no right answer|
    whatever I do|either way|no matter what I choose|no win|
    I lose something either way|something has to give|one has to suffer|
    I cannot satisfy both|I cannot meet both|I cannot serve both|
    the situation is impossible|it is an impossible situation|
    I am stuck because both matter|I am caught because both are real|
    there is no way through that does not cost something|
    it is not a choice I want to make|I do not want to have to choose
  )\b/ix,


  // ── Cost Signals ─────────────────────────────────────────
  // What is not being served — expanded vocabulary.

  costSignals: [
    { key: 'relationship_cost', rx: /\b(I have not been there|I have not called|I missed it|I let them down|they needed me|I was not present|no time for them|I have been neglecting|I have not been available)\b/i },
    { key: 'health_cost',       rx: /\b(I have not slept|I have not eaten|I have not exercised|running on empty|my health is suffering|I am not looking after myself|I am depleted|I am running down)\b/i },
    { key: 'work_cost',         rx: /\b(I am behind|I have not done|work is suffering|I missed the deadline|I cannot focus|I am not performing|I am letting things slip|it is affecting my work)\b/i },
    { key: 'recovery_cost',     rx: /\b(I have not been to|I missed the session|I have not kept|recovery is suffering|my programme|I have not been looking after that side)\b/i },
    { key: 'self_cost',         rx: /\b(I have nothing left|I am losing myself|I do not know what I want|I have no time for myself|I am disappearing|I have forgotten what I want|I exist only for)\b/i },
    { key: 'creative_cost',     rx: /\b(I have not made|I have not worked on|I have not touched it|the work is suffering|no time for the work|I have given it up for now)\b/i },
  ],

  detectionRules: {
    bothMustBeReal:    'Both competing demands must have genuine evidence in the material.',
    notContradiction:  'Contradiction is opposing claims. Competing priorities is opposing valid demands.',
    notAvoidance:      'Avoidance is moving away from something known to matter. Competing priorities is movement constrained by two things that both matter.',
    costVisible:       'Every competition has a cost. Name what is not being served.',
    resolutionNotRequired: 'The sorter does not resolve the competition.',
  },

  outputShape: {
    name:      'Name both competing demands clearly.',
    cost:      'Name what is not being served and what that costs.',
    noVerdict: 'Do not decide which priority should win.',
    hold:      'State that both are real.',
  },

  prevents: [
    'Treating a genuine bind as a failure to prioritise.',
    'Collapsing a real competition into a single recommended action.',
    'Missing the cost of what is not being served.',
    'Treating competing priorities as contradiction or avoidance.',
    'Implying the person simply needs to "choose."',
  ],

  failureModes: [
    'One priority treated as obviously correct — competition flattened.',
    'Cost of the unserved priority not named.',
    'Competition between real demand and preference misread as genuine competition.',
    'Avoidance misread as competing priorities.',
    'Resolution implied where none is available.',
  ],

  boundary:
    'This behaviour does not decide which priority is more important. It holds the real cost of a genuine bind.',

  testCases: [
    { id: 'CP-01', input: 'Caring for a parent and maintaining employment — both described as non-negotiable.', expected: 'Time and energy competition. Cost named on both sides.' },
    { id: 'CP-02', input: 'Recovery requires avoiding certain people. Those people are family.',                expected: 'Recovery vs relational competition. Both real.' },
    { id: 'CP-03', input: '"I want to pursue education but income requires full-time work."',                  expected: 'Short-term vs long-term competition.' },
    { id: 'CP-04', input: '"I am torn between both — there is no easy answer."',                               expected: 'Bind language detected. Both demands named.' },
  ],
};
