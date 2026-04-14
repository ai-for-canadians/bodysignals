# Session 4: Functional Search + Accessibility Hardening

## Why This Is Fourth

The site has 450+ pages and search is a broken placeholder — the header has a search icon and the symptoms page has a search input, but neither does anything. For a health information site, search is how people find "melatonin side effects" or "depression interventions" without browsing through category pages. This session also hardens accessibility to WCAG 2.1 AA, which is both an ethical requirement for a health site and a legal risk mitigator (ADA Title III).

**Estimated scope:** ~5 new files, ~10-15 modified files. One client component (search), rest is server-side.

## Context

Body Signals is a statically generated Next.js 14 site. All content lives in TypeScript data files under `lib/data/`. There is no API, no database, no server runtime. Search must work entirely client-side using a pre-built index generated at build time.

Current search UX:
- `components/layout/Header.tsx` — has a search icon (Lucide `Search`) that is visual-only
- `app/symptoms/page.tsx` — has a search input that may filter symptoms client-side, but only within that page's content
- No global search across conditions, interventions, ADHD systems, movement programs

Accessibility current state:
- Some `aria-label` attributes in components
- Semantic HTML used inconsistently
- No screen reader testing done
- Colour contrast documented as passing in `docs/COMPLIANCE.md` but not verified programmatically
- Focus-visible styles audit marked as pending
- No skip-navigation link

---

## 4.1 — Build-Time Search Index

### Create:

**`lib/search/build-index.ts`**
Script that runs at build time to generate a search index from all data files:

```typescript
import { conditions } from '@/lib/data/conditions';
import { symptoms } from '@/lib/data/symptoms';
import { sleepInterventions } from '@/lib/data/sleep';
import { adhdSystems } from '@/lib/data/adhd';
import { movementPrograms } from '@/lib/data/movement';

export interface SearchEntry {
  id: string;
  title: string;
  type: 'condition' | 'symptom' | 'sleep' | 'adhd' | 'movement' | 'provider';
  category: string;
  slug: string;
  route: string;
  description: string;          // First 150 chars of summary/description
  evidenceRating?: string;
  tags: string[];               // Searchable keywords
}

export function buildSearchEntries(): SearchEntry[] {
  const entries: SearchEntry[] = [];

  // Conditions → searchable by name, category, symptom names, intervention names
  conditions.forEach(c => {
    entries.push({
      id: c.id,
      title: c.name,
      type: 'condition',
      category: c.category,
      slug: c.slug,
      route: `/conditions/${c.slug}`,
      description: c.summary.slice(0, 150),
      evidenceRating: c.evidenceRating,
      tags: [
        c.category,
        ...c.symptoms.map(s => s.name.toLowerCase()),
        ...c.interventions.map(i => i.name.toLowerCase()),
      ],
    });
  });

  // Symptoms → searchable by name, body area, related conditions
  // Sleep → searchable by name, category (hygiene, supplement, etc.)
  // ADHD → searchable by name, category, difficulty, impact
  // Movement → searchable by name, body part
  // ... follow same pattern for each

  return entries;
}
```

**`public/search-index.json`**
Generated at build time. Add to `package.json` scripts:
```json
"prebuild": "tsx lib/search/build-index.ts > public/search-index.json"
```

Or generate it within `next.config.js` / a build plugin if the tsx approach is complex. The index should be a flat JSON array of `SearchEntry` objects. At 450+ entries with short descriptions, this will be ~50-100KB — acceptable for a client-side download.

### Install:

```bash
npm install fuse.js
```

Fuse.js is a lightweight (~25KB gzipped), zero-dependency fuzzy search library. It runs entirely client-side with no server needed.

---

## 4.2 — Search Component

### Create:

**`components/search/SearchDialog.tsx`** — Client component (`'use client'`)

A modal/dialog search interface triggered by the header search icon or keyboard shortcut (Cmd+K / Ctrl+K):

**Behaviour:**
- Opens as a modal overlay (backdrop blur, z-50)
- Auto-focuses the search input on open
- Fetches `/search-index.json` on first open (lazy load, cached after)
- Initialises Fuse.js with keys: `['title', 'description', 'tags', 'category']`
- Shows results as you type (debounced 150ms)
- Results grouped by type: Conditions, Symptoms, Sleep, ADHD, Movement
- Each result shows: title, type badge, evidence rating badge (if applicable), truncated description
- Click result → navigate to route, close dialog
- Escape key closes dialog
- Max 20 results shown (5 per category, expand to show more)

**Design:**
- Match existing dark theme: `bg-slate-900 border border-slate-700`
- Search input: `bg-slate-800 border-slate-600 text-slate-50 placeholder-slate-400`
- Result hover: `bg-slate-800`
- Type badges: small, muted (`text-xs text-slate-400 bg-slate-700 rounded px-2`)
- Evidence badges: reuse existing `EvidenceBadge` component (import it)
- Keyboard hint: "⌘K" shown in header next to search icon

**Accessibility:**
- `role="dialog"` with `aria-modal="true"`
- `aria-label="Search Body Signals"`
- Input: `aria-label="Search"`, `role="combobox"`, `aria-expanded`, `aria-controls`
- Results list: `role="listbox"`, each result `role="option"` with `aria-selected`
- Arrow key navigation through results
- Screen reader announces result count: "5 results for melatonin"

### Modify:

**`components/layout/Header.tsx`**
- Replace static search icon with button that opens `SearchDialog`
- Add `aria-label="Open search"` to the button
- Add keyboard listener for Cmd+K / Ctrl+K to open search
- Mobile: search button in mobile nav that opens the same dialog

---

## 4.3 — Accessibility Hardening

### Audit and fix across all layout components:

**`app/layout.tsx`**
- Add `<html lang="en">` if not present (check — likely already there)
- Verify `<main>` element wraps page content

**`components/layout/Header.tsx`**
- Wrap nav in `<nav aria-label="Main navigation">`
- Mobile menu button: `aria-expanded`, `aria-controls="mobile-menu"`, `aria-label="Open menu"` / "Close menu"
- Mobile menu: `id="mobile-menu"`, `role="navigation"`, `aria-label="Mobile navigation"`
- All nav links: ensure visible focus styles (`focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none`)

**`components/layout/Footer.tsx`**
- Wrap in `<footer role="contentinfo">`
- Column headings: ensure they're actual `<h2>` or `<h3>` elements (not just styled `<p>` tags)
- All links: visible focus styles

**Skip Navigation Link**
Add to `app/layout.tsx`, before `<Header>`:
```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-amber-500 focus:text-slate-900 focus:px-4 focus:py-2 focus:rounded focus:font-semibold"
>
  Skip to main content
</a>
```
Add `id="main-content"` to the `<main>` element.

**Focus Styles Global**
Add to `globals.css` or Tailwind config:
```css
/* Visible focus for keyboard users, invisible for mouse users */
:focus-visible {
  outline: 2px solid theme('colors.amber.500');
  outline-offset: 2px;
}
```

### Audit detail page templates:

For each of these, verify and fix:
- `app/conditions/[slug]/page.tsx`
- `app/symptoms/[slug]/page.tsx`
- `app/topics/sleep/[slug]/page.tsx`
- `app/topics/adhd/[slug]/page.tsx`
- `app/topics/movement/[slug]/page.tsx`

Checks:
- Page content wrapped in `<article>` element
- Heading hierarchy is sequential (h1 → h2 → h3, no skipped levels)
- Evidence badges have `title` attribute (tooltip) for screen readers
- Source links have meaningful text (not "click here")
- Disclaimer sections have `role="alert"` or `aria-label="Medical disclaimer"`
- Cards use semantic markup (`<section>` with heading, not just `<div>`)

### Colour Contrast Verification:

Run automated check:
```bash
npx pa11y http://localhost:3000/conditions/depression --runner axe
npx pa11y http://localhost:3000/symptoms/headache --runner axe
npx pa11y http://localhost:3000/topics/sleep --runner axe
```

If pa11y reports contrast issues, fix them. Known risk areas:
- `slate-400` text on `slate-800` background (may fail for small text)
- `amber-500` text on `slate-900` background (should pass for large text, verify for small text)

---

## Session 4 Gate

- [ ] Search works: type "melatonin" → results include sleep intervention. Type "depression" → results include condition + related interventions.
- [ ] Cmd+K / Ctrl+K opens search from any page
- [ ] Search results are navigable with arrow keys
- [ ] Screen reader announces result count
- [ ] Search dialog has proper ARIA roles (`dialog`, `combobox`, `listbox`)
- [ ] Skip navigation link works: Tab from page load → "Skip to main content" appears → Enter skips to `#main-content`
- [ ] All nav links have visible focus-visible ring
- [ ] Header nav wrapped in `<nav>` with aria-label
- [ ] Mobile menu has aria-expanded toggle
- [ ] Footer wrapped in `<footer>` with role="contentinfo"
- [ ] `public/search-index.json` generates at build time
- [ ] Fuse.js added to `package.json` dependencies
- [ ] pa11y reports zero critical contrast failures (run on 3 sample pages)
- [ ] `npm run typecheck && npm run lint && npm run build` all pass
- [ ] Update `TASKS.md` — mark search and accessibility as complete
