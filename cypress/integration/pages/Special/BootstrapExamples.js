/**
 * Tests related to Bootstrap components provided by the BootstrapExamples extension.
 */

const breakpoints = require('../../../fixtures/screens.json')

beforeEach(() => {
  cy.visit(`/wiki/Special:BootstrapExamples`)
  // Wait for Bootstrap Javascript to load.
  cy.get('#bootstrap-version').should('not.be.empty')
})

describe('Bootstrap Examples', () => {
  describe(`Navbar`, () => {
    breakpoints.forEach((breakpoint) => {
      it(`Navbar: ${breakpoint.name}`, () => {
        cy.viewport(breakpoint.width, breakpoint.height)
        cy.get('.bs-docs-section:nth-of-type(1)').within((section) => {
          cy.wrap(section).compareSnapshot(`Navbars_${breakpoint.name}`)

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
    })
  })

  describe(`Buttons`, () => {
    breakpoints.forEach((breakpoint) => {
      it(`Buttons: ${breakpoint.name}`, () => {
        cy.viewport(breakpoint.width, breakpoint.height)
        cy.get('.bs-docs-section:nth-of-type(2)').within((section) => {
          cy.wrap(section).compareSnapshot(`Buttons_${breakpoint.name}`)

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

  describe(`Typography`, () => {
    breakpoints.forEach((breakpoint) => {
      it(`Typography: ${breakpoint.name}`, () => {
        cy.viewport(breakpoint.width, breakpoint.height)
        cy.get('.bs-docs-section:nth-of-type(3)').within((section) => {
          cy.wrap(section).compareSnapshot(`Typography_${breakpoint.name}`)
        })
      })
    })
  })

  describe(`Tables`, () => {
    breakpoints.forEach((breakpoint) => {
      it(`Tables: ${breakpoint.name}`, () => {
        cy.viewport(breakpoint.width, breakpoint.height)
        cy.get('.bs-docs-section:nth-of-type(4)').within((section) => {
          cy.wrap(section).compareSnapshot(`Tables_${breakpoint.name}`)
        })
      })
    })
  })

  describe(`Forms`, () => {
    breakpoints.forEach((breakpoint) => {
      it(`Forms: ${breakpoint.name}`, () => {
        cy.viewport(breakpoint.width, breakpoint.height)
        cy.get('.bs-docs-section:nth-of-type(5)').within((section) => {
          cy.wrap(section).compareSnapshot(`Forms_${breakpoint.name}`)
        })
      })
    })
  })

  describe(`Navs`, () => {
    breakpoints.forEach((breakpoint) => {
      it(`Navs: ${breakpoint.name}`, () => {
        cy.viewport(breakpoint.width, breakpoint.height)
        cy.get('.bs-docs-section:nth-of-type(6)').within((section) => {
          cy.wrap(section).compareSnapshot(`Navs_${breakpoint.name}`)

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
    })
  })

  describe(`Indicators`, () => {
    breakpoints.forEach((breakpoint) => {
      it(`Indicators: ${breakpoint.name}`, () => {
        cy.viewport(breakpoint.width, breakpoint.height)
        cy.get('.bs-docs-section:nth-of-type(7)').within((section) => {
          cy.wrap(section).compareSnapshot(`Indicators_${breakpoint.name}`)
        })
      })
    })
  })

  describe(`Progress`, () => {
    breakpoints.forEach((breakpoint) => {
      it(`Progress: ${breakpoint.name}`, () => {
        cy.viewport(breakpoint.width, breakpoint.height)
        cy.get('.bs-docs-section:nth-of-type(8)').within((section) => {
          cy.wrap(section).compareSnapshot(`Progress_${breakpoint.name}`)
        })
      })
    })
  })

  describe(`Containers`, () => {
    describe('Jumbotron', () => {
      breakpoints.forEach((breakpoint) => {
        it(`Jumbotron: ${breakpoint.name}`, () => {
          cy.viewport(breakpoint.width, breakpoint.height)
          cy.get('.bs-docs-section:nth-of-type(9) .row:nth-of-type(1)').within(
            (section) => {
              cy.wrap(section).compareSnapshot(
                `Containers_Jumbotron_${breakpoint.name}`
              )
            }
          )
        })
      })
    })
    describe('List groups', () => {
      breakpoints.forEach((breakpoint) => {
        it(`List group: ${breakpoint.name}`, () => {
          cy.viewport(breakpoint.width, breakpoint.height)
          cy.get('.bs-docs-section:nth-of-type(9) .row:nth-of-type(3)').within(
            (section) => {
              cy.wrap(section).compareSnapshot(
                `Containers_List_groups_${breakpoint.name}`
              )
            }
          )
        })
      })
    })
    describe('Cards', () => {
      breakpoints.forEach((breakpoint) => {
        it.only(`Cards 1: ${breakpoint.name}`, () => {
          cy.viewport(breakpoint.width, breakpoint.height)
          cy.get(
            '.bs-docs-section:nth-of-type(9) .row:nth-of-type(5) > div:nth-of-type(1)'
          ).within((section) => {
            cy.wrap(section).compareSnapshot(
              `Containers_Cards_1_${breakpoint.name}`
            )
          })
        })

        it.only(`Cards 2: ${breakpoint.name}`, () => {
          cy.viewport(breakpoint.width, breakpoint.height)
          cy.get(
            '.bs-docs-section:nth-of-type(9) .row:nth-of-type(5) > div:nth-of-type(2)'
          ).within((section) => {
            cy.wrap(section).compareSnapshot(
              `Containers_Cards_2_${breakpoint.name}`
            )
          })
        })

        it.only(`Cards 3: ${breakpoint.name}`, () => {
          cy.viewport(breakpoint.width, breakpoint.height)
          cy.get(
            '.bs-docs-section:nth-of-type(9) .row:nth-of-type(5) > div:nth-of-type(3)'
          ).within((section) => {
            cy.wrap(section).compareSnapshot(
              `Containers_Cards_3_${breakpoint.name}`
            )
          })
        })
      })
    })
  })

  describe(`Dialogs`, () => {
    breakpoints.forEach((breakpoint) => {
      it(`Dialogs: ${breakpoint.name}`, () => {
        cy.viewport(breakpoint.width, breakpoint.height)
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
