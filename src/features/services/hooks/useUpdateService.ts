import { useState, useCallback } from 'react';
import { UpdateCloudService } from '../../../application/use-cases/UpdateCloudService';
import { ServiceFormData } from '../types';

export function useUpdateService(updateCloudService: UpdateCloudService) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateService = useCallback(async (id: string, data: Partial<ServiceFormData>): Promise<{ success: boolean; error?: string }> => {
    setIsUpdating(true);
    setError(null);

    try {
      await updateCloudService.execute(
        id,
        data.name,
        data.url,
        data.status
      );
      setIsUpdating(false);
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update service';
      setError(errorMessage);
      setIsUpdating(false);
      return { success: false, error: errorMessage };
    }
  }, [updateCloudService]);

  return {
    updateService,
    isUpdating,
    error,
  };
}
