import { useState, useCallback } from 'react';
import { DeleteCloudService } from '../../../application/use-cases/DeleteCloudService';

export function useDeleteService(deleteCloudService: DeleteCloudService) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteService = useCallback(async (id: string): Promise<{ success: boolean; error?: string }> => {
    setIsDeleting(true);
    setError(null);

    try {
      await deleteCloudService.execute(id);
      setIsDeleting(false);
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete service';
      setError(errorMessage);
      setIsDeleting(false);
      return { success: false, error: errorMessage };
    }
  }, [deleteCloudService]);

  return {
    deleteService,
    isDeleting,
    error,
  };
}
