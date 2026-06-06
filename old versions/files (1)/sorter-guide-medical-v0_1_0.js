// ══════════════════════════════════════════════════════════
// SORTER GUIDE — Medical  v0.1.0
// First-ring sector guide.
// Attach with: SorterSpine.attachGuide(GuideMedical);
//
// Sector: medical conditions, treatment, and health management.
// Steers reading toward treatment adherence, symptom load,
// functional movement, and the gap between prescribed plan
// and actual behaviour.
// ══════════════════════════════════════════════════════════

const GuideMedical = {

  id:      'guide-medical',
  version: '0.1.0',
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
        { key: 'pain',        rx: /\b(pain|painful|hurting|flare|bad day|severe|acute|chronic pain|in agony)\b/i },
        { key: 'fatigue',     rx: /\b(exhausted|fatigue|no energy|depleted|wiped out|too tired|cannot function)\b/i },
        { key: 'fear',        rx: /\b(scared|frightened|afraid|the prognosis|what it means|what they found|I am worried about)\b/i },
        { key: 'access',      rx: /\b(waiting list|cannot get an appointment|no GP|no referral|too long to wait|the system)\b/i },
        { key: 'carer',       rx: /\b(caring for|looking after|my carer|carer load|I am the carer|no one to help)\b/i },
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

  },

};
