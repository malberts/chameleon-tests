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
        cy.get('.smw-entity-examiner').should('not.exist')
        cy.get('#bootstrap-version').should('not.be.empty')
      })

      it('Indicators: Alerts: Warning', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(7) > div:nth-child(2) > div:nth-child(1) .bs-component'
        ).compareSnapshot(`Indicators_Alert_Warning_${breakpoint.name}`)
      })

      it('Indicators: Alerts: Danger', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(7) > div:nth-child(3) > div:nth-child(1) .bs-component'
        ).compareSnapshot(`Indicators_Alert_Danger_${breakpoint.name}`)
      })

      it('Indicators: Alerts: Success', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(7) > div:nth-child(3) > div:nth-child(2) .bs-component'
        ).compareSnapshot(`Indicators_Alert_Success_${breakpoint.name}`)
      })

      it('Indicators: Alerts: Info', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(7) > div:nth-child(3) > div:nth-child(3) .bs-component'
        ).compareSnapshot(`Indicators_Alert_Info_${breakpoint.name}`)
      })

      it('Indicators: Alerts: Primary', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(7) > div:nth-child(4) > div:nth-child(1) .bs-component'
        ).compareSnapshot(`Indicators_Alert_Primary_${breakpoint.name}`)
      })

      it('Indicators: Alerts: Secondary', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(7) > div:nth-child(4) > div:nth-child(2) .bs-component'
        ).compareSnapshot(`Indicators_Alert_Secondary_${breakpoint.name}`)
      })

      it('Indicators: Alerts: Light', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(7) > div:nth-child(4) > div:nth-child(3) .bs-component'
        ).compareSnapshot(`Indicators_Alert_Light_${breakpoint.name}`)
      })

      it('Indicators: Badges', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(7) > div:nth-child(5) .bs-component:nth-of-type(1)'
        ).compareSnapshot(`Indicators_Badges_${breakpoint.name}`)
      })

      it('Indicators: Badges: Pills', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(7) > div:nth-child(5) .bs-component:nth-of-type(2)'
        ).compareSnapshot(`Indicators_Badges_Pills_${breakpoint.name}`)
      })
    })
  })
})
