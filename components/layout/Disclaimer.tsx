'use client';

import { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export function Disclaimer() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-amber-500/10 border-b border-amber-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-amber-200">
              <strong className="font-semibold">Not Medical Advice:</strong>{' '}
              BodySignals is for educational purposes only and does not replace professional medical advice.
              If you believe you are having a medical emergency, call emergency services immediately.{' '}
              <Link
                href="/about#disclaimer"
                className="underline hover:text-amber-100"
              >
                Full disclaimer
              </Link>
            </p>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="text-amber-400 hover:text-amber-300 flex-shrink-0"
            aria-label="Dismiss disclaimer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Link({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
