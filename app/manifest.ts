import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Body Signals — Independent Health Research Digest',
    short_name: 'Body Signals',
    description:
      'Independent research digest summarising peer-reviewed health research for Canadian and US readers.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#f59e0b',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
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
