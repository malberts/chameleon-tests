/**
 * Tests related to MediaWiki HTML.
 */

const breakpoints = Cypress.env('breakpoints')

describe('MediaWiki', () => {
  before(() => {
    cy.visit('/wiki/Chameleon')
    cy.get('.smw-entity-examiner').should('not.exist')
  })

  breakpoints.forEach((breakpoint) => {
    let config = {
      viewportWidth: breakpoint.width,
      viewportHeight: breakpoint.height,
    }
    describe(breakpoint.name, config, () => {
      it('MediaWiki: Image: Thumb', () => {
        cy.get('#image-thumb > div').compareSnapshot(
          `Image_Thumb_${breakpoint.name}`
        )
      })

      it('MediaWiki: Image: Frame', () => {
        cy.get('#image-frame > div').compareSnapshot(
          `Image_Frame_${breakpoint.name}`
        )
      })

      it('MediaWiki: Image: Frameless', () => {
        cy.get('#image-frameless > a > img').compareSnapshot(
          `Image_Frameless_${breakpoint.name}`
        )
      })

      it('MediaWiki: Table: Wikitable', () => {
        cy.get('#table-wikitable > table').compareSnapshot(
          `Table_Wikitable_${breakpoint.name}`
        )
      })

      it('MediaWiki: Table: Plain', () => {
        cy.get('#table-plain > table').compareSnapshot(
          `Table_Plain_${breakpoint.name}`
        )
      })

      it('MediaWiki: Table: Bootstrap', () => {
        cy.get('#table-bootstrap > table').compareSnapshot(
          `Table_Bootstrap_${breakpoint.name}`
        )
      })

      it('MediaWiki: Headings', () => {
        cy.get('#headings').compareSnapshot(
          `Headings_${breakpoint.name}`
        )
      })

      it('MediaWiki: Typography: Paragraph', () => {
        cy.get('#type-paragraph').compareSnapshot(
          `Type_Paragraph_${breakpoint.name}`
        )
      })

      it('MediaWiki: Typography: Blockquote', () => {
        cy.get('#type-blockquote').compareSnapshot(
          `Type_Blockquote_${breakpoint.name}`
        )
      })

      it('MediaWiki: Typography: Preformatted', () => {
        cy.get('#type-preformatted').compareSnapshot(
          `Type_Preformatted_${breakpoint.name}`
        )
      })

      it('MediaWiki: Typography: Style', () => {
        cy.get('#type-style').compareSnapshot(
          `Type_Style_${breakpoint.name}`
        )
      })

      it('MediaWiki: Typography: Link', () => {
        cy.get('#type-link').compareSnapshot(
          `Type_Link_${breakpoint.name}`
        )
      })

      it('MediaWiki: List: Unordered', () => {
        cy.get('#list-ul').compareSnapshot(
          `List_Unordered_${breakpoint.name}`
        )
      })

      it('MediaWiki: List: Ordered', () => {
        cy.get('#list-ol').compareSnapshot(
          `List_Ordered_${breakpoint.name}`
        )
      })
    })
  })
})
