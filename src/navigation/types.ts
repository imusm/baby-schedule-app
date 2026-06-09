import {NavigatorScreenParams} from '@react-navigation/native';

export type MainTabParamList = {
  Home: undefined;
  Learn: undefined;
  Community: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  // Onboarding
  Welcome: undefined;
  BabyProfile: undefined;
  // Main app
  Main: NavigatorScreenParams<MainTabParamList>;
  // Trackers
  SleepTracker: undefined;
  FeedingTracker: undefined;
  DiaperTracker: undefined;
  WeightTracker: undefined;
  // Learn
  Article: {id: string};
  FoodPlan: undefined;
  FoodDay: {day: number};
  // Community
  PostDetail: {id: string};
  CreatePost: undefined;
  // Profile / settings
  Settings: undefined;
  Language: undefined;
  Reminders: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
