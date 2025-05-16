describe('Elektrotechnik | Transformator.html', () => {
    const url = '/Elektrotechnik/Transformator.html';

    it('should calculate Übersetzungsverhältnis (ue) from I1 and I2', () => {
      cy.visit(url);

      // I1 = 2, I2 = 4 → ue = I2/I1 = 2
      cy.get('#I1').clear().type('2');
      cy.get('#I2').clear().type('4');
      cy.get('input[onclick="calculateParameters()"]').click();

      cy.get('#result').invoke('text').then(text => {
        cy.log('Übersetzungsverhältnis output:', text);
        expect(text).to.include('2.00');
      });
    });

    it('should calculate Spannung U2 from U1 and ue', () => {
      cy.visit(url);

      // U1 = 10, ue = 2 → U2 = U1/ue = 5
      cy.get('#U1').clear().type('10');
      cy.get('#ue').clear().type('2');
      cy.get('input[onclick="calculateParameters()"]').click();

      cy.get('#result').invoke('text').then(text => {
        cy.log('Spannung U2 output:', text);
        expect(text).to.include('5.00V');
      });
    });

    it('should calculate Leistung P2 from P1 and eta', () => {
      cy.visit(url);

      // P1 = 100, eta = 0.8 → P2 = P1 * eta = 80
      cy.get('#P1').clear().type('100');
      cy.get('#eta').clear().type('0.8');
      cy.get('input[onclick="calculateParameters()"]').click();

      cy.get('#result').invoke('text').then(text => {
        cy.log('Leistung P2 output:', text);
        expect(text).to.include('80.00W');
      });
    });

    it('should calculate Windungszahl N2 from N1 and ue', () => {
      cy.visit(url);

      // N1 = 100, ue = 2 → N2 = N1/ue = 50
      cy.get('#N1').clear().type('100');
      cy.get('#ue').clear().type('2');
      cy.get('input[onclick="calculateParameters()"]').click();

      cy.get('#result').invoke('text').then(text => {
        cy.log('Windungszahl N2 output:', text);
        expect(text).to.include('50.00');
      });
    });

    it('should calculate Wirkungsgrad eta from P1 and P2', () => {
        cy.visit(url);

        // P1 = 100, P2 = 80 → eta = P2/P1 = 0.8, formatted as 800.00m
        cy.get('#P1').clear().type('100');
        cy.get('#P2').clear().type('80');
        cy.get('input[onclick="calculateParameters()"]').click();

        cy.get('#result').invoke('text').then(text => {
          cy.log('Wirkungsgrad eta output:', text);
          expect(text).to.include('800.00m');
        });
      });
    it('should not execute or render XSS payloads in any input/result', () => {
      cy.visit(url);

      // XSS payloads to test
      const payloads = [
        '<img src=x onerror=alert(1)>',
        '<svg/onload=alert(1)>',
        '<script>alert(1)</script>'
      ];

      // Try payloads in all relevant input fields
      [
        '#I1', '#I2', '#U1', '#U2', '#ue', '#P1', '#P2', '#eta', '#N1', '#N2'
      ].forEach(selector => {
        payloads.forEach(payload => {
          cy.get(selector).clear().type(payload, { delay: 0 });
        });
      });

      // Trigger calculation
      cy.get('input[onclick="calculateParameters()"]').click();

      // Check the result area for payloads
      cy.get('#result').invoke('html').should((html) => {
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