const breakpoints = Cypress.env('breakpoints')

describe(`Special:Search`, () => {
  breakpoints.forEach((breakpoint) => {
    describe(breakpoint.name, () => {
      before(() => {
        cy.visit('/wiki/Special:Search')
        cy.get('.smw-entity-examiner').should('not.exist')
        cy.viewport(breakpoint.width, breakpoint.height)
      })

      it('Snapshot', () => {
        cy.get('#bodyContent').compareSnapshot(breakpoint.name)
      })

      it('Search', () => {
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
})
