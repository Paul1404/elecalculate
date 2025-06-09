describe('Allgemein | Werkstoffe.html', () => {
  const url = '/Allgemein/Werkstoffe.html';
  let inputs;

  before(() => {
    cy.fixture('werkstoffeInputs').then((data) => {
      inputs = data;
    });
  });

  // --- Spezifischer Widerstand Section ---
  it('should calculate Leitfähigkeit from spezifischer Widerstand', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Spezifischer Widerstand').click();
    cy.get('#p').clear().type(inputs.spezifischerWiderstand[0].fields.p);
    cy.get('input[onclick="calculateLeitfaehigkeit()"]').click();
    cy.get('#result_Leiter').invoke('text').should('include', inputs.spezifischerWiderstand[0].expected);
  });

  it('should calculate Leitfähigkeit from l, R, A', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Spezifischer Widerstand').click();
    cy.get('#l').clear().type(inputs.spezifischerWiderstand[1].fields.l);
    cy.get('#R').clear().type(inputs.spezifischerWiderstand[1].fields.R);
    cy.get('#A').clear().type(inputs.spezifischerWiderstand[1].fields.A);
    cy.get('input[onclick="calculateLeitfaehigkeit()"]').click();
    cy.get('#result_Leiter').invoke('text').should('include', inputs.spezifischerWiderstand[1].expected);
  });

  it('should calculate Leitfähigkeit from d, l, R', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Spezifischer Widerstand').click();
    cy.get('#d').clear().type(inputs.spezifischerWiderstand[2].fields.d);
    cy.get('#l').clear().type(inputs.spezifischerWiderstand[2].fields.l);
    cy.get('#R').clear().type(inputs.spezifischerWiderstand[2].fields.R);
    cy.get('input[onclick="calculateLeitfaehigkeit()"]').click();
    cy.get('#result_Leiter').invoke('text').should('include', inputs.spezifischerWiderstand[2].expected);
  });

  it('should calculate Widerstand from l, x, A', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Spezifischer Widerstand').click();
    cy.get('#l').clear().type(inputs.spezifischerWiderstand[3].fields.l);
    cy.get('#x').clear().type(inputs.spezifischerWiderstand[3].fields.x);
    cy.get('#A').clear().type(inputs.spezifischerWiderstand[3].fields.A);
    cy.get('input[onclick="calculateLeitfaehigkeit()"]').click();
    cy.get('#result_Leiter').invoke('text').should('include', inputs.spezifischerWiderstand[3].expected);
  });

  it('should calculate Widerstand from l, x, d', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Spezifischer Widerstand').click();
    cy.get('#l').clear().type(inputs.spezifischerWiderstand[4].fields.l);
    cy.get('#x').clear().type(inputs.spezifischerWiderstand[4].fields.x);
    cy.get('#d').clear().type(inputs.spezifischerWiderstand[4].fields.d);
    cy.get('input[onclick="calculateLeitfaehigkeit()"]').click();
    cy.get('#result_Leiter').invoke('text').should('include', inputs.spezifischerWiderstand[4].expected);
  });

  it('should calculate Widerstand from l, p, A', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Spezifischer Widerstand').click();
    cy.get('#l').clear().type(inputs.spezifischerWiderstand[5].fields.l);
    cy.get('#p').clear().type(inputs.spezifischerWiderstand[5].fields.p);
    cy.get('#A').clear().type(inputs.spezifischerWiderstand[5].fields.A);
    cy.get('input[onclick="calculateLeitfaehigkeit()"]').click();
    cy.get('#result_Leiter').invoke('text').should('include', inputs.spezifischerWiderstand[5].expected);
  });

  it('should calculate Widerstand from l, p, d', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Spezifischer Widerstand').click();
    cy.get('#l').clear().type(inputs.spezifischerWiderstand[6].fields.l);
    cy.get('#p').clear().type(inputs.spezifischerWiderstand[6].fields.p);
    cy.get('#d').clear().type(inputs.spezifischerWiderstand[6].fields.d);
    cy.get('input[onclick="calculateLeitfaehigkeit()"]').click();
    cy.get('#result_Leiter').invoke('text').should('include', inputs.spezifischerWiderstand[6].expected);
  });

  it('should calculate Spezifischer Widerstand from x', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Spezifischer Widerstand').click();
    cy.get('#x').clear().type(inputs.spezifischerWiderstand[7].fields.x);
    cy.get('input[onclick="calculateLeitfaehigkeit()"]').click();
    cy.get('#result_Leiter').invoke('text').should('include', inputs.spezifischerWiderstand[7].expected);
  });

  it('should calculate Spezifischer Widerstand from R, A, l', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Spezifischer Widerstand').click();
    cy.get('#R').clear().type(inputs.spezifischerWiderstand[8].fields.R);
    cy.get('#A').clear().type(inputs.spezifischerWiderstand[8].fields.A);
    cy.get('#l').clear().type(inputs.spezifischerWiderstand[8].fields.l);
    cy.get('input[onclick="calculateLeitfaehigkeit()"]').click();
    cy.get('#result_Leiter').invoke('text').should('include', inputs.spezifischerWiderstand[8].expected);
  });

  it('should calculate Spezifischer Widerstand from R, d, l', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Spezifischer Widerstand').click();
    cy.get('#R').clear().type(inputs.spezifischerWiderstand[9].fields.R);
    cy.get('#d').clear().type(inputs.spezifischerWiderstand[9].fields.d);
    cy.get('#l').clear().type(inputs.spezifischerWiderstand[9].fields.l);
    cy.get('input[onclick="calculateLeitfaehigkeit()"]').click();
    cy.get('#result_Leiter').invoke('text').should('include', inputs.spezifischerWiderstand[9].expected);
  });

  it('should calculate Fläche from d', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Spezifischer Widerstand').click();
    cy.get('#d').clear().type(inputs.spezifischerWiderstand[10].fields.d);
    cy.get('input[onclick="calculateLeitfaehigkeit()"]').click();
    cy.get('#result_Leiter').invoke('text').should('include', inputs.spezifischerWiderstand[10].expected);
  });

  it('should calculate Fläche from x, l, R', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Spezifischer Widerstand').click();
    cy.get('#x').clear().type(inputs.spezifischerWiderstand[11].fields.x);
    cy.get('#l').clear().type(inputs.spezifischerWiderstand[11].fields.l);
    cy.get('#R').clear().type(inputs.spezifischerWiderstand[11].fields.R);
    cy.get('input[onclick="calculateLeitfaehigkeit()"]').click();
    cy.get('#result_Leiter').invoke('text').should('include', inputs.spezifischerWiderstand[11].expected);
  });

  it('should calculate Fläche from p, l, R', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Spezifischer Widerstand').click();
    cy.get('#p').clear().type(inputs.spezifischerWiderstand[12].fields.p);
    cy.get('#l').clear().type(inputs.spezifischerWiderstand[12].fields.l);
    cy.get('#R').clear().type(inputs.spezifischerWiderstand[12].fields.R);
    cy.get('input[onclick="calculateLeitfaehigkeit()"]').click();
    cy.get('#result_Leiter').invoke('text').should('include', inputs.spezifischerWiderstand[12].expected);
  });

  it('should calculate Leiterlänge from A, R, p', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Spezifischer Widerstand').click();
    cy.get('#A').clear().type(inputs.spezifischerWiderstand[13].fields.A);
    cy.get('#R').clear().type(inputs.spezifischerWiderstand[13].fields.R);
    cy.get('#p').clear().type(inputs.spezifischerWiderstand[13].fields.p);
    cy.get('input[onclick="calculateLeitfaehigkeit()"]').click();
    cy.get('#result_Leiter').invoke('text').should('include', inputs.spezifischerWiderstand[13].expected);
  });

  it('should calculate Leiterlänge from d, R, p', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Spezifischer Widerstand').click();
    cy.get('#d').clear().type(inputs.spezifischerWiderstand[14].fields.d);
    cy.get('#R').clear().type(inputs.spezifischerWiderstand[14].fields.R);
    cy.get('#p').clear().type(inputs.spezifischerWiderstand[14].fields.p);
    cy.get('input[onclick="calculateLeitfaehigkeit()"]').click();
    cy.get('#result_Leiter').invoke('text').should('include', inputs.spezifischerWiderstand[14].expected);
  });

  it('should calculate Leiterlänge from x, R, A', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Spezifischer Widerstand').click();
    cy.get('#x').clear().type(inputs.spezifischerWiderstand[15].fields.x);
    cy.get('#R').clear().type(inputs.spezifischerWiderstand[15].fields.R);
    cy.get('#A').clear().type(inputs.spezifischerWiderstand[15].fields.A);
    cy.get('input[onclick="calculateLeitfaehigkeit()"]').click();
    cy.get('#result_Leiter').invoke('text').should('include', inputs.spezifischerWiderstand[15].expected);
  });

  // --- Temperaturabhängigkeit Section ---
  it('should calculate Warmwiderstand from R20, alpha, T', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Temperaturabhängigkeit Widerstände').click();
    cy.get('#R20').clear().type(inputs.temperaturabhaengigkeit[0].fields.R20);
    cy.get('#alpha').clear().type(inputs.temperaturabhaengigkeit[0].fields.alpha);
    cy.get('#T').clear().type(inputs.temperaturabhaengigkeit[0].fields.T);
    cy.get('input[onclick="calculateTemperaturwiderstand()"]').click();
    cy.get('#result_Temp').invoke('text').should('include', inputs.temperaturabhaengigkeit[0].expected);
  });

  it('should calculate Warmwert Tw from Rw, R, alpha, Tk', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Temperaturabhängigkeit Widerstände').click();
    cy.get('#Rw').clear().type(inputs.temperaturabhaengigkeit[1].fields.Rw);
    cy.get('#R20').clear().type(inputs.temperaturabhaengigkeit[1].fields.R20);
    cy.get('#alpha').clear().type(inputs.temperaturabhaengigkeit[1].fields.alpha);
    cy.get('#Tk').clear().type(inputs.temperaturabhaengigkeit[1].fields.Tk);
    cy.get('input[onclick="calculateTemperaturwiderstand()"]').click();
    cy.get('#result_Temp').invoke('text').should('include', inputs.temperaturabhaengigkeit[1].expected);
  });

  // --- Stromdichte Section ---
  it('should calculate Querschnittsfläche from I, J', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Stromdichte').click();
    cy.get('#I_J').clear().type(inputs.stromdichte[0].fields.I_J);
    cy.get('#J').clear().type(inputs.stromdichte[0].fields.J);
    cy.get('input[onclick="calculateStromdichte()"]').click();
    cy.get('#result_Stromd').invoke('text').should('include', inputs.stromdichte[0].expected);
  });

  it('should calculate Querschnittsfläche from I, J (area)', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Stromdichte').click();
    cy.get('#I_J').clear().type(inputs.stromdichte[1].fields.I_J);
    cy.get('#J').clear().type(inputs.stromdichte[1].fields.J);
    cy.get('input[onclick="calculateStromdichte()"]').click();
    cy.get('#result_Stromd').invoke('text').should('include', inputs.stromdichte[1].expected);
  });

  it('should calculate Durchmesser from I, J', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Stromdichte').click();
    cy.get('#I_J').clear().type(inputs.stromdichte[2].fields.I_J);
    cy.get('#J').clear().type(inputs.stromdichte[2].fields.J);
    cy.get('input[onclick="calculateStromdichte()"]').click();
    cy.get('#result_Stromd').invoke('text').should('include', inputs.stromdichte[2].expected);
  });
});