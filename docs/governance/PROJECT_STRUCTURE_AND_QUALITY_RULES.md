# CODEX GLOBAL RULE

## Project Structure, Workspace Organization & Code Quality

**Priority:** CRITICAL | NON-NEGOTIABLE
**Applies to:** All projects developed, maintained, or modified using Codex.

### 1. Professional Project Organization

Every project must maintain a clean, logical, professional, and scalable workspace structure.

Codex must:

* Establish an appropriate project structure before beginning implementation.
* Organize files and directories according to their actual responsibilities.
* Maintain clear boundaries between application components, features, services, shared resources, configurations, tests, documentation, and release artifacts.
* Follow established conventions appropriate to the project's technologies.
* Avoid unnecessary nesting, duplicate directories, and scattered files.
* Keep the project root clean and organized.
* Maintain consistent naming conventions throughout the workspace.
* Ensure new functionality is integrated into the correct existing location.

**Core rule:** Every file must have a clear purpose and a logical location.

### 2. Architecture and Scalability

The project must be designed for long-term maintainability.

Codex must:

* Follow a modular architecture appropriate to the project's size and complexity.
* Separate unrelated responsibilities.
* Build reusable components where reuse provides genuine value.
* Maintain well-defined boundaries between modules.
* Avoid tightly coupled systems that make future changes difficult.
* Prevent unnecessary dependencies between unrelated features.
* Preserve architectural consistency throughout development.
* Consider future expansion without introducing unnecessary complexity.

Do not introduce excessive abstraction or overengineering merely to make the architecture appear sophisticated.

**The architecture must remain understandable, efficient, and practical.**

### 3. Code Quality Standards

Code quality must never be sacrificed for implementation speed.

All code must be:

* Clean and readable.
* Consistently formatted.
* Appropriately documented.
* Well-organized and maintainable.
* Reliable and secure.
* Efficient in resource consumption.
* Testable.
* Consistent with existing project conventions.

Codex must avoid:

* Duplicate logic.
* Unnecessary complexity.
* Dead code.
* Unused dependencies.
* Poorly named variables, functions, and components.
* Excessively large files or functions with unrelated responsibilities.
* Hardcoded values that belong in configuration.
* Unnecessary temporary workarounds.
* Silent error handling.
* Unverified assumptions.
* Changes that introduce regressions into existing functionality.

Prefer straightforward, maintainable solutions over clever but difficult-to-understand implementations.

### 4. Workspace Hygiene

The development workspace must remain organized throughout the project's lifecycle.

Codex must:

* Keep temporary files, logs, and generated artifacts in appropriate locations.
* Prevent unnecessary build outputs and caches from entering version control.
* Maintain a suitable `.gitignore`.
* Remove obsolete temporary files when safe.
* Avoid creating multiple competing versions of the same implementation.
* Keep experimental work isolated from stable functionality.
* Maintain a clear distinction between source code, generated files, and distribution packages.
* Avoid placing unrelated scripts or documents in the project root.
* Preserve important development evidence and reports in designated directories.

**Temporary development work must not become permanent workspace clutter.**

### 5. Consistent Naming and File Organization

Use clear, consistent conventions for:

* Files and folders.
* Components and modules.
* Classes and functions.
* Configuration files.
* Tests.
* Documentation.
* Assets.
* Build and release outputs.

Naming should communicate purpose without requiring someone to inspect the file contents.

Avoid ambiguous names such as `new`, `final2`, `temp`, `test123`, or `updated_latest`.

### 6. Documentation Requirements

Every project must contain sufficient documentation for future maintenance.

At minimum, maintain appropriate documentation covering:

* Project overview and purpose.
* Workspace structure.
* Major architectural decisions.
* Setup and installation instructions.
* Configuration requirements.
* Development and testing procedures.
* Major features and their responsibilities.
* Release procedures.
* Known limitations.
* Important dependencies.

Documentation must accurately reflect the current project.

Do not create documentation that describes planned features as already implemented.

### 7. Testing and Quality Verification

Before declaring an implementation complete, Codex must perform relevant verification.

Depending on the changes, this includes:

* Formatting checks.
* Code-quality checks.
* Type checking.
* Relevant automated tests.
* Build verification.
* Integration testing.
* Regression testing.
* Security checks.
* Performance checks where applicable.

A successful build alone does not establish that an implementation is correct.

Failures must be investigated and reported rather than ignored.

### 8. Performance and Resource Efficiency

Maintain performance awareness throughout development.

Codex must:

* Avoid unnecessary background processing.
* Prevent avoidable memory and resource waste.
* Minimize unnecessary dependencies.
* Avoid inefficient operations in frequently executed functionality.
* Keep application startup and normal interactions responsive.
* Consider supported low-end hardware.
* Ensure visual enhancements do not unnecessarily degrade performance.
* Investigate memory leaks, excessive resource consumption, and performance regressions.

**Professional code quality includes resource efficiency, not just readability.**

### 9. Preserve Existing Functionality

When modifying an existing project:

* Inspect and understand relevant functionality before making changes.
* Respect existing architectural decisions unless a change is justified.
* Preserve previously released functionality.
* Avoid unrelated modifications.
* Verify that improvements do not break existing features.
* Keep changes focused and traceable.
* Use the project's established testing and checkpoint procedures.

Never rewrite functioning systems merely because a different implementation appears more fashionable.

### 10. Continuous Organization

Project organization is not a one-time setup task.

Codex must continuously maintain workspace quality.

When adding functionality:

1. Identify the appropriate location within the existing structure.
2. Reuse established components and conventions where suitable.
3. Keep related files together.
4. Update relevant documentation.
5. Verify architectural consistency.
6. Run applicable quality checks.
7. Ensure no unnecessary files or dependencies were introduced.

If a structural problem is discovered, document it and propose an appropriate correction rather than allowing the problem to spread.

### 11. Quality Gates

A major development phase must not be marked complete unless:

* The implementation is properly organized.
* Relevant code-quality checks pass.
* Required tests pass.
* Documentation is updated.
* No known critical regressions remain.
* The workspace is clean.
* Relevant security and performance requirements are satisfied.
* The required GitHub checkpoint and synchronization are verified.

If any required condition is not satisfied, report the phase as **INCOMPLETE or BLOCKED**, with the specific reason.

Do not report success based solely on the quantity of code written or features added.

### 12. Final Operating Principle

**No compromise on project organization, architectural consistency, code quality, maintainability, reliability, security, or verified functionality.**

Every implementation must strengthen the project without unnecessarily increasing its complexity.

The final workspace should remain understandable and maintainable by another qualified developer without requiring the original author to explain every file.

**Build professionally from the beginning. Maintain that standard throughout the entire project.**
