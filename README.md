# Elecalculate

<a href="https://elecalculate.com">
    <img src="https://elecalculate.com/Pictures/favicon.png" alt="Elecalculate.com" width="100" height="100">
</a>

**Elecalculate** is a website designed to help you calculate various electronics parameters.

## Features

- Fully functional offline
- Developed with assistance from ChatGPT
- Tested by humans
- Generates each step to reach the solution
- Updated regularly

---

## About this Fork

> **Note:**
> This fork is for educational purposes, focusing on network security (e.g., XSS) and robust automated testing.

---

## Quick Start

1. Install [Node.js](https://nodejs.org/)
2. Install [Python 3.12](https://www.python.org/downloads/release/python-3120/) (should be present on most systems)
3. Run `npm install`
4. Start the site and run tests:
   - Headless: `npm run cy:run`
   - Interactive: `npm run cy:open`

> **Note:**
> The test suite and Node.js tools are intended for developers and maintainers.
> End users do **not** need Node.js to use the website.

---

## Testing & Security

This fork includes a **comprehensive Cypress end-to-end test suite** for all calculators and glossary/search features.

- **Functional tests:** `cypress/e2e/functional/`
- **Security tests:** `cypress/e2e/security/`

For advanced usage, test organization, and custom scripts, see [TESTING.md](./TESTING.md).

---

## Follow Elecalculate

Stay updated by following Elecalculate on Social Media:

<a href="https://www.instagram.com/elecalculate">
    <img src="https://elecalculate.com/Pictures/instagram-logo.jpg" alt="Follow us on Instagram" width="60" height="60">
</a>