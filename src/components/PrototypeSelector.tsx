import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, QrCode, Monitor, Info } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/design-system/animations';
import PrototypeInfoModal from './PrototypeInfoModal';

const prototypes = [
  {
    to: '/prototype-2',
    icon: QrCode,
    title: 'Prototype 1: QR-to-Signup',
    description:
      'Cinematic landing page designed for QR code scans. Eye-catching hero, quick 2-question match, and a simple 3-field signup. Built for first impressions.',
    color: 'text-accent-500',
    bg: 'bg-accent-50',
  },
  {
    to: '/prototype-1',
    icon: Sparkles,
    title: 'Prototype 2: Find Your Team',
    description:
      'Parents and kids find nearby sports through a guided visual flow or an AI-powered chat. Answer a few questions or just describe what you\'re looking for.',
    color: 'text-coral-500',
    bg: 'bg-coral-50',
  },
  {
    to: '/prototype-3',
    icon: Monitor,
    title: 'Prototype 3: Team Builder',
    description:
      'Tablet/kiosk tool for front-desk staff. Dual-mode interface: a friendly guided flow for families and a data-dense dashboard for quick staff lookups.',
    color: 'text-warmblack-600',
    bg: 'bg-warmblack-50',
  },
] as const;

export default function PrototypeSelector() {
  const [infoKey, setInfoKey] = useState<string | null>(null);

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <img
          src="/images/logo-forward.png"
          alt="Forward — Every Kid Needs a Team"
          className="h-28 sm:h-36 mx-auto mb-4"
        />
        <p className="text-warmblack-400 text-lg max-w-xl mx-auto">
          Three approaches to youth sports registration. Pick a prototype to explore.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {prototypes.map((proto) => {
          const Icon = proto.icon;
          return (
            <motion.div key={proto.to} variants={fadeInUp}>
              <div className="relative h-full">
                <Link to={proto.to} className="block h-full">
                  <motion.div
                    className="h-full bg-white rounded-2xl shadow-card p-6 flex flex-col items-center text-center cursor-pointer transition-shadow hover:shadow-card-hover"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className={`${proto.bg} ${proto.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4`}>
                      <Icon size={28} />
                    </div>
                    <h2 className="font-display font-bold text-lg text-warmblack-800 mb-2">
                      {proto.title}
                    </h2>
                    <p className="text-sm text-warmblack-400 mb-6 flex-1">
                      {proto.description}
                    </p>
                    <span className="inline-flex items-center justify-center rounded-full bg-coral-500 text-white font-bold text-sm px-6 py-2.5">
                      Launch
                    </span>
                  </motion.div>
                </Link>

                {/* Info button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setInfoKey(proto.to);
                  }}
                  className="absolute top-3 right-3 p-1.5 rounded-full text-warmblack-300 hover:text-warmblack-600 hover:bg-surface-100 transition-colors z-10"
                  aria-label={`More info about ${proto.title}`}
                >
                  <Info size={18} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <PrototypeInfoModal
        prototypeKey={infoKey}
        onClose={() => setInfoKey(null)}
      />
    </div>
  );
}
