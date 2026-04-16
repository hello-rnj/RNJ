#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';

const repoRoot = process.cwd();
const manifestPath = path.join(repoRoot, 'cloudinary-assets-manifest.json');
const publicDir = path.join(repoRoot, 'public');
const targetDir = path.join(publicDir, 'optimized');
const resvgCacheRoot = path.join(repoRoot, '.cache', 'resvg');
const resvgNodeModulesRoot = path.join(resvgCacheRoot, 'node_modules');
const resvgVersion = '2.6.2';
const maxCloudinaryBytes = 10 * 1024 * 1024;
const targetBytes = Math.floor(maxCloudinaryBytes * 0.95);

function parseArgs(argv) {
  const dryRun = argv.includes('--dry-run');
  const manifestArgIndex = argv.indexOf('--manifest');
  const manifestOverride =
    manifestArgIndex >= 0 && argv[manifestArgIndex + 1]
      ? path.resolve(repoRoot, argv[manifestArgIndex + 1])
      : manifestPath;

  return {
    dryRun,
    manifestPath: manifestOverride,
  };
}

function slugifyAssetName(fileName) {
  return fileName
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function removeDir(dirPath) {
  await fs.rm(dirPath, { recursive: true, force: true });
}

async function ensureResvgAvailable() {
  const jsPackageDir = path.join(resvgNodeModulesRoot, '@resvg', 'resvg-js');
  const platformPackageDir = path.join(
    resvgNodeModulesRoot,
    '@resvg',
    'resvg-js-linux-x64-gnu',
  );
  const jsEntry = path.join(jsPackageDir, 'index.js');
  const nativeEntry = path.join(
    platformPackageDir,
    'resvgjs.linux-x64-gnu.node',
  );

  if ((await fileExists(jsEntry)) && (await fileExists(nativeEntry))) {
    return jsPackageDir;
  }

  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'resvg-pack-'));

  try {
    await ensureDir(path.join(resvgNodeModulesRoot, '@resvg'));

    execFileSync(
      'npm',
      [
        'pack',
        `@resvg/resvg-js@${resvgVersion}`,
        `@resvg/resvg-js-linux-x64-gnu@${resvgVersion}`,
      ],
      {
        cwd: tempDir,
        stdio: 'ignore',
      },
    );

    const tarballs = (await fs.readdir(tempDir)).filter((entry) =>
      entry.endsWith('.tgz'),
    );

    for (const tarball of tarballs) {
      const tarballPath = path.join(tempDir, tarball);
      const extractDir = tarball.includes('linux-x64-gnu')
        ? platformPackageDir
        : jsPackageDir;

      await removeDir(extractDir);
      await ensureDir(extractDir);

      execFileSync(
        'tar',
        ['-xzf', tarballPath, '-C', extractDir, '--strip-components=1'],
        {
          stdio: 'ignore',
        },
      );
    }
  } finally {
    await removeDir(tempDir);
  }

  return jsPackageDir;
}

async function loadResvg() {
  const jsPackageDir = await ensureResvgAvailable();
  const require = createRequire(import.meta.url);
  return require(jsPackageDir);
}

async function loadManifest(filePath) {
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw);
}

function filterSvgFailures(manifest) {
  return (manifest.failures || []).filter((entry) =>
    String(entry.repoPath || '').toLowerCase().endsWith('.svg'),
  );
}

function buildOptimizedPublicPath(repoPath) {
  const baseName = path.basename(repoPath);
  return `/optimized/${slugifyAssetName(baseName)}.webp`;
}

function buildOptimizedFilePath(publicPath) {
  return path.join(publicDir, publicPath.replace(/^\/+/, ''));
}

function readOutputSize(filePath) {
  return fs.stat(filePath).then((stat) => stat.size);
}

function buildCwebpArgs(inputPath, outputPath, width, height, quality) {
  return [
    '-quiet',
    '-mt',
    '-m',
    '6',
    '-q',
    String(quality),
    '-alpha_q',
    '85',
    ...(width && height
      ? ['-resize', String(width), String(height)]
      : []),
    inputPath,
    '-o',
    outputPath,
  ];
}

async function encodeWebp(pngPath, outputPath, width, height) {
  const qualities = [84, 78, 72, 66, 60, 54, 48];
  const scales = [1, 0.92, 0.85, 0.78];

  for (const scale of scales) {
    const scaledWidth = scale === 1 ? null : Math.max(1, Math.round(width * scale));
    const scaledHeight =
      scale === 1 ? null : Math.max(1, Math.round(height * scale));

    for (const quality of qualities) {
      execFileSync(
        'cwebp',
        buildCwebpArgs(
          pngPath,
          outputPath,
          scaledWidth,
          scaledHeight,
          quality,
        ),
        {
          stdio: 'ignore',
        },
      );

      const fileSize = await readOutputSize(outputPath);

      if (fileSize <= targetBytes) {
        return {
          fileSize,
          quality,
          scale,
        };
      }
    }
  }

  const finalSize = await readOutputSize(outputPath);

  if (finalSize > maxCloudinaryBytes) {
    throw new Error(
      `Optimized file ${outputPath} is still too large at ${finalSize} bytes.`,
    );
  }

  return {
    fileSize: finalSize,
    quality: 48,
    scale: 0.78,
  };
}

async function renderSvgToWebp(Resvg, sourcePath, outputPath) {
  const svg = await fs.readFile(sourcePath, 'utf8');
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'original',
    },
    background: 'rgba(0, 0, 0, 0)',
  });
  const rendered = resvg.render();
  const pngPath = path.join(
    os.tmpdir(),
    `${slugifyAssetName(path.basename(sourcePath))}-${process.pid}.png`,
  );

  await fs.writeFile(pngPath, rendered.asPng());

  try {
    return await encodeWebp(pngPath, outputPath, rendered.width, rendered.height);
  } finally {
    await fs.rm(pngPath, { force: true });
  }
}

function applyReplacements(content, replacements) {
  let updated = content;

  for (const replacement of replacements) {
    updated = updated.split(replacement.from).join(replacement.to);
  }

  return updated;
}

async function writeUpdatedSourceFiles(replacementsByFile, dryRun) {
  for (const [sourceFile, replacements] of replacementsByFile.entries()) {
    const sourcePath = path.join(repoRoot, sourceFile);
    const original = await fs.readFile(sourcePath, 'utf8');
    const updated = applyReplacements(original, replacements);

    if (original === updated) {
      continue;
    }

    if (!dryRun) {
      await fs.writeFile(sourcePath, updated);
    }
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const manifest = await loadManifest(args.manifestPath);
  const svgFailures = filterSvgFailures(manifest);

  if (svgFailures.length === 0) {
    console.log('No oversized SVG failures found in the manifest.');
    return;
  }

  const { Resvg } = await loadResvg();
  const replacementsByFile = new Map();
  const optimizedAssets = [];

  await ensureDir(targetDir);

  for (const failure of svgFailures) {
    const repoPath = path.join(repoRoot, failure.repoPath);
    const optimizedPublicPath = buildOptimizedPublicPath(failure.repoPath);
    const optimizedFilePath = buildOptimizedFilePath(optimizedPublicPath);

    if (!(await fileExists(repoPath))) {
      throw new Error(`Missing SVG asset: ${failure.repoPath}`);
    }

    let result = null;

    if (!args.dryRun) {
      result = await renderSvgToWebp(Resvg, repoPath, optimizedFilePath);
    }

    optimizedAssets.push({
      source: failure.repoPath,
      output: path.relative(repoRoot, optimizedFilePath).split(path.sep).join('/'),
      bytes: result?.fileSize ?? null,
      quality: result?.quality ?? null,
      scale: result?.scale ?? null,
    });

    for (const sourceFile of failure.sourceFiles || []) {
      const replacements = replacementsByFile.get(sourceFile) || [];

      for (const reference of failure.references || []) {
        replacements.push({
          from: reference,
          to: optimizedPublicPath,
        });
      }

      replacementsByFile.set(sourceFile, replacements);
    }
  }

  await writeUpdatedSourceFiles(replacementsByFile, args.dryRun);

  console.log(
    JSON.stringify(
      {
        dryRun: args.dryRun,
        optimizedCount: optimizedAssets.length,
        optimizedAssets,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
