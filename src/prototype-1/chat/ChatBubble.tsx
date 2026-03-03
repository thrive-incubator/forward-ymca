import { motion } from 'framer-motion';
import type { Program } from '@/data/types';
import ProgramCard from '@/components/ProgramCard';
import type { ChatMessage } from '@/prototype-1/chat/useGeminiChat';

interface ChatBubbleProps {
  message: ChatMessage;
  onSignUp?: (program: Program) => void;
  fontClass: string;
}

const PROGRAM_CARD_SPLIT = /(\[PROGRAM_CARD:[a-z0-9-]+\])/g;
const PROGRAM_CARD_ID = /\[PROGRAM_CARD:([a-z0-9-]+)\]/;

export default function ChatBubble({ message, onSignUp, fontClass }: ChatBubbleProps) {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex justify-end"
      >
        <div className="bg-coral-500 text-white rounded-2xl rounded-br-md px-5 py-3 max-w-[80%] shadow-sm">
          <p className={`${fontClass} text-xl leading-relaxed`}>{message.content}</p>
        </div>
      </motion.div>
    );
  }

  // Assistant message: parse [PROGRAM_CARD:id] tokens
  const parts = message.content.split(PROGRAM_CARD_SPLIT);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-2"
    >
      {parts.map((part, i) => {
        const idMatch = part.match(PROGRAM_CARD_ID);
        if (idMatch) {
          const program = message.programCards.find((p) => p.id === idMatch[1]);
          if (program) {
            return (
              <div key={i} className="my-2">
                <ProgramCard program={program} variant="compact" onSignUp={onSignUp} />
              </div>
            );
          }
          return null;
        }

        // Regular text — no bubble, just text on the beige background
        const trimmed = part.trim();
        if (!trimmed) return null;

        return (
          <div key={i} className="px-1">
            {trimmed.split('\n').map((line, j) => (
              <p key={j} className={`${fontClass} text-xl leading-relaxed text-warmblack-900`}>
                {line || '\u00A0'}
              </p>
            ))}
          </div>
        );
      })}

      {/* Streaming indicator */}
      {message.isStreaming && message.content === '' && (
        <div className="px-1 inline-flex gap-1.5 py-2">
          <span className="w-2.5 h-2.5 bg-coral-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2.5 h-2.5 bg-coral-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2.5 h-2.5 bg-coral-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      )}
    </motion.div>
  );
}
