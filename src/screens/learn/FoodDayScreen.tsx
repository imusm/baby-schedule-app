import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Check} from 'lucide-react-native';

import {Screen, Card} from '../../components';
import {colors, spacing, typography} from '../../theme';
import {FOOD_PLAN} from '../../data/foodPlan';
import {RootStackParamList} from '../../navigation/types';

type Rt = RouteProp<RootStackParamList, 'FoodDay'>;

export const FoodDayScreen: React.FC = () => {
  const {params} = useRoute<Rt>();
  const {t} = useTranslation();
  const day = FOOD_PLAN.find((d) => d.day === params.day);

  if (!day) {
    return (
      <Screen>
        <Text style={typography.body}>Day not found.</Text>
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <Text style={typography.label}>
        {t('learn.day')} {day.day} · {day.ageMonths}+ months
      </Text>
      <Text style={[typography.h1, styles.title]}>{day.title}</Text>

      <Card>
        <Text style={[typography.h3, styles.cardHeading]}>Ingredients</Text>
        {day.ingredients.map((ing) => (
          <View key={ing} style={styles.ingredientRow}>
            <Check color={colors.primary} size={18} />
            <Text style={[typography.body, styles.ingredientText]}>{ing}</Text>
          </View>
        ))}
      </Card>

      <Card>
        <Text style={[typography.h3, styles.cardHeading]}>Instructions</Text>
        <Text style={[typography.body, styles.instructions]}>
          {day.instructions}
        </Text>
      </Card>
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: {marginTop: spacing.xs, marginBottom: spacing.lg},
  cardHeading: {marginBottom: spacing.sm},
  ingredientRow: {flexDirection: 'row', alignItems: 'center', marginBottom: 6},
  ingredientText: {marginLeft: spacing.sm},
  instructions: {lineHeight: 24},
});
