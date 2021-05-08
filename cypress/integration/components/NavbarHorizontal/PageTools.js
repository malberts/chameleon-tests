describe('Component: NavbarHorizontal: PageTools', () => {
  context('Page: Logged out', () => {
    before(() => {
      cy.visit('/wiki/Main_Page?uselayout=navhead')
      cy.get('.smw-entity-examiner').should('not.exist')
      // Open Toolbox dropdown.
      cy.get('.navbar-more-tools').click()
      cy.get('#p-contentnavigation').should('be.visible')
    })

    it('Count', () => {
      cy.get('#p-contentnavigation').children().should('have.length', 3)
    })

    it('Discussion', () => {
      cy.get('#ca-talk').should('be.visible')
    })

    it('View source', () => {
      cy.get('#ca-viewsource').should('be.visible')
    })

    it('History', () => {
      cy.get('#ca-history').should('be.visible')
    })
  })

  context('Page: Logged in', () => {
    before(() => {
      cy.login()
      cy.visit('/wiki/Main_Page?uselayout=navhead')
      cy.get('.smw-entity-examiner').should('not.exist')
      // Open Toolbox dropdown.
      cy.get('.navbar-more-tools').click()
      cy.get('#p-contentnavigation').should('be.visible')
    })

    it('Count', () => {
      cy.get('#p-contentnavigation').children().should('have.length', 8)
    })

    it('Discussion', () => {
      cy.get('#ca-talk').should('be.visible')
    })

    it('Edit source', () => {
      cy.get('#ca-edit').should('be.visible')
    })

    it('History', () => {
      cy.get('#ca-history').should('be.visible')
    })

    it('Delete', () => {
      cy.get('#ca-delete').should('be.visible')
    })

    it('Move', () => {
      cy.get('#ca-move').should('be.visible')
    })

    it('Protect', () => {
      cy.get('#ca-protect').should('be.visible')
    })

    it('Watch', () => {
      cy.get('#ca-watch').should('be.visible')
    })

    it('Refresh', () => {
      cy.get('#ca-purge').should('be.visible')
    })
  })

  context('Special Page: Logged out', () => {
    before(() => {
      cy.visit('/wiki/Special:SpecialPages?uselayout=navhead')
      cy.get('.smw-entity-examiner').should('not.exist')
    })

    it('Not visible', () => {
      cy.get('.navbar-more-tools').should('not.exist')
    })
  })

  context('Special Page: Logged in', () => {
    before(() => {
      cy.login()
      cy.visit('/wiki/Special:SpecialPages?uselayout=navhead')
      cy.get('.smw-entity-examiner').should('not.exist')
    })

    it('Not visible', () => {
      cy.get('.navbar-more-tools').should('not.exist')
    })
  })
})
