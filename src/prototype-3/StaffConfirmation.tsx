import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, DollarSign, ArrowLeft } from 'lucide-react';
import type { Program } from '@/data/types';
import { branches } from '@/data/branches';
import { fadeInUp, staggerContainer } from '@/design-system/animations';
import Button from '@/components/Button';
import TagBadge from '@/components/TagBadge';
import WelcomePacket from '@/prototype-3/WelcomePacket';

interface StaffConfirmationProps {
  program: Program;
  initialChildName: string;
  onBack: () => void;
  onComplete: () => void;
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

export default function StaffConfirmation({
  program,
  initialChildName,
  onBack,
  onComplete,
}: StaffConfirmationProps) {
  const [childName, setChildName] = useState(initialChildName);
  const [parentName, setParentName] = useState('');
  const [membershipNumber, setMembershipNumber] = useState('');
  const [coachNotes, setCoachNotes] = useState('');
  const [showWelcomePacket, setShowWelcomePacket] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const branchId = program.branchIds[0];
  const pct =
    program.totalSpots > 0
      ? (program.spotsRemaining / program.totalSpots) * 100
      : 0;

  const handleAdd = () => {
    setIsAdded(true);
    // In a real app, this would POST to an API
  };

  const handlePrint = () => {
    setShowWelcomePacket(true);
  };

  if (showWelcomePacket) {
    return (
      <WelcomePacket
        program={program}
        childName={childName}
        parentName={parentName}
        onClose={() => setShowWelcomePacket(false)}
      />
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="max-w-2xl mx-auto px-6 py-6"
    >
      {/* Back button */}
      <motion.button
        type="button"
        variants={fadeInUp}
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-warmblack-400 hover:text-warmblack-600 transition-colors mb-4 cursor-pointer"
      >
        <ArrowLeft size={16} />
        Back to programs
      </motion.button>

      {/* Program summary */}
      <motion.div
        variants={fadeInUp}
        className="bg-white rounded-xl shadow-card p-5 mb-6"
      >
        <h2 className="font-display font-bold text-xl text-warmblack-900">
          {program.name}
        </h2>
        <p className="text-sm text-warmblack-400 flex items-center gap-1 mt-1">
          <MapPin size={14} />
          {branchId ? `${getBranchName(branchId)} - ${getBranchNeighborhood(branchId)}` : ''}
        </p>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <p className="text-xs text-warmblack-400 uppercase tracking-wider font-bold">
              Schedule
            </p>
            <p className="text-sm text-warmblack-700 flex items-center gap-1 mt-0.5">
              <Calendar size={14} />
              {program.schedule}
            </p>
          </div>
          <div>
            <p className="text-xs text-warmblack-400 uppercase tracking-wider font-bold">
              Price
            </p>
            <p className="text-sm text-warmblack-700 flex items-center gap-1 mt-0.5">
              <DollarSign size={14} />
              {program.priceRange}
            </p>
          </div>
          <div>
            <p className="text-xs text-warmblack-400 uppercase tracking-wider font-bold">
              Season
            </p>
            <p className="text-sm text-warmblack-700 mt-0.5">{program.seasonDates}</p>
          </div>
        </div>

        {/* Spots bar */}
        <div className="mt-4">
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
        <div className="flex flex-wrap gap-1.5 mt-3">
          {program.firstTimerFriendly && (
            <TagBadge label="First-timer Friendly" variant="success" />
          )}
          {program.spotsRemaining < 5 && (
            <TagBadge label="Filling Up!" variant="warning" />
          )}
          <TagBadge label={`Commitment: ${program.commitmentLevel}`} variant="default" />
        </div>
      </motion.div>

      {/* Family details form */}
      <motion.div
        variants={fadeInUp}
        className="bg-white rounded-xl shadow-card p-5 mb-6"
      >
        <h3 className="font-display font-bold text-lg text-warmblack-800 mb-4">
          Family Details
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-warmblack-600 mb-1">
              Child's Name
            </label>
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="First and last name"
              className="w-full px-4 py-2.5 rounded-lg border border-warmblack-200 focus:border-coral-500 focus:outline-none text-warmblack-800 placeholder:text-warmblack-300"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-warmblack-600 mb-1">
              Parent/Guardian Name
            </label>
            <input
              type="text"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              placeholder="Parent or guardian name"
              className="w-full px-4 py-2.5 rounded-lg border border-warmblack-200 focus:border-coral-500 focus:outline-none text-warmblack-800 placeholder:text-warmblack-300"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-warmblack-600 mb-1">
              Membership #
            </label>
            <input
              type="text"
              value={membershipNumber}
              onChange={(e) => setMembershipNumber(e.target.value)}
              placeholder="YMCA membership number"
              className="w-full px-4 py-2.5 rounded-lg border border-warmblack-200 focus:border-coral-500 focus:outline-none text-warmblack-800 placeholder:text-warmblack-300"
            />
          </div>
        </div>
      </motion.div>

      {/* Notes for coach */}
      <motion.div
        variants={fadeInUp}
        className="bg-white rounded-xl shadow-card p-5 mb-6"
      >
        <h3 className="font-display font-bold text-lg text-warmblack-800 mb-2">
          Notes for Coach
        </h3>
        <textarea
          value={coachNotes}
          onChange={(e) => setCoachNotes(e.target.value)}
          placeholder="Mom mentioned kid is shy — flag for coach"
          rows={3}
          className="w-full px-4 py-2.5 rounded-lg border border-warmblack-200 focus:border-coral-500 focus:outline-none text-warmblack-800 placeholder:text-warmblack-300 resize-none"
        />
      </motion.div>

      {/* Actions */}
      <motion.div variants={fadeInUp} className="flex gap-3">
        {!isAdded ? (
          <Button variant="primary" size="lg" onClick={handleAdd}>
            Add to Membership
          </Button>
        ) : (
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-accent-100 text-accent-700 font-bold">
              Added!
            </span>
            <Button variant="ghost" size="lg" onClick={onComplete}>
              Done
            </Button>
          </div>
        )}
        <Button variant="secondary" size="lg" onClick={handlePrint}>
          Print Welcome Packet
        </Button>
      </motion.div>
    </motion.div>
  );
}
