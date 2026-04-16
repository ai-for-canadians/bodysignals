import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Disclaimer } from '@/components/layout/Disclaimer';
import { FeedbackWidget } from '@/components/feedback';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://bodysignals.org'),
  title: {
    template: '%s | Body Signals',
    default: 'Body Signals — Independent Health Research Digest',
  },
  description:
    'Independent research digest summarising peer-reviewed health research on symptoms, conditions, and interventions for Canadian and US readers. Not medical advice.',
  openGraph: {
    type: 'website',
    siteName: 'Body Signals',
    title: 'Body Signals — Independent Health Research Digest',
    description:
      'Independent research digest summarising peer-reviewed health research on symptoms, conditions, and interventions for Canadian and US readers. Not medical advice.',
    images: [
      {
        url: '/og-image.png',
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
    description:
      'Independent research digest summarising peer-reviewed health research. Not medical advice.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large' as const,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
    shortcut: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#0f172a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {process.env.NODE_ENV === 'production' && (
          <Script
            defer
            data-domain="bodysignals.org"
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className={inter.className}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-amber-500 focus:text-slate-900 focus:px-4 focus:py-2 focus:rounded focus:font-semibold"
        >
          Skip to main content
        </a>
        <div className="flex flex-col min-h-screen">
          <Header />
          <Disclaimer />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
        </div>
        <FeedbackWidget siteId="body-signals" accentColor="amber" />
      </body>
    </html>
  );
}
