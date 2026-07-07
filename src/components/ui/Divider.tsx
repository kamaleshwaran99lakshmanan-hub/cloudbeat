import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/use-theme';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  color?: string;
  thickness?: number;
  style?: object;
}

export function Divider({
  orientation = 'horizontal',
  color,
  thickness = 1,
  style,
}: DividerProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        orientation === 'horizontal' ? styles.horizontal : styles.vertical,
        {
          backgroundColor: color || colors.border,
          [orientation === 'horizontal' ? 'height' : 'width']: thickness,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  horizontal: {
    width: '100%',
  },
  vertical: {
    height: '100%',
  },
});
