// ══════════════════════════════════════════════════════════
// SORTER GUIDE — Creative  v0.1.0
// First-ring sector guide.
// Attach with: SorterSpine.attachGuide(GuideCreative);
//
// Sector: creative work in any form — writing, music,
// visual art, design, performance, making.
//
// Block is not always avoidance.
// Fallow is not always stuck.
// Output is not always the right measure of movement.
// This guide re-calibrates those readings for creative work.
// ══════════════════════════════════════════════════════════

const GuideCreative = {

  id:      'guide-creative',
  version: '0.1.0',
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

  steer: {

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
      // Output is not the only measure of movement in creative work.
      // Internal engagement, input, and decision count.
      defaultStuckRx: /\b(I have not touched it|I cannot start|I open it and close it|I have abandoned|I have given up on|I do not see the point|I have stopped entirely|months since|I cannot face it|I do not know what I am making)\b/i,
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
      ],
    },

    'load-sensitive-capability': {
      defaultLoadSignals: [
        { key: 'deadline',     rx: /\b(deadline|due|submission|the show|the launch|they are expecting|I have to deliver|I promised|it is due)\b/i },
        { key: 'comparison',   rx: /\b(everyone else|compared to|they are so much better|I look at their work|what they are doing|I will never|I am behind)\b/i },
        { key: 'meaning',      rx: /\b(why am I|what is the point|I do not know why I|I have lost the reason|I do not care about|it feels empty|I am going through the motions)\b/i },
        { key: 'external',     rx: /\b(they want me to|commercial|what sells|what they expect|not what I want to make|I am making it for them|I have lost my voice)\b/i },
        { key: 'perfectionism',rx: /\b(it is not good enough|I cannot show|it is not ready|I keep reworking|I cannot finish|I destroy|I delete|I cannot let it go)\b/i },
      ],
    },

    'state-change-detection': {
      // Block and fallow are not always state changes.
      // A creative person moving from block to output
      // may represent a genuine state change — or a single good day.
      // Require multiple independent entries before confirming.
      minimumSeparationDays: 14,
    },

    'competing-priorities': {
      costSignals: [
        { key: 'creative_cost', rx: /\b(I have not made|I have not worked on|I have not had time|the work is suffering|I have not touched|no time for the work|I have given it up for)\b/i },
      ],
    },

    'open-gap-discipline': {
      priorityGaps: [
        'what_the_work_is',
        'block_vs_fallow',
        'direction_of_work',
        'relationship_to_finished_work',
        'direction',
      ],
    },

  },

};
