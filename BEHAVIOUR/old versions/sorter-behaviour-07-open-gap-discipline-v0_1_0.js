// ══════════════════════════════════════════════════════════
// SORTER BEHAVIOUR — 07  Open Gap Discipline  v0.1.0
// Portable sorter primitive. Self-contained config.
// No engine code here. No domain assumptions.
//
// Purpose: keep missing information visible instead of
// filling it with guesses. A disciplined sorter must be
// allowed to say it does not have enough material.
// Open gaps are not errors — they are part of the map.
// ══════════════════════════════════════════════════════════

const BehaviourOpenGapDiscipline = {

  id:       'open-gap-discipline',
  name:     'Open Gap Discipline',
  version:  '0.1.0',

  purpose:
    'Keep missing information visible. A gap in material is a gap on the map — not an invitation to invent.',

  coreRule:
    'The sorter must be allowed to say: "I do not have enough material to read this." Open gaps are not errors. They are part of the map.',


  // ── Gap Status Types ──────────────────────────────────────

  gapStatusTypes: [
    {
      key:   'open',
      label: 'Open gap',
      desc:  'No signal detected. Required material absent.',
    },
    {
      key:   'thin',
      label: 'Thin gap',
      desc:  'One brief mention only. Insufficient to read as present.',
    },
    {
      key:   'corrected',
      label: 'Corrected gap',
      desc:  'Gap suppressed by user correction — user has indicated this topic is not applicable.',
    },
    {
      key:   'stale',
      label: 'Stale gap',
      desc:  'Material was present in an earlier period but has not reappeared.',
    },
    {
      key:   'current',
      label: 'Current gap',
      desc:  'Gap is active in the current report window.',
    },
    {
      key:   'filled',
      label: 'Gap filled by later entries',
      desc:  'Required material was absent at baseline but appeared in entries.',
    },
    {
      key:   'unresolved',
      label: 'Gap remains unresolved',
      desc:  'Multiple periods have passed and gap has not been addressed.',
    },
    {
      key:   'blocks_assessment',
      label: 'Gap blocks fit/misfit assessment',
      desc:  'A required gap is preventing the sorter from completing a key section of the map.',
    },
  ],


  // ── Gap Definition Shape ──────────────────────────────────
  // Deployments supply their own gap definitions.

  gapDefinitionShape: {
    key:    'Unique identifier for this gap.',
    rx:     'Regex pattern — if matched, the gap is considered addressed.',
    name:   'Human-readable name for the gap.',
    reason: 'Why this gap matters. What the map cannot read without it.',
  },


  // ── Absence Rules ─────────────────────────────────────────

  absenceRules: {
    noInvention:
      'Absence of material is never filled with inference, assumption, or guess.',
    noNegativeJudgement:
      'Absence of information is not a negative signal about the person. It is a gap in the map only.',
    negationCheck:
      'A negated mention must not count as gap filled. "I do not have a routine" is not the same as a routine being described.',
    thinMention:
      'A thin mention must not be treated as a resolved gap. One brief reference is a thin gap, not a filled one.',
    tooManyGaps:
      'If many gaps are open simultaneously, prioritise the most blocking ones for output. Do not overwhelm the report.',
  },


  // ── What This Prevents ────────────────────────────────────

  prevents: [
    'Invention — creating content not supported by the material.',
    'False confidence in an incomplete map.',
    'Over-reading from thin material.',
    'Advice without basis.',
    'Fit or misfit claims without sufficient direction.',
    'Professional handover with missing essentials hidden.',
  ],


  // ── Failure Modes ─────────────────────────────────────────

  failureModes: [
    'Gap detection regex too narrow — misses genuine fills.',
    'Gap detection regex too broad — marks filled gaps as open.',
    'Negated mention treated as gap filled.',
    'Gap reappears after it was corrected.',
    'Thin mention treated as resolved.',
    'Too many open gaps overwhelm the report output.',
  ],


  // ── Boundary ──────────────────────────────────────────────

  boundary:
    'Do not hide gaps to make the report feel complete. Do not turn absence into a negative judgement. A gap means the sorter does not have enough material — nothing more.',


  // ── Test Cases ────────────────────────────────────────────

  testCases: [
    {
      id:       'OGD-01',
      input:    'No direction or goal stated anywhere.',
      expected: 'Open direction gap.',
    },
    {
      id:       'OGD-02',
      input:    'One brief mention of "I want work."',
      expected: 'Thin gap or weak direction signal depending on detail.',
    },
    {
      id:       'OGD-03',
      input:    'User says "this is not relevant."',
      expected: 'Gap suppressed or marked corrected if topic matches.',
    },
    {
      id:       'OGD-04',
      input:    'Baseline lacks support network mention. Entries later discuss family support.',
      expected: 'Gap filled by later entries — emerging signal.',
    },
    {
      id:       'OGD-05',
      input:    'Fit/misfit assessment requested with no direction stated.',
      expected: 'Cannot assess fit. Gap blocks assessment.',
    },
  ],

};
