/**
 * Tests related to Bootstrap components provided by the BootstrapExamples extension.
 */

const breakpoints = Cypress.env('breakpoints')

describe('Bootstrap: Indicators', () => {
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

      it('Indicators', () => {
        cy.get('.bs-docs-section:nth-of-type(7)').compareSnapshot(
          `Indicators_${breakpoint.name}`
        )
      })
    })
  })
})
