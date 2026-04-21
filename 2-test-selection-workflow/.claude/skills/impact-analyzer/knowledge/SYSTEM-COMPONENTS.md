# System Components Inventory

**Last Updated:** 2026-03-19

## Overview
This document provides a comprehensive list of all system components in the e-commerce platform, their descriptions, relationships, and dependencies.

---

## 1. Global Components (Suite ID: 15)

### 1.1 Header Navigation
**Description:** Top navigation bar present on all pages  
**Type:** UI Component (Global)  
**Critical:** High - Impacts all user flows  
**Routes:** All (`/*`)

**Sub-components:**
- Logo/Home link - Navigation to homepage
- Categories dropdown - Product category navigation (Hand Tools, Power Tools, Other, Special Tools, Rentals)
- Contact link - Direct link to contact page
- Sign in / User account menu - Authentication entry point
- Shopping cart icon - Cart access with item count badge
- Language selector - Multi-language support (EN, DE, ES, FR, NL, TR)

**Dependencies:**
- Authentication system (for user account menu)
- Cart service (for cart badge count)
- Internationalization service (for language switching)

---

### 1.2 Footer
**Description:** Bottom section present on all pages  
**Type:** UI Component (Global)  
**Critical:** Low - Informational only  
**Routes:** All (`/*`)

**Sub-components:**
- GitHub repository link
- Support this project link
- Privacy Policy link
- Photo attribution (Unsplash)

**Dependencies:**
- None (static content)

---

### 1.3 Chat Assistant
**Description:** AI-powered customer support chat interface  
**Type:** Interactive Component (Global)  
**Critical:** Medium - Customer support channel  
**Routes:** All (`/*`)

**Sub-components:**
- "Open chat" floating button (bottom-right)
- Chat panel with greeting
- Quick actions: Find product, Order product, Checkout, Create support ticket

**Dependencies:**
- Product search service
- Cart service
- Ticketing system
- AI/Chat backend service

---

## 2. Customer Management Module (Suite ID: 5)

### 2.1 Login Page (Suite ID: 11)
**Description:** User authentication page  
**Type:** Authentication  
**Critical:** High - Required for checkout  
**Route:** `/auth/login`

**Components:**
- Email/password login form
- Password visibility toggle
- Google Sign-In integration
- Navigation links (Register, Forgot Password)

**Dependencies:**
- Authentication API
- OAuth provider (Google)
- Session management
- User database

**Upstream Dependencies (Components that depend on this):**
- Checkout flow (Step 2 - Authentication)
- User account menu
- Order history
- Favorites functionality

---

### 2.2 Register Page (Suite ID: 12)
**Description:** New user account creation  
**Type:** Authentication  
**Critical:** High - User acquisition  
**Route:** `/auth/register`

**Components:**
- Multi-field registration form (email, password, name, phone, country, DOB)
- Password strength indicator
- Password requirements validation
- Email format validation
- Duplicate email check
- Country dropdown
- Date of birth picker
- Phone number format validation

**Dependencies:**
- User database
- Email validation service
- Form validation library
- Country data service

**Upstream Dependencies:**
- Login page (navigation)
- Checkout flow (new user registration option)

---

### 2.3 Forgot Password Page (Suite ID: 14)
**Description:** Password reset request flow  
**Type:** Authentication  
**Critical:** Medium - Account recovery  
**Route:** `/auth/forgot-password`

**Components:**
- Email input form
- Password reset request submission
- Validation (email format, empty field)
- Navigation back to login

**Dependencies:**
- Email service
- User database
- Token generation service
- Password reset backend

**Upstream Dependencies:**
- Login page (navigation link)

---

## 3. Customer Portal Module (Suite ID: 4)

### 3.1 Product Listing Page (PLP) (Suite ID: 10)
**Description:** Main product browsing and discovery page  
**Type:** E-commerce Core  
**Critical:** High - Primary product discovery  
**Route:** `/` (Homepage)

**Components:**
- Product grid display (cards with image, name, price, CO2 rating)
- Search functionality (text input, clear button)
- Sort dropdown (Name A-Z/Z-A, Price High-Low/Low-High, CO2 Rating)
- Price range filter ($0-$200 dual slider)
- Category filters (Hand Tools, Power Tools, Other)
- Brand filters (ForgeFlex Tools, MightyCraft Hardware)
- Sustainability filter (eco-friendly products)
- Pagination (page numbers, prev/next buttons)
- Empty state results display

**Dependencies:**
- Product catalog database
- Search/indexing service
- Filter backend API
- Image CDN
- Pagination logic

**Upstream Dependencies:**
- Header navigation (categories dropdown)
- PDP (product card click navigation)
- Cart (add to cart from listing)

---

### 3.2 Product Detail Page (PDP) (Suite ID: 13)
**Description:** Detailed product information and purchase interface  
**Type:** E-commerce Core  
**Critical:** High - Conversion point  
**Route:** `/product/{id}`

**Components:**
- Product information display (image, title, category, brand, price, CO2 rating, description)
- Product image gallery
- Quantity selector (increase/decrease buttons, manual input)
- Stock status indicator
- Add to cart button
- Add to favorites button (toggle)
- Related products section (4 items)

**Dependencies:**
- Product database
- Inventory management system
- Cart service
- Favorites/Wishlist service
- Recommendation engine (for related products)
- Image CDN

**Upstream Dependencies:**
- PLP (navigation from listing)
- Cart (add to cart action)
- Checkout flow

---

## 4. Checkout Module (Suite ID: 6)

### 4.1 Checkout Wizard
**Description:** 4-step guided purchase completion flow  
**Type:** E-commerce Core  
**Critical:** Critical - Revenue generation  
**Route:** `/checkout`

**High-Level Components:**
1. **Cart Step** - Order review and editing
2. **Sign In Step** - Authentication gate
3. **Billing Address Step** - Shipping information
4. **Payment Step** - Payment processing

---

### 4.2 Cart Step (Step 1)
**Description:** Cart review and modification  
**Type:** Checkout Component  
**Critical:** Critical

**Components:**
- Cart items list (image, name, quantity, price, subtotal)
- Quantity editor (increase, decrease, manual entry)
- Remove item button
- Order summary (subtotal, tax, shipping, grand total)
- Continue button
- Empty cart handling

**Dependencies:**
- Cart service/session
- Product database
- Tax calculation service
- Shipping calculation service

---

### 4.3 Sign In Step (Step 2)
**Description:** Authentication requirement for checkout  
**Type:** Checkout Component  
**Critical:** Critical

**Components:**
- Login form (embedded)
- Register link
- Forgot password link
- Progress indicator
- Navigation back to cart

**Dependencies:**
- Authentication API (reuses Login Page logic)
- Session management
- User database

---

### 4.4 Billing Address Step (Step 3)
**Description:** Shipping and billing information collection  
**Type:** Checkout Component  
**Critical:** Critical

**Components:**
- Address form (first/last name, street, apt, city, state, postal, country, phone)
- Form validation (required fields, format validation)
- "Ship to different address" checkbox
- Secondary shipping address form (conditional)
- Continue button
- Back navigation

**Dependencies:**
- Address validation service
- Country/state data service
- User profile service (pre-fill for existing users)

---

### 4.5 Payment Step (Step 4)
**Description:** Payment method and order completion  
**Type:** Checkout Component  
**Critical:** Critical

**Components:**
- Payment method selection (Credit Card, PayPal)
- Credit card form (number, name, expiration, CVV)
- Card type detection
- Order review summary (all items, totals, addresses)
- Place order button
- Payment validation and error handling
- Order confirmation redirect

**Dependencies:**
- Payment gateway (Stripe/PayPal/etc.)
- Order processing service
- Email service (confirmation email)
- Order database
- Inventory update service
- Transaction logging

**Upstream Dependencies:**
- Order confirmation page
- Order history
- Email notification service

---

### 4.6 Checkout Progress Indicator
**Description:** Visual progress tracker across checkout steps  
**Type:** Checkout Component  
**Critical:** High - UX critical

**Components:**
- 4-step visual indicator
- Current step highlighting
- Completed step marking
- Clickable navigation to previous steps
- Disabled future steps

**Dependencies:**
- Checkout state management

---

### 4.7 Checkout Session Persistence
**Description:** Data retention across browser sessions  
**Type:** Checkout Infrastructure  
**Critical:** High - Abandonment reduction

**Components:**
- Session storage/management
- Data restoration logic
- Timeout handling

**Dependencies:**
- Browser storage (localStorage/sessionStorage)
- Session timeout service
- Data serialization

---

## 5. Supporting Pages

### 5.1 Contact Page (Suite ID: 7)
**Description:** Customer support contact form  
**Type:** Support  
**Critical:** Medium - Customer support channel  
**Route:** `/contact`

**Components:**
- Contact form (first name, last name, email, subject dropdown, message textarea)
- Subject dropdown (Customer service, Webmaster, Return, Payments, Warranty, Status of my order)
- File attachment (restricted to .txt, 0kb files)
- Send button
- Form validation

**Dependencies:**
- Email service
- Ticketing system backend
- File upload service

---

### 5.2 Rentals Page (Suite ID: 8)
**Description:** Tool rental service page  
**Type:** Business Feature  
**Critical:** Medium - Secondary revenue stream  
**Route:** `/rentals`

**Components:**
- Rental inventory display
- Rental options

**Dependencies:**
- Rental inventory database
- Rental booking system

---

### 5.3 Privacy Policy Page (Suite ID: Other Pages)
**Description:** Legal compliance page  
**Type:** Legal/Compliance  
**Critical:** Low - Informational  
**Route:** `/privacy`

**Components:**
- Static privacy policy content

**Dependencies:**
- None (static content)

---

## 6. Backend Services & APIs

### 6.1 Authentication Service
**Description:** User authentication and session management  
**Type:** Backend Service  
**Critical:** Critical

**Responsibilities:**
- User login/logout
- Session token generation
- OAuth integration
- Password reset
- User registration

**Used By:**
- Login page
- Register page
- Forgot password page
- Checkout (Step 2)
- All authenticated routes

---

### 6.2 Cart Service
**Description:** Shopping cart management  
**Type:** Backend Service  
**Critical:** Critical

**Responsibilities:**
- Add/remove items
- Update quantities
- Calculate totals
- Session persistence
- Cart badge count

**Used By:**
- PDP (add to cart)
- Cart header icon
- Checkout (Cart step)

---

### 6.3 Product Catalog Service
**Description:** Product data management  
**Type:** Backend Service  
**Critical:** High

**Responsibilities:**
- Product listing
- Product details retrieval
- Search functionality
- Filter/sort operations
- Inventory status

**Used By:**
- PLP
- PDP
- Search functionality
- Related products

---

### 6.4 Order Management Service
**Description:** Order processing and tracking  
**Type:** Backend Service  
**Critical:** Critical

**Responsibilities:**
- Order creation
- Payment processing coordination
- Order status tracking
- Order history
- Inventory updates

**Used By:**
- Checkout (Payment step)
- Order confirmation
- User account/order history

---

### 6.5 Payment Gateway Integration
**Description:** Third-party payment processing  
**Type:** External Integration  
**Critical:** Critical

**Responsibilities:**
- Payment authorization
- Transaction processing
- PCI compliance
- Payment method validation

**Used By:**
- Checkout (Payment step)

---

### 6.6 Email Service
**Description:** Transactional email delivery  
**Type:** Backend Service  
**Critical:** High

**Responsibilities:**
- Order confirmation emails
- Password reset emails
- Contact form submissions
- Support ticket notifications

**Used By:**
- Checkout (order confirmation)
- Forgot password
- Contact form
- Registration

---

### 6.7 Internationalization Service
**Description:** Multi-language support  
**Type:** Backend Service  
**Critical:** Medium

**Responsibilities:**
- Language switching
- Content translation
- Locale management

**Used By:**
- Header (language selector)
- All pages

---

## 7. Third-Party Integrations

### 7.1 Google OAuth
**Description:** Third-party authentication provider  
**Type:** External Integration  
**Critical:** Medium

**Used By:**
- Login page (Google Sign-In)

---

### 7.2 Payment Providers
**Description:** Credit card and payment processing  
**Type:** External Integration  
**Critical:** Critical

**Used By:**
- Checkout (Payment step)

---

### 7.3 Email Provider
**Description:** Email delivery service (e.g., SendGrid, SES)  
**Type:** External Integration  
**Critical:** High

**Used By:**
- Email service

---

### 7.4 CDN / Image Hosting
**Description:** Static asset delivery  
**Type:** External Integration  
**Critical:** Medium

**Used By:**
- All pages with images
- PLP, PDP primarily

---

## Component Criticality Matrix

| Component | Business Impact | Technical Complexity | User Impact | Overall Criticality |
|-----------|----------------|---------------------|-------------|-------------------|
| Checkout Flow | Critical | High | Critical | **CRITICAL** |
| Payment Processing | Critical | High | Critical | **CRITICAL** |
| Authentication | Critical | Medium | High | **CRITICAL** |
| Cart Service | Critical | Medium | High | **CRITICAL** |
| PDP | High | Medium | High | **HIGH** |
| PLP | High | High | High | **HIGH** |
| Order Management | High | High | High | **HIGH** |
| Registration | High | Medium | Medium | **HIGH** |
| Header Navigation | High | Low | High | **HIGH** |
| Email Service | High | Low | Medium | **MEDIUM** |
| Contact Form | Medium | Low | Medium | **MEDIUM** |
| Forgot Password | Medium | Low | Medium | **MEDIUM** |
| Rentals | Medium | Medium | Low | **MEDIUM** |
| Chat Assistant | Medium | Medium | Low | **MEDIUM** |
| Footer | Low | Low | Low | **LOW** |
| Privacy Policy | Low | Low | Low | **LOW** |

---

## Component Dependency Graph

```
┌─────────────────────────────────────────────────────────────┐
│                      GLOBAL COMPONENTS                       │
│  Header (Navigation, Cart Icon, Auth Menu, Language)        │
│  Footer                                                      │
│  Chat Assistant                                              │
└─────────────────────────┬───────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┬─────────────────┐
        │                 │                 │                 │
┌───────▼────────┐ ┌──────▼─────────┐ ┌────▼─────────┐ ┌────▼─────┐
│   CUSTOMER     │ │  CUSTOMER      │ │  CHECKOUT    │ │ SUPPORT  │
│   PORTAL       │ │  MANAGEMENT    │ │  FLOW        │ │ PAGES    │
└────────────────┘ └────────────────┘ └──────────────┘ └──────────┘
│                 │                 │                 │
│ • PLP           │ • Login         │ • Cart Step    │ • Contact  │
│ • PDP           │ • Register      │ • Auth Step ───┼──┘         │
│                 │ • Forgot Pwd    │ • Address Step │ • Rentals  │
│                 │                 │ • Payment Step │ • Privacy  │
└────┬────────────┘ └───────┬───────┘ └───────┬──────┘ └──────────┘
     │                      │                 │
     └──────────────────────┼─────────────────┘
                            │
            ┌───────────────▼────────────────┐
            │      BACKEND SERVICES          │
            ├────────────────────────────────┤
            │ • Authentication Service       │
            │ • Cart Service                 │
            │ • Product Catalog Service      │
            │ • Order Management Service     │
            │ • Payment Gateway Integration  │
            │ • Email Service                │
            │ • Internationalization Service │
            └────────────────┬───────────────┘
                             │
            ┌────────────────▼────────────────┐
            │   EXTERNAL INTEGRATIONS         │
            ├─────────────────────────────────┤
            │ • Google OAuth                  │
            │ • Payment Providers             │
            │ • Email Provider (SendGrid/SES) │
            │ • CDN / Image Hosting           │
            └─────────────────────────────────┘
```

---

## Critical User Journeys

### Journey 1: Guest Purchase Flow
**Path:** PLP → PDP → Cart Step → Sign In → Register → Billing → Payment → Confirmation  
**Components Involved:** 11  
**Criticality:** Critical  
**Dependencies:** Authentication, Cart, Payment, Order Management

### Journey 2: Returning Customer Purchase
**Path:** PLP → PDP → Cart Step → Sign In (existing) → Billing → Payment → Confirmation  
**Components Involved:** 10  
**Criticality:** Critical  
**Dependencies:** Authentication, Cart, Payment, Order Management

### Journey 3: Product Discovery
**Path:** PLP (search/filter/sort) → PDP → Back to PLP  
**Components Involved:** 3  
**Criticality:** High  
**Dependencies:** Product Catalog, Search Service

### Journey 4: Account Creation
**Path:** Login → Register → Confirmation  
**Components Involved:** 3  
**Criticality:** High  
**Dependencies:** Authentication, Email Service

### Journey 5: Password Recovery
**Path:** Login → Forgot Password → Email → Reset → Login  
**Components Involved:** 4  
**Criticality:** Medium  
**Dependencies:** Authentication, Email Service

---

## Notes
- All frontend components depend on Header and Footer (global components)
- Checkout flow has the highest number of dependencies (8 direct dependencies)
- Payment processing is the single most critical component for business continuity
- Authentication service is required by 40% of all user flows
