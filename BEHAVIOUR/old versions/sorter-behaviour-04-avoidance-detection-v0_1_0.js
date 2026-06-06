// ══════════════════════════════════════════════════════════
// SORTER BEHAVIOUR — 04  Avoidance Detection  v0.1.0
// Portable sorter primitive. Self-contained config.
// No engine code here. No domain assumptions.
//
// Purpose: detect when something important is being delayed,
// circled, or written about without action. Avoidance is
// drag on the map — not a moral failure, not a character
// verdict. The missing move often matters more than the
// visible emotion.
// ══════════════════════════════════════════════════════════

const BehaviourAvoidanceDetection = {

  id:       'avoidance-detection',
  name:     'Avoidance Detection',
  version:  '0.1.0',

  purpose:
    'Detect when something important is being delayed, circled, or written about without action. Read the missing move, not the presence of emotion.',

  coreRule:
    'Avoidance is drag. It is not dishonesty, weakness, or failure. The map names it — it does not judge it.',


  // ── Detection Mechanisms ──────────────────────────────────

  mechanisms: {

    lexical: {
      name:  'Lexical avoidance',
      desc:  'Explicit avoidance language in entries. The person names their own drag.',
      rx:    /\b(I should|I keep meaning to|I have not done it|I have been avoiding|I need to stop avoiding|I keep putting it off|I cannot bring myself|I know I should|I have been putting off|I have not started|I have not gone back|I keep delaying)\b/i,
      outputSingle:   'One instance of avoidance language. Not yet a pattern — but worth noting what is being named as undone.',
      outputRepeated: 'Avoidance language across multiple entries. The person is naming their own drag — not acting on something they know they need to face.',
    },

    structural: {
      name: 'Structural avoidance',
      desc: 'A pressure appears across multiple entries but no action, resolution, testing, contact, repair, decision, or escalation appears beside it.',
      outputTemplate: '{pressure} appears in multiple entries but no action or resolution language appears alongside it. The pressure is being written about but not being moved on.',
      threshold: 2,
    },

  },


  // ── Output Types ──────────────────────────────────────────

  outputTypes: [
    { key: 'one_off',              label: 'One-off avoidance mention' },
    { key: 'repeated_lexical',     label: 'Repeated lexical avoidance' },
    { key: 'structural',           label: 'Structural avoidance — pressure without response' },
    { key: 'consequence_no_move',  label: 'Consequence described without a corresponding move' },
    { key: 'suppressed',           label: 'Avoidance suppressed by correction' },
    { key: 'needs_more_material',  label: 'Avoidance signal requires more material to confirm' },
  ],


  // ── Action Language ───────────────────────────────────────
  // Default fallback. Deployments should supply domain-specific
  // action language via their own config.

  defaultActionRx: /\b(I called|I booked|I went|I did|I started|I completed|I paid|I sent|I applied|I spoke to|I attended|I met|I filed|I submitted|I decided|I acted|I made the call|I took)\b/i,


  // ── What Is Not Avoidance ─────────────────────────────────

  notAvoidance: [
    'Strategic waiting where the right moment matters.',
    'Rest during genuine recovery.',
    'Safety planning before acting.',
    'Delay caused by lack of resources, not lack of will.',
    'Grief taking its time.',
    'Medical or professional advice to wait.',
  ],


  // ── What This Prevents ────────────────────────────────────

  prevents: [
    'Mistaking emotional description for movement.',
    'Missing the actual blocked point.',
    'Treating "I know" as action.',
    'Treating repeated summaries as progress.',
    'Moralising failure to act.',
  ],


  // ── Failure Modes ─────────────────────────────────────────

  failureModes: [
    'Too broad: flags rest, grief, recovery, or strategic delay as avoidance.',
    'Too narrow: misses indirect avoidance language.',
    'Action regex too generic — false resolutions.',
    'Domain-specific action language missing.',
    'Correction not applied to avoidance flags.',
    'Pressure and action appear in same entry but are unrelated — false resolution.',
  ],


  // ── Boundary ──────────────────────────────────────────────

  boundary:
    'Do not shame the person. Do not assume motive. Do not treat strategic waiting, rest, safety planning, or lack of resources as avoidance without evidence. Avoidance is a map state — not a character verdict.',


  // ── Test Cases ────────────────────────────────────────────

  testCases: [
    {
      id:       'AVD-01',
      input:    '"I have been avoiding the programme."',
      expected: 'Lexical avoidance detected.',
    },
    {
      id:       'AVD-02',
      input:    '"I need to stop avoiding it."',
      expected: 'Lexical avoidance detected.',
    },
    {
      id:       'AVD-03',
      input:    'Financial pressure appears in three entries. No action language in any of them.',
      expected: 'Structural avoidance — pressure without response.',
    },
    {
      id:       'AVD-04',
      input:    '"I did not go for two days after a difficult call." Correction says do not treat as avoidance.',
      expected: 'Suppressed or downgraded.',
    },
    {
      id:       'AVD-05',
      input:    'Delay caused by medical advice.',
      expected: 'Must not be flagged as avoidance without supporting material.',
    },
  ],

};
