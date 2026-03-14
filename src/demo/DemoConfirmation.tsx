import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import type { Program } from '@/data/types';
import { branches } from '@/data/branches';
import Button from '@/components/Button';

interface DemoConfirmationProps {
  program: Program;
  onReset: () => void;
}

function getBranchName(branchId: string): string {
  const branch = branches.find((b) => b.id === branchId);
  return branch ? branch.name : branchId;
}

export default function DemoConfirmation({ program, onReset }: DemoConfirmationProps) {
  const branchId = program.branchIds[0];

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-surface-50 px-6">
      <motion.div
        className="text-center max-w-md"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        {/* Checkmark */}
        <motion.div
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent-50 mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.15 }}
        >
          <CheckCircle size={48} className="text-accent-500" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="font-display font-black text-3xl text-warmblack-900"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          You're on the list!
        </motion.h1>

        {/* Details */}
        <motion.p
          className="mt-4 text-lg text-warmblack-600 leading-relaxed"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          You're signed up for{' '}
          <span className="font-bold text-warmblack-800">{program.name}</span>
          {branchId && (
            <>
              {' '}at{' '}
              <span className="font-bold text-warmblack-800">{getBranchName(branchId)}</span>
            </>
          )}
          . We'll text you a reminder the week before it starts.
        </motion.p>

        {/* Next steps */}
        <motion.p
          className="mt-4 text-base text-warmblack-500 leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          Someone from our team will reach out to get the details we need to make sure your kid is part of the team.
        </motion.p>

        {/* Tagline */}
        <motion.p
          className="mt-6 font-display font-bold text-xl text-coral-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.7 }}
        >
          Welcome to the team.
        </motion.p>

        {/* Start over */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          <Button variant="secondary" size="md" className="rounded-full" onClick={onReset}>
            Start Over
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
