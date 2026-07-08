import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { AppCard } from '../../../shared/components/AppCard';
import { AppText } from '../../../shared/components/AppText';
import { HealthHistory } from '../../../domain/entities/HealthHistory';
import { HealthCheck } from '../../../domain/entities/HealthCheck';

interface RecentChecksListProps {
  checks: HealthHistory[];
}

export function RecentChecksList({ checks }: RecentChecksListProps) {
  // Flatten all checks from all histories and get the most recent ones
  const allChecks: { history: HealthHistory; check: HealthCheck }[] = [];
  
  for (const history of checks) {
    if (history.latestCheck) {
      allChecks.push({ history, check: history.latestCheck });
    }
  }

  // Sort by timestamp descending
  allChecks.sort((a, b) => 
    new Date(b.check.timestamp).getTime() - new Date(a.check.timestamp).getTime()
  );

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'online':
        return '#4CAF50';
      case 'offline':
        return '#F44336';
      default:
        return '#FF9800';
    }
  };

  const renderCheck = ({ item }: { item: { history: HealthHistory; check: HealthCheck } }) => (
    <View style={styles.checkItem}>
      <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.check.status) }]} />
      <View style={styles.checkInfo}>
        <AppText variant="body2" weight="medium">Service: {item.history.serviceId}</AppText>
        <AppText variant="caption" color="muted">
          {item.check.responseTime.value}ms • {new Date(item.check.timestamp).toLocaleTimeString()}
        </AppText>
      </View>
      <AppText 
        variant="caption" 
        weight="semibold"
        style={{ color: getStatusColor(item.check.status) }}
      >
        {item.check.status.toUpperCase()}
      </AppText>
    </View>
  );

  if (allChecks.length === 0) {
    return (
      <AppCard style={styles.container}>
        <AppText variant="body1" color="muted">No recent checks available</AppText>
      </AppCard>
    );
  }

  return (
    <AppCard style={styles.container}>
      <AppText variant="h4" weight="semibold" style={styles.title}>Recent Checks</AppText>
      <FlatList
        data={allChecks}
        renderItem={renderCheck}
        keyExtractor={(item) => `${item.history.serviceId}-${item.check.timestamp}`}
        scrollEnabled={false}
      />
    </AppCard>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    marginTop: 0,
  },
  title: {
    marginBottom: 12,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },
  checkInfo: {
    flex: 1,
  },
});
