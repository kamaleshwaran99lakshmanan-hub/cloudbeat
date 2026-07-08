import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { AppScreen } from '../../../components/ui/AppScreen';
import { AppText } from '../../../components/ui/AppText';
import { AppButton } from '../../../components/ui/AppButton';
import { LoadingIndicator } from '../../../components/ui/LoadingIndicator';
import { ServiceList } from '../components/ServiceList';
import { DeleteConfirmationDialog } from '../components/DeleteConfirmationDialog';
import { useServices } from '../hooks/useServices';
import { useDeleteService } from '../hooks/useDeleteService';
import { useMonitoringToggle } from '../hooks/useMonitoringToggle';
import { GetAllCloudServices } from '../../../application/use-cases/GetAllCloudServices';
import { DeleteCloudService } from '../../../application/use-cases/DeleteCloudService';
import { EnableMonitoring } from '../../../application/use-cases/EnableMonitoring';
import { DisableMonitoring } from '../../../application/use-cases/DisableMonitoring';
import { CloudService } from '../../../domain/entities/CloudService';
import { spacing } from '../../../theme/spacing';

export interface ServicesScreenProps {
  getAllCloudServices: GetAllCloudServices;
  deleteCloudService: DeleteCloudService;
  enableMonitoring: EnableMonitoring;
  disableMonitoring: DisableMonitoring;
  onNavigateToAddService: () => void;
  onNavigateToEditService: (service: CloudService) => void;
}

export function ServicesScreen({
  getAllCloudServices,
  deleteCloudService,
  enableMonitoring,
  disableMonitoring,
  onNavigateToAddService,
  onNavigateToEditService,
}: ServicesScreenProps) {
  const { services, isLoading, error, refresh } = useServices(
    getAllCloudServices,
    deleteCloudService,
    enableMonitoring,
    disableMonitoring
  );
  
  const { deleteService, isDeleting } = useDeleteService(deleteCloudService);
  const { toggleMonitoring, isToggling } = useMonitoringToggle(enableMonitoring, disableMonitoring);
  
  const [serviceToDelete, setServiceToDelete] = useState<CloudService | null>(null);
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);

  const handleDelete = async (service: CloudService) => {
    setServiceToDelete(service);
    setIsDeleteDialogVisible(true);
  };

  const confirmDelete = async () => {
    if (serviceToDelete) {
      await deleteService(serviceToDelete.id);
      setIsDeleteDialogVisible(false);
      setServiceToDelete(null);
      await refresh();
    }
  };

  const cancelDelete = () => {
    setIsDeleteDialogVisible(false);
    setServiceToDelete(null);
  };

  const handleToggleMonitoring = async (service: CloudService) => {
    const currentStatus = true; // Assume monitoring is on by default
    await toggleMonitoring(service.id, !currentStatus);
    await refresh();
  };

  const handleEdit = (service: CloudService) => {
    onNavigateToEditService(service);
  };

  return (
    <AppScreen>
      <View style={styles.container}>
        <View style={styles.header}>
          <AppText variant="title">Cloud Services</AppText>
          <AppButton
            variant="primary"
            title="Add Service"
            onPress={onNavigateToAddService}
          />
        </View>

        {isLoading ? (
          <LoadingIndicator fullscreen />
        ) : error ? (
          <AppText variant="body" style={styles.error}>{error}</AppText>
        ) : (
          <ServiceList
            services={services}
            isLoading={false}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleMonitoring={handleToggleMonitoring}
            monitoringStatuses={{}}
            onCreateNew={onNavigateToAddService}
          />
        )}

        <DeleteConfirmationDialog
          serviceName={serviceToDelete?.name ?? ''}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          isVisible={isDeleteDialogVisible}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing[16],
    borderBottomWidth: 1,
    borderBottomColor: '#C6C6C8',
  },
  error: {
    color: '#FF3B30',
    textAlign: 'center',
    marginTop: spacing[24],
  },
});
