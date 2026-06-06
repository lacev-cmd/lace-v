// ══════════════════════════════════════════════════════════
// SORTER RUNTIME  v0.2.0
//
// Behaviour runtime adapter for SorterSpine v0.5.0.
// Provides read() implementations for each behaviour,
// keyed by behaviour id.
//
// v0.2.0 updates over v0.1.0:
//   — All implementations updated to read the full pattern
//     libraries from behaviour config v0.2.0 / v0.3.0.
//   — Movement: now reads intentionRx, moodOnlyRx,
//     internalMovementRx, loadMovementRx, collapseRecoveryRx,
//     structureRx, negatedActionRx. Entry classification is
//     now multi-signal rather than binary.
//   — Avoidance: now reads lexicalAvoidanceRx,
//     indirectAvoidanceRx, deflectionRx, knowingWithoutDoingRx.
//     Avoidance type is now classified, not just detected.
//   — Independent signal counting: now applies intensityRx
//     and stalenessRx filters before counting.
//   — Contradiction: now reads all six contradiction pair
//     types from config. Falls back to sentiment detection.
//   — Load: per-entry load detection added alongside
//     full-text detection. Breakdown and held-under-load
//     signals now read from breakdownRx and heldUnderLoadRx.
//   — Baseline: now reads resolutionRx, emergenceRx,
//     directionRx, capabilityClaimRx, driftRx.
//   — Connections: now reads recurrenceRx (self-named
//     recurrence) and triggerRx (trigger patterns).
//   — State change: now reads changeAssertionRx,
//     behaviouralEvidenceRx, moodShiftRx.
//   — Competing priorities: now reads competitionLanguageRx
//     and bindLanguageRx alongside costSignals.
//   — External constraint: now distinguishes changeable
//     vs fixed constraints using changeableConstraintRx
//     and fixedConstraintRx. Partial block read.
//   — Meta reading: now reads all five honesty signal
//     categories and formulaicRx. Per-entry scoring.
//   — Confidence calibration: now uses correction effects,
//     gap-capping, and meta-reading reliability signal.
//
// Usage:
//   SorterSpine.setRuntime(SorterRuntime);
//
// Contract:
//   SorterRuntime.read(input, accumulatedMap, composedConfig)
//   → updatedMap
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
    try {
      const r = rx instanceof RegExp ? rx : new RegExp(rx.source || rx, rx.flags || 'i');
      return r.test(text);
    } catch (e) {
      return false;
    }
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

  // Score multiple regex signals against text — returns count of matches
  function _scoreSignals(signals, text) {
    return signals.reduce((count, sig) => {
      return count + (_testRegex(sig.rx, text) ? 1 : 0);
    }, 0);
  }


  // ── 01 — Correction as Governance ────────────────────────

  function _correctionAsGovernance(input, map, config) {
    const corrections = input.corrections || [];
    const applied  = [];
    const stale    = [];
    const primary  = [];
    const suppress = [];
    const current  = [];

    corrections.forEach(c => {
      if (c.type === 'stale')    stale.push(c.topic);
      if (c.type === 'primary')  primary.push(c.topic);
      if (c.type === 'suppress') suppress.push(c.topic);
      if (c.type === 'current')  current.push(c.topic);
      applied.push(c);
    });

    return {
      ...map,
      corrections: {
        applied,
        staleTopics:    stale,
        primaryTopics:  primary,
        suppressTopics: suppress,
        currentTopics:  current,
        count:          applied.length,
      },
    };
  }


  // ── 02 — Baseline vs Live Material ───────────────────────

  function _baselineVsLiveMaterial(input, map, config) {
    const baseline    = input.baseline || '';
    const entries     = input.entries  || [];
    const allText     = _allEntryText(entries);
    const recent      = entries.slice(-Math.min(5, entries.length));
    const recentText  = _allEntryText(recent);

    // Resolution signal
    const hasResolution = _testRegex(config.resolutionRx, allText);

    // Emergence signal — new material post-baseline
    const hasEmergence  = _testRegex(config.emergenceRx, allText);

    // Direction present at baseline or in entries
    const directionAtBaseline = _testRegex(config.directionRx, baseline);
    const directionInEntries  = _testRegex(config.directionRx, allText);

    // Baseline drift — person reframing their own baseline
    const hasDrift = _testRegex(config.driftRx, allText);

    // Capability claims at baseline — track against entries
    const capabilityAtBaseline = _testRegex(config.capabilityClaimRx, baseline);
    const capabilityInEntries  = _testRegex(config.capabilityClaimRx, allText);

    // Word-level drift: topics in baseline not in recent entries
    const baselineWords = baseline.toLowerCase().split(/\W+/).filter(w => w.length > 4);
    const recentWords   = new Set(recentText.toLowerCase().split(/\W+/));
    const driftedWords  = baselineWords.filter(w => !recentWords.has(w));

    // Determine direction status
    let directionStatus = 'missing';
    if (directionAtBaseline && directionInEntries) directionStatus = 'present';
    else if (!directionAtBaseline && directionInEntries) directionStatus = 'emerging';
    else if (directionAtBaseline && !directionInEntries) directionStatus = 'lost';

    return {
      ...map,
      baseline: {
        text:               baseline,
        entryCount:         entries.length,
        recentPeriod:       recent.length,
        driftedWords:       driftedWords.slice(0, 10),
        hasDrift,
        hasResolution,
        hasEmergence,
        directionStatus,
        capabilityAtBaseline,
        capabilityInEntries,
        capabilityGap:      capabilityAtBaseline && !capabilityInEntries,
      },
    };
  }


  // ── 03 — Open Gap Discipline ──────────────────────────────

  function _openGapDiscipline(input, map, config) {
    const allText     = _allEntryText(input.entries || []) + '\n' + (input.baseline || '');
    const gapDefs     = config.gaps || config.defaultGaps || [];
    const priority    = config.priorityGaps || [];
    const corrections = map.corrections || {};
    const suppressed  = corrections.suppressTopics || [];
    const openGaps    = [];
    const closedGaps  = [];

    gapDefs.forEach(gap => {
      const key = gap.key || gap.name;

      // Suppressed by correction
      if (suppressed.some(s => s.toLowerCase().includes(key.toLowerCase()))) {
        closedGaps.push({ key, status: 'corrected' });
        return;
      }

      const filled = _testRegex(gap.rx, allText);
      if (filled) {
        closedGaps.push({ key, status: 'filled' });
      } else {
        openGaps.push({
          key,
          name:   gap.name,
          reason: gap.reason || 'Not described in material.',
          status: 'open',
        });
      }
    });

    // Sort by priority
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
        open:            openGaps,
        closed:          closedGaps,
        count:           openGaps.length,
        highestPriority: openGaps[0] || null,
      },
    };
  }


  // ── 04 — Independent Signal Counting ─────────────────────

  function _independentSignalCounting(input, map, config) {
    const entries      = input.entries || [];
    const negationRx   = config.negationRx;
    const intensityRx  = config.intensityRx;
    const stalenessRx  = config.stalenessRx;
    const ladder       = config.confidenceLadder || [];
    const corrections  = map.corrections || {};
    const staleTopics  = (corrections.staleTopics || []).map(t => t.toLowerCase());

    const topicDays = {};

    entries.forEach(entry => {
      const text = _entryText(entry);
      const day  = _dayKey(_entryDate(entry));
      if (!day) return;

      // Skip entries dominated by staleness language
      if (stalenessRx && _testRegex(stalenessRx, text)) return;

      // Skip negated entries
      if (negationRx && _testRegex(negationRx, text)) return;

      // Extract meaningful words (> 5 chars, not intensity words)
      const words = text.toLowerCase().match(/\b[a-z]{5,}\b/g) || [];

      words.forEach(word => {
        if (staleTopics.includes(word)) return;

        // Skip pure intensity words
        if (intensityRx && _testRegex(intensityRx, word)) return;

        if (!topicDays[word]) topicDays[word] = new Set();
        topicDays[word].add(day);
      });
    });

    const signals = {};
    Object.entries(topicDays).forEach(([topic, days]) => {
      const count = days.size;
      let tier = ladder[0];
      for (const t of ladder) {
        if (count >= (t.independentDays || 0)) tier = t;
      }
      if (count >= 2) {
        signals[topic] = {
          independentDays: count,
          label:           tier ? tier.label  : 'Moderate signal',
          weight:          tier ? tier.weight : 3,
        };
      }
    });

    return { ...map, signals };
  }


  // ── 05 — External Constraint Reading ─────────────────────

  function _externalConstraintReading(input, map, config) {
    const allText             = _allEntryText(input.entries || []);
    const constraintRx        = config.defaultConstraintRx;
    const changeableRx        = config.changeableConstraintRx;
    const fixedRx             = config.fixedConstraintRx;
    const partialRx           = config.partialBlockRx;
    const constraintTypes     = config.constraintTypes || [];
    const detected            = [];

    // General constraint language
    if (constraintRx && _testRegex(constraintRx, allText)) {
      const isChangeable = changeableRx ? _testRegex(changeableRx, allText) : null;
      const isFixed      = fixedRx      ? _testRegex(fixedRx,      allText) : null;
      const isPartial    = partialRx    ? _testRegex(partialRx,    allText) : false;

      detected.push({
        type:       'general',
        label:      'External constraint language detected',
        changeable: isChangeable ? true : isFixed ? false : null,
        partial:    isPartial,
      });
    }

    // Specific constraint types (guide-supplied with rx)
    constraintTypes.forEach(ct => {
      if (ct.rx && _testRegex(ct.rx, allText)) {
        detected.push({
          type:       ct.key,
          label:      ct.label,
          changeable: ct.changeable !== false,
          partial:    false,
        });
      }
    });

    return {
      ...map,
      constraints: {
        detected,
        hasConstraints:   detected.length > 0,
        hasChangeable:    detected.some(d => d.changeable === true),
        hasFixed:         detected.some(d => d.changeable === false),
        hasPartial:       detected.some(d => d.partial),
        count:            detected.length,
      },
    };
  }


  // ── 06 — Movement / Non-Movement Reading ─────────────────

  function _movementNonMovementReading(input, map, config) {
    const entries          = input.entries || [];
    const actionRx         = config.defaultActionRx;
    const stuckRx          = config.defaultStuckRx;
    const intentionRx      = config.intentionRx;
    const moodRx           = config.moodOnlyRx;
    const internalRx       = config.internalMovementRx;
    const loadMovementRx   = config.loadMovementRx;
    const collapseRx       = config.collapseRecoveryRx;
    const structureRx      = config.structureRx;
    const negatedActionRx  = config.negatedActionRx;
    const movementEvidence = config.movementEvidence || [];

    const moving             = [];
    const stuck              = [];
    const intentionOnly      = [];
    const moodOnly           = [];
    const internalMovement   = [];
    const loadMovement       = [];
    const collapseRecovery   = [];
    const structureChange    = [];

    entries.forEach((entry, idx) => {
      const text = _entryText(entry);
      const day  = _dayKey(_entryDate(entry)) || `entry-${idx}`;

      // Negated action — explicitly did not do the thing
      const hasNegatedAction  = negatedActionRx  ? _testRegex(negatedActionRx,  text) : false;
      const hasAction         = actionRx         ? _testRegex(actionRx,         text) : false;
      const hasStuck          = stuckRx          ? _testRegex(stuckRx,          text) : false;
      const hasIntention      = intentionRx      ? _testRegex(intentionRx,      text) : false;
      const hasMood           = moodRx           ? _testRegex(moodRx,           text) : false;
      const hasInternal       = internalRx       ? _testRegex(internalRx,       text) : false;
      const hasLoadMovement   = loadMovementRx   ? _testRegex(loadMovementRx,   text) : false;
      const hasCollapse       = collapseRx       ? _testRegex(collapseRx,       text) : false;
      const hasStructure      = structureRx      ? _testRegex(structureRx,      text) : false;

      // Real action — not negated
      const hasRealAction = hasAction && !hasNegatedAction;

      // Classify the entry
      if (hasRealAction && hasLoadMovement) {
        loadMovement.push({ day, text: text.slice(0, 120) });
        moving.push({ day, type: 'load_movement', text: text.slice(0, 120) });
      } else if (hasRealAction) {
        moving.push({ day, type: 'action', text: text.slice(0, 120) });
      } else if (hasCollapse) {
        collapseRecovery.push({ day, text: text.slice(0, 120) });
        moving.push({ day, type: 'collapse_recovery', text: text.slice(0, 120) });
      } else if (hasInternal) {
        internalMovement.push({ day, text: text.slice(0, 120) });
        moving.push({ day, type: 'internal', text: text.slice(0, 120) });
      } else if (hasStructure) {
        structureChange.push({ day, text: text.slice(0, 120) });
        moving.push({ day, type: 'structure', text: text.slice(0, 120) });
      } else if (hasNegatedAction || hasStuck) {
        stuck.push({ day, text: text.slice(0, 120) });
      } else if (hasIntention && !hasMood) {
        intentionOnly.push({ day, text: text.slice(0, 120) });
      } else if (hasMood && !hasRealAction) {
        moodOnly.push({ day, text: text.slice(0, 120) });
      }
    });

    const isMoving = moving.length > stuck.length;
    const ratio    = entries.length > 0
      ? (moving.length / entries.length).toFixed(2)
      : 0;

    // Movement strength
    const uniqueMovingDays = new Set(moving.map(m => m.day)).size;
    const strength = uniqueMovingDays >= 4 ? 'strong'
      : uniqueMovingDays >= 3              ? 'moderate'
      : uniqueMovingDays >= 2              ? 'weak'
      : uniqueMovingDays >= 1              ? 'thin'
      :                                      'not_visible';

    return {
      ...map,
      movement: {
        moving,
        stuck,
        intentionOnly,
        moodOnly,
        internalMovement,
        loadMovement,
        collapseRecovery,
        structureChange,
        isMoving,
        movementRatio:    ratio,
        strength,
        summary: isMoving
          ? `Movement evidenced in ${moving.length} of ${entries.length} entries (${strength}).`
          : stuck.length > 0
            ? `Non-movement pattern in ${stuck.length} of ${entries.length} entries.`
            : `No clear movement or stuck signal — ${entries.length} entries read.`,
      },
    };
  }


  // ── 07 — Avoidance Detection ──────────────────────────────

  function _avoidanceDetection(input, map, config) {
    const entries             = input.entries || [];
    const lexicalRx           = config.lexicalAvoidanceRx;
    const indirectRx          = config.indirectAvoidanceRx;
    const deflectionRx        = config.deflectionRx;
    const knowingRx           = config.knowingWithoutDoingRx;
    const actionRx            = config.defaultActionRx;
    const notAvoidance        = config.notAvoidance || [];
    const constraints         = map.constraints || {};
    const allText             = _allEntryText(entries);
    const detected            = [];

    entries.forEach((entry, idx) => {
      const text = _entryText(entry);
      const day  = _dayKey(_entryDate(entry)) || `entry-${idx}`;

      // External constraint check first — must not misread as avoidance
      if (constraints.hasConstraints) return;

      // Not-avoidance exclusions
      const excluded = notAvoidance.some(na =>
        text.toLowerCase().includes(na.toLowerCase().slice(0, 25))
      );
      if (excluded) return;

      // Lexical — self-named avoidance
      if (lexicalRx && _testRegex(lexicalRx, text)) {
        detected.push({ day, type: 'lexical', text: text.slice(0, 120) });
        return;
      }

      // Knowing without doing
      if (knowingRx && _testRegex(knowingRx, text)) {
        const hasAction = actionRx ? _testRegex(actionRx, text) : false;
        if (!hasAction) {
          detected.push({ day, type: 'knowing_not_doing', text: text.slice(0, 120) });
          return;
        }
      }

      // Deflection
      if (deflectionRx && _testRegex(deflectionRx, text)) {
        detected.push({ day, type: 'deflection', text: text.slice(0, 120) });
        return;
      }

      // Indirect avoidance
      if (indirectRx && _testRegex(indirectRx, text)) {
        const hasAction = actionRx ? _testRegex(actionRx, text) : false;
        if (!hasAction) {
          detected.push({ day, type: 'indirect', text: text.slice(0, 120) });
          return;
        }
      }

      // Structural — long descriptive entry with no action language
      const hasAction = actionRx ? _testRegex(actionRx, text) : false;
      if (text.length > 100 && !hasAction) {
        detected.push({ day, type: 'structural', text: text.slice(0, 120) });
      }
    });

    // Type breakdown
    const byType = detected.reduce((acc, d) => {
      acc[d.type] = (acc[d.type] || 0) + 1;
      return acc;
    }, {});

    return {
      ...map,
      avoidance: {
        detected,
        byType,
        count:        detected.length,
        hasAvoidance: detected.length > 0,
        dominantType: Object.keys(byType).sort((a, b) => byType[b] - byType[a])[0] || null,
      },
    };
  }


  // ── 08 — Load-Sensitive Capability ───────────────────────

  function _loadSensitiveCapability(input, map, config) {
    const entries       = input.entries || [];
    const loadSignals   = config.defaultLoadSignals || [];
    const breakdownRx   = config.breakdownRx;
    const heldRx        = config.heldUnderLoadRx;
    const calmOnlyRx    = config.calmOnlyRx;
    const staleRx       = config.capabilityStaleRx;
    const allText       = _allEntryText(entries);
    const activeLoad    = [];

    // Detect active load signals
    loadSignals.forEach(signal => {
      if (_testRegex(signal.rx, allText)) {
        activeLoad.push({ key: signal.key, label: signal.key });
      }
    });

    const loadLevel = activeLoad.length === 0 ? 'low'
      : activeLoad.length <= 2               ? 'moderate'
      : activeLoad.length <= 4               ? 'high'
      :                                        'critical';

    // Capability status signals
    const hasBreakdown  = breakdownRx ? _testRegex(breakdownRx, allText) : false;
    const hasHeld       = heldRx      ? _testRegex(heldRx,      allText) : false;
    const hasCalmOnly   = calmOnlyRx  ? _testRegex(calmOnlyRx,  allText) : false;
    const hasStale      = staleRx     ? _testRegex(staleRx,     allText) : false;

    // Per-entry load detection for breakdown vs held distinction
    const entryLoadReads = entries.map((entry, idx) => {
      const text    = _entryText(entry);
      const day     = _dayKey(_entryDate(entry)) || `entry-${idx}`;
      const hasLoad = loadSignals.some(s => _testRegex(s.rx, text));
      const broke   = breakdownRx ? _testRegex(breakdownRx, text) : false;
      const held    = heldRx      ? _testRegex(heldRx,      text) : false;

      if (hasLoad && held)  return { day, status: 'held_under_load' };
      if (hasLoad && broke) return { day, status: 'breaking_under_load' };
      if (hasLoad)          return { day, status: 'load_present' };
      return null;
    }).filter(Boolean);

    // Determine overall capability tier
    let capabilityStatus = 'not_assessed';
    if (hasStale) {
      capabilityStatus = 'stale';
    } else if (hasBreakdown && hasHeld) {
      capabilityStatus = 'inconsistent_under_load';
    } else if (hasBreakdown) {
      capabilityStatus = 'breaking_under_load';
    } else if (hasHeld) {
      capabilityStatus = 'held_under_load';
    } else if (hasCalmOnly) {
      capabilityStatus = 'not_reliable_under_pressure';
    } else if (activeLoad.length > 0) {
      capabilityStatus = 'load_present_capability_unread';
    }

    return {
      ...map,
      load: {
        activeSignals:   activeLoad,
        level:           loadLevel,
        count:           activeLoad.length,
        capabilityStatus,
        entryLoadReads,
        capabilityNote:  loadLevel === 'high' || loadLevel === 'critical'
          ? 'High load present. Capability reads may not reflect stable baseline.'
          : null,
      },
    };
  }


  // ── 09 — Contradiction Holding ────────────────────────────

  function _contradictionHolding(input, map, config) {
    const entries          = input.entries || [];
    const allText          = _allEntryText(entries);
    const contradictions   = [];

    // Use config contradiction pairs if available
    const statedChangeRx        = config.statedChangeRx;
    const samePatternRx         = config.samePatternRx;
    const statedGoalRx          = config.statedGoalRx;
    const statedCapabilityRx    = config.statedCapabilityRx;
    const capabilityBreakdownRx = config.capabilityBreakdownRx;
    const positiveFrameRx       = config.positiveFrameRx;
    const negativeDetailRx      = config.negativeDetailRx;
    const selfContradictionRx   = config.selfContradictionRx;

    // Claimed change vs same pattern
    if (statedChangeRx && samePatternRx) {
      if (_testRegex(statedChangeRx, allText) && _testRegex(samePatternRx, allText)) {
        contradictions.push({
          type:  'claimed_change_vs_pattern',
          label: 'Claimed change and same pattern both visible.',
          note:  'Both may be real — transition is not always clean. Do not resolve.',
        });
      }
    }

    // Stated goal vs no action
    if (statedGoalRx) {
      const hasGoal    = _testRegex(statedGoalRx, allText);
      const hasAction  = config.defaultActionRx ? _testRegex(config.defaultActionRx, allText) : true;
      if (hasGoal && !hasAction) {
        contradictions.push({
          type:  'stated_goal_vs_reality',
          label: 'Goal or priority stated but no action language present.',
          note:  'May reflect constraint, load, or avoidance — not necessarily contradiction.',
        });
      }
    }

    // Stated capability vs breakdown
    if (statedCapabilityRx && capabilityBreakdownRx) {
      if (_testRegex(statedCapabilityRx, allText) && _testRegex(capabilityBreakdownRx, allText)) {
        contradictions.push({
          type:  'capability_vs_breakdown',
          label: 'Stated capability and breakdown of that capability both visible.',
          note:  'Capability may hold in calm conditions but not under load.',
        });
      }
    }

    // Positive frame vs negative detail
    if (positiveFrameRx && negativeDetailRx) {
      if (_testRegex(positiveFrameRx, allText) && _testRegex(negativeDetailRx, allText)) {
        contradictions.push({
          type:  'positive_frame_vs_detail',
          label: 'Positive overall framing and negative specific detail both present.',
          note:  'Read the specific detail — it is the more reliable signal.',
        });
      }
    }

    // Self-contradiction within entries
    if (selfContradictionRx) {
      entries.forEach((entry, idx) => {
        const text = _entryText(entry);
        const day  = _dayKey(_entryDate(entry)) || `entry-${idx}`;
        if (_testRegex(selfContradictionRx, text)) {
          contradictions.push({
            type:  'self_contradiction',
            label: 'Self-contradiction within a single entry.',
            day,
            note:  'Both sides named in the same entry. Hold both.',
          });
        }
      });
    }

    // Fallback: sentiment-level contradiction if no config pairs matched
    if (contradictions.length === 0) {
      const positiveRx = /\b(good|well|fine|better|improving|positive|confident|hopeful|sorted)\b/i;
      const negativeRx = /\b(bad|struggling|worse|difficult|stuck|hopeless|broken|failed|cannot)\b/i;
      const posEntries = entries.filter(e => _testRegex(positiveRx, _entryText(e)));
      const negEntries = entries.filter(e => _testRegex(negativeRx, _entryText(e)));
      if (posEntries.length > 0 && negEntries.length > 0) {
        contradictions.push({
          type:  'sentiment_conflict',
          label: 'Both positive and negative states described across entries.',
          note:  'Held — both may be real at different moments.',
        });
      }
    }

    return {
      ...map,
      contradictions: {
        detected:         contradictions,
        count:            contradictions.length,
        hasContradiction: contradictions.length > 0,
      },
    };
  }


  // ── 10 — Competing Priorities ─────────────────────────────

  function _competingPriorities(input, map, config) {
    const entries           = input.entries || [];
    const allText           = _allEntryText(entries);
    const costSignals       = config.costSignals       || [];
    const competitionRx     = config.competitionLanguageRx;
    const bindRx            = config.bindLanguageRx;
    const competing         = [];
    const detectedCosts     = [];

    // Competition language — person names the pull
    const hasCompetition = competitionRx ? _testRegex(competitionRx, allText) : false;
    const hasBind        = bindRx        ? _testRegex(bindRx,        allText) : false;

    // Cost signals — what is not being served
    costSignals.forEach(sig => {
      if (_testRegex(sig.rx, allText)) {
        detectedCosts.push({
          key:   sig.key,
          label: sig.key.replace(/_/g, ' '),
        });
      }
    });

    if (hasCompetition || hasBind || detectedCosts.length >= 2) {
      competing.push({
        type:       hasBind ? 'genuine_bind' : 'competing_demands',
        label:      hasBind
          ? 'Genuine bind — no resolution available without external change.'
          : 'Competing demands both present in material.',
        costs:      detectedCosts,
        note:       'Both demands are real. Do not resolve. Name the cost.',
      });
    }

    return {
      ...map,
      competingPriorities: {
        detected:    competing,
        costs:       detectedCosts,
        hasBind,
        hasCompeting: competing.length > 0,
        count:        competing.length,
      },
    };
  }


  // ── 11 — Connections Across Time ──────────────────────────

  function _connectionsAcrossTime(input, map, config) {
    const entries       = input.entries || [];
    const minDays       = config.minimumSeparationDays || 14;
    const watchPatterns = config.watchPatterns || [];
    const recurrenceRx  = config.recurrenceRx;
    const triggerRx     = config.triggerRx;
    const positiveRx    = config.positiveRecurrenceRx;
    const dismissalRx   = config.dismissalRx;
    const connections   = [];

    if (entries.length < 2) {
      return { ...map, connections: { detected: [], count: 0, selfNamed: false } };
    }

    const allText = _allEntryText(entries);

    // Self-named recurrence — strongest signal
    const selfNamed = recurrenceRx ? _testRegex(recurrenceRx, allText) : false;
    if (selfNamed) {
      connections.push({
        type:       'self_named_recurrence',
        label:      'Person names their own recurring pattern.',
        confidence: 'high',
        note:       'Highest signal value — person has identified the pattern themselves.',
      });
    }

    // Trigger pattern — conditions before breakdown
    const hasTrigger = triggerRx ? _testRegex(triggerRx, allText) : false;
    if (hasTrigger) {
      connections.push({
        type:       'trigger_pattern',
        label:      'Trigger conditions described before recurring breakdown.',
        confidence: 'moderate',
        note:       'Conditions that appear before the pattern — more useful than the breakdown alone.',
      });
    }

    // Positive recurrence — recurring strength
    const hasPositive = positiveRx ? _testRegex(positiveRx, allText) : false;
    if (hasPositive) {
      connections.push({
        type:       'positive_recurrence',
        label:      'Recurring capability or strength signal.',
        confidence: 'moderate',
        note:       'Something that keeps working — worth naming.',
      });
    }

    // Watch patterns — topic recurrence across separated entries
    watchPatterns.forEach(pattern => {
      const matchingEntries = entries.filter(e =>
        _entryText(e).toLowerCase().includes(pattern.toLowerCase().slice(0, 15))
      );

      if (matchingEntries.length >= 2) {
        const first    = matchingEntries[0];
        const last     = matchingEntries[matchingEntries.length - 1];
        const fd       = _entryDate(first);
        const ld       = _entryDate(last);
        const spanDays = fd && ld ? _daysBetween(fd, ld) : 0;

        if (spanDays >= minDays) {
          // Check if dismissed
          const dismissed = dismissalRx
            ? matchingEntries.some(e => _testRegex(dismissalRx, _entryText(e)))
            : false;

          connections.push({
            type:        'watch_pattern',
            pattern,
            occurrences: matchingEntries.length,
            firstSeen:   fd,
            lastSeen:    ld,
            spanDays,
            dismissed,
            confidence:  matchingEntries.length >= 3 ? 'high' : 'moderate',
          });
        }
      }
    });

    return {
      ...map,
      connections: {
        detected:  connections,
        count:     connections.length,
        selfNamed,
        hasTrigger,
        hasPositive,
      },
    };
  }


  // ── 12 — State Change Detection ───────────────────────────

  function _stateChangeDetection(input, map, config) {
    const entries            = input.entries  || [];
    const baseline           = input.baseline || '';
    const minDays            = config.minimumSeparationDays || 7;
    const changeAssertionRx  = config.changeAssertionRx;
    const behaviouralRx      = config.behaviouralEvidenceRx;
    const moodShiftRx        = config.moodShiftRx;
    const changes            = [];

    if (entries.length < 2 || !baseline) {
      return {
        ...map,
        stateChanges: { detected: [], count: 0, note: 'Insufficient material for state change detection.' },
      };
    }

    const allText   = _allEntryText(entries);
    const recent    = entries.slice(-3);
    const recentTxt = _allEntryText(recent);

    // Stated change
    const hasAssertion   = changeAssertionRx ? _testRegex(changeAssertionRx, allText)  : false;
    // Behavioural evidence of change
    const hasBehavioural = behaviouralRx     ? _testRegex(behaviouralRx,     allText)  : false;
    // Mood shift only
    const hasMoodShift   = moodShiftRx       ? _testRegex(moodShiftRx,       recentTxt): false;

    // Determine confidence of any detected change
    if (hasAssertion || hasBehavioural) {
      const confidence = hasBehavioural && hasAssertion ? 'evidenced'
        : hasBehavioural                                ? 'emerging'
        :                                                 'asserted';

      changes.push({
        type:       'general_change',
        label:      hasBehavioural
          ? 'Behavioural evidence of change present.'
          : 'Change asserted — no behavioural evidence yet.',
        confidence,
        note:       confidence === 'asserted'
          ? 'Stated change without behavioural evidence. Monitor for evidence.'
          : 'Behavioural evidence found. Not yet confirmed across a full period.',
      });
    }

    // Mood shift — explicitly not state change
    if (hasMoodShift && !hasBehavioural) {
      changes.push({
        type:       'mood_shift_only',
        label:      'Mood shift detected — not state change.',
        confidence: 'not_change',
        note:       'Feeling different is not the same as behaving differently.',
      });
    }

    // Word-level state change: baseline vs recent vocabulary
    const baselineWords = new Set(
      baseline.toLowerCase().match(/\b[a-z]{5,}\b/g) || []
    );
    const recentWords = new Set(
      recentTxt.toLowerCase().match(/\b[a-z]{5,}\b/g) || []
    );

    const reduced = [...baselineWords].filter(w => !recentWords.has(w));
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
        hasEvidencedChange: changes.some(c => c.confidence === 'evidenced'),
      },
    };
  }


  // ── 13 — Confidence Calibration ───────────────────────────

  function _confidenceCalibration(input, map, config) {
    const entries      = input.entries || [];
    const gaps         = map.gaps      || {};
    const signals      = map.signals   || {};
    const corrections  = map.corrections || {};
    const metaReading  = map.metaReading || {};
    const openGaps     = (gaps.open || []).length;
    const signalCount  = Object.keys(signals).length;
    const tiers        = config.confidenceTiers || [];

    // Primary correction upgrades one tier
    const hasPrimary = (corrections.primaryTopics || []).length > 0;
    // Stale correction — drops dependent signals
    const hasStale   = (corrections.staleTopics   || []).length > 0;

    let overall = 'not_readable';

    if (entries.length === 0) {
      overall = 'not_readable';
    } else if (entries.length === 1 || signalCount < 3) {
      overall = 'thin';
    } else if (openGaps > 3) {
      overall = 'partial';
    } else if (entries.length >= 5 && signalCount >= 8 && openGaps === 0) {
      overall = 'strong';
    } else if (entries.length >= 3 && signalCount >= 5 && openGaps <= 2) {
      overall = 'supported';
    } else {
      overall = 'partial';
    }

    // Upgrade one tier if primary correction present
    const confidenceRank = { not_readable: 0, inferred: 1, thin: 2, partial: 3, supported: 4, strong: 5 };
    const rankToKey      = ['not_readable', 'inferred', 'thin', 'partial', 'supported', 'strong'];
    if (hasPrimary) {
      const currentRank = confidenceRank[overall] || 0;
      overall = rankToKey[Math.min(currentRank + 1, 5)];
    }

    // Performance engagement degrades reliability flag
    const mapReliable = metaReading.mapReliable !== false;

    // Inferred — movement read from absence
    const movementIsInferred = (map.movement?.moving?.length || 0) === 0 && entries.length > 0;

    return {
      ...map,
      confidence: {
        overall,
        inferred:       movementIsInferred,
        mapReliable,
        openGapCount:   openGaps,
        signalCount,
        entryCount:     entries.length,
        hasPrimaryCorrection: hasPrimary,
        label:          config.outputLabels?.[overall] || `(${overall})`,
        reliabilityNote: !mapReliable
          ? 'Performance engagement detected — map picture may not reflect honest account.'
          : null,
      },
    };
  }


  // ── 14 — Next Useful Move ─────────────────────────────────

  function _nextUsefulMove(input, map, config) {
    const gaps              = map.gaps              || {};
    const avoidance         = map.avoidance         || {};
    const constraints       = map.constraints       || {};
    const load              = map.load              || {};
    const confidence        = map.confidence        || {};
    const corrections       = map.corrections       || {};
    const contradictions    = map.contradictions    || {};
    const competingPriorities = map.competingPriorities || {};
    const stateChanges      = map.stateChanges      || {};

    let nextMove = null;
    let reason   = null;
    let rank     = 0;

    // Priority order from behaviour 10 config
    const priorityOrder = config.priorityOrder || [];

    // Evaluate in priority order
    for (const item of priorityOrder) {
      if (item.rank === 1 && (corrections.primaryTopics || []).length > 0) {
        nextMove = item.move;
        reason   = item.rationale;
        rank     = 1;
        break;
      }
      if (item.rank === 2 && map.baseline?.directionStatus === 'missing') {
        nextMove = item.move;
        reason   = item.rationale;
        rank     = 2;
        break;
      }
      if (item.rank === 4 && contradictions.hasContradiction) {
        nextMove = item.move;
        reason   = item.rationale;
        rank     = 4;
        break;
      }
      if (item.rank === 5 && load.capabilityStatus === 'breaking_under_load') {
        nextMove = item.move;
        reason   = item.rationale;
        rank     = 5;
        break;
      }
      if (item.rank === 7 && gaps.highestPriority) {
        nextMove = `${item.move}: ${gaps.highestPriority.name || gaps.highestPriority.key}.`;
        reason   = gaps.highestPriority.reason || item.rationale;
        rank     = 7;
        break;
      }
    }

    // Fallback priority logic if no config order matched
    if (!nextMove) {
      if (constraints.hasConstraints && constraints.hasChangeable) {
        nextMove = 'Address the external block — explore whether it can be moved through an alternative channel.';
        reason   = 'Changeable external constraint present.';
      } else if (constraints.hasConstraints) {
        nextMove = 'The block is external and not currently changeable. Focus on what is accessible while waiting.';
        reason   = 'Fixed external constraint present.';
      } else if (gaps.highestPriority) {
        nextMove = `Address the open gap: ${gaps.highestPriority.name || gaps.highestPriority.key}.`;
        reason   = gaps.highestPriority.reason || 'Highest priority gap.';
      } else if (avoidance.hasAvoidance) {
        const type = avoidance.dominantType;
        nextMove = type === 'knowing_not_doing'
          ? 'The pattern is understood — the next move is one small action, not more analysis.'
          : type === 'deflection'
            ? 'Something is being redirected away from. Name it directly.'
            : 'Name what is being avoided and take one step toward it.';
        reason = `Avoidance pattern: ${type || 'detected'}.`;
      } else if (load.level === 'high' || load.level === 'critical') {
        nextMove = 'Address the load before attempting new movement — capability is under pressure.';
        reason   = `Load level: ${load.level}.`;
      } else if (competingPriorities.hasBind) {
        nextMove = 'Name both demands and what each is costing — clarity on the bind is the next move.';
        reason   = 'Genuine bind present with no clean resolution.';
      } else if (confidence.overall === 'not_readable' || confidence.overall === 'thin') {
        nextMove = 'Add more honest material — the map cannot produce a reliable next move yet.';
        reason   = `Map confidence: ${confidence.overall}.`;
      } else {
        nextMove = 'Continue the current movement. The map shows evidence of progress.';
        reason   = 'No critical blocks detected.';
      }
    }

    return {
      ...map,
      nextMove: { move: nextMove, reason, rank },
    };
  }


  // ── 15 — Private Record to Optional Handover ─────────────

  function _privateRecordToOptionalHandover(input, map, config) {
    return {
      ...map,
      handover: {
        ownershipRules:   config.ownershipRules        || {},
        outputTypes:      config.handoverOutputTypes   || [],
        caveats:          config.requiredCaveats        || [],
        privacyRules:     config.privacyRules           || {},
        readyForHandover: false,
      },
    };
  }


  // ── 16 — Meta Reading ─────────────────────────────────────

  function _metaReading(input, map, config) {
    const entries         = input.entries || [];
    const honestyGroups   = config.honestySignals    || [];
    const performGroups   = config.performanceSignals || [];
    const formulaicRx     = config.formulaicRx;
    const crisisRx        = config.crisisOnlyRx;
    const allText         = _allEntryText(entries);

    // Score honesty signals — each group counts once
    let honestyScore     = 0;
    let performanceScore = 0;

    honestyGroups.forEach(group => {
      if (group.rx && _testRegex(group.rx, allText)) honestyScore++;
    });

    performGroups.forEach(group => {
      if (group.rx && _testRegex(group.rx, allText)) performanceScore++;
    });

    // Formulaic structure check
    const isFormulaic = formulaicRx ? _testRegex(formulaicRx, allText) : false;
    if (isFormulaic) performanceScore++;

    // Crisis-only pattern
    const crisisOnly = crisisRx ? _testRegex(crisisRx, allText) : false;

    // Entry length trend
    const lengths   = entries.map(e => _entryText(e).length);
    const midpoint  = Math.ceil(lengths.length / 2);
    const avgEarly  = lengths.slice(0, midpoint).reduce((a, b) => a + b, 0) / Math.max(1, midpoint);
    const avgRecent = lengths.slice(midpoint).reduce((a, b) => a + b, 0) / Math.max(1, lengths.length - midpoint);

    const lengthTrend = avgRecent > avgEarly * 1.2 ? 'increasing'
      : avgRecent < avgEarly * 0.7                  ? 'decreasing'
      :                                               'stable';

    // Engagement type
    let engagementType = 'honest';
    if (crisisOnly) {
      engagementType = 'crisis_only';
    } else if (performanceScore > honestyScore && performanceScore >= 2) {
      engagementType = 'performed';
    } else if (lengthTrend === 'decreasing' && entries.length > 3 && honestyScore < 2) {
      engagementType = 'thinning';
    } else if (honestyScore >= 2 && (lengthTrend === 'increasing' || honestyScore > performanceScore)) {
      engagementType = 'deepening';
    }

    const mapReliable = engagementType !== 'performed';

    return {
      ...map,
      metaReading: {
        engagementType,
        honestyScore,
        performanceScore,
        isFormulaic,
        crisisOnly,
        lengthTrend,
        mapReliable,
        note: !mapReliable
          ? 'Performance signals detected. Map picture may not reflect honest account.'
          : engagementType === 'deepening'
            ? 'Deepening engagement detected. Map picture becoming more reliable.'
            : null,
      },
    };
  }


  // ── Dispatch table ────────────────────────────────────────

  const _behaviourMap = {
    'correction-as-governance':            _correctionAsGovernance,
    'baseline-vs-live-material':           _baselineVsLiveMaterial,
    'open-gap-discipline':                 _openGapDiscipline,
    'independent-signal-counting':         _independentSignalCounting,
    'external-constraint-reading':         _externalConstraintReading,
    'movement-non-movement-reading':       _movementNonMovementReading,
    'avoidance-detection':                 _avoidanceDetection,
    'load-sensitive-capability':           _loadSensitiveCapability,
    'contradiction-holding':               _contradictionHolding,
    'competing-priorities':                _competingPriorities,
    'connections-across-time':             _connectionsAcrossTime,
    'state-change-detection':              _stateChangeDetection,
    'confidence-calibration':              _confidenceCalibration,
    'next-useful-move':                    _nextUsefulMove,
    'private-record-to-optional-handover': _privateRecordToOptionalHandover,
    'meta-reading':                        _metaReading,
  };


  // ── Public read() ─────────────────────────────────────────

  function read(input, accumulatedMap, composedConfig) {
    const behaviourId = composedConfig.id;
    const impl = _behaviourMap[behaviourId];

    if (!impl) {
      console.warn(`SorterRuntime: no read() implementation for "${behaviourId}". Passing through.`);
      return accumulatedMap;
    }

    return impl(input, accumulatedMap, composedConfig);
  }


  // ── Public API ────────────────────────────────────────────

  return {
    read,
    _behaviourMap,
  };

})();
