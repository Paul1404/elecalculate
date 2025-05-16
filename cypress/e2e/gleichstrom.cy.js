describe('Elektrotechnik | Gleichstrom.html', () => {
    const url = '/Elektrotechnik/Gleichstrom.html';

    it('should calculate Ohmsches Gesetz (URI)', () => {
      cy.visit(url);

      // Open the dropdown
      cy.contains('.dropdown-header', 'Ohmsches Gesetz').click();

      // Example: U = 10, R = 2
      cy.get('#U').clear().type('10');
      cy.get('#R').clear().type('2');
      cy.get('input[onclick="calculateParametersURI()"]').click();

      // I = U/R = 5A, P = U^2/R = 100/2 = 50W
      cy.get('#result').invoke('text').then(text => {
        cy.log('Ohmsches Gesetz output:', text);
        expect(text).to.include('5.00A');
        expect(text).to.include('50.00W');
      });
    });

    it('should calculate unbelasteter Spannungsteiler', () => {
      cy.visit(url);

      cy.contains('.dropdown-header', 'Spannungsteiler').click();

      // Ensure "unbelastet" mode is selected
      cy.get('#modeSwitch').uncheck({ force: true });
      cy.get('#R1_unb').clear().type('1000');
      cy.get('#R2_unb').clear().type('1000');
      cy.get('#Uin_unb').clear().type('10');
      cy.get('input[onclick="calculateParametersUnb_Spannungsteiler()"]').click();

      // Uout = Uin * R2 / (R1 + R2) = 10 * 1000 / 2000 = 5V
      cy.get('#result_unb').invoke('text').then(text => {
        cy.log('Spannungsteiler unbelastet output:', text);
        expect(text).to.include('5.00V');
      });
    });

    it('should calculate belasteter Spannungsteiler', () => {
      cy.visit(url);

      cy.contains('.dropdown-header', 'Spannungsteiler').click();

      // Switch to "belastet" mode
      cy.get('#modeSwitch').check({ force: true });
      cy.get('#R1_bel').clear().type('1000');
      cy.get('#R2_bel').clear().type('1000');
      cy.get('#RL_bel').clear().type('1000');
      cy.get('#Uin_bel').clear().type('10');
      cy.get('input[onclick="calculateParametersBel_Spannungsteiler()"]').click();

      // Uout = Uin * (R2*RL)/(R2+RL) / (R1 + (R2*RL)/(R2+RL))
      // (R2*RL)/(R2+RL) = 1000*1000/2000 = 500
      // Uout = 10 * 500 / (1000 + 500) = 10 * 500 / 1500 = 3.33V
      cy.get('#result_bel').invoke('text').then(text => {
        cy.log('Spannungsteiler belastet output:', text);
        expect(text).to.include('3.33V');
      });
    });

    it('should calculate Serienschaltung', () => {
      cy.visit(url);

      cy.contains('.dropdown-header', 'Serie- und Parallelschaltung').click();

      // Click "Serie" button
      cy.contains('.opv-button span', 'Serie').click();

      cy.get('#r1').clear().type('100');
      cy.get('#r2').clear().type('200');
      cy.get('input[onclick="calculate(\'serie_schaltung\')"]').click();

      // Rges = r1 + r2 = 300 Ohm
      cy.get('#result_S_P').invoke('text').then(text => {
        cy.log('Serienschaltung output:', text);
        expect(text).to.include('300.00Ω');
      });
    });

    it('should calculate Parallelschaltung', () => {
      cy.visit(url);

      cy.contains('.dropdown-header', 'Serie- und Parallelschaltung').click();

      // Click "Parallel" button
      cy.contains('.opv-button span', 'Parallel').click();

      cy.get('#r1').clear().type('100');
      cy.get('#r2').clear().type('200');
      cy.get('input[onclick="calculate(\'parallel_schaltung\')"]').click();

      // Rges = 1/(1/100 + 1/200) = 66.67 Ohm
      cy.get('#result_S_P').invoke('text').then(text => {
        cy.log('Parallelschaltung output:', text);
        expect(text).to.include('66.67Ω');
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

      // 1. Ohmsches Gesetz
      cy.contains('.dropdown-header', 'Ohmsches Gesetz').click();
      ['#U', '#R'].forEach(selector => {
        payloads.forEach(payload => {
          cy.get(selector).clear().type(payload, { delay: 0 });
        });
      });
      cy.get('input[onclick="calculateParametersURI()"]').click();

      // 2. Spannungsteiler unbelastet
      cy.contains('.dropdown-header', 'Spannungsteiler').click();
      cy.get('#modeSwitch').uncheck({ force: true });
      ['#R1_unb', '#R2_unb', '#Uin_unb'].forEach(selector => {
        payloads.forEach(payload => {
          cy.get(selector).clear().type(payload, { delay: 0 });
        });
      });
      cy.get('input[onclick="calculateParametersUnb_Spannungsteiler()"]').click();

      // 3. Spannungsteiler belastet
      cy.get('#modeSwitch').check({ force: true });
      ['#R1_bel', '#R2_bel', '#RL_bel', '#Uin_bel'].forEach(selector => {
        payloads.forEach(payload => {
          cy.get(selector).clear().type(payload, { delay: 0 });
        });
      });
      cy.get('input[onclick="calculateParametersBel_Spannungsteiler()"]').click();

      // 4. Serie- und Parallelschaltung
      cy.contains('.dropdown-header', 'Serie- und Parallelschaltung').click();
      // Serie
      cy.contains('.opv-button span', 'Serie').click();
      ['#r1', '#r2'].forEach(selector => {
        payloads.forEach(payload => {
          cy.get(selector).clear().type(payload, { delay: 0 });
        });
      });
      cy.get('input[onclick="calculate(\'serie_schaltung\')"]').click();
      // Parallel
      cy.contains('.opv-button span', 'Parallel').click();
      ['#r1', '#r2'].forEach(selector => {
        payloads.forEach(payload => {
          cy.get(selector).clear().type(payload, { delay: 0 });
        });
      });
      cy.get('input[onclick="calculate(\'parallel_schaltung\')"]').click();

      // Check all result areas for payloads
      [
        '#result',
        '#result_unb',
        '#result_bel',
        '#result_S_P'
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