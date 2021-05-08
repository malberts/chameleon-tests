describe('Component: NavbarHorizontal: Logo', () => {
  before(() => {
    cy.visit('/wiki/Main_Page?uselayout=navhead')
    cy.get('.smw-entity-examiner').should('not.exist')
  })

  it('Default', () => {
    cy.get('#p-logo img')
      .should('have.attr', 'src', '/w/resources/assets/wiki.png')
      .should('have.attr', 'alt', 'Chameleon Tests')
  })
})
