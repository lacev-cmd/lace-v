// ══════════════════════════════════════════════════════════
// SORTER SPINE  v0.1.0
//
// The runtime. Wires behaviours, guides, cartridges, and
// the engine together. Produces a map state object.
// Report writers and adaptive components consume the map.
//
// LOAD ORDER (in HTML):
//   1. mercator-core.js      (or nexus-core.js)
//   2. sorter-spine.js       (this file)
//   3. behaviour files       (sorter-behaviour-*.js)
//   4. guide files           (sorter-guide-*.js)
//   5. adaptive components   (adaptive-component-*.js)  [optional]
//   6. report writer base    (sorter-report-writer-base.js)
//   7. report writers        (sorter-report-writer-*.js)
//   8. cartridge             (window.SORTER_CARTRIDGE = {...})
//   9. shell                 (your UI layer)
//
// USAGE:
//
//   // Register behaviours (call before run)
//   SorterSpine.registerBehaviour(BehaviourConfidenceCalibration);
//   SorterSpine.registerBehaviour(BehaviourNextUsefulMove);
//   SorterSpine.registerBehaviour(BehaviourStateChangeDetection);
//   // ... etc
//
//   // Attach a guide
//   SorterSpine.attachGuide(GuideRelationships);
//
//   // Register adaptive components (optional)
//   SorterSpine.registerComponent(AdaptiveComponentTrustDrift);
//
//   // Mount cartridge (assembled from guide + behaviours)
//   const cartridge = SorterSpine.assembleCartridge(GuideRelationships);
//   MercatorEngine.mountCartridge(cartridge);
//
//   // Run: produce map state from engine state
//   const map = SorterSpine.run({
//     baseline:    MercatorEngine.getState().baseline,
//     entries:     MercatorEngine.getState().entries,
//     corrections: MercatorEngine.getState().corrections,
//     cartridge:   MercatorEngine.getCartridge(),
//     period:      { start: '2025-01-01', end: '2025-06-01' },
//   });
//
//   // Render
//   const report = SorterReportWriterPersonalMap.write(map, { sector: 'relationships' });
//
// ══════════════════════════════════════════════════════════

const SorterSpine = (() => {

  const VERSION = '0.1.0';

  // ── Registry ──────────────────────────────────────────────

  const _behaviours  = {};   // id → behaviour object
  const _guides      = {};   // id → guide object
  const _components  = {};   // id → adaptive component object
  const _activeGuide = { current: null };

  function registerBehaviour(b) {
    if (!b?.id) throw new Error('SorterSpine: behaviour must have an id.');
    _behaviours[b.id] = b;
  }

  function attachGuide(g) {
    if (!g?.id) throw new Error('SorterSpine: guide must have an id.');
    _guides[g.id] = g;
    _activeGuide.current = g;
  }

  function registerComponent(c) {
    if (!c?.id) throw new Error('SorterSpine: component must have an id.');
    _components[c.id] = c;
  }

  function getGuide(id) {
    return _guides[id] || null;
  }

  function getBehaviour(id) {
    return _behaviours[id] || null;
  }

  // ── Cartridge assembly ────────────────────────────────────
  //
  // Takes a guide and produces a cartridge object that
  // MercatorEngine can mount. Merges guide domain knowledge
  // with steer overrides from active behaviours.

  function assembleCartridge(guide, overrides = {}) {
    if (!guide) throw new Error('SorterSpine.assembleCartridge: guide required.');

    const steer        = guide.steer         || {};
    const sectorNotes  = guide.sectorNotes   || {};

    // Stuck rx: prefer guide steer override, fall back to behaviour default
    const stuckRx = steer['movement-non-movement-reading']?.defaultStuckRx
      || /\b(same thing|going in circles|nothing changes|same pattern|no progress|still the same|back to square one|what is the point|nothing moves)\b/i;

    // Priority gap ordering from steer
    const priorityGapKeys = steer['open-gap-discipline']?.priorityGaps || [];
    const gaps = _applyGapPriority(guide.gaps || [], priorityGapKeys);

    // Crisis rx — default if not supplied by guide
    const crisisRx = guide.crisisRx
      || /\b(kill myself|end my life|suicide|suicidal|I want to die|don't want to be here|hurt myself|harm myself|can't go on|not worth it|overdose)\b/i;

    return {
      id:          overrides.id      || guide.sector || guide.id,
      name:        overrides.name    || sectorNotes.outputAudience || guide.sector,
      tagline:     overrides.tagline || `private · evidence-bound`,
      desc:        overrides.desc    || [
        sectorNotes.outputAudience,
        sectorNotes.distinctivePressures?.length
          ? 'Key pressures: ' + sectorNotes.distinctivePressures.slice(0, 3).join('; ') + '.'
          : null,
      ].filter(Boolean).join('.. '),

      accent:      overrides.accent      || guide.accent      || '#2d5a3d',
      accentLight: overrides.accentLight || guide.accentLight || '#e8f0ea',

      baselineTitle:       overrides.baselineTitle       || 'Set your baseline',
      baselineDesc:        overrides.baselineDesc        || _buildBaselineDesc(sectorNotes),
      baselinePlaceholder: overrides.baselinePlaceholder || _buildBaselinePlaceholder(sectorNotes),
      entryTitle:          overrides.entryTitle          || 'Add an entry',
      entryDesc:           overrides.entryDesc           || sectorNotes.outputRegister || 'Write what is on your mind.',
      entryPlaceholder:    overrides.entryPlaceholder    || 'What is on your mind?',
      reportDesc:          overrides.reportDesc          || 'The map reads what is moving, stuck, and under load based on what you wrote.',
      reportEmptyDesc:     overrides.reportEmptyDesc     || 'Add a baseline and at least one entry, then read your map.',

      crisisCheck:      overrides.crisisCheck !== undefined ? overrides.crisisCheck : (guide.crisisCheck !== false),
      crisisRx,

      gaps,
      skills:             guide.skills            || [],
      contradictions:     guide.contradictions     || [],
      directionPatterns:  guide.directionPatterns  || [],
      pressureSignals:    guide.pressureSignals    || [],
      stuckRx,

      // Steer data passed through for engine consumption
      _steer:        steer,
      _sectorNotes:  sectorNotes,

      sampleBaseline:    overrides.sampleBaseline    || '',
      sampleEntries:     overrides.sampleEntries     || [],
      sampleCorrection:  overrides.sampleCorrection  || null,
    };
  }

  function _applyGapPriority(gaps, priorityKeys) {
    if (!priorityKeys.length) return gaps;
    return [...gaps].sort((a, b) => {
      const ai = priorityKeys.indexOf(a.key);
      const bi = priorityKeys.indexOf(b.key);
      const ap = ai === -1 ? 99 : ai;
      const bp = bi === -1 ? 99 : bi;
      return ap - bp;
    }).map((g, i) => ({ ...g, priority: i }));
  }

  function _buildBaselineDesc(sectorNotes) {
    const parts = ['Where you are now. What has led to this point. What the current pressure looks like.'];
    if (sectorNotes.distinctiveGaps?.length) {
      parts.push('The map particularly needs: ' + sectorNotes.distinctiveGaps.slice(0, 3).join('; ') + '.');
    }
    if (sectorNotes.distinctiveMovement?.length) {
      parts.push('Movement in this domain looks like: ' + sectorNotes.distinctiveMovement.slice(0, 2).join('; ') + '.');
    }
    return parts.join(' ');
  }

  function _buildBaselinePlaceholder(sectorNotes) {
    if (sectorNotes.distinctiveGaps?.length) {
      return `Where are you now? What has led to this point? Include: ${sectorNotes.distinctiveGaps[0]}.`;
    }
    return 'Where are you right now? What is already under pressure?';
  }

  // ── Run ───────────────────────────────────────────────────
  //
  // Takes raw engine state and produces the map state object.
  // This is the main pipeline: behaviours applied in order,
  // map state built incrementally, then returned.

  function run(opts = {}) {
    const {
      baseline    = '',
      entries     = [],
      corrections = [],
      cartridge   = null,
      period      = null,
    } = opts;

    if (!cartridge) {
      console.warn('SorterSpine.run: no cartridge supplied.');
    }

    // Filter entries to period if supplied
    const filteredEntries = period
      ? entries.filter(e => {
          if (!e.date) return true;
          if (period.start && e.date < period.start) return false;
          if (period.end   && e.date > period.end)   return false;
          return true;
        })
      : entries;

    const trace    = [];
    const warnings = [];

    // ── Step 1: Gap reading ───────────────────────────────

    const gaps = _readGaps(cartridge, baseline, filteredEntries);
    trace.push({ step: 'gaps', status: 'ok' });

    // ── Step 2: Skill reading ─────────────────────────────

    const skills = _readSkills(cartridge, filteredEntries);
    trace.push({ step: 'skills', status: 'ok' });

    // ── Step 3: Contradiction reading ─────────────────────

    const contradictions = _readContradictions(cartridge, baseline, filteredEntries);
    trace.push({ step: 'contradictions', status: 'ok' });

    // ── Step 4: Direction reading ─────────────────────────

    const directions = _readDirections(cartridge, baseline, filteredEntries);
    trace.push({ step: 'directions', status: 'ok' });

    // ── Step 5: Pressure reading ──────────────────────────

    const pressure = _readPressure(cartridge, filteredEntries);
    trace.push({ step: 'pressure', status: 'ok' });

    // ── Step 6: Movement reading ──────────────────────────

    const movement = _readMovement(cartridge, filteredEntries);
    trace.push({ step: 'movement', status: 'ok' });

    // ── Step 7: Stuck reading ─────────────────────────────

    const stuck = _readStuck(cartridge, filteredEntries);
    trace.push({ step: 'stuck', status: 'ok' });

    // ── Step 8: Load assessment ───────────────────────────

    const load = _assessLoad(cartridge, skills, pressure, filteredEntries);
    trace.push({ step: 'load', status: 'ok' });

    // ── Step 9: State change detection ───────────────────
    // Behaviour 13 — requires baseline + entries separation

    const stateChanges = _detectStateChanges(
      cartridge, baseline, entries, filteredEntries, skills
    );
    trace.push({ step: 'state_changes', status: 'ok' });

    // ── Step 10: Connections across time ──────────────────
    // Patterns that persist across the full arc

    const connections = _detectConnections(
      cartridge, baseline, entries, filteredEntries
    );
    trace.push({ step: 'connections', status: 'ok' });

    // ── Step 11: Confidence calibration ──────────────────
    // Behaviour 12 — caps confidence based on gaps and material

    const confidence = _calibrateConfidence(
      gaps, movement, filteredEntries, corrections
    );
    trace.push({ step: 'confidence', status: 'ok' });

    // ── Step 12: Next useful move ─────────────────────────
    // Behaviour 10 — 8-step priority order

    const nextMove = _computeNextMove(
      gaps, movement, stuck, pressure, skills, contradictions, corrections
    );
    trace.push({ step: 'next_move', status: 'ok' });

    // ── Step 13: External constraints ────────────────────

    const constraints = _readConstraints(cartridge, baseline, filteredEntries);
    trace.push({ step: 'constraints', status: 'ok' });

    // ── Assemble map ──────────────────────────────────────

    const map = {
      meta: {
        sector:      cartridge?._sectorNotes ? (cartridge.id || null) : null,
        cartridgeId: cartridge?.id || null,
        period:      period || null,
        entryCount:  filteredEntries.length,
        baselineSet: !!baseline,
      },
      confidence: {
        overall:      confidence.overall,
        byBehaviour:  confidence.byBehaviour,
      },
      movement: {
        isMoving:        movement.isMoving,
        signals:         movement.signals,
        summary:         movement.summary,
        independentDays: movement.independentDays,
      },
      stuck: {
        signals: stuck.signals,
      },
      load: {
        level:          load.level,
        signals:        load.signals,
        capabilityNote: load.capabilityNote,
      },
      gaps: {
        count: gaps.length,
        items: gaps,
      },
      skills: {
        present:              skills.present,
        absent:               skills.absent,
        loadSensitivePresent: skills.loadSensitivePresent,
      },
      contradictions: {
        detected: contradictions,
      },
      directions: {
        detected: directions,
      },
      pressure: {
        signals: pressure,
      },
      stateChanges: {
        detected: stateChanges,
      },
      connections: {
        detected: connections,
      },
      nextMove,
      handover: {
        available:    true,
        consentState: null,
      },
      corrections: {
        applied:      corrections,
        primaryTopic: _findPrimaryTopic(corrections),
      },
      constraints: {
        external: constraints,
      },
    };

    return map;
  }

  // ── Internal reading functions ────────────────────────────
  // These implement the behaviour logic using cartridge patterns.

  function _testRx(rx, text) {
    if (!rx || !text) return false;
    try {
      return (rx instanceof RegExp ? rx : new RegExp(rx.source || rx, rx.flags || 'i')).test(text);
    } catch (e) { return false; }
  }

  function _allText(entries) {
    return entries.map(e => e.text || '').join('\n');
  }

  function _independentDays(entries, rx) {
    const days = new Set();
    entries.forEach(e => {
      if (_testRx(rx, e.text || '') && e.date) days.add(e.date.slice(0, 10));
    });
    return days.size;
  }

  function _readGaps(cartridge, baseline, entries) {
    const gaps    = cartridge?.gaps || [];
    const allText = _allText(entries);
    return gaps
      .filter(g => !_testRx(g.rx, baseline) && !_testRx(g.rx, allText))
      .map((g, i) => ({ ...g, priority: g.priority !== undefined ? g.priority : i }));
  }

  function _readSkills(cartridge, entries) {
    const skills = cartridge?.skills || [];
    const present = [], absent = [], loadSensitivePresent = [];
    skills.forEach(s => {
      const days = _independentDays(entries, s.rx);
      if (days > 0) {
        present.push({ ...s, independentDays: days, confidence: _skillConfidence(days, entries.length) });
        if (s.loadSensitive) loadSensitivePresent.push(s);
      } else {
        absent.push(s);
      }
    });
    return { present, absent, loadSensitivePresent };
  }

  function _skillConfidence(independentDays, entryCount) {
    if (entryCount === 0)       return 'not_readable';
    if (independentDays >= 5)   return 'strong';
    if (independentDays >= 3)   return 'supported';
    if (independentDays >= 2)   return 'partial';
    if (independentDays === 1)  return 'thin';
    return 'inferred';
  }

  function _readContradictions(cartridge, baseline, entries) {
    const contradictions = cartridge?.contradictions || [];
    const allText = baseline + '\n' + _allText(entries);
    return contradictions
      .filter(c => _testRx(c.a, allText) && _testRx(c.b, allText))
      .map(c => ({
        type:  'detected',
        label: c.text?.slice(0, 60) || 'Contradiction detected',
        note:  c.text || null,
        text:  c.text || null,
      }));
  }

  function _readDirections(cartridge, baseline, entries) {
    const patterns = cartridge?.directionPatterns || [];
    const allText  = baseline + '\n' + _allText(entries);
    return patterns.filter(p => _testRx(p.rx, allText)).map(p => p.label);
  }

  function _readPressure(cartridge, entries) {
    const signals = cartridge?.pressureSignals || [];
    const allText = _allText(entries);
    return signals.filter(s => _testRx(s.rx, allText)).map(s => s.label);
  }

  function _readMovement(cartridge, entries) {
    if (!entries.length) return { isMoving: false, signals: [], summary: null, independentDays: 0 };
    const skills = cartridge?.skills || [];
    let totalDays = 0;
    const signals = [];
    skills.forEach(s => {
      const days = _independentDays(entries, s.rx);
      if (days > 0) { signals.push(s.name); totalDays += days; }
    });
    const independentDays = Math.min(totalDays, entries.length);
    const summary = signals.length
      ? signals.slice(0, 3).join(', ')
      : 'Not yet visible — more entries needed.';
    return { isMoving: signals.length > 0, signals, summary, independentDays };
  }

  function _readStuck(cartridge, entries) {
    const rx      = cartridge?.stuckRx;
    const allText = _allText(entries);
    return { signals: (rx && _testRx(rx, allText)) ? ['Stuck language present.'] : [] };
  }

  function _assessLoad(cartridge, skills, pressure, entries) {
    const steer       = cartridge?._steer || {};
    const loadSignals = steer['load-sensitive-capability']?.defaultLoadSignals || [];
    const allText     = _allText(entries);

    const activeLoadSignals = loadSignals
      .filter(s => _testRx(s.rx, allText))
      .map(s => s.key);

    const level = activeLoadSignals.length >= 3 ? 'high'
                : activeLoadSignals.length >= 1 ? 'moderate'
                : pressure.length > 0           ? 'low'
                : 'none';

    // Capability note: load-sensitive skills present + high load = note
    let capabilityNote = null;
    if (level === 'high' && skills.loadSensitivePresent.length > 0) {
      const names = skills.loadSensitivePresent.map(s => s.name).join(', ');
      capabilityNote = `Load is high. ${names} ${skills.loadSensitivePresent.length === 1 ? 'is' : 'are'} load-sensitive — consistent performance under current conditions is not confirmed.`;
    }

    return { level, signals: activeLoadSignals, capabilityNote };
  }

  function _detectStateChanges(cartridge, baseline, allEntries, filteredEntries, skills) {
    // Behaviour 13 — requires baseline period vs current entries
    // Minimum separation: 7 days
    if (!baseline || allEntries.length < 2) return [];

    const changes = [];

    // Check each skill: was it absent in baseline-adjacent entries but present now?
    const baselineEntries = allEntries.slice(0, Math.ceil(allEntries.length * 0.3));
    const recentEntries   = allEntries.slice(-Math.ceil(allEntries.length * 0.3));

    if (baselineEntries.length === 0 || recentEntries.length === 0) return [];

    skills.present.forEach(s => {
      const inBaseline = _independentDays(baselineEntries, s.rx) > 0;
      const inRecent   = _independentDays(recentEntries, s.rx) > 0;
      if (!inBaseline && inRecent) {
        changes.push({
          type:       'capability_gained',
          label:      `${s.name} — not visible at baseline, now present`,
          confidence: s.independentDays >= 3 ? 'evidenced' : 'emerging',
          topics:     [s.key],
          note:       s.works,
        });
      }
    });

    skills.absent.forEach(s => {
      const inBaseline = _independentDays(baselineEntries, s.rx) > 0;
      if (inBaseline) {
        changes.push({
          type:       'capability_lost',
          label:      `${s.name} — visible at baseline, no longer present`,
          confidence: 'emerging',
          topics:     [s.key],
          note:       s.breaks,
        });
      }
    });

    // Check for stuck-to-moving or moving-to-stuck
    const stuckRx = cartridge?.stuckRx;
    if (stuckRx) {
      const stuckInBaseline = _testRx(stuckRx, _allText(baselineEntries));
      const stuckInRecent   = _testRx(stuckRx, _allText(recentEntries));
      if (stuckInBaseline && !stuckInRecent) {
        changes.push({ type: 'stuck_to_moving', label: 'Stuck pattern visible at baseline, not in recent entries', confidence: 'emerging', topics: [], note: null });
      }
      if (!stuckInBaseline && stuckInRecent) {
        changes.push({ type: 'moving_to_stuck', label: 'Stuck pattern not at baseline, now present in recent entries', confidence: 'emerging', topics: [], note: null });
      }
    }

    return changes;
  }

  function _detectConnections(cartridge, baseline, allEntries, filteredEntries) {
    // Patterns that persist across the full arc — not just current period
    const connections = [];
    const skills = cartridge?.skills || [];

    skills.forEach(s => {
      const days = _independentDays(allEntries, s.rx);
      if (days >= 3) {
        const dated = allEntries
          .filter(e => _testRx(s.rx, e.text || '') && e.date)
          .map(e => e.date.slice(0, 10))
          .sort();
        connections.push({
          type:       'persistent_skill',
          label:      `${s.name} — persistent across the arc`,
          confidence: days >= 5 ? 'strong' : 'supported',
          firstSeen:  dated[0] || null,
          lastSeen:   dated[dated.length - 1] || null,
          spanDays:   dated.length > 1
            ? Math.round((new Date(dated[dated.length - 1]) - new Date(dated[0])) / 86400000)
            : 0,
          note: null,
        });
      }
    });

    return connections;
  }

  function _calibrateConfidence(gaps, movement, entries, corrections) {
    // Behaviour 12 — gap-capping, correction upgrading
    const n = entries.length;
    if (n === 0) return { overall: 'not_readable', byBehaviour: {} };

    // Base confidence from movement + gaps
    let base;
    if      (gaps.length >= 4)                                         base = 'thin';
    else if (movement.independentDays >= 3 && gaps.length <= 1)        base = 'supported';
    else if (movement.independentDays >= 2)                            base = 'partial';
    else if (n > 0 && gaps.length <= 2)                                base = 'partial';
    else                                                               base = 'thin';

    // Correction effect: primary correction upgrades one tier
    const primaryCorrection = corrections.find(c => c.primary === true);
    const TIERS = ['not_readable', 'inferred', 'thin', 'partial', 'supported', 'strong'];
    let overall = base;
    if (primaryCorrection) {
      const idx = TIERS.indexOf(base);
      if (idx >= 0 && idx < TIERS.length - 1) overall = TIERS[idx + 1];
    }

    // Gap-capping: if many gaps, cap at thin
    if (gaps.length >= 4 && overall !== 'not_readable') overall = 'thin';

    return {
      overall,
      byBehaviour: {
        'gap-reading':         gaps.length === 0 ? 'supported' : 'partial',
        'movement-reading':    movement.isMoving ? 'partial' : 'not_readable',
        'confidence-calibration': overall,
      },
    };
  }

  function _computeNextMove(gaps, movement, stuck, pressure, skills, contradictions, corrections) {
    // Behaviour 10 — 8-step priority order

    // Rank 1: active primary correction
    const primaryCorrection = corrections.find(c => c.primary === true);
    if (primaryCorrection) {
      return {
        rank:      1,
        move:      `Add more specific material about ${primaryCorrection.topic || 'the primary topic'}.`,
        rationale: 'The correction flags this as the most important area. The map cannot read it clearly yet.',
      };
    }

    // Rank 2: direction missing
    if (!movement.isMoving && !gaps.find(g => g.key === 'direction') && corrections.length === 0) {
      // direction gap — check if directions list is empty via movement signals
    }
    // Direction missing if no direction gap but also no direction signals
    const directionMissing = gaps.some(g => g.key === 'direction') ||
      (gaps.length === 0 && !movement.isMoving);
    if (directionMissing) {
      return {
        rank:      2,
        move:      'State the direction clearly.',
        rationale: 'The map cannot assess fit or movement without knowing what is being aimed for.',
      };
    }

    // Rank 3: domain-specific gap prompt for highest-priority blocking gap
    const blockingGap = gaps.find(g => g.priority === 0 || g.priority === undefined);
    if (blockingGap && blockingGap.reason) {
      return {
        rank:      3,
        move:      `Address the open gap: ${blockingGap.reason}`,
        rationale: `The map cannot read this area until this material is present.`,
      };
    }

    // Rank 4: contradiction present
    if (contradictions.length > 0) {
      return {
        rank:      4,
        move:      'Describe the specific conditions where each side of the tension is true.',
        rationale: 'A contradiction is present. Context is more useful than a clean story.',
      };
    }

    // Rank 5: skill breaking under load
    const breakingSkill = skills.loadSensitivePresent?.[0];
    if (breakingSkill) {
      return {
        rank:      5,
        move:      `Describe one specific moment when ${breakingSkill.name} broke down.`,
        rationale: 'The capability is present but not yet consistent. A specific breakdown moment is more useful than a summary.',
      };
    }

    // Rank 6: pressure active with no structural response
    if (pressure.length > 0 && !movement.isMoving) {
      return {
        rank:      6,
        move:      `Describe what would reduce the main pressure: ${pressure[0]}.`,
        rationale: 'Pressure is active and there is no response visible in the material.',
      };
    }

    // Rank 7: open gap present
    if (gaps.length > 0) {
      const g = gaps[0];
      return {
        rank:      7,
        move:      g.reason ? `Address the open gap: ${g.reason}` : `Name what is not yet described: ${g.name}.`,
        rationale: 'Required material is absent. The map cannot read this area until it arrives.',
      };
    }

    // Rank 8: strongest active pressure point
    if (stuck.signals.length > 0) {
      return {
        rank:      8,
        move:      'Name specifically what has not moved and what is getting in the way.',
        rationale: 'A stuck pattern is present. Naming the specific obstacle is the most useful next entry.',
      };
    }

    // Rank 8 fallback
    return {
      rank:      8,
      move:      'Add honest material — the map cannot produce a reliable next move yet.',
      rationale: 'The map does not have enough material to direct the next entry specifically.',
    };
  }

  function _readConstraints(cartridge, baseline, entries) {
    // External constraint language — deadlines, orders, conditions
    const constraintRx = /\b(deadline|court date|hearing|licence condition|order condition|I have to|I must by|I am required|the condition|by the date|the appointment is|I have until|time limit|expires|renewal|due date)\b/i;
    const allText = baseline + '\n' + _allText(entries);
    return _testRx(constraintRx, allText) ? ['External constraint language visible in the material.'] : [];
  }

  function _findPrimaryTopic(corrections) {
    const primary = corrections.find(c => c.primary === true);
    return primary?.topic || null;
  }

  // ── Component runner ──────────────────────────────────────
  //
  // Run registered adaptive components against the map state.
  // Returns an array of component responses.

  function runComponents(map, componentIds = null) {
    const ids      = componentIds || Object.keys(_components);
    const responses = [];

    ids.forEach(id => {
      const component = _components[id];
      if (!component) return;

      // Components act on mapped state — not text.
      // Each component is expected to expose a .respond(map) method
      // if it's wired as a runtime component. Config-only components
      // (like the uploaded ones) are descriptive, not executable here.
      if (typeof component.respond === 'function') {
        try {
          const response = component.respond(map);
          responses.push({ componentId: id, ...response });
        } catch (e) {
          responses.push({ componentId: id, error: e.message, warnings: ['Component threw during respond().'] });
        }
      }
    });

    return responses;
  }

  // ── Public ────────────────────────────────────────────────

  return {
    VERSION,
    registerBehaviour,
    attachGuide,
    registerComponent,
    getGuide,
    getBehaviour,
    assembleCartridge,
    run,
    runComponents,
  };

})();
