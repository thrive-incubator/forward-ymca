import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import type { Program, MatchCriteria } from '@/data/types';
import StepIndicator from '@/components/StepIndicator';
import { pageTransition } from '@/design-system/animations';
import StepAge from '@/prototype-1/guided/StepAge';
import StepInterests from '@/prototype-1/guided/StepInterests';
import StepLocation from '@/prototype-1/guided/StepLocation';
import StepExperience from '@/prototype-1/guided/StepExperience';
import ResultsScreen from '@/prototype-1/guided/ResultsScreen';

type GuidedStep = 'age' | 'interests' | 'location' | 'experience' | 'results';

const STEP_ORDER: GuidedStep[] = ['age', 'interests', 'location', 'experience', 'results'];

interface GuidedFlowProps {
  onSignUp: (program: Program) => void;
  onBack: () => void;
  isKidMode: boolean;
}

export default function GuidedFlow({ onSignUp, onBack, isKidMode }: GuidedFlowProps) {
  const [currentStep, setCurrentStep] = useState<GuidedStep>('age');
  const [criteria, setCriteria] = useState<MatchCriteria>({});

  const stepIndex = STEP_ORDER.indexOf(currentStep);

  function goNext() {
    const nextIndex = stepIndex + 1;
    if (nextIndex < STEP_ORDER.length) {
      setCurrentStep(STEP_ORDER[nextIndex]);
    }
  }

  function goBack() {
    if (stepIndex === 0) {
      onBack();
    } else {
      setCurrentStep(STEP_ORDER[stepIndex - 1]);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      {/* Top bar: back button + step indicator */}
      <div className="flex items-center justify-between mb-8">
        <button
          type="button"
          onClick={goBack}
          className="flex items-center gap-1.5 text-base text-warmblack-400 hover:text-warmblack-600 transition-colors cursor-pointer"
        >
          <ArrowLeft size={20} />
          Back
        </button>
        {currentStep !== 'results' && (
          <StepIndicator totalSteps={4} currentStep={stepIndex + 1} />
        )}
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        {currentStep === 'age' && (
          <motion.div key="age" {...pageTransition}>
            <StepAge
              value={criteria.ageRange}
              onChange={(ageRange) => setCriteria((prev) => ({ ...prev, ageRange }))}
              onNext={goNext}
              isKidMode={isKidMode}
            />
          </motion.div>
        )}
        {currentStep === 'interests' && (
          <motion.div key="interests" {...pageTransition}>
            <StepInterests
              value={criteria.categories ?? []}
              onChange={(categories) => setCriteria((prev) => ({ ...prev, categories }))}
              onNext={goNext}
              isKidMode={isKidMode}
            />
          </motion.div>
        )}
        {currentStep === 'location' && (
          <motion.div key="location" {...pageTransition}>
            <StepLocation
              value={criteria.branchIds ?? []}
              onChange={(branchIds) => setCriteria((prev) => ({ ...prev, branchIds }))}
              onNext={goNext}
              isKidMode={isKidMode}
            />
          </motion.div>
        )}
        {currentStep === 'experience' && (
          <motion.div key="experience" {...pageTransition}>
            <StepExperience
              value={criteria.firstTimerPreferred}
              onChange={(firstTimerPreferred) =>
                setCriteria((prev) => ({ ...prev, firstTimerPreferred }))
              }
              onNext={goNext}
              isKidMode={isKidMode}
            />
          </motion.div>
        )}
        {currentStep === 'results' && (
          <motion.div key="results" {...pageTransition}>
            <ResultsScreen criteria={criteria} onSignUp={onSignUp} isKidMode={isKidMode} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
