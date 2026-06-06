// ══════════════════════════════════════════════════════════
// SORTER GUIDE — Relationships  v0.2.0
// First-ring sector guide.
// Attach with: SorterSpine.attachGuide(GuideRelationships);
//
// v0.2.0 — four domain-knowledge sections added:
//   gaps, skills, contradictions, directionPatterns.
//   These feed directly into the cartridge assembly.
//   All v0.1.0 steers unchanged.
// ══════════════════════════════════════════════════════════

const GuideRelationships = {

  id:      'guide-relationships',
  version: '0.2.0',
  type:    'sector',
  parent:  null,
  purpose: 'Steer sorter behaviours toward relational conditions — what is happening between people, not just inside one person. Repair, distance, dependency, stated care vs enacted care.',
  sector:  'relationships',

  sectorNotes: {
    distinctivePressures: [
      'Distance growing without acknowledgement.',
      'Repair intended but not attempted.',
      'Dependency — one person carrying more than is sustainable.',
      'The gap between stated love or care and described behaviour toward the person.',
      'Conflict that is circling without resolution.',
      'Contact that is absent when it matters.',
      'Relationships affected by a third pressure — addiction, mental health, financial, legal.',
    ],
    distinctiveMovement: [
      'Contact made when it was absent.',
      'Repair attempted — not just intended.',
      'Honest conversation had.',
      'Boundary named and held.',
      'Request made directly.',
      'Apology given and received.',
      'Distance named to the other person.',
      'Support asked for.',
      'Dependency pattern named and changed.',
    ],
    distinctiveGaps: [
      'The other person\'s state not visible — only one side of the relationship described.',
      'Repair not attempted despite being named as important.',
      'What the person actually does toward the other — not just feels.',
      'Whether contact is happening at the frequency described.',
      'What the relationship costs each person.',
    ],
    outputAudience:  'Individual, couples therapist support context, family support worker, or mediation preparation.',
    outputRegister:  'Careful. Non-partisan. Reads the gap between the stated relationship and the described one. Does not take sides.',
  },


  // ── Gaps ─────────────────────────────────────────────────

  gaps: [
    {
      key:    'what_is_done_toward_other',
      name:   'What is actually done toward the other person',
      rx:     /\b(I called|I reached out|I said|I told them|I apologised|I asked|I spent time|I was honest with|I initiated|I went to see|I made contact|I did)\b/i,
      reason: 'Feelings about a relationship are often described clearly. What the person actually does — or does not do — toward the other person is often missing. The gap between feeling and action is where the map needs material.',
    },
    {
      key:    'contact_frequency',
      name:   'Contact frequency and quality',
      rx:     /\b(we spoke|we met|I called|they called|we saw|contact|in touch|we talked|how often|we have been|I have seen|last time we)\b/i,
      reason: 'Described closeness without described contact is a significant gap. Whether contact is actually happening tells the map more than how the person feels about the relationship.',
    },
    {
      key:    'repair_status',
      name:   'Repair status',
      rx:     /\b(I apologised|we talked about it|we addressed|I said sorry|they forgave|we worked through|repair|we are okay now|it has been resolved|I brought it up)\b/i,
      reason: 'Whether repair has been attempted — not just intended — is the key signal. Repair described as important but not yet attempted is avoidance with a named object.',
    },
    {
      key:    'dependency_pattern',
      name:   'Dependency pattern',
      rx:     /\b(I depend on|they depend on me|I need them|they need me|I cannot do this without|too much on each other|I am carrying|they are carrying|the weight of)\b/i,
      reason: 'Dependency that is not named cannot be changed. Whether one person is carrying more than is sustainable — and whether that is acknowledged — shapes what movement looks like in this relationship.',
    },
    {
      key:    'direction',
      name:   'Stated direction for the relationship',
      rx:     /\b(I want to|I am trying to|my goal|what I want from|I hope|repair|rebuild|end it|distance|different|work on it|the relationship I want)\b/i,
      reason: 'Without a stated direction the map cannot assess whether current activity is moving toward or away from what the person actually wants.',
    },
  ],


  // ── Skills ───────────────────────────────────────────────

  skills: [
    {
      key:              'making_contact',
      name:             'Making contact',
      rx:               /\b(I called|I reached out|I initiated|I went to see|I wrote|I texted|I made contact|I got in touch|I arranged to|I showed up)\b/i,
      loadSensitive:    true,
      isStructureSkill: true,
      works:            'Initiating contact — calls, visits, messages — rather than waiting for the other person to reach first.',
      breaks:           'Fear of rejection, past conflict, or the assumption that the other person should go first causes contact to stop — distance grows without acknowledgement.',
    },
    {
      key:              'honest_conversation',
      name:             'Having honest conversations',
      rx:               /\b(I told them|I said|I was honest|I raised|I brought up|I named it|I said what I|I told the truth|I said how I felt|I was direct)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:            'Saying what is actually true rather than the version that avoids conflict or keeps things smooth on the surface.',
      breaks:           'Conflict avoidance or fear of the other person\'s reaction causes the honest version to stay unsaid — the surface manages while the real situation does not change.',
    },
    {
      key:              'holding_boundaries',
      name:             'Holding stated boundaries',
      rx:               /\b(I said no|I held the boundary|I did not|I maintained|I kept to|I did not let|I stood by|I did not change|I kept the distance|I did not go back on)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:            'Maintaining a stated boundary — even when pressure, guilt, or the other person\'s response makes it hard.',
      breaks:           'Emotional pressure, guilt, or the other person\'s reaction causes the boundary to collapse — the stated and enacted position diverge.',
    },
    {
      key:              'hearing_the_other',
      name:             'Hearing the other person',
      rx:               /\b(I heard them|I listened|their point|they said|I understood what they|I could see their|from their side|their perspective|I took in what they|I let them finish)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:            'Taking in the other person\'s position without immediately countering it.',
      breaks:           'Load or defensiveness converts listening into waiting to respond — the other person\'s position is not heard.',
    },
  ],


  // ── Contradictions ────────────────────────────────────────

  contradictions: [
    {
      a:    /\b(I love them|I care about them|they are important|they mean everything|I do not want to lose them|I value the relationship)\b/i,
      b:    /\b(I have not called|I have not reached out|I have not said|I have not done|I keep meaning to|same distance|I have not addressed|still not)\b/i,
      text: 'Stated care or love and absence of contact or action toward the person both appear. The gap between what is felt and what is done is the most common pattern in relational difficulty. The map reads both without deciding which is more real — but the behaviour is the more reliable signal of current state.',
    },
    {
      a:    /\b(fine|okay|not that bad|good moments|we are okay|it is okay|mostly fine|we are good)\b/i,
      b:    /\b(argument|fight|same pattern|keeps happening|can\'t go on|exhausted by it|losing hope|same distance|nothing changes between us)\b/i,
      text: 'Statements that the relationship is broadly fine and signals of significant strain both appear. The overall assessment staying positive while the specific material shows a different picture is a common pattern. Both are real — the map holds them without resolving either.',
    },
    {
      a:    /\b(I want to repair|I want to fix it|I want things to be better|I am trying|I want us to be okay)\b/i,
      b:    /\b(I have not|I keep putting off|I have not said|I have not tried|I have not reached out|still not|same situation|I keep meaning)\b/i,
      text: 'Stated desire to repair the relationship and consistent inaction toward repair both appear. Wanting repair and taking the step toward it are different things. The gap is worth naming — what is getting in the way of the step is the most useful question.',
    },
  ],


  // ── Direction Patterns ────────────────────────────────────

  directionPatterns: [
    { rx: /repair|fix it|work on it|want it to work|stay together|make it work/i,  label: 'toward repair and continuation' },
    { rx: /not sure|don\'t know|figuring out|unclear|I need to decide|I don\'t know what I want/i, label: 'unclear — direction not yet visible' },
    { rx: /leave|end it|walk away|get out|separation|divorce|apart/i,              label: 'toward ending or separation' },
    { rx: /distance|space|less contact|boundaries|managed|functional/i,            label: 'toward distance or a managed arrangement' },
    { rx: /different|change the dynamic|something has to change|new pattern/i,     label: 'toward changing the relationship pattern' },
  ],


  steer: {

    'avoidance-detection': {
      defaultActionRx: /\b(I called|I reached out|I said|I told them|I apologised|I asked|I met|I spent time|I was honest with|I initiated|I went to see|I wrote|I made contact)\b/i,
      notAvoidance: [
        'Strategic distance from someone causing harm.',
        'Not contacting someone under legal advice.',
        'Space given deliberately as part of an agreed process.',
        'Waiting for the right moment in a genuinely fragile situation.',
      ],
    },

    'movement-non-movement-reading': {
      movementEvidence: [
        'Contact made when it had been absent.',
        'Honest conversation initiated.',
        'Repair attempted — not just described as needed.',
        'Boundary stated directly to the other person.',
        'Apology given.',
        'Request made rather than expected to be inferred.',
        'Dependency acknowledged to the person it involves.',
        'Distance named rather than maintained silently.',
      ],
      defaultStuckRx: /\b(same distance|same argument|nothing has changed between us|we keep having|I keep meaning to|I have not said|I have not called|same pattern|going in circles|it always ends the same|I do not know how to)\b/i,
    },

    'load-sensitive-capability': {
      defaultLoadSignals: [
        { key: 'conflict',    rx: /\b(argument|fight|confrontation|they said|I said|it escalated|it got heated|we fell out|we are not speaking)\b/i },
        { key: 'distance',    rx: /\b(we are distant|we have grown apart|I do not know them anymore|there is a wall|they have pulled away|I have pulled away|no contact)\b/i },
        { key: 'dependency',  rx: /\b(I need them|I cannot do this without|I depend on|they depend on me|too much on each other|I am carrying|they are carrying)\b/i },
        { key: 'third_party', rx: /\b(because of the drinking|because of the debt|because of what happened|the addiction|the illness|the situation is affecting us)\b/i },
        { key: 'loss',        rx: /\b(I have lost them|they are gone|the relationship is over|it is broken|I do not know if we can|irreparable|I have given up)\b/i },
      ],
    },

    'contradiction-holding': {
      detectionShape: {
        text: 'Stated care or commitment toward someone and described behaviour toward that person are not matching. The map reads the gap between what is said about the relationship and what is done within it.',
      },
    },

    'competing-priorities': {
      costSignals: [
        { key: 'relational_cost', rx: /\b(I have not been there|I was not present|they needed me|I let them down|I was not available|I missed it|I chose|I prioritised something else)\b/i },
      ],
    },

    'open-gap-discipline': {
      priorityGaps: [
        'what_is_done_toward_other',
        'contact_frequency',
        'repair_status',
        'dependency_pattern',
        'direction',
      ],
    },

  },

};
