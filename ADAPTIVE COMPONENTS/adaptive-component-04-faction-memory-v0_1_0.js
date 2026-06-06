// ══════════════════════════════════════════════════════════
// ADAPTIVE COMPONENT — 04  Faction Memory  v0.1.0
// Upper-layer response module. Self-contained config.
// No engine code here. No domain assumptions.
//
// Tags: gaming, simulation, narrative
//
// Acts on mapped state. Does not read material directly.
// Does not replace behaviours or guides.
//
// Purpose: hold a faction's accumulated memory of an entity's
// actions over time. The faction responds to the pattern —
// not just the last move. Reputation is built or lost
// through the arc, not the moment.
// ══════════════════════════════════════════════════════════

const AdaptiveComponentFactionMemory = {

  id:      'faction-memory',
  name:    'Faction Memory',
  version: '0.1.0',
  tags:    ['gaming', 'simulation', 'narrative'],

  purpose:
    'Hold a faction\'s accumulated memory of an entity\'s actions. The faction\'s response is shaped by the full arc — not just the most recent move. Reputation accumulates, and it takes sustained behaviour to shift it.',

  coreRule:
    'A faction remembers. A single action does not reset the record. Reputation is the pattern read by the faction over time. It moves slowly and requires sustained behaviour change to shift meaningfully.',


  // ── Faction Memory State ──────────────────────────────────

  factionMemoryState: {
    factionId:    null,   // Which faction holds this memory.
    entityId:     null,   // Which entity is being tracked.
    reputation:   50,     // 0–100. Starts neutral unless deployment sets otherwise.
    standing:     null,   // 'ally', 'neutral', 'suspect', 'enemy'
    keyEvents:    [],     // Significant actions that shaped the memory arc.
    lastUpdated:  null,
  },


  // ── Reputation Movement Rules ─────────────────────────────

  reputationRules: {
    actionWeighted:
      'Actions carry more weight than declarations. A positive statement to a faction member does not move reputation. An action that benefits the faction does.',
    keyEventPersists:
      'Significant events — betrayal, rescue, sacrifice, sabotage — are stored as key events and continue to influence reputation even as the overall score drifts.',
    slowMovement:
      'Reputation moves slowly. A single action moves it by a small amount. Sustained behaviour over multiple independent events moves it meaningfully.',
    decayRate:
      'Reputation drifts toward neutral slowly over time if no new actions occur. It does not hold indefinitely without continued engagement.',
    keyEventOverride:
      'A key event of sufficient magnitude can override slow drift — betrayal drops reputation sharply regardless of prior standing.',
  },


  // ── Standing Thresholds ───────────────────────────────────

  standingThresholds: [
    { key: 'ally',    range: [75, 100], desc: 'Faction treats entity as trusted. Access, information, and support extended.' },
    { key: 'neutral', range: [40, 74],  desc: 'Faction treats entity as unknown quantity. Cautious engagement.' },
    { key: 'suspect', range: [16, 39],  desc: 'Faction is wary. Limited access. Actions are watched.' },
    { key: 'enemy',   range: [0, 15],   desc: 'Faction treats entity as hostile. Active opposition possible.' },
  ],


  // ── Key Event Types ───────────────────────────────────────

  keyEventTypes: [
    { key: 'betrayal',    impact: -30, desc: 'Entity acted against faction interest directly.' },
    { key: 'rescue',      impact: +25, desc: 'Entity protected a faction member at personal cost.' },
    { key: 'sabotage',    impact: -20, desc: 'Entity damaged faction assets or plans.' },
    { key: 'sacrifice',   impact: +20, desc: 'Entity gave up something for faction benefit.' },
    { key: 'deception',   impact: -15, desc: 'Entity was caught deceiving the faction.' },
    { key: 'loyalty',     impact: +10, desc: 'Entity demonstrated loyalty in a test situation.' },
  ],


  // ── Behaviour Inputs ──────────────────────────────────────

  behaviourInputs: [
    'connections-across-time',
    'independent-signal-counting',
    'state-change-detection',
    'contradiction-holding',
  ],


  // ── What This Enables ─────────────────────────────────────

  enables: [
    'Faction-based RPG where reputation accumulates through action arc.',
    'Political simulation where past behaviour shapes current standing.',
    'Narrative engine where the world remembers what was done.',
    'Multi-faction games where standing with one faction affects others.',
  ],


  // ── Boundary ──────────────────────────────────────────────

  boundary:
    'Fiction and simulation only. Faction memory models how a fictional group remembers and responds to an entity\'s arc. It must not be used to build real reputation or social credit systems for real people.',


  // ── Test Cases ────────────────────────────────────────────

  testCases: [
    {
      id:       'FM-01',
      input:    'Entity completes three missions benefiting the faction over three sessions.',
      expected: 'Reputation builds slowly. Standing moves toward ally.',
    },
    {
      id:       'FM-02',
      input:    'Entity at ally standing commits betrayal.',
      expected: 'Key event stored. Reputation drops sharply. Standing drops to suspect or enemy.',
    },
    {
      id:       'FM-03',
      input:    'Entity makes a speech declaring loyalty to faction.',
      expected: 'Reputation unchanged. Declaration does not move the meter.',
    },
    {
      id:       'FM-04',
      input:    'Entity goes inactive for an extended period.',
      expected: 'Reputation drifts slowly toward neutral. Key events persist.',
    },
  ],

};
