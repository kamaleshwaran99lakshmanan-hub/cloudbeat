import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText, AppButton } from '../../../components';

interface EmptyHistoryProps {
  onRefresh?: () => void;
}

export function EmptyHistory({ onRefresh }: EmptyHistoryProps) {
  return (
    <View style={styles.container}>
      <AppText variant="h5" color="secondary">No History Available</AppText>
      <AppText variant="body" color="secondary" style={styles.description}>
        Monitoring history will appear here once services are checked.
      </AppText>
      {onRefresh && (
        <AppButton
          variant="outline"
          onPress={onRefresh}
          title="Refresh"
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
  description: {
    marginTop: 8,
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
  },
});
