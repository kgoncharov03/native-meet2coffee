type Access = 'USER' | 'ADMIN';
type SWLYValue = 'SWLY_NONE' | 'SWLY_ALLOWED';

export type User = {
    token: string;
    meta: {
        access: Access;
        ctime: string;
        id: string;
        linkedinId: string;
        mtime: string;
        notVerified: boolean;
        password: '';
        seeWhoLikesYou: SWLYValue;
    };
    spec: {
        avatar?: string;
        bio?: string;
        displayedCompany?: string;
        email?: string;
        exp?: string;
        headline?: string;
        interests?: {
            value: string[];
        };
        manualGeo?: string;
        manualGeoCoords?: {
            value: {
                longitude: number;
                latitude: number;
            };
        };
    };
    status: {
        imageExists: boolean;
        imageSuffix: boolean;
    };
};

export type ChatItem = {
    chatId: string;
    name: string;
    pinned: number;
    unread: boolean;
    lastMessagePreview: {
        ctime: string;
        text: string;
    };
};
export type ChatResponse = {
    chats: Array<ChatItem>;
    total: number;
};

type ApiCallErrorProps = {
    code?: number;
    message?: string;
};

export class ApiCallError extends Error {
    constructor({ code, message }: ApiCallErrorProps) {
        super(message);
        this.code = code;
        this.name = 'ApiCallError';
    }

    public code: number | undefined;
    public name: string;
}
