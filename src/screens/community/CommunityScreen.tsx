import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {Plus, Heart, MessageCircle} from 'lucide-react-native';

import {Screen, Card} from '../../components';
import {colors, radius, spacing, typography} from '../../theme';
import {useAppStore} from '../../store/useAppStore';
import {timeAgo} from '../../utils/date';
import {RootStackParamList} from '../../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export const CommunityScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const {t} = useTranslation();
  const posts = useAppStore((s) => s.posts);
  const likePost = useAppStore((s) => s.likePost);

  return (
    <Screen padded={false}>
      <FlatList
        contentContainerStyle={styles.list}
        data={posts}
        keyExtractor={(p) => p.id}
        renderItem={({item}) => (
          <Card onPress={() => navigation.navigate('PostDetail', {id: item.id})}>
            <View style={styles.head}>
              <View
                style={[styles.avatar, {backgroundColor: item.avatarColor}]}>
                <Text style={styles.avatarText}>{item.author[0]}</Text>
              </View>
              <View>
                <Text style={typography.label}>{item.author}</Text>
                <Text style={typography.caption}>{timeAgo(item.createdAt)}</Text>
              </View>
            </View>
            <Text style={[typography.body, styles.body]}>{item.body}</Text>
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.action}
                onPress={() => likePost(item.id)}>
                <Heart color={colors.feeding} size={18} />
                <Text style={styles.actionText}>{item.likes}</Text>
              </TouchableOpacity>
              <View style={styles.action}>
                <MessageCircle color={colors.textMuted} size={18} />
                <Text style={styles.actionText}>{item.replies}</Text>
              </View>
            </View>
          </Card>
        )}
      />
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('CreatePost')}>
        <Plus color={colors.textInverse} size={26} />
      </TouchableOpacity>
    </Screen>
  );
};

const styles = StyleSheet.create({
  list: {padding: spacing.lg, paddingBottom: 96},
  head: {flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm},
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  avatarText: {color: colors.textInverse, fontWeight: '700', fontSize: 16},
  body: {lineHeight: 22, marginBottom: spacing.md},
  actions: {flexDirection: 'row', gap: spacing.xl},
  action: {flexDirection: 'row', alignItems: 'center', gap: 6},
  actionText: {...typography.caption, color: colors.textSecondary},
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    width: 58,
    height: 58,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 3},
  },
});
