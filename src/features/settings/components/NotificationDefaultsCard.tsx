import React from 'react';
import { View, StyleSheet } from 'react-native';
import SettingsItem from './SettingsItem';

interface NotificationDefaultsCardProps {
  enabled: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  quietHoursEnabled: boolean;
  onNavigate?: () => void;
}

const NotificationDefaultsCard: React.FC<NotificationDefaultsCardProps> = ({
  enabled,
  soundEnabled,
  vibrationEnabled,
  quietHoursEnabled,
  onNavigate,
}) => {
  return (
    <View style={styles.container}>
      <SettingsItem
        icon="notifications"
        label="Enable Notifications"
        value={enabled}
        isLast={false}
      />
      <SettingsItem
        icon="volume-up"
        label="Sound"
        value={soundEnabled}
        isLast={false}
      />
      <SettingsItem
        icon="vibration"
        label="Vibration"
        value={vibrationEnabled}
        isLast={false}
      />
      <SettingsItem
        icon="bedtime"
        label="Quiet Hours"
        value={quietHoursEnabled}
        isLast={true}
        onPress={onNavigate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
});

export default NotificationDefaultsCard;
