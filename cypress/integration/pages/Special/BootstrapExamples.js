/**
 * Tests related to Bootstrap components provided by the BootstrapExamples extension.
 */

const breakpoints = Cypress.env('breakpoints')

describe('Special:BootstrapExamples', () => {
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

      it('Navbar', () => {
        cy.get('.bs-docs-section:nth-of-type(1)').within((section) => {
          cy.wrap(section).compareSnapshot(`Navbars_${breakpoint.name}`)
        })
      })

      it('Navbar Dropdown', () => {
        cy.get('.bs-docs-section:nth-of-type(1)').within((section) => {
          if (breakpoint.collapsedChameleon) {
            // Search not visible.
            cy.get('[placeholder="Search"]').should('not.be.visible')
            cy.contains('Home').should('not.be.visible')
            // Expand button.
            cy.get('[data-target="#navbarColor01"]')
              .should('be.visible')
              .click()
          } else {
            // Expand button.
            cy.get('[data-target="#navbarColor01"]').should('not.be.visible')
          }

          cy.contains('Home').should('be.visible')

          // Dropdown
          cy.contains('Dropdown').click()
          cy.contains('Action').should('be.visible')
          cy.contains('Dropdown').click()
          cy.contains('Action').should('not.be.visible')

          // Search.
          cy.get('[placeholder="Search"]').should('be.visible')
        })
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

      it('Typography', () => {
        cy.get('.bs-docs-section:nth-of-type(3)').within((section) => {
          cy.wrap(section).compareSnapshot(`Typography_${breakpoint.name}`)
        })
      })
      it('Tables', () => {
        cy.get('.bs-docs-section:nth-of-type(4)').within((section) => {
          cy.wrap(section).compareSnapshot(`Tables_${breakpoint.name}`)
        })
      })

      it('Forms', () => {
        cy.get('.bs-docs-section:nth-of-type(5)').within((section) => {
          cy.wrap(section).compareSnapshot(`Forms_${breakpoint.name}`)
        })
      })

      it('Navs', () => {
        cy.get('.bs-docs-section:nth-of-type(6)').within((section) => {
          cy.wrap(section).compareSnapshot(`Navs_${breakpoint.name}`)
        })
      })

      it('Navs Dropdown', () => {
        cy.get('.bs-docs-section:nth-of-type(6)').within((section) => {
          // Tabs
          cy.get('.nav-tabs').within(() => {
            cy.get('[data-toggle="dropdown"]').click()
            cy.get('.dropdown-menu')
              .should('be.visible')
              .contains('Action')
              .should('be.visible')

            cy.get('[data-toggle="dropdown"]').click()
            cy.get('.dropdown-menu')
              .should('not.be.visible')
              .contains('Action')
              .should('not.be.visible')
          })

          // Pills - horizontal
          cy.get('.nav-pills:not(.flex-column)').within(() => {
            cy.get('[data-toggle="dropdown"]').click()
            cy.get('.dropdown-menu')
              .should('be.visible')
              .contains('Action')
              .should('be.visible')

            cy.get('[data-toggle="dropdown"]').click()
            cy.get('.dropdown-menu')
              .should('not.be.visible')
              .contains('Action')
              .should('not.be.visible')
          })

          // Pills - vertical
          cy.get('.nav-pills.flex-column').within(() => {
            cy.get('[data-toggle="dropdown"]').click()
            cy.get('.dropdown-menu')
              .should('be.visible')
              .contains('Action')
              .should('be.visible')

            cy.get('[data-toggle="dropdown"]').click()
            cy.get('.dropdown-menu')
              .should('not.be.visible')
              .contains('Action')
              .should('not.be.visible')
          })
        })
      })

      it('Indicators', () => {
        cy.get('.bs-docs-section:nth-of-type(7)').compareSnapshot(
          `Indicators_${breakpoint.name}`
        )
      })

      it('Progress', () => {
        cy.get('.bs-docs-section:nth-of-type(8)').compareSnapshot(
          `Progress_${breakpoint.name}`
        )
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

      it('Dialogs', () => {
        cy.get('.bs-docs-section:nth-of-type(10)').within((section) => {
          cy.wrap(section).compareSnapshot(`Dialogs_${breakpoint.name}`)

          // Popovers
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

          // Tooltips
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
