/**
 * Dark theme colors for Arc Raiders Companion App
 * Inspired by Arc Raiders' sci-fi aesthetic
 */

export const Colors = {
  dark: {
    // Background colors
    background: '#0a0e13',
    backgroundSecondary: '#141921',
    backgroundTertiary: '#1e2530',

    // Primary accent (electric blue)
    primary: '#00bfff',
    primaryDark: '#0099cc',
    primaryLight: '#33ccff',

    // Secondary accent (neon purple)
    secondary: '#b366ff',
    secondaryDark: '#8c33ff',
    secondaryLight: '#cc99ff',

    // Text colors
    text: '#ffffff',
    textSecondary: '#b8c5d6',
    textTertiary: '#7a8ca0',
    textDisabled: '#4a5866',

    // UI elements
    border: '#2a3441',
    borderLight: '#3a4551',
    card: '#141921',
    cardElevated: '#1e2530',

    // Status colors
    success: '#00ff88',
    warning: '#ffaa00',
    error: '#ff3366',
    info: '#00bfff',

    // Rarity colors (for game items)
    rarity: {
      common: '#b8c5d6',
      uncommon: '#00ff88',
      rare: '#00bfff',
      epic: '#b366ff',
      legendary: '#ff9900',
    },

    // Difficulty colors
    difficulty: {
      1: '#00ff88',
      2: '#66ff99',
      3: '#ffaa00',
      4: '#ff6633',
      5: '#ff3366',
    },

    // Overlay/Modal
    overlay: 'rgba(10, 14, 19, 0.85)',
    modalBackground: '#1e2530',

    // Interactive elements
    buttonPrimary: '#00bfff',
    buttonSecondary: '#2a3441',
    buttonDisabled: '#1e2530',

    // Tab bar
    tabBarBackground: '#0a0e13',
    tabBarActive: '#00bfff',
    tabBarInactive: '#4a5866',
  },
};

export type ThemeColors = typeof Colors.dark;

// Export convenience function for accessing colors
export const getColors = () => Colors.dark;
