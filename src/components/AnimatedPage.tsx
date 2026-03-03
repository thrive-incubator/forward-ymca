import { motion } from 'framer-motion';
import { pageTransition } from '@/design-system/animations';
import type { ReactNode } from 'react';

export default function AnimatedPage({ children }: { children: ReactNode }) {
  return (
    <motion.div {...pageTransition}>
      {children}
    </motion.div>
  );
}
