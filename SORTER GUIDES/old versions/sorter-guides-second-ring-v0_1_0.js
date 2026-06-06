// ══════════════════════════════════════════════════════════
// SORTER GUIDES — Second Ring  v0.1.0
//
// Sub-sector guides. Type: 'subsector'.
// Each inherits from a parent sector guide and adds only
// what is specific to the sub-sector.
//
// Attachment order matters:
//   1. Attach the parent sector guide first.
//   2. Attach the sub-sector guide second.
//   The spine composes them — child steers extend parent steers.
//
// Four sub-sector guides:
//
//   GuideSubReentry
//     Parent: guide-criminal-justice
//     Adds: post-release specific pressures, housing,
//     ID, early-period confidence, substance risk,
//     transition-specific performance signals.
//
//   GuideSubAddictionRecovery
//     Parent: guide-medical
//     Adds: substance and behavioural addiction specifics,
//     relapse as data point, hold/break/restart cycle,
//     recovery community signals.
//
//   GuideSubMentalHealth
//     Parent: guide-medical
//     Adds: mental health specific pressures, crisis signals,
//     functional impact reading, stigma load, treatment
//     engagement vs avoidance distinction.
//
//   GuideSubPrisonEducation
//     Parent: guide-education
//     Adds: in-custody education specifics, motivation
//     under institutional pressure, release goal as
//     direction anchor, disruption from transfers or
//     adjudications.
// ══════════════════════════════════════════════════════════


// ══════════════════════════════════════════════════════════
// SUB-SECTOR — Re-entry  v0.1.0
// Parent: guide-criminal-justice
//
// Adds what is specific to the post-release transition.
// The criminal justice parent covers licence, compliance,
// desistance arc, and institutional performance signals.
// This sub-sector adds the immediate post-release
// conditions that differ from custody or supervision.
// ══════════════════════════════════════════════════════════

const GuideSubReentry = {

  id:      'guide-sub-reentry',
  version: '0.1.0',
  type:    'subsector',
  parent:  'guide-criminal-justice',
  purpose: 'Extend criminal justice guide for post-release transition. Adds housing, ID, early-period thinness, substance risk, and transition-specific signals.',
  sector:  're-entry',

  steer: {

    'movement-non-movement-reading': {
      movementEvidence: [
        'Accommodation secured or applied for.',
        'ID obtained or applied for.',
        'Bank account opened or applied for.',
        'Employment contact made.',
        'Support worker met for the first time.',
        'Contact with family restored after release.',
        'Substance use held or reduced in transition period.',
        'High-risk environment navigated without incident.',
        'First week of release managed without recall.',
      ],
      defaultStuckRx: /\b(back inside|recalled|same place as before release|nothing changed from inside|I am already back|the same as when I was in|it did not work|failed on release|the transition failed)\b/i,
    },

    'load-sensitive-capability': {
      defaultLoadSignals: [
        { key: 'housing_immediate',  rx: /\b(no address on release|hostel on release|no stable address|sofa surfing post release|nowhere to go when I got out|emergency accommodation)\b/i },
        { key: 'id_resource',        rx: /\b(no ID|no passport|no birth certificate|cannot prove identity|no bank account|no proof of address|I cannot get ID)\b/i },
        { key: 'substance_transition', rx: /\b(craving|urge|I wanted to use|temptation|I was offered|first time out|the old environment|I nearly used|I nearly drank|the pull)\b/i },
        { key: 'recall_risk',        rx: /\b(breach|recall|warning|at risk of|my licence|they could recall|I am worried about being recalled|I nearly breached)\b/i },
        { key: 'isolation_release',  rx: /\b(no one outside|I do not know anyone|everyone I know is|my contacts are all|I have no one on the outside|alone since release)\b/i },
      ],
    },

    'open-gap-discipline': {
      priorityGaps: [
        'accommodation',
        'id_and_documents',
        'licence_conditions',
        'support_worker',
        'substance_plan',
        'direction',
      ],
    },

    'connections-across-time': {
      minimumSeparationDays: 14,
      watchPatterns: [
        'return to pre-release environments or people',
        'substance use in transition period',
        'housing instability pattern',
        'recall risk accumulation',
        'employment contact attempts',
        'family contact pattern post-release',
      ],
    },

    'confidence-calibration': {
      sectorNote:
        'Post-release maps are frequently very thin in the first three weeks. The person is managing immediate survival needs — housing, ID, benefits, supervision. Brief or infrequent entries in this window are expected. Do not read early thinness as disengagement or avoidance. Early period confidence must be stated explicitly.',
      earlyPeriodThreshold: 21,
    },

    'state-change-detection': {
      minimumSeparationDays: 28,
      watchFor: [
        'First period post-release without recall or breach.',
        'Substance use absent in conditions that previously triggered it.',
        'Stable address held across multiple periods.',
        'Employment contact sustained — not just initiated.',
        'High-risk environment avoided across multiple independent periods.',
      ],
    },

    'competing-priorities': {
      costSignals: [
        { key: 'survival_vs_programme',  rx: /\b(I have to sort housing|I cannot think about the programme|survival first|basics first|I cannot attend when I have nowhere|I have to sort the money first)\b/i },
        { key: 'family_vs_recovery',     rx: /\b(my family want me home|but they use|they are a trigger|I want to be with them but|family contact and recovery|the pull of family)\b/i },
        { key: 'employment_vs_supervision', rx: /\b(the job clashes|the shift|I cannot report and work|work and supervision|the hours and the appointment|it clashes with reporting)\b/i },
      ],
    },

    'external-constraint-reading': {
      defaultConstraintRx: /\b(
        my ID is not ready|I cannot get ID|no bank account yet|benefits not started|
        the hostel|waiting for housing|the housing officer|no address yet|
        I have to wait for my officer|my licence says I cannot|I am not cleared to|
        the DWP has not|universal credit not set up|waiting for the first payment|
        I cannot work until benefits|I need a letter from probation|
        I cannot travel to|the order prevents me from
      )\b/ix,
    },

    'meta-reading': {
      performanceSignals: [
        {
          key: 'release_optimism',
          rx:  /\b(everything is going to be different|I have learned my lesson|I will never go back|I am a new person now|this time is different|I have completely changed|I know what I want now)\b/i,
        },
      ],
      honestySignals: [
        {
          key: 'transition_honesty',
          rx:  /\b(it is harder than I thought|the pull is real|I did not expect it to be this hard|outside is not what I imagined|I was not prepared for|the first week was|I nearly|I was close)\b/i,
        },
      ],
      sectorNote:
        'Early release optimism is a common pattern — and is often genuine. But it can also mask the real difficulty of the transition. Watch for entries that describe the future without describing the present reality. Honest entries in the first month typically include difficulty, not just resolve.',
    },

  },

};


// ══════════════════════════════════════════════════════════
// SUB-SECTOR — Addiction / Recovery  v0.1.0
// Parent: guide-medical
//
// Adds what is specific to addiction and recovery.
// The medical parent covers treatment adherence, symptom
// load, functional impact, and clinical constraints.
// This sub-sector adds the hold/break/restart cycle,
// relapse as data point, substance-specific load,
// and recovery community signals.
// ══════════════════════════════════════════════════════════

const GuideSubAddictionRecovery = {

  id:      'guide-sub-addiction-recovery',
  version: '0.1.0',
  type:    'subsector',
  parent:  'guide-medical',
  purpose: 'Extend medical guide for addiction and recovery. Adds cycle reading, relapse as data, substance-specific load, and recovery community signals.',
  sector:  'addiction-recovery',

  steer: {

    'movement-non-movement-reading': {
      movementEvidence: [
        'Substance-free period held.',
        'Programme session attended.',
        'Support worker or sponsor contacted.',
        'Craving or urge navigated without use.',
        'Trigger situation managed without using.',
        'Pattern that broke the hold previously — interrupted this time.',
        'Returned to the attempt after a slip.',
        'Honest account given to support worker.',
        'Structure maintained during a high-risk period.',
        'Help asked for before the breaking point.',
      ],
      defaultStuckRx: /\b(same cycle|same pattern|hold then break|I always|every time|it always breaks|the same conditions|same trigger|I cannot get past|going around|the cycle continues|I keep coming back to the same)\b/i,
    },

    'load-sensitive-capability': {
      defaultLoadSignals: [
        { key: 'craving',        rx: /\b(craving|urge|I wanted to|the pull|I was tempted|I nearly|I almost|the desire|it called to me|I could not stop thinking about)\b/i },
        { key: 'trigger',        rx: /\b(trigger|it triggered|what sets it off|the conditions|when I am around|when I feel|the environment|the situation|I was near|I saw them)\b/i },
        { key: 'isolation',      rx: /\b(alone|no one|isolated|no support|I had no one to call|I was by myself|no one knew|I did not tell anyone|I carried it alone)\b/i },
        { key: 'relapse_risk',   rx: /\b(I nearly used|I nearly drank|I was close|I had it in my hand|I was about to|I was this close|the temptation was real)\b/i },
        { key: 'shame_cycle',    rx: /\b(ashamed|I failed again|I let myself down|I cannot do this|I am weak|I hate myself for|I am disgusted|what is wrong with me)\b/i },
        { key: 'structure_loss', rx: /\b(structure collapsed|routine gone|I stopped going|I stopped attending|I stopped calling|I isolated|I withdrew|I dropped everything)\b/i },
      ],
    },

    'open-gap-discipline': {
      priorityGaps: [
        'break_pattern',
        'trigger_conditions',
        'support_network',
        'substance_or_behaviour',
        'direction',
        'attempt_history',
      ],
    },

    'connections-across-time': {
      minimumSeparationDays: 7,
      watchPatterns: [
        'trigger conditions preceding use',
        'hold period length',
        'support contact frequency',
        'isolation preceding slip',
        'shame cycle following slip',
        'structure collapse pattern',
        'recovery community engagement',
      ],
    },

    'contradiction-holding': {
      detectionShape: {
        text: 'The hold and the break may both be real in the same period. A person can be genuinely committed to recovery and genuinely struggling with the pull at the same time. Do not flatten either. The cycle is the map — not a verdict.',
      },
    },

    'confidence-calibration': {
      sectorNote:
        'Recovery maps often show strong signal in the hold periods and thin signal around slips — because slips are less likely to be written about honestly. Thin material around a period may indicate a slip that has not been named yet. Do not fill the gap — name it.',
    },

    'state-change-detection': {
      minimumSeparationDays: 14,
      watchFor: [
        'Hold period extending beyond previous personal record.',
        'Trigger conditions present but pattern not triggered.',
        'Returning after a slip faster than previous times.',
        'Help sought before the breaking point rather than after.',
        'Shame cycle shortening after a slip.',
        'Structure maintained across a previously high-risk condition.',
      ],
    },

    'competing-priorities': {
      costSignals: [
        { key: 'recovery_vs_relationships', rx: /\b(the programme takes time|I cannot be there for|recovery and family|my recovery and them|they do not understand the time|it is taking me away from)\b/i },
        { key: 'recovery_vs_work',          rx: /\b(work and recovery|the sessions clash|I cannot attend and work|the programme hours|employment and the programme|it conflicts with)\b/i },
        { key: 'honesty_vs_shame',          rx: /\b(I cannot tell them|if they knew|I am hiding|I have not told my support|I cannot be honest about|the shame of telling)\b/i },
      ],
    },

    'meta-reading': {
      performanceSignals: [
        {
          key: 'recovery_performance',
          rx:  /\b(I am doing everything right|I have not used|I am completely clean|I am fully committed|I have no cravings|I am in a great place with my recovery|I have it under control)\b/i,
        },
      ],
      honestySignals: [
        {
          key: 'recovery_honesty',
          rx:  /\b(I nearly|the pull was real|it was hard|I wanted to but|I was close|I had a difficult day|the craving was strong|I struggled|I had to work at it|it is not easy)\b/i,
        },
        {
          key: 'slip_honesty',
          rx:  /\b(I used|I drank|I slipped|I relapsed|I broke the hold|I went back|I gave in|I could not resist|I failed to hold|I had a slip)\b/i,
        },
      ],
      sectorNote:
        'Recovery maps are prone to two kinds of performance: holding-performance (presenting a cleaner hold than is real) and shame-silence (not writing about slips). Both produce unreliable maps. Honest recovery entries typically include difficulty, urge, and sometimes slip. Absence of all three across a long period is a performance signal.',
    },

  },

};


// ══════════════════════════════════════════════════════════
// SUB-SECTOR — Mental Health  v0.1.0
// Parent: guide-medical
//
// Adds what is specific to mental health conditions.
// The medical parent covers treatment adherence, symptom
// load, and clinical constraints. This sub-sector adds
// functional impact reading, crisis signals, stigma load,
// and the distinction between treatment engagement and
// active management of the condition.
// ══════════════════════════════════════════════════════════

const GuideSubMentalHealth = {

  id:      'guide-sub-mental-health',
  version: '0.1.0',
  type:    'subsector',
  parent:  'guide-medical',
  purpose: 'Extend medical guide for mental health conditions. Adds functional impact, crisis signals, stigma load, and treatment engagement specifics.',
  sector:  'mental-health',

  steer: {

    'movement-non-movement-reading': {
      movementEvidence: [
        'Appointment attended including when low.',
        'Medication taken as prescribed.',
        'Crisis plan used before reaching crisis point.',
        'Support contacted when struggling — not only at crisis.',
        'Basic self-care maintained during a low period.',
        'One functional task completed on a difficult day.',
        'Honest account of state given to clinician or support.',
        'Named what was happening rather than masking it.',
        'Returned to functioning after a low period.',
        'Boundary maintained that protected mental state.',
      ],
      defaultStuckRx: /\b(same low|same cycle|cannot get out|I am not functioning|back to where|nothing works|I have stopped|I cannot leave|I cannot do basic things|the same darkness|back in the hole|I keep crashing)\b/i,
    },

    'load-sensitive-capability': {
      defaultLoadSignals: [
        { key: 'episode',        rx: /\b(episode|relapse|crisis|breakdown|I crashed|I hit a low|the worst it has been|I could not function|I stopped|I was not okay|acute|severe)\b/i },
        { key: 'medication',     rx: /\b(medication|meds|I stopped taking|side effects|the medication|I forgot|I ran out|it is not working|they changed my|new prescription)\b/i },
        { key: 'stigma',         rx: /\b(they would not understand|I cannot tell|what they would think|the stigma|I am embarrassed|I hide it|no one knows|I pretend I am fine)\b/i },
        { key: 'isolation',      rx: /\b(I cannot face people|I withdrew|I stopped going out|I cancelled|I avoided|I isolated|I have not left|I do not answer|I pushed people away)\b/i },
        { key: 'crisis_risk',    rx: /\b(I am not safe|I had thoughts|dark thoughts|thoughts of|I was not sure I could|I called the line|I nearly|crisis point|I was close to)\b/i },
        { key: 'functional',     rx: /\b(I cannot work|I cannot leave the house|basic things|I have not eaten|I have not slept|I have not showered|I cannot function|I am not able to)\b/i },
      ],
    },

    'open-gap-discipline': {
      priorityGaps: [
        'current_mental_state',
        'treatment_plan',
        'crisis_plan',
        'support_network',
        'functional_impact',
        'direction',
      ],
    },

    'connections-across-time': {
      minimumSeparationDays: 14,
      watchPatterns: [
        'episode pattern and conditions preceding it',
        'medication adherence across periods',
        'isolation preceding episodes',
        'functional capacity across periods',
        'crisis contact pattern',
        'recovery arc after episodes',
      ],
    },

    'contradiction-holding': {
      detectionShape: {
        text: 'Presenting as well and being unwell at the same time is a common pattern in mental health. Masking, stigma, and professional performance all produce entries that present better than the person\'s actual state. The contradiction between stated wellbeing and described functional state is the most significant one to hold.',
      },
    },

    'confidence-calibration': {
      sectorNote:
        'Mental health maps are frequently unreliable because the condition affects the person\'s capacity and willingness to write honestly. Episodes reduce entry frequency. Stigma reduces honesty. The map must be read with awareness that what is present may underrepresent the real state. Thin material is likely, not a reflection of absence of difficulty.',
    },

    'state-change-detection': {
      minimumSeparationDays: 21,
      watchFor: [
        'Episode frequency reducing across periods.',
        'Episode recovery time shortening.',
        'Crisis plan used before crisis point — earlier intervention.',
        'Functional capacity holding across previously difficult conditions.',
        'Isolation reducing — contact increasing.',
        'Medication adherence sustained across multiple periods.',
      ],
    },

    'competing-priorities': {
      costSignals: [
        { key: 'masking_vs_honesty',    rx: /\b(I pretend|I hide|I act fine|they do not know|I cannot let them see|I mask|I put on a face|I perform okay)\b/i },
        { key: 'treatment_vs_function', rx: /\b(the medication makes it hard to|the side effects mean I cannot|treatment and work|therapy and everything else|the appointment takes|I cannot do both)\b/i },
        { key: 'self_vs_others',        rx: /\b(I put others first|I look after everyone else|my own mental health and|I do not have time for my own|I am the carer and I also)\b/i },
      ],
    },

    'meta-reading': {
      performanceSignals: [
        {
          key: 'wellness_performance',
          rx:  /\b(I am fine|I am okay|I am managing|I am coping well|I am in a good place|my mental health is good|I am stable|no issues with my mental health|I am not struggling)\b/i,
        },
      ],
      honestySignals: [
        {
          key: 'mental_health_honesty',
          rx:  /\b(I am not okay|I am struggling|it has been hard|I am not fine|I had a difficult period|I am low|I crashed|I was not well|it got bad|I could not cope|I need to be honest)\b/i,
        },
        {
          key: 'functional_honesty',
          rx:  /\b(I have not been able to|basic things have been hard|I have not left|I have not eaten|I have not been functioning|I have been struggling to do|I could not manage)\b/i,
        },
      ],
      sectorNote:
        'Mental health maps have two distinct performance modes: active masking (presenting as well when unwell) and crisis-only engagement (only writing when at crisis point). Both produce unreliable maps. Honest mental health entries typically include functional detail — what was managed and what was not — not just mood statements.',
    },

  },

};


// ══════════════════════════════════════════════════════════
// SUB-SECTOR — Prison Education  v0.1.0
// Parent: guide-education
//
// Adds what is specific to education in a custodial setting.
// The education parent covers engagement, academic standing,
// support access, and load outside study. This sub-sector
// adds the institutional constraints specific to custody,
// release goal as direction anchor, disruption from
// transfers and adjudications, and the motivation dynamic
// of studying under restriction.
// ══════════════════════════════════════════════════════════

const GuideSubPrisonEducation = {

  id:      'guide-sub-prison-education',
  version: '0.1.0',
  type:    'subsector',
  parent:  'guide-education',
  purpose: 'Extend education guide for custodial education. Adds institutional constraints, release goal as direction anchor, disruption signals, and in-custody motivation dynamics.',
  sector:  'prison-education',

  steer: {

    'movement-non-movement-reading': {
      movementEvidence: [
        'Session attended.',
        'Assignment completed and submitted.',
        'Qualification unit completed.',
        'New subject or skill started.',
        'Tutor contacted or question asked.',
        'Education goal connected to release plan.',
        'Continued studying after disruption — transfer, adjudication, cell move.',
        'Applied for a new course or qualification.',
        'Received and acted on feedback.',
        'Helped another learner — peer learning as movement.',
      ],
      defaultStuckRx: /\b(I have stopped|I have not attended|I am not going|I gave up|what is the point|it does not matter|nothing will change|I cannot see why|I am not bothering|it will not help me|same as always|not going anywhere)\b/i,
    },

    'load-sensitive-capability': {
      defaultLoadSignals: [
        { key: 'transfer',       rx: /\b(moved|transferred|new wing|new prison|I was moved|they moved me|I lost my place|disrupted by|the transfer|I had to start again)\b/i },
        { key: 'adjudication',   rx: /\b(adjudication|nicking|report|I was put on|I lost privileges|I was taken off|the adjudication|the hearing|I was punished|they stopped me attending)\b/i },
        { key: 'environment',    rx: /\b(the wing|the cell|noise|other inmates|I cannot concentrate|the environment|it is too loud|people laugh at me|the culture|taking the piss)\b/i },
        { key: 'motivation',     rx: /\b(what is the point|it will not help|I will not use it|no one will employ me|I have a record|what difference|nobody cares|I am just doing time|it is just something to do)\b/i },
        { key: 'release_pressure', rx: /\b(release date|I am getting out|I need to be ready|what happens when I get out|I am thinking about release|after custody|when I leave)\b/i },
        { key: 'family_contact', rx: /\b(my children|my family|visits|calls|letters|I am thinking about|they need me|when I get home|what I am missing)\b/i },
      ],
    },

    'open-gap-discipline': {
      priorityGaps: [
        'release_goal_connection',
        'current_course_or_qualification',
        'disruption_history',
        'motivation_foundation',
        'direction',
        'post_release_plan',
      ],
    },

    'connections-across-time': {
      minimumSeparationDays: 14,
      watchPatterns: [
        'motivation fluctuation across periods',
        'disruption impact on engagement',
        'release proximity effect on motivation',
        'family contact effect on study engagement',
        'qualification progression',
        'returning to study after disruption',
      ],
    },

    'contradiction-holding': {
      detectionShape: {
        text: 'Stated motivation to study and described disengagement from education both appearing. The contradiction may reflect institutional disruption, peer culture pressure, or genuine motivational conflict. Do not resolve — name both and note the conditions around each.',
      },
    },

    'confidence-calibration': {
      sectorNote:
        'Prison education maps are disrupted by institutional factors — transfers, adjudications, lockdowns, regime changes. Gaps in entries or thin material may reflect regime disruption rather than personal disengagement. Do not read institutional gaps as avoidance without checking for disruption signals.',
    },

    'state-change-detection': {
      minimumSeparationDays: 21,
      watchFor: [
        'Motivation shifting from instrumental to genuinely engaged.',
        'Education connected to release goal for the first time.',
        'Returning to study after a disruption faster than previous times.',
        'Qualification completed — a genuine milestone.',
        'Peer culture attitude shifting — less defensive about studying.',
        'Direction emerging that education is feeding into.',
      ],
    },

    'competing-priorities': {
      costSignals: [
        { key: 'education_vs_wing_culture', rx: /\b(they laugh|taking the piss|not the done thing|soft|I get abuse for|the culture on the wing|they think education is|I hide that I am studying|I am embarrassed to)\b/i },
        { key: 'education_vs_work',         rx: /\b(the job|the workshop|I have to work|work and education|it clashes with|I cannot do both|the regime|they chose work over|my job placement)\b/i },
        { key: 'education_vs_family',       rx: /\b(I am thinking about my family|visits|calls|I cannot focus|family on my mind|I want to be with|what I am missing outside|my children)\b/i },
      ],
    },

    'external-constraint-reading': {
      defaultConstraintRx: /\b(
        I was transferred|they moved me|the class was cancelled|the teacher was off|
        the wing was on lockdown|I was on basic|I lost my place|
        the adjudication|I was taken off education|they stopped me|
        the regime|I was not allowed|I could not attend because|
        the prison does not offer|there is no course for|the waiting list for education|
        I have to wait for a place|they do not run it here
      )\b/ix,
      notAvoidance: [
        'Transfer disrupting education placement — institutional constraint.',
        'Adjudication removing education access — institutional consequence.',
        'Lockdown preventing attendance — regime constraint.',
        'Course not available at current establishment — access constraint.',
        'Waiting list for course — access constraint.',
      ],
    },

    'meta-reading': {
      performanceSignals: [
        {
          key: 'education_compliance',
          rx:  /\b(I go every day|I never miss|I always attend|I am doing everything|I am a model student|the teacher is happy with me|I am top of the class|I have not missed a session)\b/i,
        },
      ],
      honestySignals: [
        {
          key: 'motivation_honesty',
          rx:  /\b(I do not really know why I am doing it|I am not sure it will help|I go because it gets me out|I go to pass the time|I am not sure I am interested|I am trying to find a reason|I want to believe it matters)\b/i,
        },
        {
          key: 'difficulty_honesty',
          rx:  /\b(it is hard to concentrate|I struggle to focus|the environment makes it difficult|I find it hard|I am behind|I do not understand|I asked for help|I admitted I was struggling)\b/i,
        },
      ],
      sectorNote:
        'Prison education maps have a specific performance mode: attendance-as-compliance. A person may attend regularly for regime reasons without genuine engagement. Honest maps distinguish between going and engaging. Watch for entries that describe attendance without describing learning, difficulty, or direction.',
    },

  },

};
