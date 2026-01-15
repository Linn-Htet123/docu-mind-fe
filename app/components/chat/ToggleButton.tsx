import { MessageCircle, X } from 'lucide-react';

interface ToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function ToggleButton({ isOpen, onClick }: ToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        cursor-pointer
        h-14 w-14 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 hover:scale-110 active:scale-95
        ${isOpen ? 'bg-black rotate-90' : 'bg-black hover:bg-gray-800'}
      `}
    >
      {isOpen ? <X className="w-8 h-8" /> : <MessageCircle className="w-8 h-8" />}
    </button>
  );
}
