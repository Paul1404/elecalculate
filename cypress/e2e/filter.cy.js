describe('Elektrotechnik | Filter.html', () => {
    const url = '/Elektrotechnik/Filter.html';

    it('should calculate Blindwiderstand XC for Hochpass RC', () => {
      cy.visit(url);

      // Open Hochpass RC section
      cy.contains('.filter-button span', 'Hochpass RC').click();

      // f = 1000, C = 0.000001 → XC = 1 / (2 * pi * f * C) = 159.15Ω
      cy.get('#f-HP_RC').clear().type('1000');
      cy.get('#C-HP_RC').clear().type('0.000001');
      cy.get('input[onclick="calculate_HP_RC()"]').click();

      cy.get('#result_HP_RC').invoke('text').then(text => {
        cy.log('Hochpass RC XC output:', text);
        expect(text).to.include('159.15Ω');
      });
    });

    it('should calculate Blindwiderstand XL for Hochpass RL', () => {
      cy.visit(url);

      // Open Hochpass RL section
      cy.contains('.filter-button span', 'Hochpass RL').click();

      // f = 1000, L = 0.01 → XL = 2 * pi * f * L = 62.83Ω
      cy.get('#f-HP_RL').clear().type('1000');
      cy.get('#L-HP_RL').clear().type('0.01');
      cy.get('input[onclick="calculate_HP_RL()"]').click();

      cy.get('#result_HP_RL').invoke('text').then(text => {
        cy.log('Hochpass RL XL output:', text);
        expect(text).to.include('62.83Ω');
      });
    });

    it('should calculate Blindwiderstand XC for Tiefpass RC', () => {
      cy.visit(url);

      // Open Tiefpass RC section
      cy.contains('.filter-button span', 'Tiefpass RC').click();

      // f = 1000, C = 0.000001 → XC = 1 / (2 * pi * f * C) = 159.15Ω
      cy.get('#f-TP_RC').clear().type('1000');
      cy.get('#C-TP_RC').clear().type('0.000001');
      cy.get('input[onclick="calculate_TP_RC()"]').click();

      cy.get('#result_TP_RC').invoke('text').then(text => {
        cy.log('Tiefpass RC XC output:', text);
        expect(text).to.include('159.15Ω');
      });
    });

    it('should calculate Blindwiderstand XL for Tiefpass RL', () => {
      cy.visit(url);

      // Open Tiefpass RL section
      cy.contains('.filter-button span', 'Tiefpass RL').click();

      // f = 1000, L = 0.01 → XL = 2 * pi * f * L = 62.83Ω
      cy.get('#f-TP_RL').clear().type('1000');
      cy.get('#L-TP_RL').clear().type('0.01');
      cy.get('input[onclick="calculate_TP_RL()"]').click();

      cy.get('#result_TP_RL').invoke('text').then(text => {
        cy.log('Tiefpass RL XL output:', text);
        expect(text).to.include('62.83Ω');
      });
    });

    it('should calculate Grenzfrequenz for Hochpass RC', () => {
      cy.visit(url);

      cy.contains('.filter-button span', 'Hochpass RC').click();

      // R = 1000, C = 0.000001 → fg = 1 / (2 * pi * R * C) = 159.15Hz
      cy.get('#R-HP_RC').clear().type('1000');
      cy.get('#C-HP_RC').clear().type('0.000001');
      cy.get('input[onclick="calculate_HP_RC()"]').click();

      cy.get('#result_HP_RC').invoke('text').then(text => {
        cy.log('Hochpass RC Grenzfrequenz output:', text);
        expect(text).to.include('159.15Hz');
      });
    });

    it('should calculate Grenzfrequenz for Tiefpass RC', () => {
      cy.visit(url);

      cy.contains('.filter-button span', 'Tiefpass RC').click();

      // R = 1000, C = 0.000001 → fg = 1 / (2 * pi * R * C) = 159.15Hz
      cy.get('#R-TP_RC').clear().type('1000');
      cy.get('#C-TP_RC').clear().type('0.000001');
      cy.get('input[onclick="calculate_TP_RC()"]').click();

      cy.get('#result_TP_RC').invoke('text').then(text => {
        cy.log('Tiefpass RC Grenzfrequenz output:', text);
        expect(text).to.include('159.15Hz');
      });
    });
  });
  