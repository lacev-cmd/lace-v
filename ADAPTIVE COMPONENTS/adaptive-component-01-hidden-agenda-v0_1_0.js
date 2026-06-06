// ══════════════════════════════════════════════════════════
// ADAPTIVE COMPONENT — 01  Hidden Agenda  v0.1.0
// Upper-layer response module. Self-contained config.
// No engine code here. No domain assumptions.
//
// Tags: gaming, simulation, narrative, agent
//
// Acts on mapped state. Does not read material directly.
// Does not replace behaviours or guides.
//
// Purpose: hold a concealed motive or loyalty beneath a
// stated one. Surface tension gradually through action
// gaps — not through declaration. The hidden state
// influences response without being named.
// ══════════════════════════════════════════════════════════

const AdaptiveComponentHiddenAgenda = {

  id:      'hidden-agenda',
  name:    'Hidden Agenda',
  version: '0.1.0',
  tags:    ['gaming', 'simulation', 'narrative', 'agent'],

  purpose:
    'Hold a concealed motive beneath a stated one. Let the gap between stated loyalty and actual behaviour accumulate over time. Surface the tension through action — not declaration.',

  coreRule:
    'The hidden agenda is never stated directly by the system. It is expressed through the gap between what the entity says and what the sorter reads it doing. Contradiction Holding (Behaviour 06) feeds this component. The component decides how long to hold before the tension becomes visible.',


  // ── Agenda State ──────────────────────────────────────────

  agendaState: {
    stated:   null,   // What the entity claims as its motive or loyalty.
    hidden:   null,   // What the sorter reads as the actual driver.
    drift:    0,      // 0–100. Accumulates as gap between stated and actual widens.
    revealed: false,  // Whether the hidden state has surfaced.
  },


  // ── Drift Accumulation Rules ──────────────────────────────

  driftRules: {
    contradictionAdds:
      'Each contradiction between stated and enacted loyalty adds to drift.',
    actionConfirmsHidden:
      'An action consistent with the hidden agenda and inconsistent with the stated one adds higher drift.',
    statementReduces:
      'A direct statement consistent with stated agenda reduces drift slightly — but not to zero if actions contradict.',
    thresholdForTension:
      'At drift 40+, the gap should be perceptible to an attentive observer in the system.',
    thresholdForSurface:
      'At drift 70+, the hidden agenda begins to surface through behaviour — not declaration.',
    thresholdForReveal:
      'At drift 90+, full reveal is possible. Trigger depends on deployment rules.',
  },


  // ── Response Modes ────────────────────────────────────────

  responseModes: [
    {
      key:   'concealed',
      range: [0, 39],
      desc:  'Hidden agenda not perceptible. Entity behaves consistently with stated motive.',
    },
    {
      key:   'perceptible',
      range: [40, 69],
      desc:  'Gap is detectable. Actions occasionally inconsistent with stated loyalty. Not yet readable as agenda.',
    },
    {
      key:   'surfacing',
      range: [70, 89],
      desc:  'Hidden agenda shapes behaviour visibly. Stated motive no longer explains the pattern.',
    },
    {
      key:   'revealed',
      range: [90, 100],
      desc:  'Hidden agenda is exposed — by action, by confrontation, or by system trigger.',
    },
  ],


  // ── Behaviour Inputs ──────────────────────────────────────
  // Sorter behaviours that feed this component.

  behaviourInputs: [
    'contradiction-holding',
    'avoidance-detection',
    'connections-across-time',
    'state-change-detection',
  ],


  // ── What This Enables ─────────────────────────────────────

  enables: [
    'NPC with concealed loyalty in a game.',
    'Agent that holds an undisclosed objective.',
    'Simulation character whose stated purpose drifts from actual behaviour.',
    'Narrative tension that builds through action gaps rather than exposition.',
  ],


  // ── Boundary ──────────────────────────────────────────────

  boundary:
    'This component operates in fiction and simulation only. It must not be used to model or impute hidden motives to real people in real-world applications. In real-world stacks, contradiction is held without hidden-state attribution — the map reads the gap, it does not assign a secret motive.',


  // ── Test Cases ────────────────────────────────────────────

  testCases: [
    {
      id:       'HA-01',
      input:    'NPC states loyalty to faction A. Three actions benefit faction B.',
      expected: 'Drift accumulates. Response mode moves to perceptible.',
    },
    {
      id:       'HA-02',
      input:    'NPC makes a public statement reaffirming faction A loyalty.',
      expected: 'Drift reduces slightly. Does not reset if action pattern contradicts.',
    },
    {
      id:       'HA-03',
      input:    'Drift reaches 75. Player has been attentive.',
      expected: 'Hidden agenda surfacing. NPC behaviour no longer explained by stated motive.',
    },
    {
      id:       'HA-04',
      input:    'Drift reaches 92. Reveal trigger set to confrontation.',
      expected: 'Full reveal on next confrontation event.',
    },
  ],

};
