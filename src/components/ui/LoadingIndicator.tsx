import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/use-theme';

export interface LoadingIndicatorProps {
  fullscreen?: boolean;
  size?: 'small' | 'large';
  color?: string;
}

export function LoadingIndicator({
  fullscreen = false,
  size = 'large',
  color,
}: LoadingIndicatorProps) {
  const { colors } = useTheme();

  if (fullscreen) {
    return (
      <View style={[styles.fullscreenContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size={size} color={color || colors.primary} />
      </View>
    );
  }

  return <ActivityIndicator size={size} color={color || colors.primary} />;
}

const styles = StyleSheet.create({
  fullscreenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
