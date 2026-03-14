import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import HeroSection from '@/prototype-2/HeroSection';
import DataPointsSection from '@/prototype-2/DataPointsSection';
import Button from '@/components/Button';

interface DemoWelcomeProps {
  onStart: () => void;
}

export default function DemoWelcome({ onStart }: DemoWelcomeProps) {
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaSectionRef = useRef<HTMLElement>(null);
  const isCtaInView = useInView(ctaSectionRef, { once: true, margin: '-80px' });

  function scrollToCta() {
    ctaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Hero — full viewport with parallax */}
      <HeroSection onCtaClick={scrollToCta} />

      {/* Data points — "Why This Matters" */}
      <DataPointsSection />

      {/* CTA section */}
      <div ref={ctaRef}>
        <section
          ref={ctaSectionRef}
          className="py-20 md:py-28 bg-surface-50"
        >
          <div className="max-w-2xl mx-auto px-6 text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-display font-black text-warmblack-900 leading-tight"
              initial={{ opacity: 0, y: 24 }}
              animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.6 }}
            >
              Ready to find your kid's team?
            </motion.h2>
            <motion.p
              className="mt-4 text-lg text-warmblack-500 max-w-lg mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              Answer a few quick questions and we'll match your kid with the perfect program near you.
            </motion.p>
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isCtaInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.3, type: 'spring', stiffness: 200 }}
            >
              <Button variant="cta" size="lg" className="rounded-full" onClick={onStart}>
                Find a program for my kid
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
