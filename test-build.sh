#!/bin/bash

# Test the build process locally
echo "Testing Vercel build process locally..."

# Clean up any existing dist directory
if [ -d "dist" ]; then
  echo "Removing existing dist directory..."
  rm -rf dist
fi

# Run the build script
echo "Running vercel-build.js..."
node vercel-build.js

# Check if build was successful
if [ $? -eq 0 ]; then
  echo "Build completed successfully!"
  echo "You can inspect the dist directory to verify the output."
  
  # Count files in dist directory
  FILE_COUNT=$(find dist -type f | wc -l)
  echo "Total files in dist directory: $FILE_COUNT"
  
  # List key files
  echo "Key files in dist directory:"
  find dist -type f -name "index.html" -o -name "index.js" | sort
  
  # Success message
  echo ""
  echo "If everything looks good, you can deploy with:"
  echo "  vercel --prod"
else
  echo "Build failed! Check the error messages above."
fi