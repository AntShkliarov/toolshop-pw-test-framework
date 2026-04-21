---
name: impact-analyzer
description: >
  Categorises the impact of a single Jira ticket (Bug or User Story) and produces
  an Analysed Release Candidate Description.
  Use when user asks to "analyse this ticket", "assess impact", "categorise this bug/story".
  Do NOT use for scoring or test prioritisation — use select-tests instead.
---

# Impact Analyzer

## Overview

Given a Jira ticket (Bug or User Story), this skill produces a structured
**Analysed Release Candidate Description**: a human-readable categorisation of what the change touches, which system layers and components are affected, how sensitive the
data is, and what ripple effects to expect. No numerical scoring is produced — categorisation labels are the output.

The result gives QC teams and developers a shared, consistent
language for what a ticket means for the system before testing begins.

---

## When to Use

- User says: "analyse this ticket", "assess the impact of ECOM-123"
- User provides a Jira ticket ID or pastes ticket text (summary, description, acceptance criteria)
- User is trying to: understand what parts of the system a ticket touches before deciding on testing scope

---

## Steps

### Step 1: Obtain Ticket Content

**Determine the input source using this priority order:**

```
1. If the user provided a ticket ID (e.g. ECOM-123):
   → Fetch the ticket from Jira using:
       Tool: mcp__claude_ai_Atlassian__getJiraIssue
         issueIdOrKey: "<TICKET-ID>"
   → On success: use the returned fields as the ticket content.
     Set Source = "Jira (fetched)"
   → On failure (ticket not found, MCP unavailable, permission error):
     Inform the user: "Could not fetch {TICKET-ID} from Jira — please paste the ticket details (summary, description, acceptance criteria)."
     Then wait for pasted input. Set Source = "Pasted text"

2. If the user pasted ticket text directly (no ticket ID given):
   → Use the pasted content as-is. Set Source = "Pasted text"

3. If neither a ticket ID nor ticket text was provided:
   → Ask: "Please provide a Jira ticket ID or paste the ticket details."
   → Wait. Do not proceed until input is received.
```

**Once ticket content is available, extract these raw facts. Do not interpret yet — just collect.**

```
- Ticket ID and type (Bug / Story)
- Summary (one sentence)
- Acceptance Criteria (list)
- Explicitly named components / areas
- Technical details mentioned (DB changes, API changes, new integrations, etc.)
- Any mentioned compliance, security, or data concerns
```

Expected result: A clean bullet list of facts with no interpretation, and Source recorded.

---

### Step 2: Identify Directly Affected Components

Using the facts from Step 1, list every component that the ticket explicitly touches.
Consult `references/mapping-reference.md` → **Section 1** for the criticality label definitions,
and `knowledge/SYSTEM-COMPONENTS.md` → **Component Criticality Matrix** for the authoritative
rating of each component.

If the ticket references a specific sub-feature (e.g. "password visibility toggle", "cart badge",
"CO2 rating"), look it up in `knowledge/SYSTEM-COMPONENTS.md` under the relevant component's
**Sub-components** or **Components** list to confirm the parent component and its criticality.

```
For each component:
  → Name the component
  → Impact Type: Direct
  → Criticality: Critical | High | Medium | Low  (from SYSTEM-COMPONENTS.md Criticality Matrix)
  → Evidence: quote the ticket line that confirms this
```

Expected result: A table of direct components with criticality labels.

---

### Step 3: Classify the Change

Classify the ticket across four dimensions using
`references/mapping-reference.md` → **Section 2: Classification Criteria**.

```
Layer:       UI | API | Backend Logic | Database | Integration | Infrastructure | Multiple
Scope:       Single-Component | Multi-Component | Cross-Module | System-Wide
Data:        None | Low | High
Change Type: Feature Addition | Bug Fix | UI-Only | Integration | Configuration
```

Assign one label per dimension. If multiple labels apply to Layer, list all that apply.

Expected result: Four labelled classification lines.

---

### Step 4: Identify Ripple Effects

Using the directly affected components from Step 2, trace downstream dependencies.
Consult `knowledge/SYSTEM-COMPONENTS.md` as the authoritative source:
- Each component's **Dependencies** block lists what it relies on (upstream services)
- Each component's **Upstream Dependencies** block lists what depends on it (downstream consumers)
- **Section 6 (Backend Services)** — each service's **Used By** list identifies all frontend modules
  that consume it; if a backend service is affected, every module in its `Used By` list is a ripple candidate

For each directly affected component ask:
- What other components consume its data or state?
- What user flows pass through it?
- Are any global components (Header, Session, Cart Badge) implicated?

List each inferred impact with:
```
  → Component name
  → Impact Type: Indirect
  → Criticality: (from SYSTEM-COMPONENTS.md Criticality Matrix)
  → Reason: why this component is downstream
```

Expected result: A list of indirect impacts with rationale.

---

### Step 5: Assign Ripple Effect Category

Using `references/mapping-reference.md` → **Section 4: Ripple Effect Category Criteria**,
assign one category label to the overall ripple effect of the ticket:

```
Isolated  — change contained to one component, no downstream effects
Local     — 2–3 components affected, all within one module
Broad     — 4+ components or cross-module effects
Systemic  — affects shared/global components or critical paths used by the whole system
```

Expected result: One Ripple Effect Category label with a one-sentence justification.

---

### Step 6: Write the Analysed Release Candidate Description

Using the `assets/artefact-output-template.md`, produce the final output.

Fill every section of the template:
- Use only the categorisation labels defined in `references/mapping-reference.md`
- Keep each section to the prescribed length
- Write the Release Candidate Summary in plain business English (3–5 sentences)
- Every claim must trace back to a ticket fact or a mapping-reference rule

Expected result: A completed artefact matching the template structure exactly.

---

### Step 7: Request User Validation

After presenting the completed artefact, **pause and ask the user to review it**
before saving or handing off to test-discoverer.

Prompt the user with:

> Please review the Analysed Release Candidate Description above.
>
> - Are the direct components and criticality labels correct?
> - Do the ripple effects and Ripple Effect Category look right?
> - Any corrections needed before I save and pass this to test-discoverer?
>
> Reply **approve** to save and continue, or describe any corrections.

**Do not proceed to Step 8 until the user explicitly approves.**

If the user requests corrections:
- Apply them to the artefact inline
- Re-present the corrected sections
- Repeat the validation prompt

Expected result: User has approved the artefact; corrections (if any) are applied.

---

### Step 8: Save and Signal Hand-off

After delivering the completed artefact:

**1. Save to workspace file**

Write the full artefact (everything from `## Ticket Snapshot` through Section 6,
including the anchor comment) to:

```
.claude/workspace/impact-{TICKET-ID}.md
```

Create the `.claude/workspace/` directory if it does not exist.

**2. Append anchor comment**

The anchor comment must appear as the final line of both the saved file and the
inline output (replacing `{TICKET-ID}` with the actual ticket ID):

```
<!-- ARTEFACT: ANALYSED-RELEASE-CANDIDATE-DESCRIPTION | TICKET: {TICKET-ID} -->
```

**3. Prompt the user**

> Analysed Release Candidate Description complete.
> Saved to: `.claude/workspace/impact-{TICKET-ID}.md`
> To build the Candidate Test Pool, run: `/test-discoverer`

Expected result: File written to `.claude/workspace/`; anchor line present at end
of output; user knows the next step.

---

## Examples

**Example 1: Bug — broken cart badge count**
User says: "Analyse ECOM-999: cart badge shows wrong count after removing an item"
What Claude does:
1. Extracts facts: badge display bug, cart removal action, UI component
2. Identifies Cart Badge (High) and Cart Service (High) as direct components
3. Classifies: Layer = UI + Backend Logic, Scope = Multi-Component, Data = Low, Type = Bug Fix
4. Ripple: Header Navigation affected (badge lives in header)
5. Ripple Category: Local
6. Produces completed artefact
7. Asks user to approve — user replies "approve"
8. Saves to `.claude/workspace/impact-ECOM-999.md` and prompts next step

**Example 2: Story — new payment method**
User says: "Analyse ECOM-1235: Add PayPal as a payment option"
What Claude does:
1. Extracts facts: new OAuth flow, payment gateway integration, order + email downstream
2. Identifies Payment Step (Critical), Payment Gateway (Critical), Order Management (Critical) as direct
3. Classifies: Layer = Multiple, Scope = Cross-Module, Data = High, Type = Integration
4. Ripple: Email Service, Inventory, Order Confirmation, Session
5. Ripple Category: Systemic
6. Produces completed artefact — see `examples/output-example.md`
7. Asks user to approve — user corrects one component label, Claude updates and re-presents
8. User approves; saves to `.claude/workspace/impact-ECOM-1235.md` and prompts next step

---

## Error Handling

**Error: Ticket has no Acceptance Criteria**
Cause: Ticket is incomplete or in Draft status.
Fix: Use Summary + Description only. Flag the gap in the Release Candidate Summary with:
"⚠ Acceptance criteria not provided — categorisation based on description only."

**Error: Component not found in mapping-reference**
Cause: New or undocumented component referenced in ticket.
Fix: Label it as "Undocumented Component", assign Criticality = Unknown, and flag it
in the Release Candidate Summary as requiring manual investigation.

**Error: Ticket describes both a Bug and a Feature**
Cause: Mixed scope ticket (e.g. "fix bug and add field").
Fix: Treat as Feature Addition (more conservative) and note the dual nature in the
Change Type field: "Bug Fix + Feature Addition".

---

## Notes

Consult `references/mapping-reference.md` for all categorisation criteria — do not
invent category labels outside of what is defined there.

Use `assets/artefact-output-template.md` as the exact output structure.

See `examples/output-example.md` for a fully worked example (ECOM-1235: PayPal Integration).
