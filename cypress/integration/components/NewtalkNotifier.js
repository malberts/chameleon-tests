describe('Component: NewtalkNotifier', () => {
  it('Newtalk Notifier', () => {
    cy.visit('/wiki/Main_Page?uselayout=standard')
    cy.get('.smw-entity-examiner').should('not.exist')

    // No logged out notification
    cy.get('.usermessage').should('not.exist')

    // Create a message
    cy.login('AnotherUser', 'AnotherPassword')
    cy.addTalk('AdminUser', 'Test NewtalkNotifier', 'Chameleon')

    // Logout
    cy.get('.pt-logout').click()

    // Still no logged out notification
    cy.visit('/wiki/Main_Page?uselayout=standard')
    cy.get('.smw-entity-examiner').should('not.exist')
    cy.get('.usermessage').should('not.exist')

    cy.login()

    // Notification appears
    cy.visit('/wiki/Main_Page?uselayout=standard')
    cy.get('.smw-entity-examiner').should('not.exist')
    cy.get('.usermessage').should('be.visible')

    // View message
    cy.get('.usermessage a:nth-of-type(1)').click()

    // Notification no longer visible
    cy.visit('/wiki/Main_Page?uselayout=standard')
    cy.get('.smw-entity-examiner').should('not.exist')
    cy.get('.usermessage').should('not.exist')
  })
})
