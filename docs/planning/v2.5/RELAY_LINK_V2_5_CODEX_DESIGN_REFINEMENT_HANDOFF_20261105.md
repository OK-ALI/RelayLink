# Codex Handoff — Relay Link V2.5 Visual & Interaction Refinement

**Owner's latest instruction:** Update Relay Link's controlling master specification to V2.5 and perform a focused polish of the **existing Phase 0 Desktop/Mobile foundation UI**, not Phase 1.

## Step 1 — Receive and validate the roadmap

I have attached:
1. `RELAY_LINK_MASTER_ROADMAP_V2_5_20261105.md` (full successor master specification, preserving the original 14 phases and existing security/game plan).
2. `RELAY_LINK_V2_5_DESIGN_CHANGE_REGISTER_20261105.md` (UI-01 through UI-07).

Read the actual repository at `D:/Projects/RelayLink` and its latest `docs/governance/AGENTS.md`, root `AGENTS.md`, completed Phase 0 verification report and implementation files. Compare the attached V2.5 to the current repository's `docs/planning/v2.4/RELAY_LINK_MASTER_ROADMAP_V2_4.md` before integrating. Preserve any repository-only additions, links, documentation paths and factual Phase 0 status not reflected in the attachment. Place an updated authoritative file under `docs/planning/v2.5/`; update `docs/README.md`/relevant planning index; preserve the entire V2.4 and its verification reports as historical records. Validate version, paths, 14 phase IDs/weights/cumulative percentages and no contradictory Phase 0 progress statements. Never rewrite the verified Phase 0 checkpoint or earlier Git history.

## Step 2 — Design comparison FIRST, not a blind font swap

We are dissatisfied with the **font styling and the basic-looking UI elements** in the current builds, even though Phase 0 has technically passed. The owner wants Apple/Samsung-level **craft and interaction quality** as inspiration without copying brand assets or UI wholesale. The app must not be flashy, glass-heavy or card-heavy.

Produce a small native-quality comparison set with **three genuinely distinct typography systems** (one can be Space Grotesk + Manrope baseline). Show the same actual Desktop Command Center, Desktop Settings, native Android Home and native Android Settings with each; make differences visible at native scales. Verify license, glyph support, font sizes, weights, performance and accessibility. Do not declare the current pair final. Present the alternatives for owner choice BEFORE a system-wide typography migration. You may fix clear text-size/layout defects with existing fonts in the interim, with evidence.

Also create a focused component board covering a navigation item, primary/secondary button, toggle, precision slider, selection control, device/status row, small state chip, dialog/bottom sheet, and **Jump to Section selector** with normal/focus/pressed/disabled/error variants. Avoid basic framework defaults, giant empty cards, repeated nested boxes, excessive quotes, glossy/glassy surfaces and continuous glow. Preserve the approved A: Linked Path icon direction, palette families and honest planned-feature states.

## Step 3 — Authorized foundation-level improvements only

**You may implement the noncontroversial improvements immediately** while the typography comparisons are being prepared: replace the prominent Settings search with Jump to Section, refine spacing/control states using the existing theme tokens, establish reusable motion primitives and make responsive/accessible component improvements. Keep all changed implementations smoke-tested and documented. **Do not select or roll out the final replacement font family or final sound signature on the owner's behalf.** Present those alternatives for owner approval first. After the owner chooses, apply the chosen options in a separate verified change. The remaining foundation refinement scope includes:
- Task-led Desktop Command Center and compact, readable native controls.
- Mobile Home/Settings density, touch reach, typographic rhythm and consistent tokens.
- **Jump to Section** as the primary Settings navigator on both platforms, with current-section highlighting, section anchors, back/scroll restoration, touch/keyboard/screen-reader and Reduced Motion handling. Search must not dominate; optional secondary search may remain only if justified and unobtrusive.
- A small **semantic motion system** for button feedback, switches, navigation, themes and sheets: smooth, cancellable, adaptive, no delayed functionality, no resource-heavy loops.
- A **calm sound/haptic design policy and licensed/reviewable short connection-chime prototype** with configurable sound categories. IMPORTANT: there is currently no live pairing. Do NOT pretend a connection happened, emit false success cues or implement Phase 1 pairing. A standalone explicitly labeled sound preview may be created for owner review; actual successful connection/reconnection triggers belong to Phase 1.
- Local preferences where safe and existing; do not fabricate cross-device setting sync, media/apps, connected devices, Windows control, gaming or emergency pause functionality.

Do NOT begin Phase 1, enable Windows-control authority, add network pairing/remote protocol or change driver/game work. Do not alter the security boundary or relax CSP. Do not introduce another UI stack. Preserve all preexisting functionality and follow professional workspace structure.

## Step 4 — Verify with executable gates

Define acceptance/smoke/regression gates before each actual UI code change. Run formatting, lint, type checks, Rust/security boundary tests, shared-schema tests, Windows native WebView smoke, actual Android emulator/device UI checks, responsive Playwright tests, reduced-motion and keyboard/touch-size checks. Include actual screenshots, console/log observations, and exact commands. Tests that require unavailable hardware are NOT RUN / BLOCKED, never silently passed.

Verify all four themes, representative Windows/Desktop and phone sizes, accessibility/state contrast and text scaling. Measure UI frame response and resource impact where feasible; compare to the Phase 0 release baseline (private bytes about 215 MiB), but don't confuse the open-window baseline with the ≤200 MB tray target or claim a resource PASS without matching conditions. Sound/haptic prototype should not block input, respect mute and never produce repeated false alerts; physical feedback requires real device evidence.

Push meaningful verified work to the authorized `OK-ALI/RelayLink` repository after publication/sensitivity checks. Keep ordinary commits on existing appropriate branch; do NOT create a new branch for each minor implementation or rewrite `checkpoint/phase-00-complete`. If a significant design-refinement checkpoint becomes useful, use a separate clearly labeled annotated tag **only after** applicable gates and owner-approved choices pass. Record exact commit/CI/backup status.

## Step 5 — Return a complete review before any next phase

Return: (a) V2.5 roadmap integration diff/consistency report, (b) three font previews and recommendation pending owner selection, (c) component and motion comparison evidence, (d) actual updated Desktop/Android screenshots for the allowed initial visual work, (e) implemented vs planned sound/animation/jump settings, (f) executed smoke/regression/accessibility/performance evidence, (g) GitHub sync/checkpoint status, (h) remaining design approvals, and (i) PASS / CONDITIONAL / BLOCKED for this **design follow-up**, separately from existing **Phase 0 PASS**.

**No Phase 1 authorization is given by this message.** Stop after delivering the design refinement review. Do not count this follow-up as another phase or increase project completion beyond the existing 4%.
