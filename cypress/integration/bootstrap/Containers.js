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

      describe(`Containers`, () => {
        it('Jumbotron', () => {
          cy.get(
            '.bs-docs-section:nth-of-type(9) .row:nth-of-type(1)'
          ).compareSnapshot(`Containers_Jumbotron_${breakpoint.name}`)
        })

        it('List group', () => {
          cy.get(
            '.bs-docs-section:nth-of-type(9) .row:nth-of-type(3)'
          ).compareSnapshot(`Containers_List_groups_${breakpoint.name}`)
        })

        describe('Cards', () => {
          it('Cards 1', () => {
            cy.get(
              '.bs-docs-section:nth-of-type(9) .row:nth-of-type(5) > div:nth-of-type(1)'
            ).compareSnapshot(`Containers_Cards_1_${breakpoint.name}`)
          })

          it('Cards 2', () => {
            cy.get(
              '.bs-docs-section:nth-of-type(9) .row:nth-of-type(5) > div:nth-of-type(2)'
            ).compareSnapshot(`Containers_Cards_2_${breakpoint.name}`)
          })

          it('Cards 3', () => {
            cy.get(
              '.bs-docs-section:nth-of-type(9) .row:nth-of-type(5) > div:nth-of-type(3)'
            ).compareSnapshot(`Containers_Cards_3_${breakpoint.name}`)
          })
        })
      })
    })
  })
})
