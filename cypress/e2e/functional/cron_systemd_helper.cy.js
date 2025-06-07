describe('Systemd & Cron Helper (fixture-driven)', () => {
  let fixture;

  before(() => {
    cy.fixture('cron_systemd_helperInputs').then((data) => {
      fixture = data;
    });
  });

  beforeEach(() => {
    cy.visit('/HST/cron_systemd_helper.html');
  });

  it('debug fixture', () => {
    cy.fixture('cron_systemd_helperInputs').then((data) => {
      cy.log(JSON.stringify(data));
      expect(data).to.not.be.undefined;
    });
  });

  it('generates correct cron and systemd for daily schedule', () => {
    const data = fixture.daily;
    cy.get('select#recurrence').select(data.recurrence);
    cy.get('select#hourSelect').select(data.hour);
    cy.get('select#minuteSelect').select(data.minute);
    cy.get('#cronText').should('have.text', data.cronText);
    cy.get('#systemdText').should('have.text', data.systemdText);
    cy.get('#desc').should('contain', data.desc);
  });

  it('generates correct cron and systemd for weekly schedule', () => {
    const data = fixture.weekly;
    cy.get('select#recurrence').select(data.recurrence);
    cy.get('select#hourSelect').select(data.hour);
    cy.get('select#minuteSelect').select(data.minute);
    cy.get('#cronText').should('have.text', data.cronText);
    cy.get('#systemdText').should('have.text', data.systemdText);
    cy.get('#desc').should('contain', data.desc);
  });

  it('generates correct cron and systemd for monthly schedule with 1st and last day', () => {
    const data = fixture.monthly;
    cy.get('select#recurrence').select(data.recurrence);
    cy.get('select#hourSelect').select(data.hour);
    cy.get('select#minuteSelect').select(data.minute);
    data.monthdays.forEach((d) => {
      cy.get(`#monthdayGroup input[type="checkbox"][value="${d}"]`).check({ force: true });
    });
    cy.get('#cronText').invoke('text').should('match', /30 3 (1,L|L,1) \* \*/);
    cy.get('#systemdText').should('contain', '1..1 03:30');
    cy.get('#systemdText').should('contain', 'Last 03:30');
    cy.get('#desc').should('contain', data.desc);
  });

  it('generates correct cron and systemd for custom weekdays', () => {
    const data = fixture.customWeekdays;
    cy.get('select#recurrence').select(data.recurrence);
    cy.get('select#hourSelect').select(data.hour);
    cy.get('select#minuteSelect').select(data.minute);
    data.weekdays.forEach((d) => {
      cy.get(`#weekdayGroup input[type="checkbox"][value="${d}"]`).check({ force: true });
    });
    cy.get('#cronText').should('have.text', data.cronText);
    cy.get('#systemdText').should('have.text', data.systemdText);
    cy.get('#desc').should('contain', data.desc);
  });
});