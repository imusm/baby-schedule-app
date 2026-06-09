import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors, spacing} from '../theme';

interface ScreenProps {
  children: React.ReactNode;
  scroll?: boolean;
  padded?: boolean;
  style?: StyleProp<ViewStyle>;
}

/** Standard screen container handling safe-area insets and background. */
export const Screen: React.FC<ScreenProps> = ({
  children,
  scroll = false,
  padded = true,
  style,
}) => {
  const insets = useSafeAreaInsets();
  const base: StyleProp<ViewStyle> = [
    styles.container,
    {paddingTop: insets.top},
    padded && styles.padded,
    style,
  ];

  if (scroll) {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          {paddingTop: insets.top},
          padded && styles.padded,
          {paddingBottom: spacing.xxxl},
          style,
        ]}
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    );
  }

  return <View style={base}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  padded: {
    paddingHorizontal: spacing.lg,
  },
});
