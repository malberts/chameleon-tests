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

      it('Navs: Tabs', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(6) > div:nth-child(2) > div:nth-child(1) > .bs-component'
        ).compareSnapshot(`Navs_Tabs_${breakpoint.name}`)
      })

      it('Navs: Pills: Horizontal', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(6) > div:nth-child(2) > div:nth-child(2) > .bs-component:nth-of-type(1)'
        ).compareSnapshot(`Navs_Pills_Horizontal_${breakpoint.name}`)
      })

      it('Navs: Pills: Vertical', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(6) > div:nth-child(2) > div:nth-child(2) > .bs-component:nth-of-type(2)'
        ).compareSnapshot(`Navs_Pills_Vertical_${breakpoint.name}`)
      })

      it('Navs: Tabs: Switch', () => {
        cy.get('.bs-docs-section:nth-of-type(6)').within((section) => {
          // Home tab
          cy.get('[href="#home"]').click()
          cy.get('#myTabContent #home')
            .should('be.visible')
            .contains('Raw denim')
          // Profile tab
          cy.get('[href="#profile"]').click()
          cy.get('#myTabContent #profile')
            .should('be.visible')
            .contains('Food truck')
        })
      })

      it('Navs: Tabs: Dropdown', () => {
        cy.get('.bs-docs-section:nth-of-type(6)').within((section) => {
          cy.get('.nav-tabs').within(() => {
            // Open
            cy.get('[data-toggle="dropdown"]').click()
            cy.get('.dropdown-menu')
              .should('be.visible')
              .contains('Action')
              .should('be.visible')
            // Close
            cy.get('[data-toggle="dropdown"]').click()
            cy.get('.dropdown-menu')
              .should('not.be.visible')
              .contains('Action')
              .should('not.be.visible')
          })
        })

        it('Navs: Pills: Horizontal: Dropdown', () => {
          cy.get('.bs-docs-section:nth-of-type(6)').within((section) => {
            cy.get('.nav-pills:not(.flex-column)').within(() => {
              // Open
              cy.get('[data-toggle="dropdown"]').click()
              cy.get('.dropdown-menu')
                .should('be.visible')
                .contains('Action')
                .should('be.visible')
              // Close
              cy.get('[data-toggle="dropdown"]').click()
              cy.get('.dropdown-menu')
                .should('not.be.visible')
                .contains('Action')
                .should('not.be.visible')
            })
          })
        })

        it('Navs: Pills: Vertical: Dropdown', () => {
          cy.get('.bs-docs-section:nth-of-type(6)').within((section) => {
            cy.get('.nav-pills.flex-column').within(() => {
              // Open
              cy.get('[data-toggle="dropdown"]').click()
              cy.get('.dropdown-menu')
                .should('be.visible')
                .contains('Action')
                .should('be.visible')
              // Close
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
})
