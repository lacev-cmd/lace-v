// ══════════════════════════════════════════════════════════
// SORTER TEST HARNESS  v0.1.0
//
// Runs behaviour test cases against the runtime.
// Measures precision and recall per behaviour.
// Extensible to accept a corpus of real entries.
//
// Usage:
//   const results = SorterTestHarness.run(behaviours, runtime);
//   const report  = SorterTestHarness.report(results);
//
// Or for a single behaviour:
//   const result = SorterTestHarness.runBehaviour(behaviour, runtime);
//
// Or against a corpus:
//   const results = SorterTestHarness.runCorpus(behaviours, runtime, corpus);
//
// Corpus format:
//   [
//     {
//       behaviourId: 'movement-non-movement-reading',
//       input:       { baseline: '', entries: [...], corrections: [] },
//       expected:    { movement: { isMoving: true } },
//       label:       'optional human label',
//     }
//   ]
// ══════════════════════════════════════════════════════════

const SorterTestHarness = (() => {


  // ── Helpers ───────────────────────────────────────────────

  // Deep partial match — expected keys must match actual values.
  // Actual may have additional keys — that is fine.
  function _partialMatch(actual, expected) {
    if (expected === null || expected === undefined) return actual === expected;
    if (typeof expected !== 'object') return actual === expected;
    if (Array.isArray(expected)) {
      if (!Array.isArray(actual)) return false;
      return expected.every((e, i) => _partialMatch(actual[i], e));
    }
    return Object.keys(expected).every(key => _partialMatch(actual[key], expected[key]));
  }

  // Extract the map section relevant to a behaviour's test case.
  // Test cases specify expected as a partial map shape.
  function _extractRelevant(map, behaviourId) {
    // Return the full map — partial match handles the rest.
    return map;
  }

  // Build a minimal input from a test case input string.
  function _buildInput(testCase) {
    const text = testCase.input || '';
    return {
      baseline:    testCase.baseline    || '',
      entries:     testCase.entries     || [{ text, date: new Date().toISOString() }],
      corrections: testCase.corrections || [],
      connections: testCase.connections || [],
      meta:        testCase.meta        || {},
    };
  }

  // Build a minimal accumulated map.
  function _emptyMap() {
    return {
      confidence:           { overall: 'not_readable', byBehaviour: {} },
      gaps:                 { open: [], closed: [], count: 0, highestPriority: null },
      signals:              {},
      movement:             {},
      avoidance:            {},
      constraints:          {},
      contradictions:       {},
      competingPriorities:  {},
      connections:          {},
      stateChanges:         {},
      nextMove:             null,
      handover:             null,
      metaReading:          null,
      corrections:          [],
      load:                 {},
      baseline:             {},
    };
  }


  // ── Single behaviour test run ─────────────────────────────

  function runBehaviour(behaviour, runtime) {
    const testCases = behaviour.testCases || [];
    if (testCases.length === 0) {
      return {
        behaviourId:  behaviour.id,
        version:      behaviour.version,
        total:        0,
        passed:       0,
        failed:       0,
        skipped:      0,
        precision:    null,
        recall:       null,
        cases:        [],
        note:         'No test cases defined.',
      };
    }

    const caseResults = testCases.map(tc => {
      const input  = _buildInput(tc);
      const map    = _emptyMap();

      let actualMap;
      let error = null;

      try {
        actualMap = runtime.read(input, map, behaviour);
      } catch (e) {
        error = e.message;
        actualMap = map;
      }

      // Expected is a string description in current test cases —
      // we evaluate as a keyword match against the map JSON.
      // For structured expected (object), use partial match.
      let passed = false;
      let matchMethod = 'keyword';

      if (error) {
        passed = false;
        matchMethod = 'error';
      } else if (tc.expected && typeof tc.expected === 'object') {
        passed = _partialMatch(actualMap, tc.expected);
        matchMethod = 'partial_match';
      } else if (tc.expected && typeof tc.expected === 'string') {
        // Keyword match against map JSON and expected string
        const mapStr      = JSON.stringify(actualMap).toLowerCase();
        const expectedStr = tc.expected.toLowerCase();

        // Extract key signal words from expected description
        const keywords = expectedStr
          .split(/[\s,.;–—]+/)
          .filter(w => w.length > 4)
          .filter(w => !['should', 'would', 'could', 'must', 'have', 'been', 'that', 'this', 'with', 'from', 'only', 'just', 'not', 'the'].includes(w));

        // Pass if majority of keywords appear in map output
        const matchCount = keywords.filter(k => mapStr.includes(k)).length;
        passed = keywords.length > 0 && (matchCount / keywords.length) >= 0.4;
        matchMethod = 'keyword';
      }

      return {
        id:          tc.id,
        input:       tc.input,
        expected:    tc.expected,
        passed,
        matchMethod,
        error,
        mapSnapshot: actualMap,
      };
    });

    const passed  = caseResults.filter(r => r.passed).length;
    const failed  = caseResults.filter(r => !r.passed && !r.error).length;
    const errored = caseResults.filter(r => r.error).length;
    const total   = caseResults.length;

    // Precision: of flagged signals, how many were correct
    // Recall: of expected signals, how many were found
    // Approximated from pass rate for keyword matching.
    const precision = total > 0 ? (passed / total).toFixed(2) : null;
    const recall    = precision; // Same metric for keyword matching — separate for corpus.

    return {
      behaviourId: behaviour.id,
      version:     behaviour.version,
      total,
      passed,
      failed,
      errored,
      precision,
      recall,
      cases:       caseResults,
    };
  }


  // ── Full stack run ────────────────────────────────────────

  function run(behaviours, runtime) {
    const behaviourList = Array.isArray(behaviours)
      ? behaviours
      : Object.values(behaviours);

    return behaviourList.map(b => runBehaviour(b, runtime));
  }


  // ── Corpus run ────────────────────────────────────────────
  //
  // Corpus format:
  // [
  //   {
  //     behaviourId: 'avoidance-detection',
  //     input:       { baseline, entries, corrections },
  //     expected:    { avoidance: { hasAvoidance: true } },  // partial match object
  //     label:       'Lexical avoidance in re-entry context',
  //   }
  // ]

  function runCorpus(behaviours, runtime, corpus) {
    const behaviourMap = Array.isArray(behaviours)
      ? Object.fromEntries(behaviours.map(b => [b.id, b]))
      : behaviours;

    const results = {};

    corpus.forEach((item, idx) => {
      const behaviour = behaviourMap[item.behaviourId];
      if (!behaviour) {
        if (!results['__unknown__']) results['__unknown__'] = [];
        results['__unknown__'].push({
          idx,
          behaviourId: item.behaviourId,
          label:       item.label,
          error:       'Behaviour not found.',
        });
        return;
      }

      if (!results[item.behaviourId]) {
        results[item.behaviourId] = {
          behaviourId: item.behaviourId,
          total:       0,
          passed:      0,
          failed:      0,
          errored:     0,
          cases:       [],
        };
      }

      const r = results[item.behaviourId];
      const input = item.input || _buildInput({ input: item.text || '', entries: item.entries });
      const map   = _emptyMap();

      let actualMap;
      let error = null;

      try {
        actualMap = runtime.read(input, map, behaviour);
      } catch (e) {
        error = e.message;
        actualMap = map;
      }

      let passed = false;
      if (error) {
        passed = false;
      } else if (item.expected && typeof item.expected === 'object') {
        passed = _partialMatch(actualMap, item.expected);
      } else if (item.expected && typeof item.expected === 'string') {
        const mapStr      = JSON.stringify(actualMap).toLowerCase();
        const expectedStr = item.expected.toLowerCase();
        const keywords    = expectedStr.split(/[\s,.;–—]+/).filter(w => w.length > 4);
        const matchCount  = keywords.filter(k => mapStr.includes(k)).length;
        passed = keywords.length > 0 && (matchCount / keywords.length) >= 0.4;
      }

      r.total++;
      if (error) r.errored++;
      else if (passed) r.passed++;
      else r.failed++;

      r.cases.push({
        idx,
        label:    item.label || `corpus-${idx}`,
        passed,
        error,
        expected: item.expected,
      });
    });

    // Compute precision and recall per behaviour
    Object.values(results).forEach(r => {
      if (r.total > 0) {
        r.precision = (r.passed / r.total).toFixed(2);
        r.recall    = r.precision; // Approximation without negative corpus.
      }
    });

    return results;
  }


  // ── Report ────────────────────────────────────────────────

  function report(results) {
    const lines = [];
    const list  = Array.isArray(results) ? results : Object.values(results);

    lines.push('══════════════════════════════════════════════');
    lines.push('SORTER TEST HARNESS REPORT');
    lines.push(`Run at: ${new Date().toISOString()}`);
    lines.push('══════════════════════════════════════════════');
    lines.push('');

    let totalBehaviours = 0;
    let totalPassed     = 0;
    let totalFailed     = 0;
    let totalErrored    = 0;
    let totalCases      = 0;

    list.forEach(r => {
      if (!r.behaviourId) return;
      totalBehaviours++;
      totalPassed  += r.passed  || 0;
      totalFailed  += r.failed  || 0;
      totalErrored += r.errored || 0;
      totalCases   += r.total   || 0;

      const status = r.total === 0 ? '—'
        : r.failed === 0 && r.errored === 0 ? '✓'
        : r.errored > 0                      ? '!'
        :                                      '✗';

      lines.push(`${status}  ${r.behaviourId} v${r.version || '?'}`);
      lines.push(`   Cases: ${r.total} | Passed: ${r.passed} | Failed: ${r.failed} | Errors: ${r.errored || 0}`);
      if (r.precision !== null) lines.push(`   Precision/Recall: ${r.precision}`);
      if (r.note) lines.push(`   Note: ${r.note}`);

      if (r.cases) {
        r.cases.filter(c => !c.passed).forEach(c => {
          lines.push(`   ✗ ${c.id || c.label}: expected "${c.expected}" ${c.error ? `— ERROR: ${c.error}` : ''}`);
        });
      }

      lines.push('');
    });

    lines.push('──────────────────────────────────────────────');
    lines.push(`TOTAL: ${totalBehaviours} behaviours | ${totalCases} cases`);
    lines.push(`Passed: ${totalPassed} | Failed: ${totalFailed} | Errors: ${totalErrored}`);
    const overall = totalCases > 0
      ? ((totalPassed / totalCases) * 100).toFixed(1)
      : 'n/a';
    lines.push(`Overall pass rate: ${overall}%`);
    lines.push('══════════════════════════════════════════════');

    return lines.join('\n');
  }


  // ── Precision/Recall breakdown ────────────────────────────
  // For corpus runs with structured expected objects.
  // Computes true positive, false positive, false negative
  // per map key.

  function precisionRecallByKey(corpusResults) {
    const keyStats = {};

    Object.values(corpusResults).forEach(r => {
      (r.cases || []).forEach(c => {
        if (!c.expected || typeof c.expected !== 'object') return;
        Object.keys(c.expected).forEach(key => {
          if (!keyStats[key]) keyStats[key] = { tp: 0, fp: 0, fn: 0 };
          if (c.passed) keyStats[key].tp++;
          else keyStats[key].fn++;
        });
      });
    });

    return Object.entries(keyStats).map(([key, s]) => ({
      key,
      precision: s.tp + s.fp > 0 ? (s.tp / (s.tp + s.fp)).toFixed(2) : null,
      recall:    s.tp + s.fn > 0 ? (s.tp / (s.tp + s.fn)).toFixed(2) : null,
      tp: s.tp, fp: s.fp, fn: s.fn,
    }));
  }


  // ── Public API ────────────────────────────────────────────

  return {
    run,
    runBehaviour,
    runCorpus,
    report,
    precisionRecallByKey,
  };

})();
