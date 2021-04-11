const breakpoints = require('../../fixtures/screens.json')

describe('Component: MainContent', () => {
  before(() => {
    cy.visit('/wiki/Main_Page')
  })

  breakpoints.forEach((breakpoint) => {
    describe(breakpoint.name, () => {
      before(() => {
        cy.viewport(breakpoint.width, breakpoint.height)
      })

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
