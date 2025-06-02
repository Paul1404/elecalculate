import addContext from 'mochawesome/addContext';

afterEach(function () {
  cy.screenshot(this.currentTest.title, { capture: 'runner' });
});

Cypress.on('test:after:run', (test, runnable) => {
    // The screenshot name must match what you use in cy.screenshot()
    const screenshotFileName = `${test.title}.png`;
    const specFileName = Cypress.spec.name;
    // This is the path relative to the HTML report in /public
    const relativePath = `screenshots/${specFileName}/${screenshotFileName}`;
    addContext({ test }, relativePath);
  });