import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { AppCard } from '../../../components/ui/AppCard';
import { AppText } from '../../../components/ui/AppText';
import { AppButton } from '../../../components/ui/AppButton';
import { spacing } from '../../../theme/spacing';

export interface DeleteConfirmationDialogProps {
  serviceName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isVisible: boolean;
}

export function DeleteConfirmationDialog({
  serviceName,
  onConfirm,
  onCancel,
  isVisible,
}: DeleteConfirmationDialogProps) {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <AppCard style={styles.dialog}>
          <AppText variant="title" style={styles.title}>
            Delete Service
          </AppText>
          <AppText variant="body" style={styles.message}>
            Are you sure you want to delete "{serviceName}"? This action cannot be undone.
          </AppText>
          <View style={styles.actions}>
            <AppButton
              variant="outline"
              title="Cancel"
              onPress={onCancel}
              style={styles.cancelButton}
            />
            <AppButton
              variant="danger"
              title="Delete"
              onPress={onConfirm}
              style={styles.confirmButton}
            />
          </View>
        </AppCard>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing[24],
  },
  dialog: {
    width: '100%',
    maxWidth: 400,
  },
  title: {
    marginBottom: spacing[12],
  },
  message: {
    marginBottom: spacing[24],
    color: '#8E8E93',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    marginRight: spacing[12],
  },
  confirmButton: {
    minWidth: 100,
  },
});
