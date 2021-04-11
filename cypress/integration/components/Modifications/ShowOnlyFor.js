const breakpoints = require('../../../fixtures/screens.json')

describe(`Modification: ShowOnlyFor`, () => {
  describe('Without permission', () => {
    before(() => {
      cy.visit(`/wiki/Main_Page?uselayout=clean`)
    })

    breakpoints.forEach((breakpoint) => {
      let config = {
        viewportWidth: breakpoint.width,
        viewportHeight: breakpoint.height,
      }
      describe(breakpoint.name, config, () => {
        it('NavbarHorizontal not shown', () => {
          cy.get('#mw-navigation').should('not.exist')
        })

        it('FooterInfo not shown', () => {
          cy.get('#footer-info').should('not.exist')
        })
      })
    })
  })

  describe('With permission', () => {
    before(() => {
      cy.visit(`/wiki/Main_Page?uselayout=clean`)
      cy.login()
    })

    breakpoints.forEach((breakpoint) => {
      let config = {
        viewportWidth: breakpoint.width,
        viewportHeight: breakpoint.height,
      }
      describe(breakpoint.name, config, () => {
        it('NavbarHorizontal shown', () => {
          cy.get('#mw-navigation').should('be.visible')
        })

        it('FooterInfo shown', () => {
          cy.get('#footer-info').should('be.visible')
        })
      })
    })
  })
})