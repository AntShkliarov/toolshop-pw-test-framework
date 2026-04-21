# Candidate Test Pool Report — TP-37

---

## Section 1: Input Context

| Field | Value |
|-------|-------|
| Ticket ID | `TP-37` |
| Type | `Bug` |
| Summary | `Registration phone field rejects hyphenated phone numbers (e.g., 123-456-7890) displaying 'Only numbers are allowed' error` |
| Ripple Effect Category | `Broad` |
| Change Type | `Bug Fix` |

**Direct Components** (from impact-analyzer Section 1):

| Component | Criticality | Qase Suite ID |
|-----------|-------------|---------------|
| Register Page | High | 12 |

**Indirect Components** (from impact-analyzer Section 3):

| Component | Criticality | Qase Suite ID |
|-----------|-------------|---------------|
| Checkout Sign-In Step (Step 2) | Critical | 6 |

---

## Section 2: Discovery Summary

| Strategy | Status | Tests Found | Notes |
|----------|--------|-------------|-------|
| Suite-Based (Primary) | `Executed` | 64 | Suite 12 (44 tests), Suite 6 (20 tests) |
| Keyword Search (Semantic) | `Executed` | 0 new | QQL unavailable (MCP error); `list_cases` search for "phone" returned 0; "register" returned 3 results from Suites 11/14 — not relevant to phone validation |
| Dependency Chain | `Executed` | 0 new | Suite 6 already queried in primary strategy; no E2E/Smoke/Regression suites exist in TSHOP |
| **Total Unique (after dedup)** | — | **64** | Excluded deprecated: 0 |

---

## Section 3: Candidate Test Pool

_Direct component tests (Suite 12 — Register Page) listed first, followed by indirect (Suite 6 — Checkout)._

| Test ID | Title | Suite ID | Priority | Automation | Discovery Methods |
|---------|-------|----------|----------|------------|-------------------|
| TC-2 | Customer Registration - Registration Form Display | 12 | Critical | Manual | suite_match |
| TC-3 | Customer Registration - Successful Registration with Valid Data | 12 | Critical | Manual | suite_match |
| TC-4 | Customer Registration - Required Field Validation (First Name) | 12 | High | Manual | suite_match |
| TC-5 | Customer Registration - Required Field Validation (Last Name) | 12 | High | Manual | suite_match |
| TC-6 | Customer Registration - Required Field Validation (Date of Birth) | 12 | High | Manual | suite_match |
| TC-7 | Customer Registration - Required Field Validation (Phone) | 12 | Critical | Manual | suite_match |
| TC-8 | Customer Registration - Required Field Validation (Street) | 12 | High | Manual | suite_match |
| TC-9 | Customer Registration - Required Field Validation (Postal Code) | 12 | High | Manual | suite_match |
| TC-10 | Customer Registration - Required Field Validation (City) | 12 | High | Manual | suite_match |
| TC-11 | Customer Registration - Required Field Validation (State) | 12 | High | Manual | suite_match |
| TC-12 | Customer Registration - Required Field Validation (Country) | 12 | High | Manual | suite_match |
| TC-13 | Customer Registration - Required Field Validation (Email) | 12 | High | Manual | suite_match |
| TC-14 | Customer Registration - Required Field Validation (Password) | 12 | High | Manual | suite_match |
| TC-15 | Customer Registration - Multiple Required Fields Empty | 12 | Critical | Manual | suite_match |
| TC-16 | Customer Registration - Password Minimum Length Validation | 12 | Critical | Manual | suite_match |
| TC-17 | Customer Registration - Password Uppercase Requirement Validation | 12 | Critical | Manual | suite_match |
| TC-18 | Customer Registration - Password Lowercase Requirement Validation | 12 | Critical | Manual | suite_match |
| TC-19 | Customer Registration - Password Number Requirement Validation | 12 | Critical | Manual | suite_match |
| TC-20 | Customer Registration - Password Special Character Requirement Validation | 12 | Critical | Manual | suite_match |
| TC-21 | Customer Registration - Password Requirements Real-Time Update | 12 | High | Manual | suite_match |
| TC-22 | Customer Registration - Password Strength Meter (Weak) | 12 | High | Manual | suite_match |
| TC-23 | Customer Registration - Password Strength Meter (Moderate) | 12 | High | Manual | suite_match |
| TC-24 | Customer Registration - Password Strength Meter (Strong) | 12 | High | Manual | suite_match |
| TC-25 | Customer Registration - Password Strength Meter (Very Strong) | 12 | High | Manual | suite_match |
| TC-26 | Customer Registration - Password Strength Meter (Excellent) | 12 | High | Manual | suite_match |
| TC-27 | Customer Registration - Password Visibility Toggle | 12 | High | Manual | suite_match |
| TC-28 | Customer Registration - Invalid Email Format (Missing @) | 12 | Critical | Manual | suite_match |
| TC-29 | Customer Registration - Invalid Email Format (Missing Domain) | 12 | Critical | Manual | suite_match |
| TC-30 | Customer Registration - Invalid Email Format (Missing Username) | 12 | Critical | Manual | suite_match |
| TC-31 | Customer Registration - Invalid Email Format (Special Characters) | 12 | Critical | Manual | suite_match |
| TC-32 | Customer Registration - Valid Email with Plus Sign | 12 | High | Manual | suite_match |
| TC-33 | Customer Registration - Valid Email with Subdomain | 12 | High | Manual | suite_match |
| TC-34 | Customer Registration - Duplicate Email Check | 12 | Critical | Manual | suite_match |
| TC-35 | Customer Registration - Country Dropdown Display | 12 | High | Manual | suite_match |
| TC-36 | Customer Registration - Country Dropdown Search/Filter | 12 | High | Manual | suite_match |
| TC-37 | Customer Registration - Date of Birth Format Validation (Invalid Format) | 12 | High | Manual | suite_match |
| TC-38 | Customer Registration - Date of Birth Future Date Validation | 12 | Critical | Manual | suite_match |
| TC-39 | Customer Registration - Date of Birth Minimum Age Validation | 12 | High | Manual | suite_match |
| TC-40 | Customer Registration - Date of Birth Valid Format | 12 | Critical | Manual | suite_match |
| TC-41 | Customer Registration - Phone Number Format (International Format) | 12 | High | Manual | suite_match |
| TC-42 | Customer Registration - Phone Number Format (Without Country Code) | 12 | High | Manual | suite_match |
| TC-43 | Customer Registration - Phone Number Format (With Dashes) | 12 | High | Manual | suite_match |
| TC-44 | Customer Registration - Phone Number Invalid Format | 12 | High | Manual | suite_match |
| TC-45 | Customer Registration - Phone Number With Letters | 12 | High | Manual | suite_match |
| TC-86 | [Checkout] — Review cart items in step 1 | 6 | Critical | Manual | suite_match |
| TC-87 | [Checkout] — Edit item quantity in cart step | 6 | Critical | Manual | suite_match |
| TC-88 | [Checkout] — Remove items from cart | 6 | Critical | Manual | suite_match |
| TC-89 | [Checkout] — View order totals in cart step | 6 | Critical | Manual | suite_match |
| TC-90 | [Checkout] — Authentication required on sign in step | 6 | Critical | Manual | suite_match |
| TC-91 | [Checkout] — Successful login during checkout | 6 | Critical | Manual | suite_match |
| TC-92 | [Checkout] — Register new account during checkout | 6 | Critical | Manual | suite_match |
| TC-93 | [Checkout] — Billing address form display | 6 | Critical | Manual | suite_match |
| TC-94 | [Checkout] — Billing address form validation | 6 | Critical | Manual | suite_match |
| TC-95 | [Checkout] — Ship to different address option | 6 | High | Manual | suite_match |
| TC-96 | [Checkout] — Payment method selection | 6 | Critical | Manual | suite_match |
| TC-97 | [Checkout] — Credit card payment form | 6 | Critical | Manual | suite_match |
| TC-98 | [Checkout] — Order review on payment step | 6 | Critical | Manual | suite_match |
| TC-99 | [Checkout] — Place order successfully | 6 | Critical | Manual | suite_match |
| TC-100 | [Checkout] — Payment validation errors | 6 | Critical | Manual | suite_match |
| TC-101 | [Checkout] — Progress indicator functionality | 6 | High | Manual | suite_match |
| TC-102 | [Checkout] — Navigate back to previous step | 6 | Critical | Manual | suite_match |
| TC-103 | [Checkout] — Session persistence | 6 | High | Manual | suite_match |
| TC-104 | [Checkout] — Empty cart handling | 6 | Critical | Manual | suite_match |
| TC-105 | [Checkout] — Mobile responsive checkout | 6 | Critical | Manual | suite_match |

_Total: 64 unique active tests_

---

## Section 4: Coverage Assessment

| Component | Impact Type | Suite ID | Status | Tests Found |
|-----------|-------------|----------|--------|-------------|
| Register Page | Direct | 12 | `Covered` | 44 |
| Checkout Sign-In Step (Step 2) | Indirect | 6 | `Covered` | 20 |

---

## Section 5: Coverage Gaps

None identified.

---

## Section 6: Notes

- TC-43 (Suite 12: "Customer Registration - Phone Number Format (With Dashes)") is the direct Qase counterpart to C042 cited in the TP-37 ticket description — this test should be the primary regression anchor for this fix
- QQL search was unavailable (MCP tool error); keyword fallback via `list_cases` search parameter for "phone" returned 0 matches (title-search limitation) — all phone validation tests are captured within Suite 12's suite-based pull
- 3 tests returned by "register" keyword search (TC-49 from Suite 11, TC-59 and TC-60 from Suite 14) were excluded: they relate to unregistered email handling in Login and Forgot Password flows, not to phone validation on the Registration page
- No E2E, Smoke, Integration, or Regression suites exist in TSHOP — all 13 suites are component-based; dependency chain discovery confirmed no additional suites were available
- All 64 tests are Manual (automation = 0) and Active (status = 0) — no deprecated or draft tests were found
- TC-92 ("[Checkout] — Register new account during checkout") is the highest-priority indirect test for this bug; it exercises the new-user registration path within the Guest Purchase Journey identified as the primary ripple risk in the impact analysis
