import { motion } from 'framer-motion';

interface QuickReplyChipsProps {
  options: string[];
  onSelect: (option: string) => void;
  disabled: boolean;
}

export default function QuickReplyChips({ options, onSelect, disabled }: QuickReplyChipsProps) {
  if (options.length === 0) return null;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06 } },
      }}
      className="flex flex-wrap gap-2 mt-2"
    >
      {options.map((option) => (
        <motion.button
          key={option}
          type="button"
          variants={{
            hidden: { opacity: 0, y: 8, scale: 0.95 },
            visible: { opacity: 1, y: 0, scale: 1 },
          }}
          whileTap={disabled ? undefined : { scale: 0.93 }}
          whileHover={disabled ? undefined : { scale: 1.04 }}
          onClick={() => !disabled && onSelect(option)}
          disabled={disabled}
          className="
            px-4 py-2 rounded-full
            bg-white border-2 border-coral-200
            font-display font-semibold text-base text-coral-600
            hover:bg-coral-50 hover:border-coral-400
            active:bg-coral-100
            transition-colors cursor-pointer
            disabled:opacity-40 disabled:cursor-not-allowed
            shadow-sm
          "
        >
          {option}
        </motion.button>
      ))}
    </motion.div>
  );
}
