import type { Program, MatchCriteria } from './types';

export function matchPrograms(programs: Program[], criteria: MatchCriteria): Program[] {
  return programs.filter(p => {
    if (criteria.ageRange && !p.ageRanges.includes(criteria.ageRange)) return false;
    if (criteria.categories?.length && !criteria.categories.some(c => c === p.category)) return false;
    if (criteria.branchIds?.length && !p.branchIds.some(b => criteria.branchIds!.includes(b))) return false;
    if (criteria.firstTimerPreferred && !p.firstTimerFriendly) return false;
    return true;
  });
}
