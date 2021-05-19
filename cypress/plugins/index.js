const breakpoints = require('../fixtures/screens.json')
const getCompareSnapshotsPlugin = require('cypress-visual-regression/dist/plugin');

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = async (on, config) => {
  require('cypress-grep/src/plugin')(config)
  config.env.breakpoints = breakpoints
  getCompareSnapshotsPlugin(on, config);
  return config
}
