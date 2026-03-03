import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
  fontClass: string;
}

export default function ChatInput({ onSend, disabled, fontClass }: ChatInputProps) {
  const [text, setText] = useState('');

  function handleSubmit() {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText('');
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div className="flex items-end gap-3 bg-surface-100 border-t border-warmblack-100 px-4 py-3">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type here or tap an option above..."
        disabled={disabled}
        className={`flex-1 rounded-full border border-warmblack-200 bg-white px-5 py-3 text-lg ${fontClass} text-warmblack-900 placeholder-warmblack-300 outline-none focus:border-coral-400 focus:ring-1 focus:ring-coral-400 transition-colors disabled:opacity-50`}
      />
      <motion.button
        type="button"
        whileTap={disabled ? undefined : { scale: 0.9 }}
        onClick={handleSubmit}
        disabled={disabled || text.trim().length === 0}
        className="flex-shrink-0 w-11 h-11 rounded-full bg-coral-500 text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors hover:bg-coral-600"
      >
        <ArrowUp size={20} />
      </motion.button>
    </div>
  );
}
