const breakpoints = Cypress.env('breakpoints')

describe(`Modification: Sticky`, () => {
  describe('Sticky', () => {
    before(() => {
      cy.visit(`/wiki/Special:Version?uselayout=stickyhead`)
      cy.get('.smw-entity-examiner').should('not.exist')
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
          cy.screenshot(`Initial_Sticky_${breakpoint.name}`, {
            capture: 'viewport',
          })
        })

        it('Scrolled Sticky', () => {
          cy.scrollTo('bottomLeft')
          // Secondary Navigation
          cy.get('[id^="mw-navigation"]:nth-of-type(1)').should(
            'not.be.inViewport'
          )
          // Primary Navigation
          cy.get('[id^="mw-navigation"]:nth-of-type(2)').should('be.inViewport')
          cy.screenshot(`Scrolled_Sticky_${breakpoint.name}`, {
            capture: 'viewport',
          })
        })
      })
    })
  })

  describe('Sticky: Fragment', () => {
    // Issue: https://github.com/ProfessionalWiki/chameleon/issues/139
    breakpoints.forEach((breakpoint) => {
      before(() => {
      })

      let config = {
        viewportWidth: breakpoint.width,
        viewportHeight: breakpoint.height,
      }
      describe(breakpoint.name, config, () => {
        it('Initial Sticky', () => {
          cy.visit('/wiki/Special:Version?uselayout=stickyhead#mw-version-ext')
          cy.get('.smw-entity-examiner').should('not.exist')

          // Secondary Navigation
          cy.get('[id^="mw-navigation"]:nth-of-type(1)').should('not.be.inViewport')
          // Primary Navigation
          cy.get('[id^="mw-navigation"]:nth-of-type(2)').should('be.inViewport')
          cy.screenshot(`Initial_Sticky_Fragment_${breakpoint.name}`, {
            capture: 'viewport',
          })
        })
      })
    })
  })

  describe('Not Sticky', () => {
    before(() => {
      cy.visit(`/wiki/Special:Version?uselayout=navhead`)
      cy.get('.smw-entity-examiner').should('not.exist')
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
          cy.screenshot(`Initial_Not_Sticky_${breakpoint.name}`, {
            capture: 'viewport',
          })
        })

        it('Scrolled Not Sticky', () => {
          cy.scrollTo('bottomLeft')
          // Primary Navigation
          cy.get('#mw-navigation').should('not.be.inViewport')
          cy.screenshot(`Scrolled_Not_Sticky_${breakpoint.name}`, {
            capture: 'viewport',
          })
        })
      })
    })
  })
})
