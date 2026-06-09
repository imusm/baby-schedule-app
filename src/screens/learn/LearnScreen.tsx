import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {UtensilsCrossed, ChevronRight} from 'lucide-react-native';

import {Screen, Card} from '../../components';
import {colors, spacing, typography} from '../../theme';
import {ARTICLES} from '../../data/articles';
import {RootStackParamList} from '../../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export const LearnScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const {t} = useTranslation();

  return (
    <Screen padded={false}>
      <FlatList
        contentContainerStyle={styles.list}
        data={ARTICLES}
        keyExtractor={(a) => a.id}
        ListHeaderComponent={
          <>
            <Card
              style={styles.banner}
              onPress={() => navigation.navigate('FoodPlan')}>
              <View style={styles.bannerRow}>
                <View style={styles.bannerIcon}>
                  <UtensilsCrossed color={colors.textInverse} size={24} />
                </View>
                <View style={styles.bannerText}>
                  <Text style={[typography.h3, styles.bannerTitle]}>
                    {t('learn.foodPlan')}
                  </Text>
                  <Text style={styles.bannerSub}>30 days · 6+ months</Text>
                </View>
                <ChevronRight color={colors.textInverse} size={22} />
              </View>
            </Card>
            <Text style={[typography.h3, styles.sectionTitle]}>
              {t('learn.encyclopedia')}
            </Text>
          </>
        }
        renderItem={({item}) => (
          <Card onPress={() => navigation.navigate('Article', {id: item.id})}>
            <Text style={typography.label}>{item.category}</Text>
            <Text style={[typography.h3, styles.cardTitle]}>{item.title}</Text>
            <Text style={typography.bodyMuted} numberOfLines={2}>
              {item.summary}
            </Text>
          </Card>
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  list: {padding: spacing.lg, paddingBottom: spacing.xxxl},
  banner: {backgroundColor: colors.primary},
  bannerRow: {flexDirection: 'row', alignItems: 'center'},
  bannerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  bannerText: {flex: 1},
  bannerTitle: {color: colors.textInverse},
  bannerSub: {color: colors.primaryLight, fontSize: 13},
  sectionTitle: {marginBottom: spacing.md, marginTop: spacing.sm},
  cardTitle: {marginVertical: 4},
});
