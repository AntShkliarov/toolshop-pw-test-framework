# Prerequisites: Intelligent Test Selection Agentic Workflow

## 1. System Access and Integrations

### 1.1 Project Management System Access
- **Requirement**: Active (e.g. Atlassian/Jira) account with API access
- **Permissions Needed**:
  - Read access to projects, issues, comments, and custom fields
  - Read access to issue links and relationships
  - Read access to project metadata (components, labels, versions)
- **Configuration Items**:
  - Site URL (or e.g. Jira Cloud ID)
  - API authentication credentials (OAuth or API token)
  - List of project keys to monitor
- **Verification**: Ability to query issues via MCP server (e.g. Atlassian)

### 1.2 Test Management Access
- **Requirement**: Active account with API access (e.g. Qase)
- **Permissions Needed**:
  - Read access to test cases, suites, and test runs
  - Read access to test execution history and results
  - Read access to custom fields and project settings
  - Write access for creating test runs (optional, for AC7)
- **Configuration Items**:
  - API token (e.g. Qase)
  - Project code(s) to access
  - Custom field definitions and IDs
- **Verification**: Ability to list projects and test cases via API or e.g Qase MCP Server

### 1.3 Additional Integration Access (Optional)
- **CI/CD System**: Jenkins, GitLab CI, GitHub Actions (for code change context)
- **Version Control**: GitHub, GitLab, Bitbucket (for diff analysis)
- **Communication Tools**: Slack, Microsoft Teams (for notifications)
- **Monitoring/APM**: DataDog, New Relic (for production incident correlation)

## 2. Data Requirements

### 2.1 Historical Data
- **Project Management System Historical Data**:(optional)
  - Minimum 3-6 months of closed tickets (user stories, bugs, tasks)
  - Issue history and status transitions
  - Linked issues and relationships
  - Component and label usage patterns
- **TMS Historical Data**: (Optional)
  - Test execution history (minimum 3 months recommended)
  - Test case versions and update history
  - Defect tracking data linked to test cases
  - Test run results with pass/fail rates

### 2.2 System Architecture Documentation (Optional)
- **Component/Module Inventory**:
  - List of all system components with descriptions
  - Component relationships and dependencies
  - Component ownership and criticality ratings
- **Technology Stack Mapping**:
  - Frontend frameworks and pages/routes
  - Backend services and API endpoints
  - Database schemas and tables
  - Third-party integrations and external systems
- **Data Flow Documentation**:
  - Integration points and data exchange patterns
  - Authentication and authorization flows
  - Critical user journeys

### 2.3 Test Organization Structure
- **TMS Project Structure**:
  - Suite hierarchy and organization logic
  - Tagging taxonomy and conventions
  - Custom field definitions and usage
  - Test case naming conventions
- **Test Classification**:
  - Test types (functional, regression, smoke, integration, E2E)
  - Test layers (UI, API, unit, integration)
  - Automation status and coverage
  - Test priorities and selection criteria

## 3. Business Context and Rules

### 3.1 Risk Assessment Criteria
- **Technical Risk Factors**:
  - Definition of high/medium/low complexity changes
  - Critical system areas (payment, authentication, data privacy)
  - Known technical debt areas requiring extra validation
  - Compliance-regulated components (GDPR, HIPAA, etc.)
- **Business Risk Factors**:
  - Revenue-impacting features
  - User-facing vs internal functionality classifications
  - Customer satisfaction critical paths

### 3.2 Testing Standards and Policies
- **Coverage Requirements**:
  - Minimum test coverage thresholds by change type
  - Required test types for different scenarios
  - Regression testing policies
  - Smoke test requirements
- **Execution Constraints**:
  - Sprint duration and testing windows
  - QA team size and capacity
  - Automation vs manual testing ratios
  - Environment availability and limitations

### 3.3 Prioritization Rules
- **Decision Weights**:
  - Relative importance of risk factors (complexity, business impact, etc.)
  - Trade-offs between coverage and speed
  - Must-have vs nice-to-have testing
- **Selection Thresholds**:
  - Score cutoffs for must-run/should-run/optional classification
  - Maximum test count per priority tier
  - Time budget constraints

## 4. Sample Data for Training and Calibration

### 4.1 Representative Tickets
Provide 5-10 examples of each type:
- **User Stories**: With acceptance criteria, impacted areas, and typical structure
- **Bug Reports**: With reproduction steps, severity levels, and component tags
- **Technical Tasks**: With implementation details and architecture notes
- **Comments**: Examples of how team discusses impact in comments

### 4.2 Example Test Cases
Provide 10-20 examples from TMS showing:
- **Well-structured test cases**: With clear titles, descriptions, steps, tags
- **Different test types**: Smoke, regression, functional, integration, E2E
- **Various automation statuses**: Automated, manual, hybrid
- **Different priority levels**: High, medium, low with rationale
- **Tag usage patterns**: How components, features, and types are tagged

### 4.3 Historical Mapping Examples
Provide 3-5 past scenarios:
- **Change Description**: What was changed (from Jira)
- **Tests Selected**: Which tests were actually run
- **Tests That Should Have Run**: Tests missed in hindsight
- **Defects Found**: Issues discovered and which tests caught them
- **Lessons Learned**: Why certain tests were needed or unnecessary

## 5. Success Metrics and Baseline (Optional)

### 5.1 Current State Metrics
- **Baseline Performance** (to measure improvement against):
  - Average time to select tests manually: ___ minutes
  - Typical test count per change type: ___ tests
  - Defect escape rate: ___% (bugs found in production)
  - Test execution time per sprint: ___ hours
  - Test coverage completeness: ___%

### 5.2 Target Metrics
- **Efficiency Goals**:
  - Test selection time reduction: target < 2 minutes automated
  - Maintain or reduce test count while improving coverage
  - Reduce manual effort by ___%
- **Quality Goals**:
  - Reduce defect escape rate by ___%
  - Increase risk coverage to ___%
  - Achieve ___% recommendation acceptance rate by QC

## 6. Documentation Deliverables

### 6.1 Configuration Documentation
- Risk factor definitions and weight assignments
- Test selection rules and logic documentation
- Priority score calculation formulas

### 6.2 User Guides
- How to interpret agent recommendations
- When to override agent suggestions
- How to provide feedback for learning
- Troubleshooting common issues

---

## Validation Checklist

Before proceeding with implementation, confirm:
- [ ] All system accesses are provisioned and tested
- [ ] Sample data represents actual usage patterns
- [ ] Business rules are documented and approved

