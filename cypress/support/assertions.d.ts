declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Custom Chai assertion that checks if an element is visible in the current viewport.
     *
     * @example
    ```
    expect('foo').to.be.inViewport()
    cy.wrap('foo').should('be.inViewport')
    ```
     */
    (chainer: 'be.inViewport'): Chainable<Subject>

    /**
     * Custom Chai assertion that checks if an element is not visible in the current viewport.
     *
     * @example
    ```
    expect('foo').to.not.be.inViewport()
    cy.wrap('foo').should('not.be.inViewport')
    ```
     */
    (chainer: 'not.be.inViewport'): Chainable<Subject>
  }
}
