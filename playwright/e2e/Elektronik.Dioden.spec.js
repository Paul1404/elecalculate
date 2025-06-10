// playwright/e2e/Elektronik.Dioden.spec.js
const { test: base, expect } = require('@playwright/test');
const { attachFixture } = require('../fixtures/attachFixture');
const diodenInputs = require('../fixtures/diodenInputs.json');

const test = base.extend({
  diodenInputs: async ({}, use) => {
    await use(diodenInputs);
  },
});

test.describe('Elektronik | Dioden.html', () => {
  const url = '/Elektronik/Dioden.html';

  test('should display the diode table with correct values', async ({ page, diodenInputs }, testInfo) => {
    await page.goto(url);

    await attachFixture(
      testInfo,
      '../fixtures/diodenInputs.json',
      {
        description: `This fixture contains the expected types and voltages for diodes and LEDs.
It is used to verify that the Elektronik/Dioden.html table displays the correct values for each component.`,
      }
    );

    await expect(page.locator('table')).toBeVisible();

    async function expectRow(type, voltage) {
      const row = page
        .locator('table tr')
        .filter({ hasText: type })
        .filter({ hasText: voltage });
      await expect(row, `Row for ${type} ${voltage}`).toHaveCount(1);
      await expect(row).toContainText(type);
      await expect(row).toContainText(voltage);
    }

    for (const diode of diodenInputs.diodes) {
      await expectRow(diode.type, diode.voltage);
    }
    for (const led of diodenInputs.leds) {
      await expectRow(led.type, led.voltage);
    }
  });
});