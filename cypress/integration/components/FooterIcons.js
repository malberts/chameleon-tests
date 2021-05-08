describe('Component: FooterIcons', () => {
  before(() => {
    cy.visit('/wiki/Main_Page')
    cy.get('.smw-entity-examiner').should('not.exist')
  })

  it('Count', () => {
    cy.get('#footer-icons').children().should('have.length', 2)
  })

  it('MediaWiki', () => {
    cy.get('#footer-icons img[alt="Powered by MediaWiki"]').should('be.visible')
  })

  it('Semantic MediaWiki', () => {
    cy.get('#footer-icons img[alt="Powered by Semantic MediaWiki"]').should(
      'be.visible'
    )
  })
})
