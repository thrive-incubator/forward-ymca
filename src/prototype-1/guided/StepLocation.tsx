import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MapPin, CheckCircle } from 'lucide-react';
import type { Region } from '@/data/types';
import { branches } from '@/data/branches';
import { staggerContainer, fadeInUp } from '@/design-system/animations';
import Button from '@/components/Button';
import SanDiegoMap from '@/prototype-1/guided/SanDiegoMap';

interface StepLocationProps {
  value: string[];
  onChange: (branchIds: string[]) => void;
  onNext: () => void;
  isKidMode: boolean;
}

const REGION_INFO: Record<Region, { label: string; emoji: string }> = {
  north: { label: 'North County', emoji: '🏖️' },
  coastal: { label: 'Coastal', emoji: '🌊' },
  central: { label: 'Central SD', emoji: '🏙️' },
  east: { label: 'East County', emoji: '🏔️' },
  south: { label: 'South Bay', emoji: '☀️' },
};

export default function StepLocation({ value, onChange, onNext, isKidMode }: StepLocationProps) {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const selectedBranchId = value[0] ?? null;

  const regionBranches = selectedRegion
    ? branches.filter((b) => b.region === selectedRegion)
    : [];

  function selectRegion(region: Region) {
    setSelectedRegion(region);
    onChange([]);
  }

  function selectBranch(branchId: string) {
    onChange([branchId]);
  }

  function goBackToRegions() {
    setSelectedRegion(null);
    onChange([]);
  }

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.h2
        variants={fadeInUp}
        className="font-display text-3xl font-bold text-warmblack-900 mb-2 text-center"
      >
        {isKidMode ? 'Where do you live? 📍' : 'What part of San Diego are you in?'}
      </motion.h2>
      <motion.p variants={fadeInUp} className="text-base text-warmblack-400 text-center mb-6">
        {selectedRegion ? 'Now pick your closest YMCA' : 'Tap your area on the map'}
      </motion.p>

      <AnimatePresence mode="wait">
        {!selectedRegion ? (
          /* ─── SVG Map region picker ─── */
          <motion.div
            key="regions"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
          >
            <SanDiegoMap onSelectRegion={selectRegion} isKidMode={isKidMode} />
          </motion.div>
        ) : (
          /* ─── Branch picker within selected region ─── */
          <motion.div
            key="branches"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
          >
            {/* Back to map */}
            <button
              type="button"
              onClick={goBackToRegions}
              className="flex items-center gap-2 text-base text-warmblack-400 hover:text-warmblack-600 transition-colors cursor-pointer mb-5"
            >
              <ArrowLeft size={18} />
              <span>Back to map</span>
            </button>

            {/* Selected region badge */}
            <div className="flex items-center gap-3 mb-5 px-4 py-3 rounded-xl bg-warmblack-50">
              <span className="text-2xl">
                {REGION_INFO[selectedRegion]?.emoji}
              </span>
              <span className="font-display font-bold text-base text-warmblack-700">
                {REGION_INFO[selectedRegion]?.label}
              </span>
            </div>

            {/* Branch list */}
            <div className="space-y-3">
              {regionBranches.map((branch) => {
                const isSelected = selectedBranchId === branch.id;
                return (
                  <motion.button
                    key={branch.id}
                    type="button"
                    onClick={() => selectBranch(branch.id)}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`
                      w-full text-left px-5 py-4 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-4
                      ${
                        isSelected
                          ? 'border-coral-500 bg-coral-50 shadow-card'
                          : 'border-warmblack-100 bg-white hover:border-warmblack-200 hover:shadow-sm'
                      }
                    `}
                  >
                    <MapPin
                      size={22}
                      className={isSelected ? 'text-coral-500' : 'text-warmblack-300'}
                    />
                    <div className="flex-1 min-w-0">
                      <span className={`font-display font-semibold text-base block ${isSelected ? 'text-coral-700' : 'text-warmblack-700'}`}>
                        {branch.name}
                      </span>
                      <span className="text-sm text-warmblack-400">
                        {branch.neighborhood}
                      </span>
                    </div>
                    {isSelected && (
                      <CheckCircle size={24} className="text-coral-500 shrink-0" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div variants={fadeInUp} className="mt-10 flex justify-center">
        <Button variant="primary" size="lg" disabled={!selectedBranchId} pulse={!!selectedBranchId} onClick={onNext}>
          Next
        </Button>
      </motion.div>
    </motion.div>
  );
}
