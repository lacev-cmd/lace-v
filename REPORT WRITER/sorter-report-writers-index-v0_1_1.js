// ══════════════════════════════════════════════════════════
// SORTER REPORT WRITERS INDEX  v0.1.1
//
// Registry for report writers.
// Keeps report selection separate from sorter behaviours,
// sector guides, output guides, and runtime routing.
//
// Writers consume a completed map and return a report object.
// Writers do not mutate map state.
//
// Patch over v0.1.0
// — Added SorterReportWriterHorizon to registerDefaults()
// — Added writeHorizon() convenience method
// ══════════════════════════════════════════════════════════

const SorterReportWriters = (() => {

  const VERSION = '0.1.1';

  const _writers = {};

  function register(writer) {
    if (!writer || !writer.WRITER_ID || typeof writer.write !== 'function') {
      throw new Error('Report writer must expose WRITER_ID and write(map, options).');
    }

    _writers[writer.WRITER_ID] = writer;
    return SorterReportWriters;
  }

  function registerDefaults() {
    const defaults = [
      typeof SorterReportWriterPersonalMap         !== 'undefined' ? SorterReportWriterPersonalMap         : null,
      typeof SorterReportWriterProfessionalHandover !== 'undefined' ? SorterReportWriterProfessionalHandover : null,
      typeof SorterReportWriterCaseWorker          !== 'undefined' ? SorterReportWriterCaseWorker          : null,
      typeof SorterReportWriterLegalPrep           !== 'undefined' ? SorterReportWriterLegalPrep           : null,
      typeof SorterReportWriterProgressArc         !== 'undefined' ? SorterReportWriterProgressArc         : null,
      typeof SorterReportWriterGovernanceAudit     !== 'undefined' ? SorterReportWriterGovernanceAudit     : null,
      typeof SorterReportWriterHorizon             !== 'undefined' ? SorterReportWriterHorizon             : null,
    ].filter(Boolean);

    defaults.forEach(register);
    return SorterReportWriters;
  }

  function list() {
    return Object.values(_writers).map(writer => ({
      writerId: writer.WRITER_ID,
      version: writer.VERSION || null,
    }));
  }

  function get(writerId) {
    return _writers[writerId] || null;
  }

  function write(writerId, mapOrResult, options = {}) {
    const writer = get(writerId);

    if (!writer) {
      throw new Error(`Unknown report writer: ${writerId}`);
    }

    return writer.write(mapOrResult, options);
  }

  function writePersonalMap(map, options = {}) {
    return write('report-writer-personal-map', map, options);
  }

  function writeProfessionalHandover(map, options = {}) {
    return write('report-writer-professional-handover', map, options);
  }

  function writeCaseWorker(map, options = {}) {
    return write('report-writer-case-worker', map, options);
  }

  function writeLegalPrep(map, options = {}) {
    return write('report-writer-legal-prep', map, options);
  }

  function writeProgressArc(map, options = {}) {
    return write('report-writer-progress-arc', map, options);
  }

  function writeGovernanceAudit(resultOrMap, options = {}) {
    return write('report-writer-governance-audit', resultOrMap, options);
  }

  function writeHorizon(map, options = {}) {
    return write('report-writer-horizon', map, options);
  }

  return {
    VERSION,
    register,
    registerDefaults,
    list,
    get,
    write,
    writePersonalMap,
    writeProfessionalHandover,
    writeCaseWorker,
    writeLegalPrep,
    writeProgressArc,
    writeGovernanceAudit,
    writeHorizon,
  };

})();

// Register defaults automatically if files have been loaded.
if (typeof SorterReportWriters !== 'undefined') {
  try {
    SorterReportWriters.registerDefaults();
  } catch (err) {
    // Safe no-op. Caller can register manually.
  }
}
