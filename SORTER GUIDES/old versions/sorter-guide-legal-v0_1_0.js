// ══════════════════════════════════════════════════════════
// SORTER GUIDE — Legal  v0.1.0
// First-ring sector guide.
// Attach with: SorterSpine.attachGuide(GuideLegal);
//
// Sector: legal processes, proceedings, and preparation.
// Steers reading toward evidenced positions, procedural
// movement, and the gap between stated position and
// documented support.
// ══════════════════════════════════════════════════════════

const GuideLegal = {

  id:      'guide-legal',
  version: '0.1.0',
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
        text: 'A stated legal position and the material available to support it are not matching. The map reads the gap between position and documentation — not the merits of the position itself.',
      },
    },

  },

};
