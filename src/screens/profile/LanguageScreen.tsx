import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Check} from 'lucide-react-native';

import {Screen} from '../../components';
import {colors, radius, spacing, typography} from '../../theme';
import {useAppStore} from '../../store/useAppStore';
import {LANGUAGES} from '../../i18n';

export const LanguageScreen: React.FC = () => {
  const {i18n} = useTranslation();
  const language = useAppStore((s) => s.language);
  const setLanguage = useAppStore((s) => s.setLanguage);

  const select = (code: string) => {
    setLanguage(code);
    i18n.changeLanguage(code);
  };

  return (
    <Screen padded={false}>
      <FlatList
        contentContainerStyle={styles.list}
        data={LANGUAGES}
        keyExtractor={(l) => l.code}
        renderItem={({item}) => {
          const active = item.code === language;
          return (
            <TouchableOpacity
              activeOpacity={0.85}
              style={[styles.row, active && styles.activeRow]}
              onPress={() => select(item.code)}>
              <Text style={typography.body}>{item.label}</Text>
              {active ? <Check color={colors.primary} size={20} /> : null}
            </TouchableOpacity>
          );
        }}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  list: {padding: spacing.lg},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.sm,
  },
  activeRow: {borderWidth: 1.5, borderColor: colors.primary},
});
