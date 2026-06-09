import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';

import {Screen, Card} from '../../components';
import {colors, radius, spacing, typography} from '../../theme';
import {FOOD_PLAN} from '../../data/foodPlan';
import {RootStackParamList} from '../../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export const FoodPlanScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const {t} = useTranslation();

  return (
    <Screen padded={false}>
      <FlatList
        contentContainerStyle={styles.list}
        data={FOOD_PLAN}
        keyExtractor={(d) => String(d.day)}
        renderItem={({item}) => (
          <Card onPress={() => navigation.navigate('FoodDay', {day: item.day})}>
            <View style={styles.row}>
              <View style={styles.dayBadge}>
                <Text style={styles.dayNum}>{item.day}</Text>
              </View>
              <View style={styles.info}>
                <Text style={typography.caption}>
                  {t('learn.day')} {item.day}
                </Text>
                <Text style={typography.h3}>{item.title}</Text>
              </View>
            </View>
          </Card>
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  list: {padding: spacing.lg, paddingBottom: spacing.xxxl},
  row: {flexDirection: 'row', alignItems: 'center'},
  dayBadge: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.secondaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  dayNum: {fontWeight: '700', color: colors.secondary, fontSize: 18},
  info: {flex: 1},
});
