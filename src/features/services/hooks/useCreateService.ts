import { useState, useCallback } from 'react';
import { CloudService } from '../../../domain/entities/CloudService';
import { AddCloudService } from '../../../application/use-cases/AddCloudService';
import { ServiceFormData } from '../types';

export function useCreateService(addCloudService: AddCloudService) {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createService = useCallback(async (data: ServiceFormData): Promise<{ success: boolean; error?: string }> => {
    setIsCreating(true);
    setError(null);

    try {
      await addCloudService.execute(
        data.id,
        data.name,
        data.url,
        data.status,
        data.monitoringIntervalMs,
        data.retryPolicy
      );
      setIsCreating(false);
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create service';
      setError(errorMessage);
      setIsCreating(false);
      return { success: false, error: errorMessage };
    }
  }, [addCloudService]);

  return {
    createService,
    isCreating,
    error,
  };
}
