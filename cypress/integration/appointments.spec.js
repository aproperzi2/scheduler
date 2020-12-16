/* eslint-disable no-undef */
describe("Appointments", () => {

  beforeEach(() => {
    cy.request("GET", "/api/debug/reset")

    cy.visit("/")

    cy.contains("Monday");
  })

  it("Should book an interview", () => {
    cy.get('[alt=Add]')
        .first()
        .click();

    cy.get('[data-testid=student-name-input]').type("Lydia Miller-Jones");

    cy.get(':nth-child(1) > .interviewers__item-image').click()

    cy.get('.button--confirm').click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");

    cy.contains(".appointment__card--show", "Sylvia Palmer")
  })

  it("Should edit an interview", () => {
    cy.get("[alt=edit]")
      .first()
      .click({ force: true });

    cy.get("[data-testid=student-name-input]").clear().type("Luca Properzi")

    cy.get(':nth-child(2) > .interviewers__item-image').click()

    cy.get('.button--confirm').click()

    cy.contains('.appointment__card--show', 'Luca Properzi')
    
    cy.contains('.appointment__card--show', 'Tori Malcolm')
  })

  it("Should cancel an interview", () => {
    cy.get("[alt=delete]")
      .first()
      .click({ force: true });

    cy.contains('Confirm').click()

    cy.contains("DELETING").should("exist")

    cy.contains("DELETING").should("not.exist")

    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist")
  })

});