import { useId } from 'react';

export function useSessionId(): string {
    const sessionId = useId();

    return sessionId;
}
