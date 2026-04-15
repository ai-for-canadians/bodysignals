import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Disclaimer } from '@/components/layout/Disclaimer';
import { FeedbackWidget } from '@/components/feedback';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Body Signals',
    default: 'Body Signals — Independent Health Research Digest',
  },
  description:
    'Independent research digest summarising peer-reviewed health research on symptoms, conditions, and interventions for Canadian and US readers. Not medical advice.',
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
