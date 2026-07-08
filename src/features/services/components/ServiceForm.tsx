import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, ScrollView } from 'react-native';
import { AppCard } from '../../../components/ui/AppCard';
import { AppText } from '../../../components/ui/AppText';
import { AppButton } from '../../../components/ui/AppButton';
import { ServiceFormData, ServiceFormErrors } from '../types';
import { ServiceStatus } from '../../../domain/enums/ServiceStatus';
import { RetryPolicy } from '../../../domain/value-objects/RetryPolicy';
import { MonitoringIntervalSelector } from './MonitoringIntervalSelector';
import { RetryPolicySelector } from './RetryPolicySelector';
import { spacing } from '../../../theme/spacing';
import { radius } from '../../../theme/radius';

export interface ServiceFormProps {
  initialData?: Partial<ServiceFormData>;
  onSubmit: (data: ServiceFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const defaultRetryPolicy = new RetryPolicy(3, 1000, 2);

export function ServiceForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: ServiceFormProps) {
  const [id, setId] = useState(initialData?.id ?? '');
  const [name, setName] = useState(initialData?.name ?? '');
  const [url, setUrl] = useState(initialData?.url ?? '');
  const [status, setStatus] = useState<ServiceStatus>(
    initialData?.status ?? ServiceStatus.ONLINE
  );
  const [monitoringEnabled, setMonitoringEnabled] = useState(
    initialData?.monitoringEnabled ?? true
  );
  const [monitoringIntervalMs, setMonitoringIntervalMs] = useState(
    initialData?.monitoringIntervalMs ?? 60000
  );
  const [retryPolicy, setRetryPolicy] = useState<RetryPolicy>(
    initialData?.retryPolicy ?? defaultRetryPolicy
  );
  const [errors, setErrors] = useState<ServiceFormErrors>({});

  const validate = (): boolean => {
    const newErrors: ServiceFormErrors = {};

    if (!id || id.trim().length === 0) {
      newErrors.id = 'Service ID is required';
    }

    if (!name || name.trim().length === 0) {
      newErrors.name = 'Service name is required';
    }

    if (!url || url.trim().length === 0) {
      newErrors.url = 'Service URL is required';
    } else {
      try {
        new URL(url);
      } catch {
        newErrors.url = 'Invalid URL format';
      }
    }

    if (monitoringIntervalMs < 5000) {
      newErrors.monitoringIntervalMs = 'Minimum interval is 5 seconds';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit({
        id: id.trim(),
        name: name.trim(),
        url: url.trim(),
        status,
        monitoringEnabled,
        monitoringIntervalMs,
        retryPolicy,
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <AppCard style={styles.formCard}>
        <View style={styles.field}>
          <AppText variant="subtitle" style={styles.label}>
            Service ID
          </AppText>
          <TextInput
            style={[styles.input, errors.id && styles.inputError]}
            value={id}
            onChangeText={setId}
            placeholder="Enter service ID"
            editable={!isSubmitting}
          />
          {errors.id && <AppText variant="caption" style={styles.errorText}>{errors.id}</AppText>}
        </View>

        <View style={styles.field}>
          <AppText variant="subtitle" style={styles.label}>
            Service Name
          </AppText>
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            value={name}
            onChangeText={setName}
            placeholder="Enter service name"
            editable={!isSubmitting}
          />
          {errors.name && <AppText variant="caption" style={styles.errorText}>{errors.name}</AppText>}
        </View>

        <View style={styles.field}>
          <AppText variant="subtitle" style={styles.label}>
            Service URL
          </AppText>
          <TextInput
            style={[styles.input, errors.url && styles.inputError]}
            value={url}
            onChangeText={setUrl}
            placeholder="https://api.example.com"
            keyboardType="url"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isSubmitting}
          />
          {errors.url && <AppText variant="caption" style={styles.errorText}>{errors.url}</AppText>}
        </View>

        <View style={styles.field}>
          <AppText variant="subtitle" style={styles.label}>
            Initial Status
          </AppText>
          <View style={styles.statusButtons}>
            {(Object.values(ServiceStatus) as ServiceStatus[]).map((s) => (
              <AppButton
                key={s}
                variant={status === s ? 'primary' : 'outline'}
                title={s.charAt(0).toUpperCase() + s.slice(1)}
                onPress={() => setStatus(s)}
                disabled={isSubmitting}
                style={styles.statusButton}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <AppText variant="subtitle" style={styles.sectionTitle}>
            Monitoring Configuration
          </AppText>

          <View style={styles.toggleRow}>
            <AppText variant="body">Enable Monitoring</AppText>
            <AppButton
              variant={monitoringEnabled ? 'primary' : 'outline'}
              title={monitoringEnabled ? 'On' : 'Off'}
              onPress={() => setMonitoringEnabled(!monitoringEnabled)}
              disabled={isSubmitting}
              style={styles.toggleButton}
            />
          </View>

          <MonitoringIntervalSelector
            value={monitoringIntervalMs}
            onChange={setMonitoringIntervalMs}
            disabled={!monitoringEnabled || isSubmitting}
          />

          <RetryPolicySelector
            value={retryPolicy}
            onChange={setRetryPolicy}
            disabled={!monitoringEnabled || isSubmitting}
          />
        </View>

        <View style={styles.actions}>
          <AppButton
            variant="outline"
            title="Cancel"
            onPress={onCancel}
            disabled={isSubmitting}
            style={styles.cancelButton}
          />
          <AppButton
            variant="primary"
            title={initialData?.id ? 'Update Service' : 'Create Service'}
            onPress={handleSubmit}
            loading={isSubmitting}
            style={styles.submitButton}
          />
        </View>
      </AppCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formCard: {
    margin: spacing[16],
  },
  field: {
    marginBottom: spacing[20],
  },
  label: {
    marginBottom: spacing[8],
  },
  input: {
    borderWidth: 1,
    borderColor: '#C6C6C8',
    borderRadius: radius.md,
    padding: spacing[12],
    fontSize: 16,
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    marginTop: spacing[4],
  },
  statusButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[8],
  },
  statusButton: {
    flex: 1,
    minWidth: 100,
  },
  section: {
    borderTopWidth: 1,
    borderTopColor: '#C6C6C8',
    paddingTop: spacing[16],
    marginTop: spacing[8],
  },
  sectionTitle: {
    marginBottom: spacing[12],
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[16],
  },
  toggleButton: {
    minWidth: 80,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: spacing[8],
  },
  cancelButton: {
    marginRight: spacing[12],
  },
  submitButton: {
    minWidth: 120,
  },
});
