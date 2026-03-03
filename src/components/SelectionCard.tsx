import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SelectionCardProps {
  icon: ReactNode;
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
  /** Renders the card as a square with centered content */
  square?: boolean;
}

export default function SelectionCard({
  icon,
  label,
  description,
  selected,
  onClick,
  className = '',
  square = false,
}: SelectionCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
      className={`
        w-full flex flex-col items-center justify-center text-center rounded-2xl border-2 transition-all cursor-pointer
        ${square ? 'aspect-square p-4' : 'p-6'}
        ${
          selected
            ? 'border-coral-500 bg-coral-50 text-coral-600 shadow-card-hover'
            : 'border-warmblack-100 bg-white text-warmblack-700 hover:border-warmblack-200 hover:shadow-card'
        }
        ${className}
      `}
    >
      <div className={square ? 'text-4xl mb-2' : 'mb-3'}>{icon}</div>
      <span className="font-display font-bold text-base leading-tight">{label}</span>
      {description && (
        <span
          className={`text-sm mt-1.5 leading-tight ${
            selected ? 'text-coral-400' : 'text-warmblack-400'
          }`}
        >
          {description}
        </span>
      )}
    </motion.button>
  );
}
