# Relay Link V2.3 Phase 0 readiness

Date: November 4, 2026  
Status: **NOT READY for Phase 0; planning documentation only**  
Implementation: **0%; no phase started**

## What must be resolved before a start decision

This register separates decisions needed to begin Phase 0 from evidence produced during it. It does not require finished icons, working shells or physical gaming tests before foundation work starts. Explicit implementation authorization is required separately, after readiness is established.

| Entry item | Current evidence / gap | Required planning action | Owner |
|---|---|---|---|
| Governing baseline | V2.3 plus updated AGENTS and global smoke-test rule supplied; earlier header/conflicting passages remain. | Confirm a correction register for V2.3; current user instruction defers GitHub setup. Keep original sources unchanged. | Product owner |
| Native authority model | App-command defaults and single-webview route boundaries require correction (R23). | Approve explicit application command permissions, narrow webview/window grants and native policy tests as foundation requirements. | Technical lead + owner |
| Phase 2 security gate | Device-bound-key 'plan or implementation' conflicts with a test requiring actual key protection (R15). | Select enforceable first-pairing/key/pinning acceptance language. A design alone cannot pass an implementation test. | Security lead + owner |
| Input safety specification | Required events exist; watchdog deadline, crash ownership and reverse constraints are incomplete (R08/R09). | Approve provisional deadline/measurement method and ownership; agree conservative reverse contract and unsupported-mapping behavior. Detail and validate in applicable phases. | Technical lead + owner |
| Gaming allocation | Universal library, activity profiles and assists need explicit Phase 8–10 gates (R12). | Approve allocation without adding phases, changing weights or advertising early completeness. | Product owner |
| Support and quality plan | No exact available device matrix or approved resource/input budgets (R14/R19). | Name reference devices/builds and measurement owner; approve candidate thresholds or replacements. Minimum support remains provisional until measured. | Owner + quality lead |
| Per-change verification | New mandatory AGENTS §5 is not reflected throughout S1. | Add a compact gate template with executed smoke/regression evidence and NOT RUN/BLOCKED policy. | Technical lead |
| Orion reference access | Behavior described; actual revision/rights/access not established (R16). | Confirm authorized source availability and provenance, or explicitly mark the source-freeze task blocked. Do not inspect or modify unrelated projects without authorization. | Owner |
| Design review scope | Posters alone cannot establish final screens/branding. | Approve the representative board and comparison criteria below, including who signs off. Final visual selection can occur within authorized Phase 0. | Product owner |

No decision in this table is recorded as approved merely because a recommendation is supplied.

## Phase 0 work after explicit authorization

Retain S1 §26's original scope: production monorepo foundations, Tauri/Desktop and Expo/Mobile shells, initial Rust command boundary, canonical schema strategy, CI, architecture decisions, Orion reference freeze, design baseline and clean-checkout verification. Weight stays **4%**; all current checklist items remain unchecked.

The future workspace should follow S1 §24: `apps/desktop`, `apps/mobile`, `crates`, `packages`, isolated `drivers` and `installers`, `branding`, `tests`, `tooling` and `docs`. Create directories as real responsibilities arise, rather than filling a tree with unused packages. Ordinary remote operation must not depend on a gaming driver or a privileged service. Orion is a migration reference, not a build/runtime dependency.

Before tools are installed, document exact supported toolchain versions, Windows build prerequisites, Android build path, environment configuration and lockfile policy. No such installation or scaffolding occurred in this assignment.

## Visual selection and screen review plan

Review each pair side by side; saved theme choices do not change permissions or safety meaning. Use dark and light first, then check Blue/Teal parity. Final pixel designs and prototypes are future authorized work.

| Review board | Desktop | Mobile | Required observations |
|---|---|---|---|
| First use | Unpaired Command Center and Pair entry | Discovery/QR/direct entry | Clear next action, expiry, wrong-code and unavailable-network recovery |
| Trust | Pending device, approve/limit/reject, capability summary | Waiting, denied, limited access | Same device identity and permission terms; no secret exposure |
| Everyday use | Connection hub, current activity, pause, diagnostics entry | Home, touchpad, keyboard, media/apps | Consistent states, phone-appropriate touch reach, visible access scope |
| Settings | Search/categories/local ownership | Search/contextual settings | Same feature names; reset granularity; pending/applied/conflict states |
| Failure/safety | Paused/revoked/degraded/host locked | Reconnecting/input disabled/safe return | No active-looking unavailable controls; non-color status; emergency path |
| Shooter | Profile editor and supported route label | Landscape controls only | Move/aim/fire/action reach, independent touches, PC Controls, saved customization |
| Drive | Tilt/wheel settings and mapping preview | Both steering modes and both track shapes | Two-hand grip, one left-thumb Drive Control, deliberate reverse, recenter, cancel |
| Multi-activity | Template → Game → Activity editor | Favorites for one-action activity changes | Saved layout continuity; manual switching works without recognition |
| Decks | Library/editor/import permission review | Deck selection and execution | Declared actions only; no implied script trust |

Proposed navigation for review: Desktop **Command Center, Devices, Controls, Relay Decks, Relay Pad, Activity, Settings**, with clearly named Permissions/Security, Transfers and Connection Doctor destinations when shipped. Mobile **Remote, Decks, PC, Devices, Settings**, with Relay Pad reachable from Home and every game's PC Controls return path. These labels/groupings are proposals; reconcile them with S1 §18.1/§19.2 and V1 before adoption. Do not adopt the poster's Automation route without defining its safe scope.

Typography review: Space Grotesk headings + Manrope UI versus one licensed alternative. Compare small labels, ambiguous glyphs, tabular numbers, long device/game names, Windows scaling, Android font scaling and screen-reader reading order. Select supported scripts/languages and fallback behavior explicitly; language coverage cannot be assumed from the two names. Review font files/licenses and a lean weight set before embedding.

Branding review: three genuinely different abstract link silhouettes, separate wordmark, no letter/initial construction. Compare flat black, white and two-tone at native 16/20/24/32 px and launcher/taskbar sizes. Require transparent Desktop, simplified tray/status, Android adaptive foreground/background and monochrome/notification variants. Assess mask crops and high contrast. Do not mistake recolored copies or glossy poster tiles for three concepts or production assets.

## Device tiers and measurable acceptance proposals

These are **proposed investigation/acceptance budgets**, not approved hardware minimums or achieved results. Record each actual device's CPU/GPU/RAM, OS/build, sensor availability, display/refresh, power mode, network topology and app build. The owner must choose thresholds and available devices before low-end support can be claimed.

| Tier / condition | Required selection |
|---|---|
| Lower-end reference | Available modest Windows laptop/PC and smaller 60 Hz Android phone; include a phone without dependable motion sensing |
| Mainstream reference | Available Windows PC and mainstream Android phone, PC over Ethernet and phone over Wi-Fi |
| Higher-end reference | Higher-refresh Android and Windows system; 120 Hz remains experimental until measured |
| Coverage variations | Small/large phone and case, notches, left/right preference, relevant scripts/text scaling, Windows 100/125/150/200% DPI, one/multiple monitors |
| Adverse conditions | Battery saver, foreground game load, weak/jittery Wi-Fi, VPN/multiple adapters, phone background/lock, PC lock/sleep/restart |

Select exact currently supported OS editions/builds after lifecycle and dependency review. The roadmap's Windows 10/11 names do not establish supported builds. Do not silently promise support for every historical release.

| Measure | Proposed criterion / source | Measurement plan and gate |
|---|---|---|
| Discrete acknowledgements | S1 §22: median <50 ms, p95 <120 ms; track p99 | At least 1,000 repeatable safe commands per reference network, local monotonic round-trip timing; report applied/rejected separately. Phases 2–4. |
| Observed input response | Candidate p95 ≤80 ms, p99 ≤150 ms on declared stable LAN; adjust only with an explicit reviewed rationale | Timestamp or record finger action and observed PC response using a synchronized/validated method; do not substitute acknowledgement RTT. Phases 3, 8–10. |
| Held-input failure safety | Candidate host watchdog ≤250 ms after last accepted active stream; immediate local release attempt for explicit cancellation | Record last valid frame, injected/driver neutral state and observed action; test silent network loss and host crash separately. No 45-second heartbeat dependence. Phases 2–3, 8–9. |
| Controller rates | S1: 60 Hz standard, 30 Hz saving, 120 Hz optional | Record achieved sampling/send/apply rates and jitter; stale queue must remain bounded with latest state retained. Phases 8–10. |
| Smoothness | Candidate ≥95% frames within 16.7 ms on an approved 60 Hz reference; no recurring >100 ms interaction stall | Trace navigation/controller feedback under game load for 10 minutes; report actual frame distribution. Gaming decorations off. Phases 3 onward. |
| Desktop overhead | Candidate tray idle average CPU <1% of total system, RAM ≤200 MB, active-control CPU increment ≤3 percentage points | Compare 10-minute idle and active runs on named hardware; record GPU and network too. These budgets may require adjustment after shell baseline measurements. Phases 0, 3, 7. |
| Game overhead | Candidate median game FPS reduction ≤3% with controls active and no capture | Repeat comparable game workload with/without Relay Link; report low-frame behavior and CPU/GPU bottlenecks. Phases 8–10. |
| Phone efficiency | Candidate ≤5 percentage points/hour battery overhead relative to comparable screen-on idle; no sustained thermal input stalls | Match brightness/network/refresh conditions, record total and baseline consumption, temperature/throttling and haptics. Phases 3, 8–10. |
| Reconnection | Candidate p95 ≤3 seconds after route becomes reachable and authentication is possible | Inject 30 interruptions; controls stay disabled until fresh authenticated state, no cruise/held-state resumption. Exclude time the network is unavailable. Phases 2–3 onward. |
| Long sessions | Candidate 15-minute, 1-hour and 4-hour sessions | Observe drift, leaks, fatigue, heat, stale state and safety under repeat interruptions. Phases 3, 7–10. |

If a budget cannot be met on a candidate low-end device, investigate, revise the support tier with evidence, or block the relevant release. Never disable security or drop required input-release guarantees to improve a performance number. A 250 ms timeout is a provisional upper bound for validation, not a promise that input physically reaches neutral instantly in every target application.

## Proposed controls and compatibility acceptance procedures

Every product check below is **NOT RUN — no application, device session, game mapping or driver is available under this planning assignment**. After authorization, Codex must run every feasible check itself; owner-only hardware steps supplement rather than replace feasible agent execution.

For each result, record game/version, launcher/platform, OS/build, phone, profile revision, input route, permissions, network, observed outcome and evidence location. Each title begins **Not verified**. Labels are **Verified compatible / Limited support / Not verified / Not supported**, with a tested scope and date; no genre-wide compatibility inference.

| Family / safety case | Exact later procedure | Expected acceptance |
|---|---|---|
| Shooter | Choose two distinct eligible shooters, including an unlisted one. Launch from phone; map a template; move, aim, fire and jump/reload together; reposition a control; open PC Controls and return; interrupt the connection. | Independent supported touches/actions, saved profile, no stuck inputs. Target-specific restrictions clearly labeled. |
| Racing/Driving | In two eligible driving titles, compare Tilt and Wheel with straight and gently curved left-thumb tracks. Accelerate/coast/brake; release while turning; deliberately request reverse; disconnect with cruise enabled. Repeat with unreliable sensors using Wheel. | Comfortable natural grip; no accidental reverse/held throttle; explicit digital behavior where analog is absent; no automatic cruise resumption. |
| Multi-activity | In two suitable mixed-mode titles where practical, manually select On Foot → Driving → Flying/another supported activity → On Foot. Repeat with recognition disabled. | Each available favorite is a one-action change, releasing old inputs and retaining saved mappings. No invented flying activity for a game without it. |
| Fighting | On two mapped titles, perform directional input plus simultaneous action buttons, then pause/switch layout. | Clean simultaneous mapping, no hidden combo/macro, correct release. |
| Sports/Gamepad | On two eligible titles, check sticks, triggers, pause and PC Controls return using the recorded controller route. | No slot/profile confusion or false analog claim. |
| Strategy/Management | On two eligible titles, select, drag, scroll/zoom, use modifiers and a saved shortcut; revoke pointer permission. | Accurate mapped action and immediate authority loss; modifiers released. |
| Flight/Simulation | On two eligible titles, map axes/throttle/rudder, recenter and switch activities; test missing sensor fallback. | Declared axis response, reachable controls, no stale throttle. |
| Platformer/Rhythm/Arcade | Select distinct eligible games across these styles; measure timing-sensitive response, remap and use large-target mode. | Honest timing/compatibility label; no decorative delay. |
| Custom/older/unknown | Pick an unlisted older title and a separate custom case; create Template → Game → Activity from Mobile, edit on Desktop, then resolve concurrent edits. | Discoverable creation and restore/duplicate path, clear sync ownership, safe import, evidence-based limitations. |
| Failure sweep | While holding keys/buttons/axes/drag, test phone background/lock, rotation, focus loss, network silence, host crash, permission revoke, PC lock and emergency pause. | Release within the approved applicable deadline; authenticate fresh on return; no replay. Inspect both host-owned state and observable target behavior. |
| Grip comparison | Counterbalance straight/curved order across hand sizes, phone sizes/cases and left-handed users; test both steering modes while eyes remain on PC. Record 15-minute task comfort, reach, regrips, misactivation and fatigue. | Owner-reviewed evidence selects shape; no forced selection before testing. |

Two-title sampling is a proposed breadth criterion, not proof of category-wide support. Title selection, access rights and any anti-cheat restrictions require review before execution. Do not bypass game protections.

## Mandatory implementation, phase and release gates

For each future implementation, record before editing: intended behavior, acceptance conditions, affected existing flows, major risk, feasible smoke test and required automated/manual checks. After editing, Codex executes applicable checks, inspects output, fixes failures and reruns the affected checks. Keep repeatable checks in the organized testing workspace; no separate branch/tag per change.

The gate record must include exact commands/procedures and environment, PASS/FAIL observations, smoke and regression evidence, NOT RUN/BLOCKED checks with reason and exact follow-up, and overall **PASS / CONDITIONAL / BLOCKED**. PASS requires every applicable mandatory check to run and pass. Do not proceed into dependent work with an unresolved mandatory gate without identifying the risk and obtaining appropriate approval.

For a blocked hardware check, the later owner-run handoff must name the build, device/OS/game, saved profile, exact actions from the table above, expected deadline/behavior, recording method and evidence destination. A mock result does not close that gap.

Phase 0 separately requires both shells to build from clean checkout, Rust and TypeScript checks, cross-language schema fixture validation, fresh CI evidence, and forbidden-native-command rejection. Phase/release evidence additionally covers integration, accessibility, performance, clean installation, upgrade/repair/rollback/removal where relevant, and required verified remote checkpoints after setup is authorized. This report claims none of these results.

## Readiness decision

Resolve the entry register, approve the correction/validation plan, and review readiness again. Keep exact icon/font/track selections pending until their authorized comparison work. Preserve the original 14 phases and weights; current completion remains 0%. No Git repository, commit, checkpoint or remote backup exists.

**NOT READY:** Significant security-boundary, gate-consistency and acceptance-plan corrections are needed before Phase 0. Implementation must wait for explicit authorization.
