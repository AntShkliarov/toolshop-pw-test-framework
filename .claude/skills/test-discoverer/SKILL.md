---
name: test-discoverer
description: >
  Retrieves ALL potentially relevant test cases from the Qase repository for a single ticket.
  Input must be the Analysed Release Candidate Description produced by the impact-analyzer skill.
  Use when user asks to "find tests for this ticket", "discover test cases", "build test pool", "retrieve tests from Qase".
  Do NOT use for scoring or prioritisation — a dedicated scoring skill is not yet available; apply manual judgment on the Candidate Test Pool.
---

# Test Discoverer

## Overview

Given the **Analysed Release Candidate Description** from the impact-analyzer skill, this
skill retrieves every test case in the Qase repository that could be relevant to the change.
It runs three discovery strategies in sequence — suite-based, keyword-semantic, and
dependency-chain — then deduplicates results and produces a **Candidate Test Pool Report**.

No scoring, ranking, or prioritisation is applied. The goal is maximum recall:
it is better to include a test that turns out to be irrelevant than to miss one that matters.

---

## When to Use

- User says: "find tests for this ticket", "build the test pool", "run test discovery"
- User provides: the completed output from the impact-analyzer skill (Analysed Release Candidate Description)
- User is trying to: compile a complete set of candidate tests before prioritisation begins

---

## Steps

### Step 1: Locate and Parse Impact-Analyzer Output

First, locate the Analysed Release Candidate Description using this priority order:

```
1. Search this conversation for the most recent block ending with:
     <!-- ARTEFACT: ANALYSED-RELEASE-CANDIDATE-DESCRIPTION | TICKET: ... -->
   → If found: use that block as input. Do not ask the user.

2. If not found in conversation, check for a saved workspace file:
     .claude/workspace/impact-{TICKET-ID}.md
   (If the user has provided a ticket ID, use it; otherwise check for any
   impact-*.md file in .claude/workspace/ and use the most recently modified one.)
   → If found: read the file and use it as input. Do not ask the user.

3. If neither found: see Error Handling — "No impact-analyzer output provided".
```

Once located, extract:

```
- Ticket ID and type (Bug / Story)
- Direct components → names + Criticality labels
- Indirect components (ripple effects) → names + Criticality labels
- Ripple Effect Category (Isolated / Local / Broad / Systemic)
- Key terms: component names, technical terms from ticket summary and risk flags
```

Expected result: Two component lists (direct, indirect) and a keyword list.

---

### Step 2: Map Components to Suite IDs

For every component in both lists, look up its Qase Suite ID in
`references/COMPONENT-TEST-MAPPING.md` → **Section 1: Suite ID Lookup**.

```
For each component:
  → Suite ID: (number from mapping, or "No suite" if not found)
  → Module: (Checkout | Customer Management | Customer Portal | Global | Supporting)
  → Flag "Unknown" if component is not in the mapping
```

Collect all unique Suite IDs into a **Target Suite List** (direct suites first, then indirect).

Expected result: A table of components → Suite IDs, ready for Qase queries.

---

### Step 3: Suite-Based Discovery (Primary Strategy)

For each Suite ID in the Target Suite List, retrieve all test cases:

```
Tool: mcp__qase__list_cases
  project_code: "TSHOP"
  suite_id: <id>

Collect:
  - test_id, title, suite_id, priority, automation_status, status, tags
Tag each result: discovery_method = "suite_match"
```

Run for ALL suites in the Target Suite List — direct and indirect.
Note any suite that returns zero results → mark as potential coverage gap.

Expected result: Raw list of tests from all impacted suites.

---

### Step 4: Keyword Search Discovery (Semantic Strategy)

Build a keyword list from:
- Component names from Step 1 (e.g. "payment", "cart", "checkout")
- Technical terms from ticket risk flags (e.g. "PayPal", "tax", "OAuth", "2FA")
- Ticket summary terms (nouns and feature names only)
- **Sub-component names** from `knowledge/SYSTEM-COMPONENTS.md` for each directly affected
  component (e.g. for PDP: "CO2 rating", "related products", "stock status", "quantity selector";
  for Login: "password visibility", "Google sign-in"). These often match Qase test case titles
  directly and surface tests that generic component-name keywords miss.

For each keyword, run a QQL title search:

```
Tool: mcp__qase__qql_search
  project_code: "TSHOP"
  query: title ~ "<keyword>"

Tag each result: discovery_method = "semantic_match"
```

Use `references/COMPONENT-TEST-MAPPING.md` → **Section 3: Keyword to Component Mapping**
to identify the most useful keywords. Run at minimum one query per directly impacted component.

**QQL availability check:** After running all keyword queries, evaluate the outcome:

```
IF mcp__qase__qql_search returns a tool error (e.g. "not supported", "invalid query") for every keyword:
  → Mark Step 4 status as: QQL_UNAVAILABLE
  → Record in Discovery Summary: Status = "Failed", Notes = "QQL unavailable — tool returned errors for all queries"
  → Record in Section 6 (Notes): "⚠ Semantic discovery was skipped: mcp__qase__qql_search is unavailable.
    Test pool may be incomplete. Manually search Qase for keywords: <keyword list>."

IF qql_search succeeds but returns 0 results for every keyword:
  → Mark Step 4 status as: QQL_NO_RESULTS
  → Record in Discovery Summary: Status = "Complete", Notes = "0 new tests — all keywords returned empty results"
  → No warning required; this is an expected outcome for narrow tickets
```

Expected result: Additional tests not already found by suite matching, or an explicit QQL status flag if the strategy could not execute.

---

### Step 5: Dependency Chain Discovery

Using the indirect (ripple) components from Step 1, find their suite IDs (already in Step 2)
and check if those suites were already queried in Step 3.

For any indirect component suite **not yet queried**, run:

```
Tool: mcp__qase__list_cases
  project_code: "TSHOP"
  suite_id: <indirect_suite_id>

Tag each result: discovery_method = "dependency_match"
```

Also check for E2E or integration suites using:

```
Tool: mcp__qase__list_suites
  project_code: "TSHOP"

Look for suites named: "E2E", "Integration", "Regression", "Smoke"
If found, retrieve their tests and filter for overlap with impacted components.
Tag each result: discovery_method = "dependency_match"
```

Expected result: Any remaining relevant tests from dependency paths.

---

### Step 6: Deduplicate and Compile

Merge all results from Steps 3, 4, and 5:

```
1. Deduplicate by test_id (keep one row per unique Qase test ID)
2. For duplicates: merge discovery_method lists (e.g. ["suite_match", "semantic_match"])
3. Exclude any test with status = "Deprecated" or "Draft"
   → List excluded tests separately, do not add to the pool
4. Count total unique tests in the Candidate Test Pool
5. If total unique tests = 0 after all three strategies:
   → Mark the ticket as ZERO COVERAGE — no existing tests found across any strategy
   → This condition must be explicitly reported in Section 5 of the report (see Step 7)
```

Expected result: A clean, deduplicated list of active test cases with full metadata.
If the list is empty, the zero-coverage condition is recorded for Step 7.

---

### Step 7: Produce and Save Candidate Test Pool Report

Using `assets/artefact-output-template.md`, produce the final report.

Fill every section:
- **Input Context** — copy ticket ID, Ripple Category, and component tables from impact-analyzer output
- **Discovery Summary** — count per strategy, total unique
- **Candidate Test Pool** — one row per test case from Step 6; if empty write "No test cases found."
- **Coverage Assessment** — for each component: Covered (≥1 test found) / No Tests Found (zero results)
- **Coverage Gaps** — list components with zero tests; these are mandatory flags for the QC team.
  If the Candidate Test Pool total = 0 (ZERO COVERAGE condition from Step 6), write the following
  mandatory comment as the first bullet in Section 5:
  > ⚠ **No test cases exist in Qase for any component affected by {TICKET-ID}.**
  > All three discovery strategies (suite-based, keyword, dependency) returned zero results.
  > New test cases must be created before this ticket can enter QA. This is a critical coverage gap.
- **Notes** — any unknowns, excluded deprecated tests, or unrecognised components

**Save to workspace file**

Write the completed report to:

```
.claude/workspace/tests-{TICKET-ID}.md
```

Create the `.claude/workspace/` directory if it does not exist.

Then confirm to the user:

> Candidate Test Pool Report complete.
> Saved to: `.claude/workspace/tests-{TICKET-ID}.md`

Expected result: Report delivered inline and saved to `.claude/workspace/`.

---

## Examples

**Example 1: Story — new payment method (Systemic ripple)**
User says: "Run test discovery for ECOM-1235 — PayPal Integration"
(Impact-analyzer output already produced)
What Claude does:
1. Extracts: Payment Step, Payment Gateway, Order Management (direct); Session, Email, Inventory, Cart (indirect)
2. Maps to Suite IDs: all → Suite 6 (Checkout); Email → no suite (coverage gap)
3. Suite 6 → 56 tests retrieved (suite_match)
4. Keywords: "payment", "PayPal", "checkout", "order" → 8 additional semantic matches
5. Dependency: Session Management → no dedicated suite; checks for Smoke/E2E suite
6. Dedup: 58 unique active tests
7. Produces report — see `examples/output-example.md`

**Example 2: Bug — text typo (Isolated ripple)**
User says: "Find tests for ECOM-1236 — Login button typo"
What Claude does:
1. Extracts: Login Page (direct only); Ripple = Isolated
2. Maps: Login Page → Suite 11
3. Suite 11 → 8 tests (suite_match)
4. Keyword: "login" → all already in suite; no new tests
5. No indirect components → skip dependency step
6. Dedup: 8 unique tests
7. Produces report: 8 tests, all Login suite, no gaps

---

## Error Handling

**Error: No impact-analyzer output provided**
Cause: No Analysed Release Candidate Description found in conversation context.
Fix: Ask the user to run `/impact-analyzer` for the ticket first, then invoke
`/test-discoverer` again — the output will be picked up automatically from context.

**Error: Suite returns zero tests**
Cause: Component exists in mapping but has no tests in Qase yet.
Fix: Continue with other strategies. Flag this component as a coverage gap in Section 5 of the report.

**Error: Component not found in mapping-reference**
Cause: New or undocumented component in the impact-analyzer output.
Fix: Skip suite lookup for this component. Flag it as "Undocumented — no suite mapping" in Section 6 (Notes).

**Error: mcp__qase__qql_search returns no results for a keyword**
Cause: Keyword too specific or no tests use that term in their title.
Fix: Try a shorter/broader keyword. If still empty, move on — do not block the report.

**Error: mcp__qase__qql_search returns a tool error or is unavailable**
Cause: QQL is not supported in the current Qase MCP configuration or the API is returning errors.
Fix: Mark the semantic strategy as QQL_UNAVAILABLE in the Discovery Summary. Add a warning to Section 6
(Notes) listing the keywords that could not be searched so the QC team can run them manually in Qase.
Do not block the report — continue to Step 5 with suite-based and dependency results only.

---

## Notes

Consult `references/COMPONENT-TEST-MAPPING.md` for all suite ID lookups and keyword guidance.

Use `assets/artefact-output-template.md` as the exact output structure.

See `examples/output-example.md` for a fully worked example (ECOM-1235: PayPal Integration).

Project code for all Qase API calls: **`TSHOP`**
