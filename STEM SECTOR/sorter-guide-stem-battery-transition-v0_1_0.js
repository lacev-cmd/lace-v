// ══════════════════════════════════════════════════════════
// SORTER GUIDE — S.T.E.M. Battery Transition  v0.1.0
//
// Optional second-ring S.T.E.M. sub-guide.
// Parent: guide-stem-base
//
// Attach order:
//   1. SorterSpine.attachGuide(GuideSTEMBase);
//   2. SorterSpine.attachGuide(GuideSTEMBatteryTransition);
//
// Role:
//   Steer STEM reads toward battery energy storage evidence
//   readiness, safety-specification transition pressure,
//   configuration applicability, inherited confidence,
//   decorative evidence, pathway mapping, and controlled
//   readiness language.
//
// Boundary:
//   This guide does not certify compliance.
//   It does not interpret standards clause-by-clause.
//   It does not replace testing, certification, regulatory
//   review, engineering sign-off, product listing, insurer
//   approval, or qualified professional judgement.
//   It helps structure the evidence-readiness read.
// ══════════════════════════════════════════════════════════

const GuideSTEMBatteryTransition = {

  id:      'guide-stem-battery-transition',
  version: '0.1.0',
  type:    'subsector',
  parent:  'guide-stem-base',
  sector:  'stem-battery-transition',

  purpose:
    'Extend the S.T.E.M. base guide for battery energy storage equipment moving through safety-specification, listing, procurement, configuration, or transition-readiness review. The guide distinguishes earned confidence from inherited confidence and keeps evidence gaps visible.',

  sectorNotes: {

    distinctivePressures: [
      'A battery product remains commercially active while its transition evidence is unclear.',
      'Older evidence is treated as though it automatically supports the newer safety or listing burden.',
      'A product-listing, certificate, datasheet, or declaration is treated as broader than its actual meaning.',
      'A modular or stackable configuration inherits confidence from a narrower tested arrangement.',
      'A product family name hides variant, firmware, module-count, leader/follower, connector, or rating differences.',
      'A safety claim is supported by documents that exist but do not carry the actual claim.',
      'Evidence readiness is compressed into a yes/no procurement or installation decision.',
      'Different stakeholders assume another party checked the transition evidence.',
      'Commercial momentum creates false transition confidence.',
      'A strong story in one hazard class masks weak evidence in another.',
    ],

    distinctiveMovement: [
      'The exact battery equipment, module, cabinet, product family, pairing, or configuration is defined.',
      'The claim being relied upon is stated precisely.',
      'Evidence pathway is mapped: older pathway, current pathway, mixed, unclear, or out of scope.',
      'Configuration applicability is checked against the actual arrangement.',
      'Listing status is separated from broader safety or transition-readiness claims.',
      'Evidence quality is classified rather than merely counted.',
      'Decorative evidence is rejected or downgraded.',
      'Inherited confidence is named.',
      'Transition pressure points are checked.',
      'Readiness status is controlled: ready, ready with conditions, not yet ready due to evidence gaps, not yet ready due to structural gaps, or out of scope.',
    ],

    distinctiveGaps: [
      'Assessment unit not defined.',
      'Transition claim not stated.',
      'Evidence pathway unclear.',
      'Evidence pack missing, outdated, ambiguous, contradictory, or configuration-limited.',
      'Configuration applicability not shown.',
      'Listing status treated as broader than its actual scope.',
      'Modular arrangement not mapped.',
      'Connector, isolation, fault-current, BMS, EOTTI, enclosure, rating, or marking evidence not described.',
      'Hazard coverage incomplete.',
      'Boundary with certification, standards interpretation, or engineering sign-off not stated.',
    ],

    outputAudience:
      'Battery OEM, importer, distributor, integrator, installer, retailer, project developer, insurer, financier, procurement team, government-linked program, technical reviewer, or governance reviewer.',

    outputRegister:
      'Precise. Evidence-readiness focused. Careful with standards language. No compliance certification. No safety approval. No accusation from uncertainty.',
  },


  // ── Gaps ─────────────────────────────────────────────────

  gaps: [
    {
      key:  'assessment_unit',
      name: 'Assessment unit',
      rx:   /\b(product|equipment|battery|module|cabinet|rack|system|inverter pairing|battery equipment|product family|configuration|installed arrangement|assessment unit)\b/i,
      reason:
        'The map needs the actual assessment unit. A brand or product family may not be precise enough if variants, modules, cabinets, pairings, or installed configurations differ.',
    },
    {
      key:  'transition_claim',
      name: 'Transition claim',
      rx:   /\b(transition ready|ready|approved|listed|compliant|suitable|safe|meets|accepted|eligible|can be installed|can be specified|can be procured|future ready)\b/i,
      reason:
        'The claim being relied upon must be stated. Transition readiness, listing status, compliance, safety evidence, and procurement suitability are not the same claim.',
    },
    {
      key:  'evidence_pathway',
      name: 'Evidence pathway',
      rx:   /\b(pathway|older pathway|new pathway|legacy|transition|standard method|alternative method|listing application|approved list|certificate|certification route|test pathway|evidence route)\b/i,
      reason:
        'The map must know which evidence pathway supports the claim. Evidence from an older or unclear pathway should not be treated as automatically current.',
    },
    {
      key:  'evidence_pack',
      name: 'Evidence pack',
      rx:   /\b(test report|certificate|declaration|datasheet|manual|listing entry|diagram|manufacturer statement|supplier statement|installation instructions|marking|nameplate|technical file|evidence pack|documentation)\b/i,
      reason:
        'Documents must be identified before their role can be assessed. The presence of documents is not proof that they support the specific transition claim.',
    },
    {
      key:  'evidence_quality',
      name: 'Evidence quality',
      rx:   /\b(current|expired|outdated|ambiguous|contradictory|configuration-limited|independent|third-party|self-certified|manufacturer supplied|supplier supplied|primary source|summary|verified)\b/i,
      reason:
        'Evidence quality determines confidence. Current, direct, independent, configuration-matched evidence carries more weight than stale, self-certified, inherited, or ambiguous evidence.',
    },
    {
      key:  'configuration_applicability',
      name: 'Configuration applicability',
      rx:   /\b(configuration|module count|stack|stackable|modular|cabinet|leader|follower|inverter|pairing|firmware|variant|model designation|installed configuration|assembled system|actual arrangement)\b/i,
      reason:
        'Battery evidence must apply to the actual configuration being sold, installed, procured, insured, or relied upon.',
    },
    {
      key:  'scope_boundary',
      name: 'Specification or review scope boundary',
      rx:   /\b(scope|application boundary|capacity|power|rating|C5|technology|domestic|residential|commercial|industrial|use case|inside scope|outside scope)\b/i,
      reason:
        'The map needs the scope boundary before reading transition readiness. A broad battery category does not prove a specific product or use case is inside the relevant review boundary.',
    },
    {
      key:  'electrical_design_limits',
      name: 'Electrical design limits',
      rx:   /\b(voltage|current|fault current|short-circuit|isolation|lock-off|disconnect|charge current|discharge current|electrical rating|prospective fault|protection)\b/i,
      reason:
        'Electrical limits and isolation evidence matter because transition confidence may depend on the actual fault burden and safe isolation arrangement.',
    },
    {
      key:  'connector_or_modular_assembly',
      name: 'Connector or modular assembly evidence',
      rx:   /\b(connector|plug|socket|cable|busbar|interconnect|externally accessible|module-to-module|Type A|Type B|assembled connection|field assembly|module replacement)\b/i,
      reason:
        'Connector and modular assembly confidence must be tied to the actual arrangement. Component-level or manufacturer-controlled evidence may not cover field-modified or wider assemblies.',
    },
    {
      key:  'parallel_bms_isolation',
      name: 'Parallel configuration, BMS, and isolation behaviour',
      rx:   /\b(parallel|BMS|battery management|synchronisation|synchronization|communication|module isolation|faulty module|string|protection timing|fault contribution)\b/i,
      reason:
        'Parallel configurations and BMS-dependent protection can change fault burden, timing, and isolation behaviour. Evidence must match the configured system.',
    },
    {
      key:  'nameplate_rating_consistency',
      name: 'Nameplate, rating, and model consistency',
      rx:   /\b(nameplate|rating|model designation|serial|variant|leader|follower|usable energy|rated energy|chemistry|manual|label|marking|documentation consistency)\b/i,
      reason:
        'Model names, ratings, markings, manuals, certificates, and listings must point to the same product and configuration. Identity drift weakens confidence.',
    },
    {
      key:  'eotti_or_degraded_timing',
      name: 'Emergency or degraded-state timing evidence',
      rx:   /\b(EOTTI|emergency operational tolerance|degraded state|safe state|tolerance interval|time interval|degraded-state timing|safe transition|emergency interval)\b/i,
      reason:
        'A degraded-state timing claim must be evidenced. A stated emergency tolerance interval is not enough unless it is supported under credible conditions.',
    },
    {
      key:  'thermal_fire_hazard_coverage',
      name: 'Thermal, fire, and multi-hazard coverage',
      rx:   /\b(thermal|fire|thermal runaway|propagation|containment|enclosure|IEC|UL|mechanical hazard|electrical hazard|ingress|multi-hazard|fire safety|hazard coverage)\b/i,
      reason:
        'Battery safety confidence should not rest on one hazard story if other relevant hazard classes remain weakly evidenced.',
    },
    {
      key:  'transition_timing',
      name: 'Transition timing or expiry window',
      rx:   /\b(transition date|expiry|deadline|window|application date|certificate expiry|listing expiry|from|until|before|after|renewal|cutoff)\b/i,
      reason:
        'Transition confidence is time-bound. The map needs dates, expiry, listing status, and decision timing before reliance can be bounded.',
    },
    {
      key:  'qualified_authority_boundary',
      name: 'Qualified authority boundary',
      rx:   /\b(certification|certifier|regulator|standards interpretation|compliance opinion|engineering sign-off|safety approval|listing body|qualified reviewer|legal advice|formal approval)\b/i,
      reason:
        'The map must not imply certification, compliance determination, regulatory approval, safety sign-off, or legal advice. Qualified authority boundaries must remain visible.',
    },
    {
      key:  'direction',
      name: 'Stated battery-transition decision',
      rx:   /\b(should we use|should we install|should we specify|should we procure|should we insure|can we rely|what evidence is needed|is it transition ready|what is missing|can it proceed)\b/i,
      reason:
        'The map needs the decision being made: procurement, installation, listing reliance, insurance, project readiness, supplier review, or evidence request.',
    },
  ],


  // ── Skills / Capabilities visible in material ─────────────

  skills: [
    {
      key:              'claim_mapping',
      name:             'Mapping transition claim',
      rx:               /\b(the claim is|claim being made|transition claim|reliance claim|what is being relied on|this only supports|does not support|claim map)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:
        'The user separates listing, compliance, safety evidence, procurement suitability, and transition readiness instead of treating them as one broad claim.',
      breaks:
        'Loose terms such as approved, compliant, listed, ready, or safe are used without saying what exact claim they support.',
    },
    {
      key:              'pathway_mapping',
      name:             'Mapping evidence pathway',
      rx:               /\b(mapped to pathway|older pathway|current pathway|transition pathway|standard method|alternative method|listing route|certificate route|evidence route)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:
        'Each evidence item is tied to the pathway and claim it is supposed to support.',
      breaks:
        'Evidence from one pathway is treated as automatically supporting another pathway without reconciliation.',
    },
    {
      key:              'configuration_checking',
      name:             'Checking configuration applicability',
      rx:               /\b(configuration applies|covers this arrangement|actual configuration|module count|variant|same model|different model|installed arrangement|pairing confirmed|not covered)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:
        'The reviewer checks whether evidence applies to the actual battery arrangement being relied on.',
      breaks:
        'Evidence from one module, variant, cabinet, pairing, or stack is treated as covering wider configurations without support.',
    },
    {
      key:              'decorative_evidence_rejection',
      name:             'Rejecting decorative evidence',
      rx:               /\b(decorative evidence|does not carry the claim|not enough|not proof|only a datasheet|only a declaration|not mapped|does not cover|appearance of evidence)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:
        'Documents are assessed by what they prove, not by whether they look reassuring.',
      breaks:
        'A certificate, datasheet, declaration, or listing entry is treated as proof without checking what it actually covers.',
    },
    {
      key:              'readiness_classification',
      name:             'Classifying readiness conservatively',
      rx:               /\b(transition ready|ready with conditions|not yet ready|evidence gaps|structural gaps|out of scope|conditional|withhold confidence|proceed with conditions)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:
        'The review uses controlled readiness language rather than inflated certainty.',
      breaks:
        'The output collapses uncertainty into a yes/no answer because the decision process wants simplicity.',
    },
    {
      key:              'stakeholder_boundary_holding',
      name:             'Holding stakeholder and authority boundaries',
      rx:               /\b(manufacturer|importer|installer|integrator|certifier|listing body|insurer|financier|procurement|qualified reviewer|regulator|authority)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:
        'The review names who holds which evidence, decision, or authority role.',
      breaks:
        'Each party assumes another party has checked transition readiness, leaving the evidence burden unowned.',
    },
  ],


  // ── Contradictions / Tensions ─────────────────────────────

  contradictions: [
    {
      a: /\b(approved|listed|certified|compliant|ready|safe|accepted|eligible|suitable)\b/i,
      b: /\b(missing|unclear|outdated|legacy|older pathway|not mapped|not covered|configuration-limited|self-certified|unverified)\b/i,
      text:
        'A confident readiness or listing claim and an evidence gap both appear. The claim may be inherited, conditional, or unsupported until the gap is resolved.',
    },
    {
      a: /\b(same product family|same brand|same manufacturer|same module|similar product|same range|based on)\b/i,
      b: /\b(different configuration|different variant|different module count|different pairing|new firmware|different cabinet|different installation|changed rating)\b/i,
      text:
        'Similarity and configuration difference both appear. Similarity is not equivalence. Confidence must be earned for the actual arrangement.',
    },
    {
      a: /\b(test report|certificate|declaration|datasheet|manual|listing entry|documentation exists|evidence pack)\b/i,
      b: /\b(does not cover|not for this configuration|not current|not independent|summary only|ambiguous|contradictory|missing annex|unclear scope)\b/i,
      text:
        'Document presence and document limitation both appear. The evidence may be decorative for the claim unless it actually carries the relevant burden.',
    },
    {
      a: /\b(transition ready|future ready|ready for the new requirement|should be fine|still available|commercially active)\b/i,
      b: /\b(transition plan unclear|evidence not refreshed|older evidence|legacy documentation|waiting for update|not yet submitted|unclear pathway)\b/i,
      text:
        'Commercial activity or future-ready language and unresolved transition evidence both appear. The product may still be viable, but transition confidence has not yet been earned.',
    },
    {
      a: /\b(thermal|fire|propagation|containment|fire safety|thermal runaway)\b/i,
      b: /\b(electrical|mechanical|isolation|marking|nameplate|ingress|connector|fault current|multi-hazard)\b/i,
      text:
        'A strong focus on one hazard class and other hazard classes both appear. The map should check whether one strong story is being used to imply broader safety confidence.',
    },
    {
      a: /\b(procurement|insurance|finance|installation|project approval|specification|tender|contract)\b/i,
      b: /\b(evidence gap|not yet ready|conditional|awaiting clarification|not verified|unresolved|out of scope)\b/i,
      text:
        'A commercial decision pathway and unresolved evidence both appear. Procurement or project momentum should not turn uncertainty into readiness.',
    },
  ],


  // ── Direction patterns ────────────────────────────────────

  directionPatterns: [
    {
      rx: /transition ready|transition readiness|future ready|new requirement|specification transition/i,
      label: 'toward transition-readiness review',
    },
    {
      rx: /listing|approved list|listing application|market access|program eligibility/i,
      label: 'toward product-listing reliance review',
    },
    {
      rx: /procure|procurement|tender|supplier|contract|project specification/i,
      label: 'toward procurement evidence readiness',
    },
    {
      rx: /install|installer|retailer|customer|site|commissioning/i,
      label: 'toward installation or site-use readiness',
    },
    {
      rx: /insure|insurance|financier|finance|risk stakeholder|due diligence/i,
      label: 'toward insurer or financier reliance review',
    },
    {
      rx: /module|modular|stack|cabinet|inverter pairing|configuration/i,
      label: 'toward configuration applicability review',
    },
    {
      rx: /test report|certificate|manual|datasheet|declaration|evidence pack/i,
      label: 'toward evidence-pack review',
    },
  ],


  // ── Steer blocks ──────────────────────────────────────────

  steer: {

    'open-gap-discipline': {
      priorityGaps: [
        'assessment_unit',
        'transition_claim',
        'evidence_pathway',
        'evidence_pack',
        'evidence_quality',
        'configuration_applicability',
        'scope_boundary',
        'transition_timing',
        'qualified_authority_boundary',
        'direction',
        'electrical_design_limits',
        'connector_or_modular_assembly',
        'parallel_bms_isolation',
        'nameplate_rating_consistency',
        'eotti_or_degraded_timing',
        'thermal_fire_hazard_coverage',
      ],
      absenceRules: {
        noComplianceLeap:
          'Do not turn evidence-readiness review into compliance certification or standards interpretation.',
        noListingOverreach:
          'Do not treat product-listing status as broader safety, transition, insurance, or procurement confidence without mapping the claim.',
        configurationFirst:
          'If configuration is unclear, confidence must be capped. Battery evidence often fails at the configuration boundary.',
        decorativeEvidence:
          'Documents that exist but do not support the actual claim should be named as decorative or limited evidence, not treated as proof.',
      },
    },

    'confidence-calibration': {
      sectorNote:
        'Battery transition confidence attaches to a defined claim, assessment unit, evidence pathway, configuration, and timing window. It does not attach to a brand, product family, or listing label in general.',
      confidenceTiers: [
        {
          key: 'not_readable',
          desc: 'Assessment unit, claim, pathway, or evidence pack is missing.',
        },
        {
          key: 'inferred',
          desc: 'Transition pressure is suggested but not directly evidenced.',
        },
        {
          key: 'thin',
          desc: 'Some documentation exists, but claim mapping, configuration applicability, or pathway status is weak.',
        },
        {
          key: 'partial',
          desc: 'The claim and some evidence are visible, but material transition gaps remain.',
        },
        {
          key: 'supported',
          desc: 'The evidence appears mapped to the bounded claim, configuration, pathway, and timing window.',
        },
        {
          key: 'strong',
          desc: 'Multiple current, direct, configuration-matched evidence items support the bounded transition claim, with authority boundaries preserved.',
        },
      ],
    },

    'external-constraint-reading': {
      defaultConstraintRx: /\b(transition date|expiry|certificate expiry|listing|application deadline|standard|regulation|certifier|testing availability|supplier response|project deadline|procurement window|installation date|insurance requirement)\b/i,
      constraintTypes: [
        {
          key: 'transition_window',
          label: 'Transition or expiry window',
          rx: /\b(transition date|expiry|certificate expiry|application deadline|cutoff|window|renewal|before|after)\b/i,
          changeable: false,
        },
        {
          key: 'authority_boundary',
          label: 'Qualified authority or certification boundary',
          rx: /\b(certifier|regulator|listing body|qualified reviewer|compliance opinion|engineering sign-off|formal approval|standards interpretation)\b/i,
          changeable: false,
        },
        {
          key: 'supplier_evidence_access',
          label: 'Supplier or manufacturer evidence access',
          rx: /\b(waiting for supplier|manufacturer has not|not provided|requested evidence|awaiting clarification|supplier statement|manufacturer declaration)\b/i,
          changeable: true,
        },
        {
          key: 'commercial_commitment',
          label: 'Commercial commitment pressure',
          rx: /\b(procurement deadline|contract|purchase order|project approval|installation booked|insurance decision|finance decision|tender close)\b/i,
          changeable: false,
        },
      ],
    },

    'load-sensitive-capability': {
      defaultLoadSignals: [
        {
          key: 'evidence_transition_load',
          rx: /\b(transition|legacy evidence|older pathway|evidence refresh|evidence readiness|pathway mapping|not yet ready)\b/i,
        },
        {
          key: 'configuration_load',
          rx: /\b(modular|stackable|configuration|module count|inverter pairing|leader|follower|variant|firmware|installed arrangement)\b/i,
        },
        {
          key: 'electrical_fault_load',
          rx: /\b(fault current|short-circuit|isolation|lock-off|parallel|BMS|module isolation|protection timing)\b/i,
        },
        {
          key: 'thermal_fire_load',
          rx: /\b(thermal runaway|fire|propagation|containment|enclosure|thermal|multi-hazard)\b/i,
        },
        {
          key: 'commercial_momentum_load',
          rx: /\b(procurement|installation|insurance|finance|project approval|deadline|commercially available|still being sold)\b/i,
        },
      ],
      sectorNote:
        'Battery transition pressure often comes from the interaction between evidence readiness, configuration complexity, and commercial timing. Read these together, not as isolated issues.',
    },

    'movement-non-movement-reading': {
      movementEvidence: [
        'Assessment unit defined.',
        'Transition claim stated.',
        'Evidence pathway mapped.',
        'Evidence pack identified.',
        'Evidence role classified.',
        'Configuration applicability checked.',
        'Listing status separated from wider safety claim.',
        'Decorative evidence rejected.',
        'Inherited confidence named.',
        'Readiness category assigned conservatively.',
        'Qualified authority boundary stated.',
      ],
      defaultActionRx: /\b(defined|mapped|classified|checked|confirmed|requested|clarified|bounded|withheld confidence|assigned category|separated|identified|reviewed|rejected|downgraded)\b/i,
      defaultStuckRx: /\b(unclear|not mapped|not provided|missing|waiting for|not confirmed|same documents|still legacy|still ambiguous|configuration unknown|pathway unclear)\b/i,
    },

    'contradiction-holding': {
      outputRules: {
        holdCommercialAndEvidence:
          'Hold commercial availability and evidence readiness separately. A product may remain active while its transition evidence is unresolved.',
        noAccusationFromGap:
          'An evidence gap is not a finding of unsafe product or misconduct. It is a limit on confidence.',
        readinessIsBounded:
          'Readiness status must be tied to the stated claim, configuration, evidence pack, and decision timing.',
        evidenceOverLanguage:
          'Specific evidence limits are more reliable than broad readiness language.',
      },
    },

    'next-useful-move': {
      outputShape: {
        move:
          'One bounded battery-transition next move: define the assessment unit, map the evidence pathway, request configuration-specific evidence, clarify listing scope, or name the missing authority review.',
        rationale:
          'State why this move changes transition admissibility. Do not issue compliance, safety, or certification conclusions.',
      },
    },

    'state-change-detection': {
      minimumSeparationDays: 14,
      watchFor: [
        'Evidence pathway changing from legacy to current.',
        'Listing status changing or expiring.',
        'Supplier providing updated evidence.',
        'Configuration changing after evidence was generated.',
        'Procurement or installation decision becoming irreversible.',
        'Certificate, test report, or listing information becoming stale.',
      ],
    },

    'connections-across-time': {
      minimumSeparationDays: 14,
      watchPatterns: [
        'same evidence reused across different configurations',
        'listing status treated as broad safety confidence',
        'manufacturer statement substituted for independent evidence',
        'procurement momentum increasing while evidence remains unresolved',
        'legacy evidence carried into transition claim',
        'modular configuration limits recurring across documents',
      ],
    },

    'meta-reading': {
      performanceSignals: [
        {
          key: 'readiness_language',
          rx: /\b(approved|compliant|safe|ready|future ready|fully certified|no issue|should be fine|accepted everywhere)\b/i,
        },
        {
          key: 'document_presence_confidence',
          rx: /\b(we have documents|certificate exists|listed product|paperwork is there|documentation available|manual provided)\b/i,
        },
        {
          key: 'role_displacement',
          rx: /\b(certifier checked|manufacturer says|installer assumes|supplier confirmed|someone must have|already approved|the list covers it)\b/i,
        },
      ],
      honestySignals: [
        {
          key: 'bounded_transition_language',
          rx: /\b(only supports|not yet ready|ready with conditions|evidence gap|structural gap|out of scope|cannot conclude|requires independent review|configuration-specific)\b/i,
        },
        {
          key: 'evidence_role_awareness',
          rx: /\b(this document proves|does not prove|supports only|does not cover|evidence role|mapped to claim|pathway unclear)\b/i,
        },
      ],
      sectorNote:
        'In battery transition contexts, watch for confidence created by status labels, document presence, commercial momentum, and role displacement. Prefer mapped evidence over reassurance.',
    },

  },

};