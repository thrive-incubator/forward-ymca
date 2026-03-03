import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import type { Program } from '@/data/types';

interface SignupConfirmationProps {
  program: Program;
  childName: string;
}

export default function SignupConfirmation({ program, childName }: SignupConfirmationProps) {
  return (
    <section className="py-16 md:py-24 bg-surface-50">
      <motion.div
        className="max-w-md mx-auto px-6 flex flex-col items-center text-center"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        {/* Check icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.15 }}
        >
          <CheckCircle size={64} className="text-coral-500" strokeWidth={1.5} />
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="mt-6 text-3xl md:text-4xl font-display font-black text-warmblack-900"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Welcome to {program.name}!
        </motion.h2>

        {/* Personalized message */}
        <motion.p
          className="mt-4 text-warmblack-500 leading-relaxed"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          We&rsquo;re excited to have <span className="font-semibold text-warmblack-700">{childName}</span> on
          the team. Your coach will reach out within 48 hours with next steps.
        </motion.p>

        {/* Subtle confirmation */}
        <motion.p
          className="mt-6 text-sm text-warmblack-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          A confirmation email is on its way.
        </motion.p>
      </motion.div>
    </section>
  );
}
