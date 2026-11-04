# Frozen Orion behavioral reference

Read-only snapshot: [OK-ALI/Orion at 5d5e893f8be951020015aa658dfe1a67d8c0b16d](https://github.com/OK-ALI/Orion/tree/5d5e893f8be951020015aa658dfe1a67d8c0b16d), inspected November 4, 2026. Owner confirmed the GitHub code is newer than the local checkout. No Orion workspace or remote was modified.

| Logical source                                             | Git blob                                   |
| ---------------------------------------------------------- | ------------------------------------------ |
| `apps/desktop/src/main/ipc/smartConnectIpc.js`             | `4b8e1649ad0433efd3034d17aadf7172f9ec1385` |
| `apps/mobile/src/features/connect/useConnectController.ts` | `0a0f0d2eefea930717ef53af287b06bf4af11228` |
| `packages/shared/src/types/smartConnect.ts`                | `87955004435b14abf53a081a048682a9cc02f64f` |
| `apps/desktop/src/main/smartConnect/pairingStore.js`       | `772d5cf76832b731b8e306074943ffc032c9d1e7` |
| `apps/desktop/src/main/smartConnect/secureTrust.js`        | `9ccc7b6194842285f984fc8269c1f2d9fa6dd333` |

Ignored local snapshots are complete base64-decoded GitHub contents, identified by the pinned blob/revision; they are not part of the public Relay Link source. The remote root has no detected project license. Mobile's LICENSE is the Expo template MIT notice, not blanket proof of rights to all Orion modifications. No source code is reused or relicensed. This report describes observed structure/constants; it does not claim Orion runtime/security tests passed.

## Source observations versus the historical plan

The actual snapshot describes Smart Connect **v3**, using HTTPS, host identity/fingerprint, device signatures and single-use connection tickets. Pairing routes are `/api/pair/start`, `/api/pair/confirm`, `/api/pair/result`, `/api/pair/reject`; authentication uses challenge/ticket routes. Legacy command/pair paths are handled separately rather than evidence of the old bearer-only flow. Desktop/Mobile confirmations and secure storage are present in source.

Observed constants: port 8924, six-digit random code, five-minute code lifetime, five failures with a **five-minute attempt window**, two-minute lockout, 90-day inactivity expiry, 1.8-second Desktop command timeout and 15-second/45-second heartbeat/dead-connection logic. Mobile ordinary acknowledgement timeout is 2.2 seconds with action-specific exceptions; reconnect uses backoff plus jitter. These are static source observations, not measured timing guarantees.

The roadmap's older account describes plaintext v2, five failures per minute, simpler bearer pairing, fixed reconnection and polling. Do not overwrite that historical description to fabricate parity. Record these differences for owner/technical review **before Phase 1 migration**. The approved Relay Link rate-limit/security targets are not silently relaxed to match current Orion. Current source protocol types and acknowledgement/state flow provide reference, not permission to implement them now.

## Migration boundary

Phase 0 freezes provenance and documents observations only. Phase 1 must first agree which current behaviors form the migration baseline, verify source reuse rights if copying is proposed, execute parity tests, isolate service/protocol/storage/credentials and preserve user-facing pairing reliability. Phase 2 independently verifies the complete encrypted/key-bound authority gate. A UI build or source read cannot prove pairing works; the old heartbeat is never the held-input watchdog.
