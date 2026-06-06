// ══════════════════════════════════════════════════════════
// SORTER BEHAVIOUR — 15  External Constraint Reading  v0.1.0
// Portable sorter primitive. Self-contained config.
// No engine code here. No domain assumptions.
//
// Purpose: read the difference between won't and can't.
// Non-movement caused by something outside the person is
// not avoidance. It is blocked. The map must distinguish
// internal drag from external wall.
//
// Avoidance detection (Behaviour 04) reads what the person
// is not moving toward. This reads what is stopping them
// from the outside.
// ══════════════════════════════════════════════════════════

const BehaviourExternalConstraintReading = {

  id:       'external-constraint-reading',
  name:     'External Constraint Reading',
  version:  '0.1.0',

  purpose:
    'Distinguish non-movement caused by external constraint from non-movement caused by internal avoidance. A person who cannot move is in a different situation from a person who will not move.',

  coreRule:
    'Not all non-movement is avoidance. External constraints — systems, institutions, other people, resources, legal conditions, physical reality — can block movement regardless of the person\'s will. The map must read the source of the block, not just its presence.',


  // ── Constraint Types ──────────────────────────────────────

  constraintTypes: [
    {
      key:   'institutional',
      label: 'Institutional constraint',
      desc:  'A system, organisation, or process is the source of the block. The person cannot proceed until it moves.',
    },
    {
      key:   'legal',
      label: 'Legal constraint',
      desc:  'A legal condition, order, or requirement prevents or shapes what is possible.',
    },
    {
      key:   'resource',
      label: 'Resource constraint',
      desc:  'Absence of money, housing, ID, transport, childcare, or other material resource is the block.',
    },
    {
      key:   'other_person',
      label: 'Other person constraint',
      desc:  'Another person\'s action, decision, or refusal is blocking movement. Not within the person\'s control.',
    },
    {
      key:   'physical',
      label: 'Physical constraint',
      desc:  'Illness, disability, pain, or physical condition limits what is possible.',
    },
    {
      key:   'information',
      label: 'Information constraint',
      desc:  'The person cannot move because required information — a decision, a result, a date — has not arrived.',
    },
    {
      key:   'time',
      label: 'Time constraint',
      desc:  'A process, waiting period, or external schedule is the limiting factor — not the person\'s pace.',
    },
    {
      key:   'access',
      label: 'Access constraint',
      desc:  'The required service, resource, or person is not available or accessible in this context.',
    },
  ],


  // ── Detection Rules ───────────────────────────────────────

  detectionRules: {
    sourceFirst:
      'Before reading non-movement as avoidance, check for external constraint language. If present, the constraint is the primary read.',
    evidenceRequired:
      'An external constraint must be evidenced in the material — not assumed. "I cannot" alone is insufficient. The nature of the block should be describable.',
    avoidanceStillPossible:
      'External constraint does not rule out avoidance. A person can face a real external block and also be avoiding engaging with it. Both can be true — name both if present.',
    partialBlock:
      'Some constraints partially block movement rather than stopping it entirely. Name what is still possible alongside what is blocked.',
    changeable:
      'Note whether the constraint is changeable by the person\'s action or requires external change. This shapes the next useful move.',
  },


  // ── Default Constraint Language ───────────────────────────

  defaultConstraintRx: /\b(I am waiting for|they have not|the system|it has not been approved|no decision yet|I cannot get|there is no|the waiting list|they told me to wait|I do not have the|I cannot afford|I need them to|it depends on|I have not heard|they have not responded|it is out of my hands|I have no control over|I cannot do this without)\b/i,


  // ── What This Prevents ────────────────────────────────────

  prevents: [
    'Misreading blocked movement as avoidance.',
    'Producing a next move that requires what the person cannot access.',
    'Missing the systemic or institutional source of non-movement.',
    'Implying the person could move if they simply tried harder.',
    'Overlooking resource absence as a real constraint.',
  ],


  // ── Failure Modes ─────────────────────────────────────────

  failureModes: [
    'Constraint language too broad — flags strategic waiting as external block.',
    'External constraint used to explain all non-movement — avoidance missed.',
    'Constraint read as permanent when it may be temporary.',
    'Partial block missed — person can still move on some dimensions.',
    'No distinction between changeable and fixed constraints.',
  ],


  // ── Boundary ──────────────────────────────────────────────

  boundary:
    'This behaviour does not judge whether the constraint is legitimate or whether the person is using it accurately. It reads what the material describes as blocking. Where the constraint appears exaggerated or inconsistent with other material, that is a contradiction — Behaviour 06.',


  // ── Test Cases ────────────────────────────────────────────

  testCases: [
    {
      id:       'ECR-01',
      input:    '"I am still waiting for the housing decision. There is nothing I can do until it comes."',
      expected: 'Institutional constraint. Movement blocked pending external decision.',
    },
    {
      id:       'ECR-02',
      input:    '"I cannot apply without ID and I do not have ID yet."',
      expected: 'Resource constraint. Next move is ID acquisition, not the application.',
    },
    {
      id:       'ECR-03',
      input:    '"I keep saying I will call but I have not." No external block described.',
      expected: 'Not an external constraint. Read as avoidance — Behaviour 04.',
    },
    {
      id:       'ECR-04',
      input:    '"My solicitor has not responded. I cannot file without their input."',
      expected: 'Other person constraint. Partially changeable — escalation possible.',
    },
    {
      id:       'ECR-05',
      input:    '"I cannot work because of my health" and "I have not looked into any options."',
      expected: 'Physical constraint present. Possible avoidance also present. Name both.',
    },
  ],

};
