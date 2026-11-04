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

Each gate records PASS/CONDITIONAL/BLOCKED with actual evidence. Every feasible required smoke/regression check must be executed by Codex. Missing devices/SDK/driver/game/visual approval are explicitly NOT RUN/BLOCKED with exact next steps; they are never fabricated as passes. Mandatory Phase 0 exit gaps prevent Phase 0 PASS and a phase-complete tag. A partially verified implementation cannot silently become a stable checkpoint. Stop at the Phase 0 completion report.
