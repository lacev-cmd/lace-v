// ══════════════════════════════════════════════════════════
// SORTER GUIDE — S.T.E.M. Robotics  v0.1.0
//
// Optional second-ring S.T.E.M. sub-guide.
// Parent: guide-stem-base
//
// Attach order:
//   1. SorterSpine.attachGuide(GuideSTEMBase);
//   2. SorterSpine.attachGuide(GuideSTEMRobotics);
//
// Role:
//   Steer STEM reads toward robotic asset admissibility,
//   hidden burden, false recovery, next-shift readiness,
//   burden-observer logic, degraded-mode governance,
//   telemetry evidence, and production-cell exposure.
//
// Boundary:
//   This guide does not certify robot safety.
//   It does not replace OEM diagnostics, safety systems,
//   maintenance engineering, qualified engineering judgement,
//   risk assessment, or statutory compliance.
//   It helps structure the read.
// ══════════════════════════════════════════════════════════

const GuideSTEMRobotics = {

  id:      'guide-stem-robotics',
  version: '0.1.0',
  type:    'subsector',
  parent:  'guide-stem-base',
  sector:  'stem-robotics',

  purpose:
    'Extend the S.T.E.M. base guide for robotic systems — especially industrial robots, field robots, autonomous assets, production cells, and hard-worked machines where visible operation may hide accumulated burden, false recovery, degraded-mode exposure, or next-duty inadmissibility.',

  sectorNotes: {

    distinctivePressures: [
      'Robot appears operational while hidden burden is accumulating.',
      'Fault clears or robot resets, but burden state may not have recovered.',
      'Production pressure encourages continued operation past prudent bounds.',
      'Telemetry exists but is fragmented, noisy, or action-neutral.',
      'Maintenance logs, reset history, protective-stop history, or operator notes are not connected into one burden picture.',
      'Robot may complete the current cycle but be inadmissible for the next shift or next mission.',
      'A single asset failure may cascade through the production cell, fleet task, mission, or integrated process.',
      'Degraded mode is available but not governed clearly.',
      'Surface health is confused with production trustworthiness.',
      'A burden observer or telemetry layer is treated as more certain than its calibration supports.',
    ],

    distinctiveMovement: [
      'Hidden burden source is named.',
      'Reset or recovery event is tested against burden state, not surface state only.',
      'Next-duty envelope is defined.',
      'Telemetry signals are mapped to burden classes.',
      'Evidence is separated into logs, telemetry, maintenance records, inspection records, operator notes, and validated thresholds.',
      'Degraded-mode option is named: continue, restrict, derate, inspect, recover, withdraw, or stop.',
      'False recovery risk is made visible.',
      'Production-cell or mission exposure is named.',
      'Confidence is withheld where burden evidence is thin.',
      'Return-to-service basis is stated.',
    ],

    distinctiveGaps: [
      'Current duty envelope not defined.',
      'Reset/fault/protective-stop history not described.',
      'Telemetry sources not identified.',
      'Burden proxies not mapped to actual burden classes.',
      'Maintenance or inspection history missing.',
      'No distinction between visible recovery and true burden recovery.',
      'No degraded-mode rule visible.',
      'No next-shift, next-duty, or next-mission admissibility question stated.',
      'Integration exposure outside the robot itself not described.',
      'Qualified engineering or safety boundary not stated.',
    ],

    outputAudience:
      'Robotics engineer, maintenance team, production manager, autonomy team, asset owner, reliability reviewer, integrator, insurer, or technical governance reviewer.',

    outputRegister:
      'Operationally precise. Evidence-bound. Asset-focused. No safety certification language. No false assurance from green status, reset, or dashboard health.',
  },


  // ── Gaps ─────────────────────────────────────────────────

  gaps: [
    {
      key:  'robot_asset_identity',
      name: 'Robot or robotic asset identity',
      rx:   /\b(robot|robotic asset|arm|cobot|UGV|AMR|AGV|drone|autonomous asset|production robot|field robot|cell|fleet unit|machine)\b/i,
      reason:
        'The map needs to know what asset is being assessed. Robot class, role, and operating context affect which burden signals matter.',
    },
    {
      key:  'duty_envelope',
      name: 'Duty envelope',
      rx:   /\b(duty envelope|next shift|mission|cycle|payload|speed|runtime|task class|production duty|operating envelope|work envelope|duty cycle|assigned role)\b/i,
      reason:
        'A robot may be admissible for one duty but not another. Next-shift or next-mission readiness cannot be read without the intended duty envelope.',
    },
    {
      key:  'visible_state',
      name: 'Visible state',
      rx:   /\b(green|running|operational|fault cleared|reset|dashboard|status|cycle completed|online|nominal|passed|healthy|available)\b/i,
      reason:
        'Visible state is useful but incomplete. The map must distinguish surface operation from hidden burden and true recovery.',
    },
    {
      key:  'reset_or_fault_history',
      name: 'Reset, fault, or protective-stop history',
      rx:   /\b(reset|fault|alarm|protective stop|stop event|cleared|restarted|fault code|error code|trip|shutdown|interlock|restart history)\b/i,
      reason:
        'Repeated faults, resets, or protective stops can indicate accumulating burden even when the robot returns to green status.',
    },
    {
      key:  'telemetry_sources',
      name: 'Telemetry sources',
      rx:   /\b(telemetry|temperature|current|vibration|motor load|actuator load|battery|voltage|torque|encoder|positioning|repeatability|cycle time|sensor data|controller data)\b/i,
      reason:
        'Robotic burden is usually inferred from telemetry proxies. The map needs to know what signals exist before it can read burden quality.',
    },
    {
      key:  'burden_classes',
      name: 'Burden classes',
      rx:   /\b(thermal|heat|vibration|fatigue|wear|gearbox|bearing|lubrication|seal|cable|joint|actuator|electrical strain|battery strain|contamination|drift|roughness|repeatability decay)\b/i,
      reason:
        'Hidden burden must be classified. A generic statement that the robot is under stress is weaker than naming the burden class.',
    },
    {
      key:  'burden_persistence',
      name: 'Burden persistence over time',
      rx:   /\b(trend|over time|persistent|recurring|accumulating|not recovering|keeps happening|again|repeat|history|pattern|cumulative|non-recovering)\b/i,
      reason:
        'Temporary stress and accumulating damage are different reads. Persistence determines whether the burden is a passing event or a deteriorating state.',
    },
    {
      key:  'recovery_basis',
      name: 'Recovery or return-to-service basis',
      rx:   /\b(return to service|recovered|cooldown|after reset|after maintenance|released back|cleared to run|restarted|back online|safe to resume|ready for next shift)\b/i,
      reason:
        'The map needs the basis for recovery. A fault clearing is not the same as evidence that burden has been relieved.',
    },
    {
      key:  'degraded_mode_options',
      name: 'Degraded-mode options',
      rx:   /\b(derate|slow down|reduced speed|reduced payload|restrict|inspect before|supervision|re-task|recover|withdraw|remove from service|safe stop|continue with restriction)\b/i,
      reason:
        'Robots often have states between normal operation and failure. Degraded-mode options must be visible before the map can support bounded continuation.',
    },
    {
      key:  'integration_exposure',
      name: 'Integration or production-cell exposure',
      rx:   /\b(cell|fixture|end effector|guarding|upstream|downstream|line|production capability|throughput|quality tolerance|recommissioning|integrator|fleet|mission continuity|cascade)\b/i,
      reason:
        'The exposed asset is often not just the robot. The integrated cell, line, fleet, or mission may carry the real commercial consequence.',
    },
    {
      key:  'qualified_boundary',
      name: 'Qualified engineering or safety boundary',
      rx:   /\b(safety system|risk assessment|OEM|qualified engineer|maintenance authority|safety certification|statutory|compliance|lockout|functional safety|professional judgement)\b/i,
      reason:
        'Robotics outputs must not imply safety approval or engineering sign-off. Qualified authority boundaries must remain visible.',
    },
    {
      key:  'direction',
      name: 'Stated robotics question',
      rx:   /\b(is it fit|can it run|next shift|should we run|should we stop|ready for|trustworthy|admissible|continue|derate|inspect|withdraw|what should happen before)\b/i,
      reason:
        'The map needs the actual robotics decision question: current cycle, next shift, next mission, maintenance timing, derating, or withdrawal.',
    },
  ],


  // ── Skills / Capabilities visible in material ─────────────

  skills: [
    {
      key:              'burden_observation',
      name:             'Observing hidden burden',
      rx:               /\b(temperature trend|vibration trend|current ripple|motor load|actuator lag|battery stress|thermal behaviour|repeatability drift|cycle-time instability|telemetry showed|burden estimate)\b/i,
      loadSensitive:    true,
      isStructureSkill: true,
      works:
        'Telemetry or logs are used to infer hidden burden rather than relying on dashboard state alone.',
      breaks:
        'Telemetry is present but treated as disconnected readings. No burden picture emerges.',
    },
    {
      key:              'false_recovery_checking',
      name:             'Checking for false recovery',
      rx:               /\b(false recovery|after reset|fault cleared but|cooled down but|green again but|still elevated|not truly recovered|burden remained|reset did not|status improved but)\b/i,
      loadSensitive:    true,
      isStructureSkill: true,
      works:
        'Recovery is tested by comparing visible state with burden state after reset, cooldown, maintenance, or restart.',
      breaks:
        'The robot is recommitted because status returned to green, without checking whether burden actually reduced.',
    },
    {
      key:              'degraded_mode_governance',
      name:             'Governing degraded mode',
      rx:               /\b(derated|reduced speed|restricted payload|restricted task|inspect before next shift|continue with restriction|safe stop|withdrawn|re-tasked|supervised operation)\b/i,
      loadSensitive:    true,
      isStructureSkill: true,
      works:
        'The robot remains useful without pretending it is fresh. Restrictions are stated and tied to the burden picture.',
      breaks:
        'The robot is treated as either fully healthy or failed, with no honest middle state.',
    },
    {
      key:              'return_late',
      name:             'Returning cautiously after recovery',
      rx:               /\b(return cautiously|resume late|not immediately full load|gradual return|monitored restart|reduced demand after|post-recovery|step back up|avoid maximum demand)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:
        'The robot is brought back gradually after recovery rather than immediately returning to maximum demand.',
      breaks:
        'The robot returns to full duty immediately after a visible recovery event, creating repeated burden spikes.',
    },
    {
      key:              'integration_risk_visibility',
      name:             'Making integration exposure visible',
      rx:               /\b(production cell|line stoppage|upstream|downstream|end effector|fixture|quality drift|recommissioning|throughput loss|mission loss|fleet impact)\b/i,
      loadSensitive:    false,
      isStructureSkill: false,
      works:
        'The review sees the robot as part of an integrated production or mission system, not an isolated machine.',
      breaks:
        'The assessment treats the robot alone as the whole risk, missing the surrounding production or mission exposure.',
    },
    {
      key:              'withholding_robot_confidence',
      name:             'Withholding robot confidence where evidence is thin',
      rx:               /\b(grey|insufficient evidence|not enough telemetry|cannot say|confidence withheld|not admissible|provisional|conditional|needs inspection|needs data)\b/i,
      loadSensitive:    false,
      isStructureSkill: true,
      works:
        'The reviewer refuses to give a confident readiness status where the telemetry, logs, or inspection evidence is thin.',
      breaks:
        'The robot receives a readiness conclusion because the operation wants one, not because the evidence can support it.',
    },
  ],


  // ── Contradictions / Tensions ─────────────────────────────

  contradictions: [
    {
      a: /\b(green|healthy|operational|running|available|fault cleared|reset|back online|cycle completed|status normal)\b/i,
      b: /\b(thermal|vibration|wear|fatigue|drift|burden|strain|repeat fault|protective stop|repeatability decay|gearbox|bearing|actuator)\b/i,
      text:
        'Visible robot health and hidden burden both appear. The robot may be operational while becoming less admissible for the next duty envelope.',
    },
    {
      a: /\b(reset fixed it|fault cleared|restarted|cooled down|back to normal|green again|returned to service)\b/i,
      b: /\b(same fault|again|recurring|still elevated|not recovered|burden remained|repeat|keeps happening|false recovery|trend continues)\b/i,
      text:
        'Visible recovery and persistent burden both appear. A reset or cooldown may have cleared the fault state without clearing the burden state.',
    },
    {
      a: /\b(need production|must keep running|cannot stop|throughput|deadline|shift target|mission must continue|availability pressure)\b/i,
      b: /\b(inspect|derate|withdraw|maintenance|safe stop|not admissible|burden|risk|degraded|next shift)\b/i,
      text:
        'Production pressure and burden-aware restriction both appear. The map must not let output pressure erase the technical readiness question.',
    },
    {
      a: /\b(same model|same robot|same platform|same cell|same task|historically fine|always run this way)\b/i,
      b: /\b(new payload|changed duty|different end effector|new environment|firmware change|increased speed|longer runtime|aging|maintenance deferred)\b/i,
      text:
        'Historical confidence and changed operating conditions both appear. Prior safe operation may not carry the new duty envelope without reconciliation.',
    },
    {
      a: /\b(telemetry shows|sensor says|dashboard shows|data indicates|burden estimate)\b/i,
      b: /\b(no calibration|uncertain|no baseline|no validation|no threshold|unknown accuracy|proxy|no ground truth)\b/i,
      text:
        'Telemetry-based confidence and calibration uncertainty both appear. A burden observer is only as strong as the proxy, baseline, calibration, and action threshold behind it.',
    },
  ],


  // ── Direction patterns ────────────────────────────────────

  directionPatterns: [
    {
      rx: /next shift|shift readiness|production shift|next duty/i,
      label: 'toward next-shift admissibility',
    },
    {
      rx: /mission|field robot|remote|recover|withdraw|re-task/i,
      label: 'toward mission survivability',
    },
    {
      rx: /derate|reduced speed|reduced payload|restriction|degraded mode/i,
      label: 'toward degraded-mode governance',
    },
    {
      rx: /telemetry|sensor|observer|estimate|burden state/i,
      label: 'toward burden-observer review',
    },
    {
      rx: /maintenance|inspect|service|repair|replace|condition monitoring/i,
      label: 'toward maintenance or reliability decision',
    },
    {
      rx: /cell|line|throughput|quality|fixture|end effector|integrator/i,
      label: 'toward production-cell exposure review',
    },
  ],


  // ── Steer blocks ──────────────────────────────────────────

  steer: {

    'open-gap-discipline': {
      priorityGaps: [
        'robot_asset_identity',
        'direction',
        'duty_envelope',
        'visible_state',
        'reset_or_fault_history',
        'telemetry_sources',
        'burden_classes',
        'burden_persistence',
        'recovery_basis',
        'degraded_mode_options',
        'integration_exposure',
        'qualified_boundary',
      ],
      absenceRules: {
        noGreenStatusShortcut:
          'Green status, fault cleared, or successful cycle completion does not close the burden gap.',
        recoveryNeedsBasis:
          'Recovery must be tied to burden relief, inspection, telemetry trend, or qualified release — not reset alone.',
        noSafetyCertification:
          'Do not phrase output as safety certification, functional safety approval, OEM approval, or qualified engineering sign-off.',
      },
    },

    'confidence-calibration': {
      sectorNote:
        'Robotics confidence attaches to a bounded duty envelope. A robot may be supported for current restricted use, partial for next-shift use, and not_readable for full production duty. Do not collapse these into one general health conclusion.',
      confidenceTiers: [
        {
          key: 'not_readable',
          desc: 'Robot identity, duty envelope, or evidence base is missing.',
        },
        {
          key: 'inferred',
          desc: 'Burden or false recovery is suggested but not directly evidenced.',
        },
        {
          key: 'thin',
          desc: 'One or two burden signals appear without trend, calibration, or maintenance context.',
        },
        {
          key: 'partial',
          desc: 'Some logs, telemetry, or duty context are visible but important gaps remain.',
        },
        {
          key: 'supported',
          desc: 'Duty envelope, burden signals, recovery basis, and degraded-mode options are sufficiently mapped for bounded review.',
        },
        {
          key: 'strong',
          desc: 'Multiple evidence streams support the bounded readiness conclusion across the relevant period.',
        },
      ],
    },

    'external-constraint-reading': {
      defaultConstraintRx: /\b(production target|shift target|downtime|maintenance window|OEM|safety system|lockout|qualified engineer|integrator|spare parts|mission deadline|remote recovery|line stoppage|inspection window)\b/i,
      constraintTypes: [
        {
          key: 'production_pressure',
          label: 'Production or mission pressure',
          rx: /\b(production target|shift target|throughput|mission must continue|availability|cannot stop|line must run|deadline)\b/i,
          changeable: false,
        },
        {
          key: 'maintenance_access',
          label: 'Maintenance or inspection access constraint',
          rx: /\b(maintenance window|inspection window|no spare|waiting for technician|OEM visit|cannot inspect|parts unavailable)\b/i,
          changeable: true,
        },
        {
          key: 'safety_authority',
          label: 'Safety or qualified authority boundary',
          rx: /\b(safety system|functional safety|risk assessment|qualified engineer|OEM|lockout|statutory|compliance|certification)\b/i,
          changeable: false,
        },
        {
          key: 'recovery_constraint',
          label: 'Recovery or retrieval constraint',
          rx: /\b(remote|cannot retrieve|field robot|recovery difficult|mission location|no access|hard to recover|sparse asset)\b/i,
          changeable: false,
        },
      ],
    },

    'load-sensitive-capability': {
      defaultLoadSignals: [
        {
          key: 'thermal_burden',
          rx: /\b(temperature|thermal|overheat|heat|cooldown|thermal aging|thermal load|hot)\b/i,
        },
        {
          key: 'mechanical_burden',
          rx: /\b(vibration|bearing|gearbox|lubrication|seal|joint|actuator|torque|mechanical wear|roughness)\b/i,
        },
        {
          key: 'electrical_burden',
          rx: /\b(current|voltage|ripple|drive fault|electrical strain|battery stress|power draw|motor current)\b/i,
        },
        {
          key: 'control_or_position_burden',
          rx: /\b(positioning drift|repeatability|cycle-time instability|encoder|calibration drift|control anomaly|lag)\b/i,
        },
        {
          key: 'environmental_burden',
          rx: /\b(contamination|dust|water ingress|heat environment|dirty|abrasive|mud|corrosion|humidity)\b/i,
        },
        {
          key: 'false_recovery',
          rx: /\b(reset|fault cleared|green again|back online|cooled down|returned to normal|false recovery)\b/i,
        },
      ],
      sectorNote:
        'Robotics burden should be read as classed and persistent where possible: thermal, mechanical, electrical, control/positioning, environmental, or false recovery.',
    },

    'movement-non-movement-reading': {
      movementEvidence: [
        'Robot duty envelope defined.',
        'Reset or fault history reviewed.',
        'Telemetry source identified.',
        'Burden class named.',
        'Burden trend checked over time.',
        'Recovery basis stated.',
        'Degraded-mode option selected.',
        'Integration exposure named.',
        'Qualified boundary stated.',
        'Confidence withheld where evidence is thin.',
      ],
      defaultActionRx: /\b(defined|reviewed|checked|inspected|derated|restricted|withdrew|stopped|re-tasked|mapped|estimated|trended|calibrated|validated|documented|monitored)\b/i,
      defaultStuckRx: /\b(still running it|same fault|keeps happening|no inspection|not checked|not reviewed|no telemetry|no trend|unknown burden|reset again|still unclear)\b/i,
    },

    'contradiction-holding': {
      outputRules: {
        holdSurfaceAndBurden:
          'Hold visible operation and hidden burden together. Do not let either erase the other.',
        faultStateNotBurdenState:
          'A cleared fault state is not proof of cleared burden state.',
        dutyEnvelopeSpecific:
          'Readiness must be tied to a specific duty envelope. Avoid general “robot is safe/unsafe” conclusions.',
      },
    },

    'next-useful-move': {
      outputShape: {
        move:
          'One bounded robotics next move: define duty envelope, inspect a burden source, review reset history, map telemetry to burden, or clarify degraded-mode authority.',
        rationale:
          'State why this move changes the admissibility read. Do not produce a full maintenance plan unless asked.',
      },
    },

    'state-change-detection': {
      minimumSeparationDays: 7,
      watchFor: [
        'Fault recurrence increasing.',
        'Robot returning to service without burden recovery evidence.',
        'Telemetry trend shifting from transient to persistent burden.',
        'Duty envelope expanded after historical validation.',
        'Degraded-mode restriction removed without evidence.',
        'Maintenance deferral becoming normal operation.',
      ],
    },

    'connections-across-time': {
      minimumSeparationDays: 7,
      watchPatterns: [
        'same fault after reset',
        'thermal burden recurring after cooldown',
        'protective stop recurrence',
        'cycle-time instability trend',
        'repeatability drift over multiple shifts',
        'maintenance deferral plus production pressure',
        'green status plus persistent burden signal',
      ],
    },

    'meta-reading': {
      performanceSignals: [
        {
          key: 'green_status_confidence',
          rx: /\b(green|healthy|fault cleared|dashboard says|status normal|back online|reset fixed it)\b/i,
        },
        {
          key: 'production_pressure_language',
          rx: /\b(need it running|cannot stop|must keep going|production target|shift target|availability)\b/i,
        },
      ],
      honestySignals: [
        {
          key: 'burden_honesty',
          rx: /\b(still worried|not sure it recovered|same fault again|we have not inspected|burden may remain|green but|running but)\b/i,
        },
        {
          key: 'bounded_readiness',
          rx: /\b(admissible with restrictions|not enough evidence|inspect before next shift|derate until|conditional on|only for reduced duty)\b/i,
        },
      ],
      sectorNote:
        'In robotics, confidence often inflates around green dashboards, fault clearing, and production pressure. The map should prefer burden evidence over surface reassurance.',
    },

  },

};