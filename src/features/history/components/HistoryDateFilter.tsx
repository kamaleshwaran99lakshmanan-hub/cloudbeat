import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText, AppButton } from '../../../components';
import { HistoryFilterState } from '../types';

interface HistoryDateFilterProps {
  dateRange: HistoryFilterState['dateRange'];
  onDateRangeChange: (range: HistoryFilterState['dateRange']) => void;
}

export function HistoryDateFilter({
  dateRange,
  onDateRangeChange,
}: HistoryDateFilterProps) {
  const options: Array<{ value: HistoryFilterState['dateRange']; label: string }> = [
    { value: 'TODAY', label: 'Today' },
    { value: '24H', label: 'Last 24h' },
    { value: '7D', label: 'Last 7d' },
    { value: '30D', label: 'Last 30d' },
  ];

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <AppButton
          key={option.value}
          variant={dateRange === option.value ? 'primary' : 'outline'}
          size="small"
          onPress={() => onDateRangeChange(option.value)}
          title={option.label}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingVertical: 8,
  },
});
