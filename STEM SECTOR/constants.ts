import { Job, Guide, ReportWriter, MockReport } from './types';

export const JOBS: Job[] = [
  {
    id: 'robotics-readiness',
    name: 'Robotics Readiness',
    description: 'Read hidden burden, false recovery, duty envelope, and next-shift evidence gaps.',
    icon: 'Cpu',
  },
  {
    id: 'battery-transition',
    name: 'Battery Transition Evidence',
    description: 'Map transition confidence, evidence pathway, configuration fit, and unresolved readiness gaps.',
    icon: 'Zap',
  },
  {
    id: 'code-release',
    name: 'Code Release Review',
    description: 'Check source authority, invariant preservation, test evidence, and release-readiness limits.',
    icon: 'GitBranch',
  },
  {
    id: 'asset-integrity',
    name: 'Asset Integrity / Failure Path',
    description: 'Read degradation evidence, path-to-consequence logic, uncertainty, and intervention gaps.',
    icon: 'AlertTriangle',
  },
  {
    id: 'lab-evidence',
    name: 'Lab Evidence',
    description: 'Structure method boundary, calibration status, sample limits, QC, and result-to-claim mapping.',
    icon: 'Microscope',
  },
  {
    id: 'technical-procurement',
    name: 'Technical Procurement',
    description: 'Review supplier claims, evidence lineage, configuration applicability, and procurement reliance gaps.',
    icon: 'ShoppingCart',
  },
];

export const GUIDES: Guide[] = [
  {
    id: 'guide-stem-base',
    name: 'S.T.E.M. Base Guide',
    description: 'Shared technical evidence, burden, constraint, gap, and admissibility steering.',
  },
  {
    id: 'guide-stem-robotics',
    name: 'Robotics Readiness Guide',
    description: 'Hidden burden, reset traps, false recovery, degraded mode, and next-duty readiness.',
  },
  {
    id: 'guide-stem-battery-transition',
    name: 'Battery Transition Guide',
    description: 'Earned vs inherited transition confidence, evidence pathway, and configuration applicability.',
  },
  {
    id: 'guide-stem-code-release',
    name: 'Code Release Guide',
    description: 'Source authority, invariant preservation, test mapping, scope drift, and release boundaries.',
  },
  {
    id: 'guide-stem-asset-integrity',
    name: 'Asset Integrity / Failure Path Guide',
    description: 'Source condition, degradation mechanism, resistance factors, and path-to-consequence status.',
  },
  {
    id: 'guide-stem-lab-evidence',
    name: 'Lab Evidence Guide',
    description: 'Method validity, calibration, QC, sample boundary, uncertainty, and result-to-claim discipline.',
  },
  {
    id: 'guide-stem-technical-procurement',
    name: 'Technical Procurement Guide',
    description: 'Supplier evidence, legacy drift, inherited confidence, acceptance criteria, and decision timing.',
  },
];

export const REPORT_WRITERS: ReportWriter[] = [
  {
    id: 'writer-stem-technical-evidence-readiness',
    name: 'Technical Evidence Readiness Report',
    description: 'Bounded report showing support, open gaps, constraints, held tensions, and next evidence move.',
  },
  {
    id: 'writer-technical-handover-note',
    name: 'Technical Handover Note',
    description: 'Plain-language handover for a qualified reviewer, engineer, lab, procurement, or governance lead.',
  },
  {
    id: 'writer-gap-request-note',
    name: 'Evidence Gap Request Note',
    description: 'Focused request for the missing documents, tests, confirmations, or authority review needed next.',
  },
];

export const MOCK_REPORT: MockReport = {
  readinessStatus: 'DEMO REPORT — NOT AUTHORITY',

  technicalClaimOrQuestion:
    'Is the supplied material strong enough to support a bounded technical evidence-readiness view for the selected job?',

  visibleEvidence: [
    'A technical job has been selected.',
    'A guide has been selected for the domain.',
    'A report writer has been selected.',
    'Material has been provided for structured review.',
    'The boundary note is visible before reliance.',
  ],

  openGaps: [
    'The exact technical claim may still need to be stated more precisely.',
    'The evidence pack has not yet been mapped to the claim.',
    'Configuration, sample, version, operating envelope, or method boundary may still be unclear.',
    'Qualified authority review has not been supplied.',
  ],

  burdenConstraintsTiming: [
    'The tool can structure evidence-readiness, but it cannot verify the underlying material independently.',
    'Any time-sensitive evidence, expiry date, test window, deployment window, or procurement window must be declared.',
    'High-consequence use requires qualified review outside this demo.',
  ],

  heldTensions: [
    'A document may exist without carrying the actual claim.',
    'A system may appear ready while evidence gaps remain open.',
    'A supplier, lab, model, dashboard, or AI output may sound confident without independent support.',
  ],

  priorityEvidenceMove:
    'State the exact technical claim and attach the primary evidence items that are supposed to support it.',

  shouldNotYetBeClaimed: [
    'Do not claim engineering sign-off from this report.',
    'Do not claim safety certification from this report.',
    'Do not claim compliance approval from this report.',
    'Do not claim lab accreditation or formal method validation from this report.',
    'Do not claim procurement approval from this report.',
    'Do not claim the evidence is sufficient until the open gaps are resolved.',
  ],
};

export const BOUNDARY_DISCLAIMER =
  'This tool structures evidence-readiness. It does not provide engineering sign-off, safety certification, compliance approval, lab accreditation, legal advice, or procurement approval.';
