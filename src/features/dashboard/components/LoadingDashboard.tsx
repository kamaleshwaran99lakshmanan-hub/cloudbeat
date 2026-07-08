import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { AppCard } from '../../../shared/components/AppCard';
import { AppText } from '../../../shared/components/AppText';

export function LoadingDashboard() {
  return (
    <AppCard style={styles.container}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color="#1976D2" />
        <AppText variant="body1" color="muted" style={styles.text}>
          Loading dashboard...
        </AppText>
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
  text: {
    marginTop: 16,
  },
});
