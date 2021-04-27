/**
 * Tests related to Bootstrap components provided by the BootstrapExamples extension.
 */

const breakpoints = Cypress.env('breakpoints')

describe('Bootstrap: Buttons', () => {
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

      it('Buttons', () => {
        cy.get('.bs-docs-section:nth-of-type(2)').compareSnapshot(
          `Buttons_${breakpoint.name}`
        )
      })

      it('Buttons Dropdown', () => {
        cy.get('.bs-docs-section:nth-of-type(2)').within((section) => {
          cy.get('#btnGroupDrop1').click()
          cy.get('[aria-labelledby="btnGroupDrop1"]')
            .contains('Dropdown link')
            .should('be.visible')

          cy.get('#btnGroupDrop1').click()
          cy.get('[aria-labelledby="btnGroupDrop1"]')
            .contains('Dropdown link')
            .should('not.be.visible')
        })
      })
    })
  })
})
