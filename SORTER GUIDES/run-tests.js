const fs  = require('fs');
const vm  = require('vm');
const path = require('path');
const DIR = '/home/claude';

function loadBehaviourFile(filepath) {
  let src = fs.readFileSync(filepath, 'utf8');

  // 1. Collapse multi-line regex literals
  const lines = src.split('\n');
  const result = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    // Strip line comments and string literals before counting slashes
    // This avoids // comments and '/pattern/' strings confusing the count
    const stripped = line
      .replace(/\/\/.*$/,  '')           // remove // comments
      .replace(/'[^'\\]*'/g, '""')       // remove single-quoted strings
      .replace(/"[^"\\]*"/g, '""');      // remove double-quoted strings

    let slashCount = 0;
    for (let j = 0; j < stripped.length; j++) {
      if (stripped[j] === '/' && stripped[j-1] !== '\\') slashCount++;
    }

    if (slashCount % 2 !== 0) {
      // Unclosed regex — collect continuation lines
      let combined = line.trimEnd();
      i++;
      while (i < lines.length) {
        const next = lines[i].trim();
        combined += ' ' + next;
        i++;
        const cs = combined
          .replace(/\/\/.*$/, '')
          .replace(/'[^'\\]*'/g, '""')
          .replace(/"[^"\\]*"/g, '""');
        let sc = 0;
        for (let j = 0; j < cs.length; j++) {
          if (cs[j] === '/' && cs[j-1] !== '\\') sc++;
        }
        if (sc % 2 === 0) break;
      }
      result.push(combined);
    } else {
      result.push(line);
      i++;
    }
  }
  src = result.join('\n');

  // 2. Strip unsupported 'x' flag from regex literals
  src = src.replace(/\/([gimsuy]*)x([gimsuy]*)/g, (_, pre, post) => '/' + pre + post);

  // 3. Find exported const name
  const nameMatch = src.match(/^const\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*=/m);
  if (!nameMatch) return null;
  const name = nameMatch[1];

  // 4. Execute in sandboxed context
  const script = new vm.Script(src + `; __result = ${name};`);
  const ctx = vm.createContext({ __result: null });
  script.runInContext(ctx);
  return ctx.__result;
}

function loadEngineFile(filepath) {
  const src = fs.readFileSync(filepath, 'utf8');
  const nameMatch = src.match(/^const\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*=/m);
  if (!nameMatch) return;
  const name = nameMatch[1];
  const fn = new Function('global', src + `\nif(typeof ${name}!=="undefined") global["${name}"]=${name};`);
  fn(global);
}

// Load engine files
const ENGINE_FILES = [
  'sorter-spine-v0_6_0.js',
  'sorter-runtime-v0_4_0.js',
  'sorter-runtime-components-v0_1_0.js',
  'sorter-orchestration-contract-v0_1_0.js',
  'sorter-output-base-v0_1_0.js',
  'sorter-consent-gate-v0_1_0.js',
  'sorter-guides-output-v0_2_0.js',
  'sorter-test-harness-v0_1_0.js',
];
for (const f of ENGINE_FILES) {
  try { loadEngineFile(path.join(DIR, f)); }
  catch(e) { console.error('Engine load failed:', f, e.message); process.exit(1); }
}

// Load all 16 behaviour files
const behaviourFiles = fs.readdirSync(DIR)
  .filter(f => f.match(/^sorter-behaviour-\d+/))
  .sort();

const behaviours = [];
for (const f of behaviourFiles) {
  try {
    const b = loadBehaviourFile(path.join(DIR, f));
    if (b && b.id) {
      behaviours.push(b);
      process.stdout.write('.');
    } else {
      console.warn('\nNo behaviour exported from:', f);
    }
  } catch(e) {
    console.error('\nFailed to load:', f, '-', e.message.slice(0, 80));
  }
}

console.log(`\nLoaded ${behaviours.length}/17 behaviours\n`);

if (!global.SorterTestHarness) { console.error('SorterTestHarness not loaded'); process.exit(1); }
if (!global.SorterRuntime)     { console.error('SorterRuntime not loaded'); process.exit(1); }

const results = SorterTestHarness.run(behaviours, SorterRuntime);
const report  = SorterTestHarness.report(results);
console.log(report);

let total = 0, passed = 0, failed = 0, errors = 0;
for (const r of results) {
  total  += r.total;
  passed += r.passed;
  failed += r.failed;
  errors += (r.errors || 0);
}
const rate = total ? ((passed / total) * 100).toFixed(1) : '0.0';
console.log(`${'═'.repeat(48)}`);
console.log(`BEHAVIOURS: ${behaviours.length}/17 loaded`);
console.log(`CASES:      ${passed}/${total} passed | ${failed} failed | ${errors} errors`);
console.log(`PASS RATE:  ${rate}%`);
console.log(`${'═'.repeat(48)}`);

process.exit(failed > 0 ? 1 : 0);
