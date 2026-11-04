# Documentation organization

The owner explicitly requested that all current and future project documentation live under `docs/`, separated by purpose. This supersedes earlier sample repository trees that placed overview, license or contributor documents at root.

Use `docs/README.md` as the entry point; `governance` for permanent agent/project rules, `development` for setup, `architecture`/`decisions` for structure and ADRs, `security`, `legal`, `branding`, `orion-reference`, `testing`, `planning` and `phases` for their corresponding responsibilities. New documents follow these homes rather than scattering Markdown across application or root folders.

The full agent instructions live unchanged at `docs/governance/AGENTS.md`. By the owner's subsequent explicit refinement, a minimal repository-root `AGENTS.md` is retained for automatic instruction discovery and points to that full document. This is the sole project-documentation exception; other documentation stays under `docs/`. Historical manifest references to that root path are resolved through this documented relocation in regression checks; the bytes remain unchanged. Raw planning inputs and source snapshots remain ignored. Historical reports retain dated observations; current authorization/status is recorded in the Phase 0 report and overview.
