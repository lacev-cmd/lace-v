// ══════════════════════════════════════════════════════════
// SORTER REPORT WRITER — GOVERNANCE AUDIT  v0.1.0
//
// Internal / operator-facing report.
// Explains what happened in the run:
//
//   behaviours
//   guides
//   components
//   confidence
//   gaps
//   warnings
//   routes
//   handover state
//   consent state if supplied
//
// Does not produce person-facing support language.
// Does not change the map.
// ══════════════════════════════════════════════════════════

const SorterReportWriterGovernanceAudit = (() => {

  const VERSION = '0.1.0';
  const WRITER_ID = 'report-writer-governance-audit';

  function normaliseSource(source) {
    if (source && source.map) {
      return {
        map: source.map,
        result: source,
      };
    }

    return {
      map: source,
      result: null,
    };
  }

  function responseItems(result) {
    return Array.isArray(result?.responses)
      ? result.responses.map(r => ({
          componentId: r.componentId || null,
          action: r.action || null,
          payload: r.payload || null,
          warnings: r.warnings || [],
          gateTriggered: r.gateTriggered === true,
          gateReason: r.gateReason || null,
        }))
      : [];
  }

  function traceItems(result) {
    return Array.isArray(result?.trace)
      ? result.trace.map(t => ({
          step: t.step || null,
          status: t.status || null,
          error: t.error || null,
          hasChanges: !!t.changes,
        }))
      : [];
  }

  function write(source, options = {}) {
    const Base = SorterReportWriterBase;
    const normalised = normaliseSource(source);
    const map = normalised.map || {};
    const result = normalised.result || {};
    const confidence = Base.getOverallConfidence(map);
    const state = Base.extractMapState(map);

    const sections = [];

    sections.push(Base.makeSection({
      key: 'audit_identity',
      title: 'Audit identity',
      body: 'Internal governance audit of a sorter run. This report explains the run. It is not a person-facing map.',
      confidence: 'supported',
    }));

    sections.push(Base.makeSection({
      key: 'run_summary',
      title: 'Run summary',
      claims: [
        Base.makeClaim({
          text: `Overall confidence: ${confidence}.`,
          confidence: 'supported',
          basis: 'map.confidence.overall',
        }),
        Base.makeClaim({
          text: `Open gaps: ${state.gaps.count || 0}.`,
          confidence: 'supported',
          basis: 'map.gaps.count',
        }),
        Base.makeClaim({
          text: `Warnings: ${(result.warnings || options.warnings || []).length}.`,
          confidence: 'supported',
          basis: 'runtime result warnings',
        }),
      ],
      confidence: 'supported',
    }));

    sections.push(Base.makeSection({
      key: 'behaviours_guides_components',
      title: 'Attached behaviours, guides, and components',
      items: [
        {
          label: 'Behaviours',
          value: result.behaviourIds || options.behaviourIds || [],
        },
        {
          label: 'Guides',
          value: result.guideIds || options.guideIds || [],
        },
        {
          label: 'Components',
          value: result.componentIds || options.componentIds || [],
        },
        {
          label: 'Processing order',
          value: result.processingOrder || options.processingOrder || [],
        },
      ],
      confidence: 'supported',
    }));

    sections.push(Base.makeSection({
      key: 'confidence_audit',
      title: 'Confidence audit',
      body: `Overall confidence: ${Base.label(confidence)}.`,
      items: state.confidence?.byBehaviour || {},
      confidence: 'supported',
    }));

    sections.push(Base.makeSection({
      key: 'gap_audit',
      title: 'Gap audit',
      body: `${state.gaps.count || 0} open gap(s) detected.`,
      items: Base.openGapItems(map),
      confidence: 'supported',
      empty: (state.gaps.count || 0) === 0,
    }));

    sections.push(Base.makeSection({
      key: 'routing_and_component_responses',
      title: 'Routing and component responses',
      body: responseItems(result).length
        ? 'Component responses were returned by the runtime.'
        : 'No component responses available.',
      items: responseItems(result),
      confidence: responseItems(result).length ? 'supported' : 'not_readable',
      empty: responseItems(result).length === 0,
    }));

    sections.push(Base.makeSection({
      key: 'trace_summary',
      title: 'Trace summary',
      body: traceItems(result).length
        ? 'Trace was available for this run.'
        : 'No trace available. Run may have executed with trace disabled.',
      items: traceItems(result),
      confidence: traceItems(result).length ? 'supported' : 'partial',
      warnings: traceItems(result).length ? [] : ['Trace unavailable or disabled.'],
      empty: traceItems(result).length === 0,
    }));

    sections.push(Base.makeSection({
      key: 'handover_and_consent',
      title: 'Handover and consent state',
      items: [
        {
          label: 'Handover map state',
          value: state.handover || null,
        },
        {
          label: 'Consent supplied to audit',
          value: options.consent || null,
        },
        {
          label: 'Consent required',
          value: options.requireConsent !== false,
        },
      ],
      confidence: 'partial',
    }));

    sections.push(Base.makeSection({
      key: 'warnings',
      title: 'Warnings',
      items: (result.warnings || []).concat(options.warnings || []),
      confidence: 'supported',
      empty: !((result.warnings || []).length || (options.warnings || []).length),
    }));

    sections.push(Base.makeSection({
      key: 'audit_limits',
      title: 'Audit limits',
      items: [
        'This audit explains runtime and map state only.',
        'It does not prove the material is factually true.',
        'It does not validate the deployment configuration.',
        'It does not replace code tests, security review, or human governance review.',
      ],
      confidence: 'supported',
    }));

    return Base.createReport({
      writerId: WRITER_ID,
      writerVersion: VERSION,
      reportType: 'governance_audit',
      title: options.title || 'Sorter Governance Audit',
      audience: 'operator_internal',
      map,
      context: {
        deploymentId: options.deploymentId || result.deploymentId || null,
        sector: options.sector || map?.meta?.sector || null,
      },
      sections,
      caveats: [
        'Internal audit report.',
        'Not person-facing support output.',
        'Not proof of factual truth.',
        'Not a substitute for runtime tests or deployment governance.',
      ],
      warnings: Base.warningsFromMap(map, (result.warnings || []).concat(options.warnings || [])),
      limits: Base.defaultLimits(),
      metadata: {
        source: result ? 'runtime_result_or_map' : 'completed_sorter_map',
        mutatesMap: false,
      },
    });
  }

  return { VERSION, WRITER_ID, write };

})();