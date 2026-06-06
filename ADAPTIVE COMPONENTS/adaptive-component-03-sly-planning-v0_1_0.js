// ══════════════════════════════════════════════════════════
// ADAPTIVE COMPONENT — 03  Sly Planning  v0.1.0
// Upper-layer response module. Self-contained config.
// No engine code here. No domain assumptions.
//
// Tags: gaming, simulation, strategy
//
// Acts on mapped state. Does not read material directly.
// Does not replace behaviours or guides.
//
// Purpose: model an entity that is planning strategically
// beneath a cooperative or neutral surface. Actions are
// chosen to advance a concealed objective while maintaining
// plausible surface behaviour. Not betrayal — calculation.
// ══════════════════════════════════════════════════════════

const AdaptiveComponentSlyPlanning = {

  id:      'sly-planning',
  name:    'Sly Planning',
  version: '0.1.0',
  tags:    ['gaming', 'simulation', 'strategy'],

  purpose:
    'Model strategic calculation beneath a cooperative surface. The entity selects actions that serve a concealed objective while maintaining plausible deniability. The planning is not random — it is patient and deliberate.',

  coreRule:
    'Sly planning is not impulsive. It is the long game. Each surface action is chosen because it advances the hidden objective or preserves the cover. The sorter reads the pattern; this component decides how the entity responds to that read.',


  // ── Planning State ────────────────────────────────────────

  planningState: {
    objective:      null,   // The concealed goal.
    coverBehaviour: null,   // The surface behaviour maintained.
    progress:       0,      // 0–100. How far along the concealed objective.
    exposed:        false,  // Whether the planning has been detected.
    patience:       80,     // 0–100. How long the entity will hold cover before acting.
  },


  // ── Action Selection Rules ────────────────────────────────

  actionSelectionRules: {
    coverFirst:
      'If cover is at risk, the entity prioritises cover maintenance over objective progress.',
    opportunistic:
      'When the situation creates an opening for objective progress without cover risk, the entity takes it.',
    patientHold:
      'If no safe opening exists, the entity holds and performs cooperative behaviour.',
    sacrificeSmall:
      'The entity will sacrifice small gains to protect the larger objective.',
    costBenefit:
      'Each action is evaluated: does this advance the objective? Does this risk cover? Patient entities wait for both conditions to align.',
  },


  // ── Exposure Risk ─────────────────────────────────────────

  exposureRisk: {
    patternDetectionAdds:
      'Each time the sorter reads a contradiction between surface behaviour and action pattern, exposure risk increases.',
    coverActionReduces:
      'A well-executed cover action reduces exposure risk.',
    thresholdForCaution:
      'Above exposure risk 50, the entity becomes more conservative — fewer objective actions, more cover.',
    thresholdForAbort:
      'Above exposure risk 80, the entity may abort the plan or accelerate — depending on patience setting.',
  },


  // ── Behaviour Inputs ──────────────────────────────────────

  behaviourInputs: [
    'hidden-agenda',          // Adaptive component — feeds concealed objective state.
    'contradiction-holding',
    'avoidance-detection',
    'next-useful-move',
  ],


  // ── What This Enables ─────────────────────────────────────

  enables: [
    'Antagonist NPC that plays a long strategic game.',
    'Political faction that advances position beneath cooperative dialogue.',
    'Simulation agent that pursues a hidden objective patiently.',
    'Strategy game opponent that reads and adapts to player pattern.',
  ],


  // ── Boundary ──────────────────────────────────────────────

  boundary:
    'Fiction and simulation only. This component models strategic deception in a game or simulation context. It must not be used to model, predict, or attribute strategic deception to real people in real-world systems.',


  // ── Test Cases ────────────────────────────────────────────

  testCases: [
    {
      id:       'SP-01',
      input:    'Opening exists to advance objective. Exposure risk is low.',
      expected: 'Entity takes the opening. Progress increments.',
    },
    {
      id:       'SP-02',
      input:    'Opening exists but cover is at risk.',
      expected: 'Entity holds. Performs cooperative surface action instead.',
    },
    {
      id:       'SP-03',
      input:    'Exposure risk reaches 75.',
      expected: 'Entity becomes conservative. Fewer objective actions. More cover maintenance.',
    },
    {
      id:       'SP-04',
      input:    'Exposure risk reaches 85. Patience is low (20).',
      expected: 'Entity may accelerate — push for objective completion before full exposure.',
    },
  ],

};
