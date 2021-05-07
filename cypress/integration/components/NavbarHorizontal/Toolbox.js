const breakpoints = Cypress.env('breakpoints')

describe('Component: NavbarHorizontal: Toolbox', () => {
  before(() => {
    cy.visit('/wiki/Main_Page?uselayout=standard')
    cy.get('.smw-entity-examiner').should('not.exist')
  })

  it('Items', () => {
    cy.get('.p-tb-dropdown')
      .click()
      .get('.dropdown-menu.show')
      .should('be.visible')
      .children()
      .should('have.length.at.least', 8)
      .then((items) => {
        cy.wrap(items[0]).should('have.text', 'What links here')
        cy.wrap(items[1]).should('have.text', 'Related changes')
        cy.wrap(items[2]).should('have.text', 'Special pages')
        cy.wrap(items[3]).should('have.text', 'Printable version')
        cy.wrap(items[4]).should('have.text', 'Permanent link')
        cy.wrap(items[5]).should('have.text', 'Page information')
        cy.wrap(items[6]).should('have.text', 'Cite this page')
        cy.wrap(items[7]).should('have.text', 'Browse properties')
        // Issue: https://github.com/ProfessionalWiki/chameleon/issues/225
        cy.wrap(items).should('have.length', 8)
      })
  })
})
