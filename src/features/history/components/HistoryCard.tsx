import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppCard, AppText, AppButton } from '../../../components';
import { MonitoringResult } from '../../../domain/models';

interface HistoryCardProps {
  result: MonitoringResult;
  onPress?: () => void;
}

export function HistoryCard({ result, onPress }: HistoryCardProps) {
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'HEALTHY':
        return '#4CAF50';
      case 'UNHEALTHY':
        return '#F44336';
      case 'WARNING':
        return '#FF9800';
      default:
        return '#9E9E9E';
    }
  };

  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <AppCard style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <AppText variant="subtitle" numberOfLines={1}>
          {result.serviceName}
        </AppText>
        <View 
          style={[
            styles.statusDot, 
            { backgroundColor: getStatusColor(result.status) }
          ]} 
        />
      </View>
      
      <View style={styles.content}>
        <View style={styles.row}>
          <AppText variant="caption" color="secondary">
            Time: {formatTimestamp(result.timestamp)}
          </AppText>
        </View>
        
        <View style={styles.row}>
          <AppText variant="caption" color="secondary">
            Response: {result.responseTime !== undefined ? `${result.responseTime}ms` : 'N/A'}
          </AppText>
          {result.httpStatus && (
            <AppText variant="caption" color="secondary">
              HTTP: {result.httpStatus}
            </AppText>
          )}
        </View>

        {result.errorMessage && (
          <View style={styles.errorContainer}>
            <AppText variant="caption" color="error" numberOfLines={2}>
              {result.errorMessage}
            </AppText>
          </View>
        )}

        {result.retryCount !== undefined && result.retryCount > 0 && (
          <View style={styles.retryContainer}>
            <AppText variant="caption" color="warning">
              Retries: {result.retryCount}
            </AppText>
          </View>
        )}
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  content: {
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorContainer: {
    marginTop: 4,
    padding: 6,
    backgroundColor: '#ffebee',
    borderRadius: 4,
  },
  retryContainer: {
    marginTop: 4,
    padding: 4,
    backgroundColor: '#fff3e0',
    borderRadius: 4,
  },
});
