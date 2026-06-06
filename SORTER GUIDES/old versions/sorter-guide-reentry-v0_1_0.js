// ══════════════════════════════════════════════════════════
// SORTER GUIDE — Re-entry  v0.1.0
// Steering layer. Self-contained. No engine code here.
// Attach with: SorterSpine.attachGuide(GuideReentry);
//
// Sector: post-incarceration reintegration.
// Steers the reading toward the conditions, pressures,
// and movement signals specific to re-entry.
//
// A guide does not add new behaviours.
// It shapes how existing behaviours operate in this context.
// ══════════════════════════════════════════════════════════

const GuideReentry = {

  id:      'guide-reentry',
  version: '0.1.0',
  purpose: 'Steer sorter behaviours toward re-entry conditions, pressures, and movement signals.',
  sector:  're-entry',


  // ── Steer ─────────────────────────────────────────────────
  //
  // Keyed by behaviour id.
  // Each entry overrides or extends that behaviour's config
  // when this guide is attached.
  // Behaviours not listed here are unaffected.

  steer: {

    'avoidance-detection': {
      // Domain-specific action language for re-entry context
      defaultActionRx: /\b(I attended|I reported|I signed|I met with|I called|I went to|I completed|I submitted|I applied|I showed up|I kept the appointment|I made contact|I did the programme|I did not miss)\b/i,

      // Things that must not be flagged as avoidance in this sector
      notAvoidance: [
        'Waiting for licence conditions to be clarified.',
        'Not contacting a victim as required by order.',
        'Delay caused by housing or ID not yet in place.',
        'Waiting for a support worker appointment.',
        'Strategic caution around known triggers or people.',
      ],
    },

    'movement-non-movement-reading': {
      // What counts as movement in re-entry specifically
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
      ],

      defaultStuckRx: /\b(same situation|nothing has moved|still waiting|back inside|recalled|same place|I keep ending up|nothing changes|I always|every time|no progress|still no|I cannot get)\b/i,
    },

    'load-sensitive-capability': {
      // Load signals specific to re-entry
      defaultLoadSignals: [
        { key: 'housing',       rx: /\b(no address|sofa surfing|hostel|temporary|nowhere to go|housing problem|evicted|told to leave)\b/i },
        { key: 'licence',       rx: /\b(licence|conditions|probation|parole|recalled|breach|warning|officer|supervision)\b/i },
        { key: 'stigma',        rx: /\b(record|disclosure|they found out|background check|I told them|they know|criminal record|DBS)\b/i },
        { key: 'isolation',     rx: /\b(no one|alone|no support|no family|cut off|no contact|no friends|no one knows)\b/i },
        { key: 'financial',     rx: /\b(no money|no ID|no bank account|benefits|waiting for|no income|I cannot pay)\b/i },
      ],
    },

    'open-gap-discipline': {
      // Gap priorities for re-entry — what is most blocking
      priorityGaps: [
        'accommodation',
        'licence_conditions',
        'support_worker',
        'direction',
        'load',
      ],
    },

    'connections-across-time': {
      // Minimum separation for a meaningful connection in this sector
      minimumSeparationDays: 14,

      // Patterns worth connecting across time in re-entry
      watchPatterns: [
        'return to known environments or people',
        'licence compliance',
        'substance use signals',
        'employment contact attempts',
        'housing instability',
      ],
    },

  },

};
