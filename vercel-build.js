// This is a simplified build script for Vercel
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Build the client
console.log('Building client...');
execSync('npx vite build', { stdio: 'inherit' });

// Build the server API
console.log('Building server API...');
execSync('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist/api', { stdio: 'inherit' });

// Ensure the api directory exists
if (!fs.existsSync('dist/api')) {
  fs.mkdirSync('dist/api', { recursive: true });
}

// Create a simple Vercel serverless function handler
const vercelHandler = `
// Serverless function for Vercel
module.exports = function(req, res) {
  // Redirect to the client-side React app
  res.redirect('/');
};

// For ES modules support
export default function handler(req, res) {
  return module.exports(req, res);
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
    <link rel="stylesheet" href="/assets/index.css" />
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