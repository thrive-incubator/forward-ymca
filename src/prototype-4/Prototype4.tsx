import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, HeartHandshake } from 'lucide-react';
import BigNumber from './BigNumber';
import ImpactMap from './ImpactMap';
import CoachPledgeFlow from './CoachPledgeFlow';
import LiveFeed from './LiveFeed';
import { getBranchStats, getWaitlistEstimate, generateLiveEvents } from './utils';

export default function Prototype4() {
  const navigate = useNavigate();
  const [showPledge, setShowPledge] = useState(false);

  const branchStats = useMemo(() => getBranchStats(), []);
  const waitlistCount = useMemo(() => getWaitlistEstimate(), []);
  const liveEvents = useMemo(() => generateLiveEvents(), []);

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-warmblack-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="p-2 -ml-2 rounded-xl text-warmblack-400 hover:text-warmblack-800 hover:bg-warmblack-50 transition-colors"
              aria-label="Back to prototypes"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
              <img
                src="/images/logo-forward.png"
                alt="HereForward"
                className="h-8"
              />
              <div className="hidden sm:block w-px h-6 bg-warmblack-200" />
              <span className="hidden sm:block text-sm font-bold text-warmblack-500">
                Coach Connect
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowPledge(true)}
            className="flex items-center gap-2 bg-coral-500 text-white font-bold text-sm px-5 py-2.5 rounded-full hover:bg-coral-600 transition-colors shadow-card"
          >
            <HeartHandshake size={18} />
            <span className="hidden sm:inline">Become a Coach</span>
            <span className="sm:hidden">Volunteer</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-8">
        {/* Big Number */}
        <section className="py-6">
          <BigNumber target={waitlistCount} />
        </section>

        {/* Live Feed */}
        <section className="mb-8">
          <LiveFeed events={liveEvents} />
        </section>

        {/* Main content: Map or Pledge flow */}
        {showPledge ? (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-card p-6 sm:p-8 mb-8"
          >
            <CoachPledgeFlow onComplete={() => setShowPledge(false)} />
          </motion.section>
        ) : (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl shadow-card p-6 sm:p-8 mb-8"
          >
            <ImpactMap branchStats={branchStats} />
          </motion.section>
        )}

        {/* CTA Banner */}
        {!showPledge && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-warmblack-800 to-warmblack-900 rounded-3xl p-8 sm:p-10 text-center"
          >
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white mb-3">
              Every team needs a coach.
              <br />
              <span className="text-coral-400">Every kid needs a team.</span>
            </h2>
            <p className="text-warmblack-300 mb-6 max-w-lg mx-auto">
              It only takes 2 hours a week to change a kid&rsquo;s life. Sign up
              today and we&rsquo;ll match you to the branch that needs you most.
            </p>
            <button
              onClick={() => {
                setShowPledge(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 bg-accent-500 text-white font-bold px-8 py-3.5 rounded-full hover:bg-accent-600 transition-colors text-lg shadow-elevated"
            >
              <HeartHandshake size={22} />
              Take the Coach Pledge
            </button>
          </motion.section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-warmblack-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs text-warmblack-400">
            Prototype 4: Coach Connect — HereForward × YMCA San Diego
          </p>
        </div>
      </footer>
    </div>
  );
}
