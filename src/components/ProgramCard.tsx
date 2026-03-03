import { motion } from 'framer-motion';
import { MapPin, Calendar, DollarSign, Heart } from 'lucide-react';
import type { Program } from '@/data/types';
import { branches } from '@/data/branches';
import Button from '@/components/Button';
import TagBadge from '@/components/TagBadge';

type CardVariant = 'default' | 'compact' | 'staff';

interface ProgramCardProps {
  program: Program;
  variant?: CardVariant;
  onSignUp?: (program: Program) => void;
}

function getBranchName(branchId: string): string {
  const branch = branches.find((b) => b.id === branchId);
  return branch ? branch.name : branchId;
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

/* ─── Compact variant (inline in chat) ─── */
function CompactCard({ program, onSignUp }: { program: Program; onSignUp?: (p: Program) => void }) {
  const branchId = program.branchIds[0];
  return (
    <motion.button
      type="button"
      onClick={() => onSignUp?.(program)}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02 }}
      className="w-full text-left rounded-xl shadow-card border border-warmblack-100 bg-white border-l-4 border-l-coral-300 p-4 cursor-pointer transition-shadow hover:shadow-card-hover"
    >
      <p className="font-display font-bold text-base text-warmblack-800">
        {program.name}
      </p>
      <p className="text-sm text-warmblack-400 mt-0.5 flex items-center gap-1">
        <MapPin size={13} />
        {branchId ? `${getBranchName(branchId)} — ${getBranchNeighborhood(branchId)}` : ''}
      </p>
      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-warmblack-500">
        <span className="flex items-center gap-1">
          <Calendar size={13} />
          {program.schedule}
        </span>
        <span className="flex items-center gap-1">
          <DollarSign size={13} />
          {program.priceRange}
        </span>
      </div>
      <div className="mt-3 text-sm font-display font-semibold text-accent-600">
        Tap to sign up →
      </div>
    </motion.button>
  );
}

/* ─── Staff variant (Prototype 3) ─── */
function StaffCard({ program, onSignUp }: { program: Program; onSignUp?: (p: Program) => void }) {
  const branchId = program.branchIds[0];
  const pct = program.totalSpots > 0 ? (program.spotsRemaining / program.totalSpots) * 100 : 0;

  return (
    <motion.div
      className="bg-white rounded-xl shadow-card p-5 flex flex-col gap-3"
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* Header */}
      <div>
        <h3 className="font-display font-bold text-lg text-warmblack-800">
          {program.name}
        </h3>
        <p className="text-sm text-warmblack-400 flex items-center gap-1 mt-0.5">
          <MapPin size={14} />
          {branchId ? `${getBranchName(branchId)} — ${getBranchNeighborhood(branchId)}` : ''}
        </p>
      </div>

      {/* Schedule + Price */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-warmblack-500">
        <span className="flex items-center gap-1">
          <Calendar size={14} />
          {program.schedule}
        </span>
        <span className="flex items-center gap-1">
          <DollarSign size={14} />
          {program.priceRange}
        </span>
      </div>

      {/* Spots remaining bar */}
      <div>
        <div className="flex items-center justify-between text-xs text-warmblack-500 mb-1">
          <span>Spots remaining</span>
          <span className="font-semibold">
            {program.spotsRemaining} / {program.totalSpots}
          </span>
        </div>
        <div className={`h-2 rounded-full ${spotsTrackColor(program.spotsRemaining, program.totalSpots)}`}>
          <div
            className={`h-2 rounded-full transition-all ${spotsColor(program.spotsRemaining, program.totalSpots)}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {program.firstTimerFriendly && (
          <TagBadge label="First-timer Friendly" variant="success" />
        )}
        {program.spotsRemaining < 5 && (
          <TagBadge label="Filling Up!" variant="warning" />
        )}
        <TagBadge
          label={`Commitment: ${program.commitmentLevel}`}
          variant="default"
        />
      </div>

      {/* Action */}
      <Button variant="primary" size="md" onClick={() => onSignUp?.(program)}>
        Select
      </Button>
    </motion.div>
  );
}

/* ─── Default variant (Prototype 1 results, Prototype 2) ─── */
function DefaultCard({ program, onSignUp }: { program: Program; onSignUp?: (p: Program) => void }) {
  const branchId = program.branchIds[0];

  return (
    <motion.div
      className="bg-white rounded-xl shadow-card p-5 flex flex-col gap-3"
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* Header */}
      <div>
        <h3 className="font-display font-bold text-lg text-warmblack-800">
          {program.name}
        </h3>
        <p className="text-sm text-warmblack-400 flex items-center gap-1 mt-0.5">
          <MapPin size={14} />
          {branchId ? `${getBranchName(branchId)} — ${getBranchNeighborhood(branchId)}` : ''}
        </p>
      </div>

      {/* Schedule + Price */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-warmblack-500">
        <span className="flex items-center gap-1">
          <Calendar size={14} />
          {program.schedule}
        </span>
        <span className="flex items-center gap-1">
          <DollarSign size={14} />
          {program.priceRange}
        </span>
      </div>

      {/* Scholarship note */}
      {program.scholarshipAvailable && (
        <p className="text-sm font-medium text-accent-500">
          Financial assistance available
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 mt-1">
        <Button variant="cta" size="md" onClick={() => onSignUp?.(program)}>
          Sign Up
        </Button>
        <button
          type="button"
          className="inline-flex items-center gap-1 text-sm text-warmblack-400 hover:text-warmblack-600 transition-colors"
        >
          <Heart size={14} />
          Save for Later
        </button>
      </div>
    </motion.div>
  );
}

/* ─── Main export ─── */
export default function ProgramCard({ program, variant = 'default', onSignUp }: ProgramCardProps) {
  switch (variant) {
    case 'compact':
      return <CompactCard program={program} onSignUp={onSignUp} />;
    case 'staff':
      return <StaffCard program={program} onSignUp={onSignUp} />;
    default:
      return <DefaultCard program={program} onSignUp={onSignUp} />;
  }
}
