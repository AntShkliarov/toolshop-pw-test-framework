# Candidate Test Pool Report — Output Template

<!--
INSTRUCTIONS FOR USE
Fill every section below using the impact-analyzer output as input.
Suite IDs and coverage status must reference references/COMPONENT-TEST-MAPPING.md.

Section types:
  [FROM-IMPACT-ANALYZER] — copy directly from the impact-analyzer artefact
  [TABLE]  — Markdown table; one row per item
  [LABEL]  — one value from a defined set
  [LIST]   — bullet list, one item per line
  [NUMBER] — integer count
  [TEXT]   — free-text prose within the character limits shown
-->

---

## Section 1: Input Context

<!-- [FROM-IMPACT-ANALYZER] — copy from Ticket Snapshot + Classification -->

| Field | Value |
|-------|-------|
| Ticket ID | `{TICKET-ID}` |
| Type | `{Bug | Story}` |
| Summary | `{One-sentence summary}` |
| Ripple Effect Category | `{Isolated | Local | Broad | Systemic}` |
| Change Type | `{Feature Addition | Bug Fix | UI-Only | Integration | Configuration}` |

**Direct Components** (from impact-analyzer Section 1):

| Component | Criticality | Qase Suite ID |
|-----------|-------------|---------------|
| {Component} | {Criticality label} | {Suite ID or "No suite"} |

**Indirect Components** (from impact-analyzer Section 3):

| Component | Criticality | Qase Suite ID |
|-----------|-------------|---------------|
| {Component} | {Criticality label} | {Suite ID or "No suite"} |

---

## Section 2: Discovery Summary

<!-- [TABLE] — one row per strategy executed.
     Status: Executed | Skipped (with reason)
     Tests Found: raw count before dedup; include overlaps -->

| Strategy | Status | Tests Found | Notes |
|----------|--------|-------------|-------|
| Suite-Based (Primary) | `{Executed | Skipped}` | {number} | {Suite IDs queried} |
| Keyword Search (Semantic) | `{Executed | Skipped}` | {number} | {Keywords used} |
| Dependency Chain | `{Executed | Skipped}` | {number} | {Suites queried or reason skipped} |
| **Total Unique (after dedup)** | — | **{number}** | {Excluded deprecated: N} |

---

## Section 3: Candidate Test Pool

<!-- [TABLE] — one row per unique, active test case after deduplication.
     Sort: direct-component tests first, then indirect, then E2E/smoke.
     Discovery Methods: comma-separated list of strategies that found this test.
     Automation Status: Automated | Manual | Not Set -->

| Test ID | Title | Suite ID | Priority | Automation | Discovery Methods |
|---------|-------|----------|----------|------------|-------------------|
| {TC-XX} | {Test title} | {Suite ID} | {Critical | High | Medium | Low} | {Automated | Manual | Not Set} | {suite_match, semantic_match, dependency_match} |

_Total: {N} unique active tests_

---

## Section 4: Coverage Assessment

<!-- [TABLE] — one row per component from Section 1 (both direct and indirect).
     Status labels:
       Covered     — 1 or more tests found in Qase for this component
       No Tests    — suite queried but returned zero results (coverage gap)
       No Suite    — component has no dedicated Qase suite (tested via parent suite)
       Unknown     — component not found in COMPONENT-TEST-MAPPING.md -->

| Component | Impact Type | Suite ID | Status | Tests Found |
|-----------|-------------|----------|--------|-------------|
| {Component} | Direct | {Suite ID} | `{Covered | No Tests | No Suite | Unknown}` | {number} |
| {Component} | Indirect | {Suite ID} | `{Covered | No Tests | No Suite | Unknown}` | {number} |

---

## Section 5: Coverage Gaps

<!-- [LIST] — only include components where Status = "No Tests" (zero results from Qase).
     These are mandatory flags for the QC team.
     If no gaps: write "None identified." -->

- **{Component name}** — Suite {ID} returned 0 tests. No existing test coverage for this component in Qase.
- **{Component name}** — {Reason: e.g. "No dedicated suite; functionality tested via Suite 6 but no PayPal-specific tests exist."}

---

## Section 6: Notes

<!-- [LIST] — flag anything that warrants QC team attention.
     Include: excluded deprecated tests, unrecognised components, skipped strategies,
     any Qase API errors, or observations about discovery quality.
     Limit: 3–6 bullets. If nothing to flag: write "None." -->

- {Note 1}
- {Note 2}

---

<!--
COMPLETENESS CHECKLIST (remove before delivering)
[ ] Section 1 — ticket snapshot + both component tables filled from impact-analyzer output
[ ] Section 2 — all three strategies listed with status and counts
[ ] Section 3 — one row per unique active test; total count stated
[ ] Section 4 — every component from Section 1 has a coverage assessment row
[ ] Section 5 — coverage gaps listed or "None identified."
[ ] Section 6 — notes present or "None."
[ ] Suite IDs verified against references/COMPONENT-TEST-MAPPING.md
-->
