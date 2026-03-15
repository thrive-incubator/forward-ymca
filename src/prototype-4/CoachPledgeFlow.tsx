import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  HandHelping,
  ClipboardList,
  PartyPopper,
  Heart,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Users,
} from 'lucide-react';
import StepIndicator from '@/components/StepIndicator';
import { getBranchStats } from './utils';

type RoleOption = 'coaching' | 'assistant' | 'scorekeeping' | 'events';
type TimeSlot = string; // e.g. "mon-morning"

const roles: Array<{ id: RoleOption; icon: typeof Trophy; label: string; description: string }> = [
  { id: 'coaching', icon: Trophy, label: 'Head Coach', description: 'Lead practices & games' },
  { id: 'assistant', icon: HandHelping, label: 'Assistant Coach', description: 'Support the head coach' },
  { id: 'scorekeeping', icon: ClipboardList, label: 'Score Keeping', description: 'Track stats & scores' },
  { id: 'events', icon: PartyPopper, label: 'Event Volunteer', description: 'Tournaments & events' },
];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const times = ['Morning', 'Afternoon', 'Evening'];

interface CoachPledgeFlowProps {
  onComplete: () => void;
}

export default function CoachPledgeFlow({ onComplete }: CoachPledgeFlowProps) {
  const [step, setStep] = useState(1);
  const [selectedRoles, setSelectedRoles] = useState<RoleOption[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<Set<TimeSlot>>(new Set());
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [zip, setZip] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleRole = (role: RoleOption) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role],
    );
  };

  const toggleTime = (slot: TimeSlot) => {
    setSelectedTimes((prev) => {
      const next = new Set(prev);
      if (next.has(slot)) next.delete(slot);
      else next.add(slot);
      return next;
    });
  };

  const canAdvance =
    (step === 1 && selectedRoles.length > 0) ||
    (step === 2 && selectedTimes.size > 0) ||
    (step === 3 && name.trim() && email.trim() && zip.trim());

  const handleSubmit = () => {
    setSubmitted(true);
  };

  // Find nearest branch (simulated — pick the one with most need)
  const matchedBranch = getBranchStats().sort(
    (a, b) => b.capacityPercent - a.capacityPercent,
  )[0];

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="text-center py-12 px-6 max-w-md mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 18 }}
          className="mb-6"
        >
          <div className="w-20 h-20 rounded-full bg-accent-100 flex items-center justify-center mx-auto">
            <CheckCircle className="text-accent-600" size={48} strokeWidth={1.5} />
          </div>
        </motion.div>

        <h2 className="font-display text-3xl font-black text-warmblack-900 mb-2">
          You&rsquo;re officially a team player!
        </h2>
        <p className="text-warmblack-400 mb-6">
          Thank you, {name.split(' ')[0]}. Your help changes everything.
        </p>

        <div className="bg-accent-50 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-2 text-accent-700 font-bold text-sm mb-3">
            <MapPinIcon />
            Your matched branch
          </div>
          <p className="font-display font-bold text-lg text-warmblack-800">
            {matchedBranch.branch.name}
          </p>
          <p className="text-sm text-warmblack-400">
            {matchedBranch.branch.neighborhood}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-coral-50 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Heart className="text-coral-500" size={20} />
            <span className="font-bold text-coral-700 text-sm">
              Your estimated impact
            </span>
          </div>
          <p className="font-display text-4xl font-black text-coral-600">
            12
          </p>
          <p className="text-sm text-coral-500">
            kids could get a spot on a team because of you
          </p>
        </motion.div>

        <button
          onClick={onComplete}
          className="inline-flex items-center justify-center rounded-full bg-warmblack-800 text-white font-bold text-sm px-8 py-3 hover:bg-warmblack-700 transition-colors"
        >
          Done
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Users className="text-accent-600" size={20} />
          <h2 className="font-display font-bold text-xl text-warmblack-900">
            Coach Pledge
          </h2>
        </div>
        <StepIndicator totalSteps={3} currentStep={step} />
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-display font-bold text-lg text-warmblack-800 text-center mb-6">
              What can you offer?
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {roles.map((role) => {
                const Icon = role.icon;
                const selected = selectedRoles.includes(role.id);
                return (
                  <motion.button
                    key={role.id}
                    type="button"
                    onClick={() => toggleRole(role.id)}
                    whileTap={{ scale: 0.96 }}
                    whileHover={{ scale: 1.02 }}
                    className={`flex flex-col items-center justify-center text-center rounded-2xl border-2 p-6 transition-all cursor-pointer ${
                      selected
                        ? 'border-coral-500 bg-coral-50 text-coral-600 shadow-card-hover'
                        : 'border-warmblack-100 bg-white text-warmblack-700 hover:border-warmblack-200 hover:shadow-card'
                    }`}
                  >
                    <Icon size={32} className="mb-3" />
                    <span className="font-display font-bold text-base">
                      {role.label}
                    </span>
                    <span
                      className={`text-xs mt-1 ${selected ? 'text-coral-400' : 'text-warmblack-400'}`}
                    >
                      {role.description}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-display font-bold text-lg text-warmblack-800 text-center mb-6">
              When are you free?
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-separate border-spacing-1.5">
                <thead>
                  <tr>
                    <th className="w-24" />
                    {days.map((day) => (
                      <th
                        key={day}
                        className="text-xs font-bold text-warmblack-500 text-center pb-2"
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {times.map((time) => (
                    <tr key={time}>
                      <td className="text-xs font-bold text-warmblack-500 text-right pr-3 align-middle">
                        {time}
                      </td>
                      {days.map((day) => {
                        const slot = `${day.toLowerCase()}-${time.toLowerCase()}`;
                        const active = selectedTimes.has(slot);
                        return (
                          <td key={slot} className="p-0">
                            <motion.button
                              type="button"
                              onClick={() => toggleTime(slot)}
                              whileTap={{ scale: 0.9 }}
                              className={`w-full aspect-square rounded-xl transition-all cursor-pointer min-w-[40px] ${
                                active
                                  ? 'bg-accent-500 shadow-card-hover'
                                  : 'bg-warmblack-50 hover:bg-warmblack-100'
                              }`}
                            >
                              {active && (
                                <CheckCircle
                                  className="text-white mx-auto"
                                  size={16}
                                />
                              )}
                            </motion.button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-warmblack-400 text-center mt-3">
              Tap to toggle available time blocks
            </p>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-display font-bold text-lg text-warmblack-800 text-center mb-6">
              Your info
            </h3>
            <div className="space-y-4 max-w-sm mx-auto">
              <div>
                <label className="block text-sm font-bold text-warmblack-600 mb-1.5">
                  Full name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Johnson"
                  className="w-full px-4 py-3 rounded-xl border-2 border-warmblack-100 bg-white text-warmblack-800 placeholder:text-warmblack-300 focus:border-accent-400 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-warmblack-600 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@email.com"
                  className="w-full px-4 py-3 rounded-xl border-2 border-warmblack-100 bg-white text-warmblack-800 placeholder:text-warmblack-300 focus:border-accent-400 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-warmblack-600 mb-1.5">
                  Zip code
                </label>
                <input
                  type="text"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  placeholder="92101"
                  maxLength={5}
                  className="w-full px-4 py-3 rounded-xl border-2 border-warmblack-100 bg-white text-warmblack-800 placeholder:text-warmblack-300 focus:border-accent-400 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 1}
          className={`flex items-center gap-1.5 text-sm font-bold px-4 py-2.5 rounded-full transition-colors ${
            step === 1
              ? 'text-warmblack-200 cursor-not-allowed'
              : 'text-warmblack-600 hover:text-warmblack-800 hover:bg-warmblack-50'
          }`}
        >
          <ChevronLeft size={16} />
          Back
        </button>

        {step < 3 ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            disabled={!canAdvance}
            className={`flex items-center gap-1.5 text-sm font-bold px-6 py-2.5 rounded-full transition-colors ${
              canAdvance
                ? 'bg-accent-500 text-white hover:bg-accent-600'
                : 'bg-warmblack-100 text-warmblack-300 cursor-not-allowed'
            }`}
          >
            Next
            <ChevronRight size={16} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!canAdvance}
            className={`flex items-center gap-1.5 text-sm font-bold px-6 py-2.5 rounded-full transition-colors ${
              canAdvance
                ? 'bg-coral-500 text-white hover:bg-coral-600'
                : 'bg-warmblack-100 text-warmblack-300 cursor-not-allowed'
            }`}
          >
            Sign Up
            <Heart size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

// Small inline component to avoid extra import
function MapPinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
