// ══════════════════════════════════════════════════════════
// SORTER REPORT WRITER — S.T.E.M. Technical Evidence Readiness v0.1.0
//
// For engineering, lab, robotics, battery-transition,
// code-release, asset-integrity, technical procurement,
// and other S.T.E.M.-adjacent evidence-readiness contexts.
//
// Purpose:
//   Produce a bounded technical evidence-readiness report
//   from a completed sorter map.
//
// It answers:
//   - What claim or technical question is being assessed?
//   - What does the current material support?
//   - What evidence gaps remain?
//   - What burden, constraint, timing, or drift issues matter?
//   - What tensions must be held?
//   - What is the next evidence move?
//   - What must not yet be claimed?
//
// Boundary:
//   Not engineering sign-off.
//   Not lab accreditation.
//   Not safety certification.
//   Not compliance approval.
//   Not legal, clinical, regulatory, or procurement approval.
//   Not a replacement for qualified professional judgement.
//
// Writer contract:
//   Writers consume a completed map.
//   Writers do not run behaviours.
//   Writers do not mutate map state.
// ══════════════════════════════════════════════════════════

const SorterReportWriterSTEMTechnicalEvidenceReadiness = (() => {

  const VERSION   = '0.1.0';
  const WRITER_ID = 'report-writer-stem-technical-evidence-readiness';


  // ── Helpers ───────────────────────────────────────────────

  function readinessFromConfidence(confidence) {
    const map = {
      not_readable: {
        status: 'NOT READY — not enough material to read',
        implication:
          'The material does not yet state the technical claim, boundary, evidence base, or decision context clearly enough for a reliable evidence-readiness report.',
      },
      inferred: {
        status: 'NOT READY — inferred only',
        implication:
          'A possible technical read is visible, but it is inferred rather than directly supported. Do not use this for reliance without more material.',
      },
      thin: {
        status: 'NOT READY — thin evidence',
        implication:
          'One or two signals are visible, but the evidence base is too thin for consequential technical reliance.',
      },
      partial: {
        status: 'CONDITIONAL — material gaps remain',
        implication:
          'The direction of the technical read is visible, but material gaps remain. The output may support discussion, triage, or evidence requests, not final reliance.',
      },
      supported: {
        status: 'BOUNDED READY — supported inside stated limits',
        implication:
          'The map has enough material to support a bounded evidence-readiness view, provided the stated gaps, limits, and authority boundaries remain attached.',
      },
      strong: {
        status: 'BOUNDED READY — strong within current scope',
        implication:
          'The map has consistent material across the current scope. This still does not create certification, approval, sign-off, or independent verification.',
      },
    };

    return map[confidence] || map.not_readable;
  }


  function optionItems(value) {
    const Base = SorterReportWriterBase;
    return Base.asArray(value).filter(Boolean);
  }


  function claimItems(map, options = {}) {
    const Base = SorterReportWriterBase;

    const direct = optionItems(options.claims)
      .map(c => typeof c === 'string' ? c : (c.text || c.label || JSON.stringify(c)));

    const mapClaims = optionItems(map?.claims)
      .map(c => typeof c === 'string' ? c : (c.text || c.label || JSON.stringify(c)));

    const handoverClaims = optionItems(map?.handover?.claims)
      .map(c => typeof c === 'string' ? c : (c.text || c.label || JSON.stringify(c)));

    const items = direct.concat(mapClaims).concat(handoverClaims);

    return items.length ? items.slice(0, 10) : [];
  }


  function evidenceItems(map, options = {}) {
    const Base = SorterReportWriterBase;

    const fromOptions = optionItems(options.evidence)
      .map(e => typeof e === 'string' ? e : (e.text || e.label || e.name || JSON.stringify(e)));

    const fromMap = optionItems(map?.evidence)
      .map(e => typeof e === 'string' ? e : (e.text || e.label || e.name || JSON.stringify(e)));

    const fromSignals = optionItems(map?.signals?.evidence)
      .map(e => typeof e === 'string' ? e : (e.text || e.label || e.name || JSON.stringify(e)));

    const items = fromOptions.concat(fromMap).concat(fromSignals);

    return items.length ? items.slice(0, 12) : [];
  }


  function authorityBoundaryItems(options = {}) {
    return optionItems(options.authorityBoundaries).length
      ? optionItems(options.authorityBoundaries)
      : [
          'This report does not certify compliance.',
          'This report does not provide engineering sign-off.',
          'This report does not provide lab accreditation or method validation.',
          'This report does not approve supplier selection or procurement.',
          'This report does not determine product safety.',
          'Qualified technical authority remains required where consequences are material.',
        ];
  }


  function notClaimableItems(confidence, map, options = {}) {
    const Base = SorterReportWriterBase;
    const items = [];

    items.push('Do not claim certification, compliance, safety approval, or engineering sign-off from this report alone.');
    items.push('Do not claim that absence of a detected gap means the issue is resolved.');
    items.push('Do not claim that supplier, vendor, lab, model, or dashboard confidence is independent evidence unless source lineage supports it.');
    items.push('Do not extend a result beyond the stated sample, configuration, operating envelope, method boundary, or evidence pack.');

    if (['not_readable', 'inferred', 'thin'].includes(confidence)) {
      items.push('Do not use this output for consequential reliance without additional material and qualified review.');
    }

    const gaps = Base.openGapItems(map);
    if (gaps.length) {
      items.push('Do not treat the current technical claim as fully supported while open gaps remain.');
    }

    if (options.extraNotClaimable) {
      optionItems(options.extraNotClaimable).forEach(x => items.push(x));
    }

    return items.filter((v, i, a) => a.indexOf(v) === i);
  }


  function priorityEvidenceMove(map, options = {}) {
    const Base = SorterReportWriterBase;
    const state = Base.extractMapState(map);

    if (options.nextEvidenceMove) {
      return {
        text: options.nextEvidenceMove,
        confidence: 'supported',
        basis: 'caller supplied',
      };
    }

    if (state.nextMove?.move) {
      return {
        text: state.nextMove.move,
        confidence: Base.getOverallConfidence(map),
        basis: 'map.nextMove.move',
      };
    }

    const priorityGap = Base.highestPriorityGap(map);
    if (priorityGap) {
      return {
        text:
          `Resolve priority evidence gap: ${priorityGap.name || priorityGap.key}` +
          (priorityGap.reason ? `. ${priorityGap.reason}` : '.'),
        confidence: 'supported',
        basis: 'map.gaps.highestPriority',
      };
    }

    return {
      text: 'Ask for the exact technical claim, the evidence pack, and the boundary of the decision being made.',
      confidence: 'inferred',
      basis: 'fallback evidence-readiness move',
    };
  }


  // ── Main writer ───────────────────────────────────────────

  function write(map, options = {}) {
    const Base       = SorterReportWriterBase;
    const confidence = Base.getOverallConfidence(map);
    const state      = Base.extractMapState(map);
    const readiness  = readinessFromConfidence(confidence);

    const warnings = Base.warningsFromMap(map, options.warnings);

    if (['not_readable', 'inferred', 'thin'].includes(confidence)) {
      warnings.push(
        `Map confidence is ${confidence}. This report should be used only for triage, evidence requests, or clarification — not consequential technical reliance.`
      );
    }

    if (options.highConsequence === true && !['supported', 'strong'].includes(confidence)) {
      warnings.push(
        'High-consequence context supplied. Qualified review and additional evidence are required before reliance.'
      );
    }

    const sections = [];


    // ── Report identity ───────────────────────────────────

    sections.push(Base.makeSection({
      key: 'report_identity',
      title: 'Report identity',
      body:
        options.reportContext ||
        'This report is a bounded S.T.E.M. technical evidence-readiness report generated from a completed sorter map.',
      claims: [
        Base.makeClaim({
          text: 'This report reads the available material for claim support, evidence gaps, constraints, burden, timing, and readiness limits.',
          confidence: 'supported',
          basis: 'report writer purpose',
        }),
        Base.makeClaim({
          text: 'This report does not independently verify the underlying facts, tests, documents, measurements, or supplier statements.',
          confidence: 'supported',
          basis: 'report writer caveat',
        }),
      ],
      confidence: 'supported',
    }));


    // ── Basis and authority boundary ───────────────────────

    sections.push(Base.makeSection({
      key: 'basis_and_authority_boundary',
      title: 'Basis and authority boundary',
      body:
        'The report is based only on the completed map and any caller-supplied context. It is a readiness and gap-visibility output, not an approval.',
      items: authorityBoundaryItems(options),
      confidence: 'supported',
    }));


    // ── Technical claim or question ────────────────────────

    const claims = claimItems(map, options);
    sections.push(Base.makeSection({
      key: 'technical_claim_or_question',
      title: 'Technical claim or question',
      body: claims.length
        ? 'The following claim(s), question(s), or decision object(s) are visible in the supplied material.'
        : 'No explicit technical claim or question is visible from the current material.',
      items: claims.length ? claims : ['Technical claim or question not visible.'],
      confidence: claims.length ? confidence : 'not_readable',
      empty: claims.length === 0,
      warnings: claims.length ? [] : ['Technical claim or question missing. Readiness cannot be assessed cleanly.'],
    }));


    // ── Overall readiness status ───────────────────────────

    sections.push(Base.makeSection({
      key: 'technical_evidence_readiness_status',
      title: 'Technical evidence readiness status',
      claims: [
        Base.makeClaim({
          text: `Overall map confidence: ${confidence}. ${Base.label(confidence)}.`,
          confidence: 'supported',
          basis: 'map.confidence.overall',
        }),
        Base.makeClaim({
          text: `Readiness status: ${options.readinessStatus || readiness.status}.`,
          confidence: 'supported',
          basis: options.readinessStatus ? 'caller supplied readiness status' : 'confidence-derived readiness status',
        }),
        Base.makeClaim({
          text: options.readinessImplication || readiness.implication,
          confidence: 'supported',
          basis: options.readinessImplication ? 'caller supplied readiness implication' : 'confidence-derived readiness implication',
        }),
      ],
      confidence: 'supported',
    }));


    // ── Evidence register / visible evidence ───────────────

    const evidence = evidenceItems(map, options);
    sections.push(Base.makeSection({
      key: 'visible_evidence',
      title: 'Visible evidence',
      body: evidence.length
        ? 'The following evidence items or evidence signals are visible.'
        : 'No explicit evidence register is visible from the current material.',
      items: evidence.length ? evidence : ['Evidence pack not visible or not supplied as structured material.'],
      confidence: evidence.length ? confidence : 'not_readable',
      empty: evidence.length === 0,
      warnings: evidence.length ? [] : ['No explicit evidence pack visible.'],
    }));


    // ── What is currently supported ────────────────────────

    const movement = Base.movementItems(map);
    sections.push(Base.makeSection({
      key: 'what_current_material_supports',
      title: 'What the current material supports',
      body: movement.length
        ? 'These are the visible support or movement signals in the completed map.'
        : 'No clear support movement is visible from the current material.',
      items: movement.length ? movement : ['No supported technical movement visible from current material.'],
      confidence: movement.length ? confidence : 'not_readable',
      empty: movement.length === 0,
    }));


    // ── Open evidence gaps ─────────────────────────────────

    const gaps = Base.openGapItems(map);
    sections.push(Base.makeSection({
      key: 'open_evidence_gaps',
      title: 'Open evidence gaps',
      body: gaps.length
        ? `${gaps.length} open gap(s) are visible. These gaps should stay attached to the report.`
        : 'No open gaps are visible from the completed map.',
      items: gaps.length ? gaps : ['No open gaps visible from current map.'],
      confidence: gaps.length ? confidence : 'supported',
      empty: gaps.length === 0,
    }));


    // ── Non-movement or unresolved material ────────────────

    const stuck = Base.stuckItems(map);
    sections.push(Base.makeSection({
      key: 'unresolved_or_not_moving',
      title: 'What is unresolved or not moving',
      body: stuck.length
        ? 'These are visible non-movement, avoidance, or unresolved signals.'
        : 'No clear non-movement pattern is visible from the current material.',
      items: stuck.length ? stuck : ['No clear unresolved pattern visible from current material.'],
      confidence: stuck.length ? confidence : 'not_readable',
      empty: stuck.length === 0,
    }));


    // ── Burden, constraints, and timing ────────────────────

    const loadItems       = Base.loadItems(map);
    const constraintItems = Base.constraintItems(map);
    const combined        = loadItems.concat(constraintItems);

    sections.push(Base.makeSection({
      key: 'burden_constraints_and_timing',
      title: 'Burden, constraints, and timing',
      body: combined.length
        ? 'The map shows burden, constraint, timing, or capability-under-load signals that may affect readiness.'
        : 'No clear burden, constraint, or timing pressure is visible from the current material.',
      items: combined.length ? combined : ['No clear burden, constraint, or timing pressure visible.'],
      confidence: combined.length ? confidence : 'not_readable',
      warnings: state.load.capabilityNote ? [state.load.capabilityNote] : [],
      empty: combined.length === 0,
    }));


    // ── Held tensions ──────────────────────────────────────

    const tensions = Base.contradictionItems(map);
    sections.push(Base.makeSection({
      key: 'held_tensions',
      title: 'Held tensions',
      body: tensions.length
        ? 'These tensions should be held, not smoothed into a reassuring conclusion.'
        : 'No clear contradictions or held tensions are visible from the current material.',
      items: tensions.length ? tensions : ['No held tension visible from current material.'],
      confidence: tensions.length ? confidence : 'not_readable',
      empty: tensions.length === 0,
    }));


    // ── Priority evidence move ─────────────────────────────

    const nextMove = priorityEvidenceMove(map, options);
    sections.push(Base.makeSection({
      key: 'priority_evidence_move',
      title: 'Priority evidence move',
      claims: [
        Base.makeClaim({
          text: nextMove.text,
          confidence: nextMove.confidence,
          basis: nextMove.basis,
          directness: nextMove.confidence === 'inferred' ? 'inferred' : 'direct',
        }),
      ],
      confidence: nextMove.confidence,
    }));


    // ── Decision-use guidance ──────────────────────────────

    sections.push(Base.makeSection({
      key: 'decision_use_guidance',
      title: 'Decision-use guidance',
      claims: [
        Base.makeClaim({
          text: ['supported', 'strong'].includes(confidence)
            ? 'This report may support bounded technical discussion, evidence review, triage, or next-step planning inside the stated scope.'
            : 'This report should be used only to clarify missing evidence, sharpen the technical question, or prepare for qualified review.',
          confidence: 'supported',
          basis: 'confidence-derived decision-use guidance',
        }),
        Base.makeClaim({
          text: options.highConsequence === true
            ? 'High-consequence reliance requires qualified review, direct evidence, and authority sign-off outside this report.'
            : 'If the decision is safety-critical, compliance-critical, release-critical, procurement-critical, or legally consequential, qualified review is required before reliance.',
          confidence: 'supported',
          basis: 'report writer boundary',
        }),
      ],
      confidence: 'supported',
    }));


    // ── What should not yet be claimed ─────────────────────

    sections.push(Base.makeSection({
      key: 'what_should_not_yet_be_claimed',
      title: 'What should not yet be claimed',
      body:
        'These limits protect the report from being stretched beyond the current evidence.',
      items: notClaimableItems(confidence, map, options),
      confidence: 'supported',
    }));


    // ── Return final report ────────────────────────────────

    return Base.createReport({
      writerId:      WRITER_ID,
      writerVersion: VERSION,
      reportType:    'stem_technical_evidence_readiness',
      title:         options.title || 'S.T.E.M. Technical Evidence Readiness Report',
      audience:      options.audience || 'technical reviewer / operator / decision-preparation user',
      map,
      context: {
        domain:             options.domain || 'stem',
        useCase:            options.useCase || null,
        highConsequence:    options.highConsequence === true,
        suppliedReadiness:  options.readinessStatus || null,
        suppliedClaims:     claimItems(map, options),
      },
      sections,
      warnings,
      caveats: [
        'This report is not technical approval.',
        'This report is not engineering sign-off.',
        'This report is not safety certification.',
        'This report is not laboratory accreditation.',
        'This report is not compliance approval.',
        'This report is not procurement approval.',
        'This report does not replace qualified professional judgement.',
      ],
      limits: [
        'The report can only read the completed map and supplied material.',
        'It cannot verify tests, certificates, telemetry, measurements, supplier claims, code behaviour, or lab results independently.',
        'It cannot decide compliance, certification, safety, legality, procurement suitability, or engineering acceptance.',
        'Evidence gaps remain active until resolved by supplied evidence or qualified authority.',
        'Confidence attaches only to the bounded claim, configuration, sample, method, release, asset, or decision described.',
      ],
      metadata: {
        source: 'completed_sorter_map',
        family: 'stem',
        mutatesMap: false,
      },
    });
  }


  return {
    VERSION,
    WRITER_ID,
    write,
  };

})();


// Optional auto-registration if the report writer index is loaded.
if (typeof SorterReportWriters !== 'undefined') {
  try {
    SorterReportWriters.register(SorterReportWriterSTEMTechnicalEvidenceReadiness);
  } catch (err) {
    // Safe no-op. Caller can register manually.
  }
}