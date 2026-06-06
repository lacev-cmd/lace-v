// ══════════════════════════════════════════════════════════
// SORTER GUIDE — Game / Narrative  v0.1.0
// Steering layer. Self-contained. No engine code here.
// Attach with: SorterSpine.attachGuide(GuideGameNarrative);
//
// Domain: adaptive storytelling, NPC behaviour, faction
// dynamics, player-driven narrative.
//
// The adaptive components (faction-memory, hidden-agenda,
// dramatic-timing, trust-drift, sly-planning,
// consequence-propagation) provide the mechanics.
// This guide steers the sorter behaviours toward reading
// the state of a narrative — what is moving, what is
// held, what is building, what has been triggered.
//
// Movement here is not task completion.
// It is tension, revelation, relationship shift, and
// consequence chain activation.
//
// A hidden agenda surfacing is movement.
// A faction relationship degrading is movement.
// Player trust dropping below the threshold is movement.
// Dramatic silence before a reveal is not stuck — it is
// held tension, and the map must read it as such.
// ══════════════════════════════════════════════════════════

const GuideGameNarrative = {

  id:      'guide-game-narrative',
  version: '0.1.0',
  type:    'sector',
  parent:  null,
  purpose: 'Steer sorter behaviours toward narrative state reading — tension, revelation, faction dynamics, player intent, and consequence chains. Re-calibrate movement vs stuck for a domain where held tension is active, not inert.',
  sector:  'game-narrative',

  sectorNotes: {
    distinctivePressures: [
      'Player intent not yet visible — the map cannot read direction without it.',
      'Faction loyalties unresolved — competing pulls on NPC behaviour.',
      'Hidden agenda approaching surface — timing of reveal is load-sensitive.',
      'Trust level dropping without visible recovery signal.',
      'Consequence chain activated but player has not yet encountered the downstream effect.',
      'Dramatic tension held too long — player disengagement risk.',
      'Contradictory signals from player behaviour — stated intent and actual choices diverging.',
      'NPC memory gap — the entity has lost track of a prior commitment.',
    ],
    distinctiveMovement: [
      'Hidden agenda surfaced — partial or full reveal.',
      'Faction relationship shifted — alliance formed, strained, or broken.',
      'Player trust level changed in response to NPC action.',
      'Consequence chain triggered — a prior decision has reached its downstream effect.',
      'New information given to player that changes the map.',
      'NPC internal state changed — motivation updated, loyalty shifted.',
      'Player intent named explicitly or demonstrated by repeated choice.',
      'Dramatic beat landed — tension resolved or escalated to next level.',
      'Constraint lifted — something previously blocked is now possible.',
      'A contradiction in the narrative named and held rather than papered over.',
    ],
    distinctiveGaps: [
      'Player intent not named — what the player is actually trying to achieve.',
      'Faction relationships not mapped — who is aligned with whom and why.',
      'Hidden agendas not listed — what each NPC is concealing and from whom.',
      'Consequence chains not traced — what decisions are still in motion.',
      'Trust baseline not established — where each relationship started.',
      'Dramatic arc not visible — what this story is building toward.',
    ],
    outputAudience:  'Game designer, narrative director, NPC behaviour system, or adaptive storytelling engine.',
    outputRegister:  'Precise about state. Non-prescriptive about story. Evidence-bound about what has happened. Does not invent motivation — reads what is in the material.',
  },


  // ── Gaps ─────────────────────────────────────────────────

  gaps: [
    {
      key:    'player_intent',
      name:   'Player intent',
      rx:     /\b(player wants|player is trying|player goal|player objective|what the player|player direction|player is building toward|player has chosen|player keeps|player pattern)\b/i,
      reason: 'Without player intent named the map cannot read whether NPC behaviour is serving or obstructing the narrative. Intent is the baseline everything else is measured against.',
    },
    {
      key:    'faction_map',
      name:   'Faction relationships',
      rx:     /\b(faction|alliance|aligned with|loyal to|hostile to|neutral|faction relationship|standing with|reputation with|the factions|who controls|who is with|who is against)\b/i,
      reason: 'Faction relationships are the structural map of the world. Without them the sorter cannot read whether NPC actions are coherent, contradictory, or consequential.',
    },
    {
      key:    'hidden_agendas',
      name:   'Hidden agendas defined',
      rx:     /\b(hidden agenda|secret goal|concealing|does not reveal|privately wants|what they are not saying|true motivation|ulterior|what they are really after|the real reason)\b/i,
      reason: 'Hidden agendas drive NPC behaviour in ways that appear inconsistent without them named. Without them mapped the sorter reads contradiction where there is only concealment.',
    },
    {
      key:    'consequence_chains',
      name:   'Active consequence chains',
      rx:     /\b(consequence|downstream|because of the decision|ripple|what that means for|what follows from|the result of|triggered by|set in motion|what was started|the chain)\b/i,
      reason: 'Decisions already made are still in motion. Without consequence chains traced the map cannot read what is moving and what is held.',
    },
    {
      key:    'trust_baseline',
      name:   'Trust baselines established',
      rx:     /\b(trust level|trust baseline|where the relationship started|initial standing|they trusted|they did not trust|starting point|before the|when they first met|the relationship began)\b/i,
      reason: 'Trust movement is only readable against a baseline. Without it named the map cannot tell whether a relationship is improving, degrading, or holding.',
    },
    {
      key:    'dramatic_arc',
      name:   'Dramatic arc',
      rx:     /\b(arc|story arc|building toward|what this is about|the theme|what this story|the narrative direction|where this is going|what the climax|the turning point|what changes)\b/i,
      reason: 'Without the dramatic arc named the map cannot distinguish held tension from stuck narrative, or deliberate pacing from loss of momentum.',
    },
  ],


  // ── Skills ───────────────────────────────────────────────

  skills: [
    {
      key:              'agenda_concealment',
      name:             'Holding a hidden agenda under pressure',
      rx:               /\b(did not reveal|kept it hidden|deflected|changed the subject|said enough|gave nothing away|maintained the cover|stayed in character|did not break|held the secret|concealed|the player does not know)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:            'NPC maintains concealment consistently — answers questions without lying outright, deflects without revealing, stays in character under interrogation.',
      breaks:           'High trust from player, extreme pressure, or conflicting faction loyalties causes partial or full agenda surfacing before the designed reveal moment.',
    },
    {
      key:              'faction_consistency',
      name:             'Behaving consistently with faction loyalty',
      rx:               /\b(loyal to|acting for|serving|reporting back|in line with|consistent with faction|faction interest|the faction wants|faction directive|faction alignment)\b/i,
      loadSensitive:    true,
      isStructureSkill: true,
      works:            'NPC behaviour is legible as factionally motivated — player can eventually read the pattern even if they do not yet know the faction.',
      breaks:           'Conflicting faction loyalties, player trust that exceeds faction loyalty threshold, or unresolved dramatic arc creates inconsistent behaviour that reads as broken rather than complex.',
    },
    {
      key:              'trust_management',
      name:             'Managing trust level across interactions',
      rx:               /\b(trust increased|trust decreased|player trusts|they trust me|I have their trust|trust level|building trust|losing trust|earned trust|trust dropped|trust rose|reliable|consistent|they believe)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'NPC actions and stated positions are consistent enough that player trust moves in a readable direction — either building or eroding in ways that feel earned.',
      breaks:           'Contradiction between NPC stated position and action, or between faction directive and player-facing behaviour, collapses trust in ways that feel arbitrary rather than consequential.',
    },
    {
      key:              'consequence_tracking',
      name:             'Tracking and surfacing consequences',
      rx:               /\b(remember when|because of what happened|as a result of|the decision you made|that changed|you did|the last time|I have not forgotten|what you chose|that is why|the consequence of)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'Prior decisions surface naturally in NPC behaviour — the world remembers what the player did and the NPC reflects it without breaking the fourth wall.',
      breaks:           'Memory gap — NPC fails to connect a prior decision to current behaviour, making the world feel amnesiac and consequence-free.',
    },
    {
      key:              'dramatic_timing',
      name:             'Timing reveals and escalations',
      rx:               /\b(not yet|not the right moment|holding back|waiting for|when the time comes|the reveal|the moment|building to|when they are ready|the right time|before the climax|after the|timing)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:            'Information, reveals, and escalations arrive when they create maximum narrative effect — not too early (defusing tension) or too late (losing the player).',
      breaks:           'Pressure from player progress, pacing miscalculation, or consequence chains arriving out of order causes reveals to land flat or too abruptly.',
    },
  ],


  // ── Contradictions ────────────────────────────────────────

  contradictions: [
    {
      a:    /\b(I am on your side|I want to help you|you can trust me|I am with you|your ally|I am working for you|your interests matter)\b/i,
      b:    /\b(hidden agenda|reporting to|faction directive|concealing|the player does not know|ulterior|what they are really after|secretly)\b/i,
      text: 'Stated alliance and a hidden agenda that works against the player both appear. This is not a flaw — it is the core dramatic tension of a duplicitous NPC. The map holds both. The question is whether the contradiction has been designed into the arc or has arrived by accident.',
    },
    {
      a:    /\b(faction loyalty|loyal to the faction|serving the faction|faction directive|faction interest|the faction comes first)\b/i,
      b:    /\b(player trust|I trust the player|the player has earned|I believe the player|I am choosing the player|player over faction|defecting|turning)\b/i,
      text: 'Faction loyalty and player trust pulling in opposite directions both appear. This is the threshold moment — faction vs relationship. The map is reading an active tension, not a contradiction to be resolved. Whether this is the designed turning point or an unplanned drift matters.',
    },
    {
      a:    /\b(the player does not know|player is unaware|concealed from player|player has not discovered|player trust is high|player believes)\b/i,
      b:    /\b(player has figured out|player suspects|player asked directly|player chose not to trust|player is testing|player already knows|player has evidence)\b/i,
      text: 'Player ignorance assumed and player awareness signals both appear. The NPC may be operating on an outdated model of what the player knows. This is a state change — the concealment dynamic may already be broken.',
    },
    {
      a:    /\b(held tension|building toward|not yet|the arc is|this is deliberate|pacing|the reveal is coming|setting up)\b/i,
      b:    /\b(player disengaged|player skipped|player lost interest|player frustrated|player confused|nothing is happening|too slow|what is the point|player abandoned)\b/i,
      text: 'Deliberate narrative holding and player disengagement signals both appear. Held tension and stalled narrative look identical from the outside. The map cannot decide which this is — but it can surface that both signals are present at the same time.',
    },
  ],


  // ── Direction Patterns ────────────────────────────────────

  directionPatterns: [
    { rx: /reveal|surface|expose|the truth comes out|the player discovers/i,         label: 'toward revelation' },
    { rx: /alliance|trust|align|join forces|player and NPC|working together/i,       label: 'toward alliance' },
    { rx: /betrayal|turning point|defection|the faction|choosing sides/i,            label: 'toward betrayal or faction break' },
    { rx: /consequence|reckoning|what was set in motion|downstream|the result/i,     label: 'toward consequence arrival' },
    { rx: /climax|final|the end|resolution|what it was all building toward/i,        label: 'toward dramatic resolution' },
    { rx: /player is steering away|avoiding|not engaging|side-stepping|ignoring/i,  label: 'player avoiding the designed arc' },
  ],


  // ── Pressure Signals ─────────────────────────────────────

  pressureSignals: [
    { key: 'trust_critical',    rx: /\b(trust is gone|trust has collapsed|player does not trust|trust level critical|they do not believe|I have lost them|player is hostile)\b/i,                              label: 'trust at critical level' },
    { key: 'agenda_surface',    rx: /\b(agenda surfacing|player suspects|almost revealed|close to breaking|nearly slipped|the cover is|beginning to show|player is close to knowing)\b/i,                     label: 'hidden agenda near surface' },
    { key: 'faction_conflict',  rx: /\b(faction conflict|loyalty torn|two factions|caught between|serving two|cannot serve both|faction pressure|forced to choose)\b/i,                                        label: 'faction loyalty conflict active' },
    { key: 'consequence_due',   rx: /\b(consequence is due|the decision is catching up|downstream arriving|what was started|ripple reaching|the chain has reached|cannot be undone now)\b/i,                  label: 'consequence chain arriving' },
    { key: 'player_drift',      rx: /\b(player is drifting|player off arc|player ignoring|player going their own way|player not engaging|player has stopped|player lost interest)\b/i,                         label: 'player drifting from arc' },
    { key: 'memory_gap',        rx: /\b(forgot|does not remember|memory gap|inconsistent|contradicted themselves|said something different|earlier they said|that is not what|contradiction in the record)\b/i, label: 'NPC memory gap' },
  ],


  steer: {

    'avoidance-detection': {
      notAvoidance: [
        'NPC withholding information as part of a designed reveal.',
        'Held tension before a dramatic beat.',
        'Faction loyalty preventing disclosure.',
        'Trust threshold not yet met for information release.',
        'Consequence chain not yet reached its trigger point.',
        'Deliberate pacing between dramatic beats.',
      ],
    },

    'movement-non-movement-reading': {
      movementEvidence: [
        'Hidden agenda partially or fully surfaced.',
        'Faction relationship changed — alliance, strain, or break.',
        'Player trust level moved in either direction.',
        'Consequence chain triggered or arrived.',
        'New information delivered to player.',
        'NPC internal state updated — motivation or loyalty shifted.',
        'Dramatic beat landed.',
        'Player intent named or demonstrated.',
        'Constraint lifted — something previously blocked now accessible.',
      ],
      stuckEvidence: [
        'No faction relationship change across multiple interactions.',
        'Trust level static despite significant player actions.',
        'Hidden agenda unchanged and no reveal approaching.',
        'Consequence chains activated but no downstream effect visible.',
        'Player repeatedly attempting the same action without narrative response.',
        'Dramatic arc not advancing across extended play.',
      ],
    },

    'baseline-vs-live-material': {
      baselineFields: [
        'Initial faction relationships.',
        'Starting trust levels for each NPC.',
        'Hidden agendas at session start.',
        'Consequence chains already in motion.',
        'Player intent as established.',
        'Dramatic arc as designed.',
      ],
      liveFields: [
        'Current trust levels.',
        'Current faction standing.',
        'Agendas surfaced or still held.',
        'Consequence chains triggered.',
        'Player intent as demonstrated by recent choices.',
      ],
    },

    'contradiction-holding': {
      sectorNote: 'In narrative contexts, contradictions between NPC stated position and behaviour are often designed. The map holds them without resolving them — the question is whether the contradiction is serving the arc or breaking it.',
    },

    'open-gap-discipline': {
      sectorNote: 'Player intent is the most critical gap. Without it named, every other read is provisional. Do not infer player intent from a single choice — pattern of choices is required.',
    },

    'confidence-calibration': {
      sectorNote: 'Narrative state confidence is inherently lower than factual state confidence. Player intent is always inferred unless explicitly stated. Trust levels are approximations. Flag all narrative reads as provisional unless the pattern has repeated across three or more independent interactions.',
    },

    'next-useful-move': {
      sectorNote: 'The next useful move in a narrative context is usually: surface the gap that is blocking the arc, or name the contradiction that is stalling movement. It is not a story decision — it is a map decision.',
    },

  },

};
