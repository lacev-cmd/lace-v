// ══════════════════════════════════════════════════════════
// SORTER GUIDE — Relationships  v0.1.0
// First-ring sector guide.
// Attach with: SorterSpine.attachGuide(GuideRelationships);
//
// Sector: the pressure that lives between people.
// Repair, distance, dependency, the gap between what is said
// and what is done toward someone.
//
// This guide reads the relational field — not the individual
// in isolation. What is happening between people is often
// more significant than what is happening inside one of them.
// ══════════════════════════════════════════════════════════

const GuideRelationships = {

  id:      'guide-relationships',
  version: '0.1.0',
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
