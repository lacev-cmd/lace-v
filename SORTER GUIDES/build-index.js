const fs   = require('fs');
const path = require('path');

// All maps: id → filename
const MAPS = [
  // Personal support
  { id: 'reentry',            file: 'sorter-assembled-reentry-v0_1_0.html' },
  { id: 'financial',          file: 'sorter-assembled-financial-v0_1_0.html' },
  { id: 'legal',              file: 'sorter-assembled-legal-v0_1_0.html' },
  { id: 'medical',            file: 'sorter-assembled-medical-v0_1_0.html' },
  { id: 'grief',              file: 'sorter-assembled-grief-v0_1_0.html' },
  { id: 'relationships',      file: 'sorter-assembled-relationships-v0_1_0.html' },
  { id: 'mental-health',      file: 'sorter-assembled-mental-health-v0_1_0.html' },
  { id: 'addiction', file: 'sorter-assembled-addiction-recovery-v0_1_0.html' },
  // Justice
  { id: 'criminal-justice',   file: 'sorter-assembled-criminal-justice-v0_1_0.html' },
  // Work & teams
  { id: 'engineering',        file: 'sorter-assembled-engineering-v0_1_0.html' },
  { id: 'team-dynamics',      file: 'sorter-assembled-team-dynamics-v0_1_0.html' },
  { id: 'employment',         file: 'sorter-assembled-employment-v0_1_0.html' },
  { id: 'education',          file: 'sorter-assembled-education-v0_1_0.html' },
  { id: 'creative',           file: 'sorter-assembled-creative-v0_1_0.html' },
  // STEM
  { id: 'stem-lab-evidence',         file: 'sorter-assembled-stem-lab-evidence-v0_1_0.html' },
  { id: 'stem-robotics',             file: 'sorter-assembled-stem-robotics-v0_1_0.html' },
  { id: 'stem-asset-integrity',      file: 'sorter-assembled-stem-asset-integrity-v0_1_0.html' },
  { id: 'stem-battery-transition',   file: 'sorter-assembled-stem-battery-transition-v0_1_0.html' },
  { id: 'stem-code-release',         file: 'sorter-assembled-stem-code-release-v0_1_0.html' },
  { id: 'stem-procurement',          file: 'sorter-assembled-stem-technical-procurement-v0_1_0.html' },
  // Creative & fiction
  { id: 'game-narrative',     file: 'sorter-assembled-game-narrative-v0_1_0.html' },
  { id: 'ai-agent',           file: 'sorter-assembled-ai-agent-v0_1_0.html' },
];

// Build base64 map
const embedded = {};
for (const m of MAPS) {
  const fpath = path.join(__dirname, m.file);
  if (!fs.existsSync(fpath)) { console.error('Missing:', m.file); process.exit(1); }
  embedded[m.id] = Buffer.from(fs.readFileSync(fpath, 'utf8')).toString('base64');
  console.log(`Embedded ${m.id}: ${embedded[m.id].length} base64 chars`);
}

const embeddedJson = JSON.stringify(embedded);

// Read source files
const landing = fs.readFileSync('/mnt/project/lace-v-landing-v0_1_0.html', 'utf8');
const picker  = fs.readFileSync('/mnt/project/lace-v-picker-v0_2_0.html',  'utf8');

// Fix typo in landing: "Its read" → "It's read"
const landingFixed = landing.replace(/Its read\./g, "It's read.");

// Extract landing body content (between <body> and </body>)
const landingBody = landingFixed.match(/<body>([\s\S]*)<\/body>/)?.[1] || '';
// Extract picker body content
const pickerBody = picker.match(/<body>([\s\S]*)<\/body>/)?.[1] || '';
// Extract landing styles
const landingStyle = landingFixed.match(/<style>([\s\S]*?)<\/style>/)?.[1] || '';
// Extract picker styles  
const pickerStyle = picker.match(/<style>([\s\S]*?)<\/style>/)?.[1] || '';

const index = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>LACE V — Pattern reading machine</title>
<style>
${landingStyle}

/* ── PICKER STYLES ── */
${pickerStyle}

/* ── MODAL ── */
.modal-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.45);
  z-index: 100;
  align-items: flex-start;
  justify-content: center;
  padding: 2rem 1rem;
  overflow-y: auto;
}
.modal-overlay.open { display: flex; }
.modal-box {
  background: var(--bg);
  border-radius: 16px;
  width: 100%;
  max-width: 760px;
  padding: 2rem 1.5rem 3rem;
  position: relative;
  margin: auto;
}
.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 18px;
  color: var(--faint);
  cursor: pointer;
  padding: .25rem .5rem;
  border-radius: 6px;
  transition: color .12s;
}
.modal-close:hover { color: var(--ink); }
</style>
</head>
<body>

${landingBody.replace(
  /href="lace-v-picker-v0_2_0\.html"/g,
  'href="#" onclick="openPicker(event)"'
)}

<!-- ── PICKER MODAL ── -->
<div class="modal-overlay" id="picker-modal" onclick="closePicker(event)">
  <div class="modal-box">
    <button class="modal-close" onclick="closePickerBtn()">✕</button>
    ${pickerBody
      // Replace the static open-map button with download
      .replace(
        /<a class="btn-build[^"]*" id="build-btn"[^>]*>Open map<\/a>/,
        '<button class="btn-build disabled" id="build-btn" onclick="downloadMap()">Download map</button>'
      )
    }
  </div>
</div>

<script>
// ── Embedded maps ──
const MAPS = ${embeddedJson};

// ── Picker state ──
let selected = null;

function pick(el) {
  document.querySelectorAll('.domain-card.selected').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  selected = {
    id:   el.dataset.id,
    file: el.dataset.file || null,
    name: el.querySelector('.d-name').textContent,
  };
  document.getElementById('sel-note').textContent = selected.name + ' selected';
  const btn = document.getElementById('build-btn');
  if (selected.file && MAPS[selected.id]) {
    btn.classList.remove('disabled');
  } else {
    btn.classList.add('disabled');
  }
}

function downloadMap() {
  if (!selected || !MAPS[selected.id]) return;
  const html = atob(MAPS[selected.id]);
  const blob = new Blob([html], { type: 'text/html' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = selected.file || (selected.id + '.html');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function openPicker(e) {
  e.preventDefault();
  document.getElementById('picker-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePicker(e) {
  if (e.target === document.getElementById('picker-modal')) closePickerBtn();
}

function closePickerBtn() {
  document.getElementById('picker-modal').classList.remove('open');
  document.body.style.overflow = '';
}
</script>

</body>
</html>`;

fs.writeFileSync('/home/claude/index.html', index, 'utf8');
console.log('index.html written:', index.length, 'chars');

// Verify typo fix
if (index.includes("It's read.")) console.log('✓ Typo fixed: "It\'s read."');
else console.log('✗ Typo NOT fixed');

// Verify disclaimer is NOT yet in footer (we add it separately)

// Re-apply footer disclaimer (str_replace equivalent)
let idx = require('fs').readFileSync('/home/claude/index.html','utf8');
idx = idx.replace(
  '<footer class="site-footer">\n  <div class="wrap">\n    <span class="footer-copy">LACE V — pattern reading machine</span>\n    <span class="footer-copy">Nothing leaves your device.</span>\n  </div>\n</footer>',
  `<footer class="site-footer">
  <div class="wrap">
    <span class="footer-copy">LACE V — pattern reading machine</span>
    <span class="footer-copy">Nothing leaves your device.</span>
  </div>
  <div class="wrap" style="margin-top:1rem; padding-bottom:1.5rem;">
    <p style="font-size:11px; color:var(--faint); line-height:1.7; max-width:640px;">
      LACE V reads patterns in what you write. It does not diagnose, assess risk, provide medical advice, legal advice, financial advice, or any form of professional opinion. It does not replace professional support. If you are in crisis, contact a crisis line, trusted person, or emergency services. The map is yours — it reads what you give it and nothing more.
    </p>
  </div>
</footer>`
);
require('fs').writeFileSync('/home/claude/index.html', idx, 'utf8');
console.log('Disclaimer added. Final size:', idx.length, 'chars');

// Final validation
const maps2 = JSON.parse(idx.match(/const MAPS = ({[^;]+});/s)[1]);
console.log('Maps embedded:', Object.keys(maps2).length);
const hasAddiction = 'addiction' in maps2;
console.log('addiction key correct:', hasAddiction);
