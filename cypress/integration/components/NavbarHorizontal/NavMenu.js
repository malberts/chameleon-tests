describe('Component: NavbarHorizontal: NavMenu', () => {
  before(() => {
    cy.visit('/wiki/Main_Page?uselayout=navhead')
    cy.get('.smw-entity-examiner').should('not.exist')
  })

  it('Count', () => {
    cy.get('div[id^="n-"]').should('have.length', 4)
  })

  it('Main page', () => {
    cy.get('#n-mainpage-description').should('be.visible')
  })

  it('Recent changes', () => {
    cy.get('#n-recentchanges').should('be.visible')
  })

  it('Random page', () => {
    cy.get('#n-randompage').should('be.visible')
  })

  it('Help about MediaWiki', () => {
    cy.get('#n-help-mediawiki').should('be.visible')
  })
})
