// ══════════════════════════════════════════════════════════
// SORTER GUIDE — S.T.E.M. Technical Procurement v0.1.0
//
// Optional second-ring S.T.E.M. sub-guide.
// Parent: guide-stem-base
//
// Attach order:
//   1. SorterSpine.attachGuide(GuideSTEMBase);
//   2. SorterSpine.attachGuide(GuideSTEMTechnicalProcurement);
//
// Role:
//   Steer STEM reads toward supplier evidence,
//   procurement reliance, technical due diligence,
//   vendor claims, configuration applicability,
//   evidence lineage, legacy drift, inherited confidence,
//   procurement-window risk, and decision readiness.
//
// Boundary:
//   This guide does not approve suppliers.
//   It does not replace procurement authority, engineering
//   sign-off, legal review, commercial due diligence,
//   insurance review, safety certification, compliance review,
//   cybersecurity review, or qualified technical judgement.
//   It helps structure the evidence-readiness read.
// ══════════════════════════════════════════════════════════

const GuideSTEMTechnicalProcurement = {

  id:      'guide-stem-technical-procurement',
  version: '0.1.0',
  type:    'subsector',
  parent:  'guide-stem-base',
  sector:  'stem-technical-procurement',

  purpose:
    'Extend the S.T.E.M. base guide for technical procurement, supplier evidence, vendor claims, tender review, component selection, engineering due diligence, and procurement-window admissibility.',

  sectorNotes: {

    distinctivePressures: [
      'A supplier claim is treated as evidence.',
      'Vendor documentation is self-certified and not independently verified.',
      'Evidence from a similar product, previous model, older test, or different configuration is inherited into the procurement decision.',
      'Commercial urgency compresses technical uncertainty into a yes/no decision.',
      'Procurement teams rely on product listing, datasheets, or supplier reputation without mapping the actual claim.',
      'A component or system is selected before its operating envelope, configuration, or integration boundary is clear.',
      'A supplier evidence pack contains impressive documents that do not carry the specific procurement claim.',
      'A decision window closes before evidence gaps are resolved.',
      'Contract commitment becomes irreversible while technical evidence remains conditional.',
      'Risk is displaced downstream to engineering, operations, maintenance, insurance, or end users.',
    ],

    distinctiveMovement: [
      'Procurement decision is stated precisely.',
      'Supplier claim is separated from evidence.',
      'Product, model, version, configuration, or service boundary is defined.',
      'Evidence pack is identified and mapped to the claim.',
      'Independent, third-party, primary, or validated evidence is distinguished from supplier assertion.',
      'Legacy drift and inherited confidence are named.',
      'Operating envelope and integration context are checked.',
      'Technical acceptance criteria are stated.',
      'Procurement window and irreversibility point are visible.',
      'Decision status is bounded: proceed, proceed with conditions, hold, escalate, reject, or request evidence.',
    ],

    distinctiveGaps: [
      'Procurement decision not stated.',
      'Supplier claim not separated from evidence.',
      'Product, model, version, or configuration unclear.',
      'Evidence pack not provided or not mapped.',
      'Independent validation not visible.',
      'Evidence age, expiry, or applicability unknown.',
      'Operating envelope not defined.',
      'Integration dependency not described.',
      'Technical acceptance criteria missing.',
      'Procurement timing or commitment point not visible.',
      'Qualified authority boundary not stated.',
    ],

    outputAudience:
      'Procurement team, engineering reviewer, technical buyer, project manager, reliability reviewer, QA reviewer, risk reviewer, insurer, legal/commercial reviewer, or governance reviewer.',

    outputRegister:
      'Practical. Evidence-bound. Procurement-aware. No supplier approval language. No compliance conclusion. No “looks credible” shortcuts.',
  },


  // ── Gaps ─────────────────────────────────────────────────

  gaps: [
    {
      key:  'procurement_decision',
      name: 'Procurement decision',
      rx:   /\b(procure|buy|purchase|select|approve supplier|shortlist|tender|contract|supplier decision|vendor decision|technical due diligence|RFQ|RFP|purchase order)\b/i,
      reason:
        'The map needs the procurement decision being made: shortlist, request evidence, proceed, hold, reject, approve, contract, or escalate.',
    },
    {
      key:  'supplier_identity',
      name: 'Supplier or vendor identity',
      rx:   /\b(supplier|vendor|manufacturer|OEM|distributor|integrator|reseller|contractor|provider|bidder|tenderer)\b/i,
      reason:
        'The map needs to know who is making the claim and who is supplying the evidence. Evidence lineage depends on source identity.',
    },
    {
      key:  'product_or_service_identity',
      name: 'Product, component, system, or service identity',
      rx:   /\b(product|component|system|platform|machine|robot|battery|module|software|equipment|service|model|part number|SKU|version|variant|configuration)\b/i,
      reason:
        'Procurement confidence must attach to the actual item or service being procured, not a general supplier capability.',
    },
    {
      key:  'supplier_claim',
      name: 'Supplier claim',
      rx:   /\b(claims|states|says|guarantees|compliant|certified|validated|proven|industry leading|meets|approved|suitable|ready|safe|reliable)\b/i,
      reason:
        'The supplier claim must be separated from the evidence supporting it. Supplier language is not itself proof.',
    },
    {
      key:  'evidence_pack',
      name: 'Supplier evidence pack',
      rx:   /\b(test report|certificate|datasheet|manual|declaration|case study|audit|inspection|validation report|compliance statement|warranty|QA record|technical file|evidence pack)\b/i,
      reason:
        'The map needs the documents and artefacts being relied upon before it can assess whether they carry the procurement claim.',
    },
    {
      key:  'evidence_lineage',
      name: 'Evidence lineage',
      rx:   /\b(third-party|independent|self-certified|vendor supplied|manufacturer supplied|primary source|summary|internal report|certifier|test lab|accredited|original report|derived from)\b/i,
      reason:
        'Procurement evidence strength depends on lineage. Self-certified, summary, internal, or supplier-only evidence should not be treated as independent validation.',
    },
    {
      key:  'legacy_or_staleness',
      name: 'Legacy drift or evidence age',
      rx:   /\b(expired|outdated|legacy|old report|previous version|dated|certificate expiry|last tested|pre-dates|historical|prior model|older evidence|stale)\b/i,
      reason:
        'Evidence can decay. A report may once have been useful but no longer support the present product, configuration, or procurement decision.',
    },
    {
      key:  'inherited_confidence',
      name: 'Inherited confidence',
      rx:   /\b(similar model|same family|same supplier|same platform|previous product|based on|equivalent|comparable|reference installation|case study|like-for-like)\b/i,
      reason:
        'Confidence borrowed from a related product, supplier, or installation must be reconciled before it supports the actual procurement claim.',
    },
    {
      key:  'configuration_applicability',
      name: 'Configuration applicability',
      rx:   /\b(configuration|variant|model number|firmware|module count|assembly|integration|installed arrangement|customisation|customization|option pack|version|actual setup)\b/i,
      reason:
        'Evidence for one configuration may not apply to the configuration being procured.',
    },
    {
      key:  'operating_envelope',
      name: 'Operating envelope',
      rx:   /\b(operating envelope|load|temperature|pressure|voltage|current|capacity|throughput|speed|duty cycle|environment|payload|runtime|rating|use case)\b/i,
      reason:
        'The supplier evidence must match the intended operating conditions. A product may be suitable in one envelope and weak in another.',
    },
    {
      key:  'integration_dependency',
      name: 'Integration dependency',
      rx:   /\b(integration|interface|API|connector|compatibility|pairing|dependencies|installation|commissioning|upstream|downstream|system interface|legacy system|plant system)\b/i,
      reason:
        'Procurement risk often sits at the integration boundary. The map needs to know what the product or service depends on to work in context.',
    },
    {
      key:  'acceptance_criteria',
      name: 'Technical acceptance criteria',
      rx:   /\b(acceptance criteria|pass fail|technical requirement|must meet|threshold|specification|minimum requirement|performance criterion|acceptance test|qualification criterion)\b/i,
      reason:
        'Without acceptance criteria, the procurement review cannot decide whether the evidence is enough.',
    },
    {
      key:  'delivery_or_support_evidence',
      name: 'Delivery, support, or maintenance evidence',
      rx:   /\b(delivery|lead time|support|maintenance|spares|service level|SLA|warranty|training|documentation|commissioning|after-sales|field support)\b/i,
      reason:
        'Technical procurement often fails after purchase because support, spares, commissioning, or maintenance readiness was not evidenced.',
    },
    {
      key:  'procurement_window',
      name: 'Procurement window or commitment point',
      rx:   /\b(deadline|decision window|tender close|contract date|purchase order|commitment|irreversible|approval stage|procurement window|before signing|contract signature)\b/i,
      reason:
        'Forward reliance depends on timing. Evidence may be adequate now, decay later, or arrive too late for the procurement decision.',
    },
    {
      key:  'risk_transfer',
      name: 'Downstream risk transfer',
      rx:   /\b(operations|maintenance|insurance|warranty|liability|risk transfer|handover|end user|field team|asset owner|operator|downstream|residual risk)\b/i,
      reason:
        'A procurement decision may pass unresolved technical burden to operations, maintenance, insurance, or users. That transfer must be visible.',
    },
    {
      key:  'qualified_boundary',
      name: 'Qualified authority boundary',
      rx:   /\b(qualified engineer|legal review|commercial approval|procurement authority|safety certification|compliance review|regulator|insurer approval|technical sign-off|formal approval)\b/i,
      reason:
        'The map must not imply supplier approval, procurement approval, legal approval, compliance, or engineering sign-off.',
    },
    {
      key:  'direction',
      name: 'Stated procurement evidence question',
      rx:   /\b(can we rely|is this enough|should we proceed|should we buy|should we shortlist|should we reject|request more evidence|proceed with conditions|hold decision|technical risk)\b/i,
      reason:
        'The map needs the actual procurement question before it can choose the right next move.',
    },
  ],


  // ── Skills / Capabilities visible in material ─────────────

  skills: [
    {
      key:              'claim_evidence_separation',
      name:             'Separating supplier claim from evidence',
      rx:               /\b(claim versus evidence|supplier says but|evidence shows|claim supported by|not just supplier statement|vendor claim|evidence behind the claim)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:
        'The review separates what the supplier says from what the evidence actually supports.',
      breaks:
        'Supplier confidence language is treated as if it were evidence.',
    },
    {
      key:              'evidence_lineage_audit',
      name:             'Auditing evidence lineage',
      rx:               /\b(primary source|third-party|independent verification|self-certified|internal report|summary only|source document|certifier|test lab)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:
        'Evidence is classified by source, independence, and proximity to the original record.',
      breaks:
        'Supplier documents are counted without checking who produced them and what they prove.',
    },
    {
      key:              'configuration_matching',
      name:             'Matching evidence to actual configuration',
      rx:               /\b(matches the configuration|actual model|same version|configuration-specific|variant checked|firmware checked|installed arrangement|does not cover this configuration)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:
        'The evidence is checked against the exact product, version, model, or arrangement being bought.',
      breaks:
        'Evidence for a similar item is treated as direct evidence for the procurement item.',
    },
    {
      key:              'acceptance_gate_setting',
      name:             'Setting acceptance gate',
      rx:               /\b(acceptance criteria|minimum requirement|must provide|condition of purchase|evidence required before|acceptance test|hold until|gate)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:
        'The procurement review defines what must be true or provided before proceeding.',
      breaks:
        'The buyer proceeds without stating the technical condition that would justify acceptance.',
    },
    {
      key:              'forward_procurement_timing',
      name:             'Reading procurement timing',
      rx:               /\b(before contract|before signing|decision window|supplier update due|review interval|procurement deadline|irreversible commitment|approval stage)\b/i,
      loadSensitive:    true,
      isStructureSkill: false,
      works:
        'The review links evidence gaps to the time left before commitment.',
      breaks:
        'The team treats missing evidence as harmless even though the decision window is closing.',
    },
    {
      key:              'risk_transfer_visibility',
      name:             'Making downstream risk transfer visible',
      rx:               /\b(risk transfers to|operations will carry|maintenance burden|insurance exposure|handover risk|residual risk|downstream team|support burden)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:
        'Unresolved technical burden is traced to who will carry it after procurement.',
      breaks:
        'The procurement decision appears clean because downstream burden is not visible.',
    },
    {
      key:              'withholding_procurement_confidence',
      name:             'Withholding procurement confidence',
      rx:               /\b(do not proceed|hold decision|reject|not enough evidence|conditional|provisional|request more evidence|cannot rely|not admissible|blocked)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:
        'The reviewer withholds procurement confidence when evidence, configuration, or authority gaps remain.',
      breaks:
        'The decision proceeds because the supplier appears credible or the deadline is close.',
    },
  ],


  // ── Contradictions / Tensions ─────────────────────────────

  contradictions: [
    {
      a: /\b(compliant|certified|validated|proven|approved|suitable|reliable|industry leading|ready)\b/i,
      b: /\b(self-certified|vendor supplied|no third-party|no independent|not verified|summary only|internal report|unsupported)\b/i,
      text:
        'Strong supplier confidence language and weak evidence lineage both appear. The claim may be marketing, self-certification, or provisional until independent evidence is visible.',
    },
    {
      a: /\b(same family|similar model|reference installation|case study|previous version|same supplier|equivalent)\b/i,
      b: /\b(different model|different version|different configuration|different environment|different duty|custom|variant|firmware change)\b/i,
      text:
        'Inherited confidence and material difference both appear. Similarity does not carry the procurement claim unless the difference is reconciled.',
    },
    {
      a: /\b(test report|certificate|datasheet|manual|evidence pack|documentation provided)\b/i,
      b: /\b(outdated|expired|not current|does not cover|not for this configuration|ambiguous|missing scope|not primary)\b/i,
      text:
        'Document presence and document limitation both appear. The evidence may exist but not carry the actual procurement claim.',
    },
    {
      a: /\b(need to buy|deadline|tender close|project depends|contract date|urgent|must decide)\b/i,
      b: /\b(evidence gap|awaiting supplier|not verified|conditional|needs review|unclear|missing)\b/i,
      text:
        'Procurement pressure and evidence gaps both appear. Timing pressure does not improve evidence quality; it raises consequence if wrong.',
    },
    {
      a: /\b(low cost|good price|available now|fast delivery|commercially attractive|supplier discount)\b/i,
      b: /\b(technical gap|support unknown|maintenance burden|integration risk|warranty unclear|spares unknown|unverified)\b/i,
      text:
        'Commercial attractiveness and unresolved technical burden both appear. Price or availability may be real, but it does not close technical reliance gaps.',
    },
    {
      a: /\b(approved supplier|preferred vendor|known supplier|used before|trusted supplier|existing relationship)\b/i,
      b: /\b(new product|new configuration|different use case|different site|changed requirement|unverified claim|no current evidence)\b/i,
      text:
        'Supplier relationship confidence and product-specific uncertainty both appear. A trusted supplier still needs evidence for the actual item and use case.',
    },
    {
      a: /\b(engineering can sort it|operations will handle|maintenance can fix|support will cover|warranty covers)\b/i,
      b: /\b(no evidence|unclear support|integration issue|maintenance burden|handover risk|residual risk|not documented)\b/i,
      text:
        'Downstream reassurance and unresolved handover burden both appear. Future support should not be used to hide current procurement evidence gaps.',
    },
  ],


  // ── Direction patterns ────────────────────────────────────

  directionPatterns: [
    {
      rx: /supplier|vendor|manufacturer|OEM|distributor|integrator/i,
      label: 'toward supplier evidence review',
    },
    {
      rx: /procure|purchase|buy|shortlist|tender|contract|RFP|RFQ/i,
      label: 'toward procurement decision',
    },
    {
      rx: /test report|certificate|datasheet|manual|declaration|evidence pack/i,
      label: 'toward technical evidence-pack review',
    },
    {
      rx: /configuration|variant|model|version|firmware|integration|installed arrangement/i,
      label: 'toward configuration applicability review',
    },
    {
      rx: /delivery|support|spares|maintenance|warranty|SLA|commissioning/i,
      label: 'toward lifecycle support review',
    },
    {
      rx: /deadline|contract|purchase order|approval stage|decision window/i,
      label: 'toward procurement-window reliance review',
    },
    {
      rx: /risk|insurance|liability|operations|maintenance|handover|residual/i,
      label: 'toward downstream risk-transfer review',
    },
  ],


  // ── Steer blocks ──────────────────────────────────────────

  steer: {

    'open-gap-discipline': {
      priorityGaps: [
        'procurement_decision',
        'direction',
        'supplier_identity',
        'product_or_service_identity',
        'supplier_claim',
        'evidence_pack',
        'evidence_lineage',
        'legacy_or_staleness',
        'inherited_confidence',
        'configuration_applicability',
        'operating_envelope',
        'integration_dependency',
        'acceptance_criteria',
        'delivery_or_support_evidence',
        'procurement_window',
        'risk_transfer',
        'qualified_boundary',
      ],
      absenceRules: {
        noSupplierClaimAsEvidence:
          'Supplier statements, datasheets, and confidence language must not be treated as proof unless mapped to supporting evidence.',
        noRelationshipShortcut:
          'Known supplier, approved vendor, or preferred vendor status does not prove this product, version, configuration, or use case.',
        configurationBeforeConfidence:
          'If the actual product or configuration is unclear, procurement confidence must be capped.',
        noProcurementApproval:
          'Do not phrase output as supplier approval, purchase approval, legal approval, compliance sign-off, or engineering acceptance.',
      },
    },

    'confidence-calibration': {
      sectorNote:
        'Procurement confidence attaches to a supplier claim, specific item or service, evidence pack, configuration, operating envelope, acceptance criteria, timing window, and authority boundary. It does not attach to the supplier generally.',
      confidenceTiers: [
        {
          key: 'not_readable',
          desc: 'Procurement decision, supplier claim, item identity, or evidence pack is missing.',
        },
        {
          key: 'inferred',
          desc: 'The supplier may be relevant, but the evidence basis is not directly stated.',
        },
        {
          key: 'thin',
          desc: 'Supplier material exists, but lineage, independence, configuration, or acceptance criteria are weak.',
        },
        {
          key: 'partial',
          desc: 'Some evidence supports the claim, but material gaps remain before procurement reliance.',
        },
        {
          key: 'supported',
          desc: 'Evidence, configuration, acceptance criteria, and timing are sufficiently mapped for bounded procurement review.',
        },
        {
          key: 'strong',
          desc: 'Current, direct, independent, configuration-matched evidence supports the bounded procurement claim, with lifecycle and authority boundaries visible.',
        },
      ],
    },

    'external-constraint-reading': {
      defaultConstraintRx: /\b(tender close|procurement deadline|contract date|purchase order|budget cycle|project deadline|supplier lead time|delivery window|approval stage|legal review|engineering signoff|insurance requirement)\b/i,
      constraintTypes: [
        {
          key: 'procurement_deadline',
          label: 'Procurement or tender deadline',
          rx: /\b(tender close|procurement deadline|RFP deadline|RFQ deadline|bid close|budget cycle|approval deadline)\b/i,
          changeable: false,
        },
        {
          key: 'supplier_response',
          label: 'Supplier evidence response constraint',
          rx: /\b(waiting for supplier|supplier has not|vendor has not|evidence request|awaiting clarification|no response|lead time for evidence)\b/i,
          changeable: true,
        },
        {
          key: 'commitment_irreversibility',
          label: 'Commitment or contract irreversibility',
          rx: /\b(contract signature|purchase order|irreversible|deposit|committed|termination cost|long lead item|cannot cancel)\b/i,
          changeable: false,
        },
        {
          key: 'authority_review',
          label: 'Authority or specialist review boundary',
          rx: /\b(legal review|engineering signoff|procurement authority|insurance review|cybersecurity review|safety review|qualified review)\b/i,
          changeable: false,
        },
      ],
    },

    'load-sensitive-capability': {
      defaultLoadSignals: [
        {
          key: 'evidence_lineage_load',
          rx: /\b(self-certified|vendor supplied|internal report|summary only|no independent|not primary|unverified)\b/i,
        },
        {
          key: 'legacy_load',
          rx: /\b(legacy|old report|expired|outdated|previous version|stale|historical|pre-dates)\b/i,
        },
        {
          key: 'inherited_confidence_load',
          rx: /\b(similar model|same family|equivalent|reference installation|case study|previous product|same supplier)\b/i,
        },
        {
          key: 'configuration_load',
          rx: /\b(configuration|variant|version|firmware|custom|integration|actual setup|installed arrangement)\b/i,
        },
        {
          key: 'commitment_load',
          rx: /\b(deadline|contract|purchase order|irreversible|project depends|urgent|approval stage|commitment)\b/i,
        },
        {
          key: 'lifecycle_support_load',
          rx: /\b(spares|support|maintenance|warranty|SLA|commissioning|training|after-sales|field support)\b/i,
        },
      ],
      sectorNote:
        'Procurement risk often compounds when evidence lineage is weak, confidence is inherited, configuration is unclear, and the decision window is closing. Read these together.',
    },

    'movement-non-movement-reading': {
      movementEvidence: [
        'Procurement decision stated.',
        'Supplier claim separated from evidence.',
        'Item identity and configuration defined.',
        'Evidence pack identified.',
        'Evidence lineage classified.',
        'Legacy or stale evidence named.',
        'Inherited confidence named.',
        'Operating envelope mapped.',
        'Integration dependency described.',
        'Acceptance criteria stated.',
        'Supplier asked for missing evidence.',
        'Procurement window or commitment point stated.',
        'Downstream risk transfer named.',
        'Qualified boundary stated.',
      ],
      defaultActionRx: /\b(defined|separated|mapped|classified|requested|confirmed|verified|checked|shortlisted with conditions|held decision|rejected|escalated|withheld confidence|accepted conditionally)\b/i,
      defaultStuckRx: /\b(awaiting supplier|not provided|unclear claim|configuration unknown|no independent evidence|same documents|evidence missing|not verified|deadline approaching|no acceptance criteria)\b/i,
    },

    'contradiction-holding': {
      outputRules: {
        holdSupplierAndEvidence:
          'Hold supplier confidence and evidence strength separately. A credible supplier can still submit weak evidence for a specific claim.',
        holdCommercialAndTechnical:
          'Hold commercial attractiveness and technical readiness separately. Price, availability, or relationship does not close evidence gaps.',
        holdTimingAndReliance:
          'Hold procurement timing and reliance status together. Closing windows raise consequence; they do not improve evidence.',
        noSupplierApproval:
          'Do not turn a structured evidence read into supplier approval or rejection unless the user has supplied authority and criteria.',
      },
    },

    'next-useful-move': {
      outputShape: {
        move:
          'One bounded procurement next move: ask for primary evidence, request independent validation, define configuration, set acceptance criteria, clarify support obligations, or hold commitment until a named gap closes.',
        rationale:
          'State why this move changes procurement admissibility. Do not provide legal, commercial, or engineering approval.',
      },
    },

    'state-change-detection': {
      minimumSeparationDays: 7,
      watchFor: [
        'Supplier evidence arriving or failing to arrive.',
        'Evidence moving from self-certified to independently verified.',
        'Procurement decision moving toward irreversible commitment.',
        'Configuration changing after evidence was supplied.',
        'Evidence expiring before contract signature.',
        'Support or warranty terms being clarified or weakening.',
        'Technical gap being accepted formally or silently ignored.',
      ],
    },

    'connections-across-time': {
      minimumSeparationDays: 7,
      watchPatterns: [
        'supplier claim repeated without stronger evidence',
        'same evidence used across different configurations',
        'commercial urgency recurring before technical review closes',
        'known-supplier confidence replacing product-specific evidence',
        'old certificates reused across new procurement decisions',
        'operations expected to absorb unresolved procurement risk',
        'acceptance criteria added late after shortlist decision',
      ],
    },

    'meta-reading': {
      performanceSignals: [
        {
          key: 'supplier_confidence_language',
          rx: /\b(proven|industry leading|fully validated|trusted supplier|approved vendor|guaranteed|best in class|world class|safe|compliant)\b/i,
        },
        {
          key: 'commercial_pressure_language',
          rx: /\b(good price|discount|available now|need to decide|deadline|project depends|cannot delay|fast delivery)\b/i,
        },
        {
          key: 'document_presence_confidence',
          rx: /\b(datasheet provided|certificate exists|documentation available|case study|reference customer|report attached|paperwork complete)\b/i,
        },
      ],
      honestySignals: [
        {
          key: 'bounded_procurement_language',
          rx: /\b(proceed with conditions|hold decision|request evidence|not enough evidence|configuration-specific|independent verification|cannot rely|acceptance criteria)\b/i,
        },
        {
          key: 'evidence_role_awareness',
          rx: /\b(this supports|does not support|supplier claim|evidence lineage|self-certified|inherited confidence|legacy drift|primary evidence)\b/i,
        },
      ],
      sectorNote:
        'In technical procurement, watch for confidence created by supplier language, price, availability, relationship, and document volume. Prefer mapped evidence and acceptance criteria.',
    },

  },

};