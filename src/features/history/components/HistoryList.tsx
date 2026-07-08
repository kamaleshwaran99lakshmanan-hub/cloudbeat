import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { MonitoringResult } from '../../../domain/models';
import { HistoryCard } from './HistoryCard';
import { AppText } from '../../../components';

interface HistoryListProps {
  results: MonitoringResult[];
  isLoading?: boolean;
  onRefresh?: () => void;
  onResultPress?: (result: MonitoringResult) => void;
  emptyComponent?: React.ReactNode;
}

export function HistoryList({
  results,
  isLoading = false,
  onRefresh,
  onResultPress,
  emptyComponent,
}: HistoryListProps) {
  const renderItem = ({ item }: { item: MonitoringResult }) => (
    <HistoryCard result={item} onPress={() => onResultPress?.(item)} />
  );

  const renderEmpty = () => {
    if (emptyComponent) {
      return emptyComponent;
    }
    return (
      <View style={styles.emptyContainer}>
        <AppText variant="body" color="secondary">
          No monitoring history found
        </AppText>
      </View>
    );
  };

  return (
    <FlatList
      data={results}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.timestamp}-${item.serviceId}-${index}`}
      refreshing={isLoading}
      onRefresh={onRefresh}
      ListEmptyComponent={renderEmpty}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
  },
});
