const breakpoints = require('../../fixtures/screens.json')

let layout = 'fixedhead'

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

      // NavbarHorizontal
      cy.get('#mw-navigation').compareSnapshot(
        `NavbarHorizontal_${breakpoint.name}`
      )
      // MainContent
      cy.get('#content').compareSnapshot(`MainContent_${breakpoint.name}`)
      // NavbarHorizontal (Bottom)
      cy.get('[id^="mw-navigation-"]').compareSnapshot(
        `NavbarHorizontal_Bottom_${breakpoint.name}`
      )
      // FooterInfo
      cy.get('#footer-info').compareSnapshot(`FooterInfo_${breakpoint.name}`)
      // FooterPlaces
      cy.get('#footer-places').compareSnapshot(
        `FooterPlaces_${breakpoint.name}`
      )
      // FooterIcons
      cy.get('#footer-icons').compareSnapshot(`FooterIcons_${breakpoint.name}`)

      // Sticky Modification
      cy.visit('/wiki/Special:Version').scrollTo('bottomLeft')
      // Not Sticky
      cy.get('#mw-navigation').should('be.inViewport')
    })
  })
})
