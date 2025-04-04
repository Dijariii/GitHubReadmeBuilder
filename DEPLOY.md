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
   - **Build Command**: `node vercel-build.js`
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
   - When asked about the build command, enter: `node vercel-build.js`
   - When asked about the output directory, enter: `dist`

## Troubleshooting

If you encounter any issues with your deployment, check the following:

1. **Build Errors**:
   - Verify that the `vercel-build.js` file exists in your repository
   - Check Vercel's build logs for any error messages

2. **Routing Issues**:
   - Ensure that `vercel.json` is correctly configured with the proper rewrites and redirects
   - Make sure both the client and API are being built correctly

3. **Blank Page/404 Errors**:
   - Check that the output directory structure matches what's expected in `dist`
   - Verify that the client-side routing is properly configured

4. **API Errors**:
   - Ensure the API endpoints are correctly formatted
   - Check the serverless function setup in `dist/api/index.js`

5. **Source Code Displayed Instead of Rendered App**:
   - This is often caused by incorrect build configuration or missing files
   - Solution: 
     - Verify the `vercel-build.js` file is properly creating the dist folder
     - Check that `vercel.json` rewrites are properly configured
     - Ensure your `index.html` file correctly loads the bundled JavaScript
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

---

If you encounter persistent issues, please contact [dejxhar@gmail.com](mailto:dejxhar@gmail.com) for assistance.