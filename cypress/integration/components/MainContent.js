const breakpoints = require('../../fixtures/screens.json')

describe('Component: MainContent', () => {
  breakpoints.forEach((breakpoint) => {
    it(breakpoint.name, () => {
      cy.viewport(breakpoint.width, breakpoint.height)
      cy.visit('/wiki/Main_Page')
      cy.get('#content').get('#firstHeading').contains('Main Page')
      cy.get('#content')
        .get('#bodyContent')
        .contains('MediaWiki has been installed.')
    })
  })
})
