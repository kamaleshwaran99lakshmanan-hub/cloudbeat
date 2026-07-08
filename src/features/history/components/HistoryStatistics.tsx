import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppCard, AppText } from '../../../components';
import { HistoryStatistics } from '../types';

interface HistoryStatisticsProps {
  statistics: HistoryStatistics;
}

export function HistoryStatistics({ statistics }: HistoryStatisticsProps) {
  const StatItem = ({ label, value, color = 'primary' }: { label: string; value: string | number; color?: string }) => (
    <View style={styles.statItem}>
      <AppText variant="h4" color={color as any}>{value}</AppText>
      <AppText variant="caption" color="secondary">{label}</AppText>
    </View>
  );

  return (
    <AppCard style={styles.container}>
      <AppText variant="subtitle" style={styles.title}>Statistics</AppText>
      
      <View style={styles.grid}>
        <StatItem label="Total Checks" value={statistics.totalChecks} />
        <StatItem label="Healthy" value={statistics.healthyChecks} color="success" />
        <StatItem label="Failed" value={statistics.failedChecks} color="error" />
        <StatItem label="Success Rate" value={`${statistics.successRate}%`} color="success" />
        <StatItem label="Avg Response" value={`${statistics.averageResponseTime}ms`} />
        <StatItem label="Fastest" value={`${statistics.fastestResponse}ms`} />
        <StatItem label="Slowest" value={`${statistics.slowestResponse}ms`} />
        <StatItem label="Failure Rate" value={`${statistics.failureRate}%`} color="error" />
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  title: {
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statItem: {
    flex: 1,
    minWidth: '45%',
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center',
  },
});
