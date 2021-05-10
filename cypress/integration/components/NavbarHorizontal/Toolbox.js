const breakpoints = Cypress.env('breakpoints')

describe('Component: NavbarHorizontal: Toolbox', () => {
  context('Page', () => {
    before(() => {
      cy.visit('/wiki/Main_Page?uselayout=standard')
      cy.waitForIndicators()
      // Open Toolbox dropdown.
      cy.get('.p-tb-dropdown')
        .click()
        .get('.dropdown-menu.show')
        .should('be.visible')
    })

    it('Count', () => {
      // Issue: https://github.com/ProfessionalWiki/chameleon/issues/225
      cy.get('.p-tb-dropdown .dropdown-menu.show')
        .children()
        .should('have.length', 8)
    })

    it('What links here', () => {
      cy.get('#t-whatlinkshere').should('be.visible')
    })

    it('Related changes', () => {
      cy.get('#t-recentchangeslinked').should('be.visible')
    })

    it('Special pages', () => {
      cy.get('#t-specialpages').should('be.visible')
    })

    it('Printable version', () => {
      cy.get('#t-print').should('be.visible')
    })

    it('Permanent link', () => {
      cy.get('#t-permalink').should('be.visible')
    })

    it('Page information', () => {
      cy.get('#t-info').should('be.visible')
    })

    it('Cite this page', () => {
      cy.get('#t-cite').should('be.visible')
    })

    it('Browse properties', () => {
      cy.get('#t-smwbrowselink').should('be.visible')
    })
  })

  context('Special Page', () => {
    before(() => {
      cy.visit('/wiki/Special:UserLogin?uselayout=standard')
      cy.waitForIndicators()
      // Open Toolbox dropdown.
      cy.get('.p-tb-dropdown')
        .click()
        .get('.dropdown-menu.show')
        .should('be.visible')
    })

    it('Count', () => {
      // Issue: https://github.com/ProfessionalWiki/chameleon/issues/225
      cy.get('.p-tb-dropdown .dropdown-menu.show')
        .children()
        .should('have.length', 2)
    })

    it('Special pages', () => {
      cy.get('#t-specialpages').should('be.visible')
    })

    it('Printable version', () => {
      cy.get('#t-print').should('be.visible')
    })
  })
})
