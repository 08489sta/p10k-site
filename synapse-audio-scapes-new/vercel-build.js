#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Log environment info
console.log('Current directory:', process.cwd());
console.log('Directory contents:', fs.readdirSync('.').join(', '));
console.log('Node version:', process.version);
console.log('NPM version:', execSync('npm --version').toString().trim());

// Ensure vite is globally available
try {
  console.log('Installing vite globally...');
  execSync('npm install -g vite', { stdio: 'inherit' });
  console.log('Vite installed globally');
} catch (error) {
  console.warn('Failed to install vite globally:', error.message);
}

// Install project dependencies
try {
  console.log('Installing project dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  console.log('Dependencies installed');
} catch (error) {
  console.error('Failed to install dependencies:', error.message);
  process.exit(1);
}

// Run the build using npx to ensure path resolution
try {
  console.log('Running build with npx...');
  execSync('npx vite build', { stdio: 'inherit' });
  console.log('Build completed successfully');
} catch (error) {
  console.error('Build failed with npx:', error.message);
  
  // Try alternative build approach with direct node_modules path
  try {
    console.log('Trying alternative build approach...');
    const vitePath = path.join(process.cwd(), 'node_modules', '.bin', 'vite');
    
    if (fs.existsSync(vitePath)) {
      console.log(`Vite found at: ${vitePath}`);
      execSync(`${vitePath} build`, { stdio: 'inherit' });
      console.log('Alternative build successful');
    } else {
      console.error('Vite not found in node_modules/.bin');
      
      // Last resort: try direct import
      console.log('Trying direct module import...');
      execSync('node -e "require(\'vite\').build()"', { stdio: 'inherit' });
    }
  } catch (finalError) {
    console.error('All build attempts failed:', finalError.message);
    process.exit(1);
  }
} 