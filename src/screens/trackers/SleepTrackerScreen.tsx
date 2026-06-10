import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Screen, Card, PrimaryButton, EntryEditorModal} from '../../components';
import {colors, spacing, typography} from '../../theme';
import {useAppStore, useActiveBaby} from '../../store/useAppStore';
import {formatTime, timeAgo} from '../../utils/date';
import {SleepEntry} from '../../types';

export const SleepTrackerScreen: React.FC = () => {
  const {t} = useTranslation();
  const sleeps = useAppStore((s) => s.sleeps);
  const activeBaby = useActiveBaby();
  const addSleep = useAppStore((s) => s.addSleep);
  const removeEntry = useAppStore((s) => s.removeEntry);

  const [editing, setEditing] = useState<SleepEntry | null>(null);
  const id = activeBaby?.id;
  const babySleeps = sleeps.filter((e) => e.babyId === id);
  const ongoing = babySleeps.find((s) => !s.endTime);

  const toggle = () => {
    if (ongoing) {
      // end the ongoing nap by replacing it
      removeEntry('sleep', ongoing.id);
      addSleep({
        babyId: id ?? 'unknown',
        startTime: ongoing.startTime,
        endTime: new Date().toISOString(),
      });
    } else {
      addSleep({
        babyId: id ?? 'unknown',
        startTime: new Date().toISOString(),
      });
    }
  };

  return (
    <Screen padded={false}>
      <View style={styles.header}>
        <PrimaryButton
          title={ongoing ? 'End sleep' : t('trackers.logSleep')}
          onPress={toggle}
          variant={ongoing ? 'secondary' : 'primary'}
        />
      </View>
      <FlatList
        contentContainerStyle={styles.list}
        data={babySleeps}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={[typography.bodyMuted, styles.empty]}>
            {t('trackers.noEntries')}
          </Text>
        }
        renderItem={({item}) => (
          <Card onPress={() => setEditing(item)}>
            <Text style={typography.h3}>
              {formatTime(item.startTime)}
              {item.endTime ? ` – ${formatTime(item.endTime)}` : ' (ongoing)'}
            </Text>
            <Text style={typography.caption}>{timeAgo(item.startTime)} · tap to edit</Text>
          </Card>
        )}
      />
      <EntryEditorModal
        kind="sleep"
        entry={editing}
        visible={!!editing}
        onClose={() => setEditing(null)}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {padding: spacing.lg},
  list: {paddingHorizontal: spacing.lg, paddingBottom: spacing.xxxl},
  empty: {textAlign: 'center', marginTop: spacing.xxl},
});
