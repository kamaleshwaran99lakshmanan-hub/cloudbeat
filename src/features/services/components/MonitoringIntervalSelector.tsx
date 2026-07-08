import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '../../../components/ui/AppText';
import { AppButton } from '../../../components/ui/AppButton';
import { spacing } from '../../../theme/spacing';
import { radius } from '../../../theme/radius';

export interface MonitoringIntervalSelectorProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const intervalOptions: { label: string; value: number }[] = [
  { label: '5s', value: 5000 },
  { label: '10s', value: 10000 },
  { label: '30s', value: 30000 },
  { label: '1m', value: 60000 },
  { label: '5m', value: 300000 },
  { label: '10m', value: 600000 },
];

export function MonitoringIntervalSelector({
  value,
  onChange,
  disabled = false,
}: MonitoringIntervalSelectorProps) {
  return (
    <View style={styles.container}>
      <AppText variant="subtitle" style={styles.label}>
        Monitoring Interval
      </AppText>
      <View style={styles.optionsContainer}>
        {intervalOptions.map((option) => (
          <AppButton
            key={option.value}
            variant={value === option.value ? 'primary' : 'outline'}
            title={option.label}
            onPress={() => onChange(option.value)}
            disabled={disabled}
            style={styles.optionButton}
          />
        ))}
      </View>
      <AppText variant="caption" style={styles.hint}>
        Current: {value >= 60000 ? `${value / 60000}m` : `${value / 1000}s`}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing[16],
  },
  label: {
    marginBottom: spacing[8],
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[8],
  },
  optionButton: {
    minWidth: 60,
  },
  hint: {
    marginTop: spacing[4],
    color: '#8E8E93',
  },
});
