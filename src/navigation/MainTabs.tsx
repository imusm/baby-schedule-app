import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTranslation} from 'react-i18next';
import {Home, BookOpen, Users, User} from 'lucide-react-native';

import {MainTabParamList} from './types';
import {colors} from '../theme';
import {HomeScreen} from '../screens/home/HomeScreen';
import {LearnScreen} from '../screens/learn/LearnScreen';
import {CommunityScreen} from '../screens/community/CommunityScreen';
import {ProfileScreen} from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabs: React.FC = () => {
  const {t} = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 62,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {fontSize: 11, fontWeight: '600'},
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: t('tabs.home'),
          tabBarIcon: ({color, size}) => <Home color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Learn"
        component={LearnScreen}
        options={{
          title: t('tabs.learn'),
          tabBarIcon: ({color, size}) => <BookOpen color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          title: t('tabs.community'),
          tabBarIcon: ({color, size}) => <Users color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: t('tabs.profile'),
          tabBarIcon: ({color, size}) => <User color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};
