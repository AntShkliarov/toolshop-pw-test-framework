# Candidate Test Pool Report — TP-61

---

## Section 1: Input Context

| Field | Value |
|-------|-------|
| Ticket ID | `TP-61` |
| Type | `Bug` |
| Summary | `Stock status missing on Product Detail Pages — in/out of stock indicator not shown` |
| Ripple Effect Category | `Local` |
| Change Type | `Bug Fix` |

**Direct Components:**

| Component | Criticality | Qase Suite ID |
|-----------|-------------|---------------|
| Product Detail Page (PDP) | High | 13 |

**Indirect Components:**

| Component | Criticality | Qase Suite ID |
|-----------|-------------|---------------|
| Inventory Management | High | No suite (tested via Suite 6) |

---

## Section 2: Discovery Summary

| Strategy | Status | Tests Found | Notes |
|----------|--------|-------------|-------|
| Suite-Based (Primary) | `Executed` | 32 | Suites 13 (PDP, 12 tests) and 6 (Checkout/Inventory, 20 tests) |
| Keyword Search (Semantic) | `Executed` | 1 | Keywords: "stock", "inventory" — TC-80 already in pool; TC-147 excluded (Rentals, irrelevant) |
| Dependency Chain | `Executed` | 0 new | Suite 6 already queried in primary; no E2E/Smoke/Regression suites exist in TSHOP |
| **Total Unique (after dedup)** | — | **32** | Excluded deprecated: 0 |

---

## Section 3: Candidate Test Pool

**Direct Component — PDP (Suite 13)**

| Test ID | Title | Suite ID | Priority | Automation | Discovery Methods |
|---------|-------|----------|----------|------------|-------------------|
| TC-74 | [Global] [Customer Page] Product information display on PDP | 13 | Critical | Manual | suite_match |
| TC-79 | [Global] [Customer Page] Add product to cart from PDP | 13 | Critical | Manual | suite_match |
| TC-75 | [Global] [Customer Page] Product image gallery interaction on PDP | 13 | High | Manual | suite_match |
| TC-76 | [Global] [Customer Page] Increase quantity in quantity selector on PDP | 13 | High | Manual | suite_match |
| TC-77 | [Global] [Customer Page] Decrease quantity in quantity selector on PDP | 13 | High | Manual | suite_match |
| TC-81 | [Global] [Customer Page] Add product to favourites from PDP | 13 | High | Manual | suite_match |
| TC-82 | [Global] [Customer Page] Remove product from favourites on PDP | 13 | High | Manual | suite_match |
| TC-83 | [Global] [Customer Page] Related products display on PDP | 13 | High | Manual | suite_match |
| TC-84 | [Global] [Customer Page] CO2 rating display and interaction on PDP | 13 | High | Manual | suite_match |
| TC-78 | [Global] [Customer Page] Manual quantity input validation on PDP | 13 | Medium | Manual | suite_match |
| TC-80 | [Global] [Customer Page] Add to cart disabled for out of stock products on PDP | 13 | Medium | Manual | suite_match, semantic_match |
| TC-85 | [Global] [Customer Page] Stock status indicator display on PDP | 13 | Medium | Manual | suite_match |

**Indirect Component — Inventory Management (via Suite 6)**

| Test ID | Title | Suite ID | Priority | Automation | Discovery Methods |
|---------|-------|----------|----------|------------|-------------------|
| TC-86 | [Checkout] — Review cart items in step 1 | 6 | Critical | Manual | dependency_match |
| TC-87 | [Checkout] — Edit item quantity in cart step | 6 | Critical | Manual | dependency_match |
| TC-88 | [Checkout] — Remove items from cart | 6 | Critical | Manual | dependency_match |
| TC-89 | [Checkout] — View order totals in cart step | 6 | Critical | Manual | dependency_match |
| TC-90 | [Checkout] — Authentication required on sign in step | 6 | Critical | Manual | dependency_match |
| TC-91 | [Checkout] — Successful login during checkout | 6 | Critical | Manual | dependency_match |
| TC-92 | [Checkout] — Register new account during checkout | 6 | Critical | Manual | dependency_match |
| TC-93 | [Checkout] — Billing address form display | 6 | Critical | Manual | dependency_match |
| TC-94 | [Checkout] — Billing address form validation | 6 | Critical | Manual | dependency_match |
| TC-96 | [Checkout] — Payment method selection | 6 | Critical | Manual | dependency_match |
| TC-97 | [Checkout] — Credit card payment form | 6 | Critical | Manual | dependency_match |
| TC-98 | [Checkout] — Order review on payment step | 6 | Critical | Manual | dependency_match |
| TC-99 | [Checkout] — Place order successfully | 6 | Critical | Manual | dependency_match |
| TC-100 | [Checkout] — Payment validation errors | 6 | Critical | Manual | dependency_match |
| TC-102 | [Checkout] — Navigate back to previous step | 6 | Critical | Manual | dependency_match |
| TC-104 | [Checkout] — Empty cart handling | 6 | Critical | Manual | dependency_match |
| TC-105 | [Checkout] — Mobile responsive checkout | 6 | Critical | Manual | dependency_match |
| TC-95 | [Checkout] — Ship to different address option | 6 | High | Manual | dependency_match |
| TC-101 | [Checkout] — Progress indicator functionality | 6 | High | Manual | dependency_match |
| TC-103 | [Checkout] — Session persistence | 6 | High | Manual | dependency_match |

_Total: 32 unique active tests_

---

## Section 4: Coverage Assessment

| Component | Impact Type | Suite ID | Status | Tests Found |
|-----------|-------------|----------|--------|-------------|
| Product Detail Page (PDP) | Direct | 13 | `Covered` | 12 |
| Inventory Management | Indirect | No suite | `No Suite` | 20 (via Suite 6) |

---

## Section 5: Coverage Gaps

None identified.

---

## Section 6: Notes

- TC-74 (Suite 13, AC1 – Product information display on PDP) is directly referenced in the TP-61 ticket as "TC dependency: AC1 – Product information display on PDP, Step 9" — this is the highest-priority test for this bug.
- TC-85 (Stock status indicator display on PDP) and TC-80 (Add to cart disabled for out-of-stock products) are the most precisely targeted tests for the reported defect.
- QQL semantic search tool returned errors (`client.search is not a function`); keyword strategy fell back to `list_cases` search parameter — coverage quality unaffected.
- No E2E, Smoke, or Regression suites exist in TSHOP; no additional dependency-chain suites were available.
- Inventory Management has no dedicated Qase suite; its coverage is provided through Suite 6 (Checkout) per the component mapping. The 20 Checkout tests are broad in scope relative to this PDP-only bug — the QC team may wish to treat them as lower-priority candidates during test selection.
