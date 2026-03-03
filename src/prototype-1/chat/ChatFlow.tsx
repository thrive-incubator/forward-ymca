import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Type } from 'lucide-react';
import type { Program } from '@/data/types';
import { useGeminiChat } from '@/prototype-1/chat/useGeminiChat';
import ChatBubble from '@/prototype-1/chat/ChatBubble';
import ChatInput from '@/prototype-1/chat/ChatInput';
import QuickReplyChips from '@/prototype-1/chat/QuickReplyChips';

interface ChatFlowProps {
  onSignUp: (program: Program) => void;
  onBack: () => void;
}

const FONT_OPTIONS = [
  { label: 'Lora', className: 'font-chat' },
  { label: 'Fraunces', className: 'font-chat-alt' },
] as const;

export default function ChatFlow({ onSignUp, onBack }: ChatFlowProps) {
  const { messages, isLoading, sendMessage } = useGeminiChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [fontIndex, setFontIndex] = useState(0);

  const currentFont = FONT_OPTIONS[fontIndex];

  // Find the quick replies from the last assistant message
  const lastAssistantMsg = [...messages].reverse().find((m) => m.role === 'assistant');
  const quickReplies = lastAssistantMsg && !lastAssistantMsg.isStreaming
    ? lastAssistantMsg.quickReplies
    : [];

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  function toggleFont() {
    setFontIndex((i) => (i + 1) % FONT_OPTIONS.length);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className="flex flex-col h-[calc(100vh-8rem)] bg-surface-200 -mx-6 -mt-10 px-5 pt-5 pb-0 rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-warmblack-400 hover:text-warmblack-600 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <h2 className="font-display font-bold text-lg text-warmblack-800">Find Your Team</h2>
        <button
          type="button"
          onClick={toggleFont}
          className="flex items-center gap-1 text-xs text-warmblack-400 hover:text-warmblack-600 transition-colors cursor-pointer"
          title={`Font: ${currentFont.label}`}
        >
          <Type size={14} />
          {currentFont.label}
        </button>
      </div>

      {/* Messages area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-5 pb-3 -mx-1 px-1"
      >
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            message={msg}
            onSignUp={onSignUp}
            fontClass={currentFont.className}
          />
        ))}
      </div>

      {/* Quick reply chips — pinned above input */}
      <div className="flex-shrink-0 px-1 pb-2">
        <QuickReplyChips
          options={quickReplies}
          onSelect={sendMessage}
          disabled={isLoading}
        />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 -mx-5">
        <ChatInput onSend={sendMessage} disabled={isLoading} fontClass={currentFont.className} />
      </div>
    </motion.div>
  );
}
