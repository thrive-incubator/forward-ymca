import { motion } from 'framer-motion';
import type { Program } from '@/data/types';
import { branches } from '@/data/branches';
import ConfirmationScreen from '@/components/ConfirmationScreen';

interface SignupConfirmationProps {
  program: Program;
  onDone: () => void;
}

function getBranchName(branchId: string): string {
  const branch = branches.find((b) => b.id === branchId);
  return branch ? branch.name : branchId;
}

function getMockFirstPractice(): string {
  // Return a mock date roughly 2 weeks from now
  const date = new Date();
  date.setDate(date.getDate() + 14);
  // Find the next Saturday
  const dayOfWeek = date.getDay();
  const daysUntilSaturday = (6 - dayOfWeek + 7) % 7 || 7;
  date.setDate(date.getDate() + daysUntilSaturday);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function SignupConfirmation({ program, onDone }: SignupConfirmationProps) {
  const branchName = program.branchIds[0]
    ? getBranchName(program.branchIds[0])
    : 'YMCA San Diego';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <ConfirmationScreen
        programName={program.name}
        branchName={branchName}
        firstPractice={getMockFirstPractice()}
        onDone={onDone}
      />
    </motion.div>
  );
}
