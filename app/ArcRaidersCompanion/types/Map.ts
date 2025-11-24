export interface MapLocation {
  id: string;
  name: string;
  type: 'resource' | 'spawn' | 'poi' | 'extraction' | 'danger_zone';
  coordinates: {
    x: number;
    y: number;
  };
  description?: string;
  relatedItems?: string[]; // Item IDs that can be found here
  relatedARCs?: string[]; // ARC IDs that spawn here
}

export interface GameMap {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  size: 'small' | 'medium' | 'large';
  difficulty: 1 | 2 | 3 | 4 | 5;
  locations: MapLocation[];
  tips?: string[];
  weatherConditions?: string[];
}

export interface MapFilters {
  size?: string[];
  difficulty?: number[];
  searchQuery?: string;
}
