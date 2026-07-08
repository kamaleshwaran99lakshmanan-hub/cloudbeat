import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@rneui/themed';
import SettingsItem from './SettingsItem';

interface MonitoringDefaultsCardProps {
  defaultInterval: number;
  defaultRetryCount: number;
  defaultTimeout: number;
  autoStartMonitoring: boolean;
  onIntervalChange?: (interval: number) => void;
  onRetryChange?: (retry: number) => void;
  onTimeoutChange?: (timeout: number) => void;
  onAutoStartChange?: (autoStart: boolean) => void;
}

const MonitoringDefaultsCard: React.FC<MonitoringDefaultsCardProps> = ({
  defaultInterval,
  defaultRetryCount,
  defaultTimeout,
  autoStartMonitoring,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <SettingsItem
        icon="timer"
        label="Default Interval"
        value={`${defaultInterval}s`}
        isLast={false}
      />
      <SettingsItem
        icon="refresh"
        label="Default Retry Count"
        value={defaultRetryCount.toString()}
        isLast={false}
      />
      <SettingsItem
        icon="schedule"
        label="Default Timeout"
        value={`${defaultTimeout}ms`}
        isLast={false}
      />
      <SettingsItem
        icon="play-circle-outline"
        label="Auto-start Monitoring"
        value={autoStartMonitoring}
        isLast={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
});

export default MonitoringDefaultsCard;
