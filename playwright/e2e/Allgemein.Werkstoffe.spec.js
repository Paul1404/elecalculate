// playwright/e2e/Allgemein.Werkstoffe.spec.js
const { test: base, expect } = require('@playwright/test');
const { attachFixture } = require('../fixtures/attachFixture');
const werkstoffeInputs = require('../fixtures/werkstoffeInputs.json');

const test = base.extend({
  werkstoffeInputs: async ({}, use) => {
    await use(werkstoffeInputs);
  },
});

// Helper: Open a dropdown by its header text (strict, robust)
async function openDropdown(page, headerText) {
  const header = page.locator('.dropdown-header', { hasText: headerText });
  const parent = header.locator('..');
  if (!(await parent.evaluate(el => el.classList.contains('open')))) {
    await header.click();
  }
}

// Helper: Fill fields from an object
async function fillFields(page, fields) {
  for (const [id, value] of Object.entries(fields)) {
    await page.locator(`#${id}`).fill(value);
  }
}

test.describe('Allgemein | Werkstoffe.html', () => {
  const url = '/Allgemein/Werkstoffe.html';

  test.beforeEach(async ({}, testInfo) => {
    await attachFixture(
      testInfo,
      '../fixtures/werkstoffeInputs.json',
      {
        description: `This fixture contains input and expected output values for Spezifischer Widerstand, Temperaturabhängigkeit, and Stromdichte calculations.`
      }
    );
  });

  // --- Spezifischer Widerstand Section ---
  for (const [i, tc] of werkstoffeInputs.spezifischerWiderstand.entries()) {
    test(`Spezifischer Widerstand: ${tc.desc}`, async ({ page }) => {
      await page.goto(url);
      await openDropdown(page, 'Spezifischer Widerstand');
      await fillFields(page, tc.fields);
      await page.locator(`input[onclick="${tc.button}()"]`).click();
      const text = await page.locator(tc.result).innerText();
      await expect(text).toContain(tc.expected);
    });
  }

  // --- Temperaturabhängigkeit Section ---
  for (const [i, tc] of werkstoffeInputs.temperaturabhaengigkeit.entries()) {
    test(`Temperaturabhängigkeit: ${tc.desc}`, async ({ page }) => {
      await page.goto(url);
      await openDropdown(page, 'Temperaturabhängigkeit Widerstände');
      await fillFields(page, tc.fields);
      await page.locator(`input[onclick="${tc.button}()"]`).click();
      const text = await page.locator(tc.result).innerText();
      await expect(text).toContain(tc.expected);
    });
  }

  // --- Stromdichte Section ---
  for (const [i, tc] of werkstoffeInputs.stromdichte.entries()) {
    test(`Stromdichte: ${tc.desc}`, async ({ page }) => {
      await page.goto(url);
      await openDropdown(page, 'Stromdichte');
      await fillFields(page, tc.fields);
      await page.locator(`input[onclick="${tc.button}()"]`).click();
      const text = await page.locator(tc.result).innerText();
      await expect(text).toContain(tc.expected);
    });
  }
});