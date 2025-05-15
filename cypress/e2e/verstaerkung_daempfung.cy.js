describe('Elektrotechnik | Verstaerkung_Daempfung.html', () => {
    const url = '/Elektrotechnik/Verstaerkung_Daempfung.html';

    it('should calculate Verstärkungsmaß g from I1 and I2', () => {
      cy.visit(url);

      // I1 = 1, I2 = 2 → g = 20 * log10(I2/I1) = 20 * log10(2/1) = 6.02dB
      cy.get('#I1').clear().type('1');
      cy.get('#I2').clear().type('2');
      cy.get('input[onclick="calculateParameters()"]').click();

      cy.get('#result').invoke('text').then(text => {
        cy.log('Verstärkungsmaß g output:', text);
        expect(text).to.include('6.02dB');
      });
    });

    it('should calculate Dämpfungsmaß a from I1 and I2', () => {
      cy.visit(url);

      // I1 = 2, I2 = 1 → a = 20 * log10(I1/I2) = 20 * log10(2/1) = 6.02dB
      cy.get('#I1').clear().type('2');
      cy.get('#I2').clear().type('1');
      cy.get('input[onclick="calculateParameters()"]').click();

      cy.get('#result').invoke('text').then(text => {
        cy.log('Dämpfungsmaß a output:', text);
        expect(text).to.include('6.02dB');
      });
    });

    it('should calculate Verstärkungsfaktor V from I1 and I2', () => {
      cy.visit(url);

      // I1 = 1, I2 = 2 → V = I2/I1 = 2
      cy.get('#I1').clear().type('1');
      cy.get('#I2').clear().type('2');
      cy.get('input[onclick="calculateParameters()"]').click();

      cy.get('#result').invoke('text').then(text => {
        cy.log('Verstärkungsfaktor V output:', text);
        expect(text).to.include('2.00');
      });
    });

    it('should calculate Dämpfungsfaktor D from I1 and I2', () => {
      cy.visit(url);

      // I1 = 2, I2 = 1 → D = I1/I2 = 2
      cy.get('#I1').clear().type('2');
      cy.get('#I2').clear().type('1');
      cy.get('input[onclick="calculateParameters()"]').click();

      cy.get('#result').invoke('text').then(text => {
        cy.log('Dämpfungsfaktor D output:', text);
        expect(text).to.include('2.00');
      });
    });

    it('should calculate Ausgangsstrom I2 from I1 and g', () => {
      cy.visit(url);

      // I1 = 1, g = 6.02 → I2 = I1 * 10^(g/20) = 1 * 10^(6.02/20) ≈ 2
      cy.get('#I1').clear().type('1');
      cy.get('#g').clear().type('6.02');
      cy.get('input[onclick="calculateParameters()"]').click();

      cy.get('#result').invoke('text').then(text => {
        cy.log('Ausgangsstrom I2 output:', text);
        expect(text).to.include('2.00A');
      });
    });

    it('should calculate Ausgangsspannung U2 from U1 and g', () => {
      cy.visit(url);

      // U1 = 1, g = 6.02 → U2 = U1 * 10^(g/20) = 2
      cy.get('#U1').clear().type('1');
      cy.get('#g').clear().type('6.02');
      cy.get('input[onclick="calculateParameters()"]').click();

      cy.get('#result').invoke('text').then(text => {
        cy.log('Ausgangsspannung U2 output:', text);
        expect(text).to.include('2.00V');
      });
    });

    it('should calculate Ausgangsleistung P2 from P1 and g', () => {
      cy.visit(url);

      // P1 = 1, g = 10 → P2 = P1 * 10^(g/10) = 1 * 10^(10/10) = 10
      cy.get('#P1').clear().type('1');
      cy.get('#g').clear().type('10');
      cy.get('input[onclick="calculateParameters()"]').click();

      cy.get('#result').invoke('text').then(text => {
        cy.log('Ausgangsleistung P2 output:', text);
        expect(text).to.include('10.00W');
      });
    });
  });
  