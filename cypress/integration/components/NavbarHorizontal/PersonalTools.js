const breakpoints = require('../../../fixtures/screens.json')

describe('Component: NavbarHorizontal/PageTools', () => {
  describe('Logged out', () => {
    breakpoints.forEach((breakpoint) => {
      describe(breakpoint.name, () => {
        before(() => {
          cy.visit('/wiki/Main_Page?uselayout=navhead')
          cy.viewport(breakpoint.width, breakpoint.height)

          // Expand menu if collapsed.
          if (breakpoint.collapsedChameleon) {
            cy.get('[data-toggle="collapse"]').click()
          }
        })

        it('Logged out menu items', () => {
          cy.get('#mw-navigation').within((navbar) => {
            cy.get('a.navbar-usernotloggedin').click()
            cy.get('.p-personal-tools')
              .should('be.visible')
              .find('a')
              .should('contain', 'Create account')
              .should('contain', 'Log in')
          })
        })
      })
    })
  })

  describe('Logged in', () => {
    before(() => {
      cy.login()
    })

    beforeEach(() => {
      Cypress.Cookies.preserveOnce('mw_session', 'mwUserID', 'mwUserName')
    })

    breakpoints.forEach((breakpoint) => {
      describe(breakpoint.name, () => {
        before(() => {
          cy.visit('/wiki/Main_Page?uselayout=navhead')
          cy.viewport(breakpoint.width, breakpoint.height)

          // Expand menu if collapsed.
          if (breakpoint.collapsedChameleon) {
            cy.get('[data-toggle="collapse"]').click()
          }
        })

        it('Logged in menu items', () => {
          cy.get('#mw-navigation').within((navbar) => {
            cy.get('a.navbar-userloggedin').click()
            cy.get('.p-personal-tools')
              .should('be.visible')
              .find('a')
              .should('contain', 'AdminUser')
              .should('contain', 'Talk')
              .should('contain', 'Preferences')
              .should('contain', 'Watchlist')
              .should('contain', 'Contributions')
              .should('contain', 'Log out')
          })
        })
      })
    })
  })
})
