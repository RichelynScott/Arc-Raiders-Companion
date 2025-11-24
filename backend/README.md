# Arc Raiders API Proxy Server

Backend proxy server for MetaForge Arc Raiders API. Implements caching, rate limiting, and error handling to provide a reliable data layer for the Arc Raiders mobile companion app.

## Data Attribution

**Data Source**: [MetaForge](https://metaforge.app/arc-raiders) - Community-driven Arc Raiders database

**License**: Free use with attribution required. Commercial use requires permission.

**Contact**: [MetaForge Discord](https://discord.gg/8UEK9TrQDs)

**Game Developer**: Arc Raiders by Embark Studios (this app is not affiliated)

---

## Features

- ✅ **Caching**: 1-hour in-memory cache with configurable TTL
- ✅ **Rate Limiting**: 100 requests per 15 minutes (configurable)
- ✅ **Error Handling**: Serves stale cache if MetaForge is down
- ✅ **CORS**: Configured for mobile app origins
- ✅ **Compression**: Gzip compression for responses
- ✅ **Security**: Helmet.js for security headers
- ✅ **Monitoring**: Health check and cache statistics endpoints

---

## Quick Start

### Prerequisites

- Node.js 18+ (recommended: v20 LTS)
- npm or yarn

### Installation

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your configuration
nano .env

# Start server
npm start
```

### Development Mode (with auto-reload)

```bash
npm run dev
```

---

## API Endpoints

### Game Data Endpoints

#### `GET /api/items`
Fetch all Arc Raiders items (weapons, materials, equipment)

**Response Example**:
```json
{
  "items": [...],
  "cached": false,
  "fetchedAt": "2025-11-24T12:00:00.000Z"
}
```

#### `GET /api/arcs`
Fetch all ARC enemies with loot drops

**Response Example**:
```json
{
  "arcs": [...],
  "cached": true,
  "cachedAt": "2025-11-24T11:30:00.000Z"
}
```

#### `GET /api/quests`
Fetch all quests with objectives and rewards

#### `GET /api/traders`
Fetch all trader inventories

#### `GET /api/maps`
Fetch map data

**Optional Query Parameter**:
- `map`: Specific map ID (e.g., `/api/maps?map=dam-battlegrounds`)

### System Endpoints

#### `GET /api/health`
Health check endpoint with cache and MetaForge API status

**Response Example**:
```json
{
  "status": "healthy",
  "timestamp": "2025-11-24T12:00:00.000Z",
  "cache": {
    "hits": 45,
    "misses": 5,
    "keys": 5,
    "ttl": 3600
  },
  "metaforge": {
    "healthy": true,
    "baseUrl": "https://metaforge.app/api/arc-raiders"
  },
  "attribution": "Data provided by MetaForge (https://metaforge.app/arc-raiders)"
}
```

#### `GET /api/attribution`
MetaForge attribution information

#### `GET /api/cache/stats`
Cache statistics

#### `POST /api/cache/clear`
Clear all cached data (admin endpoint - protect in production)

---

## Configuration

### Environment Variables

Edit `.env` file to configure:

```bash
# Server
PORT=3000
NODE_ENV=development

# CORS (comma-separated origins)
ALLOWED_ORIGINS=http://localhost:19006,exp://192.168.1.100:19000

# MetaForge API
METAFORGE_API_BASE=https://metaforge.app/api/arc-raiders

# Cache (in seconds)
CACHE_TTL=3600          # 1 hour
CACHE_CHECK_PERIOD=600  # 10 minutes

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000      # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100      # 100 requests per window

# Logging
LOG_LEVEL=info
```

### CORS Origins

Add your mobile app's development server origins:

```bash
# Expo dev server
ALLOWED_ORIGINS=http://localhost:19006,exp://192.168.1.100:19000

# Production (update with your domain)
ALLOWED_ORIGINS=https://app.example.com
```

---

## Testing

### Manual Testing with curl

```bash
# Test items endpoint
curl http://localhost:3000/api/items

# Test health endpoint
curl http://localhost:3000/api/health

# Test cache (second request should be cached)
curl http://localhost:3000/api/arcs
curl http://localhost:3000/api/arcs  # Should show "cached": true

# Clear cache
curl -X POST http://localhost:3000/api/cache/clear

# Test with query parameters
curl "http://localhost:3000/api/maps?map=dam-battlegrounds"
```

### Testing with Postman/Insomnia

Import collection:
1. Base URL: `http://localhost:3000`
2. Create requests for each endpoint
3. Test cache behavior (first request vs second request)
4. Test error handling (stop server, verify stale cache served)

---

## Deployment Options

### Option 1: Railway (Recommended - Free Tier)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up
```

**Railway Config**:
- Auto-detects Node.js
- Set environment variables in Railway dashboard
- Free tier: 500 hours/month

### Option 2: Vercel Serverless

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

**Note**: Requires refactoring to serverless functions (see `vercel.json` example below)

### Option 3: Render.com (Free Tier)

1. Connect GitHub repo
2. Select "Web Service"
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables in dashboard

### Option 4: Local/VPS

```bash
# Using PM2 for process management
npm install -g pm2

# Start server
pm2 start src/index.js --name arc-raiders-api

# Enable startup on boot
pm2 startup
pm2 save
```

---

## Mobile App Integration

### React Native Example

```javascript
// services/api.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://localhost:3000/api'; // Update for production

export async function fetchItems(forceRefresh = false) {
  const cacheKey = 'arc_raiders_items';
  const cacheTimeKey = 'arc_raiders_items_timestamp';
  const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 1 week

  // Check local cache first
  if (!forceRefresh) {
    const cachedData = await AsyncStorage.getItem(cacheKey);
    const cacheTime = await AsyncStorage.getItem(cacheTimeKey);

    if (cachedData && cacheTime) {
      const age = Date.now() - parseInt(cacheTime);
      if (age < CACHE_DURATION) {
        return JSON.parse(cachedData);
      }
    }
  }

  // Fetch from proxy server
  try {
    const response = await fetch(`${API_BASE_URL}/items`);
    const data = await response.json();

    // Cache locally for offline use
    await AsyncStorage.setItem(cacheKey, JSON.stringify(data));
    await AsyncStorage.setItem(cacheTimeKey, Date.now().toString());

    return data;
  } catch (error) {
    // Fallback to local cache if network fails
    const cachedData = await AsyncStorage.getItem(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    throw error;
  }
}
```

---

## Architecture

```
┌─────────────────┐
│  Mobile App     │
│  (React Native) │
└────────┬────────┘
         │
         │ HTTP Requests
         ▼
┌─────────────────┐
│  Proxy Server   │
│  (Express)      │
│  - Rate Limit   │
│  - Cache (1hr)  │
│  - CORS         │
└────────┬────────┘
         │
         │ HTTP Requests (cached)
         ▼
┌─────────────────┐
│  MetaForge API  │
│  (Public API)   │
└─────────────────┘
```

### Caching Strategy

1. **Server Cache** (1 hour TTL)
   - In-memory NodeCache
   - Shared across all clients
   - Background refresh when expired

2. **Client Cache** (1 week TTL)
   - AsyncStorage (React Native)
   - Per-device storage
   - Offline-first approach

### Error Handling

1. **MetaForge Down**: Serve stale server cache
2. **Server Down**: Serve client cache
3. **No Cache**: Return error with attribution

---

## Performance Benchmarks

**Target Metrics**:
- ✅ First request (cache miss): < 1s
- ✅ Cached request (cache hit): < 100ms
- ✅ Server startup: < 2s
- ✅ Memory usage: < 100MB

**Test Results** (local testing):
```bash
# First request (fetches from MetaForge)
curl -w "\nTime: %{time_total}s\n" http://localhost:3000/api/items
# Time: 0.856s

# Second request (served from cache)
curl -w "\nTime: %{time_total}s\n" http://localhost:3000/api/items
# Time: 0.043s
```

---

## Security Considerations

### Production Checklist

- [ ] Change `NODE_ENV` to `production`
- [ ] Set strong rate limits (adjust based on usage)
- [ ] Protect `/api/cache/clear` endpoint (add auth middleware)
- [ ] Enable HTTPS (use reverse proxy like Nginx)
- [ ] Set specific CORS origins (remove `*` wildcard)
- [ ] Monitor API usage and cache hit rates
- [ ] Implement API key authentication if needed
- [ ] Add request logging to file (not just console)
- [ ] Set up error monitoring (Sentry, etc.)

### Rate Limiting

Default: 100 requests per 15 minutes per IP

**Adjust for production**:
```javascript
// Stricter limits for public API
RATE_LIMIT_WINDOW_MS=900000      // 15 minutes
RATE_LIMIT_MAX_REQUESTS=50       // 50 requests per window

// More lenient for trusted clients
RATE_LIMIT_MAX_REQUESTS=1000     // 1000 requests per 15 min
```

---

## Troubleshooting

### Common Issues

**Port already in use**:
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or change PORT in .env
PORT=3001
```

**CORS errors**:
```bash
# Add your origin to .env
ALLOWED_ORIGINS=http://localhost:19006,exp://192.168.1.100:19000
```

**MetaForge API timeout**:
```bash
# Check MetaForge API health
curl https://metaforge.app/api/arc-raiders/items

# Increase timeout in src/config.js
timeout: 20000, // 20 seconds
```

**Cache not working**:
```bash
# Check cache stats
curl http://localhost:3000/api/cache/stats

# Clear cache
curl -X POST http://localhost:3000/api/cache/clear
```

---

## Development Roadmap

### Phase 1: MVP (Current)
- [x] Basic proxy server
- [x] Caching layer
- [x] Rate limiting
- [x] Error handling
- [x] Health checks

### Phase 2: Enhanced Features
- [ ] Redis caching (for multi-instance deployment)
- [ ] WebSocket support for real-time updates
- [ ] GraphQL API layer
- [ ] Admin dashboard for monitoring
- [ ] Automated tests (Jest)

### Phase 3: Production Ready
- [ ] Authentication middleware
- [ ] Request logging to file
- [ ] Error monitoring (Sentry)
- [ ] Performance monitoring (New Relic)
- [ ] CDN integration for static assets
- [ ] Database for analytics

---

## Contributing

This is an open-source project. Contributions welcome!

### Development Workflow

```bash
# Fork and clone repo
git clone https://github.com/your-username/arc-raiders-app.git
cd arc-raiders-app/backend

# Install dependencies
npm install

# Create feature branch
git checkout -b feature/your-feature

# Make changes and test
npm run dev

# Commit and push
git add .
git commit -m "feat: add your feature"
git push origin feature/your-feature
```

---

## License

MIT License - see LICENSE file

---

## Attribution

**Game Data**: [MetaForge](https://metaforge.app/arc-raiders)
**Game Developer**: [Embark Studios](https://www.embark-studios.com/)
**App Developer**: AIBC Solutions

**Disclaimer**: This app is not affiliated with or endorsed by Embark Studios or MetaForge.

---

## Support

- **Issues**: [GitHub Issues](https://github.com/your-username/arc-raiders-app/issues)
- **Discord**: [MetaForge Discord](https://discord.gg/8UEK9TrQDs)
- **Email**: support@example.com

---

*Last Updated: 2025-11-24*
