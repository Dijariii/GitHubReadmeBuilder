#!/usr/bin/env node

/**
 * Vercel Build Check Script
 * 
 * This script inspects the build output directory to ensure all necessary
 * files and folders are present and properly configured for Vercel deployment.
 * 
 * Run this with: node vercel-check.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Build output directory
const distDir = path.join(__dirname, 'dist');
const assetsDir = path.join(distDir, 'assets');
const apiDir = path.join(distDir, 'api');
const serverDir = path.join(distDir, 'server');

// Check functions
function checkDirectory(dir, label) {
  if (!fs.existsSync(dir)) {
    console.error(`❌ ${label} directory not found: ${dir}`);
    return false;
  }
  console.log(`✅ ${label} directory exists`);
  return true;
}

function checkFile(file, label) {
  if (!fs.existsSync(file)) {
    console.error(`❌ ${label} file not found: ${file}`);
    return false;
  }
  console.log(`✅ ${label} file exists`);
  return true;
}

function checkAssetReferences(htmlFile) {
  if (!fs.existsSync(htmlFile)) return false;
  
  const content = fs.readFileSync(htmlFile, 'utf-8');
  
  // Check for relative vs absolute paths
  const relativeAssetPaths = (content.match(/src="\.\//g) || []).length;
  const absoluteAssetPaths = (content.match(/src="\//g) || []).length;
  
  console.log(`📊 HTML Asset References:`);
  console.log(`   - Relative paths (./) found: ${relativeAssetPaths}`);
  console.log(`   - Absolute paths (/) found: ${absoluteAssetPaths}`);
  
  // Check if <base> tag exists
  const hasBaseTag = content.includes('<base href');
  console.log(`   - Base tag present: ${hasBaseTag ? 'Yes' : 'No'}`);
  
  return true;
}

console.log('🔍 Checking Vercel deployment build output...\n');

// Check main directories
const distExists = checkDirectory(distDir, 'Build output');
if (!distExists) {
  console.error('❌ Build output directory not found. Run the build script first.');
  process.exit(1);
}

checkDirectory(assetsDir, 'Assets');
checkDirectory(apiDir, 'API');
checkDirectory(serverDir, 'Server');

// Check essential files
const indexHtml = path.join(distDir, 'index.html');
const indexJs = path.join(assetsDir, 'index.js');
const indexCss = path.join(assetsDir, 'index.css');
const apiHandler = path.join(apiDir, 'index.js');

checkFile(indexHtml, 'HTML entry point');
checkFile(indexJs, 'JavaScript bundle');
checkFile(indexCss, 'CSS styles');
checkFile(apiHandler, 'API handler');

// Check asset references in index.html
if (checkFile(indexHtml, 'HTML entry point')) {
  checkAssetReferences(indexHtml);
}

// Check vercel.json
const vercelJson = path.join(__dirname, 'vercel.json');
if (checkFile(vercelJson, 'Vercel configuration')) {
  const vercelConfig = JSON.parse(fs.readFileSync(vercelJson, 'utf-8'));
  console.log('📋 Vercel Configuration:');
  console.log(`   - Build Command: ${vercelConfig.buildCommand || '(not set)'}`);
  console.log(`   - Output Directory: ${vercelConfig.outputDirectory || '(not set)'}`);
  console.log(`   - Rewrites: ${vercelConfig.rewrites ? vercelConfig.rewrites.length : 0} rules`);
  
  // Check for asset route handling
  const hasAssetRewrite = vercelConfig.rewrites && 
    vercelConfig.rewrites.some(r => r.source && r.source.includes('/assets/'));
  
  console.log(`   - Assets rewrite rule: ${hasAssetRewrite ? 'Yes' : 'No'}`);
}

console.log('\n✨ Check complete! Review any warnings or errors above.');
console.log('📝 For deployment troubleshooting, see DEPLOY.md');