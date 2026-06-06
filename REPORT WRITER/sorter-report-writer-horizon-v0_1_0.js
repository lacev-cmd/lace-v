// ══════════════════════════════════════════════════════════
// SORTER REPORT WRITER — HORIZON  v0.1.0
//
// For the person reading their own planning surface.
// The only report writer in the system that faces forward.
//
// Requires:
//   SorterReportWriterBase      (loaded before this file)
//   AdaptiveComponentHorizonMap (executed — map must carry
//                                horizonMap state)
//
// If the map does not carry horizonMap state, this writer
// returns a not_projectable report explaining why and what
// would allow the horizon to be read.
// ══════════════════════════════════════════════════════════

const SorterReportWriterHorizon = (() => {

  const VERSION   = '0.1.0';
  const WRITER_ID = 'report-writer-horizon';


  // ── Projection confidence labels ──────────────────────────
  // Horizon-specific — different from map confidence labels.

  const PROJECTION_CONFIDENCE_LABELS = {
    not_projectable:  'not projectable — arc too thin or no direction stated',
    wide_uncertainty: 'wide uncertainty — directional only, not reliable at specifics',
    indicative:       'indicative — plausible direction, gaps remain',
    moderate:         'moderate — consistent arc, reliable for planning',
  };

  function projectionLabel(tier) {
    return PROJECTION_CONFIDENCE_LABELS[tier] || `(${tier || 'unknown'})`;
  }


  // ── Gap type labels ───────────────────────────────────────

  const GAP_TYPE_LABELS = {
    aligned:     'Arc aligned with intention',
    closing:     'Gap closing',
    holding:     'Gap holding',
    widening:    'Gap widening',
    diverging:   'Arc diverging from intention',
    unreachable: 'Intended state may be unreachable at current velocity',
    no_baseline: 'No intended state to compare against',
  };

  function gapLabel(gapType) {
    return GAP_TYPE_LABELS[gapType] || gapType || 'Gap not assessed';
  }


  // ── Gap movement labels ───────────────────────────────────

  const GAP_MOVEMENT_LABELS = {
    closing:  'The gap has been closing since the last reading.',
    holding:  'The gap has held without meaningful movement since the last reading.',
    widening: 'The gap has been widening since the last reading.',
    reversed: 'The gap reversed direction since the last reading.',
    new:      'First reading — no prior gap to compare against.',
  };

  function gapMovementLabel(trend) {
    return GAP_MOVEMENT_LABELS[trend] || 'Gap movement not yet tracked.';
  }


  // ── Horizon items ─────────────────────────────────────────
  // Extract blockers as readable items.

  function blockerItems(activeBlockers) {
    if (!activeBlockers?.length) return [];
    return activeBlockers.map(b => {
      const severity = b.severity ? ` [${b.severity}]` : '';
      return `${b.label || b.key}${severity}: ${b.desc || ''}`;
    });
  }


  // ── Main write function ───────────────────────────────────

  function write(map, options = {}) {
    const Base       = SorterReportWriterBase;
    const confidence = Base.getOverallConfidence(map);
    const state      = Base.extractMapState(map);
    const horizon    = map?.horizonMap || null;

    // ── Not projectable path ──────────────────────────────
    // No horizonMap state, or arc below threshold.
    // Return a structured explanation — not a blank report.

    if (!horizon || !horizon.projectable) {
      return _notProjectableReport(map, horizon, confidence, state, Base, options);
    }

    const sections = [];
    const projConf = horizon.projectionConfidence || 'wide_uncertainty';
    const gapType  = horizon.gapType              || 'no_baseline';
    const movement = horizon.gapMovementState     || {};


    // ── Section 1: What this is ───────────────────────────

    sections.push(Base.makeSection({
      key:   'what_this_is',
      title: 'What this is',
      body:
        'This is a planning surface built from the current arc. ' +
        'It shows where the arc is pointing and where you said you want to go. ' +
        'The gap between those two things is what you are actually planning across. ' +
        'It is not a forecast. It does not tell you what will happen. ' +
        'It is a structural picture built from what was written — ' +
        'and it is only as honest as that material.',
      confidence: 'supported',
    }));


    // ── Section 2: The horizon ────────────────────────────

    const horizonConfig = horizon.horizon || {};
    sections.push(Base.makeSection({
      key:   'the_horizon',
      title: 'The horizon',
      body:
        `Horizon: ${horizonConfig.label || horizonConfig.days + ' days' || 'not set'}. ` +
        `This is the point the planning surface is looking toward. ` +
        `Projection confidence: ${projectionLabel(projConf)}.`,
      confidence: 'supported',
      warnings: projConf === 'wide_uncertainty'
        ? ['Wide uncertainty — this projection is directional only. It is not reliable at specifics.']
        : [],
    }));


    // ── Section 3: Where the arc is pointing ─────────────

    const projectedState = horizon.projectedState;
    sections.push(Base.makeSection({
      key:   'where_arc_points',
      title: 'Where the arc is pointing',
      body:
        projectedState
          ? 'This is a projection — not a reading. It describes where the current arc points, not what will happen.'
          : 'The arc could not be projected. See blockers below.',
      claims: projectedState
        ? [Base.makeClaim({
            text:        projectedState,
            confidence:  _projConfToMapConf(projConf),
            basis:       'horizon-reading behaviour — projection from current arc',
            directness:  'inferred',
            limit:       'Projection only. Labelled as such. Not a forecast.',
          })]
        : [],
      confidence: _projConfToMapConf(projConf),
      empty:      !projectedState,
    }));


    // ── Section 4: Where you said you want to be ─────────

    const intendedState = horizon.intendedState;
    sections.push(Base.makeSection({
      key:   'intended_state',
      title: 'Where you said you want to be',
      body:
        intendedState
          ? 'This is drawn from the direction language in the material — your own words, where possible.'
          : 'No clear intended state was found in the material. Without a stated destination, the gap cannot be measured.',
      claims: intendedState
        ? [Base.makeClaim({
            text:       intendedState,
            confidence: 'partial',
            basis:      'baseline-vs-live-material — direction language in entries',
            directness: 'direct',
          })]
        : [],
      confidence: intendedState ? 'partial' : 'not_readable',
      empty:      !intendedState,
      warnings:   !intendedState
        ? ['No intended state found. Add a clear statement of direction to enable the full planning surface.']
        : [],
    }));


    // ── Section 5: The gap ────────────────────────────────

    sections.push(Base.makeSection({
      key:   'the_gap',
      title: 'The gap',
      body:  gapLabel(gapType) + (horizon.gapDescription ? '. ' + horizon.gapDescription : '.'),
      claims: [Base.makeClaim({
        text:       gapLabel(gapType),
        confidence: _projConfToMapConf(projConf),
        basis:      'horizon-map component — structural comparison of projected and intended states',
        directness: 'inferred',
        limit:      'Gap is structural — not a verdict on the person.',
      })],
      confidence: _projConfToMapConf(projConf),
    }));


    // ── Section 6: How the gap has moved ─────────────────
    // Only shown if two or more gap readings exist.

    if (movement.periodsTracked >= 2) {
      const reversalNote = movement.trend === 'reversed'
        ? ' This is a reversal — the prior trend has changed direction.'
        : '';

      const holdingNote = movement.trend === 'holding' && movement.periodsTracked >= 3
        ? ' The gap has held across three or more readings without movement. This may indicate structural resistance.'
        : '';

      sections.push(Base.makeSection({
        key:   'gap_movement',
        title: 'How the gap has moved',
        body:
          gapMovementLabel(movement.trend) +
          reversalNote +
          holdingNote +
          (movement.movementNote ? ' ' + movement.movementNote : ''),
        confidence: 'partial',
        warnings: movement.trend === 'reversed'
          ? ['Reversal detected — the gap direction changed since the last reading.']
          : [],
      }));
    }


    // ── Section 7: What is affecting the projection ───────

    const blockers = blockerItems(horizon.activeBlockers);
    const loadLevel = state.load?.level;
    const hasLoad   = loadLevel === 'high' || loadLevel === 'critical';

    sections.push(Base.makeSection({
      key:   'what_affects_projection',
      title: 'What is affecting the projection',
      body:
        blockers.length || hasLoad
          ? 'These factors are reducing projection reliability or affecting what the arc can do by the horizon.'
          : 'No significant projection blockers active.',
      items: [
        ...blockers,
        ...(hasLoad
          ? [`Load level: ${loadLevel} — high load compresses what is visible in the arc`]
          : []),
      ],
      confidence: 'supported',
      empty: !blockers.length && !hasLoad,
    }));


    // ── Section 8: A question the gap raises ─────────────

    const planningPrompt = horizon.planningPrompt;
    sections.push(Base.makeSection({
      key:   'planning_prompt',
      title: 'A question the gap raises',
      body:
        planningPrompt ||
        'The gap did not produce a specific planning question from the current material.',
      confidence: planningPrompt ? 'partial' : 'thin',
      warnings: !planningPrompt
        ? ['Planning prompt absent — add more material about direction and current movement to generate one.']
        : [],
    }));


    // ── Section 9: What the map read (current state) ──────
    // Kept brief — the full map is in the personal map report.
    // This section grounds the horizon in current reality.

    const moving = Base.movementItems(map);
    const gaps   = Base.openGapItems(map);

    sections.push(Base.makeSection({
      key:   'current_state',
      title: 'Where things stand now',
      body:
        'The horizon is built from this current state. ' +
        'What is moving now shapes what the arc can reach by the horizon.',
      items: [
        ...(moving.length
          ? moving.slice(0, 3).map(m => `Moving: ${m}`)
          : ['No clear movement visible in current material.']),
        ...(gaps.length
          ? gaps.slice(0, 3).map(g => `Gap: ${g}`)
          : []),
      ],
      confidence,
      empty: moving.length === 0 && gaps.length === 0,
    }));


    // ── Section 10: Projection limits ────────────────────

    sections.push(Base.makeSection({
      key:   'projection_limits',
      title: 'What this projection cannot tell you',
      items: [
        'This projection describes where the arc is pointing — not what will happen.',
        'A closing gap does not guarantee reaching the intended state.',
        'A widening gap does not mean the intended state is unreachable.',
        'The projection is only as reliable as the arc beneath it.',
        'Events outside the material can change the trajectory at any point.',
        'Projection confidence cannot exceed moderate — even on a strong arc.',
        'This is a working document. It updates as new entries arrive.',
      ],
      confidence: 'supported',
    }));


    // ── Assemble ──────────────────────────────────────────

    const horizonWarnings = _horizonWarnings(horizon, confidence, projConf);

    return Base.createReport({
      writerId:      WRITER_ID,
      writerVersion: VERSION,
      reportType:    'horizon',
      title:         options.title || `Horizon — ${horizonConfig.label || 'Planning Surface'}`,
      audience:      'person',
      map,
      context: {
        sector:   options.sector || map?.meta?.sector || null,
        period:   options.period || null,
        horizon:  horizonConfig,
        gapType,
        projectionConfidence: projConf,
      },
      sections,
      warnings: [...Base.warningsFromMap(map), ...horizonWarnings],
      limits:   _horizonLimits(),
      caveats:  _horizonCaveats(),
      metadata: {
        source:           'completed_sorter_map_with_horizon',
        mutatesMap:       false,
        horizonComponent: 'adaptive-component-13-horizon-map-v0_1_0',
        horizonBehaviour: 'sorter-behaviour-17-horizon-reading-v0_1_0',
      },
    });
  }


  // ── Not projectable report ────────────────────────────────
  // Returned when the arc is too thin or direction is absent.
  // Not an error — a structured explanation with a clear
  // path to making the horizon readable.

  function _notProjectableReport(map, horizon, confidence, state, Base, options) {
    const reason = _notProjectableReason(horizon, map);
    const sections = [];

    sections.push(Base.makeSection({
      key:   'what_this_is',
      title: 'What this is',
      body:
        'A planning surface could not be produced from the current material. ' +
        'This is not a problem — it means the arc does not yet have enough to project from. ' +
        'Below is what is needed to make the horizon readable.',
      confidence: 'supported',
    }));

    sections.push(Base.makeSection({
      key:   'why_not_projectable',
      title: 'Why the horizon cannot be read yet',
      items: reason,
      confidence: 'supported',
    }));

    sections.push(Base.makeSection({
      key:   'what_would_help',
      title: 'What would make it readable',
      items: _whatWouldHelp(horizon, map),
      confidence: 'supported',
    }));

    const nextMove = state.nextMove;
    sections.push(Base.makeSection({
      key:   'next_useful_move',
      title: 'One useful move for now',
      body:
        'While the horizon is not yet readable, this is the most useful move available from the current map.',
      claims: [Base.makeClaim({
        text:       nextMove?.move || 'Add one honest entry about where you want to be and what is currently in the way.',
        confidence: nextMove ? confidence : 'inferred',
        basis:      nextMove ? 'next-useful-move behaviour' : 'fallback',
      })],
      confidence: nextMove ? confidence : 'inferred',
    }));

    return Base.createReport({
      writerId:      WRITER_ID,
      writerVersion: VERSION,
      reportType:    'horizon_not_projectable',
      title:         options.title || 'Horizon — Not Yet Readable',
      audience:      'person',
      map,
      context: {
        sector:              options.sector || map?.meta?.sector || null,
        projectable:         false,
        notProjectableReason: reason,
      },
      sections,
      warnings: Base.warningsFromMap(map),
      limits:   _horizonLimits(),
      caveats:  _horizonCaveats(),
      metadata: {
        source:     'completed_sorter_map',
        mutatesMap: false,
        projectable: false,
      },
    });
  }


  // ── Helpers ───────────────────────────────────────────────

  function _notProjectableReason(horizon, map) {
    const reasons = [];
    if (!horizon) {
      reasons.push('The horizon map component has not been executed.');
      return reasons;
    }
    const blockers = horizon.activeBlockers || [];
    const critical = blockers.filter(b => b.severity === 'critical');
    if (critical.length) {
      critical.forEach(b => reasons.push(`${b.label}: ${b.desc}`));
    }
    if (!reasons.length) {
      reasons.push('Arc does not meet the minimum threshold for projection.');
    }
    return reasons;
  }

  function _whatWouldHelp(horizon, map) {
    const help = [];
    const blockers = horizon?.activeBlockers || [];

    const hasNoDirection = blockers.some(b => b.key === 'no_direction');
    const hasThinArc     = blockers.some(b => b.key === 'thin_arc');
    const hasShortArc    = blockers.some(b => b.key === 'arc_too_short');

    if (hasNoDirection) {
      help.push('State where you want to be — one honest sentence about the realistic direction, not the aspirational version.');
    }
    if (hasThinArc) {
      help.push(`Add at least ${(horizon?.horizonConfig?.minimumArcPeriods || 3)} independent entries from separate sessions before the horizon can be projected.`);
    }
    if (hasShortArc) {
      help.push(`The arc needs to span at least ${(horizon?.horizonConfig?.minimumArcDays || 21)} days before the trajectory is readable.`);
    }
    if (!help.length) {
      help.push('Add more material across multiple sessions. The arc needs time as well as volume.');
    }
    return help;
  }

  function _horizonWarnings(horizon, confidence, projConf) {
    const warnings = [];
    if (projConf === 'wide_uncertainty') {
      warnings.push('Projection confidence is wide uncertainty. This planning surface is directional only — not reliable at specifics.');
    }
    if (horizon?.gapType === 'diverging') {
      warnings.push('Arc is currently diverging from the stated intention. The gap is widening.');
    }
    if (horizon?.gapType === 'unreachable') {
      warnings.push('The intended state may be unreachable at current velocity within the stated horizon. This is a structural observation — not a verdict.');
    }
    if (horizon?.gapMovementState?.trend === 'reversed') {
      warnings.push('Gap direction reversed since last reading.');
    }
    return warnings;
  }

  function _projConfToMapConf(projConf) {
    // Maps projection confidence tier to nearest map confidence level
    // for use in Base.makeClaim and Base.makeSection.
    const map = {
      not_projectable:  'not_readable',
      wide_uncertainty: 'thin',
      indicative:       'partial',
      moderate:         'supported',
    };
    return map[projConf] || 'thin';
  }

  function _horizonLimits() {
    return [
      'This report faces forward — it extrapolates, it does not read.',
      'Every projection is labelled. Nothing here is a forecast of what will happen.',
      'The gap is a structural observation — not a verdict on success or failure.',
      'A closing gap does not guarantee reaching the intended state.',
      'A widening gap does not mean the intended state is unreachable.',
      'Events outside the written material can change the trajectory at any point.',
      'This report updates as new entries arrive — it is not fixed.',
      'The arc reads what was written. It cannot read what was not written.',
    ];
  }

  function _horizonCaveats() {
    return [
      'This is a projection from current material — not a prediction.',
      'Not a plan. Not a recommendation. Not a verdict.',
      'Written for the person — not for a professional, case worker, or system.',
      'Projection confidence cannot exceed moderate regardless of arc strength.',
    ];
  }


  // ── Public API ────────────────────────────────────────────

  return { VERSION, WRITER_ID, write };

})();
