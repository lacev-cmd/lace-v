// ══════════════════════════════════════════════════════════
// SORTER OUTPUT GUIDES  v0.1.0
//
// Third-ring guides. Type: 'output'.
// These steer how findings are expressed — not what is read.
// They apply last in the composition layer, on top of any
// sector or sub-sector guides already attached.
//
// An output guide does not know the domain.
// It knows who the output is for and what register it needs.
//
// Output guides can be stacked. A sector guide plus a
// low-literacy output guide produces domain-accurate,
// plain-language output.
// ══════════════════════════════════════════════════════════


// ── Output Guide: Plain Language ─────────────────────────
// For any context where the reader may be under stress,
// have lower literacy, or need maximum clarity.

const GuideOutputPlainLanguage = {

  id:      'guide-output-plain-language',
  version: '0.1.0',
  type:    'output',
  parent:  null,
  purpose: 'Steer output toward short sentences, plain words, and maximum clarity. For readers under stress or with lower literacy.',
  sector:  'output-plain-language',

  sectorNotes: {
    distinctivePressures:  [],
    distinctiveMovement:   [],
    distinctiveGaps:       [],
    outputAudience:  'Anyone who needs plain, direct language — not sector-specific.',
    outputRegister:  'Short sentences. Common words. No jargon. One idea per sentence. Active voice.',
  },

  steer: {

    'next-useful-move': {
      outputShape: {
        move:      'One short sentence. Plain words. Tell them what to do next.',
        rationale: 'One sentence only. Say why it matters. No jargon.',
      },
    },

    'open-gap-discipline': {
      absenceRules: {
        noInvention:         'Do not guess. Say what is missing.',
        noNegativeJudgement: 'Missing information is not a problem with the person. It is just missing.',
        negationCheck:       'A sentence saying "I do not have X" does not mean X is present.',
        thinMention:         'One brief mention is not enough. Say it is not yet clear.',
        tooManyGaps:         'Show the most important gap only. Not a long list.',
      },
    },

    'contradiction-holding': {
      outputRules: {
        nameOnly:      'Say what the two things are. Do not explain why.',
        noMotive:      'Do not say why the contradiction is there.',
        bothReal:      'Both things can be true. Say that.',
        correction:    'If the person has explained it, use their explanation.',
        evidenceFirst: 'The specific thing is more reliable than the general thing.',
      },
    },

  },

};


// ── Output Guide: Professional Handover ──────────────────
// For structured output to be read by a professional —
// clinician, lawyer, case worker, assessor.

const GuideOutputProfessionalHandover = {

  id:      'guide-output-professional-handover',
  version: '0.1.0',
  type:    'output',
  parent:  null,
  purpose: 'Steer output toward structured, evidenced, caveated handover format for professional audiences.',
  sector:  'output-professional-handover',

  sectorNotes: {
    distinctivePressures:  [],
    distinctiveMovement:   [],
    distinctiveGaps:       [],
    outputAudience:  'Clinician, lawyer, social worker, probation officer, assessor, or case manager.',
    outputRegister:  'Structured. Evidenced. Bounded. Caveated. No overclaiming.',
  },

  steer: {

    'private-record-to-optional-handover': {
      requiredCaveats: [
        'Based only on material entered by the person — not independently verified.',
        'Not a diagnosis.',
        'Not a risk score or risk assessment.',
        'Not a legal finding.',
        'Not a compliance assessment.',
        'Not a professional clinical record.',
        'The professional should treat this as context — not as evidence of fact.',
      ],
      handoverOutputTypes: [
        { key: 'current_state',      label: 'Current state',           desc: 'Where things stand now based on the material.' },
        { key: 'what_moved',         label: 'What moved',              desc: 'Evidenced changes across the period.' },
        { key: 'what_stuck',         label: 'What remained stuck',     desc: 'Non-movement and circling patterns.' },
        { key: 'what_under_load',    label: 'What was under load',     desc: 'Pressures and capability breakdown.' },
        { key: 'what_unresolved',    label: 'What remains unresolved', desc: 'Open gaps and active tensions.' },
        { key: 'professional_first', label: 'Most relevant first',     desc: 'The single most important thing for this context.' },
        { key: 'outside_scope',      label: 'Outside scope',           desc: 'What this map does not and cannot tell you.' },
      ],
    },

    'next-useful-move': {
      outputShape: {
        move:      'One bounded recommendation or observation. Tied to evidence in the material.',
        rationale: 'Two to three sentences. State the evidence. State the limit of the read.',
      },
    },

  },

};


// ── Output Guide: Legal Preparation ──────────────────────
// For output that will inform legal preparation or
// be reviewed in a legal context.

const GuideOutputLegalPreparation = {

  id:      'guide-output-legal-preparation',
  version: '0.1.0',
  type:    'output',
  parent:  null,
  purpose: 'Steer output toward precise, bounded language suitable for legal preparation contexts.',
  sector:  'output-legal-preparation',

  sectorNotes: {
    distinctivePressures:  [],
    distinctiveMovement:   [],
    distinctiveGaps:       [],
    outputAudience:  'Solicitor, barrister, legal support worker, or self-representing litigant.',
    outputRegister:  'Precise. Bounded. No overclaiming. Every statement tied to the material it came from.',
  },

  steer: {

    'private-record-to-optional-handover': {
      requiredCaveats: [
        'This output is based solely on material provided by the individual — not independently verified.',
        'It does not constitute legal advice.',
        'It does not constitute evidence of fact.',
        'It should not be used as a substitute for legal professional opinion.',
        'Any factual claims require independent verification before reliance.',
      ],
    },

    'open-gap-discipline': {
      absenceRules: {
        noInvention:         'State only what the material supports. Gaps must be named explicitly.',
        noNegativeJudgement: 'Absence of material is not a finding against the person.',
        negationCheck:       'A denial is not the same as documented evidence to the contrary.',
        thinMention:         'A single brief mention does not constitute a supported position.',
        tooManyGaps:         'Prioritise the gaps most material to the legal question at hand.',
      },
    },

    'contradiction-holding': {
      outputRules: {
        nameOnly:      'Name the tension precisely. Do not resolve it.',
        noMotive:      'Do not attribute cause or intent to the contradiction.',
        bothReal:      'Conflicting material is reported as conflicting — not resolved in either direction.',
        correction:    'Any correction by the person is noted and applied to the read.',
        evidenceFirst: 'Specific documented material takes precedence over general stated position.',
      },
    },

  },

};


// ── Output Guide: Crisis-Adjacent ────────────────────────
// For any context where safety risk may be present.
// Applies safety-aware framing and resource-pointing
// without replacing clinical assessment.

const GuideOutputCrisisAdjacent = {

  id:      'guide-output-crisis-adjacent',
  version: '0.1.0',
  type:    'output',
  parent:  null,
  purpose: 'Steer output toward safety-aware framing. Does not assess risk — surfaces signals and points to appropriate resource.',
  sector:  'output-crisis-adjacent',

  sectorNotes: {
    distinctivePressures:  [],
    distinctiveMovement:   [],
    distinctiveGaps:       [],
    outputAudience:  'Any context where the person may be in or near crisis.',
    outputRegister:  'Calm. Direct. Non-alarming. Safety-first. Resource-pointing. No clinical assessment.',
  },

  steer: {

    'next-useful-move': {
      priorityOrder: [
        {
          rank:      0,
          condition: 'Crisis language detected in entries.',
          move:      'Safety comes first. Name the signal. Point to the right resource.',
          rationale: 'The map cannot assess safety — but it can surface the signal and direct toward appropriate support.',
        },
      ],
      outputShape: {
        move:      'One clear, calm statement. If safety signal present — name it and point to resource.',
        rationale: 'Brief. Non-alarming. Direct.',
      },
    },

    'private-record-to-optional-handover': {
      requiredCaveats: [
        'This map does not assess risk.',
        'If there is immediate concern for safety, contact emergency services or a crisis line.',
        'This output is not a substitute for professional clinical assessment.',
      ],
    },

  },

};


// ── Output Guide: Multilingual-Ready ─────────────────────
// Structures output for clean translation — short units,
// no idiom, no cultural assumption.

const GuideOutputMultilingualReady = {

  id:      'guide-output-multilingual-ready',
  version: '0.1.0',
  type:    'output',
  parent:  null,
  purpose: 'Structure output for clean translation — short units, no idiom, no cultural assumption.',
  sector:  'output-multilingual-ready',

  sectorNotes: {
    distinctivePressures:  [],
    distinctiveMovement:   [],
    distinctiveGaps:       [],
    outputAudience:  'Any context where the output will be translated or read by a non-native speaker.',
    outputRegister:  'Short units. No idiom. No cultural assumption. One idea per sentence. Universally clear.',
  },

  steer: {

    'next-useful-move': {
      outputShape: {
        move:      'One short sentence. No idiom. Plain verb. Clear subject.',
        rationale: 'Two sentences maximum. No figurative language. State the reason directly.',
      },
    },

    'open-gap-discipline': {
      absenceRules: {
        noInvention:         'Say only what is in the material.',
        noNegativeJudgement: 'Missing information is not a judgement.',
        negationCheck:       'Check for negation before marking something as present.',
        thinMention:         'One mention is not enough to confirm.',
        tooManyGaps:         'Show the most important gap. One at a time.',
      },
    },

  },

};
