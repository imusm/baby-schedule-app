import React, {useEffect, useState} from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Trash2} from 'lucide-react-native';

import {colors, radius, spacing, typography} from '../theme';
import {DatePickerField} from './DatePickerField';
import {TimePickerField} from './TimePickerField';
import {useAppStore} from '../store/useAppStore';
import {
  DiaperEntry,
  FeedingEntry,
  SleepEntry,
  WeightEntry,
} from '../types';

type Kind = 'feeding' | 'sleep' | 'diaper' | 'weight';
type AnyEntry = FeedingEntry | SleepEntry | DiaperEntry | WeightEntry;

interface EntryEditorModalProps {
  visible: boolean;
  kind: Kind;
  entry: AnyEntry | null;
  onClose: () => void;
}

const FEEDING_TYPES = ['breast', 'bottle', 'solid'] as const;
const DIAPER_TYPES = ['wet', 'dirty', 'mixed'] as const;

export const EntryEditorModal: React.FC<EntryEditorModalProps> = ({
  visible,
  kind,
  entry,
  onClose,
}) => {
  const updateEntry = useAppStore((s) => s.updateEntry);
  const removeEntry = useAppStore((s) => s.removeEntry);

  const [timeIso, setTimeIso] = useState<string>(new Date().toISOString());
  const [endIso, setEndIso] = useState<string | undefined>();
  const [type, setType] = useState<string>('');
  const [weightStr, setWeightStr] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');

  useEffect(() => {
    if (!entry) {
      return;
    }
    if (kind === 'feeding') {
      const e = entry as FeedingEntry;
      setTimeIso(e.startTime);
      setType(e.type);
    } else if (kind === 'sleep') {
      const e = entry as SleepEntry;
      setTimeIso(e.startTime);
      setEndIso(e.endTime);
    } else if (kind === 'diaper') {
      const e = entry as DiaperEntry;
      setTimeIso(e.time);
      setType(e.type);
    } else if (kind === 'weight') {
      const e = entry as WeightEntry;
      setWeightStr(String(e.weightKg));
      setDateStr(e.date);
    }
  }, [entry, kind, visible]);

  if (!entry) {
    return null;
  }

  const save = () => {
    if (kind === 'feeding') {
      updateEntry(kind, entry.id, {startTime: timeIso, type: type as any});
    } else if (kind === 'sleep') {
      updateEntry(kind, entry.id, {startTime: timeIso, endTime: endIso});
    } else if (kind === 'diaper') {
      updateEntry(kind, entry.id, {time: timeIso, type: type as any});
    } else if (kind === 'weight') {
      const kg = parseFloat(weightStr.replace(',', '.'));
      if (!Number.isNaN(kg) && kg > 0) {
        updateEntry(kind, entry.id, {weightKg: kg, date: dateStr});
      }
    }
    onClose();
  };

  const del = () => {
    removeEntry(kind, entry.id);
    onClose();
  };

  const chips = kind === 'feeding' ? FEEDING_TYPES : DIAPER_TYPES;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          <View style={styles.handle} />
          <View style={styles.headerRow}>
            <Text style={typography.h3}>Edit entry</Text>
            <TouchableOpacity onPress={del} hitSlop={10}>
              <Trash2 color={colors.danger} size={22} />
            </TouchableOpacity>
          </View>

          {(kind === 'feeding' || kind === 'diaper') && (
            <>
              <Text style={[typography.label, styles.gap]}>Type</Text>
              <View style={styles.chipRow}>
                {chips.map((c) => (
                  <TouchableOpacity
                    key={c}
                    style={[styles.chip, type === c && styles.chipActive]}
                    onPress={() => setType(c)}>
                    <Text style={[styles.chipText, type === c && styles.chipTextActive]}>
                      {c[0].toUpperCase() + c.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.gap} />
              <DatePickerField label="Date" value={timeIso.slice(0, 10)} onChange={(d) =>
                setTimeIso(`${d}T${timeIso.slice(11)}`)} />
              <View style={styles.gap} />
              <TimePickerField label="Time" value={timeIso} onChange={setTimeIso} />
            </>
          )}

          {kind === 'sleep' && (
            <>
              <View style={styles.gap} />
              <DatePickerField label="Date" value={timeIso.slice(0, 10)} onChange={(d) =>
                setTimeIso(`${d}T${timeIso.slice(11)}`)} />
              <View style={styles.gap} />
              <TimePickerField label="Start time" value={timeIso} onChange={setTimeIso} />
              <View style={styles.gap} />
              <TimePickerField
                label="End time"
                value={endIso}
                onChange={setEndIso}
              />
            </>
          )}

          {kind === 'weight' && (
            <>
              <Text style={[typography.label, styles.gap]}>Weight (kg)</Text>
              <TextInput
                style={styles.input}
                value={weightStr}
                onChangeText={setWeightStr}
                keyboardType="decimal-pad"
                placeholder="e.g. 5.2"
                placeholderTextColor={colors.textMuted}
              />
              <View style={styles.gap} />
              <DatePickerField label="Date" value={dateStr} onChange={setDateStr} />
            </>
          )}

          <TouchableOpacity style={styles.saveBtn} onPress={save}>
            <Text style={styles.saveText}>Save changes</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {flex: 1, backgroundColor: colors.overlay, justifyContent: 'flex-end'},
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  gap: {marginTop: spacing.md},
  chipRow: {flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm},
  chip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  chipActive: {borderColor: colors.primary, backgroundColor: colors.primaryLight},
  chipText: {...typography.label, color: colors.textSecondary},
  chipTextActive: {color: colors.primaryDark},
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    height: 52,
    marginTop: spacing.sm,
    color: colors.textPrimary,
    fontSize: 16,
  },
  saveBtn: {
    marginTop: spacing.xl,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveText: {...typography.button},
});
