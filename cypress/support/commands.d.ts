declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Replaces dynamic timestamps on the page with fixed values.
     * @example
     * cy.replaceTimestamps()
     */
    replaceTimestamps(): Chainable<any>
  }
}
