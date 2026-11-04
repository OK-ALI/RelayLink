# CODEX GLOBAL RULE — TEST GATES AND SMOKE TESTING AFTER EVERY IMPLEMENTATION

**Priority:** Critical, mandatory.  **Applies to:** Every authorized project and implementation.

1. For **every implementation** (feature, fix, UI change, integration, refactor, or behavioral configuration change), define an acceptance gate before editing. State the intended outcome, major risks, the affected existing behavior, and required checks. A compact checklist is fine for a small change.
2. After implementation, **Codex itself must execute** the feasible smoke test(s) for the affected workflow and all applicable quality checks. Do not stop at writing tests or successfully compiling.
3. Run targeted regression tests to ensure existing features still work. Test failure states and reconnection/recovery where relevant. For Relay Link controls, prioritize input-release safety, device connection, mode switching, responsive UI, and game profile continuity.
4. Inspect actual outputs, fix failures, and rerun checks. Record commands/procedures, results, and evidence. Prefer reusable smoke tests in the project's testing workspace over scattered or duplicated ad hoc scripts.
5. When a device, OS feature, game, driver, network, or other testing prerequisite is unavailable, say **NOT RUN / BLOCKED** explicitly. Never claim a simulated or mocked check proves real-device compatibility. Give exact follow-up steps.
6. Report each implementation gate as **PASS**, **CONDITIONAL**, or **BLOCKED**. PASS requires that all applicable mandatory checks actually ran successfully with no known critical regression. CONDITIONAL names incomplete evidence. BLOCKED identifies failed or impossible mandatory validation.
7. Keep implementation gates distinct from broader **phase and release gates**. Full phase/release checks and major verified GitHub checkpoints are still mandatory.
8. **Do not create separate Git branches or checkpoint tags for every implementation.** Use meaningful commits; create remote checkpoint tags for verified major milestones only.
9. No feature, fix, or phase may be represented as fully complete until its required test gate is satisfied. Never invent test evidence or mark skipped checks as passed.

**Operating principle:** Every implementation must be tested by Codex, verified against its acceptance conditions, and checked for regressions before it is called complete.
