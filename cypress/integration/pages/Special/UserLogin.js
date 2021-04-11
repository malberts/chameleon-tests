const breakpoints = Cypress.env('breakpoints')

describe('Special:UserLogin', () => {
  describe('Snapshots', () => {
    before(() => {
      cy.visit('/wiki/Special:UserLogin')
    })

    breakpoints.forEach((breakpoint) => {
      describe(breakpoint.name, () => {
        before(() => {
          cy.viewport(breakpoint.width, breakpoint.height)
        })

        it('Snapshot', () => {
          cy.get('#bodyContent').compareSnapshot(breakpoint.name)
        })
      })
    })
  })

  it('Can login', () => {
    cy.login()
    cy.get('.pt-userpage').contains('AdminUser').should('be.visible')
  })
})
