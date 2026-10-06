import React, { useState } from 'react';
import { MessageSquare, Bot, Sparkles, X } from 'lucide-react';
import { AiAssistantModal } from './AiAssistantModal';

export const FloatingConversationButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTooltipDismissed, setIsTooltipDismissed] = useState(false);

  return (
    <>
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
        {/* Helper popup banner (dismissible) */}
        {!isOpen && !isTooltipDismissed && (
          <div className="hidden sm:flex items-center gap-2 py-2 px-3.5 rounded-2xl bg-neutral-900/95 border border-orange-500/30 text-white text-xs shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-neutral-200">
              Need fitness advice? Ask <strong className="text-orange-400">GYM CORE AI</strong>
            </span>
            <button
              onClick={() => setIsTooltipDismissed(true)}
              className="text-neutral-400 hover:text-white p-0.5 ml-1 cursor-pointer"
              title="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Floating Action Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-xl shadow-orange-500/30 active:scale-95 transition-all cursor-pointer border border-orange-400/30"
          title="Open GYM CORE Conversation & Fitness Coach"
        >
          <div className="relative">
            <Bot className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-neutral-900 animate-pulse" />
          </div>
          <span className="font-bold text-xs uppercase tracking-wider hidden sm:inline">
            Gym Core Conversation
          </span>
          <MessageSquare className="w-4 h-4 text-orange-200" />
        </button>
      </div>

      {/* AI Assistant Conversation Modal */}
      <AiAssistantModal isOpen={isOpen} onClose={() => setIsOpen(false)} initialTab="chat" />
    </>
  );
};
