import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Screen, Card} from '../../components';
import {colors, radius, spacing, typography} from '../../theme';
import {useAppStore} from '../../store/useAppStore';
import {formatTime, timeAgo} from '../../utils/date';
import {DiaperType} from '../../types';

const TYPES: {key: DiaperType; label: string}[] = [
  {key: 'wet', label: 'Wet'},
  {key: 'dirty', label: 'Dirty'},
  {key: 'mixed', label: 'Mixed'},
];

export const DiaperTrackerScreen: React.FC = () => {
  const {t} = useTranslation();
  const diapers = useAppStore((s) => s.diapers);
  const baby = useAppStore((s) => s.baby);
  const addDiaper = useAppStore((s) => s.addDiaper);

  const log = (type: DiaperType) =>
    addDiaper({
      babyId: baby?.id ?? 'unknown',
      type,
      time: new Date().toISOString(),
    });

  return (
    <Screen padded={false}>
      <View style={styles.header}>
        <Text style={[typography.label, styles.prompt]}>
          {t('trackers.logDiaper')}
        </Text>
        <View style={styles.row}>
          {TYPES.map((tp) => (
            <TouchableOpacity
              key={tp.key}
              style={styles.chip}
              activeOpacity={0.85}
              onPress={() => log(tp.key)}>
              <Text style={styles.chipText}>{tp.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <FlatList
        contentContainerStyle={styles.list}
        data={diapers}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={[typography.bodyMuted, styles.empty]}>
            {t('trackers.noEntries')}
          </Text>
        }
        renderItem={({item}) => (
          <Card>
            <Text style={typography.h3}>
              {item.type[0].toUpperCase() + item.type.slice(1)}
            </Text>
            <Text style={typography.caption}>
              {formatTime(item.time)} · {timeAgo(item.time)}
            </Text>
          </Card>
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {padding: spacing.lg},
  prompt: {marginBottom: spacing.md},
  row: {flexDirection: 'row', gap: spacing.sm},
  chip: {
    flex: 1,
    backgroundColor: colors.diaper,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  chipText: {color: colors.textInverse, fontWeight: '600', fontSize: 15},
  list: {paddingHorizontal: spacing.lg, paddingBottom: spacing.xxxl},
  empty: {textAlign: 'center', marginTop: spacing.xxl},
});
