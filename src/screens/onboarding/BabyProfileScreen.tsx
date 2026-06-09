import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Screen, PrimaryButton} from '../../components';
import {colors, radius, spacing, typography} from '../../theme';
import {useAppStore} from '../../store/useAppStore';

const uid = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

export const BabyProfileScreen: React.FC = () => {
  const {t} = useTranslation();
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const valid = name.trim().length > 0;

  const onSubmit = () => {
    completeOnboarding({
      id: uid(),
      name: name.trim(),
      birthDate: birthDate.trim() || new Date().toISOString().slice(0, 10),
    });
  };

  return (
    <Screen scroll>
      <Text style={[typography.h1, styles.heading]}>
        {t('onboarding.createProfile')}
      </Text>

      <Text style={typography.label}>{t('onboarding.babyName')}</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="e.g. Maya"
        placeholderTextColor={colors.textMuted}
      />

      <Text style={[typography.label, styles.spacer]}>
        {t('onboarding.birthDate')}
      </Text>
      <TextInput
        style={styles.input}
        value={birthDate}
        onChangeText={setBirthDate}
        placeholder="YYYY-MM-DD"
        placeholderTextColor={colors.textMuted}
        keyboardType="numbers-and-punctuation"
      />

      <View style={styles.footer}>
        <PrimaryButton
          title={t('common.save')}
          onPress={onSubmit}
          disabled={!valid}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  heading: {marginVertical: spacing.lg},
  spacer: {marginTop: spacing.lg},
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    height: 52,
    marginTop: spacing.sm,
    color: colors.textPrimary,
    fontSize: 16,
  },
  footer: {marginTop: spacing.xxl},
});
