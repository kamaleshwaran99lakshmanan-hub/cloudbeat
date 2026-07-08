import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import SettingsItem from './SettingsItem';

interface DataManagementCardProps {
  onExport?: () => void;
  onImport?: () => void;
  onClearHistory?: () => void;
  onClearNotifications?: () => void;
}

const DataManagementCard: React.FC<DataManagementCardProps> = ({
  onExport,
  onImport,
  onClearHistory,
  onClearNotifications,
}) => {
  const handleClearHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all monitoring history? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => onClearHistory?.(),
        },
      ]
    );
  };

  const handleClearNotifications = () => {
    Alert.alert(
      'Clear Notifications',
      'Are you sure you want to clear all notifications?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => onClearNotifications?.(),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <SettingsItem
        icon="file-download"
        label="Export Configuration"
        onPress={onExport}
        isLast={false}
      />
      <SettingsItem
        icon="file-upload"
        label="Import Configuration"
        onPress={onImport}
        isLast={false}
      />
      <SettingsItem
        icon="history"
        label="Clear Monitoring History"
        onPress={handleClearHistory}
        isLast={false}
      />
      <SettingsItem
        icon="notifications-none"
        label="Clear Notifications"
        onPress={handleClearNotifications}
        isLast={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
});

export default DataManagementCard;
