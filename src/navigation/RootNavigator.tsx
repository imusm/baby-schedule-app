import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';

import {RootStackParamList} from './types';
import {useAppStore} from '../store/useAppStore';
import {colors} from '../theme';
import {MainTabs} from './MainTabs';

import {WelcomeScreen} from '../screens/onboarding/WelcomeScreen';
import {BabyProfileScreen} from '../screens/onboarding/BabyProfileScreen';
import {SleepTrackerScreen} from '../screens/trackers/SleepTrackerScreen';
import {FeedingTrackerScreen} from '../screens/trackers/FeedingTrackerScreen';
import {DiaperTrackerScreen} from '../screens/trackers/DiaperTrackerScreen';
import {WeightTrackerScreen} from '../screens/trackers/WeightTrackerScreen';
import {ArticleScreen} from '../screens/learn/ArticleScreen';
import {FoodPlanScreen} from '../screens/learn/FoodPlanScreen';
import {FoodDayScreen} from '../screens/learn/FoodDayScreen';
import {PostDetailScreen} from '../screens/community/PostDetailScreen';
import {CreatePostScreen} from '../screens/community/CreatePostScreen';
import {AddChildScreen} from '../screens/profile/AddChildScreen';
import {SettingsScreen} from '../screens/profile/SettingsScreen';
import {LanguageScreen} from '../screens/profile/LanguageScreen';
import {RemindersScreen} from '../screens/profile/RemindersScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const onboarded = useAppStore((s) => s.onboarded);
  const {t} = useTranslation();

  const headerOptions = {
    headerStyle: {backgroundColor: colors.surface},
    headerTintColor: colors.textPrimary,
    headerTitleStyle: {fontWeight: '700' as const},
    headerShadowVisible: false,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={headerOptions}>
        {!onboarded ? (
          <Stack.Group screenOptions={{headerShown: false}}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="BabyProfile" component={BabyProfileScreen} />
          </Stack.Group>
        ) : (
          <>
            <Stack.Screen
              name="Main"
              component={MainTabs}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SleepTracker"
              component={SleepTrackerScreen}
              options={{title: t('trackers.sleep')}}
            />
            <Stack.Screen
              name="FeedingTracker"
              component={FeedingTrackerScreen}
              options={{title: t('trackers.feeding')}}
            />
            <Stack.Screen
              name="DiaperTracker"
              component={DiaperTrackerScreen}
              options={{title: t('trackers.diaper')}}
            />
            <Stack.Screen
              name="WeightTracker"
              component={WeightTrackerScreen}
              options={{title: t('trackers.weight')}}
            />
            <Stack.Screen
              name="Article"
              component={ArticleScreen}
              options={{title: ''}}
            />
            <Stack.Screen
              name="FoodPlan"
              component={FoodPlanScreen}
              options={{title: t('learn.foodPlan')}}
            />
            <Stack.Screen
              name="FoodDay"
              component={FoodDayScreen}
              options={{title: t('learn.foodPlan')}}
            />
            <Stack.Screen
              name="PostDetail"
              component={PostDetailScreen}
              options={{title: t('community.title')}}
            />
            <Stack.Screen
              name="CreatePost"
              component={CreatePostScreen}
              options={{title: t('community.newPost'), presentation: 'modal'}}
            />
            <Stack.Screen
              name="AddChild"
              component={AddChildScreen}
              options={{title: 'Add child'}}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{title: t('settings.title')}}
            />
            <Stack.Screen
              name="Language"
              component={LanguageScreen}
              options={{title: t('settings.language')}}
            />
            <Stack.Screen
              name="Reminders"
              component={RemindersScreen}
              options={{title: t('settings.reminders')}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
