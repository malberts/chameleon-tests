/**
 * Tests related to Bootstrap components provided by the BootstrapExamples extension.
 */

const breakpoints = Cypress.env('breakpoints')

describe('Bootstrap: Typography', () => {
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

      it('Typography: Heading', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(3) > div:nth-child(2) > div:nth-child(1) > .bs-component'
        ).compareSnapshot(`Typography_Heading_${breakpoint.name}`)
      })

      it('Typography: Body', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(3) > div:nth-child(2) > div:nth-child(2) > .bs-component'
        ).compareSnapshot(`Typography_Body_${breakpoint.name}`)
      })

      it('Typography: Emphasis', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(3) > div:nth-child(2) > div:nth-child(3) > .bs-component'
        ).compareSnapshot(`Typography_Emphasis_${breakpoint.name}`)
      })

      it('Typography: Blockquotes: Left', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(3) > div:nth-child(4) > div:nth-child(1) > .bs-component'
        ).compareSnapshot(`Typography_Blockquotes_Left_${breakpoint.name}`)
      })

      it('Typography: Blockquotes: Middle', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(3) > div:nth-child(4) > div:nth-child(2) > .bs-component'
        ).compareSnapshot(`Typography_Blockquotes_Middle_${breakpoint.name}`)
      })

      it('Typography: Blockquotes: Right', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(3) > div:nth-child(4) > div:nth-child(3) > .bs-component'
        ).compareSnapshot(`Typography_Blockquotes_Right_${breakpoint.name}`)
      })
    })
  })
})
