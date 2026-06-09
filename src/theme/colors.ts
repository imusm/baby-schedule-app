/**
 * Little Steps color palette.
 * Soft, warm, nurturing tones suitable for a baby companion app.
 */
export const colors = {
  // Brand
  primary: '#5FBFB3', // calm mint/teal
  primaryDark: '#3F9C90',
  primaryLight: '#D6F0EC',
  secondary: '#FFB088', // warm peach
  secondaryLight: '#FFE3D3',
  accent: '#9B8CE0', // soft lavender

  // Tracker accents
  sleep: '#7C83DB', // indigo
  feeding: '#FF8A8A', // coral
  diaper: '#F2C14E', // amber
  weight: '#5FBFB3', // mint

  // UI neutrals
  background: '#F7F8FA',
  surface: '#FFFFFF',
  border: '#E6E8EC',
  overlay: 'rgba(17, 24, 39, 0.45)',

  // Text
  textPrimary: '#1F2933',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  textInverse: '#FFFFFF',

  // Status
  success: '#4CAF82',
  warning: '#F2C14E',
  danger: '#EF6461',
  info: '#5B8DEF',

  // Misc
  transparent: 'transparent',
} as const;

export type ColorToken = keyof typeof colors;
