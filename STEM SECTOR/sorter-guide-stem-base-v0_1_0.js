// ══════════════════════════════════════════════════════════
// SORTER GUIDE — S.T.E.M. Base  v0.1.0
//
// Optional first-ring sector guide.
// This guide does NOT become the B & G spine.
// It provides shared STEM steering for technical, scientific,
// engineering, lab, evidence, asset, release, and reliability
// contexts.
//
// Attach with:
//   SorterSpine.attachGuide(GuideSTEMBase);
//
// Role:
//   - steer STEM reads toward claim/evidence/burden/constraint logic
//   - expose missing evidence and unsupported confidence
//   - preserve boundary between review support and qualified authority
//   - supply base patterns for later sub-guides:
//
//     GuideSTEMRobotics
//     GuideSTEMAssetIntegrity
//     GuideSTEMBatteryTransition
//     GuideSTEMCodeRelease
//     GuideSTEMLabEvidence
//     GuideSTEMTechnicalProcurement
//     GuideSTEMFailurePath
//     GuideSTEMBurdenObserver
//
// Boundary:
//   This guide does not certify, diagnose, approve, sign off,
//   validate compliance, replace engineering judgement, or decide safety.
// ══════════════════════════════════════════════════════════

const GuideSTEMBase = {

  id:      'guide-stem-base',
  version: '0.1.0',
  type:    'sector',
  parent:  null,
  sector:  'stem',

  purpose:
    'Steer sorter behaviours toward STEM conditions — technical claims, evidence lineage, hidden burden, operating constraints, admissibility gaps, timing windows, and the difference between supported confidence and inherited confidence.',

  sectorNotes: {

    distinctivePressures: [
      'A technical claim being relied on before the evidence base is clear.',
      'Evidence from one configuration being applied to another.',
      'A system appearing functional while hidden burden accumulates.',
      'A release, test, deployment, or operation moving faster than verification.',
      'A safety, reliability, or compliance claim being treated as settled by language rather than evidence.',
      'A protective action that may arrive too late for the hazard window.',
      'Legacy evidence being reused after system, configuration, context, or burden has changed.',
      'Surface recovery being mistaken for true recovery.',
      'A model, inspection, or test result being stretched beyond its valid boundary.',
    ],

    distinctiveMovement: [
      'The technical claim is stated precisely.',
      'The assessment boundary is defined.',
      'The evidence pack is identified and mapped to the claim.',
      'Configuration, version, model, operating envelope, or test condition is clarified.',
      'Hidden burden, drift, or degradation is made visible.',
      'A missing test, source, certificate, log, or inspection item is named.',
      'Uncertainty is carried forward rather than hidden.',
      'A readiness or admissibility status is bounded by evidence.',
      'A next evidence request is identified.',
      'A false-confidence pathway is interrupted.',
    ],

    distinctiveGaps: [
      'The exact technical claim is not stated.',
      'The assessment unit is unclear.',
      'The operating envelope is not defined.',
      'Evidence is missing, stale, indirect, self-certified, or inherited.',
      'Configuration applicability is not shown.',
      'Hidden burden or accumulated load is not described.',
      'Timing window or hazard window is not defined.',
      'The consequence of relying on the claim is not visible.',
      'The boundary between review support and qualified authority is not stated.',
    ],

    outputAudience:
      'Engineer, scientist, lab user, technical operator, reliability reviewer, release manager, procurement reviewer, asset owner, or governance reviewer.',

    outputRegister:
      'Precise. Evidence-bound. Calm. Technical but readable. No certification language. No false certainty. No motivational filler.',
  },


  // ── Gaps ─────────────────────────────────────────────────

  gaps: [
    {
      key:  'technical_claim',
      name: 'Technical claim stated',
      rx:   /\b(the claim is|we claim|this means|it shows|the system can|the asset is|the product is|the result proves|the evidence supports|the release is|the model shows)\b/i,
      reason:
        'The map needs the exact claim before it can assess evidence. A vague technical concern is not the same as a claim that can carry reliance.',
    },
    {
      key:  'assessment_boundary',
      name: 'Assessment boundary',
      rx:   /\b(scope|boundary|under these conditions|for this configuration|this version|this model|this test case|operating envelope|use case|assessment unit|limited to)\b/i,
      reason:
        'STEM confidence depends on boundary. Without scope, the map cannot tell whether evidence applies to the actual system, configuration, release, or decision.',
    },
    {
      key:  'evidence_pack',
      name: 'Evidence pack',
      rx:   /\b(test report|certificate|inspection|log|scan|review note|datasheet|manual|telemetry|measurement|audit|evidence|source document|validation|calibration|record)\b/i,
      reason:
        'A technical claim without an evidence pack is not ready for reliance. The map must know what evidence exists and what each item supports.',
    },
    {
      key:  'evidence_lineage',
      name: 'Evidence lineage',
      rx:   /\b(original source|primary source|third-party|independent|self-certified|vendor supplied|manufacturer statement|derived from|summary of|based on|same family|similar model|previous version)\b/i,
      reason:
        'Evidence lineage determines how much weight the claim can carry. Borrowed, indirect, self-certified, or inherited evidence must remain visible.',
    },
    {
      key:  'configuration_applicability',
      name: 'Configuration applicability',
      rx:   /\b(configuration|variant|model number|firmware|version|module count|installed arrangement|paired with|assembled system|test condition|operating condition|actual setup)\b/i,
      reason:
        'Evidence for one configuration may not apply to another. The map needs to know whether the evidence matches the actual configuration being relied on.',
    },
    {
      key:  'operating_envelope',
      name: 'Operating envelope',
      rx:   /\b(speed|load|temperature|pressure|voltage|current|duty cycle|runtime|payload|capacity|throughput|environment|range|limit|envelope|rating)\b/i,
      reason:
        'A system may be admissible in one operating envelope and inadmissible in another. The map cannot read technical readiness without the intended operating conditions.',
    },
    {
      key:  'hidden_burden',
      name: 'Hidden burden or accumulated load',
      rx:   /\b(hidden burden|burden|fatigue|wear|drift|stress|heat|vibration|load accumulation|degradation|aging|strain|contamination|thermal|false recovery|reset|cooldown)\b/i,
      reason:
        'Surface operation does not prove the system is free of burden. The map needs any evidence of accumulated load, degradation, drift, or false recovery.',
    },
    {
      key:  'timing_window',
      name: 'Timing or hazard window',
      rx:   /\b(window|deadline|hazard duration|exposure time|before|after|transition period|expiry|review interval|time horizon|response time|switching time|lead time)\b/i,
      reason:
        'Some protections, releases, reviews, or interventions are only useful if they occur inside the relevant window. Timing must be explicit.',
    },
    {
      key:  'qualified_authority_boundary',
      name: 'Qualified authority boundary',
      rx:   /\b(engineer sign off|certification|approval|regulator|qualified|clinician|legal|safety case|compliance|statutory|professional judgement|formal review)\b/i,
      reason:
        'The map must not imply it can replace qualified authority. Where sign-off, certification, approval, or professional judgement is required, the boundary must be named.',
    },
    {
      key:  'direction',
      name: 'Stated technical purpose',
      rx:   /\b(the purpose is|we need to|the goal is|we are trying to|the decision is|the job is|we want to know|the question is|this tool is for)\b/i,
      reason:
        'Without the technical purpose, the map cannot decide which evidence gaps matter most or what output shape is useful.',
    },
  ],


  // ── Skills / Capabilities visible in material ─────────────

  skills: [
    {
      key:              'claim_boundary_setting',
      name:             'Setting the claim boundary',
      rx:               /\b(limited to|only applies|under these conditions|not claiming|within scope|out of scope|does not prove|cannot conclude|boundary is|the claim is limited)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:
        'The user or reviewer states exactly what the technical claim does and does not cover.',
      breaks:
        'The claim expands beyond the evidence because the boundary is not stated or is treated as obvious.',
    },
    {
      key:              'evidence_mapping',
      name:             'Mapping evidence to claim',
      rx:               /\b(this evidence supports|the test shows|the certificate covers|the report applies to|mapped to|evidence for|supports this part|does not cover|traceable to)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:
        'Each evidence item is tied to the specific claim, configuration, condition, or decision it supports.',
      breaks:
        'Evidence exists but is not mapped. The presence of documents is mistaken for proof.',
    },
    {
      key:              'gap_naming',
      name:             'Naming technical gaps',
      rx:               /\b(missing|not provided|unclear|unknown|not tested|not measured|not verified|gap|insufficient|not enough evidence|needs clarification)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:
        'The user names what is missing rather than filling it with inference.',
      breaks:
        'Unknowns are smoothed over because the output wants to sound complete.',
    },
    {
      key:              'burden_visibility',
      name:             'Making hidden burden visible',
      rx:               /\b(wear|fatigue|thermal load|vibration|drift|stress|burden|degradation|false recovery|reset history|duty cycle|strain|aging|accumulated)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:
        'The material recognises accumulated burden or degradation that may not appear in surface status.',
      breaks:
        'The system is treated as healthy because it still runs, resets, passes, or produces output.',
    },
    {
      key:              'admissibility_discipline',
      name:             'Withholding confidence until admissible',
      rx:               /\b(not admissible|conditional|provisional|withhold confidence|not ready|needs evidence|cannot rely|insufficient for reliance|confidence should be withheld|not decision-grade)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:
        'The reviewer withholds confidence until evidence, boundary, timing, and authority conditions are clear.',
      breaks:
        'The decision proceeds because the language sounds strong, not because the evidence is sufficient.',
    },
    {
      key:              'timing_window_reading',
      name:             'Reading timing windows',
      rx:               /\b(response time|switching time|deadline|expiry|window closes|hazard window|review interval|before it|too late|within the window|time horizon)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:
        'The material connects action, protection, review, or evidence collection to the window in which it is useful.',
      breaks:
        'A protection, clarification, review, or release gate is treated as useful even if it arrives too late.',
    },
  ],


  // ── Contradictions / Tensions ─────────────────────────────

  contradictions: [
    {
      a: /\b(approved|certified|validated|ready|safe|passed|green|cleared|released|accepted|compliant)\b/i,
      b: /\b(missing|unclear|not tested|not verified|outdated|expired|similar model|previous version|self-certified|not independent|unknown)\b/i,
      text:
        'A confident readiness or approval claim and an evidence gap both appear. The map must hold both. The confidence claim may be inherited, conditional, or unsupported until the evidence gap is resolved.',
    },
    {
      a: /\b(running|working|operational|green status|reset|fault cleared|back online|cycle completed|passed the run)\b/i,
      b: /\b(wear|burden|thermal|vibration|fatigue|drift|strain|degradation|false recovery|repeat fault|reset history|overload)\b/i,
      text:
        'Surface operation and hidden burden both appear. The system may be functioning while becoming less admissible. Visible recovery should not be treated as true recovery without burden evidence.',
    },
    {
      a: /\b(same family|similar product|similar model|same supplier|same platform|same design|based on the previous|like the old)\b/i,
      b: /\b(different configuration|different model|changed version|new firmware|different environment|different duty|different installation|different operating condition)\b/i,
      text:
        'Similarity and material difference both appear. Confidence may be inherited from a related case but not earned for the actual case unless the differences are reconciled.',
    },
    {
      a: /\b(we can protect|the protection will|safety function|backup|failsafe|cooling|shutdown|relief|derate|switch)\b/i,
      b: /\b(too late|response time|window|delay|lag|not fast enough|hazard duration|exposure time|switching time|deadline)\b/i,
      text:
        'A protective function and a timing concern both appear. Protection is not admissible if it cannot act inside the useful window.',
    },
    {
      a: /\b(strong evidence|good history|historically safe|long record|decades|known safe|validated history)\b/i,
      b: /\b(minor signal|small penalty|low severity|non-blocking|noise|weak signal|thin evidence|small deviation)\b/i,
      text:
        'Strong historical evidence and weak non-blocking signals both appear. The map should not allow weak low-severity signals to erase hard-won operational history unless a blocking threshold is crossed.',
    },
  ],


  // ── Direction patterns ────────────────────────────────────

  directionPatterns: [
    {
      rx: /release|deploy|merge|ship|go live|production/i,
      label: 'toward technical release or deployment',
    },
    {
      rx: /certify|approve|comply|standard|listing|regulation|safety requirement/i,
      label: 'toward compliance or certification readiness',
    },
    {
      rx: /maintain|repair|inspect|replace|reline|service|condition monitoring/i,
      label: 'toward maintenance or asset integrity decision',
    },
    {
      rx: /test|validate|measure|calibrate|verify|evidence pack|lab/i,
      label: 'toward test or evidence readiness',
    },
    {
      rx: /procure|supplier|vendor|tender|contract|buy|approve supplier/i,
      label: 'toward technical procurement or supplier reliance',
    },
    {
      rx: /failure path|degradation|propagation|breach|arrest|divert|consequence/i,
      label: 'toward failure-path or degradation review',
    },
    {
      rx: /burden|load|duty cycle|hidden stress|false recovery|derate|relief/i,
      label: 'toward burden-aware operation',
    },
  ],


  // ── Steer blocks ──────────────────────────────────────────

  steer: {

    'open-gap-discipline': {
      priorityGaps: [
        'technical_claim',
        'assessment_boundary',
        'evidence_pack',
        'evidence_lineage',
        'configuration_applicability',
        'operating_envelope',
        'hidden_burden',
        'timing_window',
        'qualified_authority_boundary',
        'direction',
      ],
      absenceRules: {
        noInvention:
          'Do not fill missing technical evidence with inference. Name the missing evidence.',
        noAuthorityLeap:
          'Do not convert a structured read into certification, approval, safety sign-off, or professional judgement.',
        configurationMatters:
          'Evidence must apply to the actual configuration, version, operating envelope, and claim being relied on.',
      },
    },

    'confidence-calibration': {
      confidenceTiers: [
        {
          key: 'not_readable',
          desc: 'Material is too thin or missing the core claim/evidence boundary.',
        },
        {
          key: 'inferred',
          desc: 'Pattern suggests a possible read, but the material does not state it directly.',
        },
        {
          key: 'thin',
          desc: 'One or two signals appear, but not enough for technical reliance.',
        },
        {
          key: 'partial',
          desc: 'Some evidence and boundary are visible, but important gaps remain.',
        },
        {
          key: 'supported',
          desc: 'Evidence, boundary, and claim are aligned enough for bounded review output.',
        },
        {
          key: 'strong',
          desc: 'Multiple independent evidence signals support the bounded claim inside the stated scope.',
        },
      ],
      sectorNote:
        'In STEM contexts, confidence must attach to the bounded claim, not to the system as a whole. A strong read in one configuration does not transfer automatically to another.',
    },

    'external-constraint-reading': {
      defaultConstraintRx: /\b(deadline|standard|regulation|certification|approval|budget|shutdown|inspection window|test availability|qualified engineer|supplier response|lead time|expiry|safety requirement|operating limit|warranty|contract)\b/i,
      constraintTypes: [
        {
          key: 'regulatory_or_standard',
          label: 'Regulatory, standards, or certification constraint',
          rx: /\b(standard|regulation|certification|approval|listing|compliance|statutory|regulator)\b/i,
          changeable: false,
        },
        {
          key: 'evidence_access',
          label: 'Evidence access constraint',
          rx: /\b(not provided|supplier has not|waiting for|cannot access|missing report|test unavailable|records unavailable)\b/i,
          changeable: true,
        },
        {
          key: 'timing_window',
          label: 'Timing window constraint',
          rx: /\b(deadline|expiry|window|before|after|review interval|time horizon|shutdown window|hazard duration)\b/i,
          changeable: false,
        },
        {
          key: 'operating_limit',
          label: 'Operating limit constraint',
          rx: /\b(speed|load|temperature|pressure|voltage|current|capacity|rating|duty cycle|payload|environment)\b/i,
          changeable: false,
        },
      ],
    },

    'load-sensitive-capability': {
      defaultLoadSignals: [
        {
          key: 'hidden_burden',
          rx: /\b(hidden burden|burden|wear|fatigue|thermal|vibration|strain|drift|degradation|aging|stress accumulation)\b/i,
        },
        {
          key: 'false_recovery',
          rx: /\b(reset|fault cleared|back online|green status|cooled down|returned to normal|false recovery|recovered but|still showing)\b/i,
        },
        {
          key: 'duty_pressure',
          rx: /\b(duty cycle|continuous operation|high load|throughput pressure|production pressure|next shift|runtime|under load)\b/i,
        },
        {
          key: 'evidence_pressure',
          rx: /\b(stale evidence|legacy|inherited confidence|self-certified|same family|similar model|old report|expired|not independent)\b/i,
        },
        {
          key: 'timing_pressure',
          rx: /\b(window closing|deadline|too late|response time|switching time|hazard window|expiry|transition period)\b/i,
        },
      ],
      sectorNote:
        'STEM capability under load must distinguish present function from sustained admissibility. A system can perform now while becoming less admissible under accumulated burden.',
    },

    'movement-non-movement-reading': {
      movementEvidence: [
        'Technical claim narrowed.',
        'Assessment boundary defined.',
        'Evidence item mapped to claim.',
        'Configuration applicability clarified.',
        'Operating envelope stated.',
        'Hidden burden made visible.',
        'Timing window named.',
        'Missing evidence requested.',
        'Qualified authority boundary stated.',
        'Unsupported confidence withheld.',
      ],
      defaultActionRx: /\b(defined|mapped|verified|tested|measured|requested|clarified|bounded|documented|reviewed|validated|calibrated|inspected|checked|withheld confidence)\b/i,
      defaultStuckRx: /\b(still unclear|not provided|same gap|not tested|not verified|no evidence|still missing|waiting on|not mapped|unresolved|unknown)\b/i,
    },

    'contradiction-holding': {
      outputRules: {
        holdBoth:
          'In STEM contexts, do not resolve tension by choosing the more reassuring side. Hold the confidence claim and the evidence gap together.',
        evidenceAnchor:
          'Specific evidence gaps are usually more reliable than general readiness language.',
        noSafetyLeap:
          'Do not turn an unresolved tension into a safety, compliance, or release conclusion.',
      },
    },

    'next-useful-move': {
      outputShape: {
        move:
          'One evidence, boundary, timing, or authority clarification that would most improve the technical read.',
        rationale:
          'Explain why this missing item matters for admissibility. Do not provide a full engineering plan unless requested.',
      },
    },

    'meta-reading': {
      performanceSignals: [
        {
          key: 'confidence_language',
          rx: /\b(obviously|clearly|fully validated|industry leading|proven|guaranteed|safe|certified|approved|no risk|ready to go)\b/i,
        },
        {
          key: 'document_presence_as_proof',
          rx: /\b(we have documents|there is a certificate|the report exists|it is listed|it has paperwork|documentation is available)\b/i,
        },
      ],
      honestySignals: [
        {
          key: 'bounded_confidence',
          rx: /\b(this only shows|we cannot conclude|not enough evidence|limited to|conditional on|requires verification|needs review|do not yet know)\b/i,
        },
      ],
      sectorNote:
        'Watch for technical confidence being created by language, document presence, or institutional momentum rather than mapped evidence.',
    },

  },

};