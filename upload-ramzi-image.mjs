#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

// Load environment variables
async function loadEnvFiles() {
  const envFiles = [
    path.join(process.cwd(), '.env.local'),
    path.join(process.cwd(), '.env.production'),
    path.join(process.cwd(), '.env'),
  ];

  for (const envFile of envFiles) {
    try {
      const content = await fs.readFile(envFile, 'utf8');
      const lines = content.split(/\r?\n/);

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        
        const separatorIndex = trimmed.indexOf('=');
        if (separatorIndex === -1) continue;
        
        const key = trimmed.slice(0, separatorIndex).trim();
        let value = trimmed.slice(separatorIndex + 1).trim();
        
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        
        if (!(key in process.env)) {
          process.env[key] = value;
        }
      }
    } catch {
      // Ignore missing env files
    }
  }
}

function applyCloudinaryUrlFallback() {
  const cloudinaryUrl = process.env.CLOUDINARY_URL;
  if (!cloudinaryUrl) return;

  try {
    const parsed = new URL(cloudinaryUrl);
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      process.env.CLOUDINARY_CLOUD_NAME = parsed.hostname.split('.')[0];
    }
    if (!process.env.CLOUDINARY_API_KEY) {
      process.env.CLOUDINARY_API_KEY = decodeURIComponent(parsed.username);
    }
    if (!process.env.CLOUDINARY_API_SECRET) {
      process.env.CLOUDINARY_API_SECRET = decodeURIComponent(parsed.password);
    }
  } catch {
    // Ignore malformed CLOUDINARY_URL
  }
}

async function uploadToCloudinary(filePath, publicId) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error('Missing Cloudinary credentials. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.');
  }

  const uploadEndpoint = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
  const fileBuffer = await fs.readFile(filePath);
  const form = new FormData();

  form.set('file', new Blob([fileBuffer], { type: 'image/png' }), path.basename(filePath));
  form.set('public_id', publicId);
  form.set('overwrite', 'true');
  form.set('invalidate', 'true');
  form.set('resource_type', 'image');

  const response = await fetch(uploadEndpoint, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`,
    },
    body: form,
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok || !payload?.secure_url) {
    throw new Error(`Cloudinary upload failed: ${payload?.error?.message || response.statusText}`);
  }

  return payload.secure_url;
}

async function main() {
  await loadEnvFiles();
  applyCloudinaryUrlFallback();

  const filePath = '/var/www/rnj/public/optimized/Ramzi-image.png';
  const folder = process.env.CLOUDINARY_FOLDER || 'rnj';
  const publicId = `${folder}/ramzi-image-${Date.now()}`;

  try {
    console.log(`Uploading ${filePath} to Cloudinary...`);
    const secureUrl = await uploadToCloudinary(filePath, publicId);
    
    console.log('\n✅ Upload successful!');
    console.log('Cloudinary URL:', secureUrl);
    
    // Also return the URL for programmatic use
    console.log('\n📋 Copy this URL:');
    console.log(secureUrl);
    
  } catch (error) {
    console.error('❌ Upload failed:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

main().catch(console.error);
