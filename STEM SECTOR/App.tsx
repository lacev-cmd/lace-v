import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { AppState, Job, Guide, ReportWriter, MockReport } from './types';
import { JOBS, GUIDES, REPORT_WRITERS, MOCK_REPORT, BOUNDARY_DISCLAIMER } from './constants';

export default function App() {
  const [state, setState] = useState<AppState>({
    currentScreen: 'home',
    selectedJob: null,
    selectedGuide: GUIDES[0],
    selectedWriter: REPORT_WRITERS[0],
    materialContent: '',
    report: null,
    isLoadingReport: false,
  });

  const handleSelectJob = (job: Job) => {
    setState((prev) => ({
      ...prev,
      currentScreen: 'workspace',
      selectedJob: job,
      selectedGuide: getDefaultGuideForJob(job.id),
      selectedWriter: REPORT_WRITERS[0],
      materialContent: '',
      report: null,
    }));
  };

  const handleBackHome = () => {
    setState((prev) => ({
      ...prev,
      currentScreen: 'home',
      selectedJob: null,
      materialContent: '',
      report: null,
    }));
  };

  const handleRunDemo = () => {
    setState((prev) => ({ ...prev, isLoadingReport: true }));

    window.setTimeout(() => {
      setState((prev) => ({
        ...prev,
        report: MOCK_REPORT,
        isLoadingReport: false,
      }));
    }, 300);
  };

  const handleClear = () => {
    setState((prev) => ({
      ...prev,
      materialContent: '',
      report: null,
    }));
  };

  const handleDownloadReport = () => {
    if (!state.report) return;

    const reportText = formatReportForDownload({
      report: state.report,
      jobName: state.selectedJob?.name || 'Unselected job',
      guideName: state.selectedGuide?.name || 'Unselected guide',
      writerName: state.selectedWriter?.name || 'Unselected report writer',
      materialContent: state.materialContent,
    });

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');

    anchor.href = url;
    anchor.download = `lace-v-stem-technical-evidence-report-${Date.now()}.txt`;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    URL.revokeObjectURL(url);
  };

  if (state.currentScreen === 'home') {
    return <HomeScreen onSelectJob={handleSelectJob} />;
  }

  return (
    <WorkspaceScreen
      state={state}
      onBackHome={handleBackHome}
      onMaterialChange={(content) => setState((prev) => ({ ...prev, materialContent: content }))}
      onGuideChange={(guide) => setState((prev) => ({ ...prev, selectedGuide: guide }))}
      onWriterChange={(writer) => setState((prev) => ({ ...prev, selectedWriter: writer }))}
      onRunDemo={handleRunDemo}
      onClear={handleClear}
      onDownloadReport={handleDownloadReport}
    />
  );
}

function getDefaultGuideForJob(jobId: Job['id']): Guide {
  const map: Record<Job['id'], string> = {
    'robotics-readiness': 'guide-stem-robotics',
    'battery-transition': 'guide-stem-battery-transition',
    'code-release': 'guide-stem-code-release',
    'asset-integrity': 'guide-stem-asset-integrity',
    'lab-evidence': 'guide-stem-lab-evidence',
    'technical-procurement': 'guide-stem-technical-procurement',
  };

  return GUIDES.find((guide) => guide.id === map[jobId]) || GUIDES[0];
}

function HomeScreen({ onSelectJob }: { onSelectJob: (job: Job) => void }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-12">
          <div className="inline-flex items-center rounded-full bg-slate-800 border border-slate-700 px-3 py-1 text-xs font-semibold text-slate-300 mb-5">
            FRONTEND SHELL · MOCK ENGINE ONLY
          </div>

          <h1 className="text-5xl font-bold tracking-tight mb-4">
            LACE V S.T.E.M. Lab
          </h1>

          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            Build bounded technical evidence, burden, gap, and admissibility tools for defined jobs.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {JOBS.map((job) => (
            <JobCard key={job.id} job={job} onSelect={onSelectJob} />
          ))}
        </section>

        <section className="mt-10 rounded-2xl border border-amber-700/50 bg-amber-950/30 p-5">
          <h2 className="text-sm font-bold text-amber-100 mb-2">Boundary</h2>
          <p className="text-sm text-amber-100 leading-relaxed">{BOUNDARY_DISCLAIMER}</p>
        </section>
      </div>
    </div>
  );
}

function JobCard({ job, onSelect }: { job: Job; onSelect: (job: Job) => void }) {
  const Icon =
    (Icons[job.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>) ||
    Icons.Circle;

  return (
    <button
      onClick={() => onSelect(job)}
      className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-left hover:border-teal-500 transition-colors"
    >
      <Icon className="w-8 h-8 text-teal-400 mb-5" />

      <h3 className="text-lg font-semibold text-white mb-2">{job.name}</h3>

      <p className="text-sm text-slate-400 leading-relaxed mb-5">{job.description}</p>

      <div className="text-sm font-medium text-teal-400">Select →</div>
    </button>
  );
}

function WorkspaceScreen({
  state,
  onBackHome,
  onMaterialChange,
  onGuideChange,
  onWriterChange,
  onRunDemo,
  onClear,
  onDownloadReport,
}: {
  state: AppState;
  onBackHome: () => void;
  onMaterialChange: (content: string) => void;
  onGuideChange: (guide: Guide) => void;
  onWriterChange: (writer: ReportWriter) => void;
  onRunDemo: () => void;
  onClear: () => void;
  onDownloadReport: () => void;
}) {
  const characterCount = state.materialContent.length;
  const wordCount = state.materialContent.trim()
    ? state.materialContent.trim().split(/\s+/).length
    : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-slate-800 bg-slate-950 px-6 py-4">
        <button
          onClick={onBackHome}
          className="text-sm font-medium text-slate-400 hover:text-white mb-3"
        >
          ← Back to jobs
        </button>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {state.selectedJob?.name}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Frontend shell · mock report output
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <aside className="xl:col-span-3 space-y-6">
            <Card title="Selected Job">
              <h2 className="text-lg font-semibold text-white">{state.selectedJob?.name}</h2>
              <p className="text-sm text-slate-400 leading-relaxed mt-2">
                {state.selectedJob?.description}
              </p>
            </Card>

            <Card title="Guide">
              <select
                value={state.selectedGuide?.id || ''}
                onChange={(event) => {
                  const guide = GUIDES.find((item) => item.id === event.target.value);
                  if (guide) onGuideChange(guide);
                }}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
              >
                {GUIDES.map((guide) => (
                  <option key={guide.id} value={guide.id}>
                    {guide.name}
                  </option>
                ))}
              </select>

              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {state.selectedGuide?.description}
              </p>
            </Card>

            <Card title="Report Writer">
              <select
                value={state.selectedWriter?.id || ''}
                onChange={(event) => {
                  const writer = REPORT_WRITERS.find((item) => item.id === event.target.value);
                  if (writer) onWriterChange(writer);
                }}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
              >
                {REPORT_WRITERS.map((writer) => (
                  <option key={writer.id} value={writer.id}>
                    {writer.name}
                  </option>
                ))}
              </select>

              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {state.selectedWriter?.description}
              </p>
            </Card>

            <Card title="Limits & Boundaries">
              <p className="text-xs text-slate-400 leading-relaxed">
                {BOUNDARY_DISCLAIMER}
              </p>
            </Card>
          </aside>

          <section className="xl:col-span-5">
            <Card title="Paste Material">
              <textarea
                value={state.materialContent}
                onChange={(event) => onMaterialChange(event.target.value)}
                placeholder="Paste technical documentation, test results, supplier claims, code-release notes, lab notes, inspection findings, specifications, or other relevant material here..."
                className="w-full h-80 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 resize-none"
              />

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-3 mb-6">
                <div className="text-xs text-slate-400">
                  {characterCount} characters · {wordCount} words
                </div>

                <div className="text-xs text-slate-500">
                  Demo only: pasted text is not analysed by the real engine yet.
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onRunDemo}
                  disabled={state.isLoadingReport}
                  className="rounded-lg bg-teal-600 px-6 py-2 text-sm font-semibold text-white hover:bg-teal-700 disabled:bg-teal-900"
                >
                  {state.isLoadingReport ? 'Generating...' : 'Run Demo'}
                </button>

                <button
                  onClick={onClear}
                  className="rounded-lg bg-slate-800 px-6 py-2 text-sm font-semibold text-white hover:bg-slate-700"
                >
                  Clear
                </button>
              </div>
            </Card>
          </section>

          <aside className="xl:col-span-4">
            <Card title="Report Preview">
              {state.report ? (
                <ReportPreview report={state.report} onDownload={onDownloadReport} />
              ) : (
                <div className="min-h-80 flex items-center justify-center text-center">
                  <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                    Run Demo to generate a mock technical evidence-readiness report.
                  </p>
                </div>
              )}
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <h2 className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}

function ReportPreview({
  report,
  onDownload,
}: {
  report: MockReport;
  onDownload: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="inline-block rounded-full bg-slate-800 border border-slate-700 px-3 py-1 text-xs font-semibold text-slate-200">
        {report.readinessStatus}
      </div>

      <ReportSection title="Technical Claim Or Question">
        <p className="text-sm text-slate-200 leading-relaxed">
          {report.technicalClaimOrQuestion}
        </p>
      </ReportSection>

      <ReportList title="Visible Evidence" items={report.visibleEvidence} marker="✓" markerClass="text-teal-400" />
      <ReportList title="Open Gaps" items={report.openGaps} marker="◦" markerClass="text-amber-400" />
      <ReportList title="Burden / Constraints / Timing" items={report.burdenConstraintsTiming} marker="•" markerClass="text-slate-500" />
      <ReportList title="Held Tensions" items={report.heldTensions} marker="•" markerClass="text-slate-500" />

      <ReportSection title="Priority Evidence Move">
        <p className="text-sm font-medium text-slate-100 leading-relaxed">
          {report.priorityEvidenceMove}
        </p>
      </ReportSection>

      <ReportList title="Should Not Yet Be Claimed" items={report.shouldNotYetBeClaimed} marker="×" markerClass="text-red-400" />

      <button
        onClick={onDownload}
        className="w-full rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-slate-200"
      >
        Download Report
      </button>
    </div>
  );
}

function ReportSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
        {title}
      </h3>
      {children}
    </section>
  );
}

function ReportList({
  title,
  items,
  marker,
  markerClass,
}: {
  title: string;
  items: string[];
  marker: string;
  markerClass: string;
}) {
  return (
    <ReportSection title={title}>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-slate-300 leading-relaxed">
            <span className={`${markerClass} font-bold`}>{marker}</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </ReportSection>
  );
}

function formatReportForDownload({
  report,
  jobName,
  guideName,
  writerName,
  materialContent,
}: {
  report: MockReport;
  jobName: string;
  guideName: string;
  writerName: string;
  materialContent: string;
}): string {
  return `LACE V S.T.E.M. LAB
TECHNICAL EVIDENCE READINESS REPORT

Generated: ${new Date().toLocaleString()}
Job: ${jobName}
Guide: ${guideName}
Report Writer: ${writerName}
Status: ${report.readinessStatus}
Material length: ${materialContent.length} characters

═══════════════════════════════════════════════════════════════

BOUNDARY DISCLAIMER
${BOUNDARY_DISCLAIMER}

═══════════════════════════════════════════════════════════════

TECHNICAL CLAIM OR QUESTION
${report.technicalClaimOrQuestion}

═══════════════════════════════════════════════════════════════

VISIBLE EVIDENCE
${report.visibleEvidence.map((item) => `✓ ${item}`).join('\\n')}

═══════════════════════════════════════════════════════════════

OPEN GAPS
${report.openGaps.map((item) => `◦ ${item}`).join('\\n')}

═══════════════════════════════════════════════════════════════

BURDEN / CONSTRAINTS / TIMING
${report.burdenConstraintsTiming.map((item) => `• ${item}`).join('\\n')}

═══════════════════════════════════════════════════════════════

HELD TENSIONS
${report.heldTensions.map((item) => `• ${item}`).join('\\n')}

═══════════════════════════════════════════════════════════════

PRIORITY EVIDENCE MOVE
${report.priorityEvidenceMove}

═══════════════════════════════════════════════════════════════

SHOULD NOT YET BE CLAIMED
${report.shouldNotYetBeClaimed.map((item) => `× ${item}`).join('\\n')}

═══════════════════════════════════════════════════════════════

NOTE
This is demo output from the frontend shell. It does not yet run the real Sorter engine, guides, behaviours, or report writer.
`;
}
