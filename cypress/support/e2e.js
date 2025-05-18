Cypress.on('uncaught:exception', (err, runnable) => {
    // Check if the error is the slideshow error
    if (err.message.includes('Cannot read properties of undefined (reading \'style\')') &&
        err.stack.includes('showSlides')) {
      // Return false to prevent Cypress from failing the test
      return false;
    }

    // Still ensure other unexpected errors fail the test
    return true;
  });