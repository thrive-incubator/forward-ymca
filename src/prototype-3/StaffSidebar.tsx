import { AlertTriangle, Clock } from 'lucide-react';
import { programs } from '@/data/programs';
import TagBadge from '@/components/TagBadge';

function spotsTextColor(remaining: number): string {
  if (remaining > 5) return 'text-green-600';
  if (remaining >= 2) return 'text-amber-600';
  return 'text-red-600';
}

export default function StaffSidebar() {
  const sortedBySpots = [...programs].sort(
    (a, b) => a.spotsRemaining - b.spotsRemaining,
  );
  const fillingUp = sortedBySpots.filter((p) => p.spotsRemaining < 5);
  const startingSoon = [...programs]
    .filter((p) => !p.seasonDates.toLowerCase().includes('rolling') && !p.seasonDates.toLowerCase().includes('year-round'))
    .sort((a, b) => a.seasonDates.localeCompare(b.seasonDates))
    .slice(0, 6);

  return (
    <aside className="bg-surface-100 border-r border-warmblack-100 flex flex-col overflow-hidden h-full">
      {/* 1. Program Availability */}
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="px-4 pt-4 pb-2">
          <h2 className="font-display font-bold text-sm uppercase tracking-wider text-warmblack-400">
            Current Availability
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto px-4 pb-3">
          <ul className="space-y-1">
            {sortedBySpots.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between py-1.5 text-xs border-b border-warmblack-100/50 last:border-0"
              >
                <span className="text-warmblack-700 truncate pr-2 flex-1">
                  {p.sport}{' '}
                  <span className="text-warmblack-400">
                    ({p.ageRanges.join(', ')})
                  </span>
                </span>
                <span className={`font-bold tabular-nums whitespace-nowrap ${spotsTextColor(p.spotsRemaining)}`}>
                  {p.spotsRemaining}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 2. Filling Up Alerts */}
      {fillingUp.length > 0 && (
        <div className="border-t border-warmblack-200 px-4 py-3">
          <h2 className="font-display font-bold text-sm uppercase tracking-wider text-warmblack-400 flex items-center gap-1.5 mb-2">
            <AlertTriangle size={14} className="text-amber-500" />
            Filling Up!
          </h2>
          <ul className="space-y-2">
            {fillingUp.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-2">
                <span className="text-xs text-warmblack-700 truncate flex-1">
                  {p.name}
                </span>
                <TagBadge
                  label={`${p.spotsRemaining} left`}
                  variant="warning"
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 3. Upcoming Start Dates */}
      <div className="border-t border-warmblack-200 px-4 py-3">
        <h2 className="font-display font-bold text-sm uppercase tracking-wider text-warmblack-400 flex items-center gap-1.5 mb-2">
          <Clock size={14} className="text-accent-500" />
          Starting Soon
        </h2>
        <ul className="space-y-1.5">
          {startingSoon.map((p) => (
            <li key={p.id} className="text-xs">
              <span className="text-warmblack-700 font-medium">{p.sport}</span>
              <span className="text-warmblack-400 ml-1">
                {p.seasonDates}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
