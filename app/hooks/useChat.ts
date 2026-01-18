import { useState, useRef, useEffect } from 'react';
import { Message } from '../types/chat.types';
import { chatApi } from '../services/chatApi';

interface UseChatReturn {
    messages: Message[];
    isTyping: boolean;
    inputValue: string;
    setInputValue: (value: string) => void;
    sendMessage: (e?: React.FormEvent, messageText?: string) => Promise<void>;
    messagesEndRef: React.RefObject<HTMLDivElement>;
}

export function useChat(sessionId: string): UseChatReturn {
    const [messages, setMessages] = useState<Message[]>([
        { id: 'init', text: 'Hello! How can I help you today?', sender: 'ai' },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const sendMessage = async (e?: React.FormEvent, messageText?: string) => {
        e?.preventDefault();

        const finalMessage = messageText || inputValue.trim();
        if (!finalMessage || (isTyping && !messageText)) return;

        const userText = finalMessage;

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            text: userText,
            sender: 'user',
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Add empty AI placeholder
        const aiMessageId = (Date.now() + 1).toString();
        setMessages((prev) => [
            ...prev,
            { id: aiMessageId, text: '', sender: 'ai' },
        ]);


        await chatApi.sendMessage(
            {
                message: userText,
                sessionId,
                model: 'llama3.2',
            },
            // onChunk
            (textChunk: string) => {
                setIsTyping(false);
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg.id === aiMessageId
                            ? { ...msg, text: msg.text + textChunk }
                            : msg
                    )
                );
            },
            // onSources
            (sources: string[]) => {
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg.id === aiMessageId ? { ...msg, sources } : msg
                    )
                );
            },

            (error: Error) => {
                console.error('Streaming failed', error);
                setIsTyping(false);
                setMessages((prev) => [
                    ...prev,
                    {
                        id: Date.now().toString(),
                        text: 'Sorry, I encountered an error.',
                        sender: 'ai',
                    },
                ]);
            }
        );
    };

    return {
        messages,
        isTyping,
        inputValue,
        setInputValue,
        sendMessage,
        messagesEndRef: messagesEndRef as React.RefObject<HTMLDivElement>,
    };
}
