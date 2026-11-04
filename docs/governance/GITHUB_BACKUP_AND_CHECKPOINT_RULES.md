# CODEX GLOBAL RULE

## GitHub Repository, Backup & Checkpoint Management

**Priority:** Mandatory
**Applies to:** All projects developed or maintained using Codex.

### 1. GitHub Repository Creation

When starting work on a new project:

* Check whether the project already has a GitHub repository.
* If no repository exists, create a new **public GitHub repository** under the authorized GitHub account.
* Use the official project name and an appropriate description.
* Initialize the repository with a README, `.gitignore`, and appropriate project documentation.
* Connect the local project workspace to the GitHub repository.
* Verify that the repository is accessible and that synchronization works correctly.
* Never create duplicate repositories unnecessarily.

**Important:** Public repositories must never expose passwords, API keys, signing credentials, private certificates, personal data, or other sensitive information. Resolve any security concerns before publishing.

Repository creation does not authorize starting implementation when the current assignment is planning-only.

### 2. GitHub as a Mandatory Backup

GitHub must serve as the project's persistent remote source repository.

Codex must not rely exclusively on local storage for important project progress.

After meaningful, verified development milestones:

1. Commit the completed changes.
2. Push the commits to GitHub.
3. Verify that the remote repository contains the expected changes.
4. Record the relevant commit identifier.
5. Report the synchronization status.

A local commit alone does not count as a successful GitHub backup.

### 3. Checkpoints for Major Implementations

Create a recoverable GitHub checkpoint whenever a major implementation, core feature, development phase, or stable milestone is successfully completed and verified.

Examples include:

* Completion of the initial project foundation.
* Completion of a major application subsystem.
* Completion of a core functionality milestone.
* Completion of a development phase.
* Completion of a stable integration milestone.
* Preparation of an official release.

**Preferred checkpoint method:** Git tags identifying verified stable commits.

Example:

`checkpoint/phase-01-complete`

`checkpoint/core-controls-stable`

`checkpoint/relay-pad-foundation`

Checkpoint names should clearly identify their purpose.

Branches may be used when separate development or integration work genuinely requires them.

### 4. Avoid Excessive Branch Creation

**Do not create a separate GitHub branch for every implementation, minor feature, bug fix, UI change, or ordinary task.**

Unnecessary branching creates management overhead and makes project history difficult to maintain.

Follow these principles:

* Maintain a clean, stable primary branch.
* Use meaningful commits for ordinary development.
* Group related changes logically.
* Create checkpoint tags for verified milestones.
* Create dedicated branches only when isolation is genuinely necessary.
* Reuse existing appropriate development branches where practical.
* Avoid accumulating abandoned or redundant branches.

The goal is reliable version history without producing countless branches.

### 5. Safe Recovery and Rollback

Every major checkpoint must allow the project to be restored to a known state.

Before performing potentially disruptive changes:

* Identify the latest verified checkpoint.
* Ensure important existing changes are safely committed and pushed.
* Preserve released functionality and user data.
* Confirm an appropriate recovery path exists.
* Never force-push, overwrite, delete, or rewrite important remote history without explicit authorization.

If an implementation fails, Codex should be able to identify the last stable checkpoint and propose a safe recovery.

### 6. GitHub Synchronization Failures

If GitHub authentication, permissions, networking, billing restrictions, or other problems prevent synchronization:

* Clearly identify the problem.
* Preserve local changes and commit history.
* Report that remote backup is incomplete.
* Do not claim a checkpoint is backed up when the push failed.
* Do not bypass access restrictions or publish to an unrelated repository.
* Treat successful remote synchronization as a required completion condition for major milestones.

### 7. Mandatory GitHub Status in Reports

Every major development-phase completion report must include:

**Repository:** Repository name and URL
**Working Branch:** Current branch
**Latest Commit:** Commit identifier
**Checkpoint:** Latest verified checkpoint, if applicable
**GitHub Sync:** Successful / Failed / Pending
**Recovery Point:** Latest confirmed remote recovery point
**Uncommitted Changes:** Present / None

A phase should not be reported as fully completed when its required remote backup remains unverified.

### 8. Final Operating Principle

**Use GitHub consistently for version control, verified checkpoints, remote backups, and safe recovery, without unnecessarily complicating the project's branch structure.**

Protect important work, preserve clean project history, and ensure major progress never exists exclusively on one local computer.
