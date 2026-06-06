// ══════════════════════════════════════════════════════════
// SORTER GUIDE — Financial  v0.3.0
// Steering layer. Self-contained. No engine code here.
// Attach with: SorterSpine.attachGuide(GuideFinancial);
//
// v0.3.0 — four domain-knowledge sections added:
//   gaps, skills, contradictions, directionPatterns.
//   These feed directly into the cartridge assembly.
//   All v0.2.0 steers unchanged.
// ══════════════════════════════════════════════════════════

const GuideFinancial = {

  id:      'guide-financial',
  version: '0.3.0',
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


  // ── Gaps ─────────────────────────────────────────────────

  gaps: [
    {
      key:    'real_numbers',
      name:   'Actual income and outgoings',
      rx:     /\b(my income|I earn|I bring in|my outgoings|I spend|I pay|monthly|weekly|the total|the numbers|what I owe|what comes in|what goes out)\b/i,
      reason: 'Without specific numbers the map cannot read the real position. Described financial difficulty without figures is partial. One honest entry naming income, outgoings, and total debt would change the read significantly.',
    },
    {
      key:    'debt_total',
      name:   'Total debt named',
      rx:     /\b(total debt|I owe|the debt is|in total|altogether|the full amount|all of it|the whole|the sum)\b/i,
      reason: 'The total debt figure is the anchor for everything else. Without it the map cannot assess whether movement is meaningful or whether the position is stable or deteriorating.',
    },
    {
      key:    'creditor_situation',
      name:   'Creditor situation',
      rx:     /\b(creditor|they have contacted|final demand|letter from|court|enforcement|bailiff|CCJ|they are threatening|arrangement with|I have spoken to)\b/i,
      reason: 'Whether creditors are active, passive, or taking enforcement action shapes the urgency of the whole picture. This gap leaves the map unable to assess time pressure.',
    },
    {
      key:    'plan',
      name:   'A plan for the position',
      rx:     /\b(my plan|the plan is|I am going to|I intend to|the approach|step by step|I have decided|the strategy|I will)\b/i,
      reason: 'Movement without a plan is reactive. A stated plan — even a rough one — tells the map whether the person is managing toward something or only managing the immediate pressure.',
    },
    {
      key:    'direction',
      name:   'Stated direction',
      rx:     /\b(I want to|my goal|what I am working toward|where I want to be|debt free|stable|clear the|get out of|in a better position|financially)\b/i,
      reason: 'Without a stated direction the map cannot assess whether current activity is moving toward something or circling. One sentence on where this needs to get to would change what the map can read.',
    },
  ],


  // ── Skills ───────────────────────────────────────────────

  skills: [
    {
      key:              'facing_numbers',
      name:             'Facing the actual numbers',
      rx:               /\b(I opened|I looked at|I checked|I calculated|I counted|the statement|I added up|I worked out|I read the|I faced|the real figure|I know what I owe)\b/i,
      loadSensitive:    true,
      isStructureSkill: true,
      works:            'Opening the statements, naming the figures, and working from the real position rather than an estimated or hoped-for one.',
      breaks:           'Shame, overwhelm, or fear of what the numbers say causes continued avoidance — the map starts reading around the position rather than from it.',
    },
    {
      key:              'creditor_contact',
      name:             'Contacting creditors',
      rx:               /\b(I called|I contacted|I wrote to|I spoke to|I emailed|I arranged|I agreed|payment plan|I negotiated|they agreed|we agreed)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:            'Making contact with creditors before enforcement — most creditors will negotiate if contacted early.',
      breaks:           'Shame or fear of the conversation causes delay until enforcement action begins, reducing available options.',
    },
    {
      key:              'honest_reporting',
      name:             'Honest self-reporting',
      rx:               /\b(I have to be honest|the truth is|if I am honest|I used the credit|I borrowed again|I went over|I spent more|I have to admit|it is worse than)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'Describing what actually happened with money rather than the version that makes the position look more managed.',
      breaks:           'Entries shift toward performing control — the map starts reading a managed picture that does not reflect the real position.',
    },
    {
      key:              'budgeting',
      name:             'Working to a budget',
      rx:               /\b(budget|I planned|I set aside|I allocated|I limited|I kept to|I tracked|I monitored|within budget|I stayed under|I reduced)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:            'Creating and holding a budget — even a rough one — that matches real income and outgoings.',
      breaks:           'Unexpected costs, emotional spending, or income shortfall collapses the budget and the person returns to reactive management.',
    },
  ],


  // ── Contradictions ────────────────────────────────────────

  contradictions: [
    {
      a:    /\b(I am managing|under control|I have it handled|I am coping|it is fine|not that bad|I am getting by|I am okay with money)\b/i,
      b:    /\b(I borrowed|I used the card|I went into|I could not pay|I missed|I have not opened|enforcement|final demand|I am avoiding|it is getting worse)\b/i,
      text: 'A stated sense of managing and specific material showing the position is not managed both appear. The overall assessment and the specific entries are not matching. The specific entries are the more reliable read. This is a common pattern — the sense of coping and the reality of the position can exist simultaneously.',
    },
    {
      a:    /\b(I have a plan|I know what to do|I have it worked out|I have a strategy|the plan is)\b/i,
      b:    /\b(I have not done|I keep putting off|I have not called|I have not opened|I have not started|still not|I keep meaning to|I have been avoiding)\b/i,
      text: 'A stated plan and consistent inaction on that plan both appear. Having the plan and executing it are different things. The gap between them is where the most useful next entry sits.',
    },
    {
      a:    /\b(I need to cut back|I am going to reduce|I will stop spending|I have to be more careful|I need to save)\b/i,
      b:    /\b(I bought|I spent|I went out|I treated myself|I used the card|I ordered|I paid for|I got)\b/i,
      text: 'Stated intention to reduce spending and described spending both appear. Intention and behaviour are not yet aligned. This is not a moral observation — it is a pattern the map is reading. The conditions under which the spending happens are more useful than the intention alone.',
    },
  ],


  // ── Direction Patterns ────────────────────────────────────

  directionPatterns: [
    { rx: /debt free|clear the debt|get out of debt|no more debt|owe nothing/i,        label: 'toward being debt free' },
    { rx: /stable|financial stability|solid ground|secure|not worrying about money/i,  label: 'toward financial stability' },
    { rx: /save|savings|emergency fund|put money away|build a cushion/i,               label: 'toward building savings' },
    { rx: /budget|live within|spend less|reduce outgoings|cut back/i,                  label: 'toward living within means' },
    { rx: /more income|earn more|second income|better paid|increase my income/i,       label: 'toward increasing income' },
  ],


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
        text: 'Stated belief about financial position and described financial behaviour are not matching. The map reads the gap between what is said about money and what is described happening with money.',
      },
    },

    'confidence-calibration': {
      sectorNote:
        'A financial map without specific numbers — income, outgoings, debt totals — cannot be reliably read. Vague descriptions of financial difficulty without figures cap confidence at partial at most. Named numbers are required for a supported read.',
    },

    'state-change-detection': {
      minimumSeparationDays: 14,
      watchFor: [
        'Debt total reducing across periods.',
        'Creditor contact moving from absent to present.',
        'Financial avoidance reducing — numbers being named.',
        'Budget present in recent entries that was absent at baseline.',
        'Enforcement action resolved or reduced.',
      ],
    },

    'competing-priorities': {
      costSignals: [
        { key: 'debt_vs_essentials', rx: /\b(I cannot pay both|choosing between|the rent or the debt|food or the bill|I have to prioritise|I cannot cover everything)\b/i },
        { key: 'shame_vs_help',      rx: /\b(I cannot tell anyone|I am too ashamed|I do not want anyone to know|but I need help|I need advice but)\b/i },
        { key: 'short_vs_long',      rx: /\b(I need it now but|short term I need|long term I know|just get through this month|but it will make it worse)\b/i },
      ],
    },

    'external-constraint-reading': {
      defaultConstraintRx: /\b(waiting for the benefit|the DWP has not|universal credit|the appeal|I cannot access until|the bank will not|I need a decision from|they have frozen|the account is frozen|legal restriction on)\b/i,
    },

    'meta-reading': {
      sectorNote:
        'Financial shame is a significant driver of performance in this sector. People frequently present a more controlled picture than is real. Absence of specific numbers, consistent positive framing about "managing," and absence of admission are particularly significant performance signals here.',
      performanceSignals: [
        {
          key: 'managing_language',
          rx:  /\b(I am managing|I am coping|I am getting by|it is under control|I have it handled|it is fine really|not as bad as it sounds|I am okay with money)\b/i,
        },
      ],
    },

  },

};
