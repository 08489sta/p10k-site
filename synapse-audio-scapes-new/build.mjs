import { execSync } from 'child_process';
import fs from 'fs';

// Log the environment for debugging
console.log('Node version:', process.version);
console.log('Current directory:', process.cwd());
console.log('Directory contents:', fs.readdirSync('.'));

try {
  // Install dependencies including devDependencies
  console.log('Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  // List installed packages to verify
  console.log('Installed packages:');
  execSync('npm list vite', { stdio: 'inherit' });
  
  // Run the build
  console.log('Running build...');
  execSync('npx vite build', { stdio: 'inherit' });
  
  console.log('Build completed successfully');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
} 