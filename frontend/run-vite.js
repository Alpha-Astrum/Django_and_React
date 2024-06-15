import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve path to Vite binary
const vitePath = path.resolve(__dirname, 'node_modules', 'vite', 'bin', 'vite.js');

// Get arguments passed to the script
const args = process.argv.slice(2);

(async () => {
  try {
    // Spawn Vite process
    const viteProcess = spawn('node', [vitePath, ...args], { stdio: 'inherit' });

    // Handle close event
    viteProcess.on('close', (code) => {
      if (code !== 0) {
        console.error(`Vite process exited with code ${code}`);
        process.exit(code);
      } else {
        console.log('Vite process completed successfully.');
      }
    });

    // Handle error event
    viteProcess.on('error', (error) => {
      console.error('Error spawning Vite process:', error);
      process.exit(1);
    });
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
})();
