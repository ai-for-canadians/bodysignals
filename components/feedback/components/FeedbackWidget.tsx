'use client';

import { useState, useEffect, useId } from 'react';
import { MessageSquare, X, Send, Bug, Lightbulb, FileText, Heart, HelpCircle, ChevronLeft, AlertTriangle } from 'lucide-react';
import type { FeedbackType, FeedbackWidgetProps } from '../types';

const feedbackTypes: { type: FeedbackType; label: string; icon: typeof Bug; description: string }[] = [
    { type: 'bug', label: 'Report a Bug', icon: Bug, description: 'Something isn\'t working' },
    { type: 'suggestion', label: 'Suggestion', icon: Lightbulb, description: 'Ideas to improve' },
    { type: 'content', label: 'Content Issue', icon: FileText, description: 'Inaccurate or missing info' },
    { type: 'praise', label: 'Praise', icon: Heart, description: 'Something you love' },
    { type: 'other', label: 'Other', icon: HelpCircle, description: 'Anything else' },
];

// NEXT_PUBLIC_FEEDBACK_FORM_ID is set in Vercel project settings (Formspree form ID, e.g. "xyzabc12").
// If not set, the widget renders in "launching soon" fallback mode — never silently swallows submissions.
const FORMSPREE_FORM_ID = process.env.NEXT_PUBLIC_FEEDBACK_FORM_ID ?? '';

export function FeedbackWidget({
    siteId,
    position = 'bottom-right',
    accentColor = 'amber',
    onSubmit,
}: FeedbackWidgetProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedType, setSelectedType] = useState<FeedbackType | null>(null);
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [confirmedAdult, setConfirmedAdult] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pageUrl, setPageUrl] = useState('');

    const messageId = useId();
    const emailId = useId();
    const adultId = useId();

    useEffect(() => {
        setPageUrl(window.location.href);
    }, []);

    const positionClasses = {
        'bottom-right': 'right-4 bottom-4',
        'bottom-left': 'left-4 bottom-4',
    };

    const accentClasses = {
        amber: {
            button: 'bg-amber-500 hover:bg-amber-400',
            focus: 'focus:ring-amber-500',
            icon: 'text-amber-400',
        },
        emerald: {
            button: 'bg-emerald-500 hover:bg-emerald-400',
            focus: 'focus:ring-emerald-500',
            icon: 'text-emerald-400',
        },
        blue: {
            button: 'bg-blue-500 hover:bg-blue-400',
            focus: 'focus:ring-blue-500',
            icon: 'text-blue-400',
        },
        purple: {
            button: 'bg-purple-500 hover:bg-purple-400',
            focus: 'focus:ring-purple-500',
            icon: 'text-purple-400',
        },
        orange: {
            button: 'bg-orange-500 hover:bg-orange-400',
            focus: 'focus:ring-orange-500',
            icon: 'text-orange-400',
        },
    };

    const accent = accentClasses[accentColor as keyof typeof accentClasses] || accentClasses.amber;

    // Widget is in fallback mode when Formspree form ID is not configured
    // AND no custom onSubmit handler is provided. In fallback mode, the
    // form renders a "launching soon" state pointing users to the
    // corrections email rather than silently swallowing submissions.
    const isFallbackMode = !FORMSPREE_FORM_ID && !onSubmit;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedType || !message.trim() || !confirmedAdult) return;

        setIsSubmitting(true);
        setError(null);

        const feedback = {
            siteId,
            pageUrl,
            type: selectedType,
            message: message.trim(),
            email: email.trim() || undefined,
            userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
        };

        try {
            if (onSubmit) {
                await onSubmit(feedback);
            } else if (FORMSPREE_FORM_ID) {
                const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    body: JSON.stringify(feedback),
                });
                if (!response.ok) {
                    throw new Error(`Formspree returned ${response.status}`);
                }
            } else {
                throw new Error('No submission handler configured');
            }

            setSubmitted(true);

            // Reset after 3 seconds
            setTimeout(() => {
                setIsOpen(false);
                setSubmitted(false);
                setSelectedType(null);
                setMessage('');
                setEmail('');
                setConfirmedAdult(false);
            }, 3000);
        } catch (err) {
            setError('Could not send — please try again, or email corrections@bodysignals.org directly.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const reset = () => {
        setSelectedType(null);
        setMessage('');
        setError(null);
    };

    return (
        <div className={`fixed ${positionClasses[position]} z-[9999]`}>
            {/* Toggle Button */}
            {!isOpen && (
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className={`${accent.button} text-slate-900 p-3 rounded-full shadow-lg transition-all hover:scale-105 group`}
                    aria-label="Open feedback"
                >
                    <MessageSquare className="w-5 h-5" />
                    <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-800 text-slate-50 text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Send Feedback
                    </span>
                </button>
            )}

            {/* Feedback Panel */}
            {isOpen && (
                <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl w-[340px] overflow-hidden animate-in slide-in-from-bottom-2 duration-200">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-800/80">
                        <div className="flex items-center gap-2">
                            <MessageSquare className={`w-5 h-5 ${accent.icon}`} />
                            <h3 className="font-semibold text-slate-50">Send Feedback</h3>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close feedback"
                            className="text-slate-400 hover:text-slate-50 transition-colors p-1 rounded-lg hover:bg-slate-700"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                        {isFallbackMode ? (
                            /* Fallback state — no endpoint configured */
                            <div className="text-center py-6">
                                <div className="w-14 h-14 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <MessageSquare className="w-7 h-7 text-amber-400" />
                                </div>
                                <p className="text-slate-50 font-semibold text-lg mb-2">Feedback form launching soon</p>
                                <p className="text-slate-400 text-sm mb-4">
                                    In the meantime, please email us directly. We respond to medical-content corrections within 48 hours.
                                </p>
                                <a
                                    href="mailto:corrections@bodysignals.org?subject=Body%20Signals%20feedback"
                                    className={`inline-flex items-center justify-center gap-2 ${accent.button} text-slate-900 font-semibold px-5 py-2.5 rounded-xl transition-colors`}
                                >
                                    <Send className="w-4 h-4" />
                                    corrections@bodysignals.org
                                </a>
                            </div>
                        ) : submitted ? (
                            /* Thank You State */
                            <div className="text-center py-8">
                                <div className="w-14 h-14 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Send className="w-7 h-7 text-emerald-400" />
                                </div>
                                <p className="text-slate-50 font-semibold text-lg">Thank you!</p>
                                <p className="text-slate-400 text-sm mt-1">Your feedback helps us improve.</p>
                            </div>
                        ) : !selectedType ? (
                            /* Type Selection */
                            <div className="space-y-2">
                                <p className="text-sm text-slate-400 mb-4">What would you like to share?</p>
                                {feedbackTypes.map(({ type, label, icon: Icon, description }) => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setSelectedType(type)}
                                        className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-700/50 hover:bg-slate-700 transition-colors text-left group"
                                    >
                                        <div className={`p-2 rounded-lg bg-slate-600/50 group-hover:bg-slate-600 transition-colors`}>
                                            <Icon className="w-4 h-4 text-slate-300" />
                                        </div>
                                        <div>
                                            <div className="text-slate-50 font-medium">{label}</div>
                                            <div className="text-xs text-slate-500">{description}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            /* Feedback Form */
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <button
                                    type="button"
                                    onClick={reset}
                                    className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-50 transition-colors"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Back
                                </button>

                                <div>
                                    <label htmlFor={messageId} className="block text-sm font-medium text-slate-300 mb-2">
                                        {selectedType === 'bug' ? 'Describe the issue' :
                                            selectedType === 'praise' ? 'What did you enjoy?' :
                                                'Your feedback'}
                                    </label>
                                    <textarea
                                        id={messageId}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        rows={4}
                                        required
                                        autoFocus
                                        className={`w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-slate-50 placeholder:text-slate-500 focus:ring-2 ${accent.focus} focus:border-transparent resize-none text-sm`}
                                        placeholder={
                                            selectedType === 'bug'
                                                ? "What happened? What did you expect?"
                                                : selectedType === 'content'
                                                    ? "What's inaccurate or missing?"
                                                    : selectedType === 'praise'
                                                        ? "We'd love to hear what's working well!"
                                                        : "Share your thoughts..."
                                        }
                                    />
                                </div>

                                <div>
                                    <p className="text-xs text-slate-500 mb-2">
                                        You must be 18+ to submit feedback.
                                    </p>
                                    <label htmlFor={emailId} className="block text-sm font-medium text-slate-300 mb-2">
                                        Email <span className="text-slate-500">(optional)</span>
                                    </label>
                                    <input
                                        id={emailId}
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={`w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-2.5 text-slate-50 placeholder:text-slate-500 focus:ring-2 ${accent.focus} focus:border-transparent text-sm`}
                                        placeholder="For follow-up if needed"
                                    />
                                </div>

                                <div className="flex items-start gap-2">
                                    <input
                                        id={adultId}
                                        type="checkbox"
                                        checked={confirmedAdult}
                                        onChange={(e) => setConfirmedAdult(e.target.checked)}
                                        required
                                        className={`mt-1 w-4 h-4 rounded border-slate-600 bg-slate-700 text-amber-500 focus:ring-2 ${accent.focus}`}
                                    />
                                    <label htmlFor={adultId} className="text-xs text-slate-400 leading-relaxed">
                                        I confirm I am 18 years of age or older.
                                    </label>
                                </div>

                                {/* Page Info */}
                                <div className="text-xs text-slate-500 truncate">
                                    📍 {pageUrl.replace(/^https?:\/\//, '').slice(0, 40)}...
                                </div>

                                {/* Error state */}
                                {error && (
                                    <div className="flex items-start gap-2 bg-red-950/30 border border-red-900/50 rounded-xl p-3">
                                        <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                                        <p className="text-xs text-red-200 leading-relaxed">{error}</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={!message.trim() || !confirmedAdult || isSubmitting}
                                    title="By submitting, you confirm you are 18 or older."
                                    className={`w-full ${accent.button} disabled:bg-slate-600 disabled:cursor-not-allowed text-slate-900 font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Feedback
                                            <Send className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="px-4 py-3 border-t border-slate-700 bg-slate-800/50">
                        <p className="text-xs text-slate-500 text-center">
                            Powered by InfoBank
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
