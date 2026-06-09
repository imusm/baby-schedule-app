import React, {useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import {Screen, PrimaryButton} from '../../components';
import {colors, radius, spacing} from '../../theme';
import {useAppStore} from '../../store/useAppStore';

export const CreatePostScreen: React.FC = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const addPost = useAppStore((s) => s.addPost);
  const [body, setBody] = useState('');

  const submit = () => {
    if (!body.trim()) {
      return;
    }
    addPost(body.trim());
    navigation.goBack();
  };

  return (
    <Screen>
      <TextInput
        style={styles.input}
        value={body}
        onChangeText={setBody}
        placeholder={t('community.writeSomething')}
        placeholderTextColor={colors.textMuted}
        multiline
        autoFocus
        textAlignVertical="top"
      />
      <PrimaryButton
        title={t('community.post')}
        onPress={submit}
        disabled={!body.trim()}
        style={styles.btn}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.lg,
    minHeight: 160,
    marginTop: spacing.lg,
    color: colors.textPrimary,
    fontSize: 16,
    lineHeight: 22,
  },
  btn: {marginTop: spacing.lg},
});
