// ══════════════════════════════════════════════════════════
// SORTER ORCHESTRATION CONTRACT  v0.1.0
//
// Documents the contracts and responsibilities for:
//
//   1. Component action conflict resolution
//   2. Human-in-the-loop routing
//   3. Versioned input handling
//   4. Session persistence pattern
//
// This is a reference document for callers building on
// the Sorter stack. It is not executable — it documents
// what the spine provides and what the caller must handle.
// ══════════════════════════════════════════════════════════

const SorterOrchestrationContract = {

  version: '0.1.0',


  // ── 1. Component Action Conflict Resolution ───────────────
  //
  // The spine returns an array of component responses.
  // Multiple components may return different actions.
  // The SPINE DOES NOT RESOLVE CONFLICTS AUTOMATICALLY.
  // This is a deliberate architectural choice.
  //
  // Rationale:
  //   The caller knows the deployment context. The spine
  //   does not. A conflict between 'escalate' and 'output'
  //   means different things in a clinical deployment vs a
  //   personal journal tool vs a game. The caller decides.
  //
  // What the spine provides:
  //   — execute() returns { map, responses[], warnings[] }
  //   — responses[] is an ordered array of component results
  //   — Each response has { componentId, action, payload, warnings }
  //
  // What the caller must handle:
  //   — Inspect responses[] for action conflicts
  //   — Apply the appropriate resolution strategy
  //   — Act on the resolved action
  //
  // Built-in resolver (optional):
  //   SorterRuntime.resolveActionConflict(responses) applies
  //   the default priority order and returns a single resolved
  //   response with a conflicts[] log.
  //
  // Default priority order (highest to lowest):
  //   refuse > hold > human_escalation > escalate > clarify >
  //   search > acknowledge_constraint > confidence_gated_output >
  //   output > no-op
  //
  // The caller may implement a different resolver.
  // The default resolver is a starting point — not a mandate.

  componentActionConflict: {

    spineProvides:
      'execute() returns responses[] — an ordered array. No automatic conflict resolution.',

    callerMustHandle:
      'Inspect responses[] for conflicting actions. Apply resolution strategy. Act on the result.',

    builtInResolver:
      'SorterRuntime.resolveActionConflict(responses) — applies default priority order.',

    defaultPriorityOrder: [
      'refuse',
      'hold',
      'human_escalation',
      'escalate',
      'clarify',
      'search',
      'acknowledge_constraint',
      'confidence_gated_output',
      'output',
      'no-op',
    ],

    example: `
      const result   = spine.execute({ trace: false });
      const resolved = SorterRuntime.resolveActionConflict(result.responses);

      if (resolved.conflicts.length > 0) {
        console.warn('Action conflict resolved:', resolved.note);
      }

      switch (resolved.action) {
        case 'output':           return renderMap(result.map);
        case 'hold':             return renderHoldState(result.map, resolved.payload);
        case 'human_escalation': return routeToHuman(result.map, resolved.payload);
        case 'escalate':         return triggerEscalation(result.map, resolved.payload);
        case 'refuse':           return renderRefusal(resolved.payload);
        default:                 return renderMap(result.map);
      }
    `,
  },


  // ── 2. Human-in-the-Loop Routing ─────────────────────────
  //
  // tool-routing and escalation-timing components both return
  // { action: 'human_escalation' } when the situation exceeds
  // safe autonomous scope.
  //
  // The spine returns this as an action. It does NOT pause
  // execution and wait. The caller implements the pause.
  //
  // Expected contract:
  //   When resolved action is 'human_escalation':
  //     1. Do not render the map as final output.
  //     2. Store the current map state (use saveState()).
  //     3. Route to the appropriate human reviewer.
  //     4. Present the map and warnings to the reviewer.
  //     5. Await reviewer decision.
  //     6. On approval: render map or proceed with handover.
  //     7. On rejection: discard or hold pending further material.
  //
  // The map state must be preserved across the pause.
  // Use SorterSpine.saveState() before routing to human.
  // Use SorterSpine.loadState() to restore when resuming.

  humanInTheLoop: {

    triggerAction: 'human_escalation',

    callerContract: [
      'Do not render the map as final output on human_escalation.',
      'Save map state using SorterSpine.saveState() before routing.',
      'Route to the appropriate human reviewer with map and warnings.',
      'Await reviewer decision before proceeding.',
      'On approval: restore state and proceed.',
      'On rejection: discard or hold.',
    ],

    example: `
      const result   = spine.execute();
      const resolved = SorterRuntime.resolveActionConflict(result.responses);

      if (resolved.action === 'human_escalation') {
        const savedState = spine.saveState();
        await storage.save(userId, 'pending_review', savedState);
        await notifyReviewer({ userId, map: result.map, warnings: result.warnings });
        return { status: 'pending_review', message: 'Routed to human reviewer.' };
      }

      // Otherwise proceed normally
      return renderMap(result.map);
    `,

    reviewerMustReceive: [
      'The full map with confidence labels.',
      'All warnings from execute().',
      'The reason human escalation was triggered (from payload).',
      'The identity statement — what this tool is and is not.',
    ],

  },


  // ── 3. Versioned Input Handling ───────────────────────────
  //
  // The baseline is treated as static after initial capture.
  // Entries are append-only by default.
  //
  // If the deployment allows entry editing, the following
  // rules apply:
  //
  //   APPEND-ONLY (recommended):
  //     Entries are never modified after submission.
  //     Corrections are submitted as explicit correction objects
  //     in the corrections[] array.
  //     This preserves the full arc of the map.
  //
  //   EDIT-ALLOWED:
  //     If an entry is edited, the original must be preserved
  //     as a correction of type 'superseded'.
  //     The edited version becomes the current entry.
  //     The correction record links the two.
  //     The spine's correction-as-governance behaviour then
  //     reads the edit as a governance event.
  //
  //   BASELINE EDITS:
  //     The baseline should not be edited after the first
  //     execute(). If the person wants to update their baseline,
  //     submit it as a correction of type 'baseline_update'.
  //     This allows baseline-vs-live-material to detect the
  //     update as a drift event rather than silently changing
  //     the reference point.

  versionedInput: {

    defaultMode: 'append-only',

    appendOnly: {
      desc:    'Entries are never modified. Corrections are submitted via corrections[].',
      corrections: [
        { type: 'stale',           desc: 'Mark a topic as no longer current.' },
        { type: 'primary',         desc: 'Mark a topic as the primary focus.' },
        { type: 'suppress',        desc: 'Suppress a specific avoidance or gap flag.' },
        { type: 'current',         desc: 'Confirm a topic is still current.' },
        { type: 'baseline_update', desc: 'Signal that the baseline framing has been updated.' },
      ],
    },

    editAllowed: {
      desc:    'Entry edits are allowed but must be preserved as corrections.',
      rule:    'Original entry becomes a correction of type "superseded". Edited entry is the current record.',
      warning: 'Edit-allowed mode reduces map arc integrity. Use append-only where possible.',
    },

  },


  // ── 4. Session Persistence Pattern ───────────────────────
  //
  // The spine's _state is ephemeral — it does not persist
  // between sessions automatically.
  //
  // For long-running deployments (Prison Fellowship, case
  // systems, personal journals), state must be serialised
  // after each execute() and restored at the start of the
  // next session.
  //
  // Pattern:
  //   END OF SESSION:
  //     const saved = SorterSpine.saveState();
  //     await storage.save(userId, 'map_state', saved);
  //
  //   START OF NEXT SESSION:
  //     const saved = await storage.load(userId, 'map_state');
  //     SorterSpine.loadState(saved);
  //     // Re-attach behaviours, guides, components, runtime
  //     // Then execute() with new entries appended to input
  //
  // What saveState() preserves:
  //   — The full map state (all behaviour outputs)
  //   — The input (baseline, entries, corrections)
  //   — Warnings from the last execute()
  //   — Timestamp and deploymentId
  //
  // What saveState() does NOT preserve:
  //   — Behaviour configs (re-attach from files)
  //   — Guide configs (re-attach from files)
  //   — Component configs (re-attach from files)
  //   — Runtime adapters (re-attach each session)
  //
  // Note on input accumulation:
  //   When loading state for a new session, append new entries
  //   to the saved input before calling execute(). Do not
  //   replace the saved input — the full arc must be preserved.

  sessionPersistence: {

    saveAfterExecute:
      'Call SorterSpine.saveState() after every execute() and store the result.',

    restoreAtStart:
      'Call SorterSpine.loadState(saved) at the start of each session before execute().',

    reAttachRequired:
      'Behaviours, guides, components, and runtime adapters must be re-attached each session.',

    inputAccumulation:
      'Append new entries to the saved input. Do not replace it. The full arc is the map.',

    example: `
      // End of session
      const saved = spine.saveState();
      await db.set(\`map:\${userId}\`, saved);

      // Start of next session
      const saved  = await db.get(\`map:\${userId}\`);
      const loaded = JSON.parse(saved);

      // Re-attach stack
      spine
        .attachBehaviour(BehaviourCorrectionAsGovernance)
        // ... all behaviours
        .attachGuide(GuideCriminalJustice)
        .attachGuide(GuideSubReentry)
        .setRuntime(SorterRuntime)
        .setComponentRuntime(SorterRuntimeComponents);

      // Restore state
      spine.loadState(saved);

      // Append new entries to saved input
      const updatedInput = {
        ...loaded.input,
        entries: [...loaded.input.entries, ...newEntries],
      };
      spine.setInput(updatedInput);

      // Execute
      const result = spine.execute();
    `,

  },

};
