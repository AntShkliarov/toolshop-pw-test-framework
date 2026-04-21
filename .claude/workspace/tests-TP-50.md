---

## Section 1: Input Context

| Field | Value |
|-------|-------|
| Ticket ID | `TP-50` |
| Type | `Bug` |
| Summary | `Empty email field on the Forgot Password form is not validated — the form submits and displays a false success message.` |
| Ripple Effect Category | `Local` |
| Change Type | `Bug Fix` |

**Direct Components:**

| Component | Criticality | Qase Suite ID |
|-----------|-------------|---------------|
| Forgot Password Form (UI) | High | 14 |
| Password Reset API Endpoint | High | 14 |

**Indirect Components:**

| Component | Criticality | Qase Suite ID |
|-----------|-------------|---------------|
| Email / Notification Service | Medium | No Suite |
| User Authentication / Login | High | 11 |

---

## Section 2: Discovery Summary

| Strategy | Status | Tests Found | Notes |
|----------|--------|-------------|-------|
| Suite-Based (Primary) | `Executed` | 20 | Suite 14 (6 tests), Suite 11 (14 tests) |
| Keyword Search (Semantic) | `Executed` | 4 | Keywords: "password reset", "empty email"; all 4 already in suite pool. ("forgot password", "email validation" returned 0 — QQL unavailable, list_cases search used as fallback) |
| Dependency Chain | `Executed` | 0 | Email/Notification Service has no dedicated suite; no E2E/Smoke/Regression suites exist in TSHOP project |
| **Total Unique (after dedup)** | — | **20** | Excluded deprecated: 0 |

---

## Section 3: Candidate Test Pool

| Test ID | Title | Suite ID | Priority | Automation | Discovery Methods |
|---------|-------|----------|----------|------------|-------------------|
| TC-58 | [Forgot Password] — Verify form displays all required elements | 14 | Medium | Manual | suite_match |
| TC-59 | [Forgot Password] — Request password reset with valid registered email | 14 | Medium | Manual | suite_match, semantic_match |
| TC-60 | [Forgot Password] — Request password reset with unregistered email | 14 | Medium | Manual | suite_match, semantic_match |
| TC-61 | [Forgot Password] — Submit form with empty email field | 14 | Medium | Manual | suite_match, semantic_match |
| TC-62 | [Forgot Password] — Validate email format with invalid inputs | 14 | Medium | Manual | suite_match |
| TC-63 | [Forgot Password] — Navigate back to Login page | 14 | High | Manual | suite_match |
| TC-46 | [User Login] — Verify login form displays all required elements | 11 | High | Manual | suite_match |
| TC-47 | [User Login] — Login with valid email and password credentials | 11 | Critical | Manual | suite_match |
| TC-48 | [User Login] — Attempt login with incorrect password | 11 | Medium | Manual | suite_match |
| TC-49 | [User Login] — Attempt login with unregistered email | 11 | Medium | Manual | suite_match |
| TC-50 | [User Login] — Submit login form with empty email field | 11 | Medium | Manual | suite_match, semantic_match |
| TC-51 | [User Login] — Submit login form with empty password field | 11 | Medium | Manual | suite_match |
| TC-52 | [User Login] — Submit login form with all fields empty | 11 | High | Manual | suite_match |
| TC-53 | [User Login] — Validate email format with invalid inputs | 11 | Medium | Manual | suite_match |
| TC-54 | [User Login] — Authenticate using Google Sign-In | 11 | Critical | Manual | suite_match |
| TC-55 | [User Login] — Navigate to Register page from login | 11 | High | Manual | suite_match |
| TC-56 | [User Login] — Navigate to Forgot Password page from login | 11 | High | Manual | suite_match |
| TC-57 | [User Login] — Toggle password visibility in password field | 11 | High | Manual | suite_match |
| TC-152 | [User Login] — Login redirects to originally intended destination | 11 | Medium | Manual | suite_match |
| TC-153 | [User Login] — Google Sign-In cancelled or fails gracefully | 11 | High | Manual | suite_match |

_Total: 20 unique active tests_

---

## Section 4: Coverage Assessment

| Component | Impact Type | Suite ID | Status | Tests Found |
|-----------|-------------|----------|--------|-------------|
| Forgot Password Form (UI) | Direct | 14 | `Covered` | 6 |
| Password Reset API Endpoint | Direct | 14 | `Covered` | 6 |
| Email / Notification Service | Indirect | No Suite | `No Suite` | 0 |
| User Authentication / Login | Indirect | 11 | `Covered` | 14 |

---

## Section 5: Coverage Gaps

- **Email / Notification Service** — No dedicated Qase suite exists. Per COMPONENT-TEST-MAPPING.md, email functionality is tested via Suite 6 (Checkout order confirmation), but no tests covering the Forgot Password email delivery path (reset link dispatch, handling of empty/null recipient) exist anywhere in the project. This is a functional coverage gap for the indirect email risk identified in TP-50.

---

## Section 6: Notes

- **QQL search unavailable:** `mcp__qase__qql_search` returned a runtime error for all queries. Keyword discovery was completed using the `list_cases` search parameter as a fallback; coverage is equivalent for title-based matching.
- **TC-61 is the direct test for this bug:** `[Forgot Password] — Submit form with empty email field` (Suite 14) maps exactly to the defect described in TP-50 and the referenced TC dependency C014-4, Step 2.
- **No E2E/Smoke/Regression suites found:** The TSHOP project contains 13 suites — all functional/component-level. No integration or cross-journey test suites exist to provide additional dependency coverage.
- **All 20 tests are active (status = Actual):** No tests were excluded as deprecated or draft.
- **TC-59 / TC-60 are regression candidates:** The false success message bug may interact with the valid/unregistered email flows — both should be re-run to confirm the fix doesn't alter the success/failure messaging behaviour for legitimate submissions.
