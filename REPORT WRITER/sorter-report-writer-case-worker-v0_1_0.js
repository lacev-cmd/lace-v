// ══════════════════════════════════════════════════════════
// SORTER REPORT WRITER — CASE WORKER  v0.1.0
//
// For support worker / case worker / re-entry mentor style
// contexts.
//
// Practical arc summary:
//   what moved
//   what stuck
//   what is under load
//   what blocks support
//   what gap matters next
//   one useful support point
//
// Not a compliance report.
// Not a risk assessment.
// Not a parole/probation scoring tool.
// ══════════════════════════════════════════════════════════

const SorterReportWriterCaseWorker = (() => {

  const VERSION = '0.1.0';
  const WRITER_ID = 'report-writer-case-worker';

  function write(map, options = {}) {
    const Base = SorterReportWriterBase;
    const confidence = Base.getOverallConfidence(map);
    const state = Base.extractMapState(map);

    const sections = [];

    sections.push(Base.makeSection({
      key: 'support_context',
      title: 'Support context',
      body:
        options.supportContext ||
        'This report is for practical support context. It is not a compliance record, risk score, diagnosis, or legal finding.',
      confidence: options.supportContext ? 'supported' : 'partial',
    }));

    sections.push(Base.makeSection({
      key: 'current_pressure_picture',
      title: 'Current pressure picture',
      body:
        `Load level: ${state.load.level || 'unknown'}. ` +
        `Open gaps: ${state.gaps.count || 0}. ` +
        `External constraints: ${state.constraints.count || 0}.`,
      items: Base.loadItems(map).concat(Base.constraintItems(map)),
      confidence,
      warnings: state.load.capabilityNote ? [state.load.capabilityNote] : [],
    }));

    const moving = Base.movementItems(map);
    sections.push(Base.makeSection({
      key: 'what_has_moved',
      title: 'What has moved',
      body: moving.length
        ? 'These are the visible practical movement signals.'
        : 'No clear practical movement is visible from the current material.',
      items: moving.length ? moving : ['Movement not visible from current material.'],
      confidence: moving.length ? confidence : 'not_readable',
      empty: moving.length === 0,
    }));

    const stuck = Base.stuckItems(map);
    sections.push(Base.makeSection({
      key: 'what_has_not_moved',
      title: 'What has not moved',
      body: stuck.length
        ? 'These are the visible non-movement or repeating pattern signals.'
        : 'No clear non-movement pattern is visible from the current material.',
      items: stuck.length ? stuck : ['Non-movement not visible from current material.'],
      confidence: stuck.length ? confidence : 'not_readable',
      empty: stuck.length === 0,
    }));

    const constraints = Base.constraintItems(map);
    sections.push(Base.makeSection({
      key: 'support_blocks',
      title: 'What may be blocking support progress',
      body: constraints.length
        ? 'The map shows external blocks that may limit what the person can do without support, access, resource, or decision movement.'
        : 'No clear external block is visible.',
      items: constraints.length ? constraints : ['No external constraint visible.'],
      confidence: constraints.length ? confidence : 'not_readable',
      empty: constraints.length === 0,
    }));

    const gaps = Base.openGapItems(map);
    const priorityGap = Base.highestPriorityGap(map);

    sections.push(Base.makeSection({
      key: 'priority_gap',
      title: 'Priority gap',
      claims: [
        Base.makeClaim({
          text: priorityGap
            ? `${priorityGap.name || priorityGap.key}: ${priorityGap.reason || 'Required material is missing.'}`
            : 'No priority gap is currently visible.',
          confidence: priorityGap ? 'supported' : confidence,
          basis: 'open-gap-discipline',
        }),
      ],
      items: gaps,
      confidence: priorityGap ? 'supported' : confidence,
    }));

    const tensions = Base.contradictionItems(map);
    sections.push(Base.makeSection({
      key: 'tensions_for_worker_awareness',
      title: 'Tensions for worker awareness',
      body: tensions.length
        ? 'These tensions may matter in support conversations. They should be held, not resolved by the report.'
        : 'No clear tensions visible.',
      items: tensions.length ? tensions : ['No held tension visible.'],
      confidence: tensions.length ? confidence : 'not_readable',
      empty: tensions.length === 0,
    }));

    sections.push(Base.makeSection({
      key: 'one_support_point',
      title: 'One useful support point',
      claims: [
        Base.makeClaim({
          text:
            options.supportPoint ||
            state.nextMove?.move ||
            (priorityGap ? `Help clarify or move the priority gap: ${priorityGap.name || priorityGap.key}.` : null) ||
            'Ask for one specific entry about what is most blocked right now.',
          confidence: options.supportPoint ? 'supported' : state.nextMove ? confidence : 'inferred',
          basis: options.supportPoint ? 'caller supplied' : 'map-derived',
          directness: options.supportPoint ? 'direct' : 'inferred',
        }),
      ],
      confidence: options.supportPoint ? 'supported' : state.nextMove ? confidence : 'inferred',
    }));

    sections.push(Base.makeSection({
      key: 'case_worker_limits',
      title: 'Limits',
      items: [
        'This is not a compliance assessment.',
        'This is not a risk score.',
        'This is not a legal or clinical finding.',
        'The report cannot verify what happened outside the written material.',
        'The report should support conversation, not replace worker judgement.',
      ],
      confidence: 'supported',
    }));

    return Base.createReport({
      writerId: WRITER_ID,
      writerVersion: VERSION,
      reportType: 'case_worker_summary',
      title: options.title || 'Case Worker Summary',
      audience: options.audience || 'case_worker',
      map,
      context: {
        sector: options.sector || map?.meta?.sector || 'general',
        supportContext: options.supportContext || null,
      },
      sections,
      caveats: Base.REQUIRED_CAVEATS,
      warnings: Base.warningsFromMap(map, options.warnings),
      limits: Base.defaultLimits(),
      metadata: {
        source: 'completed_sorter_map',
        mutatesMap: false,
      },
    });
  }

  return { VERSION, WRITER_ID, write };

})();