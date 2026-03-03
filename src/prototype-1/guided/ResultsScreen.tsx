import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import type { Program, MatchCriteria } from '@/data/types';
import { programs } from '@/data/programs';
import { matchPrograms } from '@/data/filters';
import { staggerContainer, fadeInUp } from '@/design-system/animations';
import ProgramCard from '@/components/ProgramCard';

interface ResultsScreenProps {
  criteria: MatchCriteria;
  onSignUp: (program: Program) => void;
  isKidMode: boolean;
}

export default function ResultsScreen({ criteria, onSignUp, isKidMode }: ResultsScreenProps) {
  const matched = matchPrograms(programs, criteria);
  const isFirstTimer = criteria.firstTimerPreferred === true;
  const displayPrograms = matched.slice(0, 4);
  const hasMore = matched.length > 4;

  if (matched.length === 0) {
    return (
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="text-center py-8"
      >
        <motion.div variants={fadeInUp} className="mb-5">
          <Search size={56} className="text-warmblack-300 mx-auto" />
        </motion.div>
        <motion.h2
          variants={fadeInUp}
          className="font-display text-3xl font-bold text-warmblack-900 mb-3"
        >
          No exact matches yet
        </motion.h2>
        <motion.p variants={fadeInUp} className="text-base text-warmblack-400 mb-8 max-w-md mx-auto">
          We couldn&rsquo;t find a perfect match for those criteria, but don&rsquo;t worry! New
          programs are added all the time. Try broadening your search or chat with us for
          personalized help.
        </motion.p>
      </motion.div>
    );
  }

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      {/* Heading */}
      <motion.div variants={fadeInUp} className="text-center mb-8">
        {isFirstTimer ? (
          <>
            <div className="text-5xl mb-3">🎉</div>
            <h2 className="font-display text-3xl font-bold text-warmblack-900 mb-2">
              {isKidMode ? 'Awesome picks for you!' : 'Great news for first-timers!'}
            </h2>
            <p className="text-base text-warmblack-400">
              {isKidMode
                ? 'These are super fun and perfect for trying something new!'
                : 'These beginner-friendly programs are perfect for getting started.'}
            </p>
          </>
        ) : (
          <>
            <div className="text-5xl mb-3">⭐</div>
            <h2 className="font-display text-3xl font-bold text-warmblack-900 mb-2">
              {isKidMode ? 'Check these out!' : 'Here are your matches'}
            </h2>
            <p className="text-base text-warmblack-400">
              We found {matched.length} program{matched.length !== 1 ? 's' : ''} that fit.
            </p>
          </>
        )}
      </motion.div>

      {/* Program cards */}
      <div className="space-y-5">
        {displayPrograms.map((program) => (
          <motion.div key={program.id} variants={fadeInUp}>
            <ProgramCard program={program} variant="default" onSignUp={onSignUp} />
          </motion.div>
        ))}
      </div>

      {/* See more */}
      {hasMore && (
        <motion.p variants={fadeInUp} className="text-center mt-8">
          <button
            type="button"
            className="text-base text-coral-500 hover:text-coral-600 underline underline-offset-2 transition-colors cursor-pointer"
          >
            See {matched.length - 4} more option{matched.length - 4 !== 1 ? 's' : ''}
          </button>
        </motion.p>
      )}
    </motion.div>
  );
}
