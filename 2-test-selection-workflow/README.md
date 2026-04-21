# Test Selection Workflow

An intelligent, two-stage system for selecting relevant test cases for a release candidate. Given a Jira ticket, the workflow analyses its impact, discovers all potentially relevant tests from Qase, and produces a structured candidate test pool ready for prioritisation.

---

## Overview

The workflow consists of two sequential skills:

```
Jira Ticket
     │
     ▼
┌─────────────────┐
│ impact-analyzer │  → Analysed Release Candidate Description
└─────────────────┘
     │
     ▼
┌──────────────────┐
│ test-discoverer  │  → Candidate Test Pool Report
└──────────────────┘
     │
     ▼
Candidate Test Pool (saved to .claude/workspace/)
```

**Stage 1 — Impact Analysis:** Categorises which system components are affected by the ticket, how deeply, and what the ripple effects are.

**Stage 2 — Test Discovery:** Maps affected components to Qase test suites and retrieves all potentially relevant test cases using three parallel discovery strategies.

---

## Prerequisites

- Claude Code with MCP servers configured (see [.mcp_example.json](.mcp_example.json)) (rename to .mcp.json)
- Access to the Jira instance (for ticket fetching)
- Access to the Qase project **TSHOP** (for test case retrieval)
- Both MCP servers active in your Claude Code session

---

## Usage

### Stage 1: Analyse a Jira Ticket

Invoke the impact analyser with a ticket ID or by pasting ticket details:

```
/impact-analyzer TP-123
```

or

```
/impact-analyzer
[paste ticket content here]
```

The skill will:
1. Fetch (or parse) the ticket
2. Identify directly affected components and their criticality
3. Classify the change (layer, scope, data sensitivity, change type)
4. Trace ripple effects to indirectly affected components
5. Assign a Ripple Effect Category (Isolated / Local / Broad / Systemic)
6. Present the **Analysed Release Candidate Description** for your review
7. Ask for your validation before saving

The output is saved to `.claude/workspace/impact-{TICKET-ID}.md`.

**You must validate the impact analysis before proceeding to Stage 2.**

---

### Stage 2: Discover Test Cases

Once Stage 1 is complete, invoke the test discoverer:

```
/test-discoverer
```

The skill automatically locates the impact analysis from the current conversation or workspace and:
1. Maps affected components to Qase suite IDs
2. Retrieves all tests from relevant suites (primary discovery)
3. Runs keyword/semantic searches across Qase (secondary discovery)
4. Retrieves tests from dependency-chain component suites (tertiary discovery)
5. Deduplicates and filters out deprecated/draft tests
6. Produces the **Candidate Test Pool Report**

The output is saved to `.claude/workspace/tests-{TICKET-ID}.md`.

---

## Full Workflow Example

```
# Step 1 — analyse the ticket
/impact-analyzer TP-61

# Claude presents the Analysed Release Candidate Description
# Review it, approve or correct it, then Claude saves it

# Step 2 — discover tests
/test-discoverer

# Claude retrieves all relevant tests from Qase and saves the pool
```

Workspace outputs after a complete run:
```
.claude/workspace/
├── impact-TP-61.md    ← Analysed Release Candidate Description
└── tests-TP-61.md     ← Candidate Test Pool Report
```

---

## Workflow Outputs

### Analysed Release Candidate Description (impact-analyzer output)

| Field | Description |
|---|---|
| Ticket ID & Type | Jira issue reference |
| Directly Affected Components | Components with criticality rating |
| Classification | Layer / Scope / Data Sensitivity / Change Type |
| Indirectly Affected Components | Ripple-effect components and reason |
| Ripple Effect Category | Isolated / Local / Broad / Systemic |

### Candidate Test Pool Report (test-discoverer output)

| Field | Description |
|---|---|
| Discovery Summary | Counts by discovery method |
| Suite-Based Tests | Tests retrieved from mapped Qase suites |
| Keyword Search Tests | Tests found via semantic QQL search |
| Dependency Chain Tests | Tests from upstream/downstream suites |
| Candidate Test Pool | Full deduplicated list of test case IDs |
| Coverage Notes | Any gaps or special considerations |

---

## Key Design Principles

**Maximum recall over precision** — The test pool errs on the side of inclusion. It is better to include a marginally relevant test than to miss a critical one. Scoring and pruning happen downstream (outside this workflow).

**Human validation gate** — Stage 1 requires your approval before saving. If the impact categorisation looks wrong, correct it before Stage 2 runs.

**Reference-driven decisions** — All component mappings, criticality ratings, and suite assignments trace back to documented rules in the `knowledge/` and `references/` folders, not heuristics.

---

## Reference Files

| File | Purpose |
|---|---|
| [knowledge/SYSTEM-COMPONENTS.md](knowledge/SYSTEM-COMPONENTS.md) | Authoritative component inventory with criticality, sub-components, and dependencies |
| [.claude/skills/impact-analyzer/references/mapping-reference.md](.claude/skills/impact-analyzer/references/mapping-reference.md) | Categorisation rules used by the impact analyser |
| [.claude/skills/test-discoverer/references/COMPONENT-TEST-MAPPING.md](.claude/skills/test-discoverer/references/COMPONENT-TEST-MAPPING.md) | Component → Qase Suite ID mapping and keyword guidance |

---

## Skill Reference

| Skill | Trigger | Input | Output |
|---|---|---|---|
| `impact-analyzer` | `/impact-analyzer` | Jira ticket ID or pasted text | Analysed Release Candidate Description |
| `test-discoverer` | `/test-discoverer` | Analysed Release Candidate Description (from Stage 1) | Candidate Test Pool Report |
