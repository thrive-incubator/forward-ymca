import { motion } from 'framer-motion';
import type { SportCategory } from '@/data/types';
import { staggerContainer, fadeInUp } from '@/design-system/animations';
import SelectionCard from '@/components/SelectionCard';
import Button from '@/components/Button';

interface StepInterestsProps {
  value: SportCategory[];
  onChange: (categories: SportCategory[]) => void;
  onNext: () => void;
  isKidMode: boolean;
}

const INTEREST_OPTIONS: {
  value: SportCategory;
  label: string;
  kidLabel: string;
  emoji: string;
}[] = [
  { value: 'team-sports', label: 'Team Sports', kidLabel: 'Team Sports!', emoji: '⚽' },
  { value: 'individual-sports', label: 'Individual Sports', kidLabel: 'Solo Sports!', emoji: '🥋' },
  { value: 'creative-movement', label: 'Creative Movement', kidLabel: 'Dance & Move!', emoji: '💃' },
  { value: 'water-sports', label: 'Water Sports', kidLabel: 'Water Fun!', emoji: '🏊' },
  { value: 'outdoor-adventure', label: 'Outdoor Adventure', kidLabel: 'Explore Outside!', emoji: '🏔️' },
  { value: 'multi-sport', label: 'Multi-Sport', kidLabel: 'Try Everything!', emoji: '🌟' },
];

export default function StepInterests({ value, onChange, onNext, isKidMode }: StepInterestsProps) {
  function toggleCategory(cat: SportCategory) {
    if (value.includes(cat)) {
      onChange(value.filter((c) => c !== cat));
    } else {
      onChange([...value, cat]);
    }
  }

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.h2
        variants={fadeInUp}
        className="font-display text-3xl font-bold text-warmblack-900 mb-2 text-center"
      >
        {isKidMode ? 'What sounds fun? 🎉' : 'What sounds fun to them?'}
      </motion.h2>
      <motion.p variants={fadeInUp} className="text-base text-warmblack-400 text-center mb-8">
        Pick as many as you like
      </motion.p>

      <div className="grid grid-cols-3 gap-4">
        {INTEREST_OPTIONS.map((opt) => (
          <motion.div key={opt.value} variants={fadeInUp}>
            <SelectionCard
              icon={<span className="text-4xl">{opt.emoji}</span>}
              label={isKidMode ? opt.kidLabel : opt.label}
              selected={value.includes(opt.value)}
              onClick={() => toggleCategory(opt.value)}
              square
            />
          </motion.div>
        ))}
      </div>

      <motion.div variants={fadeInUp} className="mt-10 flex justify-center">
        <Button variant="primary" size="lg" disabled={value.length === 0} pulse={value.length > 0} onClick={onNext}>
          Next
        </Button>
      </motion.div>
    </motion.div>
  );
}
