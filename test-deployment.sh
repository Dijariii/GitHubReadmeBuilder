#!/bin/bash

# Test Deployment Script
# This script tests the build process and verifies the build output for Vercel deployment

# Set up color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== GitHub README Generator Deployment Test ===${NC}"
echo -e "${BLUE}Testing build process and verifying output...${NC}"
echo ""

# Step 1: Clean the dist directory if it exists
if [ -d "dist" ]; then
  echo -e "${YELLOW}Cleaning existing dist directory...${NC}"
  rm -rf dist
fi

# Step 2: Run the build
echo -e "${BLUE}Building the project...${NC}"
node vercel-build.cjs
BUILD_RESULT=$?

if [ $BUILD_RESULT -ne 0 ]; then
  echo -e "${RED}✖ Build failed with exit code $BUILD_RESULT${NC}"
  exit 1
else
  echo -e "${GREEN}✓ Build completed successfully${NC}"
fi

# Step 3: Check if essential directories exist
echo ""
echo -e "${BLUE}Checking build output structure...${NC}"

if [ ! -d "dist" ]; then
  echo -e "${RED}✖ dist directory not found${NC}"
  exit 1
else
  echo -e "${GREEN}✓ dist directory exists${NC}"
fi

if [ ! -d "dist/assets" ]; then
  echo -e "${RED}✖ dist/assets directory not found${NC}"
  mkdir -p dist/assets
  echo -e "${YELLOW}  Created missing assets directory${NC}"
else
  echo -e "${GREEN}✓ dist/assets directory exists${NC}"
fi

if [ ! -d "dist/api" ]; then
  echo -e "${RED}✖ dist/api directory not found${NC}"
  mkdir -p dist/api
  echo -e "${YELLOW}  Created missing api directory${NC}"
else
  echo -e "${GREEN}✓ dist/api directory exists${NC}"
fi

# Step 4: Check if essential files exist
echo ""
echo -e "${BLUE}Checking essential files...${NC}"

if [ ! -f "dist/index.html" ]; then
  echo -e "${RED}✖ dist/index.html not found${NC}"
  echo -e "${YELLOW}  Copying fallback.html to dist/index.html...${NC}"
  cp fallback.html dist/index.html
else
  echo -e "${GREEN}✓ dist/index.html exists${NC}"
fi

if [ ! -f "dist/api/index.js" ]; then
  echo -e "${RED}✖ dist/api/index.js not found${NC}"
  exit 1
else
  echo -e "${GREEN}✓ dist/api/index.js exists${NC}"
fi

# Step 5: Check asset files
echo ""
echo -e "${BLUE}Checking asset files...${NC}"
CSS_COUNT=$(find dist/assets -name "*.css" | wc -l)
JS_COUNT=$(find dist/assets -name "*.js" | wc -l)

echo -e "  Found $CSS_COUNT CSS files"
echo -e "  Found $JS_COUNT JavaScript files"

if [ $CSS_COUNT -eq 0 ] || [ $JS_COUNT -eq 0 ]; then
  echo -e "${RED}✖ Missing essential asset files${NC}"
  echo -e "${YELLOW}  This may cause a blank page on deployment${NC}"
else
  echo -e "${GREEN}✓ Asset files look good${NC}"
fi

# Step 6: Check index.html for correct asset paths
echo ""
echo -e "${BLUE}Checking index.html for correct asset paths...${NC}"

if [ -f "dist/index.html" ]; then
  # Count relative vs absolute paths
  RELATIVE_PATHS=$(grep -c "\"\.\/" dist/index.html)
  ABSOLUTE_PATHS=$(grep -c "\"/" dist/index.html)
  
  echo -e "  Found $RELATIVE_PATHS relative paths (./) in index.html"
  echo -e "  Found $ABSOLUTE_PATHS absolute paths (/) in index.html"
  
  if [ $RELATIVE_PATHS -gt 0 ]; then
    echo -e "${YELLOW}⚠ Relative paths detected. Consider using absolute paths for Vercel${NC}"
  else
    echo -e "${GREEN}✓ No problematic relative paths detected${NC}"
  fi
  
  # Check if base tag exists
  if grep -q "<base href" dist/index.html; then
    echo -e "${GREEN}✓ Base tag found in index.html${NC}"
  else
    echo -e "${YELLOW}⚠ No base tag found in index.html${NC}"
  fi
fi

# Final summary
echo ""
echo -e "${BLUE}=== Deployment Test Summary ===${NC}"

if [ -f "dist/index.html" ] && [ -f "dist/api/index.js" ] && [ $CSS_COUNT -gt 0 ] && [ $JS_COUNT -gt 0 ]; then
  echo -e "${GREEN}✓ Build output looks valid for deployment${NC}"
  echo -e "${GREEN}✓ Deploy with: vercel --prod${NC}"
else
  echo -e "${RED}✖ Build output has issues that may cause deployment problems${NC}"
  echo -e "${YELLOW}  Review the logs above and fix any issues before deploying${NC}"
fi

echo ""
echo -e "${BLUE}See DEPLOY.md for detailed deployment instructions${NC}"