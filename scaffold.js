/** @type {import('simple-scaffold').ScaffoldConfigFile} */
module.exports = (config) => {
    console.log("Config:", config)
    return {
      cypress: {
        templates: ["node-modules/specbee-cypress"],
        output: "./drupal-cypress",
      },
    }
  }
  