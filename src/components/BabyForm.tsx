import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {colors, radius, spacing, typography} from '../theme';
import {DatePickerField} from './DatePickerField';
import {PrimaryButton} from './PrimaryButton';
import {BabyProfile} from '../types';

type Sex = 'female' | 'male' | 'other';

interface BabyFormProps {
  initial?: Partial<BabyProfile>;
  submitLabel: string;
  onSubmit: (data: {name: string; birthDate: string; sex?: Sex}) => void;
}

const SEX_OPTIONS: {key: Sex; label: string; emoji: string}[] = [
  {key: 'female', label: 'Girl', emoji: '👧'},
  {key: 'male', label: 'Boy', emoji: '👦'},
  {key: 'other', label: 'Prefer not', emoji: '🌟'},
];

export const BabyForm: React.FC<BabyFormProps> = ({
  initial,
  submitLabel,
  onSubmit,
}) => {
  const {t} = useTranslation();
  const [name, setName] = useState(initial?.name ?? '');
  const [birthDate, setBirthDate] = useState<string | undefined>(
    initial?.birthDate,
  );
  const [sex, setSex] = useState<Sex | undefined>(initial?.sex);

  const valid = name.trim().length > 0 && !!birthDate;

  return (
    <View>
      <Text style={[typography.label, styles.label]}>
        {t('onboarding.babyName')}
      </Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="e.g. Maya"
        placeholderTextColor={colors.textMuted}
      />

      <View style={styles.spacer} />
      <DatePickerField
        label={t('onboarding.birthDate')}
        value={birthDate}
        onChange={setBirthDate}
        placeholder="Tap to choose date"
        maximumDate={new Date()}
      />

      <View style={styles.spacer} />
      <Text style={[typography.label, styles.label]}>Sex (optional)</Text>
      <View style={styles.sexRow}>
        {SEX_OPTIONS.map((opt) => {
          const active = sex === opt.key;
          return (
            <TouchableOpacity
              key={opt.key}
              activeOpacity={0.85}
              style={[styles.sexChip, active && styles.sexChipActive]}
              onPress={() => setSex(active ? undefined : opt.key)}>
              <Text style={styles.sexEmoji}>{opt.emoji}</Text>
              <Text
                style={[
                  styles.sexLabel,
                  active && {color: colors.primaryDark},
                ]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.footer}>
        <PrimaryButton
          title={submitLabel}
          disabled={!valid}
          onPress={() =>
            onSubmit({name: name.trim(), birthDate: birthDate!, sex})
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {marginBottom: spacing.sm},
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    height: 52,
    color: colors.textPrimary,
    fontSize: 16,
  },
  spacer: {height: spacing.lg},
  sexRow: {flexDirection: 'row', gap: spacing.sm},
  sexChip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  sexChipActive: {borderColor: colors.primary, backgroundColor: colors.primaryLight},
  sexEmoji: {fontSize: 22, marginBottom: 4},
  sexLabel: {...typography.label, color: colors.textSecondary},
  footer: {marginTop: spacing.xxl},
});
