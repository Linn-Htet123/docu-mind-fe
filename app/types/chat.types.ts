export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    sources?: string[];
}

export interface ChatSession {
    sessionId: string;
}

export interface SendMessageRequest {
    message: string;
    sessionId: string;
    model: string;
}

export interface StreamChunkData {
    data?: {
        reply: string;
    };
    sources?: string[];
}
