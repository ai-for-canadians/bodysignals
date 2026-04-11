import { MetadataRoute } from 'next';
import { symptoms } from '@/lib/data/symptoms';
import { bodyAreas } from '@/lib/data/categories';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://bodysignals.ca';

    const symptomUrls = symptoms.map((symptom) => ({
        url: `${baseUrl}/symptoms/${symptom.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const areaUrls = bodyAreas.map((area) => ({
        url: `${baseUrl}/body/${area.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/symptoms`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        ...symptomUrls,
        ...areaUrls,
    ];
}
