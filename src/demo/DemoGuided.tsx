import { motion } from 'framer-motion';
import type { Program } from '@/data/types';
import GuidedFlow from '@/prototype-1/guided/GuidedFlow';

interface DemoGuidedProps {
  onSignUp: (program: Program) => void;
  onBack: () => void;
}

export default function DemoGuided({ onSignUp, onBack }: DemoGuidedProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className="min-h-dvh bg-surface-50"
    >
      {/* Header */}
      <div className="w-full flex items-center justify-center py-3 px-4 bg-white/80 backdrop-blur-sm border-b border-warmblack-100">
        <p className="font-display font-bold text-coral-500 tracking-tight">
          HereForward
        </p>
      </div>

      {/* Guided flow container */}
      <div className="max-w-xl mx-auto px-6 py-6">
        <GuidedFlow
          onSignUp={onSignUp}
          onBack={onBack}
          isKidMode={false}
        />
      </div>
    </motion.div>
  );
}
