import {CommunityPost} from '../types';
import {colors} from '../theme';

export const SAMPLE_POSTS: CommunityPost[] = [
  {
    id: 'p1',
    author: 'Aisha',
    avatarColor: colors.feeding,
    createdAt: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
    body: 'Any tips for getting a 4-month-old to nap longer than 30 minutes? She fights every nap 😅',
    likes: 12,
    replies: 5,
  },
  {
    id: 'p2',
    author: 'Maria',
    avatarColor: colors.sleep,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    body: 'Started solids this week with mashed banana and he LOVED it. The face he made on the first bite though 🤣',
    likes: 28,
    replies: 9,
  },
  {
    id: 'p3',
    author: 'Priya',
    avatarColor: colors.accent,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    body: 'Reminder to all the new moms here: you are doing an amazing job. The hard days do not last forever. ❤️',
    likes: 64,
    replies: 14,
  },
];
