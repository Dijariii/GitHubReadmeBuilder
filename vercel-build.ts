import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Build the client
console.log('Building client...');
execSync('vite build', { stdio: 'inherit' });

// Build the server API
console.log('Building server API...');
execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist/api', { stdio: 'inherit' });

// Copy necessary files for Vercel deployment
console.log('Preparing for Vercel deployment...');

// Ensure the api directory exists
if (!fs.existsSync('dist/api')) {
  fs.mkdirSync('dist/api', { recursive: true });
}

// Create Vercel serverless function handler
const vercelHandler = `
import { createServer } from 'http';
import app from './index.js';

// Create HTTP server
const server = createServer(app);

// Export for Vercel
export default app;
`;

// Write handler to file
fs.writeFileSync('dist/api/index.js', vercelHandler, 'utf-8');

// Create a _redirects file for Netlify (in case it's used)
fs.writeFileSync('dist/_redirects', '/* /index.html 200', 'utf-8');

console.log('Build complete!');