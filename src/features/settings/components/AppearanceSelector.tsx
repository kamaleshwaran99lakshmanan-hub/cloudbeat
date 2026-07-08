import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@rneui/themed';
import { Switch } from '@rneui/base';

interface AppearanceSelectorProps {
  theme: 'system' | 'light' | 'dark';
  onThemeChange: (theme: 'system' | 'light' | 'dark') => void;
}

const AppearanceSelector: React.FC<AppearanceSelectorProps> = ({ theme, onThemeChange }) => {
  const { theme: appTheme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={[styles.label, { color: appTheme.colors.black }]}>Theme</Text>
        <View style={styles.themeButtons}>
          {(['system', 'light', 'dark'] as const).map((t) => (
            <View
              key={t}
              style={[
                styles.themeButton,
                { backgroundColor: appTheme.colors.grey2 },
                theme === t && { backgroundColor: appTheme.colors.primary },
              ]}
            >
              <Text
                style={[
                  styles.themeButtonText,
                  { color: theme === t ? appTheme.colors.white : appTheme.colors.grey4 },
                ]}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
  },
  themeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  themeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  themeButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default AppearanceSelector;
