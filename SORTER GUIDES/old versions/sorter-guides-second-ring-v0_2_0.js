// ══════════════════════════════════════════════════════════
// SORTER GUIDES — Second Ring  v0.2.0
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
// v0.2.0 — four domain-knowledge sections added to all guides:
//   gaps, skills, contradictions, directionPatterns.
//   These feed directly into cartridge assembly.
//   All v0.1.0 steers unchanged.
// ══════════════════════════════════════════════════════════


// ══════════════════════════════════════════════════════════
// SUB-SECTOR — Re-entry  v0.2.0
// Parent: guide-criminal-justice
// ══════════════════════════════════════════════════════════

const GuideSubReentry = {

  id:      'guide-sub-reentry',
  version: '0.2.0',
  type:    'subsector',
  parent:  'guide-criminal-justice',
  purpose: 'Extend criminal justice guide for post-release transition. Adds housing, ID, early-period thinness, substance risk, and transition-specific signals.',
  sector:  're-entry',


  // ── Gaps ─────────────────────────────────────────────────
  // Sub-sector gaps extend parent gaps.
  // These are specific to post-release conditions.

  gaps: [
    {
      key:    'accommodation',
      name:   'Accommodation on release',
      rx:     /\b(where I am living|my address|I have a place|the hostel|supported accommodation|I am staying|I have somewhere|where I went when I got out|my housing)\b/i,
      reason: 'Accommodation is the most urgent gap in the first weeks post-release. Without it named the map cannot read stability or risk level in this period.',
    },
    {
      key:    'id_and_documents',
      name:   'ID and documents',
      rx:     /\b(ID|passport|birth certificate|bank account|proof of address|documents|I have ID|I got my|I applied for|I cannot get ID|no documents)\b/i,
      reason: 'Without ID the person cannot access benefits, employment, or banking. This single gap blocks multiple practical pathways simultaneously.',
    },
    {
      key:    'licence_conditions',
      name:   'Licence conditions',
      rx:     /\b(my conditions|I have to report|the order|my licence|I am not allowed|supervision|probation|parole|community corrections|I must|my requirements)\b/i,
      reason: 'The structural constraint on this period. Without them named the map cannot read compliance, movement space, or risk.',
    },
    {
      key:    'support_worker',
      name:   'Support worker or key contact',
      rx:     /\b(my support worker|my key worker|my probation officer|my case manager|my mentor|who I report to|who is helping me|I have a worker|I met with)\b/i,
      reason: 'Whether the person has a named support contact changes what isolation looks like and what movement toward help is possible.',
    },
    {
      key:    'substance_plan',
      name:   'Substance plan',
      rx:     /\b(substance|drinking|using|my plan for|I am not drinking|I am not using|staying clean|staying sober|my recovery|I have a plan for the|what I will do if)\b/i,
      reason: 'Substance risk in the transition period is one of the primary recall and breakdown factors. Whether there is a named plan for it — or whether it is not mentioned at all — is a critical read.',
    },
    {
      key:    'direction',
      name:   'Stated direction',
      rx:     /\b(I want|my goal|what I am building|where I want to get to|different life|what I am working toward|I am trying to|the future|what I want)\b/i,
      reason: 'Without a stated direction the map cannot assess whether current activity is building toward something or managing the immediate constraints only.',
    },
  ],


  // ── Skills ───────────────────────────────────────────────

  skills: [
    {
      key:              'navigating_first_weeks',
      name:             'Navigating the first weeks',
      rx:               /\b(I managed|I got through|I kept it together|the first week|the first days|since release|I have been out|I have not been recalled|I have not breached|I am still out)\b/i,
      loadSensitive:    true,
      isStructureSkill: true,
      works:            'Getting through the first weeks post-release — the period of highest recall risk — without breach and with basic needs addressed.',
      breaks:           'Housing failure, substance use, or return to old environment in the first weeks collapses the transition before structure can be built.',
    },
    {
      key:              'sorting_practicalities',
      name:             'Sorting practical foundations',
      rx:               /\b(I got my ID|I opened a bank account|I applied for|I sorted the|I got the|I registered|I signed up|I have benefits|I have an address|I got the documents)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:            'Working through the practical list — ID, bank account, benefits, address — that everything else depends on.',
      breaks:           'Overwhelm, shame, or not knowing where to start causes the practical list to sit undone while the person manages the immediate moment.',
    },
    {
      key:              'avoiding_old_conditions',
      name:             'Avoiding original conditions',
      rx:               /\b(stayed away|did not go back|avoided|kept my distance|said no to|I did not contact|I did not go|I walked away from|gave it a wide berth|kept clear|cut contact)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:            'Actively keeping away from the people, places, and situations that were part of the original pattern.',
      breaks:           'Loneliness, boredom, or financial pressure pulls back toward familiar environments and people.',
    },
    {
      key:              'honest_reporting',
      name:             'Honest self-reporting',
      rx:               /\b(I have to be honest|if I am honest|the truth is|I did|I went|I nearly|I was tempted|I have not been|it is worse than|I need to admit|I slipped|I am struggling)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'Describing what is actually happening rather than the version that looks like progress.',
      breaks:           'The institutional context creates performance pressure — entries shift toward showing what the system wants to see.',
    },
  ],


  // ── Contradictions ────────────────────────────────────────

  contradictions: [
    {
      a:    /\b(everything is going to be different|I have learned my lesson|I will never go back|I am a new person|this time is different|I have completely changed)\b/i,
      b:    /\b(same people|old crowd|I ran into|they contacted me|old area|old haunts|I was near|back in contact|familiar|I went back to)\b/i,
      text: 'Release optimism and contact with the original environment both appear. The stated commitment and the actual conditions are in the same picture. The map is not saying the contact is a decision — it is noting that both are present at the same time. This is the most common pattern in the transition period.',
    },
    {
      a:    /\b(I am fine|I am managing|it is going well|I have it together|things are good|I am okay|no problems)\b/i,
      b:    /\b(I have not sorted|the ID|the benefits|still no address|still no bank|I have not followed up|I have not dealt with|still not done|I keep putting off)\b/i,
      text: 'A stated sense of managing and specific practical tasks still undone both appear. In the post-release period, deferred practical tasks compound quickly — each one undone is a gap in the structure that everything else depends on.',
    },
    {
      a:    /\b(I am not going to use|I am clean|I am sober|I have not touched|staying away from|I have a plan|I am in recovery)\b/i,
      b:    /\b(craving|the pull|I was near|I was offered|I was tempted|I nearly|I wanted to|I was close|I had a moment|the old people|the old places)\b/i,
      text: 'A stated commitment to sobriety or recovery and the presence of craving, temptation, or proximity to the old conditions both appear. Both can be true simultaneously. The pull being real does not invalidate the commitment — the map holds both without resolving either.',
    },
  ],


  // ── Direction Patterns ────────────────────────────────────

  directionPatterns: [
    { rx: /stay out|not come back|never again|this is the last|clean record|not return/i,  label: 'toward not returning' },
    { rx: /family|kids|children|be there for|get back to my|reunite|my partner/i,          label: 'toward family and relationships' },
    { rx: /work|job|employment|career|trade|earn|self-sufficient/i,                        label: 'toward stable employment' },
    { rx: /different life|change|new start|fresh start|rebuild|something different/i,     label: 'toward a different life' },
    { rx: /settle|stable|normal|ordinary|quiet|peace|just want to/i,                      label: 'toward a stable ordinary life' },
  ],


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
        { key: 'housing_immediate',    rx: /\b(no address on release|hostel on release|no stable address|sofa surfing post release|nowhere to go when I got out|emergency accommodation)\b/i },
        { key: 'id_resource',          rx: /\b(no ID|no passport|no birth certificate|cannot prove identity|no bank account|no proof of address|I cannot get ID)\b/i },
        { key: 'substance_transition', rx: /\b(craving|urge|I wanted to use|temptation|I was offered|first time out|the old environment|I nearly used|I nearly drank|the pull)\b/i },
        { key: 'recall_risk',          rx: /\b(breach|recall|warning|at risk of|my licence|they could recall|I am worried about being recalled|I nearly breached)\b/i },
        { key: 'isolation_release',    rx: /\b(no one outside|I do not know anyone|everyone I know is|my contacts are all|I have no one on the outside|alone since release)\b/i },
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
        { key: 'survival_vs_programme',     rx: /\b(I have to sort housing|I cannot think about the programme|survival first|basics first|I cannot attend when I have nowhere|I have to sort the money first)\b/i },
        { key: 'family_vs_recovery',        rx: /\b(my family want me home|but they use|they are a trigger|I want to be with them but|family contact and recovery|the pull of family)\b/i },
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
// SUB-SECTOR — Addiction / Recovery  v0.2.0
// Parent: guide-medical
// ══════════════════════════════════════════════════════════

const GuideSubAddictionRecovery = {

  id:      'guide-sub-addiction-recovery',
  version: '0.2.0',
  type:    'subsector',
  parent:  'guide-medical',
  purpose: 'Extend medical guide for addiction and recovery. Adds cycle reading, relapse as data, substance-specific load, and recovery community signals.',
  sector:  'addiction-recovery',


  // ── Gaps ─────────────────────────────────────────────────

  gaps: [
    {
      key:    'substance_or_behaviour',
      name:   'What the addiction is',
      rx:     /\b(alcohol|drinking|drugs|using|substance|gambling|the behaviour|what I am addicted to|my addiction|the substance|it is|what I use|what I drink)\b/i,
      reason: 'The specific substance or behaviour needs to be named before the map can read the cycle accurately. Different substances and behaviours have different trigger patterns and hold conditions.',
    },
    {
      key:    'break_pattern',
      name:   'What breaks the hold',
      rx:     /\b(what sets it off|the trigger|what breaks it|what happened|the conditions|when it breaks|I always|every time|what led to|what came before|the pattern)\b/i,
      reason: 'The pattern that breaks the hold is the most useful thing in this map. Without it named the recovery attempt has no specific target.',
    },
    {
      key:    'trigger_conditions',
      name:   'Trigger conditions',
      rx:     /\b(trigger|what triggers|when I am|the conditions|the environment|the people|the situation|when I feel|when I am around|what sets it off|the circumstances)\b/i,
      reason: 'Triggers need to be named specifically. Vague awareness that triggers exist is different from a mapped understanding of when and where the pull is strongest.',
    },
    {
      key:    'support_network',
      name:   'Support network in recovery',
      rx:     /\b(support worker|sponsor|the programme|NA|AA|the group|my recovery community|who I call|who knows|my support|I have people|I am not doing this alone)\b/i,
      reason: 'Whether recovery is being attempted alone or with support changes the read entirely. Isolation is one of the most reliable predictors of slip.',
    },
    {
      key:    'attempt_history',
      name:   'Attempt history',
      rx:     /\b(before|last time|previous attempt|I have tried|it broke down|I got to|my longest|it went wrong|what happened last time|I have been here before|I have attempted)\b/i,
      reason: 'What has been tried before and what broke it is the most useful map of what this attempt needs to do differently.',
    },
    {
      key:    'direction',
      name:   'Stated direction',
      rx:     /\b(I want|my goal|what recovery looks like|what I am working toward|I am trying to|the life I want|what sober looks like|I hope|what I am building)\b/i,
      reason: 'Without a stated direction the map cannot assess whether recovery activity is moving toward something the person actually wants, or managing the immediate pressure only.',
    },
  ],


  // ── Skills ───────────────────────────────────────────────

  skills: [
    {
      key:              'holding_the_hold',
      name:             'Holding the hold',
      rx:               /\b(I did not use|I did not drink|I stayed clean|I stayed sober|I held|I kept it|I have not|the hold is|days clean|days sober|I am still|I have been)\b/i,
      loadSensitive:    true,
      isStructureSkill: true,
      works:            'Maintaining the substance-free or behaviour-free period — the hold — including through conditions that previously triggered use.',
      breaks:           'The trigger conditions exceed the hold capacity — isolation, shame, or a specific environment or person causes the hold to break.',
    },
    {
      key:              'navigating_triggers',
      name:             'Navigating trigger conditions',
      rx:               /\b(I managed|I got through|I did not use|I walked away|I called|I reached out|I used my plan|I distracted|I left|I did not stay|I handled it|I held)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:            'Encountering a known trigger condition — a person, place, feeling, or situation — and not using.',
      breaks:           'The trigger is too strong or the support is not available — the hold breaks in the presence of the trigger.',
    },
    {
      key:              'returning_after_slip',
      name:             'Returning after a slip',
      rx:               /\b(I came back|I returned|I went back to the programme|I called my sponsor|I told my worker|I got back on|I started again|I did not give up|I picked myself up|I tried again)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:            'After a slip, returning to the recovery attempt rather than treating the slip as the end.',
      breaks:           'The shame cycle after a slip causes the person to withdraw from support and stop attempting — the slip becomes a relapse.',
    },
    {
      key:              'honest_disclosure',
      name:             'Honest disclosure including slips',
      rx:               /\b(I used|I drank|I slipped|I told them|I was honest|I admitted|I said I had|I disclosed the slip|I did not hide it|I told my sponsor|I told my worker)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'Telling the support network — sponsor, worker, group — what actually happened, including slips.',
      breaks:           'Shame causes the slip to be hidden — the support network is working from a picture that does not include the slip, and cannot respond to it.',
    },
  ],


  // ── Contradictions ────────────────────────────────────────

  contradictions: [
    {
      a:    /\b(I am committed|I am serious this time|I really want it|I am done|I have had enough|I cannot do this anymore|I want to change|I am ready)\b/i,
      b:    /\b(I used|I drank|I slipped|I went back|I nearly|the pull|I was close|I was tempted|I nearly broke|I had a moment)\b/i,
      text: 'Genuine commitment to recovery and the presence of craving, temptation, or slip both appear. Both are real. Commitment and the pull can coexist — this is not a contradiction that needs resolving. The map holds both. The pull being present does not invalidate the commitment.',
    },
    {
      a:    /\b(I am doing well|I am in a good place|my recovery is strong|I have it under control|no cravings|I am not struggling|it is going well)\b/i,
      b:    /\b(thin material|no difficulty mentioned|no craving|no trigger|no struggle|no near-miss|nothing hard described)\b/i,
      text: 'A stated sense of recovery going well and absence of any described difficulty both appear. In recovery, absence of difficulty over an extended period is a performance signal as often as it is genuine. The map cannot determine which — it notes the pattern.',
    },
    {
      a:    /\b(I have a plan|I know what to do|I know my triggers|I have my support|I am prepared|I have strategies)\b/i,
      b:    /\b(I did not call|I did not use the plan|I did not reach out|I isolated|I did not go to the group|I stopped attending|I withdrew|I dropped the support)\b/i,
      text: 'A stated plan and the dropping of the support structures in the plan both appear. Having the plan and maintaining the structures that support it are different things — especially when load increases.',
    },
  ],


  // ── Direction Patterns ────────────────────────────────────

  directionPatterns: [
    { rx: /clean|sober|abstinent|free from|not using|not drinking/i,              label: 'toward sustained abstinence' },
    { rx: /manage|controlled|reduce|cut back|harm reduction|less/i,               label: 'toward harm reduction or managed use' },
    { rx: /life in recovery|recovery life|what recovery gives me|what I get back/i, label: 'toward a life in recovery' },
    { rx: /family|relationships|reconnect|repair|be present for/i,                label: 'toward repairing relationships' },
    { rx: /work|function|capable|who I want to be|the person I was|myself again/i, label: 'toward functioning and identity' },
  ],


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
        'substance_or_behaviour',
        'break_pattern',
        'trigger_conditions',
        'support_network',
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
// SUB-SECTOR — Mental Health  v0.2.0
// Parent: guide-medical
// ══════════════════════════════════════════════════════════

const GuideSubMentalHealth = {

  id:      'guide-sub-mental-health',
  version: '0.2.0',
  type:    'subsector',
  parent:  'guide-medical',
  purpose: 'Extend medical guide for mental health conditions. Adds functional impact, crisis signals, stigma load, and treatment engagement specifics.',
  sector:  'mental-health',


  // ── Gaps ─────────────────────────────────────────────────

  gaps: [
    {
      key:    'current_mental_state',
      name:   'Current mental state described honestly',
      rx:     /\b(I am|my state|how I am|my mood|right now|currently|I have been|things are|it has been|I feel|my mental health|where I am at)\b/i,
      reason: 'Without an honest description of current state the map cannot read whether the period is stable, deteriorating, or recovering. This is the foundational gap.',
    },
    {
      key:    'treatment_plan',
      name:   'Treatment or care plan',
      rx:     /\b(my treatment|my medication|my therapist|my care plan|the plan|I see|I am on|I have been prescribed|I attend|I am working with|my support|my psychiatrist|my psychologist)\b/i,
      reason: 'Without a described treatment or support plan the map cannot assess engagement, adherence, or what is missing from the current approach.',
    },
    {
      key:    'crisis_plan',
      name:   'Crisis plan or warning signs',
      rx:     /\b(crisis plan|my warning signs|when it gets bad|I know the signs|what to do if|my safety plan|who I call|the plan for if|I know what to do when)\b/i,
      reason: 'Whether a crisis plan exists and whether the person knows their own warning signs changes what the map can read about risk and preparation.',
    },
    {
      key:    'functional_impact',
      name:   'Functional impact',
      rx:     /\b(I cannot work|I cannot leave|basic things|I have not eaten|I have not slept|I cannot function|what I can do|what I cannot do|my capacity|daily life|day to day)\b/i,
      reason: 'Functional impact — what the person can and cannot do on a daily basis — is the primary measure of how the condition is affecting the current period.',
    },
    {
      key:    'support_network',
      name:   'Support network',
      rx:     /\b(I have people|my support|who knows|I told|who I can call|I am not alone|people around me|my family|my friends|someone I can|support worker|mental health team)\b/i,
      reason: 'Whether the person is carrying this alone or has support around them is one of the most significant variables. Isolation is both a symptom and a risk factor.',
    },
    {
      key:    'direction',
      name:   'What stability or recovery means',
      rx:     /\b(I want|my goal|what recovery looks like|what stable means|I am working toward|I hope|what I am aiming for|what good looks like|what I want)\b/i,
      reason: 'Without a stated direction the map cannot assess whether current treatment and coping activity is aligned with what the person actually wants.',
    },
  ],


  // ── Skills ───────────────────────────────────────────────

  skills: [
    {
      key:              'treatment_engagement',
      name:             'Engaging with treatment',
      rx:               /\b(I attended|I took|I kept|I called|I went|I maintained|I did not miss|I followed|I completed|I spoke to my|I saw my)\b/i,
      loadSensitive:    true,
      isStructureSkill: true,
      works:            'Consistently attending appointments, taking medication, and engaging with therapy — especially during difficult periods when disengagement feels most compelling.',
      breaks:           'Episode severity, side effects, or loss of hope causes disengagement from treatment at the moment it is most needed.',
    },
    {
      key:              'early_intervention',
      name:             'Intervening early',
      rx:               /\b(I noticed|I caught it early|I called before|I reached out when|I recognised|I used the plan|I acted before|I got help before|I did not wait|I noticed the warning signs)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'Recognising warning signs and acting on them before reaching crisis — calling for support, using the crisis plan, adjusting the environment.',
      breaks:           'Warning signs are present but not acted on — the person waits until crisis before seeking help.',
    },
    {
      key:              'honest_disclosure',
      name:             'Honest disclosure of state',
      rx:               /\b(I told them|I was honest|I said how bad|I disclosed|I admitted|I said I was struggling|I told my worker|I told someone|I said it out loud|I shared|I did not pretend)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'Telling someone — clinician, support worker, trusted person — what is actually happening rather than the managed version.',
      breaks:           'Stigma, fear of consequence, or not wanting to worry others causes the real state to stay hidden.',
    },
    {
      key:              'maintaining_function',
      name:             'Maintaining function during low periods',
      rx:               /\b(I kept going|I managed to|I got up|I did one thing|I left the house|despite|even though|I still did|I forced myself|I maintained|I did not stop)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:            'Maintaining some level of daily function — even minimal — during a low or difficult period.',
      breaks:           'The episode causes complete withdrawal — the person stops everything and isolates, which extends the low period.',
    },
  ],


  // ── Contradictions ────────────────────────────────────────

  contradictions: [
    {
      a:    /\b(I am okay|I am fine|I am managing|I am coping|I am stable|I am in a good place|no issues|my mental health is good)\b/i,
      b:    /\b(I have not left|I have not eaten|I have not slept|I cancelled|I did not go|I have been isolating|I am not functioning|I stopped|I have not been able to|basic things)\b/i,
      text: 'A stated sense of being okay and described functional difficulty both appear. Presenting as managing while struggling is one of the most consistent patterns in mental health. The functional descriptions are the more reliable read — what the person is and is not doing is more informative than how they say they are.',
    },
    {
      a:    /\b(I want to get better|I want to recover|I know what I need|I have a plan|I am working on it|I am trying)\b/i,
      b:    /\b(I have not taken|I have not attended|I stopped|I have not been|I have been avoiding|I have not used|I have not called|I have not done)\b/i,
      text: 'Stated desire to recover and consistent non-engagement with what is needed both appear. Wanting to get better and being able to take the required steps are different things — especially when symptoms are active and the steps themselves feel impossible.',
    },
  ],


  // ── Direction Patterns ────────────────────────────────────

  directionPatterns: [
    { rx: /stable|stability|manage|cope|function|hold it together|not get worse/i,   label: 'toward stability and functional management' },
    { rx: /recover|recovery|well|better|improve|get to a better place|get through/i, label: 'toward recovery' },
    { rx: /work|return to work|normal|participate|engage|back to/i,                  label: 'toward returning to work or participation' },
    { rx: /connect|relationship|people|not alone|support|less isolated/i,            label: 'toward connection and reducing isolation' },
    { rx: /understand|make sense|why|what is happening|the diagnosis|know myself/i,  label: 'toward understanding the condition' },
  ],


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
        { key: 'episode',     rx: /\b(episode|relapse|crisis|breakdown|I crashed|I hit a low|the worst it has been|I could not function|I stopped|I was not okay|acute|severe)\b/i },
        { key: 'medication',  rx: /\b(medication|meds|I stopped taking|side effects|the medication|I forgot|I ran out|it is not working|they changed my|new prescription)\b/i },
        { key: 'stigma',      rx: /\b(they would not understand|I cannot tell|what they would think|the stigma|I am embarrassed|I hide it|no one knows|I pretend I am fine)\b/i },
        { key: 'isolation',   rx: /\b(I cannot face people|I withdrew|I stopped going out|I cancelled|I avoided|I isolated|I have not left|I do not answer|I pushed people away)\b/i },
        { key: 'crisis_risk', rx: /\b(I am not safe|I had thoughts|dark thoughts|thoughts of|I was not sure I could|I called the line|I nearly|crisis point|I was close to)\b/i },
        { key: 'functional',  rx: /\b(I cannot work|I cannot leave the house|basic things|I have not eaten|I have not slept|I have not showered|I cannot function|I am not able to)\b/i },
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
// SUB-SECTOR — Prison Education  v0.2.0
// Parent: guide-education
// ══════════════════════════════════════════════════════════

const GuideSubPrisonEducation = {

  id:      'guide-sub-prison-education',
  version: '0.2.0',
  type:    'subsector',
  parent:  'guide-education',
  purpose: 'Extend education guide for custodial education. Adds institutional constraints, release goal as direction anchor, disruption signals, and in-custody motivation dynamics.',
  sector:  'prison-education',


  // ── Gaps ─────────────────────────────────────────────────

  gaps: [
    {
      key:    'current_course_or_qualification',
      name:   'Current course or qualification',
      rx:     /\b(I am doing|the course|the qualification|I am studying|what I am learning|my subject|the class|what I am working toward|the certificate|the diploma)\b/i,
      reason: 'Without knowing what the person is studying the map cannot assess whether engagement, disruption, or motivation signals are significant.',
    },
    {
      key:    'release_goal_connection',
      name:   'Connection between education and release goal',
      rx:     /\b(when I get out|after release|for when I leave|it will help me|I can use it|the qualification will|it connects to|I am doing it for|the reason I am studying|what it is for)\b/i,
      reason: 'Education connected to a release goal is the most reliable motivational anchor in custodial settings. Without this connection named the map cannot read whether motivation is instrumental or genuinely engaged.',
    },
    {
      key:    'disruption_history',
      name:   'Disruption history',
      rx:     /\b(I was transferred|they moved me|I lost my place|adjudication|lockdown|I was taken off|the class was cancelled|disrupted|I had to start again|I missed because)\b/i,
      reason: 'Institutional disruption is a primary driver of education breakdown in custody. Without it named the map cannot distinguish personal disengagement from imposed interruption.',
    },
    {
      key:    'motivation_foundation',
      name:   'Motivation foundation',
      rx:     /\b(I am doing it because|the reason I|why I study|what keeps me going|it matters because|I find it|I am interested in|I enjoy|it gives me|I want to|what I get from it)\b/i,
      reason: 'Whether motivation is instrumental (gets me out of the cell), genuinely interested, or connected to a future goal shapes how resilient it is to disruption.',
    },
    {
      key:    'direction',
      name:   'Stated direction',
      rx:     /\b(I want|my goal|what I am working toward|when I get out|after custody|the future|I am building toward|I hope|I am aiming for|what I want to do)\b/i,
      reason: 'Without a stated direction the map cannot assess whether education activity is purposeful or filling time.',
    },
    {
      key:    'post_release_plan',
      name:   'Post-release plan connection',
      rx:     /\b(when I am released|after I get out|the plan for when I leave|my release plan|post release|outside|when I am free|I will use this when|it will help when)\b/i,
      reason: 'Whether the education is connected to a post-release plan is the primary signal of whether the motivation will survive the transition out of custody.',
    },
  ],


  // ── Skills ───────────────────────────────────────────────

  skills: [
    {
      key:              'returning_after_disruption',
      name:             'Returning after disruption',
      rx:               /\b(I went back|I returned|I started again|I picked it up|I got back to|I resumed|I did not give up on|I kept going after|I continued despite|I went back to education)\b/i,
      loadSensitive:    true,
      isStructureSkill: true,
      works:            'Returning to education after a disruption — transfer, adjudication, lockdown — rather than treating the break as the end.',
      breaks:           'Disruption is used as a reason to stop rather than a reason to restart — the person does not return after the institutional interruption.',
    },
    {
      key:              'connecting_to_future',
      name:             'Connecting education to future',
      rx:               /\b(when I get out|this will help|I can use this|it connects to|I am doing this for|the qualification means|after release|the plan|what I am building|it feeds into)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'Explicitly linking the education to a post-release goal — giving the study a reason beyond passing time.',
      breaks:           'The link between education and future is not made — motivation stays instrumental and fragile.',
    },
    {
      key:              'studying_despite_environment',
      name:             'Studying despite environment',
      rx:               /\b(despite|even though|the noise|the wing|they laugh|I still went|I kept going|I did not let it stop me|I ignored|I studied anyway|I kept at it)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:            'Continuing to study despite the wing culture, noise, peer pressure, or lack of support from others.',
      breaks:           'Peer culture pressure or environmental conditions cause the person to stop attending or engaging to avoid standing out.',
    },
    {
      key:              'honest_motivation',
      name:             'Honest reporting of motivation',
      rx:               /\b(I go because it gets me out|I am not sure it will help|I do not know if I am interested|I am trying to find a reason|it passes the time|I want to believe|I am not sure why|honestly I)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'Describing the actual motivation honestly — including when it is instrumental or uncertain — rather than performing engagement.',
      breaks:           'Entries describe consistent enthusiasm that the functional picture does not support — the map loses the real motivational state.',
    },
  ],


  // ── Contradictions ────────────────────────────────────────

  contradictions: [
    {
      a:    /\b(I want to study|I am committed|education is important|I want to qualify|I see the value|I know it will help|I want to use the time well)\b/i,
      b:    /\b(I have not attended|I stopped going|I gave up|I have not submitted|I have been avoiding|what is the point|I do not see why|I have not been)\b/i,
      text: 'Stated commitment to education and disengagement from it both appear. The contradiction may reflect institutional disruption, peer culture pressure, or genuine motivational conflict. The map holds both and notes what conditions surround each.',
    },
    {
      a:    /\b(I go every day|I never miss|I always attend|I am doing everything|the teacher is happy|I am a model student)\b/i,
      b:    /\b(I go because it gets me out|just to get out of the cell|it passes the time|something to do|not because I want to|I am not really engaged|I am not learning)\b/i,
      text: 'Perfect attendance and instrumental or disengaged motivation both appear. Attendance and engagement are different things in custodial education. The person may be present without learning — the map reads both without equating them.',
    },
  ],


  // ── Direction Patterns ────────────────────────────────────

  directionPatterns: [
    { rx: /qualify|qualification|certificate|complete the course|finish the/i,     label: 'toward completing a qualification' },
    { rx: /release|when I get out|after custody|prepare for|ready for outside/i,   label: 'toward using education for release' },
    { rx: /career|job|work|profession|trade|employment after/i,                    label: 'toward post-release employment' },
    { rx: /learn|understand|knowledge|interested in|enjoy|develop|grow/i,          label: 'toward genuine learning and development' },
    { rx: /pass time|get through|use the time|not waste|make something of/i,       label: 'toward using time constructively' },
  ],


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
        { key: 'transfer',         rx: /\b(moved|transferred|new wing|new prison|I was moved|they moved me|I lost my place|disrupted by|the transfer|I had to start again)\b/i },
        { key: 'adjudication',     rx: /\b(adjudication|nicking|report|I was put on|I lost privileges|I was taken off|the adjudication|the hearing|I was punished|they stopped me attending)\b/i },
        { key: 'environment',      rx: /\b(the wing|the cell|noise|other inmates|I cannot concentrate|the environment|it is too loud|people laugh at me|the culture|taking the piss)\b/i },
        { key: 'motivation',       rx: /\b(what is the point|it will not help|I will not use it|no one will employ me|I have a record|what difference|nobody cares|I am just doing time|it is just something to do)\b/i },
        { key: 'release_pressure', rx: /\b(release date|I am getting out|I need to be ready|what happens when I get out|I am thinking about release|after custody|when I leave)\b/i },
        { key: 'family_contact',   rx: /\b(my children|my family|visits|calls|letters|I am thinking about|they need me|when I get home|what I am missing)\b/i },
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
