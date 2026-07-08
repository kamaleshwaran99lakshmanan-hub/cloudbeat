import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '../../../shared/components/AppText';
import { DashboardStats } from '../types';

interface DashboardHeaderProps {
  stats: DashboardStats;
  onRefresh: () => void;
}

export function DashboardHeader({ stats, onRefresh }: DashboardHeaderProps) {
  return (
    <View style={styles.container}>
      <AppText variant="h2" weight="bold">Dashboard</AppText>
      <AppText variant="caption" color="muted">
        Last updated: {stats.lastUpdated.toLocaleTimeString()}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 24,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
});
