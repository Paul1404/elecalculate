describe('Elektrotechnik | Kondensator.html (value-only)', () => {
  const url = '/Elektrotechnik/Kondensator.html';
  let inputs;

  before(() => {
    cy.fixture('kondensatorInputs').then((data) => {
      inputs = data;
    });
  });

  it('should calculate Kapazität C from Q and U', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Kondensator berechnungen').click();
    cy.get('#Q').clear().type(inputs.kapazitaet.Q);
    cy.get('#U').clear().type(inputs.kapazitaet.U);
    cy.get('input[onclick="calculateCapacitorParameters()"]').click();
    cy.get('#result').invoke('text').should('include', inputs.kapazitaet.expected);
  });

  it('should calculate Spannung U from E and s', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Kondensator berechnungen').click();
    cy.get('#E').clear().type(inputs.spannung.E);
    cy.get('#s').clear().type(inputs.spannung.s);
    cy.get('input[onclick="calculateCapacitorParameters()"]').click();
    cy.get('#result').invoke('text').should('include', inputs.spannung.expected);
  });

  it('should calculate Energie W from C and U', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Kondensator berechnungen').click();
    cy.get('#C').clear().type(inputs.energie.C);
    cy.get('#U').clear().type(inputs.energie.U);
    cy.get('input[onclick="calculateCapacitorParameters()"]').click();
    cy.get('#result').invoke('text').should('include', inputs.energie.expected);
  });

  it('should calculate Zeitkonstante tau for RC-Glied', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'RC-Glied').click();
    cy.get('#R_RC').clear().type(inputs.zeitkonstante.R_RC);
    cy.get('#C_RC').clear().type(inputs.zeitkonstante.C_RC);
    cy.get('input[onclick="calculateRC()"]').click();
    cy.get('#result_RC').invoke('text').should('include', inputs.zeitkonstante.expected);
  });

  it('should calculate Serie AC values', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Kondensator an Wechselstrom').click();
    cy.get('button.img-button span').contains('Serie').click();
    cy.get('#R_AC').clear().type(inputs.ac_serie.R_AC);
    cy.get('#Xc_AC').clear().type(inputs.ac_serie.Xc_AC);
    cy.get('#C_AC').clear().type(inputs.ac_serie.C_AC);
    cy.get('input[onclick="calculateSerieAC()"]').click();
    cy.get('#result_Serie_AC').invoke('text').should('include', inputs.ac_serie.expected);
  });

  it('should calculate Parallel AC Blindleitwert Bc', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Kondensator an Wechselstrom').click();
    cy.get('button.img-button span').contains('Parallel').click();
    cy.get('#U_ACp').clear().type(inputs.ac_parallel_Bc.U_ACp);
    cy.get('#f_ACp').clear().type(inputs.ac_parallel_Bc.f_ACp);
    cy.get('#C_ACp').clear().type(inputs.ac_parallel_Bc.C_ACp);
    cy.get('input[onclick="calculateParallelAC()"]').click();
    cy.get('#result_Parallel_AC').invoke('text').should('include', inputs.ac_parallel_Bc.expected);
  });

  it('should calculate Parallel AC Blindstrom Ic from Ir and phi', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Kondensator an Wechselstrom').click();
    cy.get('button.img-button span').contains('Parallel').click();
    cy.get('#Ir_ACp').clear().type(inputs.ac_parallel_Ir_phi.Ir_ACp);
    cy.get('#phi_ACp').clear().type(inputs.ac_parallel_Ir_phi.phi_ACp);
    cy.get('input[onclick="calculateParallelAC()"]').click();
    cy.get('#result_Parallel_AC').invoke('text').should('include', inputs.ac_parallel_Ir_phi.expected);
  });

  it('should calculate Parallel AC Wirkstrom Ir from I and Ic', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Kondensator an Wechselstrom').click();
    cy.get('button.img-button span').contains('Parallel').click();
    cy.get('#I_ACp').clear().type(inputs.ac_parallel_I_Ic.I_ACp);
    cy.get('#Ic_ACp').clear().type(inputs.ac_parallel_I_Ic.Ic_ACp);
    cy.get('input[onclick="calculateParallelAC()"]').click();
    cy.get('#result_Parallel_AC').invoke('text').should('include', inputs.ac_parallel_I_Ic.expected);
  });
});