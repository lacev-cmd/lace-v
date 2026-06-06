// ══════════════════════════════════════════════════════════
// SORTER GUIDE — Re-entry  v0.3.0
// Steering layer. Self-contained. No engine code here.
// Attach with: SorterSpine.attachGuide(GuideReentry);
//
// Sector: post-incarceration reintegration.
//
// v0.3.0 — Australian vernacular extension:
//   — vernacularActionRx added: Australian idiomatic movement
//     language. "Smashed it." "Keeping my nose clean."
//     "Had a yarn." "Pulled up stumps." "Sorted it out."
//     Extends defaultActionRx — does not replace it.
//   — vernacularStuckRx added: Australian idiomatic stuck
//     and avoidance language. "Doing my head in."
//     "Going around in circles." "Binned it." "Cooked it."
//   — vernacularLoadRx added: Australian load language.
//     "Crook." "Flat out." "Running on empty." "Done in."
//   — vernacularHonestyRx added: honest engagement signals
//     in vernacular. "Not going to beat around the bush."
//     "Fair dinkum." "I have to be straight."
//   — vernacularPerformanceRx added: performance signals
//     in vernacular. "Sweet." "No dramas." "All good mate."
//     when used formulaically without difficulty context.
//
// All other steers unchanged from v0.2.0.
// ══════════════════════════════════════════════════════════

const GuideReentry = {

  id:      'guide-reentry',
  version: '0.3.0',
  type:    'sector',
  parent:  null,
  purpose: 'Steer sorter behaviours toward re-entry conditions, pressures, and movement signals.',
  sector:  're-entry',

  sectorNotes: {
    distinctivePressures: [
      'Housing instability immediately post-release.',
      'Licence and supervision conditions as structural constraints.',
      'Stigma and disclosure burden.',
      'Return to known high-risk environments or people.',
      'Family relationship damage or distance.',
      'Financial pressure — no ID, no bank account, no income.',
      'Institutional distrust built from prior experience.',
      'Substance use risk in transition period.',
    ],
    distinctiveMovement: [
      'Appointment attended.',
      'Reporting kept.',
      'Programme session completed.',
      'Accommodation secured or applied for.',
      'ID obtained or applied for.',
      'Employment contact made.',
      'Support worker met.',
      'Contact with family restored.',
      'Licence condition met.',
      'Trigger situation navigated without incident.',
      'Boundaries maintained with known risks.',
      'Substance use held or reduced.',
    ],
    distinctiveGaps: [
      'Current licence or order conditions not described.',
      'Housing status not described.',
      'Risk environment not named.',
      'Support network not visible.',
      'Direction — what the person is building toward — not stated.',
    ],
    outputAudience:  'Individual, support worker, probation officer, re-entry mentor, or case worker.',
    outputRegister:  'Honest. Non-moralising. Evidence-bound. No flattery. No risk-score language.',
  },

  steer: {

    'avoidance-detection': {
      defaultActionRx: /\b(
        I attended|I reported|I signed|I met with|I called|I went to|I completed|
        I submitted|I applied|I showed up|I kept the appointment|I made contact|
        I did the programme|I did not miss|I stayed away from|I avoided the area|
        I did not go back|
        smashed it|nailed it|knocked it over|got it done|sorted it out|pulled it off|
        kept my nose clean|stayed out of trouble|kept my head down|kept my distance|
        had a yarn with|caught up with my|reached out to|touched base with|
        fronted up|rocked up|turned up|showed face|put my hand up|
        got on top of|took care of it|dealt with it|handled it|
        pulled up stumps on the old|walked away from|gave it a wide berth
      )\b/ix,
      notAvoidance: [
        'Waiting for licence conditions to be clarified.',
        'Not contacting a victim as required by order.',
        'Delay caused by housing or ID not yet in place.',
        'Waiting for a support worker appointment.',
        'Strategic caution around known triggers or people.',
        'Not returning to a high-risk area on advice.',
      ],
    },

    'movement-non-movement-reading': {
      movementEvidence: [
        'Appointment attended.',
        'Reporting kept.',
        'Programme session completed.',
        'Accommodation secured or applied for.',
        'ID obtained or applied for.',
        'Employment contact made.',
        'Support worker met.',
        'Contact with family restored.',
        'Licence condition met.',
        'Trigger situation navigated without incident.',
        'Boundaries maintained with known risks.',
        'Substance use held or reduced.',
        'High-risk environment avoided.',
        'Honest disclosure made to supervisor.',
        'Smashed it / nailed it — completed something significant.',
        'Keeping nose clean — sustained clean behaviour.',
        'Had a yarn — meaningful conversation made.',
        'Fronted up — showed up when it was hard.',
      ],

      // ── Australian vernacular action language ─────────────
      // Extends the base action rx for Australian idiomatic movement.
      // These are movement signals the base rx would miss.

      vernacularActionRx: /\b(
        smashed it|nailed it|knocked it over|got it done|sorted it out|
        pulled it off|kept my nose clean|stayed out of trouble|
        kept my head down|had a yarn|caught up with|touched base|
        fronted up|rocked up|showed face|put my hand up|
        got on top of|took care of it|pulled up stumps|
        gave it a wide berth|walked away from the|
        did the right thing|stepped up|came good|
        got back on the horse|gave it a crack|gave it a go|
        made a fist of it|held my ground|stood my ground|
        kept it together|didn't muck it up|didn't stuff it up|
        didn't blow it|kept the faith|stayed the course|
        did my bit|pulled my weight|done my dash on the old|
        got back on track|back on the straight and narrow
      )\b/ix,


      // ── Australian vernacular stuck language ──────────────

      vernacularStuckRx: /\b(
        doing my head in|doing my block|driving me mad|driving me up the wall|
        going around in circles|spinning my wheels|getting nowhere fast|
        in a bit of a rut|stuck in a rut|same old same old|
        binned it|binned the|chucked it|chucked in|gave it away|couldn't be bothered|
        cooked it|stuffed it up|mucked it up|blew it|botched it|
        back to square one|back where I started|nothing to show for it|
        can't get a break|can't catch a break|can't get ahead|
        same mob|same crowd|back with the same crowd|
        can't shake it|can't get rid of it|can't get past it
      )\b/ix,

      defaultStuckRx: /\b(
        same situation|nothing has moved|still waiting|back inside|recalled|
        same place|I keep ending up|nothing changes|I always|every time|
        no progress|still no|I cannot get|same people|same area|same pattern|
        doing my head in|going around in circles|binned it|cooked it|
        stuffed it up|back to square one|same mob|can't catch a break
      )\b/ix,
    },

    'load-sensitive-capability': {
      defaultLoadSignals: [
        { key: 'housing',       rx: /\b(no address|sofa surfing|hostel|temporary|nowhere to go|housing problem|evicted|told to leave|no stable|couch surfing|doing it tough with housing)\b/i },
        { key: 'licence',       rx: /\b(licence|conditions|probation|parole|recalled|breach|warning|officer|supervision|I have to report|my conditions)\b/i },
        { key: 'stigma',        rx: /\b(record|disclosure|they found out|background check|I told them|they know|criminal record|DBS|they rejected me because|my past|they googled me)\b/i },
        { key: 'isolation',     rx: /\b(no one|alone|no support|no family|cut off|no contact|no friends|no one knows|I have nobody|by myself|on my own|no one to turn to)\b/i },
        { key: 'financial',     rx: /\b(no money|no ID|no bank account|benefits|waiting for|no income|I cannot pay|I have nothing|broke|skint|doing it tough|flat broke|not a cent)\b/i },
        { key: 'substance',     rx: /\b(craving|urge|I wanted to use|I nearly|temptation|I was offered|I was near|using again|I used|I drank|the pull|back on it|hit the gear|on the grog)\b/i },
        { key: 'environment',   rx: /\b(old area|old people|they contacted me|I ran into|I was near the old|I was with the same|they found me|the old mob|old crowd|old haunts|old stomping ground)\b/i },
      ],

      // ── Australian vernacular load language ───────────────

      vernacularLoadRx: /\b(
        crook|under the weather|not the best|feeling ordinary|feeling rough|
        flat out|run off my feet|stretched thin|done in|cooked|
        running on empty|burnt out|hit a wall|hitting a wall|
        doing it tough|doing it hard|doing it rough|having a rough trot|
        rough trot|bad trot|tough going|tough gig|hard yakka|
        at the end of my rope|at the end of my tether|
        not coping|can't cope|struggling badly|really struggling|
        falling apart|going under|barely keeping my head above water|
        not in a good place|in a dark place|pretty low|pretty rough
      )\b/ix,
    },

    'open-gap-discipline': {
      priorityGaps: [
        'accommodation',
        'licence_conditions',
        'support_worker',
        'direction',
        'load',
      ],
    },

    'connections-across-time': {
      minimumSeparationDays: 14,
      watchPatterns: [
        'return to known environments or people',
        'licence compliance',
        'substance use signals',
        'employment contact attempts',
        'housing instability',
        'trigger situation navigation',
        'family contact pattern',
        'old mob or old crowd contact',
        'old haunts or old area',
      ],
    },

    'confidence-calibration': {
      sectorNote:
        'Re-entry maps are frequently thin in the early period. A person navigating immediate post-release pressures may write briefly or intermittently. Thin material is expected and must not be inflated. Early map reads should explicitly acknowledge their limited window. Vernacular entries may also read as thin because action language is idiomatic — this is a regex limitation, not a movement limitation.',
      earlyPeriodThreshold: 21,
    },

    'state-change-detection': {
      minimumSeparationDays: 21,
      sectorNote:
        'Desistance is a genuine state change — but it requires sustained behavioural evidence across multiple periods including conditions that previously triggered the old pattern. Stated intention to change is not desistance. Mood improvement is not desistance.',
      watchFor: [
        'Pattern present in custody or pre-release not appearing post-release.',
        'Trigger situation present without the old response.',
        'New direction emerging with behavioural evidence.',
        'Support engagement sustained — not just initiated.',
        'Relationship repair with evidence of contact.',
        'Old crowd or old area navigated without incident across multiple periods.',
      ],
    },

    'competing-priorities': {
      costSignals: [
        { key: 'licence_vs_recovery',  rx: /\b(reporting|I have to see|my conditions require|supervision|probation|but also recovery|but I also need to|both the programme and)\b/i },
        { key: 'family_vs_safety',     rx: /\b(my family|my children|but they are risky|they are a trigger|I want to see them but|contact with family|but they use|but they are involved|the kids|my missus|my partner)\b/i },
        { key: 'employment_vs_order',  rx: /\b(work hours|shift|I cannot attend|it clashes with|the appointment|I cannot do both|work and reporting|employment and programme)\b/i },
        { key: 'housing_vs_risk',      rx: /\b(the only place|only option|the housing|old area|risky address|I have to go back|nowhere else|that is where|only place I can stay|old stomping ground)\b/i },
      ],
    },

    'external-constraint-reading': {
      defaultConstraintRx: /\b(
        I am waiting for|the hostel|the housing|my licence says|my conditions|
        I cannot until|I need approval|I have to wait for my officer|
        the system has not|they have not processed|my ID is not ready|
        I have not been cleared|I cannot work until|I cannot travel until|
        the order prevents|I am not allowed|restricted from|banned from|
        I need a letter from|waiting for the DWP|waiting for benefits|
        they told me I have to wait|I cannot apply without|
        waiting on Centrelink|Centrelink has not|waiting on the housing commission|
        the housing commission|waiting on community corrections|
        community corrections|parole board|waiting on the board|
        they haven't come back to me|still waiting to hear|
        out of my hands|nothing I can do until|have to wait and see
      )\b/ix,
      notAvoidance: [
        'Waiting for housing decision — genuine constraint.',
        'ID not yet obtained — genuine resource constraint.',
        'Licence condition preventing contact — legal constraint.',
        'Benefits not yet in place — financial constraint.',
        'Not allowed to travel to employment — order constraint.',
        'Waiting on Centrelink — genuine resource constraint.',
        'Waiting on community corrections decision — institutional constraint.',
      ],
    },

    'meta-reading': {
      sectorNote:
        'Performance for a system is especially common in re-entry contexts. People who have spent time in institutional settings have often learned to give the answer the system wants. The map must watch for this actively. Note: short vernacular entries ("all good", "sweet", "no dramas") are not automatically performance — context and pattern matter. A single short entry is not a flag. A run of them with zero difficulty content is.',
      performanceSignals: [
        {
          key: 'compliance_language',
          rx:  /\b(I am doing everything right|I am following all my conditions|I am being compliant|I am ticking all the boxes|I am doing what is required|I have done everything they asked|everything is in order|I have not breached|I have not put a foot wrong)\b/i,
        },
        {
          key: 'institutional_positive',
          rx:  /\b(my officer is happy|they are pleased with me|I got a good report|they said I am doing well|they are satisfied|no concerns raised|no flags|no issues noted)\b/i,
        },
        {
          key: 'vernacular_performance',
          rx:  /\b(all good|sweet|no dramas|no worries|going good|going well|everything is sweet|no issues|all sweet|sweet as|yeah good|yeah all good)\b/i,
        },
      ],
      honestySignals: [
        {
          key: 'honest_difficulty',
          rx:  /\b(I nearly|I was tempted|I struggled with|it was hard not to|I almost went back|I wanted to but|I was close to|it was difficult when|I had a moment where)\b/i,
        },
        {
          key: 'honest_about_environment',
          rx:  /\b(the area is still risky|they are still around|I still see them|the temptation is still there|it is not easy|the pull is still there|it is harder than I expected)\b/i,
        },
        {
          key: 'vernacular_honesty',
          rx:  /\b(
            not going to beat around the bush|fair dinkum|to be straight with you|
            I have to be honest|straight up|no bull|no bullshit|
            I nearly lost it|nearly stuffed it|nearly blew it|
            it was touch and go|came close|too close for comfort|
            doing it tough if I am honest|not going to lie|
            bit of a struggle|harder than I thought|harder than expected|
            not as easy as I thought|not going to pretend
          )\b/ix,
        },
      ],
    },

  },

};
