import React, { useState } from 'react';
import { AppScreen } from '../../../components/ui/AppScreen';
import { ServiceForm } from '../components/ServiceForm';
import { useUpdateService } from '../hooks/useUpdateService';
import { UpdateCloudService } from '../../../application/use-cases/UpdateCloudService';
import { ServiceFormData } from '../types';
import { CloudService } from '../../../domain/entities/CloudService';
import { ServiceStatus } from '../../../domain/enums/ServiceStatus';

export interface EditServiceScreenProps {
  updateCloudService: UpdateCloudService;
  service: CloudService;
  onNavigateBack: () => void;
  onServiceUpdated: (service: CloudService) => void;
}

export function EditServiceScreen({
  updateCloudService,
  service,
  onNavigateBack,
  onServiceUpdated,
}: EditServiceScreenProps) {
  const { updateService, isUpdating, error } = useUpdateService(updateCloudService);
  const [formError, setFormError] = useState<string | null>(null);

  const initialData: Partial<ServiceFormData> = {
    id: service.id,
    name: service.name,
    url: service.url.value,
    status: service.status,
    monitoringEnabled: true,
    monitoringIntervalMs: 60000,
  };

  const handleSubmit = async (data: ServiceFormData) => {
    const result = await updateService(service.id, data);
    if (result.success) {
      onServiceUpdated({
        id: data.id,
        name: data.name,
        url: { value: data.url },
        status: data.status,
      });
      onNavigateBack();
    } else {
      setFormError(result.error ?? 'Failed to update service');
    }
  };

  return (
    <AppScreen>
      <ServiceForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={onNavigateBack}
        isSubmitting={isUpdating}
      />
      {formError && (
        <></>
      )}
    </AppScreen>
  );
}
