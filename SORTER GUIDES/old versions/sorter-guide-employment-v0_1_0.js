// ══════════════════════════════════════════════════════════
// SORTER GUIDE — Employment  v0.1.0
// Steering layer. Self-contained. No engine code here.
// Attach with: SorterSpine.attachGuide(GuideEmployment);
//
// v0.1.0 — initial build.
//   gaps, skills, contradictions, directionPatterns,
//   pressureSignals, steer block.
// ══════════════════════════════════════════════════════════

const GuideEmployment = {

  id:      'guide-employment',
  version: '0.1.0',
  type:    'sector',
  parent:  null,
  purpose: 'Steer sorter behaviours toward employment conditions — job search activity, workplace difficulty, career direction, and the gap between stated effort and described action.',
  sector:  'employment',

  sectorNotes: {
    distinctivePressures: [
      'Job search that produces no responses — activity without result.',
      'Financial pressure from unemployment making honest reflection harder.',
      'Mismatch between what the person is pursuing and what they are qualified or positioned to get.',
      'Workplace difficulty — conflict, performance management, or marginalisation.',
      'Skills or experience gap the person has not yet named.',
      'Benefit or support claim as structural constraint on employment timing.',
      'Health, caring, or personal circumstance limiting what is available.',
      'Confidence damage from rejection or performance feedback.',
    ],
    distinctiveMovement: [
      'Application submitted.',
      'Interview attended.',
      'Contact made with a relevant person or organisation.',
      'Skills gap named and addressed.',
      'CV or application materials updated.',
      'Role or sector decision made.',
      'Support or advice sought.',
      'Workplace concern raised formally.',
      'Training or qualification pursued.',
      'Reference or recommendation obtained.',
    ],
    distinctiveGaps: [
      'Target role or sector not stated — searching without direction.',
      'Application activity not described — how many, to what, with what result.',
      'Skills or experience gap not named.',
      'Workplace difficulty not described — only the emotional impact.',
      'Financial runway not mentioned — how long before the pressure becomes critical.',
    ],
    outputAudience:  'Individual, employment support worker, career adviser, or case manager.',
    outputRegister:  'Direct. Non-judgemental. Activity-focused. Reads what has been done, not what has been felt.',
  },


  // ── Gaps ─────────────────────────────────────────────────

  gaps: [
    {
      key:    'target_role_or_sector',
      name:   'Target role or sector',
      rx:     /\b(I want to work as|I am looking for|I am applying for|the role I want|my target|the sector I|the type of work|what I am going for|the position|I want a job in|I am trying to get)\b/i,
      reason: 'Without a stated target role or sector the map cannot assess whether activity is directed or scattered. Searching without direction is a different picture from searching in a defined area that is not responding.',
    },
    {
      key:    'application_activity',
      name:   'Application activity — volume and result',
      rx:     /\b(I applied|I submitted|the application|I sent|I have applied to|how many|I have had|interviews|rejections|no response|I have not heard|they came back|I got through)\b/i,
      reason: 'Without described application activity the map cannot distinguish between someone who is searching actively without result and someone who is avoiding applications while describing the search. Volume and result are both required.',
    },
    {
      key:    'skills_or_experience_gap',
      name:   'Skills or experience gap',
      rx:     /\b(I do not have|I lack|I need more|I am not qualified|my experience is|the gap is|I need to develop|I am missing|the requirement is|I do not meet|I am not yet|I need to learn)\b/i,
      reason: 'Without a named skills or experience gap the map cannot assess whether the search difficulty is a positioning issue, a targeting issue, or an activity issue. The gap type determines the useful next move.',
    },
    {
      key:    'workplace_situation',
      name:   'Current workplace situation — if employed',
      rx:     /\b(at work|my manager|the workplace|the team|I am currently|I have a job|my current role|performance|I am on a|warning|the review|the situation at work|my employer)\b/i,
      reason: 'If currently employed, the workplace situation — including any performance management, conflict, or risk of job loss — is the most immediate material. Without it described the map is reading the search in isolation from the actual employment picture.',
    },
    {
      key:    'financial_runway',
      name:   'Financial runway or urgency',
      rx:     /\b(I have until|I can last|my savings|my redundancy|the benefit|I need to find|the pressure is|financially I|I cannot wait|the money runs out|by when I need|urgency)\b/i,
      reason: 'Financial pressure shapes what can be considered and how quickly. Without a sense of timeline the map cannot assess whether the search approach is appropriate for the urgency.',
    },
  ],


  // ── Skills ───────────────────────────────────────────────

  skills: [
    {
      key:              'directed_search',
      name:             'Targeting the search rather than applying broadly',
      rx:               /\b(I am focusing on|I am targeting|I am only applying to|I narrowed|I chose this sector|I am going for|I identified|this type of role|I selected|I am concentrating on)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:            'Defining a target role or sector and directing activity toward it — making the search legible and adjustable when it does not produce results.',
      breaks:           'Anxiety about finding anything causes a broad scatter approach — many applications to varied roles — producing low return rates and no clear signal about what is and is not working.',
    },
    {
      key:              'activity_over_intent',
      name:             'Describing activity rather than intention',
      rx:               /\b(I applied|I submitted|I contacted|I sent|I reached out|I attended|I completed|I updated|I spoke to|I went to|I followed up|I called)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:            'Naming what was done — application submitted, contact made, interview attended — rather than what is planned or intended. Activity is the only material the map can read.',
      breaks:           'Avoidance of actual applications while describing a busy search causes the map to read intent as activity. Planned actions presented as if they have happened are invisible gaps.',
    },
    {
      key:              'rejection_reading',
      name:             'Reading rejection as information rather than verdict',
      rx:               /\b(the rejection showed|I can see what|I learned from|the pattern is|it tells me|the feedback was|I adjusted|I can see why|I understand now|the signal is|the reason might be)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:            'Treating rejection or no-response as signal — about targeting, positioning, or materials — rather than as verdict on the person.',
      breaks:           'Accumulated rejection collapses into confidence damage. The search becomes harder to sustain and harder to read analytically. At this point activity often reduces without the person naming the reduction.',
    },
    {
      key:              'gap_acknowledgement',
      name:             'Naming the skills or experience gap directly',
      rx:               /\b(I do not have enough|I lack the experience|I need more|the gap is|I am missing|I am not yet qualified|I need to develop|I have to be honest|I fall short on|I need to build)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:            'Naming the actual gap between current position and target role — making it a workable problem rather than an unspoken obstacle.',
      breaks:           'Pride or fear of confirmation causes the gap to go unnamed. The search continues as if the gap does not exist, producing results the person cannot interpret.',
    },
    {
      key:              'workplace_escalation',
      name:             'Raising workplace difficulty rather than absorbing it',
      rx:               /\b(I raised|I told HR|I spoke to my manager|I reported|I made a formal|I documented|I escalated|I put it in writing|I raised a grievance|I have evidence)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:            'Naming workplace difficulty — conflict, performance management, or unfair treatment — through available formal channels rather than absorbing it silently.',
      breaks:           'Fear of consequences or belief that raising it will make things worse causes the difficulty to continue unaddressed. The map reads the situation worsening while the person describes managing it.',
    },
  ],


  // ── Contradictions ────────────────────────────────────────

  contradictions: [
    {
      a:    /\b(I am searching actively|I am applying|I am putting myself out there|I am really trying|I am on it|I am doing a lot|I am working hard on this)\b/i,
      b:    /\b(I have not applied|I have not sent|I did not submit|I have not contacted|I meant to|I plan to|I am going to|I have not heard back because I have not)\b/i,
      text: 'Described active searching and absent application activity both appear. Feeling like the search is active and having submitted applications are different states. The map reads the described activity, not the stated effort.',
    },
    {
      a:    /\b(I am qualified for|I have the right experience|I meet the requirements|I am suitable for|I have what they need|I have enough|I have the background)\b/i,
      b:    /\b(they did not respond|I keep getting rejected|no one is coming back|the feedback was|they said I did not|I am not getting through|they are looking for)\b/i,
      text: 'Stated qualification confidence and consistent rejection or silence both appear. The gap between self-assessed suitability and market response is significant. The map must hold both without resolving either.',
    },
    {
      a:    /\b(I am happy to take anything|I will apply to everything|any job is fine|I am not fussy|anything to get back|I will do anything)\b/i,
      b:    /\b(I turned down|I did not go to|I did not apply to|I decided not to|that was not right for me|I did not like|I am not doing|I would not consider)\b/i,
      text: 'Stated willingness to take any role and described selectivity both appear. The stated flexibility and the described behaviour are not matching. The actual criteria — unstated — are shaping the search more than the stated openness suggests.',
    },
  ],


  // ── Direction Patterns ────────────────────────────────────

  directionPatterns: [
    { rx: /apply|application|submit|CV|cover letter|job board|recruiter/i, label: 'toward active job search activity' },
    { rx: /interview|assessment|test|phone screen|meet the team/i,         label: 'toward interview or selection process' },
    { rx: /training|qualification|course|develop|skill|certificate/i,      label: 'toward skills development or qualification' },
    { rx: /network|contact|reach out|referral|connection|introduction/i,   label: 'toward networking or relationship-based search' },
    { rx: /workplace|manager|HR|performance|review|warning|grievance/i,    label: 'toward workplace situation management' },
    { rx: /direction|sector|role|target|focus|decide|I want to|career/i,   label: 'toward career direction decision' },
  ],


  // ── Pressure Signals ─────────────────────────────────────

  pressureSignals: [
    { key: 'activity_avoidance',     rx: /\b(I meant to apply|I was going to|I planned to|I will do it tomorrow|I have not got round to|I keep meaning to|I have been meaning to|I should have)\b/i,               label: 'application avoidance — intent substituting for action' },
    { key: 'rejection_accumulation', rx: /\b(another rejection|again|same again|no one wants|nothing is working|I keep failing|I am getting nowhere|it is pointless|why bother|nothing comes of it)\b/i,          label: 'rejection accumulation — confidence and activity risk' },
    { key: 'financial_urgency',      rx: /\b(I need to find something|I cannot wait|money is running out|I have to|the pressure is building|I have run out|I am desperate|I need income now)\b/i,                 label: 'financial urgency — quality of decision-making at risk' },
    { key: 'direction_absence',      rx: /\b(I do not know what I want|I have no idea|anything will do|I am not sure what|I have not decided|I do not have a plan|I am not sure where to go)\b/i,                label: 'direction absent — scattered search likely' },
    { key: 'confidence_damage',      rx: /\b(I am not good enough|I do not have what it takes|I am not qualified for anything|no one wants me|I am useless at|I cannot do|I am behind everyone|I have nothing)\b/i, label: 'confidence damage — activity likely reducing' },
    { key: 'workplace_worsening',    rx: /\b(it is getting worse at work|my manager|they are pushing me out|I am on a warning|the atmosphere|it is hostile|I dread going in|I cannot continue)\b/i,             label: 'workplace situation worsening — urgency may be higher than stated' },
  ],


  // ── Steer block ───────────────────────────────────────────

  steer: {

    'open-gap-discipline': {
      priorityGaps: [
        'target_role_or_sector',
        'application_activity',
        'skills_or_experience_gap',
        'workplace_situation',
        'financial_runway',
      ],
      absenceRules: {
        activityNotIntent:
          'Planned or intended actions are not application activity. The map requires described action — submitted, attended, contacted.',
        noSuitabilityJudgement:
          'Do not assess whether the person is right for a role. Read whether the search is directed and whether activity is occurring.',
        workplacePriority:
          'If workplace difficulty is present alongside a job search, read the workplace situation first — it may be the urgent material.',
      },
    },

    'confidence-calibration': {
      sectorNote:
        'Employment maps frequently overstate search activity because intent feels like action. Described busyness without named applications, contacts, or interviews should cap confidence at partial. Financial urgency can cause optimistic framing that the map should not take at face value.',
    },

    'state-change-detection': {
      minimumSeparationDays: 14,
      watchFor: [
        'Application volume increasing or decreasing.',
        'Interview success rate changing.',
        'Direction becoming clearer or remaining undefined.',
        'Confidence language shifting — more or less self-critical.',
        'Financial urgency language increasing.',
        'Workplace situation worsening without formal action.',
      ],
    },

    'competing-priorities': {
      costSignals: [
        { key: 'income_vs_fit',       rx: /\b(I need money but|I do not want to but I have to|it is not what I want but|I will take it to survive|I need the income but)\b/i },
        { key: 'search_vs_wellbeing', rx: /\b(the search is exhausting|I cannot face another|I need a break from|it is affecting my health|the rejection is taking|I am burning out)\b/i },
        { key: 'stay_vs_leave',       rx: /\b(I should leave but|I cannot afford to leave|I want to leave but|I am stuck here|I need to stay for|the risk of leaving)\b/i },
      ],
    },

    'movement-non-movement-reading': {
      movementEvidence: [
        'Application submitted to a named role or type.',
        'Interview attended.',
        'Contact made with relevant person or organisation.',
        'CV or materials updated.',
        'Skills gap named and addressed.',
        'Direction decision made.',
        'Workplace concern raised formally.',
        'Support or advice sought and acted on.',
      ],
      defaultStuckRx: /\b(no progress|nothing is happening|I keep trying but|no responses|same result|still searching|still no job|still applying|I have not moved|I have been applying for months|nothing)\b/i,
    },

    'load-sensitive-capability': {
      defaultLoadSignals: [
        { key: 'financial_pressure',    rx: /\b(I cannot wait|I need money now|desperate|the money has run out|I have to take anything|the bills|I am behind|I cannot afford)\b/i },
        { key: 'rejection_damage',      rx: /\b(I give up|what is the point|no one wants me|I have stopped|it is pointless|I am exhausted by|I cannot face another|I have lost confidence)\b/i },
        { key: 'workplace_crisis',      rx: /\b(I am about to be sacked|they are pushing me out|I cannot go back|I cannot face it|I am on final warning|it is affecting my health)\b/i },
        { key: 'caring_or_health',      rx: /\b(I am caring for|my health|I cannot work full time|my disability|I have limitations|my condition|I cannot manage)\b/i },
      ],
    },

    'meta-reading': {
      sectorNote:
        'Activity optimism is a significant performance pattern in employment material. People describe themselves as actively searching when application activity is low or absent. Intent presented as activity is the primary signal. Absence of named applications, contacts, or interviews alongside descriptions of busy searching is the key performance indicator here.',
      performanceSignals: [
        {
          key: 'intent_as_activity',
          rx:  /\b(I am going to|I plan to|I will|I am thinking about applying|I have been meaning to|I am looking into|I intend to|I am about to)\b/i,
        },
      ],
    },

  },

};
