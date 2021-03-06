describe('Component: NavbarHorizontal: Logo', () => {
  before(() => {
    cy.visit('/wiki/Main_Page?uselayout=navhead')
    cy.waitForIndicators()
  })

  it('Default', () => {
    cy.get('#p-logo img')
      .should('have.attr', 'src', '/w/resources/assets/wiki.png')
      .should('have.attr', 'alt', 'Chameleon Tests')
  })

  it('Navigate to Main Page', () => {
    cy.get('#p-logo img').click()
    cy.url().should('contain', '/wiki/Main_Page')
  })
})
