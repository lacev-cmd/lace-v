// ══════════════════════════════════════════════════════════
// SORTER GUIDE — Criminal Justice  v0.3.0
// Steering layer. Self-contained. No engine code here.
//
// v0.3.0 — Australian vernacular extension:
//   Same vernacular additions as re-entry guide v0.3.0.
//   Criminal justice guide covers broader context —
//   in-custody, pre-sentence, supervision, and post-release.
//   Vernacular patterns shared across the sector.
//
// All other steers unchanged from v0.2.0.
// ══════════════════════════════════════════════════════════

const GuideCriminalJustice = {

  id:      'guide-criminal-justice',
  version: '0.3.0',
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
