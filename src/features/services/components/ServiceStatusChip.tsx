import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '../../../components/ui/AppText';
import { ServiceStatus } from '../../../domain/enums/ServiceStatus';
import { radius } from '../../../theme/radius';
import { spacing } from '../../../theme/spacing';

export interface ServiceStatusChipProps {
  status: ServiceStatus;
}

const statusConfig: Record<ServiceStatus, { color: string; label: string }> = {
  [ServiceStatus.ONLINE]: { color: '#34C759', label: 'Online' },
  [ServiceStatus.OFFLINE]: { color: '#FF3B30', label: 'Offline' },
  [ServiceStatus.DEGRADED]: { color: '#FF9500', label: 'Degraded' },
  [ServiceStatus.MAINTENANCE]: { color: '#8E8E93', label: 'Maintenance' },
};

export function ServiceStatusChip({ status }: ServiceStatusChipProps) {
  const config = statusConfig[status];

  return (
    <View style={[styles.container, { backgroundColor: config.color }]}>
      <AppText variant="caption" style={styles.text}>
        {config.label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing[12],
    paddingVertical: spacing[4],
    borderRadius: radius.full,
    alignSelf: 'flex-start',
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
