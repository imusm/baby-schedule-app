import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import {Screen, BabyForm} from '../../components';
import {spacing, typography} from '../../theme';
import {useAppStore} from '../../store/useAppStore';

export const AddChildScreen: React.FC = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const addBaby = useAppStore((s) => s.addBaby);

  return (
    <Screen scroll>
      <Text style={[typography.bodyMuted, styles.sub]}>
        Add another child. You can switch between children anytime from the
        home screen or your profile.
      </Text>
      <BabyForm
        submitLabel={t('common.save')}
        onSubmit={({name, birthDate, sex}) => {
          addBaby({name, birthDate, sex});
          navigation.goBack();
        }}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  sub: {marginTop: spacing.lg, marginBottom: spacing.xl},
});
