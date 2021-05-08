describe('Component: NavbarHorizontal: SearchBar', () => {
  context('Suggestions', () => {
    before(() => {
      cy.visit('/wiki/Main_Page?uselayout=standard')
      cy.get('.smw-entity-examiner').should('not.exist')
      cy.get('#searchInput').type('Special:Se')
    })

    it('Count', () => {
      cy.get('.suggestions-results').children().should('have.length', 3)
    })

    it('Special:Search', () => {
      cy.get('.suggestions-results')
        .contains('Special:Search')
        .should('be.visible')
    })

    it('Special:SearchByProperty', () => {
      cy.get('.suggestions-results')
        .contains('Special:SearchByProperty')
        .should('be.visible')
    })

    it('Special:SemanticMediaWiki', () => {
      cy.get('.suggestions-results')
        .contains('Special:SemanticMediaWiki')
        .should('be.visible')
    })

    it('Containing', () => {
      cy.get('.suggestions > .mw-searchSuggest-link').within((link) => {
        cy.wrap(link).contains('containing...')
        cy.wrap(link).contains('Special:Se')
      })
    })
  })

  context('Search', () => {
    beforeEach(() => {
      cy.visit('/wiki/Main_Page?uselayout=standard')
      cy.get('.smw-entity-examiner').should('not.exist')
    })

    it('Submit', () => {
      cy.get('#searchInput').type('Chameleon')
      cy.get('#searchGoButton').click()
      cy.url().should('include', '/wiki/Chameleon')
    })

    it('Suggestion', () => {
      cy.get('#searchInput').type('Chameleon')
      cy.get('.suggestions-result').contains('Chameleon').click()
      cy.url().should('include', '/wiki/Chameleon')
    })
  })
})
