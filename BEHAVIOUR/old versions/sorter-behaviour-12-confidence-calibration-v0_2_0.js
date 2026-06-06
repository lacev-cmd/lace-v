// ══════════════════════════════════════════════════════════
// SORTER BEHAVIOUR — 12  Confidence Calibration  v0.2.0
// v0.2.0: inferenceLanguageRx and thinMaterialRx added.
// ══════════════════════════════════════════════════════════

const BehaviourConfidenceCalibration = {

  id:       'confidence-calibration',
  name:     'Confidence Calibration',
  version:  '0.2.0',

  purpose:
    'Label the map\'s own certainty explicitly. Thin material stays thin. Inference is labelled as inference.',

  coreRule:
    'Every map output has a confidence level determined by the material — not by the desire to produce a complete-looking report.',

  confidenceTiers: [
    { key: 'not_readable', label: 'Not readable', desc: 'Insufficient material.',          weight: 0 },
    { key: 'inferred',     label: 'Inferred',     desc: 'Based on absence or structure.',  weight: 1 },
    { key: 'thin',         label: 'Thin read',    desc: 'One or two mentions.',             weight: 2 },
    { key: 'partial',      label: 'Partial read', desc: 'Present but incomplete.',          weight: 3 },
    { key: 'supported',    label: 'Supported',    desc: 'Multiple independent signals.',    weight: 4 },
    { key: 'strong',       label: 'Strong read',  desc: 'Consistent across the period.',   weight: 5 },
  ],


  // ── Inference Language ────────────────────────────────────
  // Language that signals the map is inferring rather than
  // reading directly. Must be labelled.

  inferenceLanguageRx: /\b(
    it appears|it seems|it suggests|it may indicate|it could mean|
    this might suggest|this could suggest|this may reflect|
    possibly|probably|likely|presumably|it would seem|
    one reading of this|one interpretation|could be read as|
    in the absence of|given the lack of|without more material|
    based on the pattern rather than direct statement|
    the map reads this as inferred
  )\b/ix,


  // ── Thin Material Signals ─────────────────────────────────
  // Signals that material is insufficient for a strong read.

  thinMaterialRx: /\b(
    one mention|a single mention|mentioned once|brief mention|passing mention|
    only appeared once|only came up once|only one entry|only one instance|
    not enough to|insufficient to|too little to|not yet enough|
    cannot confirm|not confirmed|unconfirmed|not yet a pattern|
    one entry is not enough|a single entry does not|
    the material is sparse|the material is thin|not much to go on
  )\b/ix,


  calibrationRules: {
    neverUpgrade:      'Confidence must not be upgraded to make output feel more complete.',
    inferenceLabel:    'Any output based on absence or structural inference must be explicitly labelled.',
    correctionEffect:  'Primary correction upgrades one tier. Stale correction drops to not-readable.',
    gapEffect:         'An open gap in required material caps confidence of reads that depend on it.',
    thinMaterial:      'A single brief mention produces a thin read at most.',
    completenessHonesty: 'If the map cannot read a section, it must say so.',
  },

  outputLabels: {
    not_readable: '(not enough material to read)',
    inferred:     '(inferred — not directly stated)',
    thin:         '(thin — one or two mentions only)',
    partial:      '(partial — direction visible, not confirmed)',
    supported:    '(supported across multiple entries)',
    strong:       '(consistent across the period)',
  },

  prevents: [
    'Thin material presented as confirmed pattern.',
    'Inference presented as direct evidence.',
    'A complete-looking report built on gaps.',
    'The map overstating its own reliability.',
    'False certainty driving a consequential next move.',
  ],

  failureModes: [
    'Confidence labels applied inconsistently.',
    'Inferred reads not distinguished from direct reads.',
    'Correction effects on confidence not propagated.',
    'Gap-capping rule not applied.',
    'Labels present but not used by downstream behaviour.',
  ],

  boundary:
    'Confidence calibration reflects the quality of the material — not the quality of the person. Low confidence is a map state, not a judgement.',

  testCases: [
    { id: 'CC-01', input: 'One brief mention of a pressure.',                         expected: 'Thin read.' },
    { id: 'CC-02', input: 'No material on a required topic.',                         expected: 'Not readable.' },
    { id: 'CC-03', input: 'Read based on absence of action language.',                expected: 'Inferred — must be labelled.' },
    { id: 'CC-04', input: 'Correction marks topic as primary.',                       expected: 'Confidence upgraded one tier.' },
    { id: 'CC-05', input: 'Open gap in direction. Movement assessment produced.',     expected: 'Movement assessment capped.' },
  ],
};
