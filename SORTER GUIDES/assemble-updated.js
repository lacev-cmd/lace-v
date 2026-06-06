#!/usr/bin/env node
// ══════════════════════════════════════════════════════════
// SORTER ASSEMBLER  v0.1.0
//
// Usage:
//   node assemble.js <guide-file.js> [output-file.html]
//   node assemble.js <parent-guide.js> <child-guide.js> [output.html]
//
// Flow: Guide → Behaviour → Cartridge → Output
//
// What it does:
//   1. Reads guide JS file(s)
//   2. Extracts structured fields (gaps, skills, contradictions, etc.)
//      by truncating before the steer block — avoids multi-line regex issues
//   3. Translates guide → cartridge (window.SORTER_CARTRIDGE shape)
//   4. Reads shell HTML
//   5. Replaces /* CARTRIDGE_START */ ... /* CARTRIDGE_END */
//   6. Writes deployable HTML
//
// cartridgeOverride support:
//   Add a cartridgeOverride: {} block to a guide to inject hand-crafted
//   content (sampleBaseline, sampleEntries, crisisRx, stuckRx, etc.)
//   Override fields win over derived fields.
// ══════════════════════════════════════════════════════════

'use strict';

const fs   = require('fs');
const path = require('path');

const SHELL_PATH   = path.resolve(__dirname, 'sorter-cartridge-shell-v0_1_0.html');
const MARKER_START = '/* CARTRIDGE_START */';
const MARKER_END   = '/* CARTRIDGE_END */';

// ── Sector display copy ───────────────────────────────────

const SECTOR_COPY = {
  'reentry':          { name: 'Reentry Map',          tagline: 'private · evidence-bound · non-moralising', accent: '#3a4a3a', accentLight: '#eef2ee' },
  're-entry':         { name: 'Reentry Map',          tagline: 'private · evidence-bound · non-moralising', accent: '#3a4a3a', accentLight: '#eef2ee' },
  'financial':        { name: 'Financial Map',        tagline: 'private · evidence-bound · numbers-first',  accent: '#1a3a5c', accentLight: '#edf2f8' },
  'legal':            { name: 'Legal Map',            tagline: 'private · evidence-bound · process-aware',  accent: '#3a2a5c', accentLight: '#f0edf8' },
  'medical':          { name: 'Medical Map',          tagline: 'private · evidence-bound · symptom-led',    accent: '#2a4a3a', accentLight: '#edf4f0' },
  'grief':            { name: 'Grief Map',            tagline: 'private · evidence-bound · non-prescriptive', accent: '#4a3a2a', accentLight: '#f4f0ec' },
  'creative':         { name: 'Creative Map',         tagline: 'private · evidence-bound · process-first',  accent: '#5a2a3a', accentLight: '#f4edf2' },
  'relationships':    { name: 'Relationships Map',    tagline: 'private · evidence-bound · non-directive',  accent: '#2a3a5c', accentLight: '#edf0f4' },
  'criminal-justice': { name: 'Criminal Justice Map', tagline: 'private · evidence-bound · non-moralising', accent: '#3a3a2a', accentLight: '#f2f2ed' },
  'team-dynamics':      { name: 'Team Dynamics Map',      tagline: 'private · evidence-bound · pattern-aware',    accent: '#2a4a4a', accentLight: '#edf4f4' },
  'mental-health':      { name: 'Mental Health Map',      tagline: 'private · evidence-bound · function-led',      accent: '#3a2a5a', accentLight: '#f0edf8' },
  'addiction-recovery': { name: 'Addiction Recovery Map', tagline: 'private · evidence-bound · non-moralising',    accent: '#2a3a4a', accentLight: '#edf0f4' },
  'engineering':        { name: 'Engineering Map',        tagline: 'private · evidence-bound · constraint-aware',  accent: '#1a3a3a', accentLight: '#edf4f4' },
  'employment':         { name: 'Employment Map',         tagline: 'private · evidence-bound · activity-first',    accent: '#3a2a1a', accentLight: '#f4f0ec' },
  'education':          { name: 'Education Map',          tagline: 'private · evidence-bound · understanding-led', accent: '#1a2a4a', accentLight: '#edf0f8' },
};

const DEFAULT_COPY = { name: 'Personal Map', tagline: 'private · evidence-bound', accent: '#2d5a3d', accentLight: '#e8f0ea' };

// ── Helpers ───────────────────────────────────────────────

function die(msg)  { console.error(`\n[assemble] ERROR: ${msg}\n`); process.exit(1); }
function log(msg)  { console.log(`[assemble] ${msg}`); }
function warn(msg) { console.warn(`[assemble] WARN: ${msg}`); }

/**
 * Load a guide JS file.
 * Strategy: extract the safe portion (everything before `steer:`) to avoid
 * multi-line regex literals that break Node.js eval, then evaluate just that
 * to get the structured data fields the cartridge assembly needs.
 */
function loadGuide(filePath) {
  const absPath = path.resolve(filePath);
  if (!fs.existsSync(absPath)) die(`Guide file not found: ${filePath}`);

  const src = fs.readFileSync(absPath, 'utf8');

  // Find the exported const name
  const nameMatch = src.match(/^const\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*=/m);
  if (!nameMatch) die(`No top-level const found in ${filePath}`);
  const varName = nameMatch[1];

  // Truncate before the steer block — steer contains multi-line regex
  const steerIdx = src.indexOf('\n  steer:');
  const safeSrc  = steerIdx > -1
    ? src.slice(0, steerIdx) + '\n};\n'
    : src;

  let guide;
  try {
    const fn = new Function(
      safeSrc +
      `\nreturn typeof ${varName} !== 'undefined' ? ${varName} : null;`
    );
    guide = fn();
  } catch (e) {
    die(`Could not evaluate guide file ${filePath}:\n  ${e.message}`);
  }

  if (!guide) die(`Guide const '${varName}' evaluated to null in ${filePath}`);
  if (!guide.id || !guide.sector) die(`Guide in ${filePath} missing required id/sector fields`);

  // Also try to extract cartridgeOverride if present in the full source
  if (!guide.cartridgeOverride && src.includes('cartridgeOverride:')) {
    warn(`cartridgeOverride found in ${filePath} but could not be extracted (may contain complex expressions). Add it as a plain-object block.`);
  }

  return guide;
}

/**
 * Merge parent + child guides. Child wins on conflicts, arrays are extended.
 */
function mergeGuides(parent, child) {
  const merged = { ...parent };

  for (const k of ['id','version','type','purpose','sector']) {
    if (child[k] !== undefined) merged[k] = child[k];
  }

  if (child.sectorNotes) {
    merged.sectorNotes = { ...(parent.sectorNotes || {}) };
    for (const k of Object.keys(child.sectorNotes)) {
      const pv = parent.sectorNotes?.[k];
      const cv = child.sectorNotes[k];
      merged.sectorNotes[k] = Array.isArray(pv) && Array.isArray(cv) ? [...pv, ...cv] : cv;
    }
  }

  for (const field of ['gaps','skills','contradictions','directionPatterns','pressureSignals']) {
    if (child[field]) {
      merged[field] = _mergeByKey(parent[field] || [], child[field]);
    }
  }

  if (child.stuckRx)          merged.stuckRx          = child.stuckRx;
  if (child.cartridgeOverride) merged.cartridgeOverride = { ...(parent.cartridgeOverride||{}), ...child.cartridgeOverride };

  return merged;
}

function _mergeByKey(base, additions) {
  const map = new Map();
  for (const item of base)      { const k = item.key || JSON.stringify(item); map.set(k, item); }
  for (const item of additions) { const k = item.key || JSON.stringify(item); map.set(k, item); }
  return [...map.values()];
}

/**
 * Translate guide → cartridge object.
 */
function guideToCartridge(guide) {
  const sectorKey = (guide.sector || guide.id || '').toLowerCase().replace(/\s+/g, '-');
  const copy      = SECTOR_COPY[sectorKey] || DEFAULT_COPY;
  const notes     = guide.sectorNotes || {};

  const pressures = (notes.distinctivePressures || []).slice(0, 3).join('; ');
  const desc = notes.outputAudience
    ? `${notes.outputAudience}.${pressures ? ' Key pressures: ' + pressures + '.' : ''}`
    : pressures || `Map for ${copy.name}.`;

  const cartridge = {
    id:          sectorKey,
    name:        copy.name,
    tagline:     copy.tagline,
    desc:        desc.trim(),
    accent:      copy.accent,
    accentLight: copy.accentLight,

    baselineTitle:       'Set your baseline',
    baselineDesc:        _buildBaselineDesc(notes),
    baselinePlaceholder: _buildBaselinePlaceholder(notes),

    entryTitle:       'Add an entry',
    entryDesc:        notes.outputRegister || 'What is on your mind. What happened. What you noticed.',
    entryPlaceholder: 'What is on your mind?',

    reportDesc:      `The map reads what is moving, stuck, and under load based on what you wrote.`,
    reportEmptyDesc: 'Add a baseline and at least one entry, then read your map.',

    crisisCheck: _hasCrisisContext(sectorKey),
    crisisRx:    _defaultCrisisRx(),

    gaps:              guide.gaps              || [],
    skills:            guide.skills            || [],
    contradictions:    guide.contradictions    || [],
    directionPatterns: guide.directionPatterns || [],
    pressureSignals:   guide.pressureSignals   || [],
    stuckRx:           guide.stuckRx           || _defaultStuckRx(),

    sampleBaseline:   '',
    sampleEntries:    [],
  };

  // cartridgeOverride wins on all fields
  if (guide.cartridgeOverride) {
    for (const [k, v] of Object.entries(guide.cartridgeOverride)) {
      cartridge[k] = v;
    }
  }

  return cartridge;
}

function _buildBaselineDesc(notes) {
  const gaps  = (notes.distinctiveGaps    || []).slice(0, 3).map(g => g.toLowerCase().replace(/\.$/, '')).join('; ');
  const moves = (notes.distinctiveMovement || []).slice(0, 2).map(m => m.toLowerCase().replace(/\.$/, '')).join('; ');
  let desc = 'Where you are now. What has led to this point. What the current pressure looks like.';
  if (gaps)  desc += ` The map particularly needs: ${gaps}.`;
  if (moves) desc += ` Movement in this domain looks like: ${moves}.`;
  return desc;
}

function _buildBaselinePlaceholder(notes) {
  const gaps = notes.distinctiveGaps || [];
  if (!gaps.length) return 'Where are you now? What has led to this point?';
  return `Where are you now? What has led to this point? Include: ${gaps[0].toLowerCase().replace(/\.$/, '')}.`;
}

function _hasCrisisContext(sectorKey) {
  return ['grief','medical','reentry','re-entry','criminal-justice','mental-health','addiction-recovery'].includes(sectorKey);
}

function _defaultCrisisRx() {
  return /\b(kill myself|end my life|suicide|suicidal|I want to die|don't want to be here|hurt myself|harm myself|can't go on|not worth it|overdose)\b/i;
}

function _defaultStuckRx() {
  return /\b(same thing|going in circles|nothing changes|same pattern|no progress|still the same|back to square one|what is the point|nothing moves)\b/i;
}

/**
 * Serialise the cartridge object to a JS assignment string.
 * Preserves RegExp objects (JSON.stringify drops them).
 */
function serialiseCartridge(cartridge) {
  function ser(v, depth) {
    const ind  = '  '.repeat(depth);
    const ind1 = '  '.repeat(depth + 1);
    if (v === null || v === undefined)  return 'undefined';
    if (typeof v === 'boolean')         return String(v);
    if (typeof v === 'number')          return String(v);
    if (typeof v === 'string')          return JSON.stringify(v);
    if (v instanceof RegExp)            return v.toString();
    if (Array.isArray(v)) {
      if (!v.length) return '[]';
      const items = v.map(item => `\n${ind1}${ser(item, depth + 1)}`).join(',');
      return `[${items}\n${ind}]`;
    }
    if (typeof v === 'object') {
      const pairs = Object.entries(v)
        .filter(([, val]) => val !== undefined)
        .map(([k, val]) => `\n${ind1}${k}: ${ser(val, depth + 1)}`);
      if (!pairs.length) return '{}';
      return `{${pairs.join(',')}\n${ind}}`;
    }
    return String(v);
  }

  const lines = ['window.SORTER_CARTRIDGE = {'];
  for (const [k, v] of Object.entries(cartridge)) {
    if (v === undefined) continue;
    lines.push(`\n  ${k}: ${ser(v, 1)},`);
  }
  lines.push('\n};');
  return lines.join('');
}

/**
 * Inject the cartridge code between the shell markers.
 */
function injectIntoShell(shellHtml, cartridgeCode) {
  const startIdx = shellHtml.indexOf(MARKER_START);
  const endIdx   = shellHtml.indexOf(MARKER_END);
  if (startIdx === -1) die(`CARTRIDGE_START marker not found in shell.`);
  if (endIdx   === -1) die(`CARTRIDGE_END marker not found in shell.`);
  const before = shellHtml.slice(0, startIdx);
  const after  = shellHtml.slice(endIdx + MARKER_END.length);
  return before + MARKER_START + '\n' + cartridgeCode + '\n' + MARKER_END + after;
}

// ── Main ──────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);

  if (!args.length || args.includes('-h') || args.includes('--help')) {
    console.log(`
SORTER ASSEMBLER v0.1.0
Flow: Guide → Cartridge → Shell → Deployable HTML

Usage:
  node assemble.js <guide.js> [output.html]
  node assemble.js <parent-guide.js> <child-guide.js> [output.html]

Examples:
  node assemble.js sorter-guide-reentry-v0_4_0.js
  node assemble.js sorter-guide-reentry-v0_4_0.js sorter-assembled-reentry-v2.html
  node assemble.js sorter-guide-criminal-justice-v0_4_0.js sorter-guides-second-ring-v0_2_0.js

Shell:  ${SHELL_PATH}
Output: sorter-assembled-<sector>-v0_1_0.html (default)

cartridgeOverride:
  Add cartridgeOverride: { ... } to a guide const to inject hand-crafted
  content (sampleBaseline, sampleEntries, crisisRx, stuckRx, accent, etc.)
    `);
    process.exit(0);
  }

  const jsFiles   = args.filter(a => a.endsWith('.js'));
  const htmlFiles = args.filter(a => a.endsWith('.html'));
  const outputFile = htmlFiles[0] || null;

  if (!jsFiles.length) die('No .js guide file provided.');

  // Load shell
  if (!fs.existsSync(SHELL_PATH)) die(`Shell not found: ${SHELL_PATH}`);
  const shellHtml = fs.readFileSync(SHELL_PATH, 'utf8');
  log(`Shell: ${SHELL_PATH} (${shellHtml.length} chars)`);

  // Load guide(s)
  let guide;
  if (jsFiles.length === 1) {
    guide = loadGuide(jsFiles[0]);
    log(`Guide: ${guide.id} v${guide.version || '?'} sector=${guide.sector} type=${guide.type}`);
  } else {
    const loaded = jsFiles.map(f => loadGuide(f));
    loaded.forEach(g => log(`Guide: ${g.id} v${g.version || '?'} sector=${g.sector} type=${g.type}`));
    const parent = loaded.find(g => g.type === 'sector')    || loaded[0];
    const child  = loaded.find(g => g.type === 'subsector') || loaded[1];
    guide = mergeGuides(parent, child);
    log(`Merged: ${parent.id} + ${child.id}`);
  }

  // Translate
  const cartridge = guideToCartridge(guide);
  log(`Cartridge: id=${cartridge.id} | gaps=${cartridge.gaps.length} skills=${cartridge.skills.length} directionPatterns=${cartridge.directionPatterns.length} pressureSignals=${cartridge.pressureSignals.length} contradictions=${cartridge.contradictions.length}`);

  // Serialise
  const cartridgeCode = serialiseCartridge(cartridge);

  // Inject
  const assembled = injectIntoShell(shellHtml, cartridgeCode);

  // Write
  const sectorSlug = cartridge.id.replace(/[^a-z0-9]+/g, '-');
  const outPath = outputFile || `sorter-assembled-${sectorSlug}-v0_1_0.html`;
  fs.writeFileSync(outPath, assembled, 'utf8');
  log(`Written: ${outPath} (${assembled.length} chars)`);
  log(`Done.`);
}

main();
