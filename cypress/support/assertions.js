/**
 * Asserts that an element is visible in the current viewport.
 *
 * @param {*} _chai
 * @param {*} utils
 * @see https://github.com/cypress-io/cypress/issues/877#issuecomment-538708750
 */
const isInViewport = (_chai, utils) => {
  function assertIsInViewport(options) {
    const subject = this._obj

    const bottom = Cypress.$(cy.state('window')).height()
    const rect = subject[0].getBoundingClientRect()

    this.assert(
      (rect.top >= 0 && rect.bottom <= bottom),
      'expected #{this} to be in viewport',
      'expected #{this} to not be in viewport',
      this._obj
    )
  }

  _chai.Assertion.addMethod('inViewport', assertIsInViewport)
}

chai.use(isInViewport)
