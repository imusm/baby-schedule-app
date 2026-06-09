/** Core domain models for Little Steps. */

export interface BabyProfile {
  id: string;
  name: string;
  birthDate: string; // ISO date
  sex?: 'male' | 'female' | 'other';
  photoUri?: string;
}

export type FeedingType = 'breast' | 'bottle' | 'solid';

export interface FeedingEntry {
  id: string;
  babyId: string;
  type: FeedingType;
  startTime: string; // ISO datetime
  durationMin?: number; // for breast
  amountMl?: number; // for bottle
  side?: 'left' | 'right' | 'both'; // for breast
  note?: string;
}

export interface SleepEntry {
  id: string;
  babyId: string;
  startTime: string; // ISO datetime
  endTime?: string; // ISO datetime, undefined while in progress
  note?: string;
}

export type DiaperType = 'wet' | 'dirty' | 'mixed' | 'dry';

export interface DiaperEntry {
  id: string;
  babyId: string;
  time: string; // ISO datetime
  type: DiaperType;
  note?: string;
}

export interface WeightEntry {
  id: string;
  babyId: string;
  date: string; // ISO date
  weightKg: number;
  heightCm?: number;
  note?: string;
}

export interface Article {
  id: string;
  category: string;
  title: string;
  summary: string;
  body: string;
}

export interface FoodPlanDay {
  day: number; // 1..30
  title: string;
  ingredients: string[];
  instructions: string;
  ageMonths: number;
}

export interface CommunityPost {
  id: string;
  author: string;
  avatarColor: string;
  createdAt: string; // ISO datetime
  body: string;
  likes: number;
  replies: number;
}
