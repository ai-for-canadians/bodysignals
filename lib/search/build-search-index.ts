/**
 * Build-time script: generates public/search-index.json from all data files.
 *
 * Run via:  tsx lib/search/build-search-index.ts
 * Called automatically by npm lifecycle hooks (prebuild / predev).
 */

import * as fs from 'fs';
import * as path from 'path';
import { conditions, CATEGORY_LABELS } from '@/lib/data/conditions';
import { symptoms } from '@/lib/data/symptoms';
import { sleepInterventions, SLEEP_CATEGORY_LABELS } from '@/lib/data/sleep';
import { movementPrograms } from '@/lib/data/movement';
import { adhdSystems, adhdTools, ADHD_CATEGORY_LABELS } from '@/lib/data/adhd';
import { bodyAreas } from '@/lib/data/categories';
import type { SearchEntry } from './types';

const bodyAreaMap = new Map(bodyAreas.map((ba) => [ba.id, ba.name]));

function truncate(text: string, max = 150): string {
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, '') + '…';
}

function buildEntries(): SearchEntry[] {
  const entries: SearchEntry[] = [];

  // Conditions (27)
  for (const c of conditions) {
    entries.push({
      id: c.id,
      title: c.name,
      type: 'condition',
      category: CATEGORY_LABELS[c.category] ?? c.category,
      slug: c.slug,
      route: `/conditions/${c.slug}`,
      description: truncate(c.summary),
      evidenceRating: c.evidenceRating,
      tags: [
        CATEGORY_LABELS[c.category] ?? c.category,
        ...c.symptoms.map((s) => s.name.toLowerCase()),
        ...c.interventions.map((i) => i.name.toLowerCase()),
      ],
    });
  }

  // Symptoms (23)
  for (const s of symptoms) {
    entries.push({
      id: s.id,
      title: s.name,
      type: 'symptom',
      category: bodyAreaMap.get(s.bodyArea) ?? s.bodyArea,
      slug: s.slug,
      route: `/symptoms/${s.slug}`,
      description: truncate(s.summary),
      evidenceRating: s.evidenceRating,
      tags: [
        bodyAreaMap.get(s.bodyArea) ?? s.bodyArea,
        s.urgency,
        ...s.relatedConditions.map((rc) => rc.name.toLowerCase()),
      ],
    });
  }

  // Sleep interventions (20)
  for (const si of sleepInterventions) {
    entries.push({
      id: si.id,
      title: si.name,
      type: 'sleep',
      category: SLEEP_CATEGORY_LABELS[si.category] ?? si.category,
      slug: si.slug,
      route: `/topics/sleep/${si.slug}`,
      description: truncate(si.tagline ?? si.description),
      evidenceRating: si.evidenceRating,
      tags: [SLEEP_CATEGORY_LABELS[si.category] ?? si.category],
    });
  }

  // Movement programs (3)
  for (const mp of movementPrograms) {
    entries.push({
      id: mp.id,
      title: mp.name,
      type: 'movement',
      category: mp.bodyPart,
      slug: mp.slug,
      route: `/topics/movement/${mp.slug}`,
      description: truncate(mp.tagline ?? mp.description),
      evidenceRating: mp.evidenceRating,
      tags: [mp.bodyPart, ...mp.equipmentNeeded],
    });
  }

  // ADHD systems (18)
  for (const sys of adhdSystems) {
    entries.push({
      id: sys.id,
      title: sys.name,
      type: 'adhd-system',
      category: ADHD_CATEGORY_LABELS[sys.category] ?? sys.category,
      slug: sys.slug,
      route: `/topics/adhd/${sys.slug}`,
      description: truncate(sys.tagline ?? sys.description),
      evidenceRating: sys.evidenceRating,
      tags: [
        ADHD_CATEGORY_LABELS[sys.category] ?? sys.category,
        sys.difficulty.toLowerCase(),
        sys.impact.toLowerCase(),
      ],
    });
  }

  // ADHD tools (6) — no individual pages, link to hub
  for (const tool of adhdTools) {
    entries.push({
      id: `adhd-tool-${tool.id}`,
      title: tool.name,
      type: 'adhd-tool',
      category: 'Tools',
      slug: tool.id,
      route: '/topics/adhd',
      description: truncate(tool.description),
      tags: [tool.price.toLowerCase()],
    });
  }

  return entries;
}

// --- Main ---
const entries = buildEntries();

if (entries.length < 50) {
  console.error(
    `Search index built with only ${entries.length} entries — expected ~97. Failing build.`,
  );
  process.exit(1);
}

const outDir = path.join(process.cwd(), 'public');
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, 'search-index.json');
fs.writeFileSync(outPath, JSON.stringify(entries, null, 0), 'utf-8');
console.error(`✓ Search index: ${entries.length} entries → ${outPath}`);
