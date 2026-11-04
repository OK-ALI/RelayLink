# Documentation organization

The owner explicitly requested that all current and future project documentation live under `docs/`, separated by purpose. This supersedes earlier sample repository trees that placed overview, license or contributor documents at root.

Use `docs/README.md` as the entry point; `governance` for permanent agent/project rules, `development` for setup, `architecture`/`decisions` for structure and ADRs, `security`, `legal`, `branding`, `orion-reference`, `testing`, `planning` and `phases` for their corresponding responsibilities. New documents follow these homes rather than scattering Markdown across application or root folders.

Agent instructions moved unchanged from root `AGENTS.md` to `docs/governance/AGENTS.md`. Historical manifest references to that root path are resolved through this documented relocation in regression checks; the bytes remain unchanged. Raw planning inputs and source snapshots remain ignored. Historical reports retain dated observations; current authorization/status is recorded in the Phase 0 report and overview.
