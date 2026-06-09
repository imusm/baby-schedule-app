import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  BabyProfile,
  CommunityPost,
  DiaperEntry,
  FeedingEntry,
  SleepEntry,
  WeightEntry,
} from '../types';
import {SAMPLE_POSTS} from '../data/community';

const uid = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

interface AppState {
  // Onboarding / profile
  onboarded: boolean;
  language: string;
  baby: BabyProfile | null;

  // Tracker data
  feedings: FeedingEntry[];
  sleeps: SleepEntry[];
  diapers: DiaperEntry[];
  weights: WeightEntry[];

  // Community
  posts: CommunityPost[];

  // Actions
  setLanguage: (lang: string) => void;
  completeOnboarding: (baby: BabyProfile) => void;
  setBaby: (baby: BabyProfile) => void;
  addPost: (body: string) => void;
  likePost: (id: string) => void;

  addFeeding: (entry: Omit<FeedingEntry, 'id'>) => void;
  addSleep: (entry: Omit<SleepEntry, 'id'>) => void;
  addDiaper: (entry: Omit<DiaperEntry, 'id'>) => void;
  addWeight: (entry: Omit<WeightEntry, 'id'>) => void;
  removeEntry: (
    kind: 'feeding' | 'sleep' | 'diaper' | 'weight',
    id: string,
  ) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      onboarded: false,
      language: 'en',
      baby: null,
      feedings: [],
      sleeps: [],
      diapers: [],
      weights: [],
      posts: SAMPLE_POSTS,

      setLanguage: (language) => set({language}),
      completeOnboarding: (baby) => set({baby, onboarded: true}),
      setBaby: (baby) => set({baby}),

      addPost: (body) =>
        set((s) => ({
          posts: [
            {
              id: uid(),
              author: s.baby ? `${s.baby.name}'s parent` : 'You',
              avatarColor: '#5FBFB3',
              createdAt: new Date().toISOString(),
              body,
              likes: 0,
              replies: 0,
            },
            ...s.posts,
          ],
        })),
      likePost: (id) =>
        set((s) => ({
          posts: s.posts.map((p) =>
            p.id === id ? {...p, likes: p.likes + 1} : p,
          ),
        })),

      addFeeding: (entry) =>
        set((s) => ({feedings: [{...entry, id: uid()}, ...s.feedings]})),
      addSleep: (entry) =>
        set((s) => ({sleeps: [{...entry, id: uid()}, ...s.sleeps]})),
      addDiaper: (entry) =>
        set((s) => ({diapers: [{...entry, id: uid()}, ...s.diapers]})),
      addWeight: (entry) =>
        set((s) => ({weights: [{...entry, id: uid()}, ...s.weights]})),

      removeEntry: (kind, id) =>
        set((s) => {
          switch (kind) {
            case 'feeding':
              return {feedings: s.feedings.filter((e) => e.id !== id)};
            case 'sleep':
              return {sleeps: s.sleeps.filter((e) => e.id !== id)};
            case 'diaper':
              return {diapers: s.diapers.filter((e) => e.id !== id)};
            case 'weight':
              return {weights: s.weights.filter((e) => e.id !== id)};
            default:
              return {};
          }
        }),
    }),
    {
      name: 'little-steps-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
