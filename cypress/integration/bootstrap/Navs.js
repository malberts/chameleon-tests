/**
 * Tests related to Bootstrap components provided by the BootstrapExamples extension.
 */

const breakpoints = Cypress.env('breakpoints')

describe('Bootstrap: Navs', () => {
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

      it('Navs', () => {
        cy.get('.bs-docs-section:nth-of-type(6)').within((section) => {
          cy.wrap(section).compareSnapshot(`Navs_${breakpoint.name}`)
        })
      })

      it('Navs Dropdown', () => {
        cy.get('.bs-docs-section:nth-of-type(6)').within((section) => {
          // Tabs
          cy.get('.nav-tabs').within(() => {
            cy.get('[data-toggle="dropdown"]').click()
            cy.get('.dropdown-menu')
              .should('be.visible')
              .contains('Action')
              .should('be.visible')

            cy.get('[data-toggle="dropdown"]').click()
            cy.get('.dropdown-menu')
              .should('not.be.visible')
              .contains('Action')
              .should('not.be.visible')
          })

          // Pills - horizontal
          cy.get('.nav-pills:not(.flex-column)').within(() => {
            cy.get('[data-toggle="dropdown"]').click()
            cy.get('.dropdown-menu')
              .should('be.visible')
              .contains('Action')
              .should('be.visible')

            cy.get('[data-toggle="dropdown"]').click()
            cy.get('.dropdown-menu')
              .should('not.be.visible')
              .contains('Action')
              .should('not.be.visible')
          })

          // Pills - vertical
          cy.get('.nav-pills.flex-column').within(() => {
            cy.get('[data-toggle="dropdown"]').click()
            cy.get('.dropdown-menu')
              .should('be.visible')
              .contains('Action')
              .should('be.visible')

            cy.get('[data-toggle="dropdown"]').click()
            cy.get('.dropdown-menu')
              .should('not.be.visible')
              .contains('Action')
              .should('not.be.visible')
          })
        })
      })
    })
  })
})
