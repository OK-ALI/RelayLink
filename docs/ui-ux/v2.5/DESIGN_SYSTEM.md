# Foundation design system refinement

## Implemented for review

Relay Link keeps the approved four theme palettes and original Linked Path direction. The existing Command Center composition remains device connections, PC activity, visible access controls, Quick Access and compact unavailable control rows. Normal screens use product language; phase/progress details are in About. Preview states do not claim functioning pairing, PC monitoring or control.

The two applications share semantic colors, typography candidate identities, Settings sections and motion timing. Platform controls keep native semantics: Desktop uses keyboard-accessible buttons, radio controls, switches, ranges and modal dialogs; Android uses Pressable, native Switch/Slider and Modal sheets. Controls have explicit selected/disabled/error/loading studies, focus and pressed treatment. Solid surfaces, restrained borders and clear hierarchy replace decorative effects. Mobile controls use 48 dp minimum targets; text can grow with system scaling.

The Android precision slider wraps the native drag control in a full 48 dp adjustable/touch target with bounded one-step accessibility actions and full-row touch-to-set. This corrects the dependency's thin exposed SeekBar without changing it or replacing native dragging. The auxiliary web export uses a semantic HTML range with keyboard support. Physical spoken-screen-reader behavior remains a separate check.

Jump to Section is the primary Settings entry. Desktop has a section rail and dialog; Mobile has a section sheet. Keywords remain secondary inside the picker. Only the five existing foundation sections appear. Privacy/About can be opened directly. Explicit back controls and session scroll restoration preserve context; hardware Back and deep links are separately exercised on Android. No new service or remote authority is involved.

Typography is a review function, not a settings migration. Three systems are available for the same real interfaces; the default is unchanged. [Comparison, licensing, coverage and actual captures](TYPOGRAPHY_REVIEW.md).

## Motion primitives

| Primitive                                  | Performance / Reduced Motion | Balanced     | Enhanced     |
| ------------------------------------------ | ---------------------------- | ------------ | ------------ |
| Section reveal / native navigation opacity | Immediate                    | 160 ms       | 220 ms       |
| Desktop control state / switch thumb       | Immediate state              | Up to 160 ms | Up to 220 ms |
| Selection and input acceptance             | Immediate                    | Immediate    | Immediate    |

OS Reduced Motion overrides the quality mode. Timings do not gate actions. Desktop transitions are CSS state transitions; new navigation replaces the prior section animation. Native opacity uses Animated with the native driver, stops prior work and restores full visibility on interruption/background. There are no decorative loops, continuous waveform effects or hidden security states. Static loading/focus/pressed studies are explicitly demonstrations, not fake pending device actions.

The actual Windows rapid-navigation diagnostic verifies zero active animations in Performance/Reduced and observed animations in Balanced/Enhanced. It records short rAF intervals, not physical input latency or a display refresh guarantee. Android evidence includes OS animation-scale changes, selections, native recording and gfxinfo; these remain development/emulator diagnostics.

## Sound and haptic proposals

| Event/category                   | Current foundation                                                  | Future rule requiring its own implementation gate                                              |
| -------------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Navigation and routine actions   | Silent                                                              | Avoid sound for every action                                                                   |
| Selection haptic                 | Explicit opt-in manual Android demonstration                        | Respect app and device preferences; one short tick for a meaningful selection                  |
| Connection success               | No product event is wired; only labeled manual chime demonstrations | One signature cue only after authenticated connection success is confirmed                     |
| Security / unexpected disconnect | No simulated product event                                          | Visible state first; sound never substitutes for safety behavior or delays owned-input release |

Two original two-note WAV concepts are reproducibly synthesized by `tooling/generate-chimes.py`. A uses C5 → G5; B uses A4 → E5. Each is 0.65 seconds, mono 44.1 kHz PCM16, with soft attack/decay and restrained amplitude. Neither is the approved signature sound. They are concepts for a later confirmed-connection cue; playing one here is a demonstration and does not indicate a connection.

Demonstrations begin muted, use local preview volume, throttle repeated requests and provide Stop. Leaving the section or backgrounding cancels playback. Native playback completion is based on actual player events; a timeout is reported as a timeout. Haptic request completion is reported as an API request, not a felt sensation. Error and cancellation handling do not block navigation. No startup, network, pairing or reconnection callback can play these previews.

Preferences are session-only. Native sound uses mix-with-others with no background/recording capability; the merged APK manifest is checked separately from configuration. System master volume applies. Media may remain audible during Do Not Disturb on some platforms; this foundation does not promise DND detection or override platform policy. Physical silence, speaker quality, comfort and vibration strength require owner hardware review. Category-wide production persistence and real connection-event behavior remain proposed.

The quality references are [Samsung's task-focused writing guidance](https://developer.samsung.com/one-ui/writing/focused-and-purposeful.html) and [Apple's guidance on purposeful, optional motion](https://developer.apple.com/design/human-interface-guidelines/motion). The implementation follows Relay Link's own palette, icon and architecture. Native feedback limitations follow [Expo Audio](https://docs.expo.dev/versions/v58.0.0/sdk/audio/) and [Expo Haptics](https://docs.expo.dev/versions/v58.0.0/sdk/haptics/); those APIs do not establish physical perception.

## Decisions still required

Owner selection of a font system and signature chime, physical sound/haptic evaluation, and production artwork remain open. No new phase is authorized by these studies. Phase 0 remains PASS at 4%.
