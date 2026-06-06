// ══════════════════════════════════════════════════════════
// SORTER BEHAVIOUR — 12  Confidence Calibration  v0.1.0
// Portable sorter primitive. Self-contained config.
// No engine code here. No domain assumptions.
//
// Purpose: label the map's own certainty explicitly.
// Thin material stays thin. Inference is labelled as
// inference. The map must not present a weak read with
// the same weight as a strong one.
//
// A sorter that cannot express uncertainty is not trustworthy.
// ══════════════════════════════════════════════════════════

const BehaviourConfidenceCalibration = {

  id:       'confidence-calibration',
  name:     'Confidence Calibration',
  version:  '0.1.0',

  purpose:
    'Label the map\'s own certainty explicitly. Thin material stays thin. Inference is labelled as inference. The map does not present a weak read with the same weight as a strong one.',

  coreRule:
    'Every map output has a confidence level. That level is determined by the material — not by the desire to produce a complete-looking report. An incomplete map that knows it is incomplete is more useful than a complete-looking map built on guesses.',


  // ── Confidence Tiers ──────────────────────────────────────

  confidenceTiers: [
    {
      key:    'not_readable',
      label:  'Not readable',
      desc:   'Insufficient material to produce any read. The map must say so.',
      weight: 0,
    },
    {
      key:    'inferred',
      label:  'Inferred',
      desc:   'No direct material. Read is based on absence, pattern, or structural signal. Must be labelled as inference.',
      weight: 1,
    },
    {
      key:    'thin',
      label:  'Thin read',
      desc:   'One or two mentions. Present but not confirmed. Must not be stated as pattern.',
      weight: 2,
    },
    {
      key:    'partial',
      label:  'Partial read',
      desc:   'Material present but incomplete. Read is directional — not definitive.',
      weight: 3,
    },
    {
      key:    'supported',
      label:  'Supported read',
      desc:   'Multiple independent signals across time. Read is reliable within the material.',
      weight: 4,
    },
    {
      key:    'strong',
      label:  'Strong read',
      desc:   'Consistent material across the full period. Read is as reliable as the material allows.',
      weight: 5,
    },
  ],


  // ── Calibration Rules ─────────────────────────────────────

  calibrationRules: {
    neverUpgrade:
      'Confidence must not be upgraded to make output feel more complete. A thin read is a thin read.',
    inferenceLabel:
      'Any output based on absence or structural inference must be explicitly labelled as inferred — not stated as fact.',
    correctionEffect:
      'A user correction marking a signal as primary upgrades confidence one tier. A correction marking stale downgrades to not-readable regardless of prior strength.',
    gapEffect:
      'An open gap in required material caps the confidence of any read that depends on that gap.',
    thinMaterial:
      'A single brief mention produces a thin read at most. It does not confirm a pattern even if the mention is emotionally intense.',
    completenessHonesty:
      'If the map cannot read a section, it must say so. It must not fill the section with hedged language that implies a read exists.',
  },


  // ── Output Labels ─────────────────────────────────────────
  // Applied inline to map output. Not a separate section —
  // each claim carries its own confidence label.

  outputLabels: {
    not_readable: '(not enough material to read)',
    inferred:     '(inferred — not directly stated)',
    thin:         '(thin — one or two mentions only)',
    partial:      '(partial — direction visible, not confirmed)',
    supported:    '(supported across multiple entries)',
    strong:       '(consistent across the period)',
  },


  // ── What This Prevents ────────────────────────────────────

  prevents: [
    'Thin material being presented as confirmed pattern.',
    'Inference being presented as direct evidence.',
    'A complete-looking report built on gaps.',
    'The map overstating its own reliability.',
    'False certainty driving a consequential next move.',
  ],


  // ── Failure Modes ─────────────────────────────────────────

  failureModes: [
    'Confidence labels applied inconsistently across the report.',
    'Inferred reads not distinguished from direct reads.',
    'Correction effects on confidence not propagated.',
    'Gap-capping rule not applied — dependent reads stay high despite open gaps.',
    'Labels present in output but not used by downstream behaviour.',
  ],


  // ── Boundary ──────────────────────────────────────────────

  boundary:
    'Confidence calibration reflects the quality of the material — not the quality of the person. Low confidence is a map state, not a judgement. It means the sorter does not have enough to read, nothing more.',


  // ── Test Cases ────────────────────────────────────────────

  testCases: [
    {
      id:       'CC-01',
      input:    'One brief mention of a pressure.',
      expected: 'Thin read. Must not be stated as pattern.',
    },
    {
      id:       'CC-02',
      input:    'No material on a required topic. Map produces a read anyway.',
      expected: 'Not readable. Map must say so explicitly.',
    },
    {
      id:       'CC-03',
      input:    'Read based on absence of action language.',
      expected: 'Inferred read. Must be labelled as inference.',
    },
    {
      id:       'CC-04',
      input:    'Correction marks topic as primary.',
      expected: 'Confidence upgraded one tier.',
    },
    {
      id:       'CC-05',
      input:    'Open gap in direction. Map produces movement assessment.',
      expected: 'Movement assessment capped — direction gap blocks full read.',
    },
  ],

};
