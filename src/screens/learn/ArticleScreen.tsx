import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';

import {Screen} from '../../components';
import {spacing, typography} from '../../theme';
import {ARTICLES} from '../../data/articles';
import {RootStackParamList} from '../../navigation/types';

type Rt = RouteProp<RootStackParamList, 'Article'>;

export const ArticleScreen: React.FC = () => {
  const {params} = useRoute<Rt>();
  const article = ARTICLES.find((a) => a.id === params.id);

  if (!article) {
    return (
      <Screen>
        <Text style={typography.body}>Article not found.</Text>
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <Text style={typography.label}>{article.category}</Text>
      <Text style={[typography.h1, styles.title]}>{article.title}</Text>
      <Text style={[typography.body, styles.body]}>{article.body}</Text>
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: {marginTop: spacing.xs, marginBottom: spacing.lg},
  body: {lineHeight: 24},
});
