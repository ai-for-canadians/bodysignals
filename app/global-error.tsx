'use client';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="en">
            <body className="bg-slate-900 text-slate-50 font-sans">
                <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-16 h-16 text-amber-500 mb-6"
                    >
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    <h2 className="text-3xl font-bold mb-4">Something went wrong</h2>
                    <p className="text-slate-400 mb-8 max-w-md">
                        A critical error occurred. Please try again.
                    </p>
                    <button
                        type="button"
                        onClick={reset}
                        className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-lg transition-colors"
                    >
                        Try again
                    </button>
                </div>
            </body>
        </html>
    );
}
