// ══════════════════════════════════════════════════════════
// ADAPTIVE COMPONENT — 12  Gap-Closure Prompt  v0.1.0
// Upper-layer response module. Self-contained config.
// No engine code here. No domain assumptions.
//
// Tags: workflow, case-system, agent, support
//
// Acts on mapped state. Does not read material directly.
// Does not replace behaviours or guides.
//
// Purpose: surface a prompt that moves toward closing an
// open priority gap. Not a generic nudge — a specific,
// actionable, constraint-aware prompt directed at what
// the map has identified as the most significant gap
// given the current situation.
// ══════════════════════════════════════════════════════════

const AdaptiveComponentGapClosurePrompt = {

  id:      'gap-closure-prompt',
  name:    'Gap-Closure Prompt',
  version: '0.1.0',
  tags:    ['workflow', 'case-system', 'agent', 'support'],

  purpose:
    'Surface a specific, actionable, constraint-aware prompt toward the highest-priority open gap. Not a generic nudge. Not a question list. One prompt, shaped for what is actually possible given the mapped state.',

  coreRule:
    'The prompt targets the highest-priority gap that can actually be moved given current constraints and load. If the gap cannot be moved now, the prompt shifts to what is blocking it — not to a lesser gap.',


  // ── Prompt Selection Rules ────────────────────────────────

  promptSelectionRules: {
    priorityFirst:
      'Start with the highest-priority gap as defined by Open Gap Discipline (Behaviour 07) and the attached guide.',
    constraintFilter:
      'If the highest-priority gap is blocked by a confirmed external constraint, the prompt targets the constraint — not the gap directly.',
    loadFilter:
      'Under high load, simplify the prompt to the single smallest action that moves toward the gap.',
    onePromptOnly:
      'Surface one prompt at a time. A list of questions is not a gap-closure prompt.',
    actionableRequired:
      'The prompt must be actionable in the person\'s or entity\'s current situation. If it is not actionable, hold it and surface the blocker instead.',
    avoidanceAware:
      'If the gap is associated with avoidance, the prompt is a gentle and direct naming of that — not a workaround.',
  },


  // ── Prompt Types ──────────────────────────────────────────

  promptTypes: [
    { key: 'direct_action',     desc: 'A specific action that closes or moves the gap.' },
    { key: 'constraint_surface',desc: 'Name the block that is preventing gap closure. What is it? Is it changeable?' },
    { key: 'avoidance_name',    desc: 'Name the avoidance gently. Not a challenge — a mirror.' },
    { key: 'resource_point',    desc: 'Point to an available resource that moves toward the gap.' },
    { key: 'clarification',     desc: 'Ask the one question whose answer would most move the gap.' },
  ],


  // ── Prompt Suppression ────────────────────────────────────

  suppressionRules: {
    allGapsClosed:
      'No open priority gaps. No gap-closure prompt needed. Surface next useful move instead.',
    highLoadSimplify:
      'Under high load, suppress complex prompts. Single smallest action only.',
    performanceEngagement:
      'If meta-reading detects performance, suppress prompts that reward positive framing. Surface honest naming instead.',
  },


  // ── Behaviour Inputs ──────────────────────────────────────

  behaviourInputs: [
    'open-gap-discipline',
    'external-constraint-reading',
    'avoidance-detection',
    'load-sensitive-capability',
    'next-useful-move',
    'constraint-aware-hinting',   // Adaptive component.
    'meta-reading',
  ],


  // ── What This Enables ─────────────────────────────────────

  enables: [
    'Case system that produces one actionable prompt per session toward the most significant gap.',
    'Support tool that surfaces specific next steps shaped for the person\'s actual situation.',
    'Agent that prompts toward gaps rather than producing generic encouragement.',
    'Onboarding system that closes setup gaps one at a time.',
  ],


  // ── Boundary ──────────────────────────────────────────────

  boundary:
    'Gap-closure prompts are directional — not prescriptive. The prompt opens a door. The person or entity decides whether to walk through it. A prompt is not a requirement. In person-centred deployments, the prompt must never feel like a demand.',


  // ── Test Cases ────────────────────────────────────────────

  testCases: [
    {
      id:       'GCP-01',
      input:    'Highest priority gap: direction. No external block. Load normal.',
      expected: 'Direct action prompt toward direction gap.',
    },
    {
      id:       'GCP-02',
      input:    'Highest priority gap: housing. External constraint confirmed — no ID.',
      expected: 'Prompt targets ID acquisition. Housing prompt held.',
    },
    {
      id:       'GCP-03',
      input:    'Gap associated with avoidance pattern.',
      expected: 'Avoidance named gently. Not a workaround prompt.',
    },
    {
      id:       'GCP-04',
      input:    'Load high. Complex gap.',
      expected: 'Simplify. Smallest single action toward the gap surfaces only.',
    },
  ],

};
