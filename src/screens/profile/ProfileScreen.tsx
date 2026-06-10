import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {
  Settings as SettingsIcon,
  Globe,
  Bell,
  ChevronRight,
  Users,
} from 'lucide-react-native';

import {Screen, Card, BabySwitcherSheet} from '../../components';
import {colors, radius, spacing, typography} from '../../theme';
import {useAppStore, useActiveBaby} from '../../store/useAppStore';
import {formatAge, formatDateLong} from '../../utils/date';
import {RootStackParamList} from '../../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const {t} = useTranslation();
  const activeBaby = useActiveBaby();
  const babyCount = useAppStore((s) => s.babies.length);
  const [switcherOpen, setSwitcherOpen] = useState(false);

  const rows = [
    {
      icon: Users,
      label: babyCount > 1 ? `Switch child (${babyCount})` : 'Add child',
      onPress: () =>
        babyCount > 1 ? setSwitcherOpen(true) : navigation.navigate('AddChild'),
    },
    {icon: Bell, label: t('settings.reminders'), onPress: () => navigation.navigate('Reminders')},
    {icon: Globe, label: t('settings.language'), onPress: () => navigation.navigate('Language')},
    {icon: SettingsIcon, label: t('settings.title'), onPress: () => navigation.navigate('Settings')},
  ];

  return (
    <Screen scroll>
      <Card style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {activeBaby?.name?.charAt(0).toUpperCase() ?? '👶'}
          </Text>
        </View>
        <Text style={[typography.h2, styles.name]}>
          {activeBaby?.name ?? 'Baby'}
        </Text>
        {activeBaby ? (
          <Text style={typography.bodyMuted}>
            {formatAge(activeBaby.birthDate)} · born{' '}
            {formatDateLong(activeBaby.birthDate)}
          </Text>
        ) : null}
        <TouchableOpacity
          style={styles.switchBtn}
          onPress={() => setSwitcherOpen(true)}>
          <Text style={styles.switchBtnText}>
            {babyCount > 1 ? 'Switch / manage children' : 'Add another child'}
          </Text>
        </TouchableOpacity>
      </Card>

      {rows.map((r, idx) => {
        const Icon = r.icon;
        return (
          <TouchableOpacity key={idx} activeOpacity={0.85} onPress={r.onPress}>
            <Card style={styles.row}>
              <Icon color={colors.primary} size={22} />
              <Text style={[typography.body, styles.rowLabel]}>{r.label}</Text>
              <ChevronRight color={colors.textMuted} size={20} />
            </Card>
          </TouchableOpacity>
        );
      })}

      <BabySwitcherSheet
        visible={switcherOpen}
        onClose={() => setSwitcherOpen(false)}
        onAddChild={() => navigation.navigate('AddChild')}
      />
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
  switchBtn: {
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    backgroundColor: colors.primaryLight,
  },
  switchBtnText: {...typography.label, color: colors.primaryDark},
  row: {flexDirection: 'row', alignItems: 'center'},
  rowLabel: {flex: 1, marginLeft: spacing.md},
});
