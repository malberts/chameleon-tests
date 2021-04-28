/**
 * Tests related to Bootstrap components provided by the BootstrapExamples extension.
 */

const breakpoints = Cypress.env('breakpoints')

describe('Bootstrap: Tables', () => {
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

      it('Tables', () => {
        cy.get('.bs-docs-section:nth-of-type(4)').within((section) => {
          cy.wrap(section).compareSnapshot(`Tables_${breakpoint.name}`)
        })
      })
    })
  })
})