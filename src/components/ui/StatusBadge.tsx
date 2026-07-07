import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/use-theme';
import { AppText } from './AppText';
import { radius } from '../../theme/radius';
import { spacing } from '../../theme/spacing';

export type StatusType = 'healthy' | 'warning' | 'error' | 'unknown';

export interface StatusBadgeProps {
  status: StatusType;
  label?: string;
}

const statusConfig: Record<StatusType, { color: string; label: string }> = {
  healthy: { color: '#34C759', label: 'Healthy' },
  warning: { color: '#FF9500', label: 'Warning' },
  error: { color: '#FF3B30', label: 'Error' },
  unknown: { color: '#8E8E93', label: 'Unknown' },
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const { colors } = useTheme();
  const config = statusConfig[status];
  const displayLabel = label ?? config.label;

  return (
    <View style={[styles.container, { backgroundColor: config.color }]}>
      <AppText variant="caption" style={styles.text}>
        {displayLabel}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing[12],
    paddingVertical: spacing[4],
    borderRadius: radius.full,
    alignSelf: 'flex-start',
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
