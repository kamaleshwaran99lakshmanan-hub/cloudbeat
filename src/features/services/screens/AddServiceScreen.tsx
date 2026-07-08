import React, { useState, useEffect } from 'react';
import { AppScreen } from '../../../components/ui/AppScreen';
import { ServiceForm } from '../components/ServiceForm';
import { useCreateService } from '../hooks/useCreateService';
import { AddCloudService } from '../../../application/use-cases/AddCloudService';
import { ServiceFormData } from '../types';
import { CloudService } from '../../../domain/entities/CloudService';

export interface AddServiceScreenProps {
  addCloudService: AddCloudService;
  onNavigateBack: () => void;
  onServiceCreated: (service: CloudService) => void;
}

export function AddServiceScreen({
  addCloudService,
  onNavigateBack,
  onServiceCreated,
}: AddServiceScreenProps) {
  const { createService, isCreating, error } = useCreateService(addCloudService);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (data: ServiceFormData) => {
    const result = await createService(data);
    if (result.success) {
      onServiceCreated({
        id: data.id,
        name: data.name,
        url: { value: data.url },
        status: data.status,
      });
      onNavigateBack();
    } else {
      setFormError(result.error ?? 'Failed to create service');
    }
  };

  return (
    <AppScreen>
      <ServiceForm
        onSubmit={handleSubmit}
        onCancel={onNavigateBack}
        isSubmitting={isCreating}
      />
      {formError && (
        <></>
      )}
    </AppScreen>
  );
}
