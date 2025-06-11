# Elecalculate

<a href="https://elecalculate.com">
    <img src="https://elecalculate.com/Pictures/favicon.png" alt="Elecalculate.com" width="100" height="100">
</a>

**Elecalculate** is a website designed to help you calculate various electronics parameters

## Features
- Fully functional offline
- no AI
- Generates each step to reach the solution
- Updated regularly

## Follow Elecalculate
Stay updated by following elecalculate on Social Media:

<a href="https://www.instagram.com/elecalculate">
    <img src="https://elecalculate.com/Pictures/instagram-logo.jpg" alt="Follow us on Instagram" width="60" height="60">
</a>

# Playwright E2E CI with Allure Reporting

## Enterprise-Grade Testing & Reporting

This repository implements a robust, scalable end-to-end (E2E) testing pipeline using [Playwright](https://playwright.dev/) and [Allure Report](https://qameta.io/allure-report/), fully automated via GitHub Actions.

- **Massively parallel test execution** with Playwright sharding (20 shards).
- **Rich Allure reporting**: screenshots, videos, flaky test detection, and trend/history charts.
- **Automated publishing** of the latest test report to GitHub Pages.
- **Persistent test history** using a dedicated branch for Allure trends.
- **Optimized CI performance** with dependency caching.

---

## CI/CD Workflow Overview

### 1. Distributed Playwright Test Execution

- Tests are sharded across 20 parallel jobs for rapid feedback.
- Each shard uploads its Allure results as a separate artifact.

### 2. Allure Results Aggregation, History Management & Report Generation

- Allure results from all shards are merged.
- **Test history is restored from a dedicated branch (`EL-34-allure-history`)** for robust trend support across all runs and runners.
- The Allure HTML report is generated and uploaded as an artifact.
- The updated history is committed back to the history branch with a Jira-tagged commit for traceability.

### 3. Automated Deployment to GitHub Pages

- The latest Allure report is published to [GitHub Pages](https://paul1404.github.io/elecalculate/).
- A summary with a direct link is posted in the GitHub Actions run summary.

---

## Allure Report

- **View the latest report:**  
  [Allure Test Report (GitHub Pages)](https://paul1404.github.io/elecalculate/)

### Allure Features

- Test history and trend analysis (persisted across all CI runs)
- Screenshots and video attachments for every test
- Flaky test detection and retries
- Timeline and defect categorization

---

## Caching & Performance

- **npm cache** (`~/.npm`) is used to speed up dependency installation.
- **Allure history** is persisted in the `EL-34-allure-history` branch for cross-run trend support.
- **Playwright browsers** are pre-installed in the official Playwright Docker image (no extra install step needed).

---

## How to Run Locally

1. **Install dependencies:**
   ```bash
   npm ci
   ```

2. **Run Playwright tests:**
   ```bash
   npx playwright test
   ```

3. **Generate Allure report:**
   ```bash
   npx allure generate allure-results --clean -o allure-report
   npx allure open allure-report
   ```

---

## How Allure History Works

- The workflow checks out the `EL-34-allure-history` branch and restores the `history` directory into `allure-results/history` before generating the new report.
- After report generation, the updated `public/history` is committed and pushed back to the history branch with a Jira-tagged commit (e.g., `EL-34: Update Allure history [skip ci]`).
- This enables Allure to display trend charts and test history across all runs, even on ephemeral or rotating runners.

---

## Repository Structure

```
.github/workflows/         # GitHub Actions workflows
playwright/                # Playwright tests and fixtures
allure-results/            # Allure results (generated at runtime)
public/                    # Allure HTML report (generated at runtime)
```

---

## Maintenance & Troubleshooting

- **First run:** Allure history will be empty; trend charts appear from the second run onward.
- **History branch:** Only the `history/` directory is tracked in `EL-34-allure-history` for efficiency.
- **For flaky tests:** Playwright retries are enabled (`--retries=2`).

---

## Credits

- [Playwright](https://playwright.dev/)
- [Allure Report](https://qameta.io/allure-report/)
- [GitHub Actions](https://github.com/features/actions)