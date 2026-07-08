import { CloudService } from '../../../domain/entities/CloudService';
import { GetAllCloudServices } from '../../../application/use-cases/GetAllCloudServices';
import { DeleteCloudService } from '../../../application/use-cases/DeleteCloudService';
import { EnableMonitoring } from '../../../application/use-cases/EnableMonitoring';
import { DisableMonitoring } from '../../../application/use-cases/DisableMonitoring';
import { ServiceListViewModelState } from '../types';

const createInitialState = (): ServiceListViewModelState => ({
  services: [],
  isLoading: false,
  error: null,
  monitoringStatuses: {},
});

export class ServiceListViewModel {
  private state: ServiceListViewModelState;
  private setStateCallback: ((state: ServiceListViewModelState) => void) | null = null;
  private readonly getAllCloudServices: GetAllCloudServices;
  private readonly deleteCloudService: DeleteCloudService;
  private readonly enableMonitoring: EnableMonitoring;
  private readonly disableMonitoring: DisableMonitoring;

  constructor(
    getAllCloudServices: GetAllCloudServices,
    deleteCloudService: DeleteCloudService,
    enableMonitoring: EnableMonitoring,
    disableMonitoring: DisableMonitoring
  ) {
    this.getAllCloudServices = getAllCloudServices;
    this.deleteCloudService = deleteCloudService;
    this.enableMonitoring = enableMonitoring;
    this.disableMonitoring = disableMonitoring;
    this.state = createInitialState();
  }

  setOnStateChange(callback: (state: ServiceListViewModelState) => void): void {
    this.setStateCallback = callback;
  }

  getState(): ServiceListViewModelState {
    return this.state;
  }

  private updateState(updates: Partial<ServiceListViewModelState>): void {
    this.state = { ...this.state, ...updates };
    if (this.setStateCallback) {
      this.setStateCallback(this.state);
    }
  }

  async loadServices(): Promise<void> {
    this.updateState({ isLoading: true, error: null });

    try {
      const services = await this.getAllCloudServices.execute();
      this.updateState({ 
        services, 
        isLoading: false,
        monitoringStatuses: this.buildMonitoringStatuses(services),
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load services';
      this.updateState({ isLoading: false, error: errorMessage });
    }
  }

  private buildMonitoringStatuses(services: CloudService[]): Record<string, boolean> {
    // In a real implementation, this would come from a settings repository
    // For now, we assume all services have monitoring enabled by default
    const statuses: Record<string, boolean> = {};
    services.forEach((service) => {
      statuses[service.id] = true;
    });
    return statuses;
  }

  async deleteService(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      await this.deleteCloudService.execute(id);
      await this.loadServices();
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete service';
      return { success: false, error: errorMessage };
    }
  }

  async toggleMonitoring(id: string, enable: boolean): Promise<{ success: boolean; error?: string }> {
    try {
      if (enable) {
        await this.enableMonitoring.execute(id);
      } else {
        await this.disableMonitoring.execute(id);
      }
      
      this.updateState({
        monitoringStatuses: {
          ...this.state.monitoringStatuses,
          [id]: enable,
        },
      });
      
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to toggle monitoring';
      return { success: false, error: errorMessage };
    }
  }

  getMonitoringStatus(serviceId: string): boolean {
    return this.state.monitoringStatuses[serviceId] ?? false;
  }

  refresh(): Promise<void> {
    return this.loadServices();
  }
}
