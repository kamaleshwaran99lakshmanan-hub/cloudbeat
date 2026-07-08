import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppCard } from '../../../shared/components/AppCard';
import { AppText } from '../../../shared/components/AppText';
import { AppButton } from '../../../shared/components/AppButton';

interface EmptyDashboardProps {
  onAddService: () => void;
}

export function EmptyDashboard({ onAddService }: EmptyDashboardProps) {
  return (
    <AppCard style={styles.container}>
      <View style={styles.content}>
        <AppText variant="h5" weight="semibold">No Services Yet</AppText>
        <AppText variant="body1" color="muted" style={styles.description}>
          Add your first service to start monitoring and see dashboard statistics.
        </AppText>
        <AppButton 
          variant="primary" 
          onPress={onAddService}
          style={styles.button}
        >
          Add Service
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
  description: {
    textAlign: 'center',
    marginVertical: 16,
    paddingHorizontal: 24,
  },
  button: {
    marginTop: 8,
  },
});
