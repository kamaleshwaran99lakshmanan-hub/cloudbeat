import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { AppScreen, AppText, AppCard, StatusBadge } from '../../../components';
import { HistoryDetailsViewModel } from '../viewmodels/HistoryDetailsViewModel';
import { useHistory } from '../hooks/useHistory';

interface HistoryDetailsScreenProps {
  viewModel: HistoryDetailsViewModel;
  onBack?: () => void;
}

export function HistoryDetailsScreen({ viewModel, onBack }: HistoryDetailsScreenProps) {
  const state = viewModel.getState();
  const result = state.selectedResult;

  if (!result) {
    return (
      <AppScreen title="History Details" onBack={onBack}>
        <AppText>No result selected</AppText>
      </AppScreen>
    );
  }

  const formatTimestamp = (timestamp: string): string => {
    return new Date(timestamp).toLocaleString();
  };

  const getStatusLabel = (status: string): string => {
    return status.charAt(0) + status.slice(1).toLowerCase();
  };

  return (
    <AppScreen title="Check Details" onBack={onBack}>
      <ScrollView style={styles.container}>
        <AppCard style={styles.card}>
          <AppText variant="subtitle">{result.serviceName}</AppText>
          <StatusBadge status={result.status} />
        </AppCard>

        <AppCard style={styles.card}>
          <AppText variant="body" color="secondary">Timestamp</AppText>
          <AppText variant="body">{formatTimestamp(result.timestamp)}</AppText>
        </AppCard>

        <AppCard style={styles.card}>
          <AppText variant="body" color="secondary">Response Time</AppText>
          <AppText variant="h4">
            {result.responseTime !== undefined ? `${result.responseTime}ms` : 'N/A'}
          </AppText>
        </AppCard>

        {result.httpStatus && (
          <AppCard style={styles.card}>
            <AppText variant="body" color="secondary">HTTP Status</AppText>
            <AppText variant="h4">{result.httpStatus}</AppText>
          </AppCard>
        )}

        {result.retryCount !== undefined && (
          <AppCard style={styles.card}>
            <AppText variant="body" color="secondary">Retry Count</AppText>
            <AppText variant="h4">{result.retryCount}</AppText>
          </AppCard>
        )}

        {result.errorMessage && (
          <AppCard style={[styles.card, styles.errorCard]}>
            <AppText variant="body" color="error">Error Message</AppText>
            <AppText variant="body">{result.errorMessage}</AppText>
          </AppCard>
        )}

        {result.metadata && Object.keys(result.metadata).length > 0 && (
          <AppCard style={styles.card}>
            <AppText variant="body" color="secondary">Metadata</AppText>
            {Object.entries(result.metadata).map(([key, value]) => (
              <View key={key} style={styles.metadataRow}>
                <AppText variant="caption" color="secondary">{key}:</AppText>
                <AppText variant="caption">{String(value)}</AppText>
              </View>
            ))}
          </AppCard>
        )}
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 12,
  },
  errorCard: {
    backgroundColor: '#ffebee',
  },
  metadataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});
