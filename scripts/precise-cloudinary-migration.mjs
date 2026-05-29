#!/usr/bin/env node
/**
 * Precise migration: maps old Cloudinary URLs to new ones by matching exact public_id.
 * Only replaces URLs where we have a confirmed match. Never guesses.
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const OLD_CLOUD = 'dmrtdo9z3';
const NEW_CLOUD = 'dvyyce3ki';
const NEW_API_KEY = '397343645375129';
const NEW_API_SECRET = 'IG8OJjhVdg-6Rg2aX64FtmDxDPg';

const ROOT = process.cwd();
const SRC_DIRS = [path.join(ROOT, 'src')];
const SOURCE_EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs']);

// ── helpers ──────────────────────────────────────────────────────────────────

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

/** Extract public_id from a Cloudinary URL (strips version, transforms, extension) */
function extractPublicId(url) {
  try {
    const parsed = new URL(url);
    // Path: /image/upload/[transforms/]vXXXXX/public_id.ext
    const parts = parsed.pathname.split('/');
    const uploadIdx = parts.indexOf('upload');
    if (uploadIdx === -1) return null;

    // Find the version segment (starts with 'v' followed by digits)
    let versionIdx = -1;
    for (let i = uploadIdx + 1; i < parts.length; i++) {
      if (/^v\d+$/.test(parts[i])) { versionIdx = i; break; }
    }
    if (versionIdx === -1) return null;

    // Everything after the version is the public_id + extension
    const withExt = parts.slice(versionIdx + 1).join('/');
    // Strip extension
    const dotIdx = withExt.lastIndexOf('.');
    return dotIdx !== -1 ? withExt.slice(0, dotIdx) : withExt;
  } catch {
    return null;
  }
}

/** Fetch all resources from new Cloudinary account */
async function fetchNewResources() {
  const auth = Buffer.from(`${NEW_API_KEY}:${NEW_API_SECRET}`).toString('base64');
  const map = new Map(); // public_id -> secure_url

  let nextCursor = null;
  do {
    const params = new URLSearchParams({ max_results: '500', resource_type: 'image' });
    if (nextCursor) params.set('next_cursor', nextCursor);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${NEW_CLOUD}/resources/image?${params}`,
      { headers: { Authorization: `Basic ${auth}` } }
    );
    const data = await res.json();

    for (const r of data.resources ?? []) {
      map.set(r.public_id, r.secure_url);
    }
    nextCursor = data.next_cursor ?? null;
  } while (nextCursor);

  return map;
}

// ── main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('Fetching resources from new Cloudinary account...');
  const newResources = await fetchNewResources();
  console.log(`  Found ${newResources.size} uploaded assets on new account.\n`);

  // Build mapping: old full URL -> new full URL (exact public_id match only)
  const sourceFiles = (await Promise.all(SRC_DIRS.map(d => walkDir(d, SOURCE_EXTS)))).flat();

  // Collect all old URLs
  const oldUrlPattern = new RegExp(`https://res\\.cloudinary\\.com/${OLD_CLOUD}/[^"'\`\\s)]+`, 'g');
  const allOldUrls = new Set();
  for (const f of sourceFiles) {
    const content = await fs.readFile(f, 'utf8');
    for (const match of content.matchAll(oldUrlPattern)) allOldUrls.add(match[0]);
  }
  console.log(`Found ${allOldUrls.size} unique old Cloudinary URLs in source.\n`);

  // Build precise mapping
  const urlMapping = new Map(); // old URL -> new URL
  const unresolved = [];

  for (const oldUrl of allOldUrls) {
    const publicId = extractPublicId(oldUrl);
    if (!publicId) { unresolved.push(oldUrl); continue; }

    const newSecureUrl = newResources.get(publicId);
    if (newSecureUrl) {
      // Preserve transformation params if present in old URL
      // Extract transforms from old URL path
      const oldPath = new URL(oldUrl).pathname; // /image/upload/[transforms/]vXXX/pid.ext
      const uploadPart = oldPath.split('/upload/')[1] ?? '';
      const versionMatch = uploadPart.match(/^(.*?)(v\d+\/)/);
      const transforms = versionMatch?.[1] ?? '';

      let finalUrl = newSecureUrl;
      if (transforms) {
        // Insert transforms into new URL
        finalUrl = newSecureUrl.replace(
          `/${NEW_CLOUD}/image/upload/`,
          `/${NEW_CLOUD}/image/upload/${transforms}`
        );
      }

      urlMapping.set(oldUrl, finalUrl);
      console.log(`✓ ${publicId}`);
      console.log(`  → ${finalUrl}`);
    } else {
      unresolved.push(`${oldUrl}  [public_id: ${publicId}]`);
    }
  }

  console.log(`\nMapped: ${urlMapping.size} / ${allOldUrls.size} URLs`);
  console.log(`Unresolved (no matching asset on new account): ${unresolved.length}\n`);

  // Rewrite source files
  let filesUpdated = 0;
  for (const srcFile of sourceFiles) {
    const content = await fs.readFile(srcFile, 'utf8');
    let updated = content;
    for (const [oldUrl, newUrl] of urlMapping) {
      if (updated.includes(oldUrl)) updated = updated.split(oldUrl).join(newUrl);
    }
    if (updated !== content) {
      await fs.writeFile(srcFile, updated, 'utf8');
      console.log(`Updated: ${path.relative(ROOT, srcFile)}`);
      filesUpdated++;
    }
  }

  console.log(`\n═══════════════════════════════════════`);
  console.log(`✓ Replaced URLs in ${filesUpdated} source files`);
  if (unresolved.length > 0) {
    console.log(`\n⚠ ${unresolved.length} URLs have no match on new account (left unchanged):`);
    for (const u of unresolved) console.log(`   ${u}`);
  }
  console.log(`═══════════════════════════════════════\n`);
}

main().catch(err => { console.error(err.message); process.exitCode = 1; });
