import React from 'react';
import { View, StyleSheet } from 'react-native';
import SettingsSection from './SettingsSection';
import SettingsItem from './SettingsItem';

interface SettingsCardProps {
  title: string;
  children: React.ReactNode;
}

const SettingsCard: React.FC<SettingsCardProps> = ({ title, children }) => {
  return (
    <SettingsSection title={title}>
      <View style={styles.content}>
        {children}
      </View>
    </SettingsSection>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 0,
  },
});

export default SettingsCard;
