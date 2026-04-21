# Impact Categorisation Mapping Reference

Defines the **criteria** for each categorisation label used by the Impact Analyzer skill.
Use this reference in every step — do not assign labels that are not defined here.

---

## Section 1: Component Criticality Criteria

> **Authoritative source:** See `knowledge/SYSTEM-COMPONENTS.md` — **Component Criticality Matrix**
> for the definitive criticality rating of each component. That file is the single source of truth.
> The label definitions below explain what each rating means.

**Criticality Labels:**
- **Critical** — failure directly causes revenue loss, security breach, or compliance violation
- **High** — failure significantly degrades conversion or user trust; recoverable but costly
- **Medium** — failure causes user frustration; workaround usually exists
- **Low** — failure has minimal business or user impact; cosmetic or informational only

---

## Section 2: Classification Criteria

### 2a. Layer

Assign every layer the ticket's changes touch. Multiple labels are valid.

| Label | Criteria — assign when the ticket involves... |
|-------|-----------------------------------------------|
| UI | Visible markup, styling, component layout, client-side display logic |
| API | Endpoint additions, changes to request/response contracts, API versioning |
| Backend Logic | Server-side business rules, state machines, calculation changes |
| Database | New tables, column additions/removals, query changes, schema migrations |
| Integration | New or changed external service connections (payment gateway, OAuth, email, CDN) |
| Infrastructure | Environment config, deployment pipeline, environment variables, CDN rules |
| Multiple | Two or more of the above layers are clearly involved |

### 2b. Scope

Assign exactly one scope label.

| Label | Criteria |
|-------|----------|
| Single-Component | Change is confined to one component; no other component's code or data is modified |
| Multi-Component | 2–3 components are explicitly changed; all within the same module |
| Cross-Module | Changes span more than one module (e.g. Checkout + Authentication + Email) |
| System-Wide | Change affects shared infrastructure, global components, or a central service used by the whole system |

### 2c. Data Sensitivity

Assign exactly one label.

| Label | Criteria |
|-------|----------|
| None | No user data involved; change is purely presentational or structural |
| Low | User-identifiable data (name, email, phone, address, order history) is stored, displayed, or transmitted |
| High | Payment card data, passwords, or PII under GDPR/PCI-DSS is stored, transmitted, or processed |

### 2d. Change Type

Assign exactly one label. Use the most conservative if multiple apply.

| Label | Criteria |
|-------|----------|
| Feature Addition | New user-facing functionality that did not previously exist |
| Bug Fix | Corrects a defect in existing behaviour; no new functionality introduced |
| UI-Only | Visual/layout change with no logic, data, or API impact |
| Integration | Introduces or modifies a connection to an external system or third-party service |
| Configuration | Changes to environment variables, feature flags, deployment config; no code logic change |
| Bug Fix + Feature Addition | Ticket explicitly fixes a bug AND adds new behaviour (mixed scope) |

---

## Section 3: Ripple Effect Criteria

### How to identify indirect (ripple) impacts

> **Authoritative source:** See `knowledge/SYSTEM-COMPONENTS.md` — each component's
> `Dependencies` and `Upstream Dependencies` blocks define the ripple chain for that component.
> Also consult **Section 6 (Backend Services)** for service-level `Used By` lists, which
> identify which frontend modules consume each backend service.

---

## Section 4: Ripple Effect Category Criteria

Assign exactly one category after completing the ripple analysis.

| Category | Criteria |
|----------|----------|
| Isolated | Only 1 component affected (direct). No downstream dependencies triggered. |
| Local | 2–3 components affected total (direct + indirect). All within one module. No global components. |
| Broad | 4–6 components affected total, or effects cross module boundaries. No systemic/global impact. |
| Systemic | 7+ components affected, OR a shared/global component is affected (Session Management, Header, Cart Badge), OR a Critical-path service used system-wide is impacted. |

---

## Quick Reference: Category Labels Summary

| Dimension | Valid Labels |
|-----------|-------------|
| Component Criticality | Critical · High · Medium · Low · Unknown (undocumented) |
| Impact Type | Direct · Indirect |
| Layer | UI · API · Backend Logic · Database · Integration · Infrastructure · Multiple |
| Scope | Single-Component · Multi-Component · Cross-Module · System-Wide |
| Data Sensitivity | None · Low · High |
| Change Type | Feature Addition · Bug Fix · UI-Only · Integration · Configuration · Bug Fix + Feature Addition |
| Ripple Effect Category | Isolated · Local · Broad · Systemic |
