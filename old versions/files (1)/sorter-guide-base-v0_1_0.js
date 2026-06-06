// ══════════════════════════════════════════════════════════
// SORTER GUIDE BASE  v0.1.0
//
// The shared shape all guides extend from.
// Not a guide itself — a template and contract definition.
//
// First-ring sector guides extend this directly.
// Second-ring sub-sector guides extend their parent sector.
// Third-ring output guides extend this with output-only steers.
//
// A guide never contains analysis logic.
// A guide only contains what belongs to a sector or output context.
// ══════════════════════════════════════════════════════════

const GuideBase = {

  // ── Required fields (all guides) ─────────────────────────

  id:      '',       // 'guide-{sector}' or 'guide-{sector}-{subsector}'
  version: '0.1.0',
  type:    '',       // 'sector' | 'subsector' | 'output'
  parent:  null,     // parent guide id if subsector, null otherwise
  purpose: '',       // what this guide steers toward
  sector:  '',       // the domain or output context


  // ── Sector metadata ───────────────────────────────────────
  // Describes what makes this sector distinctive.
  // Not consumed by the spine — consumed by anything that
  // needs to explain or document the configuration.

  sectorNotes: {
    distinctivePressures: [],   // pressures that appear in this sector specifically
    distinctiveMovement:  [],   // what movement looks like here vs general
    distinctiveGaps:      [],   // what missing information blocks this sector
    outputAudience:       '',   // who typically receives output in this sector
    outputRegister:       '',   // tone and precision level expected
  },


  // ── Steer ─────────────────────────────────────────────────
  // Keyed by behaviour id.
  // Each entry overrides or extends that behaviour's config.
  // Behaviours not listed are unaffected.
  // Sub-guides merge on top of parent steer — sub wins on conflict.

  steer: {},


  // ── Compose utility ───────────────────────────────────────
  // Used when building a sub-guide from a parent.
  // SorterSpine calls this automatically when a parent is detected.

  composeFrom(parent) {
    const child = Object.assign({}, this);
    child.steer = {};
    // Merge parent steer first, then child steer on top
    const allKeys = new Set([
      ...Object.keys(parent.steer || {}),
      ...Object.keys(this.steer || {}),
    ]);
    allKeys.forEach(behaviourId => {
      const parentSteer = parent.steer[behaviourId] || {};
      const childSteer  = this.steer[behaviourId]   || {};
      child.steer[behaviourId] = Object.assign({}, parentSteer, childSteer);
    });
    return child;
  },

};
