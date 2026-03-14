import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, DollarSign } from 'lucide-react';
import type { Program } from '@/data/types';
import { branches } from '@/data/branches';
import Button from '@/components/Button';

interface DemoSignupProps {
  program: Program;
  onSubmit: (data: { name: string; phone: string }) => void;
}

function getBranchName(branchId: string): string {
  const branch = branches.find((b) => b.id === branchId);
  return branch ? branch.name : branchId;
}

function getBranchNeighborhood(branchId: string): string {
  const branch = branches.find((b) => b.id === branchId);
  return branch ? branch.neighborhood : '';
}

export default function DemoSignup({ program, onSubmit }: DemoSignupProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const branchId = program.branchIds[0];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    onSubmit({ name: name.trim(), phone: phone.trim() });
  }

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-surface-50 px-6 py-12">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Program summary */}
        <div className="bg-white rounded-xl shadow-card p-5 mb-6">
          <h3 className="font-display font-bold text-lg text-warmblack-800">
            {program.name}
          </h3>
          {branchId && (
            <p className="text-sm text-warmblack-400 mt-1 flex items-center gap-1">
              <MapPin size={13} />
              {getBranchName(branchId)} — {getBranchNeighborhood(branchId)}
            </p>
          )}
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
        </div>

        {/* Form */}
        <h2 className="font-display font-bold text-2xl text-warmblack-900 mb-1">
          Almost there!
        </h2>
        <p className="text-warmblack-400 mb-6">
          We just need a couple of details to save your spot.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-warmblack-600 mb-1">
              Your name
            </label>
            <input
              id="name"
              type="text"
              required
              placeholder="e.g. Maria Garcia"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-warmblack-200 px-4 py-3 text-warmblack-900 placeholder-warmblack-300 outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500/20 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-warmblack-600 mb-1">
              Phone number
            </label>
            <input
              id="phone"
              type="tel"
              required
              placeholder="(619) 555-0123"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-lg border border-warmblack-200 px-4 py-3 text-warmblack-900 placeholder-warmblack-300 outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500/20 transition-colors"
            />
          </div>

          <Button
            type="submit"
            variant="cta"
            size="lg"
            className="w-full rounded-full mt-2"
          >
            Get on the list
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
