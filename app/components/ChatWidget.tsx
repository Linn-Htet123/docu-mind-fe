'use client';

import { useChatContext } from '../context/ChatContext';
import ChatHeader from './chat/ChatHeader';
import MessageList from './chat/MessageList';
import ChatInput from './chat/ChatInput';
import ToggleButton from './chat/ToggleButton';

export default function ChatWidget() {
  const {
    isOpen,
    toggleChat,
    sessionId,
    messages,
    isTyping,
    inputValue,
    setInputValue,
    sendMessage,
    messagesEndRef,
  } = useChatContext();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 font-sans">
      {/* Chat Window */}
      <div
        className={`
          w-[450px] h-[650px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col
          transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-bottom-right
          ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8 pointer-events-none'}
        `}
      >
        <ChatHeader sessionId={sessionId} />
        <MessageList
          messages={messages}
          isTyping={isTyping}
          messagesEndRef={messagesEndRef}
        />
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(inputValue);
          }}
          disabled={!inputValue.trim() || isTyping}
        />
      </div>

      {/* Toggle Button */}
      <ToggleButton isOpen={isOpen} onClick={toggleChat} />
    </div>
  );
}