const breakpoints = require('../../../fixtures/screens.json')

describe(`Special:Search`, () => {
  beforeEach(() => {
    cy.visit('/wiki/Special:Search')
  })

  breakpoints.forEach((breakpoint) => {
    it(breakpoint.name, () => {
      cy.viewport(breakpoint.width, breakpoint.height)
      cy.get('#bodyContent').compareSnapshot(breakpoint.name)

      // Search dropdown.
      cy.get('#searchText input').type('Special:Version')
      cy.get('.mw-widget-searchWidget-menu')
        .contains('Special:Version')
        .should('be.visible')

      // Clear text.
      cy.get('.oo-ui-indicator-clear').click()
      cy.get('#searchText input').should('have.text', '')
    })
  })
})
