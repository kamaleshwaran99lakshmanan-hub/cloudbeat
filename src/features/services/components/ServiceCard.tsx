import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppCard } from '../../../components/ui/AppCard';
import { AppText } from '../../../components/ui/AppText';
import { AppButton } from '../../../components/ui/AppButton';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { CloudService } from '../../../domain/entities/CloudService';
import { ServiceStatus } from '../../../domain/enums/ServiceStatus';
import { spacing } from '../../../theme/spacing';
import { radius } from '../../../theme/radius';

const statusToBadgeType = (status: ServiceStatus): 'healthy' | 'warning' | 'error' | 'unknown' => {
  switch (status) {
    case ServiceStatus.ONLINE:
      return 'healthy';
    case ServiceStatus.DEGRADED:
      return 'warning';
    case ServiceStatus.OFFLINE:
      return 'error';
    case ServiceStatus.MAINTENANCE:
      return 'unknown';
    default:
      return 'unknown';
  }
};

export interface ServiceCardProps {
  service: CloudService;
  onEdit: (service: CloudService) => void;
  onDelete: (service: CloudService) => void;
  onToggleMonitoring: (service: CloudService) => void;
  monitoringEnabled: boolean;
}

export function ServiceCard({
  service,
  onEdit,
  onDelete,
  onToggleMonitoring,
  monitoringEnabled,
}: ServiceCardProps) {
  const badgeType = statusToBadgeType(service.status);

  return (
    <AppCard style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <AppText variant="title" style={styles.name}>
            {service.name}
          </AppText>
          <StatusBadge status={badgeType} />
        </View>
        <AppText variant="caption" numberOfLines={1} style={styles.url}>
          {service.url.value}
        </AppText>
      </View>

      <View style={styles.footer}>
        <AppButton
          variant={monitoringEnabled ? 'secondary' : 'outline'}
          title={monitoringEnabled ? 'Monitoring On' : 'Monitoring Off'}
          onPress={() => onToggleMonitoring(service)}
          style={styles.monitoringButton}
        />
        <View style={styles.actions}>
          <AppButton
            variant="outline"
            title="Edit"
            onPress={() => onEdit(service)}
            style={styles.actionButton}
          />
          <AppButton
            variant="danger"
            title="Delete"
            onPress={() => onDelete(service)}
            style={styles.actionButton}
          />
        </View>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing[16],
  },
  header: {
    marginBottom: spacing[16],
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing[8],
  },
  name: {
    flex: 1,
    marginRight: spacing[8],
  },
  url: {
    color: '#8E8E93',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#C6C6C8',
    paddingTop: spacing[12],
  },
  monitoringButton: {
    marginBottom: spacing[8],
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    marginLeft: spacing[8],
  },
});
