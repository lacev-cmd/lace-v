// ══════════════════════════════════════════════════════════
// SORTER GUIDE — Engineering  v0.1.0
// Steering layer. Self-contained. No engine code here.
// Attach with: SorterSpine.attachGuide(GuideEngineering);
//
// v0.1.0 — initial build.
//   gaps, skills, contradictions, directionPatterns,
//   pressureSignals, steer block.
// ══════════════════════════════════════════════════════════

const GuideEngineering = {

  id:      'guide-engineering',
  version: '0.1.0',
  type:    'sector',
  parent:  null,
  purpose: 'Steer sorter behaviours toward engineering work conditions — problem clarity, technical progress, decision-making under constraint, and the gap between what is understood and what has been verified.',
  sector:  'engineering',

  sectorNotes: {
    distinctivePressures: [
      'Problem that is not yet clearly defined stalling all other progress.',
      'Technical debt or legacy constraints blocking the preferred solution.',
      'Scope change mid-delivery without re-planning.',
      'Deadline pressure causing quality or safety shortcuts.',
      'Knowledge gap — not knowing what is not known.',
      'Dependency on other teams, systems, or suppliers outside direct control.',
      'Communication gap between technical and non-technical stakeholders.',
      'Risk that has been identified but not formally raised.',
    ],
    distinctiveMovement: [
      'Problem defined with enough precision to be solvable.',
      'Root cause identified rather than symptom treated.',
      'Design decision made and documented.',
      'Trade-off named and accepted with reasoning.',
      'Test or verification completed.',
      'Risk formally raised.',
      'Dependency resolved or unblocked.',
      'Scope boundary held or renegotiated.',
      'Technical debt acknowledged and planned for.',
      'Review or sign-off obtained.',
    ],
    distinctiveGaps: [
      'Problem statement not defined — working on symptoms rather than cause.',
      'Success criteria not named — unclear what done looks like.',
      'Key constraint or dependency not described.',
      'Risk identified but not raised or recorded.',
      'Decision made without documented reasoning.',
    ],
    outputAudience:  'Engineer, technical lead, project manager, or engineering support context.',
    outputRegister:  'Precise. Evidence-bound. Trade-off aware. Does not invent solutions or override stated constraints.',
  },


  // ── Gaps ─────────────────────────────────────────────────

  gaps: [
    {
      key:    'problem_definition',
      name:   'Problem definition — what is actually being solved',
      rx:     /\b(the problem is|I am trying to solve|the issue is|what we are dealing with|the fault is|the failure is|root cause|the actual problem|what is broken|what needs to change)\b/i,
      reason: 'Engineering work that proceeds without a clear problem definition treats symptoms and produces solutions that may not address the actual cause. Without it the map cannot assess whether activity is directed.',
    },
    {
      key:    'success_criteria',
      name:   'Success criteria — what done looks like',
      rx:     /\b(done when|success means|the acceptance|what we need to achieve|the requirement is|it needs to|pass when|the target|the spec says|the criteria|we will know it works when)\b/i,
      reason: 'Without stated success criteria the map cannot assess whether progress is moving toward completion or circling. Undefined done is a consistent cause of extended delivery.',
    },
    {
      key:    'key_constraint',
      name:   'Key constraint or dependency',
      rx:     /\b(the constraint is|I am blocked by|waiting on|depends on|the limitation|we cannot because|the restriction|I need access to|the dependency|blocked until|I am waiting for)\b/i,
      reason: 'Constraints and dependencies shape what is achievable and at what pace. Without them named the map cannot assess whether the work is free to move or held by an external factor.',
    },
    {
      key:    'risk_identification',
      name:   'Risk identified and raised',
      rx:     /\b(the risk is|I raised|I flagged|I documented|the concern is|this could fail|I am worried about|potential failure|I have noted|the risk has been|I reported)\b/i,
      reason: 'Identified risks that are not raised or documented remain invisible to decision-makers. Without knowing whether risk has been surfaced the map cannot assess whether the situation is governed.',
    },
    {
      key:    'decision_with_reasoning',
      name:   'Decision made with documented reasoning',
      rx:     /\b(I decided|the decision was|we chose|the approach is|I selected|the reasoning was|because of|I went with|the trade-off|I documented|the rationale|the justification)\b/i,
      reason: 'Decisions without documented reasoning are fragile under review, handover, or failure investigation. Without reasoning the map cannot assess whether the choice was deliberate or default.',
    },
  ],


  // ── Skills ───────────────────────────────────────────────

  skills: [
    {
      key:              'problem_separation',
      name:             'Separating problem from solution',
      rx:               /\b(the problem is not|first I need to understand|before I solve|the actual issue|what is causing|I need to define|the root cause|I am separating|the symptom versus|what it is doing versus why)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:            'Holding problem definition distinct from solution design — not jumping to the fix before the cause is clear.',
      breaks:           'Time pressure or solution familiarity causes the diagnosis to be skipped and a preferred approach to be applied before the problem is understood.',
    },
    {
      key:              'constraint_naming',
      name:             'Naming constraints explicitly rather than working around them silently',
      rx:               /\b(I cannot because|the constraint is|I am blocked by|this is limited by|I need to flag|this depends on|I need to note|the restriction is|I raised the constraint)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:            'Naming what is blocking or limiting progress — technical, resource, or dependency constraints — rather than absorbing them silently and producing reduced output.',
      breaks:           'Pressure to appear unblocked or reluctance to escalate causes constraints to be worked around rather than named, leaving them invisible to the people who could resolve them.',
    },
    {
      key:              'trade_off_articulation',
      name:             'Articulating the trade-off when making a technical decision',
      rx:               /\b(the trade-off is|option A versus|I chose this because|the downside is|this gives us|the alternative would|I considered|the cost of this approach|compared to|I accepted the trade)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'Naming what is being gained and what is being given up when a technical choice is made — making the reasoning explicit and auditable.',
      breaks:           'Pressure to deliver causes decisions to be made implicitly without naming what was traded off, leaving future reviewers or inheritors without the reasoning.',
    },
    {
      key:              'scope_discipline',
      name:             'Holding or explicitly renegotiating scope',
      rx:               /\b(that is out of scope|I am holding scope|I raised the scope change|I am not adding|I flagged the change|the scope has changed|I need to renegotiate|I pushed back on|I defined the boundary)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:            'Naming scope additions when they appear — either declining them with reasoning or explicitly raising them as a change requiring re-planning.',
      breaks:           'Desire to be helpful, or pressure to absorb changes without escalating, causes scope to expand silently. The work becomes larger than the plan supports.',
    },
    {
      key:              'verification_discipline',
      name:             'Verifying rather than assuming',
      rx:               /\b(I tested|I checked|I verified|I confirmed|I measured|I ran|I reviewed|I reproduced|the test shows|I validated|I proved|I observed)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:            'Verifying that a system does what is claimed — through test, measurement, or review — rather than assuming it based on design or prior success.',
      breaks:           'Time pressure or prior success with similar work causes assumed behaviour to stand in for verified behaviour. The assumption is the gap.',
    },
  ],


  // ── Contradictions ────────────────────────────────────────

  contradictions: [
    {
      a:    /\b(the problem is solved|it is working|the fix works|I have resolved|the issue is closed|I fixed it|the solution is in|it is done)\b/i,
      b:    /\b(I have not tested|I assumed|I think it works|it should work|I believe|I have not verified|I need to check|I have not confirmed|it seemed to work)\b/i,
      text: 'A claim that the problem is solved and an absence of verification both appear. Believed to be working and verified as working are different states. The map cannot treat assumed resolution as confirmed resolution.',
    },
    {
      a:    /\b(on track|going well|no issues|progressing|making progress|we are ahead|all good|no blockers|no problems)\b/i,
      b:    /\b(I have not|I am blocked|I am waiting|I cannot|the dependency|I need to|I have not heard|no response|I am still|it has not)\b/i,
      text: 'A stated positive progress assessment and described blockers or waiting states both appear. Named blockers and unmet dependencies are the more reliable read of actual progress.',
    },
    {
      a:    /\b(low risk|manageable risk|acceptable risk|the risk is small|I do not think it will|it is unlikely|we should be fine|the probability is low)\b/i,
      b:    /\b(I have not assessed|I have not checked|I do not know|it has not been tested|unknown impact|I have not modelled|I have not verified|we have not reviewed)\b/i,
      text: 'A stated low or acceptable risk and an absence of assessment both appear. Risk assessed as low and risk not assessed are different things. The map cannot read unassessed risk as confirmed low risk.',
    },
    {
      a:    /\b(this is the same as|we have done this before|standard approach|we always do it this way|same as last time|previous project used|well-established|routine)\b/i,
      b:    /\b(different constraint|new system|changed requirement|new environment|different scale|upgraded|legacy system|new dependency|changed scope|different team)\b/i,
      text: 'Confidence based on prior experience and a changed context that may not carry that experience both appear. Prior success does not transfer automatically when constraints, environment, or scope have changed.',
    },
  ],


  // ── Direction Patterns ────────────────────────────────────

  directionPatterns: [
    { rx: /define|understand|diagnose|root cause|reproduce|investigate/i, label: 'toward problem definition or diagnosis' },
    { rx: /design|approach|architecture|plan|decide|option|choose/i,      label: 'toward design or technical decision' },
    { rx: /implement|build|write|code|configure|assemble|integrate/i,     label: 'toward implementation' },
    { rx: /test|verify|validate|check|measure|confirm|review|inspect/i,   label: 'toward verification or testing' },
    { rx: /release|deploy|ship|handover|close|sign-off|complete/i,        label: 'toward delivery or handover' },
    { rx: /risk|flag|escalate|raise|block|dependency|constraint/i,        label: 'toward risk identification or escalation' },
  ],


  // ── Pressure Signals ─────────────────────────────────────

  pressureSignals: [
    { key: 'assumed_resolution',   rx: /\b(it should work|I think it works|it seemed to|I believe it is|I assumed|it looks like|should be fine|I expect it|probably working|it appears)\b/i,             label: 'assumed resolution — verification may be absent' },
    { key: 'scope_expansion',      rx: /\b(they also want|I also added|while I was at it|I also|we added|new requirement|they changed|scope changed|they added|it is now also|extra)\b/i,                label: 'scope expansion without re-planning' },
    { key: 'silent_constraint',    rx: /\b(I worked around|I found a way|I managed to despite|I handled it|I got past it|without telling|I did not flag|I did not raise|I absorbed)\b/i,                label: 'constraint absorbed silently — not named or escalated' },
    { key: 'deadline_pressure',    rx: /\b(we have to ship|deadline is|we are running out|we cannot wait|we have to go|no time to|we need to push|cut the corner|do it later|ship now fix later)\b/i,  label: 'deadline pressure — quality or safety shortcut risk' },
    { key: 'undefined_done',       rx: /\b(when it seems ready|when it feels done|when it looks right|I will know|we will see|play it by ear|when the team agrees|loosely)\b/i,                         label: 'undefined success criteria — scope and completion unclear' },
    { key: 'risk_not_raised',      rx: /\b(I noticed but|I am aware but|I have not raised|I did not flag|I know but|I have not told|I kept it to myself|I thought it would|I hoped it would)\b/i,    label: 'identified risk not raised or documented' },
  ],


  // ── Steer block ───────────────────────────────────────────

  steer: {

    'open-gap-discipline': {
      priorityGaps: [
        'problem_definition',
        'success_criteria',
        'key_constraint',
        'risk_identification',
        'decision_with_reasoning',
      ],
      absenceRules: {
        noAssumedResolution:
          'Do not treat described activity as verified outcome. Name the gap between what was done and what was tested.',
        noRiskByOmission:
          'If risk is named in the material but not raised, the map must surface this explicitly.',
        constraintsFirst:
          'Named blockers or dependencies take priority in the read. Progress claims must be held against them.',
      },
    },

    'confidence-calibration': {
      sectorNote:
        'Engineering maps frequently contain optimistic progress descriptions that front-run verification. Stated resolution without verification evidence should cap confidence at partial. Named blockers, dependencies, or untested assumptions must be reflected in the read.',
    },

    'state-change-detection': {
      minimumSeparationDays: 7,
      watchFor: [
        'Problem definition sharpening or remaining vague over time.',
        'Same blocker or dependency named across multiple entries without resolution.',
        'Scope expanding without re-planning entries.',
        'Testing or verification evidence appearing or absent.',
        'Risk language appearing without corresponding raise or documentation.',
        'Deadline references increasing in frequency or urgency.',
      ],
    },

    'competing-priorities': {
      costSignals: [
        { key: 'quality_vs_speed',    rx: /\b(we have to ship|no time to test|deadline means|we will fix later|good enough for now|technical debt now|I know it is not right but)\b/i },
        { key: 'scope_vs_timeline',   rx: /\b(they want more but|scope change means|new requirement but|I cannot do both|the deadline does not move|I have to choose between)\b/i },
        { key: 'escalation_vs_image', rx: /\b(I do not want to flag|it looks bad to raise|I should be able to handle|I do not want to escalate|they will think|if I raise it)\b/i },
      ],
    },

    'movement-non-movement-reading': {
      movementEvidence: [
        'Problem defined with sufficient precision.',
        'Root cause identified.',
        'Design decision made and documented.',
        'Constraint or dependency named and escalated.',
        'Test or verification completed.',
        'Risk raised formally.',
        'Scope held or renegotiated with reasoning.',
        'Handover or sign-off obtained.',
      ],
      defaultStuckRx: /\b(same issue|no progress|still blocked|still waiting|no change|I am still on|nothing has moved|I have not managed|the same problem|still undefined|still not resolved)\b/i,
    },

    'load-sensitive-capability': {
      defaultLoadSignals: [
        { key: 'deadline_pressure',   rx: /\b(must ship|deadline is tomorrow|running out of time|we have to go|no more time|the release is today|we cannot slip)\b/i },
        { key: 'scope_pressure',      rx: /\b(they added more|more requirements|scope expanded|new asks|they want it all|the list grew|additional requirements)\b/i },
        { key: 'dependency_block',    rx: /\b(I am blocked|waiting on|cannot proceed|need access|the API is not|the system is not|waiting for the team|waiting for approval)\b/i },
        { key: 'knowledge_gap',       rx: /\b(I do not know how|unfamiliar with|outside my area|I have not done|I need to learn|I am not sure how|new technology|I am not the expert)\b/i },
      ],
    },

    'meta-reading': {
      sectorNote:
        'Progress optimism is a significant performance pattern in engineering material. Status reports and personal entries frequently describe work as more complete or less risky than it is. Absence of verification evidence, unnamed constraints, and unraised risks are the primary signals.',
      performanceSignals: [
        {
          key: 'progress_optimism',
          rx:  /\b(going well|on track|all good|no blockers|making progress|no issues|progressing nicely|we are ahead|looking good|no problems)\b/i,
        },
      ],
    },

  },

};
