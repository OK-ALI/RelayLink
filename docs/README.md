# Relay Link

Phase 0 implementation is authorized and in progress. Phase 1 and later are not authorized. This repository contains isolated Desktop/Mobile foundations, not a working remote-control or gaming product. No real Windows-control engine or product network listener is enabled.

## Current foundations

- Windows: Tauri 2 + React/TypeScript/Vite, a candidate Command Center, navigation, searchable local settings, four candidate themes and actual native permission probes.
- Android: React Native + Expo SDK 58 Development Build + Expo Router; coordinated Home/settings/theme foundation. Native/device validation is reported separately from browser/export checks.
- Shared: canonical JSON Schema, generated CSP-compatible validator/types, Rust/TypeScript shared fixtures, semantic design tokens and isolated product identity.
- Verification: Node contract/regression/publication checks, Rust tests/Clippy, browser and native-webview smoke, clean-runner CI and native Android build/smoke procedures.

## Documentation map

All project documentation belongs under `docs/`, now and in future changes. The repository root is reserved for source directories and build/tool configuration.

- [Mandatory agent instructions](governance/AGENTS.md)
- [Setup and contributor workflow](development/CONTRIBUTING.md)
- [Workspace architecture](architecture/FOUNDATION.md)
- [Foundation decisions](decisions/0001-phase-0-foundation.md)
- [Native authority and planned security](security/FOUNDATION_BOUNDARY.md)
- [Security policy](security/SECURITY.md)
- [Frozen Orion reference and differences](orion-reference/ORION_CONNECT_REFERENCE.md)
- [Available-device inventory](testing/DEVICE_MATRIX.md)
- [Implementation acceptance gates](phases/phase-0/IMPLEMENTATION_GATES.md)
- [Candidate branding guidelines](branding/GUIDELINES.md)
- [License: all rights reserved](legal/LICENSE)
- [Third-party notices](legal/THIRD_PARTY_NOTICES.md)

## Controlling planning edition

- [V2.4 master roadmap](planning/v2.4/RELAY_LINK_MASTER_ROADMAP_V2_4.md)
- [R01–R24 correction register](planning/v2.4/RELAY_LINK_V2_4_CORRECTION_REGISTER.md)
- [Historical planning-readiness report](planning/v2.4/RELAY_LINK_V2_4_PHASE_0_READINESS.md)
- [Design decisions](planning/v2.4/RELAY_LINK_V2_4_DESIGN_DECISIONS.md)
- [Validation plan](planning/v2.4/RELAY_LINK_V2_4_VALIDATION_PLAN.md)

Planning documents describe their original pre-authorization status. The owner's later November 4 message authorizes Phase 0 only; a READY planning label never meant a completed phase. All 14 phase weights and release progression remain unchanged. No Phase 0 PASS or completed-product percentage is claimed while mandatory exit evidence/owner design review is outstanding.

## Rights, publication and recovery

Official repository: https://github.com/OK-ALI/RelayLink. New original code is all rights reserved by owner decision; dependencies/fonts retain their own notices. Supplied poster artwork, original source snapshots, credentials, personal configuration, signing assets and local evidence/toolchains are excluded by `.gitignore`. A public repository is not a license grant, and ignored data is not remotely backed up.

Use meaningful commits on main and verify remote synchronization. Only verified significant milestones receive annotated checkpoint tags; do not create a branch/tag for each small change. Do not claim a phase-complete checkpoint until every required gate has passed. No installer or public release is authorized.
