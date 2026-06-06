// ══════════════════════════════════════════════════════════
// SORTER GUIDES — First Ring  v0.2.0
// Engineering, Education, Employment, Housing,
// Social Care, Public Service, Mental Health
//
// v0.2.0: steering added for behaviours 12–16 across all.
// Core steer blocks (01–11) unchanged from v0.1.0.
// ══════════════════════════════════════════════════════════


// ── Engineering ───────────────────────────────────────────

const GuideEngineering = {
  id: 'guide-engineering', version: '0.2.0', type: 'sector', parent: null,
  purpose: 'Steer sorter behaviours toward engineering-sector conditions.',
  sector:  'engineering',
  sectorNotes: {
    distinctivePressures: ['Blocked decisions.', 'Technical debt.', 'Scope creep.', 'Dependency on unavailable resources.', 'Quality compromise under time pressure.', 'Team communication breakdown.'],
    distinctiveMovement:  ['Decision made and communicated.', 'Blocker escalated.', 'Test written or run.', 'Code reviewed and merged.', 'Dependency resolved.', 'Technical debt named and logged.'],
    distinctiveGaps:      ['No stated delivery goal.', 'Blockers present but no escalation path.', 'Technical debt not named.', 'Team state not visible.'],
    outputAudience: 'Engineer, tech lead, engineering manager, or project reviewer.',
    outputRegister: 'Precise. Action-oriented. Evidence-based.',
  },
  steer: {
    'avoidance-detection': {
      defaultActionRx: /\b(I shipped|I merged|I deployed|I tested|I escalated|I documented|I reviewed|I fixed|I refactored|I decided|I unblocked|I raised|I closed|I delivered)\b/i,
      notAvoidance: ['Waiting for stakeholder decision.', 'Deliberate pause for technical review.', 'Not merging pending review in progress.', 'Strategic delay while dependency resolves externally.'],
    },
    'movement-non-movement-reading': {
      movementEvidence: ['Code shipped or merged.', 'Test written and passing.', 'Blocker escalated.', 'Decision made and recorded.', 'Dependency resolved.', 'Incident reviewed.', 'Technical debt named and scheduled.'],
      defaultStuckRx: /\b(still blocked|no progress|same problem|not shipped|not merged|sitting in review|no decision|going around|no movement|same blocker|not resolved)\b/i,
    },
    'load-sensitive-capability': {
      defaultLoadSignals: [
        { key: 'deadline', rx: /\b(deadline|ship by|release date|we have to|the date is|we are late|overdue|behind schedule)\b/i },
        { key: 'incident', rx: /\b(incident|outage|production issue|on call|pages|alert|down|broken in prod|hotfix)\b/i },
        { key: 'team',     rx: /\b(team conflict|not communicating|blocked by|waiting on|they have not|no response from)\b/i },
        { key: 'scope',    rx: /\b(scope creep|requirements changed|new requirement|they want more|moving goalposts)\b/i },
        { key: 'debt',     rx: /\b(technical debt|legacy|fragile|it keeps breaking|held together|not sustainable)\b/i },
      ],
    },
    'open-gap-discipline': { priorityGaps: ['definition_of_done', 'blocker_escalation_path', 'technical_debt_state', 'direction', 'team_state'] },
    'confidence-calibration': { sectorNote: 'Engineering maps without a stated delivery goal or definition of done cannot produce a reliable movement read.' },
    'state-change-detection': { minimumSeparationDays: 7, watchFor: ['Blocker resolved that was previously persistent.', 'Delivery rate improving across sprints.', 'Team state shifting.'] },
    'competing-priorities': { costSignals: [{ key: 'quality_vs_speed', rx: /\b(cutting corners|shipping too fast|not enough time to test|technical debt accumulating|we have to ship but|the quality is suffering)\b/i }] },
    'external-constraint-reading': { defaultConstraintRx: /\b(waiting on|blocked by|no response from|the dependency|they have not delivered|the API is not ready|the infrastructure|the vendor)\b/i },
    'meta-reading': { sectorNote: 'Engineering updates can become formulaic — standard sprint reports that describe process without honest state. Watch for absence of difficulty in entries from a team under high load.' },
  },
};


// ── Education ─────────────────────────────────────────────

const GuideEducation = {
  id: 'guide-education', version: '0.2.0', type: 'sector', parent: null,
  purpose: 'Steer sorter behaviours toward education-sector conditions.',
  sector:  'education',
  sectorNotes: {
    distinctivePressures: ['Falling behind without disclosing it.', 'Assessment anxiety.', 'Support needs not identified.', 'Financial pressure.', 'Family responsibilities competing with study.', 'Course direction misalignment.'],
    distinctiveMovement:  ['Assignment submitted.', 'Session attended.', 'Support accessed.', 'Tutor contacted.', 'Study routine established.'],
    distinctiveGaps:      ['Academic standing not described.', 'Support network not mentioned.', 'Direction not stated.', 'Load outside study not visible.'],
    outputAudience: 'Student, tutor, academic support worker, or personal advisor.',
    outputRegister: 'Supportive. Non-judgemental. Practical.',
  },
  steer: {
    'avoidance-detection': {
      defaultActionRx: /\b(I submitted|I attended|I contacted|I asked for|I spoke to|I completed|I studied|I revised|I read|I started|I handed in|I booked|I accessed)\b/i,
      notAvoidance: ['Extension granted and used appropriately.', 'Absence due to documented illness.', 'Waiting for disability support.', 'Deferral on academic advice.'],
    },
    'movement-non-movement-reading': {
      movementEvidence: ['Assignment submitted.', 'Session attended.', 'Tutor contacted.', 'Study routine held.', 'Support accessed.', 'Gap named and addressed.'],
      defaultStuckRx: /\b(falling behind|cannot keep up|not submitted|not attended|missed|I have not started|same problem|getting further behind|I keep avoiding)\b/i,
    },
    'load-sensitive-capability': {
      defaultLoadSignals: [
        { key: 'assessment', rx: /\b(exam|assessment|deadline|submission|due date|I have to hand in)\b/i },
        { key: 'belonging',  rx: /\b(do not belong|not smart enough|everyone else|imposter|out of my depth)\b/i },
        { key: 'financial',  rx: /\b(money|cost|I cannot afford|working to pay|student loan|financial pressure)\b/i },
        { key: 'caring',     rx: /\b(caring for|family|my children|my parent|home responsibilities)\b/i },
        { key: 'mental',     rx: /\b(anxiety|depression|mental health|I am not okay|struggling|cannot concentrate)\b/i },
      ],
    },
    'open-gap-discipline': { priorityGaps: ['academic_standing', 'direction', 'support_access', 'load_outside_study', 'engagement_pattern'] },
    'confidence-calibration': { sectorNote: 'Education maps without current academic standing cannot reliably read movement toward qualification.' },
    'state-change-detection': { minimumSeparationDays: 14, watchFor: ['Engagement improving — attendance or submission rate rising.', 'Support engaged where it was previously absent.', 'Academic standing shifting.'] },
    'competing-priorities': { costSignals: [{ key: 'study_vs_income', rx: /\b(I have to work|hours at work|the job|I cannot study and|the shifts|employment and study|it clashes)\b/i }] },
    'external-constraint-reading': { defaultConstraintRx: /\b(waiting for the disability|the extension|the mitigating circumstances|the university has not|the department|I cannot access until|waiting for funding)\b/i },
    'meta-reading': { sectorNote: 'Education maps can show performance pressure — presenting engagement that is not happening. Watch for absence of specific assignment or session detail alongside positive framing.' },
  },
};


// ── Employment ────────────────────────────────────────────

const GuideEmployment = {
  id: 'guide-employment', version: '0.2.0', type: 'sector', parent: null,
  purpose: 'Steer sorter behaviours toward employment conditions.',
  sector:  'employment',
  sectorNotes: {
    distinctivePressures: ['Financial pressure from unemployment.', 'Confidence erosion from rejection.', 'Mismatch between skills and available roles.', 'Discrimination or structural barriers.', 'Health limiting work capacity.'],
    distinctiveMovement:  ['Application submitted.', 'Interview attended.', 'Contact made with employer.', 'New skill started.', 'Support sought.'],
    distinctiveGaps:      ['Employment goal not stated.', 'Barriers not named.', 'Activity level not visible.', 'Financial pressure not described.'],
    outputAudience: 'Individual, employment support worker, or job coach.',
    outputRegister: 'Practical. Evidence-based. Non-judgemental.',
  },
  steer: {
    'avoidance-detection': {
      defaultActionRx: /\b(I applied|I sent|I attended|I called|I emailed|I registered|I spoke to|I contacted|I went to|I submitted|I followed up|I accepted|I started)\b/i,
      notAvoidance: ['Waiting for response after application.', 'Rest after intensive job search period.', 'Medical restriction on work type.', 'Waiting for childcare before starting.'],
    },
    'movement-non-movement-reading': {
      movementEvidence: ['Application submitted.', 'Interview attended.', 'Employer contacted.', 'New skill enrolled or started.', 'CV updated.', 'Support worker met.', 'Job fair or event attended.'],
      defaultStuckRx: /\b(no applications|not applied|nothing sent|no responses|giving up|cannot face|not looking|no progress|same situation|no movement|I keep saying)\b/i,
    },
    'load-sensitive-capability': {
      defaultLoadSignals: [
        { key: 'rejection',   rx: /\b(rejected|did not get|unsuccessful|they said no|another rejection|turned down|not selected)\b/i },
        { key: 'financial',   rx: /\b(running out|benefit|no money|I cannot keep going|financial pressure|savings gone|debt)\b/i },
        { key: 'confidence',  rx: /\b(not good enough|why would they|I do not have what|they will not want|what is the point|nobody will hire)\b/i },
        { key: 'health',      rx: /\b(my health|I cannot|not well enough|too unwell|physical limitation|I am not able to work)\b/i },
        { key: 'caring',      rx: /\b(childcare|caring|school hours|I cannot commit|family responsibilities|I have to be available)\b/i },
      ],
    },
    'open-gap-discipline': { priorityGaps: ['employment_goal', 'barriers', 'activity_level', 'financial_runway', 'direction'] },
    'confidence-calibration': { sectorNote: 'Employment maps without a stated goal and activity level cannot reliably read movement.' },
    'state-change-detection': { minimumSeparationDays: 14, watchFor: ['Activity level increasing.', 'Confidence signals shifting.', 'Type of role being targeted shifting.', 'Employment secured.'] },
    'competing-priorities': { costSignals: [{ key: 'income_vs_fit', rx: /\b(I need money but|it is not what I want but|I have to take anything|the right job versus the available job|beggars cannot be choosers)\b/i }] },
    'external-constraint-reading': { defaultConstraintRx: /\b(no jobs in|the market|the employer has not|waiting to hear|they have not responded|the sector is|discrimination|my record|my gap|the reference)\b/i },
    'meta-reading': { sectorNote: 'Employment maps can show activity inflation — presenting more applications or contacts than are actually happening. Watch for absence of specific company or role names alongside claimed high activity.' },
  },
};


// ── Public Service ────────────────────────────────────────

const GuidePublicService = {
  id: 'guide-public-service', version: '0.2.0', type: 'sector', parent: null,
  purpose: 'Steer sorter behaviours toward public service conditions.',
  sector:  'public-service',
  sectorNotes: {
    distinctivePressures: ['Resource constraint.', 'Policy change outpacing capacity.', 'Accountability and scrutiny pressure.', 'Interdependency blocks.', 'Staff capacity and morale.'],
    distinctiveMovement:  ['Decision made and communicated.', 'Process step completed.', 'Escalation made.', 'Milestone reached.', 'Review completed with action logged.'],
    distinctiveGaps:      ['Delivery goal not stated.', 'Blockage not named.', 'Decision owner not identified.', 'Resource gap not described.'],
    outputAudience: 'Public servant, programme manager, policy lead, or service reviewer.',
    outputRegister: 'Structured. Evidence-based. Outcome-focused.',
  },
  steer: {
    'avoidance-detection': {
      defaultActionRx: /\b(I submitted|I completed|I escalated|I approved|I consulted|I published|I delivered|I reviewed|I notified|I actioned|I reported|I agreed|I signed off)\b/i,
      notAvoidance: ['Waiting for ministerial sign-off.', 'Pause for legal or policy clearance.', 'Consultation period in progress.', 'Dependency on another department.'],
    },
    'movement-non-movement-reading': {
      movementEvidence: ['Decision made and recorded.', 'Process step completed.', 'Escalation made.', 'Policy updated.', 'Resource confirmed.', 'Milestone delivered.'],
      defaultStuckRx: /\b(still waiting|no decision|blocked|not approved|no sign off|going around|no progress|not moved|still in|same stage)\b/i,
    },
    'load-sensitive-capability': {
      defaultLoadSignals: [
        { key: 'scrutiny',   rx: /\b(audit|inspection|inquiry|parliamentary question|FOI|accountability|scrutiny|under review)\b/i },
        { key: 'resource',   rx: /\b(no budget|underfunded|cuts|reduced capacity|not enough staff|resource pressure)\b/i },
        { key: 'policy',     rx: /\b(policy change|new directive|ministerial|priorities have changed|new guidance)\b/i },
        { key: 'dependency', rx: /\b(waiting on|blocked by|dependent on|they have not|another department|no response from)\b/i },
        { key: 'public',     rx: /\b(complaint|media|public pressure|press|reputational|political pressure)\b/i },
      ],
    },
    'open-gap-discipline': { priorityGaps: ['delivery_goal', 'blockage', 'decision_owner', 'resource_gap', 'direction'] },
    'confidence-calibration': { sectorNote: 'Public service maps without a stated delivery goal and current blockage picture cannot reliably read movement.' },
    'state-change-detection': { minimumSeparationDays: 14, watchFor: ['Blockage resolved.', 'Decision made that was previously deferred.', 'Resource secured.', 'Escalation completed.'] },
    'competing-priorities': { costSignals: [{ key: 'delivery_vs_governance', rx: /\b(we need to deliver but|governance is slowing|the process is preventing|approval is blocking|we cannot move until they|the process versus the need)\b/i }] },
    'external-constraint-reading': { defaultConstraintRx: /\b(waiting for ministerial|the other department|cross-government|legal clearance|policy clearance|HM Treasury|the approvals process|they have not signed off|we cannot proceed without)\b/i },
    'meta-reading': { sectorNote: 'Public service maps can be written for the record rather than for honest account. Watch for absence of named blockages in entries from teams known to be under significant constraint.' },
  },
};
