describe('Elektronik | Dioden.html', () => {
    const url = '/Elektronik/Dioden.html';
    let inputs;

    before(() => {
      cy.fixture('diodenInputs').then((data) => {
        inputs = data;
      });
    });

    it('should display the diode table with correct values', () => {
      cy.visit(url);

      // Check the table exists
      cy.get('table').should('exist');

      // Check all diodes
      inputs.diodes.forEach((diode) => {
        cy.get('table').contains('td', diode.type).parent('tr')
          .within(() => {
            cy.contains('td', diode.voltage);
          });
      });

      // Check all LEDs
      inputs.leds.forEach((led) => {
        cy.get('table').contains('td', led.type).parent('tr')
          .within(() => {
            cy.contains('td', led.voltage);
          });
      });
    });
  });