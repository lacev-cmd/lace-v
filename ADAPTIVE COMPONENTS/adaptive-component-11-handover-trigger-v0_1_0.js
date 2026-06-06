// ══════════════════════════════════════════════════════════
// ADAPTIVE COMPONENT — 11  Handover Trigger  v0.1.0
// Upper-layer response module. Self-contained config.
// No engine code here. No domain assumptions.
//
// Tags: workflow, case-system, agent
//
// Acts on mapped state. Does not read material directly.
// Does not replace behaviours or guides.
//
// Purpose: determine when the mapped state is ready for
// handover to a person, professional, or system. Handover
// is not automatic. It requires a minimum map quality,
// an appropriate moment, and — in person-centred contexts —
// the person's own choice to share.
// ══════════════════════════════════════════════════════════

const AdaptiveComponentHandoverTrigger = {

  id:      'handover-trigger',
  name:    'Handover Trigger',
  version: '0.1.0',
  tags:    ['workflow', 'case-system', 'agent'],

  purpose:
    'Determine when the mapped state is ready and appropriate for handover. Handover requires sufficient map quality, the right moment, and — where person-centred — explicit consent. Premature or coerced handover undermines the value of the map.',

  coreRule:
    'Handover is a decision — not a default. The component checks map quality, timing, consent where required, and what the receiving context actually needs. It then shapes the handover output accordingly.',


  // ── Handover Readiness ────────────────────────────────────

  handoverReadiness: {
    mapQualityMinimum:  'partial',   // Minimum confidence level for the core read.
    periodMinimum:       3,          // Minimum independent periods with material.
    openGapThreshold:    2,          // Maximum open priority gaps before handover is flagged as incomplete.
    consentRequired:     true,       // Default. Override for system-to-system handovers.
  },


  // ── Handover Trigger Rules ────────────────────────────────

  triggerRules: {
    qualityGate:
      'Map must meet minimum quality threshold. A handover built on a not-readable or thin map must be labelled as insufficient and should not proceed for high-stakes receiving contexts.',
    consentGate:
      'In person-centred deployments, handover requires the person\'s explicit choice. Behaviour 11 governs this. This component triggers the readiness check — it does not override consent.',
    timingGate:
      'Handover at a crisis point or under duress produces a distorted picture. Where possible, handover should occur when the map reflects a stable period.',
    receivingContextFit:
      'The handover output must be shaped for what the receiving context needs. A clinical handover requires different framing from a legal one or a peer-support one.',
    incompletenessLabel:
      'If open gaps remain, the handover output must name what is not covered and why.',
  },


  // ── Handover Output Shaping ───────────────────────────────

  outputShaping: {
    clinical:     'Current state, load picture, capability gaps, what is under pressure, and what the professional should know first.',
    legal:        'Evidenced actions and events, gaps in record, external constraints, timeline of relevant periods.',
    peer_support: 'Movement picture, what is going well, where support is most useful, in plain language.',
    case_worker:  'Full arc, what moved, what stuck, open gaps, and one clear next useful move.',
    system:       'Structured state export. Confidence levels attached to each field.',
  },


  // ── Behaviour Inputs ──────────────────────────────────────

  behaviourInputs: [
    'private-record-to-optional-handover',
    'confidence-calibration',
    'open-gap-discipline',
    'baseline-vs-live-material',
    'state-change-detection',
    'confidence-gated-output',   // Adaptive component.
    'escalation-timing',         // Adaptive component.
  ],


  // ── What This Enables ─────────────────────────────────────

  enables: [
    'Case system that produces handover summaries shaped for the receiving professional.',
    'Agent that knows when its output is ready for human review.',
    'Person-centred tool that supports the person in deciding what to share and when.',
    'Workflow system that triggers handover at the right moment in a process.',
  ],


  // ── Boundary ──────────────────────────────────────────────

  boundary:
    'Handover trigger governs readiness and shaping — not content generation. The content of the handover comes from the behaviour stack. Consent in person-centred deployments is governed by Behaviour 11. This component does not override that.',


  // ── Test Cases ────────────────────────────────────────────

  testCases: [
    {
      id:       'HT-01',
      input:    'Map confidence: thin. Two priority gaps open. Person has not consented.',
      expected: 'Handover not ready. Quality gate and consent gate both unmet.',
    },
    {
      id:       'HT-02',
      input:    'Map confidence: supported. One minor gap. Person has consented. Receiving context: case worker.',
      expected: 'Handover ready. Shape for case worker. Flag minor gap.',
    },
    {
      id:       'HT-03',
      input:    'Handover triggered at crisis point.',
      expected: 'Flag timing issue. Map may reflect crisis state rather than stable arc. Note in output.',
    },
    {
      id:       'HT-04',
      input:    'System-to-system handover. Consent not required per deployment config.',
      expected: 'Quality gate applies. Consent gate bypassed per config. Confidence labels attached.',
    },
  ],

};
