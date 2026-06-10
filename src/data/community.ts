import {CommunityPost} from '../types';
import {colors} from '../theme';

const minsAgo = (m: number) => new Date(Date.now() - 1000 * 60 * m).toISOString();

export const SAMPLE_POSTS: CommunityPost[] = [
  {
    id: 'p1',
    author: 'Aisha',
    avatarColor: colors.feeding,
    createdAt: minsAgo(42),
    body: 'Any tips for getting a 4-month-old to nap longer than 30 minutes? She fights every nap 😅',
    likes: 12,
    replies: 5,
  },
  {
    id: 'p2',
    author: 'Maria',
    avatarColor: colors.sleep,
    createdAt: minsAgo(60 * 3),
    body: 'Started solids this week with mashed banana and he LOVED it. The face he made on the first bite though 🤣',
    likes: 28,
    replies: 9,
  },
  {
    id: 'p3',
    author: 'Priya',
    avatarColor: colors.accent,
    createdAt: minsAgo(60 * 26),
    body: 'Reminder to all the new moms here: you are doing an amazing job. The hard days do not last forever. ❤️',
    likes: 64,
    replies: 14,
  },
  {
    id: 'p4',
    author: 'Lena',
    avatarColor: colors.primary,
    createdAt: minsAgo(60 * 5),
    body: 'Teething has entered the chat 😭 the chilled washcloth tip from the encyclopedia actually helped a lot. Sharing in case it helps someone!',
    likes: 19,
    replies: 7,
  },
  {
    id: 'p5',
    author: 'Sofia',
    avatarColor: colors.diaper,
    createdAt: minsAgo(60 * 9),
    body: 'We finally hit a 5-hour stretch last night! Tracking sleep here really helped me spot her patterns. Hang in there if you are in the newborn fog.',
    likes: 41,
    replies: 6,
  },
  {
    id: 'p6',
    author: 'Hana',
    avatarColor: colors.weight,
    createdAt: minsAgo(60 * 48),
    body: 'Pediatrician said his weight is right on track 🎉 Was so anxious about it. The growth chart in the app made the appointment so much easier.',
    likes: 33,
    replies: 4,
  },
];
