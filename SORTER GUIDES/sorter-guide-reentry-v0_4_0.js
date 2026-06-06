// ══════════════════════════════════════════════════════════
// SORTER GUIDE — Re-entry  v0.4.0
// Steering layer. Self-contained. No engine code here.
// Attach with: SorterSpine.attachGuide(GuideReentry);
//
// v0.4.0 — four domain-knowledge sections added:
//   gaps, skills, contradictions, directionPatterns.
//   These feed directly into the cartridge assembly.
//   All v0.3.0 steers unchanged.
// ══════════════════════════════════════════════════════════

const GuideReentry = {

  id:      'guide-reentry',
  version: '0.4.0',
  type:    'sector',
  parent:  null,
  purpose: 'Steer sorter behaviours toward re-entry conditions, pressures, and movement signals.',
  sector:  're-entry',

  sectorNotes: {
    distinctivePressures: [
      'Housing instability immediately post-release.',
      'Licence and supervision conditions as structural constraints.',
      'Stigma and disclosure burden.',
      'Return to known high-risk environments or people.',
      'Family relationship damage or distance.',
      'Financial pressure — no ID, no bank account, no income.',
      'Institutional distrust built from prior experience.',
      'Substance use risk in transition period.',
    ],
    distinctiveMovement: [
      'Appointment attended.',
      'Reporting kept.',
      'Programme session completed.',
      'Accommodation secured or applied for.',
      'ID obtained or applied for.',
      'Employment contact made.',
      'Support worker met.',
      'Contact with family restored.',
      'Licence condition met.',
      'Trigger situation navigated without incident.',
      'Boundaries maintained with known risks.',
      'Substance use held or reduced.',
    ],
    distinctiveGaps: [
      'Current licence or order conditions not described.',
      'Housing status not described.',
      'Risk environment not named.',
      'Support network not visible.',
      'Direction — what the person is building toward — not stated.',
    ],
    outputAudience:  'Individual, support worker, probation officer, re-entry mentor, or case worker.',
    outputRegister:  'Honest. Non-moralising. Evidence-bound. No flattery. No risk-score language.',
  },


  // ── Gaps ─────────────────────────────────────────────────

  gaps: [
    {
      key:    'housing',
      name:   'Housing status',
      rx:     /\b(where I am living|my accommodation|I have a place|I am staying|the housing|I have a room|I am in|supported accommodation|I have an address|where I live)\b/i,
      reason: 'Housing is the foundation of everything in the post-release period. Without it described the map cannot read stability or risk level.',
    },
    {
      key:    'licence_conditions',
      name:   'Licence or order conditions',
      rx:     /\b(my conditions|I have to report|the order|my licence|I am not allowed|supervision|probation|parole|community corrections|I must|my requirements)\b/i,
      reason: 'The licence conditions are the structural constraint on this period. Without them named the map cannot read compliance, constraint, or what the real movement space is.',
    },
    {
      key:    'avoidance',
      name:   'Avoidance pattern',
      rx:     /\b(avoiding|I have not done|I keep putting off|I know I should|I have not started|I should have|I have not followed up|I have not called|I have not gone|still not done|I keep meaning to)\b/i,
      reason: 'Practical tasks being deferred compound quickly in the post-release period. The licence not sorted, the form not filled, the appointment not made — each deferred task is a gap in the structure.',
    },
    {
      key:    'support_network',
      name:   'Support network',
      rx:     /\b(I have|support|people around me|my family|my key worker|my support worker|someone I can|I am not alone|I have people|the programme|who I can call)\b/i,
      reason: 'Whether the person is navigating this alone or has support changes what the map can read. Isolation is one of the most significant pressure factors in this period.',
    },
    {
      key:    'direction',
      name:   'Stated direction',
      rx:     /\b(I want|my goal|what I am working toward|different life|what I am building|where I want to get to|I am trying to|the future|what I want|I am aiming)\b/i,
      reason: 'Without a stated direction the map cannot assess whether current activity is building toward something or managing the immediate constraints.',
    },
  ],


  // ── Skills ───────────────────────────────────────────────

  skills: [
    {
      key:              'structure',
      name:             'Holding a daily structure',
      rx:               /\b(routine|structure|getting up|keeping to|showing up|went to work|stayed on|I kept|I maintained|I did not stop|I forced myself|the routine|I have been|regular)\b/i,
      loadSensitive:    true,
      isStructureSkill: true,
      works:            'Keeping a functional daily structure — work, routine, movement — especially when it is effortful.',
      breaks:           'Pressure, boredom, or the wrong environment collapses structure and the days start to blur.',
    },
    {
      key:              'avoiding_original_conditions',
      name:             'Avoiding the original conditions',
      rx:               /\b(stayed away from|did not go back|avoided|kept my distance|said no to|I did not contact|I did not go|I walked away from|I chose not to|cut contact|I am not in that|I kept clear|gave it a wide berth)\b/i,
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
      works:            'Describing what is actually happening rather than the version that looks like progress.',
      breaks:           'Entries shift toward performing okayness — the map starts reading the performance, not the reality.',
    },
    {
      key:              'navigating_triggers',
      name:             'Navigating trigger situations',
      rx:               /\b(I managed|I kept my head|I walked away|I did not react|I held it|I stayed calm|I noticed and did not|I chose not to|I handled it|kept my head down|gave it a wide berth)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:            'Encountering a situation that would previously have triggered the original pattern and responding differently.',
      breaks:           'High load, isolation, or the right combination of triggers causes the old response to reassert.',
    },
  ],


  // ── Contradictions ────────────────────────────────────────

  contradictions: [
    {
      a:    /\b(I have changed|I am different|I understand now|I know what I did|I won't do it again|I have learned)\b/i,
      b:    /\b(same pattern|I did it again|same mistake|keeps happening|I always|got into trouble|incident|I lost it again)\b/i,
      text: 'Stated change and the same pattern both appear. Both can be true at once — insight and behaviour change at different speeds. The map holds both without deciding which is more real.',
    },
    {
      a:    /\b(I have a plan|I know what I need to do|I have it worked out|I am clear|the plan is|my goal is)\b/i,
      b:    /\b(I have not done|I keep putting off|I have been avoiding|I have not started|I have not followed up|it has not happened|still not)\b/i,
      text: 'A stated plan and consistent inaction on that plan both appear. Having the plan and executing it are different things. The gap between them is where the next useful entry sits.',
    },
    {
      a:    /\b(moving forward|things are moving|I am making progress|it is going well|I am getting there|things are coming together)\b/i,
      b:    /\b(still not done|I have not sorted|I keep putting off|still not started|the form|the licence|the appointment|still not followed up|I have not dealt with)\b/i,
      text: 'A general sense of forward movement and specific practical tasks still undone both appear. Progress and avoidance can coexist — the map reads both. Deferred practical tasks in this period have real consequences that compound the longer they sit.',
    },
    {
      a:    /\b(different life|I have changed|I am not that person|I want something different|I am building|new start|fresh start)\b/i,
      b:    /\b(old crowd|same people|they called|I ran into|back in contact|familiar|I know where this goes|same environment|same place|old mob|old haunts)\b/i,
      text: 'A stated commitment to a different life and any contact with the original environment both appear — even if the contact seems casual or one-sided. The map is not saying the contact is a decision. It is noting that the original conditions and the stated direction are in the same picture at the same time.',
    },
  ],


  // ── Direction Patterns ────────────────────────────────────

  directionPatterns: [
    { rx: /get back to|return to|reunite|my family|my kids|be there for/i,       label: 'toward family and relationships' },
    { rx: /work|job|employment|career|trade|qualification|earn/i,                 label: 'toward stable employment' },
    { rx: /stay out|not come back|never again|this is the last|clean record/i,    label: 'toward not returning' },
    { rx: /different life|change|new start|fresh start|rebuild/i,                 label: 'toward a different life' },
    { rx: /settle|stable|normal|ordinary|quiet life|just want to|peace/i,        label: 'toward a stable ordinary life' },
  ],


  steer: {

    'avoidance-detection': {
      defaultActionRx: /\b(
        I attended|I reported|I signed|I met with|I called|I went to|I completed|
        I submitted|I applied|I showed up|I kept the appointment|I made contact|
        I did the programme|I did not miss|I stayed away from|I avoided the area|
        I did not go back|
        smashed it|nailed it|knocked it over|got it done|sorted it out|pulled it off|
        kept my nose clean|stayed out of trouble|kept my head down|kept my distance|
        had a yarn with|caught up with my|reached out to|touched base with|
        fronted up|rocked up|turned up|showed face|put my hand up|
        got on top of|took care of it|dealt with it|handled it|
        pulled up stumps on the old|walked away from|gave it a wide berth
      )\b/ix,
      notAvoidance: [
        'Waiting for licence conditions to be clarified.',
        'Not contacting a victim as required by order.',
        'Delay caused by housing or ID not yet in place.',
        'Waiting for a support worker appointment.',
        'Strategic caution around known triggers or people.',
        'Not returning to a high-risk area on advice.',
      ],
    },

    'movement-non-movement-reading': {
      movementEvidence: [
        'Appointment attended.',
        'Reporting kept.',
        'Programme session completed.',
        'Accommodation secured or applied for.',
        'ID obtained or applied for.',
        'Employment contact made.',
        'Support worker met.',
        'Contact with family restored.',
        'Licence condition met.',
        'Trigger situation navigated without incident.',
        'Boundaries maintained with known risks.',
        'Substance use held or reduced.',
        'High-risk environment avoided.',
        'Honest disclosure made to supervisor.',
        'Smashed it / nailed it — completed something significant.',
        'Keeping nose clean — sustained clean behaviour.',
        'Had a yarn — meaningful conversation made.',
        'Fronted up — showed up when it was hard.',
      ],

      vernacularActionRx: /\b(
        smashed it|nailed it|knocked it over|got it done|sorted it out|
        pulled it off|kept my nose clean|stayed out of trouble|
        kept my head down|had a yarn|caught up with|touched base|
        fronted up|rocked up|showed face|put my hand up|
        got on top of|took care of it|pulled up stumps|
        gave it a wide berth|walked away from the|
        did the right thing|stepped up|came good|
        got back on the horse|gave it a crack|gave it a go|
        made a fist of it|held my ground|stood my ground|
        kept it together|didn't muck it up|didn't stuff it up|
        didn't blow it|kept the faith|stayed the course|
        did my bit|pulled my weight|done my dash on the old|
        got back on track|back on the straight and narrow
      )\b/ix,

      vernacularStuckRx: /\b(
        doing my head in|doing my block|driving me mad|driving me up the wall|
        going around in circles|spinning my wheels|getting nowhere fast|
        in a bit of a rut|stuck in a rut|same old same old|
        binned it|binned the|chucked it|chucked in|gave it away|couldn't be bothered|
        cooked it|stuffed it up|mucked it up|blew it|botched it|
        back to square one|back where I started|nothing to show for it|
        can't get a break|can't catch a break|can't get ahead|
        same mob|same crowd|back with the same crowd|
        can't shake it|can't get rid of it|can't get past it
      )\b/ix,

      defaultStuckRx: /\b(
        same situation|nothing has moved|still waiting|back inside|recalled|
        same place|I keep ending up|nothing changes|I always|every time|
        no progress|still no|I cannot get|same people|same area|same pattern|
        doing my head in|going around in circles|binned it|cooked it|
        stuffed it up|back to square one|same mob|can't catch a break
      )\b/ix,
    },

    'load-sensitive-capability': {
      defaultLoadSignals: [
        { key: 'housing',       rx: /\b(no address|sofa surfing|hostel|temporary|nowhere to go|housing problem|evicted|told to leave|no stable|couch surfing|doing it tough with housing)\b/i },
        { key: 'licence',       rx: /\b(licence|conditions|probation|parole|recalled|breach|warning|officer|supervision|I have to report|my conditions)\b/i },
        { key: 'stigma',        rx: /\b(record|disclosure|they found out|background check|I told them|they know|criminal record|DBS|they rejected me because|my past|they googled me)\b/i },
        { key: 'isolation',     rx: /\b(no one|alone|no support|no family|cut off|no contact|no friends|no one knows|I have nobody|by myself|on my own|no one to turn to)\b/i },
        { key: 'financial',     rx: /\b(no money|no ID|no bank account|benefits|waiting for|no income|I cannot pay|I have nothing|broke|skint|doing it tough|flat broke|not a cent)\b/i },
        { key: 'substance',     rx: /\b(craving|urge|I wanted to use|I nearly|temptation|I was offered|I was near|using again|I used|I drank|the pull|back on it|hit the gear|on the grog)\b/i },
        { key: 'environment',   rx: /\b(old area|old people|they contacted me|I ran into|I was near the old|I was with the same|they found me|the old mob|old crowd|old haunts|old stomping ground)\b/i },
      ],

      vernacularLoadRx: /\b(
        crook|under the weather|not the best|feeling ordinary|feeling rough|
        flat out|run off my feet|stretched thin|done in|cooked|
        running on empty|burnt out|hit a wall|hitting a wall|
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
        'accommodation',
        'licence_conditions',
        'support_worker',
        'direction',
        'load',
      ],
    },

    'connections-across-time': {
      minimumSeparationDays: 14,
      watchPatterns: [
        'return to known environments or people',
        'licence compliance',
        'substance use signals',
        'employment contact attempts',
        'housing instability',
        'trigger situation navigation',
        'family contact pattern',
        'old mob or old crowd contact',
        'old haunts or old area',
      ],
    },

    'confidence-calibration': {
      sectorNote:
        'Re-entry maps are frequently thin in the early period. A person navigating immediate post-release pressures may write briefly or intermittently. Thin material is expected and must not be inflated. Early map reads should explicitly acknowledge their limited window. Vernacular entries may also read as thin because action language is idiomatic — this is a regex limitation, not a movement limitation.',
      earlyPeriodThreshold: 21,
    },

    'state-change-detection': {
      minimumSeparationDays: 21,
      sectorNote:
        'Desistance is a genuine state change — but it requires sustained behavioural evidence across multiple periods including conditions that previously triggered the old pattern. Stated intention to change is not desistance. Mood improvement is not desistance.',
      watchFor: [
        'Pattern present in custody or pre-release not appearing post-release.',
        'Trigger situation present without the old response.',
        'New direction emerging with behavioural evidence.',
        'Support engagement sustained — not just initiated.',
        'Relationship repair with evidence of contact.',
        'Old crowd or old area navigated without incident across multiple periods.',
      ],
    },

    'competing-priorities': {
      costSignals: [
        { key: 'licence_vs_recovery',  rx: /\b(reporting|I have to see|my conditions require|supervision|probation|but also recovery|but I also need to|both the programme and)\b/i },
        { key: 'family_vs_safety',     rx: /\b(my family|my children|but they are risky|they are a trigger|I want to see them but|contact with family|but they use|but they are involved|the kids|my missus|my partner)\b/i },
        { key: 'employment_vs_order',  rx: /\b(work hours|shift|I cannot attend|it clashes with|the appointment|I cannot do both|work and reporting|employment and programme)\b/i },
        { key: 'housing_vs_risk',      rx: /\b(the only place|only option|the housing|old area|risky address|I have to go back|nowhere else|that is where|only place I can stay|old stomping ground)\b/i },
      ],
    },

    'external-constraint-reading': {
      defaultConstraintRx: /\b(
        I am waiting for|the hostel|the housing|my licence says|my conditions|
        I cannot until|I need approval|I have to wait for my officer|
        the system has not|they have not processed|my ID is not ready|
        I have not been cleared|I cannot work until|I cannot travel until|
        the order prevents|I am not allowed|restricted from|banned from|
        I need a letter from|waiting for the DWP|waiting for benefits|
        they told me I have to wait|I cannot apply without|
        waiting on Centrelink|Centrelink has not|waiting on the housing commission|
        the housing commission|waiting on community corrections|
        community corrections|parole board|waiting on the board|
        they haven't come back to me|still waiting to hear|
        out of my hands|nothing I can do until|have to wait and see
      )\b/ix,
      notAvoidance: [
        'Waiting for housing decision — genuine constraint.',
        'ID not yet obtained — genuine resource constraint.',
        'Licence condition preventing contact — legal constraint.',
        'Benefits not yet in place — financial constraint.',
        'Not allowed to travel to employment — order constraint.',
        'Waiting on Centrelink — genuine resource constraint.',
        'Waiting on community corrections decision — institutional constraint.',
      ],
    },

    'meta-reading': {
      sectorNote:
        'Performance for a system is especially common in re-entry contexts. People who have spent time in institutional settings have often learned to give the answer the system wants. The map must watch for this actively. Note: short vernacular entries ("all good", "sweet", "no dramas") are not automatically performance — context and pattern matter. A single short entry is not a flag. A run of them with zero difficulty content is.',
      performanceSignals: [
        {
          key: 'compliance_language',
          rx:  /\b(I am doing everything right|I am following all my conditions|I am being compliant|I am ticking all the boxes|I am doing what is required|I have done everything they asked|everything is in order|I have not breached|I have not put a foot wrong)\b/i,
        },
        {
          key: 'institutional_positive',
          rx:  /\b(my officer is happy|they are pleased with me|I got a good report|they said I am doing well|they are satisfied|no concerns raised|no flags|no issues noted)\b/i,
        },
        {
          key: 'vernacular_performance',
          rx:  /\b(all good|sweet|no dramas|no worries|going good|going well|everything is sweet|no issues|all sweet|sweet as|yeah good|yeah all good)\b/i,
        },
      ],
      honestySignals: [
        {
          key: 'honest_difficulty',
          rx:  /\b(I nearly|I was tempted|I struggled with|it was hard not to|I almost went back|I wanted to but|I was close to|it was difficult when|I had a moment where)\b/i,
        },
        {
          key: 'honest_about_environment',
          rx:  /\b(the area is still risky|they are still around|I still see them|the temptation is still there|it is not easy|the pull is still there|it is harder than I expected)\b/i,
        },
        {
          key: 'vernacular_honesty',
          rx:  /\b(
            not going to beat around the bush|fair dinkum|to be straight with you|
            I have to be honest|straight up|no bull|no bullshit|
            I nearly lost it|nearly stuffed it|nearly blew it|
            it was touch and go|came close|too close for comfort|
            doing it tough if I am honest|not going to lie|
            bit of a struggle|harder than I thought|harder than expected|
            not as easy as I thought|not going to pretend
          )\b/ix,
        },
      ],
    },

  },

};
