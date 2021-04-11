const breakpoints = require('../../../fixtures/screens.json')

describe(`Modification: Sticky`, () => {
  describe('Sticky', () => {
    before(() => {
      cy.visit(`/wiki/Special:Version?uselayout=stickyhead`)
    })

    breakpoints.forEach((breakpoint) => {
      let config = {
        viewportWidth: breakpoint.width,
        viewportHeight: breakpoint.height,
      }
      describe(breakpoint.name, config, () => {
        before(() => {
          cy.scrollTo('topLeft')
        })

        it('Initial Sticky', () => {
          // Secondary Navigation
          cy.get('[id^="mw-navigation"]:nth-of-type(1)').should('be.inViewport')
          // Primary Navigation
          cy.get('[id^="mw-navigation"]:nth-of-type(2)').should('be.inViewport')
        })

        it('Scrolled Sticky', () => {
          cy.scrollTo('bottomLeft')
          // Secondary Navigation
          cy.get('[id^="mw-navigation"]:nth-of-type(1)').should(
            'not.be.inViewport'
          )
          // Primary Navigation
          cy.get('[id^="mw-navigation"]:nth-of-type(2)').should('be.inViewport')
        })
      })
    })
  })

  describe('Not Sticky', () => {
    before(() => {
      cy.visit(`/wiki/Special:Version?uselayout=navhead`)
    })

    breakpoints.forEach((breakpoint) => {
      let config = {
        viewportWidth: breakpoint.width,
        viewportHeight: breakpoint.height,
      }
      describe(breakpoint.name, config, () => {
        before(() => {
          cy.scrollTo('topLeft')
        })

        it('Initial Not Sticky', () => {
          // Primary Navigation
          cy.get('#mw-navigation').should('be.inViewport')
        })

        it('Scrolled Not Sticky', () => {
          cy.scrollTo('bottomLeft')
          // Primary Navigation
          cy.get('#mw-navigation').should('not.be.inViewport')
        })
      })
    })
  })
})
