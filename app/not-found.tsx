import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            <AlertCircle className="w-16 h-16 text-slate-600 mb-6" />
            <h2 className="text-3xl font-bold text-slate-50 mb-4">Page Not Found</h2>
            <p className="text-slate-400 mb-8 max-w-md">
                We couldn't find the page you're looking for. It might have been moved or doesn't exist.
            </p>
            <Link
                href="/"
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-lg transition-colors"
            >
                Return Home
            </Link>
        </div>
    );
}
