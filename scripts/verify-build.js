#!/usr/bin/env node

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const distDir = 'dist';
const requiredFiles = [
  'index.html',
  '_astro',
  'favicon.svg'
];

const requiredEnvVars = [
  'PUBLIC_INSTANT_APP_ID',
  'PUBLIC_R2_ACCOUNT_ID',
  'PUBLIC_R2_ACCESS_KEY_ID',
  'PUBLIC_R2_SECRET_ACCESS_KEY',
  'PUBLIC_R2_BUCKET_NAME',
  'PUBLIC_R2_REGION',
  'PUBLIC_R2_ENDPOINT',
  'PUBLIC_PLATFORM_DOMAIN'
];

console.log('🔍 Verifying build...\n');

// Check if dist directory exists
if (!existsSync(distDir)) {
  console.error('❌ Build directory not found. Run `npm run build` first.');
  process.exit(1);
}

// Check required files
let missingFiles = [];
for (const file of requiredFiles) {
  const filePath = join(distDir, file);
  if (!existsSync(filePath)) {
    missingFiles.push(file);
  }
}

if (missingFiles.length > 0) {
  console.error('❌ Missing required files in build:');
  missingFiles.forEach(file => console.error(`   - ${file}`));
  process.exit(1);
}

// Check environment variables
let missingEnvVars = [];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    missingEnvVars.push(envVar);
  }
}

if (missingEnvVars.length > 0) {
  console.warn('⚠️  Missing environment variables:');
  missingEnvVars.forEach(envVar => console.warn(`   - ${envVar}`));
  console.warn('\nThese should be set in Cloudflare Pages dashboard.');
}

// Check if index.html contains the app ID placeholder
const indexPath = join(distDir, 'index.html');
const indexContent = readFileSync(indexPath, 'utf-8');

if (indexContent.includes('window.INSTANT_APP_ID')) {
  console.log('✅ InstantDB integration found in build');
} else {
  console.warn('⚠️  InstantDB integration not found in build');
}

console.log('\n✅ Build verification complete!');
console.log('\nNext steps:');
console.log('1. Set environment variables in Cloudflare Pages dashboard');
console.log('2. Deploy using: npm run deploy');
console.log('3. Or connect your Git repository to Cloudflare Pages');
