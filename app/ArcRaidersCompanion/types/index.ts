export * from './Item';
export * from './ARC';
export * from './Map';

// Additional shared types
export interface ApiResponse<T> {
  data: T;
  error?: string;
  timestamp: number;
}

export interface LoadoutItem {
  slotId: string;
  itemId: string;
  item: Item;
}

export interface Loadout {
  id: string;
  name: string;
  description?: string;
  items: LoadoutItem[];
  createdAt: number;
  updatedAt: number;
}

// Re-export Item for convenience
import { Item } from './Item';
export type { Item };
