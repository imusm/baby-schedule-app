import {
  isToday,
  parseISO,
  formatDistanceToNowStrict,
  differenceInDays,
  differenceInMonths,
  differenceInWeeks,
  format,
} from 'date-fns';

export const todaysEntries = <
  T extends {startTime?: string; time?: string; date?: string},
>(
  entries: T[],
): T[] =>
  entries.filter((e) => {
    const iso = e.startTime ?? e.time ?? e.date;
    if (!iso) {
      return false;
    }
    try {
      return isToday(parseISO(iso));
    } catch {
      return false;
    }
  });

export const timeAgo = (iso: string): string => {
  try {
    return formatDistanceToNowStrict(parseISO(iso), {addSuffix: true});
  } catch {
    return '';
  }
};

export const formatTime = (iso?: string): string => {
  if (!iso) {
    return '--:--';
  }
  try {
    const d = parseISO(iso);
    return d.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  } catch {
    return '--:--';
  }
};

/** Human-friendly long date, e.g. "5 Mar 2026". */
export const formatDateLong = (iso?: string): string => {
  if (!iso) {
    return '';
  }
  try {
    return format(parseISO(iso), 'd MMM yyyy');
  } catch {
    return '';
  }
};

/** Friendly baby age, e.g. "3 months", "2 weeks", "5 days". */
export const formatAge = (birthIso?: string): string => {
  if (!birthIso) {
    return '';
  }
  try {
    const birth = parseISO(birthIso);
    const now = new Date();
    const months = differenceInMonths(now, birth);
    if (months >= 24) {
      return `${Math.floor(months / 12)} years`;
    }
    if (months >= 1) {
      return months === 1 ? '1 month' : `${months} months`;
    }
    const weeks = differenceInWeeks(now, birth);
    if (weeks >= 1) {
      return weeks === 1 ? '1 week' : `${weeks} weeks`;
    }
    const days = Math.max(0, differenceInDays(now, birth));
    return days === 1 ? '1 day' : `${days} days`;
  } catch {
    return '';
  }
};
