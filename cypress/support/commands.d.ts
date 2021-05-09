declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Replace dynamic timestamps on the page with fixed values.
     * @example
     * cy.replaceTimestamps()
     */
    replaceTimestamps(): Chainable<any>

    /**
     * Log in. Defaults to the admin user if not specified.
     * @example
     * cy.login() // Default AdminUser
     * cy.login('AnotherUser', 'AnotherPassword')
     *
     * @param username
     * @param password
     */
    login(username?: string, password?: string): Chainable<any>

    /**
     * Add a message to a user's talk page.
     * @example
     * cy.addTalk('SomeUser', 'Hi', 'Bye')
     *
     * @param user
     * @param subject
     * @param message
     */
    addTalk(user: string, subject: string, message: string): Chainable<any>
  }
}
