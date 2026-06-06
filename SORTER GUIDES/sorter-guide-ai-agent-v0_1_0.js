// ══════════════════════════════════════════════════════════
// SORTER GUIDE — AI Agent  v0.1.0
// Steering layer. Self-contained. No engine code here.
// Attach with: SorterSpine.attachGuide(GuideAIAgent);
//
// Domain: AI agent capability profiling, constraint
// awareness, escalation, handover, and confidence-gated
// operation.
//
// The adaptive components (confidence-gated-output,
// tool-routing, escalation-timing, handover-trigger,
// constraint-aware-hinting, gap-closure-prompt) provide
// the mechanics.
// This guide steers the sorter behaviours toward reading
// the state of an agent — what it can do, what it cannot,
// where it is operating near its limits, and when to stop.
//
// Movement here is not task completion alone.
// It is: task completed within stated capability bounds,
// with appropriate confidence, and with correct handover
// when those bounds are reached.
//
// An agent that stops and hands off correctly is moving.
// An agent that proceeds beyond its capability boundary
// is stuck — even if it appears to be producing output.
//
// Overclaiming is the primary failure mode.
// This guide steers against it at every layer.
// ══════════════════════════════════════════════════════════

const GuideAIAgent = {

  id:      'guide-ai-agent',
  version: '0.1.0',
  type:    'sector',
  parent:  null,
  purpose: 'Steer sorter behaviours toward agent capability reading — what the agent can do, where its limits are, whether confidence is calibrated correctly, and whether handover is triggered at the right moment.',
  sector:  'ai-agent',

  sectorNotes: {
    distinctivePressures: [
      'Capability boundary not defined — agent operating without stated limits.',
      'Confidence miscalibration — output presented with more certainty than the evidence supports.',
      'Escalation path absent — no route to human or higher capability when needed.',
      'Tool routing incorrect — wrong tool selected for the task.',
      'Handover trigger missed — agent continued past the point it should have stopped.',
      'Gap closure attempted without sufficient basis — invented rather than surfaced.',
      'Task scope creep — agent extending beyond the original instruction without flagging.',
      'Memory gap — agent operating on stale state without acknowledging it.',
    ],
    distinctiveMovement: [
      'Task completed within stated capability bounds.',
      'Confidence correctly labelled on output.',
      'Escalation triggered at appropriate threshold.',
      'Handover executed cleanly — state passed to human or next system.',
      'Tool selected correctly for the task type.',
      'Gap surfaced rather than invented around.',
      'Capability boundary named before reaching it.',
      'Uncertainty acknowledged before acting.',
      'Scope clarified before proceeding.',
      'Prior state correctly recalled and applied.',
    ],
    distinctiveGaps: [
      'Capability profile not defined — what the agent can and cannot do.',
      'Escalation path not named — who or what receives the handover.',
      'Confidence threshold not set — at what point the agent stops and flags.',
      'Tool inventory not described — what tools are available and when each applies.',
      'Task scope not bounded — what is in and out of the current instruction.',
      'State freshness not established — how current the agent\'s information is.',
    ],
    outputAudience:  'Agent developer, system designer, AI safety reviewer, or deployment architect.',
    outputRegister:  'Precise. Evidence-bound. Conservative on claims. Escalation-aware. No flattery toward the agent — reads capability honestly including failures.',
  },


  // ── Gaps ─────────────────────────────────────────────────

  gaps: [
    {
      key:    'capability_profile',
      name:   'Capability profile',
      rx:     /\b(can do|cannot do|capable of|not capable|within scope|out of scope|my limits|the boundary|capability|what I can|what I cannot|I am able|I am not able|within my|outside my)\b/i,
      reason: 'Without a stated capability profile the map cannot read whether the agent is operating within bounds or beyond them. Every other read is provisional without this.',
    },
    {
      key:    'escalation_path',
      name:   'Escalation path',
      rx:     /\b(escalate|hand off|hand over|pass to|route to|escalation path|when to stop|human in the loop|human review|flag for|supervisor|the next step when|if I cannot)\b/i,
      reason: 'An agent without a defined escalation path has no correct failure mode. When it reaches its limit it either stops silently or overclaims. The escalation path is what makes the boundary real.',
    },
    {
      key:    'confidence_threshold',
      name:   'Confidence threshold',
      rx:     /\b(confidence threshold|confidence level|how certain|certainty required|minimum confidence|when to flag|when to stop|confidence gate|confidence required|uncertainty threshold)\b/i,
      reason: 'Without a confidence threshold the agent cannot calibrate when to act and when to pause. Miscalibrated confidence is the most common and consequential failure mode.',
    },
    {
      key:    'tool_inventory',
      name:   'Tool inventory',
      rx:     /\b(tools available|I can use|tool selection|the right tool|which tool|tool inventory|available tools|routing to|tool for this|use the|call the|invoke)\b/i,
      reason: 'Without tool inventory described the map cannot read whether routing decisions are correct or whether the agent is attempting tasks with the wrong instrument.',
    },
    {
      key:    'task_scope',
      name:   'Task scope',
      rx:     /\b(the task is|in scope|out of scope|the instruction|what I was asked|the original request|scope of this|within this task|the boundary of|what I am doing|what I am not doing)\b/i,
      reason: 'Scope creep is invisible without a stated scope. The map cannot read whether the agent is on task or has extended beyond it.',
    },
    {
      key:    'state_freshness',
      name:   'State freshness',
      rx:     /\b(last updated|current as of|stale|fresh|I last checked|the information is|as of|my knowledge|I am working from|the state is|current state|this may have changed)\b/i,
      reason: 'An agent operating on stale state without acknowledging it will produce confident output from wrong premises. State freshness must be visible.',
    },
  ],


  // ── Skills ───────────────────────────────────────────────

  skills: [
    {
      key:              'confidence_calibration',
      name:             'Calibrating confidence correctly',
      rx:               /\b(I am confident|I am not certain|this is uncertain|I believe|I think|likely|probably|possibly|I cannot confirm|with high confidence|with low confidence|I estimate|I am not sure|this is a guess|I would need to verify)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:            'Output is labelled with its actual confidence level — strong claims carry strong evidence, uncertain claims are flagged as uncertain.',
      breaks:           'Under task pressure or ambiguous instruction the agent produces confident-sounding output from thin or inferred basis. Overclaiming is the primary failure mode.',
    },
    {
      key:              'boundary_recognition',
      name:             'Recognising capability boundaries',
      rx:               /\b(outside my capability|I cannot do this|this is beyond|I do not have access|I am not able to|this requires|I would need|I cannot verify|out of scope|I should not|I am not the right)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:            'Agent names its boundary before reaching it — flags the limit, states what it can do up to that point, and routes correctly.',
      breaks:           'Task complexity, ambiguous scope, or pressure to produce output causes the agent to continue past its boundary without flagging, producing output that appears valid but is not.',
    },
    {
      key:              'tool_routing',
      name:             'Selecting the correct tool',
      rx:               /\b(using the|I will call|routing to|the right tool for|I selected|I am using|tool selection|invoking|I need to use|the appropriate tool|this calls for)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'Tool selection is matched to task type — the agent routes to the tool with the right capability for what is needed.',
      breaks:           'Ambiguous task type, missing tool, or tool inventory not fully described causes the agent to use the closest available tool regardless of fit, producing approximate or incorrect output.',
    },
    {
      key:              'handover_execution',
      name:             'Executing handover cleanly',
      rx:               /\b(handing over|passing to|escalating to|flagging for|I am stopping|I cannot continue|routing to human|human review needed|I have reached|this needs|I am flagging|beyond my scope|I recommend|needs expert)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'When the agent reaches its limit it stops cleanly — states what it has done, what it cannot do, and what the handover receiver needs to know.',
      breaks:           'No escalation path defined, pressure to complete the task, or ambiguous limit causes the agent to either stop silently (no handover information) or continue inappropriately.',
    },
    {
      key:              'gap_surfacing',
      name:             'Surfacing gaps rather than inventing around them',
      rx:               /\b(I do not have|missing information|I cannot find|gap in|I was not given|I do not know|information not available|I would need|this is not in|I cannot confirm|no data on|I lack)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'When information is missing the agent names the gap explicitly rather than filling it with inference or invention.',
      breaks:           'Instruction implies a complete answer is expected, causing the agent to produce plausible-sounding output from gaps rather than naming what is absent.',
    },
    {
      key:              'scope_discipline',
      name:             'Holding task scope',
      rx:               /\b(within scope|as instructed|the original task|staying on|I was asked to|the task is|I am not extending|I will not|out of scope|beyond the instruction|the boundary of this task)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:            'Agent completes the stated task and stops — does not extend scope, does not add adjacent tasks, does not anticipate follow-on actions without instruction.',
      breaks:           'Ambiguous instruction or desire to be helpful causes the agent to extend beyond the task boundary, producing unrequested output or taking unrequested actions.',
    },
  ],


  // ── Contradictions ────────────────────────────────────────

  contradictions: [
    {
      a:    /\b(I am confident|with high confidence|I am certain|this is correct|I can confirm|the answer is|I know that)\b/i,
      b:    /\b(I do not have access|stale|I cannot verify|this may have changed|I am not certain|I estimate|I believe|possibly|I think|unconfirmed)\b/i,
      text: 'A confident-sounding claim and a basis that does not support that confidence both appear. This is the primary failure pattern — output presented with more certainty than the evidence warrants. The confident phrasing should be downgraded to match the actual basis.',
    },
    {
      a:    /\b(within my capability|I can do this|this is in scope|I am able to|I can handle|this is straightforward)\b/i,
      b:    /\b(I do not have|I cannot access|missing|I would need|I lack|not available|out of reach|I cannot verify|I do not know)\b/i,
      text: 'Stated capability and a missing prerequisite for that capability both appear. The agent may be claiming a capability it cannot currently exercise. The gap between what is claimed and what is available is where the failure will occur.',
    },
    {
      a:    /\b(task complete|done|finished|I have completed|the task is done|output delivered|result provided)\b/i,
      b:    /\b(I could not|I was not able|this part is missing|gap remains|I did not have|incomplete|partial|I approximated|I estimated|I assumed)\b/i,
      text: 'Task completion stated and incompleteness signals both appear. A task is not complete if key components were approximated, gaps were not named, or assumptions were not surfaced. The completion claim needs to be qualified.',
    },
    {
      a:    /\b(the escalation path|I will escalate|I know when to stop|I will flag|I will hand over|I will route to)\b/i,
      b:    /\b(no escalation path|escalation not defined|I do not know who|unclear where|no human in the loop|I cannot reach|there is no one to|I have no way to flag)\b/i,
      text: 'A stated escalation intention and the absence of a defined escalation path both appear. Intending to escalate and having somewhere to escalate to are different things. Without the path defined the escalation intention is not actionable.',
    },
  ],


  // ── Direction Patterns ────────────────────────────────────

  directionPatterns: [
    { rx: /task complete|output delivered|within bounds|confidence labelled|clean handover/i,   label: 'toward reliable bounded operation' },
    { rx: /escalation|flagging|stopping|handing over|routing to human/i,                        label: 'toward correct escalation' },
    { rx: /capability profile|defining limits|scoping|setting the boundary|what I can and cannot/i, label: 'toward capability definition' },
    { rx: /overclaiming|beyond my|outside my|I should not have|I went too far|I extended/i,    label: 'toward boundary failure recognition' },
    { rx: /refining|improving|learning from|adjusting|recalibrating|updating my/i,             label: 'toward capability improvement' },
  ],


  // ── Pressure Signals ─────────────────────────────────────

  pressureSignals: [
    { key: 'overclaim_risk',      rx: /\b(I am certain|definitely|without doubt|I know|the answer is definitely|this is correct|I can confirm|guaranteed)\b/i,                                                   label: 'overclaim risk — confidence language exceeds basis' },
    { key: 'boundary_approach',   rx: /\b(approaching the limit|near the edge of|at the boundary|reaching my|getting close to|almost beyond|at the edge of my capability)\b/i,                                  label: 'approaching capability boundary' },
    { key: 'scope_creep',         rx: /\b(also|additionally|I also|and I|while I am at it|I noticed|I went ahead|I also completed|beyond the original|I extended|I added)\b/i,                                  label: 'scope creep signal' },
    { key: 'stale_state',         rx: /\b(last time I checked|as of my last|I believe this is still|this may have changed|I am not sure if this is current|my last update|this was true when)\b/i,               label: 'stale state operating risk' },
    { key: 'invention_risk',      rx: /\b(I assume|I expect|probably|it is likely that|I would guess|I think it is|based on my general|I imagine|typically|usually in these cases)\b/i,                          label: 'gap invention risk — inference presented as fact' },
    { key: 'handover_missed',     rx: /\b(I continued|I proceeded|I kept going|I went ahead anyway|despite not|even though I|I completed it even|I finished it but|I was not sure but)\b/i,                       label: 'handover trigger missed — continued past boundary' },
  ],


  steer: {

    'avoidance-detection': {
      notAvoidance: [
        'Stopping at a capability boundary.',
        'Refusing to complete a task without sufficient information.',
        'Declining to act without a defined escalation path.',
        'Pausing to confirm scope before proceeding.',
        'Not routing to a tool that is unavailable.',
        'Waiting for human confirmation on a high-stakes decision.',
      ],
    },

    'movement-non-movement-reading': {
      movementEvidence: [
        'Task completed within stated capability bounds.',
        'Confidence correctly labelled on all substantive claims.',
        'Gap named rather than invented around.',
        'Correct tool selected and used.',
        'Handover executed with complete state transfer.',
        'Escalation triggered at appropriate threshold.',
        'Scope held — no extension beyond instruction.',
        'Stale state acknowledged before acting.',
      ],
      stuckEvidence: [
        'Capability boundary not defined after multiple interactions.',
        'Confidence labels absent or mismatched to basis.',
        'Same gap appearing repeatedly without being surfaced.',
        'Escalation path still undefined.',
        'Scope creep appearing across multiple tasks.',
        'Handover trigger consistently missed.',
      ],
    },

    'confidence-calibration': {
      sectorNote: 'This is the most consequential behaviour in this sector. An agent that miscalibrates confidence — in either direction — is unreliable. Overclaiming is the primary failure. Underclaiming prevents useful operation. The correct calibration is: state exactly what the evidence supports, no more, no less. Every substantive output requires a confidence label.',
      requiredLabels: {
        strong:       'Verified, current, from a reliable source.',
        supported:    'Consistent across multiple signals but not verified.',
        partial:      'Some basis present but gaps remain.',
        inferred:     'Derived from pattern rather than direct evidence.',
        thin:         'One signal only — treat as provisional.',
        not_readable: 'Insufficient basis to produce a reliable output.',
      },
    },

    'open-gap-discipline': {
      sectorNote: 'Gaps must be surfaced, not invented around. In agent contexts, the pressure to produce complete output is high — but a gap filled with inference is worse than a gap named, because it produces false confidence in the output.',
      absenceRules: {
        noInvention:          'A missing piece of information must be named as missing, not filled with a plausible estimate.',
        noNegativeJudgement:  'A gap is a state, not a failure. Name it neutrally.',
        negationCheck:        'Absence of a signal is not the same as the signal being absent. Do not read silence as confirmation.',
        thinMention:          'One inference is not a basis for a confident claim.',
      },
    },

    'next-useful-move': {
      sectorNote: 'In agent contexts, the next useful move is almost always one of: define the missing capability boundary, set the confidence threshold, name the escalation path, or surface the gap that is blocking correct operation. It is not to produce more output — it is to fix the conditions under which output is produced.',
      priorityOrder: [
        { rank: 1, condition: 'Capability profile undefined.',    move: 'Define what the agent can and cannot do before proceeding.' },
        { rank: 2, condition: 'Escalation path undefined.',       move: 'Name who or what receives the handover when the agent reaches its limit.' },
        { rank: 3, condition: 'Confidence threshold not set.',    move: 'Set the minimum confidence required before the agent acts on an inference.' },
        { rank: 4, condition: 'Overclaim detected.',              move: 'Downgrade the confidence label to match the actual basis.' },
        { rank: 5, condition: 'Handover trigger missed.',         move: 'Identify where the boundary was crossed and what the correct stopping point was.' },
        { rank: 6, condition: 'Gap invented rather than surfaced.', move: 'Replace the invented content with an explicit gap statement.' },
        { rank: 7, condition: 'Scope creep detected.',            move: 'Name what was added beyond instruction and whether it should be retained.' },
      ],
    },

    'external-constraint-reading': {
      defaultConstraintRx: /\b(I do not have access|not available to me|I cannot reach|outside my permissions|I am not authorised|access denied|I was not given|the tool is not available|I cannot call|rate limited|the API|I do not have the key|not in my context)\b/i,
      notAvoidance: [
        'Tool unavailable — routing constraint, not agent failure.',
        'Access not granted — permission boundary.',
        'Rate limit reached — infrastructure constraint.',
        'Information not in context — not a knowledge failure.',
        'Human confirmation required — correct escalation.',
      ],
    },

    'meta-reading': {
      sectorNote: 'Agent outputs about their own capability are the least reliable signals in this domain. An agent that says it can do something is not evidence that it can. Observed behaviour across multiple tasks is more reliable than stated capability. Watch for the gap between what is claimed and what is demonstrated.',
      performanceSignals: [
        {
          key: 'capability_performance',
          rx:  /\b(I can handle anything|I am able to|I have no limitations|I can do this|within my capabilities|I am fully capable|this is well within|I am designed to|I am trained to)\b/i,
        },
      ],
    },

  },

};
