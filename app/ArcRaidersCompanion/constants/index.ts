export * from './Colors';

// App configuration constants
export const APP_CONFIG = {
  APP_NAME: 'Arc Raiders Companion',
  VERSION: '1.0.0',
  API_TIMEOUT: 10000, // 10 seconds
  CACHE_DURATION: 24 * 60 * 60 * 1000, // 24 hours
};

// Item type display names
export const ITEM_TYPE_LABELS: Record<string, string> = {
  weapon: 'Weapon',
  armor: 'Armor',
  consumable: 'Consumable',
  material: 'Material',
  mod: 'Mod',
  utility: 'Utility',
};

// Rarity display names
export const RARITY_LABELS: Record<string, string> = {
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  epic: 'Epic',
  legendary: 'Legendary',
};

// ARC type display names
export const ARC_TYPE_LABELS: Record<string, string> = {
  basic: 'Basic',
  elite: 'Elite',
  boss: 'Boss',
  special: 'Special',
};

// Map size display names
export const MAP_SIZE_LABELS: Record<string, string> = {
  small: 'Small',
  medium: 'Medium',
  large: 'Large',
};

// Difficulty labels
export const DIFFICULTY_LABELS: Record<number, string> = {
  1: 'Easy',
  2: 'Medium',
  3: 'Hard',
  4: 'Very Hard',
  5: 'Extreme',
};
