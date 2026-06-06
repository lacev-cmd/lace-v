// ══════════════════════════════════════════════════════════
// SORTER REPORT WRITER — PROFESSIONAL HANDOVER  v0.1.0
//
// For clinician, lawyer, social worker, probation officer,
// case manager, assessor, or other professional reader.
//
// Structured. Evidenced. Caveated. Confidence-labelled.
// Person-centred. Not verified fact.
// Requires explicit consent in person-centred deployments.
// ══════════════════════════════════════════════════════════

const SorterReportWriterProfessionalHandover = (() => {

  const VERSION = '0.1.0';
  const WRITER_ID = 'report-writer-professional-handover';

  function write(map, options = {}) {
    const Base = SorterReportWriterBase;
    const confidence = Base.getOverallConfidence(map);
    const state = Base.extractMapState(map);
    const consent = options.consent || null;

    const warnings = Base.warningsFromMap(map, options.warnings);

    if (options.requireConsent !== false) {
      if (!consent || consent.granted !== true) {
        warnings.push('Consent not confirmed. Handover should not be used or shared.');
      }
    }

    const sections = [];

    sections.push(Base.makeSection({
      key: 'handover_scope',
      title: 'Scope of handover',
      body:
        options.scope ||
        'Scope not separately specified. Treat this handover as limited to the material included in the current map.',
      confidence: options.scope ? 'supported' : 'partial',
      warnings: options.scope ? [] : ['No explicit handover scope supplied.'],
    }));

    sections.push(Base.makeSection({
      key: 'basis_of_map',
      title: 'Basis of map',
      claims: [
        Base.makeClaim({
          text: 'This handover is based only on material entered by the person.',
          confidence: 'supported',
          basis: 'report writer caveat',
        }),
        Base.makeClaim({
          text: 'The material has not been independently verified.',
          confidence: 'supported',
          basis: 'report writer caveat',
        }),
        Base.makeClaim({
          text: 'The map should be treated as context, not evidence of fact.',
          confidence: 'supported',
          basis: 'report writer caveat',
        }),
      ],
      confidence: 'supported',
    }));

    sections.push(Base.makeSection({
      key: 'current_state',
      title: 'Current state',
      claims: [
        Base.makeClaim({
          text: state.movement?.summary || 'The current state is not readable from the available material.',
          confidence,
          basis: 'movement summary',
          limit: confidence === 'not_readable' ? 'Insufficient material.' : null,
        }),
      ],
      confidence,
    }));

    const moving = Base.movementItems(map);
    sections.push(Base.makeSection({
      key: 'what_moved',
      title: 'What moved',
      body: moving.length
        ? 'Evidenced movement visible in the material.'
        : 'No clear movement signal is visible.',
      items: moving.length ? moving : ['No clear movement signal visible.'],
      confidence: moving.length ? confidence : 'not_readable',
      empty: moving.length === 0,
    }));

    const stuck = Base.stuckItems(map);
    sections.push(Base.makeSection({
      key: 'what_remained_stuck',
      title: 'What remained stuck or circling',
      body: stuck.length
        ? 'Non-movement, repeated pattern, or stuck signal visible in the material.'
        : 'No clear stuck signal is visible.',
      items: stuck.length ? stuck : ['No clear stuck signal visible.'],
      confidence: stuck.length ? confidence : 'not_readable',
      empty: stuck.length === 0,
    }));

    const load = Base.loadItems(map);
    const constraints = Base.constraintItems(map);

    sections.push(Base.makeSection({
      key: 'what_was_under_load_or_blocked',
      title: 'What was under load or externally blocked',
      body:
        `Load level: ${state.load.level || 'unknown'}. ` +
        `External constraints detected: ${constraints.length}.`,
      items: load.concat(constraints),
      confidence: load.length || constraints.length ? confidence : 'not_readable',
      warnings: state.load.capabilityNote ? [state.load.capabilityNote] : [],
      empty: load.length === 0 && constraints.length === 0,
    }));

    const tensions = Base.contradictionItems(map);
    sections.push(Base.makeSection({
      key: 'held_tensions',
      title: 'Tensions held without resolution',
      body: tensions.length
        ? 'The following tensions are visible. They are named, not resolved.'
        : 'No clear tension visible.',
      items: tensions.length ? tensions : ['No held tension visible.'],
      confidence: tensions.length ? confidence : 'not_readable',
      empty: tensions.length === 0,
    }));

    const gaps = Base.openGapItems(map);
    sections.push(Base.makeSection({
      key: 'open_gaps',
      title: 'Open gaps',
      body: gaps.length
        ? 'The following missing material limits the reliability of the handover.'
        : 'No open gaps visible.',
      items: gaps.length ? gaps : ['No open gaps visible.'],
      confidence: gaps.length ? 'supported' : confidence,
      empty: gaps.length === 0,
    }));

    sections.push(Base.makeSection({
      key: 'professional_first',
      title: 'Most relevant first',
      claims: [
        Base.makeClaim({
          text:
            options.professionalFirst ||
            state.nextMove?.move ||
            Base.highestPriorityGap(map)?.reason ||
            'The most relevant point is not clearly readable from the current map.',
          confidence: options.professionalFirst ? 'supported' : confidence === 'not_readable' ? 'not_readable' : 'inferred',
          basis: options.professionalFirst ? 'caller supplied' : 'map-derived priority',
          directness: options.professionalFirst ? 'direct' : 'inferred',
        }),
      ],
      confidence: options.professionalFirst ? 'supported' : 'inferred',
    }));

    sections.push(Base.makeSection({
      key: 'outside_scope',
      title: 'Outside scope',
      items: [
        'This handover does not verify factual truth.',
        'This handover does not diagnose.',
        'This handover does not score risk.',
        'This handover does not make legal findings.',
        'This handover does not assess compliance.',
        'This handover does not replace professional judgement.',
      ],
      confidence: 'supported',
    }));

    return Base.createReport({
      writerId: WRITER_ID,
      writerVersion: VERSION,
      reportType: 'professional_handover',
      title: options.title || 'Professional Handover Report',
      audience: options.audience || 'professional',
      map,
      context: {
        sector: options.sector || map?.meta?.sector || null,
        receivingContext: options.receivingContext || null,
        scope: options.scope || null,
        consentConfirmed: consent?.granted === true,
      },
      sections,
      caveats: Base.REQUIRED_CAVEATS,
      warnings,
      limits: Base.defaultLimits(),
      metadata: {
        source: 'completed_sorter_map',
        mutatesMap: false,
        requiresConsent: options.requireConsent !== false,
      },
    });
  }

  return { VERSION, WRITER_ID, write };

})();