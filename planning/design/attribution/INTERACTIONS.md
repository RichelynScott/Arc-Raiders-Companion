# Attribution Interaction Flows

**Last Updated**: 2025-11-24
**Purpose**: Complete user interaction specifications for all attribution touchpoints
**Platform**: iOS (Primary), Android (Secondary)

---

## Overview

This document maps every user interaction related to MetaForge attribution, ensuring consistent behavior and legal compliance throughout the app.

---

## Interaction Flows by Screen

### 1. Settings Screen → Data Source Section

#### Flow 1A: View Data Source
```
USER: Opens Settings
↓
SYSTEM: Displays Settings list with sections
↓
USER: Scrolls to "DATA SOURCE" section
↓
SYSTEM: Shows:
  - Provider: MetaForge (read-only)
  - Website: metaforge.app/arc-raiders (tappable)
  - Community Discord: discord.gg/... (tappable)
  - Last Data Update: [date] (read-only)
```

**Accessibility**:
- VoiceOver: "Data Source. Heading. Provider. MetaForge."
- Screen Reader: Reads entire section in order

#### Flow 1B: Open MetaForge Website
```
USER: Taps "Website" row
↓
SYSTEM: Highlights row (#2C2C2E background, 200ms)
↓
SYSTEM: Checks URL can be opened
  ↓ YES
  SYSTEM: Opens Safari with https://metaforge.app/arc-raiders
  APP: Remains in background (multitasking)
  ↓ NO (highly unlikely)
  SYSTEM: Shows error toast "Cannot open URL"
↓
USER: Views MetaForge website in Safari
↓
USER: Switches back to app (multitasking)
↓
APP: Resumes exactly where user left off (Settings screen)
```

**Timing**:
- Highlight duration: 200ms
- URL open time: ~500ms (depends on Safari launch)
- Total perceived delay: <1 second

**Error Handling**:
- If URL is malformed: Show error toast
- If no browser installed (impossible on iOS): Fallback to in-app WebView

#### Flow 1C: Open Discord Community
```
USER: Taps "Community Discord" row
↓
SYSTEM: Highlights row (#2C2C2E background, 200ms)
↓
SYSTEM: Checks if Discord app is installed
  ↓ YES
  SYSTEM: Opens Discord app
  DISCORD: Shows "Join MetaForge Server?" dialog
  USER: Taps "Join" → Added to server
  ↓ NO
  SYSTEM: Opens Safari with discord.gg/8UEK9TrQDs
  BROWSER: Shows "Open in Discord?" prompt
  USER: Can download Discord or continue in browser
↓
USER: Joins MetaForge Discord community
```

**Platform-Specific Behavior**:
- **iOS**: Uses `discord://` URL scheme if app installed
- **Android**: Uses intent to launch Discord app

#### Flow 1D: Long Press Link (Context Menu)
```
USER: Long presses "Website" or "Discord" row (500ms+)
↓
SYSTEM: Shows iOS Share Sheet / Android Context Menu
↓
OPTIONS:
  - Copy Link
  - Share...
  - Open in Background
  - Cancel
↓
USER: Selects "Copy Link"
↓
SYSTEM: Copies URL to clipboard
SYSTEM: Shows toast "Link copied"
↓
USER: Can paste URL elsewhere (messages, notes, etc.)
```

**Use Case**: User wants to share MetaForge with a friend via text message.

---

### 2. About Screen → Full Attribution

#### Flow 2A: View About Screen
```
USER: Navigates to About screen (from Settings or menu)
↓
SYSTEM: Displays About screen with:
  - App icon and version (top)
  - DATA SOURCE section (prominent)
  - MetaForge buttons (primary/secondary)
  - Disclaimer (legal)
  - Legal links (privacy, terms, licenses)
  - Contact section (support)
  - Footer (copyright)
↓
USER: Scrolls to read content
```

**Scroll Behavior**:
- Smooth scrolling with momentum
- All sections visible via scroll
- No pagination or tabs (single long scroll)

#### Flow 2B: Visit MetaForge Website (Primary Button)
```
USER: Taps "Visit MetaForge Website ↗" button
↓
SYSTEM: Button animates:
  - Scale to 98% (100ms)
  - Background darkens to #0051D5
↓
SYSTEM: Opens Safari with https://metaforge.app/arc-raiders
↓
USER: Views full MetaForge website
USER: Can explore items, maps, guides, etc.
↓
USER: Returns to app via multitasking
↓
APP: Resumes on About screen (no state loss)
```

**Analytics Tracking**:
```javascript
analytics.track('clicked_metaforge_website', {
  source: 'about_screen',
  timestamp: Date.now()
});
```

#### Flow 2C: Join Discord Community (Secondary Button)
```
USER: Taps "Join Discord Community ↗" button
↓
SYSTEM: Button animates:
  - Scale to 98% (100ms)
  - Background shows 10% blue overlay (rgba(88, 101, 242, 0.1))
↓
SYSTEM: Opens Discord (app or Safari)
↓
USER: Joins MetaForge Discord server
USER: Can chat with community, report data issues, etc.
```

#### Flow 2D: Navigate to Legal Screens
```
USER: Taps "Privacy Policy" row
↓
SYSTEM: Navigates to /privacy screen (push transition)
↓
PRIVACY SCREEN: Displays full privacy policy (WebView or native text)
↓
USER: Reads policy, taps "Back" button
↓
SYSTEM: Returns to About screen (pop transition)
```

**Same flow for**:
- Terms of Service → /terms screen
- Open Source Licenses → /licenses screen

#### Flow 2E: Email Support
```
USER: Taps "Email Us ↗" link in Contact section
↓
SYSTEM: Opens native Mail app (iOS) or Gmail (Android)
↓
EMAIL CLIENT: Pre-filled email:
  To: support@arcraiders.app
  Subject: Arc Raiders Companion - Feedback
  Body: [Empty, user writes message]
↓
USER: Writes feedback/bug report
USER: Sends email
↓
SUPPORT TEAM: Receives email, responds within 24-48 hours
```

#### Flow 2F: Report on GitHub
```
USER: Taps "Report on GitHub ↗" link
↓
SYSTEM: Opens Safari with GitHub Issues page
↓
GITHUB: Shows issue template (if configured)
↓
USER: Can create issue, view existing issues, etc.
```

---

### 3. Item Detail Screen → Attribution Footer

#### Flow 3A: View Item with Footer
```
USER: Opens item detail screen (e.g., "Renegade III")
↓
SYSTEM: Displays:
  - Item header (name, icon, category)
  - Item stats (damage, fire rate, etc.)
  - Crafting requirements (if applicable)
  - Loot sources (where to find)
  - [Scrollable content]
  - Attribution Footer (fixed at bottom)
↓
USER: Scrolls to view all item details
↓
FOOTER: Remains visible at bottom (sticky behavior)
```

**Footer Content**:
```
Data: MetaForge • Updated: Nov 20
Report Issue
```

#### Flow 3B: Report Data Issue (Email)
```
USER: Taps "Report Issue" in footer
↓
SYSTEM: Footer text changes color to #0051D5 (darker blue, 100ms)
↓
SYSTEM: Opens Mail app with pre-filled email:
  To: support@arcraiders.app
  Subject: Data Issue - Renegade III
  Body:
    Item: Renegade III
    Issue: [User describes problem]

    ---
    App Version: 1.0.0
    Data Source: MetaForge
    Last Updated: Nov 20, 2025
↓
USER: Writes issue description:
  Example: "Damage stat shows 45 but in-game it's 50"
↓
USER: Sends email
↓
SUPPORT TEAM: Receives issue
SUPPORT TEAM: Investigates with MetaForge team
SUPPORT TEAM: Fixes data in next sync (within 7 days)
↓
APP: Next weekly sync updates item data
USER: Receives in-app notification: "Data updated for Renegade III"
```

**Alternative Flow 3C: Report via In-App Form**
```
USER: Taps "Report Issue" in footer
↓
SYSTEM: Shows bottom sheet modal:
  Title: "Report Data Issue"
  Fields:
    - Issue Type: [Dropdown]
      Options: Wrong Stats, Missing Info, Incorrect Loot, Other
    - Description: [Text area, 500 char max]
  Buttons:
    - [Cancel] [Submit]
↓
USER: Selects "Wrong Stats"
USER: Types description
USER: Taps "Submit"
↓
SYSTEM: Validates input
  ↓ Valid
  SYSTEM: Sends to backend API
  SYSTEM: Shows success toast "Issue reported. Thank you!"
  SYSTEM: Closes modal
  ↓ Invalid (empty description)
  SYSTEM: Shows error "Please describe the issue"
↓
BACKEND: Logs issue to database
BACKEND: Sends notification to MetaForge Discord (via webhook)
↓
METAFORGE TEAM: Reviews issue
METAFORGE TEAM: Updates data
↓
APP: Syncs updated data in next weekly refresh
```

---

### 4. First Launch → Attribution Modal

#### Flow 4A: First App Launch (New User)
```
USER: Downloads app from App Store
USER: Opens app for first time
↓
APP: Checks AsyncStorage for 'has_seen_attribution_modal'
  ↓ NOT FOUND (first launch)
  APP: Shows AttributionModal (full-screen)
  ↓ FOUND (returning user)
  APP: Skips modal, goes to main screen
↓
ATTRIBUTION MODAL: Displays:
  - MetaForge logo (80×80pt)
  - "Where Does Our Data Come From?" heading
  - Explanation text
  - Feature list (500+ items, updated weekly, etc.)
  - [Visit MetaForge] button
  - [Join Discord] button
  - [Got It] button (dismisses modal)
↓
USER: Reads explanation (optional)
USER: Taps "Got It"
↓
SYSTEM: Sets AsyncStorage 'has_seen_attribution_modal' = 'true'
SYSTEM: Dismisses modal (slide down animation)
SYSTEM: Shows main app screen
```

**Timing**:
- Modal appears after 500ms (allows app to fully load)
- Slide-up animation: 300ms
- Slide-down animation: 300ms

#### Flow 4B: Returning User Opens App
```
USER: Opens app (not first launch)
↓
APP: Checks AsyncStorage for 'has_seen_attribution_modal'
  ↓ FOUND
  APP: Skips modal
  APP: Goes directly to main screen (Home/Search)
```

**No interruption for returning users.**

#### Flow 4C: Manual Modal Trigger
```
USER: Navigates to Settings → About App
USER: Scrolls to "Data Source" section
USER: Taps "Learn More" link
↓
SYSTEM: Shows AttributionModal
↓
USER: Can revisit information at any time
```

---

## Edge Cases & Error Handling

### Edge Case 1: No Internet Connection
```
SCENARIO: User taps "Visit MetaForge Website" but has no internet
↓
SYSTEM: Attempts to open Safari
↓
SAFARI: Shows "No Internet Connection" error
↓
USER: Sees error in Safari, not in app
```

**Better UX**: Detect network status before opening URL
```javascript
import NetInfo from '@react-native-community/netinfo';

const handleOpenURL = async (url) => {
  const netInfo = await NetInfo.fetch();

  if (!netInfo.isConnected) {
    Alert.alert(
      'No Internet Connection',
      'You need an internet connection to open this link.',
      [{ text: 'OK' }]
    );
    return;
  }

  await Linking.openURL(url);
};
```

### Edge Case 2: Outdated Data (>30 days)
```
SCENARIO: User hasn't synced data in 30+ days
↓
FOOTER: Shows "Data: MetaForge • Updated: 30+ days ago"
↓
USER: Taps item
↓
SYSTEM: Shows warning banner:
  "⚠️ Data may be outdated. Tap to sync."
↓
USER: Taps banner
↓
SYSTEM: Triggers data sync
SYSTEM: Shows loading spinner "Syncing with MetaForge..."
↓
SYNC COMPLETES (5-10 seconds)
SYSTEM: Updates footer "Data: MetaForge • Updated: Today"
SYSTEM: Removes warning banner
```

### Edge Case 3: Discord Not Installed
```
SCENARIO: User taps "Join Discord Community" but Discord app not installed
↓
SYSTEM: Attempts discord:// URL scheme
↓
iOS: Returns false (app not installed)
↓
SYSTEM: Fallback to Safari with discord.gg/8UEK9TrQDs
↓
SAFARI: Shows Discord web interface
USER: Can join via web or see "Download Discord" prompt
```

### Edge Case 4: Mail App Not Configured
```
SCENARIO: User taps "Report Issue" but hasn't set up Mail app
↓
SYSTEM: Attempts to open Mail app
↓
iOS: Shows error "No Mail Accounts"
↓
SYSTEM: Catches error
SYSTEM: Shows alert:
  "Please configure Mail app or email us at support@arcraiders.app"
  [Copy Email] [Cancel]
↓
USER: Taps "Copy Email"
↓
SYSTEM: Copies email to clipboard
SYSTEM: Shows toast "Email address copied"
```

---

## Interaction Timing Standards

### Button Press Feedback
```
Tap Start → Highlight: 0ms (instant)
Tap End → Action: 100ms (prevents accidental taps)
Button Scale Animation: 100ms ease-out
Button Color Change: 200ms ease-in-out
```

### Navigation Transitions
```
Push (forward): 300ms slide-in from right
Pop (back): 300ms slide-out to right
Modal Present: 300ms slide-up from bottom
Modal Dismiss: 300ms slide-down to bottom
```

### Loading States
```
Data Fetch Start → Spinner: 500ms delay
(Don't show spinner for fast operations < 500ms)

Spinner Display: Minimum 1 second
(Prevents flashing spinner for fast operations)

Error Toast: 3 seconds display
Success Toast: 2 seconds display
```

### Scroll Behavior
```
Scroll Deceleration: iOS standard momentum
Footer Sticky: 0ms latency (must stay pinned)
Pull-to-Refresh: iOS standard (50pt threshold)
```

---

## Accessibility Interaction Patterns

### VoiceOver Navigation
```
USER: Enables VoiceOver
↓
SYSTEM: Announces each attribution element in order:
  1. "Data Source. Heading."
  2. "Provider. MetaForge."
  3. "Website. Link. metaforge.app/arc-raiders. Opens in external browser."
  4. "Community Discord. Link. Opens Discord app."
↓
USER: Swipes right to navigate between elements
USER: Double-taps to activate links
```

### Switch Control
```
USER: Enables Switch Control (accessibility feature)
↓
SYSTEM: Highlights each interactive element sequentially
↓
USER: Uses switch (head movement, button, etc.) to select
↓
SYSTEM: Activates selected element (opens link, dismisses modal)
```

### Dynamic Type (Large Text)
```
USER: Enables Larger Text (Settings → Accessibility)
↓
SYSTEM: Scales all text up to 250%
↓
ATTRIBUTION FOOTER:
  - Height increases from 60pt to 90pt
  - Text remains readable
  - "Report Issue" button remains tappable (44pt min)
↓
LAYOUT: Adjusts to accommodate larger text
```

---

## Multi-Modal Interaction Patterns

### Touch + Voice (Siri Shortcuts)
```
USER: "Hey Siri, open Arc Raiders item database"
↓
SIRI: Opens app to search screen
↓
USER: Taps item → Views attribution footer
```

### External Keyboard Support (iPad)
```
USER: Connects keyboard to iPad
↓
KEYBOARD SHORTCUTS:
  - Cmd+, → Opens Settings (includes Data Source section)
  - Cmd+I → Opens About screen (full attribution)
  - Tab → Navigates between tappable elements
  - Enter → Activates focused element (opens link)
```

---

## Analytics Tracking Points

Track these interactions for understanding user engagement with attribution:

```javascript
// Attribution interaction events
analytics.track('viewed_data_source_section', { source: 'settings' });
analytics.track('clicked_metaforge_website', { source: 'about' });
analytics.track('clicked_discord_link', { source: 'settings' });
analytics.track('reported_data_issue', { entity_type: 'item', entity_name: 'Renegade III' });
analytics.track('viewed_attribution_modal', { trigger: 'first_launch' });
analytics.track('dismissed_attribution_modal', { action: 'got_it' });

// Measure engagement with MetaForge
analytics.track('time_to_metaforge_click', { seconds: 45 }); // How long until user clicks MF link
analytics.track('attribution_section_views', { per_session: 3 }); // How often users check attribution
```

---

## Testing Checklist

### Functional Testing
- [ ] All external links open correctly (website, Discord, email)
- [ ] Button press states provide visual feedback
- [ ] Modal appears on first launch only
- [ ] Footer remains sticky during scroll
- [ ] Report Issue sends email with correct pre-fill
- [ ] Long press shows context menu (Copy Link)
- [ ] Back button returns to previous screen
- [ ] No memory leaks after repeated interactions

### Edge Case Testing
- [ ] Works with no internet connection (graceful error)
- [ ] Works when Discord app not installed (fallback to Safari)
- [ ] Works when Mail app not configured (copy email address)
- [ ] Works with outdated data (shows warning)
- [ ] Works on slow network (loading states)

### Accessibility Testing
- [ ] VoiceOver reads all elements in correct order
- [ ] Switch Control can navigate all interactive elements
- [ ] Dynamic Type scales text properly (up to 250%)
- [ ] Color contrast meets WCAG AA standards (4.5:1 min)
- [ ] Touch targets meet minimum size (44×44pt)
- [ ] Keyboard navigation works (Tab, Enter, Esc)

### Platform-Specific Testing
- [ ] iOS: Share Sheet works (long press)
- [ ] iOS: Safari View Controller opens correctly
- [ ] iOS: Modal presentation style is "pageSheet"
- [ ] Android: Intent opens Discord app
- [ ] Android: Chrome Custom Tabs open correctly
- [ ] Android: Back button closes modals

---

*These interaction flows ensure consistent, accessible, and legally compliant MetaForge attribution throughout the Arc Raiders Companion app.*
