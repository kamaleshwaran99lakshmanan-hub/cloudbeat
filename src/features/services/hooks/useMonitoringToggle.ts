import { useState, useCallback } from 'react';
import { EnableMonitoring } from '../../../application/use-cases/EnableMonitoring';
import { DisableMonitoring } from '../../../application/use-cases/DisableMonitoring';

export function useMonitoringToggle(
  enableMonitoring: EnableMonitoring,
  disableMonitoring: DisableMonitoring
) {
  const [isToggling, setIsToggling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleMonitoring = useCallback(async (id: string, enable: boolean): Promise<{ success: boolean; error?: string }> => {
    setIsToggling(true);
    setError(null);

    try {
      if (enable) {
        await enableMonitoring.execute(id);
      } else {
        await disableMonitoring.execute(id);
      }
      setIsToggling(false);
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to toggle monitoring';
      setError(errorMessage);
      setIsToggling(false);
      return { success: false, error: errorMessage };
    }
  }, [enableMonitoring, disableMonitoring]);

  return {
    toggleMonitoring,
    isToggling,
    error,
  };
}
