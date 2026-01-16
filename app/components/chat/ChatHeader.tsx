import { Bot } from 'lucide-react';

interface ChatHeaderProps {
  sessionId: string;
}

export default function ChatHeader({ sessionId }: ChatHeaderProps) {
  return (
    <div className="bg-black p-4 flex items-center justify-between">
      <div className="flex items-center gap-2 text-white">
        <Bot className="w-6 h-6" />
        <h3 className="font-bold">Alice</h3>
      </div>
      <div className="text-xs text-gray-400">ID: {sessionId.slice(0, 4)}</div>
    </div>
  );
}
