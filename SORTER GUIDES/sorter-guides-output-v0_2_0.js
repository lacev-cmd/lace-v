// ══════════════════════════════════════════════════════════
// SORTER OUTPUT GUIDES  v0.2.0
//
// Third-ring guides. Type: 'output'.
//
// v0.2.0: confidence-calibration steering added to
// professional handover, legal prep, and crisis-adjacent.
// All output guides now enforce confidence labelling.
// Core steer blocks unchanged from v0.1.0.
// ══════════════════════════════════════════════════════════


// ── Output Guide: Plain Language ─────────────────────────

const GuideOutputPlainLanguage = {
  id: 'guide-output-plain-language', version: '0.2.0', type: 'output', parent: null,
  purpose: 'Steer output toward short sentences, plain words, and maximum clarity.',
  sector:  'output-plain-language',
  sectorNotes: { distinctivePressures: [], distinctiveMovement: [], distinctiveGaps: [], outputAudience: 'Anyone needing plain direct language.', outputRegister: 'Short sentences. Common words. No jargon. Active voice.' },
  steer: {
    'next-useful-move': {
      outputShape: { move: 'One short sentence. Plain words. Tell them what to do next.', rationale: 'One sentence only. Say why it matters. No jargon.' },
    },
    'open-gap-discipline': {
      absenceRules: { noInvention: 'Do not guess. Say what is missing.', noNegativeJudgement: 'Missing information is not a problem with the person.', negationCheck: 'A sentence saying "I do not have X" does not mean X is present.', thinMention: 'One brief mention is not enough.', tooManyGaps: 'Show the most important gap only.' },
    },
    'contradiction-holding': {
      outputRules: { nameOnly: 'Say what the two things are. Do not explain why.', noMotive: 'Do not say why the contradiction is there.', bothReal: 'Both things can be true. Say that.', correction: 'If the person has explained it, use their explanation.', evidenceFirst: 'The specific thing is more reliable than the general thing.' },
    },
    'confidence-calibration': {
      outputLabels: {
        not_readable: 'Not enough information to say.',
        inferred:     'This is a guess — it is not directly stated.',
        thin:         'Only mentioned once or twice — not yet confirmed.',
        partial:      'Some information here but not the full picture.',
        supported:    'This appears in several entries.',
        strong:       'This is consistent throughout.',
      },
    },
  },
};


// ── Output Guide: Professional Handover ──────────────────

const GuideOutputProfessionalHandover = {
  id: 'guide-output-professional-handover', version: '0.2.0', type: 'output', parent: null,
  purpose: 'Steer output toward structured, evidenced, caveated handover format for professional audiences.',
  sector:  'output-professional-handover',
  sectorNotes: { distinctivePressures: [], distinctiveMovement: [], distinctiveGaps: [], outputAudience: 'Clinician, lawyer, social worker, probation officer, assessor, or case manager.', outputRegister: 'Structured. Evidenced. Bounded. Caveated. No overclaiming.' },
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
        { key: 'confidence_note',    label: 'Map confidence',          desc: 'How reliable this map is — what is well-evidenced and what is thin.' },
      ],
    },
    'next-useful-move': {
      outputShape: { move: 'One bounded recommendation or observation. Tied to evidence in the material.', rationale: 'Two to three sentences. State the evidence. State the limit of the read.' },
    },
    // ── Confidence labelling required in professional handover ──
    'confidence-calibration': {
      outputLabels: {
        not_readable: '(insufficient material — not readable)',
        inferred:     '(inferred from pattern — not directly stated)',
        thin:         '(thin — one or two mentions only)',
        partial:      '(partial — direction visible, not confirmed)',
        supported:    '(supported across multiple independent entries)',
        strong:       '(consistent and well-evidenced across the period)',
      },
      requiredInHandover: true,
      sectorNote: 'Every substantive claim in a professional handover must carry its confidence label. A handover that omits confidence labels is incomplete and must not be used for consequential decisions.',
    },
  },
};


// ── Output Guide: Legal Preparation ──────────────────────

const GuideOutputLegalPreparation = {
  id: 'guide-output-legal-preparation', version: '0.2.0', type: 'output', parent: null,
  purpose: 'Steer output toward precise, bounded language suitable for legal preparation contexts.',
  sector:  'output-legal-preparation',
  sectorNotes: { distinctivePressures: [], distinctiveMovement: [], distinctiveGaps: [], outputAudience: 'Solicitor, barrister, legal support worker, or self-representing litigant.', outputRegister: 'Precise. Bounded. No overclaiming. Every statement tied to its source.' },
  steer: {
    'private-record-to-optional-handover': {
      requiredCaveats: [
        'Based solely on material provided by the individual — not independently verified.',
        'Does not constitute legal advice.',
        'Does not constitute evidence of fact.',
        'Should not substitute for legal professional opinion.',
        'Any factual claims require independent verification before reliance.',
      ],
    },
    'open-gap-discipline': {
      absenceRules: { noInvention: 'State only what the material supports. Gaps must be named explicitly.', noNegativeJudgement: 'Absence of material is not a finding against the person.', negationCheck: 'A denial is not the same as documented evidence to the contrary.', thinMention: 'A single brief mention does not constitute a supported position.', tooManyGaps: 'Prioritise gaps most material to the legal question.' },
    },
    'contradiction-holding': {
      outputRules: { nameOnly: 'Name the tension precisely. Do not resolve it.', noMotive: 'Do not attribute cause or intent.', bothReal: 'Conflicting material is reported as conflicting.', correction: 'Any correction by the person is noted and applied.', evidenceFirst: 'Specific documented material takes precedence over general stated position.' },
    },
    'confidence-calibration': {
      outputLabels: {
        not_readable: '(no material to read — not stated)',
        inferred:     '(inferred — not directly documented)',
        thin:         '(thin — one or two references only)',
        partial:      '(partial — some material present, not fully documented)',
        supported:    '(supported across multiple independent references)',
        strong:       '(consistently documented across the period)',
      },
      requiredInHandover: true,
      sectorNote: 'Legal preparation output must label confidence on every substantive claim. Unsupported claims presented without confidence labels create liability.',
    },
  },
};


// ── Output Guide: Crisis-Adjacent ────────────────────────

const GuideOutputCrisisAdjacent = {
  id: 'guide-output-crisis-adjacent', version: '0.2.0', type: 'output', parent: null,
  purpose: 'Steer output toward safety-aware framing. Does not assess risk — surfaces signals and points to appropriate resource.',
  sector:  'output-crisis-adjacent',
  sectorNotes: { distinctivePressures: [], distinctiveMovement: [], distinctiveGaps: [], outputAudience: 'Any context where the person may be in or near crisis.', outputRegister: 'Calm. Direct. Non-alarming. Safety-first. Resource-pointing. No clinical assessment.' },
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
      outputShape: { move: 'One clear, calm statement. If safety signal present — name it and point to resource.', rationale: 'Brief. Non-alarming. Direct.' },
    },
    'private-record-to-optional-handover': {
      requiredCaveats: [
        'This map does not assess risk.',
        'If there is immediate concern for safety, contact emergency services or a crisis line.',
        'This output is not a substitute for professional clinical assessment.',
      ],
    },
    'confidence-calibration': {
      sectorNote: 'In crisis-adjacent contexts, confidence must be stated on every output. A thin or inferred read must never drive a consequential safety decision. Surface the signal and route to human.',
      requiredInHandover: true,
    },
  },
};


// ── Output Guide: Multilingual-Ready ─────────────────────

const GuideOutputMultilingualReady = {
  id: 'guide-output-multilingual-ready', version: '0.2.0', type: 'output', parent: null,
  purpose: 'Structure output for clean translation — short units, no idiom, no cultural assumption.',
  sector:  'output-multilingual-ready',
  sectorNotes: { distinctivePressures: [], distinctiveMovement: [], distinctiveGaps: [], outputAudience: 'Any context where output will be translated or read by a non-native speaker.', outputRegister: 'Short units. No idiom. No cultural assumption. One idea per sentence.' },
  steer: {
    'next-useful-move': {
      outputShape: { move: 'One short sentence. No idiom. Plain verb. Clear subject.', rationale: 'Two sentences maximum. No figurative language. State the reason directly.' },
    },
    'open-gap-discipline': {
      absenceRules: { noInvention: 'Say only what is in the material.', noNegativeJudgement: 'Missing information is not a judgement.', negationCheck: 'Check for negation before marking something as present.', thinMention: 'One mention is not enough to confirm.', tooManyGaps: 'Show the most important gap. One at a time.' },
    },
    'confidence-calibration': {
      outputLabels: {
        not_readable: '(not enough information)',
        inferred:     '(this is inferred — not stated directly)',
        thin:         '(mentioned once or twice only)',
        partial:      '(some information — not complete)',
        supported:    '(appears in several entries)',
        strong:       '(consistent throughout)',
      },
    },
  },
};
