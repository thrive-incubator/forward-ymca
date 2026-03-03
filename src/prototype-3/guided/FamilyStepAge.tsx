import SelectionCard from '@/components/SelectionCard';
import type { AgeRange } from '@/data/types';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/design-system/animations';

interface FamilyStepAgeProps {
  selected: AgeRange | null;
  onSelect: (age: AgeRange) => void;
}

const ageOptions: { value: AgeRange; label: string; emoji: string }[] = [
  { value: '5-6', label: 'Ages 5-6', emoji: '5-6' },
  { value: '7-8', label: 'Ages 7-8', emoji: '7-8' },
  { value: '9-10', label: 'Ages 9-10', emoji: '9-10' },
  { value: '11-12', label: 'Ages 11-12', emoji: '11-12' },
  { value: '13+', label: 'Ages 13+', emoji: '13+' },
];

export default function FamilyStepAge({ selected, onSelect }: FamilyStepAgeProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        variants={fadeInUp}
        className="text-2xl font-display font-bold text-warmblack-900 mb-6"
      >
        How old is your child?
      </motion.h2>
      <motion.div
        variants={fadeInUp}
        className="grid grid-cols-5 gap-4"
      >
        {ageOptions.map((age) => (
          <SelectionCard
            key={age.value}
            icon={
              <span className="text-3xl font-display font-black text-warmblack-600">
                {age.emoji}
              </span>
            }
            label={age.label}
            selected={selected === age.value}
            onClick={() => onSelect(age.value)}
            className="min-h-[120px] justify-center"
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
