describe('Component: FooterPlaces', () => {
  before(() => {
    cy.visit('/wiki/Main_Page')
    cy.waitForIndicators()
  })

  it('Count', () => {
    cy.get('#footer-places').children().should('have.length', 3)
  })

  it('Privacy policy', () => {
    cy.get('#footer-places a[title="Chameleon Tests:Privacy policy"]').should(
      'be.visible'
    )
  })

  it('About', () => {
    cy.get('#footer-places a[title="Chameleon Tests:About"]').should(
      'be.visible'
    )
  })

  it('Disclaimers', () => {
    cy.get(
      '#footer-places a[title="Chameleon Tests:General disclaimer"]'
    ).should('be.visible')
  })
})
