const breakpoints = Cypress.env('breakpoints')

let layout = 'standard'

describe(`Layout: ${layout}`, () => {
  before(() => {
    cy.visit(`/wiki/Main_Page?uselayout=${layout}`)
    cy.replaceTimestamps()
  })

  breakpoints.forEach((breakpoint) => {
    let config = {
      viewportWidth: breakpoint.width,
      viewportHeight: breakpoint.height,
    }
    describe(breakpoint.name, config, () => {
      it('Top row', () => {
        cy.get(
          'body > div:nth-of-type(1) > .row:nth-of-type(1)'
        ).compareSnapshot(`Top_${breakpoint.name}`)
      })

      it('NavbarHorizontal_Primary', () => {
        cy.get('#mw-navigation').compareSnapshot(
          `NavbarHorizontal_Primary${breakpoint.name}`
        )
      })

      it('PageTools', () => {
        cy.get('#p-contentnavigation').compareSnapshot(
          `PageTools_${breakpoint.name}`
        )
      })

      it('MainContent', () => {
        cy.get('#content').compareSnapshot(`MainContent_${breakpoint.name}`)
      })

      it('NavbarHorizontal_Footer', () => {
        cy.get('[id^="mw-navigation-"]').compareSnapshot(
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
