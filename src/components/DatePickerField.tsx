import React, {useEffect, useState} from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  addMonths,
  subMonths,
  addYears,
  subYears,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isAfter,
  format,
  parseISO,
} from 'date-fns';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react-native';

import {colors, radius, spacing, typography} from '../theme';
import {formatDateLong} from '../utils/date';

interface DatePickerFieldProps {
  label?: string;
  value?: string; // ISO 'yyyy-MM-dd'
  onChange: (iso: string) => void;
  placeholder?: string;
  maximumDate?: Date;
}

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export const DatePickerField: React.FC<DatePickerFieldProps> = ({
  label,
  value,
  onChange,
  placeholder = 'Select date',
  maximumDate = new Date(),
}) => {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState<Date>(
    value ? parseISO(value) : new Date(),
  );

  useEffect(() => {
    if (open) {
      setViewDate(value ? parseISO(value) : new Date());
    }
  }, [open, value]);

  const monthStart = startOfMonth(viewDate);
  const gridStart = startOfWeek(monthStart);
  const gridEnd = endOfWeek(endOfMonth(viewDate));
  const days = eachDayOfInterval({start: gridStart, end: gridEnd});
  const selected = value ? parseISO(value) : null;

  const pick = (day: Date) => {
    onChange(format(day, 'yyyy-MM-dd'));
    setOpen(false);
  };

  return (
    <>
      {label ? <Text style={[typography.label, styles.label]}>{label}</Text> : null}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.field}
        onPress={() => setOpen(true)}>
        <Calendar color={colors.primary} size={20} />
        <Text
          style={[
            styles.fieldText,
            !value && {color: colors.textMuted},
          ]}>
          {value ? formatDateLong(value) : placeholder}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setViewDate(subYears(viewDate, 1))}>
                <ChevronsLeft color={colors.textSecondary} size={22} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setViewDate(subMonths(viewDate, 1))}>
                <ChevronLeft color={colors.textSecondary} size={22} />
              </TouchableOpacity>
              <Text style={styles.monthLabel}>{format(viewDate, 'MMMM yyyy')}</Text>
              <TouchableOpacity onPress={() => setViewDate(addMonths(viewDate, 1))}>
                <ChevronRight color={colors.textSecondary} size={22} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setViewDate(addYears(viewDate, 1))}>
                <ChevronsRight color={colors.textSecondary} size={22} />
              </TouchableOpacity>
            </View>

            {/* Weekday row */}
            <View style={styles.weekRow}>
              {WEEKDAYS.map((d, i) => (
                <Text key={i} style={styles.weekday}>
                  {d}
                </Text>
              ))}
            </View>

            {/* Day grid */}
            <View style={styles.grid}>
              {days.map((day) => {
                const inMonth = isSameMonth(day, viewDate);
                const isSelected = selected && isSameDay(day, selected);
                const disabled = isAfter(day, maximumDate);
                return (
                  <TouchableOpacity
                    key={day.toISOString()}
                    disabled={disabled}
                    style={styles.cell}
                    onPress={() => pick(day)}>
                    <View
                      style={[
                        styles.dayCircle,
                        isSelected && styles.daySelected,
                      ]}>
                      <Text
                        style={[
                          styles.dayText,
                          !inMonth && styles.dayOutside,
                          disabled && styles.dayDisabled,
                          isSelected && styles.daySelectedText,
                        ]}>
                        {format(day, 'd')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity
              style={styles.cancel}
              onPress={() => setOpen(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
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
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  monthLabel: {...typography.h3, flex: 1, textAlign: 'center'},
  weekRow: {flexDirection: 'row', marginBottom: spacing.xs},
  weekday: {
    flex: 1,
    textAlign: 'center',
    ...typography.caption,
    fontWeight: '600',
  },
  grid: {flexDirection: 'row', flexWrap: 'wrap'},
  cell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  daySelected: {backgroundColor: colors.primary},
  dayText: {...typography.body, fontSize: 15},
  dayOutside: {color: colors.textMuted},
  dayDisabled: {color: colors.border},
  daySelectedText: {color: colors.textInverse, fontWeight: '700'},
  cancel: {alignItems: 'center', paddingVertical: spacing.md, marginTop: spacing.sm},
  cancelText: {...typography.button, color: colors.textSecondary},
});
