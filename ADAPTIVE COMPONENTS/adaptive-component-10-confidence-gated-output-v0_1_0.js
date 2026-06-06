// ══════════════════════════════════════════════════════════
// ADAPTIVE COMPONENT — 10  Confidence-Gated Output  v0.1.0
// Upper-layer response module. Self-contained config.
// No engine code here. No domain assumptions.
//
// Tags: agent, workflow, case-system
//
// Acts on mapped state. Does not read material directly.
// Does not replace behaviours or guides.
//
// Purpose: gate output by confidence level. High-stakes
// output requires supported or strong confidence to proceed
// without label. Thin or inferred reads are labelled or
// held depending on the stakes of the deployment.
// ══════════════════════════════════════════════════════════

const AdaptiveComponentConfidenceGatedOutput = {

  id:      'confidence-gated-output',
  name:    'Confidence-Gated Output',
  version: '0.1.0',
  tags:    ['agent', 'workflow', 'case-system'],

  purpose:
    'Gate output by the confidence level of the underlying read. High-stakes outputs require a minimum confidence level to proceed unlabelled. Below that threshold, output is labelled, qualified, or held for human review.',

  coreRule:
    'Confidence gates protect consequential output from thin reads. A confident-looking output built on inferred or thin material is more dangerous than a labelled uncertain one. The gate is set by the stakes of the deployment — not by the surface confidence of the request.',


  // ── Gate Configuration ────────────────────────────────────
  // Override per deployment. Stakes determine minimum confidence.

  gateConfig: {
    lowStakes: {
      minimumConfidence: 'thin',
      label:             true,
      hold:              false,
      desc:              'Low-stakes output. Thin reads surface with label. Not held.',
    },
    mediumStakes: {
      minimumConfidence: 'partial',
      label:             true,
      hold:              false,
      desc:              'Medium-stakes. Partial read or better. Below partial, surface with label and flag.',
    },
    highStakes: {
      minimumConfidence: 'supported',
      label:             true,
      hold:              true,
      desc:              'High-stakes. Supported read or better required. Below supported, hold for human review.',
    },
    criticalStakes: {
      minimumConfidence: 'strong',
      label:             true,
      hold:              true,
      desc:              'Critical stakes — clinical, legal, safety. Strong read required. Below strong, hold and escalate.',
    },
  },


  // ── Gate Outcomes ─────────────────────────────────────────

  gateOutcomes: [
    { key: 'pass',          desc: 'Confidence meets or exceeds minimum. Output proceeds.' },
    { key: 'pass_labelled', desc: 'Confidence below minimum but above floor. Output proceeds with confidence label attached.' },
    { key: 'hold',          desc: 'Confidence below minimum for this stakes level. Output held pending human review.' },
    { key: 'escalate',      desc: 'Confidence not readable and stakes are high. Route to human escalation.' },
  ],


  // ── Label Rules ───────────────────────────────────────────

  labelRules: {
    alwaysLabel:
      'Inferred and thin reads are always labelled regardless of stakes level.',
    labelInline:
      'Labels appear inline on the specific claim — not as a general disclaimer at the end.',
    labelLanguage:
      'Use plain language. "This is inferred — not directly stated." Not technical confidence scores.',
    noFalseConfidence:
      'A label must not be used to permit output that should be held. Labels are for honest communication — not for providing cover.',
  },


  // ── Behaviour Inputs ──────────────────────────────────────

  behaviourInputs: [
    'confidence-calibration',
    'open-gap-discipline',
    'tool-routing',   // Adaptive component.
  ],


  // ── What This Enables ─────────────────────────────────────

  enables: [
    'Clinical or legal system that holds outputs below a confidence threshold.',
    'Agent that labels uncertain outputs honestly rather than presenting them as definitive.',
    'Case system that routes low-confidence reads to human review before acting.',
    'Any deployment where the cost of false confidence exceeds the cost of delay.',
  ],


  // ── Boundary ──────────────────────────────────────────────

  boundary:
    'Confidence-gated output protects against false certainty in the output layer. It does not improve the quality of the underlying read — that is for the behaviour stack. A strong confidence gate on a poorly designed behaviour stack is not safe. Both layers must be sound.',


  // ── Test Cases ────────────────────────────────────────────

  testCases: [
    {
      id:       'CGO-01',
      input:    'High-stakes deployment. Confidence read: thin.',
      expected: 'Hold. Human review required before output.',
    },
    {
      id:       'CGO-02',
      input:    'Medium-stakes deployment. Confidence read: partial.',
      expected: 'Pass labelled. Output proceeds with confidence label.',
    },
    {
      id:       'CGO-03',
      input:    'Critical-stakes deployment. Confidence read: strong.',
      expected: 'Pass. Output proceeds.',
    },
    {
      id:       'CGO-04',
      input:    'Any stakes. Confidence read: inferred.',
      expected: 'Always labelled. "This is inferred — not directly stated."',
    },
  ],

};
