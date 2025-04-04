import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Build the client
console.log('Building client...');
execSync('vite build', { stdio: 'inherit' });

// Build the server API
console.log('Building server API...');
execSync('esbuild api/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist/api', { stdio: 'inherit' });

// Copy necessary files for Vercel deployment
console.log('Preparing for Vercel deployment...');

// Ensure the api directory exists
if (!fs.existsSync('dist/api')) {
  fs.mkdirSync('dist/api', { recursive: true });
}

// Create Vercel serverless function handler
const vercelHandler = `
import app from './index.js';
import { createServer } from 'http';

const server = createServer(app);
export default server;
`;

fs.writeFileSync('dist/api/index.js', vercelHandler, 'utf-8');

console.log('Build complete!');