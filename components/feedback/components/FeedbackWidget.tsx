'use client';

import { useState, useEffect } from 'react';
import { MessageSquare, X, Send, Bug, Lightbulb, FileText, Heart, HelpCircle, ChevronLeft } from 'lucide-react';
import type { FeedbackType, FeedbackWidgetProps } from '../types';

const feedbackTypes: { type: FeedbackType; label: string; icon: typeof Bug; description: string }[] = [
    { type: 'bug', label: 'Report a Bug', icon: Bug, description: 'Something isn\'t working' },
    { type: 'suggestion', label: 'Suggestion', icon: Lightbulb, description: 'Ideas to improve' },
    { type: 'content', label: 'Content Issue', icon: FileText, description: 'Inaccurate or missing info' },
    { type: 'praise', label: 'Praise', icon: Heart, description: 'Something you love' },
    { type: 'other', label: 'Other', icon: HelpCircle, description: 'Anything else' },
];

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
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [pageUrl, setPageUrl] = useState('');

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedType || !message.trim()) return;

        setIsSubmitting(true);

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
            } else {
                // Default: log to console (replace with API endpoint)
                console.log('[Feedback]', feedback);
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 500));
            }

            setSubmitted(true);

            // Reset after 3 seconds
            setTimeout(() => {
                setIsOpen(false);
                setSubmitted(false);
                setSelectedType(null);
                setMessage('');
                setEmail('');
            }, 3000);
        } catch (error) {
            console.error('Failed to submit feedback:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const reset = () => {
        setSelectedType(null);
        setMessage('');
    };

    return (
        <div className={`fixed ${positionClasses[position]} z-[9999]`}>
            {/* Toggle Button */}
            {!isOpen && (
                <button
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
                            onClick={() => setIsOpen(false)}
                            className="text-slate-400 hover:text-slate-50 transition-colors p-1 rounded-lg hover:bg-slate-700"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                        {submitted ? (
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
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        {selectedType === 'bug' ? 'Describe the issue' :
                                            selectedType === 'praise' ? 'What did you enjoy?' :
                                                'Your feedback'}
                                    </label>
                                    <textarea
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
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Email <span className="text-slate-500">(optional)</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={`w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-2.5 text-slate-50 placeholder:text-slate-500 focus:ring-2 ${accent.focus} focus:border-transparent text-sm`}
                                        placeholder="For follow-up if needed"
                                    />
                                </div>

                                {/* Page Info */}
                                <div className="text-xs text-slate-500 truncate">
                                    📍 {pageUrl.replace(/^https?:\/\//, '').slice(0, 40)}...
                                </div>

                                <button
                                    type="submit"
                                    disabled={!message.trim() || isSubmitting}
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
