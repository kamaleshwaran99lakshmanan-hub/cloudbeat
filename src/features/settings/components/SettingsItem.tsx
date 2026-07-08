import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@rneui/themed';
import { Icon } from '@rneui/base';
import { SettingsItemProps } from '../types';

const SettingsItem: React.FC<SettingsItemProps> = ({
  icon,
  label,
  value,
  onPress,
  rightElement,
  isLast = false,
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: theme.colors.white },
        isLast && styles.lastItem,
      ]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.leftContent}>
        <Icon name={icon} type="material" size={24} color={theme.colors.grey3} />
        <Text style={[styles.label, { color: theme.colors.black }]}>{label}</Text>
      </View>
      <View style={styles.rightContent}>
        {value !== undefined && (
          <Text style={[styles.value, { color: theme.colors.grey4 }]}>
            {typeof value === 'boolean' ? (value ? 'On' : 'Off') : value}
          </Text>
        )}
        {rightElement}
        {onPress && (
          <Icon name="chevron-right" type="material" size={24} color={theme.colors.grey3} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginLeft: 12,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontSize: 14,
    marginRight: 8,
  },
});

export default SettingsItem;
