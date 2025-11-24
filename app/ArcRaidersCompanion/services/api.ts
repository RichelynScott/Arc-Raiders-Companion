import AsyncStorage from '@react-native-async-storage/async-storage';
import { Item, ARC, GameMap, ApiResponse } from '../types';

// Backend proxy URL - update this when backend is deployed
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

// Cache keys
const CACHE_KEYS = {
  ITEMS: '@arc_raiders_items',
  ARCS: '@arc_raiders_arcs',
  MAPS: '@arc_raiders_maps',
  ITEMS_TIMESTAMP: '@arc_raiders_items_timestamp',
  ARCS_TIMESTAMP: '@arc_raiders_arcs_timestamp',
  MAPS_TIMESTAMP: '@arc_raiders_maps_timestamp',
};

// Cache duration (24 hours)
const CACHE_DURATION = 24 * 60 * 60 * 1000;

/**
 * Check if cached data is still valid
 */
async function isCacheValid(timestampKey: string): Promise<boolean> {
  try {
    const timestamp = await AsyncStorage.getItem(timestampKey);
    if (!timestamp) return false;

    const age = Date.now() - parseInt(timestamp, 10);
    return age < CACHE_DURATION;
  } catch (error) {
    console.error('Error checking cache validity:', error);
    return false;
  }
}

/**
 * Get cached data
 */
async function getCache<T>(key: string): Promise<T | null> {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error reading cache:', error);
    return null;
  }
}

/**
 * Set cached data
 */
async function setCache<T>(key: string, data: T, timestampKey: string): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
    await AsyncStorage.setItem(timestampKey, Date.now().toString());
  } catch (error) {
    console.error('Error writing cache:', error);
  }
}

/**
 * Fetch items from backend proxy or MetaForge
 */
export async function fetchItems(): Promise<Item[]> {
  try {
    // Check cache first
    const cacheValid = await isCacheValid(CACHE_KEYS.ITEMS_TIMESTAMP);
    if (cacheValid) {
      const cachedItems = await getCache<Item[]>(CACHE_KEYS.ITEMS);
      if (cachedItems) {
        console.log('Returning cached items');
        return cachedItems;
      }
    }

    // Fetch from backend
    const response = await fetch(`${API_BASE_URL}/items`);
    if (!response.ok) {
      throw new Error(`Failed to fetch items: ${response.statusText}`);
    }

    const data: ApiResponse<Item[]> = await response.json();

    // Cache the results
    await setCache(CACHE_KEYS.ITEMS, data.data, CACHE_KEYS.ITEMS_TIMESTAMP);

    return data.data;
  } catch (error) {
    console.error('Error fetching items:', error);

    // Try to return cached data even if expired
    const cachedItems = await getCache<Item[]>(CACHE_KEYS.ITEMS);
    if (cachedItems) {
      console.log('Returning expired cached items due to fetch error');
      return cachedItems;
    }

    // Return empty array if no cache available
    return [];
  }
}

/**
 * Fetch single item by ID
 */
export async function fetchItemById(id: string): Promise<Item | null> {
  try {
    const items = await fetchItems();
    return items.find(item => item.id === id) || null;
  } catch (error) {
    console.error('Error fetching item by ID:', error);
    return null;
  }
}

/**
 * Fetch ARCs (enemies) from backend proxy or MetaForge
 */
export async function fetchARCs(): Promise<ARC[]> {
  try {
    // Check cache first
    const cacheValid = await isCacheValid(CACHE_KEYS.ARCS_TIMESTAMP);
    if (cacheValid) {
      const cachedARCs = await getCache<ARC[]>(CACHE_KEYS.ARCS);
      if (cachedARCs) {
        console.log('Returning cached ARCs');
        return cachedARCs;
      }
    }

    // Fetch from backend
    const response = await fetch(`${API_BASE_URL}/arcs`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ARCs: ${response.statusText}`);
    }

    const data: ApiResponse<ARC[]> = await response.json();

    // Cache the results
    await setCache(CACHE_KEYS.ARCS, data.data, CACHE_KEYS.ARCS_TIMESTAMP);

    return data.data;
  } catch (error) {
    console.error('Error fetching ARCs:', error);

    // Try to return cached data even if expired
    const cachedARCs = await getCache<ARC[]>(CACHE_KEYS.ARCS);
    if (cachedARCs) {
      console.log('Returning expired cached ARCs due to fetch error');
      return cachedARCs;
    }

    return [];
  }
}

/**
 * Fetch single ARC by ID
 */
export async function fetchARCById(id: string): Promise<ARC | null> {
  try {
    const arcs = await fetchARCs();
    return arcs.find(arc => arc.id === id) || null;
  } catch (error) {
    console.error('Error fetching ARC by ID:', error);
    return null;
  }
}

/**
 * Fetch maps from backend proxy or MetaForge
 */
export async function fetchMaps(): Promise<GameMap[]> {
  try {
    // Check cache first
    const cacheValid = await isCacheValid(CACHE_KEYS.MAPS_TIMESTAMP);
    if (cacheValid) {
      const cachedMaps = await getCache<GameMap[]>(CACHE_KEYS.MAPS);
      if (cachedMaps) {
        console.log('Returning cached maps');
        return cachedMaps;
      }
    }

    // Fetch from backend
    const response = await fetch(`${API_BASE_URL}/maps`);
    if (!response.ok) {
      throw new Error(`Failed to fetch maps: ${response.statusText}`);
    }

    const data: ApiResponse<GameMap[]> = await response.json();

    // Cache the results
    await setCache(CACHE_KEYS.MAPS, data.data, CACHE_KEYS.MAPS_TIMESTAMP);

    return data.data;
  } catch (error) {
    console.error('Error fetching maps:', error);

    // Try to return cached data even if expired
    const cachedMaps = await getCache<GameMap[]>(CACHE_KEYS.MAPS);
    if (cachedMaps) {
      console.log('Returning expired cached maps due to fetch error');
      return cachedMaps;
    }

    return [];
  }
}

/**
 * Fetch single map by ID
 */
export async function fetchMapById(id: string): Promise<GameMap | null> {
  try {
    const maps = await fetchMaps();
    return maps.find(map => map.id === id) || null;
  } catch (error) {
    console.error('Error fetching map by ID:', error);
    return null;
  }
}

/**
 * Clear all cached data (for debugging or forcing refresh)
 */
export async function clearCache(): Promise<void> {
  try {
    await AsyncStorage.multiRemove([
      CACHE_KEYS.ITEMS,
      CACHE_KEYS.ARCS,
      CACHE_KEYS.MAPS,
      CACHE_KEYS.ITEMS_TIMESTAMP,
      CACHE_KEYS.ARCS_TIMESTAMP,
      CACHE_KEYS.MAPS_TIMESTAMP,
    ]);
    console.log('Cache cleared successfully');
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
}
