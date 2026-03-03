import { motion } from 'framer-motion';
import { MapPin, AlertTriangle } from 'lucide-react';
import type { Program } from '@/data/types';
import { branches } from '@/data/branches';
import TagBadge from '@/components/TagBadge';

interface SearchResultsProps {
  results: Program[];
  onSelect: (program: Program) => void;
}

function getBranchNeighborhood(branchId: string): string {
  const branch = branches.find((b) => b.id === branchId);
  return branch ? branch.neighborhood : '';
}

function spotsColor(remaining: number, total: number): string {
  const pct = remaining / total;
  if (pct > 0.5) return 'bg-green-500';
  if (pct > 0.25) return 'bg-yellow-500';
  return 'bg-red-500';
}

function spotsTrackColor(remaining: number, total: number): string {
  const pct = remaining / total;
  if (pct > 0.5) return 'bg-green-100';
  if (pct > 0.25) return 'bg-yellow-100';
  return 'bg-red-100';
}

export default function SearchResults({ results, onSelect }: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="text-center py-12 text-warmblack-400">
        <p className="text-lg font-display">No programs match your search</p>
        <p className="mt-1 text-sm">Try adjusting your filters or search term</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-card overflow-hidden">
      {/* Table header */}
      <div className="grid grid-cols-[1fr_120px_80px_140px_160px_100px] gap-3 px-4 py-2.5 bg-warmblack-50 border-b border-warmblack-100 text-xs font-bold uppercase tracking-wider text-warmblack-400">
        <span>Program</span>
        <span>Location</span>
        <span>Ages</span>
        <span>Spots</span>
        <span>Schedule</span>
        <span>Tags</span>
      </div>

      {/* Rows */}
      {results.map((program, i) => {
        const branchId = program.branchIds[0];
        const pct =
          program.totalSpots > 0
            ? (program.spotsRemaining / program.totalSpots) * 100
            : 0;

        return (
          <motion.button
            key={program.id}
            type="button"
            onClick={() => onSelect(program)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className={`
              w-full grid grid-cols-[1fr_120px_80px_140px_160px_100px] gap-3 px-4 py-3 text-left
              hover:bg-surface-100 transition-colors cursor-pointer
              ${i > 0 ? 'border-t border-warmblack-100/50' : ''}
            `}
          >
            {/* Program name */}
            <div className="min-w-0">
              <p className="text-sm font-semibold text-warmblack-800 truncate">
                {program.name}
              </p>
              <p className="text-xs text-warmblack-400">{program.priceRange}</p>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1 text-xs text-warmblack-500 min-w-0">
              <MapPin size={12} className="shrink-0" />
              <span className="truncate">
                {branchId ? getBranchNeighborhood(branchId) : 'Multiple'}
              </span>
            </div>

            {/* Ages */}
            <div className="text-xs text-warmblack-600">
              {program.ageRanges.join(', ')}
            </div>

            {/* Spots bar */}
            <div className="flex items-center gap-2">
              <div className={`flex-1 h-1.5 rounded-full ${spotsTrackColor(program.spotsRemaining, program.totalSpots)}`}>
                <div
                  className={`h-1.5 rounded-full ${spotsColor(program.spotsRemaining, program.totalSpots)}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-warmblack-600 tabular-nums whitespace-nowrap">
                {program.spotsRemaining}/{program.totalSpots}
              </span>
            </div>

            {/* Schedule */}
            <div className="text-xs text-warmblack-500 truncate">
              {program.schedule}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 items-center">
              {program.firstTimerFriendly && (
                <TagBadge label="1st" variant="success" />
              )}
              {program.spotsRemaining < 5 && (
                <span className="inline-flex items-center text-amber-600">
                  <AlertTriangle size={12} />
                </span>
              )}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
