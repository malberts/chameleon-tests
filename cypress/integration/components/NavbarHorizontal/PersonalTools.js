const breakpoints = Cypress.env('breakpoints')

describe('Component: NavbarHorizontal/PageTools', () => {
  describe('Logged out', () => {
    breakpoints.forEach((breakpoint) => {
      let config = {
        viewportWidth: breakpoint.width,
        viewportHeight: breakpoint.height,
      }
      describe(breakpoint.name, config, () => {
        before(() => {
          cy.visit('/wiki/Main_Page?uselayout=navhead')
          // Expand menu if collapsed.
          if (breakpoint.collapsedChameleon) {
            cy.get('#mw-navigation').find('[data-toggle="collapse"]').click()
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
      let config = {
        viewportWidth: breakpoint.width,
        viewportHeight: breakpoint.height,
      }
      describe(breakpoint.name, config, () => {
        before(() => {
          cy.visit('/wiki/Main_Page?uselayout=navhead')
          // Expand menu if collapsed.
          if (breakpoint.collapsedChameleon) {
            cy.get('#mw-navigation').find('[data-toggle="collapse"]').click()
          }
        })

        it('Logged in menu items', () => {
          cy.wait(1000) // TODO: something is slow here
          cy.get('#mw-navigation a.navbar-userloggedin')
            .click()

          cy.get('#mw-navigation .p-personal-tools')
            .should('be.visible')
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
