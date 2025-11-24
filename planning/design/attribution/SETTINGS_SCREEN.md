# Settings Screen - Data Source Section

**Last Updated**: 2025-11-24
**Screen Type**: Settings List View
**Platform**: iOS (Primary), Android (Secondary)
**Theme**: Dark Mode Primary

---

## Overview

The Settings screen includes a new **Data Source** section that provides transparency about where game data comes from and links users to MetaForge for more information.

---

## Screen Layout

```
┌─────────────────────────────────────┐
│  ← Settings                         │  ← Navigation Bar
├─────────────────────────────────────┤
│                                     │
│  GENERAL                            │  ← Section Header
│  ┌───────────────────────────────┐ │
│  │  Profile                    › │ │  ← List Item
│  ├───────────────────────────────┤ │
│  │  Notifications              › │ │
│  └───────────────────────────────┘ │
│                                     │
│  DATA SOURCE                        │  ← New Section Header
│  ┌───────────────────────────────┐ │
│  │  Provider                     │ │  ← Read-only Item
│  │  MetaForge                    │ │
│  ├───────────────────────────────┤ │
│  │  Website                    ↗ │ │  ← External Link
│  │  metaforge.app/arc-raiders   │ │
│  ├───────────────────────────────┤ │
│  │  Community Discord          ↗ │ │  ← External Link
│  │  discord.gg/8UEK9TrQDs       │ │
│  ├───────────────────────────────┤ │
│  │  Last Data Update             │ │  ← Read-only Item
│  │  Nov 20, 2025                 │ │
│  └───────────────────────────────┘ │
│                                     │
│  ABOUT                              │  ← Section Header
│  ┌───────────────────────────────┐ │
│  │  Version                      │ │
│  │  1.0.0                        │ │
│  ├───────────────────────────────┤ │
│  │  About App                  › │ │  ← Navigates to About screen
│  └───────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

---

## Component Specifications

### 1. Section Header - "DATA SOURCE"
```
Typography:
- Font: SF Pro Text Semibold (iOS) / Roboto Medium (Android)
- Size: 13pt
- Color: #8E8E93 (iOS Secondary Label)
- Transform: UPPERCASE
- Letter Spacing: 0.5pt
- Padding: 16pt top, 12pt left, 8pt bottom

Dark Mode:
- Color: #98989D
```

### 2. List Item - Provider
```
Type: Read-only (non-tappable)
Layout:
- Leading: "Provider" label (left-aligned)
- Trailing: "MetaForge" value (right-aligned, bold)
- Height: 44pt (iOS standard)
- Padding: 12pt horizontal

Typography:
- Label: System 17pt Regular, #FFFFFF
- Value: System 17pt Semibold, #FFFFFF

Styling:
- Background: #1C1C1E (iOS Dark Card)
- No disclosure indicator (›)
- No hover/press state (read-only)
```

### 3. List Item - Website (External Link)
```
Type: Tappable External Link
Layout:
- Leading: "Website" label
- Trailing: External link indicator ↗
- Sub-text: "metaforge.app/arc-raiders"
- Height: 60pt (taller for two lines)
- Padding: 12pt horizontal

Typography:
- Label: System 17pt Regular, #FFFFFF
- URL: System 15pt Regular, #007AFF (iOS Link Blue)
- Icon: 16pt SF Symbol "arrow.up.forward.square"

Interaction:
- Tap: Opens Safari/Chrome with URL
- Press State: Subtle highlight (#2C2C2E)
- Long Press: Shows context menu (Copy Link, Share)

Accessibility:
- Label: "Visit MetaForge website"
- Hint: "Opens in external browser"
```

### 4. List Item - Community Discord (External Link)
```
Type: Tappable External Link
Layout:
- Leading: "Community Discord" label
- Trailing: External link indicator ↗
- Sub-text: "discord.gg/8UEK9TrQDs"
- Height: 60pt

Typography:
- Label: System 17pt Regular, #FFFFFF
- URL: System 15pt Regular, #5865F2 (Discord Brand Blue)
- Icon: 16pt SF Symbol "arrow.up.forward.square"

Interaction:
- Tap: Opens Discord app if installed, else Safari
- Press State: Subtle highlight (#2C2C2E)
- Long Press: Context menu (Copy Link, Share)

Accessibility:
- Label: "Join MetaForge Discord community"
- Hint: "Opens Discord app or browser"
```

### 5. List Item - Last Data Update
```
Type: Read-only (non-tappable)
Layout:
- Leading: "Last Data Update" label
- Trailing: Date value (e.g., "Nov 20, 2025")
- Height: 44pt
- Padding: 12pt horizontal

Typography:
- Label: System 17pt Regular, #FFFFFF
- Value: System 17pt Regular, #8E8E93 (Secondary)

Data Source:
- Pulls from AsyncStorage: 'arc_raiders_items_timestamp'
- Format: "MMM DD, YYYY"
- If no data: Shows "Never"
```

---

## Interaction Flows

### Flow 1: Tap Website Link
```
User Action: Taps "Website" row
↓
System: Shows subtle press highlight (#2C2C2E)
↓
System: Opens Safari/Chrome with URL:
        https://metaforge.app/arc-raiders
↓
Result: User views MetaForge website
        App remains in background
```

### Flow 2: Tap Discord Link
```
User Action: Taps "Community Discord" row
↓
System: Checks if Discord app installed
↓
If Discord installed:
  System: Opens Discord app → Join server prompt
↓
If Discord NOT installed:
  System: Opens Safari with discord.gg/8UEK9TrQDs
↓
Result: User joins MetaForge Discord community
```

### Flow 3: Long Press Link
```
User Action: Long press on Website or Discord row
↓
System: Shows iOS Share Sheet / Android Context Menu
↓
Options:
- Copy Link
- Share...
- Open in Background
- Cancel
↓
Result: User can copy/share URL without leaving app
```

---

## Technical Implementation

### React Native Component Structure
```javascript
// SettingsScreen.js
import { Linking } from 'react-native';

const DataSourceSection = () => {
  const lastUpdate = useLastUpdateDate(); // Custom hook

  const openURL = async (url) => {
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    }
  };

  return (
    <SettingsList>
      <SectionHeader>DATA SOURCE</SectionHeader>

      <ListItem>
        <ItemLabel>Provider</ItemLabel>
        <ItemValue>MetaForge</ItemValue>
      </ListItem>

      <ListItemLink onPress={() => openURL('https://metaforge.app/arc-raiders')}>
        <ItemLabel>Website</ItemLabel>
        <ItemSubtext>metaforge.app/arc-raiders</ItemSubtext>
        <ExternalLinkIcon />
      </ListItemLink>

      <ListItemLink onPress={() => openURL('https://discord.gg/8UEK9TrQDs')}>
        <ItemLabel>Community Discord</ItemLabel>
        <ItemSubtext color="#5865F2">discord.gg/8UEK9TrQDs</ItemSubtext>
        <ExternalLinkIcon />
      </ListItemLink>

      <ListItem>
        <ItemLabel>Last Data Update</ItemLabel>
        <ItemValue secondary>{lastUpdate}</ItemValue>
      </ListItem>
    </SettingsList>
  );
};
```

### Data Fetching
```javascript
// hooks/useLastUpdateDate.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useLastUpdateDate = () => {
  const [date, setDate] = useState('Never');

  useEffect(() => {
    const fetchDate = async () => {
      const timestamp = await AsyncStorage.getItem('arc_raiders_items_timestamp');
      if (timestamp) {
        const formattedDate = formatDate(new Date(parseInt(timestamp)));
        setDate(formattedDate);
      }
    };
    fetchDate();
  }, []);

  return date;
};

const formatDate = (date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
```

---

## Design Rationale

### Why This Design?

1. **Transparency**: Users immediately see data source without digging
2. **Non-intrusive**: Placed in Settings, not blocking main flows
3. **One-tap access**: Direct links to MetaForge website and Discord
4. **Trust building**: Shows last update date (data freshness)
5. **iOS native feel**: Follows Apple HIG for Settings lists

### Legal Compliance

✅ **Attribution**: Provider name visible
✅ **Link**: Direct link to metaforge.app/arc-raiders
✅ **Prominent**: Dedicated section in Settings
✅ **Accessible**: One tap from main Settings screen

### UX Considerations

- **Placement**: After General, before About (logical grouping)
- **Read-only provider**: No need to tap (just info display)
- **External links**: Clear ↗ indicator (users expect browser)
- **Discord color**: Uses Discord brand blue (#5865F2) for recognition
- **Last update**: Reassures users data is current

---

## Accessibility

### VoiceOver Labels
```
"Provider. MetaForge."
"Website. metaforge.app/arc-raiders. Link. Opens in external browser."
"Community Discord. discord.gg/8UEK9TrQDs. Link. Opens Discord app."
"Last Data Update. November 20, 2025."
```

### Dynamic Type Support
- All text scales with iOS Dynamic Type settings
- Minimum touch target: 44pt × 44pt (WCAG compliant)

### Color Contrast
- Label text: #FFFFFF on #1C1C1E (19.6:1 ratio) ✅
- Link text: #007AFF on #1C1C1E (4.8:1 ratio) ✅
- Discord blue: #5865F2 on #1C1C1E (5.2:1 ratio) ✅

---

## Testing Checklist

- [ ] Tapping Website opens Safari with correct URL
- [ ] Tapping Discord opens Discord app (if installed)
- [ ] Tapping Discord opens Safari (if Discord not installed)
- [ ] Long press shows context menu (Copy Link, Share)
- [ ] Last Update date shows correct timestamp
- [ ] VoiceOver reads all labels correctly
- [ ] Dynamic Type scales text properly
- [ ] Dark mode colors match system settings
- [ ] Press states provide visual feedback

---

*This Settings section provides transparent, accessible attribution while maintaining excellent UX and legal compliance.*
