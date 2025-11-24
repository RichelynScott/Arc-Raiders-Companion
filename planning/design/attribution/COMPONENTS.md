# Attribution UI Components

**Last Updated**: 2025-11-24
**Purpose**: Reusable components for MetaForge attribution across the app
**Platform**: React Native (iOS/Android)
**Theme**: Dark Mode Primary

---

## Component Library Overview

This document defines 5 reusable components for consistent MetaForge attribution throughout the app:

1. **ExternalLinkButton** - Opens external URLs (website, Discord)
2. **AttributionFooter** - Persistent footer on detail screens
3. **DataSourceBadge** - Small inline attribution badge
4. **LastUpdatedText** - Dynamic timestamp display
5. **AttributionModal** - Full-screen "About Data" modal

---

## 1. ExternalLinkButton

### Purpose
Standardized button for opening external links (MetaForge website, Discord) with proper icon and interaction states.

### Visual Specs

```
┌─────────────────────────────────────┐
│                                     │
│  Visit MetaForge Website        ↗  │  ← Primary button (filled)
│                                     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│                                     │
│  Join Discord Community         ↗  │  ← Secondary button (outlined)
│                                     │
└─────────────────────────────────────┘
```

### Props Interface

```typescript
interface ExternalLinkButtonProps {
  label: string;              // Button text
  url: string;                // External URL to open
  variant: 'primary' | 'secondary';  // Visual style
  icon?: string;              // SF Symbol name (default: 'arrow.up.forward.square')
  color?: string;             // Custom color (overrides variant default)
  onPress?: () => void;       // Optional callback before opening URL
  disabled?: boolean;         // Disable button
}
```

### Implementation

```javascript
// components/ExternalLinkButton.js
import React from 'react';
import { TouchableOpacity, Text, Linking, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ExternalLinkButton = ({
  label,
  url,
  variant = 'primary',
  icon = 'open-outline',
  color,
  onPress,
  disabled = false
}) => {
  const handlePress = async () => {
    if (onPress) onPress();

    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    }
  };

  const buttonStyle = [
    styles.button,
    variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
    disabled && styles.disabledButton
  ];

  const textStyle = [
    styles.text,
    variant === 'primary' ? styles.primaryText : styles.secondaryText,
    color && { color },
    disabled && styles.disabledText
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={textStyle}>{label}</Text>
      <Icon name={icon} size={16} color={textStyle[0].color} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 20,
    marginVertical: 6,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#5865F2',
  },
  disabledButton: {
    opacity: 0.5,
  },
  text: {
    fontSize: 17,
    fontWeight: '600',
    marginRight: 8,
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#5865F2',
  },
  disabledText: {
    color: '#8E8E93',
  },
  icon: {
    marginLeft: 4,
  },
});

export default ExternalLinkButton;
```

### Usage Examples

```javascript
// Primary button (About screen)
<ExternalLinkButton
  label="Visit MetaForge Website"
  url="https://metaforge.app/arc-raiders"
  variant="primary"
/>

// Secondary button (About screen)
<ExternalLinkButton
  label="Join Discord Community"
  url="https://discord.gg/8UEK9TrQDs"
  variant="secondary"
  color="#5865F2"
/>

// Custom callback (analytics tracking)
<ExternalLinkButton
  label="Learn More"
  url="https://metaforge.app/arc-raiders"
  variant="primary"
  onPress={() => analytics.track('clicked_metaforge_link')}
/>
```

---

## 2. AttributionFooter

### Purpose
Fixed footer component for item detail screens showing data source and "Report Issue" link.

### Visual Specs

```
┌─────────────────────────────────────┐
│                                     │
│  Data: MetaForge • Updated: Nov 20 │  ← 13pt, #8E8E93
│  Report Issue                       │  ← 13pt Semibold, #007AFF
│                                     │
└─────────────────────────────────────┘
```

### Props Interface

```typescript
interface AttributionFooterProps {
  entityType: 'item' | 'arc' | 'quest' | 'map';
  entityName: string;
  reportText?: string;        // Custom report link text
  lastUpdate?: Date;          // Custom update timestamp
  onReportIssue?: (type: string, name: string) => void;
}
```

### Implementation

```javascript
// components/AttributionFooter.js
import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { useLastUpdateDate } from '../hooks/useLastUpdateDate';

const AttributionFooter = ({
  entityType,
  entityName,
  reportText = 'Report Issue',
  lastUpdate,
  onReportIssue
}) => {
  const lastUpdateDate = useLastUpdateDate(lastUpdate);

  const handleReportIssue = () => {
    if (onReportIssue) {
      onReportIssue(entityType, entityName);
    } else {
      // Default email behavior
      const subject = `Data Issue - ${entityName}`;
      const body = `
Entity: ${entityName}
Type: ${entityType}
Issue: [Please describe the problem]

---
App Version: 1.0.0
Data Source: MetaForge
Last Updated: ${lastUpdateDate}
      `.trim();

      const mailtoUrl = `mailto:support@arcraiders.app?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      Linking.openURL(mailtoUrl);
    }
  };

  return (
    <View style={styles.footer}>
      <Text style={styles.attribution}>
        Data: MetaForge • Updated: {lastUpdateDate}
      </Text>
      <TouchableOpacity onPress={handleReportIssue} style={styles.reportButton}>
        <Text style={styles.reportText}>{reportText}</Text>
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

### Usage Examples

```javascript
// Item detail screen
<AttributionFooter
  entityType="item"
  entityName="Renegade III"
/>

// ARC detail screen with custom report text
<AttributionFooter
  entityType="arc"
  entityName="Bastion"
  reportText="Report Incorrect Loot"
/>

// Quest detail screen with custom callback
<AttributionFooter
  entityType="quest"
  entityName="Greasing Her Palms"
  onReportIssue={(type, name) => {
    navigation.navigate('ReportIssue', { type, name });
  }}
/>
```

---

## 3. DataSourceBadge

### Purpose
Small inline badge showing "MetaForge" attribution for compact spaces (list items, cards).

### Visual Specs

```
┌──────────────┐
│ 🔷 MetaForge │  ← 12pt Medium, #8E8E93
└──────────────┘
```

### Props Interface

```typescript
interface DataSourceBadgeProps {
  size?: 'small' | 'medium' | 'large';
  showIcon?: boolean;
  variant?: 'default' | 'subtle';
}
```

### Implementation

```javascript
// components/DataSourceBadge.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DataSourceBadge = ({
  size = 'medium',
  showIcon = true,
  variant = 'default'
}) => {
  const fontSize = {
    small: 11,
    medium: 12,
    large: 13
  }[size];

  const color = variant === 'subtle' ? '#8E8E93' : '#FFFFFF';

  return (
    <View style={styles.badge}>
      {showIcon && <Text style={[styles.icon, { fontSize }]}>🔷</Text>}
      <Text style={[styles.text, { fontSize, color }]}>MetaForge</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  icon: {
    marginRight: 4,
  },
  text: {
    fontWeight: '500',
  },
});

export default DataSourceBadge;
```

### Usage Examples

```javascript
// Small badge on list item
<View style={styles.listItem}>
  <Text style={styles.itemName}>Renegade III</Text>
  <DataSourceBadge size="small" variant="subtle" />
</View>

// Medium badge on card
<View style={styles.card}>
  <Image source={item.icon} />
  <Text>{item.name}</Text>
  <DataSourceBadge size="medium" />
</View>

// Large badge without icon
<DataSourceBadge size="large" showIcon={false} />
```

---

## 4. LastUpdatedText

### Purpose
Dynamic text component showing relative time since last data update.

### Visual Specs

```
Updated: Today           ← 13pt Regular, #8E8E93
Updated: Yesterday       ← 13pt Regular, #8E8E93
Updated: 3 days ago      ← 13pt Regular, #8E8E93
Updated: Nov 20          ← 13pt Regular, #8E8E93
```

### Props Interface

```typescript
interface LastUpdatedTextProps {
  timestamp?: number;         // Unix timestamp (ms)
  prefix?: string;            // Text before date (default: "Updated:")
  format?: 'relative' | 'absolute';
  style?: TextStyle;
}
```

### Implementation

```javascript
// components/LastUpdatedText.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useLastUpdateDate } from '../hooks/useLastUpdateDate';

const LastUpdatedText = ({
  timestamp,
  prefix = 'Updated:',
  format = 'relative',
  style
}) => {
  const formattedDate = useLastUpdateDate(timestamp, format);

  return (
    <Text style={[styles.text, style]}>
      {prefix} {formattedDate}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 13,
    color: '#8E8E93',
  },
});

export default LastUpdatedText;
```

### Custom Hook

```javascript
// hooks/useLastUpdateDate.js
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useLastUpdateDate = (timestamp, format = 'relative') => {
  const [formattedDate, setFormattedDate] = useState('Never');

  useEffect(() => {
    const fetchAndFormat = async () => {
      let ts = timestamp;

      if (!ts) {
        const storedTimestamp = await AsyncStorage.getItem('arc_raiders_items_timestamp');
        ts = storedTimestamp ? parseInt(storedTimestamp) : null;
      }

      if (!ts) {
        setFormattedDate('Never');
        return;
      }

      const formatted = format === 'relative'
        ? formatRelativeDate(ts)
        : formatAbsoluteDate(ts);

      setFormattedDate(formatted);
    };

    fetchAndFormat();
  }, [timestamp, format]);

  return formattedDate;
};

const formatRelativeDate = (timestamp) => {
  const now = new Date();
  const updated = new Date(timestamp);
  const diffMs = now - updated;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;

  return formatAbsoluteDate(timestamp);
};

const formatAbsoluteDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
};
```

### Usage Examples

```javascript
// Relative format (default)
<LastUpdatedText />

// Absolute format
<LastUpdatedText format="absolute" />

// Custom timestamp and prefix
<LastUpdatedText
  timestamp={1700000000000}
  prefix="Last sync:"
/>

// Custom styling
<LastUpdatedText
  style={{ fontSize: 15, color: '#FFFFFF' }}
/>
```

---

## 5. AttributionModal

### Purpose
Full-screen modal explaining data source, shown on first app launch or via "Learn More" links.

### Visual Specs

```
┌─────────────────────────────────────┐
│  ✕                                  │  ← Close button
│                                     │
│         [MetaForge Logo]            │  ← 80×80pt icon
│                                     │
│    Where Does Our Data Come From?   │  ← 20pt Bold
│                                     │
│  All game data in Arc Raiders       │  ← 17pt Regular
│  Companion is provided by MetaForge,│
│  a community-driven database        │
│  maintained by dedicated Arc Raiders│
│  fans.                              │
│                                     │
│  📊 500+ Items                      │
│  🔄 Updated Weekly                  │
│  ✅ Community-Verified              │
│  🔓 Open API                        │
│                                     │
│  [ Visit MetaForge ↗ ]             │  ← Primary button
│  [ Join Discord ↗ ]                 │  ← Secondary button
│                                     │
│  [ Got It ]                         │  ← Dismiss button
│                                     │
└─────────────────────────────────────┘
```

### Props Interface

```typescript
interface AttributionModalProps {
  visible: boolean;
  onClose: () => void;
  showOnFirstLaunch?: boolean;
}
```

### Implementation

```javascript
// components/AttributionModal.js
import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExternalLinkButton from './ExternalLinkButton';

const AttributionModal = ({ visible, onClose, showOnFirstLaunch = false }) => {
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      if (showOnFirstLaunch) {
        const hasSeenModal = await AsyncStorage.getItem('has_seen_attribution_modal');
        if (!hasSeenModal) {
          setIsVisible(true);
          await AsyncStorage.setItem('has_seen_attribution_modal', 'true');
        }
      }
    };

    checkFirstLaunch();
  }, [showOnFirstLaunch]);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>

        <Image
          source={require('../assets/metaforge-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Where Does Our Data Come From?</Text>

        <Text style={styles.body}>
          All game data in Arc Raiders Companion is provided by MetaForge,
          a community-driven database maintained by dedicated Arc Raiders fans.
        </Text>

        <View style={styles.features}>
          <FeatureItem icon="📊" text="500+ Items" />
          <FeatureItem icon="🔄" text="Updated Weekly" />
          <FeatureItem icon="✅" text="Community-Verified" />
          <FeatureItem icon="🔓" text="Open API" />
        </View>

        <ExternalLinkButton
          label="Visit MetaForge"
          url="https://metaforge.app/arc-raiders"
          variant="primary"
        />

        <ExternalLinkButton
          label="Join Discord"
          url="https://discord.gg/8UEK9TrQDs"
          variant="secondary"
          color="#5865F2"
        />

        <TouchableOpacity style={styles.dismissButton} onPress={handleClose}>
          <Text style={styles.dismissText}>Got It</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const FeatureItem = ({ icon, text }) => (
  <View style={styles.featureItem}>
    <Text style={styles.featureIcon}>{icon}</Text>
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
  },
  closeIcon: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  body: {
    fontSize: 17,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 25,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  features: {
    width: '100%',
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  featureText: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  dismissButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  dismissText: {
    fontSize: 17,
    color: '#8E8E93',
    fontWeight: '600',
  },
});

export default AttributionModal;
```

### Usage Examples

```javascript
// Show modal on first app launch
<AttributionModal showOnFirstLaunch />

// Controlled visibility
const [showModal, setShowModal] = useState(false);

<AttributionModal
  visible={showModal}
  onClose={() => setShowModal(false)}
/>

// Trigger from Settings "Learn More" button
<Button onPress={() => setShowModal(true)}>
  Learn More About Data Source
</Button>
<AttributionModal visible={showModal} onClose={() => setShowModal(false)} />
```

---

## Component Testing Checklist

### ExternalLinkButton
- [ ] Opens URLs in Safari/Chrome correctly
- [ ] Press state shows visual feedback
- [ ] Disabled state prevents interaction
- [ ] Icon renders on right side
- [ ] Custom colors apply correctly
- [ ] VoiceOver announces "Link, opens in browser"

### AttributionFooter
- [ ] Shows correct last update date
- [ ] "Report Issue" opens email client
- [ ] Footer stays at bottom on scroll
- [ ] Works on small screens (iPhone SE)
- [ ] Text truncates gracefully on long dates
- [ ] VoiceOver reads footer correctly

### DataSourceBadge
- [ ] Renders at all 3 sizes correctly
- [ ] Icon shows/hides based on prop
- [ ] Subtle variant uses correct color
- [ ] Badge fits inline with text
- [ ] Background color has correct opacity

### LastUpdatedText
- [ ] Shows "Today", "Yesterday", "X days ago" correctly
- [ ] Falls back to "Never" if no data
- [ ] Switches to absolute date after 7 days
- [ ] Custom prefix renders
- [ ] Style prop applies correctly

### AttributionModal
- [ ] Shows on first launch (only once)
- [ ] Close button dismisses modal
- [ ] "Got It" dismisses modal
- [ ] External links open correctly
- [ ] Modal animates smoothly
- [ ] Works on iPad (sheet presentation)
- [ ] VoiceOver can navigate all elements

---

*These reusable components ensure consistent, accessible MetaForge attribution throughout the Arc Raiders Companion app.*
