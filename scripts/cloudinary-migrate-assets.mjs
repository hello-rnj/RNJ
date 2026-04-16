#!/usr/bin/env node

import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

const repoRoot = process.cwd();
const publicDir = path.join(repoRoot, 'public');
const sourceDirs = [path.join(repoRoot, 'src')];
const manifestPath = path.join(repoRoot, 'cloudinary-assets-manifest.json');

const assetExtensions = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.svg',
  '.webp',
  '.avif',
  '.ico',
  '.bmp',
]);

const sourceExtensions = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.css',
  '.scss',
  '.md',
]);

const sameSiteOrigins = new Set([
  process.env.CLOUDINARY_SITE_ORIGIN || 'https://rnj-advisory.be',
  'https://www.rnj-advisory.be',
  'http://rnj-advisory.be',
  'http://www.rnj-advisory.be',
]);

const knownPublicPathAliases = new Map([
  ['/minimal-horizontal-logo-white-1.svg', '/minimal horizontal logo white 1.svg'],
]);

const mimeTypes = new Map([
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.gif', 'image/gif'],
  ['.svg', 'image/svg+xml'],
  ['.webp', 'image/webp'],
  ['.avif', 'image/avif'],
  ['.ico', 'image/x-icon'],
  ['.bmp', 'image/bmp'],
]);

function parseDotEnvLine(line) {
  const trimmed = line.trim();

  if (!trimmed || trimmed.startsWith('#')) {
    return null;
  }

  const separatorIndex = trimmed.indexOf('=');

  if (separatorIndex === -1) {
    return null;
  }

  const key = trimmed.slice(0, separatorIndex).trim();
  let value = trimmed.slice(separatorIndex + 1).trim();

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }

  return [key, value];
}

async function loadEnvFiles() {
  const envFiles = [
    path.join(repoRoot, '.env.local'),
    path.join(repoRoot, '.env.production'),
    path.join(repoRoot, '.env'),
  ];

  for (const envFile of envFiles) {
    try {
      const content = await fs.readFile(envFile, 'utf8');
      const lines = content.split(/\r?\n/);

      for (const line of lines) {
        const entry = parseDotEnvLine(line);

        if (!entry) {
          continue;
        }

        const [key, value] = entry;

        if (!(key in process.env)) {
          process.env[key] = value;
        }
      }
    } catch {
      // Ignore missing env files.
    }
  }
}

function applyCloudinaryUrlFallback() {
  const cloudinaryUrl = process.env.CLOUDINARY_URL;

  if (!cloudinaryUrl) {
    return;
  }

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
    // Ignore malformed CLOUDINARY_URL and let the normal validation fail later.
  }
}

function parseArgs(argv) {
  return {
    dryRun: argv.includes('--dry-run'),
  };
}

function isSourceFile(filePath) {
  return sourceExtensions.has(path.extname(filePath).toLowerCase());
}

function isAssetPath(candidate) {
  const cleanCandidate = candidate.split('?')[0].split('#')[0];
  return assetExtensions.has(path.extname(cleanCandidate).toLowerCase());
}

function toRepoRelative(absolutePath) {
  return path.relative(repoRoot, absolutePath).split(path.sep).join('/');
}

async function walk(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      files.push(...await walk(absolutePath));
      continue;
    }

    if (entry.isFile() && isSourceFile(absolutePath)) {
      files.push(absolutePath);
    }
  }

  return files;
}

function normalizeAssetReference(rawReference) {
  if (rawReference.startsWith('http://') || rawReference.startsWith('https://')) {
    try {
      const parsed = new URL(rawReference);
      const origin = `${parsed.protocol}//${parsed.host}`;

      if (!sameSiteOrigins.has(origin)) {
        return null;
      }

      return `${parsed.pathname}${parsed.search}${parsed.hash}`;
    } catch {
      return null;
    }
  }

  return rawReference;
}

function decodePathname(pathname) {
  try {
    return decodeURIComponent(pathname);
  } catch {
    return pathname;
  }
}

async function fileExists(absolutePath) {
  try {
    const stat = await fs.stat(absolutePath);
    return stat.isFile();
  } catch {
    return false;
  }
}

async function resolvePublicFile(rawReference) {
  const normalizedReference = normalizeAssetReference(rawReference);

  if (!normalizedReference) {
    return null;
  }

  const cleanPath = normalizedReference.split('?')[0].split('#')[0];
  const candidatePaths = [
    cleanPath,
    knownPublicPathAliases.get(cleanPath),
  ].filter(Boolean);

  for (const candidatePath of candidatePaths) {
    const decodedPath = decodePathname(candidatePath);
    const variants = [...new Set([candidatePath, decodedPath])];

    for (const variant of variants) {
      const absolutePath = path.join(publicDir, variant.replace(/^\/+/, ''));

      if (await fileExists(absolutePath)) {
        return {
          localPath: absolutePath,
          repoPath: toRepoRelative(absolutePath),
        };
      }
    }
  }

  return null;
}

function collectReferences(content) {
  const matches = new Set();
  const quotedLocalPattern = /(["'`])(\/[^"'`]+\.(?:png|jpe?g|gif|svg|webp|avif|ico|bmp)(?:\?[^"'`]*)?)\1/gi;
  const quotedAbsolutePattern =
    /(["'`])(https?:\/\/(?:www\.)?rnj-advisory\.be\/[^"'`]+\.(?:png|jpe?g|gif|svg|webp|avif|ico|bmp)(?:\?[^"'`]*)?)\1/gi;

  for (const pattern of [quotedLocalPattern, quotedAbsolutePattern]) {
    let match;

    while ((match = pattern.exec(content)) !== null) {
      if (isAssetPath(match[2])) {
        matches.add(match[2]);
      }
    }
  }

  return [...matches];
}

function sanitizeSegment(segment) {
  const normalized = segment
    .normalize('NFKD')
    .replace(/[^\w.-]+/g, '-')
    .replace(/_+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();

  return normalized || 'asset';
}

function buildPublicId(repoPath, folder) {
  const relativeToPublic = repoPath.replace(/^public\//, '');
  const withoutExtension = relativeToPublic.replace(/\.[^.]+$/, '');
  const segments = withoutExtension.split('/').map(sanitizeSegment);
  const hash = crypto.createHash('sha1').update(relativeToPublic).digest('hex').slice(0, 8);
  const lastSegment = segments.pop() || 'asset';

  segments.push(`${lastSegment}-${hash}`);

  return [folder, ...segments].join('/');
}

async function uploadToCloudinary(localPath, publicId) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      'Missing Cloudinary credentials. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.'
    );
  }

  const extension = path.extname(localPath).toLowerCase();
  const uploadEndpoint = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
  const fileBuffer = await fs.readFile(localPath);
  const form = new FormData();

  form.set(
    'file',
    new Blob([fileBuffer], {
      type: mimeTypes.get(extension) || 'application/octet-stream',
    }),
    path.basename(localPath)
  );
  form.set('public_id', publicId);
  form.set('overwrite', 'true');
  form.set('invalidate', 'true');

  const response = await fetch(uploadEndpoint, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`,
    },
    body: form,
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok || !payload?.secure_url) {
    throw new Error(
      `Cloudinary upload failed for ${toRepoRelative(localPath)}: ${payload?.error?.message || response.statusText}`
    );
  }

  return {
    secureUrl: payload.secure_url,
    publicId: payload.public_id || publicId,
  };
}

async function loadManifest() {
  try {
    const fileContent = await fs.readFile(manifestPath, 'utf8');
    const parsed = JSON.parse(fileContent);

    if (!Array.isArray(parsed.assets)) {
      return { assets: [] };
    }

    return parsed;
  } catch {
    return { assets: [] };
  }
}

async function saveManifest(manifest) {
  await fs.writeFile(
    manifestPath,
    `${JSON.stringify(manifest, null, 2)}\n`,
    'utf8'
  );
}

async function main() {
  await loadEnvFiles();
  applyCloudinaryUrlFallback();

  const { dryRun } = parseArgs(process.argv.slice(2));
  const folder = process.env.CLOUDINARY_FOLDER || 'rnj';
  const manifest = await loadManifest();
  const existingByRepoPath = new Map(
    manifest.assets.map((asset) => [asset.repoPath, asset])
  );

  const sourceFiles = (
    await Promise.all(sourceDirs.map((directory) => walk(directory)))
  ).flat();

  const assetUsage = new Map();

  for (const sourceFile of sourceFiles) {
    const content = await fs.readFile(sourceFile, 'utf8');
    const references = collectReferences(content);

    for (const reference of references) {
      const resolved = await resolvePublicFile(reference);

      if (!resolved) {
        console.warn(`Skipping unresolved asset reference in ${toRepoRelative(sourceFile)}: ${reference}`);
        continue;
      }

      const key = resolved.repoPath;
      const currentUsage = assetUsage.get(key) || {
        repoPath: resolved.repoPath,
        localPath: resolved.localPath,
        references: new Set(),
        sourceFiles: new Set(),
      };

      currentUsage.references.add(reference);
      currentUsage.sourceFiles.add(toRepoRelative(sourceFile));
      assetUsage.set(key, currentUsage);
    }
  }

  if (assetUsage.size === 0) {
    console.log('No local image references found in src/.');
    return;
  }

  console.log(`Found ${assetUsage.size} referenced assets in src/.`);

  const replacementMap = new Map();
  const nextManifestAssets = [];
  const failures = [];

  for (const usage of assetUsage.values()) {
    const existing = existingByRepoPath.get(usage.repoPath);
    let secureUrl = existing?.secureUrl;
    let publicId = existing?.publicId;

    if (!secureUrl || !publicId) {
      publicId = buildPublicId(usage.repoPath, folder);

      if (dryRun) {
        secureUrl = `[dry-run] cloudinary://${publicId}`;
      } else {
        try {
          console.log(`Uploading ${usage.repoPath} -> ${publicId}`);
          const uploadResult = await uploadToCloudinary(usage.localPath, publicId);
          secureUrl = uploadResult.secureUrl;
          publicId = uploadResult.publicId;
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          failures.push({
            repoPath: usage.repoPath,
            publicId,
            message,
            references: [...usage.references].sort(),
            sourceFiles: [...usage.sourceFiles].sort(),
          });
          console.warn(`Skipping ${usage.repoPath}: ${message}`);
          continue;
        }
      }
    } else {
      console.log(`Reusing manifest entry for ${usage.repoPath}`);
    }

    for (const reference of usage.references) {
      replacementMap.set(reference, secureUrl);
    }

    nextManifestAssets.push({
      repoPath: usage.repoPath,
      publicId,
      secureUrl,
      references: [...usage.references].sort(),
      sourceFiles: [...usage.sourceFiles].sort(),
    });
  }

  const filesToRewrite = new Map();

  for (const sourceFile of sourceFiles) {
    const content = await fs.readFile(sourceFile, 'utf8');
    let nextContent = content;

    for (const [reference, secureUrl] of [...replacementMap.entries()].sort((a, b) => b[0].length - a[0].length)) {
      if (nextContent.includes(reference)) {
        nextContent = nextContent.split(reference).join(secureUrl);
      }
    }

    if (nextContent !== content) {
      filesToRewrite.set(sourceFile, nextContent);
    }
  }

  console.log(`Prepared ${replacementMap.size} replacement(s) across ${filesToRewrite.size} file(s).`);

  if (dryRun) {
    console.log('Dry run only. No files were uploaded or rewritten.');
    return;
  }

  for (const [filePath, content] of filesToRewrite) {
    await fs.writeFile(filePath, content, 'utf8');
    console.log(`Updated ${toRepoRelative(filePath)}`);
  }

  await saveManifest({
    version: 1,
    generatedAt: new Date().toISOString(),
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    folder,
    assets: nextManifestAssets.sort((a, b) => a.repoPath.localeCompare(b.repoPath)),
    failures,
  });

  console.log(`Saved manifest to ${toRepoRelative(manifestPath)}`);

  if (failures.length > 0) {
    console.warn(`Completed with ${failures.length} skipped asset(s). See ${toRepoRelative(manifestPath)} for details.`);
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
