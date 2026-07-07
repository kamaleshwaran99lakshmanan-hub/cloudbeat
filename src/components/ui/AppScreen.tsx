import React from 'react';
import { View, type ViewProps, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/use-theme';

export interface AppScreenProps extends ViewProps {
  children: React.ReactNode;
}

export function AppScreen({ style, children, ...props }: AppScreenProps) {
  const { colors } = useTheme();

  return (
    <SafeAreaView {...props} style={[styles.container, { backgroundColor: colors.background }, style]}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
