const breakpoints = Cypress.env('breakpoints')

describe('Component: NavbarHorizontal: PersonalTools', () => {
  describe('Logged out', () => {
    breakpoints.forEach((breakpoint) => {
      let config = {
        viewportWidth: breakpoint.width,
        viewportHeight: breakpoint.height,
      }
      describe(breakpoint.name, config, () => {
        before(() => {
          cy.visit('/wiki/Main_Page?uselayout=navhead')
          cy.get('.smw-entity-examiner').should('not.exist')
          // Expand menu if collapsed.
          if (breakpoint.collapsedChameleon) {
            cy.wait(1000) // TODO: something is slow here
            cy.get('#mw-navigation').find('[data-toggle="collapse"]').click()
          }
          cy.get('a.navbar-usernotloggedin').click()
          cy.get('.p-personal-tools').should('be.visible')
        })

        it('Count', () => {
          cy.get('.p-personal-tools').children().should('have.length', 2)
        })

        it('Create account', () => {
          cy.get('#pt-createaccount').should('be.visible')
        })

        it('Log in', () => {
          cy.get('#pt-login').should('be.visible')
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
          cy.get('.smw-entity-examiner').should('not.exist')
          // Expand menu if collapsed.
          if (breakpoint.collapsedChameleon) {
            cy.wait(1000) // TODO: something is slow here
            cy.get('#mw-navigation').find('[data-toggle="collapse"]').click()
          }
          cy.get('#mw-navigation a.navbar-userloggedin').click()
          cy.get('.p-personal-tools').should('be.visible')
        })

        it('Count', () => {
          cy.get('.p-personal-tools').children().should('have.length', 6)
        })

        it('AdminUser', () => {
          cy.get('#pt-userpage').should('be.visible')
        })

        it('Talk', () => {
          cy.get('#pt-mytalk').should('be.visible')
        })

        it('Preferences', () => {
          cy.get('#pt-preferences').should('be.visible')
        })

        it('Watchlist', () => {
          cy.get('#pt-watchlist').should('be.visible')
        })

        it('Contributions', () => {
          cy.get('#pt-mycontris').should('be.visible')
        })

        it('Log out', () => {
          cy.get('#pt-logout').should('be.visible')
        })
      })
    })
  })

  it('Newtalk Notifier', () => {
    cy.visit('/wiki/Main_Page?uselayout=navhead')
    cy.get('.smw-entity-examiner').should('not.exist')

    // No logged out notification
    cy.get('.navbar-usernotloggedin > .badge').should('not.exist')

    // Create a message
    cy.login('AnotherUser', 'AnotherPassword')
    cy.visit('/wiki/User_talk:AdminUser')
    cy.get('.smw-entity-examiner').should('not.exist')
    cy.get('.ca-addsection').click()
    cy.get('#wpSummary').type('Test PersonalTools')
    cy.get('#wpTextbox1').type('Chameleon')
    cy.get('#wpSave').click()

    // Logout
    cy.get('.pt-logout').click()

    // Still no logged out notification
    cy.visit('/wiki/Main_Page?uselayout=navhead')
    cy.get('.smw-entity-examiner').should('not.exist')
    cy.get('.navbar-usernotloggedin > .badge').should('not.exist')

    cy.login()

    // Notification appears
    cy.visit('/wiki/Main_Page?uselayout=navhead')
    cy.get('.smw-entity-examiner').should('not.exist')
    cy.get('.navbar-userloggedin > .badge.pt-mytalk').should('be.visible')

    // View message
    cy.get('.navbar-userloggedin').click()
    cy.get('#pt-mytalk').should('be.visible').click()

    // Notification no longer visible
    cy.visit('/wiki/Main_Page?uselayout=navhead')
    cy.get('.smw-entity-examiner').should('not.exist')
    cy.get('.navbar-userloggedin > .badge').should('not.exist')
  })
})
