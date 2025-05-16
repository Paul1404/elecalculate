describe('Elektrotechnik | Schwingkreis.html', () => {
    const url = '/Elektrotechnik/Schwingkreis.html';

    it('should calculate Blindwiderstand XL for Serienschwingkreis', () => {
      cy.visit(url);

      // Open Serienschwingkreis section
      cy.contains('.filter-button span', 'Serie Schwingkreis').click();

      // f = 1000, L = 0.01 → XL = 2 * pi * f * L = 2 * pi * 1000 * 0.01 = 62.83Ω
      cy.get('#f-serie').clear().type('1000');
      cy.get('#L-serie').clear().type('0.01');
      cy.get('input[onclick="calculateSerie()"]').click();

      cy.get('#result').invoke('text').then(text => {
        cy.log('Serienschwingkreis XL output:', text);
        expect(text).to.include('62.83Ω');
      });
    });

    it('should calculate Blindwiderstand XC for Serienschwingkreis', () => {
      cy.visit(url);

      cy.contains('.filter-button span', 'Serie Schwingkreis').click();

      // f = 1000, C = 0.000001 → XC = 1 / (2 * pi * f * C) = 1 / (2 * pi * 1000 * 0.000001) = 159.15Ω
      cy.get('#f-serie').clear().type('1000');
      cy.get('#C-serie').clear().type('0.000001');
      cy.get('input[onclick="calculateSerie()"]').click();

      cy.get('#result').invoke('text').then(text => {
        cy.log('Serienschwingkreis XC output:', text);
        expect(text).to.include('159.15Ω');
      });
    });

    it('should calculate Resonanzfrequenz for Serienschwingkreis', () => {
      cy.visit(url);

      cy.contains('.filter-button span', 'Serie Schwingkreis').click();

      // L = 0.01, C = 0.000001 → f = 1 / (2 * pi * sqrt(L * C)) = 1 / (2 * pi * sqrt(0.01 * 0.000001)) = 1591.55Hz
      cy.get('#L-serie').clear().type('0.01');
      cy.get('#C-serie').clear().type('0.000001');
      cy.get('input[onclick="calculateSerie()"]').click();

      cy.get('#result').invoke('text').then(text => {
        cy.log('Serienschwingkreis Resonanzfrequenz output:', text);
        expect(text).to.match(/1591\.55Hz|1\.59kHz/);
      });
    });

    it('should calculate Blindwiderstand XL for Parallelschwingkreis', () => {
      cy.visit(url);

      // Open Parallelschwingkreis section
      cy.contains('.filter-button span', 'Parallel Schwingkreis').click();

      // f = 1000, L = 0.01 → XL = 2 * pi * f * L = 62.83Ω
      cy.get('#f-parallel').clear().type('1000');
      cy.get('#L-parallel').clear().type('0.01');
      cy.get('input[onclick="calculateParallel()"]').click();

      cy.get('#result_parallel').invoke('text').then(text => {
        cy.log('Parallelschwingkreis XL output:', text);
        expect(text).to.include('62.83Ω');
      });
    });

    it('should calculate Blindwiderstand XC for Parallelschwingkreis', () => {
      cy.visit(url);

      cy.contains('.filter-button span', 'Parallel Schwingkreis').click();

      // f = 1000, C = 0.000001 → XC = 1 / (2 * pi * f * C) = 159.15Ω
      cy.get('#f-parallel').clear().type('1000');
      cy.get('#C-parallel').clear().type('0.000001');
      cy.get('input[onclick="calculateParallel()"]').click();

      cy.get('#result_parallel').invoke('text').then(text => {
        cy.log('Parallelschwingkreis XC output:', text);
        expect(text).to.include('159.15Ω');
      });
    });

    it('should calculate Resonanzfrequenz for Parallelschwingkreis', () => {
      cy.visit(url);

      cy.contains('.filter-button span', 'Parallel Schwingkreis').click();

      // L = 0.01, C = 0.000001 → f = 1 / (2 * pi * sqrt(L * C)) = 1591.55Hz
      cy.get('#L-parallel').clear().type('0.01');
      cy.get('#C-parallel').clear().type('0.000001');
      cy.get('input[onclick="calculateParallel()"]').click();

      cy.get('#result_parallel').invoke('text').then(text => {
        cy.log('Parallelschwingkreis Resonanzfrequenz output:', text);
        expect(text).to.match(/1591\.55Hz|1\.59kHz/);
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

      // Serienschwingkreis
      cy.contains('.filter-button span', 'Serie Schwingkreis').click();
      [
        '#f-serie', '#L-serie', '#C-serie'
      ].forEach(selector => {
        payloads.forEach(payload => {
          cy.get(selector).clear().type(payload, { delay: 0 });
        });
      });
      cy.get('input[onclick="calculateSerie()"]').click();

      // Parallelschwingkreis
      cy.contains('.filter-button span', 'Parallel Schwingkreis').click();
      [
        '#f-parallel', '#L-parallel', '#C-parallel'
      ].forEach(selector => {
        payloads.forEach(payload => {
          cy.get(selector).clear().type(payload, { delay: 0 });
        });
      });
      cy.get('input[onclick="calculateParallel()"]').click();

      // Check all result areas for payloads
      [
        '#result',
        '#result_parallel'
      ].forEach(selector => {
        cy.get(selector).invoke('html').should((html) => {
          payloads.forEach(payload => {
            expect(html).not.to.include(payload);
          });
        });
      });

      // Fail the test if any alert is triggered
      Cypress.on('window:alert', (msg) => {
        throw new Error('Unexpected alert triggered: ' + msg);
      });
    });
  });