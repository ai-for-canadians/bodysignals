export type FeedbackType = 'bug' | 'suggestion' | 'content' | 'praise' | 'other';

export interface Feedback {
    id: string;
    siteId: string;
    pageUrl: string;
    type: FeedbackType;
    message: string;
    email?: string;
    createdAt: string;
    userAgent?: string;
}

export interface FeedbackWidgetProps {
    siteId: string;
    position?: 'bottom-right' | 'bottom-left';
    accentColor?: string;
    onSubmit?: (feedback: Omit<Feedback, 'id' | 'createdAt'>) => Promise<void>;
}
