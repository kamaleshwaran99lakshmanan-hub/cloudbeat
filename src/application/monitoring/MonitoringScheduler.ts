import { CloudService } from '../../domain/entities/CloudService';

/**
 * MonitoringScheduler - Defines scheduling interface for monitoring operations
 * 
 * Why Scheduler is abstract:
 * - Decouples the scheduling mechanism from the monitoring logic
 * - Allows different implementations (setTimeout, background jobs, etc.)
 * - Makes testing easier with mock schedulers
 * - Prevents tight coupling to specific timing mechanisms
 */
export interface MonitoringScheduler {
  /**
   * Schedule a monitoring task for a cloud service
   * @param service - The cloud service to monitor
   * @param intervalMs - The interval between checks in milliseconds
   * @returns A cancellation function to stop the scheduled task
   */
  schedule(service: CloudService, intervalMs: number): () => void;

  /**
   * Schedule multiple services for monitoring
   * @param services - Array of cloud services to monitor
   * @param intervalMs - The interval between checks in milliseconds
   * @returns A cancellation function to stop all scheduled tasks
   */
  scheduleAll(services: CloudService[], intervalMs: number): () => void;

  /**
   * Check if scheduling is currently active
   */
  isActive(): boolean;

  /**
   * Cancel all scheduled tasks
   */
  cancelAll(): void;
}
