import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText, AppButton } from '../../../components';

interface ErrorHistoryProps {
  error?: string;
  onRetry?: () => void;
}

export function ErrorHistory({ error = 'Failed to load history', onRetry }: ErrorHistoryProps) {
  return (
    <View style={styles.container}>
      <AppText variant="h5" color="error">Error Loading History</AppText>
      <AppText variant="body" color="secondary" style={styles.message}>
        {error}
      </AppText>
      {onRetry && (
        <AppButton
          variant="primary"
          onPress={onRetry}
          title="Retry"
          style={styles.button}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  message: {
    marginTop: 8,
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
  },
});
