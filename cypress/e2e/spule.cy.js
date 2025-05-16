describe('Elektrotechnik | Spule.html', () => {
    const url = '/Elektrotechnik/Spule.html';

    it('should calculate Strom I from Phi, N, and L', () => {
      cy.visit(url);

      // Open the Spulen berechnungen dropdown
      cy.contains('.dropdown-header', 'Spulen berechnungen').click();

      // Phi = 0.01, N = 100, L = 2 → I = (Phi * N) / L = (0.01 * 100) / 2 = 0.5A
      cy.get('#Phi').clear().type('0.01');
      cy.get('#N').clear().type('100');
      cy.get('#L').clear().type('2');
      cy.get('input[onclick="calculateInductorParameters()"]').click();

      cy.get('#result').invoke('text').then(text => {
        cy.log('Strom I output:', text);
        expect(text).to.include('500.00mA');
      });
    });

    it('should calculate Induktivität L from ur, N, A, and l', () => {
      cy.visit(url);

      cy.contains('.dropdown-header', 'Spulen berechnungen').click();

      // ur = 1000, N = 100, A = 0.0001, l = 0.05
      // L = (ur * 1.257e-6 * N^2 * A) / l
      // L = (1000 * 1.257e-6 * 10000 * 0.0001) / 0.05 = (1000 * 1.257e-6 * 1 * 0.0001) / 0.05 = (1000 * 1.257e-6 * 1e-4) / 0.05
      // Actually, 100^2 = 10000, so: (1000 * 1.257e-6 * 10000 * 0.0001) / 0.05 = (1000 * 1.257e-6 * 1) / 0.05 = (0.001257) / 0.05 = 0.02514 H = 25.14mH
      cy.get('#ur').clear().type('1000');
      cy.get('#N').clear().type('100');
      cy.get('#A').clear().type('0.0001');
      cy.get('#l').clear().type('0.05');
      cy.get('input[onclick="calculateInductorParameters()"]').click();

      cy.get('#result').invoke('text').then(text => {
        cy.log('Induktivität L output:', text);
        expect(text).to.include('25.14mH');
      });
    });

    it('should calculate Magnetischer Fluss Phi from L, I, and N', () => {
      cy.visit(url);

      cy.contains('.dropdown-header', 'Spulen berechnungen').click();

      // L = 2, I = 0.5, N = 100 → Phi = (L * I) / N = (2 * 0.5) / 100 = 0.01Wb
      cy.get('#L').clear().type('2');
      cy.get('#I').clear().type('0.5');
      cy.get('#N').clear().type('100');
      cy.get('input[onclick="calculateInductorParameters()"]').click();

      cy.get('#result').invoke('text').then(text => {
        cy.log('Magnetischer Fluss Phi output:', text);
        expect(text).to.include('10.00mWb');
      });
    });

    it('should calculate Induzierte Spannung U from Phi, t, and N', () => {
      cy.visit(url);

      cy.contains('.dropdown-header', 'Spulen berechnungen').click();

      // Phi = 0.01, t = 2, N = 100 → U = -(N * Phi) / t = -(100 * 0.01) / 2 = -0.5V
      cy.get('#Phi').clear().type('0.01');
      cy.get('#t').clear().type('2');
      cy.get('#N').clear().type('100');
      cy.get('input[onclick="calculateInductorParameters()"]').click();

      cy.get('#result').invoke('text').then(text => {
        cy.log('Induzierte Spannung U output:', text);
        expect(text).to.match(/-0\.50V|-500\.00mV/);
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

      // Open the Spulen berechnungen dropdown
      cy.contains('.dropdown-header', 'Spulen berechnungen').click();

      // Try payloads in all relevant input fields
      [
        '#Phi', '#N', '#L', '#ur', '#A', '#l', '#I', '#t'
      ].forEach(selector => {
        payloads.forEach(payload => {
          cy.get(selector).clear().type(payload, { delay: 0 });
        });
      });

      // Trigger calculation
      cy.get('input[onclick="calculateInductorParameters()"]').click();

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