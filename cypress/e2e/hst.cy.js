describe('HST Glossar', () => {
    const url = '/HST/hst.html';

    it('should display the glossary table and some known terms', () => {
      cy.visit(url);

      // Check that the table and some terms are present
      cy.contains('table', 'Begriff');
      cy.contains('ADC');
      cy.contains('ALU');
      cy.contains('EEPROM');
      cy.contains('SRAM');
    });

    it('should filter glossary entries by search', () => {
      cy.visit(url);

      // Type "ram" in the search field
      cy.get('#search').clear().type('ram');

      // Should show RAM, DRAM, SRAM, but not ADC
      cy.contains('RAM').should('be.visible');
      cy.contains('DRAM').should('be.visible');
      cy.contains('SRAM').should('be.visible');
      cy.contains('ADC').should('not.be.visible');
    });

    it('should scroll to the correct letter when using alphabet nav', () => {
      cy.visit(url);

      // Click on the "S" in the alphabet nav
      cy.contains('.alphabet-nav a', 'S').click({ force: true });

      // The "S" section should be in the DOM (visible is not guaranteed due to scrolling)
      cy.get('#letter-S').should('exist');
      // Optionally, check that the term "SRAM" is present
      cy.contains('SRAM').should('exist');
    });

    it('should not execute or render XSS payloads in the search or table', () => {
      cy.visit(url);

      // XSS payloads to test
      const payloads = [
        '<img src=x onerror=alert(1)>',
        '<svg/onload=alert(1)>',
        '<script>alert(1)</script>'
      ];

      // Try payloads in the search field
      payloads.forEach(payload => {
        cy.get('#search').clear().type(payload, { delay: 0 });
        // The search field should not accept or render the payload as HTML
        cy.get('#search').should('have.value', payload);
      });

      // Check the glossary table for payloads
      cy.get('table').invoke('html').should((html) => {
        payloads.forEach(payload => {
          expect(html).not.to.include(payload);
        });
      });

      // Fail the test if any alert is triggered
      Cypress.on('window:alert', (msg) => {
        throw new Error('Unexpected alert triggered: ' + msg);
      });
    });
  });