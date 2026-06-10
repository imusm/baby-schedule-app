import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Screen, Card, PrimaryButton} from '../../components';
import {spacing, typography} from '../../theme';
import {useActiveBaby} from '../../store/useAppStore';

export const SettingsScreen: React.FC = () => {
  const {t} = useTranslation();
  const baby = useActiveBaby();

  return (
    <Screen scroll>
      <Card>
        <Text style={typography.label}>{t('settings.profile')}</Text>
        <Text style={[typography.h3, styles.value]}>
          {baby?.name ?? '—'}
        </Text>
      </Card>

      <Card>
        <Text style={typography.label}>App version</Text>
        <Text style={[typography.body, styles.value]}>1.0.0 (MVP)</Text>
      </Card>

      <View style={styles.footer}>
        <Text style={[typography.caption, styles.note]}>
          More settings will appear here as the app grows.
        </Text>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  value: {marginTop: 4},
  footer: {marginTop: spacing.lg},
  note: {textAlign: 'center'},
});
