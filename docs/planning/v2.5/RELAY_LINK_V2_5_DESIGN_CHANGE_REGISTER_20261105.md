# Relay Link V2.5 — Design Refinement Register

**Date:** November 5, 2026  
**Status:** Owner-requested requirements captured in the V2.5 master; not implementation evidence.  
**Baseline:** Verified Phase 0 PASS = 4%; V2.4 and its completed recovery checkpoint remain immutable; Phase 1 unauthorized.

| ID | User feedback / decision | Master requirement | Main implementation allocation | Acceptance evidence |
|---|---|---|---|---|
| UI-01 | Existing fonts feel ordinary/under-polished | §18.11 three actual rendered typography alternatives, including baseline | Separate foundation design-polish task; extended in Phase 4 | Owner compares native Desktop/Android typography, scaling, weights and licenses |
| UI-02 | Elements look basic, not merely low-resolution | §18.11 and §19.14 crafted controls and task-led composition | Foundation primitives; Phase 4 functional dashboard | State/size/touch/keyboard matrix; before/after screenshots |
| UI-03 | Smooth natural animations matter | §18.12 motion tokens, interruptible feedback, reduced motion | Scoped foundation motion; actual states in later phases | Recorded screen transitions, native runtime checks, no latency regression |
| UI-04 | Calm sound/haptics (e.g., successful phone connection) | §18.13 quiet chime policy, confirm-then-play, mute, dedupe and gaming rules | Feedback primitives can be designed now; real pairing cues Phase 1 | Local licensed audio, actual confirmed event, mute/DND/no-repeat/failure checks |
| UI-05 | One coordinated Desktop/Mobile identity | §18.15 cross-platform tokens and review | Foundation design-polish and every later relevant phase | Themed side-by-side comparison, platform-correct touch/focus |
| UI-06 | No flashy/glassy visuals, keep resource use low | §18.11 and §22.5 solid surfaces, no heavy effects | Entire project | Frame/memory/CPU/GPU, Low-end/Reduced Motion vs Balanced |
| UI-07 | Jump to Section preferred over prominent Settings search | §18.14 and §20.12 primary section navigation; optional secondary search | Foundation Settings and later categories | Anchor/active category/back/scroll/accessibility/motion on both platforms |

## Explicit constraints

- Do not revoke Phase 0 PASS, rewrite completed checkpoint or add a new phase/percentage.
- Do not alter pairing/security/EGD safeguards, input/game stages or product scope beyond the reviewed UI/feedback refinement.
- Keep existing work modular and test every changed implementation with native Desktop + Android runtime evidence where relevant.
- Reuse existing `docs/` taxonomy and keep root `AGENTS.md` for Codex discovery.
- The currently installed Space Grotesk and Manrope have valid Phase 0 licensing checks but are **not owner-approved final typography**.
- Do not play connection-success sounds before a **real confirmed connection** exists; demonstration/prototype feedback must be labeled simulation.
- Preserve honest errors/offline states and never represent in-progress future features as live.

## Document versioning and safety

V2.5 is a successor specification, not an in-place rewrite of the V2.4 master. Codex should integrate it as a new `docs/planning/v2.5/` edition, review cross-links and add a small decision/evidence record; do not overwrite the completed V2.4 or Phase 0 verification report. No actual Relay Link source files or user repository have been modified by generating this package.
