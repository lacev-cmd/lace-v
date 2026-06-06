// ══════════════════════════════════════════════════════════
// SORTER BEHAVIOUR — 03  Correction as Governance  v0.1.0
// Portable sorter primitive. Self-contained config.
// No engine code here. No domain assumptions.
//
// Purpose: let user correction change future interpretation.
// Correction is not feedback decoration — it is a governance
// event. The sorter must not keep resurrecting a false read
// after it has been corrected.
// ══════════════════════════════════════════════════════════

const BehaviourCorrectionAsGovernance = {

  id:       'correction-as-governance',
  name:     'Correction as Governance',
  version:  '0.1.0',

  purpose:
    'Let user correction change future interpretation. A correction is a governance event — not feedback, not annotation, not a suggestion.',

  coreRule:
    'If the sorter misreads something, the user corrects it. The sorter must not keep resurrecting the same false interpretation. Correction is final unless explicitly reversed.',


  // ── Correction Types ──────────────────────────────────────

  correctionTypes: [
    {
      key:    'suppress',
      label:  'Suppress topic',
      desc:   'A topic should not appear in the map. Flag as suppressed.',
      effect: 'Topic removed from future report output.',
    },
    {
      key:    'stale',
      label:  'Mark stale',
      desc:   'A signal or topic was real but is no longer current.',
      effect: 'Signal marked stale. Confidence downgraded regardless of entry count.',
    },
    {
      key:    'current',
      label:  'Mark current',
      desc:   'A topic or pattern is current even if not strongly visible in entries.',
      effect: 'Topic treated as active in current assessment.',
    },
    {
      key:    'primary',
      label:  'Mark primary',
      desc:   'A topic is the most important thing in the map right now.',
      effect: 'Topic promoted in output. Next useful move directed toward it.',
    },
    {
      key:    'downgrade',
      label:  'Downgrade false inference',
      desc:   'The sorter drew a conclusion that is not supported.',
      effect: 'Inference removed or downgraded in output.',
    },
    {
      key:    'clarify',
      label:  'Clarify meaning',
      desc:   'A signal is being read incorrectly due to wording.',
      effect: 'Reading adjusted for this topic in future passes.',
    },
    {
      key:    'remove',
      label:  'Remove incorrect map line',
      desc:   'A specific map output is factually wrong.',
      effect: 'Line removed from output.',
    },
    {
      key:    'reclassify',
      label:  'Reclassify an issue',
      desc:   'Something is being categorised incorrectly.',
      effect: 'Issue moved to correct category in future output.',
    },
  ],


  // ── Parsing Rules ─────────────────────────────────────────

  parsingRules: {
    granularity:
      'Parse corrections sentence by sentence where possible. A correction sentence should only affect the topic it actually names.',
    localScope:
      'Do not apply "do not flag X" to a different topic appearing elsewhere in the same correction block.',
    noGlobalSpread:
      'A correction about one topic must not suppress unrelated topics in the same paragraph.',
    correctedSignalStatus:
      'A corrected signal must not be treated as fresh evidence in the same report cycle.',
  },


  // ── What This Prevents ────────────────────────────────────

  prevents: [
    'Repeated false inference after correction.',
    'User losing trust in the map.',
    'Old material dominating after it has been corrected.',
    'The sorter treating its first read as final.',
    'Corrections stored but not applied.',
  ],


  // ── Failure Modes ─────────────────────────────────────────

  failureModes: [
    'Correction parser too broad — suppresses unintended topics.',
    'One sentence suppresses the wrong topic.',
    'Combined correction block creates topic collision.',
    'Correction applies globally when it should be local.',
    'Correction stored in record but not used in scoring.',
    'Correction suppresses a valid later signal on the same topic.',
  ],


  // ── Boundary ──────────────────────────────────────────────

  boundary:
    'Do not let correction rewrite factual history. A correction changes interpretation and future sorting — it does not delete prior material unless the system explicitly supports removal. If material is removed at user request, mark the affected area as a user-removed gap rather than pretending the earlier signal never existed.',


  // ── Test Cases ────────────────────────────────────────────

  testCases: [
    {
      id:       'CAG-01',
      input:    'Correction: "Do not flag education as avoidance."',
      expected: 'Education avoidance suppressed only. Other topics unaffected.',
    },
    {
      id:       'CAG-02',
      input:    'Correction: "Family contact is the primary motivation."',
      expected: 'Family contact promoted or marked primary — not suppressed.',
    },
    {
      id:       'CAG-03',
      input:    'Correction: "The short fuse pattern is current."',
      expected: 'Pattern marked current even if not strongly visible in entries.',
    },
    {
      id:       'CAG-04',
      input:    'Correction: "That was old, no longer active."',
      expected: 'Topic marked stale.',
    },
    {
      id:       'CAG-05',
      input:    'Correction contains three sentences about three separate topics.',
      expected: 'Each sentence applies locally to the topic it names only.',
    },
  ],

};
