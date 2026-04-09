#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying setup...\n');

const checks = [];

// Check .env.example exists
if (fs.existsSync(path.join(__dirname, '../.env.example'))) {
  checks.push('✅ .env.example found');
} else {
  checks.push('❌ .env.example missing');
}

// Check vercel.json exists
if (fs.existsSync(path.join(__dirname, '../vercel.json'))) {
  checks.push('✅ vercel.json found');
} else {
  checks.push('❌ vercel.json missing');
}

// Check key API files exist
const apiFiles = [
  'app/api/auth/send-otp/route.ts',
  'app/api/auth/verify-otp/route.ts',
  'app/verify-phone/page.tsx',
];

apiFiles.forEach((file) => {
  if (fs.existsSync(path.join(__dirname, '..', file))) {
    checks.push(`✅ ${file} found`);
  } else {
    checks.push(`❌ ${file} missing`);
  }
});

// Check documentation
const docs = [
  'docs/WHATSAPP_SETUP.md',
  'docs/DEPLOYMENT.md',
];

docs.forEach((file) => {
  if (fs.existsSync(path.join(__dirname, '..', file))) {
    checks.push(`✅ ${file} found`);
  } else {
    checks.push(`❌ ${file} missing`);
  }
});

// Display results
checks.forEach((check) => console.log(check));

// Check environment variables
console.log('\n📋 Required environment variables for Vercel:\n');
console.log('1. DATABASE_URL');
console.log('2. SESSION_SECRET');
console.log('3. WHATSAPP_BUSINESS_ACCOUNT_TOKEN');
console.log('4. WHATSAPP_PHONE_NUMBER_ID');

console.log('\n✨ Setup verification complete!');
