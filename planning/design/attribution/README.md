# MetaForge Attribution Design Specifications

**Last Updated**: 2025-11-24
**Project**: Arc Raiders Companion App
**Legal Requirement**: MetaForge API usage attribution

---

## 📋 Overview

This directory contains comprehensive design specifications for MetaForge attribution throughout the Arc Raiders Companion mobile app. All designs meet legal requirements while maintaining excellent user experience.

---

## 📁 File Structure

```
attribution/
├── README.md                    ← This file (directory overview)
├── SETTINGS_SCREEN.md          ← Settings → Data Source section
├── ABOUT_SCREEN.md             ← About screen with full attribution
├── ITEM_DETAIL_FOOTER.md       ← Persistent footer on detail screens
├── APP_STORE_DESCRIPTION.md    ← App Store listing text
├── COMPONENTS.md               ← Reusable UI components
├── INTERACTIONS.md             ← User interaction flows
└── GUIDELINES.md               ← Design system standards
```

---

## 🎯 Legal Requirements

### MetaForge API Terms (from METAFORGE_DATA_SOURCE.md)

✅ **Required Attribution**:
- Must include attribution and link to https://metaforge.app/arc-raiders
- Users need to know where data comes from
- Attribution must be visible (not hidden)

✅ **How We Comply**:
1. **Settings Screen**: Dedicated "DATA SOURCE" section with link
2. **About Screen**: Full attribution with two action buttons
3. **Item Detail Screens**: Persistent footer on every data screen
4. **App Store**: "Powered by MetaForge" in description

---

## 📱 Implementation Summary

### Three Core Screens

#### 1. Settings Screen - Data Source Section
**File**: `SETTINGS_SCREEN.md`

**Purpose**: Transparent data source disclosure in expected location (Settings)

**Key Elements**:
- Provider: MetaForge (read-only)
- Website link → Opens Safari
- Discord link → Opens Discord app
- Last Update timestamp (dynamic)

**Design Decisions**:
- Non-intrusive (in Settings, not blocking main flow)
- One-tap access to MetaForge
- Shows data freshness (trust building)

---

#### 2. About Screen - Full Attribution
**File**: `ABOUT_SCREEN.md`

**Purpose**: Comprehensive attribution and legal disclaimers

**Key Elements**:
- App icon and version
- MetaForge attribution paragraph
- Data stats (500+ items, 5 maps, etc.)
- Two action buttons (website, Discord)
- Legal disclaimers (Embark Studios, not affiliated)
- Privacy/Terms links

**Design Decisions**:
- Hero placement (upper third of screen)
- Multiple ways to reach MetaForge
- Legal protection (disclaimers)
- Exceeds minimum requirements

---

#### 3. Item Detail Screen - Attribution Footer
**File**: `ITEM_DETAIL_FOOTER.md`

**Purpose**: Persistent attribution on every data screen

**Key Elements**:
- Attribution line: "Data: MetaForge • Updated: [date]"
- Report Issue link (opens email or form)
- Sticky footer (always visible)

**Design Decisions**:
- Subtle colors (non-distracting)
- Functional (report data errors)
- Visible but not intrusive
- Trust building (shows data freshness)

---

### App Store Marketing
**File**: `APP_STORE_DESCRIPTION.md`

**Purpose**: Attribution in public marketing materials

**Key Elements**:
- "POWERED BY METAFORGE" section in description
- Link to metaforge.app/arc-raiders
- Discord invite included
- Screenshot captions with attribution
- Video includes MetaForge branding

**Design Decisions**:
- Prominent in description
- Builds trust (community-driven data)
- Helps with SEO (MetaForge keyword)

---

## 🧩 Reusable Components

**File**: `COMPONENTS.md`

### 5 Core Components

1. **ExternalLinkButton**
   - Opens MetaForge website or Discord
   - Primary/Secondary variants
   - Animated press states

2. **AttributionFooter**
   - Fixed footer for detail screens
   - Dynamic timestamp
   - Report Issue functionality

3. **DataSourceBadge**
   - Small inline badge
   - Shows "MetaForge" with icon
   - For list items and cards

4. **LastUpdatedText**
   - Dynamic relative timestamps
   - "Today", "Yesterday", "3 days ago"
   - Absolute dates after 7 days

5. **AttributionModal**
   - Full-screen modal
   - Shows on first launch
   - Explains data source

---

## 🔄 Interaction Flows

**File**: `INTERACTIONS.md`

### Key Flows Documented

1. **Settings → MetaForge Website**
   - Tap → Highlight → Opens Safari
   - Long press → Copy link

2. **About → Join Discord**
   - Tap → Opens Discord app (if installed)
   - Fallback → Opens Safari

3. **Item Footer → Report Issue**
   - Tap → Opens email with pre-fill
   - Alternative → In-app form

4. **First Launch → Attribution Modal**
   - Shows once (first launch only)
   - Explains data source
   - Can be revisited in Settings

---

## 🎨 Design System

**File**: `GUIDELINES.md`

### Design Standards

#### Typography
- Footer text: 13pt SF Pro Text Regular, #8E8E93
- Button labels: 17pt SF Pro Text Semibold, #FFFFFF
- Section headers: 13pt SF Pro Text Semibold, UPPERCASE

#### Colors
- Attribution text: #8E8E93 (subtle, secondary)
- Links: #007AFF (iOS standard blue)
- Discord: #5865F2 (Discord brand blue)
- Footer background: #1C1C1E (iOS card)

#### Spacing
- Footer padding: 12pt vertical, 16pt horizontal
- Button height: 50pt
- Section margins: 32pt top, 8pt bottom
- Touch targets: 44×44pt minimum (WCAG)

#### Animation
- Button press: Scale to 98%, 100ms
- Modal slide-up: 300ms spring animation
- Color change: 200ms ease-in-out

---

## ✅ Legal Compliance Checklist

### MetaForge Requirements
- [x] Attribution visible (Settings, About, Footer)
- [x] Link to metaforge.app/arc-raiders (multiple locations)
- [x] Users informed about data source (modal on first launch)
- [x] Discord community linked (Settings, About, App Store)
- [x] Non-commercial use (free app, no monetization yet)

### Embark Studios Requirements
- [x] Disclaimer present ("not affiliated with Embark Studios")
- [x] No misleading claims of official status
- [x] Game content ownership acknowledged
- [x] "Unofficial companion tool" clearly stated

### App Store Requirements
- [x] Accurate description (no false claims)
- [x] Proper attribution in listing
- [x] Privacy Policy linked (About screen)
- [x] Terms of Service linked (About screen)
- [x] Screenshot captions include attribution

---

## 🚀 Implementation Roadmap

### Phase 1: Core Components (Week 1)
- [ ] Build ExternalLinkButton component
- [ ] Build AttributionFooter component
- [ ] Build LastUpdatedText component
- [ ] Set up AsyncStorage for timestamps
- [ ] Write unit tests

### Phase 2: Screen Integration (Week 2)
- [ ] Add Data Source section to Settings
- [ ] Build About screen with attribution
- [ ] Add footer to Item Detail screen
- [ ] Add footer to ARC Detail screen
- [ ] Add footer to Quest Detail screen

### Phase 3: First Launch Experience (Week 3)
- [ ] Build AttributionModal component
- [ ] Implement first-launch detection
- [ ] Add "Learn More" link to Settings
- [ ] Test modal on fresh install
- [ ] Test modal dismissal persistence

### Phase 4: Polish & Testing (Week 4)
- [ ] Accessibility testing (VoiceOver, Dynamic Type)
- [ ] Visual regression testing (screenshots)
- [ ] Device testing (iPhone SE, iPad, Android)
- [ ] Edge case testing (no internet, Discord not installed)
- [ ] Performance testing (animations at 60fps)

### Phase 5: App Store Prep (Week 5)
- [ ] Write App Store description (with attribution)
- [ ] Create screenshot captions (with attribution)
- [ ] Record app preview video (with attribution)
- [ ] Submit for App Store review
- [ ] Monitor review feedback

---

## 📊 Success Metrics

### Legal Compliance
- ✅ 100% attribution visibility (all required screens)
- ✅ 100% link functionality (opens correctly)
- ✅ 0 legal issues or takedown requests

### User Engagement
- 📈 Track % of users who click MetaForge links
- 📈 Track "Report Issue" submissions
- 📈 Track attribution modal dismissals
- 📈 Track time to first MetaForge click

### Quality Metrics
- ✅ 100% accessibility compliance (WCAG AA)
- ✅ 60fps animations on all devices
- ✅ < 2s screen load times
- ✅ 0 crashes related to attribution components

---

## 🛠️ Developer Notes

### Testing Attribution Components

```bash
# Run unit tests
npm test -- --testPathPattern=attribution

# Run accessibility tests
npm run test:a11y

# Run visual regression tests
npm run test:visual

# Test on device
npm run ios    # iPhone simulator
npm run android  # Android emulator
```

### Updating Attribution Text

If MetaForge requirements change:

1. Update `METAFORGE_DATA_SOURCE.md` (source of truth)
2. Update affected design docs (SETTINGS_SCREEN.md, ABOUT_SCREEN.md, etc.)
3. Update components (AttributionFooter.js, etc.)
4. Update App Store description (APP_STORE_DESCRIPTION.md)
5. Notify team of changes
6. Submit app update to App Store

### Adding New Data Screens

If you add a new screen that displays MetaForge data:

1. Include `AttributionFooter` component at bottom
2. Pass correct `entityType` and `entityName` props
3. Test VoiceOver reads footer correctly
4. Test "Report Issue" functionality
5. Update this README with new screen

---

## 📧 Contact

### Internal Team
- Design Lead: [Name]
- iOS Developer: [Name]
- Android Developer: [Name]
- Legal Advisor: [Name]

### External Partners
- MetaForge Team: Discord (discord.gg/8UEK9TrQDs)
- Support Email: support@arcraiders.app
- GitHub Issues: github.com/your-repo/issues

---

## 📝 Change Log

### 2025-11-24 - Initial Design Specs
- Created 8 comprehensive design documents
- Defined 5 reusable components
- Mapped all interaction flows
- Established design system standards
- Ready for implementation

---

## 🔗 Related Documents

- **Data Source Decision**: `/planning/METAFORGE_DATA_SOURCE.md`
- **Project CLAUDE.md**: `/CLAUDE.md` (project overview)
- **Tech Stack Decision**: `/planning/TECH_STACK_DECISION.md`
- **FYI.md**: `FYI.md` (decision journal)

---

*These design specifications ensure legally compliant, user-friendly MetaForge attribution throughout the Arc Raiders Companion app. Built with ❤️ for the community.*
