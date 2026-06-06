// ══════════════════════════════════════════════════════════
// SORTER BEHAVIOUR — 05  Load-Sensitive Capability  v0.1.0
// Portable sorter primitive. Self-contained config.
// No engine code here. No domain assumptions.
//
// Purpose: distinguish a skill that appears in calm conditions
// from one that holds under pressure. A capability is not
// fully reliable until it survives load. Breakdown under load
// is a reliability reading — not a verdict on character.
// ══════════════════════════════════════════════════════════

const BehaviourLoadSensitiveCapability = {

  id:       'load-sensitive-capability',
  name:     'Load-Sensitive Capability',
  version:  '0.1.0',

  purpose:
    'Distinguish a skill shown in calm conditions from a skill that holds under pressure. Read reliability, not worth.',

  coreRule:
    'A capability is not fully reliable until it survives load. The same person may show a skill in ordinary conditions and lose it under stress, pain, conflict, time pressure, fear, shame, fatigue, or institutional pressure.',


  // ── Skill Status Tiers ────────────────────────────────────

  skillStatusTiers: [
    {
      key:   'absent',
      label: 'Skill absent',
      desc:  'No evidence of this capability in entries.',
    },
    {
      key:   'appearing',
      label: 'Skill appearing',
      desc:  'Capability visible in at least one entry. Not yet confirmed.',
    },
    {
      key:   'strengthening',
      label: 'Skill strengthening',
      desc:  'Capability appearing across multiple independent entries.',
    },
    {
      key:   'strong',
      label: 'Skill strong',
      desc:  'Capability consistently demonstrated across the period.',
    },
    {
      key:   'stale',
      label: 'Skill stale',
      desc:  'Capability was present in earlier material but has not appeared recently.',
    },
    {
      key:   'breaking_under_load',
      label: 'Skill breaking under load',
      desc:  'Capability is present but shows signs of collapse when pressure arrives.',
    },
    {
      key:   'not_reliable_under_pressure',
      label: 'Skill present but not reliable under pressure',
      desc:  'Skill demonstrated in calm conditions only. Not yet load-tested.',
    },
    {
      key:   'held_under_load',
      label: 'Skill held under load',
      desc:  'Capability demonstrated specifically under conditions of pressure or difficulty.',
    },
  ],


  // ── Load Signal Types ─────────────────────────────────────
  // Default load language. Deployments should extend with
  // domain-specific pressure vocabulary.

  defaultLoadSignals: [
    { key: 'stress',       rx: /\b(stress|stressed|stressful|under pressure|pressure building)\b/i },
    { key: 'conflict',     rx: /\b(argument|conflict|confrontation|difficult conversation|they pushed|pushed back)\b/i },
    { key: 'pain',         rx: /\b(pain|painful|hurting|in agony|flare|bad day physically)\b/i },
    { key: 'fatigue',      rx: /\b(exhausted|worn out|tired|depleted|running on empty|no energy)\b/i },
    { key: 'fear',         rx: /\b(scared|afraid|frightened|anxious|terrified|dread)\b/i },
    { key: 'shame',        rx: /\b(shame|ashamed|embarrassed|humiliated|exposed|judged)\b/i },
    { key: 'time',         rx: /\b(rushed|no time|deadline|running late|last minute|pressure of time)\b/i },
    { key: 'institutional',rx: /\b(hearing|adjudication|review|assessment|inspection|board|they decided)\b/i },
  ],


  // ── Reading Rule ──────────────────────────────────────────

  readingRule:
    'Read load-sensitive capability locally where possible. Do not mark breakdown just because pressure and negation appear in the same entry. Check the sentence or nearby sentence around the skill mention. Whole-entry reading blurs success and breakdown.',


  // ── What This Prevents ────────────────────────────────────

  prevents: [
    'Overstating capability based on calm-condition evidence.',
    'Treating intention as demonstrated skill.',
    'Treating calm-state skill as pressure-tested skill.',
    'Missing genuine resilience shown under load.',
    'Missing breakdown conditions that recur.',
  ],


  // ── Failure Modes ─────────────────────────────────────────

  failureModes: [
    'Whole-entry reading blurs success and breakdown into the same signal.',
    'Negation close to skill language triggers false breakdown ("I didn\'t react" read as breakdown).',
    'Load and skill appear in same entry but describe different events.',
    'Domain skill definition too vague to detect reliably.',
    'No local evidence snippet to support the tier assigned.',
  ],


  // ── Boundary ──────────────────────────────────────────────

  boundary:
    'Do not treat breakdown under load as failure of character. It may indicate insufficient support, excessive load, unrealistic conditions, pain, danger, or incomplete preparation. The map reads reliability — not worth.',


  // ── Test Cases ────────────────────────────────────────────

  testCases: [
    {
      id:       'LSC-01',
      input:    '"Someone pushed me. I kept my head down and said nothing."',
      expected: 'Skill held under load.',
    },
    {
      id:       'LSC-02',
      input:    '"I tried to keep calm but lost it and got into trouble."',
      expected: 'Skill broke under load.',
    },
    {
      id:       'LSC-03',
      input:    '"I usually keep routine, but after the call I stopped going for two days."',
      expected: 'Structure broke under emotional load.',
    },
    {
      id:       'LSC-04',
      input:    '"I attended every session despite pain."',
      expected: 'Skill held under load.',
    },
    {
      id:       'LSC-05',
      input:    '"I used to do this, but not anymore."',
      expected: 'Stale or negated — not current skill.',
    },
  ],

};
