import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'cta';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  /** Gentle pulse animation to draw attention (e.g. after a selection is made) */
  pulse?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-coral-500 text-white hover:bg-coral-600 rounded-full font-bold',
  secondary:
    'bg-white text-coral-500 border border-coral-500 hover:bg-coral-50 rounded-full font-bold',
  ghost:
    'bg-transparent text-warmblack-500 hover:bg-warmblack-100 rounded-lg',
  cta:
    'bg-accent-500 text-white hover:bg-accent-600 rounded-full font-bold',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-3.5 text-lg',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled,
  onClick,
  type = 'button',
  pulse = false,
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      animate={
        pulse && !disabled
          ? {
              scale: [1, 1.06, 1],
              boxShadow: [
                '0 0 0 0 rgba(255, 107, 66, 0)',
                '0 0 0 8px rgba(255, 107, 66, 0.25)',
                '0 0 0 0 rgba(255, 107, 66, 0)',
              ],
            }
          : undefined
      }
      transition={
        pulse && !disabled
          ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
          : undefined
      }
      className={`
        inline-flex items-center justify-center transition-colors cursor-pointer
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-500
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
