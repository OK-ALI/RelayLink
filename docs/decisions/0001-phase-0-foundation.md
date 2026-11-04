# ADR 0001: foundation choices and boundaries

Status: implemented foundation decisions under Phase 0 authorization; the owner approved the theme/type/navigation and Linked Path concept direction; final production artwork remains unapproved.

- Preserve the selected Tauri 2 + React/TypeScript/Vite and Rust direction. Explicitly pin stable Tauri 2; do not accidentally select Tauri 3 prereleases. Native Windows control is absent.
- Use Expo SDK 58's compatible React/React Native/Router module versions and Expo Development Build. Expo Go is not the supported native validation path. Prebuild generates ignored Android sources; lockfile/app configuration are authoritative.
- Node 24.16.0, pnpm 11.25.0 and Rust 1.96.0 are reproducible baseline pins. TypeScript 6.0.3 follows the Expo template compatibility range; a newer major is not adopted merely because available.
- JSON Schema Draft 7 is the canonical contract. Generate TS types and validate Rust against shared fixtures; do not maintain a separate competing schema. Future schema evolution/security messages need their own applicable gates.
- Separate local status, UI and native authority. Only `foundation_status` is granted to the main webview. `boundary_probe` is enrolled but ungranted for real ACL rejection tests. No remote origins or actual Windows commands are granted.
- Namespace: application/service/storage `relay-link`, proposed protocol `relay-link-v1` version 1, proposed dedicated port 8934. No listener/port selection is implemented; no Orion keys, grants or storage are shared.
- Preserve local-first as the eventual transport requirement, not a Phase 0 network implementation. Electron Orion behavior is a read-only migration reference, not a dependency.
- Owner-selected license for new original code: all rights reserved. No original Orion code or supplied poster assets are redistributed. Dependency/font licenses retain their separate grants.

Tradeoffs: development shells prove UI/build/permission foundations, not pairing/game/device compatibility. Exact production app identifier ownership, hardware minimums, full font language coverage and final artwork remain explicit review items before distribution. No public installer/release is authorized in Phase 0.
