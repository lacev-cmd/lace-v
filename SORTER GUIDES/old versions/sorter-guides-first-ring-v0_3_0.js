// ══════════════════════════════════════════════════════════
// SORTER GUIDES — First Ring  v0.3.0
// Engineering, Education, Employment, Housing,
// Social Care, Mental Health, Criminal Justice (basic),
// Public Service.
//
// v0.3.0 — four domain-knowledge sections added to all guides:
//   gaps, skills, contradictions, directionPatterns.
//   These feed directly into the cartridge assembly.
//   All v0.1.0 steers unchanged.
// ══════════════════════════════════════════════════════════


// ── Engineering ───────────────────────────────────────────

const GuideEngineering = {

  id:      'guide-engineering',
  version: '0.3.0',
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


  gaps: [
    {
      key:    'definition_of_done',
      name:   'Definition of done',
      rx:     /\b(done when|complete when|the goal is|definition of done|what success looks like|the objective|what I am delivering|the deliverable|what done means)\b/i,
      reason: 'Without a definition of done the map cannot assess whether activity is moving toward completion or whether the goalposts are moving.',
    },
    {
      key:    'blocker_escalation_path',
      name:   'Blocker escalation path',
      rx:     /\b(I escalated|I raised|I told|I flagged|I unblocked|the blocker is|blocked by|waiting on|I need from|dependency on|I asked for|they have not)\b/i,
      reason: 'Blockers without an escalation path accumulate. Whether the person has a route to resolve blockers or is sitting on them is a critical read.',
    },
    {
      key:    'technical_debt_state',
      name:   'Technical debt named',
      rx:     /\b(technical debt|legacy|fragile|it keeps breaking|held together|not sustainable|needs rewriting|the old system|shortcuts|we cut corners)\b/i,
      reason: 'Technical debt not named cannot be managed. Its presence or absence shapes the reliability of delivery claims.',
    },
    {
      key:    'team_state',
      name:   'Team state',
      rx:     /\b(the team|we are|team conflict|not communicating|blocked by|we decided|we agreed|team capacity|team load|the team is)\b/i,
      reason: 'Engineering work is rarely solo. Without a read on team state the map cannot assess whether delivery risk is individual or systemic.',
    },
    {
      key:    'direction',
      name:   'Stated direction',
      rx:     /\b(we are building|the goal|what we are working toward|the product|the system|the architecture|what this needs to become|the vision|the roadmap)\b/i,
      reason: 'Without a stated direction the map cannot assess whether current delivery activity is aligned with where the work needs to go.',
    },
  ],


  skills: [
    {
      key:              'shipping',
      name:             'Shipping and delivering',
      rx:               /\b(I shipped|I merged|I deployed|I delivered|I released|I completed|I finished|it went out|it is live|we shipped|we deployed)\b/i,
      loadSensitive:    true,
      isStructureSkill: true,
      works:            'Getting work across the line — merged, deployed, delivered — rather than keeping it in progress indefinitely.',
      breaks:           'Perfectionism, scope creep, or dependency blocks cause work to stay in flight without landing.',
    },
    {
      key:              'escalating_blockers',
      name:             'Escalating blockers',
      rx:               /\b(I escalated|I raised|I flagged|I told|I asked for|I surfaced|I made visible|I brought to|I said we were blocked)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'Raising blockers clearly and early rather than absorbing them silently until they cause failure.',
      breaks:           'A culture of appearing capable, or not wanting to flag problems, causes blockers to sit until they become crises.',
    },
    {
      key:              'naming_technical_debt',
      name:             'Naming technical debt',
      rx:               /\b(I logged|I named|I documented|technical debt|I flagged|I raised the issue of|I told the team about|I added to the backlog|I made it visible)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'Naming and logging technical debt rather than working around it silently.',
      breaks:           'Delivery pressure causes debt to be silently accumulated — it surfaces later as fragility or failure.',
    },
    {
      key:              'honest_reporting',
      name:             'Honest status reporting',
      rx:               /\b(I have to be honest|the truth is|it is not going well|we are behind|I missed|I did not|it is not ready|I need to admit|the real status|it is taking longer)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'Reporting status accurately — including slippage, blockers, and problems — rather than the version that sounds best.',
      breaks:           'Status reports become performative — the reported position and the real position diverge until the gap is too large to hide.',
    },
  ],


  contradictions: [
    {
      a:    /\b(on track|going well|making progress|we are good|no issues|it is fine|we will hit the date|we are moving|things are moving)\b/i,
      b:    /\b(still blocked|not shipped|same problem|sitting in review|no decision|not resolved|not merged|I have not|we have not|the blocker)\b/i,
      text: 'Stated progress and described blockers or unresolved items both appear. Reported status and actual delivery state are not matching. The specific items not yet done are the more reliable read.',
    },
    {
      a:    /\b(I will fix it|I will sort it|I will deal with the debt|I will refactor|I am going to address|I will get to it)\b/i,
      b:    /\b(I have not|I keep putting off|it is still there|I have not touched|same issue|still not|I have been meaning to|I have not gotten to)\b/i,
      text: 'Stated intention to address a technical issue and consistent non-action both appear. Intention and execution are different things — especially when delivery pressure is active. The debt or problem is accumulating.',
    },
  ],


  directionPatterns: [
    { rx: /ship|deliver|release|launch|go live|production/i,                   label: 'toward shipping and delivery' },
    { rx: /architecture|redesign|rebuild|rewrite|refactor|foundation/i,        label: 'toward architectural improvement' },
    { rx: /scale|performance|reliability|stability|resilience/i,               label: 'toward scalability or reliability' },
    { rx: /team|process|culture|how we work|engineering practice/i,            label: 'toward improving team or process' },
    { rx: /product|user|customer|value|outcome|impact/i,                       label: 'toward product or user outcome' },
  ],


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


// ── Education ─────────────────────────────────────────────

const GuideEducation = {

  id:      'guide-education',
  version: '0.3.0',
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


  gaps: [
    {
      key:    'academic_standing',
      name:   'Current academic standing',
      rx:     /\b(my grades|I am passing|I am failing|behind|up to date|my results|the feedback|my marks|how I am doing|my performance|academically)\b/i,
      reason: 'Without knowing the current academic standing the map cannot assess whether engagement activity is keeping pace or whether the gap is widening.',
    },
    {
      key:    'direction',
      name:   'What the study is for',
      rx:     /\b(I want to|my goal|what I am studying for|the career|the qualification|what I am working toward|why I am doing this|the reason I|this is for)\b/i,
      reason: 'Without a stated reason for the study the map cannot assess whether difficulty is worth working through or whether the direction itself needs examining.',
    },
    {
      key:    'support_access',
      name:   'Support access',
      rx:     /\b(I spoke to|I accessed|I contacted|my tutor|disability support|student services|I have support|I got help|I asked for|the advisor)\b/i,
      reason: 'Whether the person is using available support or managing alone changes what movement looks like and what the next useful step is.',
    },
    {
      key:    'load_outside_study',
      name:   'Load outside study',
      rx:     /\b(work|job|family|caring|financial|money|mental health|I am also dealing with|outside pressures|what else is going on|life outside)\b/i,
      reason: 'Academic difficulty rarely exists in isolation. Load outside study is often the primary driver. Without it visible the map reads the symptom without the cause.',
    },
    {
      key:    'engagement_pattern',
      name:   'Engagement pattern',
      rx:     /\b(I attended|I submitted|I went|I completed|I have been|I missed|I have not|my attendance|I keep missing|I have been avoiding|I stopped going)\b/i,
      reason: 'Whether engagement is consistent, declining, or recovering is the primary movement signal in education. Without it described the map cannot read direction.',
    },
  ],


  skills: [
    {
      key:              'showing_up',
      name:             'Showing up and submitting',
      rx:               /\b(I attended|I submitted|I went|I completed|I handed in|I was there|I turned up|I did not miss|I kept to|I showed up)\b/i,
      loadSensitive:    true,
      isStructureSkill: true,
      works:            'Attending sessions and submitting work — consistently, even when it is hard.',
      breaks:           'Anxiety, falling behind, or external load causes attendance and submission to slip — the gap becomes harder to close.',
    },
    {
      key:              'seeking_help',
      name:             'Seeking help when needed',
      rx:               /\b(I asked|I contacted|I reached out|I spoke to|I went to see|I accessed|I told them|I admitted|I disclosed|I got support)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:            'Asking for help — from tutors, support services, or peers — rather than managing difficulty alone.',
      breaks:           'Imposter syndrome, shame about falling behind, or not knowing what help is available causes the person to manage alone until the gap is critical.',
    },
    {
      key:              'honest_reporting',
      name:             'Honest self-reporting',
      rx:               /\b(I have to be honest|if I am honest|the truth is|I am behind|I have not|I missed|I did not submit|I have not been attending|it is worse than I said)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'Describing the actual academic position rather than the version that looks like coping.',
      breaks:           'Shame or fear of consequence causes the real position to stay hidden — support cannot be calibrated to the actual need.',
    },
    {
      key:              'managing_competing_load',
      name:             'Managing competing load',
      rx:               /\b(I managed to|despite|even though|I balanced|I kept going|I did not let it stop me|I made time|I prioritised|I organised)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:            'Continuing to engage with study while managing significant external load — work, family, financial pressure, health.',
      breaks:           'The external load becomes too heavy and study is the thing that gets dropped first — often without disclosure.',
    },
  ],


  contradictions: [
    {
      a:    /\b(I am doing okay|I am keeping up|it is going well|I am on track|I am managing|I am fine with it|I am keeping on top)\b/i,
      b:    /\b(I missed|I have not submitted|I have not attended|I am behind|I have not done|I have not been|I have not started|falling behind)\b/i,
      text: 'A stated sense of keeping up and described gaps in attendance or submission both appear. The overall assessment and the specific activity are not matching. The specific gaps are the more reliable read.',
    },
    {
      a:    /\b(I want to finish|I need to complete|I am committed|I will get through|I am going to see it through|it matters to me)\b/i,
      b:    /\b(I have not gone|I have not submitted|I keep missing|I have been avoiding|I cannot bring myself|I keep putting off|I have not started)\b/i,
      text: 'Stated commitment to completing the course and consistent non-engagement both appear. Wanting to finish and staying engaged are different things — especially when external load or anxiety is active.',
    },
  ],


  directionPatterns: [
    { rx: /qualify|qualification|certificate|degree|complete the course/i,    label: 'toward completing the qualification' },
    { rx: /career|job|profession|work in|get into|I want to be/i,             label: 'toward a specific career or profession' },
    { rx: /knowledge|understand|learn|skill|develop|grow/i,                   label: 'toward learning and development' },
    { rx: /get through|pass|not fail|survive the year|just finish/i,          label: 'toward getting through the current period' },
    { rx: /change course|different direction|reconsider|is this right/i,      label: 'toward reconsidering the direction' },
  ],


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


// ── Employment ────────────────────────────────────────────

const GuideEmployment = {

  id:      'guide-employment',
  version: '0.3.0',
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


  gaps: [
    {
      key:    'target_role',
      name:   'Target role or sector',
      rx:     /\b(I am looking for|the role I want|the sector|the job|what I am applying for|the kind of work|my target|I want to work in|I am after)\b/i,
      reason: 'Without a target role or sector the map cannot assess whether activity is focused or scattered. Unfocused search is a different problem from low activity.',
    },
    {
      key:    'barrier',
      name:   'Barrier to employment',
      rx:     /\b(record|gap|background|they asked about|I had to explain|disclosure|age|experience|qualification|I do not have|they rejected me because)\b/i,
      reason: 'Named barriers can be addressed. Unnamed barriers become avoidance — the person applies without dealing with the thing that is causing rejection.',
    },
    {
      key:    'activity_level',
      name:   'Activity level',
      rx:     /\b(I applied|applications|I have sent|I have submitted|how many|I have been|I am applying|my activity|I have been looking|I have been trying)\b/i,
      reason: 'Whether the person is active, intermittently active, or not active shapes the whole read. Without it the map cannot distinguish a focus problem from an activity problem.',
    },
    {
      key:    'financial_runway',
      name:   'Financial runway',
      rx:     /\b(savings|how long|I have until|the money|my runway|benefits|I have enough for|I need something by|the pressure is|running out)\b/i,
      reason: 'Financial runway determines whether the search can be strategic or whether it needs to be urgent. Without it the map cannot read time pressure.',
    },
    {
      key:    'direction',
      name:   'Stated direction',
      rx:     /\b(I want|my goal|where I want to get to|the work I want|what I am working toward|the career|the path|what I am aiming for)\b/i,
      reason: 'Without a stated direction the map cannot assess whether current activity is moving toward something or keeping options deliberately open.',
    },
  ],


  skills: [
    {
      key:              'consistent_activity',
      name:             'Consistent search activity',
      rx:               /\b(I applied|I submitted|I attended|I contacted|I networked|I followed up|I updated|I researched|I registered|I sent)\b/i,
      loadSensitive:    true,
      isStructureSkill: true,
      works:            'Maintaining consistent job search activity — applications, contacts, follow-ups — even during rejection periods.',
      breaks:           'Rejection accumulation, confidence erosion, or financial anxiety causes activity to stop — the search stalls.',
    },
    {
      key:              'adapting_strategy',
      name:             'Adapting the search strategy',
      rx:               /\b(I changed|I tried a different|I adjusted|I pivoted|I shifted|I rethought|I reconsidered|I modified|different approach|I updated the CV|I changed the targeting)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'Changing the approach when the current strategy is not producing results — targeting, materials, channels, positioning.',
      breaks:           'Persistence in a strategy that is not working — the same applications producing the same silence — without questioning the approach.',
    },
    {
      key:              'honest_reporting',
      name:             'Honest self-reporting',
      rx:               /\b(I have to be honest|the truth is|if I am honest|I have not applied|I have not followed up|my activity has been low|I have been avoiding|I have not sent)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'Describing the actual activity level and results rather than the version that looks more productive.',
      breaks:           'Shame about low activity or repeated rejection causes the real picture to stay hidden — the map reads a more active search than is happening.',
    },
    {
      key:              'naming_the_barrier',
      name:             'Naming the barrier',
      rx:               /\b(the barrier is|what is stopping me|the problem is|I have to address|I need to deal with|the issue is|I know why|it comes down to|the real issue)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'Naming specifically what is getting in the way of employment — so it can be addressed rather than avoided.',
      breaks:           'The barrier stays unnamed and the person applies around it rather than dealing with it — rejection continues for the same reason.',
    },
  ],


  contradictions: [
    {
      a:    /\b(I am looking|I am applying|I am active|I have been searching|I am trying|I am putting myself out there)\b/i,
      b:    /\b(I have not applied|low activity|I have not sent|I have not followed up|I have been avoiding|nothing submitted|I keep meaning to|I have not)\b/i,
      text: 'Stated activity and described low or absent activity both appear. The self-description and the specific entries are not matching. The specific entries are the more reliable read.',
    },
    {
      a:    /\b(I am open to anything|I will take anything|I am flexible|I have no specific target|anything going|I am not fussy)\b/i,
      b:    /\b(I have not applied to|I would not do|I cannot see myself|that is beneath|I am not going to|I do not want to|that is not what I)\b/i,
      text: 'Stated openness to any role and described rejection of specific options both appear. Genuine openness and stated openness are different things. The map reads what is actually being applied to rather than the stated position.',
    },
  ],


  directionPatterns: [
    { rx: /specific role|specific job|I want to be|I am aiming for|the position/i, label: 'toward a specific target role' },
    { rx: /change career|different sector|pivot|change direction|something new/i,   label: 'toward a career change' },
    { rx: /back to work|return to|re-enter|get back into|just get working/i,       label: 'toward returning to work' },
    { rx: /own business|self-employed|freelance|go independent|work for myself/i,  label: 'toward self-employment' },
    { rx: /stable|security|income|pay the bills|financial stability|just earning/i, label: 'toward financial stability through work' },
  ],


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


// ── Housing ───────────────────────────────────────────────

const GuideHousing = {

  id:      'guide-housing',
  version: '0.3.0',
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


  gaps: [
    {
      key:    'current_status',
      name:   'Current housing status',
      rx:     /\b(where I live|my accommodation|I am living|I have a place|I am staying|the tenancy|I have a home|my address|where I am|my housing)\b/i,
      reason: 'Without a described housing status the map cannot read stability, risk, or what the most urgent step is.',
    },
    {
      key:    'stability_risk',
      name:   'Stability or risk level',
      rx:     /\b(at risk|notice|eviction|I have to leave|they want me out|my tenancy|unstable|temporary|sofa|hostel|I do not know how long|my lease|section 21)\b/i,
      reason: 'Whether housing is stable, at risk, or already lost changes the urgency of the whole map. Without it the map cannot prioritise.',
    },
    {
      key:    'arrears_position',
      name:   'Arrears or financial position on housing',
      rx:     /\b(arrears|behind on rent|behind on mortgage|I owe|I have not paid|debt to|missed payments|I am in arrears|how much I owe)\b/i,
      reason: 'Arrears left unnamed cannot be addressed. The financial position on housing is often the most urgent practical gap.',
    },
    {
      key:    'options_being_pursued',
      name:   'Options being pursued',
      rx:     /\b(I applied|I contacted|I am on the list|I have registered|I have spoken to|I am waiting for|I have asked|the options are|I am looking at|I have been told)\b/i,
      reason: 'Whether the person is actively pursuing options or waiting without acting is a critical read. Active pursuit and passive waiting look similar without this described.',
    },
    {
      key:    'direction',
      name:   'Stated direction',
      rx:     /\b(I want|my goal|what I need|stable|permanent|my own place|secure housing|I am trying to|where I want to be|the plan for housing)\b/i,
      reason: 'Without a stated direction the map cannot assess whether current activity is aligned with what the person actually needs.',
    },
  ],


  skills: [
    {
      key:              'taking_action',
      name:             'Taking concrete housing action',
      rx:               /\b(I applied|I contacted|I called|I paid|I arranged|I reported|I spoke to|I attended|I submitted|I registered|I viewed|I moved|I secured)\b/i,
      loadSensitive:    true,
      isStructureSkill: true,
      works:            'Taking concrete steps — applications, contacts, payments, legal advice — rather than waiting for the situation to resolve itself.',
      breaks:           'The complexity of the housing system, shame, or overwhelm causes inaction — the situation deteriorates while nothing is done.',
    },
    {
      key:              'seeking_advice',
      name:             'Seeking housing advice or support',
      rx:               /\b(I spoke to|I contacted|I got advice|the housing officer|the support worker|citizens advice|I asked|legal advice|I was told|I found out|I spoke with)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'Accessing housing advice — from councils, charities, support workers, or legal services — before the situation becomes critical.',
      breaks:           'Not knowing where to go, or shame about the situation, delays advice-seeking until options have narrowed significantly.',
    },
    {
      key:              'honest_reporting',
      name:             'Honest reporting of the position',
      rx:               /\b(I have to be honest|the truth is|if I am honest|it is worse than|I have not paid|I am behind|I have not dealt with|I have been avoiding|I owe)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'Describing the actual housing position — including arrears, notices, and risk — rather than the version that sounds more stable.',
      breaks:           'Shame causes the real position to stay hidden — support cannot be calibrated to the actual need.',
    },
    {
      key:              'managing_arrears',
      name:             'Managing arrears',
      rx:               /\b(I paid|I arranged|payment plan|I spoke to the|I have been paying|I reduced|I am paying off|I contacted the landlord|arrangement agreed|I have been making payments)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:            'Actively managing arrears — through payment arrangements, advice, or direct payment — before enforcement action begins.',
      breaks:           'Shame or fear of the conversation causes arrears to accumulate until enforcement action removes remaining options.',
    },
  ],


  contradictions: [
    {
      a:    /\b(it is fine|it is okay|I am managing|it is stable enough|not that bad|I have somewhere|it is not ideal but)\b/i,
      b:    /\b(notice|eviction|I have to leave|arrears|behind on rent|I owe|temporary|sofa|hostel|I do not know how long|unstable|they want me out)\b/i,
      text: 'A stated sense of the housing being manageable and described instability or risk both appear. The overall assessment and the specific situation are not matching. Housing risk is often minimised — the specific signals are the more reliable read.',
    },
    {
      a:    /\b(I am going to sort it|I will deal with it|I am going to contact them|I am going to apply|I have a plan for it|I will get to it)\b/i,
      b:    /\b(I have not|I keep putting off|I have not contacted|I have not applied|I have not dealt with|still not|I keep meaning to|same situation)\b/i,
      text: 'Stated intention to act on the housing situation and consistent inaction both appear. In housing, delayed action has compounding consequences — the longer it sits the narrower the options become.',
    },
  ],


  directionPatterns: [
    { rx: /permanent|my own place|stable tenancy|secure housing|settled/i,     label: 'toward permanent stable housing' },
    { rx: /stay|keep my home|remain|not lose|maintain the tenancy/i,           label: 'toward keeping current housing' },
    { rx: /move|different area|better area|move on|find somewhere new/i,       label: 'toward moving to better housing' },
    { rx: /buy|own|mortgage|purchase|get on the ladder/i,                      label: 'toward home ownership' },
    { rx: /safe|away from|leave the situation|get out of|not go back/i,        label: 'toward safe housing away from a problem' },
  ],


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


// ── Social Care ───────────────────────────────────────────

const GuideSocialCare = {

  id:      'guide-social-care',
  version: '0.3.0',
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


  gaps: [
    {
      key:    'care_need',
      name:   'Care need described',
      rx:     /\b(I need|my care needs|what I need help with|the support I need|my needs are|I require|the care I need|daily living|what I cannot do)\b/i,
      reason: 'Without a described care need the map cannot assess whether support is adequate or whether the gap between need and provision is growing.',
    },
    {
      key:    'current_support',
      name:   'Current support package',
      rx:     /\b(I receive|I have support|the package|my support hours|the service|they come|I have a carer|the care package|what is in place|my provision)\b/i,
      reason: 'Without knowing what support is currently in place the map cannot read adequacy or identify gaps.',
    },
    {
      key:    'carer_state',
      name:   'Carer state',
      rx:     /\b(I am the carer|I care for|my carer|carer load|I am exhausted|I am struggling|no respite|I have no break|I cannot keep|I am burning out)\b/i,
      reason: 'Carer state is often the most critical variable. A carer approaching breakdown is a safeguarding risk. Without it visible the map cannot read urgency.',
    },
    {
      key:    'safeguarding_signal',
      name:   'Safeguarding signal',
      rx:     /\b(safeguarding|at risk|I am worried|harm|abuse|neglect|not safe|someone needs to know|I am concerned|they are not safe|I do not feel safe)\b/i,
      reason: 'Safeguarding signals require immediate flagging. The map does not assess risk but surfaces these signals clearly when present.',
    },
    {
      key:    'direction',
      name:   'Stated direction',
      rx:     /\b(I want|my goal|what I am working toward|I hope|I would like|what I need to achieve|the outcome|what good looks like|my aim)\b/i,
      reason: 'Without a stated direction the map cannot assess whether current support activity is aligned with what the person or carer is trying to achieve.',
    },
  ],


  skills: [
    {
      key:              'accessing_support',
      name:             'Accessing available support',
      rx:               /\b(I requested|I attended|I contacted|I accessed|I agreed|I followed|I completed|I arranged|I accepted|I used the service)\b/i,
      loadSensitive:    true,
      isStructureSkill: true,
      works:            'Actively engaging with available support — assessments, packages, advocacy, respite — rather than managing alone.',
      breaks:           'System complexity, previous negative experience, or carer guilt causes support to not be accessed even when available.',
    },
    {
      key:              'advocating',
      name:             'Advocating for needs',
      rx:               /\b(I asked for|I requested|I challenged|I escalated|I complained|I advocated|I pushed back|I said I needed|I asked them to review|I told them it was not enough)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:            'Naming what is not working, what is not enough, or what needs to change — rather than accepting inadequate provision silently.',
      breaks:           'Power imbalance, fear of losing what is in place, or exhaustion causes the person to accept inadequate provision rather than challenge it.',
    },
    {
      key:              'honest_reporting',
      name:             'Honest reporting of state',
      rx:               /\b(I have to be honest|if I am honest|the truth is|it is worse than|I am not coping|I am struggling|I cannot keep|I have to admit|it is more than I can)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'Describing the actual state — care need, carer load, adequacy of support — rather than the version that appears to be managing.',
      breaks:           'Guilt about needing help, or fear of professional involvement, causes the real position to stay hidden.',
    },
    {
      key:              'carer_self_care',
      name:             'Carer self-care',
      rx:               /\b(I took a break|I had respite|I looked after myself|I asked for help|I accepted support|I rested|I made time for|I did something for myself)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:            'A carer maintaining their own health and capacity — through breaks, respite, and support — so they can sustain care over time.',
      breaks:           'Carer guilt or unavailability of respite causes self-care to stop — the carer approaches burnout without anyone knowing.',
    },
  ],


  contradictions: [
    {
      a:    /\b(I am managing|I am coping|it is fine|we are okay|I can handle it|it is not that bad|we are getting by)\b/i,
      b:    /\b(I am exhausted|I cannot keep|I am burning out|I have no break|I am at the end|I do not know how much longer|I am struggling|I cannot do this)\b/i,
      text: 'A stated sense of managing and described carer exhaustion or breakdown both appear. Carer minimisation is one of the most common patterns in social care — the presented surface and the actual load are not the same thing.',
    },
    {
      a:    /\b(the support is fine|what is in place is enough|we have what we need|I am satisfied with the care|the package covers it)\b/i,
      b:    /\b(it is not enough|the gaps|what is missing|I need more|they do not provide|it does not cover|I have to fill in|I am making up for)\b/i,
      text: 'Stated adequacy of support and described gaps in provision both appear. Formal satisfaction with provision and practical adequacy are different things — especially when the person is filling gaps themselves without naming it.',
    },
  ],


  directionPatterns: [
    { rx: /independent|more independence|do more myself|less reliant|my own|manage more/i, label: 'toward greater independence' },
    { rx: /stable|manage|maintain|hold it together|keep going|sustainable/i,               label: 'toward sustainable management' },
    { rx: /better care|more support|right support|what I actually need|proper care/i,      label: 'toward better or more appropriate care' },
    { rx: /transition|move to|change placement|hospital to home|adult services/i,          label: 'toward a care transition' },
    { rx: /safe|protected|not at risk|safeguarded|protected from harm/i,                   label: 'toward safety' },
  ],


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


// ── Mental Health ─────────────────────────────────────────

const GuideMentalHealth = {

  id:      'guide-mental-health',
  version: '0.3.0',
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


  gaps: [
    {
      key:    'current_state',
      name:   'Current mental state described honestly',
      rx:     /\b(I am|my state|how I am feeling|my mood|my mental health|right now|currently|I have been|things are|it has been|I feel)\b/i,
      reason: 'Without an honest description of current state the map cannot read whether the period is stable, deteriorating, or recovering.',
    },
    {
      key:    'treatment_plan',
      name:   'Treatment or support plan',
      rx:     /\b(my treatment|my medication|my therapist|my care plan|the plan|I see|I am on|I have been prescribed|I attend|I am working with|my support)\b/i,
      reason: 'Without a described treatment or support plan the map cannot assess engagement, adherence, or what is missing.',
    },
    {
      key:    'crisis_history',
      name:   'Crisis history or current signals',
      rx:     /\b(crisis|I have been in|previously|last time|I was hospitalised|it got very bad|I have a crisis plan|my warning signs|when it gets bad|I know the signs)\b/i,
      reason: 'Crisis history and current warning signs shape the urgency of the read. Without them visible the map cannot assess whether current signals are normal load or escalating risk.',
    },
    {
      key:    'isolation_level',
      name:   'Isolation level',
      rx:     /\b(alone|no one|I have not spoken|I have not left|I have not seen|no contact|I am isolated|people around me|I have people|I am not alone)\b/i,
      reason: 'Isolation level is one of the most significant predictors of deterioration. Without it described the map cannot assess support adequacy.',
    },
    {
      key:    'direction',
      name:   'What stability or recovery means',
      rx:     /\b(I want|my goal|what recovery looks like|what stable means|I am working toward|I hope|what I am aiming for|what good looks like|I would like to)\b/i,
      reason: 'Without a stated direction the map cannot assess whether current activity is moving toward something the person actually wants.',
    },
  ],


  skills: [
    {
      key:              'treatment_engagement',
      name:             'Engaging with treatment or support',
      rx:               /\b(I attended|I took|I called|I used|I spoke to|I reached out|I applied|I accessed|I went to|I kept|I maintained|I tried)\b/i,
      loadSensitive:    true,
      isStructureSkill: true,
      works:            'Consistently engaging with treatment, medication, therapy, or support — especially during difficult periods.',
      breaks:           'Symptom load, side effects, or loss of hope causes disengagement — often the moment when support is most needed.',
    },
    {
      key:              'using_coping_strategies',
      name:             'Using coping strategies',
      rx:               /\b(I used|I tried|I applied|my coping|what helps|I did the|I went for a walk|I called|I used the crisis plan|I reached out|I used the strategy)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:            'Actively using known coping strategies when symptoms increase — rather than waiting until the situation is critical.',
      breaks:           'The coping strategy is known but not used when it is most needed — shame, stigma, or loss of energy prevents its use.',
    },
    {
      key:              'honest_disclosure',
      name:             'Honest disclosure of state',
      rx:               /\b(I told them|I was honest|I said how bad|I disclosed|I admitted|I said I was struggling|I told my worker|I told someone|I said it out loud|I shared)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'Telling someone — a clinician, support worker, friend — what is actually happening rather than the managed version.',
      breaks:           'Stigma, fear of hospitalisation, or not wanting to worry others causes the real state to stay hidden — support cannot respond to what it cannot see.',
    },
    {
      key:              'maintaining_routine',
      name:             'Maintaining routine',
      rx:               /\b(I kept to|I maintained|I got up|I went|I did my|I kept the routine|despite|I still did|I managed to|I forced myself|I kept going)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:            'Maintaining basic daily routine — getting up, eating, moving — even during difficult periods.',
      breaks:           'Symptoms cause the routine to collapse — the structure that supports function disappears when it is most needed.',
    },
  ],


  contradictions: [
    {
      a:    /\b(I am okay|I am fine|I am managing|I am coping|I am doing alright|it is under control|I am stable)\b/i,
      b:    /\b(I have not left|I have not eaten|I have not slept|I am not functioning|I cancelled|I did not go|I have been isolating|I have been struggling|I am not really okay)\b/i,
      text: 'A stated sense of being okay and described functional difficulty both appear. In mental health contexts, presenting as managing while struggling is extremely common. The specific functional descriptions are the more reliable read.',
    },
    {
      a:    /\b(I want to get better|I want to recover|I am trying|I am working on it|I know what I need to do|I have a plan)\b/i,
      b:    /\b(I have not taken|I have not attended|I stopped|I have not been|I have been avoiding|I have not done|I have not used|I have not called)\b/i,
      text: 'Stated desire to recover and consistent non-engagement with what is needed both appear. Wanting to get better and being able to take the required steps are different things — especially when symptoms are active.',
    },
  ],


  directionPatterns: [
    { rx: /stable|stability|managing|cope|function|hold it together/i,        label: 'toward stability and functional management' },
    { rx: /recover|recovery|well|better|improve|get to a better place/i,      label: 'toward recovery' },
    { rx: /work|job|return to work|back to normal|participate|engage/i,       label: 'toward returning to work or participation' },
    { rx: /relationship|connect|people|not alone|support around me/i,        label: 'toward connection and reducing isolation' },
    { rx: /understand|make sense|why|what is happening|the diagnosis/i,       label: 'toward understanding the condition' },
  ],


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


// ── Public Service ────────────────────────────────────────

const GuidePublicService = {

  id:      'guide-public-service',
  version: '0.3.0',
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


  gaps: [
    {
      key:    'delivery_goal',
      name:   'Delivery goal or outcome',
      rx:     /\b(the goal|the outcome|what we are trying to achieve|the objective|what success looks like|the target|what we need to deliver|the policy aim)\b/i,
      reason: 'Without a stated delivery goal the map cannot assess whether process activity is aligned with the intended outcome.',
    },
    {
      key:    'blockage',
      name:   'Blockage named',
      rx:     /\b(blocked|waiting on|dependency|they have not|no decision|not approved|sign off|I cannot proceed until|the hold up|what is stopping|stuck at)\b/i,
      reason: 'Named blockages can be escalated. Unnamed blockages become invisible — the map reads process activity without knowing why progress has stalled.',
    },
    {
      key:    'decision_owner',
      name:   'Decision owner identified',
      rx:     /\b(who decides|whose decision|the decision owner|accountability|who is responsible|who owns|who has sign off|the minister|the director|the approval)\b/i,
      reason: 'Without a named decision owner accountability cannot be placed. Distributed accountability is often no accountability.',
    },
    {
      key:    'resource_gap',
      name:   'Resource gap described',
      rx:     /\b(no budget|underfunded|no staff|resource gap|capacity|we do not have enough|the constraint is|what we are missing|what we need|the gap in provision)\b/i,
      reason: 'Resource gaps left unnamed become invisible constraints. Whether the delivery problem is a resource problem or an execution problem changes what the right next step is.',
    },
    {
      key:    'direction',
      name:   'Stated direction',
      rx:     /\b(we are trying to|the direction is|what we are working toward|the policy intent|the programme goal|where we need to get to|the vision)\b/i,
      reason: 'Without a stated direction the map cannot assess whether current activity is aligned or whether the team is moving in different directions.',
    },
  ],


  skills: [
    {
      key:              'delivering_milestones',
      name:             'Delivering milestones',
      rx:               /\b(I submitted|I completed|I escalated|I approved|I consulted|I published|I delivered|I reviewed|I notified|I actioned|I reported|I agreed|I signed off)\b/i,
      loadSensitive:    true,
      isStructureSkill: true,
      works:            'Completing process steps and milestones on time — keeping the delivery moving through institutional process.',
      breaks:           'Governance delays, resource constraint, or interdependency blocks cause milestones to slip without escalation.',
    },
    {
      key:              'escalating_blockages',
      name:             'Escalating blockages',
      rx:               /\b(I escalated|I raised|I flagged|I told|I made visible|I surfaced|I brought to attention|I reported the blockage|I said we were stuck)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'Raising blockages to the right level clearly and early rather than absorbing them or waiting for them to self-resolve.',
      breaks:           'Institutional culture, fear of appearing incompetent, or unclear escalation path causes blockages to sit until they cause delivery failure.',
    },
    {
      key:              'honest_reporting',
      name:             'Honest status reporting',
      rx:               /\b(I have to be honest|the truth is|the real position|we are behind|it is not going well|I need to flag|I have to admit|the status is not|I need to raise)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'Reporting delivery status accurately — including slippage, risk, and problems — rather than the version that looks best.',
      breaks:           'Accountability pressure causes status reports to become performative — the reported position diverges from the real one.',
    },
    {
      key:              'placing_accountability',
      name:             'Placing accountability specifically',
      rx:               /\b(I assigned|the owner is|accountability sits with|I made clear who|I confirmed with|the decision was|I agreed with|the responsibility is|we agreed it belongs)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'Placing accountability specifically — naming who owns what — rather than leaving it distributed or assumed.',
      breaks:           'Institutional politeness or power dynamics cause accountability to remain diffuse — everyone is responsible and no one is.',
    },
  ],


  contradictions: [
    {
      a:    /\b(on track|going well|no issues|making progress|we are moving|we are delivering|things are moving|it is progressing)\b/i,
      b:    /\b(still waiting|no decision|blocked|not approved|going around|no progress|not moved|still in|same stage|no further|I keep waiting)\b/i,
      text: 'Stated progress and described blockages or stalled process both appear. Reported delivery status and actual position are not matching. Institutional reporting often diverges from operational reality — the specific blockages are the more reliable read.',
    },
    {
      a:    /\b(we have a plan|the programme is clear|we know what we are doing|the approach is set|we are aligned|everyone knows the goal)\b/i,
      b:    /\b(no one has decided|whose decision|still not agreed|different views|not aligned|competing priorities|the goal keeps changing|no clear direction)\b/i,
      text: 'Stated clarity and described misalignment or indecision both appear. Stated programme clarity and operational alignment are different things — especially in complex institutional environments.',
    },
  ],


  directionPatterns: [
    { rx: /deliver|outcome|result|impact|what we set out to|the target/i,     label: 'toward delivery of the stated outcome' },
    { rx: /reform|improve|transform|change how|better service|modernise/i,    label: 'toward service improvement or reform' },
    { rx: /stable|sustain|maintain|keep going|not lose ground|hold the line/i, label: 'toward sustaining delivery through a difficult period' },
    { rx: /accountability|governance|clarity|who does what|structure/i,       label: 'toward clearer accountability and governance' },
    { rx: /resource|funding|capacity|staffing|what we need to deliver/i,      label: 'toward securing the resources needed' },
  ],


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
