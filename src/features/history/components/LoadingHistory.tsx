import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { AppText } from '../../../components';

interface LoadingHistoryProps {
  message?: string;
}

export function LoadingHistory({ message = 'Loading history...' }: LoadingHistoryProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#1976D2" />
      <AppText variant="body" color="secondary" style={styles.message}>
        {message}
      </AppText>
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
    marginTop: 16,
  },
});
