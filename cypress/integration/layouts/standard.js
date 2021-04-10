const breakpoints = require('../../fixtures/screens.json')

let layout = 'standard'

describe(`${layout}`, () => {
  beforeEach(() => {
    cy.visit(`/wiki/Main_Page?uselayout=${layout}`)
  })

  it('HTML', () => {
    cy.get('body').should('have.class', `layout-${layout}`)
  })

  breakpoints.forEach((breakpoint) => {
    it(breakpoint.name, () => {
      cy.viewport(breakpoint.width, breakpoint.height)
      cy.replaceTimestamps()
      cy.compareSnapshot(breakpoint.name)
    })
  })
})