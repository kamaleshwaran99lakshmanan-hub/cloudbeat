import { useState, useEffect, useCallback } from 'react';
import { CloudService } from '../../../domain/entities/CloudService';
import { GetAllCloudServices } from '../../../application/use-cases/GetAllCloudServices';
import { DeleteCloudService } from '../../../application/use-cases/DeleteCloudService';
import { EnableMonitoring } from '../../../application/use-cases/EnableMonitoring';
import { DisableMonitoring } from '../../../application/use-cases/DisableMonitoring';
import { UseServicesResult } from '../types';

export function useServices(
  getAllCloudServices: GetAllCloudServices,
  deleteCloudService: DeleteCloudService,
  enableMonitoring: EnableMonitoring,
  disableMonitoring: DisableMonitoring
): UseServicesResult {
  const [services, setServices] = useState<CloudService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [monitoringStatuses, setMonitoringStatuses] = useState<Record<string, boolean>>({});

  const loadServices = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const loadedServices = await getAllCloudServices.execute();
      setServices(loadedServices);
      
      const statuses: Record<string, boolean> = {};
      loadedServices.forEach((service) => {
        statuses[service.id] = true;
      });
      setMonitoringStatuses(statuses);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load services');
    } finally {
      setIsLoading(false);
    }
  }, [getAllCloudServices]);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  const refresh = useCallback(async () => {
    await loadServices();
  }, [loadServices]);

  return {
    services,
    isLoading,
    error,
    refresh,
  };
}
