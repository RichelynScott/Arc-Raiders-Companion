/**
 * API Routes
 * Proxy endpoints for MetaForge Arc Raiders API
 *
 * All endpoints implement caching and error handling
 * Data source: MetaForge (https://metaforge.app/arc-raiders)
 */

import express from 'express';
import metaforgeService from '../services/metaforge.js';
import * as cache from '../middleware/cache.js';

const router = express.Router();

/**
 * Helper function to handle cached API requests
 */
async function handleCachedRequest(req, res, cacheKey, fetchFunction) {
  try {
    // Check cache first
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.json({
        ...cachedData,
        cached: true,
        cachedAt: new Date(cache.getTtl(cacheKey)).toISOString(),
      });
    }

    // Fetch from MetaForge
    const data = await fetchFunction();

    // Cache the response
    cache.set(cacheKey, data);

    // Return with cache metadata
    res.json({
      ...data,
      cached: false,
      fetchedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error(`[API ERROR] ${cacheKey}:`, error.message);

    // Try to serve stale cache if MetaForge is down
    const staleCache = cache.get(cacheKey);
    if (staleCache) {
      console.log(`[API] Serving stale cache for ${cacheKey}`);
      return res.json({
        ...staleCache,
        cached: true,
        stale: true,
        warning: 'MetaForge API temporarily unavailable, serving cached data',
      });
    }

    // No cache available, return error
    res.status(503).json({
      error: 'Service temporarily unavailable',
      message: error.message,
      attribution: 'Data provided by MetaForge (https://metaforge.app/arc-raiders)',
    });
  }
}

/**
 * GET /api/items
 * Fetch all Arc Raiders items
 */
router.get('/items', async (req, res) => {
  await handleCachedRequest(
    req,
    res,
    'arc_raiders_items',
    () => metaforgeService.getItems()
  );
});

/**
 * GET /api/arcs
 * Fetch all ARC enemies
 */
router.get('/arcs', async (req, res) => {
  await handleCachedRequest(
    req,
    res,
    'arc_raiders_arcs',
    () => metaforgeService.getArcs()
  );
});

/**
 * GET /api/quests
 * Fetch all quests
 */
router.get('/quests', async (req, res) => {
  await handleCachedRequest(
    req,
    res,
    'arc_raiders_quests',
    () => metaforgeService.getQuests()
  );
});

/**
 * GET /api/traders
 * Fetch all traders
 */
router.get('/traders', async (req, res) => {
  await handleCachedRequest(
    req,
    res,
    'arc_raiders_traders',
    () => metaforgeService.getTraders()
  );
});

/**
 * GET /api/maps
 * Fetch map data
 */
router.get('/maps', async (req, res) => {
  const mapId = req.query.map || null;
  const cacheKey = mapId ? `arc_raiders_map_${mapId}` : 'arc_raiders_maps';

  await handleCachedRequest(
    req,
    res,
    cacheKey,
    () => metaforgeService.getMaps(mapId)
  );
});

/**
 * GET /api/health
 * Health check endpoint
 */
router.get('/health', async (req, res) => {
  const cacheStats = cache.getStats();
  const metaforgeHealthy = await metaforgeService.healthCheck();

  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    cache: cacheStats,
    metaforge: {
      healthy: metaforgeHealthy,
      baseUrl: metaforgeService.baseUrl,
    },
    attribution: 'Data provided by MetaForge (https://metaforge.app/arc-raiders)',
  });
});

/**
 * POST /api/cache/clear
 * Clear all cache (admin endpoint - should be protected in production)
 */
router.post('/cache/clear', (req, res) => {
  cache.clear();
  res.json({
    success: true,
    message: 'Cache cleared successfully',
    timestamp: new Date().toISOString(),
  });
});

/**
 * GET /api/cache/stats
 * Get cache statistics
 */
router.get('/cache/stats', (req, res) => {
  res.json(cache.getStats());
});

/**
 * GET /api/attribution
 * Attribution information for MetaForge
 */
router.get('/attribution', (req, res) => {
  res.json({
    dataSource: 'MetaForge',
    website: 'https://metaforge.app/arc-raiders',
    discord: 'https://discord.gg/8UEK9TrQDs',
    license: 'Free use with attribution required',
    notice: 'This app uses game data from MetaForge, a community-driven Arc Raiders database.',
    commercialUse: 'Requires permission - contact MetaForge team via Discord',
  });
});

export default router;
