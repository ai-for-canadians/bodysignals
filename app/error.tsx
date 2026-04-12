'use client';

import Link from 'next/link';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            <AlertTriangle className="w-16 h-16 text-amber-500 mb-6" />
            <h2 className="text-3xl font-bold text-slate-50 mb-4">Something went wrong</h2>
            <p className="text-slate-400 mb-8 max-w-md">
                An unexpected error occurred. You can try again or head back to the home page.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-lg transition-colors"
                >
                    <RefreshCw className="w-5 h-5" />
                    Try again
                </button>
                <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-50 font-semibold rounded-lg border border-slate-700 transition-colors"
                >
                    Return Home
                </Link>
            </div>
        </div>
    );
}
