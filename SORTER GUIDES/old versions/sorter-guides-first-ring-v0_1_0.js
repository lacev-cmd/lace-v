// ══════════════════════════════════════════════════════════
// SORTER GUIDE — Engineering  v0.1.0
// First-ring sector guide.
// ══════════════════════════════════════════════════════════

const GuideEngineering = {

  id:      'guide-engineering',
  version: '0.1.0',
  type:    'sector',
  parent:  null,
  purpose: 'Steer sorter behaviours toward engineering-sector conditions — blocked decisions, delivery movement, technical debt load, and team or process gaps.',
  sector:  'engineering',

  sectorNotes: {
    distinctivePressures: [
      'Blocked decisions sitting without escalation.',
      'Technical debt accumulating without acknowledgement.',
      'Scope creep unaddressed.',
      'Dependency on unavailable resources or people.',
      'Quality compromise under time pressure.',
      'Team communication breakdown.',
      'Unclear ownership of critical decisions.',
    ],
    distinctiveMovement: [
      'Decision made and communicated.',
      'Blocker escalated.',
      'Test written or run.',
      'Code reviewed and merged.',
      'Dependency resolved.',
      'Scope change documented and agreed.',
      'Technical debt named and logged.',
      'Incident reviewed and action taken.',
    ],
    distinctiveGaps: [
      'No stated delivery goal or definition of done.',
      'Blockers present but no escalation path described.',
      'Technical debt not named.',
      'Team state not visible.',
      'Quality standard not defined.',
    ],
    outputAudience:  'Engineer, tech lead, engineering manager, or project reviewer.',
    outputRegister:  'Precise. Action-oriented. Evidence-based. No motivational filler.',
  },

  steer: {

    'avoidance-detection': {
      defaultActionRx: /\b(I shipped|I merged|I deployed|I tested|I escalated|I documented|I reviewed|I fixed|I refactored|I decided|I unblocked|I raised|I closed|I delivered)\b/i,
      notAvoidance: [
        'Waiting for a decision from a stakeholder before proceeding.',
        'Deliberate pause for technical review before shipping.',
        'Not merging pending a review that is in progress.',
        'Strategic delay while dependency is being resolved externally.',
      ],
    },

    'movement-non-movement-reading': {
      movementEvidence: [
        'Code shipped or merged.',
        'Test written and passing.',
        'Blocker escalated.',
        'Decision made and recorded.',
        'Dependency resolved.',
        'Incident reviewed with action logged.',
        'Technical debt named and scheduled.',
        'Scope formally agreed.',
      ],
      defaultStuckRx: /\b(still blocked|no progress|same problem|not shipped|not merged|sitting in review|no decision|going around|no movement|same blocker|not resolved|indefinitely)\b/i,
    },

    'load-sensitive-capability': {
      defaultLoadSignals: [
        { key: 'deadline',   rx: /\b(deadline|ship by|release date|we have to|the date is|we are late|overdue|behind schedule)\b/i },
        { key: 'incident',   rx: /\b(incident|outage|production issue|on call|pages|alert|down|broken in prod|hotfix)\b/i },
        { key: 'team',       rx: /\b(team conflict|not communicating|blocked by|waiting on|they have not|no response from|I cannot get)\b/i },
        { key: 'scope',      rx: /\b(scope creep|requirements changed|new requirement|they want more|moving goalposts|keeps changing)\b/i },
        { key: 'debt',       rx: /\b(technical debt|legacy|fragile|it keeps breaking|held together|not sustainable|needs rewriting)\b/i },
      ],
    },

    'open-gap-discipline': {
      priorityGaps: [
        'definition_of_done',
        'blocker_escalation_path',
        'technical_debt_state',
        'direction',
        'team_state',
      ],
    },

  },

};


// ══════════════════════════════════════════════════════════
// SORTER GUIDE — Education  v0.1.0
// First-ring sector guide.
// ══════════════════════════════════════════════════════════

const GuideEducation = {

  id:      'guide-education',
  version: '0.1.0',
  type:    'sector',
  parent:  null,
  purpose: 'Steer sorter behaviours toward education-sector conditions — learning movement, engagement gaps, support needs, and the distance between stated goal and academic reality.',
  sector:  'education',

  sectorNotes: {
    distinctivePressures: [
      'Falling behind without disclosing it.',
      'Assessment anxiety blocking engagement.',
      'Support needs not identified or not accessed.',
      'Financial pressure affecting study.',
      'Family or caring responsibilities competing with study.',
      'Imposter syndrome or belonging uncertainty.',
      'Course direction misalignment — studying something that is wrong.',
    ],
    distinctiveMovement: [
      'Assignment submitted.',
      'Session attended.',
      'Support accessed.',
      'Tutor contacted.',
      'Study routine established.',
      'Gap in understanding named and addressed.',
      'Assessment completed.',
      'Extension requested where needed.',
    ],
    distinctiveGaps: [
      'Current academic standing not described.',
      'Support network or resources not mentioned.',
      'Direction — what the study is for — not stated.',
      'Load outside study not visible.',
      'Engagement pattern not described.',
    ],
    outputAudience:  'Student, tutor, academic support worker, or personal advisor.',
    outputRegister:  'Supportive. Non-judgemental. Practical. Focused on function and next step.',
  },

  steer: {

    'avoidance-detection': {
      defaultActionRx: /\b(I submitted|I attended|I contacted|I asked for|I spoke to|I completed|I studied|I revised|I read|I started|I handed in|I booked|I accessed)\b/i,
      notAvoidance: [
        'Extension granted and being used appropriately.',
        'Absence due to documented illness.',
        'Waiting for disability support to be put in place.',
        'Deferral on academic advice.',
      ],
    },

    'movement-non-movement-reading': {
      movementEvidence: [
        'Assignment submitted.',
        'Session or lecture attended.',
        'Tutor or advisor contacted.',
        'Study routine established and held.',
        'Support resource accessed.',
        'Gap named and addressed.',
        'Assessment completed.',
        'Feedback sought and acted on.',
      ],
      defaultStuckRx: /\b(falling behind|cannot keep up|not submitted|not attended|missed|I have not started|same problem|no progress|getting further behind|I keep avoiding|I know I should)\b/i,
    },

    'load-sensitive-capability': {
      defaultLoadSignals: [
        { key: 'assessment', rx: /\b(exam|assessment|deadline|submission|due date|I have to hand in|the deadline is)\b/i },
        { key: 'belonging',  rx: /\b(do not belong|not smart enough|everyone else|imposter|out of my depth|I should not be here|I cannot do this)\b/i },
        { key: 'financial',  rx: /\b(money|cost|I cannot afford|working to pay|the debt|student loan|financial pressure)\b/i },
        { key: 'caring',     rx: /\b(caring for|family|my children|my parent|home responsibilities|I have to be home|I cannot focus)\b/i },
        { key: 'mental',     rx: /\b(anxiety|depression|mental health|I am not okay|struggling|cannot concentrate|brain fog)\b/i },
      ],
    },

    'open-gap-discipline': {
      priorityGaps: [
        'academic_standing',
        'direction',
        'support_access',
        'load_outside_study',
        'engagement_pattern',
      ],
    },

  },

};


// ══════════════════════════════════════════════════════════
// SORTER GUIDE — Employment  v0.1.0
// First-ring sector guide.
// ══════════════════════════════════════════════════════════

const GuideEmployment = {

  id:      'guide-employment',
  version: '0.1.0',
  type:    'sector',
  parent:  null,
  purpose: 'Steer sorter behaviours toward employment conditions — job search movement, workplace difficulty, career fit, and the gap between stated employment goal and actual activity.',
  sector:  'employment',

  sectorNotes: {
    distinctivePressures: [
      'Financial pressure from unemployment or underemployment.',
      'Confidence erosion from repeated rejection.',
      'Skills gap — real or perceived.',
      'Discrimination or barrier based on background.',
      'Workplace conflict or performance pressure.',
      'Role misfit — in the wrong job.',
      'Gap in CV or employment history causing avoidance.',
    ],
    distinctiveMovement: [
      'Application submitted.',
      'Interview attended.',
      'Network contact made.',
      'Skills development started.',
      'CV updated.',
      'Job search strategy changed.',
      'Workplace conversation had.',
      'Support or advice sought.',
      'Role or sector pivot decided and acted on.',
    ],
    distinctiveGaps: [
      'Target role or sector not stated.',
      'Barrier to employment not named.',
      'Activity level not described.',
      'Financial runway not visible.',
      'Support network for job search not mentioned.',
    ],
    outputAudience:  'Job seeker, employment support worker, careers advisor, or HR professional.',
    outputRegister:  'Practical. Activity-focused. Non-judgemental about history or gap.',
  },

  steer: {

    'avoidance-detection': {
      defaultActionRx: /\b(I applied|I submitted|I attended|I contacted|I networked|I updated|I researched|I spoke to|I followed up|I registered|I completed|I sent)\b/i,
      notAvoidance: [
        'Waiting for response after application.',
        'Deliberate pause to retarget job search strategy.',
        'Not applying while completing a qualification.',
        'Rest period after intense job search activity.',
      ],
    },

    'movement-non-movement-reading': {
      movementEvidence: [
        'Application submitted.',
        'Interview attended.',
        'Network contact made.',
        'CV updated with specific change.',
        'Skills course started or completed.',
        'Job search strategy changed and acted on.',
        'Workplace issue raised formally or informally.',
        'Reference obtained.',
        'Support worker or advisor met.',
      ],
      defaultStuckRx: /\b(no applications|not applied|no interviews|nothing back|no response|same situation|not moved|going around|I keep saying|still unemployed|no further forward|I have not)\b/i,
    },

    'load-sensitive-capability': {
      defaultLoadSignals: [
        { key: 'rejection',  rx: /\b(rejected|turned down|no offer|unsuccessful|they did not want|another rejection|I did not get)\b/i },
        { key: 'financial',  rx: /\b(running out|no money|I need to find something|financial pressure|I cannot keep|the savings|benefits)\b/i },
        { key: 'confidence', rx: /\b(I am not good enough|no one wants me|what is the point|I have been trying|I am losing confidence|I do not believe)\b/i },
        { key: 'barrier',    rx: /\b(record|gap|they asked about|I had to explain|disclosure|background check|they found out)\b/i },
        { key: 'workplace',  rx: /\b(my manager|performance|PIP|warning|difficult at work|conflict|I am going to lose|they want me out)\b/i },
      ],
    },

    'open-gap-discipline': {
      priorityGaps: [
        'target_role',
        'barrier',
        'activity_level',
        'financial_runway',
        'direction',
      ],
    },

  },

};


// ══════════════════════════════════════════════════════════
// SORTER GUIDE — Housing  v0.1.0
// First-ring sector guide.
// ══════════════════════════════════════════════════════════

const GuideHousing = {

  id:      'guide-housing',
  version: '0.1.0',
  type:    'sector',
  parent:  null,
  purpose: 'Steer sorter behaviours toward housing conditions — stability, risk of loss, active steps to secure or maintain accommodation, and the load that housing insecurity places on everything else.',
  sector:  'housing',

  sectorNotes: {
    distinctivePressures: [
      'Eviction risk or notice received.',
      'Rent or mortgage arrears.',
      'No fixed address or temporary accommodation.',
      'Unsuitable accommodation affecting health or safety.',
      'Relationship breakdown creating housing instability.',
      'Waiting list position and uncertainty.',
      'Landlord conflict.',
    ],
    distinctiveMovement: [
      'Application made for housing.',
      'Council or housing association contacted.',
      'Arrears payment made or arrangement agreed.',
      'Legal advice sought on tenancy.',
      'Support worker engaged for housing.',
      'Temporary accommodation secured.',
      'Suitable permanent accommodation found.',
      'Maintenance or repair reported.',
    ],
    distinctiveGaps: [
      'Current housing status not described.',
      'Stability or risk level not visible.',
      'Arrears or financial position on housing not named.',
      'Support or options being pursued not described.',
      'Formal notices or legal position not mentioned.',
    ],
    outputAudience:  'Individual, housing support worker, local authority, or tenancy advisor.',
    outputRegister:  'Practical. Stability-focused. Sensitive to the load housing insecurity creates.',
  },

  steer: {

    'avoidance-detection': {
      defaultActionRx: /\b(I applied|I contacted|I called|I paid|I arranged|I reported|I spoke to|I attended|I submitted|I registered|I viewed|I moved|I secured)\b/i,
      notAvoidance: [
        'Waiting for a housing application to be processed.',
        'Not moving while a legal challenge is active.',
        'Waiting for a support worker to assist with application.',
        'Delay caused by documentation not yet in place.',
      ],
    },

    'movement-non-movement-reading': {
      movementEvidence: [
        'Housing application submitted.',
        'Council or landlord contacted.',
        'Arrears payment made or arrangement confirmed.',
        'Legal position clarified.',
        'Temporary accommodation arranged.',
        'Viewing attended.',
        'Offer accepted.',
        'Move completed.',
        'Support engaged for housing.',
      ],
      defaultStuckRx: /\b(still no address|still temporary|still on the list|no progress|nothing has moved|no offer|still waiting|same situation|no further|I cannot get)\b/i,
    },

    'load-sensitive-capability': {
      defaultLoadSignals: [
        { key: 'eviction',   rx: /\b(eviction|notice|section 21|section 8|bailiff|possession order|I have to leave|they want me out)\b/i },
        { key: 'arrears',    rx: /\b(arrears|behind on rent|behind on mortgage|I owe|I have not paid|debt to landlord|missed payments)\b/i },
        { key: 'temporary',  rx: /\b(sofa|sofa surfing|hostel|bed and breakfast|temporary|no fixed|no address|I do not have a home)\b/i },
        { key: 'safety',     rx: /\b(unsafe|not safe|domestic|violence|I cannot go back|I am afraid to go home|the property is)\b/i },
        { key: 'children',   rx: /\b(my children|the kids|child services|they could take|I need a home for|school|the children need)\b/i },
      ],
    },

    'open-gap-discipline': {
      priorityGaps: [
        'current_status',
        'stability_risk',
        'arrears_position',
        'options_being_pursued',
        'direction',
      ],
    },

  },

};


// ══════════════════════════════════════════════════════════
// SORTER GUIDE — Social Care  v0.1.0
// First-ring sector guide.
// ══════════════════════════════════════════════════════════

const GuideSocialCare = {

  id:      'guide-social-care',
  version: '0.1.0',
  type:    'sector',
  parent:  null,
  purpose: 'Steer sorter behaviours toward social care conditions — care needs, carer load, safeguarding signals, support access, and the gap between assessed need and received support.',
  sector:  'social-care',

  sectorNotes: {
    distinctivePressures: [
      'Unmet care need — formal or informal.',
      'Carer burnout or breakdown.',
      'Safeguarding concern — self or another.',
      'Assessment pending or delayed.',
      'Support package not matching need.',
      'Transition — child to adult services, hospital to home.',
      'Family disagreement about care decisions.',
    ],
    distinctiveMovement: [
      'Assessment requested or attended.',
      'Support package agreed or reviewed.',
      'Carer support accessed.',
      'Safeguarding referral made.',
      'Transition plan in place.',
      'Advocacy sought.',
      'Care plan followed.',
      'Review meeting attended.',
    ],
    distinctiveGaps: [
      'Care need not described.',
      'Current support package not visible.',
      'Carer situation not described.',
      'Safeguarding risk not assessed in material.',
      'Transition plan absent.',
    ],
    outputAudience:  'Social worker, care coordinator, carer, or person receiving care.',
    outputRegister:  'Person-centred. Non-clinical. Needs-focused. Sensitive to power dynamics.',
  },

  steer: {

    'avoidance-detection': {
      defaultActionRx: /\b(I requested|I attended|I contacted|I reported|I spoke to|I accessed|I agreed|I followed|I completed|I referred|I advocated|I arranged)\b/i,
      notAvoidance: [
        'Waiting for assessment to be scheduled.',
        'Delay in accessing support due to system capacity.',
        'Deliberate pause to gather information before referral.',
        'Not engaging with a service that has previously caused harm.',
      ],
    },

    'movement-non-movement-reading': {
      movementEvidence: [
        'Assessment attended or requested.',
        'Support package reviewed or updated.',
        'Carer support accessed.',
        'Safeguarding concern reported.',
        'Advocacy sought.',
        'Review meeting attended.',
        'Care plan followed for a described period.',
        'Transition step completed.',
      ],
      defaultStuckRx: /\b(still waiting|no assessment|no support|nothing in place|same situation|no change|unmet need|still no|I keep asking|no one has|not progressed)\b/i,
    },

    'load-sensitive-capability': {
      defaultLoadSignals: [
        { key: 'carer',       rx: /\b(carer burnout|I am exhausted|I cannot keep doing|I am the only one|no respite|I have no break|I am running on empty)\b/i },
        { key: 'safeguarding',rx: /\b(safeguarding|at risk|concern|I am worried about|harm|abuse|neglect|not safe|someone needs to know)\b/i },
        { key: 'transition',  rx: /\b(transition|moving to adult|leaving hospital|discharge|going home|change of placement|moving care)\b/i },
        { key: 'system',      rx: /\b(the system|they are not helping|no one is listening|I keep asking|I have been waiting|they said they would|nothing happened)\b/i },
        { key: 'family',      rx: /\b(family disagree|my family want|they do not agree|conflict about care|they think I should|family pressure)\b/i },
      ],
    },

    'open-gap-discipline': {
      priorityGaps: [
        'care_need',
        'current_support',
        'carer_state',
        'safeguarding_signal',
        'direction',
      ],
    },

  },

};


// ══════════════════════════════════════════════════════════
// SORTER GUIDE — Mental Health  v0.1.0
// First-ring sector guide.
// ══════════════════════════════════════════════════════════

const GuideMentalHealth = {

  id:      'guide-mental-health',
  version: '0.1.0',
  type:    'sector',
  parent:  null,
  purpose: 'Steer sorter behaviours toward mental health conditions — functional state, treatment engagement, load factors, and movement toward stability or recovery.',
  sector:  'mental-health',

  sectorNotes: {
    distinctivePressures: [
      'Symptom load affecting daily function.',
      'Medication side effects or non-adherence.',
      'Isolation and withdrawal.',
      'Crisis risk — not assessed by this tool, flagged only.',
      'Stigma preventing disclosure or help-seeking.',
      'Trauma responses affecting current functioning.',
      'Co-occurring substance use.',
    ],
    distinctiveMovement: [
      'Appointment attended.',
      'Medication taken as prescribed.',
      'Support accessed.',
      'Crisis plan used.',
      'Coping strategy applied.',
      'Social contact made.',
      'Routine maintained despite symptoms.',
      'Disclosure made to someone trusted.',
    ],
    distinctiveGaps: [
      'Current mental state not described honestly.',
      'Treatment or support plan not visible.',
      'Crisis history or current risk signals not visible.',
      'Isolation level not described.',
      'Direction — what stability or recovery means to this person — not stated.',
    ],
    outputAudience:  'Individual, mental health worker, care coordinator, or support worker.',
    outputRegister:  'Warm. Non-clinical. Non-judgemental. Function-focused. Safety-aware.',
  },

  steer: {

    'avoidance-detection': {
      defaultActionRx: /\b(I attended|I took|I called|I used|I spoke to|I reached out|I applied|I accessed|I went to|I kept|I maintained|I tried)\b/i,
      notAvoidance: [
        'Rest as part of recovery.',
        'Withdrawal during acute episode — not the same as avoidance.',
        'Waiting for a CAMHS or CMHT appointment.',
        'Not engaging with a service that has previously caused harm.',
      ],
    },

    'movement-non-movement-reading': {
      movementEvidence: [
        'Appointment attended.',
        'Medication taken consistently.',
        'Crisis plan followed.',
        'Coping strategy used and named.',
        'Social contact made despite low mood.',
        'Routine held during a difficult period.',
        'Support accessed.',
        'Honest disclosure made.',
        'Help sought at a difficult moment.',
      ],
      defaultStuckRx: /\b(same place|no better|worse|nothing helps|nothing is working|I am not improving|back to|same state|I keep|no change|I cannot|nothing moves)\b/i,
    },

    'load-sensitive-capability': {
      defaultLoadSignals: [
        { key: 'crisis',     rx: /\b(crisis|I am not safe|I want to hurt|I cannot keep|I am going to|suicidal|self-harm|I do not want to be here)\b/i },
        { key: 'isolation',  rx: /\b(alone|no one|isolated|I have not spoken|I have not left|I have not seen|no contact|cut off|withdrawn)\b/i },
        { key: 'medication', rx: /\b(I stopped taking|I did not take|I have not been taking|side effects|I am not sure about|I want to come off)\b/i },
        { key: 'trauma',     rx: /\b(triggered|flashback|it came back|I was reminded|I could not stop|the memory|it happened again in my head)\b/i },
        { key: 'function',   rx: /\b(I cannot get up|I cannot leave|I did not eat|I did not sleep|I have not washed|basic things|I am not functioning)\b/i },
      ],
    },

    'open-gap-discipline': {
      priorityGaps: [
        'current_state',
        'treatment_plan',
        'crisis_history',
        'isolation_level',
        'direction',
      ],
    },

  },

};


// ══════════════════════════════════════════════════════════
// SORTER GUIDE — Criminal Justice  v0.1.0
// First-ring sector guide.
// ══════════════════════════════════════════════════════════

const GuideCriminalJustice = {

  id:      'guide-criminal-justice',
  version: '0.1.0',
  type:    'sector',
  parent:  null,
  purpose: 'Steer sorter behaviours toward criminal justice conditions — compliance, desistance signals, load factors specific to the system, and the gap between stated change and evidenced change.',
  sector:  'criminal-justice',

  sectorNotes: {
    distinctivePressures: [
      'Licence or order conditions creating structural constraints.',
      'Recall or breach risk.',
      'Stigma and disclosure burden.',
      'Peer group and environment risk.',
      'Institutional distrust built from prior experience.',
      'Financial and housing instability post-release.',
      'Family relationship damage.',
    ],
    distinctiveMovement: [
      'Licence condition met.',
      'Appointment kept.',
      'Programme attended.',
      'Trigger situation navigated without incident.',
      'Risky contact avoided.',
      'Employment or education step taken.',
      'Family contact restored or managed well.',
      'Honest account given to supervisor.',
    ],
    distinctiveGaps: [
      'Current order or licence conditions not described.',
      'Risk environment not named.',
      'Support network not visible.',
      'Desistance direction — what the person is moving toward — not stated.',
      'History of attempts and what broke them not described.',
    ],
    outputAudience:  'Probation officer, offender manager, support worker, or individual.',
    outputRegister:  'Evidence-based. Non-moralising. Desistance-aware. Bounded by what the material supports.',
  },

  steer: {

    'avoidance-detection': {
      defaultActionRx: /\b(I reported|I attended|I kept|I completed|I stayed away|I did not|I maintained|I went to|I signed|I submitted|I told|I disclosed)\b/i,
      notAvoidance: [
        'Not contacting a victim as required by order.',
        'Avoiding a known trigger location on advice.',
        'Waiting for supervision appointment — not missing it.',
        'Strategic avoidance of high-risk peers or environments.',
      ],
    },

    'movement-non-movement-reading': {
      movementEvidence: [
        'Appointment or reporting kept.',
        'Licence condition met.',
        'Programme session attended.',
        'High-risk situation navigated without incident.',
        'Risky contact avoided despite opportunity.',
        'Employment or education contact made.',
        'Family relationship step taken.',
        'Honest disclosure made to supervisor.',
      ],
      defaultStuckRx: /\b(same situation|same people|same places|back to|recalled|breach|same pattern|nothing has changed|I keep ending up|it always goes the same|no further)\b/i,
    },

    'load-sensitive-capability': {
      defaultLoadSignals: [
        { key: 'licence',    rx: /\b(licence|conditions|probation|parole|supervision|my officer|breach|recalled|warning|I have to report)\b/i },
        { key: 'peers',      rx: /\b(old friends|same people|they contacted me|I ran into|they want me to|peer pressure|the group|I was with)\b/i },
        { key: 'stigma',     rx: /\b(they found out|my record|background check|I had to tell|disclosure|they know|DBS|criminal record)\b/i },
        { key: 'housing',    rx: /\b(no address|sofa|hostel|temporary|nowhere|I do not have a stable|I am moving around)\b/i },
        { key: 'financial',  rx: /\b(no money|no income|benefits|I cannot pay|financial pressure|I am broke|no ID|no bank)\b/i },
      ],
    },

    'open-gap-discipline': {
      priorityGaps: [
        'order_conditions',
        'risk_environment',
        'support_network',
        'direction',
        'attempt_history',
      ],
    },

  },

};


// ══════════════════════════════════════════════════════════
// SORTER GUIDE — Public Service  v0.1.0
// First-ring sector guide.
// ══════════════════════════════════════════════════════════

const GuidePublicService = {

  id:      'guide-public-service',
  version: '0.1.0',
  type:    'sector',
  parent:  null,
  purpose: 'Steer sorter behaviours toward public service conditions — service delivery, process movement, institutional pressure, and the gap between policy intent and operational reality.',
  sector:  'public-service',

  sectorNotes: {
    distinctivePressures: [
      'Resource constraint affecting service delivery.',
      'Policy change outpacing operational capacity.',
      'Accountability and scrutiny pressure.',
      'Interdependency — blocked by another organisation or team.',
      'Public-facing pressure and complaint.',
      'Internal governance and approval delays.',
      'Staff capacity and morale.',
    ],
    distinctiveMovement: [
      'Decision made and communicated.',
      'Process step completed.',
      'Escalation made.',
      'Stakeholder consultation completed.',
      'Policy or procedure updated.',
      'Resource secured.',
      'Delivery milestone reached.',
      'Review completed with action logged.',
    ],
    distinctiveGaps: [
      'Delivery goal or outcome not stated.',
      'Blockage not named.',
      'Accountability or decision owner not identified.',
      'Resource gap not described.',
      'Interdependencies not mapped.',
    ],
    outputAudience:  'Public servant, programme manager, policy lead, or service reviewer.',
    outputRegister:  'Structured. Evidence-based. Accountable. Outcome-focused.',
  },

  steer: {

    'avoidance-detection': {
      defaultActionRx: /\b(I submitted|I completed|I escalated|I approved|I consulted|I published|I delivered|I reviewed|I notified|I actioned|I reported|I agreed|I signed off)\b/i,
      notAvoidance: [
        'Waiting for ministerial or senior sign-off.',
        'Pause for legal or policy clearance.',
        'Consultation period in progress.',
        'Dependency on another department not yet resolved.',
      ],
    },

    'movement-non-movement-reading': {
      movementEvidence: [
        'Decision made and recorded.',
        'Process step completed.',
        'Escalation made.',
        'Consultation completed.',
        'Policy updated.',
        'Resource confirmed.',
        'Milestone delivered.',
        'Review completed with logged action.',
      ],
      defaultStuckRx: /\b(still waiting|no decision|blocked|not approved|no sign off|going around|no progress|not moved|still in|same stage|no further|I keep waiting)\b/i,
    },

    'load-sensitive-capability': {
      defaultLoadSignals: [
        { key: 'scrutiny',   rx: /\b(audit|inspection|inquiry|parliamentary question|FOI|accountability|scrutiny|under review|being investigated)\b/i },
        { key: 'resource',   rx: /\b(no budget|underfunded|cuts|reduced capacity|not enough staff|resource pressure|we cannot afford)\b/i },
        { key: 'policy',     rx: /\b(policy change|new directive|ministerial|priorities have changed|we have been told to|new guidance)\b/i },
        { key: 'dependency', rx: /\b(waiting on|blocked by|dependent on|they have not|another department|cross-government|no response from)\b/i },
        { key: 'public',     rx: /\b(complaint|media|public pressure|press|the public|reputational|political pressure|it is in the news)\b/i },
      ],
    },

    'open-gap-discipline': {
      priorityGaps: [
        'delivery_goal',
        'blockage',
        'decision_owner',
        'resource_gap',
        'direction',
      ],
    },

  },

};
