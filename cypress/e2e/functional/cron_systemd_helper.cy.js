/// <reference types="cypress" />

describe('Cron & Systemd Timer Helper', () => {
  beforeEach(() => {
    cy.visit('/HST/cron_systemd_helper.html');
  });

  it('loads the page and shows the main UI', () => {
    cy.contains('Cron & Systemd Timer Helper');
    cy.get('select#recurrence').should('exist');
    cy.get('select#hourSelect').should('exist');
    cy.get('select#minuteSelect').should('exist');
    cy.get('#cronOutput').should('exist');
    cy.get('#systemdOutput').should('exist');
  });

  it('generates correct cron and systemd for daily schedule', () => {
    cy.get('select#recurrence').select('Täglich');
    cy.get('select#hourSelect').select('08');
    cy.get('select#minuteSelect').select('00');
    cy.get('#cronText').should('have.text', '0 8 * * *');
    cy.get('#systemdText').should('have.text', '08:00');
    cy.get('#desc').should('contain', 'Jeden Tag um 08:00 Uhr.');
  });

  it('generates correct cron and systemd for weekly schedule', () => {
    cy.get('select#recurrence').select('Wöchentlich (Mo)');
    cy.get('select#hourSelect').select('02');
    cy.get('select#minuteSelect').select('15');
    cy.get('#cronText').should('have.text', '15 2 * * 1');
    cy.get('#systemdText').should('have.text', 'Mon 02:15');
    cy.get('#desc').should('contain', 'Jeden Montag um 02:15 Uhr.');
  });

  it('generates correct cron and systemd for monthly schedule with 1st and last day', () => {
    cy.get('select#recurrence').select('Monatlich');
    cy.get('select#hourSelect').select('03');
    cy.get('select#minuteSelect').select('30');
    // Select 1st and Last day
    cy.get('#monthdayGroup input[type="checkbox"][value="1"]').check({ force: true });
    cy.get('#monthdayGroup input[type="checkbox"][value="L"]').check({ force: true });
    cy.get('#cronText').invoke('text').should('match', /30 3 (1,L|L,1) \* \*/);
    cy.get('#systemdText').should('contain', '1..1 03:30');
    cy.get('#systemdText').should('contain', 'Last 03:30');
    cy.get('#desc').should('contain', 'Am 1., letzten Tag jedes Monats um 03:30 Uhr.');
  });

  it('generates correct cron and systemd for custom weekdays', () => {
    cy.get('select#recurrence').select('Benutzerdefiniert (Wochentage)');
    cy.get('select#hourSelect').select('18');
    cy.get('select#minuteSelect').select('45');
    // Select Mo, Mi, Fr
    cy.get('#weekdayGroup input[type="checkbox"][value="1"]').check({ force: true });
    cy.get('#weekdayGroup input[type="checkbox"][value="3"]').check({ force: true });
    cy.get('#weekdayGroup input[type="checkbox"][value="5"]').check({ force: true });
    cy.get('#cronText').should('have.text', '45 18 * * 1,3,5');
    cy.get('#systemdText').should('have.text', 'Mon,Wed,Fri 18:45');
    cy.get('#desc').should('contain', 'Jeden Mo, Mi, Fr um 18:45 Uhr.');
  });

  it('shows warning for every minute schedule', () => {
    cy.get('select#recurrence').select('Alle X Minuten');
    cy.get('#intervalValue').clear().type('1');
    cy.get('#warn').should('contain', 'Warnung');
    cy.get('#cronText').should('have.text', '*/1 * * * *');
  });

  it('copies cron and systemd to clipboard', () => {
    cy.get('select#recurrence').select('Täglich');
    cy.get('select#hourSelect').select('08');
    cy.get('select#minuteSelect').select('00');
    cy.window().then(win => {
      cy.stub(win.navigator.clipboard, 'writeText').as('writeText').returns(Promise.resolve());
    });
    cy.get('.copy-btn').first().click();
    cy.get('@writeText').should('have.been.calledWith', '0 8 * * *');
    cy.get('.copy-btn').eq(1).click();
    cy.get('@writeText').should('have.been.calledWith', '08:00');
  });
});