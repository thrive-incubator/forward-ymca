import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Program } from '@/data/types';
import { useDemoChat } from '@/demo/useDemoChat';
import type { ChatMessage } from '@/demo/useDemoChat';
import ChatBubble from '@/prototype-1/chat/ChatBubble';
import ChatInput from '@/prototype-1/chat/ChatInput';
import QuickReplyChips from '@/prototype-1/chat/QuickReplyChips';

interface DemoChatProps {
  onSignUp: (program: Program) => void;
  onSwitchToGuided: () => void;
}

export default function DemoChat({ onSignUp, onSwitchToGuided }: DemoChatProps) {
  const { messages, isLoading, sendMessage } = useDemoChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  const lastAssistantMsg = [...messages].reverse().find((m: ChatMessage) => m.role === 'assistant');
  const quickReplies = lastAssistantMsg && !lastAssistantMsg.isStreaming
    ? lastAssistantMsg.quickReplies
    : [];

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Render message content, replacing the [BROWSE_LINK] token with a clickable link
  function renderGreetingWithLink(msg: ChatMessage) {
    if (msg.id !== 'greeting') {
      return (
        <ChatBubble
          message={msg}
          onSignUp={onSignUp}
          fontClass="font-chat"
        />
      );
    }

    // Split the greeting on [BROWSE_LINK]
    const parts = msg.content.split('[BROWSE_LINK]');
    if (parts.length < 2) {
      return (
        <ChatBubble
          message={msg}
          onSignUp={onSignUp}
          fontClass="font-chat"
        />
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-2"
      >
        <div className="px-1">
          {parts[0].split('\n').map((line, j) => (
            <p key={j} className="font-chat text-xl leading-relaxed text-warmblack-900">
              {line || '\u00A0'}
            </p>
          ))}
          <p className="font-chat text-xl leading-relaxed text-warmblack-900">
            <button
              type="button"
              onClick={onSwitchToGuided}
              className="text-accent-600 underline underline-offset-2 hover:text-accent-700 transition-colors cursor-pointer"
            >
              (Or switch to interactive mode)
            </button>
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className="h-dvh bg-gradient-to-b from-coral-50 to-surface-100 flex items-center justify-center p-6"
    >
      {/* Phone-style chat frame */}
      <motion.div
        className="flex flex-col w-full max-w-[30%] min-w-[360px] h-[85vh] bg-white rounded-3xl shadow-elevated overflow-hidden border border-warmblack-100/50"
        initial={{ y: 30, scale: 0.97 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Header */}
        <div className="flex items-center justify-center py-3.5 px-4 bg-white border-b border-warmblack-100/60 flex-shrink-0 rounded-t-3xl">
          <p className="font-display font-bold text-coral-500 tracking-tight">
            HereForward
          </p>
        </div>

        {/* Messages area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-5 pt-5 pb-3 space-y-5 bg-surface-200/60"
        >
          {messages.map((msg: ChatMessage) => (
            <div key={msg.id}>
              {renderGreetingWithLink(msg)}
            </div>
          ))}
        </div>

        {/* Quick reply chips */}
        <div className="flex-shrink-0 px-5 pb-2 pt-2 bg-white/60">
          <QuickReplyChips
            options={quickReplies}
            onSelect={sendMessage}
            disabled={isLoading}
          />
        </div>

        {/* Input */}
        <div className="flex-shrink-0 rounded-b-3xl overflow-hidden">
          <ChatInput onSend={sendMessage} disabled={isLoading} fontClass="font-chat" />
        </div>
      </motion.div>
    </motion.div>
  );
}
