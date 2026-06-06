// ══════════════════════════════════════════════════════════
// SORTER GUIDE — Legal  v0.3.0
// Steering layer. Self-contained. No engine code here.
// Attach with: SorterSpine.attachGuide(GuideLegal);
//
// v0.3.0 — four domain-knowledge sections added:
//   gaps, skills, contradictions, directionPatterns.
//   These feed directly into the cartridge assembly.
//   All v0.2.0 steers unchanged.
// ══════════════════════════════════════════════════════════

const GuideLegal = {

  id:      'guide-legal',
  version: '0.3.0',
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


  // ── Gaps ─────────────────────────────────────────────────

  gaps: [
    {
      key:    'stated_position',
      name:   'Stated position on the central issue',
      rx:     /\b(my position is|I am claiming|my case is|I am arguing|the issue is|what I am saying|my side|my argument|I believe|I am contesting)\b/i,
      reason: 'Without a stated position the map cannot assess whether activity is building toward or away from a coherent case. This is the foundational gap.',
    },
    {
      key:    'supporting_documentation',
      name:   'Supporting documentation',
      rx:     /\b(documents|evidence|I have|the letter|the contract|the statement|the record|the file|I obtained|documentation|exhibits|I gathered)\b/i,
      reason: 'A stated position without documentation to support it is incomplete. The map cannot assess case strength without knowing what evidence exists.',
    },
    {
      key:    'key_deadline',
      name:   'Key deadline named',
      rx:     /\b(deadline|by when|the date|I have until|limitation|time limit|hearing date|it is listed|it expires|I must file by)\b/i,
      reason: 'Legal processes are time-bound. Without a named deadline the map cannot assess urgency or whether current activity is paced appropriately.',
    },
    {
      key:    'representation',
      name:   'Representation status',
      rx:     /\b(solicitor|barrister|lawyer|legal aid|represented|self-representing|my lawyer|my solicitor|acting for myself|no legal representation)\b/i,
      reason: 'Whether the person is represented or self-representing changes what the map needs to read and what the next useful moves are.',
    },
    {
      key:    'direction',
      name:   'Stated direction',
      rx:     /\b(I want|my goal|what I am trying to achieve|the outcome|I am seeking|I hope to|resolve|settle|win|defend|the result I want)\b/i,
      reason: 'Without a stated direction the map cannot assess whether procedural activity is building toward the right outcome.',
    },
  ],


  // ── Skills ───────────────────────────────────────────────

  skills: [
    {
      key:              'procedural_compliance',
      name:             'Meeting procedural requirements',
      rx:               /\b(I filed|I submitted|I served|I responded|I attended|I notified|I complied|I met the deadline|I lodged|I provided|on time|I did not miss)\b/i,
      loadSensitive:    true,
      isStructureSkill: true,
      works:            'Filing, serving, and responding within required timeframes — keeping the process moving without procedural failure.',
      breaks:           'Emotional load, cost pressure, or complexity causes procedural steps to be missed — creating new problems on top of the original matter.',
    },
    {
      key:              'evidence_gathering',
      name:             'Gathering and organising evidence',
      rx:               /\b(I obtained|I gathered|I collected|I organised|I requested|I retrieved|I found|the document|I have the|I located|I compiled)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:            'Systematically gathering documents, statements, and records that support the stated position.',
      breaks:           'Overwhelm or emotional avoidance causes delay in obtaining time-sensitive evidence.',
    },
    {
      key:              'honest_reporting',
      name:             'Honest self-reporting about the case',
      rx:               /\b(I have to be honest|the truth is|if I am honest|my case is not|I am not sure|there are weaknesses|I have to admit|the evidence does not|it is not as strong)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'Describing the case as it is — including weaknesses — rather than the version that feels strongest.',
      breaks:           'The need to believe in the case produces entries that overstate strength and understate gaps — the map loses the real picture.',
    },
    {
      key:              'acting_on_advice',
      name:             'Acting on legal advice',
      rx:               /\b(my solicitor said|I was advised|on advice|I followed the advice|the lawyer recommended|I acted on|I did what they said|I took the advice)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'Receiving legal advice and implementing it rather than second-guessing or delaying.',
      breaks:           'Cost concern, disagreement, or emotional resistance causes advice to be set aside — procedural and strategic risk accumulates.',
    },
  ],


  // ── Contradictions ────────────────────────────────────────

  contradictions: [
    {
      a:    /\b(I have a strong case|my case is solid|I am going to win|it is clear cut|the evidence is overwhelming|there is no doubt|they have no defence)\b/i,
      b:    /\b(I do not have|I have not found|the document is missing|I cannot prove|I have no evidence|I am not sure|there is a problem with|I have not been able to)\b/i,
      text: 'A stated belief in a strong case and described gaps in the evidence or documentation both appear. Position confidence and evidential reality are not yet matching. The map reads both without deciding which is accurate — the evidence base is the more reliable anchor.',
    },
    {
      a:    /\b(I will deal with it|I am on top of it|I have it under control|I know what I need to do|I have a plan for it)\b/i,
      b:    /\b(I have not filed|I have not responded|I missed|I have not contacted|the deadline|I have not done|still not done|I keep putting off)\b/i,
      text: 'A stated sense of being on top of the matter and specific procedural steps not yet taken both appear. In legal contexts, the gap between intention and action has consequences that compound quickly.',
    },
  ],


  // ── Direction Patterns ────────────────────────────────────

  directionPatterns: [
    { rx: /win|succeed|favourable outcome|court finds|in my favour/i,          label: 'toward a favourable outcome' },
    { rx: /settle|resolution|agreement|out of court|negotiate/i,               label: 'toward settlement or resolution' },
    { rx: /defend|protect|keep|maintain|hold on to/i,                          label: 'toward defending a position' },
    { rx: /close|end|finished|done with|behind me|move on/i,                   label: 'toward closing the matter' },
    { rx: /understand|clarity|know where I stand|clear picture|understand my/i, label: 'toward clarity on the position' },
  ],


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

    'confidence-calibration': {
      sectorNote:
        'Legal maps require documented position and supporting evidence before a supported read is possible. Stated positions without documentation are partial at most. This is a high-stakes sector — confidence-gated output should be applied. Do not produce position assessments from thin material.',
      minimumForOutput: 'supported',
    },

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

    'competing-priorities': {
      costSignals: [
        { key: 'cost_vs_position',     rx: /\b(I cannot afford to continue|the cost is|funding has run out|I may have to stop|unaffordable but|I need to settle but)\b/i },
        { key: 'emotional_vs_process', rx: /\b(I cannot face another|I want it to end|the process is destroying|I know I should continue but|too much emotionally)\b/i },
        { key: 'time_vs_quality',      rx: /\b(deadline pressure|I have to file by|not enough time to|rushing to meet|it is not ready but)\b/i },
      ],
    },

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
