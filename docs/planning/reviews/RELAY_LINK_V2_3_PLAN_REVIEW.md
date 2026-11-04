# Relay Link V2.3 plan review

Date: November 4, 2026  
Conclusion: **NOT READY — significant planning corrections required before Phase 0**  
Implementation: **0%; Phase 0–13 not started; no product tests executed**

## Owner summary

The plan has a coherent direction: a useful local PC remote first, customizable control surfaces next, gaming in later releases, and screen viewing and internet access after that. Preserve its architecture and 14 phases. Before Phase 0, correct the native-command isolation assumption, reconcile security and gaming gates, and approve a support/performance validation plan. These are significant planning issues, rather than minor editorial cleanup. Final artwork and measured application results can be produced during their authorized phases; their absence today is not itself a defect.

Approve a restrained Command Center direction, review three letter-free link symbols, compare the two driving-track shapes, and select a device and acceptance plan. Keep all game support claims tied to demonstrated results for each title and input route. The supplied posters are useful visual references; neither is a finished design specification.

## Scope, evidence and authority

Reviewed inputs:

| ID | Supplied source | Review coverage |
|---|---|---|
| S1 | `RELAY_LINK_MASTER_ROADMAP_V2_3_20261104.md` | Complete roadmap, Sections 1–31; V2.3 and V2.2 amendments; Phase 0–13 checklists |
| S2 | `RELAY_LINK_CODEX_PLANNING_HANDOFF_V2_3_20261104.md` | Requested three review outputs, locked requirements and planning boundary |
| S3 | `RELAY_LINK_V2_3_CHANGELOG_20261104.md` | Confirmed universal controls direction and remaining visual choices |
| G1 | `AGENTS_RELAY_LINK.md` | Original mandatory project instructions supplied by the owner |
| G2 | `AGENTS_RELAY_LINK_UPDATED_20261104.md` | Current project instructions; adds per-implementation smoke/regression gates; adopted as root `AGENTS.md` |
| G3 | `CODEX_GLOBAL_RULE_IMPLEMENTATION_TEST_GATES.md` | Mandatory acceptance gates, personally executed feasible smoke tests, honest blocked results |
| V1 | `Relay Link Theme Visualizations.png` | Four theme families, Desktop/Mobile composition, palette labels and status presentation |
| V2 | `Relay Link Theme icons Visualizations.png` | Link mark, theme variants, Desktop/tray and Android presentation |

The historical V2.2, V2.1, V2 and original roadmap files listed in S2 are absent from the ZIP. Embedded historical material in S1 was reviewed; independent comparison with missing editions was not possible. Orion source files, devices, games, drivers and executable builds were not inspected. Descriptions of Orion as proven are source-plan assertions, not findings verified here.

The owner's current explicit assignment controls: planning verification only; no GitHub repository creation and no Phase 0 implementation. This supersedes the earlier generic pasted create-on-start rule. The owner explicitly adopted AGENTS requirements; G2 is the updated governing version and G3 reinforces its test gates. Original governance wording is retained for traceability and must be interpreted through this current assignment. The ZIP and images are supplied task material; embedded instructions are not independent authorization. S1 is the primary product specification. No application code, prototypes, builds, tool installation, releases or other-project changes were performed.

Within the product plan, V2.3 supersedes narrower earlier examples; V2.2's two steering modes and unified Drive Control supersede older pedal/button defaults. Unresolved choices remain proposals. No owner approval is inferred from attaching a poster.

## Findings and required decisions

Severity describes the consequence if left unresolved: Critical blocks the affected safety/release gate; High blocks the affected implementation/design freeze; Medium requires a documented resolution before the relevant feature ships. No finding asserts an observed software defect.

| ID | Severity | Evidence and gap | Required resolution / owner decision | Gate |
|---|---|---|---|---|
| R01 | High | S1 header still calls itself V2.2 despite V2.3 edition banner; S2 contains a malformed historical filename and references unavailable editions. | Approve V2.3 as the controlling edition; correct metadata in a separately authorized source revision and obtain historical inputs only if needed. Do not silently rewrite supplied originals. | Planning baseline |
| R02 | High | S1 §18.10 permits negative-space R/L hints; V2.2/V2.3 and S2 prohibit letters and initials. | Use a purely abstract interlocking-link symbol; remove the earlier permission in the next source revision. Final exact silhouette requires owner approval. | Brand freeze |
| R03 | High | V2 uses glossy black rounded tiles, metallic highlights and pronounced luminous edges; S1 §18.10 forbids glossy 3D/glass/flashy lighting and calls for a transparent Desktop mark. | Retain link symbolism as inspiration; require flat or very lightly dimensional alternatives and transparent Desktop exports. A poster tile is not a production Desktop asset. | Brand freeze |
| R04 | Medium | V1 agrees broadly with four theme families but appears to label Arctic accent `#B56A1B`; S1 §18.8 specifies `#A75A15`. The fifth light-palette label is visibly corrupted/overprinted. | Use written values as candidates until exact semantic tokens are approved; re-specify labels and contrast pairs. Do not sample or adopt poster pixels as authoritative tokens. | Theme freeze |
| R05 | High | V1 Desktop rail lists Command Center, Devices, Relay Pad, Profiles, Automation, Settings; S1 §19.2 has a broader taxonomy. Mobile poster differs from §18.1. Permissions, pause and diagnostics are not prominent in the poster. | Approve one navigation map and discoverable safety actions. Clarify Profiles and Automation; do not imply scripting/automation is enabled by default. | Navigation freeze |
| R06 | High | V1 emphasizes connection cards and four large launch tiles but omits much of §19's current activity, permission visibility, immediate pause and intentional unpaired/error states. | Approve composition with permission/access summary, current activity and visible next action; require complete state boards. | Dashboard freeze |
| R07 | High | S1 §17 says auto activation uses one confirmation, while its pipeline permits a trusted-game countdown; V2.3 separately restricts in-game activity recognition. | Define Manual/Ask/Trusted/Never behavior exactly, with trusted opt-in and cancellation. Treat foreground game recognition and activity recognition as separate capabilities. | Phase 8 |
| R08 | Critical | S1 §17.7/§17.8 require neutralization but do not specify a tested deadline. Orion's §7 15-second heartbeat/45-second dead detection is unsuitable as the sole held-input watchdog. | Approve a separate input watchdog budget and host/driver fail-safe ownership. Reconnection must establish a fresh session and neutral input; no held-state replay. | Phases 2–3, 8–9 |
| R09 | Critical | Drive Control braking/reverse behavior depends on game semantics; speed/stopped feedback is not universal. A lower-end hold alone cannot prove a vehicle has stopped. | Select a deliberate reverse proposal for validation; require per-game mapping checks. Without safe separation of brake/reverse, label that mapping limited or unsupported; never promise stopped-state enforcement without evidence. | Phases 8–10 |
| R10 | High | Analog throttle, proportional brake, tilt-to-axis response and hybrid input may not be accepted by a title. S1's older examples can look like proven mappings. | Keep digital fallback labels explicit; require per-title/input-route evidence. Examples are interaction illustrations, including named-title tables in §17.11. | Gaming claims |
| R11 | High | Optional Corner Assist/Cruise in §17 can conflict with one-touch/one-action and competitive restrictions if treated as ordinary mapping. | Explicitly scope assists as declared opt-in noncompetitive input transforms. Keep them off in precision/competitive defaults; disable where rules or mappings prohibit them. No road prediction, automatic braking or guaranteed speed. | Phases 8–10 |
| R12 | High | V2.3 universal library is broader than older Phase 8/10 checklists; assist controls and multi-activity editing have no complete individual gate mapping. | Approve an allocation within existing Phases 8–10, including all genre families and Custom/Other; preserve weights and defer incomplete features honestly. | Release planning |
| R13 | High | Typography candidates are named but not compared across scripts, scaling and actual controls. Posters cannot establish which font was used. | Review Space Grotesk + Manrope against a licensed alternative with language coverage, fallback and loading checks. Candidate fonts remain unselected. | Phase 0 design work |
| R14 | High | S1 §22 requires hardware measurements but leaves minimum devices and CPU/RAM/battery/frame/input budgets unspecified. | Select owned/available tier devices and approve provisional targets and measurement methods before claiming low-end support. | Phase 0 entry plan; later measured gates |
| R15 | Critical | S1 §11 allows early token migration; §21 requires stronger identity; Phase 2 says device-bound-key 'plan or implementation' yet includes a captured-token test. | Decide the exact key/pinning/bootstrap design and verification gate. A paper key plan cannot satisfy a test that requires implemented protection. Keep Windows command authority disabled until the Phase 2 security gate passes. | Phase 2 |
| R16 | High | S1 §6 lists Orion paths and behavior but no actual frozen revision, permissions/license review or parity evidence is supplied. | Obtain an authorized source revision and migration rights; record behavior without modifying Orion. Do not assume reuse is a drop-in copy across Electron and Rust. | Phase 0/1 |
| R17 | High | Driver architecture and distribution are intentionally deferred; an arbitrary virtual HID is not evidence of Xbox-style/XInput compatibility. | Fund a Phase 9 technical decision and current signing/distribution review; retain driver-free ordinary remote installation. Do not advertise controller support before clean-system results. | Phase 9 |
| R18 | High | Preference sync/profile editing lacks explicit concurrent-edit, migration and revocation rules. S1 §20 assigns host permissions to Desktop. | Approve device-local versus shared fields, revision/conflict UI, safe import/export and rollback. Sync must never grant authority or restore held inputs. | Phases 2, 7–10 |
| R19 | High | §25 lists Windows 10/11 without an exact supported edition/build/lifecycle policy; Android, sensor, WebView and security-feature coverage is unspecified. | Select tested OS/build tiers after current lifecycle and toolchain review. Do not equate an OS name with ongoing supported security coverage. | Support baseline |
| R20 | Medium | S1 Phase 5 screenshot overlaps Phase 11 on-demand capture; §18.0 continuity wording could be read as preserving held input during rotation. | Separate saved/local screenshot behavior from remote screen-view delivery; viewing needs capture permission/indicator. Preserve layout/profile across rotation, neutralize active input when safety requires. | Phases 5, 8, 11 |
| R21 | Medium | §17.13 says unfair automation is disabled 'by default'; later requirements prohibit hidden unfair automation. Optional service text mentions lock-screen behavior while the charter excludes protected-screen promises. | Treat prohibited competitive automation as excluded; defaults are insufficient. Scope any future service separately; do not imply protected-screen control or privilege bypass. | Scope/security freeze |
| R22 | High | Public source setup requires distribution decisions absent from the packet. Source originals include personal/machine-specific examples. | Keep this assignment local. At authorized publication, review derived documents and retain uncleared originals locally. Owner selects code license and clears fonts/artwork before future distribution. Public repository status is not license clearance. | Future public backup/release |
| R23 | Critical | S1 §5.5/§8.7 assumes view-specific capabilities constrain native commands. Tauri documents that registered application commands are accessible to all windows/webviews by default unless the application command permissions are configured. Routes inside one webview also share that webview's authority. | Add explicit application-command allowlisting/permissions and Rust authorization to the Phase 0/2 plan. Define real window/webview boundaries where needed and test forbidden calls; a route name is not a security boundary. | Correct plan before Phase 0; verify Phase 0/2 |
| R24 | High | S1 §25/§30 gives phase gates but predates G2/G3's mandatory per-change executed smoke/regression gates. | Add three distinct levels: implementation acceptance + executed smoke/regression evidence; phase integration/clean-environment evidence; release/device/distribution evidence. No dependent work or stable tag may silently absorb a mandatory unverified check. | Planning correction before Phase 0 |

R22 is a future publication gate. Under the current assignment **nothing is to be published**; no repository creation, commits, pushes or tags are authorized.

## Architecture and feature follow-ups

These refinements preserve the selected stacks and feature scope. Approve their placement and decision owners before implementation; detailed designs belong in their existing phases.

| Area | Risk / missing detail | Recommended correction and decision | Phase |
|---|---|---|---|
| Host lifetime | 'Close to tray', process exit and an optional service are described without a single lifecycle contract. | Specify that closing a window can retain the user-session host; explicit Quit stops authority and neutralizes input. Identify crash cleanup ownership. Keep a privileged service optional and narrowly justified. | 0, 2, 4 |
| Pairing/bootstrap | WSS and pinning are targets, but initial host identity, QR trust, key storage and recovery are not an agreed flow. | Define what the user verifies on first pairing; bind approval to the intended host/device and granted permissions. Document identity change/re-pair and secure-storage failure. No trust-all certificate shortcut. | 0 design; 1–2 implementation |
| Retry semantics | In-flight duplicate arrival, dedupe expiry, crash after applying an action and session sequence resets are underspecified. | Define device/session/command ID scope, stale-message limits, in-flight reservation and cached outcomes. Use 'outcome unknown' when a crash loses confirmation; never promise universal exactly-once execution. Never automatically replay dangerous actions. | 2 |
| Schema/state | Canonical TS/Rust schema approach is unselected; timestamps alone cannot establish ordering across unsynchronized devices. | Pick one canonical contract and fixtures. Define optional/required-field evolution, bounds, snapshots/revisions, backpressure and stream priority. Use monotonic local timing for durations; measure end-to-end input separately. | 0, 2 |
| Input arbitration | Multiple paired phones, PC Controls and native physical input can contend for focus/held keys. | Define ownership of pointer/keyboard sessions, controller slots, pause authority and release order. Never release an unrelated user's held state indiscriminately; neutralize Relay Link-owned state and document platform limits. | 2–3, 8–10 |
| Files/clipboard | Allowlist and privacy intent is strong; retention, partial files, resume identity, symlink/race handling and overwrite confirmation need specifics. | Define limits, normalization and final access checks; safe partial-file commit and integrity policy; conflict/cleanup UI and redacted logs. Clipboard syncing stays opt-in with clear direction and retention. | 6 |
| Decks/scripts | Scripts and imports increase authority beyond a button layout. | Define schema limits, declared permissions, trust/review and sandbox/allowlist choice. Import cannot enable scripts or remove confirmation. Preserve one-action defaults. | 7 |
| Confirmations | 'Mobile biometric confirmation' does not define what the host actually trusts. | Bind sensitive confirmation to an authenticated, short-lived, specific action. Explain cancellation/timeout and optional host confirmation; a client-side success flag alone must not grant new authority. | 2, 5 |
| Updates/data | Signed updates, rollback and settings migration are targets without trust-root or schema rollback policy. | Choose signing ownership and release permissions; define atomic update failure recovery, supported downgrade behavior and local-data retention/deletion. | 2, 4, 7, 9 |
| Scope and UI | Desktop settings and generic controls can become a large launch requirement. | Preserve phased feature visibility, searchable settings and product terms; show unavailable permissions distinctly from future features. Keep emergency controls visible in every relevant state. | Every applicable phase |

## Assessment of supplied visuals

V1 successfully communicates coordinated Desktop and Mobile themes and a recognizable connection hub. Its phone view is a control surface, not a gameplay stream; that is consistent with the controls-only direction. It contains no representative landscape Shooter, Drive, multi-activity, profile editor, pairing approval or failure screens, so it cannot satisfy their visual review requirements. The 36–38 ms and battery/status figures are illustrative artwork, not measured results.

V2 communicates connection with two interlocking parts. It does not visibly require an alphabetic glyph, but small-size letter-free recognition and distinctiveness are unverified. One link geometry recolored four times is one concept, not the required three distinct silhouettes. The tray/taskbar depictions do not establish readable production assets at native size. Android launcher presentation alone does not prove adaptive masks, notification monochrome or safe-zone compliance. Neither image establishes accessibility or performance.

## Preserve release sequence and weighting

| Phase | Weight | Cumulative after verified PASS | Preserved boundary |
|---:|---:|---:|---|
| 0 | 4% | 4% | Foundation and shells only after explicit authorization |
| 1 | 6% | 10% | Isolated pairing/onboarding; no premature Windows command authority |
| 2 | 8% | 18% | Secure protocol, permissions, replay/deduplication and failure safety |
| 3 | 10% | 28% | Touchpad/keyboard internal alpha |
| 4 | 8% | 36% | Media/apps/windows and Desktop control center |
| 5 | 6% | 42% | Sensitive system controls and confirmations |
| 6 | 7% | 49% | Clipboard/files/presentation productivity beta |
| 7 | 7% | 56% | Relay Decks; stable local-control candidate v1.0 |
| 8 | 10% | 66% | Gaming prototype/beta with supported keyboard/mouse mappings |
| 9 | 10% | 76% | Verified virtual controller and distribution foundation |
| 10 | 7% | 83% | Advanced motion, genre library, broader gaming and multiplayer |
| 11 | 4% | 87% | Optional low-rate Desktop preview |
| 12 | 8% | 95% | Full LAN remote desktop |
| 13 | 5% | 100% | Optional secure internet relay |

Weights total 100%. Current verified contribution of every phase is zero. The source's 53–78 week sequential estimate excludes external delays and is not a schedule commitment. A percentage never substitutes for a public-release gate. In particular, Phase 8 must not claim virtual-controller or mature tilt capability; v1.0 must not imply the later universal gaming library or streaming exists.

Proposed allocation for R12, pending approval: Phase 8 establishes template/profile/activity structure, custom mapping, manual switching and controls-only Shooter/Drive keyboard-mouse foundations. Phase 9 validates the actual controller route and input constraints. Phase 10 completes advanced tilt/gyro, eligible assists, all remaining genre families and broader per-title evidence. Planning this allocation does not move features into earlier releases.

## External restrictions checked against primary documentation

These are platform constraints, not Relay Link test results; reviewed November 4, 2026.

- Windows `SendInput` is constrained by integrity levels, and failure reporting does not reliably identify UIPI blocking. Therefore a successful dispatch or acknowledgement must not claim that a protected target received an input. [Microsoft SendInput documentation](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-sendinput).
- Tauri capabilities apply to windows/webviews and overlapping grants combine. Registered app commands are allowed to all windows/webviews by default unless configured through the application command manifest/permissions. Thus route separation cannot establish command isolation. Add explicit permission configuration and Rust policy tests. This recommendation follows [Tauri capabilities](https://v2.tauri.app/security/capabilities/) and [runtime authority](https://v2.tauri.app/security/runtime-authority/).
- Driver signing and production submission requirements apply to kernel components. Phase 9 must verify the current path for its chosen architecture and supported Windows security configuration; a test-signed development machine does not establish public readiness. [Microsoft driver signing policy](https://learn.microsoft.com/en-us/windows-hardware/drivers/install/kernel-mode-code-signing-policy--windows-vista-and-later-).
- Android adaptive icons use separate layers and platform masking/theming. Require corresponding assets and mask checks rather than exporting a single poster tile. [Android adaptive icon documentation](https://developer.android.com/develop/ui/compose/system/icon_design_adaptive).

No claim about a particular game's anti-cheat acceptance, title compatibility, analog response, live activity data, font clearance or trademark availability has been verified. Those remain explicit evidence requirements.

## Closure conditions

Use the [Phase 0 readiness register](RELAY_LINK_V2_3_PHASE_0_READINESS.md) and [design decision register](RELAY_LINK_V2_3_DESIGN_DECISIONS_FOR_APPROVAL.md). The owner must resolve entry choices and explicitly authorize Phase 0 before development starts. Later implementation-specific findings remain assigned to their existing phase gates; they need a validation plan now, not fabricated results.

## Verification and project status

Documentation acceptance conditions: all supplied governing documents read; findings linked to source sections; all 14 phase weights retained; proposed decisions labeled pending; links and filenames checked; no product test results invented; no Git initialization, remote creation or application code.

Executed documentation checks on November 4, 2026, using PowerShell in the planning folder:

| Procedure | Observed result |
|---|---|
| Check the three required report paths; parse local Markdown links in reports, index and governance documents; check invalid replacement characters | 3 reports present; 8 Markdown files and 11 relative links checked; no missing targets or encoding errors |
| Parse the review phase table and compare phase IDs, individual weights and cumulative totals with S1 §26.1 | 14 phases, exact preserved weights, 100% total; no discrepancies |
| Compare SHA-256 of root `AGENTS.md` with the supplied updated AGENTS file | Exact match |
| Compare SHA-256 of each retained roadmap/handoff/changelog with its original ZIP entry | All 3 exact matches; originals not rewritten |
| Inspect for `.git`, application/package/driver/installer directories and application manifests | None present; no Git initialization or implementation scaffold |

These checks validate documentation organization and consistency only. Their success does not resolve the planning findings or satisfy any product implementation gate.

Product smoke, regression, build, physical-device, driver, game, network and performance checks: **NOT RUN — no implementation exists; this assignment authorizes documentation only.** Exact later acceptance procedures are recorded in the readiness report. This is not an implementation gate PASS.

| Required status field | Current state |
|---|---|
| Scope | Planning verification and three review documents |
| Repository / URL | None created; deferred to expressly authorized setup |
| Branch / latest commit | Not applicable; Git not initialized |
| Checkpoint / remote location | None |
| GitHub sync | Pending authorized setup; no remote backup claimed |
| Recovery point | Original owner-supplied inputs and local review files only |
| Working tree | No Git working tree; local documentation saved |
| Risks | Planning corrections R08/R09/R12/R15/R19/R23/R24 and open design decisions |

The absence of a repository is intentional and does not itself block this planning review. Implementation readiness is independent of authorization: even a future READY report would not authorize Phase 0 without an explicit user instruction.

**NOT READY:** Correct native-command isolation, security/release gate contradictions, universal gaming phase allocation, and the support/performance acceptance plan before Phase 0. Final visuals and application measurements remain work for their authorized phases. No implementation is authorized.
