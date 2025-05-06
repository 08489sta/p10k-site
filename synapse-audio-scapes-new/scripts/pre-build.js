const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Check if vite is installed
try {
  const vitePath = path.resolve('./node_modules/.bin/vite');
  
  if (!fs.existsSync(vitePath)) {
    console.log('Vite not found, installing...');
    execSync('npm install vite@latest @vitejs/plugin-react-swc@latest', { stdio: 'inherit' });
  } else {
    console.log('Vite is already installed.');
  }
} catch (error) {
  console.error('Error checking/installing Vite:', error);
  process.exit(1);
} 