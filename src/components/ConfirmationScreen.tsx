import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import Button from '@/components/Button';

interface ConfirmationScreenProps {
  programName: string;
  branchName: string;
  firstPractice: string;
  onDone: () => void;
}

export default function ConfirmationScreen({
  programName,
  branchName,
  firstPractice,
  onDone,
}: ConfirmationScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="flex flex-col items-center text-center py-12 px-6 max-w-md mx-auto"
    >
      {/* Checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 18 }}
        className="text-coral-500 mb-6"
      >
        <CheckCircle size={72} strokeWidth={1.5} />
      </motion.div>

      {/* Heading */}
      <h1 className="font-display text-3xl font-bold text-warmblack-900 mb-2">
        You&rsquo;re in!
      </h1>
      <p className="text-warmblack-400 mb-8">
        Registered for <span className="font-bold text-warmblack-700">{programName}</span> at{' '}
        <span className="text-warmblack-600">{branchName}</span>
      </p>

      {/* Timeline */}
      <ol className="text-left w-full space-y-4 mb-10">
        {[
          { label: 'Registration confirmed', detail: 'Confirmation email sent' },
          { label: 'Coach will contact you', detail: 'Expect an email within 48 hours' },
          { label: 'First practice', detail: firstPractice },
        ].map((item, i) => (
          <li key={i} className="flex gap-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-coral-100 text-coral-600 font-bold text-sm flex items-center justify-center">
              {i + 1}
            </span>
            <div>
              <p className="font-display font-semibold text-sm text-warmblack-800">
                {item.label}
              </p>
              <p className="text-xs text-warmblack-400">{item.detail}</p>
            </div>
          </li>
        ))}
      </ol>

      {/* Done */}
      <Button variant="primary" size="lg" onClick={onDone}>
        Done
      </Button>
    </motion.div>
  );
}
