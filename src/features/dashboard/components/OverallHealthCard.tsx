import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppCard } from '../../../shared/components/AppCard';
import { AppText } from '../../../shared/components/AppText';
import { DashboardStats } from '../types';

interface OverallHealthCardProps {
  stats: DashboardStats;
}

export function OverallHealthCard({ stats }: OverallHealthCardProps) {
  const getHealthColor = (percentage: number): string => {
    if (percentage >= 80) return '#4CAF50';
    if (percentage >= 50) return '#FF9800';
    return '#F44336';
  };

  const healthColor = getHealthColor(stats.overallHealthPercentage);

  return (
    <AppCard style={styles.container}>
      <View style={styles.content}>
        <AppText variant="h3" weight="semibold">Overall Health</AppText>
        <View style={[styles.percentageContainer, { borderColor: healthColor }]}>
          <AppText 
            variant="display" 
            weight="bold"
            style={[styles.percentage, { color: healthColor }]}
          >
            {stats.overallHealthPercentage}%
          </AppText>
        </View>
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <View style={[styles.dot, { backgroundColor: '#4CAF50' }]} />
            <AppText variant="body2">Healthy: {stats.healthyServices}</AppText>
          </View>
          <View style={styles.detailItem}>
            <View style={[styles.dot, { backgroundColor: '#F44336' }]} />
            <AppText variant="body2">Unhealthy: {stats.unhealthyServices}</AppText>
          </View>
        </View>
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
  },
  percentageContainer: {
    borderWidth: 3,
    borderRadius: 50,
    padding: 16,
    marginVertical: 16,
  },
  percentage: {
    fontSize: 48,
  },
  details: {
    width: '100%',
    marginTop: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
});
