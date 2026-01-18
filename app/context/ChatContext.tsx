'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useChat } from '../hooks/useChat';
import { useSessionId } from '../hooks/useSessionId';
import { Message } from '../types/chat.types';

interface ChatContextType {
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  messages: Message[];
  isTyping: boolean;
  inputValue: string;
  setInputValue: (value: string) => void;
  sendMessage: (text: string) => Promise<void>;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  sessionId: string;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const sessionId = useSessionId();
  const {
    messages,
    isTyping,
    inputValue,
    setInputValue,
    sendMessage: originalSendMessage,
    messagesEndRef,
  } = useChat(sessionId);

  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);
  const toggleChat = () => setIsOpen((prev) => !prev);

  const sendMessage = async (text: string) => {
    // If chat is closed, open it
    if (!isOpen) setIsOpen(true);
    
    // Call the original sendMessage with the text
    await originalSendMessage(undefined, text);
  };

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        openChat,
        closeChat,
        toggleChat,
        messages,
        isTyping,
        inputValue,
        setInputValue,
        sendMessage,
        messagesEndRef,
        sessionId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}
