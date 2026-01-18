import { FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../../types/chat.types';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={`flex flex-col w-full ${
        message.sender === 'user' ? 'items-end' : 'items-start'
      }`}
    >
      <div
        className={`
          max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm
          ${
            message.sender === 'user'
              ? 'bg-black text-white rounded-br-none'
              : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
          }
        `}
      >
        <div
          className="prose prose-sm max-w-none
            prose-p:my-1 prose-p:leading-relaxed
            prose-pre:bg-gray-100 prose-pre:p-2 prose-pre:rounded
            prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs
            prose-ul:my-1 prose-ol:my-1
            prose-li:my-0.5
            prose-headings:my-2
          "
        >
          <ReactMarkdown>{message.text}</ReactMarkdown>
        </div>
        {/* {message.sources && message.sources.length > 0 && (
          <div className="mt-3 pt-2 border-t border-gray-100">
            <p className="text-[10px] font-semibold text-gray-400 mb-1 uppercase tracking-wider">
              Sources
            </p>
            <div className="flex flex-wrap gap-1">
              {message.sources.map((source, idx) => (
                <span
                  key={idx}
                  className="flex items-center gap-1 text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-md"
                >
                  <FileText className="w-3 h-3" />
                  {source}
                </span>
              ))}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}
