// ══════════════════════════════════════════════════════════
// SORTER BEHAVIOUR — 02  Baseline vs Live Material  v0.1.0
// Portable sorter primitive. Self-contained config.
// No engine code here. No domain assumptions.
//
// Purpose: compare the starting declared state against later
// material. The baseline is not onboarding copy — it is the
// first map. Later entries confirm it, contradict it, weaken
// it, update it, or reveal what was invisible at the start.
// ══════════════════════════════════════════════════════════

const BehaviourBaselineVsLiveMaterial = {

  id:       'baseline-vs-live-material',
  name:     'Baseline vs Live Material',
  version:  '0.1.0',

  purpose:
    'Compare the starting declared state against later material. Detect drift, contradiction, emergence, and silence without treating any of them as dishonesty.',

  coreRule:
    'People often describe one state at the beginning and then reveal a different state through later entries. The sorter detects that difference. It does not assign motive.',


  // ── Baseline Role ─────────────────────────────────────────

  baselineRole: {
    description:
      'The first declared map of the situation. The most complete self-account available at the start. Not truth — declared state.',
    notStatic:
      'The baseline is not a fixed reference to check compliance against. It is the starting position. Later material may legitimately update it.',
    notOnboarding:
      'The baseline is not a form to fill. It is the most honest account the person can give at the time of writing.',
  },


  // ── Comparison Output Types ───────────────────────────────

  outputTypes: [
    {
      key:   'baseline_pressure_still_visible',
      label: 'Baseline pressure still visible',
      desc:  'A pressure named at baseline continues to appear in entries.',
    },
    {
      key:   'baseline_pressure_absent',
      label: 'Baseline pressure absent from current entries',
      desc:  'A pressure named at baseline has not appeared in entries. Cannot distinguish resolved, avoided, or not written about without more material.',
    },
    {
      key:   'stated_skill_not_demonstrated',
      label: 'Baseline skill stated but not demonstrated',
      desc:  'A capability claimed at baseline has not appeared in entry behaviour.',
    },
    {
      key:   'new_gap_emerging',
      label: 'New gap emerging after baseline',
      desc:  'Something not mentioned at baseline is now appearing in entries as a pressure or gap.',
    },
    {
      key:   'baseline_issue_possibly_resolved',
      label: 'Baseline issue possibly resolved',
      desc:  'A concern from baseline has not reappeared and entries suggest forward movement in that area.',
    },
    {
      key:   'baseline_issue_possibly_avoided',
      label: 'Baseline issue possibly avoided',
      desc:  'A concern from baseline has not reappeared but no resolution language is visible either.',
    },
    {
      key:   'baseline_issue_not_written_about',
      label: 'Baseline issue not written about',
      desc:  'Topic has disappeared from entries. No signal either way.',
    },
    {
      key:   'direction_missing',
      label: 'Direction missing at baseline',
      desc:  'No direction was stated at baseline. The map is reading movement without a destination.',
    },
    {
      key:   'direction_emerging',
      label: 'Direction now emerging',
      desc:  'Direction absent at baseline is now appearing in entries.',
    },
  ],


  // ── Reading Rules ─────────────────────────────────────────

  readingRules: {
    silence:
      'Silence on a topic after baseline does not mean resolution. It may mean resolved, avoided, or simply not written about. State the ambiguity — do not resolve it.',
    absence:
      'Absence of a stated skill in entries does not mean the skill is gone. It may mean the conditions for it have not arisen. Read absence as a gap in evidence, not a gap in capability.',
    contradiction:
      'When baseline and entries contradict, the entries carry more weight — they are more recent and more specific. Name the contradiction without assigning cause.',
    emergence:
      'New material appearing in entries that was absent at baseline is an emerging signal. Treat with appropriate confidence based on Behaviour 01 independent counting.',
  },


  // ── Correction Interaction ────────────────────────────────

  correctionInteraction:
    'If a correction marks baseline material as stale, that signal should be downgraded or suppressed in comparison. Apply corrections before running the baseline comparison pass.',


  // ── What This Prevents ────────────────────────────────────

  prevents: [
    'Treating the baseline as static truth.',
    'Treating later entries without their baseline context.',
    'Missing state drift over time.',
    'Missing declared capability that never appears in action.',
    'Missing new material that was absent at the start.',
  ],


  // ── Failure Modes ─────────────────────────────────────────

  failureModes: [
    'Over-reading silence as resolution.',
    'Over-reading absence as avoidance.',
    'Bad regex coverage producing false open gaps.',
    'Treating vague baseline material as strong evidence.',
    'Failing to apply corrections before comparison.',
  ],


  // ── Boundary ──────────────────────────────────────────────

  boundary:
    'Do not treat baseline mismatch as deception. It may reflect new information, changed conditions, avoidance, shame, poor initial wording, or incomplete first capture. The sorter reports the mismatch — not the motive.',


  // ── Test Cases ────────────────────────────────────────────

  testCases: [
    {
      id:       'BLM-01',
      input:    'Baseline names a pressure. No later entries mention it.',
      expected: 'Report cannot distinguish resolved, avoided, or not written about. State the ambiguity.',
    },
    {
      id:       'BLM-02',
      input:    'Baseline says "I keep a routine." Entries never show routine.',
      expected: 'Stated skill not yet demonstrated.',
    },
    {
      id:       'BLM-03',
      input:    'Baseline does not mention family. Later entries repeatedly mention family pressure.',
      expected: 'Emerging signal — new gap after baseline.',
    },
    {
      id:       'BLM-04',
      input:    'Baseline says "money is not an issue." Later entries repeatedly show financial strain.',
      expected: 'Contradiction or emerging pressure depending on wording.',
    },
    {
      id:       'BLM-05',
      input:    'User correction says "that was old, not current."',
      expected: 'Baseline signal marked stale or suppressed.',
    },
  ],

};
