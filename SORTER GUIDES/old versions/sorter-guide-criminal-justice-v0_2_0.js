// ══════════════════════════════════════════════════════════
// SORTER GUIDE — Criminal Justice  v0.2.0
// Steering layer. Self-contained. No engine code here.
//
// v0.2.0 — steering added for behaviours 12–16.
// Note: the re-entry guide is the more specific deployment
// guide for post-release contexts. This guide covers the
// broader criminal justice field including in-custody,
// pre-sentence, and supervision contexts.
// ══════════════════════════════════════════════════════════

const GuideCriminalJustice = {

  id:      'guide-criminal-justice',
  version: '0.2.0',
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
      defaultActionRx: /\b(I reported|I attended|I kept|I completed|I stayed away|I did not|I maintained|I went to|I signed|I submitted|I told|I disclosed)\b/i,
      notAvoidance: [
        'Not contacting a victim as required by order.',
        'Avoiding a known trigger location on advice.',
        'Waiting for supervision appointment — not missing it.',
        'Strategic avoidance of high-risk peers or environments.',
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
      ],
      defaultStuckRx: /\b(same situation|same people|same places|back to|recalled|breach|same pattern|nothing has changed|I keep ending up|it always goes the same|no further)\b/i,
    },

    'load-sensitive-capability': {
      defaultLoadSignals: [
        { key: 'licence',   rx: /\b(licence|conditions|probation|parole|supervision|my officer|breach|recalled|warning|I have to report)\b/i },
        { key: 'peers',     rx: /\b(old friends|same people|they contacted me|I ran into|they want me to|peer pressure|the group|I was with)\b/i },
        { key: 'stigma',    rx: /\b(they found out|my record|background check|I had to tell|disclosure|they know|DBS|criminal record)\b/i },
        { key: 'housing',   rx: /\b(no address|sofa|hostel|temporary|nowhere|I do not have a stable|I am moving around)\b/i },
        { key: 'financial', rx: /\b(no money|no income|benefits|I cannot pay|financial pressure|I am broke|no ID|no bank)\b/i },
      ],
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

    // ── Behaviour 12 — Confidence Calibration ────────────────
    // Criminal justice maps are often thin on honest material
    // because of the institutional context. Thin reads are
    // common and must not be inflated.

    'confidence-calibration': {
      sectorNote:
        'Criminal justice maps are frequently thin on honest material. The institutional context creates performance pressure. A map that reads well may be well-managed rather than well-evidenced. Thin reads and inferred reads are expected and must be labelled. Do not produce desistance assessments from partial material.',
    },

    // ── Behaviour 13 — State Change Detection ────────────────
    // Desistance requires long-arc evidence — not short-term
    // compliance. Extended minimum separation.

    'state-change-detection': {
      minimumSeparationDays: 28,
      sectorNote:
        'Desistance is the domain of genuine state change in criminal justice. It requires sustained behavioural evidence across multiple periods including conditions that previously triggered the offending pattern. Short-term compliance is not desistance. Stated intention is not desistance.',
      watchFor: [
        'Pattern associated with offending not appearing in conditions that previously triggered it.',
        'Licence compliance sustained beyond initial period.',
        'New direction with evidenced steps toward it.',
        'Relationship repair with behavioural evidence.',
        'Risk environment navigation across multiple periods.',
      ],
    },

    // ── Behaviour 14 — Competing Priorities ──────────────────

    'competing-priorities': {
      costSignals: [
        { key: 'compliance_vs_recovery',  rx: /\b(reporting|I have to see my officer|conditions|supervision|but also recovery|but I also need|programme clashes|it conflicts with)\b/i },
        { key: 'family_vs_order',         rx: /\b(my family|my children|the order|I cannot see|restricted contact|the conditions say|I want to but the order)\b/i },
        { key: 'employment_vs_licence',   rx: /\b(work and reporting|shift and appointment|it clashes|the hours|I cannot do both|employment versus|work conflicts with)\b/i },
      ],
    },

    // ── Behaviour 15 — External Constraint Reading ────────────
    // Criminal justice is full of genuine legal and institutional
    // constraints. Must not misread as avoidance.

    'external-constraint-reading': {
      defaultConstraintRx: /\b(my conditions|the order says|I am not allowed|restricted from|banned from|I need my officer to|waiting for licence|I cannot travel|I cannot contact|the court said|legally I cannot|my licence prevents|supervision requires)\b/i,
      notAvoidance: [
        'Licence condition preventing an action — legal constraint.',
        'Restricted contact order — legal constraint.',
        'Travel restriction — legal constraint.',
        'Waiting for supervision approval — institutional constraint.',
        'Cannot access without probation sign-off — institutional constraint.',
      ],
    },

    // ── Behaviour 16 — Meta Reading ───────────────────────────
    // Performance for the system is the dominant meta-reading
    // risk in criminal justice. People who have spent time in
    // institutional settings have often learned to give the
    // system the answer it wants.

    'meta-reading': {
      sectorNote:
        'Performance for the system is the primary meta-reading risk in criminal justice. Institutional compliance language, always-positive entries, and absence of difficulty are especially significant performance signals in this sector. The map must actively watch for this.',
      performanceSignals: [
        {
          key: 'institutional_compliance',
          rx:  /\b(I am doing everything right|I am fully compliant|I am meeting all conditions|I have not breached|my officer is satisfied|they have no concerns|I am ticking every box|I am doing what is asked)\b/i,
        },
        {
          key: 'desistance_performance',
          rx:  /\b(I am a changed person|I am not that person anymore|I have completely changed|I will never go back|I have turned my life around|I am a different man|I am a different woman)\b/i,
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
      ],
    },

  },

};
