# AGENTS.md — Test Selection Workflow

## What This Workflow Does

Given a Jira ticket, this workflow identifies which test cases from Qase should be considered for the release. It runs in two sequential stages, each backed by a skill that Claude executes as a structured agent.

---

## Workflow Overview

```
Jira Ticket
     |
     v
[impact-analyzer]  -->  Analysed Release Candidate Description  (.claude/workspace/impact-{ID}.md)
     |
     v
[test-discoverer]  -->  Candidate Test Pool Report               (.claude/workspace/tests-{ID}.md)
```

**Stage 1** answers: *What does this ticket touch, and how far do the effects spread?*
**Stage 2** answers: *Which tests in Qase are relevant to those affected areas?*

---

## Skills

### `impact-analyzer`
**Trigger:** `/impact-analyzer`
**Input:** Jira ticket ID (e.g. `TP-61`) or pasted ticket text
**Output:** Analysed Release Candidate Description

What it does:
1. Fetches the ticket from Jira (or parses pasted text)
2. Identifies directly affected system components and their criticality
3. Classifies the change across four dimensions: Layer, Scope, Data Sensitivity, Change Type
4. Traces ripple effects to indirectly affected components via dependency chains
5. Assigns a Ripple Effect Category: Isolated / Local / Broad / Systemic
6. Presents the artefact and **waits for user approval** before saving
7. Saves to `.claude/workspace/impact-{TICKET-ID}.md`

Reference files used:
- `.claude/skills/impact-analyzer/references/mapping-reference.md` — categorisation rules
- `.claude/skills/impact-analyzer/knowledge/SYSTEM-COMPONENTS.md` — component inventory

---

### `test-discoverer`
**Trigger:** `/test-discoverer`
**Input:** Analysed Release Candidate Description (auto-located from context or workspace)
**Output:** Candidate Test Pool Report

What it does:
1. Parses the impact-analyzer output — no re-input needed
2. Maps affected components to Qase Suite IDs
3. Runs three parallel discovery strategies:
   - **Suite-based** — retrieves all tests from matched suites
   - **Keyword/semantic** — QQL title searches across Qase
   - **Dependency chain** — tests from upstream/downstream suites and E2E/regression suites
4. Deduplicates results and excludes deprecated/draft tests
5. Flags components with zero test coverage
6. Saves to `.claude/workspace/tests-{TICKET-ID}.md`

Reference files used:
- `.claude/skills/test-discoverer/references/COMPONENT-TEST-MAPPING.md` — component → Suite ID mapping

---

## How to Run

```
# Step 1 — analyse the ticket
/impact-analyzer TP-61

# Review the output. Approve or correct it.

# Step 2 — discover tests
/test-discoverer
```

Stage 2 automatically picks up Stage 1's output from the conversation or workspace. No copy-paste needed.

---

## Key Design Decisions

- **Human validation gate** between stages — impact analysis must be approved before tests are retrieved.
- **Maximum recall** — the test pool errs on inclusion; scoring and pruning are done downstream, outside this workflow.
- **Reference-driven** — all component mappings and classifications trace to documented rules, not heuristics.
- **MCP-dependent** — requires Jira (Atlassian) and Qase MCP servers active in the session.

---

## Workspace Outputs

| File | Content |
|---|---|
| `.claude/workspace/impact-{ID}.md` | Analysed Release Candidate Description |
| `.claude/workspace/tests-{ID}.md` | Candidate Test Pool Report |
