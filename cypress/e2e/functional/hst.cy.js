describe('HST Glossar', () => {
  const url = '/HST/hst.html';
  let inputs;

  before(() => {
    cy.fixture('hstGlossarInputs').then((data) => {
      inputs = data;
    });
  });

  it('should display the glossary table and some known terms', () => {
    cy.visit(url);

    // Check that the table and some terms are present
    cy.contains('table', 'Begriff');
    inputs.knownTerms.forEach(term => {
      cy.contains(term);
    });
  });

  it('should filter glossary entries by search', () => {
    cy.visit(url);

    // Type the search query
    cy.get('#search').clear().type(inputs.search.query);

    // Should show expected terms
    inputs.search.shouldShow.forEach(term => {
      cy.contains(term).should('be.visible');
    });

    // Should not show unexpected terms
    inputs.search.shouldNotShow.forEach(term => {
      cy.contains(term).should('not.be.visible');
    });
  });

  it('should scroll to the correct letter when using alphabet nav', () => {
    cy.visit(url);

    // Click on the specified letter in the alphabet nav
    cy.contains('.alphabet-nav a', inputs.alphabetNav.letter).click({ force: true });

    // The section should exist
    cy.get(`#${inputs.alphabetNav.sectionId}`).should('exist');
    // Optionally, check that the term is present
    cy.contains(inputs.alphabetNav.term).should('exist');
  });
});