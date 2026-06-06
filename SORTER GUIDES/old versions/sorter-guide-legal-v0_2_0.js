// ══════════════════════════════════════════════════════════
// SORTER GUIDE — Legal  v0.2.0
// Steering layer. Self-contained. No engine code here.
// Attach with: SorterSpine.attachGuide(GuideLegal);
//
// v0.2.0 — steering added for behaviours 12–16.
// ══════════════════════════════════════════════════════════

const GuideLegal = {

  id:      'guide-legal',
  version: '0.2.0',
  type:    'sector',
  parent:  null,
  purpose: 'Steer sorter behaviours toward legal-sector conditions — evidenced positions, procedural movement, and documentation gaps.',
  sector:  'legal',

  sectorNotes: {
    distinctivePressures: [
      'Deadline and hearing dates.',
      'Undisclosed or missing documentation.',
      'Conflict between instructed position and available evidence.',
      'Cost and funding pressure.',
      'Emotional load of proceedings affecting practical function.',
      'Asymmetric power between parties.',
    ],
    distinctiveMovement: [
      'Documents gathered or filed.',
      'Legal advice sought and acted on.',
      'Position clarified in writing.',
      'Deadline met.',
      'Evidence obtained.',
      'Instruction given to solicitor.',
      'Disclosure made.',
    ],
    distinctiveGaps: [
      'No stated position on the central issue.',
      'No documentation supporting the stated position.',
      'Key deadline not named.',
      'Representation status unknown.',
      'Material facts not yet disclosed.',
    ],
    outputAudience:  'Legal professional, self-representing litigant, or case preparation support.',
    outputRegister:  'Precise. Evidenced. No overclaiming. Bounded by what the material supports.',
  },

  steer: {

    'avoidance-detection': {
      defaultActionRx: /\b(I filed|I submitted|I instructed|I obtained|I disclosed|I responded|I replied|I served|I attended|I provided|I gathered|I sent|I signed|I confirmed|I notified)\b/i,
      notAvoidance: [
        'Waiting for the other party to disclose.',
        'Delay on legal advice pending further information.',
        'Strategic silence on a contested point.',
        'Waiting for a hearing date to be set.',
      ],
    },

    'movement-non-movement-reading': {
      movementEvidence: [
        'Document filed or submitted.',
        'Legal advice received and acted on.',
        'Position stated in writing.',
        'Evidence obtained.',
        'Deadline met.',
        'Disclosure made.',
        'Instruction given.',
        'Response served.',
        'Hearing attended.',
      ],
      defaultStuckRx: /\b(still waiting|nothing has moved|no progress|same position|no response|not heard back|still undecided|no closer|going around|no further forward)\b/i,
    },

    'load-sensitive-capability': {
      defaultLoadSignals: [
        { key: 'hearing',    rx: /\b(hearing|court date|tribunal|before the judge|listed|adjourned|postponed)\b/i },
        { key: 'disclosure', rx: /\b(they have not disclosed|missing documents|incomplete disclosure|withheld|redacted)\b/i },
        { key: 'cost',       rx: /\b(cost|funding|legal aid|I cannot afford|the bill|running out of money|no funding)\b/i },
        { key: 'time',       rx: /\b(deadline|by when|running out of time|the date is|limitation|time limit|expires)\b/i },
        { key: 'emotional',  rx: /\b(overwhelming|I cannot think|too much|I am not coping|it is too much|falling apart)\b/i },
      ],
    },

    'open-gap-discipline': {
      priorityGaps: [
        'stated_position',
        'supporting_documentation',
        'key_deadline',
        'representation',
        'direction',
      ],
    },

    'contradiction-holding': {
      detectionShape: {
        text: 'Stated legal position and material available to support it are not matching. The map reads the gap between position and documentation — not the merits of the position itself.',
      },
    },

    // ── Behaviour 12 — Confidence Calibration ────────────────
    // Legal maps without documented position and supporting
    // evidence cannot be reliably read. High stakes require
    // supported confidence before output.

    'confidence-calibration': {
      sectorNote:
        'Legal maps require documented position and supporting evidence before a supported read is possible. Stated positions without documentation are partial at most. This is a high-stakes sector — confidence-gated output should be applied. Do not produce position assessments from thin material.',
      minimumForOutput: 'supported',
    },

    // ── Behaviour 13 — State Change Detection ────────────────

    'state-change-detection': {
      minimumSeparationDays: 7,
      watchFor: [
        'Position clarified where it was previously absent.',
        'Documentation obtained where it was previously missing.',
        'Representation secured where it was previously absent.',
        'Deadline met that was previously at risk.',
        'Disclosure received that changed the available evidence.',
      ],
    },

    // ── Behaviour 14 — Competing Priorities ──────────────────

    'competing-priorities': {
      costSignals: [
        { key: 'cost_vs_position',    rx: /\b(I cannot afford to continue|the cost is|funding has run out|I may have to stop|unaffordable but|I need to settle but)\b/i },
        { key: 'emotional_vs_process',rx: /\b(I cannot face another|I want it to end|the process is destroying|I know I should continue but|too much emotionally)\b/i },
        { key: 'time_vs_quality',     rx: /\b(deadline pressure|I have to file by|not enough time to|rushing to meet|it is not ready but)\b/i },
      ],
    },

    // ── Behaviour 15 — External Constraint Reading ────────────
    // Legal processes are full of genuine external constraints.
    // Must not misread procedural waiting as avoidance.

    'external-constraint-reading': {
      defaultConstraintRx: /\b(waiting for disclosure|the other party has not|the court has not listed|the date has not been set|pending the decision|awaiting judgment|they have not responded|the process requires|I cannot file until|I need their response first|the limitation period|legally I cannot)\b/i,
      notAvoidance: [
        'Waiting for court to list the matter.',
        'Waiting for the other party to disclose.',
        'Not filing until legal advice received.',
        'Strategic delay on advice.',
        'Limitation period not yet reached.',
      ],
    },

    // ── Behaviour 16 — Meta Reading ───────────────────────────
    // Legal context creates pressure to present a strong case.
    // People may overstate their position or understate gaps.

    'meta-reading': {
      sectorNote:
        'Legal context creates pressure to present a strong position. People may overstate the strength of their case or understate documentation gaps. Absence of admitted weakness in entries is a significant performance signal in this sector.',
      performanceSignals: [
        {
          key: 'case_confidence',
          rx:  /\b(I have a strong case|my case is solid|I am going to win|it is clear cut|the evidence is overwhelming|there is no doubt|they have no defence)\b/i,
        },
      ],
    },

  },

};
