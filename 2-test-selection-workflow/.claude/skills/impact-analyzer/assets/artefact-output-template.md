# Analysed Release Candidate Description — Output Template

<!--
INSTRUCTIONS FOR USE
Fill every section below. Use only category labels defined in:
  references/mapping-reference.md

Leave no section blank. If information is unavailable, write:
  "Not specified — see ⚠ flag in Release Candidate Summary"

Sections marked [TABLE] must be completed as a Markdown table.
Sections marked [LABEL] accept exactly one label from the mapping-reference.
Sections marked [LABELS] accept one or more labels from the mapping-reference.
Sections marked [LIST] are bullet lists — one item per line.
Sections marked [TEXT] are free-text prose within the character limits shown.
-->

---

## Ticket Snapshot

| Field | Value |
|-------|-------|
| Ticket ID | `{TICKET-ID}` |
| Type | `{Bug | Story}` |
| Summary | `{One-sentence summary from the ticket}` |
| Source | `{Jira (fetched) | Pasted text}` |

---

## 1. Direct Component Impact

<!-- [TABLE] — one row per directly affected component.
     Criticality labels: Critical · High · Medium · Low · Unknown
     Source: references/mapping-reference.md → Section 1 -->

| Component | Criticality | Evidence (ticket quote or field) |
|-----------|-------------|----------------------------------|
| {Component name} | {Criticality label} | "{Exact quote or field reference from ticket}" |
| {Component name} | {Criticality label} | "{Exact quote or field reference from ticket}" |

---

## 2. Change Classification

<!-- [LABEL] per row — use exactly the labels from mapping-reference Section 2.
     Layer may list multiple values. All other rows: one label only. -->

| Dimension | Classification |
|-----------|---------------|
| Layer | `{UI | API | Backend Logic | Database | Integration | Infrastructure | Multiple}` |
| Scope | `{Single-Component | Multi-Component | Cross-Module | System-Wide}` |
| Data Sensitivity | `{None | Low | High}` |
| Change Type | `{Feature Addition | Bug Fix | UI-Only | Integration | Configuration | Bug Fix + Feature Addition}` |

---

## 3. Indirect Impacts (Ripple Effects)

<!-- [TABLE] — trace downstream using references/mapping-reference.md → Section 3.
     Impact Type for all rows here: Indirect
     Criticality labels: Critical · High · Medium · Low · Unknown -->

| Component | Criticality | Reason (dependency rule from mapping-reference) |
|-----------|-------------|------------------------------------------------|
| {Component name} | {Criticality label} | "{Which direct component triggers this, and why}" |
| {Component name} | {Criticality label} | "{Which direct component triggers this, and why}" |

_If no indirect impacts: write "None identified."_

---

## 4. Ripple Effect Category

<!-- [LABEL] — one label from mapping-reference Section 4.
     Follow with one sentence of justification. -->

**Category:** `{Isolated | Local | Broad | Systemic}`

**Justification:** {One sentence explaining why this category was chosen, citing the total component count and any global/shared component involvement.}

---

## 5. Key Risk Flags

<!-- [LIST] — bullet list of notable risks visible from categorisation.
     Do NOT score. Flag what matters: compliance, data sensitivity, global components, undocumented components, missing ticket information.
     Limit: 3–6 bullets. -->

- {Risk flag 1}
- {Risk flag 2}
- {Risk flag 3}

---

## 6. Release Candidate Summary

<!-- [TEXT] — 3–5 sentences in plain business English.
     Describe: what the ticket changes, which critical components are touched,
     what the ripple effect means for the release, and any flags requiring attention.
     Do NOT include scores or test counts. -->

{3–5 sentence plain-English summary of the analysed release candidate.}

---

<!--
COMPLETENESS CHECKLIST (remove before delivering)
[ ] Ticket Snapshot — all fields filled
[ ] Section 1 — at least one direct component listed with evidence
[ ] Section 2 — all four classification dimensions labelled
[ ] Section 3 — indirect impacts listed or explicitly marked "None identified"
[ ] Section 4 — one Ripple Effect Category label + justification sentence
[ ] Section 5 — 3–6 risk flags present
[ ] Section 6 — 3–5 sentence summary written
[ ] All labels match mapping-reference.md exactly
-->

<!-- ARTEFACT: ANALYSED-RELEASE-CANDIDATE-DESCRIPTION | TICKET: {TICKET-ID} -->
