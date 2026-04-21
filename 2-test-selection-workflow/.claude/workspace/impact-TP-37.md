## Analysed Release Candidate Description

---

## Ticket Snapshot

| Field | Value |
|-------|-------|
| Ticket ID | `TP-37` |
| Type | `Bug` |
| Summary | `Registration phone field rejects hyphenated phone numbers (e.g., 123-456-7890) displaying 'Only numbers are allowed' error` |
| Source | `Jira (fetched)` |

⚠ Acceptance criteria not provided — categorisation based on description only.

---

## 1. Direct Component Impact

| Component | Criticality | Evidence (ticket quote or field reference) |
|-----------|-------------|-------------------------------------------|
| Register Page | High | "User is on the Registration page" — phone number format validation is an explicitly listed sub-component of Register Page |

---

## 2. Change Classification

| Dimension | Classification |
|-----------|---------------|
| Layer | `UI` |
| Scope | `Single-Component` |
| Data Sensitivity | `Low` |
| Change Type | `Bug Fix` |

---

## 3. Indirect Impacts (Ripple Effects)

| Component | Criticality | Reason |
|-----------|-------------|--------|
| Checkout Sign-In Step (Step 2) | Critical | Register Page is surfaced via the "Register link" in Checkout Step 2; new users entering a hyphenated phone during registration within the Guest Purchase Journey are blocked from completing the account creation step and cannot proceed to checkout |

---

## 4. Ripple Effect Category

**Category:** `Broad`

**Justification:** 2 components are affected total (1 direct: Register Page; 1 indirect: Checkout Sign-In Step); though the count is low, the effects cross module boundaries from Customer Management into the Critical Checkout module, satisfying the cross-module criterion for Broad.

---

## 5. Key Risk Flags

- ⚠ Acceptance criteria not provided — categorisation based on description only
- Guest Purchase Journey at risk — new users who enter a hyphenated phone number during registration are blocked from completing checkout
- Phone number is user-identifiable PII (Low sensitivity); the validation fix must not introduce an overly permissive pattern that accepts malformed numbers
- Existing test case C042 (Phone Number Format With Dashes, Step 2) is already in Qase — must be included in the regression suite for this fix
- Billing Address Step (4.4) also collects a phone field with its own format validation — verify consistent behaviour across both forms (potential companion defect outside this ticket's scope)
- Workaround exists (enter digits only), but degraded UX may reduce registration conversion rate

---

## 6. Release Candidate Summary

TP-37 is a Minor/P2 Bug Fix that corrects an overly restrictive phone field validator on the Registration page, which incorrectly rejects common hyphenated phone formats such as `123-456-7890`. The directly affected component is the Register Page (High criticality), specifically its phone number format validation sub-component that relies on the form validation library. An indirect impact is identified on the Checkout Sign-In Step (Critical): because new users can initiate registration from within the checkout flow, the phone validation bug can block the Guest Purchase Journey for users entering hyphenated numbers. No acceptance criteria were provided with the ticket; this analysis is based on the reproduction steps and description alone. An existing Qase test case (C042) already covers this scenario and should anchor the regression pass for this release candidate.

---

<!-- ARTEFACT: ANALYSED-RELEASE-CANDIDATE-DESCRIPTION | TICKET: TP-37 -->
