describe('Elektrotechnik | Verstaerkung_Daempfung.html', () => {
  const url = '/Elektrotechnik/Verstaerkung_Daempfung.html';
  let inputs;

  before(() => {
    cy.fixture('verstaerkung_daempfungInputs').then((data) => {
      inputs = data;
    });
  });

  it('should calculate Verstärkungsmaß g from I1 and I2', () => {
    cy.visit(url);
    cy.get('#I1').clear().type(inputs.verstaerkungsMassG.I1);
    cy.get('#I2').clear().type(inputs.verstaerkungsMassG.I2);
    cy.get('input[onclick="calculateParameters()"]').click();
    cy.get('#result').invoke('text').then(text => {
      cy.log('Verstärkungsmaß g output:', text);
      expect(text).to.include(inputs.verstaerkungsMassG.expected);
    });
  });

  it('should calculate Dämpfungsmaß a from I1 and I2', () => {
    cy.visit(url);
    cy.get('#I1').clear().type(inputs.daempfungsMassA.I1);
    cy.get('#I2').clear().type(inputs.daempfungsMassA.I2);
    cy.get('input[onclick="calculateParameters()"]').click();
    cy.get('#result').invoke('text').then(text => {
      cy.log('Dämpfungsmaß a output:', text);
      expect(text).to.include(inputs.daempfungsMassA.expected);
    });
  });

  it('should calculate Verstärkungsfaktor V from I1 and I2', () => {
    cy.visit(url);
    cy.get('#I1').clear().type(inputs.verstaerkungsFaktorV.I1);
    cy.get('#I2').clear().type(inputs.verstaerkungsFaktorV.I2);
    cy.get('input[onclick="calculateParameters()"]').click();
    cy.get('#result').invoke('text').then(text => {
      cy.log('Verstärkungsfaktor V output:', text);
      expect(text).to.include(inputs.verstaerkungsFaktorV.expected);
    });
  });

  it('should calculate Dämpfungsfaktor D from I1 and I2', () => {
    cy.visit(url);
    cy.get('#I1').clear().type(inputs.daempfungsFaktorD.I1);
    cy.get('#I2').clear().type(inputs.daempfungsFaktorD.I2);
    cy.get('input[onclick="calculateParameters()"]').click();
    cy.get('#result').invoke('text').then(text => {
      cy.log('Dämpfungsfaktor D output:', text);
      expect(text).to.include(inputs.daempfungsFaktorD.expected);
    });
  });

  it('should calculate Ausgangsstrom I2 from I1 and g', () => {
    cy.visit(url);
    cy.get('#I1').clear().type(inputs.ausgangsstromI2.I1);
    cy.get('#g').clear().type(inputs.ausgangsstromI2.g);
    cy.get('input[onclick="calculateParameters()"]').click();
    cy.get('#result').invoke('text').then(text => {
      cy.log('Ausgangsstrom I2 output:', text);
      expect(text).to.include(inputs.ausgangsstromI2.expected);
    });
  });

  it('should calculate Ausgangsspannung U2 from U1 and g', () => {
    cy.visit(url);
    cy.get('#U1').clear().type(inputs.ausgangsspannungU2.U1);
    cy.get('#g').clear().type(inputs.ausgangsspannungU2.g);
    cy.get('input[onclick="calculateParameters()"]').click();
    cy.get('#result').invoke('text').then(text => {
      cy.log('Ausgangsspannung U2 output:', text);
      expect(text).to.include(inputs.ausgangsspannungU2.expected);
    });
  });

  it('should calculate Ausgangsleistung P2 from P1 and g', () => {
    cy.visit(url);
    cy.get('#P1').clear().type(inputs.ausgangsleistungP2.P1);
    cy.get('#g').clear().type(inputs.ausgangsleistungP2.g);
    cy.get('input[onclick="calculateParameters()"]').click();
    cy.get('#result').invoke('text').then(text => {
      cy.log('Ausgangsleistung P2 output:', text);
      expect(text).to.include(inputs.ausgangsleistungP2.expected);
    });
  });
});