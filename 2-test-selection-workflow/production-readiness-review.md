# Production Readiness Review: Test Selection Workflow

**Date:** 2026-03-19
**Reviewer:** Claude Code
**Scope:** 2-test-selection-workflow (impact-analyzer + test-discoverer skills)

---

## Scope of Review

- Both SKILL.md definitions (impact-analyzer, test-discoverer)
- Reference documents (SYSTEM-COMPONENTS.md, mapping-reference.md, COMPONENT-TEST-MAPPING.md)
- Output templates and worked examples
- Acceptance criteria alignment (ACs/acceptance-criteria.md)
- Configuration files (.mcp.json, settings.local.json)
- Real workspace outputs (TP-37, TP-61)

---

## Production Readiness Verdict

| Component | Status | Notes |
|-----------|--------|-------|
| Stage 1: impact-analyzer | ✅ Production Ready | Well-defined, human-validated, tested with real examples |
| Stage 2: test-discoverer | ✅ Production Ready | 3 discovery strategies, consistent output format |
| AC1–AC3 (Input → Impact → Discovery) | ✅ Production Ready | End-to-end workflow demonstrated on TP-37 and TP-61 |
| AC4–AC5 (Prioritization & Scoring) | ❌ Not Implemented | Out of scope; select-tests skill "not yet available" |
| AC6 (Summary & Recommendations) | ⚠️ Partial | Manual user review replaces automated report |
| AC7 (Integration & Automation) | ❌ Not Implemented | No auto test-run creation, no Jira/Slack posting |

**Overall: Production-ready for the defined scope (AC1–AC3). Not yet production-ready for full AC compliance (AC4–AC7).**

---

## Strengths

1. **Clear two-stage separation of concerns** — Impact analysis and test discovery are decoupled; each skill has a single responsibility.
2. **Human validation gate** — Stage 1 explicitly requires user approval (Step 7 in impact-analyzer) before handing off to Stage 2; prevents error propagation.
3. **Template-driven output** — Both skills use exact artefact templates with anchor comments (`<!-- ARTEFACT: ... -->`); output is consistent and machine-readable.
4. **Three discovery strategies** — Suite-Based (primary), Keyword/Semantic, Dependency Chain — maximise recall. Maximum recall principle is sound for test selection.
5. **Comprehensive reference documentation** — SYSTEM-COMPONENTS.md (30+ components, dependency graph, user journeys), mapping-reference.md (classification rules), COMPONENT-TEST-MAPPING.md (suite IDs, keyword guide) are authoritative and cross-referenced.
6. **Consistent error handling** — Both skills define graceful degradation: missing input → ask user; API failure → continue other strategies; zero results → flag in report.
7. **Workspace persistence** — Artefacts saved to `.claude/workspace/` with predictable filenames enable multi-session continuity.
8. **Real-world validation** — TP-37 and TP-61 demonstrate end-to-end functionality in the workspace outputs.
9. **Scoped MCP permissions** — `settings.local.json` whitelists only the 7 required operations; principle of least privilege is respected.

---

## Issues Found

### High Severity

**1. API Token Hardcoded in .mcp.json**
- File: [.mcp.json](.mcp.json)
- `"QASE_API_TOKEN": "<value>"` is embedded directly in a tracked file
- **Risk:** Token exposure if repo is shared or accidentally published
- **Fix:** Move token to an environment variable or `settings.local.json` (which is gitignored)

**2. QQL Semantic Search Unreliable**
- Evidence: TP-37 workspace output shows `"QQL unavailable; list_cases for 'phone' returned 0"`
- The second discovery strategy silently degrades in real use
- **Risk:** Lower recall than expected; users may assume full coverage when it wasn't achieved
- **Fix:** Add explicit "QQL UNAVAILABLE" warning to output notes; document this known limitation in the README

### Medium Severity

**3. AC4–AC5 Out of Scope — No Prioritization**
- Candidate test pools contain 60+ tests with no ranking signal
- QC teams must apply manual judgment on which tests to actually run
- The system-level skill description says "scoring skill not yet available" — this is acknowledged but not communicated to end users in the output report
- **Risk:** Workflow is less actionable for QC teams; they cannot efficiently prioritize without a ranking signal

**4. Knowledge Base Has No Sync Mechanism**
- SYSTEM-COMPONENTS.md and COMPONENT-TEST-MAPPING.md are manually maintained
- Suite IDs, test counts, and component lists will drift from reality over time
- **Risk:** Stale mappings cause missed tests or incorrect suite targeting
- **Fix:** Document a quarterly review process; add "last updated" dates to reference files

**5. Workflow is TSHOP-Specific**
- All Suite IDs, component names, criticality ratings, and keyword mappings are hardcoded for the TSHOP project
- Applying to a different project requires rewriting all reference files
- Acceptable if TSHOP is the only intended target, but limits reuse

### Low Severity

**6. No Cross-Ticket Deduplication**
- The workflow handles single tickets; if multiple tickets are in a release, test pools are not merged or deduplicated across tickets
- Acceptable for current scope but worth noting for future planning

**7. Missing "Last Updated" Timestamps on Reference Files**
- SYSTEM-COMPONENTS.md and COMPONENT-TEST-MAPPING.md have no version or date metadata
- Makes it hard to know if content is current

---

## Recommendations

### Before Production Deployment
1. **Secure the API token** — Move `QASE_API_TOKEN` out of `.mcp.json` to a local env var or `settings.local.json`

### Post-Deployment Improvements
2. **Implement select-tests skill** — Build the AC4–AC5 prioritization/scoring skill to rank the candidate pool by risk coverage score, impact relevance, and execution cost
3. **Quarterly reference review** — Establish a process to sync SYSTEM-COMPONENTS.md and COMPONENT-TEST-MAPPING.md with actual product and Qase state
4. **User training documentation** — Document that the Candidate Test Pool requires manual prioritization (no ranking) so QC teams have correct expectations

---

## Critical Files

| File | Purpose | Issue |
|------|---------|-------|
| [.mcp.json](.mcp.json) | MCP server config | API token hardcoded |
| [impact-analyzer/SKILL.md](.claude/skills/impact-analyzer/SKILL.md) | Stage 1 definition | — |
| [test-discoverer/SKILL.md](.claude/skills/test-discoverer/SKILL.md) | Stage 2 definition | — |
| [SYSTEM-COMPONENTS.md](.claude/skills/impact-analyzer/knowledge/SYSTEM-COMPONENTS.md) | Component inventory | No version/date |
| [COMPONENT-TEST-MAPPING.md](.claude/skills/test-discoverer/references/COMPONENT-TEST-MAPPING.md) | Suite ID lookup | No version/date |
| [acceptance-criteria.md](ACs/acceptance-criteria.md) | Full requirements baseline | AC4–AC7 not implemented |

---

## Verification Steps

To validate the workflow end-to-end:

1. Pick a real Jira ticket (Bug or Story) from the TSHOP project
2. Run `/impact-analyzer` with the ticket ID
3. Review and approve the impact output
4. Run `/test-discoverer` with the impact output
5. Verify: test pool is populated, coverage gaps are flagged, output saved to `.claude/workspace/tests-{ID}.md`
6. Compare result against TP-37/TP-61 workspace examples as baseline
