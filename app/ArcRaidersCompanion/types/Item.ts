export interface Item {
  id: string;
  name: string;
  description: string;
  type: 'weapon' | 'armor' | 'consumable' | 'material' | 'mod' | 'utility';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  stats?: {
    damage?: number;
    armor?: number;
    range?: number;
    fireRate?: number;
    magazineSize?: number;
    reloadSpeed?: number;
    [key: string]: number | undefined;
  };
  imageUrl?: string;
  craftingRecipe?: {
    materials: { itemId: string; quantity: number }[];
    craftingTime?: number;
  };
  tags?: string[];
  obtainableSources?: string[];
}

export interface ItemFilters {
  type?: string[];
  rarity?: string[];
  tags?: string[];
  searchQuery?: string;
}
