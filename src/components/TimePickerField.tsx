import React, {useEffect, useState} from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {parseISO, setHours, setMinutes, format} from 'date-fns';
import {Clock} from 'lucide-react-native';

import {colors, radius, spacing, typography} from '../theme';

interface TimePickerFieldProps {
  label?: string;
  value?: string; // ISO datetime
  onChange: (iso: string) => void;
}

const HOURS = Array.from({length: 24}, (_, i) => i);
const MINUTES = Array.from({length: 12}, (_, i) => i * 5);

export const TimePickerField: React.FC<TimePickerFieldProps> = ({
  label,
  value,
  onChange,
}) => {
  const base = value ? parseISO(value) : new Date();
  const [open, setOpen] = useState(false);
  const [hour, setHour] = useState(base.getHours());
  const [minute, setMinute] = useState(
    Math.round(base.getMinutes() / 5) * 5 % 60,
  );

  useEffect(() => {
    if (open) {
      const d = value ? parseISO(value) : new Date();
      setHour(d.getHours());
      setMinute((Math.round(d.getMinutes() / 5) * 5) % 60);
    }
  }, [open, value]);

  const confirm = () => {
    const d = value ? parseISO(value) : new Date();
    const next = setMinutes(setHours(d, hour), minute);
    onChange(next.toISOString());
    setOpen(false);
  };

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <>
      {label ? <Text style={[typography.label, styles.label]}>{label}</Text> : null}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.field}
        onPress={() => setOpen(true)}>
        <Clock color={colors.primary} size={20} />
        <Text style={styles.fieldText}>
          {value ? format(parseISO(value), 'HH:mm') : '--:--'}
        </Text>
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
            <Text style={[typography.h3, styles.title]}>Select time</Text>
            <View style={styles.columns}>
              <View style={styles.col}>
                <Text style={styles.colLabel}>Hour</Text>
                <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                  {HOURS.map((h) => (
                    <TouchableOpacity
                      key={h}
                      style={[styles.item, hour === h && styles.itemActive]}
                      onPress={() => setHour(h)}>
                      <Text style={[styles.itemText, hour === h && styles.itemTextActive]}>
                        {pad(h)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              <Text style={styles.colon}>:</Text>
              <View style={styles.col}>
                <Text style={styles.colLabel}>Min</Text>
                <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                  {MINUTES.map((m) => (
                    <TouchableOpacity
                      key={m}
                      style={[styles.item, minute === m && styles.itemActive]}
                      onPress={() => setMinute(m)}>
                      <Text style={[styles.itemText, minute === m && styles.itemTextActive]}>
                        {pad(m)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
            <TouchableOpacity style={styles.doneBtn} onPress={confirm}>
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  label: {marginBottom: spacing.sm},
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    height: 52,
  },
  fieldText: {...typography.body, fontSize: 16},
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  card: {
    width: '80%',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  title: {textAlign: 'center', marginBottom: spacing.md},
  columns: {flexDirection: 'row', alignItems: 'center', justifyContent: 'center'},
  col: {alignItems: 'center'},
  colLabel: {...typography.caption, marginBottom: spacing.xs},
  scroll: {height: 160, width: 72},
  colon: {...typography.h1, marginHorizontal: spacing.md, marginTop: spacing.lg},
  item: {paddingVertical: spacing.sm, alignItems: 'center', borderRadius: radius.sm},
  itemActive: {backgroundColor: colors.primary},
  itemText: {...typography.h3, color: colors.textSecondary},
  itemTextActive: {color: colors.textInverse},
  doneBtn: {
    marginTop: spacing.lg,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneText: {...typography.button},
});
