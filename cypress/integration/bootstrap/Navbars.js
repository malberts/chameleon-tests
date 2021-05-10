/**
 * Tests related to Bootstrap components provided by the BootstrapExamples extension.
 */

const breakpoints = Cypress.env('breakpoints')

describe('Bootstrap: Navbars', () => {
  breakpoints.forEach((breakpoint) => {
    let config = {
      viewportWidth: breakpoint.width,
      viewportHeight: breakpoint.height,
    }
    describe(breakpoint.name, config, () => {
      before(() => {
        cy.visit('/wiki/Special:BootstrapExamples')
        cy.waitForIndicators()
        cy.get('#bootstrap-version').should('not.be.empty')
      })

      it('Navbar: Primary', () => {
        cy.get('nav.bg-primary').compareSnapshot(
          `Navbars_Primary_${breakpoint.name}`
        )
      })

      it('Navbar: Dark', () => {
        cy.get('nav.bg-dark').compareSnapshot(`Navbars_Dark_${breakpoint.name}`)
      })

      it('Navbar: Light', () => {
        cy.get('nav.bg-light').compareSnapshot(
          `Navbars_Light_${breakpoint.name}`
        )
      })

      it('Navbar Dropdown', () => {
        cy.get('nav.bg-primary').within((section) => {
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
