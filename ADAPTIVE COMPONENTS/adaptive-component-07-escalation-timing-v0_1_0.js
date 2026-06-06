// ══════════════════════════════════════════════════════════
// ADAPTIVE COMPONENT — 07  Escalation Timing  v0.1.0
// Upper-layer response module. Self-contained config.
// No engine code here. No domain assumptions.
//
// Tags: workflow, case-system, project, agent
//
// Acts on mapped state. Does not read material directly.
// Does not replace behaviours or guides.
//
// Purpose: determine when a mapped state warrants escalation
// to a higher level of attention, resource, or authority.
// Escalation is triggered by pattern — not by a single event.
// And only when the block is real, not when it is avoidable.
// ══════════════════════════════════════════════════════════

const AdaptiveComponentEscalationTiming = {

  id:      'escalation-timing',
  name:    'Escalation Timing',
  version: '0.1.0',
  tags:    ['workflow', 'case-system', 'project', 'agent'],

  purpose:
    'Determine when a mapped state warrants escalation. Escalation is triggered by persistent pattern, genuine external block, or compounding load — not by a single event or stated urgency.',

  coreRule:
    'Escalate on pattern, not noise. A single difficult moment does not warrant escalation. A persistent block that the entity cannot clear, combined with load that is degrading capability, and a gap that is not closing — that warrants escalation.',


  // ── Escalation State ──────────────────────────────────────

  escalationState: {
    level:     0,      // 0 = no escalation. 1 = flag. 2 = prompt. 3 = escalate.
    triggered: false,
    reason:    null,
    blockedBy: null,   // What is blocking resolution.
  },


  // ── Escalation Conditions ─────────────────────────────────

  escalationConditions: {
    persistentBlock:
      'An external constraint has been present across multiple independent periods and is not resolving through available channels.',
    capabilityDegradation:
      'Load-sensitive capability has dropped and is not recovering. The entity cannot maintain function under current conditions.',
    gapNotClosing:
      'A priority gap has remained open across multiple periods despite being flagged.',
    compoundingLoad:
      'Multiple load signals are present simultaneously and are not being addressed.',
    avoidanceOfEscalation:
      'The entity is describing the block but not engaging with available escalation channels. This may itself warrant a prompt.',
  },


  // ── Escalation Levels ─────────────────────────────────────

  escalationLevels: [
    { level: 0, key: 'none',     desc: 'No escalation required. Monitor.' },
    { level: 1, key: 'flag',     desc: 'Pattern worth noting. No action required yet.' },
    { level: 2, key: 'prompt',   desc: 'Prompt the entity or worker to engage with the block.' },
    { level: 3, key: 'escalate', desc: 'Refer to higher authority, resource, or intervention.' },
  ],


  // ── Escalation Rules ──────────────────────────────────────

  escalationRules: {
    avoidanceMustBeRuledOut:
      'Before escalating, check External Constraint Reading (Behaviour 15). If the block is avoidance rather than external constraint, the response is a prompt — not an escalation.',
    changeable:
      'If the constraint is changeable by the entity\'s action, escalation is premature. The response is a next useful move first.',
    fixed:
      'If the constraint is fixed and outside the entity\'s control, escalation is appropriate.',
    timeThreshold:
      'A block that has persisted beyond the deployment-defined threshold without movement triggers escalation review.',
    humanReview:
      'Escalation level 3 should route to human review — not automated action. The system prompts, it does not act.',
  },


  // ── Behaviour Inputs ──────────────────────────────────────

  behaviourInputs: [
    'external-constraint-reading',
    'load-sensitive-capability',
    'open-gap-discipline',
    'avoidance-detection',
    'next-useful-move',
    'connections-across-time',
  ],


  // ── What This Enables ─────────────────────────────────────

  enables: [
    'Case management system that escalates when a client is genuinely blocked.',
    'Project tool that flags when a thread has been stuck beyond threshold.',
    'Agent that knows when to route to a human rather than continue autonomously.',
    'Support system that distinguishes avoidance from genuine constraint before prompting.',
  ],


  // ── Boundary ──────────────────────────────────────────────

  boundary:
    'Escalation timing is a prompt system — not an automated action system. Level 3 escalation routes to human review. The component never acts directly on a person\'s case. Escalation based on avoidance detection must be handled carefully — it is a prompt to engage, not a judgement.',


  // ── Test Cases ────────────────────────────────────────────

  testCases: [
    {
      id:       'ET-01',
      input:    'External block present for three periods. Entity cannot resolve through available channels.',
      expected: 'Escalation level 3. Route to human review.',
    },
    {
      id:       'ET-02',
      input:    'Block described but entity has not engaged available channel.',
      expected: 'Escalation level 2. Prompt entity to engage channel before escalating.',
    },
    {
      id:       'ET-03',
      input:    'Priority gap open. Entity is moving on other fronts.',
      expected: 'Escalation level 1. Flag for review. Not yet a prompt.',
    },
    {
      id:       'ET-04',
      input:    'Load high but single period only.',
      expected: 'No escalation. Monitor. Single period does not trigger.',
    },
  ],

};
