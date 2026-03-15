import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingUp } from 'lucide-react';

interface BigNumberProps {
  target: number;
}

export default function BigNumber({ target }: BigNumberProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      // Ease-out curve
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (step >= steps) {
        setCount(target);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative text-center py-10 px-6"
    >
      {/* Pulsing background glow */}
      <motion.div
        className="absolute inset-0 rounded-3xl bg-coral-500/5"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative">
        <div className="flex items-center justify-center gap-3 mb-2">
          <AlertTriangle className="text-coral-500" size={20} />
          <span className="text-sm font-bold uppercase tracking-widest text-coral-500">
            Estimated Waitlist
          </span>
          <AlertTriangle className="text-coral-500" size={20} />
        </div>

        <div className="font-display font-black text-7xl sm:text-8xl md:text-9xl text-warmblack-900 tabular-nums leading-none my-4">
          {count}
        </div>

        <p className="text-warmblack-400 text-lg max-w-md mx-auto">
          kids across San Diego are waiting for a spot on a team
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="mt-6 inline-flex items-center gap-2 bg-accent-50 text-accent-700 px-4 py-2 rounded-full text-sm font-bold"
        >
          <TrendingUp size={16} />
          <span>Every coach who signs up creates 8–12 new spots</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
