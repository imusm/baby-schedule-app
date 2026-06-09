import {isToday, parseISO, formatDistanceToNowStrict} from 'date-fns';

export const todaysEntries = <T extends {startTime?: string; time?: string; date?: string}>(
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
