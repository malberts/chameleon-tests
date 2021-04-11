declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Replaces dynamic timestamps on the page with fixed values.
     * @example
     * cy.replaceTimestamps()
     */
    replaceTimestamps(): Chainable<any>

    /**
     * Logs in. Defaults to the admin user if not specified.
     *
     * @param username
     * @param password
     */
    login(username?: string, password?: string): Chainable<any>
  }
}
