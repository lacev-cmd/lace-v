// ══════════════════════════════════════════════════════════
// SORTER GUIDE — S.T.E.M. Code Release  v0.1.0
//
// Optional second-ring S.T.E.M. sub-guide.
// Parent: guide-stem-base
//
// Attach order:
//   1. SorterSpine.attachGuide(GuideSTEMBase);
//   2. SorterSpine.attachGuide(GuideSTEMCodeRelease);
//
// Role:
//   Steer STEM reads toward AI-assisted code release
//   admissibility: source authority, invariant preservation,
//   evidence sufficiency, scope drift, dependency drift,
//   review quality, test coverage, and release-gate readiness.
//
// Boundary:
//   This guide does not prove software is safe.
//   It does not replace security review, QA, DevSecOps,
//   formal verification, production approval, human code review,
//   regulatory review, or engineering sign-off.
//   It helps structure the release-admissibility read.
// ══════════════════════════════════════════════════════════

const GuideSTEMCodeRelease = {

  id:      'guide-stem-code-release',
  version: '0.1.0',
  type:    'subsector',
  parent:  'guide-stem-base',
  sector:  'stem-code-release',

  purpose:
    'Extend the S.T.E.M. base guide for AI-assisted software release review. The guide reads whether a code change is admissible for merge, release, or deployment based on authorised source, preserved invariants, and sufficient evidence.',

  sectorNotes: {

    distinctivePressures: [
      'AI-assisted code is produced faster than review can verify.',
      'A code change compiles and passes shallow tests but changes behaviour outside the authorised task.',
      'Generated code introduces dependency, security, data, or configuration drift.',
      'The release candidate contains plausible code whose source authority is unclear.',
      'A change bypasses, weakens, or silently modifies system invariants.',
      'Test evidence exists but does not cover the behavioural change being released.',
      'Human review becomes rubber-stamp review because the generated code looks clean.',
      'The release decision is based on confidence in the tool rather than evidence for the change.',
      'Scope drift is hidden inside refactoring, cleanup, or generated helper functions.',
      'An AI-generated patch solves the immediate issue while creating forward maintenance or governance burden.',
    ],

    distinctiveMovement: [
      'The release claim is stated precisely.',
      'The authorised task, ticket, requirement, design note, or change request is identified.',
      'Material behavioural changes are mapped back to authorised source.',
      'System invariants are named and checked.',
      'Tests, scans, dependency checks, review notes, and release evidence are mapped to the changed behaviour.',
      'Generated or AI-assisted sections are marked or reviewable.',
      'Out-of-scope changes are removed, justified, or split into a separate review.',
      'Dependency or configuration changes are made visible.',
      'Security, privacy, data, audit, or rollback implications are checked.',
      'Release confidence is withheld where evidence does not carry the change.',
    ],

    distinctiveGaps: [
      'The release claim is not stated.',
      'Authorised source is not linked.',
      'Material behavioural changes are not listed.',
      'System invariants are not named.',
      'Tests do not map to the actual behaviour changed.',
      'Dependency, configuration, migration, or permission changes are not explained.',
      'Security, data, privacy, audit, or rollback implications are not visible.',
      'Human review evidence is thin or performative.',
      'AI-generated scope drift is not separated from intended change.',
      'Release gate authority is not stated.',
    ],

    outputAudience:
      'Developer, tech lead, release manager, DevSecOps reviewer, QA lead, engineering manager, auditor, or governance reviewer.',

    outputRegister:
      'Precise. Release-gate focused. Evidence-bound. No “looks good” language. No claim that passing tests proves admissibility.',
  },


  // ── Gaps ─────────────────────────────────────────────────

  gaps: [
    {
      key:  'release_claim',
      name: 'Release claim',
      rx:   /\b(release|merge|deploy|ship|go live|release candidate|PR|pull request|change set|patch|commit|deployment)\b/i,
      reason:
        'The map needs to know what release decision is being requested: merge, deploy, ship, approve, rollback, or hold.',
    },
    {
      key:  'authorised_source',
      name: 'Authorised source',
      rx:   /\b(ticket|issue|requirement|design record|change request|approved task|spec|acceptance criteria|Jira|GitHub issue|authorised|authorized|source of change)\b/i,
      reason:
        'A material behavioural change should be traceable to an authorised task, requirement, design record, or change request. Otherwise the change may be plausible but unauthorised.',
    },
    {
      key:  'behavioural_change_map',
      name: 'Behavioural change map',
      rx:   /\b(behaviour change|behavior change|changes behaviour|changes behavior|new behaviour|changed logic|side effect|material change|what changed|diff summary|impact summary)\b/i,
      reason:
        'The map needs the actual behavioural change, not just that files changed. Release admissibility depends on what the code now does.',
    },
    {
      key:  'system_invariants',
      name: 'System invariants',
      rx:   /\b(invariant|must never|guarantee|atomicity|idempotency|auditability|authorization|authentication|permission|data integrity|rollback|consistency|safety property|business rule)\b/i,
      reason:
        'The review must know which system rules cannot be weakened. A passing patch can still be inadmissible if it bypasses a governing invariant.',
    },
    {
      key:  'test_evidence',
      name: 'Test evidence',
      rx:   /\b(test|unit test|integration test|e2e|regression|test result|coverage|CI|pipeline passed|failing test|acceptance test|manual test|QA)\b/i,
      reason:
        'Tests are necessary but must map to the behaviour changed. Passing unrelated tests does not prove release admissibility.',
    },
    {
      key:  'security_scan_evidence',
      name: 'Security or scan evidence',
      rx:   /\b(SAST|DAST|SCA|dependency scan|security scan|vulnerability|CVE|secret scan|lint|static analysis|code scanning|supply chain|license scan)\b/i,
      reason:
        'AI-assisted code can introduce security, dependency, or supply-chain risk. Scan evidence should be visible where relevant.',
    },
    {
      key:  'dependency_or_config_change',
      name: 'Dependency or configuration change',
      rx:   /\b(dependency|package|library|version bump|lockfile|config|configuration|environment variable|permission|migration|schema|feature flag|setting|infrastructure)\b/i,
      reason:
        'Dependency, configuration, permission, schema, and environment changes often carry release risk beyond the code diff itself.',
    },
    {
      key:  'data_or_privacy_effect',
      name: 'Data, privacy, or permission effect',
      rx:   /\b(data|privacy|PII|personal information|customer data|permission|role|access control|token|secret|credential|logging|retention|export|audit log)\b/i,
      reason:
        'Changes touching data, permissions, privacy, credentials, logs, or audit trails require explicit evidence and review boundaries.',
    },
    {
      key:  'review_evidence',
      name: 'Human review evidence',
      rx:   /\b(reviewed by|approved by|code review|review note|maintainer|tech lead|security review|QA signoff|approval|review comment|LGTM)\b/i,
      reason:
        'Human review must be more than ceremonial. The map needs evidence that the review considered the material change and its boundaries.',
    },
    {
      key:  'ai_assistance_boundary',
      name: 'AI assistance boundary',
      rx:   /\b(AI-generated|AI assisted|Copilot|Claude|ChatGPT|generated code|model suggested|LLM|assistant wrote|prompted|automated refactor)\b/i,
      reason:
        'If AI assistance is material, the review should know which parts were generated, edited, or influenced so scope drift and unsupported logic can be checked.',
    },
    {
      key:  'rollback_or_recovery',
      name: 'Rollback or recovery path',
      rx:   /\b(rollback|revert|recovery|feature flag|kill switch|canary|blue green|staged rollout|backout|restore|migration rollback|safe deploy)\b/i,
      reason:
        'Release admissibility improves when the system has a bounded recovery path. Irreversible releases need stronger evidence before confidence is granted.',
    },
    {
      key:  'release_gate_authority',
      name: 'Release gate authority',
      rx:   /\b(release manager|approval gate|change advisory|CAB|owner approval|merge permission|deployment approval|signoff|release authority|production approval)\b/i,
      reason:
        'The map must know who has authority to accept the release risk. A structured read is not itself a release approval.',
    },
    {
      key:  'direction',
      name: 'Stated code-release decision',
      rx:   /\b(should we merge|should we deploy|is this ready|can this ship|approve this PR|hold the release|rollback|release decision|admissible for release)\b/i,
      reason:
        'The map needs the actual decision: merge, deploy, hold, split, test further, escalate, or roll back.',
    },
  ],


  // ── Skills / Capabilities visible in material ─────────────

  skills: [
    {
      key:              'source_traceability',
      name:             'Tracing change to authorised source',
      rx:               /\b(traceable to|linked to ticket|matches requirement|acceptance criteria|authorised by|approved task|design record|source of change|ticket covers)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:
        'Material behavioural changes are linked to an authorised source rather than accepted because they look useful.',
      breaks:
        'A generated or refactored change expands beyond the task without being noticed.',
    },
    {
      key:              'invariant_checking',
      name:             'Checking governing invariants',
      rx:               /\b(invariant checked|does not bypass|preserves|no weakening|auditability preserved|authorization preserved|idempotency preserved|business rule preserved|security boundary preserved)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:
        'The reviewer checks whether governing system rules survive the change.',
      breaks:
        'The review focuses on whether the code works, while missing that it changed a rule the system depends on.',
    },
    {
      key:              'test_mapping',
      name:             'Mapping tests to changed behaviour',
      rx:               /\b(test covers|coverage for|regression test|test maps to|acceptance test proves|added test for|failing test reproduced|test demonstrates)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:
        'Tests are connected to the behaviour changed and the risk being carried into release.',
      breaks:
        'The pipeline passes, but the relevant behaviour is not directly tested.',
    },
    {
      key:              'scope_drift_detection',
      name:             'Detecting scope drift',
      rx:               /\b(scope drift|out of scope|unrelated change|extra change|refactor included|helper added|not part of ticket|separate PR|split the change)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:
        'Unrelated or unauthorised changes are named, removed, split, or justified.',
      breaks:
        'AI-generated helpers, refactors, or “cleanup” changes silently enter the release candidate.',
    },
    {
      key:              'dependency_review',
      name:             'Reviewing dependency and configuration drift',
      rx:               /\b(reviewed dependency|lockfile checked|version bump checked|config change reviewed|migration reviewed|permissions reviewed|dependency risk|configuration risk)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:
        'Dependency, configuration, permission, and migration changes are reviewed as release risks.',
      breaks:
        'Release review treats dependency or configuration changes as incidental.',
    },
    {
      key:              'recovery_planning',
      name:             'Preparing rollback or recovery',
      rx:               /\b(rollback plan|revert plan|feature flag|canary|staged rollout|backout plan|kill switch|recovery plan|safe deploy)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:
        'The release has a bounded recovery route if the change behaves incorrectly.',
      breaks:
        'The release is treated as reversible without a tested or stated recovery path.',
    },
    {
      key:              'withholding_release_confidence',
      name:             'Withholding release confidence',
      rx:               /\b(not release ready|hold release|do not merge|needs tests|needs review|insufficient evidence|not admissible|conditional release|provisional|blocked)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:
        'Release confidence is withheld when source, invariant, or evidence gaps remain.',
      breaks:
        'The change is merged because it looks plausible, compiles, or passes shallow checks.',
    },
  ],


  // ── Contradictions / Tensions ─────────────────────────────

  contradictions: [
    {
      a: /\b(compiles|build passes|CI passed|tests pass|green pipeline|works locally|all checks passed)\b/i,
      b: /\b(no requirement|not authorised|not authorized|out of scope|invariant|untested behaviour|behavior not tested|no review|missing evidence)\b/i,
      text:
        'Passing checks and release-admissibility gaps both appear. Build success is necessary but not sufficient for release confidence.',
    },
    {
      a: /\b(fixes the issue|solves the bug|works|passes acceptance|successful patch)\b/i,
      b: /\b(changed permission|changed dependency|new config|schema change|side effect|breaks invariant|bypasses|weakens|scope drift)\b/i,
      text:
        'The patch appears to solve the immediate issue while introducing a wider release concern. The fix and the drift must be held together.',
    },
    {
      a: /\b(AI-generated|AI assisted|model suggested|assistant wrote|generated patch|automated refactor)\b/i,
      b: /\b(not reviewed|unclear why|no source|no ticket|hallucinated|invented|unsupported|unexplained logic)\b/i,
      text:
        'AI assistance and weak source/review evidence both appear. The issue is not that AI was used; the issue is whether the generated change is traceable, reviewed, and evidenced.',
    },
    {
      a: /\b(reviewed|approved|LGTM|signed off|maintainer approved|review passed)\b/i,
      b: /\b(no comments|rubber stamp|did not check|unclear review|no invariant check|no security review|no test mapping)\b/i,
      text:
        'Approval language and thin review evidence both appear. Human approval is not release evidence unless the review actually covers the material risk.',
    },
    {
      a: /\b(no behaviour change|no behavior change|just refactor|cleanup only|minor change|simple change)\b/i,
      b: /\b(new logic|changed flow|changed dependency|changed permission|changed config|changed data path|different result)\b/i,
      text:
        'A low-risk framing and material change evidence both appear. The map should prefer the actual diff behaviour over the reassuring label.',
    },
    {
      a: /\b(can rollback|easy to revert|safe deploy|feature flag|staged rollout)\b/i,
      b: /\b(no rollback tested|migration irreversible|data change|external side effect|customer impact|stateful change)\b/i,
      text:
        'Recovery confidence and recovery uncertainty both appear. Rollback should not be treated as available unless it is credible for the actual change.',
    },
  ],


  // ── Direction patterns ────────────────────────────────────

  directionPatterns: [
    {
      rx: /merge|pull request|PR|commit|branch/i,
      label: 'toward merge admissibility',
    },
    {
      rx: /deploy|release|ship|go live|production/i,
      label: 'toward deployment or release admissibility',
    },
    {
      rx: /AI-generated|AI assisted|LLM|Copilot|Claude|ChatGPT|generated code/i,
      label: 'toward AI-assisted code review',
    },
    {
      rx: /security|vulnerability|permission|auth|token|secret|privacy/i,
      label: 'toward security or privacy release review',
    },
    {
      rx: /dependency|package|library|lockfile|supply chain/i,
      label: 'toward dependency or supply-chain review',
    },
    {
      rx: /migration|schema|database|data path|stateful/i,
      label: 'toward data or migration release review',
    },
    {
      rx: /rollback|revert|canary|feature flag|staged rollout/i,
      label: 'toward recovery-bounded release',
    },
  ],


  // ── Steer blocks ──────────────────────────────────────────

  steer: {

    'open-gap-discipline': {
      priorityGaps: [
        'release_claim',
        'direction',
        'authorised_source',
        'behavioural_change_map',
        'system_invariants',
        'test_evidence',
        'review_evidence',
        'dependency_or_config_change',
        'security_scan_evidence',
        'data_or_privacy_effect',
        'rollback_or_recovery',
        'ai_assistance_boundary',
        'release_gate_authority',
      ],
      absenceRules: {
        noBuildPassShortcut:
          'A passing build, green CI, or successful local run does not close release-admissibility gaps.',
        sourceAuthorityRequired:
          'Material behavioural changes should be traceable to an authorised task, requirement, or design record.',
        invariantsMustSurvive:
          'If governing invariants are not named or checked, release confidence must be capped.',
        evidenceMapsToChange:
          'Tests and scans must map to the changed behaviour, not merely exist somewhere in the pipeline.',
      },
    },

    'confidence-calibration': {
      sectorNote:
        'Code-release confidence attaches to the specific change, release claim, authority source, invariant check, and evidence pack. It does not attach to the tool that produced the code or to the repository in general.',
      confidenceTiers: [
        {
          key: 'not_readable',
          desc: 'Release claim, authorised source, or behavioural change map is missing.',
        },
        {
          key: 'inferred',
          desc: 'The change appears release-relevant, but source or evidence is not directly stated.',
        },
        {
          key: 'thin',
          desc: 'Some checks pass, but source traceability, invariant review, or test mapping is weak.',
        },
        {
          key: 'partial',
          desc: 'The change has some evidence, but material release gaps remain.',
        },
        {
          key: 'supported',
          desc: 'Authorised source, behaviour map, invariant check, tests, and review evidence are aligned enough for bounded release review.',
        },
        {
          key: 'strong',
          desc: 'Multiple mapped evidence streams support the bounded release claim, including source authority, invariant preservation, and recovery boundary where needed.',
        },
      ],
    },

    'external-constraint-reading': {
      defaultConstraintRx: /\b(release deadline|deployment window|freeze|incident|hotfix|security patch|customer deadline|compliance deadline|approval gate|change advisory|rollback window|maintenance window)\b/i,
      constraintTypes: [
        {
          key: 'release_timing',
          label: 'Release timing constraint',
          rx: /\b(release deadline|deployment window|freeze|maintenance window|hotfix|incident|security patch|customer deadline)\b/i,
          changeable: false,
        },
        {
          key: 'approval_gate',
          label: 'Approval or governance gate',
          rx: /\b(approval gate|release authority|change advisory|CAB|security approval|QA signoff|compliance approval|owner approval)\b/i,
          changeable: false,
        },
        {
          key: 'evidence_access',
          label: 'Evidence or review access constraint',
          rx: /\b(no reviewer|waiting for review|tests unavailable|scan not run|missing logs|cannot reproduce|environment unavailable)\b/i,
          changeable: true,
        },
        {
          key: 'rollback_constraint',
          label: 'Rollback or recovery constraint',
          rx: /\b(no rollback|irreversible migration|stateful change|customer data|external side effect|cannot revert|recovery unknown)\b/i,
          changeable: false,
        },
      ],
    },

    'load-sensitive-capability': {
      defaultLoadSignals: [
        {
          key: 'review_load',
          rx: /\b(large diff|many files|review burden|review fatigue|too much to review|complex PR|generated code volume)\b/i,
        },
        {
          key: 'release_pressure',
          rx: /\b(hotfix|urgent|release pressure|deadline|incident|must ship|customer waiting|production issue)\b/i,
        },
        {
          key: 'scope_drift_load',
          rx: /\b(scope drift|extra change|unrelated change|refactor included|helper added|cleanup only|changed more than)\b/i,
        },
        {
          key: 'evidence_gap_load',
          rx: /\b(no test|untested|no scan|no review|missing evidence|not verified|not reproduced)\b/i,
        },
        {
          key: 'recovery_burden',
          rx: /\b(no rollback|migration|stateful|data change|irreversible|manual recovery|backout uncertain)\b/i,
        },
      ],
      sectorNote:
        'Release risk often compounds through review load, timing pressure, scope drift, and recovery burden. Treat these as interacting constraints, not separate minor issues.',
    },

    'movement-non-movement-reading': {
      movementEvidence: [
        'Release decision stated.',
        'Authorised source linked.',
        'Behavioural change mapped.',
        'System invariant checked.',
        'Tests mapped to change.',
        'Security or dependency scan reviewed.',
        'Dependency or configuration change explained.',
        'AI-assisted boundary identified.',
        'Human review evidence stated.',
        'Rollback or recovery path stated.',
        'Release confidence withheld where evidence is insufficient.',
      ],
      defaultActionRx: /\b(mapped|linked|checked|tested|reviewed|scanned|verified|reproduced|approved with evidence|split PR|removed scope|added test|documented|reverted|held release)\b/i,
      defaultStuckRx: /\b(no test|not reviewed|unclear source|unknown behaviour|behavior unknown|scope unclear|still failing|no scan|not reproducible|waiting for review|missing evidence)\b/i,
    },

    'contradiction-holding': {
      outputRules: {
        holdChecksAndAdmissibility:
          'Hold passing checks and release gaps together. Do not let CI success erase source, invariant, or evidence questions.',
        evidenceOverPlausibility:
          'Plausible code is not release evidence. Prefer mapped evidence to apparent correctness.',
        sourceAndInvariantFirst:
          'For AI-assisted code, source authority and invariant preservation are first-class release questions.',
        noReleaseApproval:
          'Do not phrase the map as approval to release. State what the map can and cannot support.',
      },
    },

    'next-useful-move': {
      outputShape: {
        move:
          'One bounded code-release next move: link source authority, map behavioural change, check invariants, add a targeted test, review dependency drift, clarify rollback, or escalate release authority.',
        rationale:
          'State why this move changes release admissibility. Do not produce a full release plan unless asked.',
      },
    },

    'state-change-detection': {
      minimumSeparationDays: 1,
      watchFor: [
        'Change expanding beyond authorised source.',
        'Tests added after gap identified.',
        'Invariant check added or removed.',
        'Dependency or configuration drift introduced.',
        'Release pressure increasing while evidence remains thin.',
        'Rollback path becoming unavailable.',
        'AI-generated code moving from review branch to release candidate.',
      ],
    },

    'connections-across-time': {
      minimumSeparationDays: 1,
      watchPatterns: [
        'same AI-generated helper pattern recurring across PRs',
        'scope drift recurring under refactor labels',
        'green CI used repeatedly as release proof',
        'review approvals without substantive comments',
        'dependency changes bundled with feature fixes',
        'release pressure overriding evidence gaps',
        'rollback assumptions repeated without testing',
      ],
    },

    'meta-reading': {
      performanceSignals: [
        {
          key: 'green_pipeline_confidence',
          rx: /\b(CI passed|green pipeline|all checks passed|tests pass|build passed|works locally)\b/i,
        },
        {
          key: 'ai_tool_confidence',
          rx: /\b(Copilot wrote|Claude generated|ChatGPT generated|AI fixed|model suggested|assistant solved)\b/i,
        },
        {
          key: 'minor_change_framing',
          rx: /\b(just a refactor|cleanup only|small change|minor patch|simple fix|no behaviour change|no behavior change)\b/i,
        },
      ],
      honestySignals: [
        {
          key: 'bounded_release_language',
          rx: /\b(not release ready|conditional|needs test|needs review|cannot confirm|scope drift|not authorised|not authorized|invariant not checked|hold release)\b/i,
        },
        {
          key: 'evidence_mapped_release_language',
          rx: /\b(traceable to|test covers|invariant preserved|reviewed dependency|rollback tested|source linked|behaviour mapped|behavior mapped)\b/i,
        },
      ],
      sectorNote:
        'In code-release contexts, watch for confidence created by green pipelines, AI-tool trust, small-change framing, and rubber-stamp approvals. Prefer source authority, invariant preservation, and mapped evidence.',
    },

  },

};