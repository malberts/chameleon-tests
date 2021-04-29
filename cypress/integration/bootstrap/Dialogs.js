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

      it('Dialogs: Modals', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(10) > div:nth-of-type(2) > div:nth-of-type(1) .bs-component'
        ).compareSnapshot(`Dialogs_Modals_${breakpoint.name}`)
      })

      it('Dialogs: Popovers', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(10) > div:nth-of-type(2) > div:nth-of-type(2) .bs-component:nth-of-type(1)'
        ).compareSnapshot(`Dialogs_Popovers_${breakpoint.name}`)
      })

      it('Dialogs: Tooltips', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(10) > div:nth-of-type(2) > div:nth-of-type(2) .bs-component:nth-of-type(2)'
        ).compareSnapshot(`Dialogs_Tooltips_${breakpoint.name}`)
      })

      it('Dialogs: Toasts', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(10) > div:nth-of-type(2) > div:nth-of-type(2) .bs-component:nth-of-type(3)'
        ).compareSnapshot(`Dialogs_Toasts_${breakpoint.name}`)
      })

      it('Dialogs: Popovers: Dropdown', () => {
        cy.get('.bs-docs-section:nth-of-type(10)').within((section) => {
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
        })
      })

      it('Dialogs: Tooltips: Dropdown', () => {
        cy.get('.bs-docs-section:nth-of-type(10)').within((section) => {
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
