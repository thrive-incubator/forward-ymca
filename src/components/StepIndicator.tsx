import { motion } from 'framer-motion';

interface StepIndicatorProps {
  totalSteps: number;
  currentStep: number;
}

export default function StepIndicator({ totalSteps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-3" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={totalSteps}>
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1;
        const isCurrent = step === currentStep;
        const isPast = step < currentStep;

        return (
          <motion.div
            key={step}
            animate={{
              scale: isCurrent ? 1 : 0.85,
              backgroundColor: isCurrent
                ? 'var(--color-coral-500)'
                : isPast
                  ? 'var(--color-coral-300)'
                  : 'var(--color-warmblack-200)',
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="rounded-full"
            style={{
              width: isCurrent ? 12 : 10,
              height: isCurrent ? 12 : 10,
            }}
          />
        );
      })}
    </div>
  );
}
