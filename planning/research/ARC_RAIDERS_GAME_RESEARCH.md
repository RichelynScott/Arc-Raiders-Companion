# Arc Raiders - Game Research & Data Sources

**Last Updated**: 2025-11-24
**Status**: ✅ MAJOR PROGRESS - MetaForge API Discovered!

---

## Overview

Arc Raiders is a cooperative third-person action game developed by Embark Studios. This document compiles research about the game to inform companion app feature development.

---

## Game Information

### Basic Details
- **Developer**: Embark Studios
- **Publisher**: Embark Studios
- **Genre**: Third-person shooter, Co-op PvE
- **Platform**: PC (Steam), PlayStation 5, Xbox Series X/S
- **Release Date**: TBD (was delayed from 2023)
- **Official Site**: https://www.arcraiders.com/
- **Steam**: https://store.steampowered.com/app/1471270/Arc_Raiders/

### Game Description
Arc Raiders is a free-to-play cooperative third-person shooter set in a sci-fi world. Players team up to fight against mechanized threats called ARCs (Action Real-time Combat units) that have invaded Earth. The game emphasizes teamwork, strategic combat, and dynamic encounters.

### Key Features (Based on Public Information)
- **Co-op Gameplay**: Teams of players working together
- **Tactical Combat**: Strategic approach to enemy encounters
- **Mechanized Enemies**: Various types of ARC units with different behaviors
- **Dynamic World**: Procedural elements and changing conditions
- **Extraction-Based**: Possible extraction shooter mechanics
- **Loot & Progression**: Weapon and equipment upgrades
- **Free-to-Play**: Monetization likely through cosmetics

---

## Data Sources (To Research)

### Primary Sources
- [x] **Official Website**: arcraiders.com (basic info available)
- [x] **Steam Page**: https://store.steampowered.com/app/1471270/Arc_Raiders/
- [ ] **Official Social Media**: Twitter/X, Instagram, YouTube for updates
- [ ] **Press Releases**: Game announcements and feature reveals
- [ ] **Developer Blogs**: Embark Studios blog/dev diaries

### Community Sources ✅ FULLY DISCOVERED
- [x] **MetaForge** - https://metaforge.app/arc-raiders **← PRIMARY DATA SOURCE**
  - ✅ Comprehensive game database (500+ items, 15+ ARCs, 5 maps)
  - ✅ **PUBLIC API AVAILABLE** (https://metaforge.app/api/arc-raiders)
  - ✅ Active guides and patch notes (updated Nov 20, 2025)
  - ✅ Community Discord: https://discord.gg/8UEK9TrQDs
  - ✅ Professional, maintained platform
- [x] **ArcRaiders.app** - Community companion tool (loadout planner, maps)
- [x] **Reddit**: r/ArcRaiders community exists
- [ ] **Discord**: Join MetaForge Discord for partnership discussion
- [ ] **YouTube**: Guides available (featured on MetaForge)
- [ ] **Twitch**: Streamers active

### Technical Sources ✅ API FOUND!
- [x] **MetaForge API**: https://metaforge.app/api/arc-raiders
  - ✅ GET /items - All items with filtering & pagination
  - ✅ GET /arcs - All ARCs with loot data
  - ✅ GET /quests - All quests with rewards
  - ✅ GET /traders - Trader inventories
  - ✅ GET /game-map-data - Map data for all 5 maps
  - ⚠️ **Requires attribution** (link to metaforge.app/arc-raiders)
  - ⚠️ **Commercial use requires Discord permission**
- [x] **Data Mining**: NOT NEEDED (API available!)
- [x] **Unofficial APIs**: NOT NEEDED (Official MetaForge API sufficient!)

---

## Game Systems (To Research)

### Characters/Classes
- [ ] Available character types or classes
- [ ] Character abilities and stats
- [ ] Progression systems
- [ ] Unlocks and requirements

### Weapons & Equipment
- [ ] Weapon categories (assault rifles, sniper, etc.)
- [ ] Weapon stats (damage, fire rate, range)
- [ ] Attachments and modifications
- [ ] Equipment slots (grenades, gadgets)
- [ ] Rarity tiers

### Enemies (ARCs)
- [ ] Types of ARC units
- [ ] Enemy behaviors and weaknesses
- [ ] Boss encounters
- [ ] Spawn mechanics

### Maps & Locations
- [ ] Available maps/regions
- [ ] Points of interest
- [ ] Resource spawn locations
- [ ] Extraction points

### Progression Systems
- [ ] Player level/XP system
- [ ] Weapon unlock progression
- [ ] Skill trees or upgrade paths
- [ ] Seasonal content (if applicable)

### Economy
- [ ] In-game currency types
- [ ] Item costs and pricing
- [ ] Crafting system (if exists)
- [ ] Trading/marketplace (if exists)

---

## Companion App Feature Ideas

Based on typical extraction/co-op shooter mechanics:

### High Priority Features
1. **Weapon & Equipment Database**
   - All weapons with detailed stats
   - Equipment and gadgets catalog
   - Attachment compatibility
   - DPS calculators

2. **Loadout Builder**
   - Create and save loadout configs
   - Stat calculations for builds
   - Share loadouts with friends
   - Synergy recommendations

3. **Interactive Maps**
   - All game maps with zoom/pan
   - Resource spawn locations
   - Enemy patrol routes (if predictable)
   - Extraction points
   - Points of interest

4. **Player Stats Tracker**
   - Manual input for match results
   - K/D ratio tracking
   - Win/loss records
   - Favorite weapons stats
   - Progress graphs

5. **Strategy Guides**
   - Beginner tutorials
   - Advanced tactics
   - Enemy-specific strategies
   - Map-specific tips

### Medium Priority Features
6. **Build Optimizer**
   - Suggest optimal builds for playstyle
   - Meta loadout recommendations
   - Counter-builds for specific enemies

7. **Community Tips**
   - User-submitted tips and tricks
   - Upvote/downvote system
   - Category organization

8. **News & Updates**
   - Patch notes aggregation
   - Event announcements
   - Maintenance schedules

9. **Team Finder** (if social features allowed)
   - LFG (Looking for Group)
   - Player profiles
   - Communication preferences

### Low Priority / Future
10. **Live Match Tracking** (requires game integration)
11. **Clan Management**
12. **Leaderboards**
13. **Achievement Tracker**

---

## Data Collection Strategy

### Phase 1: Manual Research (Weeks 1-2)
1. Visit all official sources, compile basic game info
2. Join community Discord/Reddit, monitor discussions
3. Watch gameplay videos, take screenshots of UI/stats
4. Create initial data spreadsheets (weapons, enemies, maps)

### Phase 2: Community Collaboration (Weeks 3-4)
1. Reach out to community content creators
2. Request permission to use community-created data
3. Collaborate with wiki maintainers
4. Credit all data sources appropriately

### Phase 3: Data Mining (if necessary, Weeks 5+)
1. Research if game files are accessible
2. Investigate community data mining tools
3. Extract static assets (images, icons)
4. Parse game data files for stats

### Phase 4: Ongoing Updates
1. Monitor patch notes for data changes
2. Update app data with each game update
3. Implement automated update checks
4. Consider CMS for easy content updates

---

## Legal & Ethical Considerations

### Fair Use
- Companion apps typically fall under fair use
- Provide value-added service, not game replacement
- No redistribution of game assets without permission

### Terms of Service
- Review Arc Raiders/Embark Studios TOS
- Check for clauses about third-party apps/tools
- Ensure no violations of anti-cheat or game integrity

### Attribution
- Credit all data sources (wikis, community members)
- Respect intellectual property
- Use game name responsibly (no confusion with official app)

### Monetization
- If monetizing (ads, premium), ensure compliance
- Don't claim official affiliation
- Consider revenue sharing with data contributors

---

## Research Action Items

### Immediate (Week 1)
- [ ] Visit arcraiders.com and extract all available game info
- [ ] Check Steam page for community guides and discussions
- [ ] Search for Arc Raiders wiki (Fandom, etc.)
- [ ] Join official/community Discord if available
- [ ] Subscribe to r/ArcRaiders subreddit (if exists)
- [ ] Search YouTube for gameplay videos and guides
- [ ] Check for existing companion apps or tools

### Short-term (Weeks 2-3)
- [ ] Compile initial weapon/equipment database
- [ ] Map out game systems and mechanics
- [ ] Identify most-requested features from community
- [ ] Reach out to content creators for collaboration
- [ ] Determine primary data sources for MVP

### Ongoing
- [ ] Monitor game updates and patch notes
- [ ] Track community feedback on needed tools
- [ ] Update research document with new findings
- [ ] Validate data accuracy with multiple sources

---

## Questions to Answer

1. **Game Status**: Is the game currently playable? (Beta, EA, Released?)
2. **API Availability**: Does Embark provide any official APIs or data feeds?
3. **Community Size**: How active is the player community?
4. **Existing Tools**: What companion tools already exist? What gaps can we fill?
5. **Update Frequency**: How often does the game receive balance updates?
6. **Content Creators**: Who are the major content creators we can partner with?
7. **Wiki Status**: Is there an established wiki? Who maintains it?
8. **Official Stance**: Has Embark Studios commented on third-party tools?

---

## Competitive Analysis

### Similar Games with Companion Apps
- **Destiny 2**: DIM (Destiny Item Manager), Destiny Tracker
- **The Division 2**: Various build optimizers and map tools
- **Warframe**: Warframe Market, companion app
- **Escape from Tarkov**: Tarkov Market, Map Genie, etc.

### Success Patterns
- Clean, mobile-optimized UI
- Offline functionality for core features
- Regular updates matching game patches
- Active community engagement
- Ad-free or non-intrusive monetization

### Lessons Learned
- Data accuracy is critical (single source of truth)
- Fast load times essential for in-game use
- Dark mode preferred by gamers
- Search and filter capabilities crucial
- Share functionality drives adoption

---

## Notes & Observations

*(This section will be populated as research progresses)*

### 2025-11-24: Initial Research Setup
- Created research document structure
- Identified key research areas
- Planned research phases
- Listed action items for Week 1

### 2025-11-24: MAJOR BREAKTHROUGH - MetaForge API Discovery
**Status**: ✅ PRIMARY DATA SOURCE IDENTIFIED

**Discovery**: MetaForge (metaforge.app/arc-raiders) provides comprehensive Arc Raiders database with **PUBLIC API ACCESS**!

**Key Findings:**
- **15+ ARC Enemy Types**: Bastion, Bombardier, Fireball, Hornet, Leaper, Matriarch, Pop, Queen, Rocketeer, Sentinel, Shredder, Snitch, Surveyor, Tick, Turret, Wasp
- **5 Maps**: Dam Battlegrounds, Spaceport, Buried City, Blue Gate, Stella Montis (new in Nov 2025)
- **500+ Items**: Weapons, mods, crafting materials, loot, medical, explosives
- **Skill Tree System**: Multi-tier progression with shareable builds
- **Quest System**: Multiple quest givers, multi-map objectives
- **Trader System**: NPC vendors with item inventories, Raider Coins currency
- **Recent Updates**: Active development (Nov 20 & Nov 13, 2025 patches documented)

**API Endpoints Available:**
- `/api/arc-raiders/items` - All items with filtering/pagination
- `/api/arc-raiders/arcs` - All ARCs with loot tables
- `/api/arc-raiders/quests` - Quest database
- `/api/arc-raiders/traders` - Trader inventories
- `/api/game-map-data` - Interactive map data

**Legal Requirements:**
- ✅ Attribution required: Link to metaforge.app/arc-raiders
- ⚠️ Commercial use: Must request permission via Discord (https://discord.gg/8UEK9TrQDs)
- ✅ Community-driven data (not official Embark Studios)
- ✅ Rate limiting may apply (cache data locally)

**Impact on Mobile App:**
- ✅ No web scraping needed
- ✅ Structured JSON API (easier integration)
- ✅ Partnership opportunity with MetaForge
- ✅ Clear legal path with attribution
- ✅ Active community for validation
- ✅ Regular updates (follows game patches)

**Next Actions:**
1. Contact MetaForge team via Discord for partnership discussion
2. Request API usage permission for commercial mobile app
3. Set up backend proxy (don't call API directly from mobile)
4. Implement local caching strategy (offline-first)
5. Design attribution screens for app

**Partnership Proposal:**
- Offer: Official MetaForge mobile app
- Value: Mobile presence without MetaForge building it
- Benefits: Traffic to MetaForge, co-marketing, revenue share
- Ask: API permission, potential data collaboration

See **[METAFORGE_DATA_SOURCE.md](../METAFORGE_DATA_SOURCE.md)** for comprehensive API integration guide.

---

## References

**Official:**
- [Arc Raiders Website](https://www.arcraiders.com/)
- [Arc Raiders on Steam](https://store.steampowered.com/app/1471270/Arc_Raiders/)
- [Embark Studios](https://www.embark-studios.com/)

**Community & Data Sources:**
- ✅ [MetaForge Arc Raiders](https://metaforge.app/arc-raiders) - **PRIMARY DATA SOURCE**
  - Comprehensive game database with PUBLIC API
  - Discord: https://discord.gg/8UEK9TrQDs
- ✅ [ArcRaiders.app](https://arcraiders.app/) - Community companion tool
- [r/ArcRaiders](https://www.reddit.com/r/ArcRaiders/) - Reddit community

**Press & Guides:**
- MetaForge Guides (Nov 2025 updates, patch notes, walkthroughs)
- See MetaForge for active content library

---

*This document is a living reference and should be updated regularly as new information about Arc Raiders becomes available.*
