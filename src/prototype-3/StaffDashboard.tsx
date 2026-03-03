import { AnimatePresence, motion } from 'framer-motion';
import type { Program } from '@/data/types';
import FamilyGuidedFlow from '@/prototype-3/guided/FamilyGuidedFlow';
import QuickSearch from '@/prototype-3/search/QuickSearch';
import StaffConfirmation from '@/prototype-3/StaffConfirmation';

interface StaffDashboardProps {
  mode: 'guided' | 'search';
  selectedProgram: Program | null;
  childName: string;
  onSelectProgram: (program: Program, childName: string) => void;
  onClearSelection: () => void;
}

const viewVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

export default function StaffDashboard({
  mode,
  selectedProgram,
  childName,
  onSelectProgram,
  onClearSelection,
}: StaffDashboardProps) {
  // Determine what view to render
  const viewKey = selectedProgram ? 'confirmation' : mode;

  return (
    <div className="h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={viewKey}
          variants={viewVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="h-full"
        >
          {selectedProgram ? (
            <div className="h-full overflow-y-auto">
              <StaffConfirmation
                program={selectedProgram}
                initialChildName={childName}
                onBack={onClearSelection}
                onComplete={onClearSelection}
              />
            </div>
          ) : mode === 'guided' ? (
            <FamilyGuidedFlow onSelectProgram={onSelectProgram} />
          ) : (
            <QuickSearch
              onSelectProgram={(program) => onSelectProgram(program, '')}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
