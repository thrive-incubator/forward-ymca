import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio } from 'lucide-react';
import type { LiveEvent } from './utils';

interface LiveFeedProps {
  events: LiveEvent[];
}

export default function LiveFeed({ events }: LiveFeedProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [events.length]);

  const current = events[currentIndex];

  const urgencyColors = {
    high: 'text-coral-600',
    medium: 'text-amber-600',
    low: 'text-accent-600',
  };

  return (
    <div className="bg-warmblack-800 rounded-2xl px-6 py-4 overflow-hidden">
      <div className="flex items-center gap-3">
        {/* Live indicator */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <motion.div
            className="w-2 h-2 rounded-full bg-coral-500"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <Radio className="text-warmblack-400" size={14} />
          <span className="text-xs font-bold uppercase tracking-widest text-warmblack-400">
            Live
          </span>
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-warmblack-600 flex-shrink-0" />

        {/* Event ticker */}
        <div className="flex-1 overflow-hidden h-6 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="absolute inset-0 flex items-center gap-2"
            >
              <span className="text-base leading-none">{current.emoji}</span>
              <span className="text-sm text-warmblack-200 truncate">
                <span className="font-bold text-white">{current.branch}</span>
                {' — '}
                <span className={urgencyColors[current.urgency]}>
                  {current.message}
                </span>
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="flex gap-1 flex-shrink-0">
          {events.slice(0, 5).map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === currentIndex % 5
                  ? 'bg-coral-500'
                  : 'bg-warmblack-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
