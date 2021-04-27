/**
 * Tests related to Bootstrap components provided by the BootstrapExamples extension.
 */

const breakpoints = Cypress.env('breakpoints')

describe('Bootstrap: Dialogs', () => {
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

      it('Dialogs', () => {
        cy.get('.bs-docs-section:nth-of-type(10)').within((section) => {
          cy.wrap(section).compareSnapshot(`Dialogs_${breakpoint.name}`)

          // Popovers
          cy.get('[data-toggle="popover"][data-placement="bottom"]')
            .click()
            .root()
            .closest('body')
            .find('.bs-popover-bottom')
            .contains('Popover Title')
            .should('be.visible')

          cy.get('[data-toggle="popover"][data-placement="bottom"]')
            .click()
            .root()
            .closest('body')
            .within((body) => {
              cy.get('.bs-popover-bottom').should('not.exist')
            })

          // Tooltips
          cy.get('[data-toggle="tooltip"][data-placement="bottom"]')
            .trigger('mouseover')
            .root()
            .closest('body')
            .find('.bs-tooltip-bottom')
            .contains('Tooltip on bottom')
            .should('be.visible')

          cy.get('[data-toggle="tooltip"][data-placement="bottom"]')
            .trigger('mouseout')
            .root()
            .closest('body')
            .within((body) => {
              cy.get('.bs-tooltip-bottom').should('not.exist')
            })
        })
      })
    })
  })
})
