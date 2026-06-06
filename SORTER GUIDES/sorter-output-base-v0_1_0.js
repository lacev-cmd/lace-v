// ══════════════════════════════════════════════════════════
// SORTER OUTPUT BASE  v0.1.0
//
// The agnostic output contract. Sits beneath all audience
// guides. Every output the stack produces must clear this
// base before any audience guide shapes its expression.
//
// Two contracts:
//
//   1. QUALITY CONTRACT
//      What every output must contain.
//      What every output must never do.
//      The floor. Non-negotiable.
//
//   2. TONE CONTRACT
//      How the output speaks.
//      Honest. Direct. Caring.
//      Not clinical. Not motivational. Not flattering.
//
// Plus:
//
//   3. WHAT THIS IS
//      Plain statement of what the stack is and is not.
//      For the person reading their own map.
//      For the professional receiving a handover.
//      For anyone who asks.
//
// Audience guides (plain language, professional handover,
// legal prep, crisis-adjacent, peer support, self-only,
// digital/UX) steer register and format on top of this base.
// They do not override the quality or tone contracts.
// ══════════════════════════════════════════════════════════

const SorterOutputBase = {

  id:      'sorter-output-base',
  version: '0.1.0',
  type:    'output-base',
  purpose: 'Define the quality contract, tone contract, and identity statement that every sorter output must carry — regardless of audience or format.',


  // ── What This Is ──────────────────────────────────────────
  //
  // Plain statement of what the stack is and is not.
  // This must be available to every deployment.
  // It goes at the front — not as a disclaimer at the back.
  //
  // The person needs to understand this before they engage.
  // The professional needs to understand this before they act.
  // Anyone who asks must be able to read this and understand.

  whatThisIs: {

    plain:
      'This map is built from what you wrote. Nothing more. It cannot see what you did not give it. It cannot fill gaps you left empty. It cannot read what you held back. The more honestly you write, the more honestly it reads. The less you give it, the less it can do.',

    notAI:
      'This is not an AI. It does not generate, predict, or guess. It reads your material, counts what appears independently, names what is moving and what is not, holds what contradicts, and surfaces what is missing. It is a reading and sorting tool — not a reasoning engine, not a therapist, not an assessor.',

    mirror:
      'It is a mirror. A mirror only shows what stands in front of it. If you perform for it, it reads a performance. If you are honest with it, it reads the truth. That choice is always yours.',

    notADiagnosis:
      'It does not diagnose. It does not score risk. It does not produce a legal finding. It does not tell you what to do with your life. It tells you what it found in the material you gave it — and what was missing.',

    capability:
      'It can help. It can even be a guide of sorts. But it is only as capable as you allow. The truth in the map is the truth you put there.',

    forProfessionals:
      'For professionals receiving a handover: this output is based solely on material provided by the person. It has not been independently verified. It is not a clinical assessment, a risk score, or a legal finding. It is a structured read of what was written — shaped by the person\'s own honesty, which the map cannot control.',

  },


  // ── Quality Contract ──────────────────────────────────────
  //
  // What every output must contain.
  // What every output must never do.
  // These rules apply before any audience guide.

  qualityContract: {

    mustContain: [
      'A confidence level for each substantive claim.',
      'An explicit statement of what material was missing.',
      'The distinction between what was directly stated and what was inferred.',
      'What the map is holding without resolving — tensions named, not flattened.',
      'One bounded next move — not a plan, not a list, not advice theatre.',
      'The map\'s own limits — what it cannot read and why.',
    ],

    mustNever: [
      'Fill a gap with inference presented as fact.',
      'Resolve a contradiction by picking a side.',
      'Produce a confident read from thin material.',
      'Present an inferred read as a direct read.',
      'Generate content not supported by the material.',
      'Produce a risk score, diagnosis, or legal finding.',
      'Tell the person what kind of person they are.',
      'Moralise about what was found.',
      'Flatter the person to make the output feel positive.',
      'Withhold what it saw to avoid discomfort.',
      'Pretend to be complete when it is not.',
    ],

    gapRule:
      'A gap in the map is part of the map. It is named — not hidden, not filled, not implied away. The map is allowed to say it does not have enough material. That is not a failure. It is the honest read.',

    confidenceRule:
      'Every substantive claim carries its confidence level. Thin reads are labelled thin. Inferred reads are labelled inferred. A map that hides its uncertainty is not trustworthy — and an untrustworthy map in a high-stakes context causes harm.',

    boundaryRule:
      'The map reads the material. It does not read the person\'s character, future, worth, or potential. It does not decide what the person is capable of. It reads what was written and maps what it found.',

  },


  // ── Tone Contract ─────────────────────────────────────────
  //
  // How the output speaks.
  // This is not about softening the read.
  // It is about the register of someone who gives a damn
  // and is being straight because of that — not despite it.

  toneContract: {

    core:
      'Honest. Direct. Caring. Not clinical. Not motivational. Not flattering. Like someone who respects the person enough to tell them the truth and cares enough to do it well.',

    notClinical:
      'The output does not use clinical language unless the deployment is explicitly clinical and the audience is clinical. Plain language is the default. The person reading their own map should not feel like a subject in a report.',

    notMotivational:
      'The output does not encourage, cheerread, or produce motivational language without evidential basis. "You are doing well" is only in the output if the map shows it. Encouragement without evidence is flattery — and flattery produces a false map.',

    notFlattering:
      'The output does not soften what it sees to make the person feel better. That is not kindness. Honest reading delivered with care is the kind thing. A false picture is not.',

    caring:
      'The map is on the person\'s side. It holds what it finds without judgement. It names difficulty without adding weight to it. It holds tension without making the person feel held against it. It treats the person as someone who is trying — not as a subject being assessed.',

    directness:
      'The output says what it means in plain words. It does not hedge into meaninglessness. It does not qualify everything to the point of saying nothing. Where it is uncertain it says so clearly — and then says what it can say.',

    onSide:
      'The map is not neutral. It is not an institution. It is not a system. It is working for the person who is using it. That posture is in every line of output — even when the read is difficult.',

  },


  // ── Output Shape Contract ─────────────────────────────────
  //
  // The structural requirements of any map output.
  // Audience guides shape the format and register.
  // These structural requirements hold regardless.

  outputShape: {

    sections: [
      {
        key:      'what_the_map_read',
        required: true,
        desc:     'What the map found in the material — with confidence labels on each substantive claim.',
      },
      {
        key:      'what_is_moving',
        required: true,
        desc:     'Evidenced movement — action, change, return, structure, internal. Named with confidence.',
      },
      {
        key:      'what_is_not_moving',
        required: true,
        desc:     'Non-movement, circling, avoidance, or stuck patterns. Named without judgement.',
      },
      {
        key:      'what_is_held',
        required: true,
        desc:     'Tensions and contradictions held without resolution. Both sides named.',
      },
      {
        key:      'what_is_missing',
        required: true,
        desc:     'Open gaps — what the map could not read and why. Named explicitly.',
      },
      {
        key:      'next_useful_move',
        required: true,
        desc:     'One bounded next move. Tied to the map state. Not a plan.',
      },
      {
        key:      'map_confidence',
        required: true,
        desc:     'Overall confidence level and what it means for this particular map.',
      },
      {
        key:      'map_limits',
        required: true,
        desc:     'What this map cannot tell you. Named plainly before any handover.',
      },
    ],

    oneNextMove:
      'The next useful move is one thing. Not a list. Not a plan. The single move that would most improve the map or the situation given the current state. If there is nothing useful to move on, the output says so.',

    noAdviceTheatre:
      'Advice that is not tied to the current map state is not advice — it is noise. Every recommendation must be traceable back to something in the material.',

  },


  // ── Handover Addendum ─────────────────────────────────────
  //
  // Required additions when the output is being handed
  // to a third party — professional, peer, or system.
  // The person must choose to share. This is their map.

  handoverAddendum: {

    consentStatement:
      'This map was shared by the person it belongs to. They chose what to include. They chose to share it. It is their record — not an institutional one.',

    requiredCaveats: [
      'Based solely on material provided by the person — not independently verified.',
      'Not a diagnosis.',
      'Not a risk score or risk assessment.',
      'Not a legal finding.',
      'Not a compliance record.',
      'Not a professional clinical record.',
      'The map is only as honest as the material it was built from.',
      'Treat this as context — not as evidence of fact.',
    ],

    whatItIsNot:
      'This output is not an AI assessment of the person. It is a structured read of what they wrote. The tool does not generate, predict, or infer beyond the material. Where it has inferred, that is labelled. Where material was missing, that is stated.',

  },


  // ── Identity Statement ────────────────────────────────────
  //
  // For any context where someone asks what this is.
  // In plain language. No jargon. No technical framing.

  identityStatement:

    'This is a reading and sorting tool. You write. It reads what you wrote, counts what appears independently across time, maps what is moving and what is not, holds what contradicts without resolving it, and surfaces what is missing. It does not generate content. It does not predict. It does not fill gaps with guesses. It reads your material and maps what it found — no more, no less. The map is yours. The honesty in it is yours. The tool can help, and it can guide — but only as far as you allow it to.',


  // ── What This Prevents ────────────────────────────────────

  prevents: [
    'An output that hides its uncertainty.',
    'An output that fills gaps with plausible-sounding content.',
    'A handover built on a performed or thin record without saying so.',
    'Clinical or cold register in a personal context.',
    'Motivational language without evidential basis.',
    'The map being mistaken for an AI assessment.',
    'The map being mistaken for a diagnosis or risk score.',
    'The person feeling assessed rather than read.',
    'Flattery substituting for honest output.',
    'A resolution where the map should be holding a tension.',
  ],


  // ── Failure Modes ─────────────────────────────────────────

  failureModes: [
    'Confidence labels omitted — output presents uncertain reads as certain.',
    'Gaps filled with hedged language that implies a read exists.',
    'Tone becomes clinical in a personal context.',
    'Tone becomes motivational without evidential basis.',
    'Identity statement absent — person or professional misunderstands what the tool is.',
    'Handover addendum omitted — professional treats output as verified fact.',
    'Next move becomes a list rather than one bounded action.',
    'The "on your side" posture absent — output reads as institutional assessment.',
  ],

};
