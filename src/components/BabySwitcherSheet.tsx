import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Check, Plus} from 'lucide-react-native';

import {colors, radius, spacing, typography} from '../theme';
import {useAppStore} from '../store/useAppStore';
import {formatAge} from '../utils/date';

const AVATAR_COLORS = [
  colors.primary,
  colors.feeding,
  colors.sleep,
  colors.accent,
  colors.diaper,
];

interface BabySwitcherSheetProps {
  visible: boolean;
  onClose: () => void;
  onAddChild: () => void;
}

export const BabySwitcherSheet: React.FC<BabySwitcherSheetProps> = ({
  visible,
  onClose,
  onAddChild,
}) => {
  const babies = useAppStore((s) => s.babies);
  const activeBabyId = useAppStore((s) => s.activeBabyId);
  const setActiveBaby = useAppStore((s) => s.setActiveBaby);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          <View style={styles.handle} />
          <Text style={[typography.h3, styles.title]}>Children</Text>

          {babies.map((baby, i) => {
            const active = baby.id === activeBabyId;
            return (
              <TouchableOpacity
                key={baby.id}
                activeOpacity={0.85}
                style={[styles.row, active && styles.rowActive]}
                onPress={() => {
                  setActiveBaby(baby.id);
                  onClose();
                }}>
                <View
                  style={[
                    styles.avatar,
                    {backgroundColor: AVATAR_COLORS[i % AVATAR_COLORS.length]},
                  ]}>
                  <Text style={styles.avatarText}>
                    {baby.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View style={styles.info}>
                  <Text style={typography.h3}>{baby.name}</Text>
                  <Text style={typography.caption}>{formatAge(baby.birthDate)}</Text>
                </View>
                {active ? <Check color={colors.primary} size={22} /> : null}
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.addRow}
            onPress={() => {
              onClose();
              onAddChild();
            }}>
            <View style={styles.addIcon}>
              <Plus color={colors.primary} size={22} />
            </View>
            <Text style={[typography.body, styles.addText]}>Add child</Text>
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
  title: {marginBottom: spacing.md},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.md,
  },
  rowActive: {backgroundColor: colors.primaryLight},
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarText: {color: colors.textInverse, fontWeight: '700', fontSize: 18},
  info: {flex: 1},
  addRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    marginTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  addIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  addText: {fontWeight: '600', color: colors.primaryDark},
});
