import { Message } from '../../types/chat.types';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export default function MessageList({
  messages,
  isTyping,
  messagesEndRef,
}: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scroll-smooth">
      {messages.map((msg) => {
        // Hide empty AI messages so the Typing indicator is shown instead
        if (msg.sender === 'ai' && !msg.text) return null;

        return <ChatMessage key={msg.id} message={msg} />;
      })}

      {/* Typing Indicator: Shown when isTyping is true */}
      {isTyping && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
}
