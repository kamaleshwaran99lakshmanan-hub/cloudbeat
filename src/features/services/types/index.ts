import { CloudService } from '../../../domain/entities/CloudService';
import { ServiceStatus } from '../../../domain/enums/ServiceStatus';
import { RetryPolicy } from '../../../domain/value-objects/RetryPolicy';

export interface ServiceFormData {
  id: string;
  name: string;
  url: string;
  status: ServiceStatus;
  monitoringEnabled: boolean;
  monitoringIntervalMs: number;
  retryPolicy: RetryPolicy;
}

export interface ServiceFormErrors {
  id?: string;
  name?: string;
  url?: string;
  monitoringIntervalMs?: string;
  retryPolicy?: string;
}

export type ServiceListFilter = {
  searchQuery?: string;
  status?: ServiceStatus;
  monitoringEnabled?: boolean;
};

export interface ServiceCardProps {
  service: CloudService;
  onEdit: (service: CloudService) => void;
  onDelete: (service: CloudService) => void;
  onToggleMonitoring: (service: CloudService) => void;
  monitoringEnabled: boolean;
}

export interface ServiceFormProps {
  initialData?: Partial<ServiceFormData>;
  onSubmit: (data: ServiceFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export interface ServiceListProps {
  services: CloudService[];
  isLoading: boolean;
  onEdit: (service: CloudService) => void;
  onDelete: (service: CloudService) => void;
  onToggleMonitoring: (service: CloudService) => void;
  monitoringStatuses: Record<string, boolean>;
  onCreateNew: () => void;
}

export interface ServiceStatusChipProps {
  status: ServiceStatus;
}

export interface MonitoringIntervalSelectorProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export interface RetryPolicySelectorProps {
  value: RetryPolicy;
  onChange: (value: RetryPolicy) => void;
  disabled?: boolean;
}

export interface DeleteConfirmationDialogProps {
  serviceName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isVisible: boolean;
}

export interface EmptyServicesProps {
  onCreateNew: () => void;
}

export interface UseServicesResult {
  services: CloudService[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export interface UseCreateServiceResult {
  createService: (data: ServiceFormData) => Promise<void>;
  isCreating: boolean;
  error: string | null;
}

export interface UseUpdateServiceResult {
  updateService: (id: string, data: Partial<ServiceFormData>) => Promise<void>;
  isUpdating: boolean;
  error: string | null;
}

export interface UseDeleteServiceResult {
  deleteService: (id: string) => Promise<void>;
  isDeleting: boolean;
  error: string | null;
}

export interface UseMonitoringToggleResult {
  toggleMonitoring: (id: string, enable: boolean) => Promise<void>;
  isToggling: boolean;
  error: string | null;
}

export interface ServiceFormViewModelState {
  formData: ServiceFormData;
  errors: ServiceFormErrors;
  isSubmitting: boolean;
  isValid: boolean;
}

export interface ServiceListViewModelState {
  services: CloudService[];
  isLoading: boolean;
  error: string | null;
  monitoringStatuses: Record<string, boolean>;
}
