/**
 * Caching Middleware
 * Implements in-memory caching with TTL and background refresh
 *
 * Data source: MetaForge API (https://metaforge.app/arc-raiders)
 * Attribution required per MetaForge terms of use
 */

import NodeCache from 'node-cache';
import config from '../config.js';

// Initialize cache with TTL and periodic cleanup
const cache = new NodeCache({
  stdTTL: config.cache.ttl,
  checkperiod: config.cache.checkPeriod,
  useClones: false, // Performance optimization
});

// Cache statistics for monitoring
const stats = {
  hits: 0,
  misses: 0,
  sets: 0,
  deletes: 0,
};

/**
 * Get value from cache
 * @param {string} key - Cache key
 * @returns {any|null} Cached value or null if not found
 */
export function get(key) {
  const value = cache.get(key);
  if (value !== undefined) {
    stats.hits++;
    console.log(`[CACHE HIT] ${key}`);
    return value;
  }
  stats.misses++;
  console.log(`[CACHE MISS] ${key}`);
  return null;
}

/**
 * Set value in cache
 * @param {string} key - Cache key
 * @param {any} value - Value to cache
 * @param {number} ttl - Optional TTL override (in seconds)
 * @returns {boolean} Success status
 */
export function set(key, value, ttl = null) {
  const success = ttl
    ? cache.set(key, value, ttl)
    : cache.set(key, value);

  if (success) {
    stats.sets++;
    console.log(`[CACHE SET] ${key} (TTL: ${ttl || config.cache.ttl}s)`);
  }
  return success;
}

/**
 * Delete value from cache
 * @param {string} key - Cache key
 * @returns {number} Number of deleted entries
 */
export function del(key) {
  const deleted = cache.del(key);
  if (deleted > 0) {
    stats.deletes++;
    console.log(`[CACHE DELETE] ${key}`);
  }
  return deleted;
}

/**
 * Clear all cache entries
 */
export function clear() {
  cache.flushAll();
  console.log('[CACHE] All entries cleared');
}

/**
 * Get cache statistics
 * @returns {object} Cache stats
 */
export function getStats() {
  return {
    ...stats,
    keys: cache.keys().length,
    ttl: config.cache.ttl,
  };
}

/**
 * Check if key exists in cache
 * @param {string} key - Cache key
 * @returns {boolean} True if key exists
 */
export function has(key) {
  return cache.has(key);
}

/**
 * Get TTL for a key
 * @param {string} key - Cache key
 * @returns {number|undefined} TTL in seconds or undefined if not found
 */
export function getTtl(key) {
  return cache.getTtl(key);
}

// Export cache instance for advanced usage
export default cache;
