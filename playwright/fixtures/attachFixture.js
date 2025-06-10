const fs = require('fs');
const path = require('path');

/**
 * General info about fixtures for all projects and audiences.
 */
const FIXTURE_INFO = `
What is a fixture?
------------------
A fixture is a set of sample or reference data used in automated tests.
Fixtures help ensure tests are repeatable, reliable, and easy to understand.
They represent the "expected" values or state that the application should use or display.

Why use fixtures?
- To provide consistent test data for every test run
- To make tests easier to read and maintain
- To separate test logic from test data
`;

/**
 * Attach a fixture file to the Playwright test report as both:
 *  - Plain text (with explanation and data)
 *  - JSON (collapsible, syntax-highlighted)
 *
 * @param {import('@playwright/test').TestInfo} testInfo
 * @param {string} fixturePath - Relative path to the fixture file (JSON, YAML, etc.)
 * @param {object} [options]
 * @param {string} [options.description] - Optional extra description for this specific fixture
 * @param {string} [options.name] - Optional base name for the attachment (default: fixture file name)
 */
async function attachFixture(testInfo, fixturePath, options = {}) {
  const absPath = path.resolve(__dirname, fixturePath);
  const body = fs.readFileSync(absPath, 'utf-8');
  const baseName = options.name || path.basename(fixturePath, path.extname(fixturePath));

  // Attach as plain text with explanation
  const explanation = `${FIXTURE_INFO}
${options.description ? `\nAbout this fixture:\n-------------------\n${options.description}\n` : ''}
Fixture data:
-------------
${body}
`;

  await testInfo.attach(`${baseName}.txt`, {
    body: explanation,
    contentType: 'text/plain',
  });

  // If it's JSON, also attach as JSON for collapsible view
  if (fixturePath.endsWith('.json')) {
    // Pretty-print if not already
    let pretty = body;
    try {
      pretty = JSON.stringify(JSON.parse(body), null, 2);
    } catch (e) {
      // Not valid JSON, skip pretty-print
    }
    await testInfo.attach(`${baseName}.json`, {
      body: pretty,
      contentType: 'application/json',
    });
  }
}

module.exports = { attachFixture };