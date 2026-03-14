import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Users, Search } from 'lucide-react';
import type { Program } from '@/data/types';
import StaffSidebar from '@/prototype-3/StaffSidebar';
import StaffDashboard from '@/prototype-3/StaffDashboard';

type Mode = 'guided' | 'search';

export default function Prototype3() {
  const [mode, setMode] = useState<Mode>('guided');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [childName, setChildName] = useState('');

  const handleSelectProgram = useCallback(
    (program: Program, name: string) => {
      setSelectedProgram(program);
      setChildName(name);
    },
    [],
  );

  const handleClearSelection = useCallback(() => {
    setSelectedProgram(null);
    setChildName('');
  }, []);

  return (
    <div className="grid grid-cols-[280px_1fr] grid-rows-[64px_1fr] h-dvh bg-surface-50 overflow-hidden">
      {/* ─── Header bar (full width) ─── */}
      <header className="col-span-2 bg-white border-b border-warmblack-100 flex items-center justify-between px-6 no-print">
        <div className="flex items-center gap-5">
          <Link
            to="/"
            className="font-display font-bold text-xl text-coral-500 tracking-tight"
          >
            HereForward
          </Link>
          <div className="h-6 w-px bg-warmblack-200" />
          <h1 className="font-display font-bold text-lg text-warmblack-800">
            Team Builder
          </h1>
        </div>

        {/* Mode toggle */}
        <div className="flex items-center gap-1 bg-warmblack-100 rounded-full p-1">
          <button
            type="button"
            onClick={() => {
              setMode('guided');
              handleClearSelection();
            }}
            className={`
              flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer
              ${mode === 'guided' ? 'bg-white text-coral-600 shadow-sm' : 'text-warmblack-500 hover:text-warmblack-700'}
            `}
          >
            <Users size={16} />
            Guided Flow
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('search');
              handleClearSelection();
            }}
            className={`
              flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer
              ${mode === 'search' ? 'bg-white text-coral-600 shadow-sm' : 'text-warmblack-500 hover:text-warmblack-700'}
            `}
          >
            <Search size={16} />
            Quick Search
          </button>
        </div>
      </header>

      {/* ─── Left sidebar (280px) ─── */}
      <StaffSidebar />

      {/* ─── Main content ─── */}
      <main className="overflow-hidden">
        <StaffDashboard
          mode={mode}
          selectedProgram={selectedProgram}
          childName={childName}
          onSelectProgram={handleSelectProgram}
          onClearSelection={handleClearSelection}
        />
      </main>
    </div>
  );
}
