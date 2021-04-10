const breakpoints = require('../../../fixtures/screens.json')

describe('Special:UserLogin', () => {
  beforeEach(() => {
    cy.visit('/wiki/Special:UserLogin')
  })

  breakpoints.forEach((breakpoint) => {
    it(breakpoint.name, () => {
      cy.viewport(breakpoint.width, breakpoint.height)
      cy.get('#bodyContent').compareSnapshot(breakpoint.name)
    })
  })

  it('Can login', () => {
    cy.get('[name="wpName"]').type('AdminUser')
    cy.get('[name="wpPassword"]').type('AdminPassword')
    cy.get('[name="wploginattempt"]').click()
    cy.get('.pt-userpage').contains('AdminUser').should('be.visible')
  })
})
