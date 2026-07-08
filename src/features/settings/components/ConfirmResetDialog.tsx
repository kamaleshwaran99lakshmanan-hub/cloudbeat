import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useTheme } from '@rneui/themed';
import { Button } from '@rneui/base';

interface ConfirmResetDialogProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message?: string;
}

const ConfirmResetDialog: React.FC<ConfirmResetDialogProps> = ({
  visible,
  onConfirm,
  onCancel,
  title = 'Reset Settings',
  message = 'Are you sure you want to reset all settings to their default values? This action cannot be undone.',
}) => {
  const { theme } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor: theme.colors.white }]}>
          <Text style={[styles.title, { color: theme.colors.black }]}>{title}</Text>
          <Text style={[styles.message, { color: theme.colors.grey4 }]}>{message}</Text>
          <View style={styles.buttons}>
            <Button
              title="Cancel"
              type="outline"
              onPress={onCancel}
              containerStyle={[styles.button, styles.cancelButton]}
              titleStyle={{ color: theme.colors.grey4 }}
            />
            <Button
              title="Reset"
              type="solid"
              onPress={onConfirm}
              containerStyle={[styles.button, styles.confirmButton]}
              buttonStyle={{ backgroundColor: theme.colors.error }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    width: '100%',
    maxWidth: 340,
    padding: 24,
    borderRadius: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
  cancelButton: {
    marginRight: 8,
  },
  confirmButton: {
    marginLeft: 8,
  },
});

export default ConfirmResetDialog;
