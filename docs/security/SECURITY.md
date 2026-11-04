# Security scope

Phase 0 is a local foundation with no Windows control authority, pairing server, service, driver, capture or gaming subsystem. Do not use it as a secure remote-control product. See `docs/security/FOUNDATION_BOUNDARY.md` for implemented and planned boundaries.

Do not commit credentials, private configuration, signing material, supplied uncleared artwork or original reference snapshots. Use `pnpm verify:publication` and review staged content before every public push. Local source snapshots/test outputs are ignored and need separate backup if important. Automated pattern scans supplement human review; they are not a guarantee against every secret.

Report suspected vulnerabilities privately through the repository owner's available private channel. Do not disclose credentials or sensitive reproduction data in public issues. No bounty, response deadline or audited product security is claimed.
