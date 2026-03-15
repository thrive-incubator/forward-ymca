import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronDown, ChevronUp, Users } from 'lucide-react';
import type { BranchStats } from './utils';
import { fadeInUp, staggerContainer } from '@/design-system/animations';

interface ImpactMapProps {
  branchStats: BranchStats[];
}

const statusColors = {
  plenty: {
    bg: 'bg-accent-50',
    border: 'border-accent-200',
    bar: 'bg-accent-400',
    text: 'text-accent-700',
    badge: 'bg-accent-100 text-accent-700',
  },
  filling: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    bar: 'bg-amber-400',
    text: 'text-amber-700',
    badge: 'bg-amber-100 text-amber-700',
  },
  critical: {
    bg: 'bg-coral-50',
    border: 'border-coral-200',
    bar: 'bg-coral-500',
    text: 'text-coral-700',
    badge: 'bg-coral-100 text-coral-700',
  },
};

const regionLabels: Record<string, string> = {
  central: 'Central',
  north: 'North County',
  south: 'South Bay',
  east: 'East County',
  coastal: 'Coastal',
};

export default function ImpactMap({ branchStats }: ImpactMapProps) {
  const [expandedBranch, setExpandedBranch] = useState<string | null>(null);

  const sorted = [...branchStats].sort(
    (a, b) => b.capacityPercent - a.capacityPercent,
  );

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-warmblack-800 flex items-center justify-center">
          <MapPin className="text-white" size={20} />
        </div>
        <div>
          <h2 className="font-display font-bold text-xl text-warmblack-900">
            Branch Capacity Map
          </h2>
          <p className="text-sm text-warmblack-400">
            {branchStats.length} branches across 5 regions
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6">
        {[
          { status: 'plenty' as const, label: 'Open spots' },
          { status: 'filling' as const, label: 'Filling up' },
          { status: 'critical' as const, label: 'Near capacity' },
        ].map(({ status, label }) => (
          <div key={status} className="flex items-center gap-2 text-sm">
            <div
              className={`w-3 h-3 rounded-full ${statusColors[status].bar}`}
            />
            <span className="text-warmblack-500">{label}</span>
          </div>
        ))}
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {sorted.map((stat) => {
          const colors = statusColors[stat.status];
          const isExpanded = expandedBranch === stat.branch.id;

          return (
            <motion.div key={stat.branch.id} variants={fadeInUp}>
              <motion.button
                type="button"
                onClick={() =>
                  setExpandedBranch(isExpanded ? null : stat.branch.id)
                }
                className={`w-full text-left rounded-2xl border-2 ${colors.border} ${colors.bg} p-4 transition-shadow hover:shadow-card cursor-pointer`}
              >
                {/* Pulsing indicator for critical branches */}
                {stat.status === 'critical' && (
                  <motion.div
                    className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-coral-500"
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-sm text-warmblack-800 truncate">
                      {stat.branch.name.replace(' Family YMCA', '').replace(' YMCA', '')}
                    </h3>
                    <span className="text-xs text-warmblack-400">
                      {regionLabels[stat.branch.region] ?? stat.branch.region} · {stat.branch.neighborhood}
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp size={16} className="text-warmblack-400 ml-2 flex-shrink-0" />
                  ) : (
                    <ChevronDown size={16} className="text-warmblack-400 ml-2 flex-shrink-0" />
                  )}
                </div>

                {/* Capacity bar */}
                <div className="w-full h-2 bg-white/60 rounded-full overflow-hidden mb-2">
                  <motion.div
                    className={`h-full rounded-full ${colors.bar}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.capacityPercent}%` }}
                    transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${colors.text}`}>
                    {stat.capacityPercent}% full
                  </span>
                  <span className="text-xs text-warmblack-400">
                    {stat.spotsRemaining} spots left
                  </span>
                </div>
              </motion.button>

              {/* Expanded programs */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 space-y-2 px-1">
                      {stat.programs.map((program) => {
                        const pFilled = program.totalSpots - program.spotsRemaining;
                        const pPct = Math.round(
                          (pFilled / program.totalSpots) * 100,
                        );
                        return (
                          <div
                            key={program.id}
                            className="bg-white rounded-xl p-3 shadow-card"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-bold text-warmblack-700 truncate flex-1">
                                {program.name}
                              </span>
                              <span
                                className={`text-xs font-bold ml-2 px-2 py-0.5 rounded-full ${
                                  pPct >= 80
                                    ? 'bg-coral-100 text-coral-700'
                                    : pPct >= 60
                                      ? 'bg-amber-100 text-amber-700'
                                      : 'bg-accent-100 text-accent-700'
                                }`}
                              >
                                {pPct}%
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-warmblack-400">
                              <Users size={12} />
                              <span>
                                {program.spotsRemaining} of {program.totalSpots}{' '}
                                spots open
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
