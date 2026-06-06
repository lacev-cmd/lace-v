// ══════════════════════════════════════════════════════════
// ADAPTIVE COMPONENT — 08  Constraint-Aware Hinting  v0.1.0
// Upper-layer response module. Self-contained config.
// No engine code here. No domain assumptions.
//
// Tags: gaming, education, onboarding, support, agent
//
// Acts on mapped state. Does not read material directly.
// Does not replace behaviours or guides.
//
// Purpose: produce hints, nudges, or prompts that are
// shaped by the entity's current constraints. A hint that
// requires what the entity cannot do is not a hint —
// it is noise. Hints are only useful when they are
// actionable within the entity's actual situation.
// ══════════════════════════════════════════════════════════

const AdaptiveComponentConstraintAwareHinting = {

  id:      'constraint-aware-hinting',
  name:    'Constraint-Aware Hinting',
  version: '0.1.0',
  tags:    ['gaming', 'education', 'onboarding', 'support', 'agent'],

  purpose:
    'Produce hints and prompts that are actionable within the entity\'s actual constraints. A hint that requires unavailable resources, missing capability, or a blocked channel is filtered out. Only what is genuinely possible surfaces.',

  coreRule:
    'A hint is only valid if the entity can act on it given their current mapped state. Before surfacing a hint, the component checks available resources, current load, active constraints, and capability state. If the hint requires what is not there, it is held or replaced.',


  // ── Hint Validity Rules ───────────────────────────────────

  hintValidityRules: {
    resourceCheck:
      'Does the hint require a resource the entity does not currently have? If yes, hold or replace.',
    constraintCheck:
      'Is the channel or action required by the hint currently blocked by an external constraint? If yes, hold or replace.',
    loadCheck:
      'Is the entity\'s current load state such that the hint requires more than available capacity? If yes, simplify or hold.',
    capabilityCheck:
      'Does the hint require a capability that is not present or is currently degraded? If yes, hold or replace.',
    timingCheck:
      'Is the current moment appropriate for this hint? A hint surfaced at the wrong moment may be ignored or cause harm.',
  },


  // ── Hint Types ────────────────────────────────────────────

  hintTypes: [
    { key: 'next_action',     desc: 'The smallest actionable step given current state.' },
    { key: 'gap_prompt',      desc: 'A prompt toward an open gap that the entity can address now.' },
    { key: 'resource_point',  desc: 'A pointer to an available resource the entity has not used.' },
    { key: 'pattern_nudge',   desc: 'A gentle note that the entity is in a familiar pattern.' },
    { key: 'load_acknowledgement', desc: 'Acknowledgement of high load before suggesting any action.' },
    { key: 'constraint_note', desc: 'Confirmation that the block is real and external — not a failure.' },
    { key: 'reframe',         desc: 'A reframe of the situation that opens a different angle.' },
  ],


  // ── Hint Suppression Rules ────────────────────────────────

  suppressionRules: {
    highLoad:
      'Under high load, suppress complex hints. Surface only the smallest possible next action or load acknowledgement.',
    brokenTrust:
      'If trust is broken, suppress hints that require vulnerability or disclosure. Surface only low-stakes actions.',
    externalBlock:
      'If a confirmed external block is present, do not surface hints that require the blocked channel. Surface what is possible through other channels.',
    performanceEngagement:
      'If meta-reading detects performance engagement, suppress hints that reward positive framing. Surface pattern nudges instead.',
  },


  // ── Behaviour Inputs ──────────────────────────────────────

  behaviourInputs: [
    'external-constraint-reading',
    'load-sensitive-capability',
    'open-gap-discipline',
    'next-useful-move',
    'avoidance-detection',
    'confidence-calibration',
    'meta-reading',
    'trust-drift',   // Adaptive component.
  ],


  // ── What This Enables ─────────────────────────────────────

  enables: [
    'Game hint system that only surfaces actionable tips given player state.',
    'Onboarding tool that adjusts guidance to what the user can actually do now.',
    'Support system that filters out advice that requires unavailable resources.',
    'Education platform that matches prompts to current learner capacity.',
  ],


  // ── Boundary ──────────────────────────────────────────────

  boundary:
    'Constraint-aware hinting is a filtering layer — it does not generate the hints themselves, it validates them against mapped state. The quality of hints depends on the quality of the underlying map. A thin or performed map produces less reliable hint filtering.',


  // ── Test Cases ────────────────────────────────────────────

  testCases: [
    {
      id:       'CAH-01',
      input:    'Hint requires applying for housing. Entity has no ID.',
      expected: 'Hint held. ID acquisition surfaces as prior step.',
    },
    {
      id:       'CAH-02',
      input:    'Load is high. Complex multi-step hint queued.',
      expected: 'Complex hint suppressed. Smallest possible next action surfaces.',
    },
    {
      id:       'CAH-03',
      input:    'External constraint confirmed blocking the primary channel.',
      expected: 'Primary channel hint suppressed. Alternative channel hint surfaces if available.',
    },
    {
      id:       'CAH-04',
      input:    'Meta-reading detects performance engagement.',
      expected: 'Positive framing hints suppressed. Pattern nudge surfaces instead.',
    },
  ],

};
