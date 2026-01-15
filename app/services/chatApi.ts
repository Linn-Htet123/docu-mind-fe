import axios, { AxiosInstance } from 'axios';
import { SendMessageRequest, StreamChunkData } from '../types/chat.types';
import { axiosInstance } from '../utils/axios';



export const chatApi = {
    async sendMessage(
        request: SendMessageRequest,
        onChunk: (text: string) => void,
        onSources: (sources: string[]) => void,
        onError: (error: Error) => void
    ): Promise<void> {
        try {
            // Use fetch for streaming since axios doesn't support ReadableStream in browser
            const fetchResponse = await fetch(`${axiosInstance.defaults.baseURL}/ai/stream`, {
                method: 'POST',
                headers: axiosInstance.defaults.headers as HeadersInit,
                body: JSON.stringify(request),
            });

            if (!fetchResponse.ok) {
                throw new Error(`HTTP error! status: ${fetchResponse.status}`);
            }

            if (!fetchResponse.body) {
                throw new Error('No response body');
            }

            const reader = fetchResponse.body.getReader();
            const decoder = new TextDecoder();
            let done = false;
            let buffer = '';

            while (!done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                const chunkValue = decoder.decode(value, { stream: true });
                buffer += chunkValue;

                const lines = buffer.split('\n\n');
                buffer = lines.pop() || '';

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const jsonStr = line.slice(6);
                        try {
                            if (jsonStr === '[DONE]') continue;
                            const parsed: StreamChunkData = JSON.parse(jsonStr);

                            if (parsed.data?.reply) {
                                onChunk(parsed.data.reply);
                            }

                            if (parsed.sources) {
                                onSources(parsed.sources);
                            }
                        } catch (err) {
                            console.error('Error parsing JSON chunk', err);
                        }
                    }
                }
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                onError(new Error(error.message || 'Request failed'));
            } else {
                onError(error instanceof Error ? error : new Error('Unknown error'));
            }
        }
    },
};
