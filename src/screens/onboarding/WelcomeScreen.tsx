import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {Baby} from 'lucide-react-native';

import {Screen, PrimaryButton} from '../../components';
import {colors, spacing, typography, radius} from '../../theme';
import {RootStackParamList} from '../../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

export const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const {t} = useTranslation();

  return (
    <Screen>
      <View style={styles.content}>
        <View style={styles.logoCircle}>
          <Baby color={colors.primary} size={64} />
        </View>
        <Text style={[typography.h1, styles.title]}>
          {t('onboarding.welcomeTitle')}
        </Text>
        <Text style={[typography.bodyMuted, styles.subtitle]}>
          {t('onboarding.welcomeSubtitle')}
        </Text>
      </View>
      <PrimaryButton
        title={t('onboarding.getStarted')}
        onPress={() => navigation.navigate('BabyProfile')}
        style={styles.cta}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCircle: {
    width: 128,
    height: 128,
    borderRadius: radius.pill,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
    lineHeight: 22,
  },
  cta: {
    marginBottom: spacing.xl,
  },
});
