// ══════════════════════════════════════════════════════════
// SORTER CONSENT GATE  v0.1.0
//
// API boundary consent enforcement for web deployments.
//
// The spine trusts the caller. In a web deployment that is
// not sufficient. Consent for handover must be verified
// at the API boundary — before the spine sees the request.
//
// This module sits between the web layer and the spine.
// It blocks any handover-related execute() call where
// consent has not been explicitly confirmed.
//
// Usage:
//
//   const gate = SorterConsentGate.create({
//     getConsentState: async (userId) => { ... },  // your storage
//     onBlocked:       async (reason, ctx) => { ... }, // your logging
//   });
//
//   // In your API handler:
//   const result = await gate.execute(spine, options, { userId, requestType });
//
// The gate checks:
//   — Is this a handover request?
//   — Has this user explicitly consented to handover?
//   — Is the consent current (not expired, not revoked)?
//   If any check fails: block, log, return a clear reason.
//   The spine is never called for a blocked request.
//
// Consent state shape (your storage must return this):
//   {
//     granted:     boolean,
//     grantedAt:   ISO string | null,
//     expiresAt:   ISO string | null,
//     revokedAt:   ISO string | null,
//     scope:       string[] | null,  // e.g. ['case_worker', 'clinical']
//   }
// ══════════════════════════════════════════════════════════

const SorterConsentGate = (() => {


  // ── Request types that require consent ───────────────────

  const HANDOVER_REQUEST_TYPES = [
    'handover',
    'professional_handover',
    'case_worker_handover',
    'clinical_handover',
    'legal_handover',
    'peer_handover',
    'system_export',
  ];


  // ── Default blocked response ──────────────────────────────

  function _blockedResponse(reason, code) {
    return {
      blocked:    true,
      reason,
      code,
      map:        null,
      responses:  [],
      warnings:   [`Consent gate blocked this request: ${reason}`],
    };
  }


  // ── Consent state validation ──────────────────────────────

  function _validateConsentState(consentState, requestType, now) {
    if (!consentState) {
      return { valid: false, reason: 'No consent record found for this user.', code: 'NO_CONSENT_RECORD' };
    }

    if (!consentState.granted) {
      return { valid: false, reason: 'Handover consent has not been granted.', code: 'CONSENT_NOT_GRANTED' };
    }

    if (consentState.revokedAt) {
      const revokedAt = new Date(consentState.revokedAt);
      if (revokedAt <= now) {
        return { valid: false, reason: `Consent was revoked at ${consentState.revokedAt}.`, code: 'CONSENT_REVOKED' };
      }
    }

    if (consentState.expiresAt) {
      const expiresAt = new Date(consentState.expiresAt);
      if (expiresAt <= now) {
        return { valid: false, reason: `Consent expired at ${consentState.expiresAt}.`, code: 'CONSENT_EXPIRED' };
      }
    }

    // Scope check — if scope is defined, requestType must be in scope
    if (consentState.scope && Array.isArray(consentState.scope) && consentState.scope.length > 0) {
      if (!consentState.scope.includes(requestType)) {
        return {
          valid:  false,
          reason: `Consent was granted for [${consentState.scope.join(', ')}] but this request is "${requestType}".`,
          code:   'CONSENT_SCOPE_MISMATCH',
        };
      }
    }

    return { valid: true, reason: null, code: null };
  }


  // ── Gate factory ──────────────────────────────────────────

  function create(options = {}) {
    const getConsentState = options.getConsentState;
    const onBlocked       = options.onBlocked       || (() => {});
    const onAllowed       = options.onAllowed       || (() => {});

    if (!getConsentState || typeof getConsentState !== 'function') {
      throw new Error('SorterConsentGate.create() requires a getConsentState function.');
    }

    // ── execute() ────────────────────────────────────────────
    //
    // Wraps spine.execute(). Checks consent before calling.
    //
    // context: { userId, requestType, ... }
    // requestType: one of HANDOVER_REQUEST_TYPES or 'standard'
    //
    // If requestType is not a handover type, the gate passes
    // through without a consent check.

    async function execute(spine, spineOptions = {}, context = {}) {
      const { userId, requestType = 'standard' } = context;
      const now = new Date();

      // Non-handover requests pass through
      const requiresConsent = HANDOVER_REQUEST_TYPES.includes(requestType);

      if (!requiresConsent) {
        // Standard execute — no consent check needed
        try {
          return spine.execute(spineOptions);
        } catch (err) {
          return { blocked: false, error: err.message, map: null, responses: [], warnings: [err.message] };
        }
      }

      // Handover request — consent check required
      if (!userId) {
        const response = _blockedResponse('Handover request requires a userId for consent verification.', 'NO_USER_ID');
        await onBlocked(response.reason, { ...context, requestType });
        return response;
      }

      let consentState;
      try {
        consentState = await getConsentState(userId);
      } catch (err) {
        const response = _blockedResponse(`Consent state lookup failed: ${err.message}`, 'CONSENT_LOOKUP_ERROR');
        await onBlocked(response.reason, { ...context, requestType });
        return response;
      }

      const validation = _validateConsentState(consentState, requestType, now);

      if (!validation.valid) {
        const response = _blockedResponse(validation.reason, validation.code);
        await onBlocked(validation.reason, { userId, requestType, code: validation.code });
        return response;
      }

      // Consent confirmed — proceed
      await onAllowed({ userId, requestType, consentState });

      try {
        const result = spine.execute(spineOptions);
        return { ...result, blocked: false, consentVerified: true, consentGrantedAt: consentState.grantedAt };
      } catch (err) {
        return { blocked: false, error: err.message, map: null, responses: [], warnings: [err.message] };
      }
    }


    // ── checkConsent() ───────────────────────────────────────
    // Check consent state without executing.
    // Use to show the person their current consent state
    // or to gate UI elements.

    async function checkConsent(userId, requestType = 'handover') {
      if (!userId) return { valid: false, reason: 'No userId provided.', code: 'NO_USER_ID' };
      let consentState;
      try { consentState = await getConsentState(userId); }
      catch (err) { return { valid: false, reason: `Consent lookup failed: ${err.message}`, code: 'CONSENT_LOOKUP_ERROR' }; }
      return _validateConsentState(consentState, requestType, new Date());
    }


    return { execute, checkConsent, HANDOVER_REQUEST_TYPES };
  }


  // ── Consent record helpers ────────────────────────────────
  // Helper functions for building consent records in your storage.

  const helpers = {

    // Build a new consent grant record
    grantConsent({ scope = null, expiresInDays = null } = {}) {
      const now       = new Date();
      const expiresAt = expiresInDays ? new Date(now.getTime() + expiresInDays * 86400000).toISOString() : null;
      return {
        granted:   true,
        grantedAt: now.toISOString(),
        expiresAt,
        revokedAt: null,
        scope:     scope || null,
      };
    },

    // Build a consent revocation record
    revokeConsent(existingRecord = {}) {
      return {
        ...existingRecord,
        granted:   false,
        revokedAt: new Date().toISOString(),
      };
    },

    // Check if a consent record is currently valid (synchronous)
    isValid(consentState, requestType = 'handover') {
      const result = _validateConsentState(consentState, requestType, new Date());
      return result.valid;
    },

  };


  // ── Public API ────────────────────────────────────────────

  return {
    create,
    helpers,
    HANDOVER_REQUEST_TYPES,
  };

})();
