// ══════════════════════════════════════════════════════════
// SORTER GUIDE — S.T.E.M. Lab Evidence / Method Validation v0.1.0
//
// Optional second-ring S.T.E.M. sub-guide.
// Parent: guide-stem-base
//
// Attach order:
//   1. SorterSpine.attachGuide(GuideSTEMBase);
//   2. SorterSpine.attachGuide(GuideSTEMLabEvidence);
//
// Role:
//   Steer STEM reads toward lab evidence readiness,
//   method validity, calibration status, repeatability,
//   sample handling, chain of evidence, test boundary,
//   result interpretation, and claim discipline.
//
// Boundary:
//   This guide does not certify a lab method.
//   It does not replace accredited laboratory procedure,
//   quality systems, regulatory requirements, scientific peer
//   review, qualified technical judgement, or formal validation.
//   It helps structure the evidence-readiness read.
// ══════════════════════════════════════════════════════════

const GuideSTEMLabEvidence = {

  id:      'guide-stem-lab-evidence',
  version: '0.1.0',
  type:    'subsector',
  parent:  'guide-stem-base',
  sector:  'stem-lab-evidence',

  purpose:
    'Extend the S.T.E.M. base guide for laboratory evidence, test-readiness, method validation, calibration, repeatability, sample handling, result interpretation, and bounded technical claims.',

  sectorNotes: {

    distinctivePressures: [
      'A test result is treated as proof beyond the method boundary.',
      'A method is used before validation, calibration, or repeatability is clear.',
      'A sample result is extended to a batch, asset, product family, population, or environment without support.',
      'Instrument output is trusted without calibration, uncertainty, detection limit, or quality-control context.',
      'A lab report exists but does not carry the claim being made from it.',
      'Time-sensitive samples, reagents, calibrations, or conditions may have expired or drifted.',
      'A single result is treated as stable without replicate, control, or repeat evidence.',
      'A summary, graph, screenshot, or exported table is treated as primary evidence.',
      'A failed or anomalous result is explained away without a documented basis.',
      'Commercial, project, or release pressure compresses uncertainty into a clean answer.',
    ],

    distinctiveMovement: [
      'The test question is stated precisely.',
      'The sample, batch, asset, product, or condition under test is identified.',
      'The method and version are named.',
      'Calibration and instrument status are visible.',
      'Controls, blanks, standards, replicates, or QC checks are identified.',
      'Detection limit, uncertainty, tolerance, or acceptance criteria are stated.',
      'Sample handling, storage, timing, or chain of custody is described where relevant.',
      'Result-to-claim mapping is explicit.',
      'Anomalies, exclusions, and failed runs are not hidden.',
      'The output distinguishes observation, interpretation, and reliance claim.',
    ],

    distinctiveGaps: [
      'Test question not stated.',
      'Sample identity or condition not defined.',
      'Method, version, or protocol not named.',
      'Calibration status not visible.',
      'Controls, blanks, standards, or replicates not described.',
      'Acceptance criteria not stated.',
      'Detection limits or uncertainty not visible.',
      'Sample handling or timing not described.',
      'Result interpretation exceeds method boundary.',
      'Qualified authority or accreditation boundary not stated.',
    ],

    outputAudience:
      'Lab technician, scientist, engineer, QA reviewer, method developer, product reviewer, technical auditor, procurement reviewer, release reviewer, or governance reviewer.',

    outputRegister:
      'Precise. Method-bound. Evidence-readiness focused. No false certainty. No claim expansion beyond sample, method, calibration, and acceptance boundary.',
  },


  // ── Gaps ─────────────────────────────────────────────────

  gaps: [
    {
      key:  'test_question',
      name: 'Test question',
      rx:   /\b(test question|we need to know|the question is|testing whether|purpose of test|objective|what we are testing|hypothesis|analysis objective)\b/i,
      reason:
        'The map needs the exact question before it can assess whether the method and result answer it.',
    },
    {
      key:  'sample_identity',
      name: 'Sample identity',
      rx:   /\b(sample|specimen|batch|lot|asset|component|coupon|cell|material|product|unit under test|UUT|sample ID|serial|variant)\b/i,
      reason:
        'The result must attach to a defined sample, batch, asset, or unit. Without identity, result-to-claim mapping is weak.',
    },
    {
      key:  'sample_condition',
      name: 'Sample condition',
      rx:   /\b(condition|storage|handling|age|temperature|humidity|preparation|contamination|transport|chain of custody|as received|preconditioned|exposed|degraded)\b/i,
      reason:
        'Sample condition affects what the result means. Handling, storage, age, exposure, or contamination can change the evidence value.',
    },
    {
      key:  'method_identity',
      name: 'Method identity',
      rx:   /\b(method|protocol|procedure|standard operating procedure|SOP|test method|method version|assay|workflow|test standard|analysis method)\b/i,
      reason:
        'The map needs the method and version. A result without a method boundary cannot be read safely.',
    },
    {
      key:  'method_validation',
      name: 'Method validation status',
      rx:   /\b(validated|validation|verified method|method verification|qualification|fit for purpose|not validated|development method|screening method|research use only)\b/i,
      reason:
        'A validated method and an exploratory method do not carry the same claim weight. Method status must remain visible.',
    },
    {
      key:  'instrument_calibration',
      name: 'Instrument calibration status',
      rx:   /\b(calibration|calibrated|instrument status|calibration due|calibration expired|standard curve|reference standard|traceable standard|instrument check|maintenance record)\b/i,
      reason:
        'Instrument output depends on calibration and status. Without calibration context, confidence must be capped.',
    },
    {
      key:  'controls_and_qc',
      name: 'Controls and quality checks',
      rx:   /\b(control|blank|standard|reference|positive control|negative control|QC|quality control|check sample|spike|recovery|duplicate|replicate|control chart)\b/i,
      reason:
        'Controls and QC show whether the method behaved as expected during the run.',
    },
    {
      key:  'replicates_repeatability',
      name: 'Replicates or repeatability',
      rx:   /\b(replicate|duplicate|repeat|repeatability|reproducibility|precision|run again|second run|n=|triplicate|inter-lab|intra-lab)\b/i,
      reason:
        'A single result may be too thin for a strong claim. Replicate or repeat evidence improves confidence.',
    },
    {
      key:  'acceptance_criteria',
      name: 'Acceptance criteria',
      rx:   /\b(acceptance criteria|pass fail|threshold|limit|tolerance|specification|within spec|out of spec|criterion|criteria|allowable|decision limit)\b/i,
      reason:
        'A result needs criteria before it can support pass/fail, readiness, release, or compliance-adjacent language.',
    },
    {
      key:  'uncertainty_detection_limit',
      name: 'Uncertainty, sensitivity, or detection limit',
      rx:   /\b(uncertainty|confidence interval|error margin|LOD|LOQ|detection limit|sensitivity|specificity|resolution|noise floor|measurement error|precision)\b/i,
      reason:
        'Measurement uncertainty and detection limits determine what the result can and cannot support.',
    },
    {
      key:  'raw_data_or_primary_record',
      name: 'Raw data or primary record',
      rx:   /\b(raw data|primary record|instrument file|chromatogram|spectrum|image file|log file|notebook|ELN|audit trail|source data|original data)\b/i,
      reason:
        'Primary records carry more weight than summaries, screenshots, or copied tables. Evidence lineage matters.',
    },
    {
      key:  'anomaly_or_exclusion',
      name: 'Anomalies, exclusions, or failed runs',
      rx:   /\b(anomaly|outlier|failed run|excluded|discarded|invalid run|repeat because|contamination|drift|unexpected|deviation|nonconformance|investigation)\b/i,
      reason:
        'Anomalies and exclusions must be visible. A clean report that hides failed runs or exclusions weakens confidence.',
    },
    {
      key:  'result_to_claim_mapping',
      name: 'Result-to-claim mapping',
      rx:   /\b(this result shows|supports the claim|does not prove|result means|interpretation|claim supported|evidence for|cannot conclude|only supports|limited to)\b/i,
      reason:
        'The map must know what claim is being made from the result. Data alone is not the same as a reliance claim.',
    },
    {
      key:  'timing_or_expiry',
      name: 'Timing, expiry, or validity window',
      rx:   /\b(expiry|valid until|calibration due|sample age|holding time|stability window|test date|run date|review date|time-sensitive|shelf life|retest)\b/i,
      reason:
        'Lab confidence can decay with sample age, reagent expiry, calibration status, or validity window.',
    },
    {
      key:  'qualified_boundary',
      name: 'Qualified lab or authority boundary',
      rx:   /\b(accredited|ISO 17025|qualified analyst|lab manager|QA approval|regulator|certification|formal validation|technical sign-off|peer review|competent authority)\b/i,
      reason:
        'The map must not imply accreditation, formal validation, regulatory approval, or qualified sign-off. Boundaries must remain visible.',
    },
    {
      key:  'direction',
      name: 'Stated lab-evidence decision',
      rx:   /\b(can we rely|is this valid|is this enough|should we retest|release based on|accept the result|reject the result|needs validation|what evidence is missing|decision from this test)\b/i,
      reason:
        'The map needs the decision being made from the lab evidence: accept, reject, retest, validate, release, investigate, or withhold confidence.',
    },
  ],


  // ── Skills / Capabilities visible in material ─────────────

  skills: [
    {
      key:              'method_boundary_setting',
      name:             'Setting method boundary',
      rx:               /\b(method only shows|limited to this method|fit for purpose|method boundary|does not prove|only valid for|screening only|confirmatory method|required confirmation)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:
        'The user states what the method can and cannot support.',
      breaks:
        'The result is treated as proof beyond the method boundary.',
    },
    {
      key:              'calibration_checking',
      name:             'Checking calibration and instrument status',
      rx:               /\b(calibration checked|instrument calibrated|standard curve accepted|reference standard passed|instrument check passed|calibration valid|maintenance current)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:
        'Calibration and instrument status are checked before the result is relied upon.',
      breaks:
        'Instrument output is trusted without calibration or status context.',
    },
    {
      key:              'qc_reading',
      name:             'Reading controls and QC',
      rx:               /\b(control passed|blank clean|standard passed|QC passed|recovery within|duplicate matched|control chart|quality check passed|QC failed)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:
        'Controls and QC are used to judge whether the run behaved properly.',
      breaks:
        'The sample result is read without checking whether controls, blanks, standards, or QC behaved correctly.',
    },
    {
      key:              'repeatability_checking',
      name:             'Checking repeatability',
      rx:               /\b(repeated|replicate|duplicate|same result|repeatability|reproducible|confirmed on second run|triplicate|inter-lab|intra-lab)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:
        'The result is checked for repeatability or reproducibility where claim strength requires it.',
      breaks:
        'A single result is treated as stable evidence without enough repeat support.',
    },
    {
      key:              'anomaly_visibility',
      name:             'Making anomalies visible',
      rx:               /\b(anomaly noted|outlier investigated|failed run disclosed|deviation recorded|exclusion justified|nonconformance logged|investigation opened)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:
        'Anomalies, exclusions, deviations, and failed runs are recorded and carried forward.',
      breaks:
        'Uncomfortable or messy run details are removed from the evidence picture.',
    },
    {
      key:              'result_claim_discipline',
      name:             'Mapping result to claim',
      rx:               /\b(result supports|does not support|cannot conclude|only shows|evidence for|claim limited|interpretation limited|not enough evidence|confidence withheld)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:
        'The result is tied to a bounded claim and does not expand beyond it.',
      breaks:
        'The output moves from result to broad conclusion without showing the bridge.',
    },
    {
      key:              'retest_or_investigation_decision',
      name:             'Calling for retest or investigation',
      rx:               /\b(retest|repeat the test|investigate|method review|deviation investigation|confirmatory test|additional sample|new run|hold decision)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:
        'The reviewer identifies when more evidence is needed before reliance.',
      breaks:
        'A weak or anomalous result is forced into a conclusion because a decision is needed.',
    },
  ],


  // ── Contradictions / Tensions ─────────────────────────────

  contradictions: [
    {
      a: /\b(pass|passed|within spec|valid result|accepted|confirmed|shows|proves|supports)\b/i,
      b: /\b(no calibration|calibration expired|QC failed|control failed|blank contaminated|uncertainty unknown|method not validated|single run)\b/i,
      text:
        'A positive result claim and a method or QC weakness both appear. The result may be real, but confidence must be capped until the method weakness is resolved.',
    },
    {
      a: /\b(sample shows|test shows|result shows|this proves|batch is|product is|asset is)\b/i,
      b: /\b(one sample|single result|not representative|different batch|different condition|not repeated|sample only|limited sample)\b/i,
      text:
        'A broad conclusion and limited sample evidence both appear. The map should keep the claim tied to the sample boundary.',
    },
    {
      a: /\b(validated|accredited|approved method|standard method|ISO|certified lab)\b/i,
      b: /\b(modified method|deviation|different matrix|different condition|outside scope|research use|screening only|not in scope)\b/i,
      text:
        'Formal method confidence and a scope change both appear. Method authority may not transfer if the matrix, condition, or procedure has changed.',
    },
    {
      a: /\b(clean report|summary|graph|screenshot|table|export|briefing|dashboard)\b/i,
      b: /\b(raw data missing|primary record missing|audit trail missing|instrument file not provided|source data unavailable)\b/i,
      text:
        'A clean secondary output and missing primary record both appear. Summaries can be useful, but primary data absence weakens evidence lineage.',
    },
    {
      a: /\b(no issue|normal|stable|acceptable|within tolerance|no concern)\b/i,
      b: /\b(anomaly|outlier|failed run|excluded|deviation|unexpected|repeat failed|investigation)\b/i,
      text:
        'Reassuring interpretation and anomaly evidence both appear. The anomaly must be held, not smoothed away.',
    },
    {
      a: /\b(urgent|need decision|release today|project deadline|commercial deadline|cannot wait)\b/i,
      b: /\b(needs retest|needs validation|awaiting calibration|QC unresolved|sample issue|uncertainty high)\b/i,
      text:
        'Decision pressure and unresolved evidence both appear. Timing pressure does not make the result more admissible.',
    },
  ],


  // ── Direction patterns ────────────────────────────────────

  directionPatterns: [
    {
      rx: /method validation|validated method|method verification|fit for purpose/i,
      label: 'toward method validation or verification',
    },
    {
      rx: /calibration|instrument status|standard curve|reference standard/i,
      label: 'toward calibration or instrument-readiness review',
    },
    {
      rx: /QC|control|blank|standard|replicate|duplicate|recovery/i,
      label: 'toward run-quality review',
    },
    {
      rx: /sample|specimen|batch|lot|chain of custody|handling|storage/i,
      label: 'toward sample evidence review',
    },
    {
      rx: /result|interpretation|claim|supports|does not prove|cannot conclude/i,
      label: 'toward result-to-claim mapping',
    },
    {
      rx: /retest|repeat|confirmatory|investigate|deviation|nonconformance/i,
      label: 'toward retest or investigation decision',
    },
    {
      rx: /release|procurement|acceptance|reject|approve|decision/i,
      label: 'toward decision-use evidence readiness',
    },
  ],


  // ── Steer blocks ──────────────────────────────────────────

  steer: {

    'open-gap-discipline': {
      priorityGaps: [
        'test_question',
        'direction',
        'sample_identity',
        'sample_condition',
        'method_identity',
        'method_validation',
        'instrument_calibration',
        'controls_and_qc',
        'replicates_repeatability',
        'acceptance_criteria',
        'uncertainty_detection_limit',
        'raw_data_or_primary_record',
        'anomaly_or_exclusion',
        'result_to_claim_mapping',
        'timing_or_expiry',
        'qualified_boundary',
      ],
      absenceRules: {
        noResultEqualsClaim:
          'Do not treat a lab result as proof of a broader claim unless result-to-claim mapping is stated.',
        noSummaryAsPrimary:
          'Do not treat screenshots, summaries, graphs, or exported tables as primary evidence when raw data or source records matter.',
        methodBoundaryFirst:
          'If method identity, validation status, calibration, or QC is missing, confidence must be capped.',
        noAccreditationLeap:
          'Do not convert a structured evidence read into accredited method approval, regulatory approval, or qualified sign-off.',
      },
    },

    'confidence-calibration': {
      sectorNote:
        'Lab evidence confidence attaches to the sample, method, calibration state, QC result, uncertainty, timing, and stated claim. It does not transfer automatically to wider batches, products, populations, or operating conditions.',
      confidenceTiers: [
        {
          key: 'not_readable',
          desc: 'Test question, sample identity, method identity, or result-to-claim mapping is missing.',
        },
        {
          key: 'inferred',
          desc: 'A lab result appears relevant, but the method boundary or primary evidence is not directly stated.',
        },
        {
          key: 'thin',
          desc: 'A result exists, but calibration, QC, replicates, uncertainty, or method status is weak.',
        },
        {
          key: 'partial',
          desc: 'Some method and evidence information is visible, but important confidence gaps remain.',
        },
        {
          key: 'supported',
          desc: 'The result is mapped to a bounded claim with method, calibration, QC, and sample context visible.',
        },
        {
          key: 'strong',
          desc: 'Multiple evidence controls support the bounded claim: validated method, current calibration, passing QC, repeatability, visible uncertainty, and primary records.',
        },
      ],
    },

    'external-constraint-reading': {
      defaultConstraintRx: /\b(holding time|sample expiry|calibration due|reagent expiry|project deadline|release deadline|QA approval|accreditation|regulatory|chain of custody|lab capacity|turnaround time)\b/i,
      constraintTypes: [
        {
          key: 'sample_timing',
          label: 'Sample timing or holding-time constraint',
          rx: /\b(holding time|sample expiry|sample age|stability window|storage time|time-sensitive)\b/i,
          changeable: false,
        },
        {
          key: 'calibration_or_reagent_expiry',
          label: 'Calibration or reagent expiry constraint',
          rx: /\b(calibration due|calibration expired|reagent expiry|standard expired|instrument maintenance due)\b/i,
          changeable: true,
        },
        {
          key: 'qa_or_authority',
          label: 'QA, accreditation, or authority boundary',
          rx: /\b(QA approval|lab manager|accredited|ISO 17025|regulator|technical sign-off|qualified analyst|formal validation)\b/i,
          changeable: false,
        },
        {
          key: 'decision_deadline',
          label: 'Decision or release deadline',
          rx: /\b(project deadline|release deadline|procurement deadline|turnaround time|urgent decision|cannot wait)\b/i,
          changeable: false,
        },
      ],
    },

    'load-sensitive-capability': {
      defaultLoadSignals: [
        {
          key: 'method_load',
          rx: /\b(method not validated|modified method|outside scope|screening only|research use|fit for purpose unknown)\b/i,
        },
        {
          key: 'instrument_load',
          rx: /\b(calibration expired|instrument drift|standard curve failed|maintenance overdue|reference standard issue|noise floor)\b/i,
        },
        {
          key: 'sample_load',
          rx: /\b(sample age|storage issue|contamination|chain of custody|handling issue|matrix effect|degraded sample)\b/i,
        },
        {
          key: 'run_quality_load',
          rx: /\b(QC failed|control failed|blank contaminated|outlier|failed run|deviation|nonconformance)\b/i,
        },
        {
          key: 'decision_pressure_load',
          rx: /\b(urgent|deadline|release pressure|project pressure|commercial pressure|turnaround)\b/i,
        },
      ],
      sectorNote:
        'Lab evidence load often comes from method weakness, instrument uncertainty, sample condition, run-quality issues, and decision pressure. Read them together before confidence is granted.',
    },

    'movement-non-movement-reading': {
      movementEvidence: [
        'Test question stated.',
        'Sample identity defined.',
        'Method and version named.',
        'Method validation status stated.',
        'Calibration status confirmed.',
        'Controls and QC checked.',
        'Replicates or repeatability addressed.',
        'Acceptance criteria stated.',
        'Uncertainty or detection limit stated.',
        'Primary record identified.',
        'Anomalies or exclusions disclosed.',
        'Result mapped to bounded claim.',
        'Qualified boundary stated.',
      ],
      defaultActionRx: /\b(defined|identified|validated|verified|calibrated|checked|controlled|replicated|repeated|accepted|rejected|mapped|disclosed|investigated|retested|withheld confidence)\b/i,
      defaultStuckRx: /\b(unclear method|no calibration|QC missing|not repeated|sample unknown|raw data missing|result unclear|not validated|unresolved anomaly|needs retest)\b/i,
    },

    'contradiction-holding': {
      outputRules: {
        holdResultAndMethod:
          'Hold the result and method limits together. A result without method support is not enough for reliance.',
        holdSampleAndClaim:
          'Hold sample boundary and claim boundary together. Do not let one sample become proof for a wider population without evidence.',
        holdAnomalyVisible:
          'Anomalies, exclusions, failed runs, and deviations must remain visible even if the final result appears clean.',
        noLabAuthorityLeap:
          'Do not turn a structured read into accredited lab approval, regulatory conclusion, or formal validation.',
      },
    },

    'next-useful-move': {
      outputShape: {
        move:
          'One bounded lab-evidence next move: identify the method/version, confirm calibration, check QC, request primary data, repeat the test, disclose anomaly, or map the result to the exact claim.',
        rationale:
          'State why this move changes evidence admissibility. Do not provide formal lab sign-off unless the user supplies qualified authority material.',
      },
    },

    'state-change-detection': {
      minimumSeparationDays: 1,
      watchFor: [
        'Calibration moving from current to expired.',
        'Sample exceeding holding time.',
        'Method moving from development to validated status.',
        'QC failure triggering retest or investigation.',
        'Anomaly being resolved or remaining open.',
        'Result claim expanding beyond sample boundary.',
        'Decision deadline advancing before evidence gaps close.',
      ],
    },

    'connections-across-time': {
      minimumSeparationDays: 1,
      watchPatterns: [
        'same method issue recurring across runs',
        'same instrument drift recurring after calibration',
        'QC issues repeated across batches',
        'single-result claims repeatedly used for wider batches',
        'summaries used in place of primary records',
        'deadline pressure overriding retest need',
        'anomalies explained away without investigation',
      ],
    },

    'meta-reading': {
      performanceSignals: [
        {
          key: 'result_as_proof_language',
          rx: /\b(proves|confirmed|definitive|no doubt|clearly shows|fully validated|guaranteed|conclusive)\b/i,
        },
        {
          key: 'document_presence_confidence',
          rx: /\b(report exists|data available|graph shows|table shows|screenshot|dashboard|summary says)\b/i,
        },
        {
          key: 'deadline_pressure_language',
          rx: /\b(need answer now|cannot wait|deadline|release today|project depends on|commercial pressure)\b/i,
        },
      ],
      honestySignals: [
        {
          key: 'bounded_lab_language',
          rx: /\b(only supports|cannot conclude|needs retest|method limit|uncertainty|detection limit|QC issue|sample boundary|confidence limited)\b/i,
        },
        {
          key: 'primary_evidence_awareness',
          rx: /\b(raw data|primary record|instrument file|audit trail|source data|method version|calibration record)\b/i,
        },
      ],
      sectorNote:
        'In lab contexts, watch for certainty created by clean reports, strong verbs, and deadline pressure. Prefer method-bound, sample-bound, QC-aware language.',
    },

  },

};