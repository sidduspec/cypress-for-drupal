const brain = require('brain.js');
const fs = require('fs');

// Training dataset
const dataset = [
  {
    input: { id: 1, class: 0, text: 0, name: 0, 'data-drupal-selector': 0 },
    output: { locator: 1 },
  },
  {
    input: { id: 0, class: 1, text: 0, name: 0, 'data-drupal-selector': 0 },
    output: { locator: 0.8 },
  },
  {
    input: { id: 0, class: 0, text: 1, name: 0,    },
    output: { locator: 0.5 },
  },
  {
    input: { id: 0, class: 0, text: 0, name: 1 },
    output: { locator: 0.9 },
  },
];

// Train the model
const net = new brain.NeuralNetwork();
net.train(dataset, {
  iterations: 2000,
  log: true,
  logPeriod: 100,
  errorThresh: 0.005,
});

// Save the model
const model = net.toJSON();
fs.writeFileSync('cypress/support/models/locator-model.json', JSON.stringify(model, null, 2));
console.log('Model saved to cypress/support/models/locator-model.json');
