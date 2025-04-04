// This is a CommonJS version of the build script for Vercel
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Build the client
console.log('Building client...');
execSync('npx vite build', { stdio: 'inherit' });

// Build the server API
console.log('Building server API...');
execSync('npx esbuild server/index.ts server/routes.ts server/storage.ts shared/schema.ts --platform=node --packages=external --bundle --format=esm --outdir=dist/server', { stdio: 'inherit' });

// Make sure all required directories exist
if (!fs.existsSync('dist/assets')) {
  fs.mkdirSync('dist/assets', { recursive: true });
}

// Verify Vite built assets are available and copy if needed
if (fs.existsSync('dist/assets/index.js')) {
  console.log('Assets already exist in dist/assets');
} else {
  console.log('Copying assets to dist/assets...');
  
  // Try to copy from client/dist if available
  if (fs.existsSync('client/dist/assets')) {
    execSync('cp -r client/dist/assets/* dist/assets/', { stdio: 'inherit' });
    console.log('Copied assets from client/dist/assets');
  } else if (fs.existsSync('client/assets')) {
    execSync('cp -r client/assets/* dist/assets/', { stdio: 'inherit' });
    console.log('Copied assets from client/assets');
  } else {
    console.warn('Warning: Could not find assets to copy');
  }
}

// Ensure the api directory exists
if (!fs.existsSync('dist/api')) {
  fs.mkdirSync('dist/api', { recursive: true });
}

// Create a simple Vercel serverless function handler
const vercelHandler = `
import { createServer } from 'http';
import { parse } from 'url';
import express from 'express';
import compression from 'compression';
import { registerRoutes } from '../server/routes.js';

// Create Express app
const app = express();
app.use(compression());
app.use(express.json());

// Register API routes
registerRoutes(app);

// Export the Express API
export default function handler(req, res) {
  // Convert Vercel Edge Function request/response to Express
  return app(req, res);
}
`;

fs.writeFileSync('dist/api/index.js', vercelHandler, 'utf-8');

// Create an index.html file if it doesn't exist in the dist folder
if (!fs.existsSync('dist/index.html')) {
  try {
    // First try to copy from client/index.html if it exists
    if (fs.existsSync('client/index.html')) {
      const html = fs.readFileSync('client/index.html', 'utf-8');
      fs.writeFileSync('dist/index.html', html, 'utf-8');
      console.log('Copied index.html from client directory');
    } else {
      // Create a minimal fallback HTML file that loads assets
      const fallbackHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>GitHub README Generator</title>
    <!-- Important: Base tag must come before any relative URLs -->
    <base href="/" />
    <link rel="stylesheet" href="/assets/index.css" />
    <!-- Add fallback meta tags -->
    <meta name="description" content="GitHub README Generator - Create beautiful GitHub profile READMEs with ease" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/index.js"></script>
  </body>
</html>`;
      fs.writeFileSync('dist/index.html', fallbackHtml, 'utf-8');
      console.log('Created fallback index.html');
    }
  } catch (error) {
    console.error('Error handling index.html:', error);
  }
}

console.log('Build complete!');