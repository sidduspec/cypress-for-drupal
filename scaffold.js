/** @type {import('simple-scaffold').ScaffoldConfigFile} */
module.exports = (config) => {
    console.log("Config:", config)
    return {
      cypress: {
        templates: ["node_modules/specbee-cypress"],
        output: "../../test",
      }
    }
  }
  