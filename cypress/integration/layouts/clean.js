const breakpoints = Cypress.env('breakpoints')

let layout = 'clean'

describe(`Layout: ${layout}`, () => {
  before(() => {
    cy.visit(`/wiki/Main_Page?uselayout=${layout}`)
    cy.waitForIndicators()
  })

  breakpoints.forEach((breakpoint) => {
    let config = {
      viewportWidth: breakpoint.width,
      viewportHeight: breakpoint.height,
    }
    describe(breakpoint.name, config, () => {
      it('MainContent', () => {
        cy.get('#content').compareSnapshot(`MainContent_${breakpoint.name}`)
      })
    })
  })
})
