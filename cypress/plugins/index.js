const breakpoints = require('../fixtures/screens.json')
const getCompareSnapshotsPlugin = require('cypress-visual-regression/dist/plugin');

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = async (on, config) => {
  config.env.breakpoints = breakpoints
  console.log('breakpoints', breakpoints)
  getCompareSnapshotsPlugin(on, config);
  return config
}
