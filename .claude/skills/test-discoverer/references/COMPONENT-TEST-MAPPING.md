# Component-to-Test Mapping — Test Discoverer Reference

**Last Updated:** 2026-03-19

Sections: Suite ID Lookup, Change Type → Test Selection, Keyword → Component Mapping.

> **Note:** Suite IDs are also embedded in `knowledge/SYSTEM-COMPONENTS.md` section headers
> (e.g. `### 2.1 Login Page (Suite ID: 11)`). That file is the authoritative source for
> component descriptions, sub-components, and dependency relationships. The tables below
> are the operational lookup view used during test discovery.

---

## Section 1: Suite ID Lookup

### Suite Hierarchy

| Suite ID | Title | Parent | Description |
|----------|-------|--------|-------------|
| 4 | Customer Page | — | Parent suite for product browsing pages (PLP, PDP) |
| 5 | Customer Management | — | Parent suite for auth pages (Login, Register, Forgot Password) |
| 6 | Checkout | — | 4-step checkout wizard (Cart, Sign In, Billing Address, Payment) |
| 7 | Contact | — | Customer support contact form page |
| 8 | Rentals | — | Tool rental service page |
| 9 | Other Pages | — | Parent suite for Privacy and miscellaneous pages |
| 10 | PLP | 4 | Product Listing Page (route: `/`) |
| 11 | Login | 5 | Login page (route: `/auth/login`) |
| 12 | Register | 5 | Registration page (route: `/auth/register`) |
| 13 | PDP | 4 | Product Detail Page (route: `/product/{id}`) |
| 14 | Forgot Password | 5 | Password reset page (route: `/auth/forgot-password`) |
| 15 | Global Components | — | Header Navigation, Footer, Chat Assistant |
| 18 | Privacy | 9 | Privacy Policy page (route: `/privacy`) |

---

### Checkout Module

| Component | Qase Suite ID | Test Count | Priority |
|-----------|---------------|------------|----------|
| Cart Step | 6 | 4 | Critical |
| Sign In Step | 6 | 3 | Critical |
| Billing Address Step | 6 | 3 | Critical |
| Payment Step | 6 | 5 | Critical |
| Progress Indicator / Navigation | 6 | 2 | High |
| Session / General Checkout | 6 | 3 | High |

**Checkout test files (Suite 6, 20 total):**
AC1-review-cart-items · AC2-edit-item-quantity · AC3-remove-items-from-cart ·
AC4-view-order-totals · AC5-authentication-required-sign-in-step ·
AC6-successful-login-during-checkout · AC7-register-new-account-during-checkout ·
AC8-billing-address-form-display · AC9-billing-address-form-validation ·
AC10-ship-to-different-address · AC11-payment-method-selection ·
AC12-credit-card-payment-form · AC13-order-review-on-payment-step ·
AC14-place-order-successfully · AC15-payment-validation-errors ·
AC16-progress-indicator-functionality · AC17-navigate-back-to-previous-step ·
AC18-session-persistence · AC19-empty-cart-handling · AC20-mobile-responsive-checkout

---

### Customer Management Module

| Component | Qase Suite ID | Test Count | Priority |
|-----------|---------------|------------|----------|
| Login Page | 11 | 14 | Critical |
| Register Page | 12 | 44 | Critical |
| Forgot Password | 14 | 6 | High |

**Login test files (Suite 11, 14 total):**
AC1-login-form-display · AC2-successful-login · AC3-invalid-credentials-incorrect-password ·
AC4-invalid-credentials-unregistered-email · AC5-empty-email-field-validation ·
AC6-empty-password-field-validation · AC7-all-fields-empty-validation ·
AC8-email-format-validation · AC9-google-sign-in · AC10-navigate-to-register ·
AC11-navigate-to-forgot-password · AC12-password-visibility-toggle ·
AC13-login-redirect-to-intended-destination · AC14-google-sign-in-cancelled-gracefully

**Register test files (Suite 12, 44 total):**
AC1-registration-form-display · AC2-successful-registration ·
AC3-required-field-first-name · AC4-required-field-last-name · AC5-required-field-dob ·
AC6-required-field-phone · AC7-required-field-street · AC8-required-field-postal-code ·
AC9-required-field-city · AC10-required-field-state · AC11-required-field-country ·
AC12-required-field-email · AC13-required-field-password · AC14-multiple-required-fields-empty ·
AC15-password-minimum-length · AC16-password-uppercase · AC17-password-lowercase ·
AC18-password-number · AC19-password-special-character · AC20-password-requirements-realtime ·
AC21-password-strength-weak · AC22-password-strength-moderate · AC23-password-strength-strong ·
AC24-password-strength-very-strong · AC25-password-strength-excellent · AC26-password-visibility-toggle ·
AC27-invalid-email-missing-at · AC28-invalid-email-missing-domain · AC29-invalid-email-missing-username ·
AC30-invalid-email-special-chars · AC31-valid-email-plus-sign · AC32-valid-email-subdomain ·
AC33-duplicate-email-check · AC34-country-dropdown-display · AC35-country-dropdown-search ·
AC36-dob-invalid-format · AC37-dob-future-date · AC38-dob-minimum-age · AC39-dob-valid-format ·
AC40-phone-international-format · AC41-phone-without-country-code ·
AC42-phone-with-dashes · AC43-phone-invalid-format · AC44-phone-with-letters

**Forgot Password test files (Suite 14, 6 total):**
AC1-forgot-password-form-display · AC2-successful-password-reset-request ·
AC3-unregistered-email-handling · AC4-empty-email-validation ·
AC5-invalid-email-format-validation · AC6-navigation-back-to-login

---

### Customer Portal Module

| Component | Qase Suite ID | Test Count | Priority |
|-----------|---------------|------------|----------|
| Product Listing Page (PLP) | 10 | 10 | High |
| Product Detail Page (PDP) | 13 | 12 | High |

**PLP test files (Suite 10, 10 total):**
AC1-product-grid-display · AC2-search-functionality · AC3-sort-functionality ·
AC4-price-range-filter · AC5-category-filter · AC6-brand-filter ·
AC7-sustainability-filter · AC8-pagination · AC9-filter-combination · AC10-empty-state-results

**PDP test files (Suite 13, 12 total):**
AC1-product-information-display · AC2-product-image-gallery ·
AC3-quantity-selector-increase · AC4-quantity-selector-decrease ·
AC5-quantity-selector-manual-input · AC6-add-to-cart · AC7-add-to-cart-out-of-stock ·
AC8-add-to-favourites · AC9-remove-from-favourites · AC10-related-products-display ·
AC11-co2-rating-display · AC12-stock-status-indicator

---

### Global Components

| Component | Qase Suite ID | Test Count | Priority |
|-----------|---------------|------------|----------|
| Header Navigation | 15 | 9 | High |
| Footer | 15 | 4 | Low |
| Chat Assistant | 15 | 4 | Medium |

**Global Components test files (Suite 15, 17 total):**
AC1-header-nav-elements-display · AC2-navigate-home-via-logo ·
AC3-categories-dropdown-displays-all-options · AC4-navigate-to-category-from-dropdown ·
AC5-language-selector-displays-all-languages · AC6-change-application-language ·
AC7-cart-badge-displays-item-count · AC8-cart-badge-updates-dynamically ·
AC9-footer-displays-all-required-elements · AC10-navigate-to-github-from-footer ·
AC11-navigate-to-support-page-from-footer · AC12-navigate-to-privacy-policy-from-footer ·
AC13-chat-assistant-button-visible · AC14-open-chat-and-verify-greeting-message ·
AC15-chat-assistant-quick-actions-displayed · AC16-interact-with-chat-quick-actions ·
AC17-navigate-to-contact-via-header

---

### Supporting Pages

| Component | Qase Suite ID | Test Count | Priority |
|-----------|---------------|------------|----------|
| Contact Page | 7 | 15 | Medium |
| Rentals Page | 8 | 7 | Medium |
| Privacy Policy | 18 | 7 | Low |

**Contact test files (Suite 7, 15 total):**
AC1-contact-form-displays-all-required-fields · AC2-submit-without-filling-any-fields ·
AC3-submit-missing-first-name · AC4-submit-missing-last-name · AC5-submit-missing-message ·
AC6-submit-invalid-email-format · AC7-submit-valid-email-format ·
AC8-subject-dropdown-displays-all-options · AC9-select-subject-from-dropdown ·
AC10-upload-valid-txt-file-attachment · AC11-reject-invalid-file-type ·
AC12-reject-txt-file-with-invalid-size · AC13-submit-form-all-required-fields-completed ·
AC14-submit-form-all-fields-including-attachment · AC15-verify-form-clears-after-submission

**Rentals test files (Suite 8, 7 total):**
AC1-access-rentals-via-categories-dropdown · AC2-verify-rentals-page-layout ·
AC3-verify-rental-inventory-items-displayed · AC4-verify-empty-state-no-rental-items ·
AC5-verify-rental-options-for-each-item · AC6-verify-rental-availability-status-display ·
AC7-access-rentals-via-direct-url

**Privacy Policy test files (Suite 18, 7 total):**
AC1-access-privacy-policy-via-footer-link · AC2-access-privacy-policy-via-direct-url ·
AC3-verify-privacy-policy-content-displayed · AC4-verify-effective-date-and-contact-info ·
AC5-verify-privacy-policy-link-in-footer · AC6-navigate-back-to-main-site-via-logo ·
AC7-navigate-back-using-browser-back-button

**No dedicated suite:** Email Service, Inventory Management, Session Management, Authentication Service, Order Management Service, Payment Gateway Integration, OAuth Integration — these are tested via their parent component suites (Checkout Suite 6, Customer Management Suites 11/12).

---

## Section 2: Jira Component to Qase Suite Quick Map

| Jira / Impact-Analyzer Component | Qase Suite ID |
|----------------------------------|---------------|
| Payment Step / Payment Processing | 6 |
| Checkout Flow / Cart Step | 6 |
| Login Page / Authentication | 11 |
| Register Page / Registration | 12 |
| Forgot Password | 14 |
| Product Listing Page (PLP) / Search | 10 |
| Product Detail Page (PDP) | 13 |
| Cart Service / Cart Header Badge | 6 |
| Header Navigation / Global Components | 15 |
| Contact Page | 7 |
| Rentals Page | 8 |
| Privacy Policy | 18 |
| Email Service | (no suite — tested via Suite 6 order confirmation tests) |
| Session Management | (no suite — tested via Suite 6 session persistence tests) |
| Inventory Management | (no suite — tested via Suite 6 payment + order tests) |
| OAuth Integration | (no suite — tested via Suite 11 Google Sign-In tests) |

---

## Section 3: Keyword to Component Mapping

Use when building QQL queries for keyword-search discovery (Step 4 of SKILL.md).

| Keywords | Component | Suite ID |
|----------|-----------|----------|
| payment, credit card, transaction, PayPal | Payment Step | 6 |
| checkout, cart, basket, cart step | Checkout | 6 |
| login, sign in, authentication, credential | Login | 11 |
| register, sign up, create account | Register | 12 |
| password reset, forgot password | Forgot Password | 14 |
| product page, PDP, product detail | PDP | 13 |
| product listing, PLP, catalog, search, filter, sort | PLP | 10 |
| add to cart, quantity selector | PDP + Cart (6, 13) | 6, 13 |
| header, navigation, menu, cart badge | Global | 15 |
| footer, github, support project | Global | 15 |
| chat, chat assistant, support ticket | Global | 15 |
| language, locale, translation, i18n | Global | 15 |
| contact, support form | Contact | 7 |
| rentals, rental | Rentals | 8 |
| privacy, privacy policy | Privacy | 18 |
| tax, billing address, shipping address | Checkout Billing | 6 |
| session, persist, timeout | Checkout Session | 6 |
| order, order confirmation, order history | Checkout Payment | 6 |
| OAuth, Google sign-in, social login | Login | 11 |
| 2FA, two-factor, TOTP, authenticator | Login + Auth | 11 |
| email, confirmation email, email template | Checkout Payment | 6 |

---

## Section 4: Change Type Discovery Guide

When the impact-analyzer output includes a Change Type label, use this as a starting point
for which suites to prioritise querying first.

| Change Type | Primary Suite(s) | Also Check |
|-------------|-----------------|------------|
| Feature Addition | Suite(s) of direct components | Dependency chain suites |
| Bug Fix | Suite of directly broken component | Integration suites (Suite 6 if checkout-adjacent) |
| UI-Only | Suite of affected component | Global (Suite 15) if header/footer |
| Integration | Suite 6 (payment), Suite 11/12 (auth) | All dependency suites |
| Configuration | Suite(s) matching affected component | Smoke tests if available |
