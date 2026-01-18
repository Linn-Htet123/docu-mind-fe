
'use client';

import { useChatContext } from './context/ChatContext';

export default function Home() {
  const { openChat, sendMessage } = useChatContext();

  const handleSuggestionClick = async (text: string) => {
    openChat();
    // Use a small timeout to ensure the chat window is open/rendered before sending
    // although state updates should be fast enough, strictly speaking it's better to just send.
    // Our sendMessage implementation in context already handles opening the chat.
    await sendMessage(text);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="text-center max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-extrabold tracking-tighter text-black sm:text-8xl font-sans">
            Thar Lin Htet
          </h1>
          <p className="text-2xl text-gray-500 tracking-wide font-light font-sans">
            Full Stack Developer
          </p>
        </div>
        
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          <p className="text-lg text-gray-400 font-light max-w-xl mx-auto leading-relaxed">
            Interact with my AI agent to explore my professional journey, technical expertise, and project portfolio.
          </p>
          
          <div className="flex flex-col gap-4 justify-center items-center">
            <span className="text-xs uppercase tracking-widest text-gray-300">Suggested Topics</span>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "What are Thar Lin Htet core skills?",
                "Tell me about Thar Lin Htet projects",
                "How can I contact Thar Lin Htet?"
              ].map((text) => (
                <button 
                  key={text}
                  onClick={() => handleSuggestionClick(text)}
                  className="px-5 py-2.5 rounded-full bg-gray-50 text-gray-600 text-sm hover:bg-gray-100 transition-colors cursor-pointer border border-transparent hover:border-gray-200 outline-none focus:ring-2 focus:ring-gray-200"
                >
                  {text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
