import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@rneui/themed';
import { Icon } from '@rneui/base';
import { ThemeOption } from '../types';

interface ThemeSelectorProps {
  selectedTheme: 'system' | 'light' | 'dark';
  onThemeChange: (theme: 'system' | 'light' | 'dark') => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ selectedTheme, onThemeChange }) => {
  const { theme } = useTheme();

  const options: ThemeOption[] = [
    { value: 'system', label: 'System Default', icon: 'devices' },
    { value: 'light', label: 'Light', icon: 'wb-sunny' },
    { value: 'dark', label: 'Dark', icon: 'brightness-3' },
  ];

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.option,
            { backgroundColor: theme.colors.white },
            selectedTheme === option.value && styles.selectedOption,
          ]}
          onPress={() => onThemeChange(option.value)}
        >
          <View style={styles.optionContent}>
            <Icon
              name={option.icon}
              type="material"
              size={24}
              color={selectedTheme === option.value ? theme.colors.primary : theme.colors.grey3}
            />
            <Text
              style={[
                styles.label,
                { color: theme.colors.black },
                selectedTheme === option.value && styles.selectedLabel,
              ]}
            >
              {option.label}
            </Text>
          </View>
          {selectedTheme === option.value && (
            <Icon name="check-circle" type="material" size={24} color={theme.colors.primary} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedOption: {
    backgroundColor: 'rgba(0, 122, 255, 0.05)',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginLeft: 12,
  },
  selectedLabel: {
    fontWeight: '600',
    color: '#007AFF',
  },
});

export default ThemeSelector;
