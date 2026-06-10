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

export const uid = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

interface AppState {
  // Onboarding / profile
  onboarded: boolean;
  language: string;
  babies: BabyProfile[];
  activeBabyId: string | null;

  // Tracker data (each entry carries its babyId)
  feedings: FeedingEntry[];
  sleeps: SleepEntry[];
  diapers: DiaperEntry[];
  weights: WeightEntry[];

  // Community
  posts: CommunityPost[];

  // Profile actions
  setLanguage: (lang: string) => void;
  addBaby: (baby: Omit<BabyProfile, 'id'>) => string;
  updateBaby: (baby: BabyProfile) => void;
  removeBaby: (id: string) => void;
  setActiveBaby: (id: string) => void;

  // Tracker actions
  addFeeding: (entry: Omit<FeedingEntry, 'id'>) => void;
  addSleep: (entry: Omit<SleepEntry, 'id'>) => void;
  addDiaper: (entry: Omit<DiaperEntry, 'id'>) => void;
  addWeight: (entry: Omit<WeightEntry, 'id'>) => void;
  removeEntry: (
    kind: 'feeding' | 'sleep' | 'diaper' | 'weight',
    id: string,
  ) => void;

  // Community actions
  addPost: (body: string) => void;
  likePost: (id: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      onboarded: false,
      language: 'en',
      babies: [],
      activeBabyId: null,
      feedings: [],
      sleeps: [],
      diapers: [],
      weights: [],
      posts: SAMPLE_POSTS,

      setLanguage: (language) => set({language}),

      addBaby: (baby) => {
        const id = uid();
        const newBaby: BabyProfile = {...baby, id};
        set((s) => ({
          babies: [...s.babies, newBaby],
          activeBabyId: id,
          onboarded: true,
        }));
        return id;
      },

      updateBaby: (baby) =>
        set((s) => ({
          babies: s.babies.map((b) => (b.id === baby.id ? baby : b)),
        })),

      removeBaby: (id) =>
        set((s) => {
          const babies = s.babies.filter((b) => b.id !== id);
          const activeBabyId =
            s.activeBabyId === id
              ? babies[0]?.id ?? null
              : s.activeBabyId;
          return {
            babies,
            activeBabyId,
            // drop the removed child's data
            feedings: s.feedings.filter((e) => e.babyId !== id),
            sleeps: s.sleeps.filter((e) => e.babyId !== id),
            diapers: s.diapers.filter((e) => e.babyId !== id),
            weights: s.weights.filter((e) => e.babyId !== id),
          };
        }),

      setActiveBaby: (id) => set({activeBabyId: id}),

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

      addPost: (body) => {
        const active = get().babies.find((b) => b.id === get().activeBabyId);
        set((s) => ({
          posts: [
            {
              id: uid(),
              author: active ? `${active.name}'s parent` : 'You',
              avatarColor: '#5FBFB3',
              createdAt: new Date().toISOString(),
              body,
              likes: 0,
              replies: 0,
            },
            ...s.posts,
          ],
        }));
      },
      likePost: (id) =>
        set((s) => ({
          posts: s.posts.map((p) =>
            p.id === id ? {...p, likes: p.likes + 1} : p,
          ),
        })),
    }),
    {
      name: 'little-steps-store',
      storage: createJSONStorage(() => AsyncStorage),
      version: 2,
      // Migrate v1 (single `baby`) → v2 (`babies` array + activeBabyId)
      migrate: (persisted: any, version) => {
        if (version < 2 && persisted) {
          const legacyBaby = persisted.baby as BabyProfile | null | undefined;
          persisted.babies = legacyBaby ? [legacyBaby] : [];
          persisted.activeBabyId = legacyBaby ? legacyBaby.id : null;
          delete persisted.baby;
        }
        return persisted;
      },
    },
  ),
);

/** Selector helper: the currently active baby (or null). */
export const useActiveBaby = (): BabyProfile | null =>
  useAppStore((s) => s.babies.find((b) => b.id === s.activeBabyId) ?? null);
