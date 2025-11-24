# About Screen - Full Attribution & Legal

**Last Updated**: 2025-11-24
**Screen Type**: Scrollable Content View
**Platform**: iOS (Primary), Android (Secondary)
**Theme**: Dark Mode Primary

---

## Overview

The About screen provides comprehensive app information, including full MetaForge attribution, legal disclaimers, and links to privacy/terms. This is the "source of truth" for all legal and attribution requirements.

---

## Screen Layout

```
┌─────────────────────────────────────┐
│  ← About                            │  ← Navigation Bar
├─────────────────────────────────────┤
│                                     │  ← Scrollable Content
│         [App Icon]                  │  ← 120×120pt rounded icon
│                                     │
│    Arc Raiders Companion            │  ← App name (24pt Bold)
│         Version 1.0.0               │  ← Version (15pt Secondary)
│                                     │
├─────────────────────────────────────┤
│                                     │
│  DATA SOURCE                        │  ← Section (13pt Semibold)
│                                     │
│  Game data provided by MetaForge,   │  ← Body text (17pt Regular)
│  a community-driven Arc Raiders     │
│  database maintained by dedicated   │
│  fans.                              │
│                                     │
│  📦 500+ Items • 15+ ARCs           │  ← Data stats (15pt Medium)
│  🗺️ 5 Maps • 50+ Quests            │
│  🔄 Updated Weekly                  │
│                                     │
│  [ Visit MetaForge Website ↗ ]     │  ← Primary button
│  [ Join Discord Community ↗ ]      │  ← Secondary button
│                                     │
├─────────────────────────────────────┤
│                                     │
│  DISCLAIMER                         │  ← Section header
│                                     │
│  Arc Raiders is developed by        │  ← Legal disclaimer
│  Embark Studios. This app is an     │
│  unofficial companion tool and is   │
│  not affiliated with, endorsed by,  │
│  or sponsored by Embark Studios.    │
│                                     │
│  All game content, including names, │
│  images, and data, is the property  │
│  of their respective owners.        │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  LEGAL                              │  ← Section header
│                                     │
│  [ Privacy Policy              › ]  │  ← Navigation links
│  [ Terms of Service            › ]  │
│  [ Open Source Licenses        › ]  │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  CONTACT                            │  ← Section header
│                                     │
│  Found a bug or have feedback?      │
│  [ Email Us ↗ ]                     │  ← External link
│  [ Report on GitHub ↗ ]             │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  © 2025 Arc Raiders Companion       │  ← Footer (13pt Secondary)
│  Made with ❤️ for the community     │
│                                     │
└─────────────────────────────────────┘
```

---

## Component Specifications

### 1. App Icon & Title Section
```
Layout:
- Icon: 120×120pt, rounded corners (26.67% radius)
- App Name: Centered below icon, 24pt SF Pro Display Bold
- Version: Centered below name, 15pt SF Pro Text Regular
- Spacing: 12pt between elements
- Top padding: 40pt from navigation bar

Colors:
- App Name: #FFFFFF
- Version: #8E8E93 (Secondary Label)

Alignment: Center-aligned
```

### 2. DATA SOURCE Section
```
Section Header:
- Typography: 13pt SF Pro Text Semibold, UPPERCASE
- Color: #98989D (Dark Mode Secondary)
- Padding: 32pt top, 16pt left, 8pt bottom

Body Text:
- Typography: 17pt SF Pro Text Regular
- Color: #FFFFFF
- Line Height: 1.5 (25.5pt)
- Max Width: 90% of screen width
- Text Alignment: Left
- Padding: 16pt horizontal

Content:
"Game data provided by MetaForge, a community-driven
Arc Raiders database maintained by dedicated fans."

Data Stats (Icon + Text):
- Typography: 15pt SF Pro Text Medium
- Color: #FFFFFF
- Icons: 20pt SF Symbols (shippingbox, map, arrow.clockwise)
- Spacing: 8pt between icon and text, 4pt between lines
- Layout: Vertical stack, left-aligned

Stats Content:
📦 500+ Items • 15+ ARCs
🗺️ 5 Maps • 50+ Quests
🔄 Updated Weekly
```

### 3. MetaForge Action Buttons
```
Primary Button - "Visit MetaForge Website ↗"
- Style: Filled button (blue background)
- Background: #007AFF (iOS Link Blue)
- Text: 17pt SF Pro Text Semibold, #FFFFFF
- Icon: 16pt SF Symbol "arrow.up.forward.square"
- Height: 50pt
- Border Radius: 12pt
- Width: 90% of screen width
- Tap: Opens https://metaforge.app/arc-raiders

Press State:
- Background: #0051D5 (darker blue)
- Scale: 0.98 (subtle shrink)

Secondary Button - "Join Discord Community ↗"
- Style: Outlined button (transparent background)
- Border: 2pt solid #5865F2 (Discord Blue)
- Text: 17pt SF Pro Text Semibold, #5865F2
- Icon: 16pt SF Symbol "arrow.up.forward.square"
- Height: 50pt
- Border Radius: 12pt
- Width: 90% of screen width
- Tap: Opens https://discord.gg/8UEK9TrQDs

Press State:
- Background: rgba(88, 101, 242, 0.1) (10% Discord blue)
- Scale: 0.98

Spacing:
- 12pt between buttons
- 32pt top margin from stats
```

### 4. DISCLAIMER Section
```
Section Header:
- Typography: 13pt SF Pro Text Semibold, UPPERCASE
- Color: #98989D
- Padding: 32pt top, 16pt left, 8pt bottom

Body Text:
- Typography: 15pt SF Pro Text Regular
- Color: #8E8E93 (Secondary Label - softer than main content)
- Line Height: 1.4 (21pt)
- Max Width: 90% of screen width
- Text Alignment: Left
- Padding: 16pt horizontal

Content:
"Arc Raiders is developed by Embark Studios. This app
is an unofficial companion tool and is not affiliated
with, endorsed by, or sponsored by Embark Studios.

All game content, including names, images, and data,
is the property of their respective owners."
```

### 5. LEGAL Section
```
Section Header:
- Typography: 13pt SF Pro Text Semibold, UPPERCASE
- Color: #98989D
- Padding: 32pt top, 16pt left, 8pt bottom

List Items (3):
- Layout: List item with disclosure indicator (›)
- Typography: 17pt SF Pro Text Regular, #FFFFFF
- Height: 44pt
- Background: #1C1C1E (iOS Dark Card)
- Border Radius: 12pt
- Press State: #2C2C2E

Items:
1. Privacy Policy → Navigates to /privacy screen
2. Terms of Service → Navigates to /terms screen
3. Open Source Licenses → Navigates to /licenses screen
```

### 6. CONTACT Section
```
Section Header:
- Typography: 13pt SF Pro Text Semibold, UPPERCASE
- Color: #98989D
- Padding: 32pt top, 16pt left, 8pt bottom

Intro Text:
- Typography: 15pt SF Pro Text Regular
- Color: #FFFFFF
- Padding: 8pt bottom

Buttons (2):
- Style: Text buttons (no background)
- Typography: 17pt SF Pro Text Semibold, #007AFF
- Icon: 16pt SF Symbol "arrow.up.forward.square"
- Height: 44pt
- Press State: Subtle highlight

Links:
1. Email Us → Opens mailto:support@arcraiders.app
2. Report on GitHub → Opens GitHub Issues page
```

### 7. Footer
```
Typography:
- Line 1: 13pt SF Pro Text Regular, #8E8E93
- Line 2: 13pt SF Pro Text Regular, #8E8E93
- Alignment: Center

Content:
© 2025 Arc Raiders Companion
Made with ❤️ for the community

Padding:
- 32pt top
- 40pt bottom (safe area inset)
```

---

## Interaction Flows

### Flow 1: Visit MetaForge Website
```
User Action: Taps "Visit MetaForge Website" button
↓
System: Button shrinks to 98% scale
        Background darkens to #0051D5
↓
System: Opens Safari with URL:
        https://metaforge.app/arc-raiders
↓
Result: User views full MetaForge website
        Can explore all game data
```

### Flow 2: Join Discord Community
```
User Action: Taps "Join Discord Community" button
↓
System: Button shrinks, shows 10% blue overlay
↓
System: Checks if Discord app installed
↓
If Discord installed:
  Opens Discord → Server join prompt
Else:
  Opens Safari → discord.gg/8UEK9TrQDs
↓
Result: User joins MetaForge Discord
```

### Flow 3: View Privacy Policy
```
User Action: Taps "Privacy Policy" row
↓
System: Navigates to /privacy screen
↓
Screen Shows: Full privacy policy text
              (Separate screen with WebView or native text)
↓
Result: User can read privacy policy
        Back button returns to About screen
```

### Flow 4: Email Support
```
User Action: Taps "Email Us" link
↓
System: Opens native Mail app (iOS) or Gmail (Android)
↓
Pre-filled Email:
  To: support@arcraiders.app
  Subject: Arc Raiders Companion - Feedback
↓
Result: User can send email directly
```

---

## Content Specifications

### Data Stats (Dynamic Content)

The stats section should update based on actual cached data:

```javascript
// DataStatsComponent.js
const DataStats = () => {
  const [stats, setStats] = useState({
    items: 0,
    arcs: 0,
    maps: 5, // Static (known)
    quests: 0
  });

  useEffect(() => {
    const loadStats = async () => {
      const items = await AsyncStorage.getItem('arc_raiders_items');
      const arcs = await AsyncStorage.getItem('arc_raiders_arcs');
      const quests = await AsyncStorage.getItem('arc_raiders_quests');

      setStats({
        items: JSON.parse(items || '[]').length,
        arcs: JSON.parse(arcs || '[]').length,
        maps: 5,
        quests: JSON.parse(quests || '[]').length
      });
    };

    loadStats();
  }, []);

  return (
    <StatsContainer>
      <StatRow>📦 {stats.items}+ Items • {stats.arcs}+ ARCs</StatRow>
      <StatRow>🗺️ {stats.maps} Maps • {stats.quests}+ Quests</StatRow>
      <StatRow>🔄 Updated Weekly</StatRow>
    </StatsContainer>
  );
};
```

### Legal Disclaimer (Required Text)

**EXACT TEXT** (Do not modify without legal review):
```
Arc Raiders is developed by Embark Studios. This app is an
unofficial companion tool and is not affiliated with, endorsed
by, or sponsored by Embark Studios.

All game content, including names, images, and data, is the
property of their respective owners.
```

---

## Design Rationale

### Why This Layout?

1. **Hero Section**: App icon + name establishes identity first
2. **Data Source Prominence**: MetaForge attribution in prime position (upper third)
3. **Action Buttons**: Immediate access to MetaForge (one tap)
4. **Legal Clarity**: Disclaimer protects app legally (Embark Studios)
5. **Progressive Disclosure**: Less critical info (Legal, Contact) below fold

### Visual Hierarchy
```
1. App Icon & Name (Most prominent)
2. MetaForge Attribution + Buttons (Prime real estate)
3. Disclaimer (Important but secondary)
4. Legal Links (Accessible but not attention-grabbing)
5. Contact (Available when needed)
6. Footer (Subtle branding)
```

### Attribution Strategy

✅ **Meets MetaForge Requirements**:
- Clear attribution: "Game data provided by MetaForge"
- Link present: Two buttons (website + Discord)
- Users informed: Stats show data scope

✅ **Exceeds Minimum Requirements**:
- Multiple ways to reach MetaForge (website, Discord)
- Visual prominence (upper third, colored buttons)
- Context provided (community-driven, dedicated fans)

---

## Accessibility

### VoiceOver Labels
```
"App icon"
"Arc Raiders Companion. Heading."
"Version 1 point 0 point 0."
"Data Source. Heading."
"Game data provided by MetaForge, a community-driven Arc Raiders database maintained by dedicated fans."
"500 plus Items. 15 plus ARCs."
"5 Maps. 50 plus Quests."
"Updated Weekly."
"Visit MetaForge Website. Button. Opens in external browser."
"Join Discord Community. Button. Opens Discord app."
```

### Dynamic Type
- All text scales with iOS accessibility settings
- Buttons maintain 50pt minimum height
- Max font scale: 250% (WCAG AAA compliance)

### Color Contrast
- Body text: #FFFFFF on #000000 (21:1 ratio) ✅
- Disclaimer: #8E8E93 on #000000 (8.9:1 ratio) ✅
- Link blue: #007AFF on #000000 (5.2:1 ratio) ✅
- Discord blue: #5865F2 on #000000 (6.1:1 ratio) ✅

---

## Technical Implementation

### React Native Component Structure
```javascript
// AboutScreen.js
import { ScrollView, Linking } from 'react-native';

const AboutScreen = () => {
  const appVersion = '1.0.0'; // From app config
  const stats = useDataStats(); // Custom hook

  const openURL = async (url) => {
    await Linking.openURL(url);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* App Icon & Title */}
      <AppIcon source={require('./assets/icon.png')} />
      <AppTitle>Arc Raiders Companion</AppTitle>
      <AppVersion>Version {appVersion}</AppVersion>

      {/* Data Source Section */}
      <SectionHeader>DATA SOURCE</SectionHeader>
      <BodyText>
        Game data provided by MetaForge, a community-driven
        Arc Raiders database maintained by dedicated fans.
      </BodyText>

      <DataStats stats={stats} />

      <PrimaryButton onPress={() => openURL('https://metaforge.app/arc-raiders')}>
        Visit MetaForge Website ↗
      </PrimaryButton>
      <SecondaryButton onPress={() => openURL('https://discord.gg/8UEK9TrQDs')}>
        Join Discord Community ↗
      </SecondaryButton>

      {/* Disclaimer Section */}
      <SectionHeader>DISCLAIMER</SectionHeader>
      <DisclaimerText>
        Arc Raiders is developed by Embark Studios. This app
        is an unofficial companion tool and is not affiliated
        with, endorsed by, or sponsored by Embark Studios.{'\n\n'}
        All game content, including names, images, and data,
        is the property of their respective owners.
      </DisclaimerText>

      {/* Legal Section */}
      <SectionHeader>LEGAL</SectionHeader>
      <ListItem onPress={() => navigation.navigate('Privacy')}>
        Privacy Policy
      </ListItem>
      <ListItem onPress={() => navigation.navigate('Terms')}>
        Terms of Service
      </ListItem>
      <ListItem onPress={() => navigation.navigate('Licenses')}>
        Open Source Licenses
      </ListItem>

      {/* Contact Section */}
      <SectionHeader>CONTACT</SectionHeader>
      <BodyText>Found a bug or have feedback?</BodyText>
      <TextButton onPress={() => openURL('mailto:support@arcraiders.app')}>
        Email Us ↗
      </TextButton>
      <TextButton onPress={() => openURL('https://github.com/your-repo/issues')}>
        Report on GitHub ↗
      </TextButton>

      {/* Footer */}
      <Footer>
        © 2025 Arc Raiders Companion{'\n'}
        Made with ❤️ for the community
      </Footer>
    </ScrollView>
  );
};
```

---

## Testing Checklist

- [ ] All text renders correctly in Dark Mode
- [ ] MetaForge website button opens Safari
- [ ] Discord button opens Discord app (if installed)
- [ ] Privacy Policy navigates to correct screen
- [ ] Terms of Service navigates to correct screen
- [ ] Email link opens Mail app with pre-filled recipient
- [ ] GitHub link opens correct Issues page
- [ ] VoiceOver reads all sections in correct order
- [ ] Dynamic Type scales text properly (up to 250%)
- [ ] Scrolling is smooth with no jank
- [ ] Button press states provide visual feedback
- [ ] Data stats show correct counts from cached data

---

*This About screen provides comprehensive attribution, legal protection, and user support while maintaining a polished, professional appearance.*
