// ══════════════════════════════════════════════════════════
// SORTER RUNTIME  v0.1.0
//
// Behaviour runtime adapter for SorterSpine v0.5.0.
// Provides read() implementations for each behaviour,
// keyed by behaviour id.
//
// Usage:
//   SorterSpine.setRuntime(SorterRuntime);
//
// Contract:
//   SorterRuntime.read(input, accumulatedMap, composedConfig)
//   → updatedMap
//
// The runtime does not know about the spine internals.
// It receives what it needs and returns an updated map.
//
// Config files (behaviour JS files) are the source of truth
// for rules, thresholds, and regex. This file applies them.
//
// Each behaviour section:
//   — reads the composed config for its rules and thresholds
//   — reads the input and accumulated map for current state
//   — returns the map with its section updated
//   — never overwrites sections owned by other behaviours
// ══════════════════════════════════════════════════════════

const SorterRuntime = (() => {


  // ── Helpers ───────────────────────────────────────────────

  function _entryText(entry) {
    return typeof entry === 'string' ? entry : (entry.text || entry.content || '');
  }

  function _entryDate(entry) {
    return entry.date || entry.timestamp || null;
  }

  function _dayKey(dateStr) {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return isNaN(d) ? null : d.toISOString().slice(0, 10);
  }

  function _daysBetween(a, b) {
    const da = new Date(a);
    const db = new Date(b);
    return Math.abs(Math.round((db - da) / 86400000));
  }

  function _testRegex(rx, text) {
    if (!rx) return false;
    const r = rx instanceof RegExp ? rx : new RegExp(rx.source || rx, rx.flags || 'i');
    return r.test(text);
  }

  function _allEntryText(entries) {
    return entries.map(_entryText).join('\n');
  }

  function _uniqueDays(entries) {
    const days = new Set();
    entries.forEach(e => {
      const d = _dayKey(_entryDate(e));
      if (d) days.add(d);
    });
    return days;
  }


  // ── Behaviour implementations ─────────────────────────────
  // Each returns an updatedMap with its section populated.
  // The dispatch table at the bottom routes by behaviour id.


  // 01 — Correction as Governance
  function _correctionAsGovernance(input, map, config) {
    const corrections = input.corrections || [];
    const applied = [];
    const stale   = [];
    const primary = [];

    corrections.forEach(c => {
      if (c.type === 'stale')   stale.push(c.topic);
      if (c.type === 'primary') primary.push(c.topic);
      applied.push(c);
    });

    return {
      ...map,
      corrections: {
        applied,
        staleTopics:   stale,
        primaryTopics: primary,
        count:         applied.length,
      },
    };
  }


  // 02 — Baseline vs Live Material
  function _baselineVsLiveMaterial(input, map, config) {
    const baseline = input.baseline || '';
    const entries  = input.entries  || [];
    const recent   = entries.slice(-Math.min(5, entries.length));
    const recentText = _allEntryText(recent);

    // Simple drift detection: topics in baseline not appearing in recent entries
    const baselineWords = baseline.toLowerCase().split(/\W+/).filter(w => w.length > 4);
    const recentWords   = new Set(recentText.toLowerCase().split(/\W+/));
    const drifted = baselineWords.filter(w => !recentWords.has(w));

    return {
      ...map,
      baseline: {
        text:          baseline,
        entryCount:    entries.length,
        recentPeriod:  recent.length,
        driftSignals:  drifted.slice(0, 10),  // Top drift candidates
        hasDrift:      drifted.length > 3,
      },
    };
  }


  // 03 — Open Gap Discipline
  function _openGapDiscipline(input, map, config) {
    const allText    = _allEntryText(input.entries || []) + '\n' + (input.baseline || '');
    const gapDefs    = config.gaps || config.defaultGaps || [];
    const priority   = config.priorityGaps || [];
    const openGaps   = [];
    const closedGaps = [];

    gapDefs.forEach(gap => {
      const filled = _testRegex(gap.rx, allText);
      if (filled) {
        closedGaps.push(gap.key || gap.name);
      } else {
        openGaps.push({
          key:    gap.key || gap.name,
          name:   gap.name,
          reason: gap.reason || 'Not described in material.',
        });
      }
    });

    // Sort open gaps by priority order
    openGaps.sort((a, b) => {
      const ai = priority.indexOf(a.key);
      const bi = priority.indexOf(b.key);
      if (ai === -1 && bi === -1) return 0;
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });

    return {
      ...map,
      gaps: {
        open:   openGaps,
        closed: closedGaps,
        count:  openGaps.length,
        highestPriority: openGaps[0] || null,
      },
    };
  }


  // 04 — Independent Signal Counting
  function _independentSignalCounting(input, map, config) {
    const entries      = input.entries || [];
    const negationRx   = config.negationRx;
    const ladder       = config.confidenceLadder || [];
    const corrections  = map.corrections || {};
    const staleTopics  = (corrections.staleTopics || []).map(t => t.toLowerCase());

    // Count independent days per topic by scanning entries
    const topicDays = {};

    entries.forEach(entry => {
      const text = _entryText(entry);
      const day  = _dayKey(_entryDate(entry));
      if (!day) return;

      // Skip negated mentions
      if (negationRx && _testRegex(negationRx, text)) return;

      // Simple topic extraction: significant words > 5 chars
      const words = text.toLowerCase().match(/\b[a-z]{5,}\b/g) || [];
      words.forEach(word => {
        if (staleTopics.includes(word)) return;
        if (!topicDays[word]) topicDays[word] = new Set();
        topicDays[word].add(day);
      });
    });

    // Map topics to signal strength
    const signals = {};
    Object.entries(topicDays).forEach(([topic, days]) => {
      const count = days.size;
      let tier = ladder[0];
      for (const t of ladder) {
        if (count >= (t.independentDays || 0)) tier = t;
      }
      if (count >= 2) {  // Only surface meaningful signals
        signals[topic] = {
          independentDays: count,
          label:           tier.label,
          weight:          tier.weight,
        };
      }
    });

    return { ...map, signals };
  }


  // 05 — External Constraint Reading
  function _externalConstraintReading(input, map, config) {
    const allText       = _allEntryText(input.entries || []);
    const constraintRx  = config.defaultConstraintRx;
    const constraintTypes = config.constraintTypes || [];
    const detected      = [];

    // Check default constraint language
    if (constraintRx && _testRegex(constraintRx, allText)) {
      detected.push({
        type:       'general',
        label:      'External constraint language detected',
        changeable: null,  // Cannot determine without more analysis
      });
    }

    // Check specific constraint types if they have detection patterns
    constraintTypes.forEach(ct => {
      if (ct.rx && _testRegex(ct.rx, allText)) {
        detected.push({
          type:       ct.key,
          label:      ct.label,
          changeable: ct.changeable !== false,
        });
      }
    });

    return {
      ...map,
      constraints: {
        detected,
        hasConstraints: detected.length > 0,
        count:          detected.length,
      },
    };
  }


  // 06 — Movement / Non-Movement Reading
  function _movementNonMovementReading(input, map, config) {
    const entries      = input.entries || [];
    const actionRx     = config.defaultActionRx;
    const stuckRx      = config.defaultStuckRx;
    const evidence     = config.movementEvidence || [];
    const moving       = [];
    const stuck        = [];

    entries.forEach((entry, idx) => {
      const text = _entryText(entry);
      const day  = _dayKey(_entryDate(entry)) || `entry-${idx}`;

      const hasAction = actionRx ? _testRegex(actionRx, text) : false;
      const hasStuck  = stuckRx  ? _testRegex(stuckRx,  text) : false;

      // Check movement evidence
      const matchedEvidence = evidence.filter(e =>
        text.toLowerCase().includes(e.toLowerCase().slice(0, 20))
      );

      if (hasAction || matchedEvidence.length > 0) {
        moving.push({ day, evidence: matchedEvidence, text: text.slice(0, 100) });
      } else if (hasStuck) {
        stuck.push({ day, text: text.slice(0, 100) });
      }
    });

    const isMoving = moving.length > stuck.length;
    const ratio    = entries.length > 0
      ? (moving.length / entries.length).toFixed(2)
      : 0;

    return {
      ...map,
      movement: {
        moving,
        stuck,
        isMoving,
        movementRatio: ratio,
        summary: isMoving
          ? `Movement evidenced in ${moving.length} of ${entries.length} entries.`
          : `Non-movement pattern in ${stuck.length} of ${entries.length} entries.`,
      },
    };
  }


  // 07 — Avoidance Detection
  function _avoidanceDetection(input, map, config) {
    const entries      = input.entries || [];
    const notAvoidance = config.notAvoidance || [];
    const constraints  = map.constraints || {};
    const allText      = _allEntryText(entries);
    const detected     = [];

    // Avoidance pattern: topic mentioned repeatedly but no action language
    const actionRx = config.defaultActionRx;

    entries.forEach((entry, idx) => {
      const text = _entryText(entry);
      const day  = _dayKey(_entryDate(entry)) || `entry-${idx}`;

      // Check if this looks like description without action
      const hasAction      = actionRx ? _testRegex(actionRx, text) : false;
      const isDescriptive  = text.length > 80 && !hasAction;

      if (isDescriptive) {
        // Check not-avoidance exclusions
        const excluded = notAvoidance.some(na =>
          text.toLowerCase().includes(na.toLowerCase().slice(0, 20))
        );

        // Check external constraint (behaviour 15 ran first)
        const hasConstraint = constraints.hasConstraints;

        if (!excluded && !hasConstraint) {
          detected.push({
            day,
            text:   text.slice(0, 100),
            reason: 'Description without action language.',
          });
        }
      }
    });

    return {
      ...map,
      avoidance: {
        detected,
        count:        detected.length,
        hasAvoidance: detected.length > 0,
      },
    };
  }


  // 08 — Load-Sensitive Capability
  function _loadSensitiveCapability(input, map, config) {
    const entries     = input.entries || [];
    const loadSignals = config.defaultLoadSignals || [];
    const allText     = _allEntryText(entries);
    const activeLoad  = [];

    loadSignals.forEach(signal => {
      if (_testRegex(signal.rx, allText)) {
        activeLoad.push({ key: signal.key, label: signal.key });
      }
    });

    const loadLevel = activeLoad.length === 0 ? 'low'
      : activeLoad.length <= 2               ? 'moderate'
      : activeLoad.length <= 4               ? 'high'
      :                                        'critical';

    return {
      ...map,
      load: {
        activeSignals: activeLoad,
        level:         loadLevel,
        count:         activeLoad.length,
        capabilityNote: loadLevel === 'high' || loadLevel === 'critical'
          ? 'High load present. Capability reads may not reflect stable baseline.'
          : null,
      },
    };
  }


  // 09 — Contradiction Holding
  function _contradictionHolding(input, map, config) {
    const entries        = input.entries || [];
    const contradictions = [];

    // Simple contradiction detection: opposing sentiment on same topic
    // across entries. Lightweight pattern — not semantic analysis.
    const positiveRx = /\b(good|well|fine|better|improving|positive|confident|hopeful|moving|sorted)\b/i;
    const negativeRx = /\b(bad|struggling|worse|difficult|stuck|hopeless|not moving|broken|failed|cannot)\b/i;

    const positiveEntries = entries.filter(e => _testRegex(positiveRx, _entryText(e)));
    const negativeEntries = entries.filter(e => _testRegex(negativeRx, _entryText(e)));

    if (positiveEntries.length > 0 && negativeEntries.length > 0) {
      contradictions.push({
        type:  'sentiment-conflict',
        label: 'Both positive and negative states described across entries.',
        positiveCount: positiveEntries.length,
        negativeCount: negativeEntries.length,
        note:  'Held — both may be real. Do not flatten.',
      });
    }

    return {
      ...map,
      contradictions: {
        detected:      contradictions,
        count:         contradictions.length,
        hasContradiction: contradictions.length > 0,
      },
    };
  }


  // 10 — Competing Priorities
  function _competingPriorities(input, map, config) {
    const entries    = input.entries || [];
    const costSigs   = config.costSignals || [];
    const allText    = _allEntryText(entries);
    const competing  = [];

    costSigs.forEach(sig => {
      if (_testRegex(sig.rx, allText)) {
        competing.push({
          key:   sig.key,
          label: sig.key.replace(/_/g, ' '),
          cost:  'Cost detected in material.',
        });
      }
    });

    return {
      ...map,
      competingPriorities: {
        detected:    competing,
        count:       competing.length,
        hasCompeting: competing.length > 0,
      },
    };
  }


  // 11 — Connections Across Time
  function _connectionsAcrossTime(input, map, config) {
    const entries    = input.entries || [];
    const minDays    = config.minimumSeparationDays || 7;
    const patterns   = config.watchPatterns || [];
    const connections = [];

    if (entries.length < 2) {
      return { ...map, connections: { detected: [], count: 0 } };
    }

    // Check each watch pattern for recurrence across separated entries
    patterns.forEach(pattern => {
      const matchingEntries = entries.filter(e =>
        _entryText(e).toLowerCase().includes(pattern.toLowerCase().slice(0, 15))
      );

      if (matchingEntries.length >= 2) {
        const first = matchingEntries[0];
        const last  = matchingEntries[matchingEntries.length - 1];
        const fd    = _entryDate(first);
        const ld    = _entryDate(last);

        if (fd && ld && _daysBetween(fd, ld) >= minDays) {
          connections.push({
            pattern,
            occurrences: matchingEntries.length,
            firstSeen:   fd,
            lastSeen:    ld,
            spanDays:    _daysBetween(fd, ld),
          });
        }
      }
    });

    return {
      ...map,
      connections: {
        detected: connections,
        count:    connections.length,
      },
    };
  }


  // 12 — State Change Detection
  function _stateChangeDetection(input, map, config) {
    const entries    = input.entries  || [];
    const baseline   = input.baseline || '';
    const minDays    = config.minimumSeparationDays || 7;
    const changes    = [];

    if (entries.length < 2 || !baseline) {
      return {
        ...map,
        stateChanges: { detected: [], count: 0, note: 'Insufficient material for state change detection.' },
      };
    }

    // Compare baseline topics to recent entry topics
    const baselineWords = new Set(
      baseline.toLowerCase().match(/\b[a-z]{5,}\b/g) || []
    );
    const recentEntries = entries.slice(-3);
    const recentWords   = new Set(
      _allEntryText(recentEntries).toLowerCase().match(/\b[a-z]{5,}\b/g) || []
    );

    // Topics in baseline but absent from recent = possible reduction
    const reduced = [...baselineWords].filter(w => !recentWords.has(w));
    // Topics in recent but absent from baseline = possible emergence
    const emerged = [...recentWords].filter(w => !baselineWords.has(w));

    if (reduced.length > 5) {
      changes.push({
        type:       'pressure_reduced',
        label:      'Topics present at baseline are less present in recent entries.',
        confidence: 'emerging',
        topics:     reduced.slice(0, 5),
      });
    }

    if (emerged.length > 5) {
      changes.push({
        type:       'pressure_increased',
        label:      'New topics present in recent entries not visible at baseline.',
        confidence: 'emerging',
        topics:     emerged.slice(0, 5),
      });
    }

    return {
      ...map,
      stateChanges: {
        detected: changes,
        count:    changes.length,
      },
    };
  }


  // 13 — Confidence Calibration
  function _confidenceCalibration(input, map, config) {
    const entries   = input.entries || [];
    const gaps      = map.gaps      || {};
    const signals   = map.signals   || {};
    const openGaps  = (gaps.open || []).length;
    const signalCount = Object.keys(signals).length;

    let overall = 'not_readable';

    if (entries.length === 0) {
      overall = 'not_readable';
    } else if (entries.length === 1 || signalCount < 3) {
      overall = 'thin';
    } else if (openGaps > 3) {
      overall = 'partial';
    } else if (entries.length >= 3 && signalCount >= 5 && openGaps <= 2) {
      overall = 'supported';
    } else if (entries.length >= 5 && signalCount >= 8 && openGaps === 0) {
      overall = 'strong';
    } else {
      overall = 'partial';
    }

    // Inferred check — if movement is based on absence
    const movementIsInferred = map.movement?.moving?.length === 0 && entries.length > 0;

    return {
      ...map,
      confidence: {
        overall,
        inferred:       movementIsInferred,
        openGapCount:   openGaps,
        signalCount,
        entryCount:     entries.length,
        label:          config.outputLabels?.[overall] || `(${overall})`,
      },
    };
  }


  // 14 — Next Useful Move
  function _nextUsefulMove(input, map, config) {
    const gaps        = map.gaps        || {};
    const avoidance   = map.avoidance   || {};
    const constraints = map.constraints || {};
    const load        = map.load        || {};
    const confidence  = map.confidence  || {};

    let nextMove = null;
    let reason   = null;

    // Priority logic: constraint → gap → avoidance → load → direction
    if (constraints.hasConstraints) {
      nextMove = 'Address the external block before anything else can move.';
      reason   = 'External constraint is the primary block.';
    } else if (gaps.highestPriority) {
      nextMove = `Address the open gap: ${gaps.highestPriority.name || gaps.highestPriority.key}.`;
      reason   = gaps.highestPriority.reason || 'Highest priority gap.';
    } else if (avoidance.hasAvoidance) {
      nextMove = 'Name what is being avoided and take one step toward it.';
      reason   = 'Avoidance pattern present.';
    } else if (load.level === 'high' || load.level === 'critical') {
      nextMove = 'Address the load before attempting new movement.';
      reason   = `Load level: ${load.level}.`;
    } else if (confidence.overall === 'not_readable' || confidence.overall === 'thin') {
      nextMove = 'Add more material — the map cannot produce a reliable next move yet.';
      reason   = `Map confidence: ${confidence.overall}.`;
    } else {
      nextMove = 'Continue the current movement. The map shows evidence of progress.';
      reason   = 'No critical blocks detected.';
    }

    return {
      ...map,
      nextMove: { move: nextMove, reason },
    };
  }


  // 15 — Private Record to Optional Handover
  function _privateRecordToOptionalHandover(input, map, config) {
    // This behaviour governs handover rules — not execution.
    // Runtime sets the handover config on the map.
    // Actual handover output is produced by the application layer.
    return {
      ...map,
      handover: {
        ownershipRules:  config.ownershipRules  || {},
        outputTypes:     config.handoverOutputTypes || [],
        caveats:         config.requiredCaveats || [],
        privacyRules:    config.privacyRules    || {},
        readyForHandover: false,  // Set by HandoverTrigger component
      },
    };
  }


  // 16 — Meta Reading
  function _metaReading(input, map, config) {
    const entries         = input.entries || [];
    const honestySignals  = config.honestySignals  || [];
    const performanceSigs = config.performanceSignals || [];
    const allText         = _allEntryText(entries);

    let honestyScore     = 0;
    let performanceScore = 0;

    honestySignals.forEach(sig => {
      if (sig.rx && _testRegex(sig.rx, allText)) honestyScore++;
    });

    performanceSigs.forEach(sig => {
      if (sig.rx && _testRegex(sig.rx, allText)) performanceScore++;
    });

    // Entry length trend
    const lengths = entries.map(e => _entryText(e).length);
    const avgEarly  = lengths.slice(0, Math.ceil(lengths.length / 2))
      .reduce((a, b) => a + b, 0) / Math.max(1, Math.ceil(lengths.length / 2));
    const avgRecent = lengths.slice(Math.ceil(lengths.length / 2))
      .reduce((a, b) => a + b, 0) / Math.max(1, lengths.length - Math.ceil(lengths.length / 2));

    const trend = avgRecent > avgEarly * 1.2 ? 'deepening'
      : avgRecent < avgEarly * 0.7            ? 'thinning'
      :                                         'stable';

    let engagementType = 'honest';
    if (performanceScore > honestyScore && performanceScore >= 2) {
      engagementType = 'performed';
    } else if (trend === 'thinning' && entries.length > 3) {
      engagementType = 'thinning';
    } else if (entries.length > 0 && honestyScore >= 2) {
      engagementType = 'deepening';
    }

    const mapReliable = engagementType !== 'performed';

    return {
      ...map,
      metaReading: {
        engagementType,
        honestyScore,
        performanceScore,
        trend,
        mapReliable,
        note: mapReliable
          ? null
          : 'Performance signals detected. Map picture may not reflect honest account.',
      },
    };
  }


  // ── Dispatch table ────────────────────────────────────────

  const _behaviourMap = {
    'correction-as-governance':          _correctionAsGovernance,
    'baseline-vs-live-material':         _baselineVsLiveMaterial,
    'open-gap-discipline':               _openGapDiscipline,
    'independent-signal-counting':       _independentSignalCounting,
    'external-constraint-reading':       _externalConstraintReading,
    'movement-non-movement-reading':     _movementNonMovementReading,
    'avoidance-detection':               _avoidanceDetection,
    'load-sensitive-capability':         _loadSensitiveCapability,
    'contradiction-holding':             _contradictionHolding,
    'competing-priorities':              _competingPriorities,
    'connections-across-time':           _connectionsAcrossTime,
    'state-change-detection':            _stateChangeDetection,
    'confidence-calibration':            _confidenceCalibration,
    'next-useful-move':                  _nextUsefulMove,
    'private-record-to-optional-handover': _privateRecordToOptionalHandover,
    'meta-reading':                      _metaReading,
  };


  // ── Public read() ─────────────────────────────────────────

  function read(input, accumulatedMap, composedConfig) {
    const behaviourId = composedConfig.id;
    const impl = _behaviourMap[behaviourId];

    if (!impl) {
      // Unknown behaviour — pass map through unchanged
      console.warn(`SorterRuntime: no read() implementation for "${behaviourId}". Passing through.`);
      return accumulatedMap;
    }

    return impl(input, accumulatedMap, composedConfig);
  }


  // ── Public API ────────────────────────────────────────────

  return {
    read,
    // Expose individual implementations for testing
    _behaviourMap,
  };

})();
