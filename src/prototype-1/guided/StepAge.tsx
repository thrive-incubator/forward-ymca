import { motion } from 'framer-motion';
import type { AgeRange } from '@/data/types';
import { staggerContainer, fadeInUp } from '@/design-system/animations';
import SelectionCard from '@/components/SelectionCard';
import Button from '@/components/Button';

interface StepAgeProps {
  value?: AgeRange;
  onChange: (age: AgeRange) => void;
  onNext: () => void;
  isKidMode: boolean;
}

const AGE_OPTIONS: { value: AgeRange; label: string; kidLabel: string; emoji: string }[] = [
  { value: '5-6', label: '5–6 years', kidLabel: "I'm 5-6!", emoji: '🧒' },
  { value: '7-8', label: '7–8 years', kidLabel: "I'm 7-8!", emoji: '😄' },
  { value: '9-10', label: '9–10 years', kidLabel: "I'm 9-10!", emoji: '🚴' },
  { value: '11-12', label: '11–12 years', kidLabel: "I'm 11-12!", emoji: '⚡' },
  { value: '13+', label: '13+ years', kidLabel: "I'm 13+!", emoji: '🔥' },
];

export default function StepAge({ value, onChange, onNext, isKidMode }: StepAgeProps) {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.h2
        variants={fadeInUp}
        className="font-display text-3xl font-bold text-warmblack-900 mb-8 text-center"
      >
        {isKidMode ? 'How old are you? 🎂' : 'How old is your child?'}
      </motion.h2>

      <div className="grid grid-cols-3 gap-4">
        {AGE_OPTIONS.map((opt) => (
          <motion.div key={opt.value} variants={fadeInUp}>
            <SelectionCard
              icon={<span className="text-4xl">{opt.emoji}</span>}
              label={isKidMode ? opt.kidLabel : opt.label}
              selected={value === opt.value}
              onClick={() => onChange(opt.value)}
              square
            />
          </motion.div>
        ))}
      </div>

      <motion.div variants={fadeInUp} className="mt-10 flex justify-center">
        <Button variant="primary" size="lg" disabled={!value} pulse={!!value} onClick={onNext}>
          Next
        </Button>
      </motion.div>
    </motion.div>
  );
}
