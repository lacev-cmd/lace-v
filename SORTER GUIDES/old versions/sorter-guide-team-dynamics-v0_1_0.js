// ══════════════════════════════════════════════════════════
// SORTER GUIDE — Team Dynamics  v0.1.0
// First-ring sector guide.
// Attach with: SorterSpine.attachGuide(GuideTeamDynamics);
//
// Sector: group and team patterns — where the signal lives
// in what is happening between people, not just inside
// one of them.
//
// Individual signal reading applied to a collective.
// The team has its own patterns, pressures, and avoidances
// that are not reducible to any one member.
// ══════════════════════════════════════════════════════════

const GuideTeamDynamics = {

  id:      'guide-team-dynamics',
  version: '0.1.0',
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

  steer: {

    'avoidance-detection': {
      defaultActionRx: /\b(we said|we named|we decided|we addressed|we raised|we discussed|we agreed|the team said|we brought it up|we had the conversation|we acknowledged|we committed)\b/i,
      notAvoidance: [
        'Waiting for the right moment to raise something in a fragile group.',
        'Not surfacing a conflict while a critical delivery is in progress.',
        'Strategic sequencing of difficult conversations.',
        'Letting something settle before addressing it.',
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
        { key: 'external',     rx: /\b(organisation|leadership|they decided|above us|from the top|the pressure from|we have been told|external demand|the business)\b/i },
        { key: 'conflict',     rx: /\b(tension|not speaking|falling out|the argument|the incident|what happened|it is awkward|it has not been addressed|the elephant)\b/i },
        { key: 'overload',     rx: /\b(too much|understaffed|we cannot|running on empty|the team is exhausted|no capacity|we are stretched|one person doing|carrying it alone)\b/i },
        { key: 'safety',       rx: /\b(cannot say|do not feel safe|what will happen if|they will not like|I will be|punished|dismissed|it is not safe to|no one speaks up)\b/i },
        { key: 'change',       rx: /\b(restructure|redundancy|new leadership|everything is changing|uncertainty|we do not know|the future of the team|what happens to us)\b/i },
      ],
    },

    'contradiction-holding': {
      detectionShape: {
        text: 'Stated team values or culture and described team behaviour are not matching. The map reads the gap between what the group says it is and what the entries describe it doing.',
      },
    },

    'competing-priorities': {
      costSignals: [
        { key: 'team_cost', rx: /\b(the team is suffering|we are not working well|trust has broken|it is affecting the work|the dynamic is broken|we are not functioning|we have lost|it is costing us)\b/i },
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

    'open-gap-discipline': {
      priorityGaps: [
        'what_group_is_not_saying',
        'accountability_location',
        'stated_vs_enacted_values',
        'load_distribution',
        'direction',
      ],
    },

  },

};
