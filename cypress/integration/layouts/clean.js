const breakpoints = require('../../fixtures/screens.json')

let layout = 'clean'

describe(`${layout}`, () => {
  beforeEach(() => {
    cy.visit(`/wiki/Main_Page?uselayout=${layout}`)
  })

  it('HTML', () => {
    cy.get('body').should('have.class', `layout-${layout}`)
  })

  breakpoints.forEach((breakpoint) => {
    it(`Snapshot ${breakpoint.name}`, () => {
      cy.viewport(breakpoint.width, breakpoint.height)
      cy.compareSnapshot(`Snapshot ${breakpoint.name}`)
    })
  })
})
