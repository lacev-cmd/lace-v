// ══════════════════════════════════════════════════════════
// SORTER BEHAVIOUR — 09  Movement / Non-Movement Reading  v0.1.0
// Portable sorter primitive. Self-contained config.
// No engine code here. No domain assumptions.
//
// Purpose: separate actual movement from mood, intention,
// explanation, or repeated description. Feeling better is
// not automatically movement. Feeling worse is not
// automatically failure.
// ══════════════════════════════════════════════════════════

const BehaviourMovementNonMovementReading = {

  id:       'movement-non-movement-reading',
  name:     'Movement / Non-Movement Reading',
  version:  '0.2.0',

  purpose:
    'Separate actual movement from mood, intention, explanation, and repeated description. Read what changed — not how it feels.',

  coreRule:
    'Movement means something changed in behaviour, structure, contact, decision, repair, test, routine, or action. Feeling better is not automatically movement. Feeling worse is not automatically failure.',


  // ── Movement Output Types ─────────────────────────────────

  movementOutputTypes: [
    { key: 'moving',          label: 'What is moving',         desc: 'Evidenced change — action taken, structure changed, contact made, decision held.' },
    { key: 'not_moving',      label: 'What is not moving',     desc: 'Intention stated repeatedly without action. Same description returning without a different response.' },
    { key: 'under_load',      label: 'What is under load',     desc: 'Movement is present but occurring under pressure. Note the load — it is part of the signal.' },
    { key: 'emerging',        label: 'What is emerging',       desc: 'New movement appearing for the first time — not yet confirmed as pattern.' },
    { key: 'circling',        label: 'What is circling',       desc: 'Same material returning without a changed approach or outcome.' },
    { key: 'avoided',         label: 'What is avoided',        desc: 'Movement toward a specific area is consistently absent. See Behaviour 04.' },
    { key: 'thin',            label: 'Movement thin',          desc: 'One instance. Not yet pattern.' },
    { key: 'weak',            label: 'Movement weak',          desc: 'Beginning to show but not consistent.' },
    { key: 'moderate',        label: 'Movement moderate',      desc: 'Present across multiple entries.' },
    { key: 'strong',          label: 'Movement strong',        desc: 'Consistent and evidenced across the period.' },
    { key: 'not_visible',     label: 'Movement not visible',   desc: 'No movement signal in this period. May reflect sparse material, internal-only work, or a period of load.' },
  ],


  // ── What Counts as Movement ───────────────────────────────

  movementEvidence: [
    'A call made, not just planned.',
    'A session attended, not just intended.',
    'A boundary held under pressure.',
    'A repair started, not just wished for.',
    'A decision made and acted on.',
    'A routine established and repeated.',
    'A test attempted.',
    'A structure changed.',
    'An escalation made.',
    'Help asked for.',
    'Harm reduced.',
    'A line held.',
    'A condition changed.',
    'Something noticed earlier than before.',
    'Something named honestly that was previously avoided.',
    'Returning after a collapse — not just describing the collapse.',
  ],


  // ── What Does Not Count as Movement ──────────────────────

  notMovement: [
    'Describing an intention to act.',
    'Feeling better about a situation.',
    'Deciding to do something without doing it.',
    'Repeating the same reflection about a stuck point.',
    'Expressing hope or optimism without corresponding action.',
    'Writing about understanding the problem without changing approach.',
  ],


  // ── Default Action Language ───────────────────────────────
  // IMPORTANT: this default is intentionally conservative.
  // Generic verbs ("I did", "I made", "I went") are excluded
  // because they match too broadly and produce false movement signals.
  // Domain guides MUST supply their own defaultActionRx.
  // If no domain override is present, the engine should warn.

  defaultActionRx: /\b(I called|I attended|I completed|I booked|I paid|I submitted|I applied|I spoke to|I filed|I reported|I contacted|I registered|I started and completed|I followed through)\b/i,


  // ── Default Stuck Language ────────────────────────────────

  defaultStuckRx: /\b(same thing|nothing changed|back to where|same place|going in circles|I always|every time|it always|I keep|no further|still stuck|round and round|same loop|same pattern|same again)\b/i,


  // ── What This Prevents ────────────────────────────────────

  prevents: [
    'Mistaking mood improvement for progress.',
    'Mistaking distress for failure.',
    'Mistaking intention for action.',
    'Mistaking repeated reflection for change.',
    'Producing motivational output without evidential basis.',
  ],


  // ── Failure Modes ─────────────────────────────────────────

  failureModes: [
    'Action language too generic — false movement signals.',
    'Domain-specific action language missing — real movement missed.',
    'One action overstated as a new pattern.',
    'Internal movement missed because entries are sparse.',
    'Non-movement overcalled during unavoidable constraint or recovery period.',
  ],


  // ── Boundary ──────────────────────────────────────────────

  boundary:
    'Do not define movement only as external productivity. Some domains include internal movement — but it must still be evidenced by specific material in the entries, not inferred from mood.',


  // ── Test Cases ────────────────────────────────────────────

  testCases: [
    {
      id:       'MNM-01',
      input:    '"I decided I should call."',
      expected: 'Not movement — unless the call happened.',
    },
    {
      id:       'MNM-02',
      input:    '"I called and booked the appointment."',
      expected: 'Movement.',
    },
    {
      id:       'MNM-03',
      input:    '"I felt better this week."',
      expected: 'Not necessarily movement.',
    },
    {
      id:       'MNM-04',
      input:    '"I felt awful but still attended."',
      expected: 'Movement under load.',
    },
    {
      id:       'MNM-05',
      input:    '"Same thing again, nothing changed."',
      expected: 'Non-movement — stuck signal.',
    },
  ],

};
