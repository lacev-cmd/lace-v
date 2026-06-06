// ══════════════════════════════════════════════════════════
// SORTER REPORT WRITER BASE  v0.1.0
//
// Shared utilities consumed by all report writers.
// Do not instantiate directly. Import via the report writers.
//
// Responsibilities:
//   - Define and read the map state shape
//   - Build section and claim objects
//   - Apply confidence labels
//   - Produce the report envelope
//   - Shared caveats and limits
//   - Warning aggregation
//
// Map state shape (what the engine must produce):
//
//   map = {
//     meta: {
//       sector:       string,
//       cartridgeId:  string,
//       period:       { start: string, end: string },
//       entryCount:   number,
//       baselineSet:  boolean,
//     },
//     confidence: {
//       overall:      string,        // confidence key
//       byBehaviour:  {}             // { behaviourId: confidenceKey }
//     },
//     movement: {
//       isMoving:     boolean,
//       signals:      string[],
//       summary:      string,
//       independentDays: number,
//     },
//     stuck: {
//       signals:      string[],
//     },
//     load: {
//       level:        string,        // 'none' | 'low' | 'moderate' | 'high'
//       signals:      string[],
//       capabilityNote: string|null, // load-sensitive skill warning
//     },
//     gaps: {
//       count:        number,
//       items:        [{ key, name, reason, priority }]
//     },
//     skills: {
//       present:      [{ key, name, works, independentDays, confidence }],
//       absent:       [{ key, name, breaks }],
//       loadSensitivePresent: [{ key, name }],
//     },
//     contradictions: {
//       detected:     [{ type, label, note, a, b, text }],
//     },
//     directions: {
//       detected:     string[],
//     },
//     pressure: {
//       signals:      string[],
//     },
//     stateChanges: {
//       detected:     [{ type, label, confidence, topics, note,
//                        priorState, currentState, separationDays }]
//     },
//     connections: {
//       detected:     [{ type, label, confidence, firstSeen, lastSeen,
//                        spanDays, note }]
//     },
//     nextMove: {
//       move:         string,
//       rationale:    string,
//       rank:         number,         // which priority rule fired
//     } | null,
//     handover: {
//       available:    boolean,
//       consentState: string|null,
//     },
//     corrections: {
//       applied:      [{ date, text }],
//       primaryTopic: string|null,
//     },
//     constraints: {
//       external:     string[],       // external constraint signals
//     },
//   }
//
// ══════════════════════════════════════════════════════════

const SorterReportWriterBase = (() => {

  const VERSION = '0.1.0';

  // ── Confidence ────────────────────────────────────────────

  const CONFIDENCE_TIERS = [
    { key: 'not_readable', label: 'Not readable',  weight: 0 },
    { key: 'inferred',     label: 'Inferred',      weight: 1 },
    { key: 'thin',         label: 'Thin read',     weight: 2 },
    { key: 'partial',      label: 'Partial read',  weight: 3 },
    { key: 'supported',    label: 'Supported',     weight: 4 },
    { key: 'strong',       label: 'Strong read',   weight: 5 },
  ];

  function label(confidenceKey) {
    const tier = CONFIDENCE_TIERS.find(t => t.key === confidenceKey);
    return tier ? `(${tier.label.toLowerCase()})` : '(unknown)';
  }

  function confidenceWeight(key) {
    const tier = CONFIDENCE_TIERS.find(t => t.key === key);
    return tier ? tier.weight : 0;
  }

  function getOverallConfidence(map) {
    return map?.confidence?.overall || 'not_readable';
  }

  // ── Required caveats ──────────────────────────────────────

  const REQUIRED_CAVEATS = [
    'Based only on material entered by the person — not independently verified.',
    'Not a diagnosis.',
    'Not a risk score.',
    'Not a legal finding.',
    'Not a compliance assessment.',
    'Not a professional clinical record.',
  ];

  function defaultLimits() {
    return [
      'The map reads what was written. It cannot see what was not written.',
      'Confidence labels indicate material quality — not certainty about the person.',
      'This output does not diagnose, score risk, or make legal findings.',
      'The map is built from one perspective. It does not independently verify facts.',
    ];
  }

  // ── Map state extraction ──────────────────────────────────

  function extractMapState(map) {
    return {
      confidence:    map?.confidence  || { overall: 'not_readable', byBehaviour: {} },
      movement:      map?.movement    || { isMoving: false, signals: [], summary: null, independentDays: 0 },
      stuck:         map?.stuck       || { signals: [] },
      load:          map?.load        || { level: 'none', signals: [], capabilityNote: null },
      gaps:          map?.gaps        || { count: 0, items: [] },
      skills:        map?.skills      || { present: [], absent: [], loadSensitivePresent: [] },
      contradictions:map?.contradictions || { detected: [] },
      directions:    map?.directions  || { detected: [] },
      pressure:      map?.pressure    || { signals: [] },
      stateChanges:  map?.stateChanges|| { detected: [] },
      connections:   map?.connections || { detected: [] },
      nextMove:      map?.nextMove    || null,
      handover:      map?.handover    || { available: false, consentState: null },
      corrections:   map?.corrections || { applied: [], primaryTopic: null },
      constraints:   map?.constraints || { external: [] },
      meta:          map?.meta        || {},
    };
  }

  // ── Item extraction helpers ───────────────────────────────

  function asArray(val) {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    if (typeof val === 'object') return Object.values(val);
    return [];
  }

  function movementItems(map) {
    const state = extractMapState(map);
    return state.movement.signals || [];
  }

  function stuckItems(map) {
    const state = extractMapState(map);
    return state.stuck.signals || [];
  }

  function loadItems(map) {
    const state = extractMapState(map);
    return state.load.signals || [];
  }

  function contradictionItems(map) {
    const detected = asArray(map?.contradictions?.detected);
    return detected.map(c => c.text || c.label || String(c)).filter(Boolean);
  }

  function openGapItems(map) {
    const items = asArray(map?.gaps?.items);
    return items.map(g => {
      if (typeof g === 'string') return g;
      const parts = [g.name];
      if (g.reason) parts.push(`— ${g.reason}`);
      return parts.join(' ');
    }).filter(Boolean);
  }

  function constraintItems(map) {
    return asArray(map?.constraints?.external);
  }

  function highestPriorityGap(map) {
    const items = asArray(map?.gaps?.items);
    if (!items.length) return null;
    // Sort by priority (lower number = higher priority), then take first
    const sorted = [...items].sort((a, b) => {
      const pa = typeof a.priority === 'number' ? a.priority : 99;
      const pb = typeof b.priority === 'number' ? b.priority : 99;
      return pa - pb;
    });
    return sorted[0];
  }

  // ── Warning aggregation ───────────────────────────────────

  function warningsFromMap(map, extra = []) {
    const warnings = [];

    const confidence = getOverallConfidence(map);
    if (confidence === 'not_readable') {
      warnings.push('Map confidence is not_readable. Output is minimal.');
    } else if (confidence === 'thin') {
      warnings.push('Map confidence is thin. Output should be treated as directional only.');
    }

    const gapCount = map?.gaps?.count || 0;
    if (gapCount > 0) {
      warnings.push(`${gapCount} open gap(s) limit map reliability.`);
    }

    const loadLevel = map?.load?.level;
    if (loadLevel === 'high') {
      warnings.push('Load is high. Load-sensitive capabilities may not be reliable under current conditions.');
    }

    const capabilityNote = map?.load?.capabilityNote;
    if (capabilityNote) {
      warnings.push(capabilityNote);
    }

    return warnings.concat(asArray(extra)).filter(Boolean);
  }

  // ── Section and claim builders ────────────────────────────

  function makeClaim(opts = {}) {
    return {
      text:       opts.text       || '',
      confidence: opts.confidence || 'partial',
      basis:      opts.basis      || null,
      directness: opts.directness || 'direct',  // 'direct' | 'inferred'
      limit:      opts.limit      || null,
    };
  }

  function makeSection(opts = {}) {
    return {
      key:        opts.key        || 'unnamed',
      title:      opts.title      || '',
      body:       opts.body       || null,
      claims:     asArray(opts.claims),
      items:      asArray(opts.items),
      confidence: opts.confidence || 'partial',
      warnings:   asArray(opts.warnings),
      empty:      opts.empty      === true,
    };
  }

  // ── Report envelope ───────────────────────────────────────

  function createReport(opts = {}) {
    return {
      _type:         'sorter_report',
      writerId:      opts.writerId      || 'unknown',
      writerVersion: opts.writerVersion || '0.0.0',
      reportType:    opts.reportType    || 'unknown',
      title:         opts.title         || 'Sorter Report',
      audience:      opts.audience      || 'unknown',
      generatedAt:   new Date().toISOString(),
      context:       opts.context       || {},
      sections:      asArray(opts.sections),
      caveats:       asArray(opts.caveats).concat(REQUIRED_CAVEATS),
      warnings:      asArray(opts.warnings),
      limits:        asArray(opts.limits).concat(defaultLimits()),
      metadata:      opts.metadata      || {},
      // The source map is attached for downstream use (e.g. adaptive components)
      // but should not be rendered directly in person-facing output.
      _map:          opts.map           || null,
    };
  }

  // ── Public ────────────────────────────────────────────────

  return {
    VERSION,
    REQUIRED_CAVEATS,
    label,
    confidenceWeight,
    getOverallConfidence,
    defaultLimits,
    extractMapState,
    asArray,
    movementItems,
    stuckItems,
    loadItems,
    contradictionItems,
    openGapItems,
    constraintItems,
    highestPriorityGap,
    warningsFromMap,
    makeClaim,
    makeSection,
    createReport,
  };

})();
