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

## Overview

This repository implements an enterprise-grade end-to-end (E2E) testing pipeline using [Playwright](https://playwright.dev/) and [Allure Report](https://qameta.io/allure-report/), fully automated via GitHub Actions.

- **Parallelized test execution** with Playwright sharding for scalability.
- **Rich test reporting** with Allure, including screenshots, videos, and trend/history charts.
- **Automated publishing** of the latest test report to GitHub Pages.
- **Optimized CI performance** with dependency and artifact caching.

---

## CI/CD Workflow

### 1. Distributed Playwright Test Execution

- Tests are sharded across 20 parallel jobs for fast feedback.
- Each shard uploads its Allure results as a separate artifact.

### 2. Allure Results Aggregation & Report Generation

- Allure results from all shards are merged.
- Previous test history is restored from the `allure-history` artifact to enable trend charts.
- The Allure HTML report is generated and uploaded as an artifact.

### 3. Automated Deployment to GitHub Pages

- The latest Allure report is published to [GitHub Pages](https://paul1404.github.io/elecalculate/).
- A summary with a direct link is posted in the GitHub Actions run summary.

---

## Allure Report

- **View the latest report:**  
  [Allure Test Report (GitHub Pages)](https://paul1404.github.io/elecalculate/)

- **Features:**
  - Test history and trend analysis
  - Screenshots and video attachments
  - Flaky test detection and retries
  - Timeline and defect categorization

---

## Caching & Performance

- **npm cache** (`~/.npm`) is used to speed up dependency installation.
- **Allure history** is persisted as a workflow artifact for trend support.
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

- After each CI run, the `public/history` directory is uploaded as the `allure-history` artifact.
- On the next run, this artifact is downloaded and restored into `allure-results/history` before generating the new report.
- This enables Allure to display trend charts and test history across runs, even on ephemeral runners.

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
- **Artifacts:** Allure results and history are stored as GitHub Actions artifacts for 7 days.
- **For flaky tests:** Playwright retries are enabled (`--retries=2`).

---

## Credits

- [Playwright](https://playwright.dev/)
- [Allure Report](https://qameta.io/allure-report/)
- [GitHub Actions](https://github.com/features/actions)