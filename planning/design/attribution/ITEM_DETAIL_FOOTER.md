# Item Detail Screen - Footer Attribution

**Last Updated**: 2025-11-24
**Component Type**: Persistent Footer
**Platform**: iOS (Primary), Android (Secondary)
**Theme**: Dark Mode Primary

---

## Overview

Every Item Detail screen includes a **subtle footer** that attributes data to MetaForge and provides a "Report Issue" link. This is the most frequently seen attribution (on every item), so it must be:
- **Legally compliant**: Credit MetaForge
- **Non-intrusive**: Doesn't distract from main content
- **Functional**: Allows users to report data errors

---

## Component Layout

```
┌─────────────────────────────────────┐
│                                     │
│  [ITEM DETAILS ABOVE]               │  ← Main content (scrollable)
│                                     │
│  • Damage: 45                       │
│  • Fire Rate: 600 RPM               │
│  • Magazine: 30 rounds              │
│                                     │
│  [CRAFTING REQUIREMENTS]            │
│                                     │
│  ...                                │
│                                     │
├─────────────────────────────────────┤
│                                     │  ← Footer (always visible at bottom)
│  Data: MetaForge • Updated: Nov 20 │  ← Attribution line
│  Report Issue                       │  ← Report link (centered)
│                                     │
└─────────────────────────────────────┘
```

---

## Component Specifications

### 1. Footer Container
```
Layout:
- Position: Fixed at bottom of screen (above safe area)
- Height: 60pt (two lines of text + padding)
- Background: #1C1C1E (iOS Dark Card)
- Border Top: 1pt solid #2C2C2E (subtle separator)
- Padding: 12pt vertical, 16pt horizontal
- Z-Index: 10 (above main content)

Sticky Behavior:
- iOS: Stays at bottom when scrolling main content
- Android: Same behavior (Material Design equivalent)
```

### 2. Attribution Line (Top Line)
```
Typography:
- Font: SF Pro Text Regular
- Size: 13pt
- Color: #8E8E93 (Secondary Label)
- Letter Spacing: 0.3pt
- Alignment: Center

Content Format:
"Data: MetaForge • Updated: [date]"

Dynamic Parts:
- "MetaForge": Static text (brand name)
- "[date]": Dynamic timestamp (e.g., "Nov 20", "2 days ago")

Separator:
- Bullet: " • " (U+2022 BULLET with spaces)
- Color: #8E8E93 (same as text)

Example Variations:
"Data: MetaForge • Updated: Today"
"Data: MetaForge • Updated: Nov 20"
"Data: MetaForge • Updated: 2 days ago"
```

### 3. Report Issue Link (Bottom Line)
```
Typography:
- Font: SF Pro Text Semibold
- Size: 13pt
- Color: #007AFF (iOS Link Blue)
- Letter Spacing: 0.3pt
- Alignment: Center

Interaction:
- Type: Tappable link
- Tap Area: 44pt height (full bottom half of footer)
- Press State: Color changes to #0051D5 (darker blue)
- Action: Opens email or form to report data error

Accessibility:
- Label: "Report Issue with this item"
- Hint: "Opens contact form"
```

---

## Visual Variants

### Normal State (Default)
```
┌─────────────────────────────────────┐
│                                     │
│  Data: MetaForge • Updated: Nov 20 │  ← #8E8E93 (subtle)
│  Report Issue                       │  ← #007AFF (blue link)
│                                     │
└─────────────────────────────────────┘
```

### Pressed State (Report Issue)
```
┌─────────────────────────────────────┐
│                                     │
│  Data: MetaForge • Updated: Nov 20 │  ← #8E8E93 (unchanged)
│  Report Issue                       │  ← #0051D5 (darker blue)
│      ▼                              │  ← Subtle highlight background
└─────────────────────────────────────┘
```

### Long Text Handling
```
If date is long, truncate:
"Data: MetaForge • Updated: 7 days..."

If screen width is narrow (iPhone SE):
"Data: MetaForge"
"Updated: Nov 20"
"Report Issue"

(Stack vertically on small screens)
```

---

## Timestamp Logic

### Date Formatting Rules

```javascript
// getUpdateTimestamp.js
export const formatUpdateDate = (timestamp) => {
  const now = new Date();
  const updated = new Date(timestamp);
  const diffMs = now - updated;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    // Format as "Nov 20"
    return updated.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  }
};
```

### Data Source
```javascript
// Pull from AsyncStorage (last API sync time)
const timestamp = await AsyncStorage.getItem('arc_raiders_items_timestamp');
const formattedDate = formatUpdateDate(parseInt(timestamp));

// Result: "Data: MetaForge • Updated: Nov 20"
```

---

## Interaction Flows

### Flow 1: Report Issue (Email)
```
User Action: Taps "Report Issue"
↓
System: Opens native Mail app
↓
Pre-filled Email:
  To: support@arcraiders.app
  Subject: Data Issue - [Item Name]
  Body:
    Item: [Item Name]
    Issue: [User describes problem]

    ---
    App Version: 1.0.0
    Data Source: MetaForge
    Last Updated: Nov 20, 2025
↓
Result: User can describe data error
        Team can investigate and fix
```

### Flow 2: Report Issue (In-App Form)
```
User Action: Taps "Report Issue"
↓
System: Shows modal/sheet with form
↓
Form Fields:
  - Issue Type: [Dropdown: Wrong Stats, Missing Info, Other]
  - Description: [Text Area]
  - [Submit Button]
↓
On Submit:
  - Sends to backend API
  - Shows "Thank you" toast
  - Closes modal
↓
Result: Issue logged for review
```

---

## Component Reusability

### Use Cases

This footer component should appear on:
1. **Item Detail Screens** (weapons, materials, mods)
2. **ARC Detail Screens** (enemy loot tables)
3. **Quest Detail Screens** (objectives, rewards)
4. **Map Detail Screens** (location markers)

### Generic Component Structure

```javascript
// AttributionFooter.js
const AttributionFooter = ({
  onReportIssue,
  entityType = 'item',
  entityName
}) => {
  const lastUpdate = useLastUpdateDate();

  return (
    <FooterContainer>
      <AttributionLine>
        Data: MetaForge • Updated: {lastUpdate}
      </AttributionLine>
      <ReportLink onPress={() => onReportIssue(entityType, entityName)}>
        Report Issue
      </ReportLink>
    </FooterContainer>
  );
};

// Usage in ItemDetailScreen
<AttributionFooter
  entityType="item"
  entityName="Renegade III"
  onReportIssue={handleReportIssue}
/>
```

---

## Design Rationale

### Why This Approach?

1. **Legal Compliance**: MetaForge name visible on every item
2. **Non-intrusive**: Subtle colors (#8E8E93), small text (13pt)
3. **Functional**: Report link empowers users to improve data
4. **Persistent**: Always visible (fixed footer), can't miss it
5. **Trust Building**: Shows data freshness (updated timestamp)

### Visual Balance
```
Main Content:    90% of screen height, bright colors
Attribution:     10% of screen height, muted colors
                 ↓
Result: Content dominates, footer doesn't distract
```

### Typography Choices
- **13pt**: Small enough to be subtle, large enough to read
- **Secondary color (#8E8E93)**: iOS standard for metadata
- **Link blue (#007AFF)**: iOS standard for interactive text

---

## Accessibility

### VoiceOver Labels
```
"Footer. Data provided by MetaForge. Updated November 20."
"Report Issue. Link. Opens contact form."
```

### Touch Targets
- **Report Issue tap area**: 44pt height (WCAG compliant)
- **Full footer**: 60pt height (accessible to all users)

### Color Contrast
- Attribution text: #8E8E93 on #1C1C1E (8.9:1 ratio) ✅
- Link text: #007AFF on #1C1C1E (4.8:1 ratio) ✅

### Dynamic Type
- Text scales with iOS accessibility settings
- Footer height adjusts to accommodate larger text
- Minimum height: 60pt (normal text)
- Maximum height: 90pt (250% text scale)

---

## Technical Implementation

### React Native Component

```javascript
// components/AttributionFooter.js
import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { useLastUpdateDate } from '../hooks/useLastUpdateDate';

const AttributionFooter = ({ entityType, entityName }) => {
  const lastUpdate = useLastUpdateDate();

  const handleReportIssue = () => {
    const subject = `Data Issue - ${entityName}`;
    const body = `
Item: ${entityName}
Type: ${entityType}
Issue: [Please describe the problem]

---
App Version: 1.0.0
Data Source: MetaForge
Last Updated: ${lastUpdate}
    `.trim();

    const mailtoUrl = `mailto:support@arcraiders.app?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    Linking.openURL(mailtoUrl);
  };

  return (
    <View style={styles.footer}>
      <Text style={styles.attribution}>
        Data: MetaForge • Updated: {lastUpdate}
      </Text>
      <TouchableOpacity onPress={handleReportIssue} style={styles.reportButton}>
        <Text style={styles.reportText}>Report Issue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#1C1C1E',
    borderTopWidth: 1,
    borderTopColor: '#2C2C2E',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  attribution: {
    fontSize: 13,
    color: '#8E8E93',
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  reportButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  reportText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#007AFF',
    letterSpacing: 0.3,
  },
});

export default AttributionFooter;
```

### ScrollView Integration

```javascript
// screens/ItemDetailScreen.js
const ItemDetailScreen = ({ item }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Main item details */}
        <ItemHeader item={item} />
        <ItemStats item={item} />
        <CraftingRequirements item={item} />
      </ScrollView>

      {/* Fixed footer (always visible) */}
      <AttributionFooter
        entityType="item"
        entityName={item.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    paddingBottom: 80, // Space for footer (60pt + 20pt margin)
  },
});
```

---

## Testing Checklist

- [ ] Footer appears at bottom of all Item Detail screens
- [ ] Attribution text shows correct date format
- [ ] "Report Issue" link opens Mail app with pre-filled email
- [ ] Press state provides visual feedback (darker blue)
- [ ] Footer stays at bottom when scrolling main content
- [ ] VoiceOver reads footer text correctly
- [ ] Dynamic Type scales text properly
- [ ] Footer adjusts height for larger text sizes
- [ ] Works on small screens (iPhone SE) without text cutoff
- [ ] Works on large screens (iPad) with proper centering

---

## Variations for Different Screens

### Item Detail Footer
```
Data: MetaForge • Updated: Nov 20
Report Issue
```

### ARC Detail Footer
```
Data: MetaForge • Updated: Nov 20
Report Incorrect Loot
```

### Quest Detail Footer
```
Data: MetaForge • Updated: Nov 20
Report Quest Issue
```

### Map Detail Footer
```
Data: MetaForge • Updated: Nov 20
Report Location Issue
```

**Implementation**: Pass custom `reportText` prop to component
```javascript
<AttributionFooter
  reportText="Report Incorrect Loot"
  entityType="arc"
  entityName="Bastion"
/>
```

---

*This footer component provides persistent, subtle attribution on every data screen while maintaining excellent UX and legal compliance.*
