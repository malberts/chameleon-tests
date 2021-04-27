/**
 * Tests related to Bootstrap components provided by the BootstrapExamples extension.
 */

const breakpoints = Cypress.env('breakpoints')

describe('Bootstrap: Navbar', () => {
  breakpoints.forEach((breakpoint) => {
    let config = {
      viewportWidth: breakpoint.width,
      viewportHeight: breakpoint.height,
    }
    describe(breakpoint.name, config, () => {
      before(() => {
        cy.visit('/wiki/Special:BootstrapExamples')
        cy.get('#bootstrap-version').should('not.be.empty')
      })

      it('Navbar', () => {
        cy.get('.bs-docs-section:nth-of-type(1)').within((section) => {
          cy.wrap(section).compareSnapshot(`Navbars_${breakpoint.name}`)
        })
      })

      it('Navbar Dropdown', () => {
        cy.get('.bs-docs-section:nth-of-type(1)').within((section) => {
          if (breakpoint.collapsedChameleon) {
            // Search not visible.
            cy.get('[placeholder="Search"]').should('not.be.visible')
            cy.contains('Home').should('not.be.visible')
            // Expand button.
            cy.get('[data-target="#navbarColor01"]')
              .should('be.visible')
              .click()
          } else {
            // Expand button.
            cy.get('[data-target="#navbarColor01"]').should('not.be.visible')
          }

          cy.contains('Home').should('be.visible')

          // Dropdown
          cy.contains('Dropdown').click()
          cy.contains('Action').should('be.visible')
          cy.contains('Dropdown').click()
          cy.contains('Action').should('not.be.visible')

          // Search.
          cy.get('[placeholder="Search"]').should('be.visible')
        })
      })
    })
  })
})
