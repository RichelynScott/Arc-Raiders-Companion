/**
 * Configuration Module
 * Loads environment variables and provides application config
 */

import dotenv from 'dotenv';

dotenv.config();

const config = {
  // Server config
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',

  // CORS config
  allowedOrigins: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['http://localhost:19006'], // Default Expo dev server

  // MetaForge API config
  metaforgeApi: {
    baseUrl: process.env.METAFORGE_API_BASE || 'https://metaforge.app/api/arc-raiders',
    timeout: 10000, // 10 seconds
  },

  // Cache config
  cache: {
    ttl: parseInt(process.env.CACHE_TTL) || 3600, // 1 hour default
    checkPeriod: parseInt(process.env.CACHE_CHECK_PERIOD) || 600, // 10 minutes
  },

  // Rate limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000, // 15 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  },

  // Logging
  logLevel: process.env.LOG_LEVEL || 'info',
};

export default config;
