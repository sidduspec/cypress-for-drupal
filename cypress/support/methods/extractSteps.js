/**
 * tests/scripts/extractSteps.js
 * Scans step_definitions and keyword folders → ai_step_library.json
 */
const fs = require("fs-extra");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const STEP_DIR = path.join(ROOT, "step_definitions");
const KW_DIR = path.join(ROOT, "keywords");
const OUTPUT = path.resolve(__dirname, "../ai/ai_step_library.json");

const STEP_REGEX =
  /(Given|When|Then)\s*\(\s*['"`](.*?)['"`]\s*,\s*\(.*?\)\s*=>/gs;
const FUNC_REGEX = /function\s+([A-Za-z0-9_]+)\s*\(|([A-Za-z0-9_]+)\s*=\s*\(.*?\)\s*=>/g;

let steps = [];
let keywords = [];

function scanDir(dir, cb) {
  fs.readdirSync(dir).forEach((file) => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) scanDir(full, cb);
    else if (file.endsWith(".js")) cb(full);
  });
}

// Step definitions
scanDir(STEP_DIR, (file) => {
  const content = fs.readFileSync(file, "utf8");
  let match;
  while ((match = STEP_REGEX.exec(content))) {
    steps.push({
      type: match[1],
      pattern: match[2],
      file: path.relative(process.cwd(), file),
    });
  }
});

// Keywords
scanDir(KW_DIR, (file) => {
  const content = fs.readFileSync(file, "utf8");
  let match;
  while ((match = FUNC_REGEX.exec(content))) {
    const name = match[1] || match[2];
    keywords.push({
      name,
      file: path.relative(process.cwd(), file),
      category: file.includes("customKeywords") ? "custom" : "generic",
    });
  }
});

fs.ensureFileSync(OUTPUT);
fs.writeJsonSync(OUTPUT, { steps, keywords }, { spaces: 2 });
console.log(
  `✅ Extracted ${steps.length} steps and ${keywords.length} keywords → ${OUTPUT}`
);
