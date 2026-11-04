# Relay Link V2.4 validation plan

Date: November 4, 2026  
Scope: Documentation verification now; executable product validation only after explicit implementation authorization.

**Product results: NOT RUN.** There is no application, prototype, active phone/game session, controller driver or authorized implementation environment. The cases below are acceptance procedures, not passing evidence. Required real-world validation cannot be replaced with mocks or a written test plan.

## Three separate gate levels

| Gate | Before work | Actual completion evidence |
|---|---|---|
| Each implementation | Intended behavior, affected flows, risk, acceptance conditions, targeted smoke and applicable quality/regression checks | Codex personally executes feasible checks, inspects output, fixes failures and reruns; exact commands/procedures, build/environment, observed PASS/FAIL and evidence; blocked prerequisites/impact/next action; overall PASS/CONDITIONAL/BLOCKED |
| Each phase | Integrate the original phase checklist and this edition's added gates | Broader smoke/regression, security/accessibility/performance, representative/clean checkout/install where relevant, docs and required verified remote checkpoint during authorized setup |
| Each release | Select declared supported builds/devices/titles/routes and release approval | Real-device/game/driver compatibility, installer/upgrade/repair/rollback/uninstall, relevant full regression, security and public claim audit |

PASS requires every applicable mandatory check actually to run and pass with no critical regression. CONDITIONAL is incomplete evidence, not full verification. BLOCKED applies when a mandatory failed/unavailable check prevents completion. Do not proceed into dependent work without identifying risk and appropriate approval. No branch/tag per small implementation; stable checkpoints only for verified significant milestones.

## Environment, fixtures and evidence

During Phase 0 inventory actual available lower-end/mainstream/high-end Windows/Android pairs, exact builds/lifecycle/security configurations, CPU/GPU/RAM, display/DPI/refresh/sensors, power mode, network/adapters/VPN and tool versions. Do not invent device ownership or minimum support. Provisional budgets/methods are centralized in master §22; record every approved revision rather than changing a test threshold silently.

Use reusable test fixtures for schema, permission, epoch/revision, duplicate/in-flight ID, timeout, ownership, slot, profile/migration and EGD scheduler/interlock. These can validate logic; they do not prove OS/game effects. Keep future suites and manual checklists in the original organized testing workspace. No product test suite is created or executed by this document.

Each product result records: test ID, date/executor, build/commit, host/phone/OS, game version/platform, profile/mode/schema, route/slot/session epoch, exact commands/actions, conditions/injected fault, expected/observed result, relevant timings, logs/video and limitations. Separate host dispatch/input-API result, actual released game input, menu display and actual paused simulation. Preserve redacted evidence; do not log typed text/keys/private payloads.

## Security and architecture cases

| ID | Procedure after implementation | Expected result / gate |
|---|---|---|
| SEC-01 | Invoke undeclared/forbidden harmless app commands from each actual webview; try overlapping/wildcard grants and a remote origin | Explicit application-command manifest/permissions reject improper access; no route-only isolation claim; Phase 0 fixtures then Phase 2 runtime policy |
| SEC-02 | Pair via QR and manual/code flow; substitute host identity, stale challenge or incorrect comparison | No silent trust or pin replacement; explicit recovery; Phase 1/2 |
| SEC-03 | Copy bearer token without device private key; replay old epoch/sequence; revoke mid-session | No control authority; owned input released; Phase 2 |
| SEC-04 | Race identical IDs over HTTP/WebSocket, including in-flight duplicate and restart-after-apply uncertainty | At most one valid operation under defined dedupe bounds; unknown outcome not unsafe retry; Phase 2 |
| SEC-05 | Request unauthorized capability via LAN, local UI and fallback; forge client-only confirmation success | Native host policy rejects; sensitive approval is session/action/target-bound; Phases 2/5 |
| SEC-06 | Import future/oversized/malicious Deck/profile, hidden script or capability grant | Reject unsafe content; no automatic trust/script enablement; Phases 7–10 |
| SEC-07 | Attempt allowlist escape through traversal/reparse-point/race; interrupt file resume/overwrite | No unauthorized path; integrity/cleanup/privacy/conflict policy holds; Phase 6 |
| SEC-08 | Concurrent profile edits, revoked trust during sync, failed schema upgrade/downgrade | Explicit conflict and recoverable safe state; no authority/held-state restoration; Phases 2/7–10 |

## Emergency Gaming Disconnect Protection mandatory matrix

All cases are **NOT RUN — planning-only**. Codex must create maintainable executable smoke/regression checks and perform feasible live workflows when authorized. Tests requiring real games/drivers/devices must run there before the relevant supported-route gate passes. Test doubles establish only logic. Each case checks scoped release, duplicate count, unrelated-session effects and fresh-auth/no-resume in addition to the specific observations below.

Before running: configure the game/profile, verified target process instance and route/slot, one pause action or Off, owned-input tracing, a controlled interruption mechanism, and observable game recording. Run the core cases on mapper routes in Phase 8, controller routes in Phase 9, and repeat newly applicable advanced cases in Phase 10. A feature cannot be called complete before its applicable safety cases pass.

| ID | Required scenario / exact smoke procedure | Required observations | First gate / extensions |
|---|---|---|---|
| EGD-T01 | Hold Drive Control acceleration, then cause silent network loss and separately authoritative transport failure | Cruise/manual throttle canceled, owned accelerator released within approved budget, release begins before pause; no retained output on fresh connection | 8; controller 9; analog/tilt 10 |
| EGD-T02 | Hold Wheel steering, then disconnect; repeat calibrated Tilt when available | Owned steering neutral, no sensor queue replay or steering after re-arm without fresh input | 8/9; motion 10 |
| EGD-T03 | Hold Fire in an eligible shooter; remove active gaming connection | No stuck fire; single allowed pause attempt or safe skip; no new action reaches other app | 8/9; advanced HUD 10 |
| EGD-T04 | Hold movement key/stick and modifiers, then disconnect | Release only lost session's contributions; unrelated physical/phone contribution is not indiscriminately cleared | 8/9; shared-session isolation 10 |
| EGD-T05 | Explicitly enable eligible Cruise, lose connection, reconnect and re-arm | Cruise/acceleration off after loss and remain off; no automatic game resume; only new deliberate input acts | 10; regression core no-resume from 8 |
| EGD-T06 | Switch activity/profile/controller mode while holding input; trigger loss before/during/after revision change | Old-mode state rejected; no duplicate loss episode, leaked hold or pause into new PC Controls session | 8/9; advanced modes 10 |
| EGD-T07 | Repeat rapid loss/reconnect attempts, duplicate callbacks and idle fresh-auth connections; then explicit fresh re-arm | One pause-dispatch right per eligible loss; new sockets alone do not reset latch; paused/unknown interlock prevents toggle-resume; no old-epoch input | 8–10 |
| EGD-T08 | Configure Esc for an eligible safely targetable title; disconnect while active and record simulation | At most one press+release; record attempted/API/menu/observed pause separately; only claim actual pause if observed. If route cannot safely target, record skip/disabled rather than falsely pass dispatch | 8; all supported Esc routes |
| EGD-T09 | Configure Start/Menu and a separate custom supported discrete action in eligible titles; lose connection | Exactly one selected action with matching release; no hidden sequence or fallback Esc; real route/slot evidence | 9 for controller; custom mapper 8 |
| EGD-T10 | Configure Off/unsupported pause and test an online title where menu does not stop simulation | Input still released; no pause action when disabled; notification never claims gameplay paused; honest limitations | 8–10 |
| EGD-T11 | Connect phones A/B controlling distinct mapped sessions/slots; lose A while B is active | Only A-owned input released; no A pause targets B/application; B state unaffected. Refuse unsupported shared keyboard/mouse modes rather than fabricate isolation | 8 ownership fixtures; live slots 9/10 |
| EGD-T12 | End intentionally via authenticated disconnect; compare abrupt loss, unreceived intent race, short gap below expiry, gap above expiry but below confirmation and confirmed loss | Intentional end releases without emergency pause by default; short gaps do not spam pause; safety-expired recovered gap needs new auth/re-arm; ambiguous case handled conservatively | 8–10 |
| EGD-T13 | Alt+Tab/switch PC Controls/close game/reuse process ID or change foreground immediately before pause dispatch | No pause to unrelated app; original process/session binding enforced. Race-focused test must show target-addressed guarantee or automatic pause stays disabled for global injection | 8/9; all affected routes |
| EGD-T14 | Deliver duplicate/out-of-order watchdog/socket callbacks and retry-safe HTTP fallback events for one loss | Atomic consume-before-dispatch, no pause retry on unknown result, no second Esc; fallback does not bypass EGD latch | 8/9 |
| EGD-T15 | Stall/fail pause route or lose its acknowledgement; inject a release scheduling failure separately | Pause cannot block release; no pause retry; report failed/unknown release honestly. Mandatory release failure blocks supported route completion | 8/9 |
| EGD-T16 | Terminate host while input held; restart with pending/unknown loss history | Independent driver/input fail-safe neutralizes; no startup pause replay or old trust/held restoration; host-crash inability to pause is disclosed | 8 mapper where feasible; driver 9 |
| EGD-T17 | Revoke controller/keyboard permission during loss handling; send input with old session key after reconnection | Owned cleanup still occurs; pause requiring revoked authority skipped; new input requires current grant and fresh auth | 8/9 |
| EGD-T18 | Two phones in the same game lose connection near-simultaneously; repeat without shared-game pause consent | Coalesced game interlock prevents toggle pair; pause only with explicit shared policy; other sessions unaffected | 10 |
| EGD-T19 | Delay Mobile feedback, reconnect repeatedly, then authenticate and retrieve host loss result | Honest requested/confirmed/unknown release and pause status; one meaningful episode notification, no fictitious successful pause/recovery | 8–10 |
| EGD-T20 | Block UI thread/decorative work and saturate transfer queue during input expiry/loss; repeat lower-end/battery-saving conditions | Independent prioritized watchdog/release meets approved timing; pause/loss classification cannot delay release; record actual scheduling and observed state | 8/9; lower-end regression 10 |

### Required timing/count evidence

Capture last valid active frame, last liveness evidence, fault detection, release initiation/dispatch, observed neutral, loss confirmation, episode consume, pause dispatch/matching release and fresh authentication/re-arm. Use a monotonic host clock for host intervals and a validated method for cross-device/observable effects. Provisional release ceiling is 250 ms from last valid active input; confirmation is 750 ms from last valid session liveness or authoritative failure sooner. Timings remain proposals, not passing measurements.

Count pause actions by loss episode and target game session, including the shared-game interlock. A press plus matching release counts as one logical action. No safe-target proof means no dispatch; verify skip and isolation. A dispatch with unknown result consumes the attempt and does not retry. No game pause, Cruise, throttle or held state resumes automatically after reconnection.

### Exact follow-up for unavailable prerequisites

When a mandatory case cannot run, record **NOT RUN / BLOCKED**, the missing build/device/game/driver/network capability, affected route/feature and exact next executor action. Supply the selected build/profile, host/phone versions, row ID/actions, approved budget, expected outcome and evidence path. Codex must still run all feasible checks itself; an owner-run device recording cannot be invented or relabeled as Codex execution. Do not call the affected feature complete until mandatory evidence is supplied and reviewed.

## Broader functionality, UI and performance regression

At relevant phases verify phone-only normal PC journey, touchpad/modifier/drag release, media/apps/windows/state agreement, dangerous action confirmation, clipboard/files/presentation, Deck import and permissions. Gaming repeats launch/control/PC Controls return/quit, simultaneous touch, saved customization, reverse/analog/digital/hybrid limitations and all template families on eligible titles. Proposed breadth: two distinct titles per broad family where practical, including older/unlisted/custom cases; this sampling never establishes category-wide compatibility.

Drive comparisons counterbalance straight/curve order across hand preference/sizes, phone/case and Tilt/Wheel, recording 15-minute comfort/regrips/fatigue/misactivation. Observe actual brake/reverse semantics with and without reliable telemetry; unsafe combined bindings are disabled/limited. Phase 10 tests aid enable/override/cancel and competitive exclusions.

Apply master §22's tier/method/budget table: acknowledge versus observed input, release/classification, achieved rates, frame trace, CPU/RAM/GPU/network, game FPS comparison, matched battery/thermal, reconnect and endurance. Record p50/p95/p99 where appropriate, conditions and deviations. Review supported exact builds and current driver distribution/security policy, clean install/repair/update/rollback/removal and absence of orphaned services/drivers/firewall rules. No such product result exists today.

Visual/accessibility review includes side-by-side Desktop/Mobile state boards, scaling, keyboard/screen reader, high contrast/reduced motion, non-color states, safe target sizes, three letter-free symbols, font rights/coverage/fallback and adaptive/tray assets. Poster snapshots cannot pass these gates.

## Documentation acceptance gate for this planning revision

Acceptance before editing: produce five named V2.4 documents; address R01–R24 individually; retain numbered Sections 1–31, 14 phases and exact weights/cumulative/release progression; remove obsolete conflicting security/branding/activation claims; include all 12 owner EGD scenarios plus negative/race tests; keep proposed choices and unrun product evidence explicit; preserve historical files; no application/Git/prototype/dependency setup.

Executed verification results are recorded after the consistency run in `DOCUMENTATION_VERIFICATION.json`. Procedures: SHA-256 comparison of every historical/governance input in the pre-edit manifest; local Markdown path/fragment checks; exact phase IDs/weights/cumulative/release table comparison with V2.3; Sections 1–31 coverage; R01–R24 and D01–D18 uniqueness; EGD-T01–T20 coverage and scenario mapping; obsolete-rule scans; required file/status and no-implementation/Git inventory checks. Review the resulting observations rather than assuming the generator succeeded.

Documentation PASS means those checks ran and passed. It does not mean product smoke/regression tests ran, owner artistic decisions are approved, Phase 0 passed or GitHub is backed up. Current repository/branch/commit/checkpoint/remote recovery: none; sync pending authorized setup. Planning readiness is stated separately in the readiness report.

Observed documentation run, November 4, 2026: **PASS, 17 checks, zero failures**. Five required documents, 24 correction IDs, 18 design IDs, 20 EGD test IDs and all 12 requested scenario mappings were checked. All 14 phase definitions, weights/cumulative percentages and release rows match V2.3 (total 100%); 26 local Markdown links resolve; 10 historical/governance files retain their SHA-256; updated AGENTS matches the supplied file; no Git/application scaffold or temporary planning fragments remain. Output document hashes and detailed checks are recorded in `DOCUMENTATION_VERIFICATION.json`. These are documentation observations only.
