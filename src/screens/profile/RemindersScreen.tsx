import React from 'react';
import {Alert, StyleSheet, Switch, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Screen, Card} from '../../components';
import {colors, spacing, typography} from '../../theme';
import {useAppStore} from '../../store/useAppStore';
import {
  ensurePermission,
  scheduleReminder,
  cancelReminder,
} from '../../services/notifications';

const REMINDERS = [
  {key: 'feeding', label: 'Feeding reminders', time: '12:00 daily'},
  {key: 'sleep', label: 'Sleep reminders', time: '13:00 daily'},
  {key: 'diaper', label: 'Diaper change reminders', time: '10:00 daily'},
  {key: 'weight', label: 'Weekly weigh-in', time: '09:00 weekly'},
];

export const RemindersScreen: React.FC = () => {
  const {t} = useTranslation();
  const reminders = useAppStore((s) => s.reminders);
  const setReminder = useAppStore((s) => s.setReminder);

  const toggle = async (key: string, value: boolean) => {
    if (value) {
      const granted = await ensurePermission();
      if (!granted) {
        Alert.alert(
          'Notifications off',
          'Enable notifications for Little Steps in your device settings to receive reminders.',
        );
        return;
      }
      try {
        await scheduleReminder(key);
        setReminder(key, true);
      } catch (e) {
        Alert.alert('Could not schedule', 'Please try again.');
      }
    } else {
      await cancelReminder(key);
      setReminder(key, false);
    }
  };

  return (
    <Screen scroll>
      <Text style={[typography.bodyMuted, styles.intro]}>
        Choose which gentle reminders you'd like. We'll send a notification at
        the times shown.
      </Text>
      {REMINDERS.map((r) => (
        <Card key={r.key} style={styles.row}>
          <View style={styles.labelWrap}>
            <Text style={typography.body}>{r.label}</Text>
            <Text style={typography.caption}>{r.time}</Text>
          </View>
          <Switch
            value={!!reminders[r.key]}
            onValueChange={(v) => toggle(r.key, v)}
            trackColor={{true: colors.primary, false: colors.border}}
            thumbColor={colors.surface}
          />
        </Card>
      ))}
      <Text style={[typography.caption, styles.note]}>
        Reminders are scheduled on this device. You can turn them off anytime
        here or in your device's notification settings.
      </Text>
    </Screen>
  );
};

const styles = StyleSheet.create({
  intro: {marginVertical: spacing.lg, lineHeight: 22},
  row: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  labelWrap: {flex: 1, marginRight: spacing.md},
  note: {marginTop: spacing.md, lineHeight: 18},
});
