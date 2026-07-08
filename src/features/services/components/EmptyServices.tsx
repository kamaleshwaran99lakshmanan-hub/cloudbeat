import React from 'react';
import { View, StyleSheet } from 'react-native';
import { EmptyState } from '../../../components/ui/EmptyState';

export interface EmptyServicesProps {
  onCreateNew: () => void;
}

export function EmptyServices({ onCreateNew }: EmptyServicesProps) {
  return (
    <EmptyState
      title="No Services"
      description="Get started by adding your first cloud service to monitor."
      actionLabel="Add Service"
      onAction={onCreateNew}
    />
  );
}

const styles = StyleSheet.create({});
