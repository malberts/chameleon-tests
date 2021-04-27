const path = require('path')
const addContext = require('mochawesome/addContext')

import './commands'
import './assertions'

// Add screenshots to Mochawesome report.
const screenshotsFolder = Cypress.config('screenshotsFolder')
const baseFolder = Cypress.env('SNAPSHOT_BASE_DIRECTORY')
const diffFolder = Cypress.env('SNAPSHOT_DIFF_DIRECTORY')

Cypress.Screenshot.defaults({
  onAfterScreenshot(_el, details) {
    if (!details.path) {
      return
    }

    cy.once('test:after:run', (test) => {
      const normalizedScreenshotPath =
        'screenshots' + details.path.replace(screenshotsFolder, '')

      addContext(
        { test },
        {
          title: normalizedScreenshotPath.includes('(failed)')
            ? 'Failed screenshot'
            : 'Actual',
          value: normalizedScreenshotPath,
        }
      )

      // Add diff and expected for normal screenshots.
      if (!normalizedScreenshotPath.includes('(failed)')) {
        const basePath = path.join(
          baseFolder,
          details.specName,
          `${details.name}.png`.replace('-actual', '-base')
        )
        const diffPath = path.join(
          diffFolder,
          details.specName,
          `${details.name}.png`.replace('-actual', '-diff')
        )
        const normalizeBasePath =
          'screenshots' + basePath.replace(baseFolder, '')
        const normalizeDiffPath =
          'screenshots' + diffPath.replace(diffFolder, '')

        addContext(
          { test },
          {
            title: 'Diff',
            value: normalizeDiffPath,
          }
        )

        addContext(
          { test },
          {
            title: 'Expected',
            value: normalizeBasePath,
          }
        )
      }
    })
  },
})
