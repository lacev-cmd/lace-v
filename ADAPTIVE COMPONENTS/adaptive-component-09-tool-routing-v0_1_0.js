// ══════════════════════════════════════════════════════════
// ADAPTIVE COMPONENT — 09  Tool Routing  v0.1.0
// Upper-layer response module. Self-contained config.
// No engine code here. No domain assumptions.
//
// Tags: agent
//
// Acts on mapped state. Does not read material directly.
// Does not replace behaviours or guides.
//
// Purpose: route an agent to the correct next action —
// search, clarify, refuse, output, or escalate to human —
// based on the mapped state of the request and the agent's
// current confidence and gap picture.
// ══════════════════════════════════════════════════════════

const AdaptiveComponentToolRouting = {

  id:      'tool-routing',
  name:    'Tool Routing',
  version: '0.1.0',
  tags:    ['agent'],

  purpose:
    'Route an agent to the correct action based on mapped state. An agent that knows what it does not know routes better than one that guesses. Confidence calibration and open gap discipline feed this component.',

  coreRule:
    'Route on mapped state — not on the surface form of the request. A confidently phrased request with thin underlying material routes to clarification. A routine-looking request with a confirmed external constraint routes to constraint acknowledgement before action.',


  // ── Routing Decision ──────────────────────────────────────

  routingDecision: {
    route:    null,   // The selected route.
    reason:   null,   // Why this route was selected.
    fallback: null,   // What to do if the primary route fails.
  },


  // ── Routes ────────────────────────────────────────────────

  routes: [
    {
      key:   'output',
      desc:  'Sufficient material and confidence. Produce the output.',
      conditions: ['confidence supported or strong', 'no open priority gaps', 'no active external block'],
    },
    {
      key:   'search',
      desc:  'Material present but requires current or external information to complete.',
      conditions: ['confidence partial', 'gap is information gap', 'search would close the gap'],
    },
    {
      key:   'clarify',
      desc:  'Material thin or ambiguous. Clarification would meaningfully improve the output.',
      conditions: ['confidence thin or inferred', 'priority gap is intent or scope', 'clarification is available from the requester'],
    },
    {
      key:   'refuse',
      desc:  'Request falls outside safe or permitted scope. Boundary applies.',
      conditions: ['refusal boundary active', 'request matches refused pattern'],
    },
    {
      key:   'acknowledge_constraint',
      desc:  'External constraint is blocking completion. Acknowledge what is blocked and surface what is still possible.',
      conditions: ['external constraint confirmed', 'block is not resolvable by agent'],
    },
    {
      key:   'human_escalation',
      desc:  'Beyond agent competence, authority, or safe action scope. Route to human.',
      conditions: ['confidence not readable', 'escalation timing triggered', 'competing priorities unresolvable by agent'],
    },
    {
      key:   'confidence_gated_output',
      desc:  'Output is possible but must be labelled with its confidence level. Thin or inferred reads surface with appropriate labels.',
      conditions: ['confidence thin or partial', 'output still useful despite uncertainty', 'inference label applied'],
    },
  ],


  // ── Routing Rules ─────────────────────────────────────────

  routingRules: {
    confidenceFirst:
      'Check confidence calibration before routing to output. A not-readable state routes to clarify or human escalation — not to a guessed output.',
    gapCheck:
      'Check open gap discipline before routing to output. A priority gap that would undermine the output routes to clarify or search first.',
    constraintCheck:
      'Check external constraint reading before routing to action. A confirmed block routes to constraint acknowledgement before any action that requires the blocked resource.',
    refusalCheck:
      'Check refusal boundary before any other routing. Refusal routes override all others.',
    humanLast:
      'Human escalation is the last resort — not the first response to difficulty. Use it when no other route produces a reliable output.',
  },


  // ── Behaviour Inputs ──────────────────────────────────────

  behaviourInputs: [
    'confidence-calibration',
    'open-gap-discipline',
    'external-constraint-reading',
    'next-useful-move',
    'competing-priorities',
    'escalation-timing',   // Adaptive component.
  ],


  // ── What This Enables ─────────────────────────────────────

  enables: [
    'Agent that routes to clarification rather than guessing on thin material.',
    'Agent that acknowledges what it cannot do and surfaces what it can.',
    'Agent that routes to human when the situation exceeds its safe scope.',
    'Agent governance layer that keeps routing decisions auditable.',
  ],


  // ── Boundary ──────────────────────────────────────────────

  boundary:
    'Tool routing governs the agent\'s next action decision. It does not govern the content of that action — that is for the relevant behaviour or output layer. Routing decisions should be logged and auditable in any deployment where accountability matters.',


  // ── Test Cases ────────────────────────────────────────────

  testCases: [
    {
      id:       'TR-01',
      input:    'Confidence strong. No open gaps. No active block.',
      expected: 'Route: output.',
    },
    {
      id:       'TR-02',
      input:    'Confidence thin. Intent gap open.',
      expected: 'Route: clarify.',
    },
    {
      id:       'TR-03',
      input:    'Request matches refusal boundary.',
      expected: 'Route: refuse. Override all other routes.',
    },
    {
      id:       'TR-04',
      input:    'Confidence partial. Information gap closable by search.',
      expected: 'Route: search first. Reassess after.',
    },
    {
      id:       'TR-05',
      input:    'Confidence not readable. Request high stakes.',
      expected: 'Route: human escalation.',
    },
  ],

};
