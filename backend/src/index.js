/**
 * Arc Raiders API Proxy Server
 *
 * Backend proxy for MetaForge Arc Raiders API
 * Implements caching, rate limiting, and error handling
 *
 * Data Attribution:
 * - Game data provided by MetaForge (https://metaforge.app/arc-raiders)
 * - Arc Raiders developed by Embark Studios
 * - This app is not affiliated with Embark Studios or MetaForge
 *
 * License: MIT
 * Author: AIBC Solutions
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import config from './config.js';
import apiRoutes from './routes/api.js';

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);

    // Check if origin is in allowed list
    if (config.allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Compression middleware
app.use(compression());

// JSON parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: config.rateLimit.windowMs / 1000,
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api', limiter);

// Request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Arc Raiders API Proxy',
    version: '1.0.0',
    description: 'Backend proxy for MetaForge Arc Raiders API',
    endpoints: {
      items: '/api/items',
      arcs: '/api/arcs',
      quests: '/api/quests',
      traders: '/api/traders',
      maps: '/api/maps',
      health: '/api/health',
      attribution: '/api/attribution',
    },
    attribution: {
      dataSource: 'MetaForge',
      website: 'https://metaforge.app/arc-raiders',
      discord: 'https://discord.gg/8UEK9TrQDs',
    },
    documentation: 'See README.md for full API documentation',
  });
});

// API routes
app.use('/api', apiRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Endpoint ${req.path} not found`,
    availableEndpoints: [
      '/api/items',
      '/api/arcs',
      '/api/quests',
      '/api/traders',
      '/api/maps',
      '/api/health',
      '/api/attribution',
    ],
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]', err);

  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString(),
  });
});

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log('');
  console.log('═══════════════════════════════════════════════════════');
  console.log('  Arc Raiders API Proxy Server');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`  Server running on: http://localhost:${PORT}`);
  console.log(`  Environment: ${config.nodeEnv}`);
  console.log(`  Cache TTL: ${config.cache.ttl}s`);
  console.log(`  Rate Limit: ${config.rateLimit.maxRequests} req/${config.rateLimit.windowMs / 60000}min`);
  console.log('');
  console.log('  Data Attribution:');
  console.log('    Source: MetaForge (https://metaforge.app/arc-raiders)');
  console.log('    Discord: https://discord.gg/8UEK9TrQDs');
  console.log('═══════════════════════════════════════════════════════');
  console.log('');
});

export default app;
