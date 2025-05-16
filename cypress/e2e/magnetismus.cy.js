describe('Elektrotechnik | Magnetismus.html', () => {
    const url = '/Elektrotechnik/Magnetismus.html';

    it('should calculate Strom I from Theta and N', () => {
      cy.visit(url);

      // Theta = 10, N = 2 → I = Theta/N = 5A
      cy.get('#Theta').clear().type('10');
      cy.get('#N').clear().type('2');
      cy.get('input[onclick="calculateParameters()"]').click();

      cy.get('#result').invoke('text').then(text => {
        cy.log('Strom I output:', text);
        expect(text).to.include('5.00A');
      });
    });

    it('should calculate Kraft F from B and A', () => {
        cy.visit(url);

        // B = 2, A = 0.01 → F = (B^2 * A) / (2 * 1.257e-6)
        cy.get('#B').clear().type('2');
        cy.get('#A').clear().type('0.01');
        cy.get('input[onclick="calculateParameters()"]').click();

        // F = (2^2 * 0.01) / (2 * 1.257e-6) = (4 * 0.01) / (2.514e-6) = 0.04 / 2.514e-6 ≈ 15908.47N = 15.91kN
        cy.get('#result').invoke('text').then(text => {
          cy.log('Kraft F output:', text);
          expect(text).to.include('15.91kN');
        });
      });
      

    it('should calculate Durchflutung Theta from H and l', () => {
      cy.visit(url);

      // H = 10, l = 2 → Theta = H * l = 20A
      cy.get('#H').clear().type('10');
      cy.get('#l').clear().type('2');
      cy.get('input[onclick="calculateParameters()"]').click();

      cy.get('#result').invoke('text').then(text => {
        cy.log('Durchflutung Theta output:', text);
        expect(text).to.include('20.00A');
      });
    });

    it('should calculate Windungszahl N from Theta and I', () => {
      cy.visit(url);

      // Theta = 10, I = 2 → N = Theta/I = 5
      cy.get('#Theta').clear().type('10');
      cy.get('#I').clear().type('2');
      cy.get('input[onclick="calculateParameters()"]').click();

      cy.get('#result').invoke('text').then(text => {
        cy.log('Windungszahl N output:', text);
        expect(text).to.include('5.00');
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
        '#Theta', '#N', '#B', '#A', '#H', '#l', '#I'
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