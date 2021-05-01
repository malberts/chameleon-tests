/**
 * Tests related to Bootstrap components provided by the BootstrapExamples extension.
 */

const breakpoints = Cypress.env('breakpoints')

describe('Bootstrap: Progress', () => {
  breakpoints.forEach((breakpoint) => {
    let config = {
      viewportWidth: breakpoint.width,
      viewportHeight: breakpoint.height,
    }
    describe(breakpoint.name, config, () => {
      before(() => {
        cy.visit('/wiki/Special:BootstrapExamples')
        cy.get('.smw-entity-examiner').should('not.exist')
        cy.get('#bootstrap-version').should('not.be.empty')
      })

      it('Progress: Basic', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(8) .bs-component:nth-of-type(1)'
        ).compareSnapshot(`Progress_Basic_${breakpoint.name}`)
      })

      it('Progress: Contextual', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(8) .bs-component:nth-of-type(2)'
        ).compareSnapshot(`Progress_Contextual_${breakpoint.name}`)
      })

      it('Progress: Multiple', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(8) .bs-component:nth-of-type(3)'
        ).compareSnapshot(`Progress_Multiple_${breakpoint.name}`)
      })

      it('Progress: Striped', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(8) .bs-component:nth-of-type(4)'
        ).compareSnapshot(`Progress_Striped_${breakpoint.name}`)
      })

      it('Progress: Animated', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(8) .bs-component:nth-of-type(5)'
        ).compareSnapshot(`Progress_Animated_${breakpoint.name}`)
      })
    })
  })
})
