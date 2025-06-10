// playwright/e2e/Allgemein.Mathe.Kreisberechnung.spec.js
const { test: base, expect } = require('@playwright/test');
const { attachFixture } = require('../fixtures/attachFixture');
const matheInputs = require('../fixtures/matheInputs.json');

const test = base.extend({
  matheInputs: async ({}, use) => {
    await use(matheInputs);
  },
});

test.describe('Mathe.html Kreisberechnung', () => {
  const url = '/Allgemein/Mathe.html';

  test.beforeEach(async ({}, testInfo) => {
    await attachFixture(
      testInfo,
      '../fixtures/matheInputs.json',
      {
        description: `This fixture contains input and expected output values for circle area/radius calculations and reset defaults on Mathe.html.`
      }
    );
  });

  test('should calculate area from radius', async ({ page, matheInputs }) => {
    await page.goto(url);

    await page.locator('#radius').fill(matheInputs.areaFromRadius.radius);
    await page.locator('#radiusUnit').selectOption(matheInputs.areaFromRadius.radiusUnit);
    await page.locator('#areaUnit').selectOption(matheInputs.areaFromRadius.areaUnit);

    await expect(page.locator('#area')).toHaveValue(matheInputs.areaFromRadius.expectedArea);
  });

  test('should calculate radius from area', async ({ page, matheInputs }) => {
    await page.goto(url);

    await page.locator('#area').fill(matheInputs.radiusFromArea.area);
    await page.locator('#areaUnit').selectOption(matheInputs.radiusFromArea.areaUnit);
    await page.locator('#radiusUnit').selectOption(matheInputs.radiusFromArea.radiusUnit);

    await expect(page.locator('#radius')).toHaveValue(matheInputs.radiusFromArea.expectedRadius);
  });

  test('should reset all fields', async ({ page, matheInputs }) => {
    await page.goto(url);

    await page.locator('#radius').fill(matheInputs.areaFromRadius.radius);
    await page.locator('#area').fill(matheInputs.areaFromRadius.expectedArea);
    await page.getByRole('button', { name: /Zurücksetzen/i }).click();

    await expect(page.locator('#radius')).toHaveValue('');
    await expect(page.locator('#area')).toHaveValue('');
    await expect(page.locator('#radiusUnit')).toHaveValue(matheInputs.resetDefaults.radiusUnit);
    await expect(page.locator('#areaUnit')).toHaveValue(matheInputs.resetDefaults.areaUnit);
  });
});