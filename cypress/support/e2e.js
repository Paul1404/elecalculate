import addContext from 'mochawesome/addContext';

afterEach(function () {
  cy.screenshot(this.currentTest.title, { capture: 'runner' });
});

Cypress.on('test:after:run', (test, runnable) => {
  // Attach screenshot for every test
  const screenshot = `${Cypress.config('screenshotsFolder')}/${Cypress.spec.name}/${test.title}.png`;
  addContext({ test }, screenshot);
});