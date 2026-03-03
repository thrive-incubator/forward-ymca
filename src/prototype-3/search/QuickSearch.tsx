import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/design-system/animations';
import type { Program, AgeRange, SportCategory } from '@/data/types';
import { programs } from '@/data/programs';
import { branches } from '@/data/branches';
import SearchResults from '@/prototype-3/search/SearchResults';

interface QuickSearchProps {
  onSelectProgram: (program: Program) => void;
}

const ageRanges: AgeRange[] = ['5-6', '7-8', '9-10', '11-12', '13+'];

const categoryLabels: { value: SportCategory; label: string }[] = [
  { value: 'team-sports', label: 'Team Sports' },
  { value: 'individual-sports', label: 'Individual' },
  { value: 'creative-movement', label: 'Creative' },
  { value: 'water-sports', label: 'Water' },
  { value: 'outdoor-adventure', label: 'Outdoor' },
  { value: 'multi-sport', label: 'Multi-Sport' },
];

export default function QuickSearch({ onSelectProgram }: QuickSearchProps) {
  const [query, setQuery] = useState('');
  const [activeAges, setActiveAges] = useState<AgeRange[]>([]);
  const [activeCategories, setActiveCategories] = useState<SportCategory[]>([]);

  const toggleAge = (age: AgeRange) => {
    setActiveAges((prev) =>
      prev.includes(age) ? prev.filter((a) => a !== age) : [...prev, age],
    );
  };

  const toggleCategory = (cat: SportCategory) => {
    setActiveCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return programs.filter((p) => {
      // Text search across sport, name, branch neighborhoods
      if (q) {
        const branchNames = p.branchIds
          .map((id) => {
            const b = branches.find((br) => br.id === id);
            return b ? `${b.name} ${b.neighborhood}` : '';
          })
          .join(' ')
          .toLowerCase();

        const searchable = `${p.name} ${p.sport} ${p.category} ${branchNames} ${p.ageRanges.join(' ')}`.toLowerCase();
        if (!searchable.includes(q)) return false;
      }

      // Age filter
      if (activeAges.length > 0) {
        if (!activeAges.some((age) => p.ageRanges.includes(age))) return false;
      }

      // Category filter
      if (activeCategories.length > 0) {
        if (!activeCategories.includes(p.category)) return false;
      }

      return true;
    });
  }, [query, activeAges, activeCategories]);

  return (
    <div className="flex flex-col h-full">
      {/* Search input */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="px-6 pt-4"
      >
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-warmblack-300"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by sport, age, or branch..."
            className="w-full text-lg pl-12 pr-5 py-4 rounded-xl border-2 border-warmblack-200 focus:border-coral-500 focus:outline-none bg-white text-warmblack-800 placeholder:text-warmblack-300"
            autoFocus
          />
        </div>
      </motion.div>

      {/* Filter chips */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="px-6 pt-3 pb-2 flex flex-wrap gap-2"
      >
        {/* Age pills */}
        <div className="flex items-center gap-1.5 mr-2">
          <span className="text-xs font-bold uppercase tracking-wider text-warmblack-400 mr-1">
            Age:
          </span>
          {ageRanges.map((age) => (
            <button
              key={age}
              type="button"
              onClick={() => toggleAge(age)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer
                ${
                  activeAges.includes(age)
                    ? 'bg-coral-500 text-white'
                    : 'bg-warmblack-100 text-warmblack-500 hover:bg-warmblack-200'
                }
              `}
            >
              {age}
            </button>
          ))}
        </div>

        {/* Category pills */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-warmblack-400 mr-1">
            Type:
          </span>
          {categoryLabels.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => toggleCategory(cat.value)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer
                ${
                  activeCategories.includes(cat.value)
                    ? 'bg-accent-500 text-white'
                    : 'bg-warmblack-100 text-warmblack-500 hover:bg-warmblack-200'
                }
              `}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Results count */}
      <div className="px-6 py-2 text-sm text-warmblack-400">
        {filtered.length} program{filtered.length !== 1 ? 's' : ''}
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <SearchResults results={filtered} onSelect={onSelectProgram} />
      </div>
    </div>
  );
}
