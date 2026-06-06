// ══════════════════════════════════════════════════════════
// SORTER GUIDE — Team Dynamics  v0.3.0
// First-ring sector guide.
// Attach with: SorterSpine.attachGuide(GuideTeamDynamics);
//
// v0.3.0 — steer block completed:
//   — open-gap-discipline.absenceRules added.
//   — confidence-calibration added.
//   — state-change-detection added.
//   — competing-priorities expanded.
//   — meta-reading added.
//   — avoidance-detection.notAvoidance expanded.
//   All v0.2.0 fields unchanged.
// ══════════════════════════════════════════════════════════

const GuideTeamDynamics = {

  id:      'guide-team-dynamics',
  version: '0.3.0',
  type:    'sector',
  parent:  null,
  purpose: 'Steer sorter behaviours toward team and group conditions — collective pattern, shared pressure, distributed avoidance, and the gap between stated team culture and described team behaviour.',
  sector:  'team-dynamics',

  sectorNotes: {
    distinctivePressures: [
      'Conflict not named in the group — circling around it.',
      'One person carrying what belongs to the group.',
      'Accountability distributed so widely it belongs to no one.',
      'Psychological safety absent — people performing rather than contributing.',
      'A decision the group is avoiding.',
      'Historical pattern the group keeps repeating.',
      'Power imbalance affecting what can be said.',
      'External pressure the team is absorbing without naming.',
    ],
    distinctiveMovement: [
      'The group names something that was not being named.',
      'A decision made collectively and owned.',
      'Accountability placed specifically rather than generally.',
      'A conflict surfaced rather than managed around.',
      'Someone speaks to something no one else would say.',
      'A pattern named to the group rather than privately.',
      'Load redistributed.',
      'A historical pattern interrupted.',
    ],
    distinctiveGaps: [
      'What the group is not saying — the absence in the room.',
      'Where accountability actually sits.',
      'Whether the stated team values are visible in described team behaviour.',
      'What the external pressure is and how the team is carrying it.',
      'Whether one person is carrying group load.',
    ],
    outputAudience:  'Team lead, team member, organisational consultant, or facilitator.',
    outputRegister:  'Systemic. Non-partisan. Reads the group pattern — not individuals within it. Evidence-based.',
  },


  // ── Gaps ─────────────────────────────────────────────────

  gaps: [
    {
      key:    'what_group_is_not_saying',
      name:   'What the group is not saying',
      rx:     /\b(no one will|we do not talk about|it is not said|it goes unsaid|the elephant|we avoid|we do not name|everyone knows but|it is understood|we pretend)\b/i,
      reason: 'The most important thing in a team map is often the absence — the thing that is present in behaviour but absent from conversation. Without it named, the map can only read the surface.',
    },
    {
      key:    'accountability_location',
      name:   'Where accountability actually sits',
      rx:     /\b(who is responsible|whose job|who owns|it falls to|no one has taken|accountability|who decides|who is supposed to|whose call|the decision is)\b/i,
      reason: 'Distributed accountability is often no accountability. Without naming where it actually sits the map cannot read whether movement is real or whether the same person is carrying everything.',
    },
    {
      key:    'stated_vs_enacted_values',
      name:   'Stated values vs described behaviour',
      rx:     /\b(we say we|our values|the culture|we believe in|we are supposed to|what we stand for|trust|psychological safety|open|honest|collaborative)\b/i,
      reason: 'The gap between what a team says it is and what it does is often the primary signal. Without described behaviour the map cannot assess whether stated values are real or performed.',
    },
    {
      key:    'load_distribution',
      name:   'Load distribution',
      rx:     /\b(I am carrying|they are carrying|one person|it falls to me|I end up|no one else|I am the only|the team is not|it is all on)\b/i,
      reason: 'Whether load is distributed across the team or concentrated on one person is a critical read. Concentrated load is unsustainable and often invisible to the group.',
    },
    {
      key:    'direction',
      name:   'Stated team direction',
      rx:     /\b(we are trying to|the team goal|what we are working toward|where we want to get to|the objective|our direction|what we need to achieve|the outcome)\b/i,
      reason: 'Without a stated team direction the map cannot assess whether current activity is aligned or whether the group is moving in different directions simultaneously.',
    },
  ],


  // ── Skills ───────────────────────────────────────────────

  skills: [
    {
      key:              'naming_in_the_room',
      name:             'Naming things in the room',
      rx:               /\b(we named|I raised|I said|we brought up|I surfaced|I named|I pointed out|we acknowledged|I said in the meeting|I raised with the team|I told the group)\b/i,
      loadSensitive:    true,
      isStructureSkill: true,
      works:            'Saying in the group what needs to be said — surfacing what is present but unspoken.',
      breaks:           'Power dynamics, fear of consequences, or group norm of smooth surfaces prevents honest naming — the group performs cohesion while the real pattern continues.',
    },
    {
      key:              'collective_decision',
      name:             'Making collective decisions',
      rx:               /\b(we decided|we agreed|the team agreed|we committed|collectively|together we|we owned|we took|we chose|the decision was made)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:            'Making decisions that the whole group owns rather than decisions that are handed down or avoided.',
      breaks:           'Decision avoidance, lack of authority, or conflict causes decisions to be deferred — the same question keeps returning without resolution.',
    },
    {
      key:              'redistributing_load',
      name:             'Redistributing load',
      rx:               /\b(we shared|I asked for help|the load was|others took on|we redistributed|I passed|I handed over|the team took|we spread|it moved from)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'Actively moving load from where it is concentrated to where it belongs.',
      breaks:           'The concentrated load stays where it is because naming it feels like complaint or accusation — the person carrying it keeps going until something breaks.',
    },
    {
      key:              'interrupting_patterns',
      name:             'Interrupting recurring patterns',
      rx:               /\b(we changed|we tried something different|we broke the pattern|we did it differently|we stopped|we chose not to|we resisted|we interrupted|this time we)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'Recognising a recurring pattern and doing something different rather than repeating it.',
      breaks:           'The pattern reasserts because it is familiar and the new response requires sustained effort the group does not yet have.',
    },
  ],


  // ── Contradictions ────────────────────────────────────────

  contradictions: [
    {
      a:    /\b(we are a good team|the team is strong|we work well together|we have a good culture|high trust|psychological safety|open communication)\b/i,
      b:    /\b(no one will say|same argument|same pattern|conflict|not speaking|it goes unsaid|the elephant|we avoid|same dynamic|nothing changes)\b/i,
      text: 'Stated team culture and described team behaviour are not matching. Both can be believed simultaneously — the stated culture may be aspirational rather than operational. The map reads what is described happening, not what is said to be the case.',
    },
    {
      a:    /\b(we are all aligned|everyone agrees|we are on the same page|full buy-in|the team is committed|we all want the same)\b/i,
      b:    /\b(no one said|it was not raised|we avoided|the decision has not been made|we keep coming back|same disagreement|it has not been resolved|the same issue)\b/i,
      text: 'Stated alignment and described disagreement or avoidance both appear. Stated agreement and genuine agreement are different things — especially when the stakes of disagreeing feel high. The map holds both without deciding which is true.',
    },
  ],


  // ── Direction Patterns ────────────────────────────────────

  directionPatterns: [
    { rx: /high performing|performance|deliver|results|output|execution/i,     label: 'toward higher performance' },
    { rx: /trust|safety|open|honest|culture|the kind of team|how we work/i,    label: 'toward a healthier team culture' },
    { rx: /resolve|fix the dynamic|address|clear the air|work it out/i,        label: 'toward resolving the current difficulty' },
    { rx: /restructure|change|rebuild|new way|different approach|transform/i,  label: 'toward structural change' },
    { rx: /survive|get through|manage|hold together|keep going|stable/i,       label: 'toward stability through a difficult period' },
  ],


  // ── Steer block ───────────────────────────────────────────

  steer: {

    'open-gap-discipline': {
      priorityGaps: [
        'what_group_is_not_saying',
        'accountability_location',
        'stated_vs_enacted_values',
        'load_distribution',
        'direction',
      ],
      absenceRules: {
        groupNotIndividual:
          'This guide reads the group pattern, not individual performance within it. Do not surface individual failures. Surface the system that produces them.',
        statedCultureIsNotEvidence:
          'Stated team values, stated culture, and stated alignment are not evidence of those things being operational. Described behaviour is the evidence. The gap between them is often the primary read.',
        absenceIsSignal:
          'In team material, what is not named is as significant as what is. A topic that appears repeatedly in pressures but never in direct conversation is the gap the map should surface first.',
        distributedAccountabilityIsNone:
          'If accountability is described as shared, collective, or everyone\'s responsibility without a named owner, treat it as absent. Surface the missing owner.',
      },
    },

    'confidence-calibration': {
      sectorNote:
        'Team maps are written from one person\'s position within the group. The map has no access to the group as a whole — only to what one person describes. This is a structural limit. Confidence should reflect described group behaviour, not stated group culture. High stated culture confidence combined with low described behaviour evidence should cap at partial. Entries that describe only the writer\'s own actions without group-level signals provide thin confidence for group-level reads.',
    },

    'state-change-detection': {
      minimumSeparationDays: 14,
      watchFor: [
        'Recurring conflict pattern resolving, escalating, or changing form.',
        'Load distribution shifting — same person still carrying, or load moving.',
        'A decision that was being avoided getting made or continuing to be deferred.',
        'Psychological safety signals improving or deteriorating — more or less being named.',
        'External pressure increasing or being absorbed and named.',
        'A pattern that appeared resolved reasserting.',
        'Team direction becoming clearer or more fragmented.',
      ],
    },

    'avoidance-detection': {
      defaultActionRx: /\b(we said|we named|we decided|we addressed|we raised|we discussed|we agreed|the team said|we brought it up|we had the conversation|we acknowledged|we committed)\b/i,
      notAvoidance: [
        'Waiting for the right moment to raise something in a fragile group — timing is a real variable in group work.',
        'Not surfacing a conflict while a critical delivery is in progress — sequencing is not avoidance.',
        'Strategic sequencing of difficult conversations where a considered order is described.',
        'Letting something settle before addressing it when the group is in acute stress.',
        'Not naming something privately that has been named to the group — private silence after public naming is not avoidance.',
        'An individual choosing not to carry group work alone — refusing to absorb group load is not avoidance.',
        'Deferring a low-stakes decision while a higher-stakes one is active.',
        'A team in a restructure or uncertainty period not resolving long-term questions that genuinely cannot be resolved yet.',
      ],
      avoidanceSignals: [
        'The same topic present in every entry but never described as raised in the group — the map is reading around a persistent unnamed thing.',
        'Decision deferred across multiple entries without a named reason for the deferral.',
        'Conflict described as understood or acknowledged but no described action toward it.',
        'Accountability described as shared without a named owner — the distribution is the avoidance.',
      ],
    },

    'movement-non-movement-reading': {
      movementEvidence: [
        'Something unspoken named in the group.',
        'Decision made and owned collectively.',
        'Accountability placed specifically.',
        'Conflict surfaced rather than avoided.',
        'Load redistributed with acknowledgement.',
        'External pressure named and discussed.',
        'A pattern named to the group.',
        'A historical loop interrupted.',
      ],
      defaultStuckRx: /\b(same meeting|same conversation|same argument|nothing changes|we keep coming back|it always goes the same way|no one will say it|we are going in circles|same dynamic|the same people|the usual pattern|nothing moves)\b/i,
    },

    'load-sensitive-capability': {
      defaultLoadSignals: [
        { key: 'external',  rx: /\b(organisation|leadership|they decided|above us|from the top|the pressure from|we have been told|external demand|the business)\b/i },
        { key: 'conflict',  rx: /\b(tension|not speaking|falling out|the argument|the incident|what happened|it is awkward|it has not been addressed|the elephant)\b/i },
        { key: 'overload',  rx: /\b(too much|understaffed|we cannot|running on empty|the team is exhausted|no capacity|we are stretched|one person doing|carrying it alone)\b/i },
        { key: 'safety',    rx: /\b(cannot say|do not feel safe|what will happen if|they will not like|I will be|punished|dismissed|it is not safe to|no one speaks up)\b/i },
        { key: 'change',    rx: /\b(restructure|redundancy|new leadership|everything is changing|uncertainty|we do not know|the future of the team|what happens to us)\b/i },
      ],
    },

    'contradiction-holding': {
      detectionShape: {
        text: 'Stated team values or culture and described team behaviour are not matching. The map reads the gap between what the group says it is and what the entries describe it doing.',
      },
    },

    'competing-priorities': {
      costSignals: [
        { key: 'team_vs_delivery',    rx: /\b(the team is suffering|we are not working well|trust has broken|it is affecting the work|the dynamic is broken|we are not functioning|we have lost|it is costing us)\b/i },
        { key: 'honesty_vs_cohesion', rx: /\b(I did not want to damage|I kept the peace|it would cause too much|I did not want to break|I held back because|saying it would|it is not worth the disruption)\b/i },
        { key: 'individual_vs_group', rx: /\b(I am carrying this alone|it is not my job but|no one else will|if I do not do it|I have to pick it up|my own work is suffering|I cannot keep)\b/i },
        { key: 'short_vs_long',       rx: /\b(just get through this|once this is over|when the pressure reduces|after this sprint|it will settle|not now but eventually|deal with it later)\b/i },
        { key: 'safety_vs_truth',     rx: /\b(if I say it|I am not safe to|they will not like|it will be used against|I will be seen as|the cost of saying|I cannot afford to)\b/i },
      ],
    },

    'connections-across-time': {
      minimumSeparationDays: 14,
      watchPatterns: [
        'recurring conflict pattern',
        'same decision being deferred',
        'same person carrying the load',
        'same dynamic reasserting after apparent resolution',
        'external pressure cycles',
      ],
    },

    'meta-reading': {
      sectorNote:
        'Team performance language is the primary performance pattern in this sector. People describe the team in terms of its stated culture, values, and aspirations rather than its described behaviour. "We have a strong culture of trust" combined with entries showing no one will name the conflict is the key pattern. The map reads the described events, not the stated culture. A map full of culture language and thin on described group behaviour should not exceed partial confidence.',
      performanceSignals: [
        {
          key: 'culture_performance',
          rx:  /\b(we have a culture of|we believe in|our values are|we are a team that|psychological safety|high trust|we are open|we are honest|we are aligned)\b/i,
        },
        {
          key: 'cohesion_performance',
          rx:  /\b(we are good really|the team is fine|we have our issues but|it is not that bad|we will sort it out|we always come through|we are fundamentally strong)\b/i,
        },
      ],
    },

  },

};
