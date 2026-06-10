import React from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Screen, Card} from '../../components';
import {colors, spacing, typography} from '../../theme';
import {useAppStore} from '../../store/useAppStore';

const REMINDERS = [
  {key: 'feeding', label: 'Feeding reminders'},
  {key: 'sleep', label: 'Sleep reminders'},
  {key: 'diaper', label: 'Diaper change reminders'},
  {key: 'weight', label: 'Weekly weigh-in'},
];

export const RemindersScreen: React.FC = () => {
  const {t} = useTranslation();
  const reminders = useAppStore((s) => s.reminders);
  const setReminder = useAppStore((s) => s.setReminder);

  return (
    <Screen scroll>
      <Text style={[typography.bodyMuted, styles.intro]}>
        Choose which gentle reminders you'd like. Your choices are saved on this
        device.
      </Text>
      {REMINDERS.map((r) => (
        <Card key={r.key} style={styles.row}>
          <Text style={[typography.body, styles.label]}>{r.label}</Text>
          <Switch
            value={!!reminders[r.key]}
            onValueChange={(v) => setReminder(r.key, v)}
            trackColor={{true: colors.primary, false: colors.border}}
            thumbColor={colors.surface}
          />
        </Card>
      ))}
      <Text style={[typography.caption, styles.note]}>
        Push notifications will be delivered once notification permissions are
        enabled in an upcoming update.
      </Text>
    </Screen>
  );
};

const styles = StyleSheet.create({
  intro: {marginVertical: spacing.lg, lineHeight: 22},
  row: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  label: {flex: 1, marginRight: spacing.md},
  note: {marginTop: spacing.md, lineHeight: 18},
});
