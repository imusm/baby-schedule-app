import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {Moon, Milk, Baby as DiaperIcon, Scale} from 'lucide-react-native';

import {Screen, Card} from '../../components';
import {colors, radius, spacing, typography} from '../../theme';
import {useAppStore} from '../../store/useAppStore';
import {todaysEntries} from '../../utils/date';
import {RootStackParamList} from '../../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const quickActions = [
  {key: 'sleep', route: 'SleepTracker', icon: Moon, color: colors.sleep},
  {key: 'feeding', route: 'FeedingTracker', icon: Milk, color: colors.feeding},
  {key: 'diaper', route: 'DiaperTracker', icon: DiaperIcon, color: colors.diaper},
  {key: 'weight', route: 'WeightTracker', icon: Scale, color: colors.weight},
] as const;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const {t} = useTranslation();
  const baby = useAppStore((s) => s.baby);
  const feedings = useAppStore((s) => s.feedings);
  const sleeps = useAppStore((s) => s.sleeps);
  const diapers = useAppStore((s) => s.diapers);

  const stats = [
    {label: t('trackers.feeding'), value: todaysEntries(feedings).length},
    {label: t('trackers.sleep'), value: todaysEntries(sleeps).length},
    {label: t('trackers.diaper'), value: todaysEntries(diapers).length},
  ];

  return (
    <Screen scroll>
      <Text style={[typography.bodyMuted, styles.greeting]}>
        {t('home.greeting')}{baby ? `, ${baby.name}'s parent` : ''} 👋
      </Text>

      <Text style={[typography.h3, styles.sectionTitle]}>
        {t('home.todaySummary')}
      </Text>
      <Card>
        <View style={styles.statsRow}>
          {stats.map((s) => (
            <View key={s.label} style={styles.stat}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={typography.caption}>{s.label}</Text>
            </View>
          ))}
        </View>
      </Card>

      <Text style={[typography.h3, styles.sectionTitle]}>
        {t('home.quickActions')}
      </Text>
      <View style={styles.grid}>
        {quickActions.map((a) => {
          const Icon = a.icon;
          return (
            <TouchableOpacity
              key={a.key}
              activeOpacity={0.85}
              style={styles.action}
              onPress={() => navigation.navigate(a.route)}>
              <View style={[styles.actionIcon, {backgroundColor: a.color}]}>
                <Icon color={colors.textInverse} size={24} />
              </View>
              <Text style={styles.actionLabel}>{t(`trackers.${a.key}`)}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  greeting: {marginTop: spacing.md, marginBottom: spacing.lg},
  sectionTitle: {marginBottom: spacing.md, marginTop: spacing.sm},
  statsRow: {flexDirection: 'row', justifyContent: 'space-around'},
  stat: {alignItems: 'center'},
  statValue: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 2,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  action: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  actionIcon: {
    width: 52,
    height: 52,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  actionLabel: {...typography.label, color: colors.textPrimary},
});
