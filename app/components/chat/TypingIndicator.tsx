export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
        {/* Bouncing Dots */}
        <div className="flex gap-1">
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
        </div>
        {/* Text Label */}
        <span className="text-xs text-gray-400 font-medium animate-pulse">
          Typing...
        </span>
      </div>
    </div>
  );
}
