import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@rneui/themed';

interface DangerZoneCardProps {
  onResetSettings?: () => void;
}

const DangerZoneCard: React.FC<DangerZoneCardProps> = ({ onResetSettings }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.error, opacity: 0.9 }]}>
      <Text style={styles.title}>Danger Zone</Text>
      <Text style={styles.description}>
        These actions are irreversible. Please proceed with caution.
      </Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.white }]}
        onPress={onResetSettings}
      >
        <Text style={[styles.buttonText, { color: theme.colors.error }]}>
          Reset All Settings
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 20,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 16,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DangerZoneCard;
