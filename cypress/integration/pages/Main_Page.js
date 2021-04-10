const breakpoints = require('../../fixtures/screens.json')

describe('Main_Page', () => {
  breakpoints.forEach((breakpoint) => {
    it(breakpoint.name, () => {
      cy.viewport(breakpoint.width, breakpoint.height)
      cy.visit(`/wiki/Main_Page`)
      cy.get('#bodyContent').compareSnapshot(breakpoint.name)
    })
  })
})
