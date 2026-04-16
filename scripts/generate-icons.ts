/**
 * One-time icon generation script for Body Signals.
 *
 * Run:  npx tsx scripts/generate-icons.ts
 *
 * Generates all brand assets into public/ — commit the outputs.
 * Keep this script in the repo as documentation of how icons were made.
 *
 * Dependencies (devDeps): sharp, to-ico
 */

import sharp from 'sharp';
import toIco from 'to-ico';
import * as fs from 'fs';
import * as path from 'path';

const SLATE_900 = '#0f172a';
const AMBER_500 = '#f59e0b';
const SLATE_50 = '#f8fafc';
const SLATE_300 = '#cbd5e1';
const SLATE_400 = '#94a3b8';

const OUT_DIR = path.join(process.cwd(), 'public');

// --- Icon SVG (amber "BS" wordmark on slate-900) ---
function iconSvg(size: number): Buffer {
  const fontSize = Math.round(size * 0.42);
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" rx="${Math.round(size * 0.15)}" fill="${SLATE_900}" />
      <text
        x="50%" y="54%"
        font-family="system-ui, -apple-system, sans-serif"
        font-size="${fontSize}" font-weight="700"
        fill="${AMBER_500}"
        text-anchor="middle" dominant-baseline="middle"
      >BS</text>
    </svg>
  `;
  return Buffer.from(svg);
}

// --- OG Image (1200x630) ---
function ogImageSvg(): Buffer {
  // Safe zone: 60px margin left/right, 45px margin top/bottom
  // Critical text within centred 1080x540 box
  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="${SLATE_900}" />

      <!-- Top amber accent bar -->
      <rect x="60" y="45" width="80" height="4" rx="2" fill="${AMBER_500}" />

      <!-- Site name -->
      <text x="60" y="130" font-family="system-ui, -apple-system, sans-serif" font-size="64" font-weight="800" fill="${SLATE_50}">
        Body<tspan fill="${AMBER_500}">Signals</tspan>
      </text>

      <!-- Tagline -->
      <text x="60" y="195" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="500" fill="${SLATE_300}">
        Independent Health Research Digest
      </text>

      <!-- Divider -->
      <rect x="60" y="230" width="200" height="2" rx="1" fill="${AMBER_500}" opacity="0.5" />

      <!-- Value prop -->
      <text x="60" y="290" font-family="system-ui, -apple-system, sans-serif" font-size="22" fill="${SLATE_400}">
        Evidence-graded health research for
      </text>
      <text x="60" y="322" font-family="system-ui, -apple-system, sans-serif" font-size="22" fill="${SLATE_400}">
        Canadian and US readers
      </text>

      <!-- Content stats -->
      <text x="60" y="400" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="${SLATE_400}">
        <tspan fill="${AMBER_500}" font-weight="700">120+</tspan> pages  ·  <tspan fill="${AMBER_500}" font-weight="700">A–F</tspan> evidence ratings  ·  <tspan fill="${AMBER_500}" font-weight="700">PubMed</tspan> citations
      </text>

      <!-- Bottom disclaimer -->
      <text x="60" y="560" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="${SLATE_400}" opacity="0.6">
        Research summary — not medical advice  ·  bodysignals.org
      </text>

      <!-- Right-side decorative element: large amber dot -->
      <circle cx="1050" cy="420" r="120" fill="${AMBER_500}" opacity="0.08" />
      <circle cx="1050" cy="420" r="60" fill="${AMBER_500}" opacity="0.12" />
    </svg>
  `;
  return Buffer.from(svg);
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  // 1. icon.png — 512x512
  await sharp(iconSvg(512)).png().toFile(path.join(OUT_DIR, 'icon.png'));
  console.error('  icon.png (512x512)');

  // 2. icon-192.png — 192x192
  await sharp(iconSvg(192)).png().toFile(path.join(OUT_DIR, 'icon-192.png'));
  console.error('  icon-192.png (192x192)');

  // 3. apple-icon.png — 180x180
  await sharp(iconSvg(180)).png().toFile(path.join(OUT_DIR, 'apple-icon.png'));
  console.error('  apple-icon.png (180x180)');

  // 4. favicon.ico — 32x32
  const favicon32 = await sharp(iconSvg(32)).png().toBuffer();
  const ico = await toIco([favicon32]);
  fs.writeFileSync(path.join(OUT_DIR, 'favicon.ico'), ico);
  console.error('  favicon.ico (32x32)');

  // 5. og-image.png — 1200x630
  await sharp(ogImageSvg()).png().toFile(path.join(OUT_DIR, 'og-image.png'));
  const ogStat = fs.statSync(path.join(OUT_DIR, 'og-image.png'));
  const ogKb = Math.round(ogStat.size / 1024);
  console.error(`  og-image.png (1200x630, ${ogKb}KB)`);
  if (ogKb > 200) {
    console.error(`  WARNING: og-image.png is ${ogKb}KB (target < 200KB)`);
  }

  console.error('✓ All icons generated in public/');
}

main().catch((err) => {
  console.error('Icon generation failed:', err);
  process.exit(1);
});
