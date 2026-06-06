# SORTER ASSEMBLER  v0.1.0

## The flow

```
Guide (.js)  →  assemble.js  →  Cartridge (injected into Shell)  →  Deployable HTML
```

Guide defines the domain. Shell is the engine. Cartridge is the product.

---

## Usage

```bash
# Single guide → cartridge
node assemble.js sorter-guide-reentry-v0_4_0.js

# With explicit output path
node assemble.js sorter-guide-reentry-v0_4_0.js my-output.html

# Parent + child (subsector extends sector)
node assemble.js sorter-guide-criminal-justice-v0_4_0.js sorter-guides-second-ring-v0_2_0.js
```

Output defaults to: `sorter-assembled-<sector>-v0_1_0.html`

Shell is read from: `sorter-cartridge-shell-v0_1_0.html` (must be in same directory).

---

## What the assembler reads from each guide

| Guide field          | Cartridge field           | Notes                              |
|----------------------|---------------------------|------------------------------------|
| `sector`             | `id`, `name`, `tagline`   | Mapped via SECTOR_COPY table       |
| `sectorNotes.*`      | `desc`, `baselineDesc`, `baselinePlaceholder` | Derived from distinctiveGaps, distinctiveMovement, outputAudience |
| `gaps`               | `gaps`                    | Passthrough                        |
| `skills`             | `skills`                  | Passthrough                        |
| `contradictions`     | `contradictions`          | Passthrough                        |
| `directionPatterns`  | `directionPatterns`       | Passthrough                        |
| `pressureSignals`    | `pressureSignals`         | Passthrough (if defined)           |
| `stuckRx`            | `stuckRx`                 | Default provided if absent         |
| `cartridgeOverride`  | (any field)               | Merges last, wins on conflict      |

Fields the assembler derives automatically:
- `crisisCheck` — true for grief, medical, re-entry, criminal-justice
- `crisisRx` — standard crisis language regex (override via cartridgeOverride)
- `stuckRx` — standard stuck pattern regex (override via cartridgeOverride)
- `accent` / `accentLight` — from SECTOR_COPY table

---

## cartridgeOverride pattern

Add to any guide const to inject hand-crafted cartridge content:

```js
const GuideReentry = {
  id: 'guide-reentry',
  sector: 're-entry',
  // ... standard guide fields ...

  // Hand-crafted content injected directly into cartridge
  cartridgeOverride: {
    crisisRx: /\b(kill myself|end my life|suicide)\b/i,
    stuckRx:  /\b(same thing|going in circles|same mob)\b/i,
    accent:   '#3a4a3a',
    accentLight: '#eef2ee',
    sampleBaseline: 'Got out six weeks ago...',
    sampleEntries: [
      { daysAgo: 12, text: 'Ran into someone from the old crew...' },
    ],
    sampleCorrection: 'Treat the contact with the old crew as ongoing pressure.',
  },
};
```

Override fields win over all derived values.

---

## Multi-line regex note

Guide files use multi-line regex literals in the `steer:` block. The assembler
truncates the source before `steer:` before evaluating, which sidesteps the
Node.js parser limitation. All cartridge-relevant fields (gaps, skills,
contradictions, directionPatterns) live before steer and are extracted cleanly.

---

## Injection markers

The shell HTML uses these exact strings:

```html
/* CARTRIDGE_START */
window.SORTER_CARTRIDGE = null; // replaced at assembly
/* CARTRIDGE_END */
```

The assembler replaces everything between the markers with the serialised
cartridge object. RegExp literals are preserved (not JSON-serialised).

---

## Adding a new sector

1. Add a row to SECTOR_COPY in assemble.js:
   ```js
   'mental-health': { name: 'Mental Health Map', tagline: 'private · evidence-bound · symptom-led', accent: '#3a2a5a', accentLight: '#f0edf8' },
   ```

2. Write the guide file with `gaps`, `skills`, `contradictions`, `directionPatterns`.

3. Run `node assemble.js sorter-guide-mental-health-v0_1_0.js`

4. Done. The deployable HTML is ready.

---

## Distribution point (lacev.com)

Each assembled HTML file is a complete single-file application:
- No server required
- No build step
- No dependencies
- Data stored in `localStorage` under key `sorter:<cartridge-id>`
- Works offline

Deployment: upload the HTML file anywhere. Link directly. That's the product.

Naming convention:
```
sorter-assembled-<sector>-v<major>_<minor>_<patch>.html
```

Version the cartridge when the gap/skill/pattern set changes in a way that
would break existing user data — add a migration note.

---

## Horizon branch  (added v0.6.0 / v0.4.0)

The horizon branch adds a forward-facing read layer on top of the standard
sorter map. It is a separate product — horizon shells are **not** assembled via
`assemble.js` and are not listed in `build-index.js`.

### New files

| File | Role |
|------|------|
| `sorter-behaviour-17-horizon-reading-v0_1_0.js` | Behaviour: projects arc to a named horizon |
| `adaptive-component-13-horizon-map-v0_1_0.js` | Comparison surface: projected vs intended state |
| `sorter-report-writer-horizon-v0_1_0.js` | Only forward-facing report writer in the system |
| `sorter-runtime-v0_4_0.js` | Patches v0.3.1 — adds `_horizonRead()` |
| `sorter-spine-v0_6_0.js` | Patches v0.5.1 — adds horizon-reading at position 17 in PROCESSING_ORDER |

### Horizon HTML shells

Pre-assembled single-file applications. Built by hand (not via `assemble.js`).
Follow the standard naming convention:

```
sorter-assembled-horizon-<sector>-v0_1_0.html
```

Current shells:
- `sorter-assembled-horizon-reentry-v0_1_0.html`
- `sorter-assembled-horizon-relationships-v0_1_0.html`
- `sorter-assembled-horizon-financial-v0_1_0.html`

### Test suite

`run-tests.js` updated:
- Engine references: `sorter-spine-v0_6_0.js`, `sorter-runtime-v0_4_0.js`
- Behaviour count: 17 (was 16)
- All 17 behaviours pass at 110/110 (100%)

### Report writers index

`sorter-report-writers-index-v0_1_1.js` (patches v0.1.0):
- `SorterReportWriterHorizon` added to `registerDefaults()`
- `writeHorizon()` convenience method added

