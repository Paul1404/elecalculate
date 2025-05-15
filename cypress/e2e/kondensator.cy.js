describe('Elektrotechnik | Kondensator.html', () => {
    const url = '/Elektrotechnik/Kondensator.html';

    it('should calculate Kapazität C from Q and U', () => {
        cy.visit(url);

        cy.contains('.dropdown-header', 'Kondensator berechnungen').click();

        // Q = 0.001, U = 5 → C = Q/U = 0.0002F = 200.00μF
        cy.get('#Q').clear().type('0.001');
        cy.get('#U').clear().type('5');
        cy.get('input[onclick="calculateCapacitorParameters()"]').click();
      
        cy.get('#result').invoke('text').then(text => {
          cy.log('Kondensator Kapazität output:', text);
          expect(text).to.include('200.00μF');
        });
      });


    it('should calculate Spannung U from E and s', () => {
      cy.visit(url);

      cy.contains('.dropdown-header', 'Kondensator berechnungen').click();

      // E = 1000, s = 0.01 → U = E * s = 10V
      cy.get('#E').clear().type('1000');
      cy.get('#s').clear().type('0.01');
      cy.get('input[onclick="calculateCapacitorParameters()"]').click();

      cy.get('#result').invoke('text').then(text => {
        cy.log('Kondensator Spannung output:', text);
        expect(text).to.include('10.00V');
      });
    });

    it('should calculate Energie W from C and U', () => {
      cy.visit(url);

      cy.contains('.dropdown-header', 'Kondensator berechnungen').click();

      // C = 0.001, U = 10 → W = (U^2 * C) / 2 = (100 * 0.001) / 2 = 0.05J
      cy.get('#C').clear().type('0.001');
      cy.get('#U').clear().type('10');
      cy.get('input[onclick="calculateCapacitorParameters()"]').click();

      cy.get('#result').invoke('text').then(text => {
        cy.log('Kondensator Energie output:', text);
        expect(text).to.include('50.00mJ');
      });
    });

    it('should calculate Zeitkonstante tau for RC-Glied', () => {
      cy.visit(url);

      // Open the RC-Glied dropdown
      cy.contains('.dropdown-header', 'RC-Glied').click();

      // R = 1000, C = 0.001 → tau = R * C = 1s
      cy.get('#R_RC').clear().type('1000');
      cy.get('#C_RC').clear().type('0.001');
      cy.get('input[onclick="calculateRC()"]').click();

      cy.get('#result_RC').invoke('text').then(text => {
        cy.log('RC-Glied Zeitkonstante output:', text);
        expect(text).to.include('1.00s');
      });
    });
  });
