# Relay Link V2.4 design decisions

Date: November 4, 2026  
Status: **Proposals only; no design approval inferred**  
Scope: Written comparison briefs; no rendered prototypes or production assets created.

## Locked requirements

The following requirements are preserved in the V2.4 master. Earlier amendment conflicts were consolidated; recommendations below do not change the locked product scope. Emergency Gaming Disconnect Protection is an additional explicit owner requirement.

- Windows Desktop + Android Mobile; coordinated design with platform-appropriate interaction.
- Local-first control with explicit host-enforced permissions and visible pause/revocation/recovery.
- Relay Command Center, customizable Relay Decks and Relay Pad remain related parts of Relay Link.
- Phone shows controls and PC shows gameplay in standard gaming. Viewing on the phone is a later separate permissioned capability.
- Reusable genre templates and **Template → Game Profile → Activity Layouts**, including Custom/Other and unlisted/older games.
- Phone Tilt and Steering Wheel are equal primary driving choices. One reachable left-thumb Drive Control handles up/center/down acceleration/coast/brake. Reverse must be deliberate and compatible with the title's actual input behavior.
- Straight and gently curved driving tracks must be compared; neither is selected.
- Manual activity switching remains dependable for a supported mapped layout; automatic activity changes require specific-title evidence.
- Every gaming layout exposes PC Controls and safe return to saved controls; switching releases prior held input.
- Corner Assist and Cruise Control are optional, limited and clearly explained. They are off in precision/competitive defaults; no road awareness, automatic braking or guaranteed speed is implied.
- An abstract interlocking-link brand symbol contains no letters, initials or gadget illustration. The wordmark is separate. Final symbol needs owner approval.
- Obsidian Amber, Arctic Light, Midnight Blue and Carbon Teal are proposed theme families pending exact visual approval and accessibility review. Candidate fonts are not locked.
- Low-resource behavior, clear text/icon statuses, accessibility and immediate input take priority over decoration. No continuous glow is needed to establish identity.
- All 14 phases and their weights remain unchanged. A design or genre template is not proven game support.

## Decisions to review

Each item is **PENDING**. The owner can accept a proposal, request a comparison or choose an alternative within the locked requirements. Detailed visual work requires separate authorization; no selection here starts implementation.

| ID | Decision | Recommendation | Review / approval criterion |
|---|---|---|---|
| D01 | Command Center composition | Connection hub first, current activity second, compact useful actions third, visible pause and permission summary | In a brief first glance, a new user identifies host/phone, allowed access, next action and Pause; disconnected state does not imply live traffic |
| D02 | Desktop navigation and Mobile Home | Use the readiness report's compact proposed map, with explicit paths to permissions, diagnostics and all shipped features | Compare against full roadmap taxonomy; no hidden essential safety control; same feature names on both apps |
| D03 | Dashboard personality | Restrained static directional linework and layered solid surfaces; connection pulse once | Still recognizable without animation, blur or glow; no large empty tiles that obscure current tasks |
| D04 | Shooter controls | Landscape left movement, broad right aim area, adjustable reachable actions, persistent PC Controls | Move/aim/fire/action can operate together; no control placed under a system gesture/cutout; saved handedness and scaling |
| D05 | Drive Control geometry | Straight track as comparison baseline; gentle curve as equal evaluation candidate | Measure reach, fatigue, regrips, misactivation and tilt interaction across devices; **shape not yet selected** |
| D06 | Wheel/track arrangement | Left Drive Control and right reachable wheel by default; customizable/mirrored alternative | Natural two-hand grip, no same-thumb steering/throttle conflict, no required extra fingers for common driving |
| D07 | Reverse interaction | Compare explicit Reverse selection plus deliberate drive gesture against lower-track hold | No surprise brake-to-reverse transition; title-level mapping validation. Without reliable vehicle feedback, do not claim an enforced stop condition |
| D08 | Optional driving aids | Explicit enablement; persistent state and one-action cancel; disabled in precision/competitive defaults | Corner Assist changes only permitted throttle input; Cruise holds an input, cancels on brake/mode change/failure, never auto-resumes |
| D09 | Multi-activity switching | Persistent favorites strip with direct one-action selection; optional extra activities in a picker | On Foot/Driving/Flying are examples, shown only where mapped; manual switching works with recognition off and releases previous inputs |
| D10 | Profile editor | Same Template → Game → Activity model on Desktop and Mobile, with Customize Controls, Duplicate and granular Reset | Local/shared ownership clear; edit/apply/conflict states understandable; import cannot add trust or scripts |
| D11 | Typography | Compare Space Grotesk display + Manrope functional UI against a licensed alternative | Small text, numerals, names, language/fallback, accessibility scaling and lean loading; no assumption that poster font equals approved font |
| D12 | Palettes | Use the master's written candidate role values as candidates, then specify semantic state pairs | Light/dark and Blue/Teal parity, high contrast, non-color safety, disabled/focus/error/readability; poster color labels do not override tokens |
| D13 | Link symbol | Compare three geometric concepts described below in monochrome first | No letter construction, same recognizable mark at 16 px and launcher sizes, no dependence on metallic lighting |
| D14 | Motion/quality | Balanced candidate default; Performance, Enhanced Visuals and Reduced Motion with consistent functions | Critical input never waits for animation; quality changes only optional visual cost; no game-HUD decorative background motion |
| D15 | Semantic vocabulary | Use PC Controls consistently inside games; retain Relay Pad and Relay Decks product names | Owner selects general PC/Home/Desktop labels once; identical concepts searchable on both apps |

## Straight versus gently curved Drive Control

| Criterion | Straight vertical track | Gently curved thumb track |
|---|---|---|
| Initial understanding | Direct up/center/down relationship and clear center notch | Same ordering, but the arc must not look like a steering input |
| Thumb reach | Easy to place/scale; may demand more extension at one end for some grips | May follow a natural thumb sweep; benefit depends on hand, case and phone width |
| Phone Tilt interaction | Easy to keep center direction stable while rotating the phone | Could reduce regrips, but curve direction may make tilt/grip coupling confusing |
| Steering Wheel interaction | Predictable independent track opposite the wheel | May improve reach if spaced well; must not encroach on the wheel hand |
| Accessibility | Simple mirrored placement and large targets | Needs meaningful mirroring and curve/placement choices; avoid added setup burden |
| Failure/feedback | Unambiguous neutral point without animation | Neutral must be equally clear without motion; no sticky end zones |

Recommendation: test the straight track as baseline and compare a subtle curve using identical mapping, target area and sensitivity. Randomize evaluation order and record fatigue and unintended actions, not just visual preference. **No final shape is selected.** Reverse safety is a separate decision; track shape must not decide reverse semantics accidentally.

## Three distinct letter-free symbol briefs

These are descriptions for an authorized visual comparison, not completed designs. They preserve the roadmap's three exploration directions while removing older R/L hints. The current poster offers one related link concept, not three alternatives.

| Concept | Silhouette brief | Distinct character | Main risk to reject |
|---|---|---|---|
| A — Linked Path | Two equal oblique rounded links interlock across one short central negative-space gap. Balanced parallel sides; no stem, leg or letter-shaped termination. | Compact diagonal connection; closest to the supplied link reference | Too generic a stock chain icon; inner gap disappears at 16 px; accidental letter reading |
| B — Relay Loop | Two opposed broad open-loop segments form a balanced continuous handoff shape with openings at opposite ends. More circular overall than A; no arrowhead or alphabetic stroke. | Continuous exchange with a rounder silhouette | Collapses into an infinity/generic sync symbol or needs a gradient to explain overlap |
| C — Directional Bridge | Two blunt rounded endpoint loops overlap across a short horizontal central bridge, using a wide squat silhouette and deliberately asymmetric interlock. No arrow, cursor or letter construction. | Stable horizontal connection; clearly different outer silhouette from A/B | Resembles a letter/plug/battery, or introduces fine detail unreadable in monochrome |

For all three, review solid black/white first, then restrained two-tone Amber/Light. Compare native 16/20/24/32 px tray sizes, larger Windows/taskbar/Start use, Android masks, notification monochrome and store display. Include connected/disconnected/paused/warning/update states with shape or badge support rather than color alone. One approved core symbol must serve both platforms.

Desktop delivery follows master §18.10: editable vector master, transparent exports and multi-size ICO; the tray uses a simpler reduction. Android uses intentional foreground/background layers and monochrome/notification variants. The V2 poster's glossy rounded tile and strong glow are not approved asset directions. Originality/lookalike and usage-rights checks remain pending; a generated or drawn concept is not trademark clearance.

## Candidate palette register

Values below are the V2.4 master §18.8 candidate baseline inherited from the primary V2.3 specification; none is a tested or approved semantic token set.

| Role | Obsidian Amber | Midnight Blue | Carbon Teal | Arctic Light |
|---|---|---|---|---|
| Canvas | `#101419` | `#0B1423` | `#0C1718` | `#F7F8FA` |
| Primary surface | `#1B232D` | `#16273E` | `#182A2A` | `#E9EDF2` |
| Secondary/elevated | `#303C49` | `#28496A` | `#27504B` | `#CDD6E0` |
| Accent | `#F0A34A` | `#5E9BFF` | `#44D2B1` | `#A75A15` |
| Main text | `#F5F1E8` | `#E6F0FF` | `#E4FAF5` | `#202B38` |

V1's Arctic accent appears different and its final swatch label is garbled. Resolve that discrepancy explicitly. Each family still needs text-on-accent, secondary text, focus, hover/pressed, disabled, divider, input, selection and safety-state roles. Theme accent must not replace connected/warning/destructive meanings. Review with low-brightness displays, text scaling, high contrast and reduced motion; color alone cannot carry state.

## Approval record and next boundary

When decisions are actually made, record D-ID, selected option, approver/date, reviewed exact visual revision, remaining limits and validation gate. An approval of a mood board does not approve all its navigation, icon rendering, palette values or implied features. A preference must never silently become a compatibility claim.

Planning corrections are tracked in the [correction register](RELAY_LINK_V2_4_CORRECTION_REGISTER.md); entry and later gates are in [readiness](RELAY_LINK_V2_4_PHASE_0_READINESS.md) and the [validation plan](RELAY_LINK_V2_4_VALIDATION_PLAN.md). D01–D18 remain pending exact design selections. No application/prototype/test pass/repository/start is claimed.


## Emergency disconnect experience — required behavior, pending presentation

The safety contract is locked by the owner's new requirement and master §17.14. The following choices concern presentation/default review, not permission to weaken release protection.

| ID | Pending decision | Comparison and acceptance |
|---|---|---|
| D16 | Loss/release/pause/recovery status presentation | Compare concise persistent in-session banner versus compact status panel. Desktop/tray stays visible on loss; Mobile shows local loss and receives actual host result after fresh auth. Distinguish release requested/confirmed/unknown, pause attempted/menu opened/game visibly paused/skipped/unsupported. No fabricated successful pause, no repeated reconnect alerts. |
| D17 | Per-game pause-action setup | Show Esc where appropriate, Start/Menu, one custom supported action or Off, with plain limits. Preview the selected action and target/route; no multi-action script. If safe targeting is unproven, auto-pause is disabled with a clear explanation while release stays mandatory. Shared-game pause needs explicit policy. |
| D18 | Deliberate recovery and re-arm | Compare a single clear Resume Controls action with a neutral-state confirmation view. Fresh authenticated epoch/current permission/target and neutral state are required. Re-arm never automatically resumes game/Cruise or restores held input; any new action is intentional and fresh. A new socket or countdown is not re-arm. |

The 250 ms release and 750 ms loss-classification numbers are provisional engineering budgets in master §22, not aesthetic decisions, achieved results or implied approval. Phase 0 may refine design wording; no setting may disable owned-input release or restore held input after reconnection.

## Required visual comparison set

During authorized Phase 0 compare Desktop and Mobile boards for Command Center/Home, unpaired/pairing/approval/denied/expired states, settings/search/local ownership/conflict/reset, touchpad/keyboard, landscape Shooter and both Drive steering modes/track shapes, activity favorites, profile editor, PC Controls return and emergency disconnect/recovery. Test candidate palettes in dark/light, then Blue/Teal parity, high contrast/text scaling/reduced motion. The supplied theme board does not contain all required screens.

Approval records name D-ID, exact revision, choice, approver/date, limitations and next validation gate. Locked behaviors need not be re-approved as artwork; exact artistic choices remain open until genuinely selected. Never infer approval from a poster or this written design register.
