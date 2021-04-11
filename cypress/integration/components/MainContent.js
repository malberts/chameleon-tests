const breakpoints = Cypress.env('breakpoints')

describe('Component: MainContent', () => {
  before(() => {
    cy.visit('/wiki/Main_Page')
  })

  breakpoints.forEach((breakpoint) => {
    let config = {
      viewportWidth: breakpoint.width,
      viewportHeight: breakpoint.height,
    }
    describe(breakpoint.name, config, () => {
      it('Title', () => {
        cy.get('#content').get('#firstHeading').contains('Main Page')
      })

      it('Body', () => {
        cy.get('#content')
          .get('#bodyContent')
          .contains('MediaWiki has been installed.')
      })
    })
  })
})
