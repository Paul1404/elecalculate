afterEach(function () {
    cy.screenshot(this.currentTest.title, { capture: 'runner' });
  });