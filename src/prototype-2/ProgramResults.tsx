import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Program } from '@/data/types';
import ProgramCard from '@/components/ProgramCard';

interface ProgramResultsProps {
  programs: Program[];
  onSignUp: (program: Program) => void;
}

export default function ProgramResults({ programs, onSignUp }: ProgramResultsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-surface-50">
      <div className="max-w-2xl mx-auto px-6">
        {/* Section heading */}
        <motion.h2
          className="text-2xl md:text-3xl font-display font-bold text-warmblack-800 text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          Here&rsquo;s what we found
        </motion.h2>

        {programs.length === 0 ? (
          /* Fallback — no results */
          <motion.div
            className="text-center py-12 bg-white rounded-xl shadow-card px-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-lg font-display font-bold text-warmblack-700 mb-2">
              No exact matches right now
            </p>
            <p className="text-warmblack-400 text-sm leading-relaxed max-w-sm mx-auto">
              But don&rsquo;t worry! New programs open every season. Try adjusting
              your age range or region above, or leave your info and
              we&rsquo;ll let you know when something opens near you.
            </p>
          </motion.div>
        ) : (
          /* Results grid */
          <motion.div
            className="flex flex-col gap-5"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
          >
            {programs.slice(0, 4).map((program) => (
              <motion.div
                key={program.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                <ProgramCard program={program} variant="default" onSignUp={onSignUp} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
