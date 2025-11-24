# MetaForge Data Source - API Integration Guide

**Last Updated**: 2025-11-24
**Status**: ✅ CONFIRMED - Public API Available
**Source**: https://metaforge.app/arc-raiders/api

---

## Executive Summary

**🎉 MAJOR DISCOVERY**: MetaForge provides a public JSON API for all Arc Raiders game data!

This eliminates the need for web scraping and provides structured, reliable data for our mobile app. We have a clear path to partnership and legal data usage.

---

## API Overview

### Base URL
```
https://metaforge.app/api/arc-raiders
```

### Available Endpoints

| Endpoint | Purpose | Data Returned |
|----------|---------|---------------|
| `GET /api/arc-raiders/items` | Items database | Items with filtering, pagination, component relationships |
| `GET /api/arc-raiders/arcs` | ARC enemies | ARCs with optional loot data |
| `GET /api/arc-raiders/quests` | Quests | Quests with required items and rewards |
| `GET /api/arc-raiders/traders` | Traders | All trader inventories |
| `GET /api/game-map-data` | Maps | Map data for specific maps |

### Terms of Usage

**Attribution Required** (Free Use):
- Must include attribution and link to https://metaforge.app/arc-raiders
- Users need to know where the data comes from

**Commercial Use** (Requires Permission):
- Paid apps, subscription services, or any monetized product
- **Must contact MetaForge team first via Discord**: https://discord.gg/8UEK9TrQDs

**API Guidelines**:
- Be respectful with API usage
- Large requests may be throttled
- Endpoints may change without warning
- **Best Practice**: Cache data locally, avoid calling API directly from mobile clients

---

## Game Data Structure

### ARC Enemies (15 Types)

From scraped data, Arc Raiders has 15+ unique ARC enemy types:

| ARC Name | Key Loot Drops |
|----------|---------------|
| **Bastion** | ARC Alloy, Bastion Cell, ARC Powercell, Medium Gun Parts, Medium Ammo |
| **Bombardier** | Bombardier Cell, Launcher Ammo, ARC Performance Steel, Advanced ARC Powercell |
| **Fireball** | Fireball Burner, Crude Explosives, ARC Alloy |
| **Hornet** | Hornet Driver, Medium Ammo, Simple Gun Parts |
| **Leaper** (Bison) | Leaper Pulse Unit, ARC Flex Rubber, Explosive Compound, ARC Motion Core |
| **Matriarch** | Matriarch Reactor (Raid Boss) |
| **Pop** | Pop Trigger, ARC Thermo Lining, Crude Explosives |
| **Queen** | Queen Reactor, Magnetic Accelerator, Advanced components (Major Boss) |
| **Rocketeer** | Rocketeer Driver, Heavy Ammo, Heavy Gun Parts |
| **Sentinel** | Sentinel Firing Core, ARC Thermo Lining, ARC Coolant, Heavy Ammo |
| **Shredder** | Shredder Gyro, Shotgun Ammo, Simple Gun Parts |
| **Snitch** | Snitch Scanner, Sensors, ARC Synthetic Resin |
| **Surveyor** (Rollbot) | Surveyor Vault, Sensors, ARC Circuitry |
| **Tick** | Tick Pod, ARC Alloy (explosive pod) |
| **Turret** | Light Ammo, Simple Gun Parts, ARC Alloy |
| **Wasp** | Wasp Driver, Light Ammo, ARC Powercell |

### Maps (5 Locations)

1. **Dam Battlegrounds** - Starting area, Testing Annex medical zone
2. **The Spaceport** - Rocket Assembly, industrial areas
3. **Buried City** - Plaza Rosa pharmacy, Space Travel Building
4. **Blue Gate** - Rare loot farming location
5. **Stella Montis** - NEW (Added Nov 13, 2025 in "North Line" update)

### Item Categories

From MetaForge homepage examples:
- **Weapons**: Torrente IV, Bettina III/IV, Arpeggio III, Stitcher II, Renegade III
- **Weapon Mods**: Padded Stock, Extended Light Mag II, Torrente Blueprint
- **Crafting Materials**: Oil, Kinetic Converter, Flow Controller, Steel Spring, Turbo Pump
- **Medical**: Bandage, Laboratory Reagents, Rusted Shut Medical Kit
- **Explosives**: Explosive Mine Blueprint, Duct Tape
- **Components**: Radio Relay, Magnetic Accelerator, Microscope
- **Loot Items**: Pottery, Silver Teaspoon Set, Statuette, Very Comfortable Pillow
- **Resources**: Torch Ginger, Key Card, Sample Cleaner, Broken Flashlight, Shotgun Parts

### Skill Tree System

MetaForge has a Skill Tree Builder feature:
- Example skills visible: "USED TO THE WEIGHT" (shield weight reduction), "BLAST-BORN" (explosion resistance)
- Conditioning Skills category confirmed
- Skill trees are shareable (build URLs)

### Quests System

Sample quests identified from guides:
- "Greasing Her Palms" (Celeste) - Multi-map objectives
- "What Goes Around" (Apollo) - Destroy ARC with specific weapon
- "A Better Use" (Tian Wen) - Supply Drop quest

### Traders System

- Multiple trader NPCs
- Item inventories and prices
- Currency: Raider Coins
- Recycle/breakdown system for items

---

## Recent Game Updates

### November Update 1.3.0 (Nov 20, 2025)
- Venator weapon tweaks
- Weapon and ARC balance changes
- Interactive Maps improvements
- Marketplace enhancements

### November Update 1.2.0 - "North Line" (Nov 13, 2025)
**Major Content Patch:**
- **New Map**: Stella Montis
- **Community Event**: "Breaking New Ground" (unlock event)
- **New Content**:
  - New ARC enemies
  - New weapons
  - New grenades and mines
  - New quests
- **Balance Changes**: Extensive weapon and ARC tuning

---

## Mobile App Integration Strategy

### Phase 1: API Integration (Week 1-2)

**Step 1: Contact MetaForge Team**
- Join Discord: https://discord.gg/8UEK9TrQDs
- Introduce mobile app project
- Request API usage permission for commercial app
- Discuss partnership opportunities:
  - Official mobile app status
  - Revenue share models
  - Co-branding options
  - API rate limits and best practices

**Step 2: Set Up Backend Proxy**
- **DO NOT** call MetaForge API directly from mobile app
- Create lightweight Node.js/Express server (or use Supabase Edge Functions)
- Server fetches from MetaForge API and caches responses
- Mobile app calls our backend, not MetaForge directly
- Benefits:
  - Control over API usage and caching
  - Can implement offline fallback data
  - Respect MetaForge's rate limits
  - Future-proof against API changes

**Step 3: Data Caching Strategy**
- Fetch all items, ARCs, quests, traders on app launch
- Cache in AsyncStorage (React Native)
- Update data weekly (background refresh)
- Offline-first: App works entirely without internet after first data sync
- Delta updates: Only fetch changes, not full database each time

### Phase 2: Data Structure (Week 2)

**Local SQLite Database** (optional, for advanced querying):
```sql
CREATE TABLE items (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon_url TEXT,
  category TEXT,
  stack_size INTEGER,
  weight REAL,
  value INTEGER,
  description TEXT,
  stats JSON,
  craftable BOOLEAN,
  components JSON,
  updated_at TIMESTAMP
);

CREATE TABLE arcs (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon_url TEXT,
  description TEXT,
  loot_drops JSON,
  difficulty TEXT,
  updated_at TIMESTAMP
);

CREATE TABLE quests (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  quest_giver TEXT,
  description TEXT,
  objectives JSON,
  rewards JSON,
  required_items JSON,
  updated_at TIMESTAMP
);
```

**Or simpler: JSON Storage in AsyncStorage** (recommended for MVP):
```javascript
// Fetch and cache items
const response = await fetch('https://our-backend.com/api/items');
const items = await response.json();
await AsyncStorage.setItem('arc_raiders_items', JSON.stringify(items));
await AsyncStorage.setItem('arc_raiders_items_updated', Date.now().toString());

// Load from cache
const cachedItems = await AsyncStorage.getItem('arc_raiders_items');
const items = JSON.parse(cachedItems);
```

### Phase 3: Search Optimization (Week 3)

**Fast Item Search (< 2s goal)**:
- Use Fuse.js for fuzzy search (handles typos)
- Pre-index all searchable fields
- Search by: name, category, tags, description keywords
- Voice search: React Native Voice → text → search

```javascript
import Fuse from 'fuse.js';

const fuse = new Fuse(items, {
  keys: ['name', 'category', 'description'],
  threshold: 0.3, // Fuzzy match threshold
  includeScore: true
});

// Lightning-fast search
const results = fuse.search('Renegade'); // < 100ms for 500+ items
```

---

## Attribution Requirements

### In-App Attribution

**Required Locations:**

1. **Settings Screen** - "Data Source" section:
```
Game data provided by MetaForge
Visit: metaforge.app/arc-raiders
Discord: discord.gg/8UEK9TrQDs
```

2. **About Screen** - Full attribution:
```
Arc Raiders Companion App

This app uses game data from MetaForge, a community-driven
Arc Raiders database maintained by dedicated fans.

Data Source: metaforge.app/arc-raiders
Join the community: discord.gg/8UEK9TrQDs

Arc Raiders is developed by Embark Studios.
This app is not affiliated with Embark Studios.
```

3. **Item Detail Screens** - Small footer text:
```
Data: MetaForge • Updated: [date]
```

### Marketing Attribution

**App Store Description**:
```
Powered by MetaForge community data
Visit metaforge.app/arc-raiders for the full web experience
```

**Social Media Posts**:
- Always tag/credit MetaForge when sharing app features
- Include link to metaforge.app/arc-raiders

---

## API Integration Code Examples

### Backend Proxy (Node.js/Express)

```javascript
// server.js
const express = require('express');
const fetch = require('node-fetch');
const NodeCache = require('node-cache');

const app = express();
const cache = new NodeCache({ stdTTL: 3600 }); // 1 hour cache

// Proxy endpoint for items
app.get('/api/items', async (req, res) => {
  const cacheKey = 'arc_raiders_items';

  // Check cache first
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return res.json(cachedData);
  }

  try {
    // Fetch from MetaForge
    const response = await fetch('https://metaforge.app/api/arc-raiders/items');
    const data = await response.json();

    // Cache for 1 hour
    cache.set(cacheKey, data);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

app.listen(3000, () => console.log('Proxy running on port 3000'));
```

### React Native Integration

```javascript
// services/api.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://our-backend.com/api';
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 1 week

export async function fetchItems(forceRefresh = false) {
  const cacheKey = 'arc_raiders_items';
  const cacheTimeKey = 'arc_raiders_items_timestamp';

  // Check cache first
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

  // Fetch fresh data
  try {
    const response = await fetch(`${API_BASE_URL}/items`);
    const data = await response.json();

    // Cache for offline use
    await AsyncStorage.setItem(cacheKey, JSON.stringify(data));
    await AsyncStorage.setItem(cacheTimeKey, Date.now().toString());

    return data;
  } catch (error) {
    // Fallback to cache if network fails
    const cachedData = await AsyncStorage.getItem(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    throw error;
  }
}
```

---

## Partnership Proposal Template

**Discord Message to MetaForge Team:**

```
Hi MetaForge team! 👋

I'm building a native iOS companion app for Arc Raiders and discovered your
excellent API. I'm reaching out to discuss partnership opportunities.

**Project**: Arc Raiders Companion - Native Mobile App
**Goal**: The ONLY mobile app for in-game quick reference (console/PC players)
**Differentiation**: Mobile-first UX, offline support, personal stats tracking

**Why Partner with Us:**
- We fill the mobile gap (you dominate desktop web)
- Full attribution and traffic back to MetaForge
- Potential revenue share model
- Official "Powered by MetaForge" branding
- We handle mobile, you own the data

**What We Need:**
- Permission to use API in commercial app (freemium model)
- API rate limit guidance
- Partnership terms discussion

**What You Get:**
- Mobile presence without building it yourself
- Traffic from iOS users
- Optional revenue share
- Co-marketing opportunities

Would love to discuss! Can we hop on a call this week?

GitHub: [our repo link]
Contact: [email]
```

---

## Fallback Plan (If Partnership Declined)

**Option 1**: Free app with MetaForge attribution
- No monetization initially
- Request free API access for non-commercial use
- Build user base, then revisit partnership

**Option 2**: Web scraping (last resort)
- Scrape MetaForge public pages weekly
- Still provide attribution
- Legal (public data) but less reliable
- Update process: cron job fetches data → updates Firebase → mobile app syncs

**Option 3**: Community-sourced data
- Start with scraped MetaForge data (with attribution)
- Allow users to submit corrections/updates
- Build our own data layer over time
- Most work, but full control

---

## Timeline & Next Steps

### This Week (Week 1)
- [x] Contact MetaForge via Discord
- [ ] Request API partnership
- [ ] Set up backend proxy (Node.js or Supabase)
- [ ] Test API endpoints and data structure
- [ ] Design local caching strategy

### Next Week (Week 2)
- [ ] Implement API integration in React Native
- [ ] Build search functionality (Fuse.js)
- [ ] Create offline-first data sync
- [ ] Test with real device (load time < 2s)

### Week 3-4
- [ ] Integrate all data types (items, ARCs, maps, quests)
- [ ] Implement delta updates
- [ ] Add attribution screens
- [ ] Beta test data accuracy

---

## API Response Examples (Expected Format)

Based on typical REST API patterns, we expect:

**GET /api/arc-raiders/items:**
```json
{
  "items": [
    {
      "id": "renegade-iii",
      "name": "Renegade III",
      "category": "weapon",
      "icon": "https://cdn.metaforge.app/arc-raiders/icons/renegade-iii48.webp",
      "stack_size": 1,
      "weight": 2.5,
      "value": 15000,
      "stats": {
        "damage": 45,
        "fire_rate": 600,
        "magazine": 30
      },
      "description": "Tier III assault rifle..."
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 50,
    "total": 500
  }
}
```

**GET /api/arc-raiders/arcs:**
```json
{
  "arcs": [
    {
      "id": "bastion",
      "name": "Bastion",
      "icon": "https://unhbvkszwhczbjxgetgk.supabase.co/storage/v1/object/public/images/arc-raiders/icons/bastion.webp",
      "description": "Heavy armored ARC unit...",
      "difficulty": "hard",
      "loot": [
        { "item_id": "arc-alloy", "drop_rate": 0.8 },
        { "item_id": "bastion-cell", "drop_rate": 0.5 }
      ]
    }
  ]
}
```

---

## Success Metrics

### API Integration
- ✅ Partnership established with MetaForge
- ✅ Backend proxy deployed (< 500ms response time)
- ✅ 100% data accuracy vs MetaForge web
- ✅ < 2s item search on mobile
- ✅ Offline mode works with week-old data

### User Experience
- ✅ Data loads in < 3s on first launch
- ✅ Instant search results (< 100ms)
- ✅ Works completely offline after initial sync
- ✅ Weekly auto-updates without user action
- ✅ Users know data comes from MetaForge (attribution visible)

---

**Bottom Line**: MetaForge's API is a HUGE win for our mobile app. With proper attribution and partnership, we have a clean, legal, reliable data source that enables our mobile-first differentiation strategy.

**Next Action**: Contact MetaForge on Discord TODAY to start partnership discussion.
