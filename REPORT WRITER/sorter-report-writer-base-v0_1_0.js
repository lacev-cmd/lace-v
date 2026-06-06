// ══════════════════════════════════════════════════════════
// SORTER REPORT WRITER BASE  v0.1.0
//
// Shared foundation for all report writers.
// Must be loaded before any report writer module.
//
// Provides:
//   — extractMapState(map)         extract structured state from map
//   — getOverallConfidence(map)    get overall confidence level
//   — confidenceRank(level)        numeric rank of confidence level
//   — label(confidence)            human-readable confidence label
//   — makeClaim(opts)              build a labelled claim object
//   — makeSection(opts)            build a report section object
//   — createReport(opts)           build the final report object
//   — movementItems(map)           extract movement signal list
//   — stuckItems(map)              extract non-movement signal list
//   — loadItems(map)               extract load signal list
//   — constraintItems(map)         extract constraint signal list
//   — contradictionItems(map)      extract contradiction list
//   — openGapItems(map)            extract open gap list
//   — highestPriorityGap(map)      get the highest priority open gap
//   — warningsFromMap(map, extra)  collect all warnings
//   — defaultLimits()              standard limit statements
//   — asArray(val)                 safely coerce to array
//   — REQUIRED_CAVEATS             standard required caveats
//
// Report writers do not mutate map state.
// Report writers do not run behaviours.
// Report writers read what the stack already produced.
// ══════════════════════════════════════════════════════════

const SorterReportWriterBase = (() => {

  const VERSION = '0.1.0';


  // ── Confidence ────────────────────────────────────────────

  const CONFIDENCE_RANKS = {
    'not_readable': 0,
    'inferred':     1,
    'thin':         2,
    'partial':      3,
    'supported':    4,
    'strong':       5,
  };

  const CONFIDENCE_LABELS = {
    'not_readable': '(not enough material to read)',
    'inferred':     '(inferred — not directly stated)',
    'thin':         '(thin — one or two mentions only)',
    'partial':      '(partial — direction visible, not confirmed)',
    'supported':    '(supported across multiple entries)',
    'strong':       '(consistent across the period)',
  };

  function confidenceRank(level) {
    return CONFIDENCE_RANKS[level] ?? 0;
  }

  function label(confidenceLevel) {
    return CONFIDENCE_LABELS[confidenceLevel] || `(${confidenceLevel || 'unknown'})`;
  }

  function getOverallConfidence(map) {
    return map?.confidence?.overall || 'not_readable';
  }


  // ── Map state extraction ──────────────────────────────────
  // Pulls the structured state from a completed map.
  // Provides safe defaults for all fields — never throws.

  function extractMapState(map) {
    if (!map) return _emptyState();

    return {
      confidence:          map.confidence          || { overall: 'not_readable' },
      gaps:                map.gaps                || { open: [], closed: [], count: 0, highestPriority: null },
      signals:             map.signals             || {},
      movement:            map.movement            || {},
      avoidance:           map.avoidance           || {},
      constraints:         map.constraints         || { detected: [], hasConstraints: false, count: 0 },
      contradictions:      map.contradictions      || { detected: [], count: 0, hasContradiction: false },
      competingPriorities: map.competingPriorities || { detected: [], hasCompeting: false },
      connections:         map.connections         || { detected: [], count: 0 },
      stateChanges:        map.stateChanges        || { detected: [], count: 0, note: null },
      load:                map.load                || { level: 'low', activeSignals: [], capabilityStatus: 'not_assessed', capabilityNote: null },
      baseline:            map.baseline            || {},
      nextMove:            map.nextMove            || null,
      handover:            map.handover            || null,
      metaReading:         map.metaReading         || null,
      corrections:         map.corrections         || [],
    };
  }

  function _emptyState() {
    return {
      confidence:          { overall: 'not_readable' },
      gaps:                { open: [], closed: [], count: 0, highestPriority: null },
      signals:             {},
      movement:            {},
      avoidance:           {},
      constraints:         { detected: [], hasConstraints: false, count: 0 },
      contradictions:      { detected: [], count: 0, hasContradiction: false },
      competingPriorities: { detected: [], hasCompeting: false },
      connections:         { detected: [], count: 0 },
      stateChanges:        { detected: [], count: 0, note: null },
      load:                { level: 'low', activeSignals: [], capabilityStatus: 'not_assessed', capabilityNote: null },
      baseline:            {},
      nextMove:            null,
      handover:            null,
      metaReading:         null,
      corrections:         [],
    };
  }


  // ── Item extractors ───────────────────────────────────────
  // Each returns an array safe for use in section items.

  function movementItems(map) {
    const movement = map?.movement || {};
    const items = [];

    if (movement.isMoving && movement.moving?.length) {
      movement.moving.forEach(m => {
        const typeLabel = _movementTypeLabel(m.type);
        items.push(`${typeLabel}: ${m.text || m.day || 'evidenced'}`);
      });
    }

    return items.slice(0, 8); // Cap for readability
  }

  function _movementTypeLabel(type) {
    const labels = {
      action:            'Action',
      vernacular_action: 'Action',
      load_movement:     'Movement under load',
      internal:          'Internal movement',
      structure:         'Structure change',
      collapse_recovery: 'Return after collapse',
    };
    return labels[type] || 'Movement';
  }

  function stuckItems(map) {
    const movement = map?.movement || {};
    const avoidance = map?.avoidance || {};
    const items = [];

    if (movement.stuck?.length) {
      movement.stuck.forEach(s => {
        items.push(`Non-movement: ${s.text || s.day || 'detected'}`);
      });
    }

    if (movement.intentionOnly?.length) {
      movement.intentionOnly.forEach(s => {
        items.push(`Intention without action: ${s.text || s.day || 'detected'}`);
      });
    }

    if (avoidance.hasAvoidance && avoidance.detected?.length) {
      avoidance.detected.slice(0, 3).forEach(a => {
        items.push(`${_avoidanceTypeLabel(a.type)}: ${a.text || a.day || 'detected'}`);
      });
    }

    return items.slice(0, 8);
  }

  function _avoidanceTypeLabel(type) {
    const labels = {
      lexical:          'Avoidance named',
      indirect:         'Indirect avoidance',
      deflection:       'Deflection',
      knowing_not_doing:'Knowing without doing',
      structural:       'Structural avoidance',
    };
    return labels[type] || 'Avoidance';
  }

  function loadItems(map) {
    const load = map?.load || {};
    const items = [];

    if (load.activeSignals?.length) {
      load.activeSignals.forEach(s => {
        items.push(`Load signal: ${s.label || s.key}`);
      });
    }

    if (load.capabilityStatus && load.capabilityStatus !== 'not_assessed') {
      items.push(`Capability status: ${_capabilityStatusLabel(load.capabilityStatus)}`);
    }

    return items;
  }

  function _capabilityStatusLabel(status) {
    const labels = {
      held_under_load:               'Held under load',
      breaking_under_load:           'Breaking under load',
      inconsistent_under_load:       'Inconsistent under load',
      not_reliable_under_pressure:   'Not yet tested under pressure',
      stale:                         'Stale — no recent evidence',
      load_present_capability_unread:'Load present — capability not read',
    };
    return labels[status] || status;
  }

  function constraintItems(map) {
    const constraints = map?.constraints || {};
    const items = [];

    if (constraints.detected?.length) {
      constraints.detected.forEach(c => {
        const changeableNote = c.changeable === true ? ' (may be changeable)'
          : c.changeable === false ? ' (fixed — not changeable)'
          : '';
        const partialNote = c.partial ? ' (partial block — some movement still possible)' : '';
        items.push(`${c.label || c.type}${changeableNote}${partialNote}`);
      });
    }

    return items;
  }

  function contradictionItems(map) {
    const contradictions = map?.contradictions || {};
    const items = [];

    if (contradictions.detected?.length) {
      contradictions.detected.forEach(c => {
        items.push(`${c.label} — ${c.note || 'held without resolving'}`);
      });
    }

    const competing = map?.competingPriorities || {};
    if (competing.detected?.length) {
      competing.detected.forEach(c => {
        items.push(`${c.label} — ${c.note || 'competing demands held'}`);
      });
    }

    return items;
  }

  function openGapItems(map) {
    const gaps = map?.gaps || {};
    const items = [];

    if (gaps.open?.length) {
      gaps.open.forEach(g => {
        const statusNote = g.status === 'implicitly_stale'
          ? ' (present at baseline — silent in recent entries)'
          : '';
        items.push(`${g.name || g.key}: ${g.reason || 'not described in material'}${statusNote}`);
      });
    }

    return items;
  }

  function highestPriorityGap(map) {
    return map?.gaps?.highestPriority || null;
  }


  // ── Warnings ──────────────────────────────────────────────

  function warningsFromMap(map, extra = []) {
    const warnings = [];

    // Meta-reading reliability
    const meta = map?.metaReading;
    if (meta?.mapReliable === false) {
      warnings.push(meta.note || 'Performance engagement detected. Map picture may not reflect honest account.');
    }
    if (meta?.engagementType === 'watch') {
      warnings.push(meta.note || 'Performance signals present below threshold. Monitoring.');
    }

    // Implicit stale topics
    const implicitStaleCount = map?.baseline?.implicitStaleCount || 0;
    if (implicitStaleCount > 0) {
      warnings.push(`${implicitStaleCount} baseline topic(s) went silent in recent entries. Cannot distinguish resolved, avoided, or not written about.`);
    }

    // Confidence
    const confidence = getOverallConfidence(map);
    if (confidence === 'not_readable') {
      warnings.push('Map confidence is not readable. Insufficient material.');
    } else if (confidence === 'thin') {
      warnings.push('Map confidence is thin. One or two entries only.');
    }

    // Load capability note
    const capNote = map?.load?.capabilityNote;
    if (capNote) warnings.push(capNote);

    // Extra warnings passed in
    if (Array.isArray(extra)) {
      extra.forEach(w => { if (w) warnings.push(w); });
    }

    return [...new Set(warnings)]; // Deduplicate
  }


  // ── Claim ─────────────────────────────────────────────────
  // A single labelled statement in a report section.
  // Confidence label is always attached.

  function makeClaim(opts = {}) {
    const {
      text,
      confidence = 'partial',
      basis       = null,
      directness  = 'direct',
      limit       = null,
    } = opts;

    return {
      text:         text || '',
      confidence,
      confidenceLabel: label(confidence),
      basis,
      directness,
      limit,
      isInferred:   confidence === 'inferred',
      isThin:       confidence === 'thin',
    };
  }


  // ── Section ───────────────────────────────────────────────
  // A named block within a report.

  function makeSection(opts = {}) {
    const {
      key,
      title,
      body        = null,
      claims      = [],
      items       = [],
      confidence  = 'partial',
      warnings    = [],
      empty       = false,
    } = opts;

    return {
      key,
      title,
      body,
      claims:     asArray(claims),
      items:      asArray(items),
      confidence,
      confidenceLabel: label(confidence),
      warnings:   asArray(warnings),
      empty,
      hasContent: !empty && (!!body || claims.length > 0 || (Array.isArray(items) ? items.length > 0 : Object.keys(items || {}).length > 0)),
    };
  }


  // ── Report ────────────────────────────────────────────────
  // The complete report object returned by every writer.

  function createReport(opts = {}) {
    const {
      writerId,
      writerVersion,
      reportType,
      title,
      audience,
      map,
      context     = {},
      sections    = [],
      caveats     = [],
      warnings    = [],
      limits      = [],
      metadata    = {},
    } = opts;

    const confidence = getOverallConfidence(map);

    return {
      // Identity
      writerId,
      writerVersion,
      reportType,
      title,
      audience,
      generatedAt: new Date().toISOString(),

      // Map summary
      mapConfidence:      confidence,
      mapConfidenceLabel: label(confidence),
      mapReliable:        map?.metaReading?.mapReliable !== false,

      // Context
      context,

      // Content
      sections,

      // Required caveats — always present
      caveats: [...REQUIRED_CAVEATS, ...asArray(caveats)].filter((v, i, a) => a.indexOf(v) === i),

      // Warnings
      warnings: asArray(warnings),

      // Limits
      limits: limits.length ? limits : defaultLimits(),

      // Metadata
      metadata: {
        ...metadata,
        baseVersion: VERSION,
        source: metadata.source || 'completed_sorter_map',
        mutatesMap: false,
      },
    };
  }


  // ── Required caveats ──────────────────────────────────────
  // Applied to every report regardless of audience.

  const REQUIRED_CAVEATS = [
    'Based only on material entered by the person — not independently verified.',
    'Not a diagnosis.',
    'Not a risk score or risk assessment.',
    'Not a legal finding.',
    'Not a compliance record.',
    'Not a professional clinical record.',
    'Treat this as context — not as evidence of fact.',
    'This is a reading and sorting tool. It does not generate, predict, or fill gaps with guesses.',
  ];


  // ── Default limits ────────────────────────────────────────

  function defaultLimits() {
    return [
      'The map reads what was written. It cannot read what was not written.',
      'Silence on a topic is not the same as resolution.',
      'The map cannot verify what happened outside the written material.',
      'The map does not know what the person did not say.',
      'Confidence labels reflect the quality of the material — not the quality of the person.',
      'This map is only as honest as the material it was built from.',
    ];
  }


  // ── Utility ───────────────────────────────────────────────

  function asArray(val) {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    if (typeof val === 'object') return Object.values(val);
    return [val];
  }


  // ── Public API ────────────────────────────────────────────

  return {
    VERSION,

    // Confidence
    confidenceRank,
    label,
    getOverallConfidence,

    // Map state
    extractMapState,

    // Item extractors
    movementItems,
    stuckItems,
    loadItems,
    constraintItems,
    contradictionItems,
    openGapItems,
    highestPriorityGap,

    // Warnings
    warningsFromMap,

    // Report building
    makeClaim,
    makeSection,
    createReport,

    // Constants
    REQUIRED_CAVEATS,

    // Helpers
    defaultLimits,
    asArray,
  };

})();
