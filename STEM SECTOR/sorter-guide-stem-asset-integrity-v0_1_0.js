// ══════════════════════════════════════════════════════════
// SORTER GUIDE — S.T.E.M. Asset Integrity / Failure Path v0.1.0
//
// Optional second-ring S.T.E.M. sub-guide.
// Parent: guide-stem-base
//
// Attach order:
//   1. SorterSpine.attachGuide(GuideSTEMBase);
//   2. SorterSpine.attachGuide(GuideSTEMAssetIntegrity);
//
// Role:
//   Steer STEM reads toward asset integrity, degradation,
//   failure-path review, inspection-to-intervention decisions,
//   path-to-consequence reasoning, resistance/admissibility
//   logic, and uncertainty visibility.
//
// Boundary:
//   This guide does not certify asset safety.
//   It does not replace inspection, NDT, engineering assessment,
//   CFD/FEA, corrosion engineering, materials testing,
//   maintenance authority, environmental/safety management,
//   statutory compliance, or qualified engineering judgement.
//   It helps structure the review.
// ══════════════════════════════════════════════════════════

const GuideSTEMAssetIntegrity = {

  id:      'guide-stem-asset-integrity',
  version: '0.1.0',
  type:    'subsector',
  parent:  'guide-stem-base',
  sector:  'stem-asset-integrity',

  purpose:
    'Extend the S.T.E.M. base guide for asset-integrity and failure-path contexts. The guide distinguishes observed defect, active degradation, path favourability, path admissibility, consequence reach, arrest, diversion, and unresolved uncertainty.',

  sectorNotes: {

    distinctivePressures: [
      'A visible defect is treated as equivalent to failure exposure.',
      'Broad condition rating hides the governing path to consequence.',
      'Inspection finds local damage but not where the damage may travel next.',
      'A model identifies a high-risk region but does not show path admissibility.',
      'Maintenance decisions are made from alarm, reassurance, or broad wear concern rather than path status.',
      'Evidence from one asset, segment, material, or operating regime is inherited into another.',
      'A repair, liner, coating, weld, patch, or local material change creates a new path question.',
      'A degradation mechanism is assumed active without evidence it can continue.',
      'Intervention is scoped too broadly or too narrowly because the governing path is unclear.',
      'Uncertainty is hidden inside a generic risk rating.',
    ],

    distinctiveMovement: [
      'The asset and segment under review are defined.',
      'The observed defect or degradation source is identified.',
      'The consequence or target condition is stated.',
      'The degradation mechanism is named.',
      'Resistance factors are made visible.',
      'Local admissibility criteria are stated.',
      'Inspection, modelling, operating, material, and maintenance evidence are mapped.',
      'Path status is classified: reaches consequence, diverts, remains open, arrests, is blocked, or unresolved.',
      'Uncertainty is carried forward rather than converted into confidence.',
      'The next evidence or intervention action is bounded.',
    ],

    distinctiveGaps: [
      'Asset or segment not defined.',
      'Observed defect/source condition not described.',
      'Target consequence not stated.',
      'Degradation mechanism not named.',
      'Resistance field or governing local factors not visible.',
      'Admissibility criteria not stated.',
      'Inspection or modelling evidence not mapped to the path question.',
      'Material condition or operating envelope not described.',
      'Path outcome not classified.',
      'Qualified engineering boundary not stated.',
    ],

    outputAudience:
      'Engineer, reliability reviewer, maintenance planner, asset owner, inspector, operations manager, insurer, risk reviewer, or technical governance reviewer.',

    outputRegister:
      'Precise. Physical-path focused. Evidence-bound. No safety certification language. No unsupported remaining-life claims. No false precision.',
  },


  // ── Gaps ─────────────────────────────────────────────────

  gaps: [
    {
      key:  'asset_identity',
      name: 'Asset identity',
      rx:   /\b(asset|pipe|pipeline|vessel|tank|cable|joint|bearing|rotor|pump|valve|liner|structure|bridge|robot cell|equipment|component|segment)\b/i,
      reason:
        'The map needs to know what asset or component is being reviewed. Asset class controls which evidence and failure modes matter.',
    },
    {
      key:  'segment_or_domain',
      name: 'Segment or review domain',
      rx:   /\b(segment|section|bend|joint|weld|repair|patch|zone|region|area|component|domain|scope|boundary|location|site)\b/i,
      reason:
        'Failure-path review must be bounded. Whole-asset concern is usually too broad unless a screening layer has already narrowed the domain.',
    },
    {
      key:  'source_condition',
      name: 'Observed source condition',
      rx:   /\b(pit|crack|groove|wear|thinning|corrosion|erosion|defect|delamination|liner damage|deformation|leak|hotspot|partial discharge|vibration anomaly|inspection finding)\b/i,
      reason:
        'The source condition anchors the path. Without a defined source, the map cannot read where degradation may begin or continue.',
    },
    {
      key:  'degradation_mechanism',
      name: 'Degradation mechanism',
      rx:   /\b(corrosion|erosion|erosion-corrosion|fatigue|wear|creep|thermal aging|water treeing|partial discharge|crack growth|delamination|abrasion|chemical attack|mechanical overload)\b/i,
      reason:
        'The mechanism determines admissibility. A path that is credible for one degradation mode may be blocked for another.',
    },
    {
      key:  'target_consequence',
      name: 'Target or consequence condition',
      rx:   /\b(breach|through-wall|failure|rupture|leak|collapse|trip|shutdown|loss of containment|loss of function|liner breach|unsafe condition|critical condition|consequence)\b/i,
      reason:
        'The review needs to know what consequence is being tested. Wear alone is not the same as path-to-consequence exposure.',
    },
    {
      key:  'resistance_factors',
      name: 'Resistance or vulnerability factors',
      rx:   /\b(resistance|hardness|thickness|material property|geometry|stress|pressure|temperature|velocity|flow|chemistry|pH|coating|liner|adhesion|repair quality|load path|barrier)\b/i,
      reason:
        'Path reasoning requires local factors that make degradation easier, harder, blocked, diverted, or arrested.',
    },
    {
      key:  'admissibility_criteria',
      name: 'Local admissibility criteria',
      rx:   /\b(admissible|criterion|criteria|threshold|propagation condition|growth condition|driving force|stress intensity|allowable|limit|activation|continuation|arrest condition)\b/i,
      reason:
        'A low-resistance route is not automatically a real path. The local mechanism must be physically able to continue.',
    },
    {
      key:  'inspection_evidence',
      name: 'Inspection or test evidence',
      rx:   /\b(inspection|NDT|ultrasonic|UT|scan|measurement|thickness map|hardness test|sample|test result|field data|teardown|visual inspection|condition report)\b/i,
      reason:
        'Inspection and test evidence show what is actually observed. The map must know what was measured and what remains unmeasured.',
    },
    {
      key:  'model_or_analysis_evidence',
      name: 'Model or analysis evidence',
      rx:   /\b(model|CFD|FEA|simulation|digital twin|calculation|analysis|wear model|corrosion model|flow model|stress model|finite element|prediction)\b/i,
      reason:
        'Model evidence may inform path reasoning, but model scope, assumptions, calibration, and limits must remain visible.',
    },
    {
      key:  'operating_envelope',
      name: 'Operating envelope',
      rx:   /\b(operating condition|duty|load|pressure|temperature|flow rate|velocity|cycle|runtime|environment|chemistry|slurry|abrasive|humidity|voltage|current|throughput)\b/i,
      reason:
        'Asset integrity depends on the operating envelope. A path may be inactive under one regime and active under another.',
    },
    {
      key:  'path_status',
      name: 'Path status',
      rx:   /\b(reaches|diverts|arrests|blocked|remains open|open path|closed path|governing path|path status|unresolved|path to consequence|failure path)\b/i,
      reason:
        'The output should not stop at general concern. It should identify whether the path reaches consequence, diverts, remains open, arrests, is blocked, or remains unresolved.',
    },
    {
      key:  'intervention_option',
      name: 'Intervention or review option',
      rx:   /\b(repair|replace|reline|monitor|inspect|test further|model further|derate|shutdown|maintenance|intervention|scope|priority|watch|review)\b/i,
      reason:
        'The map should connect the path read to a bounded next action: inspect, repair, monitor, model, derate, replace, or withhold confidence.',
    },
    {
      key:  'qualified_boundary',
      name: 'Qualified engineering boundary',
      rx:   /\b(qualified engineer|site engineer|maintenance authority|integrity engineer|regulator|certification|safety case|professional judgement|engineering sign-off|statutory|compliance)\b/i,
      reason:
        'Asset-integrity outputs must not imply engineering sign-off, safety approval, or regulatory compliance. Qualified authority boundaries must remain visible.',
    },
    {
      key:  'direction',
      name: 'Stated asset-integrity question',
      rx:   /\b(can this fail|will it breach|where will it go|what path|should we repair|should we replace|should we inspect|is this credible|what governs|what matters most|what evidence is missing)\b/i,
      reason:
        'The map needs the actual decision question: path credibility, intervention priority, monitoring, repair scope, replacement timing, or evidence gap.',
    },
  ],


  // ── Skills / Capabilities visible in material ─────────────

  skills: [
    {
      key:              'path_question_setting',
      name:             'Setting the path question',
      rx:               /\b(path question|path to|can it reach|will it propagate|from source to|target condition|governing path|review question|consequence path)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:
        'The review asks whether a defined degradation path can reach a defined consequence.',
      breaks:
        'The assessment stays at broad wear, condition, or risk rating without asking what path governs.',
    },
    {
      key:              'source_to_consequence_mapping',
      name:             'Mapping source to consequence',
      rx:               /\b(from the pit to|from the crack to|from the defect to|toward breach|toward failure|source condition|target condition|route to|path reaches)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:
        'The source condition, likely route, and consequence condition are linked.',
      breaks:
        'A defect is observed but its route to consequence is not assessed.',
    },
    {
      key:              'resistance_field_reasoning',
      name:             'Reading resistance and vulnerability',
      rx:               /\b(low resistance|higher resistance|vulnerable region|hardness|thickness|geometry|stress concentration|flow concentration|weak zone|barrier|repair quality|material condition)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:
        'Local resistance and vulnerability factors are used to explain why a path may travel, divert, or arrest.',
      breaks:
        'The path is assumed to follow the shortest or most visually obvious route without local resistance reasoning.',
    },
    {
      key:              'admissibility_testing',
      name:             'Testing physical admissibility',
      rx:               /\b(admissible path|physically credible|propagation criterion|growth criterion|threshold met|driving force|arrest|blocked|not physically possible|criterion not satisfied)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:
        'The review checks whether the degradation mechanism can physically continue through the proposed route.',
      breaks:
        'A route is accepted because it is plausible-looking, not because the local mechanism can continue.',
    },
    {
      key:              'uncertainty_visibility',
      name:             'Keeping uncertainty visible',
      rx:               /\b(uncertain|unresolved|not enough data|missing inspection|needs testing|assumption|confidence limited|unknown|cannot conclude|evidence gap)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:
        'Uncertainty is named and carried forward rather than hidden inside a confident result.',
      breaks:
        'The review gives a clean conclusion where inputs are weak, stale, or incomplete.',
    },
    {
      key:              'intervention_targeting',
      name:             'Targeting intervention',
      rx:               /\b(targeted repair|focused inspection|prioritise|prioritize|reline this section|monitor this zone|replace this part|inspection priority|repair scope|maintenance timing)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:
        'The path read supports a bounded intervention or evidence request rather than a broad alarm.',
      breaks:
        'Maintenance action is either too broad, too late, or not tied to the governing path.',
    },
  ],


  // ── Contradictions / Tensions ─────────────────────────────

  contradictions: [
    {
      a: /\b(wear|defect|pit|crack|corrosion|erosion|thinning|damage|anomaly|hotspot)\b/i,
      b: /\b(no breach path|arrests|blocked|not propagating|not active|below threshold|not connected|no consequence path)\b/i,
      text:
        'Observed damage and lack of path-to-consequence both appear. Damage is real, but failure exposure may be limited if the path arrests or is blocked.',
    },
    {
      a: /\b(safe|acceptable|low risk|monitor only|no action|fine|stable)\b/i,
      b: /\b(missing data|not inspected|uncertain|unknown|not modelled|not tested|assumption|unresolved)\b/i,
      text:
        'A reassuring conclusion and unresolved evidence gaps both appear. Confidence should be capped until the missing evidence is resolved.',
    },
    {
      a: /\b(high wear|high risk|replace all|urgent repair|critical|severe)\b/i,
      b: /\b(path unclear|no target condition|no admissibility criteria|not mapped|general concern|broad rating)\b/i,
      text:
        'High-concern language and weak path reasoning both appear. The concern may be valid, but intervention scope is weak without a governing path.',
    },
    {
      a: /\b(model shows|simulation predicts|CFD shows|FEA shows|digital twin indicates|calculation shows)\b/i,
      b: /\b(not calibrated|assumption|no inspection match|no field validation|wrong scope|limited model|uncertain inputs)\b/i,
      text:
        'Model confidence and model-limit evidence both appear. The model may be useful, but its assumptions and calibration limits must travel with the output.',
    },
    {
      a: /\b(same asset|same material|same design|same pipe|same line|similar section|historical data)\b/i,
      b: /\b(changed operating condition|new load|different chemistry|different flow|new repair|aged|degraded|different environment|changed duty)\b/i,
      text:
        'Inherited asset confidence and changed operating conditions both appear. Prior safe operation may not carry the present burden without reconciliation.',
    },
    {
      a: /\b(repair|patch|liner|coating|barrier|weld repair|reinforcement|reline)\b/i,
      b: /\b(new weak point|adhesion|edge effect|local vulnerability|repair quality|interface|diverted path|attracts path)\b/i,
      text:
        'A repair or barrier and a possible new path vulnerability both appear. Repair presence does not automatically close the path; it may redirect or concentrate it.',
    },
  ],


  // ── Direction patterns ────────────────────────────────────

  directionPatterns: [
    {
      rx: /path to consequence|failure path|governing path|propagation path/i,
      label: 'toward failure-path review',
    },
    {
      rx: /inspect|inspection|NDT|ultrasonic|scan|measurement/i,
      label: 'toward inspection evidence review',
    },
    {
      rx: /repair|replace|reline|maintenance|intervention|shutdown/i,
      label: 'toward maintenance or intervention decision',
    },
    {
      rx: /model|CFD|FEA|simulation|digital twin|calculation/i,
      label: 'toward model-supported integrity review',
    },
    {
      rx: /corrosion|erosion|fatigue|wear|crack growth|thermal aging|partial discharge/i,
      label: 'toward degradation mechanism review',
    },
    {
      rx: /risk|insurance|governance|audit|decision record|assumption/i,
      label: 'toward governance or assurance review',
    },
  ],


  // ── Steer blocks ──────────────────────────────────────────

  steer: {

    'open-gap-discipline': {
      priorityGaps: [
        'asset_identity',
        'direction',
        'segment_or_domain',
        'source_condition',
        'degradation_mechanism',
        'target_consequence',
        'resistance_factors',
        'admissibility_criteria',
        'inspection_evidence',
        'model_or_analysis_evidence',
        'operating_envelope',
        'path_status',
        'intervention_option',
        'qualified_boundary',
      ],
      absenceRules: {
        noDefectEqualsFailure:
          'Do not treat observed damage as failure exposure unless a credible path to consequence is shown.',
        noModelOracle:
          'Do not treat model output as authority without scope, assumptions, calibration, and input quality.',
        pathStatusRequired:
          'Prefer path-status language over generic risk language: reaches, diverts, open, arrests, blocked, unresolved.',
        noEngineeringSignoff:
          'Do not phrase output as engineering approval, asset safety certification, or remaining-life determination.',
      },
    },

    'confidence-calibration': {
      sectorNote:
        'Asset-integrity confidence attaches to a defined path question, asset segment, source condition, mechanism, evidence base, and operating envelope. It does not attach to the asset generally.',
      confidenceTiers: [
        {
          key: 'not_readable',
          desc: 'Asset, segment, source condition, or consequence target is missing.',
        },
        {
          key: 'inferred',
          desc: 'A possible path is suggested but not directly supported by evidence.',
        },
        {
          key: 'thin',
          desc: 'A defect or concern is visible, but mechanism, path, or evidence quality is weak.',
        },
        {
          key: 'partial',
          desc: 'Some source, mechanism, and evidence are visible, but path status remains incomplete.',
        },
        {
          key: 'supported',
          desc: 'The bounded path question is supported by mapped inspection, model, material, or operating evidence.',
        },
        {
          key: 'strong',
          desc: 'Multiple evidence streams support a bounded path-status conclusion with uncertainty and authority boundaries preserved.',
        },
      ],
    },

    'external-constraint-reading': {
      defaultConstraintRx: /\b(shutdown window|maintenance window|inspection access|production pressure|environmental exposure|safety requirement|regulatory|spare parts|repair crew|downtime|budget|qualified engineer|site authority)\b/i,
      constraintTypes: [
        {
          key: 'inspection_access',
          label: 'Inspection or test access constraint',
          rx: /\b(no access|cannot inspect|inspection window|NDT unavailable|shutdown required|sample unavailable|measurement missing)\b/i,
          changeable: true,
        },
        {
          key: 'production_pressure',
          label: 'Production or availability pressure',
          rx: /\b(production pressure|downtime|shutdown|availability|throughput|must keep running|cannot stop)\b/i,
          changeable: false,
        },
        {
          key: 'environmental_or_safety_exposure',
          label: 'Environmental or safety exposure',
          rx: /\b(environmental|spill|leak|safety|containment|hazard|regulatory exposure|public risk|loss of containment)\b/i,
          changeable: false,
        },
        {
          key: 'qualified_authority',
          label: 'Qualified engineering authority boundary',
          rx: /\b(qualified engineer|site authority|integrity engineer|maintenance authority|regulator|engineering sign-off|statutory)\b/i,
          changeable: false,
        },
      ],
    },

    'load-sensitive-capability': {
      defaultLoadSignals: [
        {
          key: 'degradation_burden',
          rx: /\b(wear|fatigue|corrosion|erosion|thermal aging|partial discharge|crack growth|degradation|thinning|damage accumulation)\b/i,
        },
        {
          key: 'operating_load',
          rx: /\b(pressure|temperature|flow|velocity|load|duty|cycle|runtime|vibration|stress|abrasive|chemistry)\b/i,
        },
        {
          key: 'evidence_load',
          rx: /\b(uncertain|missing inspection|not calibrated|assumption|stale data|inherited evidence|not measured|unknown)\b/i,
        },
        {
          key: 'intervention_pressure',
          rx: /\b(shutdown|repair|replace|maintenance window|production pressure|downtime|budget|urgent)\b/i,
        },
        {
          key: 'path_persistence',
          rx: /\b(recurring|again|persistent|spreading|growing|continues|worsening|trend|not arrested)\b/i,
        },
      ],
      sectorNote:
        'Asset-integrity load should be read as interacting degradation, operating envelope, evidence quality, and intervention timing. A defect under stable load is not the same as a defect under rising burden.',
    },

    'movement-non-movement-reading': {
      movementEvidence: [
        'Asset and segment defined.',
        'Source condition identified.',
        'Target consequence stated.',
        'Degradation mechanism named.',
        'Resistance factors mapped.',
        'Admissibility criteria stated.',
        'Inspection evidence mapped.',
        'Model assumptions bounded.',
        'Operating envelope described.',
        'Path status classified.',
        'Intervention option bounded.',
        'Qualified boundary stated.',
      ],
      defaultActionRx: /\b(defined|identified|mapped|measured|inspected|tested|modelled|modeled|classified|bounded|reviewed|prioritised|prioritized|repaired|monitored|withheld confidence)\b/i,
      defaultStuckRx: /\b(unclear path|not inspected|not measured|unknown mechanism|no target|not mapped|same defect|no data|unresolved|assumption only|general concern)\b/i,
    },

    'contradiction-holding': {
      outputRules: {
        holdDamageAndPath:
          'Hold observed damage and path-to-consequence separately. Damage can be real while consequence path remains unsupported.',
        holdModelAndAssumption:
          'Hold model output and assumptions together. A model result without visible assumptions is not enough for reliance.',
        noGenericRiskCollapse:
          'Do not collapse path status into generic risk. Use path language where possible: reaches, diverts, remains open, arrests, blocked, unresolved.',
        noSafetyConclusion:
          'Do not turn a structured read into proof that the asset is safe or unsafe.',
      },
    },

    'next-useful-move': {
      outputShape: {
        move:
          'One bounded asset-integrity next move: define the source/target path, obtain missing inspection evidence, clarify mechanism, map resistance factors, bound model assumptions, or escalate to qualified review.',
        rationale:
          'State why this move changes path admissibility. Do not produce a full engineering repair plan unless asked.',
      },
    },

    'state-change-detection': {
      minimumSeparationDays: 14,
      watchFor: [
        'Observed defect becoming active degradation.',
        'Path status changing from unresolved to open, arrested, blocked, or consequence-reaching.',
        'Operating envelope changing after prior review.',
        'Inspection evidence confirming or refuting path growth.',
        'Repair changing local vulnerability or path direction.',
        'Model calibration improving or weakening confidence.',
      ],
    },

    'connections-across-time': {
      minimumSeparationDays: 14,
      watchPatterns: [
        'same defect recurring after repair',
        'inspection concern becoming path concern',
        'model concern becoming intervention decision',
        'operating load increase after inherited safe-history claim',
        'broad wear rating masking governing path',
        'repair edge or liner patch attracting degradation path',
        'uncertainty repeatedly converted into reassurance',
      ],
    },

    'meta-reading': {
      performanceSignals: [
        {
          key: 'defect_alarm_language',
          rx: /\b(critical|severe|urgent|catastrophic|will fail|must replace|obvious failure)\b/i,
        },
        {
          key: 'defect_reassurance_language',
          rx: /\b(fine|safe|acceptable|monitor only|not a concern|stable|no issue)\b/i,
        },
        {
          key: 'model_authority_language',
          rx: /\b(model proves|simulation proves|digital twin confirms|calculation proves|CFD proves|FEA proves)\b/i,
        },
      ],
      honestySignals: [
        {
          key: 'bounded_path_language',
          rx: /\b(path remains unresolved|path arrests|path is blocked|path may divert|not enough evidence|confidence limited|requires inspection|not a safety finding)\b/i,
        },
        {
          key: 'evidence_role_awareness',
          rx: /\b(this inspection shows|does not prove|supports only|does not cover|model assumption|calibration limit|source condition|target condition)\b/i,
        },
      ],
      sectorNote:
        'In asset integrity contexts, watch for both alarm theatre and reassurance theatre. Prefer bounded path-status language over broad confidence language.',
    },

  },

};