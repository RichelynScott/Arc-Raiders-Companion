# Attribution Design System Guidelines

**Last Updated**: 2025-11-24
**Purpose**: Design standards and specifications for MetaForge attribution
**Platform**: iOS (Primary), Android (Secondary)
**Theme**: Dark Mode Primary

---

## Overview

This design system ensures consistent, accessible, and legally compliant MetaForge attribution across all screens and components in the Arc Raiders Companion app.

---

## Design Principles

### 1. Legally Compliant
- MetaForge name must be visible and readable
- Link to metaforge.app/arc-raiders must be present
- Users must know data source (no hidden attribution)

### 2. Non-Intrusive
- Attribution should not block primary user tasks
- Use subtle colors (#8E8E93 for metadata)
- Place in expected locations (footers, about screens, settings)

### 3. Accessible
- Meet WCAG AA standards (4.5:1 contrast minimum)
- Support VoiceOver, Dynamic Type, Switch Control
- Minimum 44×44pt touch targets

### 4. Consistent
- Use same components across all screens
- Follow iOS Human Interface Guidelines
- Match system conventions (colors, typography, interactions)

---

## Typography System

### Font Families

**iOS (Primary)**:
- Display: SF Pro Display (headings, large text)
- Text: SF Pro Text (body text, UI labels)
- Rounded: SF Pro Rounded (buttons, badges)

**Android (Secondary)**:
- Display: Roboto (headings, large text)
- Text: Roboto (body text, UI labels)

### Type Scale

```
Display Large:  24pt, Bold         (About screen title)
Display Medium: 20pt, Bold         (Modal headings)
Headline:       17pt, Semibold     (Section headers, button labels)
Body:           17pt, Regular      (Main content, list items)
Callout:        15pt, Regular      (Sub-text, descriptions)
Footnote:       13pt, Regular      (Footer text, timestamps)
Caption:        12pt, Regular      (Small badges, hints)
```

### Attribution-Specific Typography

| Component | Font | Size | Weight | Color | Use Case |
|-----------|------|------|--------|-------|----------|
| Attribution Footer | SF Pro Text | 13pt | Regular | #8E8E93 | "Data: MetaForge • Updated: [date]" |
| Report Link | SF Pro Text | 13pt | Semibold | #007AFF | "Report Issue" |
| Section Header | SF Pro Text | 13pt | Semibold | #98989D | "DATA SOURCE" (uppercase) |
| Button Label | SF Pro Text | 17pt | Semibold | #FFFFFF | "Visit MetaForge Website" |
| Badge Text | SF Pro Text | 12pt | Medium | #FFFFFF | "MetaForge" badge |

### Letter Spacing

```
Section Headers (UPPERCASE):  +0.5pt (improved readability)
Footer Text:                  +0.3pt (subtle spacing)
Button Labels:                +0.0pt (default)
```

### Line Height

```
Body Text:     1.5 (25.5pt for 17pt font)
Callout Text:  1.4 (21pt for 15pt font)
Footer Text:   1.3 (16.9pt for 13pt font)
```

---

## Color System

### Semantic Colors (Dark Mode)

| Color Name | Hex | Use Case | WCAG Ratio |
|------------|-----|----------|------------|
| Primary Text | #FFFFFF | Main content, headings | 21:1 on #000000 ✅ |
| Secondary Text | #8E8E93 | Metadata, footnotes, attribution | 8.9:1 on #000000 ✅ |
| Tertiary Text | #636366 | Disabled text, placeholders | 4.5:1 on #000000 ✅ |
| Link Blue | #007AFF | Tappable links, primary buttons | 5.2:1 on #000000 ✅ |
| Discord Blue | #5865F2 | Discord-specific elements | 6.1:1 on #000000 ✅ |
| Background | #000000 | Main background | - |
| Card Background | #1C1C1E | List items, cards, footers | - |
| Separator | #2C2C2E | Borders, dividers | - |

### Attribution-Specific Colors

```javascript
const AttributionColors = {
  footerText: '#8E8E93',        // Footer attribution line
  reportLink: '#007AFF',        // "Report Issue" link
  reportLinkPressed: '#0051D5', // Darker blue on press
  sectionHeader: '#98989D',     // Section headers (UPPERCASE)
  buttonPrimary: '#007AFF',     // Primary button background
  buttonPrimaryPressed: '#0051D5', // Primary button pressed
  buttonSecondary: 'transparent', // Secondary button background
  buttonSecondaryBorder: '#5865F2', // Secondary button border (Discord)
  badge: 'rgba(255, 255, 255, 0.05)', // Badge background (5% white)
};
```

### Color Usage Rules

1. **Never use pure white (#FFFFFF) for attribution text**
   - Use secondary (#8E8E93) for subtlety
   - Keeps focus on main content

2. **Always use link blue (#007AFF) for tappable text**
   - iOS standard, users expect it to be tappable
   - Consistent with system behavior

3. **Match Discord brand color (#5865F2) for Discord elements**
   - Brand recognition
   - User expectation (Discord = blue)

4. **Use card background (#1C1C1E) for footers**
   - Separates from main content
   - iOS standard for settings lists

---

## Spacing System

### Base Unit: 4pt Grid

All spacing should be multiples of 4pt for pixel-perfect alignment.

```
4pt   - Tight spacing (icon margins, badge padding)
8pt   - Close spacing (between lines in footer)
12pt  - Default spacing (section padding, button padding)
16pt  - Medium spacing (horizontal page margins)
20pt  - Wide spacing (between major sections)
24pt  - Extra-wide spacing (top of About screen)
32pt  - Large spacing (between About screen sections)
40pt  - Extra-large spacing (app icon top padding)
```

### Attribution-Specific Spacing

```javascript
const AttributionSpacing = {
  // Footer
  footerPaddingVertical: 12,   // Top/bottom padding
  footerPaddingHorizontal: 16, // Left/right padding
  footerLineSpacing: 4,         // Between attribution line and report link

  // Buttons
  buttonHeight: 50,             // Standard button height
  buttonPaddingHorizontal: 20,  // Left/right button padding
  buttonMarginVertical: 6,      // Spacing between stacked buttons
  buttonBorderRadius: 12,       // Rounded corners

  // Sections
  sectionHeaderTopMargin: 32,   // Space above section headers
  sectionHeaderBottomMargin: 8, // Space below section headers
  sectionPaddingHorizontal: 16, // Left/right section padding

  // Badges
  badgePaddingVertical: 4,      // Top/bottom badge padding
  badgePaddingHorizontal: 8,    // Left/right badge padding
  badgeBorderRadius: 6,         // Rounded corners

  // Modal
  modalPadding: 20,             // All-around modal padding
  modalLogoBottomMargin: 20,    // Space below MetaForge logo
  modalTitleBottomMargin: 16,   // Space below modal title
};
```

---

## Component Sizing

### Touch Targets

**Minimum**: 44×44pt (iOS standard, WCAG compliant)

All interactive elements must meet this minimum:
- Buttons: 50pt height (exceeds minimum)
- Links: 44pt tap area (even if text is smaller)
- List items: 44pt height minimum

### Icon Sizes

```
Small:  16pt  (inline icons, external link indicators)
Medium: 20pt  (badges, feature list icons)
Large:  24pt  (close button, modal icons)
XLarge: 80pt  (MetaForge logo in modal)
App Icon: 120pt (About screen)
```

### Button Sizes

```
Height: 50pt (standard)
Min Width: 120pt (prevents overly narrow buttons)
Max Width: 90% of screen width (responsive)
Border Radius: 12pt (rounded corners)
```

### Footer Size

```
Height: 60pt (two lines of text + padding)
Max Height: 90pt (with Dynamic Type at 250%)
```

---

## Iconography

### External Link Indicator

**SF Symbol**: `arrow.up.forward.square`
**Size**: 16pt
**Color**: Inherits button/link color
**Placement**: Right side of button/link text
**Spacing**: 8pt from text

```
[Visit MetaForge Website ↗]
                         ↑
                 16pt icon, 8pt spacing
```

### Data Source Icon (Badge)

**Emoji**: 🔷 (small blue diamond)
**Size**: Matches text size (12pt for badges)
**Placement**: Left of "MetaForge" text
**Spacing**: 4pt from text

```
🔷 MetaForge
↑
Small blue diamond, 4pt spacing
```

### Feature Icons (Modal)

**Emojis**: 📊 🔄 ✅ 🔓 (use system emojis)
**Size**: 24pt
**Placement**: Left of feature text
**Spacing**: 12pt from text

```
📊 500+ Items
↑
24pt emoji, 12pt spacing
```

---

## Animation & Motion

### Button Press Animation

```javascript
// Scale animation on press
const scaleAnimation = Animated.spring(scale, {
  toValue: 0.98,      // Slight shrink
  duration: 100,      // Fast
  useNativeDriver: true,
});

// Color animation on press
const colorAnimation = Animated.timing(backgroundColor, {
  toValue: '#0051D5', // Darker blue
  duration: 200,      // Medium
  easing: Easing.ease,
  useNativeDriver: false, // Can't use native driver for colors
});
```

### Modal Presentation

```javascript
// Slide up from bottom
const slideUpAnimation = Animated.spring(translateY, {
  toValue: 0,         // Final position
  duration: 300,      // Medium-fast
  useNativeDriver: true,
});

// Slide down to dismiss
const slideDownAnimation = Animated.spring(translateY, {
  toValue: screenHeight, // Off-screen
  duration: 300,
  useNativeDriver: true,
});
```

### Fade Animations

```javascript
// Fade in (modal background overlay)
const fadeInAnimation = Animated.timing(opacity, {
  toValue: 0.5,       // 50% opacity black overlay
  duration: 200,
  useNativeDriver: true,
});

// Fade out
const fadeOutAnimation = Animated.timing(opacity, {
  toValue: 0,
  duration: 200,
  useNativeDriver: true,
});
```

### Loading States

```javascript
// Spinner fade-in (delayed to prevent flashing)
setTimeout(() => {
  Animated.timing(spinnerOpacity, {
    toValue: 1,
    duration: 200,
    useNativeDriver: true,
  }).start();
}, 500); // 500ms delay

// Minimum spinner display time
const minDisplayTime = 1000; // 1 second
```

---

## Layout Patterns

### Footer Layout (Fixed Bottom)

```
┌─────────────────────────────────────┐
│                                     │
│  [SCROLLABLE CONTENT ABOVE]         │
│                                     │
├─────────────────────────────────────┤ ← 1pt border
│  Data: MetaForge • Updated: Nov 20 │ ← 13pt, centered
│  Report Issue                       │ ← 13pt, centered
└─────────────────────────────────────┘
       ↑                         ↑
    12pt padding            12pt padding
```

**Implementation**:
```javascript
<View style={{ flex: 1 }}>
  <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
    {/* Main content */}
  </ScrollView>
  <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
    <AttributionFooter />
  </View>
</View>
```

### Settings List Layout

```
┌─────────────────────────────────────┐
│  DATA SOURCE            ← Header    │ ← 13pt uppercase, 32pt top margin
│  ┌───────────────────────────────┐ │
│  │  Provider                     │ │ ← 44pt height
│  │  MetaForge                    │ │
│  ├───────────────────────────────┤ │
│  │  Website                    ↗ │ │ ← 60pt height (two lines)
│  │  metaforge.app/arc-raiders   │ │
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

### About Screen Layout

```
┌─────────────────────────────────────┐
│         [App Icon]          ← 120pt │ ← 40pt top padding
│                                     │
│    Arc Raiders Companion    ← 24pt  │ ← Center-aligned
│         Version 1.0.0       ← 15pt  │ ← 12pt below title
│                                     │
├─────────────────────────────────────┤
│  DATA SOURCE                        │ ← 32pt top margin
│  Game data provided by...           │ ← 17pt, 16pt L/R padding
│                                     │
│  📦 500+ Items                      │ ← 15pt, 8pt line spacing
│  [ Visit MetaForge Website ]       │ ← 50pt height, 6pt margins
│  [ Join Discord Community ]         │
└─────────────────────────────────────┘
```

---

## Responsive Behavior

### Small Screens (iPhone SE, 320pt width)

```
Adjustments:
- Footer: Stack text vertically if date is long
- Buttons: Reduce horizontal padding to 16pt (from 20pt)
- Section padding: Reduce to 12pt (from 16pt)
- Modal: Reduce logo size to 60pt (from 80pt)

Text Wrapping:
- Allow footer attribution to wrap to two lines
- Button labels should not wrap (choose shorter text)
```

### Large Screens (iPad, 768pt+ width)

```
Adjustments:
- Max content width: 600pt (center-aligned)
- Buttons: Max width 400pt (don't span full width)
- Modal: Use "pageSheet" presentation (not full-screen)
- Footer: Keep same width as main content

Spacing:
- Increase horizontal padding to 24pt (from 16pt)
- Increase section spacing to 40pt (from 32pt)
```

### Dynamic Type (Accessibility)

```
Text Scaling: 100% → 250% (WCAG AAA)
Layout Adjustments:
- Footer height increases from 60pt to 90pt
- Button height increases from 50pt to 70pt
- Line spacing increases proportionally
- Scroll container adjusts to accommodate larger text

Minimum Sizes:
- Touch targets remain 44×44pt minimum
- Icons scale proportionally with text
- Spacing scales proportionally with text
```

---

## Accessibility Guidelines

### VoiceOver Labels

**Attribution Footer**:
```
"Footer. Data provided by MetaForge. Updated November 20."
"Report Issue. Link. Opens contact form."
```

**External Link Button**:
```
"Visit MetaForge Website. Button. Opens in external browser."
"Join Discord Community. Button. Opens Discord app."
```

**Settings List Item**:
```
"Website. Link. metaforge.app/arc-raiders. Opens in external browser."
```

### VoiceOver Hints

```
"Opens in external browser" → For website links
"Opens Discord app" → For Discord links
"Opens contact form" → For report issue links
"Dismisses screen" → For close/cancel buttons
```

### Semantic Roles

```javascript
// Button
<TouchableOpacity accessible accessibilityRole="button">
  <Text>Visit MetaForge Website</Text>
</TouchableOpacity>

// Link
<TouchableOpacity accessible accessibilityRole="link">
  <Text>metaforge.app/arc-raiders</Text>
</TouchableOpacity>

// Header
<Text accessible accessibilityRole="header">
  DATA SOURCE
</Text>
```

### Focus Order

Ensure VoiceOver navigates in logical order:
1. Screen title
2. Section headers
3. Content within sections (top to bottom)
4. Interactive elements (buttons, links)
5. Footer (last)

---

## Dark Mode Specifications

### Color Adaptations

All colors are defined for Dark Mode (primary theme):

```javascript
const DarkModeColors = {
  background: '#000000',
  cardBackground: '#1C1C1E',
  separator: '#2C2C2E',
  primaryText: '#FFFFFF',
  secondaryText: '#8E8E93',
  tertiaryText: '#636366',
  linkBlue: '#007AFF',
  discordBlue: '#5865F2',
};
```

### Light Mode (Future Enhancement)

If Light Mode is added later:

```javascript
const LightModeColors = {
  background: '#FFFFFF',
  cardBackground: '#F2F2F7',
  separator: '#C6C6C8',
  primaryText: '#000000',
  secondaryText: '#636366',
  tertiaryText: '#C7C7CC',
  linkBlue: '#007AFF',  // Same as Dark Mode
  discordBlue: '#5865F2', // Same as Dark Mode
};
```

### High Contrast Mode

For users with visual impairments:

```javascript
const HighContrastColors = {
  background: '#000000',
  primaryText: '#FFFFFF',
  linkBlue: '#409CFF', // Brighter blue (6:1 contrast)
  separator: '#545456', // Darker separator (more visible)
};
```

---

## Brand Consistency

### MetaForge Brand Elements

- **Name**: Always "MetaForge" (capital M, capital F, no space)
- **Logo**: Use official MetaForge logo (request from team)
- **Color**: No official brand color, use iOS link blue (#007AFF)
- **URL**: Always link to https://metaforge.app/arc-raiders (not homepage)
- **Discord**: Always use official invite link (discord.gg/8UEK9TrQDs)

### Arc Raiders Brand Elements

- **Name**: "Arc Raiders" (capital A, capital R, space)
- **Developer**: "Embark Studios"
- **Logo**: Do not use (copyright, no license)
- **Disclaimer**: Always include "not affiliated with Embark Studios"

---

## Testing Standards

### Visual Regression Testing

Capture screenshots of:
- Settings → Data Source section
- About screen (full scroll)
- Item detail with attribution footer
- Attribution modal (first launch)

Compare against baseline screenshots to detect unintended changes.

### Accessibility Audit

Use tools:
- **iOS**: Xcode Accessibility Inspector
- **Android**: Accessibility Scanner
- **Web**: axe DevTools (for React Native Web builds)

Verify:
- All text has 4.5:1 contrast minimum
- All touch targets are 44×44pt minimum
- All interactive elements have labels
- VoiceOver reads content in logical order

### Device Testing

Test on:
- iPhone SE (small screen)
- iPhone 14 Pro (standard screen)
- iPhone 14 Pro Max (large screen)
- iPad Pro (tablet, large screen)
- Android phones (Samsung, Google Pixel)

Verify:
- Footer remains sticky on all devices
- Buttons fit on small screens
- Text wraps correctly
- Animations are smooth (60fps)

---

## Code Standards

### Component File Structure

```
components/
├── AttributionFooter.js
├── ExternalLinkButton.js
├── DataSourceBadge.js
├── LastUpdatedText.js
└── AttributionModal.js

constants/
├── AttributionColors.js
├── AttributionSpacing.js
└── AttributionTypography.js

hooks/
└── useLastUpdateDate.js
```

### Style Naming Conventions

```javascript
// Use descriptive names
const styles = StyleSheet.create({
  footer: { ... },                // Container
  footerAttribution: { ... },     // Attribution line
  footerReportLink: { ... },      // Report Issue link

  buttonPrimary: { ... },         // Primary button
  buttonSecondary: { ... },       // Secondary button
  buttonText: { ... },            // Button text

  sectionHeader: { ... },         // Section header (UPPERCASE)
  bodyText: { ... },              // Body text
});
```

### TypeScript Interfaces

```typescript
// AttributionFooter.ts
interface AttributionFooterProps {
  entityType: 'item' | 'arc' | 'quest' | 'map';
  entityName: string;
  reportText?: string;
  lastUpdate?: Date;
  onReportIssue?: (type: string, name: string) => void;
}

// ExternalLinkButton.ts
interface ExternalLinkButtonProps {
  label: string;
  url: string;
  variant: 'primary' | 'secondary';
  icon?: string;
  color?: string;
  onPress?: () => void;
  disabled?: boolean;
}
```

---

## Maintenance Checklist

### When Adding New Screens

- [ ] Include AttributionFooter if displaying MetaForge data
- [ ] Use DataSourceBadge for list items with data
- [ ] Update VoiceOver labels for new interactive elements
- [ ] Test on small screens (iPhone SE)
- [ ] Verify Dynamic Type support (up to 250%)
- [ ] Add analytics tracking for attribution interactions

### When Updating Components

- [ ] Update all instances (use search/replace)
- [ ] Update TypeScript interfaces if props change
- [ ] Update unit tests
- [ ] Capture new baseline screenshots
- [ ] Document changes in CHANGELOG.md

### Quarterly Review

- [ ] Verify MetaForge URL is still valid
- [ ] Check Discord invite link is active
- [ ] Review analytics (how often users click attribution)
- [ ] Update "Last Updated" timestamp logic if needed
- [ ] Check WCAG compliance (new standards)

---

*These design system guidelines ensure consistent, accessible, and legally compliant MetaForge attribution across the entire Arc Raiders Companion app.*
