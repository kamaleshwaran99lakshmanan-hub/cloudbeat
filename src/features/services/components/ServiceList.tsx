import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { ServiceCard } from './ServiceCard';
import { EmptyServices } from './EmptyServices';
import { LoadingIndicator } from '../../../components/ui/LoadingIndicator';
import { CloudService } from '../../../domain/entities/CloudService';
import { spacing } from '../../../theme/spacing';

export interface ServiceListProps {
  services: CloudService[];
  isLoading: boolean;
  onEdit: (service: CloudService) => void;
  onDelete: (service: CloudService) => void;
  onToggleMonitoring: (service: CloudService) => void;
  monitoringStatuses: Record<string, boolean>;
  onCreateNew: () => void;
}

export function ServiceList({
  services,
  isLoading,
  onEdit,
  onDelete,
  onToggleMonitoring,
  monitoringStatuses,
  onCreateNew,
}: ServiceListProps) {
  if (isLoading) {
    return <LoadingIndicator fullscreen />;
  }

  if (services.length === 0) {
    return <EmptyServices onCreateNew={onCreateNew} />;
  }

  const renderItem = ({ item }: { item: CloudService }) => (
    <ServiceCard
      service={item}
      onEdit={onEdit}
      onDelete={onDelete}
      onToggleMonitoring={onToggleMonitoring}
      monitoringEnabled={monitoringStatuses[item.id] ?? false}
    />
  );

  return (
    <FlatList
      data={services}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    padding: spacing[16],
  },
});
