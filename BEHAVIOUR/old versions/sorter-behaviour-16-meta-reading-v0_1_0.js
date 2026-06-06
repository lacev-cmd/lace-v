// ══════════════════════════════════════════════════════════
// SORTER BEHAVIOUR — 16  Meta Reading  v0.1.0
// Portable sorter primitive. Self-contained config.
// No engine code here. No domain assumptions.
//
// Purpose: read the person's engagement with the map itself —
// not the map's output quality. Is the person using the map
// as a mirror or performing for it? Are entries getting more
// honest over time or more shaped for the system?
//
// This is the only behaviour that has the person's
// relationship to the tool as its subject.
// Everything else reads what is happening out there.
// This reads what is happening between the person and the map.
// ══════════════════════════════════════════════════════════

const BehaviourMetaReading = {

  id:       'meta-reading',
  name:     'Meta Reading',
  version:  '0.1.0',

  purpose:
    'Read the person\'s engagement with the map over time. Is the map being used as a mirror or a stage? Are entries becoming more honest or more performed? This behaviour has the person\'s relationship to the tool as its subject — not their situation.',

  coreRule:
    'A map that is being performed for is not a map. It is a compliance record. Performed entries produce a false picture. The map must be able to detect when its own picture is unreliable because of how it is being used.',


  // ── Engagement Types ──────────────────────────────────────

  engagementTypes: [
    {
      key:   'honest',
      label: 'Honest engagement',
      desc:  'Entries contain self-correction, contradiction, admission of difficulty, and material that does not reflect well on the person. The map is being used as a mirror.',
    },
    {
      key:   'performed',
      label: 'Performed engagement',
      desc:  'Entries consistently present positive framing, achievement language, and absence of difficulty. The pattern looks like compliance recording rather than honest account.',
    },
    {
      key:   'selective',
      label: 'Selective engagement',
      desc:  'Some areas are written about extensively. Others that are known to be significant are consistently absent. The map is being used partially.',
    },
    {
      key:   'deepening',
      label: 'Deepening engagement',
      desc:  'Entries are becoming more specific, more honest, and more willing to name difficulty over time. The person is trusting the map more.',
    },
    {
      key:   'thinning',
      label: 'Thinning engagement',
      desc:  'Entries are becoming shorter, less specific, or more formulaic over time. The person may be disengaging or managing the map rather than using it.',
    },
    {
      key:   'crisis_only',
      label: 'Crisis-only engagement',
      desc:  'Entries appear primarily when something has gone wrong. The map is being used as a pressure valve rather than a sustained record.',
    },
    {
      key:   'irregular',
      label: 'Irregular engagement',
      desc:  'Entry frequency is inconsistent in a way that affects the map\'s reliability. Not a judgement — gaps may have external causes.',
    },
  ],


  // ── Honesty Signals ───────────────────────────────────────
  // Presence of these signals suggests genuine engagement.

  honestySignals: [
    { key: 'self_correction',  rx: /\b(I was wrong|I got that wrong|I have to be honest|if I am honest|the truth is|I have not been|I have been lying|I said it was|it was not|I need to correct)\b/i },
    { key: 'admission',        rx: /\b(I failed|I broke it|I relapsed|I slipped|I did not|I could not|I went back|I avoided|I have not done|I have been avoiding|I was not honest)\b/i },
    { key: 'difficulty_named', rx: /\b(it is hard|it is difficult|I am struggling|I do not know|I am not sure|I cannot see|I am lost|I do not have|I am stuck|I cannot face)\b/i },
    { key: 'contradiction',    rx: /\b(but also|at the same time|on the other hand|I know I should but|I want to but|I say one thing and|I am not consistent|I keep saying but)\b/i },
  ],


  // ── Performance Signals ───────────────────────────────────
  // Presence of these signals — especially without honesty signals —
  // suggests the map is being performed for.

  performanceSignals: [
    { key: 'achievement_only',  rx: /\b(I did well|I am doing great|everything is good|things are going well|I have been strong|I have been consistent|I am on track|I am proud)\b/i },
    { key: 'formulaic',         rx: /\b(as I mentioned|as before|same as last time|nothing to report|no issues|all good|going well|no concerns|on track as usual)\b/i },
    { key: 'absence_of_hard',   desc: 'No difficulty language, no admission, no self-correction across multiple entries.' },
    { key: 'resolution_always', desc: 'Every entry ends with resolution or positive framing. Difficulty appears only as overcome.' },
  ],


  // ── Engagement Trend ──────────────────────────────────────

  trendRules: {
    deepeningIndicators: [
      'Entries become more specific over time.',
      'Admissions appear that were absent early on.',
      'Person corrects earlier statements.',
      'Difficulty is named without resolution.',
      'Entries contain material that does not reflect well.',
    ],
    thinningIndicators: [
      'Entry length decreases over time without explanation.',
      'Specific detail replaced by general summary.',
      'Entries become formulaic or repetitive in structure.',
      'Gaps between entries increase without external cause.',
      'Honesty signals disappear from recent entries.',
    ],
  },


  // ── Output Rules ──────────────────────────────────────────

  outputRules: {
    noJudgement:
      'Performance or thinning engagement is named as a map reliability issue — not a character verdict. The person may have good reasons. The map names the effect on its own picture.',
    mapReliabilityEffect:
      'If performance signals dominate, the map must note that its picture may be unreliable. It is reading what is being presented, not necessarily what is real.',
    noAccusation:
      'Do not tell the person they are lying to the map. Name the pattern and what it means for the map\'s reliability.',
    deepeningAcknowledged:
      'Deepening engagement is a positive map signal. It means the picture is becoming more reliable over time.',
  },


  // ── What This Prevents ────────────────────────────────────

  prevents: [
    'A performed map being treated as an honest one.',
    'The map producing confident reads from unreliable material.',
    'Compliance recording being mistaken for genuine self-account.',
    'Missing the signal that the person has stopped trusting the map.',
    'Producing a handover based on a performed record.',
  ],


  // ── Failure Modes ─────────────────────────────────────────

  failureModes: [
    'Performance signals too narrow — misses subtle performance.',
    'Honesty signals too broad — counts generic reflection as genuine admission.',
    'Thinning engagement blamed on the person when external cause is present.',
    'Crisis-only pattern misread as avoidance rather than engagement style.',
    'Meta reading output presented to the person in a way that feels accusatory.',
  ],


  // ── Boundary ──────────────────────────────────────────────

  boundary:
    'This behaviour reads the relationship between the person and the map — not the person\'s honesty in the world. A person may be performed for the map and entirely honest in other contexts. The map reads what it is given. Meta reading names what kind of thing it is being given.',


  // ── Test Cases ────────────────────────────────────────────

  testCases: [
    {
      id:       'MR-01',
      input:    'Ten entries. All positive framing. No admission, no difficulty, no self-correction.',
      expected: 'Performance signals dominant. Map reliability flagged.',
    },
    {
      id:       'MR-02',
      input:    'Early entries brief and positive. Later entries contain admissions and self-correction.',
      expected: 'Deepening engagement. Map picture becoming more reliable over time.',
    },
    {
      id:       'MR-03',
      input:    'Entries become shorter and more formulaic over the last month.',
      expected: 'Thinning engagement. Not a judgement — note effect on map reliability.',
    },
    {
      id:       'MR-04',
      input:    'Entries appear only after crises. Long gaps between.',
      expected: 'Crisis-only engagement. Map picture is crisis-weighted — not a sustained record.',
    },
    {
      id:       'MR-05',
      input:    'Person named a significant gap in an earlier entry and has not mentioned it since.',
      expected: 'Selective engagement. Significant topic absent. Cannot distinguish resolved, avoided, or not written about.',
    },
  ],

};
