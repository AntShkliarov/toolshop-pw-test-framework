# Candidate Test Pool Report — TP-51

---

## Section 1: Input Context

| Field | Value |
|-------|-------|
| Ticket ID | `TP-51` |
| Type | `Bug` |
| Summary | `[Forgot Password] Invalid email formats accepted — no format validation, false success shown` |
| Ripple Effect Category | `Local` |
| Change Type | `Bug Fix` |

**Direct Components:**

| Component | Criticality | Qase Suite ID |
|-----------|-------------|---------------|
| Forgot Password Page | Medium | 14 |
| Authentication Service | Critical | No suite (covered via Suites 11 / 14) |

**Indirect Components:**

| Component | Criticality | Qase Suite ID |
|-----------|-------------|---------------|
| Email Service | Medium | No suite (order confirmation tests only in Suite 6) |

---

## Section 2: Discovery Summary

| Strategy | Status | Tests Found | Notes |
|----------|--------|-------------|-------|
| Suite-Based (Primary) | `Executed` | 20 | Suite 14 (6 tests), Suite 11 (14 tests) |
| Keyword Search (Semantic) | `Skipped` | 0 | QQL_UNAVAILABLE — `mcp__qase__qql_search` returned errors for all queries ("client.search is not a function") |
| Dependency Chain | `Executed` | 0 | Email Service has no dedicated suite; Suite 6 email tests cover order confirmation only, not password reset — no new tests added |
| **Total Unique (after dedup)** | — | **20** | Excluded deprecated: 0 |

---

## Section 3: Candidate Test Pool

| Test ID | Title | Suite ID | Priority | Automation | Discovery Methods |
|---------|-------|----------|----------|------------|-------------------|
| TC-58 | [Forgot Password] — Verify form displays all required elements | 14 | Medium | Manual | suite_match |
| TC-59 | [Forgot Password] — Request password reset with valid registered email | 14 | Medium | Manual | suite_match |
| TC-60 | [Forgot Password] — Request password reset with unregistered email | 14 | Medium | Manual | suite_match |
| TC-61 | [Forgot Password] — Submit form with empty email field | 14 | Medium | Manual | suite_match |
| TC-62 | [Forgot Password] — Validate email format with invalid inputs | 14 | Medium | Manual | suite_match |
| TC-63 | [Forgot Password] — Navigate back to Login page | 14 | High | Manual | suite_match |
| TC-46 | [User Login] — Verify login form displays all required elements | 11 | High | Manual | suite_match |
| TC-47 | [User Login] — Login with valid email and password credentials | 11 | Critical | Manual | suite_match |
| TC-48 | [User Login] — Attempt login with incorrect password | 11 | Medium | Manual | suite_match |
| TC-49 | [User Login] — Attempt login with unregistered email | 11 | Medium | Manual | suite_match |
| TC-50 | [User Login] — Submit login form with empty email field | 11 | Medium | Manual | suite_match |
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
| Forgot Password Page | Direct | 14 | `Covered` | 6 |
| Authentication Service | Direct | No suite | `No Suite` | 14 (via Suite 11) |
| Email Service | Indirect | No suite | `No Suite` | 0 (Suite 6 covers order email only) |

---

## Section 5: Coverage Gaps

- **Email Service** — No dedicated suite; password reset email delivery (valid address → email triggered, invalid address → no email) is not covered by any existing Qase test. Suite 6 tests cover order confirmation emails only. A test for password reset email triggering behaviour should be considered.

---

## Section 6: Notes

- ⚠ Semantic discovery was skipped: `mcp__qase__qql_search` is unavailable (returned "client.search is not a function" for all queries). Test pool may be incomplete. Manually search Qase for keywords: `forgot password`, `email format`, `password reset`, `email validation`, `invalid email`.
- TC-62 (`[Forgot Password] — Validate email format with invalid inputs`) is the direct test case for this bug — its steps exactly match the reproduction steps in TP-51 (invalid-email, test@, @domain.com, user@.com inputs).
- Authentication Service has no dedicated suite; its regression coverage is drawn from Suite 11 (Login) and Suite 14 (Forgot Password) — all 14 Login tests are included to guard against regressions in the shared auth backend.
- No E2E, Regression, or Smoke suites exist in TSHOP — no additional cross-flow tests were available for dependency chain discovery.
