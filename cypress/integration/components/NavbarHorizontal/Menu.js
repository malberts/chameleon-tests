describe('Component: NavbarHorizontal: Menu', () => {
  before(() => {
    cy.visit('/wiki/Main_Page?uselayout=navhead')
    cy.waitForIndicators()
  })

  it('Count', () => {
    cy.get(
      '#mw-navigation .collapse > .navbar-nav:first-child > .nav-item'
    ).should('have.length', 3)
  })

  it('Bootstrap', () => {
    cy.get(
      '#mw-navigation .collapse > .navbar-nav:first-child > .nav-item > .nav-link'
    )
      .contains('Bootstrap')
      .should('be.visible')
  })

  it('Bootstrap Submenu', () => {
    cy.get(
      '#mw-navigation .collapse > .navbar-nav:first-child > .nav-item > .nav-link'
    )
      .contains('Bootstrap')
      .click()
    cy.get('#mw-navigation .dropdown-menu.show').within((submenu) => {
      cy.wrap(submenu).contains('Examples')
      cy.wrap(submenu).contains('More Examples')
      cy.wrap(submenu).children().should('have.length', 2)
    })
  })

  it('Chameleon', () => {
    cy.get(
      '#mw-navigation .collapse > .navbar-nav:first-child > .nav-item > .nav-link'
    )
      .contains('Chameleon')
      .should('be.visible')
  })

  it('Testing', () => {
    cy.get(
      '#mw-navigation .collapse > .navbar-nav:first-child > .nav-item > .nav-link'
    )
      .contains('Testing')
      .should('be.visible')
  })
})
