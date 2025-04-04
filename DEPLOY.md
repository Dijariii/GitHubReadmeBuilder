# Deploying to Vercel

This document provides comprehensive instructions for deploying the GitHub README Generator to Vercel.

## Prerequisites

- A Vercel account (can be created for free at [vercel.com](https://vercel.com))
- Your project must be hosted in a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### Option 1: Using the Vercel Dashboard

1. Log in to your Vercel account
2. Click "Add New..." → "Project" button on the dashboard
3. Import your Git repository
4. Configure the project:
   - **Framework Preset**: Leave as "Other" or select "Vite" if available
   - **Build Command**: `node vercel-build.cjs`
   - **Output Directory**: `dist`
   - **Install Command**: Leave default (`npm install` or `yarn install`)
5. Click "Deploy" button

### Option 2: Using Vercel CLI

1. Install Vercel CLI globally:
   ```
   npm install -g vercel
   ```

2. Log in to your Vercel account:
   ```
   vercel login
   ```

3. Navigate to your project directory and run:
   ```
   vercel
   ```

4. Follow the interactive prompts:
   - When asked about the build command, enter: `node vercel-build.cjs`
   - When asked about the output directory, enter: `dist`

## Troubleshooting

If you encounter any issues with your deployment, check the following:

1. **Build Errors**:
   - Verify that the `vercel-build.cjs` file exists in your repository
   - Check Vercel's build logs for any error messages
   - Make sure all dependencies are correctly installed

2. **Routing Issues**:
   - Ensure that `vercel.json` is correctly configured with the proper routes and rewrites
   - The updated configuration includes separate handling for static assets and API routes
   - Verify that cache headers are correctly set for optimal performance

3. **Blank Page/White Screen Issues**:
   - Check that the output directory structure matches what's expected in `dist`
   - Verify that all assets are properly referenced with correct paths
   - Ensure the base href is set correctly in index.html
   - Check for any 404 errors in the browser console for missing assets
   - Try clearing browser cache or using incognito mode to avoid cached resources
   - Verify JavaScript is enabled in your browser
   - If you see a completely white page:
     1. Inspect the page source to ensure it's not empty
     2. Check network tab for failed resource loads
     3. Try directly accessing `/assets/index.js` to validate asset deployment
     4. If needed, add a manual `fallback.html` file to your repository with absolute paths
     5. Validate the HTML generated in the `dist` folder has the correct asset paths

4. **API Errors**:
   - Ensure the API endpoints are correctly formatted
   - Check the serverless function setup in `dist/api/index.js`
   - Verify that the Express app is properly configured in the API handler
   - Check that all required server modules are bundled correctly in dist/server

5. **Source Code Displayed Instead of Rendered App**:
   - This is often caused by incorrect build configuration or missing files
   - Solution: 
     - Verify the build script is properly creating the dist folder with all required files
     - Check that `vercel.json` routes are properly configured
     - Ensure your `index.html` file correctly loads the bundled JavaScript with the right paths
     - Make sure MIME types are correctly set
     - Try manually triggering a new deployment after updating configuration

## Environment Variables

If your application requires environment variables:

1. Go to your project settings in the Vercel dashboard
2. Navigate to the "Environment Variables" section
3. Add your variables as key-value pairs
4. Be sure to include any API keys or secrets required by your application

## Custom Domains

To add a custom domain to your Vercel deployment:

1. Go to your project in the Vercel dashboard
2. Click on "Settings" → "Domains"
3. Add your domain and follow the instructions for DNS configuration

## Automatic Deployments

Vercel automatically deploys your application whenever changes are pushed to your Git repository. You can configure this behavior in:

1. Project Settings → Git
2. Under "Production Branch," set your main branch (e.g., `main` or `master`)
3. Optionally enable/disable preview deployments for pull requests

## Handling ESM vs CommonJS Issues

If you encounter module format errors during deployment, such as:
```
ReferenceError: require is not defined in ES module scope
```

This indicates a conflict between ES modules and CommonJS. We provide two build scripts:

1. `vercel-build.js` - ES Module version (uses `import/export`)
2. `vercel-build.cjs` - CommonJS version (uses `require/module.exports`)

By default, our deployment configuration in `vercel.json` uses the CommonJS version. If you need to use the ES Module version, ensure your `package.json` does not have `"type": "module"` or modify `vercel.json` to use `vercel-build.js` instead.

## API Integration

The application includes server-side API endpoints powered by Express. The deployment process:

1. Bundles server files into the `dist/server` directory
2. Creates a serverless function in `dist/api/index.js` that adapts Express to Vercel's serverless environment
3. Configures routing in `vercel.json` to direct API requests to this function

Make sure your application correctly references API endpoints with the proper base path.

---

If you encounter persistent issues, please contact [dejxhar@gmail.com](mailto:dejxhar@gmail.com) for assistance.