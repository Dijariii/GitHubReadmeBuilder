# Deployment Scripts Guide

This document explains the additional deployment scripts provided to help troubleshoot and verify Vercel deployments.

## Overview

We've created additional scripts to help diagnose and fix the "blank white page" issue that can occur during Vercel deployments. These scripts help ensure your build output is properly configured and contains all the necessary files.

## Available Scripts

### 1. `test-deployment.sh`

This bash script tests the build process and verifies the output structure before deploying to Vercel.

To use it:
```bash
./test-deployment.sh
```

The script will:
1. Clean any existing build output
2. Run the Vercel build process
3. Check for essential directories and files
4. Verify asset paths in index.html
5. Provide a summary of potential issues

### 2. `vercel-check.js`

This Node.js script performs detailed checks on the build output to identify common deployment issues.

To use it:
```bash
node vercel-check.js
```

The script will:
1. Check for all required directories and files
2. Analyze HTML for proper asset references
3. Verify Vercel configuration in vercel.json
4. Provide detailed feedback on potential issues

### 3. `fallback.html`

This is a fallback HTML file that can be used as a reference or replacement if your build process fails to generate a proper index.html.

It includes:
- Properly structured HTML with absolute asset paths
- Fallback styling in case CSS fails to load
- Troubleshooting information for users
- JavaScript to detect when the app loads successfully

## Fixing Blank White Page Issues

If you encounter a blank white page after deploying to Vercel:

1. Run the test scripts to identify issues:
   ```bash
   ./test-deployment.sh
   node vercel-check.js
   ```

2. Check if assets are being correctly generated and referenced
   - Make sure asset paths start with `/` not `./`
   - Ensure the `<base href="/">` tag is present in index.html
   - Verify that the vercel.json rewrites are correctly configured

3. If needed, use the fallback.html as a replacement:
   ```bash
   cp fallback.html dist/index.html
   ```

4. Redeploy to Vercel with the fixed configuration
   ```bash
   vercel --prod
   ```

## Additional Resources

For more detailed deployment instructions, see [DEPLOY.md](./DEPLOY.md).

If you encounter persistent issues, please contact [dejxhar@gmail.com](mailto:dejxhar@gmail.com) for assistance.
