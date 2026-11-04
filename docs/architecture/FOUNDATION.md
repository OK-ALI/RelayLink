# Foundation architecture

Phase 0 only: a Tauri 2/React/TypeScript/Vite Windows shell, React Native/Expo Development Build/Expo Router Android shell, Rust core and protocol workspace, canonical JSON Schema and semantic design tokens. No pairing server, Windows control module, gaming engine, service, driver, screen capture or streaming is present.

| Location                         | Responsibility                                                                            |
| -------------------------------- | ----------------------------------------------------------------------------------------- |
| `apps/desktop/src`               | Command Center, local navigation/preferences and typed harmless IPC wrapper               |
| `apps/desktop/src-tauri`         | Tauri entry, explicit app-command manifest and actual main-webview capability             |
| `apps/mobile/app`                | Expo Router shell, local presentation and settings                                        |
| `crates/relay-core`              | Local foundation status, deliberately no control authority                                |
| `crates/relay-protocol`          | Rust status serialization and canonical-schema fixture validation                         |
| `packages/protocol-schema`       | Canonical Draft 7 schema, generated TypeScript and shared positive/negative fixtures      |
| `packages/design-tokens`         | Candidate themes, typography-independent semantics, spacing, motion and isolated identity |
| `branding`                       | Original unapproved link-symbol studies and usage criteria                                |
| `tests`, `tooling`               | Reusable browser/native smoke, regression and publication checks                          |
| `docs`, `.github/workflows`      | Specifications, decisions, evidence summaries and clean-runner verification               |
| `artifacts-local`, `.toolchains` | Ignored local source snapshots, screenshots/logs and testing tools                        |

Later directories from the approved structure are created when their real implementation is authorized. Empty Windows-control/driver/service packages are not scaffolded. Frontends share semantics/contracts rather than forcing common platform UI components.

Desktop and Mobile use a shared candidate Space Grotesk/Manrope type direction, but keep their own controls/navigation appropriate to screen size. Appearance state is local and does not synchronize authorization. Current shells do not store credentials or create network control endpoints. Development servers bind loopback only and are not product transports.

Canonical source: `packages/protocol-schema/schema/foundation-state.schema.json`. `pnpm generate` emits TypeScript; AJV validates fixtures in Node and `jsonschema` validates the same schema/fixtures in Rust. Future authenticated protocol commands are not implemented by the foundation-state fixture. `.invalid` schema IDs are identifiers, not remote schema endpoints.
