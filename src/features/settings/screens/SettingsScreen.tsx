import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { useTheme } from '@rneui/themed';
import { Header } from '@rneui/base';
import {
  SettingsSection,
  ThemeSelector,
  MonitoringDefaultsCard,
  NotificationDefaultsCard,
  DataManagementCard,
  DangerZoneCard,
  ConfirmResetDialog,
} from '../components';
import { useSettings } from '../hooks/useSettings';

const SettingsScreen: React.FC = () => {
  const { theme } = useTheme();
  const { settings, loading, updateTheme, updateMonitoringInterval, updateAutoStartMonitoring, updateNotificationEnabled, resetAllSettings } = useSettings();
  const [showResetDialog, setShowResetDialog] = useState(false);

  if (loading || !settings) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Header
          leftComponent={{ icon: 'arrow-back', color: theme.colors.white }}
          centerComponent={{ text: 'Settings', style: { color: theme.colors.white, fontSize: 20 } }}
          containerStyle={{ backgroundColor: theme.colors.primary }}
        />
        <View style={styles.loadingContainer} />
      </View>
    );
  }

  const handleResetSettings = () => {
    setShowResetDialog(true);
  };

  const confirmReset = async () => {
    setShowResetDialog(false);
    await resetAllSettings();
    Alert.alert('Success', 'Settings have been reset to default values');
  };

  const handleExport = () => {
    Alert.alert('Export', 'Export functionality would save settings to a file');
  };

  const handleImport = () => {
    Alert.alert('Import', 'Import functionality would load settings from a file');
  };

  const handleClearHistory = () => {
    Alert.alert('Clear History', 'Monitoring history cleared');
  };

  const handleClearNotifications = () => {
    Alert.alert('Clear Notifications', 'All notifications cleared');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header
        leftComponent={{ icon: 'arrow-back', color: theme.colors.white }}
        centerComponent={{ text: 'Settings', style: { color: theme.colors.white, fontSize: 20 } }}
        containerStyle={{ backgroundColor: theme.colors.primary }}
      />
      <ScrollView style={styles.scrollView}>
        <SettingsSection title="Appearance">
          <ThemeSelector
            selectedTheme={settings.theme}
            onThemeChange={updateTheme}
          />
        </SettingsSection>

        <SettingsSection title="Monitoring Defaults">
          <MonitoringDefaultsCard
            defaultInterval={settings.monitoring.defaultInterval}
            defaultRetryCount={settings.monitoring.defaultRetryCount}
            defaultTimeout={settings.monitoring.defaultTimeout}
            autoStartMonitoring={settings.monitoring.autoStartMonitoring}
          />
        </SettingsSection>

        <SettingsSection title="Notifications">
          <NotificationDefaultsCard
            enabled={settings.notifications.enabled}
            soundEnabled={settings.notifications.soundEnabled}
            vibrationEnabled={settings.notifications.vibrationEnabled}
            quietHoursEnabled={settings.notifications.quietHours.enabled}
          />
        </SettingsSection>

        <SettingsSection title="Data Management">
          <DataManagementCard
            onExport={handleExport}
            onImport={handleImport}
            onClearHistory={handleClearHistory}
            onClearNotifications={handleClearNotifications}
          />
        </SettingsSection>

        <DangerZoneCard onResetSettings={handleResetSettings} />

        <View style={styles.footer} />
      </ScrollView>

      <ConfirmResetDialog
        visible={showResetDialog}
        onConfirm={confirmReset}
        onCancel={() => setShowResetDialog(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  footer: {
    height: 32,
  },
});

export default SettingsScreen;
