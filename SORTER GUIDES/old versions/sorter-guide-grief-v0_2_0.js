// ══════════════════════════════════════════════════════════
// SORTER GUIDE — Grief  v0.2.0
// First-ring sector guide.
// Attach with: SorterSpine.attachGuide(GuideGrief);
//
// v0.2.0 — four domain-knowledge sections added:
//   gaps, skills, contradictions, directionPatterns.
//   These feed directly into the cartridge assembly.
//   All v0.1.0 steers unchanged.
//
// Grief does not move like other domains.
// Circling is not failure here — it is the shape of it.
// The absence of forward movement is often the correct read.
// ══════════════════════════════════════════════════════════

const GuideGrief = {

  id:      'guide-grief',
  version: '0.2.0',
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


  // ── Gaps ─────────────────────────────────────────────────

  gaps: [
    {
      key:    'loss_named',
      name:   'The loss directly named',
      rx:     /\b(I lost|they died|she died|he died|the death|the loss of|gone|my mother|my father|my partner|my child|my friend|the relationship ended|I left|it ended)\b/i,
      reason: 'The loss itself needs to be named before the map can read what is happening in response to it. Without it the map is reading around something central.',
    },
    {
      key:    'support_network',
      name:   'Support network',
      rx:     /\b(I spoke to|I have|people around me|my family|my friends|support|someone I can|I am not alone|I told|I reached out|counsellor|therapist|group)\b/i,
      reason: 'Whether the person is carrying this alone or has people around them changes what the map can read and what is most urgent.',
    },
    {
      key:    'functional_impact',
      name:   'Functional impact',
      rx:     /\b(I cannot work|I have not eaten|I have not slept|I cannot function|basic things|I have stopped|I am not leaving|I cannot concentrate|I have not)\b/i,
      reason: 'Grief affecting basic function — sleep, eating, work, leaving the house — is a different read from grief that is painful but not disabling. The distinction matters.',
    },
    {
      key:    'what_person_needs',
      name:   'What the person needs',
      rx:     /\b(I need|what would help|what I want|I would like|I am looking for|I wish|what I need is|the thing that would|if only)\b/i,
      reason: 'Feelings are often clear in grief. What the person actually needs is often not named. That gap is where the most useful next entries sit.',
    },
    {
      key:    'direction',
      name:   'Any sense of direction',
      rx:     /\b(I want to|eventually|at some point|I hope|I would like to|one day|I am trying to|I am working toward|finding my way|getting through)\b/i,
      reason: 'Direction in grief is not the same as resolution. Any sense of what the person is moving toward — however tentative — helps the map read whether the current period is acute, extended, or beginning to shift.',
    },
  ],


  // ── Skills ───────────────────────────────────────────────

  skills: [
    {
      key:              'naming_the_loss',
      name:             'Naming the loss directly',
      rx:               /\b(I said it|I named it|I spoke about|I told someone|I wrote about|I allowed myself to|I said out loud|I acknowledged|I accepted that)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:            'Naming the loss directly rather than writing around it — which is the beginning of being able to carry it rather than avoid it.',
      breaks:           'The loss stays unnamed across multiple entries — the map is reading the shape of avoidance without being able to say what is being avoided.',
    },
    {
      key:              'seeking_support',
      name:             'Seeking or accepting support',
      rx:               /\b(I asked for|I accepted|I reached out|I called|I went to|I spoke to|I told them|I let them|I allowed|I received|I have support)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:            'Reaching toward others — friends, family, professionals — rather than carrying the grief entirely alone.',
      breaks:           'Isolation reasserts under load — the person withdraws from available support and carries more alone than is sustainable.',
    },
    {
      key:              'self_care',
      name:             'Basic self-care',
      rx:               /\b(I ate|I slept|I went outside|I moved|I showered|I got dressed|I left the house|I made myself|I managed to|basic things|I kept)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:            'Maintaining basic self-care — eating, sleeping, moving — during a period when these things require effort.',
      breaks:           'Acute grief or a hard period causes self-care to stop — the person is not eating, sleeping, or leaving the house.',
    },
    {
      key:              'allowing_grief',
      name:             'Allowing the grief',
      rx:               /\b(I cried|I let myself|I allowed|I did not push it away|I sat with|I gave myself|I grieved|I felt it|I let it|I did not try to stop)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'Allowing the grief to be present rather than managing it away — which is what allows it to move at its own pace.',
      breaks:           'The pressure to cope or appear functional causes the grief to be suppressed — it accumulates rather than moving.',
    },
  ],


  // ── Contradictions ────────────────────────────────────────

  contradictions: [
    {
      a:    /\b(I am okay|I am managing|I am fine|I am getting on with things|I am coping|I am doing alright|I am okay really)\b/i,
      b:    /\b(I cannot|I have not|I broke down|I am not sleeping|I am not eating|I have stopped|I cannot function|it hit me|I fell apart|I am struggling)\b/i,
      text: 'A stated sense of coping and described difficulty functioning both appear. In grief these often coexist — the presented surface and the actual experience are not the same thing. The map holds both without deciding which is true. Both can be true at once.',
    },
    {
      a:    /\b(I want to move on|I need to get past this|I should be over it|it has been long enough|I need to move forward)\b/i,
      b:    /\b(I still|I keep|it comes back|I miss|I think about|I cannot stop|the grief|it is still|it has not gone|I am still)\b/i,
      text: 'A stated desire to move on and the continuing presence of the grief both appear. The desire to be past it and the reality of still being in it are not a contradiction — they are the shape of grief. The map holds both. There is no timeline that applies here.',
    },
    {
      a:    /\b(I loved them|I miss them|I would do anything|they meant everything|I cannot imagine|they were everything)\b/i,
      b:    /\b(relief|relieved|it is over|better off|free|the burden|it was hard|the end was|glad that|I feel guilty because I feel)\b/i,
      text: 'Love or deep attachment and relief or ambivalence both appear. These are not opposites in grief — they are both real and both valid. The map holds them without resolving the tension. Guilt about the relief is common and does not require explanation.',
    },
  ],


  // ── Direction Patterns ────────────────────────────────────

  directionPatterns: [
    { rx: /carry it|live with it|learn to carry|hold it|make room for/i,          label: 'toward carrying the loss rather than resolving it' },
    { rx: /return to|get back to|resume|pick up|reconnect|back to/i,              label: 'toward returning to suspended life' },
    { rx: /honour|remember|mark|memorial|legacy|keep their memory/i,              label: 'toward honouring the loss' },
    { rx: /support|help others|understand|use this|meaning|something from/i,      label: 'toward finding meaning' },
    { rx: /get through|survive|just get through|one day at a time|keep going/i,   label: 'toward getting through the current period' },
  ],


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
