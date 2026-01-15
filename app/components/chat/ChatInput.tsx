import { Send } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  disabled: boolean;
}

export default function ChatInput({
  value,
  onChange,
  onSubmit,
  disabled,
}: ChatInputProps) {
  return (
    <form onSubmit={onSubmit} className="p-4 bg-white border-t border-gray-100">
      <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 focus-within:ring-1 focus-within:ring-black transition-all">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder:text-gray-400"
        />
        <button
          type="submit"
          disabled={disabled}
          className="p-2 bg-black rounded-full text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
