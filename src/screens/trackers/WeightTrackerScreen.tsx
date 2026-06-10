import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Screen, Card, PrimaryButton} from '../../components';
import {colors, radius, spacing, typography} from '../../theme';
import {useAppStore, useActiveBaby} from '../../store/useAppStore';

export const WeightTrackerScreen: React.FC = () => {
  const {t} = useTranslation();
  const weights = useAppStore((s) => s.weights);
  const activeBaby = useActiveBaby();
  const addWeight = useAppStore((s) => s.addWeight);
  const [value, setValue] = useState('');

  const id = activeBaby?.id;
  const babyWeights = weights.filter((e) => e.babyId === id);

  const log = () => {
    const kg = parseFloat(value.replace(',', '.'));
    if (Number.isNaN(kg) || kg <= 0) {
      return;
    }
    addWeight({
      babyId: id ?? 'unknown',
      date: new Date().toISOString().slice(0, 10),
      weightKg: kg,
    });
    setValue('');
  };

  return (
    <Screen padded={false}>
      <View style={styles.header}>
        <Text style={[typography.label, styles.prompt]}>
          {t('trackers.logWeight')} (kg)
        </Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={setValue}
            placeholder="e.g. 5.2"
            placeholderTextColor={colors.textMuted}
            keyboardType="decimal-pad"
          />
          <PrimaryButton
            title={t('common.add')}
            onPress={log}
            style={styles.addBtn}
          />
        </View>
      </View>
      <FlatList
        contentContainerStyle={styles.list}
        data={babyWeights}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={[typography.bodyMuted, styles.empty]}>
            {t('trackers.noEntries')}
          </Text>
        }
        renderItem={({item}) => (
          <Card>
            <Text style={typography.h3}>{item.weightKg} kg</Text>
            <Text style={typography.caption}>{item.date}</Text>
          </Card>
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {padding: spacing.lg},
  prompt: {marginBottom: spacing.md},
  row: {flexDirection: 'row', gap: spacing.sm, alignItems: 'center'},
  input: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    height: 52,
    color: colors.textPrimary,
    fontSize: 16,
  },
  addBtn: {width: 100},
  list: {paddingHorizontal: spacing.lg, paddingBottom: spacing.xxxl},
  empty: {textAlign: 'center', marginTop: spacing.xxl},
});
