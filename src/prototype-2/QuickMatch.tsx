import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import type { AgeRange, Region } from '@/data/types';

const ageOptions: { value: AgeRange; label: string }[] = [
  { value: '5-6', label: '5-6' },
  { value: '7-8', label: '7-8' },
  { value: '9-10', label: '9-10' },
  { value: '11-12', label: '11-12' },
  { value: '13+', label: '13+' },
];

const regionOptions: { value: Region; label: string }[] = [
  { value: 'north', label: 'North County' },
  { value: 'central', label: 'Central' },
  { value: 'east', label: 'East County' },
  { value: 'south', label: 'South Bay' },
  { value: 'coastal', label: 'Coastal' },
];

interface QuickMatchProps {
  onMatch: (ageRange: AgeRange, region: Region) => void;
}

export default function QuickMatch({ onMatch }: QuickMatchProps) {
  const [selectedAge, setSelectedAge] = useState<AgeRange | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  // Auto-trigger match when both selections are made
  useEffect(() => {
    if (selectedAge && selectedRegion) {
      onMatch(selectedAge, selectedRegion);
    }
  }, [selectedAge, selectedRegion, onMatch]);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-surface-50" id="quick-match">
      <div className="max-w-xl mx-auto px-6">
        {/* Section heading */}
        <motion.h2
          className="text-2xl md:text-3xl font-display font-bold text-warmblack-800 text-center mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          Find a Team Near You
        </motion.h2>
        <motion.p
          className="text-warmblack-400 text-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Answer two quick questions and we&rsquo;ll match you.
        </motion.p>

        {/* Q1: Age Range */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-sm font-semibold text-warmblack-600 mb-3">
            How old is your child?
          </p>
          <div className="flex flex-wrap gap-2">
            {ageOptions.map((opt) => (
              <motion.button
                key={opt.value}
                type="button"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.04 }}
                onClick={() => setSelectedAge(opt.value)}
                className={`
                  px-5 py-2.5 rounded-full text-sm font-bold transition-colors cursor-pointer
                  ${
                    selectedAge === opt.value
                      ? 'bg-coral-500 text-white shadow-md'
                      : 'bg-white text-warmblack-600 border border-warmblack-200 hover:border-coral-300 hover:bg-coral-50'
                  }
                `}
              >
                {opt.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Q2: Region */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <p className="text-sm font-semibold text-warmblack-600 mb-3">
            What area of San Diego?
          </p>
          <div className="flex flex-wrap gap-2">
            {regionOptions.map((opt) => (
              <motion.button
                key={opt.value}
                type="button"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.04 }}
                onClick={() => setSelectedRegion(opt.value)}
                className={`
                  px-5 py-2.5 rounded-full text-sm font-bold transition-colors cursor-pointer
                  ${
                    selectedRegion === opt.value
                      ? 'bg-coral-500 text-white shadow-md'
                      : 'bg-white text-warmblack-600 border border-warmblack-200 hover:border-coral-300 hover:bg-coral-50'
                  }
                `}
              >
                {opt.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
