// ══════════════════════════════════════════════════════════
// SORTER GUIDE — Financial  v0.1.0
// First-ring sector guide.
// Attach with: SorterSpine.attachGuide(GuideFinancial);
//
// Sector: personal and business financial situation.
// Steers reading toward real financial position, avoidance
// of numbers, movement toward stability, and the gap between
// stated financial state and described behaviour.
// ══════════════════════════════════════════════════════════

const GuideFinancial = {

  id:      'guide-financial',
  version: '0.1.0',
  type:    'sector',
  parent:  null,
  purpose: 'Steer sorter behaviours toward financial-sector conditions — real position, avoidance of numbers, movement toward stability, and the gap between stated and actual.',
  sector:  'financial',

  sectorNotes: {
    distinctivePressures: [
      'Debt that is not being opened or named.',
      'Income insufficient to cover outgoings.',
      'Creditor pressure and enforcement action.',
      'Financial avoidance — not looking at the real numbers.',
      'Shame preventing honest account of position.',
      'Dependency on credit to maintain daily function.',
      'Impact of financial pressure on relationships and mental state.',
    ],
    distinctiveMovement: [
      'Numbers looked at and named honestly.',
      'Budget created or reviewed.',
      'Creditor contacted.',
      'Debt advice sought.',
      'Payment arrangement made.',
      'Income increased or new income source identified.',
      'Expenditure reduced.',
      'Support applied for.',
      'Bank statement opened and read.',
    ],
    distinctiveGaps: [
      'Actual income and outgoings not stated.',
      'Total debt not named.',
      'Creditor situation not described.',
      'No plan visible.',
      'Avoidance of specific numbers throughout.',
    ],
    outputAudience:  'Individual, debt adviser, financial support worker, or case manager.',
    outputRegister:  'Direct. Non-judgemental. Practical. Numbers-focused where material supports it.',
  },

  steer: {

    'avoidance-detection': {
      defaultActionRx: /\b(I opened|I looked at|I called|I contacted|I paid|I arranged|I applied|I submitted|I spoke to|I calculated|I budgeted|I reduced|I cut|I agreed|I set up)\b/i,
      notAvoidance: [
        'Waiting for a debt adviser appointment.',
        'Delay while gathering statements and paperwork.',
        'Not contacting a creditor on legal advice.',
        'Waiting for benefit decision before committing to payments.',
      ],
    },

    'movement-non-movement-reading': {
      movementEvidence: [
        'Real numbers named — income, outgoings, debt total.',
        'Budget created or reviewed.',
        'Creditor contacted.',
        'Payment arrangement made or proposed.',
        'Debt advice sought and attended.',
        'Benefit or support applied for.',
        'Bank statement opened.',
        'Expenditure reduced with specific example.',
        'Additional income identified or pursued.',
      ],
      defaultStuckRx: /\b(same situation|no change|still in debt|still behind|nothing has moved|I keep avoiding|I have not opened|same amount|no further forward|still the same|going further into)\b/i,
    },

    'load-sensitive-capability': {
      defaultLoadSignals: [
        { key: 'enforcement', rx: /\b(bailiff|court order|CCJ|enforcement|repossession|eviction|final demand|legal action|they are taking me to court)\b/i },
        { key: 'shame',       rx: /\b(ashamed|embarrassed|I cannot tell|what they would think|I have not told|keeping it from|hiding it|no one knows)\b/i },
        { key: 'overwhelm',   rx: /\b(overwhelming|I do not know where to start|too much|I cannot face|I cannot look|I am paralysed|I do not open)\b/i },
        { key: 'dependency',  rx: /\b(credit card|overdraft|borrowing|payday|loan|borrowing to pay|using credit to|I borrowed again)\b/i },
        { key: 'relationship',rx: /\b(my partner|my family|they do not know|argument about money|financial pressure on us|it is affecting)\b/i },
      ],
    },

    'open-gap-discipline': {
      priorityGaps: [
        'real_numbers',
        'debt_total',
        'creditor_situation',
        'plan',
        'direction',
      ],
    },

    'contradiction-holding': {
      detectionShape: {
        text: 'A stated belief about financial position and described financial behaviour are not matching. The map reads the gap between what is said about money and what is described happening with money.',
      },
    },

  },

};
