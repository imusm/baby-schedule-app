import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import {Screen, Card} from '../../components';
import {colors, spacing, typography} from '../../theme';
import {useAppStore} from '../../store/useAppStore';
import {timeAgo} from '../../utils/date';
import {RootStackParamList} from '../../navigation/types';

type Rt = RouteProp<RootStackParamList, 'PostDetail'>;

export const PostDetailScreen: React.FC = () => {
  const {params} = useRoute<Rt>();
  const {t} = useTranslation();
  const post = useAppStore((s) => s.posts.find((p) => p.id === params.id));

  if (!post) {
    return (
      <Screen>
        <Text style={typography.body}>Post not found.</Text>
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <Card>
        <View style={styles.head}>
          <View style={[styles.avatar, {backgroundColor: post.avatarColor}]}>
            <Text style={styles.avatarText}>{post.author[0]}</Text>
          </View>
          <View>
            <Text style={typography.label}>{post.author}</Text>
            <Text style={typography.caption}>{timeAgo(post.createdAt)}</Text>
          </View>
        </View>
        <Text style={[typography.body, styles.body]}>{post.body}</Text>
        <Text style={typography.caption}>
          {post.likes} {t('community.likes')} · {post.replies}{' '}
          {t('community.replies')}
        </Text>
      </Card>
    </Screen>
  );
};

const styles = StyleSheet.create({
  head: {flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md},
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  avatarText: {color: colors.textInverse, fontWeight: '700', fontSize: 18},
  body: {lineHeight: 24, marginBottom: spacing.md},
});
