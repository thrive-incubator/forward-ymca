import { programs } from '@/data/programs';
import { branches } from '@/data/branches';
import type { Branch, Program } from '@/data/types';

export interface BranchStats {
  branch: Branch;
  programs: Program[];
  totalSpots: number;
  spotsRemaining: number;
  enrolled: number;
  capacityPercent: number;
  status: 'plenty' | 'filling' | 'critical';
}

export function getBranchStats(): BranchStats[] {
  return branches.map((branch) => {
    const branchPrograms = programs.filter((p) =>
      p.branchIds.includes(branch.id),
    );

    const totalSpots = branchPrograms.reduce((sum, p) => sum + p.totalSpots, 0);
    const spotsRemaining = branchPrograms.reduce(
      (sum, p) => sum + p.spotsRemaining,
      0,
    );
    const enrolled = totalSpots - spotsRemaining;
    const capacityPercent =
      totalSpots > 0 ? Math.round((enrolled / totalSpots) * 100) : 0;

    let status: BranchStats['status'] = 'plenty';
    if (capacityPercent >= 80) status = 'critical';
    else if (capacityPercent >= 60) status = 'filling';

    return {
      branch,
      programs: branchPrograms,
      totalSpots,
      spotsRemaining,
      enrolled,
      capacityPercent,
      status,
    };
  });
}

export function getWaitlistEstimate(): number {
  // For programs at >75% capacity, estimate waitlisted kids
  // (simulated: each near-full program has ~3-8 kids waiting)
  let waitlist = 0;
  for (const program of programs) {
    const filled = program.totalSpots - program.spotsRemaining;
    const pct = filled / program.totalSpots;
    if (pct >= 0.85) waitlist += Math.ceil(program.totalSpots * 0.15);
    else if (pct >= 0.75) waitlist += Math.ceil(program.totalSpots * 0.08);
  }
  return waitlist;
}

export function getProgramsNeedingCoaches(): Array<{
  program: Program;
  branch: Branch;
  capacityPercent: number;
}> {
  const results: Array<{
    program: Program;
    branch: Branch;
    capacityPercent: number;
  }> = [];

  for (const program of programs) {
    const filled = program.totalSpots - program.spotsRemaining;
    const pct = Math.round((filled / program.totalSpots) * 100);
    if (pct >= 65) {
      for (const branchId of program.branchIds) {
        const branch = branches.find((b) => b.id === branchId);
        if (branch) {
          results.push({ program, branch, capacityPercent: pct });
        }
      }
    }
  }

  return results.sort((a, b) => b.capacityPercent - a.capacityPercent);
}

export interface LiveEvent {
  id: string;
  emoji: string;
  message: string;
  branch: string;
  urgency: 'high' | 'medium' | 'low';
}

export function generateLiveEvents(): LiveEvent[] {
  const events: LiveEvent[] = [
    {
      id: '1',
      emoji: '🏊',
      message: 'Swim Team just hit 90% capacity',
      branch: 'Mission Valley Y',
      urgency: 'high',
    },
    {
      id: '2',
      emoji: '⚽',
      message: 'Soccer League needs 2 more coaches',
      branch: 'Copley-Price',
      urgency: 'high',
    },
    {
      id: '3',
      emoji: '🏀',
      message: 'Basketball just opened 3 spots',
      branch: 'Carmel Mountain Ranch',
      urgency: 'low',
    },
    {
      id: '4',
      emoji: '🥋',
      message: 'Martial Arts — only 5 spots left',
      branch: 'Toby Wells',
      urgency: 'high',
    },
    {
      id: '5',
      emoji: '🏃',
      message: 'Track & Field added a second session',
      branch: 'Jackie Robinson',
      urgency: 'low',
    },
    {
      id: '6',
      emoji: '⚾',
      message: 'Padres Rookie League at 67% capacity',
      branch: 'Rancho Family',
      urgency: 'medium',
    },
    {
      id: '7',
      emoji: '🏐',
      message: 'Volleyball Clinic needs assistant coach',
      branch: 'Magdalena Ecke',
      urgency: 'medium',
    },
    {
      id: '8',
      emoji: '🏈',
      message: 'Flag Football — 3 coaches signed up today!',
      branch: 'Cameron Family',
      urgency: 'low',
    },
    {
      id: '9',
      emoji: '💃',
      message: 'Dance Beginner at 64% — filling fast',
      branch: 'Copley-Price',
      urgency: 'medium',
    },
    {
      id: '10',
      emoji: '🛹',
      message: 'Skateboarding down to last 8 spots',
      branch: 'Magdalena Ecke',
      urgency: 'high',
    },
    {
      id: '11',
      emoji: '🏕️',
      message: 'Summer Camp waitlist growing — need volunteers',
      branch: 'South Bay',
      urgency: 'high',
    },
    {
      id: '12',
      emoji: '🧗',
      message: 'Adventure Club added weekend hike',
      branch: 'Escondido',
      urgency: 'low',
    },
  ];
  return events;
}
