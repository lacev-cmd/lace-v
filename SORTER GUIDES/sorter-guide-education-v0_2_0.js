// ══════════════════════════════════════════════════════════
// SORTER GUIDE — Education  v0.2.0
// Steering layer. Self-contained. No engine code here.
// Attach with: SorterSpine.attachGuide(GuideEducation);
//
// v0.2.0 — steer block tightened:
//   — avoidance-detection added.
//     Distinguishes genuine slow study and legitimate
//     difficulty from avoidance of starting or engaging.
//     Without this the behaviour cannot distinguish a
//     student who is genuinely struggling from one who is
//     avoiding — both look like low activity.
//   All v0.1.0 fields unchanged.
// ══════════════════════════════════════════════════════════

const GuideEducation = {

  id:      'guide-education',
  version: '0.2.0',
  type:    'sector',
  parent:  null,
  purpose: 'Steer sorter behaviours toward education conditions — study progress, learning difficulty, assessment preparation, and the gap between attendance or effort described and understanding demonstrated.',
  sector:  'education',

  sectorNotes: {
    distinctivePressures: [
      'Understanding gap that has not been named or addressed.',
      'Assessment deadline pressure affecting quality of preparation.',
      'Attendance or engagement declining without named reason.',
      'Study activity that is not producing understanding — busy but not learning.',
      'Competing demands — work, family, health — eroding study time.',
      'Relationship with a tutor, teacher, or supervisor that is blocking progress.',
      'Confidence damage from prior failure or repeated difficulty affecting current engagement.',
      'Programme or course that does not match what the person needs or wants.',
    ],
    distinctiveMovement: [
      'Topic understood and named as understood.',
      'Assessment submitted.',
      'Help sought from tutor or support.',
      'Study session completed with named output.',
      'Understanding gap named and addressed.',
      'Attendance maintained.',
      'Feedback read and applied.',
      'Plan adjusted after setback.',
      'Study method changed.',
      'Support accessed — learning support, disability service, pastoral.',
    ],
    distinctiveGaps: [
      'What is actually being studied — subject, course, level — not stated.',
      'Current assessment or deadline not described.',
      'Understanding gap not named — study activity without named understanding.',
      'Help or support not sought despite named difficulty.',
      'Direction — why this course, toward what — not described.',
    ],
    outputAudience:  'Student, tutor, learning support worker, or academic pastoral context.',
    outputRegister:  'Clear. Non-judgemental. Reads activity and understanding separately. Does not assume effort equals progress.',
  },


  // ── Gaps ─────────────────────────────────────────────────

  gaps: [
    {
      key:    'course_or_subject',
      name:   'Course or subject being studied',
      rx:     /\b(I am studying|my course|the subject|the module|the programme|the degree|the qualification|what I am doing|the topic|the unit|the class)\b/i,
      reason: 'Without knowing what is being studied the map cannot assess whether activity is appropriate, whether difficulty is unusual, or whether deadlines and assessments are correctly prioritised.',
    },
    {
      key:    'current_assessment',
      name:   'Current assessment or deadline',
      rx:     /\b(the assignment|the essay|the exam|the test|the deadline|the submission|the project|I have to|it is due|I am working toward|the assessment|I need to submit|the coursework)\b/i,
      reason: 'Without a named assessment or deadline the map cannot assess whether study activity is directed or ambient. Deadlines are the structural anchors of educational progress.',
    },
    {
      key:    'understanding_gap',
      name:   'Understanding gap — what is not understood',
      rx:     /\b(I do not understand|I am lost|I cannot grasp|it does not make sense|I am confused by|I am struggling with|I cannot get|I do not get|the concept|I keep getting wrong|I cannot follow)\b/i,
      reason: 'Study activity without a named understanding gap is unanchored. What the person does not yet understand is the most actionable gap the map can surface. Busy studying that does not name what is not understood is a partial picture at best.',
    },
    {
      key:    'help_sought',
      name:   'Help or support sought',
      rx:     /\b(I asked|I spoke to|I emailed|I went to|I contacted|I went to office hours|I asked my tutor|I reached out|I sought help|I asked someone|I looked for|I found support)\b/i,
      reason: 'Whether help has been sought when difficulty is present is one of the most significant movements available. Without this described the map cannot assess whether the person is working through difficulty alone or engaging available support.',
    },
    {
      key:    'direction_or_purpose',
      name:   'Direction — why this course and toward what',
      rx:     /\b(I want to|my goal is|this leads to|I am doing this because|the qualification will|what I am working toward|where this takes me|I chose this|I am studying this to|my aim is|the purpose)\b/i,
      reason: 'Direction shapes the significance of current difficulty. A person in a programme aligned with a clear purpose is in a different position from someone uncertain whether this is the right path. Without it described the map cannot read whether persistence is the right response.',
    },
  ],


  // ── Skills ───────────────────────────────────────────────

  skills: [
    {
      key:              'understanding_check',
      name:             'Checking understanding rather than assuming it',
      rx:               /\b(I tested myself|I did practice questions|I explained it back|I checked|I can explain|I know it because|I got it right|I summarised|I made sure I understood|I could answer)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:            'Testing whether material has been understood — through practice questions, self-explanation, or application — rather than assuming familiarity from reading or attendance equals understanding.',
      breaks:           'The feeling of having covered material is mistaken for having understood it. Attendance and reading produce a sense of progress that may not survive the test or assessment.',
    },
    {
      key:              'help_seeking',
      name:             'Seeking help before the gap becomes critical',
      rx:               /\b(I asked|I spoke to|I emailed the tutor|I went to|I raised it|I made an appointment|I reached out|I told my supervisor|I sought help|I got support)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:            'Raising a difficulty with a tutor, teacher, peer, or support service before it compounds into a larger problem or missed deadline.',
      breaks:           'Shame about not understanding, belief that asking is a sign of inadequacy, or discomfort with the teacher relationship causes the difficulty to accumulate unaddressed.',
    },
    {
      key:              'deadline_management',
      name:             'Working backward from deadlines rather than toward them',
      rx:               /\b(I planned|I have a schedule|I worked out|I gave myself|I left time|I planned backwards|I mapped it out|I have been working on since|I broke it into|I have a plan)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:            'Breaking assessment tasks into stages with intermediate targets, leaving time for review, and starting early enough to recover from difficulty.',
      breaks:           'Avoidance of beginning — due to anxiety or competing demands — compresses preparation into the final period, reducing quality and increasing distress.',
    },
    {
      key:              'feedback_application',
      name:             'Reading and applying feedback rather than filing it',
      rx:               /\b(the feedback said|I read the comments|I applied the feedback|I addressed|I changed because|I revised based on|the marker said|I acted on|I improved because|I used the feedback)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'Reading feedback from previous assessments and specifically applying it to subsequent work — closing the loop between performance and improvement.',
      breaks:           'Feedback received but not opened, not read, or read but not applied to subsequent work. The improvement opportunity is not taken.',
    },
  ],


  // ── Contradictions ────────────────────────────────────────

  contradictions: [
    {
      a:    /\b(I have been studying hard|I have put in the hours|I have worked really hard|I have been studying a lot|I have studied every day)\b/i,
      b:    /\b(I do not understand|I am still confused|I cannot get it|I am still stuck|I keep getting it wrong|I am not closer|I cannot follow)\b/i,
      text: 'High effort and persistent lack of understanding both appear. Studying hard and studying effectively are different things. The map reads the understanding, not the hours. This combination is a signal that the study method may need to change rather than the effort level increase.',
    },
    {
      a:    /\b(I am on top of it|I have plenty of time|I have enough time|I am not worried|there is time|I will be fine|I have got it covered|the deadline is not close)\b/i,
      b:    /\b(I have not started|I have not touched|I have not opened|I have not begun|I have done nothing|I have avoided|I keep meaning to|I have not looked at)\b/i,
      text: 'Stated time confidence and absent starting activity both appear. Believing there is enough time and having begun the work are different states. Deadline proximity combined with no start is a convergent risk.',
    },
    {
      a:    /\b(I understand it|I am clear on|I have got it|I know the material|I am confident|I have it|I know this)\b/i,
      b:    /\b(I have not tested|I have not practised|I have not done any questions|I have not tried|I have just read|I have not applied|I have not reviewed)\b/i,
      text: 'Stated understanding and absent verification both appear. Familiarity from reading is not the same as understanding evidenced by practice or application. The map cannot treat stated confidence without testing evidence as confirmed understanding.',
    },
  ],


  // ── Direction Patterns ────────────────────────────────────

  directionPatterns: [
    { rx: /submit|assignment|essay|exam|deadline|coursework|project|hand in/i, label: 'toward assessment submission or preparation' },
    { rx: /understand|learn|grasp|concept|topic|get to grips|study|revision/i,  label: 'toward understanding or learning' },
    { rx: /help|support|tutor|supervisor|office hours|learning support|ask/i,   label: 'toward help or support seeking' },
    { rx: /feedback|result|grade|mark|outcome|review|what was wrong/i,          label: 'toward feedback or result review' },
    { rx: /direction|purpose|goal|career|why|qualification|next step|path/i,    label: 'toward educational direction or purpose' },
    { rx: /attendance|engagement|showing up|staying|continuing|dropout|leave/i, label: 'toward programme engagement or continuation' },
  ],


  // ── Pressure Signals ─────────────────────────────────────

  pressureSignals: [
    { key: 'avoidance_of_starting',  rx: /\b(I have not started|I keep putting off|I cannot begin|I have avoided|I keep meaning to|I cannot face|I have not opened|I have not touched)\b/i,                     label: 'avoidance of starting — deadline risk' },
    { key: 'coverage_not_learning',  rx: /\b(I have read it all|I have covered it|I went through|I have looked at everything|I attended all|I have the notes|I have watched all the|I have been over)\b/i,      label: 'coverage mistaken for understanding' },
    { key: 'help_not_sought',        rx: /\b(I have not asked|I did not ask|I have not told|I have not gone to|I have not emailed|I managed alone|I did not want to ask|I was too embarrassed)\b/i,            label: 'difficulty present but help not sought' },
    { key: 'deadline_convergence',   rx: /\b(everything is due|multiple deadlines|they overlap|I have several|at the same time|all at once|I have too much|too much at once|everything is|all this week)\b/i,  label: 'deadline convergence — overload risk' },
    { key: 'direction_uncertainty',  rx: /\b(I am not sure this is right|I do not know if I want|I am questioning|I might not|I am not sure this course|I am not enjoying|this might not be for me)\b/i,        label: 'direction uncertainty — dropout or disengagement risk' },
    { key: 'confidence_damage',      rx: /\b(I am not clever enough|I do not belong|everyone else gets it|I am behind|I am the worst|I should not be here|I am struggling more than|I am not good enough)\b/i,  label: 'confidence damage — engagement and help-seeking at risk' },
  ],


  // ── Steer block ───────────────────────────────────────────

  steer: {

    'open-gap-discipline': {
      priorityGaps: [
        'course_or_subject',
        'current_assessment',
        'understanding_gap',
        'help_sought',
        'direction_or_purpose',
      ],
      absenceRules: {
        activityIsNotUnderstanding:
          'Study activity — reading, attending, covering material — is not evidence of understanding. The map requires stated understanding or practice evidence to treat the material as learned.',
        coverageIsNotProgress:
          'Having covered material is not the same as having understood it. Cap confidence on learning claims without verification evidence.',
        helpNotSoughtIsSignificant:
          'Named difficulty without any described attempt to seek help is a significant gap. Surface it directly.',
      },
    },

    'confidence-calibration': {
      sectorNote:
        'Education maps frequently contain coverage optimism — the sense that having encountered material equals having learned it. Study hours and attendance are poor proxies for understanding. Without practice, self-testing, or applied evidence, confidence in learning claims should remain partial.',
    },

    'state-change-detection': {
      minimumSeparationDays: 7,
      watchFor: [
        'Understanding descriptions becoming more or less specific over time.',
        'Help-seeking appearing or remaining absent despite named difficulty.',
        'Deadline pressure language increasing without corresponding activity.',
        'Direction confidence shifting — more uncertain or more clear.',
        'Attendance or engagement language reducing.',
        'Feedback application described or absent after results received.',
      ],
    },

    'competing-priorities': {
      costSignals: [
        { key: 'study_vs_work',       rx: /\b(I have to work|my job|shifts clash|I need the income|I cannot afford not to|work gets in the way|I have to prioritise work)\b/i },
        { key: 'study_vs_caring',     rx: /\b(I am caring for|my child|my parent|family comes first|I cannot focus because|I have home responsibilities|I cannot leave)\b/i },
        { key: 'study_vs_wellbeing',  rx: /\b(my mental health|I am not well|I cannot concentrate|it is affecting my health|the course is affecting|I am burning out|I need to stop)\b/i },
      ],
    },

    'movement-non-movement-reading': {
      movementEvidence: [
        'Understanding named — specific topic or concept confirmed understood.',
        'Assessment submitted.',
        'Help sought from tutor or support.',
        'Understanding gap named and addressed.',
        'Study method changed after recognising it was not working.',
        'Feedback read and applied.',
        'Practice or self-testing completed.',
        'Deadline plan created with stages.',
      ],
      defaultStuckRx: /\b(same|no progress|I keep struggling|still confused|still not getting it|nothing has changed|I am still behind|I keep avoiding|I still have not started|I am still stuck|no further)\b/i,
    },

    'load-sensitive-capability': {
      defaultLoadSignals: [
        { key: 'deadline_pressure',  rx: /\b(submission tomorrow|it is due|I am out of time|running out of time|the deadline is|I have left it too late|I have to finish tonight|I cannot fail)\b/i },
        { key: 'confidence_crisis',  rx: /\b(I cannot do this|I am going to fail|I do not belong|I am not smart enough|I should leave|I am not good enough|I should drop out|I am behind everyone)\b/i },
        { key: 'competing_demands',  rx: /\b(I also have|on top of|as well as|at the same time|other pressures|I cannot manage both|everything at once|too much happening)\b/i },
        { key: 'health_impact',      rx: /\b(I am not well|my health|anxiety|depression|exhausted|I cannot concentrate|I cannot focus|I am struggling to|it is affecting me)\b/i },
      ],
    },

    'avoidance-detection': {
      notAvoidance: [
        'Slow progress on material that is genuinely difficult — difficulty is not avoidance.',
        'Not yet having sought help when the difficulty has only just been named — timing matters.',
        'Reading and re-reading material without yet testing — coverage is a legitimate early stage of study, not avoidance of understanding.',
        'Missing a session because of illness, caring responsibility, or a work commitment — competing demands are constraints, not avoidance.',
        'Direction uncertainty — questioning whether the course is right is not the same as avoiding the work.',
        'Not applying feedback from one piece to the next immediately — some gap between feedback and application is normal.',
        'Low output during a high-load period where the competing demand is named and real.',
        'Confidence damage causing reduced help-seeking — shame about asking is a barrier, not avoidance of learning.',
        'Taking time to understand before practising — not every learner moves from reading to testing at the same pace.',
      ],
      avoidanceSignals: [
        'Named deadline with no start and time optimism language — "there is plenty of time" combined with zero activity is the primary avoidance signal in this sector.',
        'Repeated description of study activity without any named understanding — coverage language substituting for learning.',
        'Named difficulty without any move toward help, sustained across multiple entries.',
        'Direction uncertainty used as a reason not to engage with current work — questioning the course while also not doing it.',
      ],
    },

    'meta-reading': {
      sectorNote:
        'Coverage optimism — the belief that encountering material equals learning it — is the primary performance pattern in education material. Descriptions of many hours studying, all material covered, and all sessions attended, combined with absent understanding evidence, is the key signal here. Progress is described through effort, not demonstrated through knowledge.',
      performanceSignals: [
        {
          key: 'effort_as_learning',
          rx:  /\b(I have studied so much|I have put in the hours|I have been working hard|I have done a lot|I have been really trying|I have covered everything|I have gone over it all)\b/i,
        },
      ],
    },

  },

};
