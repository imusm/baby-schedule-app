import notifee, {
  AndroidImportance,
  AuthorizationStatus,
  RepeatFrequency,
  TriggerType,
  TimestampTrigger,
} from '@notifee/react-native';

const CHANNEL_ID = 'reminders';

interface ReminderDef {
  title: string;
  body: string;
  hour: number;
  minute: number;
  weekly?: boolean;
}

/** Default schedule for each reminder type. */
export const REMINDER_DEFS: Record<string, ReminderDef> = {
  feeding: {
    title: 'Feeding reminder',
    body: "Time to check in on your baby's next feed 🍼",
    hour: 12,
    minute: 0,
  },
  sleep: {
    title: 'Sleep reminder',
    body: 'A good moment to start winding down for a nap 😴',
    hour: 13,
    minute: 0,
  },
  diaper: {
    title: 'Diaper check',
    body: 'Time for a quick diaper check 👶',
    hour: 10,
    minute: 0,
  },
  weight: {
    title: 'Weekly weigh-in',
    body: "Time to log this week's weight ⚖️",
    hour: 9,
    minute: 0,
    weekly: true,
  },
};

/** Ask the OS for notification permission. Returns true if granted. */
export async function ensurePermission(): Promise<boolean> {
  const settings = await notifee.requestPermission();
  return (
    settings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
    settings.authorizationStatus === AuthorizationStatus.PROVISIONAL
  );
}

async function ensureChannel(): Promise<void> {
  await notifee.createChannel({
    id: CHANNEL_ID,
    name: 'Reminders',
    importance: AndroidImportance.DEFAULT,
  });
}

/** Next future occurrence of the given local time. */
function nextTimestamp(hour: number, minute: number): number {
  const next = new Date();
  next.setHours(hour, minute, 0, 0);
  if (next.getTime() <= Date.now()) {
    next.setDate(next.getDate() + 1);
  }
  return next.getTime();
}

/** Schedule (or replace) a repeating reminder of the given type. */
export async function scheduleReminder(key: string): Promise<void> {
  const def = REMINDER_DEFS[key];
  if (!def) {
    return;
  }
  await ensureChannel();

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: nextTimestamp(def.hour, def.minute),
    repeatFrequency: def.weekly ? RepeatFrequency.WEEKLY : RepeatFrequency.DAILY,
  };

  await notifee.createTriggerNotification(
    {
      id: `reminder-${key}`,
      title: def.title,
      body: def.body,
      android: {
        channelId: CHANNEL_ID,
        pressAction: {id: 'default'},
        smallIcon: 'ic_launcher',
      },
    },
    trigger,
  );
}

/** Cancel a previously scheduled reminder. */
export async function cancelReminder(key: string): Promise<void> {
  await notifee.cancelTriggerNotification(`reminder-${key}`);
}
