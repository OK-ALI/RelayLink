# Phase 0 implementation gates

Authorization: the owner's November 4, 2026 message expressly authorizes Phase 0 only. The V2.4 roadmap remains controlling. Later phases, real Windows input, pairing/network servers, gaming, streaming and releases remain out of scope.

License decision: the owner selected **all rights reserved for now**. Newly authored Relay Link source receives no open-source license grant. Third-party notices remain intact. Supplied images and uncleared Orion source are excluded from publication.

## Foundation workspace and contracts

Acceptance before editing: a lean pnpm/Cargo monorepo; locked dependency versions; one canonical schema and fixtures validated by TypeScript and Rust; shared semantic themes and identity/configuration; no credentials, machine paths or other-project runtime dependency. Windows execution and network control are absent.

Smoke: load a valid foundation-state fixture through both validators; reject malformed/extra-authority fixtures. Regression: verify original 14 phases/weights/releases and historical planning inputs, cross-package type checks, formatting/lint, secret/publication scan and workspace-boundary checks. Record exact commands/output in the completion evidence.

## Desktop and Mobile shells

Acceptance before editing: Tauri 2 + React/TypeScript/Vite Desktop, Rust core with explicitly enrolled commands and actual webview grants; React Native + Expo Development Build + Expo Router Mobile; coordinated candidate themes/typography, accessible navigation, settings search, readable status and no working later-phase controls. Artwork choices remain proposals.

Smoke: build Desktop and Android development shell where supported; launch actual shells where environment permits; exercise navigation, theme/reduced-motion/settings search and layout. In the actual Tauri webview invoke one allowed harmless status command, one enrolled-but-ungranted probe, and one nonexistent Windows-control command; only the allowed command succeeds. Regression: shared schema fixtures, Rust policy tests, frontend UI tests, mobile type/export/prebuild/native checks and no authority/network/control engine introduced.

## Reproducibility, provenance and remote backup

Acceptance before editing: documented setup/architecture/security decisions and source reference; exact available-host/device inventory with unknown devices labeled unavailable; reproducible lockfile builds and CI; one verified owner repository on a stable main branch; no duplicate branch/tag proliferation or publication of uncleared materials.

Smoke: clean-checkout install/type/test/build on a fresh runner, inspect CI output, verify pushed commit identity against remote and annotated checkpoint only if its applicable milestone checks pass. Regression: all earlier gates, publication-content review and recovery instructions.

## Result enforcement

Android smoke-harness correction gate: CI built/installed the development APK, but its actual XML showed Expo's first-launch developer-menu introduction covering the app. Dismiss only that identified development overlay, then require real Home, Settings and privacy-search evidence. Bound startup waiting, preserve failure screenshots/XML and React Native error logs, and rerun on a fresh emulator. Do not weaken assertions or count a development overlay as a successful application launch.

The next capture showed an emulator Quickstep launcher ANR covering both the actual Relay Link Home and Expo introduction. Before retesting, allow one explicitly identified Quickstep-only dialog recovery and record it in evidence. Any Relay Link/other or repeated ANR fails; never dismiss a product ANR as test success. Keep all Home/navigation/search assertions. This is emulator-harness recovery, not an application fix or a claim of perfect emulator health.

Bound Gradle and Metro workers to two in the test environment to reduce avoidable runner contention. Verify that the APK still builds, Metro serves it, and the actual native flow passes. This does not set product CPU/battery claims or reduce application feature/security requirements.

Now that a local emulator is available, extend the native flow to verify theme selection and the actual reduced-motion switch, in addition to Home/Settings/search. Give theme controls explicit accessible names, prefer exact accessible targets in the harness, reset only the dedicated emulator app between runs and verify emulator identity before claiming emulator evidence. Keep a product ANR as failure. Follow the installed Expo CLI's disabled-typed-routes policy: do not track its removed generated `expo-env.d.ts` or stale type-generation includes; retain full app/source type checking and verify repeated commands leave canonical source stable.

A later repeat timed out in `am start -W` while the host was compiling native C++; the actual UI poll was never reached. Remove that redundant blocking launch wait and retain the explicit bounded Home-state poll as the readiness gate. Retest after native compilation, and record real failures without stale prior PASS files.

Resource-baseline gate, defined before adding the measurement helper: build the embedded release shell and sample only its process tree after warmup for ten minutes. Record actual CPU/private/working-set values, method and limitations; detect unexpected app exit and close the launched app afterward. This establishes the Phase 0 available-host baseline. An open-window run does not establish tray or low-end budget acceptance, and any target miss remains visible rather than waived. Preserve the earlier debug diagnostic as separate evidence.

The first longer run detected an app exit before completing and correctly failed; the cause was not established. Before retrying, make the helper preserve partial samples/exit code on failure and emit bounded progress. A partial run must never be reported as a ten-minute baseline. Keep the test window open during the retry and inspect the resulting evidence.

Native evidence refinement gate, defined before editing: the UI may report a verified boundary only for the expected ACL denial and command-not-found results, never a generic disconnected/failed IPC call. Add negative classification regression cases, retain the exact narrow permission grant, rebuild and rerun the actual WebView smoke. This is a Phase 0 diagnostic correction and grants no additional authority.

Each gate records PASS/CONDITIONAL/BLOCKED with actual evidence. Every feasible required smoke/regression check must be executed by Codex. Missing devices/SDK/driver/game/visual approval are explicitly NOT RUN/BLOCKED with exact next steps; they are never fabricated as passes. Mandatory Phase 0 exit gaps prevent Phase 0 PASS and a phase-complete tag. A partially verified implementation cannot silently become a stable checkpoint. Stop at the Phase 0 completion report.
