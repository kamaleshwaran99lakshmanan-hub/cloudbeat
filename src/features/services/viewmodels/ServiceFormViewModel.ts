import { useState, useCallback } from 'react';
import { CloudService } from '../../../domain/entities/CloudService';
import { ServiceStatus } from '../../../domain/enums/ServiceStatus';
import { RetryPolicy } from '../../../domain/value-objects/RetryPolicy';
import { AddCloudService } from '../../../application/use-cases/AddCloudService';
import { UpdateCloudService } from '../../../application/use-cases/UpdateCloudService';
import { ServiceFormData, ServiceFormViewModelState } from '../types';

const defaultRetryPolicy = new RetryPolicy(3, 1000, 2);

const createInitialState = (initialData?: Partial<ServiceFormData>): ServiceFormViewModelState => ({
  formData: {
    id: initialData?.id ?? '',
    name: initialData?.name ?? '',
    url: initialData?.url ?? '',
    status: initialData?.status ?? ServiceStatus.ONLINE,
    monitoringEnabled: initialData?.monitoringEnabled ?? true,
    monitoringIntervalMs: initialData?.monitoringIntervalMs ?? 60000,
    retryPolicy: initialData?.retryPolicy ?? defaultRetryPolicy,
  },
  errors: {},
  isSubmitting: false,
  isValid: false,
});

export class ServiceFormViewModel {
  private state: ServiceFormViewModelState;
  private setStateCallback: ((state: ServiceFormViewModelState) => void) | null = null;
  private readonly addCloudService: AddCloudService;
  private readonly updateCloudService: UpdateCloudService;

  constructor(
    addCloudService: AddCloudService,
    updateCloudService: UpdateCloudService,
    initialData?: Partial<ServiceFormData>
  ) {
    this.addCloudService = addCloudService;
    this.updateCloudService = updateCloudService;
    this.state = createInitialState(initialData);
  }

  setOnStateChange(callback: (state: ServiceFormViewModelState) => void): void {
    this.setStateCallback = callback;
  }

  getState(): ServiceFormViewModelState {
    return this.state;
  }

  private updateState(updates: Partial<ServiceFormViewModelState>): void {
    this.state = { ...this.state, ...updates };
    if (this.setStateCallback) {
      this.setStateCallback(this.state);
    }
  }

  validateField(field: keyof ServiceFormData, value: unknown): string | null {
    switch (field) {
      case 'id':
        if (!value || String(value).trim().length === 0) {
          return 'Service ID is required';
        }
        break;
      case 'name':
        if (!value || String(value).trim().length === 0) {
          return 'Service name is required';
        }
        break;
      case 'url':
        if (!value || String(value).trim().length === 0) {
          return 'Service URL is required';
        }
        try {
          new URL(String(value));
        } catch {
          return 'Invalid URL format';
        }
        break;
      case 'monitoringIntervalMs':
        if (typeof value === 'number' && value < 5000) {
          return 'Minimum interval is 5 seconds';
        }
        break;
    }
    return null;
  }

  setFieldValue(field: keyof ServiceFormData, value: unknown): void {
    const error = this.validateField(field, value);
    const newErrors = { ...this.state.errors };
    
    if (error) {
      newErrors[field] = error;
    } else {
      delete newErrors[field];
    }

    this.updateState({
      formData: { ...this.state.formData, [field]: value },
      errors: newErrors,
    });
  }

  validateForm(): boolean {
    const errors: Record<string, string> = {};
    const { formData } = this.state;

    const idError = this.validateField('id', formData.id);
    if (idError) errors.id = idError;

    const nameError = this.validateField('name', formData.name);
    if (nameError) errors.name = nameError;

    const urlError = this.validateField('url', formData.url);
    if (urlError) errors.url = urlError;

    const intervalError = this.validateField('monitoringIntervalMs', formData.monitoringIntervalMs);
    if (intervalError) errors.monitoringIntervalMs = intervalError;

    this.updateState({ errors, isValid: Object.keys(errors).length === 0 });
    return Object.keys(errors).length === 0;
  }

  async submit(isEditMode: boolean): Promise<{ success: boolean; error?: string }> {
    if (!this.validateForm()) {
      return { success: false, error: 'Form validation failed' };
    }

    this.updateState({ isSubmitting: true });

    try {
      const { id, name, url, status } = this.state.formData;

      if (isEditMode) {
        await this.updateCloudService.execute(id, name, url, status);
      } else {
        await this.addCloudService.execute(id, name, url, status);
      }

      this.updateState({ isSubmitting: false });
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      this.updateState({ isSubmitting: false });
      return { success: false, error: errorMessage };
    }
  }

  reset(initialData?: Partial<ServiceFormData>): void {
    this.state = createInitialState(initialData);
    if (this.setStateCallback) {
      this.setStateCallback(this.state);
    }
  }
}
