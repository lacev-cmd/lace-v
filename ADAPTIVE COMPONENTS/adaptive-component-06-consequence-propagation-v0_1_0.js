// ══════════════════════════════════════════════════════════
// ADAPTIVE COMPONENT — 06  Consequence Propagation  v0.1.0
// Upper-layer response module. Self-contained config.
// No engine code here. No domain assumptions.
//
// Tags: gaming, workflow, incident, project, simulation
//
// Acts on mapped state. Does not read material directly.
// Does not replace behaviours or guides.
//
// Purpose: propagate the effects of a mapped state or action
// outward through connected entities, systems, or threads.
// Consequences do not stay local. They travel.
// ══════════════════════════════════════════════════════════

const AdaptiveComponentConsequencePropagation = {

  id:      'consequence-propagation',
  name:    'Consequence Propagation',
  version: '0.1.0',
  tags:    ['gaming', 'workflow', 'incident', 'project', 'simulation'],

  purpose:
    'Propagate the effects of a mapped state change or action outward through connected entities, threads, or systems. A decision made here has effects there. The component tracks and distributes those effects.',

  coreRule:
    'Consequences do not stay where they start. They travel along connections. The strength of the effect decreases with distance and connection strength — but it does not disappear entirely unless explicitly absorbed.',


  // ── Propagation State ─────────────────────────────────────

  propagationState: {
    sourceEvent:    null,   // What triggered propagation.
    sourceEntity:   null,   // Where the consequence originated.
    wave:           [],     // Current propagation wave — affected entities and effect strength.
    absorbed:       [],     // Entities that absorbed the consequence fully.
    propagated:     false,
  },


  // ── Propagation Rules ─────────────────────────────────────

  propagationRules: {
    distanceDecay:
      'Effect strength decreases with each hop from the source. Deployment sets decay rate.',
    connectionStrength:
      'A strong connection between entities carries more effect than a weak one.',
    absorptionPoints:
      'Some entities or systems absorb consequences — stopping propagation beyond them.',
    amplificationPoints:
      'Some entities or conditions amplify consequences — increasing effect beyond base decay.',
    timeDelay:
      'Propagation is not always immediate. Some consequences travel with a time delay — particularly in workflow or project contexts.',
    cascadeRisk:
      'If multiple consequences propagate simultaneously, cascade risk increases. The component should flag cascade conditions.',
  },


  // ── Effect Types ──────────────────────────────────────────

  effectTypes: [
    { key: 'trust_impact',     desc: 'Consequence affects trust state between entities. Feeds Trust Drift component.' },
    { key: 'load_impact',      desc: 'Consequence adds or removes load on an entity or system.' },
    { key: 'resource_impact',  desc: 'Consequence affects available resources.' },
    { key: 'information_flow', desc: 'Consequence changes what information is available to which entities.' },
    { key: 'capability_impact',desc: 'Consequence affects what an entity or system can do.' },
    { key: 'state_change',     desc: 'Consequence triggers a state change in a connected entity.' },
  ],


  // ── Behaviour Inputs ──────────────────────────────────────

  behaviourInputs: [
    'connections-across-time',
    'state-change-detection',
    'load-sensitive-capability',
    'external-constraint-reading',
    'trust-drift',   // Adaptive component.
  ],


  // ── What This Enables ─────────────────────────────────────

  enables: [
    'World simulation where player actions have ripple effects.',
    'Project management tool where a blocked thread propagates impact to dependent threads.',
    'Incident response system where a failure propagates through connected services.',
    'Narrative engine where a betrayal affects all relationships in a faction.',
  ],


  // ── Boundary ──────────────────────────────────────────────

  boundary:
    'Consequence propagation models the spread of effects through a connected system. In real-world workflow applications, propagation should be transparent — the system should show what is being affected and why, not propagate silently.',


  // ── Test Cases ────────────────────────────────────────────

  testCases: [
    {
      id:       'CP-01',
      input:    'Entity A betrays Entity B. A and C are strongly connected. B and C are weakly connected.',
      expected: 'Strong effect on A-B trust. Moderate effect propagates to A-C. Weak signal reaches B-C.',
    },
    {
      id:       'CP-02',
      input:    'Project thread blocked. Three dependent threads connected.',
      expected: 'Load impact propagates to dependent threads. Cascade risk flagged.',
    },
    {
      id:       'CP-03',
      input:    'Consequence hits an absorption point entity.',
      expected: 'Propagation stops at that entity. Beyond-entity connections unaffected.',
    },
    {
      id:       'CP-04',
      input:    'Consequence hits an amplification point.',
      expected: 'Effect increases beyond base decay rate. Wider propagation.',
    },
  ],

};
