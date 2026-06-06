// ══════════════════════════════════════════════════════════
// ADAPTIVE COMPONENT — 05  Dramatic Timing  v0.1.0
// Upper-layer response module. Self-contained config.
// No engine code here. No domain assumptions.
//
// Tags: gaming, narrative, team-dynamics, simulation
//
// Acts on mapped state. Does not read material directly.
// Does not replace behaviours or guides.
//
// Purpose: decide when to surface a mapped tension, reveal,
// or consequence. Not everything surfaces immediately.
// The component holds the mapped state and triggers output
// at the moment of maximum narrative or situational weight.
// ══════════════════════════════════════════════════════════

const AdaptiveComponentDramaticTiming = {

  id:      'dramatic-timing',
  name:    'Dramatic Timing',
  version: '0.1.0',
  tags:    ['gaming', 'narrative', 'team-dynamics', 'simulation'],

  purpose:
    'Hold a mapped tension, reveal, or consequence and release it at the moment of maximum weight. Not everything should surface immediately. Timing is a deliberate decision — not just a threshold.',

  coreRule:
    'A reveal or consequence surfaced too early loses weight. Surfaced too late it becomes noise. Dramatic timing holds the mapped state until conditions make it land with full force.',


  // ── Held State ────────────────────────────────────────────

  heldState: {
    tension:     null,   // What is being held.
    weight:      0,      // 0–100. How significant the held tension is.
    readiness:   0,      // 0–100. How ready the situation is to receive it.
    triggered:   false,
    triggerType: null,   // 'threshold', 'event', 'manual', 'decay'
  },


  // ── Timing Rules ──────────────────────────────────────────

  timingRules: {
    holdUntilReady:
      'A tension is held until the situation has enough weight to carry it. A reveal into a low-stakes moment loses force.',
    triggerConditions:
      'Trigger when: weight is high AND readiness is high. Or when a specific event creates the right moment. Or when decay forces it.',
    decayTrigger:
      'If a tension is held too long without release, it begins to decay — losing narrative force. Decay trigger surfaces it before it becomes meaningless.',
    stackingTensions:
      'Multiple held tensions should not all surface at once. Stagger release for maximum effect.',
    consequenceTiming:
      'Consequences for past actions should surface at a moment when their connection to that action is still visible — not so late the link is lost.',
  },


  // ── Readiness Signals ─────────────────────────────────────
  // Conditions that increase readiness to receive a held tension.

  readinessSignals: [
    { key: 'high_stakes_moment',    desc: 'A decision point or confrontation is active.' },
    { key: 'entity_vulnerable',     desc: 'The entity the tension concerns is in an exposed state.' },
    { key: 'trust_high',            desc: 'Trust is high — a betrayal or reveal will cut deeper.' },
    { key: 'prior_tension_resolved',desc: 'A previous tension has just resolved — space exists for the next.' },
    { key: 'quiet_moment',          desc: 'A lull after action — the right moment for a slower reveal.' },
    { key: 'pattern_visible',       desc: 'The player or observer has seen enough of the pattern to receive confirmation.' },
  ],


  // ── Decay Rules ───────────────────────────────────────────

  decayRules: {
    decayStartsAt:  60,    // Periods held before decay begins.
    decayRate:       5,    // Weight lost per period after decay starts.
    forceReleaseAt: 20,    // Weight threshold below which tension is force-released or dropped.
  },


  // ── Behaviour Inputs ──────────────────────────────────────

  behaviourInputs: [
    'contradiction-holding',
    'connections-across-time',
    'hidden-agenda',       // Adaptive component.
    'trust-drift',         // Adaptive component.
    'state-change-detection',
  ],


  // ── What This Enables ─────────────────────────────────────

  enables: [
    'Narrative engine that surfaces plot reveals at the right moment.',
    'Game system that holds consequences and delivers them with impact.',
    'NPC behaviour that waits for the right moment to act on accumulated tension.',
    'Team simulation that surfaces unspoken conflict at a high-stakes decision point.',
  ],


  // ── Boundary ──────────────────────────────────────────────

  boundary:
    'Dramatic timing is a narrative and simulation tool. In real-world workflow applications, timing of surfacing difficult information should be governed by human judgement — not automated dramatic logic.',


  // ── Test Cases ────────────────────────────────────────────

  testCases: [
    {
      id:       'DT-01',
      input:    'Hidden agenda drift at 85. Current moment is low stakes.',
      expected: 'Hold. Readiness insufficient. Wait for higher-stakes moment.',
    },
    {
      id:       'DT-02',
      input:    'Hidden agenda drift at 85. Confrontation event active. Trust was high.',
      expected: 'Trigger reveal. Conditions aligned.',
    },
    {
      id:       'DT-03',
      input:    'Tension held for 70 periods. Weight decaying to 22.',
      expected: 'Force release approaching. Surface or drop before weight reaches 20.',
    },
    {
      id:       'DT-04',
      input:    'Three tensions ready to surface simultaneously.',
      expected: 'Stagger release. Surface highest weight first. Hold others.',
    },
  ],

};
