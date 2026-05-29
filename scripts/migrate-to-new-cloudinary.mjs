#!/usr/bin/env node
/**
 * Migration script: uploads all local public/ images to new Cloudinary account
 * and updates all source file references from old account to new.
 */

import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

const OLD_CLOUD = 'dmrtdo9z3';
const NEW_CLOUD = 'dvyyce3ki';
const NEW_API_KEY = '397343645375129';
const NEW_API_SECRET = 'IG8OJjhVdg-6Rg2aX64FtmDxDPg';
const FOLDER = 'rnj';

const ROOT = process.cwd();
const SRC_DIRS = [path.join(ROOT, 'src')];
const PUBLIC_DIR = path.join(ROOT, 'public');

const IMAGE_EXTS = new Set(['.svg', '.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif']);
const SOURCE_EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs']);

// ── helpers ──────────────────────────────────────────────────────────────────

function sha1Sign(params, secret) {
  const str = Object.keys(params).sort().map(k => `${k}=${params[k]}`).join('&');
  return crypto.createHash('sha1').update(str + secret).digest('hex');
}

async function uploadToCloudinary(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const relPath = path.relative(path.join(ROOT, 'public'), filePath);
  // Build a stable public_id: folder/sub/filename-hash
  const name = path.basename(filePath, ext).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const hash = crypto.createHash('sha1').update(relPath).digest('hex').slice(0, 8);
  const subDir = path.dirname(relPath).replace(/[^a-z0-9/]+/gi, '-').toLowerCase();
  const publicId = subDir === '.' ? `${FOLDER}/${name}-${hash}` : `${FOLDER}/${subDir}/${name}-${hash}`;

  const timestamp = Math.floor(Date.now() / 1000);
  const params = { folder: undefined, public_id: publicId, overwrite: 'true', timestamp };
  delete params.folder;
  const signature = sha1Sign({ public_id: publicId, overwrite: 'true', timestamp }, NEW_API_SECRET);

  const fileBuffer = await fs.readFile(filePath);
  const mimeMap = { '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.gif': 'image/gif' };
  const mime = mimeMap[ext] || 'application/octet-stream';

  const form = new FormData();
  form.set('file', new Blob([fileBuffer], { type: mime }), path.basename(filePath));
  form.set('public_id', publicId);
  form.set('overwrite', 'true');
  form.set('timestamp', String(timestamp));
  form.set('api_key', NEW_API_KEY);
  form.set('signature', signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${NEW_CLOUD}/auto/upload`, {
    method: 'POST',
    body: form,
  });

  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.secure_url) {
    throw new Error(json?.error?.message || res.statusText);
  }
  return { secureUrl: json.secure_url, publicId: json.public_id };
}

async function walkDir(dir, exts) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory() && !e.name.startsWith('.') && e.name !== 'node_modules') {
      files.push(...await walkDir(full, exts));
    } else if (e.isFile() && exts.has(path.extname(e.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

function extractOldUrls(content) {
  const pattern = new RegExp(`https://res\\.cloudinary\\.com/${OLD_CLOUD}/[^"'\`\\s)]+`, 'g');
  return [...new Set(content.match(pattern) || [])];
}

// ── main ─────────────────────────────────────────────────────────────────────

async function main() {
  // 1. Collect all local image files
  const localImages = await walkDir(PUBLIC_DIR, IMAGE_EXTS);
  console.log(`\nFound ${localImages.length} local images to upload.\n`);

  // 2. Upload each to new Cloudinary — build mapping: localPath → newUrl
  const localToNew = new Map(); // localPath → secureUrl

  for (const imgPath of localImages) {
    const rel = path.relative(ROOT, imgPath);
    try {
      process.stdout.write(`  Uploading ${rel} ... `);
      const result = await uploadToCloudinary(imgPath);
      localToNew.set(imgPath, result.secureUrl);
      console.log(`OK → ${result.secureUrl}`);
    } catch (err) {
      console.log(`FAILED: ${err.message}`);
    }
  }

  // 3. Collect all source files and their old Cloudinary URLs
  const sourceFiles = (await Promise.all(SRC_DIRS.map(d => walkDir(d, SOURCE_EXTS)))).flat();

  // 4. Build a filename-based lookup: normalised-name → newUrl
  //    (for matching old Cloudinary assets that don't have a local path counterpart)
  const normToNew = new Map();
  for (const [localPath, newUrl] of localToNew) {
    const base = path.basename(localPath, path.extname(localPath)).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    normToNew.set(base, newUrl);
  }

  // 5. For each old Cloudinary URL, find the best new URL
  function resolveNewUrl(oldUrl) {
    // Extract the filename part (last segment before query/hash, strip hash suffix like -ab12cd34)
    const urlPath = oldUrl.split('?')[0];
    const lastSeg = urlPath.split('/').pop() || '';
    const withoutExt = lastSeg.replace(/\.[^.]+$/, '');
    // Remove 8-char hex hash suffix
    const withoutHash = withoutExt.replace(/-[0-9a-f]{8}$/, '');
    const normalised = withoutHash.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    // Try exact match first
    if (normToNew.has(normalised)) return normToNew.get(normalised);

    // Try prefix match (in case hash was part of the name)
    for (const [key, url] of normToNew) {
      if (key.startsWith(normalised) || normalised.startsWith(key)) return url;
    }
    return null;
  }

  // 6. Rewrite source files
  let totalReplaced = 0;
  let totalUnresolved = new Set();

  for (const srcFile of sourceFiles) {
    const content = await fs.readFile(srcFile, 'utf8');
    const oldUrls = extractOldUrls(content);
    if (oldUrls.length === 0) continue;

    let updated = content;
    for (const oldUrl of oldUrls) {
      const newUrl = resolveNewUrl(oldUrl);
      if (newUrl) {
        updated = updated.split(oldUrl).join(newUrl);
        totalReplaced++;
      } else {
        totalUnresolved.add(oldUrl);
      }
    }

    if (updated !== content) {
      await fs.writeFile(srcFile, updated, 'utf8');
      console.log(`\nUpdated: ${path.relative(ROOT, srcFile)}`);
    }
  }

  // 7. Update .env.production
  const envPath = path.join(ROOT, '.env.production');
  try {
    let env = await fs.readFile(envPath, 'utf8');
    env = env.replace(/CLOUDINARY_CLOUD_NAME=.*/g, `CLOUDINARY_CLOUD_NAME=${NEW_CLOUD}`);
    env = env.replace(/CLOUDINARY_API_KEY=.*/g, `CLOUDINARY_API_KEY=${NEW_API_KEY}`);
    env = env.replace(/CLOUDINARY_API_SECRET=.*/g, `CLOUDINARY_API_SECRET=${NEW_API_SECRET}`);
    await fs.writeFile(envPath, env, 'utf8');
    console.log('\n✓ Updated .env.production credentials');
  } catch {
    console.log('\nWarning: could not update .env.production');
  }

  // 8. Report
  console.log(`\n═══════════════════════════════════`);
  console.log(`✓ Uploaded:  ${localToNew.size} / ${localImages.length} images`);
  console.log(`✓ Replaced:  ${totalReplaced} URL references in source`);
  if (totalUnresolved.size > 0) {
    console.log(`\n⚠ Unresolved (${totalUnresolved.size}) — no local file found:`);
    for (const u of totalUnresolved) console.log(`   ${u}`);
  }
  console.log(`═══════════════════════════════════\n`);
}

main().catch(err => { console.error(err.message); process.exitCode = 1; });
