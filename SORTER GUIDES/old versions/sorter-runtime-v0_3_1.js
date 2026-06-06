// ══════════════════════════════════════════════════════════
// SORTER RUNTIME  v0.3.1
//
// Patch over v0.3.0.
//
// v0.3.1 fixes:
//
//   — Contradiction holding: broader phrase coverage for
//     the stated-change vs same-pattern pair. The v0.3.0
//     rx required exact phrases in close proximity.
//     v0.3.1 uses a looser detection: if stated-change
//     language appears anywhere in the material AND
//     same-pattern language appears anywhere, the pair
//     fires regardless of proximity. This matches the
//     intended behaviour for multi-entry arc reading.
//
//   — Implicit staleness wired to gap output: the
//     baseline-vs-live-material behaviour correctly
//     detects implicitly stale topics (v0.3.0). But
//     open-gap-discipline was not reading
//     implicitStaleTopics from the accumulated map.
//     v0.3.1 open-gap-discipline now checks implicitly
//     stale baseline topics and surfaces them as open
//     gaps with status 'implicitly_stale'. Silence is
//     not resolution — the gap stays open.
//
// All other implementations unchanged from v0.3.0.
// Full implementations included — this is a complete file.
// ══════════════════════════════════════════════════════════

const SorterRuntime = (() => {


  // ── Constants ─────────────────────────────────────────────

  const PERFORMANCE_FLAG_THRESHOLD = 3;
  const IMPLICIT_STALE_WINDOW      = 5;


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
    } catch (e) { return false; }
  }

  function _allEntryText(entries) {
    return entries.map(_entryText).join('\n');
  }


  // ── 01 — Correction as Governance ────────────────────────

  function _correctionAsGovernance(input, map, config) {
    const corrections = input.corrections || [];
    const applied = [], stale = [], primary = [], suppress = [], current = [];
    corrections.forEach(c => {
      if (c.type === 'stale')    stale.push(c.topic);
      if (c.type === 'primary')  primary.push(c.topic);
      if (c.type === 'suppress') suppress.push(c.topic);
      if (c.type === 'current')  current.push(c.topic);
      applied.push(c);
    });
    return { ...map, corrections: { applied, staleTopics: stale, primaryTopics: primary, suppressTopics: suppress, currentTopics: current, count: applied.length } };
  }


  // ── 02 — Baseline vs Live Material ───────────────────────

  function _baselineVsLiveMaterial(input, map, config) {
    const baseline    = input.baseline || '';
    const entries     = input.entries  || [];
    const allText     = _allEntryText(entries);
    const staleWindow = config.implicitStaleWindow || IMPLICIT_STALE_WINDOW;
    const recent      = entries.slice(-Math.min(staleWindow, entries.length));
    const recentText  = _allEntryText(recent);

    const hasResolution = _testRegex(config.resolutionRx, allText);
    const hasEmergence  = _testRegex(config.emergenceRx,  allText);
    const hasDrift      = _testRegex(config.driftRx,      allText);

    const directionAtBaseline  = _testRegex(config.directionRx,      baseline);
    const directionInEntries   = _testRegex(config.directionRx,      allText);
    const capabilityAtBaseline = _testRegex(config.capabilityClaimRx, baseline);
    const capabilityInEntries  = _testRegex(config.capabilityClaimRx, allText);

    const directionStatus = directionAtBaseline && directionInEntries  ? 'present'
      : !directionAtBaseline && directionInEntries                     ? 'emerging'
      : directionAtBaseline  && !directionInEntries                    ? 'lost'
      :                                                                   'missing';

    const baselineWords = baseline.toLowerCase().split(/\W+/).filter(w => w.length > 4);
    const recentWords   = new Set(recentText.toLowerCase().split(/\W+/));
    const driftedWords  = baselineWords.filter(w => !recentWords.has(w));

    // ── Implicit correction rule ──────────────────────────
    const implicitStaleTopics = [];
    const avoidanceRx  = config.lexicalAvoidanceRx || null;
    const resolutionRx = config.resolutionRx        || null;

    baselineWords
      .filter(w => w.length > 5)
      .filter((w, i, arr) => arr.indexOf(w) === i)
      .forEach(topic => {
        const inBaseline = baseline.toLowerCase().includes(topic);
        const inAnyEntry = allText.toLowerCase().includes(topic);
        const inRecent   = recentText.toLowerCase().includes(topic);

        // Case 1: topic in baseline but never appeared in any entry
        if (inBaseline && !inAnyEntry && entries.length >= staleWindow) {
          implicitStaleTopics.push({
            topic,
            absenceStatus: 'implicitly_stale',
            windowSize:    entries.length,
            note:          'Baseline topic never appeared in entries.',
          });
          return;
        }

        // Case 2: topic appeared in entries but gone silent in recent window
        if (inBaseline && inAnyEntry && !inRecent && recent.length >= staleWindow) {
          const hasResolveLang = resolutionRx ? _testRegex(resolutionRx, allText) : false;
          const hasAvoidLang   = avoidanceRx  ? _testRegex(avoidanceRx,  allText) : false;
          const absenceStatus  = hasResolveLang ? 'possibly_resolved'
            : hasAvoidLang                      ? 'possibly_avoided'
            :                                     'implicitly_stale';

          if (absenceStatus === 'implicitly_stale') {
            implicitStaleTopics.push({ topic, absenceStatus, windowSize: recent.length });
          }
        }
      });

    return {
      ...map,
      baseline: {
        text: baseline, entryCount: entries.length, recentPeriod: recent.length,
        driftedWords: driftedWords.slice(0, 10), hasDrift, hasResolution, hasEmergence,
        directionStatus, capabilityAtBaseline, capabilityInEntries,
        capabilityGap: capabilityAtBaseline && !capabilityInEntries,
        implicitStaleTopics, implicitStaleCount: implicitStaleTopics.length,
      },
    };
  }


  // ── 03 — Open Gap Discipline ──────────────────────────────
  // v0.3.1: implicitly stale baseline topics now surfaced
  // as open gaps with status 'implicitly_stale'.
  // Silence is not resolution. Gap stays open.

  function _openGapDiscipline(input, map, config) {
    const allText     = _allEntryText(input.entries || []) + '\n' + (input.baseline || '');
    const gapDefs     = config.gaps || config.defaultGaps || [];
    const priority    = config.priorityGaps || [];
    const corrections = map.corrections || {};
    const suppressed  = corrections.suppressTopics || [];
    const openGaps    = [];
    const closedGaps  = [];

    // ── v0.3.1: implicit stale gaps ─────────────────────
    // Topics from baseline that went silent in the recent window
    // are surfaced as open gaps. They were present and are now
    // absent without resolution — that is a gap, not a closure.
    const implicitStaleTopics = map.baseline?.implicitStaleTopics || [];

    implicitStaleTopics.forEach(stale => {
      const alreadyDefined = gapDefs.some(g => (g.key || g.name || '').toLowerCase().includes(stale.topic.toLowerCase()));
      if (!alreadyDefined) {
        openGaps.push({
          key:    `implicit_stale_${stale.topic}`,
          name:   stale.topic,
          reason: `Topic present at baseline has gone silent in the last ${stale.windowSize} entries. Cannot distinguish resolved, avoided, or not written about.`,
          status: 'implicitly_stale',
        });
      }
    });

    gapDefs.forEach(gap => {
      const key = gap.key || gap.name;
      if (suppressed.some(s => s.toLowerCase().includes(key.toLowerCase()))) {
        closedGaps.push({ key, status: 'corrected' });
        return;
      }
      const filled = _testRegex(gap.rx, allText);
      if (filled) closedGaps.push({ key, status: 'filled' });
      else        openGaps.push({ key, name: gap.name, reason: gap.reason || 'Not described in material.', status: 'open' });
    });

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
      gaps: { open: openGaps, closed: closedGaps, count: openGaps.length, highestPriority: openGaps[0] || null },
    };
  }


  // ── 04 — Independent Signal Counting ─────────────────────

  function _independentSignalCounting(input, map, config) {
    const entries     = input.entries || [];
    const negationRx  = config.negationRx;
    const intensityRx = config.intensityRx;
    const stalenessRx = config.stalenessRx;
    const ladder      = config.confidenceLadder || [];
    const corrections = map.corrections || {};
    const staleTopics = (corrections.staleTopics || []).map(t => t.toLowerCase());
    const implicitStale = (map.baseline?.implicitStaleTopics || []).map(t => t.topic.toLowerCase());
    const allStale    = [...staleTopics, ...implicitStale];
    const topicDays   = {};

    entries.forEach(entry => {
      const text = _entryText(entry);
      const day  = _dayKey(_entryDate(entry));
      if (!day) return;
      if (stalenessRx && _testRegex(stalenessRx, text)) return;
      if (negationRx  && _testRegex(negationRx,  text)) return;
      const words = text.toLowerCase().match(/\b[a-z]{5,}\b/g) || [];
      words.forEach(word => {
        if (allStale.includes(word)) return;
        if (intensityRx && _testRegex(intensityRx, word)) return;
        if (!topicDays[word]) topicDays[word] = new Set();
        topicDays[word].add(day);
      });
    });

    const signals = {};
    Object.entries(topicDays).forEach(([topic, days]) => {
      const count = days.size;
      let tier = ladder[0];
      for (const t of ladder) { if (count >= (t.independentDays || 0)) tier = t; }
      if (count >= 2) signals[topic] = { independentDays: count, label: tier ? tier.label : 'Moderate signal', weight: tier ? tier.weight : 3 };
    });

    return { ...map, signals };
  }


  // ── 05 — External Constraint Reading ─────────────────────

  function _externalConstraintReading(input, map, config) {
    const allText         = _allEntryText(input.entries || []);
    const constraintRx    = config.defaultConstraintRx;
    const changeableRx    = config.changeableConstraintRx;
    const fixedRx         = config.fixedConstraintRx;
    const partialRx       = config.partialBlockRx;
    const constraintTypes = config.constraintTypes || [];
    const detected        = [];

    if (constraintRx && _testRegex(constraintRx, allText)) {
      detected.push({ type: 'general', label: 'External constraint language detected', changeable: changeableRx ? _testRegex(changeableRx, allText) : null, partial: partialRx ? _testRegex(partialRx, allText) : false });
    }
    constraintTypes.forEach(ct => {
      if (ct.rx && _testRegex(ct.rx, allText)) detected.push({ type: ct.key, label: ct.label, changeable: ct.changeable !== false, partial: false });
    });

    return { ...map, constraints: { detected, hasConstraints: detected.length > 0, hasChangeable: detected.some(d => d.changeable === true), hasFixed: detected.some(d => d.changeable === false), hasPartial: detected.some(d => d.partial), count: detected.length } };
  }


  // ── 06 — Movement / Non-Movement Reading ─────────────────

  function _movementNonMovementReading(input, map, config) {
    const entries         = input.entries || [];
    const actionRx        = config.defaultActionRx;
    const vernacularActionRx = config.vernacularActionRx;
    const stuckRx         = config.defaultStuckRx;
    const vernacularStuckRx  = config.vernacularStuckRx;
    const intentionRx     = config.intentionRx;
    const moodRx          = config.moodOnlyRx;
    const internalRx      = config.internalMovementRx;
    const loadMovementRx  = config.loadMovementRx;
    const collapseRx      = config.collapseRecoveryRx;
    const structureRx     = config.structureRx;
    const negatedActionRx = config.negatedActionRx;

    const moving = [], stuck = [], intentionOnly = [], moodOnly = [];
    const internalMovement = [], loadMovement = [], collapseRecovery = [], structureChange = [];

    entries.forEach((entry, idx) => {
      const text = _entryText(entry);
      const day  = _dayKey(_entryDate(entry)) || `entry-${idx}`;

      const hasNegatedAction = negatedActionRx    ? _testRegex(negatedActionRx,    text) : false;
      const hasStandardAction = actionRx          ? _testRegex(actionRx,           text) : false;
      const hasVernacularAction = vernacularActionRx ? _testRegex(vernacularActionRx, text) : false;
      const hasAction        = hasStandardAction || hasVernacularAction;
      const hasStuck         = (stuckRx          ? _testRegex(stuckRx,            text) : false) ||
                               (vernacularStuckRx ? _testRegex(vernacularStuckRx, text) : false);
      const hasIntention     = intentionRx        ? _testRegex(intentionRx,        text) : false;
      const hasMood          = moodRx             ? _testRegex(moodRx,             text) : false;
      const hasInternal      = internalRx         ? _testRegex(internalRx,         text) : false;
      const hasLoadMovement  = loadMovementRx     ? _testRegex(loadMovementRx,     text) : false;
      const hasCollapse      = collapseRx         ? _testRegex(collapseRx,         text) : false;
      const hasStructure     = structureRx        ? _testRegex(structureRx,        text) : false;
      const hasRealAction    = hasAction && !hasNegatedAction;

      const entryType = hasVernacularAction && !hasNegatedAction ? 'vernacular_action' : 'action';

      if      (hasRealAction && hasLoadMovement) { loadMovement.push({ day, text: text.slice(0, 120) }); moving.push({ day, type: 'load_movement', text: text.slice(0, 120) }); }
      else if (hasRealAction)                    { moving.push({ day, type: entryType, text: text.slice(0, 120) }); }
      else if (hasCollapse)                      { collapseRecovery.push({ day, text: text.slice(0, 120) }); moving.push({ day, type: 'collapse_recovery', text: text.slice(0, 120) }); }
      else if (hasInternal)                      { internalMovement.push({ day, text: text.slice(0, 120) }); moving.push({ day, type: 'internal', text: text.slice(0, 120) }); }
      else if (hasStructure)                     { structureChange.push({ day, text: text.slice(0, 120) }); moving.push({ day, type: 'structure', text: text.slice(0, 120) }); }
      else if (hasNegatedAction || hasStuck)     { stuck.push({ day, text: text.slice(0, 120) }); }
      else if (hasIntention && !hasMood)         { intentionOnly.push({ day, text: text.slice(0, 120) }); }
      else if (hasMood && !hasRealAction)        { moodOnly.push({ day, text: text.slice(0, 120) }); }
    });

    const isMoving         = moving.length > stuck.length;
    const ratio            = entries.length > 0 ? (moving.length / entries.length).toFixed(2) : 0;
    const uniqueMovingDays = new Set(moving.map(m => m.day)).size;
    const strength         = uniqueMovingDays >= 4 ? 'strong' : uniqueMovingDays >= 3 ? 'moderate' : uniqueMovingDays >= 2 ? 'weak' : uniqueMovingDays >= 1 ? 'thin' : 'not_visible';

    return {
      ...map,
      movement: { moving, stuck, intentionOnly, moodOnly, internalMovement, loadMovement, collapseRecovery, structureChange, isMoving, movementRatio: ratio, strength,
        summary: isMoving ? `Movement evidenced in ${moving.length} of ${entries.length} entries (${strength}).` : stuck.length > 0 ? `Non-movement pattern in ${stuck.length} of ${entries.length} entries.` : `No clear movement or stuck signal — ${entries.length} entries read.` },
    };
  }


  // ── 07 — Avoidance Detection ──────────────────────────────

  function _avoidanceDetection(input, map, config) {
    const entries      = input.entries || [];
    const lexicalRx    = config.lexicalAvoidanceRx;
    const indirectRx   = config.indirectAvoidanceRx;
    const deflectionRx = config.deflectionRx;
    const knowingRx    = config.knowingWithoutDoingRx;
    const actionRx     = config.defaultActionRx;
    const vernacularActionRx = config.vernacularActionRx;
    const notAvoidance = config.notAvoidance || [];
    const constraints  = map.constraints || {};
    const detected     = [];

    entries.forEach((entry, idx) => {
      const text = _entryText(entry);
      const day  = _dayKey(_entryDate(entry)) || `entry-${idx}`;

      if (constraints.hasConstraints) return;
      const excluded = notAvoidance.some(na => text.toLowerCase().includes(na.toLowerCase().slice(0, 25)));
      if (excluded) return;

      if (lexicalRx    && _testRegex(lexicalRx,    text)) { detected.push({ day, type: 'lexical',           text: text.slice(0, 120) }); return; }
      if (knowingRx    && _testRegex(knowingRx,     text)) {
        const hasAction = (actionRx ? _testRegex(actionRx, text) : false) || (vernacularActionRx ? _testRegex(vernacularActionRx, text) : false);
        if (!hasAction) { detected.push({ day, type: 'knowing_not_doing', text: text.slice(0, 120) }); return; }
      }
      if (deflectionRx && _testRegex(deflectionRx,  text)) { detected.push({ day, type: 'deflection',        text: text.slice(0, 120) }); return; }
      if (indirectRx   && _testRegex(indirectRx,     text)) {
        const hasAction = (actionRx ? _testRegex(actionRx, text) : false) || (vernacularActionRx ? _testRegex(vernacularActionRx, text) : false);
        if (!hasAction) { detected.push({ day, type: 'indirect',          text: text.slice(0, 120) }); return; }
      }
      const hasAction = (actionRx ? _testRegex(actionRx, text) : false) || (vernacularActionRx ? _testRegex(vernacularActionRx, text) : false);
      if (text.length > 100 && !hasAction) detected.push({ day, type: 'structural', text: text.slice(0, 120) });
    });

    const byType = detected.reduce((acc, d) => { acc[d.type] = (acc[d.type] || 0) + 1; return acc; }, {});
    return { ...map, avoidance: { detected, byType, count: detected.length, hasAvoidance: detected.length > 0, dominantType: Object.keys(byType).sort((a, b) => byType[b] - byType[a])[0] || null } };
  }


  // ── 08 — Load-Sensitive Capability ───────────────────────

  function _loadSensitiveCapability(input, map, config) {
    const entries       = input.entries || [];
    const loadSignals   = config.defaultLoadSignals || [];
    const vernacularLoadRx = config.vernacularLoadRx;
    const breakdownRx   = config.breakdownRx;
    const heldRx        = config.heldUnderLoadRx;
    const calmOnlyRx    = config.calmOnlyRx;
    const staleRx       = config.capabilityStaleRx;
    const allText       = _allEntryText(entries);
    const activeLoad    = [];

    loadSignals.forEach(signal => { if (_testRegex(signal.rx, allText)) activeLoad.push({ key: signal.key, label: signal.key }); });
    if (vernacularLoadRx && _testRegex(vernacularLoadRx, allText)) {
      if (!activeLoad.find(s => s.key === 'vernacular_load')) activeLoad.push({ key: 'vernacular_load', label: 'Load signal (vernacular)' });
    }

    const loadLevel       = activeLoad.length === 0 ? 'low' : activeLoad.length <= 2 ? 'moderate' : activeLoad.length <= 4 ? 'high' : 'critical';
    const hasBreakdown    = breakdownRx ? _testRegex(breakdownRx, allText) : false;
    const hasHeld         = heldRx      ? _testRegex(heldRx,      allText) : false;
    const hasCalmOnly     = calmOnlyRx  ? _testRegex(calmOnlyRx,  allText) : false;
    const hasStale        = staleRx     ? _testRegex(staleRx,     allText) : false;

    const entryLoadReads = entries.map((entry, idx) => {
      const text    = _entryText(entry);
      const day     = _dayKey(_entryDate(entry)) || `entry-${idx}`;
      const hasLoad = loadSignals.some(s => _testRegex(s.rx, text)) || (vernacularLoadRx && _testRegex(vernacularLoadRx, text));
      const broke   = breakdownRx ? _testRegex(breakdownRx, text) : false;
      const held    = heldRx      ? _testRegex(heldRx,      text) : false;
      if (hasLoad && held)  return { day, status: 'held_under_load' };
      if (hasLoad && broke) return { day, status: 'breaking_under_load' };
      if (hasLoad)          return { day, status: 'load_present' };
      return null;
    }).filter(Boolean);

    const capabilityStatus = hasStale ? 'stale' : hasBreakdown && hasHeld ? 'inconsistent_under_load' : hasBreakdown ? 'breaking_under_load' : hasHeld ? 'held_under_load' : hasCalmOnly ? 'not_reliable_under_pressure' : activeLoad.length > 0 ? 'load_present_capability_unread' : 'not_assessed';

    return { ...map, load: { activeSignals: activeLoad, level: loadLevel, count: activeLoad.length, capabilityStatus, entryLoadReads, capabilityNote: loadLevel === 'high' || loadLevel === 'critical' ? 'High load present. Capability reads may not reflect stable baseline.' : null } };
  }


  // ── 09 — Contradiction Holding ────────────────────────────
  // v0.3.1: stated-change vs same-pattern pair now uses
  // proximity-independent detection. Both rx must fire
  // anywhere in the full material — not necessarily close
  // together. This is the correct behaviour for multi-entry
  // arc reading where the contradiction spans weeks.

  function _contradictionHolding(input, map, config) {
    const entries      = input.entries || [];
    const allText      = _allEntryText(entries);
    const contradictions = [];

    // ── v0.3.1: proximity-independent pair detection ──────
    // Each pair checks whether BOTH signals appear anywhere
    // in the full material. Prior version required proximity.

    if (config.statedChangeRx && config.samePatternRx) {
      const hasChange  = _testRegex(config.statedChangeRx, allText);
      const hasPattern = _testRegex(config.samePatternRx,  allText);
      if (hasChange && hasPattern) {
        contradictions.push({
          type:  'claimed_change_vs_pattern',
          label: 'Claimed change and same pattern both visible across the material.',
          note:  'Both may be real. Transition is not linear. Do not resolve.',
        });
      }
    }

    if (config.statedGoalRx && _testRegex(config.statedGoalRx, allText)) {
      const hasAction = config.defaultActionRx ? _testRegex(config.defaultActionRx, allText) : true;
      if (!hasAction) contradictions.push({ type: 'stated_goal_vs_reality', label: 'Goal stated but no action language present.', note: 'May reflect constraint, load, or avoidance.' });
    }

    if (config.statedCapabilityRx && config.capabilityBreakdownRx) {
      if (_testRegex(config.statedCapabilityRx, allText) && _testRegex(config.capabilityBreakdownRx, allText))
        contradictions.push({ type: 'capability_vs_breakdown', label: 'Stated capability and breakdown both visible.', note: 'May hold in calm conditions but not under load.' });
    }

    if (config.positiveFrameRx && config.negativeDetailRx) {
      if (_testRegex(config.positiveFrameRx, allText) && _testRegex(config.negativeDetailRx, allText))
        contradictions.push({ type: 'positive_frame_vs_detail', label: 'Positive framing and negative detail both present.', note: 'Specific detail is the more reliable signal.' });
    }

    if (config.selfContradictionRx) {
      entries.forEach((entry, idx) => {
        const text = _entryText(entry);
        const day  = _dayKey(_entryDate(entry)) || `entry-${idx}`;
        if (_testRegex(config.selfContradictionRx, text))
          contradictions.push({ type: 'self_contradiction', label: 'Self-contradiction within a single entry.', day, note: 'Both sides named. Hold both.' });
      });
    }

    // Fallback sentiment detection
    if (contradictions.length === 0) {
      const posEntries = entries.filter(e => /\b(good|well|fine|better|improving|positive|confident|hopeful|sorted)\b/i.test(_entryText(e)));
      const negEntries = entries.filter(e => /\b(bad|struggling|worse|difficult|stuck|hopeless|broken|failed|cannot)\b/i.test(_entryText(e)));
      if (posEntries.length > 0 && negEntries.length > 0)
        contradictions.push({ type: 'sentiment_conflict', label: 'Both positive and negative states described across entries.', note: 'Both may be real at different moments.' });
    }

    return { ...map, contradictions: { detected: contradictions, count: contradictions.length, hasContradiction: contradictions.length > 0 } };
  }


  // ── 10 — Competing Priorities ─────────────────────────────

  function _competingPriorities(input, map, config) {
    const allText       = _allEntryText(input.entries || []);
    const costSignals   = config.costSignals || [];
    const competitionRx = config.competitionLanguageRx;
    const bindRx        = config.bindLanguageRx;
    const competing     = [];
    const detectedCosts = [];

    const hasCompetition = competitionRx ? _testRegex(competitionRx, allText) : false;
    const hasBind        = bindRx        ? _testRegex(bindRx,        allText) : false;

    costSignals.forEach(sig => {
      if (_testRegex(sig.rx, allText)) detectedCosts.push({ key: sig.key, label: sig.key.replace(/_/g, ' ') });
    });

    if (hasCompetition || hasBind || detectedCosts.length >= 2)
      competing.push({ type: hasBind ? 'genuine_bind' : 'competing_demands', label: hasBind ? 'Genuine bind.' : 'Competing demands both present.', costs: detectedCosts, note: 'Both demands are real. Do not resolve.' });

    return { ...map, competingPriorities: { detected: competing, costs: detectedCosts, hasBind, hasCompeting: competing.length > 0, count: competing.length } };
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

    if (entries.length < 2) return { ...map, connections: { detected: [], count: 0, selfNamed: false } };

    const allText   = _allEntryText(entries);
    const selfNamed = recurrenceRx ? _testRegex(recurrenceRx, allText) : false;
    if (selfNamed) connections.push({ type: 'self_named_recurrence', label: 'Person names their own recurring pattern.', confidence: 'high' });

    const hasTrigger = triggerRx ? _testRegex(triggerRx, allText) : false;
    if (hasTrigger) connections.push({ type: 'trigger_pattern', label: 'Trigger conditions described.', confidence: 'moderate' });

    const hasPositive = positiveRx ? _testRegex(positiveRx, allText) : false;
    if (hasPositive) connections.push({ type: 'positive_recurrence', label: 'Recurring capability or strength.', confidence: 'moderate' });

    watchPatterns.forEach(pattern => {
      const matchingEntries = entries.filter(e => _entryText(e).toLowerCase().includes(pattern.toLowerCase().slice(0, 15)));
      if (matchingEntries.length >= 2) {
        const fd = _entryDate(matchingEntries[0]);
        const ld = _entryDate(matchingEntries[matchingEntries.length - 1]);
        const spanDays = fd && ld ? _daysBetween(fd, ld) : 0;
        if (spanDays >= minDays) {
          const dismissed = dismissalRx ? matchingEntries.some(e => _testRegex(dismissalRx, _entryText(e))) : false;
          connections.push({ type: 'watch_pattern', pattern, occurrences: matchingEntries.length, firstSeen: fd, lastSeen: ld, spanDays, dismissed, confidence: matchingEntries.length >= 3 ? 'high' : 'moderate' });
        }
      }
    });

    return { ...map, connections: { detected: connections, count: connections.length, selfNamed, hasTrigger, hasPositive } };
  }


  // ── 12 — State Change Detection ───────────────────────────

  function _stateChangeDetection(input, map, config) {
    const entries           = input.entries  || [];
    const baseline          = input.baseline || '';
    const changeAssertionRx = config.changeAssertionRx;
    const behaviouralRx     = config.behaviouralEvidenceRx;
    const moodShiftRx       = config.moodShiftRx;
    const changes           = [];

    if (entries.length < 2 || !baseline) return { ...map, stateChanges: { detected: [], count: 0, note: 'Insufficient material.' } };

    const allText   = _allEntryText(entries);
    const recentTxt = _allEntryText(entries.slice(-3));

    const hasAssertion   = changeAssertionRx ? _testRegex(changeAssertionRx, allText)   : false;
    const hasBehavioural = behaviouralRx     ? _testRegex(behaviouralRx,     allText)   : false;
    const hasMoodShift   = moodShiftRx       ? _testRegex(moodShiftRx,       recentTxt) : false;

    if (hasAssertion || hasBehavioural) {
      const confidence = hasBehavioural && hasAssertion ? 'evidenced' : hasBehavioural ? 'emerging' : 'asserted';
      changes.push({ type: 'general_change', label: hasBehavioural ? 'Behavioural evidence of change present.' : 'Change asserted — no behavioural evidence yet.', confidence, note: confidence === 'asserted' ? 'Stated change without behavioural evidence. Monitor.' : 'Behavioural evidence found. Not yet confirmed.' });
    }

    if (hasMoodShift && !hasBehavioural) changes.push({ type: 'mood_shift_only', label: 'Mood shift detected — not state change.', confidence: 'not_change', note: 'Feeling different is not behaving differently.' });

    const baselineWords = new Set(baseline.toLowerCase().match(/\b[a-z]{5,}\b/g) || []);
    const recentWords   = new Set(recentTxt.toLowerCase().match(/\b[a-z]{5,}\b/g) || []);
    const reduced = [...baselineWords].filter(w => !recentWords.has(w));
    const emerged = [...recentWords].filter(w => !baselineWords.has(w));
    if (reduced.length > 5) changes.push({ type: 'pressure_reduced',   label: 'Topics present at baseline less present recently.', confidence: 'emerging', topics: reduced.slice(0, 5) });
    if (emerged.length > 5) changes.push({ type: 'pressure_increased', label: 'New topics in recent entries not at baseline.',      confidence: 'emerging', topics: emerged.slice(0, 5) });

    return { ...map, stateChanges: { detected: changes, count: changes.length, hasEvidencedChange: changes.some(c => c.confidence === 'evidenced') } };
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
    const hasPrimary   = (corrections.primaryTopics || []).length > 0;
    const implicitStaleCount = map.baseline?.implicitStaleCount || 0;

    let overall = 'not_readable';
    if      (entries.length === 0)                                     overall = 'not_readable';
    else if (entries.length === 1 || signalCount < 3)                  overall = 'thin';
    else if (openGaps > 3 || implicitStaleCount > 2)                   overall = 'partial';
    else if (entries.length >= 5 && signalCount >= 8 && openGaps === 0) overall = 'strong';
    else if (entries.length >= 3 && signalCount >= 5 && openGaps <= 2) overall = 'supported';
    else                                                                overall = 'partial';

    const rankToKey = ['not_readable', 'inferred', 'thin', 'partial', 'supported', 'strong'];
    const rankMap   = { not_readable: 0, inferred: 1, thin: 2, partial: 3, supported: 4, strong: 5 };
    if (hasPrimary) overall = rankToKey[Math.min((rankMap[overall] || 0) + 1, 5)];

    const mapReliable        = metaReading.mapReliable !== false;
    const movementIsInferred = (map.movement?.moving?.length || 0) === 0 && entries.length > 0;

    return { ...map, confidence: { overall, inferred: movementIsInferred, mapReliable, openGapCount: openGaps, signalCount, entryCount: entries.length, implicitStaleCount, hasPrimaryCorrection: hasPrimary, label: config.outputLabels?.[overall] || `(${overall})`, reliabilityNote: !mapReliable ? 'Performance engagement detected — map picture may not reflect honest account.' : null } };
  }


  // ── 14 — Next Useful Move ─────────────────────────────────

  function _nextUsefulMove(input, map, config) {
    const gaps            = map.gaps            || {};
    const avoidance       = map.avoidance       || {};
    const constraints     = map.constraints     || {};
    const load            = map.load            || {};
    const confidence      = map.confidence      || {};
    const competingPriorities = map.competingPriorities || {};

    let nextMove = null, reason = null;

    if (constraints.hasConstraints && constraints.hasChangeable) { nextMove = 'Address the external block — explore whether it can be moved through an alternative channel.'; reason = 'Changeable external constraint present.'; }
    else if (constraints.hasConstraints)                         { nextMove = 'The block is external and not currently changeable. Focus on what is accessible while waiting.'; reason = 'Fixed external constraint present.'; }
    else if (gaps.highestPriority)                               { nextMove = `Address the open gap: ${gaps.highestPriority.name || gaps.highestPriority.key}.`; reason = gaps.highestPriority.reason || 'Highest priority gap.'; }
    else if (avoidance.hasAvoidance) {
      const type = avoidance.dominantType;
      nextMove = type === 'knowing_not_doing' ? 'The pattern is understood — the next move is one small action, not more analysis.' : type === 'deflection' ? 'Something is being redirected away from. Name it directly.' : 'Name what is being avoided and take one step toward it.';
      reason = `Avoidance pattern: ${type || 'detected'}.`;
    }
    else if (load.level === 'high' || load.level === 'critical') { nextMove = 'Address the load before attempting new movement.'; reason = `Load level: ${load.level}.`; }
    else if (competingPriorities.hasBind)                         { nextMove = 'Name both demands and what each is costing — clarity on the bind is the next move.'; reason = 'Genuine bind present.'; }
    else if (confidence.overall === 'not_readable' || confidence.overall === 'thin') { nextMove = 'Add more honest material — the map cannot produce a reliable next move yet.'; reason = `Map confidence: ${confidence.overall}.`; }
    else                                                          { nextMove = 'Continue the current movement. The map shows evidence of progress.'; reason = 'No critical blocks detected.'; }

    return { ...map, nextMove: { move: nextMove, reason } };
  }


  // ── 15 — Private Record to Optional Handover ─────────────

  function _privateRecordToOptionalHandover(input, map, config) {
    return { ...map, handover: { ownershipRules: config.ownershipRules || {}, outputTypes: config.handoverOutputTypes || [], caveats: config.requiredCaveats || [], privacyRules: config.privacyRules || {}, readyForHandover: false } };
  }


  // ── 16 — Meta Reading ─────────────────────────────────────

  function _metaReading(input, map, config) {
    const entries       = input.entries || [];
    const honestyGroups = config.honestySignals    || [];
    const performGroups = config.performanceSignals || [];
    const formulaicRx   = config.formulaicRx;
    const crisisRx      = config.crisisOnlyRx;
    const allText       = _allEntryText(entries);
    const threshold     = config.performanceFlagThreshold || PERFORMANCE_FLAG_THRESHOLD;

    let honestyScore = 0, performanceScore = 0;
    honestyGroups.forEach(g => { if (g.rx && _testRegex(g.rx, allText)) honestyScore++; });
    performGroups.forEach(g => { if (g.rx && _testRegex(g.rx, allText)) performanceScore++; });

    const isFormulaic = formulaicRx ? _testRegex(formulaicRx, allText) : false;
    if (isFormulaic) performanceScore++;

    const crisisOnly = crisisRx ? _testRegex(crisisRx, allText) : false;

    let maxConsecutivePerformance = 0, currentRun = 0;
    entries.forEach(entry => {
      const text       = _entryText(entry);
      const hasPerform = performGroups.some(g => g.rx && _testRegex(g.rx, text)) || (formulaicRx && _testRegex(formulaicRx, text));
      const hasHonesty = honestyGroups.some(g => g.rx && _testRegex(g.rx, text));
      if (hasPerform && !hasHonesty) { currentRun++; if (currentRun > maxConsecutivePerformance) maxConsecutivePerformance = currentRun; }
      else currentRun = 0;
    });

    const performanceFlagMet = maxConsecutivePerformance >= threshold;

    const lengths   = entries.map(e => _entryText(e).length);
    const midpoint  = Math.ceil(lengths.length / 2);
    const avgEarly  = lengths.slice(0, midpoint).reduce((a, b) => a + b, 0) / Math.max(1, midpoint);
    const avgRecent = lengths.slice(midpoint).reduce((a, b) => a + b, 0) / Math.max(1, lengths.length - midpoint);
    const lengthTrend = avgRecent > avgEarly * 1.2 ? 'increasing' : avgRecent < avgEarly * 0.7 ? 'decreasing' : 'stable';

    let engagementType = 'honest';
    if      (crisisOnly)                                                              engagementType = 'crisis_only';
    else if (performanceFlagMet && performanceScore > honestyScore)                   engagementType = 'performed';
    else if (performanceScore > honestyScore && !performanceFlagMet)                  engagementType = 'watch';
    else if (lengthTrend === 'decreasing' && entries.length > 3 && honestyScore < 2) engagementType = 'thinning';
    else if (honestyScore >= 2 && (lengthTrend === 'increasing' || honestyScore > performanceScore)) engagementType = 'deepening';

    const mapReliable = engagementType !== 'performed';

    return { ...map, metaReading: { engagementType, honestyScore, performanceScore, isFormulaic, crisisOnly, lengthTrend, consecutivePerformanceCount: maxConsecutivePerformance, performanceFlagMet, performanceThreshold: threshold, mapReliable, note: !mapReliable ? 'Performance signals detected across multiple consecutive entries. Map picture may not reflect honest account.' : engagementType === 'watch' ? `Performance signals present but below threshold (${maxConsecutivePerformance}/${threshold} consecutive entries). Monitoring.` : engagementType === 'deepening' ? 'Deepening engagement detected. Map picture becoming more reliable.' : null } };
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


  // ── Action conflict resolver ──────────────────────────────

  const ACTION_PRIORITY = ['refuse','hold','human_escalation','escalate','clarify','search','acknowledge_constraint','confidence_gated_output','output','no-op'];

  function resolveActionConflict(responses) {
    if (!responses || responses.length === 0) return null;
    if (responses.length === 1) return responses[0];
    const sorted = responses.filter(r => r.action).sort((a, b) => {
      const ai = ACTION_PRIORITY.indexOf(a.action);
      const bi = ACTION_PRIORITY.indexOf(b.action);
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    });
    const resolved   = sorted[0];
    const conflicted = sorted.slice(1).map(r => r.action);
    return { ...resolved, resolvedFrom: responses.map(r => ({ componentId: r.componentId, action: r.action })), conflicts: conflicted, note: conflicted.length > 0 ? `Action conflict resolved. "${resolved.action}" wins over: ${conflicted.join(', ')}.` : null };
  }


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


  return { read, resolveActionConflict, ACTION_PRIORITY, _behaviourMap };

})();
