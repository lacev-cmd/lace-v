// ══════════════════════════════════════════════════════════
// SORTER GUIDE — Re-entry  v0.2.0
// Steering layer. Self-contained. No engine code here.
// Attach with: SorterSpine.attachGuide(GuideReentry);
//
// Sector: post-incarceration reintegration.
//
// v0.2.0 — steering added for behaviours 12–16:
//   — confidence-calibration: re-entry maps are often thin
//     in early periods. Explicitly steers against
//     overclaiming from sparse material.
//   — state-change-detection: desistance is the domain
//     of genuine state change. Minimum separation extended.
//     Behavioural evidence required — not stated intention.
//   — competing-priorities: cost signals specific to
//     re-entry — licence vs recovery, family vs safety.
//   — external-constraint-reading: re-entry specific
//     constraint language added.
//   — meta-reading: honesty in re-entry context is
//     especially significant. Performance for the system
//     is a known and real phenomenon in this sector.
// ══════════════════════════════════════════════════════════

const GuideReentry = {

  id:      'guide-reentry',
  version: '0.2.0',
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

  steer: {

    'avoidance-detection': {
      defaultActionRx: /\b(I attended|I reported|I signed|I met with|I called|I went to|I completed|I submitted|I applied|I showed up|I kept the appointment|I made contact|I did the programme|I did not miss|I stayed away from|I avoided the area|I did not go back)\b/i,
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
      ],
      defaultStuckRx: /\b(same situation|nothing has moved|still waiting|back inside|recalled|same place|I keep ending up|nothing changes|I always|every time|no progress|still no|I cannot get|same people|same area|same pattern)\b/i,
    },

    'load-sensitive-capability': {
      defaultLoadSignals: [
        { key: 'housing',       rx: /\b(no address|sofa surfing|hostel|temporary|nowhere to go|housing problem|evicted|told to leave|no stable)\b/i },
        { key: 'licence',       rx: /\b(licence|conditions|probation|parole|recalled|breach|warning|officer|supervision|I have to report|my conditions)\b/i },
        { key: 'stigma',        rx: /\b(record|disclosure|they found out|background check|I told them|they know|criminal record|DBS|they rejected me because)\b/i },
        { key: 'isolation',     rx: /\b(no one|alone|no support|no family|cut off|no contact|no friends|no one knows|I have nobody)\b/i },
        { key: 'financial',     rx: /\b(no money|no ID|no bank account|benefits|waiting for|no income|I cannot pay|I have nothing|broke)\b/i },
        { key: 'substance',     rx: /\b(craving|urge|I wanted to use|I nearly|temptation|I was offered|I was near|using again|I used|I drank)\b/i },
        { key: 'environment',   rx: /\b(old area|old people|they contacted me|I ran into|I was near the old|I was with the same|they found me)\b/i },
      ],
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
      ],
    },

    // ── Behaviour 12 — Confidence Calibration ────────────────
    // Re-entry maps are often sparse in early periods.
    // Material in first weeks post-release is typically thin.
    // Do not overclaim from limited early entries.

    'confidence-calibration': {
      sectorNote:
        'Re-entry maps are frequently thin in the early period. A person navigating immediate post-release pressures may write briefly or intermittently. Thin material is expected and must not be inflated. Early map reads should explicitly acknowledge their limited window.',
      earlyPeriodThreshold: 21,  // Days post-release where thin reads are expected.
    },


    // ── Behaviour 13 — State Change Detection ────────────────
    // Desistance is the defining state change in re-entry.
    // It requires extended time and behavioural evidence —
    // not stated intention and not mood shift.
    // Minimum separation extended for this sector.

    'state-change-detection': {
      minimumSeparationDays: 21,   // Longer threshold for re-entry — change must hold over time.
      sectorNote:
        'Desistance is a genuine state change — but it requires sustained behavioural evidence across multiple periods including conditions that previously triggered the old pattern. Stated intention to change is not desistance. Mood improvement is not desistance.',
      watchFor: [
        'Pattern present in custody or pre-release not appearing post-release.',
        'Trigger situation present without the old response.',
        'New direction emerging with behavioural evidence.',
        'Support engagement sustained — not just initiated.',
        'Relationship repair with evidence of contact.',
      ],
    },


    // ── Behaviour 14 — Competing Priorities ──────────────────
    // Re-entry specific competition types.

    'competing-priorities': {
      costSignals: [
        { key: 'licence_vs_recovery',  rx: /\b(reporting|I have to see|my conditions require|supervision|probation|but also recovery|but I also need to|both the programme and)\b/i },
        { key: 'family_vs_safety',     rx: /\b(my family|my children|but they are risky|they are a trigger|I want to see them but|contact with family|but they use|but they are involved)\b/i },
        { key: 'employment_vs_order',  rx: /\b(work hours|shift|I cannot attend|it clashes with|the appointment|I cannot do both|work and reporting|employment and programme)\b/i },
        { key: 'housing_vs_risk',      rx: /\b(the only place|only option|the housing|old area|risky address|I have to go back|nowhere else|that is where)\b/i },
      ],
    },


    // ── Behaviour 15 — External Constraint Reading ────────────
    // Re-entry specific external constraint language.

    'external-constraint-reading': {
      defaultConstraintRx: /\b(
        I am waiting for|the hostel|the housing|my licence says|my conditions|
        I cannot until|I need approval|I have to wait for my officer|
        the system has not|they have not processed|my ID is not ready|
        I have not been cleared|I cannot work until|I cannot travel until|
        the order prevents|I am not allowed|restricted from|banned from|
        I need a letter from|waiting for the DWP|waiting for benefits|
        they told me I have to wait|I cannot apply without
      )\b/ix,
      notAvoidance: [
        'Waiting for housing decision — genuine constraint.',
        'ID not yet obtained — genuine resource constraint.',
        'Licence condition preventing contact — legal constraint.',
        'Benefits not yet in place — financial constraint.',
        'Not allowed to travel to employment — order constraint.',
      ],
    },


    // ── Behaviour 16 — Meta Reading ───────────────────────────
    // Performance for the system is a known phenomenon in
    // criminal justice and re-entry contexts.
    // The map must be able to detect when it is being used
    // as a compliance record rather than an honest account.

    'meta-reading': {
      sectorNote:
        'Performance for a system is especially common in re-entry contexts. People who have spent time in institutional settings have often learned to give the answer the system wants. The map must watch for this actively — compliance language, always-resolved entries, and absence of difficulty are particularly significant signals here.',
      performanceSignals: [
        {
          key: 'compliance_language',
          rx:  /\b(I am doing everything right|I am following all my conditions|I am being compliant|I am ticking all the boxes|I am doing what is required|I have done everything they asked|everything is in order|I have not breached|I have not put a foot wrong)\b/i,
        },
        {
          key: 'institutional_positive',
          rx:  /\b(my officer is happy|they are pleased with me|I got a good report|they said I am doing well|they are satisfied|no concerns raised|no flags|no issues noted)\b/i,
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
      ],
    },

  },

};
