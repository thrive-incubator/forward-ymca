import { useState } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/design-system/animations';
import Button from '@/components/Button';

interface StepExperienceProps {
  value?: boolean;
  onChange: (firstTimerPreferred: boolean | undefined) => void;
  onNext: () => void;
  isKidMode: boolean;
}

type ExperienceChoice = 'experienced' | 'first-timer' | 'not-sure';

const EXPERIENCE_OPTIONS: {
  key: ExperienceChoice;
  label: string;
  kidLabel: string;
  description: string;
  kidDescription: string;
  emoji: string;
  firstTimerPreferred: boolean | undefined;
}[] = [
  {
    key: 'experienced',
    label: "Yes, they've been on a team!",
    kidLabel: "Yeah, I've played before!",
    description: 'Looking for the next challenge',
    kidDescription: 'Ready for more!',
    emoji: '🏆',
    firstTimerPreferred: false,
  },
  {
    key: 'first-timer',
    label: 'Not yet — this would be their first!',
    kidLabel: 'Nope, first time!',
    description: 'Beginner-friendly options',
    kidDescription: 'I wanna try something new!',
    emoji: '🌱',
    firstTimerPreferred: true,
  },
  {
    key: 'not-sure',
    label: "Doesn\u2019t matter — show me everything!",
    kidLabel: 'Just show me everything!',
    description: 'Experience level won\u2019t affect results',
    kidDescription: 'I want to see it all!',
    emoji: '🙌',
    firstTimerPreferred: undefined,
  },
];

export default function StepExperience({ value, onChange, onNext, isKidMode }: StepExperienceProps) {
  const [selected, setSelected] = useState<ExperienceChoice | null>(() => {
    if (value === true) return 'first-timer';
    if (value === false) return 'experienced';
    return null;
  });

  function handleSelect(opt: (typeof EXPERIENCE_OPTIONS)[number]) {
    setSelected(opt.key);
    onChange(opt.firstTimerPreferred);
  }

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.h2
        variants={fadeInUp}
        className="font-display text-3xl font-bold text-warmblack-900 mb-8 text-center"
      >
        {isKidMode ? 'Been on a team before? 🤔' : 'Has your child been on a team before?'}
      </motion.h2>

      <div className="space-y-4">
        {EXPERIENCE_OPTIONS.map((opt) => {
          const isSelected = selected === opt.key;
          return (
            <motion.button
              key={opt.key}
              type="button"
              variants={fadeInUp}
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.01 }}
              onClick={() => handleSelect(opt)}
              className={`
                w-full flex items-center gap-5 p-5 rounded-2xl border-2 text-left transition-all cursor-pointer
                ${isSelected
                  ? 'border-coral-500 bg-coral-50 shadow-card-hover'
                  : 'border-warmblack-100 bg-white hover:border-warmblack-200 hover:shadow-card'
                }
              `}
            >
              <span className="text-5xl shrink-0">{opt.emoji}</span>
              <div className="min-w-0">
                <span className={`font-display font-bold text-base block ${isSelected ? 'text-coral-600' : 'text-warmblack-800'}`}>
                  {isKidMode ? opt.kidLabel : opt.label}
                </span>
                <span className={`text-sm mt-1 block ${isSelected ? 'text-coral-400' : 'text-warmblack-400'}`}>
                  {isKidMode ? opt.kidDescription : opt.description}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      <motion.div variants={fadeInUp} className="mt-10 flex justify-center">
        <Button variant="primary" size="lg" disabled={selected === null} pulse={selected !== null} onClick={onNext}>
          See My Matches 🎉
        </Button>
      </motion.div>
    </motion.div>
  );
}
