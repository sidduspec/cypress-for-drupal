const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const ensureDirectoryExists = (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
};

// Function to run Lighthouse for a single URL
const runLighthouse = (url, outputPath) => {
  return new Promise((resolve, reject) => {
    const outputDir = path.dirname(outputPath); // Extract the directory path from outputPath
    ensureDirectoryExists(outputDir);
    // Using 'npx' to run Lighthouse locally
    exec(`npx lighthouse ${url} --output html --output-path=${outputPath} --chrome-flags="--headless"`, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error running Lighthouse for ${url}:`, stderr);
        return reject(err);
      }
      resolve(stdout);
    });
  });
};

const runLighthouseForUrls = async (urls) => {
  for (const url of urls) {
    const outputPath = `cypress/reports/lighthouse-reports/${url.replace(/[^a-zA-Z]/g, '_')}-report.html`;
    try {
      await runLighthouse(url, outputPath);
      console.log(`Lighthouse report generated for ${url}: ${outputPath}`);
    } catch (error) {
      console.error(`Failed to generate report for ${url}`, error);
    }
  }
  return null;
};

module.exports = {
  runLighthouse,
  runLighthouseForUrls
};
