import { build } from 'vite';
import { resolve } from 'path';

const __dirname = new URL('.', import.meta.url).pathname;

async function main() {
  try {
    await build({
      root: resolve(__dirname),
      build: {
        outDir: 'dist',
      },
    });
    console.log('Build completed successfully');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

main(); 