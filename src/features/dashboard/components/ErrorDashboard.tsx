import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppCard } from '../../../shared/components/AppCard';
import { AppText } from '../../../shared/components/AppText';
import { AppButton } from '../../../shared/components/AppButton';

interface ErrorDashboardProps {
  error: string;
  onRetry: () => void;
}

export function ErrorDashboard({ error, onRetry }: ErrorDashboardProps) {
  return (
    <AppCard style={styles.container}>
      <View style={styles.content}>
        <AppText variant="h5" weight="semibold" color="error">Error Loading Dashboard</AppText>
        <AppText variant="body1" color="muted" style={styles.errorText}>
          {error}
        </AppText>
        <AppButton 
          variant="primary" 
          onPress={onRetry}
          style={styles.button}
        >
          Retry
        </AppButton>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  content: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  errorText: {
    textAlign: 'center',
    marginVertical: 16,
    paddingHorizontal: 24,
  },
  button: {
    marginTop: 8,
  },
});
