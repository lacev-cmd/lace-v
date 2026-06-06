// ══════════════════════════════════════════════════════════
// SORTER REPORT WRITER — PROGRESS ARC  v0.1.0
//
// Fortnightly / monthly arc report.
// Shows movement versus non-movement over a period.
// Focuses on what changed, what repeated, what thinned,
// what deepened, what stayed under load, and what remains
// unresolved.
//
// Does not produce motivational progress language unless
// the map supports it.
// ══════════════════════════════════════════════════════════

const SorterReportWriterProgressArc = (() => {

  const VERSION = '0.1.0';
  const WRITER_ID = 'report-writer-progress-arc';

  function compareOverallConfidence(Base, previousMap, currentMap) {
    if (!previousMap) return 'No previous map supplied. This is a single-period arc report.';

    const prev = Base.getOverallConfidence(previousMap);
    const curr = Base.getOverallConfidence(currentMap);

    if (Base.confidenceRank(curr) > Base.confidenceRank(prev)) {
      return `Map confidence has strengthened from ${prev} to ${curr}.`;
    }

    if (Base.confidenceRank(curr) < Base.confidenceRank(prev)) {
      return `Map confidence has weakened from ${prev} to ${curr}.`;
    }

    return `Map confidence is stable at ${curr}.`;
  }

  function write(currentMap, options = {}) {
    const Base = SorterReportWriterBase;
    const previousMap = options.previousMap || null;
    const confidence = Base.getOverallConfidence(currentMap);
    const state = Base.extractMapState(currentMap);

    const sections = [];

    sections.push(Base.makeSection({
      key: 'period',
      title: 'Report period',
      body:
        options.period ||
        'No explicit period supplied. Treat this as a current-window progress arc only.',
      confidence: options.period ? 'supported' : 'partial',
      warnings: options.period ? [] : ['No explicit report period supplied.'],
    }));

    sections.push(Base.makeSection({
      key: 'confidence_arc',
      title: 'Confidence arc',
      claims: [
        Base.makeClaim({
          text: compareOverallConfidence(Base, previousMap, currentMap),
          confidence: previousMap ? 'supported' : 'partial',
          basis: previousMap ? 'previous and current map confidence' : 'current map only',
        }),
      ],
      confidence: previousMap ? 'supported' : 'partial',
    }));

    const moving = Base.movementItems(currentMap);
    sections.push(Base.makeSection({
      key: 'movement_arc',
      title: 'What is moving',
      body: moving.length
        ? `Movement strength: ${state.movement.strength || 'unknown'}.`
        : 'No clear movement is visible in this report window.',
      items: moving.length ? moving : ['Movement not visible from current material.'],
      confidence: moving.length ? confidence : 'not_readable',
      empty: moving.length === 0,
    }));

    const stuck = Base.stuckItems(currentMap);
    sections.push(Base.makeSection({
      key: 'drag_or_non_movement',
      title: 'What is dragging or not moving',
      body: stuck.length
        ? 'Non-movement or circling is visible in this report window.'
        : 'No clear non-movement signal is visible in this report window.',
      items: stuck.length ? stuck : ['Non-movement not visible from current material.'],
      confidence: stuck.length ? confidence : 'not_readable',
      empty: stuck.length === 0,
    }));

    const connections = Base.asArray(state.connections.detected);
    sections.push(Base.makeSection({
      key: 'connections_across_time',
      title: 'Connections across time',
      body: connections.length
        ? 'Recurring patterns or connections are visible.'
        : 'No clear recurring pattern is visible in the current map.',
      items: connections.length ? connections : ['No recurrence visible from current material.'],
      confidence: connections.length ? confidence : 'not_readable',
      empty: connections.length === 0,
    }));

    const stateChanges = Base.asArray(state.stateChanges.detected);
    sections.push(Base.makeSection({
      key: 'state_changes',
      title: 'State changes',
      body: stateChanges.length
        ? 'Possible or evidenced state changes are visible.'
        : state.stateChanges.note || 'No state change is visible from the current material.',
      items: stateChanges.length ? stateChanges : ['No state change visible.'],
      confidence: stateChanges.length ? confidence : 'not_readable',
      empty: stateChanges.length === 0,
    }));

    const load = Base.loadItems(currentMap);
    sections.push(Base.makeSection({
      key: 'load_arc',
      title: 'Load over the period',
      body:
        `Current load level: ${state.load.level || 'unknown'}. ` +
        `Capability status: ${state.load.capabilityStatus || 'unknown'}.`,
      items: load.length ? load : ['No clear load signal visible.'],
      confidence: load.length ? confidence : 'not_readable',
      warnings: state.load.capabilityNote ? [state.load.capabilityNote] : [],
      empty: load.length === 0,
    }));

    const meta = state.metaReading || {};
    sections.push(Base.makeSection({
      key: 'map_engagement',
      title: 'Map engagement',
      body:
        meta.engagementType
          ? `Engagement type: ${meta.engagementType}.`
          : 'No meta-reading engagement type is available.',
      items: Base.asArray(meta.signals || meta.detected || []),
      confidence: meta.engagementType ? confidence : 'not_readable',
      empty: !meta.engagementType,
    }));

    const gaps = Base.openGapItems(currentMap);
    sections.push(Base.makeSection({
      key: 'unresolved_gaps',
      title: 'Unresolved gaps',
      body: gaps.length
        ? 'These gaps remain open and limit the arc read.'
        : 'No open gaps visible.',
      items: gaps.length ? gaps : ['No open gaps visible.'],
      confidence: gaps.length ? 'supported' : confidence,
      empty: gaps.length === 0,
    }));

    sections.push(Base.makeSection({
      key: 'next_period_move',
      title: 'One useful move for the next period',
      claims: [
        Base.makeClaim({
          text:
            state.nextMove?.move ||
            Base.highestPriorityGap(currentMap)?.reason ||
            'Add one specific entry about the area with the least clarity.',
          confidence: state.nextMove ? confidence : 'inferred',
          basis: state.nextMove ? 'next-useful-move behaviour' : 'fallback from gaps',
          directness: state.nextMove ? 'direct' : 'inferred',
        }),
      ],
      confidence: state.nextMove ? confidence : 'inferred',
    }));

    return Base.createReport({
      writerId: WRITER_ID,
      writerVersion: VERSION,
      reportType: 'progress_arc',
      title: options.title || 'Progress Arc Report',
      audience: options.audience || 'person_or_support_context',
      map: currentMap,
      context: {
        sector: options.sector || currentMap?.meta?.sector || null,
        period: options.period || null,
        hasPreviousMap: !!previousMap,
      },
      sections,
      caveats: Base.REQUIRED_CAVEATS,
      warnings: Base.warningsFromMap(currentMap, options.warnings),
      limits: Base.defaultLimits(),
      metadata: {
        source: 'completed_sorter_map',
        comparesPreviousMap: !!previousMap,
        mutatesMap: false,
      },
    });
  }

  return { VERSION, WRITER_ID, write };

})();