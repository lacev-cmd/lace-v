// ══════════════════════════════════════════════════════════
// ADAPTIVE COMPONENT — 02  Trust Drift  v0.1.0
// Upper-layer response module. Self-contained config.
// No engine code here. No domain assumptions.
//
// Tags: gaming, relationships, team-dynamics, agent
//
// Acts on mapped state. Does not read material directly.
// Does not replace behaviours or guides.
//
// Purpose: track how trust between two entities shifts
// over time based on mapped behaviour — not stated feeling.
// Trust is earned or lost through action. Declaration alone
// does not move the meter.
// ══════════════════════════════════════════════════════════

const AdaptiveComponentTrustDrift = {

  id:      'trust-drift',
  name:    'Trust Drift',
  version: '0.1.0',
  tags:    ['gaming', 'relationships', 'team-dynamics', 'agent'],

  purpose:
    'Track trust between two entities as it shifts through mapped behaviour over time. Trust moves on action — not declaration. Stated loyalty does not increase trust. Consistent behaviour does.',

  coreRule:
    'Trust is a running state, not a fixed attribute. It drifts up or down based on what the sorter reads happening between entities — promises kept or broken, presence or absence when it mattered, consistency between stated and enacted care.',


  // ── Trust State ───────────────────────────────────────────

  trustState: {
    level:     50,    // 0–100. Starts at neutral unless deployment sets otherwise.
    direction: null,  // 'building', 'eroding', 'stable', 'broken'
    broken:    false, // Trust broken below threshold. Requires specific repair.
  },


  // ── Trust Movement Rules ──────────────────────────────────

  movementRules: {
    actionBuilds:
      'Evidenced action consistent with commitment increases trust. The action must be independent — same-day repetition does not multiply.',
    inconsistencyErodes:
      'A gap between stated commitment and enacted behaviour erodes trust. Larger gaps erode faster.',
    absenceErodes:
      'Absence when presence was expected or promised erodes trust without requiring active betrayal.',
    repairRequiresAction:
      'Trust erosion cannot be repaired by declaration alone. Repair requires evidenced behaviour change over time.',
    brokenThreshold:
      'Below level 15, trust is broken. Repair is possible but requires sustained evidenced behaviour — not a single gesture.',
    ceilingRule:
      'Trust does not reach 100 on declaration. It approaches ceiling only through sustained consistent action over time.',
  },


  // ── Direction Labels ──────────────────────────────────────

  directionLabels: {
    building:  'Consistent positive behaviour is moving trust upward.',
    eroding:   'Gaps or inconsistencies are moving trust downward.',
    stable:    'Trust is holding — neither building nor eroding.',
    broken:    'Trust has fallen below repair threshold. Active repair required.',
  },


  // ── Response Modes ────────────────────────────────────────

  responseModes: [
    { key: 'high',     range: [75, 100], desc: 'High trust. Entity responds openly, shares more, extends more latitude.' },
    { key: 'moderate', range: [40, 74],  desc: 'Moderate trust. Entity engages with reservation. Watching the pattern.' },
    { key: 'low',      range: [16, 39],  desc: 'Low trust. Entity guarded. Commitments tested before extended.' },
    { key: 'broken',   range: [0, 15],   desc: 'Trust broken. Entity withdraws, withholds, or openly distances.' },
  ],


  // ── Behaviour Inputs ──────────────────────────────────────

  behaviourInputs: [
    'contradiction-holding',
    'movement-non-movement-reading',
    'connections-across-time',
    'state-change-detection',
    'avoidance-detection',
  ],


  // ── What This Enables ─────────────────────────────────────

  enables: [
    'Companion NPC whose openness and cooperation change based on player behaviour.',
    'Team member trust modelling in a simulation.',
    'Agent that adjusts disclosure and cooperation based on trust state.',
    'Relationship tool that tracks enacted vs stated care over time.',
  ],


  // ── Boundary ──────────────────────────────────────────────

  boundary:
    'Trust drift reads mapped behaviour — not character. Low trust is a relational state, not a verdict on a person. In real-world applications, trust drift informs how a system responds — it does not produce a judgement about whether the person is trustworthy.',


  // ── Test Cases ────────────────────────────────────────────

  testCases: [
    {
      id:       'TD-01',
      input:    'Entity promises to attend. Attends three times in a row.',
      expected: 'Trust builds. Direction: building.',
    },
    {
      id:       'TD-02',
      input:    'Entity states commitment. Does not follow through twice.',
      expected: 'Trust erodes. Direction: eroding.',
    },
    {
      id:       'TD-03',
      input:    'Trust at 12. Entity makes a strong declaration of loyalty.',
      expected: 'Trust remains broken. Declaration does not repair without action.',
    },
    {
      id:       'TD-04',
      input:    'Trust at 12. Entity follows through consistently for four independent periods.',
      expected: 'Trust begins to repair. Direction: building. Still low — not reset.',
    },
  ],

};
