// ══════════════════════════════════════════════════════════
// SORTER GUIDE — Creative  v0.3.0
// First-ring sector guide.
// Attach with: SorterSpine.attachGuide(GuideCreative);
//
// v0.3.0 — steer block completed:
//   — open-gap-discipline.absenceRules added.
//   — confidence-calibration added.
//   — state-change-detection.watchFor added.
//   — competing-priorities expanded.
//   — meta-reading added.
//   All v0.2.0 fields unchanged.
//
// Block is not always avoidance.
// Fallow is not always stuck.
// Output is not always the right measure of movement.
// ══════════════════════════════════════════════════════════

const GuideCreative = {

  id:      'guide-creative',
  version: '0.3.0',
  type:    'sector',
  parent:  null,
  purpose: 'Steer sorter behaviours toward creative work conditions. Re-calibrate block vs avoidance, fallow vs stuck, and output vs movement for a domain where the internal process is often where the real work happens.',
  sector:  'creative',

  sectorNotes: {
    distinctivePressures: [
      'Block — inability to produce that is not simply avoidance.',
      'Perfectionism preventing completion or sharing.',
      'External pressure conflicting with creative direction.',
      'Commercial vs artistic tension.',
      'Comparison to others affecting the internal compass.',
      'Loss of meaning in the work — why am I making this.',
      'Fallow period — genuine rest or regeneration misread as failure.',
      'The gap between internal vision and what is being produced.',
    ],
    distinctiveMovement: [
      'Work made — in any form, regardless of quality.',
      'Work shared — with anyone, in any context.',
      'Sitting with the work even when it is not going well.',
      'Naming what is blocked without trying to force through it.',
      'A decision made about direction, form, or project.',
      'Returning to the work after absence.',
      'Input taken — reading, watching, listening, gathering.',
      'A constraint chosen deliberately to open the work up.',
      'Finishing something rather than abandoning it.',
    ],
    distinctiveGaps: [
      'What the work is and what it is for — not described.',
      'Whether block is recent or long-standing.',
      'What the person is making toward — not just what they are stuck on.',
      'Whether fallow is chosen or has arrived without awareness.',
      'The relationship between the person and the finished or shared work.',
    ],
    outputAudience:  'Individual, creative coach, artist support context, or arts organisation.',
    outputRegister:  'Respectful of process. Does not prescribe pace. Does not equate output with worth. Evidence-based about what is actually happening.',
  },


  // ── Gaps ─────────────────────────────────────────────────

  gaps: [
    {
      key:    'what_the_work_is',
      name:   'What the work is and what it is for',
      rx:     /\b(I am working on|the project is|the piece|the book|the song|the film|the painting|what I am making|the work is|I am writing|I am making)\b/i,
      reason: 'Without knowing what the work is the map cannot read whether block, fallow, or output patterns are significant. The work needs to be named.',
    },
    {
      key:    'block_vs_fallow',
      name:   'Whether block is block or fallow',
      rx:     /\b(I am blocked|I cannot start|I open it and close|I cannot write|I cannot make|it is not coming|I am stuck|fallow|resting|I need to|I am gathering|I am not ready)\b/i,
      reason: 'Block and fallow are different states requiring different responses. Block is resistance. Fallow is rest or regeneration. The map cannot read one as the other without more material.',
    },
    {
      key:    'direction_of_work',
      name:   'Direction of the work',
      rx:     /\b(I am working toward|the direction is|what I want to make|where the work is going|the vision|what it is becoming|the project needs|I have decided|the next step is)\b/i,
      reason: 'Without a described direction the map cannot distinguish productive circling from stuck. What the person is making toward is as important as what they are currently producing.',
    },
    {
      key:    'relationship_to_finished_work',
      name:   'Relationship to finished or shared work',
      rx:     /\b(I finished|I shared|I showed|I submitted|I published|I released|I performed|I completed|I let it go|I sent it|once it is done)\b/i,
      reason: 'What happens when work is finished or shared is often where the real difficulty sits. Perfectionism, fear of response, or inability to let go are all visible here.',
    },
    {
      key:    'direction',
      name:   'Stated direction',
      rx:     /\b(I want to|my goal|I am working toward|what I am making|the work I want|I am trying to|the project I want|my creative direction)\b/i,
      reason: 'Without a stated direction the map cannot assess whether current activity is moving toward something or circling without object.',
    },
  ],


  // ── Skills ───────────────────────────────────────────────

  skills: [
    {
      key:              'showing_up',
      name:             'Showing up to the work',
      rx:               /\b(I worked on|I wrote|I made|I recorded|I sketched|I drafted|I produced|I sat down|I opened|I returned to|I went back to|I spent time on)\b/i,
      loadSensitive:    true,
      isStructureSkill: true,
      works:            'Sitting down with the work — even when it is not going well, even when the output is poor.',
      breaks:           'Perfectionism, external pressure, or loss of meaning stops the person sitting with the work at all — avoidance of the difficulty rather than sitting in it.',
    },
    {
      key:              'sharing_or_finishing',
      name:             'Finishing or sharing work',
      rx:               /\b(I finished|I shared|I showed|I submitted|I published|I released|I performed|I completed|I sent|I let it go|I put it out)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:            'Completing something and letting it go — sharing it or submitting it — rather than continuing to revise indefinitely.',
      breaks:           'Perfectionism or fear of response prevents completion or sharing — work accumulates in unfinished states.',
    },
    {
      key:              'taking_input',
      name:             'Taking input',
      rx:               /\b(I read|I watched|I listened|I gathered|I researched|I looked at|I took in|I absorbed|I studied|I noticed|I found|I discovered)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'Actively gathering input — reading, watching, listening, looking — that feeds the work.',
      breaks:           'Output pressure or block causes the input phase to be skipped — the person tries to produce without refilling.',
    },
    {
      key:              'naming_the_block',
      name:             'Naming what is blocked',
      rx:               /\b(I am blocked because|what is stopping me|the block is|I know why|I cannot because|the problem is|I identified|I worked out|the issue is)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'Naming specifically what is blocked and why — which is different from experiencing the block without description.',
      breaks:           'The block stays unnamed and general — which makes it impossible to work with or around.',
    },
  ],


  // ── Contradictions ────────────────────────────────────────

  contradictions: [
    {
      a:    /\b(I want to make|I need to make|I should be working|I have to finish|the work matters|I care about the work)\b/i,
      b:    /\b(I have not touched|I have not worked|I keep avoiding|I cannot start|I open it and close|I have not made|same block|still not)\b/i,
      text: 'Stated drive or need to make and consistent absence from the work both appear. Wanting to make and making are different things — especially when block, fear, or external pressure is active. The gap between them is where the most useful material sits.',
    },
    {
      a:    /\b(the work is good|I am happy with|it is going well|I am making progress|I am producing|it is coming together)\b/i,
      b:    /\b(I have not shown|I cannot share|I am not ready|it is not good enough|I keep reworking|I cannot let it go|I keep changing|I cannot finish)\b/i,
      text: 'A stated sense that the work is going well and an inability to share or finish it both appear. Satisfaction with the work and readiness to release it are different things. The map holds both — the block may be about reception rather than quality.',
    },
  ],


  // ── Direction Patterns ────────────────────────────────────

  directionPatterns: [
    { rx: /finish|complete|done|submit|release|publish|perform/i,               label: 'toward completing and releasing work' },
    { rx: /start|begin|new project|new work|the next|I want to make/i,          label: 'toward starting new work' },
    { rx: /improve|better|develop|grow|learn|skill|technique/i,                 label: 'toward developing craft or skill' },
    { rx: /share|show|audience|public|exhibition|performance|recognition/i,     label: 'toward sharing work with an audience' },
    { rx: /sustain|keep going|make it work|living from|income from the work/i,  label: 'toward sustaining a creative practice' },
  ],


  // ── Steer block ───────────────────────────────────────────

  steer: {

    'open-gap-discipline': {
      priorityGaps: [
        'what_the_work_is',
        'block_vs_fallow',
        'direction_of_work',
        'relationship_to_finished_work',
        'direction',
      ],
      absenceRules: {
        fallowIsNotStuck:
          'Fallow is not stuck. Rest, regeneration, and input phases are legitimate states in a creative practice. Do not read absence of output as absence of movement unless the person describes it as a problem.',
        blockIsNotAvoidance:
          'Block is not always avoidance. Genuine inability to produce — from perfectionism, loss of meaning, or external pressure — is a different state from avoiding the work. The map must distinguish them.',
        outputIsNotTheOnlyMovement:
          'Movement in a creative map is not only output. A decision made, a direction named, a constraint chosen, input gathered — these are all movement. Do not read output volume as the primary signal.',
        internalProcessCounts:
          'The internal process — thinking, sitting with the work, struggling with it — is part of the work. Described internal process without described output is not a gap unless the person says it is.',
      },
    },

    'confidence-calibration': {
      sectorNote:
        'Creative maps are frequently partial because the internal process is hard to describe and people often feel they have nothing to report when output is low. Low entry volume during a fallow or blocked period is not a data quality problem — it is an accurate read of where the person is. Do not inflate confidence because entries are thin. Equally, high-volume entries describing internal process without output or direction should be held at partial until direction or movement is described.',
    },

    'state-change-detection': {
      minimumSeparationDays: 14,
      watchFor: [
        'Output appearing after an absent period — or disappearing after an active one.',
        'Block named more or less specifically over time.',
        'Direction becoming clearer or more uncertain.',
        'Fallow transitioning to block, or block to fallow — the quality of the absence shifting.',
        'Relationship to finished work changing — more or less able to let go.',
        'External pressure increasing or decreasing.',
        'Meaning in the work returning or further diminishing.',
        'Input phase appearing before a return to output.',
      ],
    },

    'avoidance-detection': {
      defaultActionRx: /\b(I worked on|I wrote|I made|I recorded|I sketched|I drafted|I produced|I shared|I finished|I submitted|I showed|I returned to|I sat with|I read|I researched|I gathered)\b/i,
      notAvoidance: [
        'Fallow period — deliberate or instinctive rest between creative work.',
        'Input phase — gathering, reading, watching, listening before making.',
        'Sitting with uncertainty about direction before committing.',
        'Choosing not to share work that is not ready.',
        'Taking time between finishing and submitting.',
        'Any pace of creative work that is not causing harm.',
        'Reworking material — iteration is part of the process, not avoidance of finishing.',
        'Choosing not to make during a period when other demands are genuinely primary.',
        'A break after completing and releasing a significant piece.',
      ],
    },

    'movement-non-movement-reading': {
      movementEvidence: [
        'Work made — pages, sketches, recordings, drafts, anything.',
        'Work shown or shared.',
        'The work engaged with even without output.',
        'A decision made about the work.',
        'Input gathered — research, reading, listening, looking.',
        'Returning to the work after a gap.',
        'Something finished.',
        'A constraint or direction chosen.',
        'Block named clearly rather than avoided.',
      ],
      defaultStuckRx: /\b(I have not touched it|I cannot start|I open it and close it|I have abandoned|I have given up on|I do not see the point|I have stopped entirely|months since|I cannot face it|I do not know what I am making)\b/i,
    },

    'load-sensitive-capability': {
      defaultLoadSignals: [
        { key: 'deadline',      rx: /\b(deadline|due|submission|the show|the launch|they are expecting|I have to deliver|I promised|it is due)\b/i },
        { key: 'comparison',    rx: /\b(everyone else|compared to|they are so much better|I look at their work|what they are doing|I will never|I am behind)\b/i },
        { key: 'meaning',       rx: /\b(why am I|what is the point|I do not know why I|I have lost the reason|I do not care about|it feels empty|I am going through the motions)\b/i },
        { key: 'external',      rx: /\b(they want me to|commercial|what sells|what they expect|not what I want to make|I am making it for them|I have lost my voice)\b/i },
        { key: 'perfectionism', rx: /\b(it is not good enough|I cannot show|it is not ready|I keep reworking|I cannot finish|I destroy|I delete|I cannot let it go)\b/i },
      ],
    },

    'competing-priorities': {
      costSignals: [
        { key: 'work_vs_life',        rx: /\b(I have not made|I have not worked on|I have not had time|the work is suffering|I have not touched|no time for the work|I have given it up for)\b/i },
        { key: 'art_vs_commerce',     rx: /\b(what they want|what sells|the commercial version|I am not making what I want|I am making it for money|I have compromised|I have sold out)\b/i },
        { key: 'vision_vs_capacity',  rx: /\b(what I want to make is|the gap between|I cannot execute|I cannot yet|the idea is bigger than|I cannot do it justice|the skill is not there yet)\b/i },
        { key: 'making_vs_sharing',   rx: /\b(I make but I cannot share|I finish but I cannot release|I cannot let it go|I am not ready to show|I hide it|I do not put it out)\b/i },
      ],
    },

    'meta-reading': {
      sectorNote:
        'Productivity performance is the primary pattern in creative material — describing more activity, more progress, or more direction than is actually present. The inverse also occurs: describing more failure or block than the material supports, often driven by comparison or external pressure. Both directions of distortion are present in creative maps. The map reads what is described happening to and with the work, not what the person says about their creative state in general.',
      performanceSignals: [
        {
          key: 'productivity_performance',
          rx:  /\b(I have been very productive|I have been making a lot|I have been working hard|the work is going really well|I am in a great flow|I have been incredibly creative)\b/i,
        },
        {
          key: 'failure_performance',
          rx:  /\b(I am a complete failure|I have no talent|I will never|I am the worst|I cannot do anything right|I have wasted|I am a fraud|I do not belong)\b/i,
        },
      ],
    },

  },

};
