import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatItem {
  value: string;
  numericValue: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

const stats: StatItem[] = [
  {
    value: '72%',
    numericValue: 72,
    suffix: '%',
    label: 'lower risk of depression for kids who play team sports',
  },
  {
    value: '3x',
    numericValue: 3,
    suffix: 'x',
    label: 'more likely to develop strong social skills',
  },
  {
    value: '1 in 3',
    numericValue: 3,
    prefix: '1 in ',
    label: "kids in San Diego don't have access to organized sports",
  },
];

function AnimatedCounter({
  numericValue,
  prefix = '',
  suffix = '',
  shouldAnimate,
}: {
  numericValue: number;
  prefix?: string;
  suffix?: string;
  shouldAnimate: boolean;
}) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!shouldAnimate || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 1200; // ms
    const steps = 40;
    const stepTime = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      const progress = current / steps;
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * numericValue));

      if (current >= steps) {
        setCount(numericValue);
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [shouldAnimate, numericValue]);

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center text-center px-6 py-8"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="text-5xl md:text-6xl font-display font-black text-coral-500">
        <AnimatedCounter
          numericValue={stat.numericValue}
          prefix={stat.prefix}
          suffix={stat.suffix}
          shouldAnimate={isInView}
        />
      </span>
      <p className="mt-3 text-warmblack-500 text-sm md:text-base max-w-xs leading-relaxed">
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function DataPointsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-surface-100"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Section heading */}
        <motion.h2
          className="text-2xl md:text-3xl font-display font-bold text-warmblack-800 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          Why This Matters
        </motion.h2>

        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {stats.map((stat, i) => (
            <StatCard key={stat.value} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
