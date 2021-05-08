describe('Component: FooterInfo', () => {
  it('Page: Last edited', () => {
    cy.visit('/wiki/Main_Page')
    cy.get('.smw-entity-examiner').should('not.exist')
    cy.get('#footer-info').should(
      'contain.text',
      'This page was last edited on'
    )
  })

  it('Special page', () => {
    cy.visit('/wiki/Special:UserLogin')
    cy.get('.smw-entity-examiner').should('not.exist')
    cy.get('#footer-info').should(
      'not.contain.text',
      'This page was last edited on'
    )
  })
})
