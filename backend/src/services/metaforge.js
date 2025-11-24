/**
 * MetaForge API Service
 * Handles all requests to MetaForge Arc Raiders API
 *
 * Data source: MetaForge (https://metaforge.app/arc-raiders)
 * API documentation: https://metaforge.app/arc-raiders/api
 *
 * ATTRIBUTION REQUIRED: This app uses data from MetaForge community database
 * License: Free use with attribution, commercial use requires permission
 * Contact: https://discord.gg/8UEK9TrQDs
 */

import config from '../config.js';

class MetaForgeService {
  constructor() {
    this.baseUrl = config.metaforgeApi.baseUrl;
    this.timeout = config.metaforgeApi.timeout;
  }

  /**
   * Make a request to MetaForge API
   * @param {string} endpoint - API endpoint (e.g., '/items')
   * @param {object} options - Fetch options
   * @returns {Promise<object>} API response data
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      console.log(`[METAFORGE API] Fetching: ${url}`);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'User-Agent': 'Arc-Raiders-Companion-App/1.0',
          'Accept': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`MetaForge API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`[METAFORGE API] Success: ${url}`);

      return data;
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error(`[METAFORGE API] Timeout: ${url}`);
        throw new Error('MetaForge API request timeout');
      }

      console.error(`[METAFORGE API] Error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Fetch all items from MetaForge
   * @returns {Promise<object>} Items data
   */
  async getItems() {
    return this.request('/items');
  }

  /**
   * Fetch all ARCs (enemies) from MetaForge
   * @returns {Promise<object>} ARCs data
   */
  async getArcs() {
    return this.request('/arcs');
  }

  /**
   * Fetch all quests from MetaForge
   * @returns {Promise<object>} Quests data
   */
  async getQuests() {
    return this.request('/quests');
  }

  /**
   * Fetch all traders from MetaForge
   * @returns {Promise<object>} Traders data
   */
  async getTraders() {
    return this.request('/traders');
  }

  /**
   * Fetch map data from MetaForge
   * @param {string} mapId - Optional map ID (if endpoint supports it)
   * @returns {Promise<object>} Map data
   */
  async getMaps(mapId = null) {
    const endpoint = mapId ? `/game-map-data?map=${mapId}` : '/game-map-data';
    return this.request(endpoint);
  }

  /**
   * Health check - test if MetaForge API is accessible
   * @returns {Promise<boolean>} True if API is healthy
   */
  async healthCheck() {
    try {
      await this.getItems();
      return true;
    } catch (error) {
      console.error('[METAFORGE API] Health check failed:', error.message);
      return false;
    }
  }
}

export default new MetaForgeService();
