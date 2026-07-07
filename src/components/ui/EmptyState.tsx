import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/use-theme';
import { AppText } from './AppText';
import { AppButton, type ButtonVariant } from './AppButton';
import { spacing } from '../../theme/spacing';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <AppText variant="title" style={styles.title}>
        {title}
      </AppText>
      {description && (
        <AppText variant="body" style={[styles.description, { color: colors.textSecondary }]}>
          {description}
        </AppText>
      )}
      {actionLabel && onAction && (
        <View style={styles.actionContainer}>
          <AppButton title={actionLabel} onPress={onAction} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[24],
  },
  iconContainer: {
    marginBottom: spacing[24],
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing[8],
  },
  description: {
    textAlign: 'center',
    marginBottom: spacing[24],
    maxWidth: 300,
  },
  actionContainer: {
    marginTop: spacing[16],
  },
});
