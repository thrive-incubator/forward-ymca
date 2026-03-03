import SelectionCard from '@/components/SelectionCard';
import type { SportCategory } from '@/data/types';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/design-system/animations';
import { Trophy, Target, Music, Waves, Mountain, Star } from 'lucide-react';
import type { ReactNode } from 'react';

interface FamilyStepInterestsProps {
  selected: SportCategory[];
  onToggle: (cat: SportCategory) => void;
}

const categoryOptions: { value: SportCategory; label: string; icon: ReactNode; description: string }[] = [
  {
    value: 'team-sports',
    label: 'Team Sports',
    icon: <Trophy size={32} />,
    description: 'Soccer, basketball, flag football...',
  },
  {
    value: 'individual-sports',
    label: 'Individual Sports',
    icon: <Target size={32} />,
    description: 'Track, martial arts, skateboarding...',
  },
  {
    value: 'creative-movement',
    label: 'Creative Movement',
    icon: <Music size={32} />,
    description: 'Dance, choreography, expression...',
  },
  {
    value: 'water-sports',
    label: 'Water Sports',
    icon: <Waves size={32} />,
    description: 'Swimming, water polo...',
  },
  {
    value: 'outdoor-adventure',
    label: 'Outdoor Adventure',
    icon: <Mountain size={32} />,
    description: 'Hiking, climbing, nature...',
  },
  {
    value: 'multi-sport',
    label: 'Multi-Sport',
    icon: <Star size={32} />,
    description: 'Try a little of everything!',
  },
];

export default function FamilyStepInterests({
  selected,
  onToggle,
}: FamilyStepInterestsProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        variants={fadeInUp}
        className="text-2xl font-display font-bold text-warmblack-900 mb-2"
      >
        What sounds fun?
      </motion.h2>
      <motion.p
        variants={fadeInUp}
        className="text-lg text-warmblack-400 mb-6"
      >
        Pick as many as you like!
      </motion.p>
      <motion.div
        variants={fadeInUp}
        className="grid grid-cols-3 gap-4"
      >
        {categoryOptions.map((cat) => (
          <SelectionCard
            key={cat.value}
            icon={cat.icon}
            label={cat.label}
            description={cat.description}
            selected={selected.includes(cat.value)}
            onClick={() => onToggle(cat.value)}
            className="min-h-[120px] justify-center"
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
