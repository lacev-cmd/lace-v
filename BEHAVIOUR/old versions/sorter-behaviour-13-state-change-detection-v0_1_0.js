// ══════════════════════════════════════════════════════════
// SORTER BEHAVIOUR — 13  State Change Detection  v0.1.0
// Portable sorter primitive. Self-contained config.
// No engine code here. No domain assumptions.
//
// Purpose: detect when something has genuinely shifted —
// not just recurred. Not "this appeared again" but
// "this used to be X and is now Y." Directional reading.
//
// Recurrence is Behaviour 08. This is different.
// This reads transition, not repetition.
// ══════════════════════════════════════════════════════════

const BehaviourStateChangeDetection = {

  id:       'state-change-detection',
  name:     'State Change Detection',
  version:  '0.1.0',

  purpose:
    'Detect genuine directional shift in a signal, pattern, or condition over time. Not recurrence — transition. Something that was one way is now measurably different.',

  coreRule:
    'A state change requires two readable states separated by time — a prior state and a current state — with evidence of both. Mood shift is not state change. Intention is not state change. A described shift without behavioural evidence is not state change.',


  // ── Change Types ──────────────────────────────────────────

  changeTypes: [
    {
      key:   'pressure_reduced',
      label: 'Pressure reduced',
      desc:  'A pressure present in earlier material is measurably less present or absent in current material.',
    },
    {
      key:   'pressure_increased',
      label: 'Pressure increased',
      desc:  'A pressure absent or low in earlier material has become more prominent or acute.',
    },
    {
      key:   'capability_gained',
      label: 'Capability gained',
      desc:  'A skill absent or thin at baseline is now evidenced across multiple entries.',
    },
    {
      key:   'capability_lost',
      label: 'Capability lost or degraded',
      desc:  'A skill present at baseline or in earlier entries has stopped appearing or is breaking under conditions where it previously held.',
    },
    {
      key:   'direction_clarified',
      label: 'Direction clarified',
      desc:  'Direction was absent or vague at baseline and is now stated with specificity.',
    },
    {
      key:   'direction_lost',
      label: 'Direction lost',
      desc:  'Direction was present at baseline and has stopped appearing in current entries.',
    },
    {
      key:   'load_shifted',
      label: 'Load shifted',
      desc:  'The composition or level of load has changed — not just described differently.',
    },
    {
      key:   'stuck_to_moving',
      label: 'Stuck to moving',
      desc:  'A non-movement pattern has broken. Evidenced by new action in an area that was previously only described.',
    },
    {
      key:   'moving_to_stuck',
      label: 'Moving to stuck',
      desc:  'Movement that was present has stopped. The area has returned to description without action.',
    },
    {
      key:   'pattern_broken',
      label: 'Pattern broken',
      desc:  'A recurring pattern has not appeared in the current period despite conditions that previously triggered it.',
    },
  ],


  // ── Detection Rules ───────────────────────────────────────

  detectionRules: {
    twoStatesRequired:
      'A state change requires evidence of both the prior state and the current state. One state alone is not a change — it may be emergence or gap.',
    evidenceBased:
      'Both states must be evidenced by entry material. Stated belief about change ("I am different now") does not confirm a state change. Behaviour does.',
    separationRequired:
      'The two states must be separated by a meaningful period. Adjacent entries describing different moods are not a state change.',
    directionNotMood:
      'Mood shift is not state change. Feeling better is not the same as a pressure reducing. Feeling worse is not the same as a capability degrading.',
    baselineAnchor:
      'Where a baseline exists, it is the reference point for the prior state. Later entries are the current state. Behaviour 02 feeds this.',
    absenceAsChange:
      'A pattern that was present and has stopped appearing may be a state change — but must meet the minimum separation threshold and not simply be a gap in entries.',
  },


  // ── Minimum Separation ────────────────────────────────────

  minimumSeparationDays: 7,  // Override per deployment.
                              // Prior and current state must be at least
                              // this many days apart to qualify as a change.


  // ── Change Confidence ─────────────────────────────────────

  changeConfidence: [
    {
      key:   'asserted',
      label: 'Asserted only',
      desc:  'Person states a change has occurred. No behavioural evidence yet.',
    },
    {
      key:   'emerging',
      label: 'Emerging',
      desc:  'One piece of behavioural evidence for the new state. Not yet confirmed.',
    },
    {
      key:   'evidenced',
      label: 'Evidenced',
      desc:  'Multiple independent entries support the new state. Change is readable.',
    },
    {
      key:   'confirmed',
      label: 'Confirmed',
      desc:  'New state has held across a meaningful period including conditions that previously triggered the old state.',
    },
  ],


  // ── What This Prevents ────────────────────────────────────

  prevents: [
    'Mistaking mood shift for genuine change.',
    'Missing real change because it does not look like the old pattern.',
    'Treating stated change as evidenced change.',
    'Missing deterioration because the overall tone is positive.',
    'Conflating recurrence with the absence of change.',
  ],


  // ── Failure Modes ─────────────────────────────────────────

  failureModes: [
    'Prior state not reliably established — change is measured from nothing.',
    'Separation threshold too short — adjacent mood shifts read as state change.',
    'Stated change treated as confirmed without behavioural evidence.',
    'Deterioration missed because entries are sparse in the current period.',
    'Pattern broken vs pattern not yet triggered — false positive change read.',
  ],


  // ── Boundary ──────────────────────────────────────────────

  boundary:
    'State change detection reads the material — not the person\'s character or trajectory. A detected change is a map reading, not a verdict on whether the person has "really changed." Confirmation requires time and evidence, not assertion.',


  // ── Test Cases ────────────────────────────────────────────

  testCases: [
    {
      id:       'SCD-01',
      input:    '"I am a different person now." No behavioural evidence.',
      expected: 'Asserted change only. Not evidenced.',
    },
    {
      id:       'SCD-02',
      input:    'Baseline shows financial pressure. Three recent entries show no financial mention and a payment arrangement in place.',
      expected: 'Evidenced state change — pressure reduced.',
    },
    {
      id:       'SCD-03',
      input:    '"I felt better this week." No change in described behaviour.',
      expected: 'Mood shift. Not state change.',
    },
    {
      id:       'SCD-04',
      input:    'Skill present at baseline. Absent from last four entries. No relevant conditions described.',
      expected: 'Possible capability degradation — confirm with more material.',
    },
    {
      id:       'SCD-05',
      input:    'Pattern triggered in previous three periods. Current period shows same conditions but pattern did not trigger.',
      expected: 'Possible pattern break — emerging change, not yet confirmed.',
    },
  ],

};
