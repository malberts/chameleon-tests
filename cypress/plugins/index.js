const getCompareSnapshotsPlugin = require('cypress-visual-regression/dist/plugin');

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  getCompareSnapshotsPlugin(on, config);
}
