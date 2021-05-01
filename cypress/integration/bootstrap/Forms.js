/**
 * Tests related to Bootstrap components provided by the BootstrapExamples extension.
 */

const breakpoints = Cypress.env('breakpoints')

describe('Bootstrap: Forms', () => {
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

      it('Forms: Normal', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(5) > div:nth-child(2) > div:nth-child(1) > .bs-component'
        ).compareSnapshot(`Forms_Normal_${breakpoint.name}`)
      })

      it('Forms: State', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(5) > div:nth-child(2) > div:nth-child(2) > form.bs-component'
        ).compareSnapshot(`Forms_State_${breakpoint.name}`)
      })

      it('Forms: Custom', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(5) > div:nth-child(2) > div:nth-child(2) > div.bs-component'
        ).compareSnapshot(`Forms_Custom_${breakpoint.name}`)
      })
    })
  })
})
