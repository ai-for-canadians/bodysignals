import { MetadataRoute } from 'next';
import { symptoms } from '@/lib/data/symptoms';
import { bodyAreas } from '@/lib/data/categories';
import { conditions, CATEGORY_LABELS } from '@/lib/data/conditions';
import { sleepInterventions } from '@/lib/data/sleep';
import { adhdSystems } from '@/lib/data/adhd';
import { movementPrograms } from '@/lib/data/movement';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bodysignals.ca';

  // === Static pages ===
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/symptoms`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/conditions`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/topics`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/topics/sleep`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/topics/adhd`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/topics/movement`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/providers`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    // Legal pages
    { url: `${baseUrl}/methodology`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/editorial`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/disclaimer`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/corrections`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.4 },
    { url: `${baseUrl}/disclosures`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
  ];

  // === Dynamic pages: Symptoms ===
  const symptomPages: MetadataRoute.Sitemap = symptoms.map((s) => ({
    url: `${baseUrl}/symptoms/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // === Dynamic pages: Body areas ===
  const areaPages: MetadataRoute.Sitemap = bodyAreas.map((a) => ({
    url: `${baseUrl}/body/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // === Dynamic pages: Conditions ===
  const conditionPages: MetadataRoute.Sitemap = conditions.map((c) => ({
    url: `${baseUrl}/conditions/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // === Dynamic pages: Condition categories ===
  const categoryPages: MetadataRoute.Sitemap = Object.keys(CATEGORY_LABELS).map(
    (cat) => ({
      url: `${baseUrl}/conditions/category/${cat}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })
  );

  // === Dynamic pages: Sleep interventions ===
  const sleepPages: MetadataRoute.Sitemap = sleepInterventions.map((s) => ({
    url: `${baseUrl}/topics/sleep/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // === Dynamic pages: ADHD systems ===
  const adhdPages: MetadataRoute.Sitemap = adhdSystems.map((s) => ({
    url: `${baseUrl}/topics/adhd/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // === Dynamic pages: Movement programs ===
  const movementPages: MetadataRoute.Sitemap = movementPrograms.map((p) => ({
    url: `${baseUrl}/topics/movement/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...symptomPages,
    ...areaPages,
    ...conditionPages,
    ...categoryPages,
    ...sleepPages,
    ...adhdPages,
    ...movementPages,
  ];
}
