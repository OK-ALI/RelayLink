# Contributing and verification

Phase 0 only is authorized. Read [agent instructions](../governance/AGENTS.md), the V2.4 master and `docs/phases/phase-0/IMPLEMENTATION_GATES.md` before changes. All new documentation belongs inside `docs/`, except the owner-required minimal root agent entry. Original Relay Link code is all rights reserved; public visibility is not permission to redistribute it. Third-party licenses remain separate.

Use Node 24.16.0, pnpm 11.25.0, Rust 1.96.0, Windows MSVC/SDK/WebView2 for Desktop, and Expo SDK 58's native prerequisites for Android. Install pnpm with your preferred trusted package-manager setup; then `pnpm install --frozen-lockfile` and `pnpm generate`. Run `pnpm check`, `pnpm build:desktop-ui`, `pnpm export:mobile`, `cargo test --workspace --locked`, and `cargo clippy --workspace --all-targets --locked -- -D warnings`.

Desktop: `pnpm dev:desktop` for local Vite/Tauri development; `pnpm build:desktop` for the embedded-assets executable. Mobile: `pnpm dev:mobile` with an Expo Development Build, not an Expo Go-only workflow. `pnpm --filter @relay-link/mobile prebuild` generates ignored Android sources; build with the documented Expo/Gradle toolchain. Debug APKs are development artifacts, not signed public releases.

Browser smoke: export Mobile then `pnpm test:ui` (local Edge; CI installs Chromium). Native smoke: build Desktop with embedded assets, start stable `tauri-driver` 2.1.0 with the matching Microsoft Edge driver on port 4444, then `pnpm test:native`. Save actual native/browser evidence under ignored `artifacts-local/`; commit concise redacted summaries. A browser or mock test does not establish native/device behavior.

Before each implementation define acceptance/smoke/regression checks; execute every feasible required check, inspect failures, fix and retest. Missing mandatory environment checks are NOT RUN/BLOCKED. Keep meaningful commits on main; verified significant milestones need pushed/verified annotated checkpoints. Do not create one branch/tag per small change or advance to Phase 1 without explicit owner authorization.

Windows Android build setup and the explicit short-path Gradle command are documented in [Android Windows build](ANDROID_WINDOWS_BUILD.md). Use `--max-workers=2` for Gradle and `--max-workers 2` for Metro on constrained test hosts. `node tooling/smoke-android.mjs` targets a dedicated emulator, verifies Home/Settings/search/theme/native reduced-motion state, and records RUNNING/PASS/FAIL evidence. It must never claim physical-device validation.

Expo SDK 58 removes `expo-env.d.ts` and its generated-type includes when experimental typed routes are disabled. The foundation follows that installed CLI behavior: app/source TypeScript remains checked; generated route types are not tracked or manually restored. Any later typed-route adoption needs its own gate.
