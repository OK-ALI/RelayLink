# Project workspace

All current/future project documentation belongs under `docs/`. Source assets and build/tool configuration retain their own appropriate homes.

```text
RelayLink/
├── apps/
│   ├── desktop/                 React/Vite UI and isolated src-tauri host
│   └── mobile/                  Expo Router/React Native development shell
├── crates/
│   ├── relay-core/              Local status; no Windows execution engine
│   └── relay-protocol/          Rust contract and canonical-schema fixtures
├── packages/
│   ├── design-tokens/           Candidate themes, spacing and identity
│   └── protocol-schema/         Canonical schema, fixtures, generated TS/validator
├── branding/source/             Original editable SVG concept sources
├── tests/ui/                    Browser smoke and review captures
├── tooling/                     Reusable publication/native smoke helpers
├── docs/
│   ├── README.md                Project/documentation entry point
│   ├── governance/              Agent, backup, quality and organization rules
│   ├── development/             Setup and workspace organization
│   ├── architecture/            Foundation responsibilities
│   ├── decisions/               Technical decision records
│   ├── security/                Authority boundary and security policy
│   ├── legal/                   License and third-party notices
│   ├── branding/                Brand requirements and approval status
│   ├── ui-ux/                   Review board and sanitized captures
│   ├── orion-reference/         Pinned behavioral provenance, not copied code
│   ├── testing/                 Environment matrix and sanitized evidence
│   ├── planning/                V2.3 history and V2.4 controlling plan
│   └── phases/phase-0/          Acceptance gates and result/evidence
├── .github/workflows/           Clean-runner verification
├── Cargo.toml / Cargo.lock      Rust workspace and locked graph
├── package.json / pnpm-lock.yaml / pnpm-workspace.yaml
└── build, format and lint configuration
```

Ignored: dependency/build/Expo caches, generated Mobile native projects, test outputs, `.toolchains` and `artifacts-local` (including reference snapshots and clean-clone verification). None is remotely backed up. No credentials or production signing material are committed.

Later Windows modules, installers, drivers and control/streaming feature directories are not created as empty placeholders. Add them only with an authorized phase and real responsibility. Orion is not a build/runtime dependency.
