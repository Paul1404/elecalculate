describe('Elektrotechnik | Gleichstrom.html', () => {
  const url = '/Elektrotechnik/Gleichstrom.html';
  let inputs;

  before(() => {
    cy.fixture('gleichstromInputs').then((data) => {
      inputs = data;
    });
  });

  it('should calculate Ohmsches Gesetz (URI)', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Ohmsches Gesetz').click();
    cy.get('#U').clear().type(inputs.ohmschesGesetz.U);
    cy.get('#R').clear().type(inputs.ohmschesGesetz.R);
    cy.get('input[onclick="calculateParametersURI()"]').click();
    cy.get('#result').invoke('text').then(text => {
      cy.log('Ohmsches Gesetz output:', text);
      expect(text).to.include(inputs.ohmschesGesetz.expected.I);
      expect(text).to.include(inputs.ohmschesGesetz.expected.P);
    });
  });

  it('should calculate unbelasteter Spannungsteiler', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Spannungsteiler').click();
    cy.get('#modeSwitch').uncheck({ force: true });
    cy.get('#R1_unb').clear().type(inputs.spannungsteilerUnbelastet.R1);
    cy.get('#R2_unb').clear().type(inputs.spannungsteilerUnbelastet.R2);
    cy.get('#Uin_unb').clear().type(inputs.spannungsteilerUnbelastet.Uin);
    cy.get('input[onclick="calculateParametersUnb_Spannungsteiler()"]').click();
    cy.get('#result_unb').invoke('text').then(text => {
      cy.log('Spannungsteiler unbelastet output:', text);
      expect(text).to.include(inputs.spannungsteilerUnbelastet.expected.Uout);
    });
  });

  it('should calculate belasteter Spannungsteiler', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Spannungsteiler').click();
    cy.get('#modeSwitch').check({ force: true });
    cy.get('#R1_bel').clear().type(inputs.spannungsteilerBelastet.R1);
    cy.get('#R2_bel').clear().type(inputs.spannungsteilerBelastet.R2);
    cy.get('#RL_bel').clear().type(inputs.spannungsteilerBelastet.RL);
    cy.get('#Uin_bel').clear().type(inputs.spannungsteilerBelastet.Uin);
    cy.get('input[onclick="calculateParametersBel_Spannungsteiler()"]').click();
    cy.get('#result_bel').invoke('text').then(text => {
      cy.log('Spannungsteiler belastet output:', text);
      expect(text).to.include(inputs.spannungsteilerBelastet.expected.Uout);
    });
  });

  it('should calculate Serienschaltung', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Serie- und Parallelschaltung').click();
    cy.contains('.opv-button span', 'Serie').click();
    cy.get('#r1').clear().type(inputs.serienschaltung.r1);
    cy.get('#r2').clear().type(inputs.serienschaltung.r2);
    cy.get('input[onclick="calculate(\'serie_schaltung\')"]').click();
    cy.get('#result_S_P').invoke('text').then(text => {
      cy.log('Serienschaltung output:', text);
      expect(text).to.include(inputs.serienschaltung.expected.Rges);
    });
  });

  it('should calculate Parallelschaltung', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Serie- und Parallelschaltung').click();
    cy.contains('.opv-button span', 'Parallel').click();
    cy.get('#r1').clear().type(inputs.parallelschaltung.r1);
    cy.get('#r2').clear().type(inputs.parallelschaltung.r2);
    cy.get('input[onclick="calculate(\'parallel_schaltung\')"]').click();
    cy.get('#result_S_P').invoke('text').then(text => {
      cy.log('Parallelschaltung output:', text);
      expect(text).to.include(inputs.parallelschaltung.expected.Rges);
    });
  });
});