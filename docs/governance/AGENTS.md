# AGENTS.md — Relay Link

> Permanent project instructions for Codex and other coding agents.
> Status: **Planning only**. As of 2026-11-04, no Relay Link implementation has begun.

## 0. Authority and safe scope

- Follow the user's current explicit instructions and the approved Relay Link master roadmap. Do not treat suggestions or mockups as approval to implement.
- **Do not start Phase 0, write application code, install dependencies, create releases, or initialize a live project workspace until expressly authorized.** Planning, reviewing, and producing documents are permitted when requested.
- If there is a conflict among project documents, identify it and request a decision before executing consequential work. Do not quietly override a previously approved requirement.
- State clearly what is *planned*, *implemented*, *tested*, or *blocked*. Never report planned work as completed.

## 1. GitHub repository policy

- At the beginning of authorized project setup, look for the correct existing repository and verify ownership/access before creating anything.
- If the project has no repository, create **one public GitHub repository** under the **authorized owner's account**, using the official project name, a useful description, README, `.gitignore`, and relevant setup documents. Do not create duplicates or publish to an unrelated account.
- Before any public push, inspect all tracked and staged content for passwords, access tokens, private keys, signing certificates, personal data, private configuration, or other secrets. Keep sensitive items outside the public repository, with secure backups as appropriate.
- If access, permissions, billing, network, or credential constraints block GitHub operations, preserve local work, report the blocker, and never claim a remote backup succeeded.
- Repository creation is **not** permission to begin application implementation.

## 2. Commits, checkpoints, and recovery

- Use meaningful, focused commits to document normal progress. **Do not create a branch for every fix, task, UI change, or small implementation.**
- Use a stable main branch, and create a feature/integration branch only when isolation materially improves safety or review. Reuse and close branches sensibly; avoid accumulating abandoned branches.
- After a **verified major feature, subsystem, phase, or stable integration milestone**, commit, push, and verify the remote history. Prefer an **annotated Git tag** for a stable checkpoint, e.g. `checkpoint/phase-01-complete` or `checkpoint/relay-pad-foundation`, pointing to a validated commit. Push the tag and verify that it exists remotely.
- Before risky work, identify the latest verified recovery point and preserve unrelated user changes. Do not force-push, rewrite shared history, delete branches/tags, or discard local work without explicit authorization.
- A GitHub push backs up tracked source and documentation, **not** ignored local data, credentials, or signing material. Identify separate secure backup needs without placing secrets in GitHub.
- A major milestone is not fully complete until its **required remote checkpoint has been verified**. A local commit is not a remote backup.

## 3. Workspace and architecture

- Before authorized implementation, design and document an appropriate, professional workspace structure. For Relay Link, clearly separate Desktop, Mobile, shared contracts/design assets, tests, documentation, tooling, and release artifacts.
- Keep the repository root lean. Give every file one clear purpose and a logical home. Avoid dumping files into the root or creating overlapping `old`, `new`, `final2`, or `temp` trees.
- Prefer clear module responsibilities and stable boundaries. Reuse established components and conventions without creating unnecessary layers of abstraction or coupling unrelated parts.
- Separate source, configurations, generated output, build artifacts, local logs, and temporary test evidence. Apply an accurate `.gitignore` and keep intentional evidence in a documented location.
- Avoid adding dependencies, frameworks, or background services unless they demonstrably improve the product. Preserve the approved product architecture unless a change is documented and approved.
- Keep implementation and documentation aligned. Document key decisions and explain important limitations or compatibility constraints.

## 4. Code quality and non-regression

- Clean, readable, correctly formatted, secure, maintainable, and testable code is mandatory; delivery speed does not excuse weak quality.
- Use consistent naming, small cohesive units, explicit error handling, and configurations rather than brittle hardcoded values. Eliminate duplicated logic, unused dependencies, dead code, and accidental temporary workarounds.
- Understand affected existing behavior before editing. Change only what's needed, preserve existing working functionality, and test for regressions.
- Keep code accessible to another developer without requiring the original author to explain the structure.
- Avoid unnecessary CPU, memory, GPU, network, and battery usage. Relay Link must remain smooth on supported lower-end hardware; game control must not wait on decorative animations.
- Interface and user-facing copy should follow the approved Relay Link design system, use consistent terminology, and provide helpful feedback. Do not invent unsupported compatibility claims.

## 5. Implementation-level test gates and mandatory Codex smoke tests

**Every completed implementation must pass a defined verification gate before Codex claims it is complete.** This applies to a new feature, bug fix, UI/UX change, refactor, configuration change, integration, or other change to working behavior. This is separate from, and in addition to, the broader phase-exit gates.

### 5.1 Define the gate for each implementation

- Before changing code, identify the intended behavior, affected features, risks, and a short, testable checklist of acceptance conditions. For very small edits, a compact gate is sufficient; do not create excessive paperwork.
- Define at least one **targeted smoke test** that Codex will execute after the implementation, plus relevant automated checks (such as formatting, linting, type checks, build, unit tests, integration tests, and affected regression checks).
- Where applicable, include negative/error cases, permissions, disconnect/reconnect behavior, performance/resource limits, accessibility, responsiveness, and low-end-device behavior.
- Keep repeatable smoke checks as maintainable test scripts/checklists within the existing organized testing workspace; avoid duplicating near-identical test suites for each feature.

### 5.2 Codex must run, not merely describe, the tests

- After implementation, Codex must **personally execute every feasible required smoke test and applicable check in its available environment**, inspect the actual output, and fix failures before retesting.
- For Desktop/Mobile changes, exercise affected user flows where a runnable environment exists. For controller features, test relevant actions, held-input release, mode switching, connection loss, and recovery when feasible.
- Validate that existing core functionality still behaves correctly; every implementation gets an appropriate regression check.
- A successful compile or a written test plan is **not** a substitute for a run smoke test.
- Do not claim physical-device, driver, game, network, accessibility, or performance validation if the required environment was unavailable. Mark the check **NOT RUN / BLOCKED**, state why, and give exact owner-run steps when needed.
- Never fabricate test results, coverage, performance numbers, screenshots, device access, or passing evidence.

### 5.3 Clear results and gate enforcement

Each implementation ends with an evidence-based gate record:

- **Change and acceptance criteria**
- **Executed checks:** exact commands or procedures, environment, and PASS/FAIL status
- **Smoke test:** actions performed and observed results
- **Regression checks:** affected existing features verified
- **Skipped/blocked checks:** reason, impact, and specific next action
- **Overall gate:** `PASS`, `CONDITIONAL`, or `BLOCKED`

`PASS` is allowed only when **all applicable required checks actually ran and passed** and no critical regression is known. `CONDITIONAL` must identify remaining validation and cannot be presented as fully verified. `BLOCKED` means a mandatory check failed or could not be completed where success depends on it.

Do not advance from an unverified implementation into dependent work without identifying the risk and obtaining approval where appropriate. Do not publish a stable checkpoint for work that has not passed its required gate.

### 5.4 Phase and release gates remain separate

- **Per implementation:** scoped acceptance criteria, executed smoke tests, targeted regression checks, result report.
- **Per phase:** integration across implementations, broader smoke suite, accessibility/usability/performance evidence, clean-install checks when relevant, and verified GitHub checkpoint.
- **Per release:** full relevant regression suite, real-device testing, installer/upgrade/rollback checks, security and compatibility evidence, and release approval.

Do **not** create a Git branch or GitHub tag for every small implementation. Continue meaningful commits and normal remote synchronization; create stable checkpoint tags for **verified significant milestones** according to Section 2.

## 6. Required report for major milestones

Record:

- **Scope / milestone:** what was approved and what was delivered
- **Result:** PASS / CONDITIONAL / BLOCKED, with supporting evidence
- **Repository:** name and URL
- **Branch:** current branch
- **Latest commit:** full or short commit ID
- **Checkpoint:** tag and verified remote location, or `none`
- **GitHub sync:** verified / pending / failed
- **Recovery point:** latest confirmed remotely available stable commit/tag
- **Working tree:** clean or a summary of uncommitted changes
- **Quality checks:** executed checks, smoke-test evidence, implementation/phase gate results, and remaining gaps
- **Known risks:** unresolved issues, compatibility limits, or follow-up items

## 7. Final standard

Maintain **professional organization, reliable recovery, high code quality, implementation-level smoke tests, verified behavior, security, and low resource usage** at every authorized stage. Do not trade away these qualities for apparent speed. Keep branching selective, checkpoint significant milestones, and never confuse planning with implementation.
