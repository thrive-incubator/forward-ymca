import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { AgeRange, SportCategory, Program } from '@/data/types';
import { programs } from '@/data/programs';
import { matchPrograms } from '@/data/filters';
import Button from '@/components/Button';
import FamilyStepAge from '@/prototype-3/guided/FamilyStepAge';
import FamilyStepInterests from '@/prototype-3/guided/FamilyStepInterests';
import FamilyResults from '@/prototype-3/guided/FamilyResults';

interface FamilyGuidedFlowProps {
  onSelectProgram: (program: Program, childName: string) => void;
}

type Step = 'welcome' | 'age' | 'interests' | 'results';
const STEP_ORDER: Step[] = ['welcome', 'age', 'interests', 'results'];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? 200 : -200,
    opacity: 0,
  }),
};

export default function FamilyGuidedFlow({ onSelectProgram }: FamilyGuidedFlowProps) {
  const [step, setStep] = useState<Step>('welcome');
  const [direction, setDirection] = useState(1);
  const [childName, setChildName] = useState('');
  const [selectedAge, setSelectedAge] = useState<AgeRange | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<SportCategory[]>([]);

  const currentIndex = STEP_ORDER.indexOf(step);
  const progress = ((currentIndex + 1) / STEP_ORDER.length) * 100;

  const goTo = useCallback(
    (target: Step) => {
      const targetIndex = STEP_ORDER.indexOf(target);
      setDirection(targetIndex > currentIndex ? 1 : -1);
      setStep(target);
    },
    [currentIndex],
  );

  const goNext = useCallback(() => {
    if (currentIndex < STEP_ORDER.length - 1) {
      goTo(STEP_ORDER[currentIndex + 1]);
    }
  }, [currentIndex, goTo]);

  const goBack = useCallback(() => {
    if (currentIndex > 0) {
      goTo(STEP_ORDER[currentIndex - 1]);
    }
  }, [currentIndex, goTo]);

  const toggleCategory = useCallback((cat: SportCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  }, []);

  const filteredPrograms = matchPrograms(programs, {
    ageRange: selectedAge ?? undefined,
    categories: selectedCategories.length > 0 ? selectedCategories : undefined,
  });

  const handleSelectProgram = useCallback(
    (program: Program) => {
      onSelectProgram(program, childName);
    },
    [onSelectProgram, childName],
  );

  const canGoNext = (): boolean => {
    if (step === 'welcome') return true;
    if (step === 'age') return selectedAge !== null;
    if (step === 'interests') return selectedCategories.length > 0;
    return false;
  };

  const isFirstTimer = true; // For the guided flow, assume first-timers

  return (
    <div className="flex flex-col h-full">
      {/* Progress bar */}
      <div className="px-6 pt-4 pb-2 no-print">
        <div className="h-2 bg-warmblack-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-coral-500 rounded-full"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
        <div className="flex justify-between mt-1.5 text-xs text-warmblack-400">
          <span>Welcome</span>
          <span>Age</span>
          <span>Interests</span>
          <span>Results</span>
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {step === 'welcome' && (
              <div>
                <h2 className="text-2xl font-display font-bold text-warmblack-900 mb-2">
                  Welcome to the Y!
                </h2>
                <p className="text-lg text-warmblack-500 mb-6">
                  Let's find the perfect program. What's your child's name?
                </p>
                <input
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="Child's first name"
                  className="w-full max-w-sm text-xl px-5 py-4 rounded-xl border-2 border-warmblack-200 focus:border-coral-500 focus:outline-none bg-white text-warmblack-800 placeholder:text-warmblack-300 font-display"
                  autoFocus
                />
              </div>
            )}

            {step === 'age' && (
              <FamilyStepAge
                selected={selectedAge}
                onSelect={setSelectedAge}
              />
            )}

            {step === 'interests' && (
              <FamilyStepInterests
                selected={selectedCategories}
                onToggle={toggleCategory}
              />
            )}

            {step === 'results' && (
              <FamilyResults
                programs={filteredPrograms}
                childName={childName}
                isFirstTimer={isFirstTimer}
                onSelectProgram={handleSelectProgram}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      {step !== 'results' && (
        <div className="px-6 pb-6 flex items-center justify-between no-print">
          <div>
            {currentIndex > 0 && (
              <Button variant="ghost" size="lg" onClick={goBack}>
                Back
              </Button>
            )}
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={goNext}
            disabled={!canGoNext()}
          >
            {step === 'interests' ? 'See Programs' : 'Next'}
          </Button>
        </div>
      )}
    </div>
  );
}
