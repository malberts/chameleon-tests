const compareSnapshotCommand = require('cypress-visual-regression/dist/command');

compareSnapshotCommand();

Cypress.Commands.add('replaceTimestamps', () =>{
  cy.contains('This page was last edited on ').then(($footer) => {
    cy.wrap($footer).invoke('html', 'This page was last edited on 10 April 2021, at 12:34.')
  })
})
