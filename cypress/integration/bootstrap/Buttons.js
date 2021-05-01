/**
 * Tests related to Bootstrap components provided by the BootstrapExamples extension.
 */

const breakpoints = Cypress.env('breakpoints')

describe('Bootstrap: Buttons', () => {
  breakpoints.forEach((breakpoint) => {
    let config = {
      viewportWidth: breakpoint.width,
      viewportHeight: breakpoint.height,
    }
    describe(breakpoint.name, config, () => {
      before(() => {
        cy.visit('/wiki/Special:BootstrapExamples')
        cy.get('.smw-entity-examiner').should('not.exist')
        cy.get('#bootstrap-version').should('not.be.empty')
      })

      it('Buttons: Normal', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(2) > div > div:nth-child(1) > .bs-component:nth-child(1)'
        ).compareSnapshot(`Buttons_Normal_${breakpoint.name}`)
      })

      it('Buttons: Disabled', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(2) > div > div:nth-child(1) > .bs-component:nth-child(2)'
        ).compareSnapshot(`Buttons_Disabled_${breakpoint.name}`)
      })

      it('Buttons: Outline', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(2) > div > div:nth-child(1) > .bs-component:nth-child(3)'
        ).compareSnapshot(`Buttons_Outline_${breakpoint.name}`)
      })

      it('Buttons: Dropdown', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(2) > div > div:nth-child(1) > .bs-component:nth-child(4)'
        ).compareSnapshot(`Buttons_Dropdown${breakpoint.name}`)
      })

      it('Buttons: Dropdown interaction', () => {
        cy.get('.bs-docs-section:nth-of-type(2)').within((section) => {
          cy.get('#btnGroupDrop1').click()
          cy.get('[aria-labelledby="btnGroupDrop1"]')
            .contains('Dropdown link')
            .should('be.visible')

          cy.get('#btnGroupDrop1').click()
          cy.get('[aria-labelledby="btnGroupDrop1"]')
            .contains('Dropdown link')
            .should('not.be.visible')
        })
      })

      it('Buttons: Sizes', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(2) > div > div:nth-child(1) > .bs-component:nth-child(5)'
        ).compareSnapshot(`Buttons_Sizes_${breakpoint.name}`)
      })

      it('Buttons: Block', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(2) > div > div:nth-child(2) > .bs-component:nth-child(1)'
        ).compareSnapshot(`Buttons_Block_${breakpoint.name}`)
      })

      it('Buttons: Check', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(2) > div > div:nth-child(2) > .bs-component:nth-child(2)'
        ).compareSnapshot(`Buttons_Check_${breakpoint.name}`)
      })

      it('Buttons: Radio', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(2) > div > div:nth-child(2) > .bs-component:nth-child(3)'
        ).compareSnapshot(`Buttons_Radio_${breakpoint.name}`)
      })

      it('Buttons: Vertical', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(2) > div > div:nth-child(2) > .bs-component:nth-child(4)'
        ).compareSnapshot(`Buttons_Vertical_${breakpoint.name}`)
      })

      it('Buttons: Group', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(2) > div > div:nth-child(2) > .bs-component:nth-child(5)'
        ).compareSnapshot(`Buttons_Group_${breakpoint.name}`)
      })

      it('Buttons: Toolbar', () => {
        cy.get(
          '.bs-docs-section:nth-of-type(2) > div > div:nth-child(2) > .bs-component:nth-child(6)'
        ).compareSnapshot(`Buttons_Toolbar_${breakpoint.name}`)
      })
    })
  })
})
