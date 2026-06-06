// ══════════════════════════════════════════════════════════
// SORTER GUIDE — Mental Health  v0.1.0
// Steering layer. Self-contained. No engine code here.
// Attach with: SorterSpine.attachGuide(GuideMentalHealth);
//
// v0.1.0 — initial build.
//   gaps, skills, contradictions, directionPatterns,
//   pressureSignals, steer block.
// ══════════════════════════════════════════════════════════

const GuideMentalHealth = {

  id:      'guide-mental-health',
  version: '0.1.0',
  type:    'sector',
  parent:  null,
  purpose: 'Steer sorter behaviours toward mental health conditions — functional capacity, symptom load, treatment engagement, and the gap between how someone presents and how they are actually functioning.',
  sector:  'mental-health',

  sectorNotes: {
    distinctivePressures: [
      'Symptom load that varies day to day or hour to hour.',
      'Functional capacity — what the person can actually do — not matching stated intentions.',
      'Treatment disengagement without explicit acknowledgement.',
      'The gap between presenting as coping and described function.',
      'Medication side effects competing with medication benefit.',
      'Isolation — social contact reducing without being named as a problem.',
      'Crisis risk that is not named directly but is present in the material.',
      'Shame or stigma preventing honest account.',
    ],
    distinctiveMovement: [
      'Appointment attended.',
      'Medication taken as prescribed.',
      'Contact with support person made.',
      'Crisis plan used or referenced.',
      'Daily function maintained despite symptoms.',
      'Symptom reported to clinician.',
      'Sleep, activity, or eating pattern stabilised.',
      'Social contact made.',
      'Coping strategy used rather than avoided.',
      'Professional support engaged or increased.',
    ],
    distinctiveGaps: [
      'Current diagnosis or working diagnosis not stated.',
      'Treatment or support plan not described.',
      'Functional baseline not established — what the person can do on a typical day.',
      'Crisis history not mentioned.',
      'Support network not visible.',
    ],
    outputAudience:  'Individual, mental health worker, care coordinator, GP support context, or crisis planning.',
    outputRegister:  'Careful. Non-diagnostic. Functional focus. Does not assign clinical labels. Reads what is described.',
  },


  // ── Gaps ─────────────────────────────────────────────────

  gaps: [
    {
      key:    'diagnosis_or_presentation',
      name:   'Diagnosis or working presentation',
      rx:     /\b(diagnosed|diagnosis|I have|they said|working diagnosis|condition|the doctor said|my mental health|what it is|I was told|I have been told|presenting with)\b/i,
      reason: 'Without a named diagnosis or working presentation the map cannot interpret whether symptom patterns are significant departures or typical fluctuations. One entry naming what has been identified would change what the map can read.',
    },
    {
      key:    'treatment_or_support_plan',
      name:   'Treatment or support plan',
      rx:     /\b(treatment plan|the plan is|I am seeing|I have an appointment|prescribed|my medication|the course|therapy|counselling|I am on|my regime|support worker|the programme)\b/i,
      reason: 'Without a described treatment or support plan the map cannot read engagement, identify where the plan is breaking down, or assess whether movement is on track.',
    },
    {
      key:    'functional_baseline',
      name:   'Functional baseline — what the person can do',
      rx:     /\b(I managed|I got up|I left the house|I cooked|I showered|I went to|I was able to|I could|I could not|I stayed in bed|I did not|I function)\b/i,
      reason: 'Descriptions of symptoms without functional consequence are partial. What the person can and cannot do on a given day is where the real picture is. Without a functional baseline the map cannot assess whether things are stable, improving, or worsening.',
    },
    {
      key:    'crisis_history',
      name:   'Crisis history or current crisis risk',
      rx:     /\b(crisis|hospital|admitted|section|inpatient|A\&E|emergency|crisis team|safe|safety plan|not safe|I am okay|I am not okay|harmed|harming)\b/i,
      reason: 'Crisis history shapes the significance of current signals. Without knowing whether crisis episodes have occurred the map cannot correctly weight current indicators.',
    },
    {
      key:    'support_network',
      name:   'Support network',
      rx:     /\b(my support|I spoke to|I called|family|friend|my partner|my carer|someone who|I have someone|I am not alone|no one|I have no one|isolated|alone)\b/i,
      reason: 'Who is available to the person shapes risk and resilience both. Absent support network combined with high symptom load is a different picture from the same symptoms with strong support.',
    },
  ],


  // ── Skills ───────────────────────────────────────────────

  skills: [
    {
      key:              'treatment_engagement',
      name:             'Staying engaged with treatment',
      rx:               /\b(I went to|I attended|I kept the appointment|I took my medication|I followed the plan|I spoke to|I stayed on|I completed the|I am still seeing)\b/i,
      loadSensitive:    true,
      isStructureSkill: true,
      works:            'Maintaining contact with treatment or support even when symptoms are high — appointments kept, medication taken, check-ins made.',
      breaks:           'High symptom load, stigma, or the belief that nothing is helping causes disengagement — appointments missed, medication stopped, contact dropped without naming it.',
    },
    {
      key:              'functional_honesty',
      name:             'Honest account of functional capacity',
      rx:               /\b(I could not|I did not manage|I stayed in|I did not get up|I cancelled|I was not able to|I could barely|I did not function|I was in bed|honestly|I have to admit)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:            'Writing an honest account of what was and was not possible rather than presenting a managed or improved version of events.',
      breaks:           'Shame, fear of being seen as not coping, or habit of presenting positively causes the account to understate functional difficulty. The map reads what is written, not what is real.',
    },
    {
      key:              'coping_strategy_use',
      name:             'Using a coping strategy rather than avoiding',
      rx:               /\b(I used|I tried|I walked|I breathed|I called|I wrote|I went outside|I grounded|I distracted|I did my|the strategy|I used what|I coped by)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:            'Reaching for a known coping strategy rather than withdrawing, using substances, or waiting for the state to pass.',
      breaks:           'High distress, depleted resources, or isolation means the strategy is not available or not accessible when most needed.',
    },
    {
      key:              'symptom_naming',
      name:             'Naming symptoms rather than describing only behaviour',
      rx:               /\b(anxious|depressed|paranoid|dissociated|panic|intrusive|racing thoughts|low mood|flat|numb|hearing|voices|I felt|the symptoms|it was bad|it was worse|the episode)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'Naming the symptom or state directly rather than describing only the behaviour it produced — gives the map something to track across time.',
      breaks:           'Shame, habit, or normalisation means symptoms are described only indirectly through what the person did or did not do, making the map harder to read.',
    },
  ],


  // ── Contradictions ────────────────────────────────────────

  contradictions: [
    {
      a:    /\b(I am okay|I am fine|I am managing|I am coping|I am doing well|things are okay|I am stable|it is under control|I am alright)\b/i,
      b:    /\b(I could not|I did not manage|I stayed in|I did not get up|I cancelled|I was not able to|I did not shower|I did not eat|I have not left|I stopped taking|I missed the appointment)\b/i,
      text: 'A stated okay and described functional breakdown both appear. The stated position and what the entries describe are not matching. The functional account — what the person did and did not do — is the more reliable read here.',
    },
    {
      a:    /\b(I am taking my medication|I am on it|I have been taking|still on the medication|I take it|I have not stopped)\b/i,
      b:    /\b(I missed|I forgot|I have not taken|I stopped|I ran out|I did not collect|I have not been|I skipped)\b/i,
      text: 'Stated medication adherence and described missed doses both appear. Inconsistent adherence without named reason is significant. The gap between intention and action is where the map needs more material.',
    },
    {
      a:    /\b(I have support|I have people|I am not alone|my support|people around me|I have family|I have friends)\b/i,
      b:    /\b(I have not spoken to|I have not contacted|no one called|I have not seen|I have been alone|I have not told anyone|they do not know|I cannot tell them)\b/i,
      text: 'Stated support network and described absence of contact both appear. Having people and having active contact with those people are different things. The map reads the contact, not the existence of the relationship.',
    },
    {
      a:    /\b(I want to get better|I want to improve|I am committed|I am trying|I am working on|I want things to change|I am ready)\b/i,
      b:    /\b(I cancelled|I did not go|I stopped|I have not followed|I have not done|I gave up|I did not try|I avoided)\b/i,
      text: 'Stated commitment and described avoidance or withdrawal both appear. Intention and action are separating. This gap is not a character assessment — it is a signal that something is making engagement harder than it should be.',
    },
  ],


  // ── Direction Patterns ────────────────────────────────────

  directionPatterns: [
    { rx: /appointment|see my|therapist|psychiatrist|GP|counsellor|mental health|outpatient|check-in/i,  label: 'toward professional support engagement' },
    { rx: /medication|prescription|dose|taking my|side effect|pharmacy/i,                               label: 'toward medication management' },
    { rx: /crisis plan|safety plan|crisis team|emergency|safe|hospital|inpatient/i,                     label: 'toward crisis management or safety planning' },
    { rx: /function|daily|routine|got up|left the house|cooked|showered|managed|able to/i,              label: 'toward functional stability' },
    { rx: /support|contact|spoke to|reached out|called|connection|not alone/i,                          label: 'toward support engagement' },
    { rx: /symptom|episode|mood|anxiety|depression|panic|intrusive|voices|low/i,                        label: 'toward symptom tracking or understanding' },
  ],


  // ── Pressure Signals ─────────────────────────────────────

  pressureSignals: [
    { key: 'isolation_increase',    rx: /\b(I have not seen|I have been alone|no contact|I have not spoken|I withdrew|I did not go out|I stayed home|I avoided everyone|I have not left)\b/i,                 label: 'increasing isolation' },
    { key: 'treatment_dropout',     rx: /\b(I cancelled|I missed the appointment|I stopped taking|I have not been|I did not go|I gave up on|I stopped going|I dropped out|I have not collected)\b/i,          label: 'treatment or support dropout risk' },
    { key: 'crisis_language',       rx: /\b(I cannot go on|I do not want to be here|it would be better if|ending it|not worth it|disappear|give up on life|harm myself|hurt myself|no point)\b/i,             label: 'crisis language present' },
    { key: 'functional_collapse',   rx: /\b(I did not get up|I stayed in bed|I could not function|I did not eat|I did not shower|I did not leave|paralysed|could not move|could not do anything)\b/i,        label: 'functional collapse signal' },
    { key: 'presenting_performance',rx: /\b(I am fine really|it is not that bad|I am managing|I am okay honestly|I do not want to complain|it could be worse|others have it harder|I should not moan)\b/i,  label: 'presenting-as-coping performance signal' },
    { key: 'medication_risk',       rx: /\b(I stopped taking|I changed my dose|I ran out|I am not taking|I forgot again|I have not taken|I decided to stop|I skipped a few)\b/i,                               label: 'medication management risk' },
  ],


  // ── Steer block ───────────────────────────────────────────

  steer: {

    'open-gap-discipline': {
      priorityGaps: [
        'diagnosis_or_presentation',
        'treatment_or_support_plan',
        'functional_baseline',
        'crisis_history',
        'support_network',
      ],
      absenceRules: {
        noDiagnosis:
          'Do not assign clinical labels, diagnoses, or psychiatric categories. Read what is described.',
        functionalFocus:
          'Prioritise what the person can and cannot do over how they describe feeling. Function is the more reliable signal.',
        crisisFirst:
          'If crisis language is present, surface it before other reads. Do not bury crisis signals inside a broader summary.',
      },
    },

    'confidence-calibration': {
      sectorNote:
        'Mental health maps are frequently partial because shame and stigma reduce honest disclosure. Presenting-as-coping language is common. Absence of named difficulty does not mean absence of difficulty. Confidence should reflect what is written, not what is implied.',
    },

    'state-change-detection': {
      minimumSeparationDays: 7,
      watchFor: [
        'Functional capacity increasing or decreasing across periods.',
        'Treatment engagement dropping — appointments missed, medication not taken.',
        'Social contact reducing — isolation increasing.',
        'Crisis language appearing where it was absent.',
        'Coping strategy use increasing or decreasing.',
        'Symptom naming becoming more or less specific.',
      ],
    },

    'competing-priorities': {
      costSignals: [
        { key: 'treatment_vs_function', rx: /\b(the medication makes me|side effects mean I cannot|therapy is exhausting|it takes everything to|I have no energy left for|treatment is harder than)\b/i },
        { key: 'isolation_vs_support',  rx: /\b(I need help but|I do not want to burden|I cannot tell them|I need support but I cannot|I want to reach out but)\b/i },
        { key: 'honesty_vs_stigma',     rx: /\b(I cannot say|they would not understand|they would think I am|I cannot admit|I have to pretend|I cannot tell my)\b/i },
      ],
    },

    'movement-non-movement-reading': {
      movementEvidence: [
        'Appointment attended.',
        'Medication taken as prescribed.',
        'Coping strategy used rather than avoided.',
        'Support contact made.',
        'Functional task completed despite symptoms.',
        'Symptom named and reported to clinician.',
        'Crisis plan referenced or used.',
        'Social contact maintained.',
      ],
      defaultStuckRx: /\b(same|no change|nothing has moved|still the same|still struggling|still not going|still not taking|I have not managed|nothing is different|I keep cancelling)\b/i,
    },

    'load-sensitive-capability': {
      defaultLoadSignals: [
        { key: 'high_symptom_load',  rx: /\b(very bad|worst it has been|I cannot cope|overwhelming|out of control|severe|crisis level|the worst|unbearable|I broke down)\b/i },
        { key: 'isolation',          rx: /\b(I have been alone|no one|I have not seen|I have not spoken|I withdrew|no contact|completely isolated)\b/i },
        { key: 'medication_change',  rx: /\b(changed my medication|new medication|different dose|coming off|reducing|they changed|side effects|adjusting)\b/i },
        { key: 'life_pressure',      rx: /\b(lost my job|relationship ended|bereavement|eviction|financial|housing|I lost|major change|significant stress)\b/i },
      ],
    },

    'avoidance-detection': {
      notAvoidance: [
        'Not attending an appointment due to physical illness.',
        'Taking a planned break from therapy agreed with clinician.',
        'Crisis plan pause agreed with care team.',
      ],
    },

    'meta-reading': {
      sectorNote:
        'Presenting-as-coping is a significant performance pattern in this sector. People frequently write a more functional version of events than is accurate. Absence of named difficulty, consistent positive framing, and dismissal of symptoms with qualifying language are particularly significant signals here.',
      performanceSignals: [
        {
          key: 'minimising_language',
          rx:  /\b(I am fine really|it is not that bad|I am managing|I am okay honestly|I do not want to complain|it could be worse|I should not moan|not as bad as it sounds)\b/i,
        },
      ],
    },

  },

};
