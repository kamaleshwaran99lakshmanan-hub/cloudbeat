import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText, AppButton } from '../../../components';
import { HistoryFilterState } from '../types';

interface HistoryFilterProps {
  filterState: HistoryFilterState;
  onStatusChange: (status: HistoryFilterState['status']) => void;
  onDateRangeChange: (range: HistoryFilterState['dateRange']) => void;
  onSortChange: (sort: HistoryFilterState['sortBy']) => void;
}

export function HistoryFilter({
  filterState,
  onStatusChange,
  onDateRangeChange,
  onSortChange,
}: HistoryFilterProps) {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <AppText variant="caption" color="secondary">Status</AppText>
        <View style={styles.buttonRow}>
          {(['ALL', 'HEALTHY', 'UNHEALTHY', 'WARNING'] as const).map((status) => (
            <AppButton
              key={status}
              variant={filterState.status === status ? 'primary' : 'outline'}
              size="small"
              onPress={() => onStatusChange(status)}
              title={status}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <AppText variant="caption" color="secondary">Date Range</AppText>
        <View style={styles.buttonRow}>
          {(['TODAY', '24H', '7D', '30D'] as const).map((range) => (
            <AppButton
              key={range}
              variant={filterState.dateRange === range ? 'primary' : 'outline'}
              size="small"
              onPress={() => onDateRangeChange(range)}
              title={range}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <AppText variant="caption" color="secondary">Sort</AppText>
        <View style={styles.buttonRow}>
          {(['NEWEST', 'OLDEST'] as const).map((sort) => (
            <AppButton
              key={sort}
              variant={filterState.sortBy === sort ? 'primary' : 'outline'}
              size="small"
              onPress={() => onSortChange(sort)}
              title={sort}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  section: {
    gap: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});
