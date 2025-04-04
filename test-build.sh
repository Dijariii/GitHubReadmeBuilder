#!/bin/bash

# Test the build process locally with both ESM and CommonJS versions
echo "Testing Vercel build process locally..."

# Determine which build script to use
if [ "$1" == "cjs" ]; then
  BUILD_SCRIPT="vercel-build.cjs"
  echo "Using CommonJS build script (vercel-build.cjs)"
elif [ "$1" == "esm" ]; then
  BUILD_SCRIPT="vercel-build.js"
  echo "Using ES Module build script (vercel-build.js)"
else
  # Default to the one specified in vercel.json
  BUILD_SCRIPT="vercel-build.cjs"
  echo "Using default build script from vercel.json (vercel-build.cjs)"
  echo "You can specify which build script to test with:"
  echo "  ./test-build.sh esm  # Test ES Module version"
  echo "  ./test-build.sh cjs  # Test CommonJS version"
  echo ""
fi

# Clean up any existing dist directory
if [ -d "dist" ]; then
  echo "Removing existing dist directory..."
  rm -rf dist
fi

# Run the build script
echo "Running $BUILD_SCRIPT..."
node $BUILD_SCRIPT

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