// ══════════════════════════════════════════════════════════
// SORTER GUIDE — Criminal Justice  v0.4.0
// Steering layer. Self-contained. No engine code here.
//
// v0.4.0 — four domain-knowledge sections added:
//   gaps, skills, contradictions, directionPatterns.
//   These feed directly into the cartridge assembly.
//   All v0.3.0 steers unchanged.
// ══════════════════════════════════════════════════════════

const GuideCriminalJustice = {

  id:      'guide-criminal-justice',
  version: '0.4.0',
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


  // ── Gaps ─────────────────────────────────────────────────

  gaps: [
    {
      key:    'order_conditions',
      name:   'Current order or licence conditions',
      rx:     /\b(my conditions|the order says|I have to report|I am not allowed|licence condition|supervision|probation|parole|community corrections|I have to|I must)\b/i,
      reason: 'Without knowing the current order conditions the map cannot read compliance, constraint, or risk. This is the structural context for everything else in this period.',
    },
    {
      key:    'risk_environment',
      name:   'Risk environment',
      rx:     /\b(old area|old crowd|same people|they are still|I ran into|they contacted me|familiar|old haunts|the environment|risky|the temptation|what is around me)\b/i,
      reason: 'The risk environment is the primary pressure on pattern change. Without it named the map cannot assess whether the conditions for the original pattern are still present.',
    },
    {
      key:    'support_network',
      name:   'Support network',
      rx:     /\b(I have|support|people around me|my family|my key worker|my support worker|someone I can|I am not alone|I have people|the programme|the organisation)\b/i,
      reason: 'Whether the person is navigating this alone or has support around them changes what the map can read. Isolation is itself a significant risk factor.',
    },
    {
      key:    'attempt_history',
      name:   'History of previous attempts',
      rx:     /\b(before|last time|previous|I have tried|it broke down|it went wrong|what happened last time|the pattern|before this|I have been here before)\b/i,
      reason: 'What has been tried before and what broke it is one of the most useful things the map can read. Without it the current attempt looks like the first one.',
    },
    {
      key:    'direction',
      name:   'Stated direction',
      rx:     /\b(I want|my goal|what I am working toward|different life|what I am building|where I want to get to|I am trying to|the future|what I want)\b/i,
      reason: 'Without a stated direction the map cannot assess whether current activity is moving toward something or simply managing the immediate constraints.',
    },
  ],


  // ── Skills ───────────────────────────────────────────────

  skills: [
    {
      key:              'compliance',
      name:             'Meeting licence or order conditions',
      rx:               /\b(I reported|I attended|I kept|I completed|I signed|I maintained|I went to|I submitted|I told|I disclosed|I showed up|I did not miss|I kept the appointment)\b/i,
      loadSensitive:    true,
      isStructureSkill: true,
      works:            'Meeting every licence or order condition — reporting, attending appointments, completing programmes — consistently.',
      breaks:           'Pressure, boredom, or competing demands causes conditions to slip — breach risk accumulates and the structural position deteriorates.',
    },
    {
      key:              'avoiding_original_conditions',
      name:             'Avoiding the original conditions',
      rx:               /\b(stayed away|did not go back|avoided|kept my distance|said no to|I did not contact|I did not go|I walked away from|I chose not to|cut contact|kept clear|gave it a wide berth)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:            'Actively keeping away from the people, places, and situations that were part of the original pattern.',
      breaks:           'Loneliness, financial pressure, or boredom pulls back toward familiar environments and people.',
    },
    {
      key:              'honest_reporting',
      name:             'Honest self-reporting',
      rx:               /\b(I have to be honest|if I am honest|the truth is|I did|I went|I contacted|I nearly|I was tempted|I have not been|it is worse than|I need to admit|I slipped|I am struggling)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'Describing what is actually happening rather than the version that looks like compliance or progress.',
      breaks:           'Institutional context creates performance pressure — entries shift toward showing the system what it wants to see.',
    },
    {
      key:              'navigating_triggers',
      name:             'Navigating trigger situations',
      rx:               /\b(I managed|I kept my head|I walked away|I did not react|I held it|I stayed calm|I noticed and did not|I chose not to|I handled it|I de-escalated|I avoided the situation)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:            'Encountering a situation that would previously have triggered the original pattern and responding differently.',
      breaks:           'High load, isolation, or the right combination of triggers causes the old response to reassert.',
    },
  ],


  // ── Contradictions ────────────────────────────────────────

  contradictions: [
    {
      a:    /\b(I have changed|I am different now|I understand now|I know what I did|I will not do it again|I have learned|I am a changed person)\b/i,
      b:    /\b(same pattern|I did it again|same mistake|keeps happening|I always|got into trouble|incident|I lost it again|back to the same|I am back)\b/i,
      text: 'Stated change and the same pattern both appear. Both can be true at once — insight and behaviour change at different speeds. The map holds both without deciding which is more real. The pattern is the more reliable read of current state.',
    },
    {
      a:    /\b(I have a plan|I know what I need to do|I have it worked out|I am clear|the plan is|my goal is)\b/i,
      b:    /\b(I have not done|I keep putting off|I have been avoiding|I have not started|it has not happened|still not|I have not followed up)\b/i,
      text: 'A stated plan and consistent inaction on that plan both appear. Having the plan and executing it are different things. The gap between them is where the next useful entry sits.',
    },
    {
      a:    /\b(different life|I have changed|I am not that person|I want something different|I am building|new start|fresh start)\b/i,
      b:    /\b(old crowd|same people|they called|I ran into|back in contact|familiar|I know where this goes|same environment|same place|old mob|old haunts)\b/i,
      text: 'A stated commitment to a different life and contact with the original environment both appear — even if the contact seems casual or one-sided. The map is not saying the contact is a decision. It is noting that the original conditions and the stated direction are in the same picture at the same time.',
    },
  ],


  // ── Direction Patterns ────────────────────────────────────

  directionPatterns: [
    { rx: /different life|change|new start|fresh start|rebuild|not come back/i,   label: 'toward a different life' },
    { rx: /family|kids|children|be there for|get back to my|reunite/i,            label: 'toward family and relationships' },
    { rx: /work|job|employment|career|trade|qualification|earn/i,                  label: 'toward stable employment' },
    { rx: /stay out|not return|clean record|no more|never again|this is the last/i, label: 'toward not returning' },
    { rx: /settle|stable|normal|ordinary|quiet life|just want to|peace/i,         label: 'toward a stable ordinary life' },
  ],


  steer: {

    'avoidance-detection': {
      defaultActionRx: /\b(
        I reported|I attended|I kept|I completed|I stayed away|I did not|
        I maintained|I went to|I signed|I submitted|I told|I disclosed|
        smashed it|nailed it|got it done|sorted it out|kept my nose clean|
        stayed out of trouble|kept my head down|fronted up|rocked up|
        showed face|put my hand up|had a yarn with|touched base with|
        gave it a wide berth|walked away from|did the right thing|stepped up
      )\b/ix,
      notAvoidance: [
        'Not contacting a victim as required by order.',
        'Avoiding a known trigger location on advice.',
        'Waiting for supervision appointment — not missing it.',
        'Strategic avoidance of high-risk peers or environments.',
        'Giving old haunts or old crowd a wide berth on advice.',
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
        'Old crowd or old area avoided.',
        'Kept nose clean — sustained clean period.',
        'Fronted up — showed up when hard.',
        'Gave it a crack — attempted something new.',
      ],

      vernacularActionRx: /\b(
        smashed it|nailed it|knocked it over|got it done|sorted it out|
        pulled it off|kept my nose clean|stayed out of trouble|
        kept my head down|had a yarn|caught up with|touched base|
        fronted up|rocked up|showed face|put my hand up|
        got on top of|took care of it|gave it a wide berth|
        walked away from the|did the right thing|stepped up|came good|
        gave it a crack|gave it a go|made a fist of it|held my ground|
        kept it together|didn't muck it up|didn't blow it|
        got back on track|back on the straight and narrow|
        kept the faith|stayed the course|done the right thing
      )\b/ix,

      vernacularStuckRx: /\b(
        doing my head in|doing my block|going around in circles|
        same old same old|back to square one|same mob|same crowd|
        back with the same crowd|old haunts|old stomping ground|
        can't catch a break|can't get ahead|cooked it|stuffed it up|
        mucked it up|blew it|binned it|chucked it in|gave it away
      )\b/ix,

      defaultStuckRx: /\b(
        same situation|same people|same places|back to|recalled|breach|
        same pattern|nothing has changed|I keep ending up|it always goes the same|
        no further|doing my head in|going around in circles|same mob|
        back with the same crowd|cooked it|stuffed it up|blew it
      )\b/ix,
    },

    'load-sensitive-capability': {
      defaultLoadSignals: [
        { key: 'licence',   rx: /\b(licence|conditions|probation|parole|supervision|my officer|breach|recalled|warning|I have to report|community corrections)\b/i },
        { key: 'peers',     rx: /\b(old friends|same people|they contacted me|I ran into|they want me to|peer pressure|the group|I was with|old mob|old crowd|the boys|the crew)\b/i },
        { key: 'stigma',    rx: /\b(they found out|my record|background check|I had to tell|disclosure|they know|DBS|criminal record|my past|they googled)\b/i },
        { key: 'housing',   rx: /\b(no address|sofa|hostel|temporary|nowhere|I do not have a stable|I am moving around|couch surfing|no fixed address)\b/i },
        { key: 'financial', rx: /\b(no money|no income|benefits|I cannot pay|financial pressure|I am broke|no ID|no bank|skint|flat broke|Centrelink|not a cent)\b/i },
      ],

      vernacularLoadRx: /\b(
        crook|under the weather|not the best|feeling ordinary|feeling rough|
        flat out|done in|cooked|running on empty|burnt out|hit a wall|
        doing it tough|doing it hard|doing it rough|having a rough trot|
        rough trot|bad trot|tough going|tough gig|hard yakka|
        at the end of my rope|at the end of my tether|
        not coping|can't cope|struggling badly|really struggling|
        falling apart|going under|barely keeping my head above water|
        not in a good place|in a dark place|pretty low|pretty rough
      )\b/ix,
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

    'confidence-calibration': {
      sectorNote:
        'Criminal justice maps are frequently thin on honest material. The institutional context creates performance pressure. A map that reads well may be well-managed rather than well-evidenced. Thin reads and inferred reads are expected and must be labelled. Note: vernacular entries may read as thin because action language is idiomatic — this is a regex limitation, not a movement limitation.',
    },

    'state-change-detection': {
      minimumSeparationDays: 28,
      sectorNote:
        'Desistance requires long-arc evidence — not short-term compliance. Extended minimum separation. Stated intention is not desistance. Short-term compliance is not desistance.',
      watchFor: [
        'Pattern associated with offending not appearing in conditions that previously triggered it.',
        'Licence compliance sustained beyond initial period.',
        'New direction with evidenced steps toward it.',
        'Relationship repair with behavioural evidence.',
        'Risk environment navigation across multiple periods.',
        'Old crowd or old area consistently avoided across multiple independent periods.',
      ],
    },

    'competing-priorities': {
      costSignals: [
        { key: 'compliance_vs_recovery',  rx: /\b(reporting|I have to see my officer|conditions|supervision|but also recovery|but I also need|programme clashes|it conflicts with)\b/i },
        { key: 'family_vs_order',         rx: /\b(my family|my children|the order|I cannot see|restricted contact|the conditions say|I want to but the order|the kids|my missus|my partner)\b/i },
        { key: 'employment_vs_licence',   rx: /\b(work and reporting|shift and appointment|it clashes|the hours|I cannot do both|employment versus|work conflicts with)\b/i },
      ],
    },

    'external-constraint-reading': {
      defaultConstraintRx: /\b(
        my conditions|the order says|I am not allowed|restricted from|banned from|
        I need my officer to|waiting for licence|I cannot travel|I cannot contact|
        the court said|legally I cannot|my licence prevents|supervision requires|
        waiting on community corrections|community corrections has not|
        parole board|waiting on the board|waiting to hear from|
        out of my hands|nothing I can do until|have to wait and see|
        waiting on Centrelink|Centrelink has not processed
      )\b/ix,
      notAvoidance: [
        'Licence condition preventing an action — legal constraint.',
        'Restricted contact order — legal constraint.',
        'Travel restriction — legal constraint.',
        'Waiting for supervision approval — institutional constraint.',
        'Cannot access without probation sign-off — institutional constraint.',
        'Waiting on community corrections decision — institutional constraint.',
        'Parole board decision pending — institutional constraint.',
      ],
    },

    'meta-reading': {
      sectorNote:
        'Performance for the system is the primary meta-reading risk in criminal justice. Institutional compliance language, always-positive entries, and absence of difficulty are especially significant performance signals. Note: short vernacular entries are not automatically performance — a pattern of them without any difficulty content is.',
      performanceSignals: [
        {
          key: 'institutional_compliance',
          rx:  /\b(I am doing everything right|I am fully compliant|I am meeting all conditions|I have not breached|my officer is satisfied|they have no concerns|I am ticking every box|I am doing what is asked)\b/i,
        },
        {
          key: 'desistance_performance',
          rx:  /\b(I am a changed person|I am not that person anymore|I have completely changed|I will never go back|I have turned my life around|I am a different man|I am a different woman)\b/i,
        },
        {
          key: 'vernacular_performance',
          rx:  /\b(all good|sweet|no dramas|no worries|going good|everything is sweet|no issues|all sweet|sweet as|yeah good|yeah all good)\b/i,
        },
      ],
      honestySignals: [
        {
          key: 'honest_difficulty',
          rx:  /\b(I was tempted|I nearly|it was hard|I almost|the pull was there|I wanted to but|I struggled with|it is not easy|I had a moment)\b/i,
        },
        {
          key: 'honest_environment',
          rx:  /\b(they are still around|I still see them|the area is still risky|it is harder than I thought|the temptation is real|I am not going to pretend)\b/i,
        },
        {
          key: 'vernacular_honesty',
          rx:  /\b(
            not going to beat around the bush|fair dinkum|to be straight|
            straight up|no bull|I nearly lost it|nearly stuffed it|nearly blew it|
            it was touch and go|came close|too close for comfort|
            doing it tough if I am honest|not going to lie|
            bit of a struggle|harder than I thought|not going to pretend|
            not easy if I am being real|if I am being straight
          )\b/ix,
        },
      ],
    },

  },

};
