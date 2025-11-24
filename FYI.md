# Arc Raiders Companion App Development Log

## Overview
This project aims to create a companion application for the game *Arc Raiders*. The app will provide users with resources, tracking, and guides. The project structure is organized to include the application source code, planning documents, and documentation.

## Architectural Decisions
- **Project Structure**:
  - `/app`: Contains the source code for the application (Tech stack TBD).
  - `/planning`: Stores project management documents, roadmaps, and design specs.
  - `/docs`: Contains user and developer documentation.
  - Root level includes `README.md` and `FYI.md` for high-level info.

## Technical Decisions
- **Version Control**: GitHub repository `Arc-Raiders-Companion`.
- **Development Framework**: (To be determined - likely React Native/Expo for cross-platform compatibility on WSL/Windows/iOS).

## Error Log
- (No errors yet)

## Development Log
- **2025-11-24 (Agent 1)**: Initialized Git repository, created project structure (app, docs, planning), and pushed to GitHub (https://github.com/RichelynScott/Arc-Raiders-Companion).
- **2025-11-24 (Agent 2)**: Set up Claude Code infrastructure, created planning documents, tech stack analysis, and PRD template.

---

## 2025-11-24 - Claude Code Infrastructure Setup

### What
Established comprehensive Claude Code project infrastructure including MCP servers, security settings, and project configuration.

### Why
Proper project setup enables efficient development with AI assistance, security guardrails, and standardized documentation practices.

### How
- Created `.claude/settings.json` with security permissions (deny .env access)
- Configured `.mcp.json` with essential MCP servers:
  - **fetch**: Web content retrieval for research
  - **time**: Timezone utilities
  - **deepwiki**: GitHub repository analysis (for Arc Raiders research)
  - **ide**: VS Code integration
- Set up hooks for session management and tool usage logging

### Impact
- Security: Prevented accidental exposure of environment variables
- Productivity: MCP servers enable web research and repository analysis
- Documentation: Hooks ensure proper logging of development activities

### Related
- File: `.claude/settings.json`
- File: `.mcp.json`

---

## 2025-11-24 - Technology Stack Analysis & Decision Framework

### What
Created comprehensive tech stack evaluation document comparing Native iOS (Swift/SwiftUI) vs React Native + Expo for the companion app.

### Why
User specified iPhone/Apple app but development environment is WSL2 (Linux), which cannot run Xcode. Need to evaluate viable approaches and recommend best path forward.

### How
Created `planning/TECH_STACK_DECISION.md` analyzing three options:

**Option 1: Native iOS (Swift + SwiftUI)**
- Pros: Best performance, native APIs, optimal iOS feel
- Cons: Requires macOS/Xcode (not available on WSL2), iOS-only

**Option 2: React Native + Expo (RECOMMENDED)**
- Pros: WSL2 compatible, cross-platform, EAS Build (no Mac needed), modern tooling
- Cons: Slightly larger bundle size, bridge overhead

**Option 3: Flutter**
- Pros: Cross-platform, good performance
- Cons: Dart language less common, smaller ecosystem

### Impact
- **Recommendation**: React Native + Expo for WSL2 compatibility and cross-platform potential
- **Decision Pending**: Awaiting user confirmation on tech stack choice
- **Flexibility**: Document provides clear path for either option
- **Cost Savings**: Expo EAS Build eliminates need for Mac hardware/VMs during development

### Related
- File: `planning/TECH_STACK_DECISION.md`
- File: `CLAUDE.md` (updated to be tech-stack agnostic)

---

## 2025-11-24 - Product Requirements Document (PRD) Creation

### What
Created comprehensive PRD template defining all features, user stories, acceptance criteria, and project scope for Arc Raiders companion app.

### Why
Structured PRD ensures all stakeholders understand product vision, prevents scope creep, and provides clear acceptance criteria for each feature.

### How
Created `planning/PRD_TEMPLATE.md` with 10 phased features:

**MVP (Phase 1):**
- F1: Game Data Browser (weapons, equipment stats)
- F2: Interactive Maps (zoomable, resource locations)
- F3: Loadout Builder (create/save builds with stat calculations)
- F4: Strategy Guides (beginner to advanced)

**Enhanced (Phase 2):**
- F5: Player Stats Tracker (manual match logging)
- F6: Community Tips & Tricks (user-submitted content)
- F7: Push Notifications (game updates, events)

**Advanced (Phase 3):**
- F8: Build Optimizer (AI-powered recommendations)
- F9: Social Features (friends, sharing)
- F10: Offline Mode (full functionality without internet)

### Impact
- Clear MVP scope prevents over-engineering
- User stories guide implementation decisions
- Acceptance criteria enable objective feature completion validation
- Out-of-scope section prevents feature creep
- Timeline provides realistic milestones (12-week MVP target)

### Related
- File: `planning/PRD_TEMPLATE.md`
- Depends on: Tech stack decision
- Next Steps: Validate PRD with user, refine based on feedback

---

## 2025-11-24 - Arc Raiders Game Research Framework

### What
Established comprehensive research document to guide data collection and feature prioritization for Arc Raiders game information.

### Why
Companion app success depends on accurate, comprehensive game data. Need structured approach to identify data sources, collect information, and maintain data accuracy over time.

### How
Created `planning/research/ARC_RAIDERS_GAME_RESEARCH.md` covering:

**Data Sources to Research:**
- Official: Website, Steam page, social media, developer blogs
- Community: Reddit, Discord, wikis, YouTube creators, Twitch streamers
- Technical: APIs (if available), data mining tools, community aggregators

**Game Systems to Document:**
- Characters/Classes and abilities
- Weapons & Equipment with stats
- Enemies (ARCs) types and behaviors
- Maps & Locations with points of interest
- Progression Systems
- Economy and crafting

**Research Phases:**
1. **Phase 1 (Weeks 1-2)**: Manual research, official sources
2. **Phase 2 (Weeks 3-4)**: Community collaboration, content creator partnerships
3. **Phase 3 (Weeks 5+)**: Data mining (if needed and ethical)
4. **Phase 4 (Ongoing)**: Monitor updates, maintain accuracy

### Impact
- Structured research process prevents random data collection
- Ethical considerations documented upfront
- Community partnership strategy for data validation
- Update strategy ensures long-term data accuracy
- Competitive analysis identifies successful patterns from similar games (Destiny, Tarkov)

### Related
- File: `planning/research/ARC_RAIDERS_GAME_RESEARCH.md`
- Action Items: Week 1 research tasks defined
- Next Steps: Begin official source research, join community channels

---

## 2025-11-24 - CLAUDE.md Project Configuration

### What
Created and updated project-specific CLAUDE.md file to guide AI-assisted development, replacing initial iOS-only assumptions with tech-stack agnostic approach.

### Why
CLAUDE.md ensures consistent development practices, documents project-specific commands and workflows, and provides context for AI assistants working on the project.

### How
**Initial Version:**
- Assumed native iOS with Swift/SwiftUI
- Xcode-specific commands and workflows

**Updated Version:**
- Tech-stack agnostic (supports both React Native and iOS paths)
- Cross-references `TECH_STACK_DECISION.md` for detailed analysis
- Flexible commands section for either tech choice
- WSL2 environment considerations documented
- Security best practices for both React Native and iOS
- Updated resource links (React Native, Expo, Apple docs)

**Key Sections:**
- Commands (dev, test, lint - tech specific)
- Architecture overview (directory structure)
- Technical considerations (data storage, API integration)
- Development workflow (4 phases from planning to launch)
- Testing strategy (70-80% coverage goals)
- Git workflow (conventional commits, hourly pushes)
- Security (environment variables, encrypted storage)

### Impact
- AI assistants have clear context for project
- Both tech stack options documented equally
- Security practices enforced through documentation
- Development phases provide clear roadmap
- Testing expectations set (70%+ core, 80%+ critical)

### Related
- File: `CLAUDE.md`
- References: `planning/TECH_STACK_DECISION.md`, `planning/PRD_TEMPLATE.md`

---

---

## 2025-11-24 - CRITICAL DISCOVERY: Major Competitive Landscape Identified

### What
Discovered two comprehensive, actively maintained Arc Raiders companion tools: MetaForge and ArcRaiders.app. Both are web-based desktop tools with 70-80% feature overlap with our original MVP plan.

### Why
User provided critical resources (https://metaforge.app/arc-raiders and Reddit post about arcraidersapp.com) that fundamentally changed project strategy. Without this discovery, we would have built a redundant tool competing directly with established, well-maintained platforms.

### How
**MetaForge Analysis:**
- Professional, comprehensive web tool
- Features: Item database, interactive maps (5 maps!), skill tree builder, loadout builder, quest database, ARC enemy info, guides, news
- Actively maintained (last update: Nov 20, 2025 - 3 days ago!)
- Well-established brand with strong community presence

**ArcRaiders.app Analysis:**
- Community-driven companion tool
- Features: Loadout planner with augments, interactive maps, skill builder, item tracker with have/need tracking
- Recently launched (~1 month ago)
- User contribution features, shareable builds

**Gap Analysis:**
- ✅ Both tools cover our original MVP features (F1-F4)
- ❌ Neither has native mobile app
- ❌ Neither optimized for mobile/in-game use
- ❌ Neither has personal stats tracking
- ❌ Neither has push notifications
- ❌ Neither has offline-first design

### Impact
**STRATEGIC PIVOT REQUIRED**

**Original Strategy**: Build comprehensive companion with item database, maps, loadout builder, guides
**Problem**: 70-80% overlap with existing, mature tools
**New Strategy**: Build the ONLY native mobile companion app

**Key Decisions:**
1. **Mobile-First Approach**: Focus exclusively on native iOS app (no web version initially)
2. **Differentiation**: Speed (< 2s item lookup), offline-first, in-game quick reference
3. **Target User**: Console/PC players who need phone-based quick reference while gaming
4. **Unique Features**: Personal stats tracking, push notifications, voice search, iOS widgets
5. **Data Partnership**: Seek collaboration with MetaForge/ArcRaiders.app for data (with attribution)

**Competitive Advantages:**
- 10x faster access speed (app vs browser)
- Seamless in-game use (phone glance vs alt-tab)
- Full offline mode (vs internet-required web tools)
- One-handed mobile UX (vs desktop-optimized layouts)
- Personal data layer (stats, progress, goals)

**Revised Value Proposition**:
"Arc Raiders Companion - The ONLY mobile app designed for in-game quick reference while playing on console or PC. Fast. Offline. Always in your pocket."

### Related
- File: `planning/COMPETITIVE_ANALYSIS.md` (comprehensive 70+ line analysis)
- File: `planning/MOBILE_FIRST_STRATEGY.md` (revised product strategy)
- File: `planning/PRD_TEMPLATE.md` (needs revision to reflect mobile-first approach)
- Reddit: https://www.reddit.com/r/ArcRaiders/comments/1l4tdsf/we_just_launched_arcraidersapp_a_companion_tool/
- Competitors: https://metaforge.app/arc-raiders, https://arcraiders.app/

### Next Steps (URGENT)
1. **Validate Mobile Demand**: Post in r/ArcRaiders to gauge interest in mobile companion app
2. **Contact Competitors**: Reach out to MetaForge/ArcRaiders.app for data partnership
3. **Revise PRD**: Update PRD_TEMPLATE.md with mobile-first feature set
4. **Tech Stack Confirmation**: React Native + Expo confirmed (enables 4-6 week MVP)
5. **Rapid Prototyping**: Design mobile mockups focused on speed and in-game use
6. **4-6 Week Sprint**: Launch before competitors build mobile apps

---

## Future Improvements
- **Community Validation**: Post in r/ArcRaiders to validate mobile app demand (URGENT - Week 1)
- **Partnership Outreach**: Contact MetaForge/ArcRaiders.app teams for collaboration (Week 1)
- **App Initialization**: Initialize React Native + Expo project (Week 1)
- **PRD Revision**: Update PRD with mobile-first, differentiated feature set (Week 1)
- **Design Mockups**: Create mobile-optimized UI designs focusing on speed (Week 1-2)
- **Data Strategy**: Establish MetaForge data partnership or scraping approach (Week 2)
- **MVP Development**: 4-6 week sprint to launch before competition (Weeks 2-6)
- **CI/CD**: Implement GitHub Actions and EAS Build automation (Week 3)
- **Beta Testing**: TestFlight with small Arc Raiders community group (Week 5)

