import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppCard } from '../../../shared/components/AppCard';
import { AppText } from '../../../shared/components/AppText';
import { DashboardStats } from '../types';

interface StatisticsCardsProps {
  stats: DashboardStats;
}

export function StatisticsCards({ stats }: StatisticsCardsProps) {
  return (
    <View style={styles.container}>
      <AppCard style={styles.card}>
        <AppText variant="caption" color="muted">Total Services</AppText>
        <AppText variant="h4" weight="bold">{stats.totalServices}</AppText>
      </AppCard>
      <AppCard style={styles.card}>
        <AppText variant="caption" color="muted">Avg Response</AppText>
        <AppText variant="h4" weight="bold">{stats.averageResponseTime}ms</AppText>
      </AppCard>
      <AppCard style={styles.card}>
        <AppText variant="caption" color="muted">Monitoring</AppText>
        <AppText variant="h4" weight="bold">Active</AppText>
      </AppCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  card: {
    flex: 1,
    marginHorizontal: 4,
    padding: 16,
    alignItems: 'center',
  },
});
