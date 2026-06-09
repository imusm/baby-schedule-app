import {TextStyle} from 'react-native';
import {colors} from './colors';

export const typography: Record<string, TextStyle> = {
  h1: {fontSize: 28, fontWeight: '700', color: colors.textPrimary},
  h2: {fontSize: 22, fontWeight: '700', color: colors.textPrimary},
  h3: {fontSize: 18, fontWeight: '600', color: colors.textPrimary},
  body: {fontSize: 15, fontWeight: '400', color: colors.textPrimary},
  bodyMuted: {fontSize: 15, fontWeight: '400', color: colors.textSecondary},
  label: {fontSize: 13, fontWeight: '600', color: colors.textSecondary},
  caption: {fontSize: 12, fontWeight: '400', color: colors.textMuted},
  button: {fontSize: 16, fontWeight: '600', color: colors.textInverse},
};
