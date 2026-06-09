import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {
  Settings as SettingsIcon,
  Globe,
  Bell,
  ChevronRight,
} from 'lucide-react-native';

import {Screen, Card} from '../../components';
import {colors, radius, spacing, typography} from '../../theme';
import {useAppStore} from '../../store/useAppStore';
import {RootStackParamList} from '../../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const {t} = useTranslation();
  const baby = useAppStore((s) => s.baby);

  const rows = [
    {icon: Bell, label: t('settings.reminders'), route: 'Reminders' as const},
    {icon: Globe, label: t('settings.language'), route: 'Language' as const},
    {icon: SettingsIcon, label: t('settings.title'), route: 'Settings' as const},
  ];

  return (
    <Screen scroll>
      <Card style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{baby?.name?.[0] ?? '👶'}</Text>
        </View>
        <Text style={[typography.h2, styles.name]}>{baby?.name ?? 'Baby'}</Text>
        {baby?.birthDate ? (
          <Text style={typography.bodyMuted}>{baby.birthDate}</Text>
        ) : null}
      </Card>

      {rows.map((r) => {
        const Icon = r.icon;
        return (
          <TouchableOpacity
            key={r.route}
            activeOpacity={0.85}
            onPress={() => navigation.navigate(r.route)}>
            <Card style={styles.row}>
              <Icon color={colors.primary} size={22} />
              <Text style={[typography.body, styles.rowLabel]}>{r.label}</Text>
              <ChevronRight color={colors.textMuted} size={20} />
            </Card>
          </TouchableOpacity>
        );
      })}
    </Screen>
  );
};

const styles = StyleSheet.create({
  profileCard: {alignItems: 'center', paddingVertical: spacing.xl},
  avatar: {
    width: 84,
    height: 84,
    borderRadius: radius.pill,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {fontSize: 34, fontWeight: '700', color: colors.primary},
  name: {marginBottom: 2},
  row: {flexDirection: 'row', alignItems: 'center'},
  rowLabel: {flex: 1, marginLeft: spacing.md},
});
