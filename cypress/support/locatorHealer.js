import * as tf from '@tensorflow/tfjs-node';

const modelPath = 'localstorage://locator-model';
let model = null;

// Load the AI model
const loadModel = async () => {
  if (!model) {
    console.log('Loading AI locator model...');
    model = await tf.loadLayersModel(modelPath);
  }
  return model;
};

// Preprocess attributes into input format for the model
const preprocessAttributes = (attributes) => {
  return Object.values(attributes)
    .join(' ')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, ''); // Remove special characters
};

// Predict the locator using the AI model
export const healLocator = async (attributes) => {
  try {
    const model = await loadModel();
    const input = preprocessAttributes(attributes);

    // Convert input to tensor
    const inputTensor = tf.tensor2d([input], [1, input.length]);

    // Predict locator
    const prediction = model.predict(inputTensor);
    const locator = prediction.arraySync()[0];

    console.log(`AI-predicted locator: ${locator}`);
    return locator || null;
  } catch (error) {
    console.error('Error during locator healing:', error);
    return null;
  }
};
