// ══════════════════════════════════════════════════════════
// SORTER REPORT WRITER — PERSONAL MAP  v0.1.0
//
// For the person reading their own map.
// Plain, direct, honest.
// Not clinical. Not motivational. Not flattering.
// Does not produce professional handover.
// Does not create findings.
// ══════════════════════════════════════════════════════════

const SorterReportWriterPersonalMap = (() => {

  const VERSION = '0.1.0';
  const WRITER_ID = 'report-writer-personal-map';

  function write(map, options = {}) {
    const Base = SorterReportWriterBase;
    const confidence = Base.getOverallConfidence(map);
    const state = Base.extractMapState(map);

    const sections = [];

    sections.push(Base.makeSection({
      key: 'what_this_is',
      title: 'What this is',
      body:
        'This is a private map built from what was written. It reads the material; it does not judge the person. If something is missing, the map names the gap instead of guessing.',
      confidence: 'supported',
    }));

    sections.push(Base.makeSection({
      key: 'what_the_map_read',
      title: 'What the map read',
      claims: [
        Base.makeClaim({
          text: state.movement?.summary || 'The map read the available entries for movement, non-movement, load, contradiction, gaps, and confidence.',
          confidence,
          basis: 'overall map state',
        }),
      ],
      confidence,
      empty: confidence === 'not_readable',
    }));

    const moving = Base.movementItems(map);
    sections.push(Base.makeSection({
      key: 'what_is_moving',
      title: 'What is moving',
      body: moving.length
        ? 'These are the clearest movement signals visible in the material.'
        : 'No clear movement signal is visible in this period.',
      items: moving.length ? moving : ['Movement not visible from current material.'],
      confidence: moving.length ? confidence : 'not_readable',
      empty: moving.length === 0,
    }));

    const stuck = Base.stuckItems(map);
    sections.push(Base.makeSection({
      key: 'what_is_not_moving',
      title: 'What is not moving',
      body: stuck.length
        ? 'These are the clearest non-movement or circling signals visible in the material.'
        : 'No clear non-movement signal is visible in this period.',
      items: stuck.length ? stuck : ['Non-movement not visible from current material.'],
      confidence: stuck.length ? confidence : 'not_readable',
      empty: stuck.length === 0,
    }));

    const load = Base.loadItems(map);
    sections.push(Base.makeSection({
      key: 'what_is_under_load',
      title: 'What is under load',
      body: load.length
        ? `Load is present. Current load level: ${state.load.level || 'unknown'}.`
        : 'No clear load signal is visible in the current map.',
      items: load.length ? load : ['Load not visible from current material.'],
      confidence: load.length ? confidence : 'not_readable',
      warnings: state.load.capabilityNote ? [state.load.capabilityNote] : [],
      empty: load.length === 0,
    }));

    const tensions = Base.contradictionItems(map);
    sections.push(Base.makeSection({
      key: 'what_is_held',
      title: 'What is held without resolving',
      body: tensions.length
        ? 'The map found tensions. It names them without deciding which side is the full truth.'
        : 'No clear unresolved tension is visible in this period.',
      items: tensions.length ? tensions : ['No held tension visible from current material.'],
      confidence: tensions.length ? confidence : 'not_readable',
      empty: tensions.length === 0,
    }));

    const gaps = Base.openGapItems(map);
    sections.push(Base.makeSection({
      key: 'what_is_missing',
      title: 'What is missing',
      body: gaps.length
        ? 'These gaps limit what the map can honestly read.'
        : 'No open gaps are currently visible.',
      items: gaps.length ? gaps : ['No open gaps visible.'],
      confidence: gaps.length ? 'supported' : confidence,
      empty: gaps.length === 0,
    }));

    const nextMove = state.nextMove;
    sections.push(Base.makeSection({
      key: 'next_useful_move',
      title: 'One next useful move',
      claims: [
        Base.makeClaim({
          text: nextMove?.move || 'Add one specific entry about the highest-pressure or least-clear part of the map.',
          confidence: nextMove ? confidence : 'inferred',
          basis: nextMove ? 'next-useful-move behaviour' : 'fallback from missing nextMove',
          directness: nextMove ? 'direct' : 'inferred',
          limit: nextMove ? null : 'Fallback only. Runtime did not provide a nextMove object.',
        }),
      ],
      confidence: nextMove ? confidence : 'inferred',
    }));

    sections.push(Base.makeSection({
      key: 'map_confidence',
      title: 'Map confidence',
      body: `Overall confidence: ${Base.label(confidence)}.`,
      claims: [
        Base.makeClaim({
          text: `The current map confidence is ${confidence}.`,
          confidence: 'supported',
          basis: 'map.confidence.overall',
        }),
      ],
      confidence: 'supported',
    }));

    sections.push(Base.makeSection({
      key: 'map_limits',
      title: 'What this map cannot tell you',
      items: Base.defaultLimits(),
      confidence: 'supported',
    }));

    return Base.createReport({
      writerId: WRITER_ID,
      writerVersion: VERSION,
      reportType: 'personal_map',
      title: options.title || 'Personal Map Report',
      audience: 'person',
      map,
      context: {
        sector: options.sector || map?.meta?.sector || null,
        period: options.period || null,
      },
      sections,
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