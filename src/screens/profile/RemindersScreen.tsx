import React, {useState} from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Screen, Card} from '../../components';
import {colors, spacing, typography} from '../../theme';

const REMINDERS = [
  {key: 'feeding', label: 'Feeding reminders'},
  {key: 'sleep', label: 'Sleep reminders'},
  {key: 'diaper', label: 'Diaper change reminders'},
  {key: 'weight', label: 'Weekly weigh-in'},
];

export const RemindersScreen: React.FC = () => {
  const {t} = useTranslation();
  const [enabled, setEnabled] = useState<Record<string, boolean>>({});

  return (
    <Screen scroll>
      <Text style={[typography.bodyMuted, styles.intro]}>
        Choose which gentle reminders you'd like. (Notifications wiring comes in
        a later phase.)
      </Text>
      {REMINDERS.map((r) => (
        <Card key={r.key} style={styles.row}>
          <Text style={[typography.body, styles.label]}>{r.label}</Text>
          <Switch
            value={!!enabled[r.key]}
            onValueChange={(v) => setEnabled((e) => ({...e, [r.key]: v}))}
            trackColor={{true: colors.primary, false: colors.border}}
            thumbColor={colors.surface}
          />
        </Card>
      ))}
    </Screen>
  );
};

const styles = StyleSheet.create({
  intro: {marginVertical: spacing.lg, lineHeight: 22},
  row: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  label: {flex: 1, marginRight: spacing.md},
});
