/**
 * Tests related to Bootstrap components provided by the BootstrapExamples extension.
 */

const breakpoints = Cypress.env('breakpoints')

describe('Bootstrap: Containers', () => {
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

      it('Containers: Jumbotron', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(9) > div:nth-of-type(1) .bs-component'
        ).compareSnapshot(`Containers_Jumbotron_${breakpoint.name}`)
      })

      it('Containers: List groups', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(9) > div:nth-of-type(3) > div:nth-of-type(1) .bs-component'
        ).compareSnapshot(`Containers_List_groups_${breakpoint.name}`)
      })

      it('Containers: List groups: Interactive', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(9) > div:nth-of-type(3) > div:nth-of-type(2) .bs-component'
        ).compareSnapshot(
          `Containers_List_groups_Interactive_${breakpoint.name}`
        )
      })

      it('Containers: List groups: Full', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(9) > div:nth-of-type(3) > div:nth-of-type(3) .bs-component'
        ).compareSnapshot(`Containers_List_groups_Full_${breakpoint.name}`)
      })

      it('Containers: Cards: Filled', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(9) .row:nth-of-type(5) > div:nth-of-type(1) .bs-component'
        ).compareSnapshot(`Containers_Cards_Filled_${breakpoint.name}`)
      })

      it('Containers: Cards: Outline', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(9) .row:nth-of-type(5) > div:nth-of-type(2) .bs-component'
        ).compareSnapshot(`Containers_Cards_Outline_${breakpoint.name}`)
      })

      it('Containers: Cards: Full', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(9) .row:nth-of-type(5) > div:nth-of-type(3) .bs-component'
        ).compareSnapshot(`Containers_Cards_Full_${breakpoint.name}`)
      })
    })
  })
})
