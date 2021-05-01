const breakpoints = Cypress.env('breakpoints')

let layout = 'stickyhead'

describe(`Layout: ${layout}`, () => {
  before(() => {
    cy.visit(`/wiki/Main_Page?uselayout=${layout}`)
    cy.get('.smw-entity-examiner').should('not.exist')
    cy.replaceTimestamps()
  })

  breakpoints.forEach((breakpoint) => {
    let config = {
      viewportWidth: breakpoint.width,
      viewportHeight: breakpoint.height,
    }
    describe(breakpoint.name, config, () => {
      it(' NavbarHorizontal_Secondary', () => {
        cy.get('#mw-navigation').compareSnapshot(
          `NavbarHorizontal_Secondary_${breakpoint.name}`
        )
      })

      it('NavbarHorizontal_Primary', () => {
        cy.get('[id^="mw-navigation-"]:nth-of-type(1)').compareSnapshot(
          `NavbarHorizontal_Primary_${breakpoint.name}`
        )
      })

      it('MainContent', () => {
        cy.get('#content').compareSnapshot(`MainContent_${breakpoint.name}`)
      })

      it('NavbarHorizontal_Footer', () => {
        cy.get('[id^="mw-navigation-"]:nth-of-type(2)').compareSnapshot(
          `NavbarHorizontal_Footer_${breakpoint.name}`
        )
      })

      it('FooterInfo', () => {
        cy.get('#footer-info').compareSnapshot(`FooterInfo_${breakpoint.name}`)
      })

      it('FooterPlaces', () => {
        cy.get('#footer-places').compareSnapshot(
          `FooterPlaces_${breakpoint.name}`
        )
      })

      it('FooterIcons', () => {
        cy.get('#footer-icons').compareSnapshot(
          `FooterIcons_${breakpoint.name}`
        )
      })
    })
  })
})
