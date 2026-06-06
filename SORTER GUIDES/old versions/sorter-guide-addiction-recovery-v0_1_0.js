// ══════════════════════════════════════════════════════════
// SORTER GUIDE — Addiction Recovery  v0.1.0
// Steering layer. Self-contained. No engine code here.
// Attach with: SorterSpine.attachGuide(GuideAddictionRecovery);
//
// v0.1.0 — initial build.
//   gaps, skills, contradictions, directionPatterns,
//   pressureSignals, steer block.
// ══════════════════════════════════════════════════════════

const GuideAddictionRecovery = {

  id:      'guide-addiction-recovery',
  version: '0.1.0',
  type:    'sector',
  parent:  null,
  purpose: 'Steer sorter behaviours toward addiction recovery conditions — substance use status, triggers, programme engagement, relapse risk, and the gap between stated recovery and described behaviour.',
  sector:  'addiction-recovery',

  sectorNotes: {
    distinctivePressures: [
      'Trigger environments and people that have not changed.',
      'Relapse — actual or narrowly avoided — not named directly.',
      'Programme or support disengagement without explicit acknowledgement.',
      'Cross-addiction or substitution not recognised as a pattern.',
      'Social network that sustains use rather than recovery.',
      'Shame following use preventing honest account.',
      'Physical health consequences of use not described.',
      'Financial and relationship damage accumulating alongside use.',
    ],
    distinctiveMovement: [
      'Clean or sober days named.',
      'Meeting attended.',
      'Sponsor or support contact made.',
      'Trigger situation navigated without use.',
      'Programme session completed.',
      'Honest account of use given.',
      'Relapse named and plan adjusted.',
      'Medical support engaged.',
      'Relationship or living situation changed to reduce exposure.',
      'Cravings named and managed.',
    ],
    distinctiveGaps: [
      'Current use status not stated — clean, reduced, or still using.',
      'Programme or treatment plan not described.',
      'Known triggers not named.',
      'Support network — sponsor, meeting, peer — not visible.',
      'Relapse history not mentioned.',
    ],
    outputAudience:  'Individual, recovery support worker, sponsor, case manager, or treatment coordinator.',
    outputRegister:  'Non-moralising. Evidence-bound. Reads the pattern, not the character. Does not reward or punish.',
  },


  // ── Gaps ─────────────────────────────────────────────────

  gaps: [
    {
      key:    'use_status',
      name:   'Current use status',
      rx:     /\b(I have not used|I am clean|I am sober|I used|I relapsed|I had a|I drank|I took|I have been|days clean|weeks clean|I slipped|I am using|I have been using)\b/i,
      reason: 'Without a stated use status — clean, reduced, or still using — the map cannot read direction. This is the foundational gap. Entries that describe recovery activity without stating use status are unanchored.',
    },
    {
      key:    'programme_or_plan',
      name:   'Programme or treatment plan',
      rx:     /\b(my programme|the plan|I am attending|NA|AA|the meetings|my treatment|the clinic|my prescription|methadone|suboxone|the course|I am in|rehab|my counsellor|my key worker)\b/i,
      reason: 'Without a described programme or plan the map cannot assess engagement, identify where support is breaking down, or read whether movement is structured or unplanned.',
    },
    {
      key:    'known_triggers',
      name:   'Known triggers',
      rx:     /\b(my trigger|triggers me|when I am around|the situation|certain people|certain places|stress|boredom|loneliness|when I feel|what sets me off|I know I should avoid|I stay away from)\b/i,
      reason: 'Triggers are the structural risk. Without them named the map cannot read whether the person is moving toward or away from high-risk situations — or whether they are in one now.',
    },
    {
      key:    'support_network',
      name:   'Support network — sponsor, meeting, peer contact',
      rx:     /\b(my sponsor|I called|I spoke to|the group|the meeting|my support|my key worker|someone in recovery|peer support|I have people|I reached out|I have a network)\b/i,
      reason: 'Recovery without a visible support network is structurally fragile. Whether there is a sponsor, regular meeting, or peer contact shapes the risk level of everything else.',
    },
    {
      key:    'relapse_history',
      name:   'Relapse history',
      rx:     /\b(I have relapsed before|last time I relapsed|I went back|I started using again|I have been here before|previous relapse|I know this pattern|I have been through this)\b/i,
      reason: 'Relapse history is a key context for reading current risk. Patterns, triggers, and decision points from prior relapses are often predictive. Without it the map cannot assess whether current signals are familiar or new.',
    },
  ],


  // ── Skills ───────────────────────────────────────────────

  skills: [
    {
      key:              'honest_use_account',
      name:             'Giving an honest account of use',
      rx:               /\b(I used|I drank|I took|I relapsed|I slipped|I had some|I had a drink|I was using|I have been using|I have to be honest|I need to admit|I had a|I used again)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:            'Naming what happened with use without minimising, justifying, or omitting. Honest account is the foundation the map needs — without it no other read is reliable.',
      breaks:           'Shame following use causes minimising language, justification, or silence. The map reads what is written. Omitted use is an invisible gap.',
    },
    {
      key:              'trigger_recognition',
      name:             'Recognising and naming triggers before or during exposure',
      rx:               /\b(I recognised|I noticed|I could feel it|I knew it was|I spotted the trigger|I was aware|I caught myself|I could see it coming|I identified|I named it)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:            'Naming the trigger — person, place, state, or situation — before or during exposure rather than only in retrospect. Recognition is the window for intervention.',
      breaks:           'High craving state, intoxication, or intense emotional state reduces recognition to zero. The skill only functions with some baseline of awareness intact.',
    },
    {
      key:              'programme_engagement',
      name:             'Maintaining programme or support engagement',
      rx:               /\b(I went to the meeting|I attended|I called my sponsor|I spoke to my key worker|I kept my appointment|I was honest with|I stayed in contact|I completed the session|I stayed on)\b/i,
      loadSensitive:    true,
      isStructureSkill: true,
      works:            'Keeping meeting attendance, sponsor contact, key worker appointments, or programme sessions even when motivation is low or shame is high.',
      breaks:           'Shame after use, avoidance of accountability, or belief that recovery is going well enough to skip support causes disengagement — the point at which risk typically increases.',
    },
    {
      key:              'relapse_as_information',
      name:             'Treating relapse as information rather than failure',
      rx:               /\b(I learned from|the relapse showed|what it told me|I understand now|I can see what happened|the pattern was|I recognise|it happened because|I know what triggered|I can use this)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'After relapse, reading what happened — trigger, sequence, decision point — rather than only experiencing shame or restarting the clock. Pattern knowledge is usable.',
      breaks:           'Shame collapses the analysis into self-judgment. The relapse is felt as proof of failure rather than read as a map of what needs to change.',
    },
    {
      key:              'environment_management',
      name:             'Managing exposure to high-risk environments and people',
      rx:               /\b(I stayed away from|I avoided|I did not go to|I changed my route|I left|I did not contact|I cut contact with|I moved away from|I stayed out of|I kept distance)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:            'Actively managing proximity to known triggers — people, places, and situations — before craving states are active.',
      breaks:           'Belief that it is okay now, social pressure, or practical necessity causes return to high-risk environments before readiness. The skill requires the environment to be avoidable.',
    },
  ],


  // ── Contradictions ────────────────────────────────────────

  contradictions: [
    {
      a:    /\b(I am doing well|recovery is going well|I am in a good place|I am strong in recovery|I feel confident|I am in control|I am stable)\b/i,
      b:    /\b(I missed the meeting|I have not called|I stopped going|I have been around|I went back to|I did not tell|I have not been honest|I have been in that place|I have been seeing)\b/i,
      text: 'Stated confidence in recovery and described disengagement or high-risk behaviour both appear. Confidence and programme disengagement appearing together is a recognised risk pattern — not an evidence of strength. The described behaviour is the more reliable read.',
    },
    {
      a:    /\b(I have not used|I am clean|I am sober|I did not drink|I did not take|I have been clean)\b/i,
      b:    /\b(I just had one|it was only a little|I controlled it this time|I had a few|it was not a full relapse|I had some|just a drink|just the once|it was minor)\b/i,
      text: 'A claim of no use and a described instance of use both appear. Minimising language following use is a common pattern. The use is the significant material here regardless of the framing.',
    },
    {
      a:    /\b(I do not need the meetings anymore|I have this under control|I do not need as much support|I am past that stage|I have graduated|I know enough now|I can manage alone)\b/i,
      b:    /\b(I am still around|I have been craving|it has been hard|I nearly|I was tempted|the pressure|I have been struggling)\b/i,
      text: 'Stated readiness to reduce support and described ongoing difficulty both appear. Reducing support while cravings or pressure are still active is a high-risk combination. The map reads the current state, not the aspired state.',
    },
  ],


  // ── Direction Patterns ────────────────────────────────────

  directionPatterns: [
    { rx: /meeting|NA|AA|programme|session|group|sponsor|key worker|counsellor/i, label: 'toward programme or support engagement' },
    { rx: /clean|sober|days|weeks|months|milestone|anniversary|streak/i,          label: 'toward sobriety tracking or milestone' },
    { rx: /trigger|high risk|avoid|stay away|environment|people|places/i,         label: 'toward trigger management or exposure reduction' },
    { rx: /relapse|slipped|used|drank|took|I had|I was using/i,                   label: 'toward relapse event or pattern review' },
    { rx: /crave|craving|urge|temptation|I wanted to|I nearly|I felt the pull/i,  label: 'toward craving management' },
    { rx: /work|relationship|housing|family|finances|normal life|rebuilding/i,    label: 'toward life rebuilding outside addiction' },
  ],


  // ── Pressure Signals ─────────────────────────────────────

  pressureSignals: [
    { key: 'use_minimising',         rx: /\b(just a|only a little|it was not much|I controlled it|not a full relapse|minor slip|just the once|it was nothing|I had a small)\b/i,                              label: 'use minimising language — relapse may be undeclared' },
    { key: 'support_dropout',        rx: /\b(I missed the meeting|I have not been|I stopped going|I have not called|I dropped out|I have not attended|I cancelled|I did not go)\b/i,                           label: 'support or programme dropout signal' },
    { key: 'high_risk_proximity',    rx: /\b(I was around|I went back to|I saw them|I was near|I ended up at|I was in that area|I bumped into|I was at the|I went to the)\b/i,                                label: 'proximity to known high-risk environment or person' },
    { key: 'confidence_spike',       rx: /\b(I have this|I am past that|I do not need|I can handle it now|I am strong enough|I know better now|I can be around|I can manage|I am fine with)\b/i,              label: 'overconfidence spike — support reduction risk' },
    { key: 'shame_silence',          rx: /\b(I do not want to say|I cannot tell them|I have not told|they do not know|I kept it from|I hid it|I lied about|I have not been honest)\b/i,                       label: 'shame-driven silence — honest account risk' },
    { key: 'isolation_increase',     rx: /\b(I have been alone|I have not seen|I have not spoken|I withdrew|I stayed home|I avoided|I have not contacted|I have not reached out)\b/i,                         label: 'increasing isolation — relapse risk factor' },
  ],


  // ── Steer block ───────────────────────────────────────────

  steer: {

    'open-gap-discipline': {
      priorityGaps: [
        'use_status',
        'programme_or_plan',
        'known_triggers',
        'support_network',
        'relapse_history',
      ],
      absenceRules: {
        noUseStatusNoRead:
          'If use status is absent the map cannot read direction. Surface this gap before all others.',
        noCharacterJudgement:
          'Do not frame relapse or use as character failure. Read it as pattern information.',
        minimisationIsUse:
          'Minimising language following use — "just a little", "only once", "not a full relapse" — should be read as an undeclared use event, not as evidence of control.',
      },
    },

    'confidence-calibration': {
      sectorNote:
        'Addiction recovery maps are frequently partial due to shame-driven minimising. Stated use status and described behaviour must both be present for confidence to rise. Absence of named difficulty combined with evidence of high-risk proximity should cap confidence at partial.',
    },

    'state-change-detection': {
      minimumSeparationDays: 7,
      watchFor: [
        'Clean day count increasing or resetting.',
        'Meeting or programme attendance dropping.',
        'Sponsor or support contact reducing.',
        'High-risk environment proximity increasing.',
        'Craving descriptions appearing where absent.',
        'Minimising language appearing after a gap of honest account.',
      ],
    },

    'competing-priorities': {
      costSignals: [
        { key: 'recovery_vs_relationships', rx: /\b(they want me to|my family wants|my partner wants|but it affects us|the relationship needs|for them I|they do not understand recovery)\b/i },
        { key: 'honesty_vs_shame',          rx: /\b(I cannot tell|I am ashamed|I cannot admit|I have not told|they would be disappointed|they would not understand|I hid it)\b/i },
        { key: 'programme_vs_life',         rx: /\b(I cannot make the meeting|work gets in the way|I have to|I am too busy|the timing does not|I cannot always|it clashes with)\b/i },
      ],
    },

    'movement-non-movement-reading': {
      movementEvidence: [
        'Clean or sober days accumulated.',
        'Meeting attended.',
        'Sponsor or key worker contacted.',
        'Trigger situation navigated without use.',
        'Honest account of use given.',
        'Relapse named and plan adjusted.',
        'High-risk environment actively avoided.',
        'Cravings named and managed.',
      ],
      defaultStuckRx: /\b(same|no change|still using|still struggling|still not going|I keep relapsing|nothing has changed|I am no further|same pattern|same triggers|still avoiding|I have not managed)\b/i,
    },

    'load-sensitive-capability': {
      defaultLoadSignals: [
        { key: 'high_craving',       rx: /\b(intense craving|strong urge|overwhelming|I could not resist|it was too strong|I had to|the pull was|I gave in to|the craving took over)\b/i },
        { key: 'shame_load',         rx: /\b(I am ashamed|I feel disgusted|I hate myself|I cannot believe|I let myself|I failed again|I am a failure|what is wrong with me)\b/i },
        { key: 'social_pressure',    rx: /\b(they were all|everyone was|the pressure to|I did not want to seem|I felt I had to|they offered|it was everywhere|I could not say no)\b/i },
        { key: 'life_crisis',        rx: /\b(I lost|relationship ended|eviction|bereavement|job loss|the stress|major change|I could not cope|everything fell apart)\b/i },
        { key: 'physical_state',     rx: /\b(I was exhausted|I was ill|I was in pain|I had not slept|I was hungry|physically I was|my body|withdrawal|I was sick)\b/i },
      ],
    },

    'meta-reading': {
      sectorNote:
        'Shame following use is the primary driver of dishonest account in this sector. People frequently minimise use, omit use events, or describe near-misses as successes. The gap between stated use status and described behaviour is the most significant read in addiction recovery material.',
      performanceSignals: [
        {
          key: 'minimising_language',
          rx:  /\b(just a|only a little|I controlled it|not a full|minor slip|just the once|it was nothing|I had a small|it does not count)\b/i,
        },
      ],
    },

  },

};
