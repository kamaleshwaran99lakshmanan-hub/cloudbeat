import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { AppScreen, AppText, AppButton } from '../../../components';
import { HistoryViewModel } from '../viewmodels/HistoryViewModel';
import { useHistory } from '../hooks/useHistory';
import {
  HistoryList,
  HistoryStatistics,
  HistoryFilter,
  HistorySearchBar,
  EmptyHistory,
  LoadingHistory,
  ErrorHistory,
} from '../components';
import { MonitoringResult } from '../../../domain/models';

interface HistoryScreenProps {
  viewModel: HistoryViewModel;
  onNavigateToDetails?: (result: MonitoringResult) => void;
}

export function HistoryScreen({ viewModel, onNavigateToDetails }: HistoryScreenProps) {
  const {
    filteredHistory,
    isLoading,
    error,
    filterState,
    statistics,
    loadHistory,
    updateFilter,
    refresh,
  } = useHistory(viewModel);

  useEffect(() => {
    loadHistory();
  }, []);

  const handleResultPress = (result: MonitoringResult) => {
    onNavigateToDetails?.(result);
  };

  const renderContent = () => {
    if (isLoading && filteredHistory.length === 0) {
      return <LoadingHistory />;
    }

    if (error && filteredHistory.length === 0) {
      return <ErrorHistory error={error} onRetry={refresh} />;
    }

    if (filteredHistory.length === 0) {
      return <EmptyHistory onRefresh={refresh} />;
    }

    return (
      <>
        <HistoryStatistics statistics={statistics} />
        
        <HistorySearchBar
          value={filterState.searchQuery}
          onChange={(text) => updateFilter('searchQuery', text)}
        />
        
        <HistoryFilter
          filterState={filterState}
          onStatusChange={(status) => updateFilter('status', status)}
          onDateRangeChange={(range) => updateFilter('dateRange', range)}
          onSortChange={(sort) => updateFilter('sortBy', sort)}
        />
        
        <HistoryList
          results={filteredHistory}
          isLoading={isLoading}
          onRefresh={refresh}
          onResultPress={handleResultPress}
        />
      </>
    );
  };

  return (
    <AppScreen title="History">
      <View style={styles.container}>
        {renderContent()}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
