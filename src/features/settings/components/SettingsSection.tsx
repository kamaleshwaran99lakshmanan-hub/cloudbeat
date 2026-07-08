import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@rneui/themed';
import { SettingsSectionProps } from '../types';

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, children }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.grey4 }]}>{title}</Text>
      <View style={[styles.content, { backgroundColor: theme.colors.white }]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  content: {
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default SettingsSection;
