export type SportCategory = 'team-sports' | 'individual-sports' | 'creative-movement' | 'water-sports' | 'multi-sport' | 'outdoor-adventure';
export type AgeRange = '5-6' | '7-8' | '9-10' | '11-12' | '13+';
export type Region = 'central' | 'north' | 'south' | 'east' | 'coastal';

export interface Branch {
  id: string;
  name: string;
  neighborhood: string;
  region: Region;
  notes?: string;
}

export interface Program {
  id: string;
  name: string;
  sport: string;
  category: SportCategory;
  ageRanges: AgeRange[];
  branchIds: string[];
  schedule: string;
  seasonDates: string;
  priceRange: string;
  scholarshipAvailable: boolean;
  description: string;
  spotsRemaining: number;
  totalSpots: number;
  commitmentLevel: 'low' | 'medium' | 'high';
  firstTimerFriendly: boolean;
  difficulty: 'beginner' | 'intermediate' | 'competitive';
  icon: string; // lucide icon name
}

export interface MatchCriteria {
  ageRange?: AgeRange;
  categories?: SportCategory[];
  branchIds?: string[];
  firstTimerPreferred?: boolean;
}
