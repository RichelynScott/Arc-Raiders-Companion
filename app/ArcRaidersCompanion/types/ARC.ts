export interface ARC {
  id: string;
  name: string;
  description: string;
  type: 'basic' | 'elite' | 'boss' | 'special';
  difficulty: 1 | 2 | 3 | 4 | 5;
  stats: {
    health: number;
    armor?: number;
    damage: number;
    speed: number;
    attackRange: number;
  };
  abilities?: {
    name: string;
    description: string;
    cooldown?: number;
  }[];
  weaknesses?: string[];
  resistances?: string[];
  loot?: {
    itemId: string;
    dropRate: number; // 0-1
  }[];
  spawnsOn?: string[]; // Map IDs where this ARC spawns
  imageUrl?: string;
  tips?: string[];
}

export interface ARCFilters {
  type?: string[];
  difficulty?: number[];
  searchQuery?: string;
}
