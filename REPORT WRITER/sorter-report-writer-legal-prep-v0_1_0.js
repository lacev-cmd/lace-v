// ══════════════════════════════════════════════════════════
// SORTER REPORT WRITER — LEGAL PREP  v0.1.0
//
// For legal professional, self-representing litigant,
// or legal support worker preparing for a hearing,
// interview, or submission.
//
// Precise. Bounded. Every claim tied to its basis.
// No overclaiming. No legal findings.
// Does not replace legal advice.
//
// Sections:
//   basis of material
//   evidenced timeline (what the map can support)
//   stated position vs available evidence
//   gaps that matter legally
//   external constraints in material
//   tensions held
//   what the professional should know first
//   what this output cannot do
// ══════════════════════════════════════════════════════════

const SorterReportWriterLegalPrep = (() => {

  const VERSION   = '0.1.0';
  const WRITER_ID = 'report-writer-legal-prep';


  // ── Timeline extraction ───────────────────────────────────
  // Pulls dated state changes and movement events for
  // a chronological summary the legal professional can use.

  function timelineItems(map) {
    const items    = [];
    const state    = SorterReportWriterBase.extractMapState(map);

    // State changes with confidence
    const changes = SorterReportWriterBase.asArray(state.stateChanges.detected);
    changes.forEach(c => {
      if (c.confidence !== 'not_change') {
        items.push({
          type:       'state_change',
          label:      c.label,
          confidence: c.confidence,
          topics:     c.topics || [],
          note:       c.note || null,
        });
      }
    });

    // Connections across time
    const connections = SorterReportWriterBase.asArray(state.connections.detected);
    connections.forEach(c => {
      if (c.firstSeen || c.type === 'self_named_recurrence') {
        items.push({
          type:       'connection',
          label:      c.label,
          confidence: c.confidence || 'partial',
          firstSeen:  c.firstSeen  || null,
          lastSeen:   c.lastSeen   || null,
          spanDays:   c.spanDays   || null,
          note:       c.note       || null,
        });
      }
    });

    return items;
  }


  // ── Position vs evidence ──────────────────────────────────
  // Reads the contradiction layer for stated position gaps.

  function positionEvidenceItems(map) {
    const contradictions = SorterReportWriterBase.asArray(
      map?.contradictions?.detected || []
    );
    return contradictions.map(c => ({
      type:       c.type,
      label:      c.label,
      note:       c.note || 'Tension held — both sides named.',
      confidence: 'partial',
    }));
  }


  // ── Legal-relevant gaps ───────────────────────────────────
  // Open gaps that have particular significance in legal prep.

  function legalGapItems(map) {
    const allGaps = SorterReportWriterBase.openGapItems(map);
    // All open gaps are relevant in legal prep — documents,
    // timelines, position statements, representation status.
    return allGaps;
  }


  function write(map, options = {}) {
    const Base       = SorterReportWriterBase;
    const confidence = Base.getOverallConfidence(map);
    const state      = Base.extractMapState(map);
    const consent    = options.consent || null;

    const warnings = Base.warningsFromMap(map, options.warnings);

    // Consent check for legal prep in person-centred deployments
    if (options.requireConsent !== false) {
      if (!consent || consent.granted !== true) {
        warnings.push('Consent not confirmed. This output should not be shared with third parties.');
      }
    }

    // Legal prep requires supported confidence minimum for consequential use
    if (['not_readable', 'thin'].includes(confidence)) {
      warnings.push(
        `Map confidence is ${confidence}. This output should not be used for consequential legal preparation without additional material.`
      );
    }

    const sections = [];


    // ── Basis of material ─────────────────────────────────

    sections.push(Base.makeSection({
      key:   'basis_of_material',
      title: 'Basis of material',
      claims: [
        Base.makeClaim({
          text:       'This output is based solely on material provided by the person.',
          confidence: 'supported',
          basis:      'report writer caveat',
        }),
        Base.makeClaim({
          text:       'The material has not been independently verified.',
          confidence: 'supported',
          basis:      'report writer caveat',
        }),
        Base.makeClaim({
          text:       'Any factual claims require independent verification before legal reliance.',
          confidence: 'supported',
          basis:      'report writer caveat',
        }),
        Base.makeClaim({
          text:       'This output does not constitute legal advice.',
          confidence: 'supported',
          basis:      'report writer caveat',
        }),
      ],
      confidence: 'supported',
    }));


    // ── Map confidence ────────────────────────────────────

    sections.push(Base.makeSection({
      key:   'map_confidence_for_legal',
      title: 'Map confidence',
      claims: [
        Base.makeClaim({
          text:       `Overall map confidence: ${confidence}. ${Base.label(confidence)}.`,
          confidence: 'supported',
          basis:      'map.confidence.overall',
        }),
        Base.makeClaim({
          text:       confidence === 'not_readable' || confidence === 'thin'
            ? 'The map does not have sufficient material for reliable legal preparation at this stage. More material is required.'
            : confidence === 'partial'
              ? 'The map has partial material. Gaps remain. Claims from this output should be treated as directional, not definitive.'
              : 'The map has supported or strong material for the covered period.',
          confidence: 'supported',
          basis:      'confidence assessment',
          limit:      ['not_readable','thin'].includes(confidence)
            ? 'Insufficient material for consequential legal use.'
            : null,
        }),
      ],
      confidence: 'supported',
      warnings:   ['not_readable','thin'].includes(confidence)
        ? [`Map confidence is ${confidence} — not sufficient for consequential legal use without additional material.`]
        : [],
    }));


    // ── Evidenced timeline ────────────────────────────────

    const timeline = timelineItems(map);
    sections.push(Base.makeSection({
      key:   'evidenced_timeline',
      title: 'Evidenced timeline',
      body:  timeline.length
        ? 'State changes and connections visible in the material. Each item carries its confidence level.'
        : 'No clearly evidenced timeline is readable from the current material.',
      items: timeline.length
        ? timeline.map(t =>
            `${t.label} ${Base.label(t.confidence)}` +
            (t.firstSeen ? ` — first seen: ${t.firstSeen}` : '') +
            (t.lastSeen  ? `, last seen: ${t.lastSeen}`   : '') +
            (t.note      ? `. ${t.note}`                   : '')
          )
        : ['No evidenced timeline visible from current material.'],
      confidence: timeline.length ? confidence : 'not_readable',
      empty:      timeline.length === 0,
    }));


    // ── Stated position vs available evidence ─────────────

    const positionEvidence = positionEvidenceItems(map);
    sections.push(Base.makeSection({
      key:   'position_vs_evidence',
      title: 'Stated position vs available evidence',
      body:  positionEvidence.length
        ? 'The following tensions are visible between stated positions and described behaviour or evidence. Named — not resolved.'
        : 'No clear tension between stated position and available evidence is visible in the current material.',
      items: positionEvidence.length
        ? positionEvidence.map(p => `${p.label} — ${p.note}`)
        : ['No position-evidence tension visible.'],
      confidence: positionEvidence.length ? confidence : 'not_readable',
      empty:      positionEvidence.length === 0,
    }));


    // ── What moved ────────────────────────────────────────

    const moving = Base.movementItems(map);
    sections.push(Base.makeSection({
      key:   'evidenced_movement',
      title: 'Evidenced movement',
      body:  moving.length
        ? 'These movement signals are visible in the material. Each is evidenced — not stated belief.'
        : 'No clear evidenced movement is visible in the current material.',
      items: moving.length ? moving : ['No evidenced movement visible.'],
      confidence: moving.length ? confidence : 'not_readable',
      empty:      moving.length === 0,
    }));


    // ── External constraints ──────────────────────────────

    const constraints = Base.constraintItems(map);
    sections.push(Base.makeSection({
      key:   'external_constraints',
      title: 'External constraints in material',
      body:  constraints.length
        ? 'The following external constraints are described in the material. They may be relevant to the legal context.'
        : 'No external constraint language is visible in the current material.',
      items: constraints.length ? constraints : ['No external constraint visible.'],
      confidence: constraints.length ? confidence : 'not_readable',
      empty:      constraints.length === 0,
    }));


    // ── Gaps that matter ──────────────────────────────────

    const gaps = legalGapItems(map);
    sections.push(Base.makeSection({
      key:   'gaps_for_legal_prep',
      title: 'Gaps that may matter for legal preparation',
      body:  gaps.length
        ? 'These gaps limit what this output can support. They should be addressed before consequential legal use.'
        : 'No open gaps visible in the current material.',
      items: gaps.length ? gaps : ['No open gaps visible.'],
      confidence: gaps.length ? 'supported' : confidence,
      empty:      gaps.length === 0,
      warnings:   gaps.length > 0
        ? [`${gaps.length} open gap(s) limit the reliability of this output for legal preparation.`]
        : [],
    }));


    // ── Tensions held ─────────────────────────────────────

    const tensions = Base.contradictionItems(map);
    sections.push(Base.makeSection({
      key:   'held_tensions',
      title: 'Tensions held without resolution',
      body:  tensions.length
        ? 'Conflicting signals are named. They are not resolved here — that is for the legal professional.'
        : 'No clear tension is visible in the current material.',
      items: tensions.length ? tensions : ['No held tension visible.'],
      confidence: tensions.length ? confidence : 'not_readable',
      empty:      tensions.length === 0,
    }));


    // ── Most relevant first ───────────────────────────────

    const priorityGap = Base.highestPriorityGap(map);
    sections.push(Base.makeSection({
      key:   'most_relevant_first',
      title: 'Most relevant first',
      claims: [
        Base.makeClaim({
          text:
            options.mostRelevantFirst ||
            state.nextMove?.move      ||
            (priorityGap
              ? `The highest priority gap is: ${priorityGap.name || priorityGap.key}. ${priorityGap.reason || ''}`
              : 'The most relevant point is not clearly readable from the current map.'),
          confidence: options.mostRelevantFirst
            ? 'supported'
            : state.nextMove
              ? confidence
              : 'inferred',
          basis: options.mostRelevantFirst
            ? 'caller supplied'
            : state.nextMove
              ? 'map-derived'
              : 'fallback',
          directness: options.mostRelevantFirst ? 'direct' : 'inferred',
        }),
      ],
      confidence: options.mostRelevantFirst ? 'supported' : 'inferred',
    }));


    // ── What this output cannot do ────────────────────────

    sections.push(Base.makeSection({
      key:   'legal_prep_limits',
      title: 'What this output cannot do',
      items: [
        'This output does not constitute legal advice.',
        'This output does not make legal findings.',
        'This output does not verify facts.',
        'This output does not assess the merits of a legal position.',
        'This output does not replace the judgement of a qualified legal professional.',
        'Claims in this output require independent verification before legal reliance.',
        'The map reads what was written — it does not know what was not written.',
        'Confidence labels indicate material quality — not legal strength.',
      ],
      confidence: 'supported',
    }));


    return Base.createReport({
      writerId:      WRITER_ID,
      writerVersion: VERSION,
      reportType:    'legal_prep',
      title:         options.title || 'Legal Preparation Report',
      audience:      options.audience || 'legal_professional_or_self_representing',
      map,
      context: {
        sector:           options.sector || map?.meta?.sector || null,
        receivingContext: options.receivingContext || 'legal',
        scope:            options.scope || null,
        consentConfirmed: consent?.granted === true,
        matter:           options.matter || null,
        hearingDate:      options.hearingDate || null,
      },
      sections,
      caveats: [
        ...Base.REQUIRED_CAVEATS,
        'Does not constitute legal advice.',
        'Does not make legal findings.',
        'All factual claims require independent verification before legal reliance.',
      ],
      warnings,
      limits: [
        ...Base.defaultLimits(),
        'Legal preparation requires verified documentation — this map is context, not proof.',
        'Confidence labels indicate material quality, not legal strength.',
      ],
      metadata: {
        source:          'completed_sorter_map',
        mutatesMap:      false,
        requiresConsent: options.requireConsent !== false,
      },
    });
  }


  return { VERSION, WRITER_ID, write };

})();
