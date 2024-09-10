const { exec } = require('child_process');

exec('npm run scaffold:my:cypress', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing scaffold:my:cypress script: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`Error output: ${stderr}`);
    return;
  }

  console.log(`Scaffold script output: ${stdout}`);
});
