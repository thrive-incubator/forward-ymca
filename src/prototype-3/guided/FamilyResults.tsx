import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/design-system/animations';
import type { Program } from '@/data/types';
import ProgramCard from '@/components/ProgramCard';

interface FamilyResultsProps {
  programs: Program[];
  childName: string;
  isFirstTimer: boolean;
  onSelectProgram: (program: Program) => void;
}

export default function FamilyResults({
  programs,
  childName,
  isFirstTimer,
  onSelectProgram,
}: FamilyResultsProps) {
  const heading = isFirstTimer
    ? `Great picks for ${childName || 'your child'}!`
    : `Here's what we found for ${childName || 'your child'}`;

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
        {heading}
      </motion.h2>
      <motion.p variants={fadeInUp} className="text-lg text-warmblack-400 mb-6">
        {programs.length} program{programs.length !== 1 ? 's' : ''} match
        {programs.length === 1 ? 'es' : ''} your interests
      </motion.p>
      <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4">
        {programs.map((program) => (
          <ProgramCard
            key={program.id}
            program={program}
            variant="staff"
            onSignUp={onSelectProgram}
          />
        ))}
      </motion.div>
      {programs.length === 0 && (
        <motion.div
          variants={fadeInUp}
          className="text-center py-12 text-warmblack-400"
        >
          <p className="text-xl font-display">No programs found</p>
          <p className="mt-2">Try selecting different interests or age range</p>
        </motion.div>
      )}
    </motion.div>
  );
}
