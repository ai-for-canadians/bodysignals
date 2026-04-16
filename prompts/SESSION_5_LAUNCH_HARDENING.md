# Session 5: Launch Hardening (Pre-Launch Final)

## Why This Is The Last Pre-Launch Session

Sessions 1-4 fixed the foundations: analytics, citations, structured data, search, accessibility. This session adds the launch-readiness items that aren't features — they're the small but essential pieces that make the difference between "site that works" and "site that's ready for the public internet." Open Graph tags so links share properly, robots.txt for search engine crawl behaviour, favicon and web manifest for browser tabs and home screen install, and a comprehensive final verification pass.

After this session, the site is ready to deploy.

**Estimated scope:** ~5 new files, ~5 modified files. No new pages.

## Context

By this point, Body Signals should have:
- 120+ pages with Plausible analytics (Session 1)
- 40+ real PubMed/DOI citations backfilled (Session 2)
- JSON-LD structured data on all health pages (Session 3)
- Functional search and WCAG 2.1 AA accessibility (Session 4)
- Phase B referral infrastructure (already complete)

What's missing for a clean launch: social sharing metadata, search engine crawl directives, browser identity (favicon/manifest), and a final verification sweep.

What's deferred to Session 6 (post-launch, when needed): content manifest and `/licensing` page. These are B2B infrastructure that should wait until you have a specific enterprise conversation driving the need.

---

## 5.1 — Open Graph + Twitter Card Metadata

When someone shares a Body Signals link in Slack, iMessage, Facebook, LinkedIn, or X/Twitter, the site needs to render a proper preview card. Without OG tags, links show as plain URLs with no title, description, or image — which kills click-through.

### Modify:

**`app/layout.tsx`**

Extend the existing `metadata` export with full OG and Twitter card defaults:

```typescript
export const metadata: Metadata = {
  title: { /* existing */ },
  description: /* existing */,
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://bodysignals.ca'),
  openGraph: {
    type: 'website',
    siteName: 'Body Signals',
    title: 'Body Signals — Independent Health Research Digest',
    description: 'Independent research digest summarising peer-reviewed health research on symptoms, conditions, and interventions for Canadian and US readers. Not medical advice.',
    images: [
      {
        url: '/og-image.png',  // 1200x630 — created in 5.3 below
        width: 1200,
        height: 630,
        alt: 'Body Signals — Independent Health Research Digest',
      },
    ],
    locale: 'en_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Body Signals — Independent Health Research Digest',
    description: 'Independent research digest summarising peer-reviewed health research. Not medical advice.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
};
```

### Modify detail page templates:

For each detail page, the `generateMetadata()` function (which already exists per Session 3) should also include OG-specific metadata. Add to:

- `app/conditions/[slug]/page.tsx`
- `app/symptoms/[slug]/page.tsx`
- `app/topics/sleep/[slug]/page.tsx`
- `app/topics/adhd/[slug]/page.tsx`
- `app/topics/movement/[slug]/page.tsx`

Each `generateMetadata()` should return:

```typescript
return {
  title: condition.name,
  description: condition.summary,
  openGraph: {
    title: `${condition.name} | Body Signals`,
    description: condition.summary,
    url: `/conditions/${condition.slug}`,
    type: 'article',
    publishedTime: condition.lastUpdated,
    modifiedTime: condition.lastUpdated,
    section: condition.category,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${condition.name} | Body Signals`,
    description: condition.summary,
  },
  alternates: {
    canonical: `/conditions/${condition.slug}`,
  },
};
```

The `metadataBase` set in root layout means relative URLs resolve correctly.

---

## 5.2 — robots.txt + sitemap.xml Validation

### Create:

**`app/robots.ts`** (Next.js 14 supports this as a route handler)

```typescript
import { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],  // /api and /admin don't exist but defensive
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
```

This generates `/robots.txt` at build time. Verify after `npm run build` that the file exists and points to the correct sitemap URL.

### Verify existing sitemap:

`app/sitemap.ts` should already exist (created in Phase A). Verify:
- All static legal pages included (terms, privacy, disclaimer, editorial, corrections, methodology, disclosures)
- All dynamic routes (conditions, symptoms, sleep, adhd, movement) generated correctly
- Total URL count matches expected page count
- `lastModified` reflects actual content updates (not build time)
- Priorities make sense (home: 1.0, hubs: 0.8-0.9, detail: 0.7, legal: 0.3-0.5)

---

## 5.3 — Favicon, App Icons, and Web Manifest

The browser tab needs a favicon. iOS and Android need app icons for "Add to Home Screen." A web manifest tells browsers the site name, theme colour, and how to display it as a PWA.

### Create assets:

These need to be generated as actual image files. The plan does not include image generation — a designer or quick AI image tool produces these. Use the existing brand colours: amber-500 accent on slate-900 background. The icon should be a simple, recognisable mark — a lowercase "bs" wordmark, a stylised body silhouette, or just the amber dot from the logo.

Required files in `public/`:
- `favicon.ico` (16x16, 32x32 multi-resolution)
- `icon.png` (512x512 — used as default app icon)
- `apple-icon.png` (180x180 — iOS home screen)
- `og-image.png` (1200x630 — social sharing card with site name + tagline)

Next.js 14 App Router automatically picks up `app/icon.png` and `app/apple-icon.png` if placed in the app directory. The favicon goes in `public/favicon.ico`.

### Create:

**`app/manifest.ts`** (Next.js 14 route handler for `/manifest.webmanifest`)

```typescript
import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Body Signals — Independent Health Research Digest',
    short_name: 'Body Signals',
    description: 'Independent research digest summarising peer-reviewed health research for Canadian and US readers.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',  // slate-900
    theme_color: '#f59e0b',        // amber-500
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
```

### Modify:

**`app/layout.tsx`**

Add to metadata export:

```typescript
export const metadata: Metadata = {
  // ... existing
  themeColor: '#0f172a',  // slate-900 — controls mobile browser chrome colour
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
    shortcut: '/favicon.ico',
  },
};
```

---

## 5.4 — Error Monitoring (Optional but Recommended)

Without error monitoring, you won't know when production breaks. The site is statically generated so runtime errors are rare, but they can happen — bad data shape, missing image, broken external link, JS errors in the search dialog.

### Decision: Sentry vs. nothing

Sentry has a generous free tier (5K errors/month) and is the industry standard. Setup is ~30 minutes. Alternative: skip and rely on user feedback via the FeedbackWidget.

If skipping, document the decision in `docs/RUNBOOK.md` under "Error Monitoring" so future-you knows it was deliberate, not forgotten.

If implementing:

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

The wizard creates `sentry.client.config.ts`, `sentry.server.config.ts`, and `sentry.edge.config.ts`. Configure the DSN as an environment variable, set `tracesSampleRate: 0.1` (10% of pageviews) to stay within free tier limits.

Add to `.env.example`:
```
SENTRY_DSN=
SENTRY_ORG=
SENTRY_PROJECT=
NEXT_PUBLIC_SENTRY_DSN=
```

Add to `docs/DEPLOY_CHECKLIST.md` Launch-Day Gates:
- [ ] Sentry DSN configured in Vercel environment variables
- [ ] Trigger a test error in production, verify it appears in Sentry dashboard within 1 minute

---

## 5.5 — Final Launch Verification Pass

This is the deploy gate. Every check must pass.

### Run all existing checks:

```bash
npm run typecheck        # Zero errors
npm run lint             # Zero warnings
npm run check:crisis     # Crisis numbers present
npm run check:phrases    # No forbidden phrases
npm run search:build     # Search index generates with expected entry count
npm run build            # Succeeds with expected page count
```

### Run forbidden-pattern greps:

```bash
# Forbidden marketing language
rg -i "medical site|health advice|health education publisher|we recommend|doctor-reviewed" app/ components/ lib/data/

# Unsupported "studies show" pattern
rg -i "(studies?|research|evidence|experts?) (show|suggest|indicate|agree|demonstrate)" lib/data/

# Research-digest framing presence (expect ≥1 hit per file)
rg -c "research digest" components/home/Hero.tsx app/about/page.tsx components/layout/Footer.tsx CLAUDE.md README.md

# No console output
rg -n "console\.(log|error|warn)" components/ app/

# Partner ID isolation (no partner IDs in page files)
rg -l "maple|betterhelp|sesame-care|felix|lifelabs|dynacare|rocket-doctor|tia-health|jane-app" app/ --glob '!app/disclosures/'
```

All except the research-digest grep should return 0 hits.

### Manual spot checks (run on `npm run dev`):

- [ ] `/` — Hero loads, body map interactive, no console errors
- [ ] `/conditions/depression` — MH disclaimer, crisis numbers, evidence badges, sources rendered, JSON-LD in source, OG tags in `<head>`
- [ ] `/symptoms/headache` — Urgency badge, related conditions, disclaimer, JSON-LD, OG tags
- [ ] `/topics/sleep/melatonin` — Safety profile, contraindications, sources, JSON-LD, OG tags
- [ ] `/topics/adhd` — System cards with difficulty/impact, evidence badges, search button
- [ ] `/topics/movement` — Program cards, phase timelines
- [ ] `/providers` — Provider type cards
- [ ] `/methodology` — Full evidence rubric (rendered from `evidence-tiers.ts`)
- [ ] `/disclosures` — Empty commercial relationships, editorial partners listed
- [ ] `/terms`, `/privacy`, `/disclaimer`, `/editorial`, `/corrections` — all render
- [ ] Search (Cmd+K) — returns results across all content types
- [ ] Search empty state — type "xyz" → "No results for 'xyz'" with browse links
- [ ] Mobile nav — hamburger menu, all links accessible, search button works
- [ ] 404 page — `/nonexistent-slug` renders themed 404
- [ ] Skip-nav — Tab from page load → "Skip to main content" appears → Enter works
- [ ] Favicon visible in browser tab
- [ ] Robots.txt accessible at `/robots.txt`
- [ ] Manifest accessible at `/manifest.webmanifest`
- [ ] Sitemap accessible at `/sitemap.xml`

### Validate metadata externally:

After deploying to a staging URL (or using a tunnel like ngrok):

- [ ] Facebook Sharing Debugger (https://developers.facebook.com/tools/debug/) — paste 3 URLs (home, condition, symptom). All show correct title, description, image.
- [ ] Twitter Card Validator (https://cards-dev.twitter.com/validator) — paste 3 URLs. All show summary_large_image card.
- [ ] LinkedIn Post Inspector (https://www.linkedin.com/post-inspector/) — paste 3 URLs. All show preview card.
- [ ] Google Rich Results Test (https://search.google.com/test/rich-results) — paste 3 URLs (condition, symptom, sleep intervention). All show valid structured data.
- [ ] PageSpeed Insights (https://pagespeed.web.dev/) — home, condition, symptom. Score ≥90 mobile, ≥95 desktop.

### Update project docs:

**`CLAUDE.md`** — Update current state section:
- Mark Phases 1-5 complete
- Update page count if changed
- Update key gaps section (most should be resolved by now)

**`TASKS.md`** — Move Sessions 1-5 items to Completed. Active list should now contain only post-launch items (provider directory at 80K MAU, source backfill expansion, content manifest if B2B opportunity arrives).

**`README.md`** — Update page count, add deployed URL once live.

**`docs/DEPLOY_CHECKLIST.md`** — Verify every item in the existing checklist still applies; add any new items uncovered during this session.

---

## Session 5 Gate (Final Pre-Launch Gate)

- [ ] OG metadata in root layout with default image
- [ ] Per-page OG metadata via `generateMetadata()` on all 5 detail page templates
- [ ] Twitter card metadata configured (summary_large_image)
- [ ] `app/robots.ts` exists and generates `/robots.txt` correctly
- [ ] `app/manifest.ts` exists and generates `/manifest.webmanifest`
- [ ] favicon.ico, icon.png (512x512), apple-icon.png (180x180), og-image.png (1200x630) all present in `public/`
- [ ] Theme colour set in metadata (slate-900 for mobile browser chrome)
- [ ] All forbidden-pattern greps return 0 (except research-digest which should return ≥1)
- [ ] All 17 manual spot checks pass
- [ ] Facebook, Twitter, LinkedIn debuggers show correct preview cards
- [ ] Google Rich Results Test passes on 3 sample pages
- [ ] PageSpeed Insights ≥90 mobile, ≥95 desktop on 3 pages
- [ ] Error monitoring decision documented (Sentry configured, or "deliberately skipped" noted in runbook)
- [ ] CLAUDE.md, TASKS.md, README.md, DEPLOY_CHECKLIST.md all current
- [ ] `npm run typecheck && npm run lint && npm run build` all pass
- [ ] Final page count documented in CLAUDE.md

## Post-Session 5: Ready to Deploy

After Session 5 passes, the site is launch-ready:
- Legal infrastructure: complete
- Referral infrastructure: complete (activation pending 50K MAU)
- Analytics: configured for production
- SEO: JSON-LD + sitemap + robots.txt + OG cards
- Accessibility: WCAG 2.1 AA verified
- Content quality: 40+ real citations, no forbidden phrases
- Browser identity: favicon + app icons + web manifest
- Social sharing: tested across Facebook, Twitter, LinkedIn
- Error monitoring: configured or deliberately deferred

### Deploy steps:
1. Push to main, Vercel auto-deploys
2. DNS cutover (bodysignals.ca → Vercel)
3. Verify SSL certificate active, HSTS header present
4. Submit sitemap to Google Search Console
5. Submit sitemap to Bing Webmaster Tools
6. Verify Plausible analytics receiving pageviews
7. Tag the release in git: `git tag v1.0.0 && git push --tags`

### Post-launch (deferred sessions):
- **Session 6:** Content manifest + `/licensing` page (when first B2B conversation surfaces)
- **Phase C.P:** Provider directory (when approaching 80K MAU)
- **Phase D:** AI architecture document (anytime; no urgency)
- **Ongoing:** Source backfill toward 80% coverage; quarterly content review per runbook
