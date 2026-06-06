// ══════════════════════════════════════════════════════════
// SORTER GUIDE — Medical  v0.2.0
// Steering layer. Self-contained. No engine code here.
// Attach with: SorterSpine.attachGuide(GuideMedical);
//
// v0.2.0 — steering added for behaviours 12–16.
// ══════════════════════════════════════════════════════════

const GuideMedical = {

  id:      'guide-medical',
  version: '0.2.0',
  type:    'sector',
  parent:  null,
  purpose: 'Steer sorter behaviours toward medical-sector conditions — treatment adherence, symptom load, functional movement, and care plan gaps.',
  sector:  'medical',

  sectorNotes: {
    distinctivePressures: [
      'Symptom load affecting daily function.',
      'Treatment side effects competing with treatment benefit.',
      'Appointment access and waiting times.',
      'Diagnosis uncertainty.',
      'Financial impact of condition or treatment.',
      'Carer load if supporting another.',
      'Fear of deterioration or prognosis.',
    ],
    distinctiveMovement: [
      'Appointment attended.',
      'Medication taken as prescribed.',
      'Treatment plan followed.',
      'Symptom reported to clinician.',
      'Lifestyle change implemented.',
      'Test or investigation completed.',
      'Referral accepted and acted on.',
      'Support sought.',
    ],
    distinctiveGaps: [
      'No diagnosis or working diagnosis stated.',
      'Treatment plan not described.',
      'Symptom load not quantified.',
      'Functional impact on daily life not visible.',
      'Clinician relationship not described.',
    ],
    outputAudience:  'Patient, carer, or clinical support worker preparing for appointment or handover.',
    outputRegister:  'Clear. Non-clinical language unless clinical audience specified. Functional focus.',
  },

  steer: {

    'avoidance-detection': {
      defaultActionRx: /\b(I attended|I took|I followed|I completed|I reported|I told the doctor|I called the clinic|I booked|I went to|I had the|I started|I continued|I measured|I tracked)\b/i,
      notAvoidance: [
        'Waiting for test results before next step.',
        'Delay on medical advice — not yet appropriate to act.',
        'Rest prescribed as part of treatment.',
        'Side effects requiring temporary pause.',
        'Waiting for referral to be processed.',
      ],
    },

    'movement-non-movement-reading': {
      movementEvidence: [
        'Appointment attended.',
        'Medication taken as prescribed.',
        'Prescribed exercise or activity completed.',
        'Symptom change reported to clinician.',
        'Test or scan completed.',
        'Referral followed through.',
        'Lifestyle change implemented and held.',
        'Support resource accessed.',
        'Pain or symptom level tracked and recorded.',
      ],
      defaultStuckRx: /\b(no improvement|same level|not getting better|getting worse|nothing is working|back to where|no change|still the same|no progress|not moving|plateau)\b/i,
    },

    'load-sensitive-capability': {
      defaultLoadSignals: [
        { key: 'pain',    rx: /\b(pain|painful|hurting|flare|bad day|severe|acute|chronic pain|in agony)\b/i },
        { key: 'fatigue', rx: /\b(exhausted|fatigue|no energy|depleted|wiped out|too tired|cannot function)\b/i },
        { key: 'fear',    rx: /\b(scared|frightened|afraid|the prognosis|what it means|what they found|I am worried about)\b/i },
        { key: 'access',  rx: /\b(waiting list|cannot get an appointment|no GP|no referral|too long to wait|the system)\b/i },
        { key: 'carer',   rx: /\b(caring for|looking after|my carer|carer load|I am the carer|no one to help)\b/i },
      ],
    },

    'open-gap-discipline': {
      priorityGaps: [
        'diagnosis',
        'treatment_plan',
        'symptom_load',
        'functional_impact',
        'direction',
      ],
    },

    // ── Behaviour 12 — Confidence Calibration ────────────────
    // Critical stakes. Supported read minimum before output.

    'confidence-calibration': {
      sectorNote:
        'Medical maps are high-stakes. A map without diagnosis, treatment plan, and symptom load cannot be reliably read. Confidence-gated output applies — supported read minimum before clinical handover. Inferred reads must always be labelled.',
      minimumForHandover: 'supported',
    },

    // ── Behaviour 13 — State Change Detection ────────────────

    'state-change-detection': {
      minimumSeparationDays: 14,
      watchFor: [
        'Symptom load reducing across periods.',
        'Functional capacity improving — activity that was not possible is now described.',
        'Treatment adherence improving from absent to present.',
        'New symptom emerging in recent entries not present at baseline.',
        'Functional deterioration — activity present earlier is now absent.',
      ],
    },

    // ── Behaviour 14 — Competing Priorities ──────────────────

    'competing-priorities': {
      costSignals: [
        { key: 'treatment_vs_function', rx: /\b(side effects mean I cannot|the treatment affects my ability to|I have to choose between|treatment is making it hard to|I cannot work because of the treatment)\b/i },
        { key: 'self_vs_carer',         rx: /\b(I am caring for|but I also need to|my own health and their|I put them first|I have not attended to my own)\b/i },
        { key: 'cost_vs_treatment',     rx: /\b(I cannot afford the|the medication costs|I have stopped because of cost|financial barrier to|I have had to stop)\b/i },
      ],
    },

    // ── Behaviour 15 — External Constraint Reading ────────────

    'external-constraint-reading': {
      defaultConstraintRx: /\b(waiting list|I am on the waiting list|the referral has not come through|I cannot get an appointment|the GP has not|the consultant has not|waiting for results|the system has not|I have not been seen|I need a referral before)\b/i,
      notAvoidance: [
        'On waiting list — genuine access constraint.',
        'Awaiting referral — system constraint.',
        'Test results not yet available — information constraint.',
        'Rest required — medically prescribed pause.',
      ],
    },

    // ── Behaviour 16 — Meta Reading ───────────────────────────

    'meta-reading': {
      sectorNote:
        'Medical contexts can produce either minimisation (downplaying symptoms) or amplification (overstating for system reasons). Both affect map reliability. Watch for consistent absence of functional detail alongside either extreme.',
      performanceSignals: [
        {
          key: 'minimisation',
          rx:  /\b(I am fine really|it is not that bad|I am managing|I do not want to make a fuss|I am not one to complain|I am getting on with it|nothing serious)\b/i,
        },
      ],
    },

  },

};
