// ══════════════════════════════════════════════════════════
// SORTER GUIDE — Medical  v0.3.0
// Steering layer. Self-contained. No engine code here.
// Attach with: SorterSpine.attachGuide(GuideMedical);
//
// v0.3.0 — four domain-knowledge sections added:
//   gaps, skills, contradictions, directionPatterns.
//   These feed directly into the cartridge assembly.
//   All v0.2.0 steers unchanged.
// ══════════════════════════════════════════════════════════

const GuideMedical = {

  id:      'guide-medical',
  version: '0.3.0',
  type:    'sector',
  parent:  null,
  purpose: 'Steer sorter behaviours toward medical-sector conditions — treatment adherence, symptom load, functional movement, and care plan gaps.',
  sector:  'medical',

  sectorNotes: {
    distinctivePressures: [
      'Symptom load affecting daily function.',
      'Treatment side effects competing with treatment benefit.',
      'Appointment access and waiting times.',
      'Diagnosis uncertainty.',
      'Financial impact of condition or treatment.',
      'Carer load if supporting another.',
      'Fear of deterioration or prognosis.',
    ],
    distinctiveMovement: [
      'Appointment attended.',
      'Medication taken as prescribed.',
      'Treatment plan followed.',
      'Symptom reported to clinician.',
      'Lifestyle change implemented.',
      'Test or investigation completed.',
      'Referral accepted and acted on.',
      'Support sought.',
    ],
    distinctiveGaps: [
      'No diagnosis or working diagnosis stated.',
      'Treatment plan not described.',
      'Symptom load not quantified.',
      'Functional impact on daily life not visible.',
      'Clinician relationship not described.',
    ],
    outputAudience:  'Patient, carer, or clinical support worker preparing for appointment or handover.',
    outputRegister:  'Clear. Non-clinical language unless clinical audience specified. Functional focus.',
  },


  // ── Gaps ─────────────────────────────────────────────────

  gaps: [
    {
      key:    'diagnosis',
      name:   'Diagnosis or working diagnosis',
      rx:     /\b(diagnosed|diagnosis|they think it is|working diagnosis|condition is|I have|they found|the results|what it is|I have been told|I have a)\b/i,
      reason: 'Without a named diagnosis or working diagnosis the map cannot assess whether treatment activity is appropriate or whether symptom patterns are significant.',
    },
    {
      key:    'treatment_plan',
      name:   'Treatment plan',
      rx:     /\b(treatment plan|the plan is|they want me to|I have been prescribed|the protocol|my regime|medication|the course|they recommended|I am supposed to)\b/i,
      reason: 'Without a described treatment plan the map cannot read adherence, assess whether movement is on track, or identify where the plan is breaking down.',
    },
    {
      key:    'symptom_load',
      name:   'Symptom load',
      rx:     /\b(pain level|pain is|symptoms|how I feel|my function|I can|I cannot|on a scale|out of ten|better than|worse than|today I)\b/i,
      reason: 'Symptom load is the primary signal for whether the medical situation is stable, improving, or deteriorating. Without it the map is reading activity without knowing whether it is working.',
    },
    {
      key:    'functional_impact',
      name:   'Functional impact on daily life',
      rx:     /\b(I cannot work|I cannot drive|I cannot|it affects my|I have had to stop|I am unable to|my daily|what I can do|my capacity|my function)\b/i,
      reason: 'The gap between medical status and functional capacity is critical. Knowing what the person can and cannot do tells the map more than diagnosis alone.',
    },
    {
      key:    'direction',
      name:   'Stated direction',
      rx:     /\b(I want to|my goal|I am working toward|I hope to|get back to|return to|recover|manage|live with|treatment goal|what I am aiming for)\b/i,
      reason: 'Without a stated direction the map cannot assess whether treatment and management activity is aligned with what the person is actually trying to achieve.',
    },
  ],


  // ── Skills ───────────────────────────────────────────────

  skills: [
    {
      key:              'treatment_adherence',
      name:             'Following the treatment plan',
      rx:               /\b(I took|I attended|I completed|I followed|I did the|I kept the appointment|I had the|I took my medication|I did my exercises|I went to|I maintained)\b/i,
      loadSensitive:    true,
      isStructureSkill: true,
      works:            'Consistently following the prescribed treatment plan — medication, appointments, exercises, and lifestyle requirements.',
      breaks:           'Symptom severity, side effects, fatigue, or practical barriers cause plan adherence to slip — often without the clinician being told.',
    },
    {
      key:              'symptom_reporting',
      name:             'Reporting symptoms honestly',
      rx:               /\b(I told the doctor|I reported|I described|I mentioned|I said to the|I told them|I was honest about|I said how bad|I showed them|I disclosed)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'Describing symptoms accurately to clinicians — including deterioration and what is not improving.',
      breaks:           'Desire not to appear dramatic, or wanting to present as coping, causes minimisation — the clinical picture the team is working from is not accurate.',
    },
    {
      key:              'honest_self_reporting',
      name:             'Honest self-reporting of state',
      rx:               /\b(I have to be honest|the truth is|if I am honest|it is worse than|I have not been|I am behind|I skipped|I missed|I did not do|it is harder than)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'Describing the actual state — pain levels, function, compliance — rather than the version that shows progress.',
      breaks:           'Entries shift toward the optimistic version and the map loses the real picture.',
    },
    {
      key:              'adapting_to_setbacks',
      name:             'Adapting to setbacks',
      rx:               /\b(I adjusted|I modified|I changed the approach|I scaled back|I tried a different|I adapted|I found a way|I worked around|I accepted|I reset|I reassessed)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'Modifying the plan when a setback, flare-up, or slower-than-expected period appears rather than stopping entirely.',
      breaks:           'A setback is treated as a reason to stop rather than adjust — the person disengages from the plan entirely.',
    },
  ],


  // ── Contradictions ────────────────────────────────────────

  contradictions: [
    {
      a:    /\b(I am managing|I am coping|it is under control|I am fine really|I am getting on with it|not that bad|I do not want to make a fuss)\b/i,
      b:    /\b(I cannot|I have had to stop|I skipped|I missed|it is worse|I have not been|the pain|I am not able to|it is affecting|I am behind)\b/i,
      text: 'A stated sense of managing and specific material showing functional difficulty or plan non-adherence both appear. Minimisation in medical contexts is common — the presented picture and the described reality are not matching. The specific functional descriptions are the more reliable read.',
    },
    {
      a:    /\b(I know I should|I need to|I am supposed to|I understand the importance|I know it helps)\b/i,
      b:    /\b(I have not|I missed|I skipped|I did not|I have been avoiding|I keep putting off|I have not done)\b/i,
      text: 'Stated understanding of what is required and consistent non-adherence to those requirements both appear. Knowing what to do and doing it are different things — especially when symptoms, side effects, or fatigue are active. The gap is worth naming without resolving.',
    },
  ],


  // ── Direction Patterns ────────────────────────────────────

  directionPatterns: [
    { rx: /return to work|back to work|working again|back to my job/i,            label: 'toward return to work' },
    { rx: /return to sport|training|compete|play again|back to the gym/i,         label: 'toward return to physical activity' },
    { rx: /manage|live with|cope with|manage the condition|stable/i,              label: 'toward managing the condition' },
    { rx: /recover|full recovery|get better|remission|cure/i,                     label: 'toward recovery or remission' },
    { rx: /quality of life|feel better|function better|more energy|pain free/i,   label: 'toward improved quality of life' },
  ],


  steer: {

    'avoidance-detection': {
      defaultActionRx: /\b(I attended|I took|I followed|I completed|I reported|I told the doctor|I called the clinic|I booked|I went to|I had the|I started|I continued|I measured|I tracked)\b/i,
      notAvoidance: [
        'Waiting for test results before next step.',
        'Delay on medical advice — not yet appropriate to act.',
        'Rest prescribed as part of treatment.',
        'Side effects requiring temporary pause.',
        'Waiting for referral to be processed.',
      ],
    },

    'movement-non-movement-reading': {
      movementEvidence: [
        'Appointment attended.',
        'Medication taken as prescribed.',
        'Prescribed exercise or activity completed.',
        'Symptom change reported to clinician.',
        'Test or scan completed.',
        'Referral followed through.',
        'Lifestyle change implemented and held.',
        'Support resource accessed.',
        'Pain or symptom level tracked and recorded.',
      ],
      defaultStuckRx: /\b(no improvement|same level|not getting better|getting worse|nothing is working|back to where|no change|still the same|no progress|not moving|plateau)\b/i,
    },

    'load-sensitive-capability': {
      defaultLoadSignals: [
        { key: 'pain',    rx: /\b(pain|painful|hurting|flare|bad day|severe|acute|chronic pain|in agony)\b/i },
        { key: 'fatigue', rx: /\b(exhausted|fatigue|no energy|depleted|wiped out|too tired|cannot function)\b/i },
        { key: 'fear',    rx: /\b(scared|frightened|afraid|the prognosis|what it means|what they found|I am worried about)\b/i },
        { key: 'access',  rx: /\b(waiting list|cannot get an appointment|no GP|no referral|too long to wait|the system)\b/i },
        { key: 'carer',   rx: /\b(caring for|looking after|my carer|carer load|I am the carer|no one to help)\b/i },
      ],
    },

    'open-gap-discipline': {
      priorityGaps: [
        'diagnosis',
        'treatment_plan',
        'symptom_load',
        'functional_impact',
        'direction',
      ],
    },

    'confidence-calibration': {
      sectorNote:
        'Medical maps are high-stakes. A map without diagnosis, treatment plan, and symptom load cannot be reliably read. Confidence-gated output applies — supported read minimum before clinical handover. Inferred reads must always be labelled.',
      minimumForHandover: 'supported',
    },

    'state-change-detection': {
      minimumSeparationDays: 14,
      watchFor: [
        'Symptom load reducing across periods.',
        'Functional capacity improving — activity that was not possible is now described.',
        'Treatment adherence improving from absent to present.',
        'New symptom emerging in recent entries not present at baseline.',
        'Functional deterioration — activity present earlier is now absent.',
      ],
    },

    'competing-priorities': {
      costSignals: [
        { key: 'treatment_vs_function', rx: /\b(side effects mean I cannot|the treatment affects my ability to|I have to choose between|treatment is making it hard to|I cannot work because of the treatment)\b/i },
        { key: 'self_vs_carer',         rx: /\b(I am caring for|but I also need to|my own health and their|I put them first|I have not attended to my own)\b/i },
        { key: 'cost_vs_treatment',     rx: /\b(I cannot afford the|the medication costs|I have stopped because of cost|financial barrier to|I have had to stop)\b/i },
      ],
    },

    'external-constraint-reading': {
      defaultConstraintRx: /\b(waiting list|I am on the waiting list|the referral has not come through|I cannot get an appointment|the GP has not|the consultant has not|waiting for results|the system has not|I have not been seen|I need a referral before)\b/i,
      notAvoidance: [
        'On waiting list — genuine access constraint.',
        'Awaiting referral — system constraint.',
        'Test results not yet available — information constraint.',
        'Rest required — medically prescribed pause.',
      ],
    },

    'meta-reading': {
      sectorNote:
        'Medical contexts can produce either minimisation (downplaying symptoms) or amplification (overstating for system reasons). Both affect map reliability. Watch for consistent absence of functional detail alongside either extreme.',
      performanceSignals: [
        {
          key: 'minimisation',
          rx:  /\b(I am fine really|it is not that bad|I am managing|I do not want to make a fuss|I am not one to complain|I am getting on with it|nothing serious)\b/i,
        },
      ],
    },

  },

};
