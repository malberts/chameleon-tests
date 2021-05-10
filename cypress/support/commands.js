const compareSnapshotCommand = require('cypress-visual-regression/dist/command')

compareSnapshotCommand()

Cypress.Commands.add('waitForIndicators', () => {
  cy.get('#mw-indicators')
    .should('exist')
    .find('.smw-entity-examiner')
    .should('not.exist')
})

Cypress.Commands.add('replaceTimestamps', () => {
  cy.contains('This page was last edited on ').then(($footer) => {
    cy.wrap($footer).invoke(
      'html',
      'This page was last edited on 10 April 2021, at 12:34.'
    )
  })
})

Cypress.Commands.add(
  'login',
  (username = 'AdminUser', password = 'AdminPassword') => {
    cy.visit('/wiki/Special:UserLogin')
    cy.get('[name="wpName"]').clear().type(username)
    cy.get('[name="wpPassword"]').clear().type(password)
    cy.get('#wpLoginAttempt').click()
  }
)

Cypress.Commands.add('addTalk', (user, subject, message) => {
  cy.visit(`/wiki/User_talk:${user}`)
  cy.waitForIndicators()
  cy.get('.ca-addsection').click()
  cy.get('#wpSummary').type(subject)
  cy.get('#wpTextbox1').type(message)
  cy.get('#wpSave').click()
})
