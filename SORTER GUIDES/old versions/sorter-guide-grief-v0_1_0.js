// ══════════════════════════════════════════════════════════
// SORTER GUIDE — Grief  v0.1.0
// First-ring sector guide.
// Attach with: SorterSpine.attachGuide(GuideGrief);
//
// Sector: loss, bereavement, and grief in its many forms.
// Not only death — also loss of role, relationship, identity,
// capacity, or future that was assumed.
//
// Grief does not move like other domains.
// Circling is not failure here — it is the shape of it.
// The absence of forward movement is often the correct read.
// This guide re-calibrates what movement means in this context.
// ══════════════════════════════════════════════════════════

const GuideGrief = {

  id:      'guide-grief',
  version: '0.1.0',
  type:    'sector',
  parent:  null,
  purpose: 'Steer sorter behaviours toward grief-specific conditions. Re-calibrate movement, stuck, and avoidance readings for a domain where non-linear is normal and circling is not failure.',
  sector:  'grief',

  sectorNotes: {
    distinctivePressures: [
      'Acute grief — recent loss, early period.',
      'Complicated grief — loss that is not resolving over time.',
      'Disenfranchised grief — loss that others do not recognise as loss.',
      'Anticipatory grief — loss that has not yet happened.',
      'Secondary losses — everything that came with what was lost.',
      'Grief affecting function — work, relationships, self-care.',
      'Pressure to "move on" from others.',
    ],
    distinctiveMovement: [
      'Naming the loss directly rather than around it.',
      'Allowing the grief rather than managing it away.',
      'Asking for support.',
      'Returning to a suspended activity.',
      'Making a decision that was deferred because of the loss.',
      'Contact with others when isolation was the pattern.',
      'Attending to basic self-care during a hard period.',
      'Marking the loss in some chosen way.',
    ],
    distinctiveGaps: [
      'The loss itself not directly named.',
      'Secondary losses not described.',
      'Support network not visible.',
      'What the person needs — not just what they feel — not stated.',
      'Whether grief is acute or extended not distinguishable from material.',
    ],
    outputAudience:  'Individual, grief support worker, therapist context, or bereavement service.',
    outputRegister:  'Slow. Careful. Non-directive. Does not impose a timeline. Does not suggest what grief should look like.',
  },

  steer: {

    'movement-non-movement-reading': {
      movementEvidence: [
        'Loss named directly.',
        'Grief allowed — not managed or suppressed.',
        'Support sought or accepted.',
        'Basic self-care maintained.',
        'A suspended activity returned to.',
        'A decision made that the grief had deferred.',
        'Contact with others when isolation was present.',
        'Something done to mark or honour the loss.',
      ],
      // In grief, circling is not the same as stuck.
      // The stuck signal requires additional evidence
      // beyond the grief pattern itself.
      defaultStuckRx: /\b(I cannot function|I have stopped everything|I am not able to|I cannot see any|I do not want to|I cannot move|I am frozen|nothing matters|I cannot eat|I cannot sleep|I have given up)\b/i,
    },

    'avoidance-detection': {
      defaultActionRx: /\b(I named it|I said it out loud|I allowed myself|I let myself|I asked for|I accepted|I went to|I spoke about|I returned to|I marked|I remembered|I told someone)\b/i,
      notAvoidance: [
        'Grief taking its time — this is never avoidance.',
        'Not being ready to speak about the loss yet.',
        'Choosing not to mark the loss in a particular way.',
        'Withdrawing temporarily to process.',
        'Not having returned to a previous activity — timing is for the person.',
        'Any pace of grief that is not causing harm.',
      ],
    },

    'load-sensitive-capability': {
      defaultLoadSignals: [
        { key: 'acute',        rx: /\b(just happened|recently|it is new|I have just|the funeral|the diagnosis|they just told me|I have just found out)\b/i },
        { key: 'anniversary',  rx: /\b(anniversary|this time last year|a year ago|the date|their birthday|the day they|this week last year)\b/i },
        { key: 'secondary',    rx: /\b(I also lost|and then|on top of that|everything changed|my whole life|I do not have|I have also lost|and with them went)\b/i },
        { key: 'pressure',     rx: /\b(they say I should|people expect|I should be over|I have to get back|I cannot keep|they do not understand|they think I should)\b/i },
        { key: 'function',     rx: /\b(I cannot work|I cannot concentrate|I have not left|I have not eaten|I have not slept|I cannot function|basic things)\b/i },
      ],
    },

    'state-change-detection': {
      // State change in grief is not linear.
      // A period of better functioning followed by a harder period
      // is not deterioration — it is the shape of grief.
      // Require longer separation and more evidence before reading
      // a genuine state change in this domain.
      minimumSeparationDays: 21,
      changeConfidenceOverride: {
        note: 'In grief, require evidenced state over multiple periods before confirming change. Single period improvement or deterioration is not a state change.',
      },
    },

    'contradiction-holding': {
      detectionShape: {
        text: 'Relief and grief, love and anger, wanting to move forward and wanting to stay — these are not contradictions in grief. They are the shape of it. Name both without resolving either.',
      },
    },

    'open-gap-discipline': {
      priorityGaps: [
        'loss_named',
        'support_network',
        'functional_impact',
        'what_person_needs',
        'direction',
      ],
    },

  },

};
