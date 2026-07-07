import React from 'react';
import { Text, type TextProps as RNTextProps, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/use-theme';
import { typography, type TypographyVariant } from '../../theme/typography';

export interface AppTextProps extends RNTextProps {
  variant?: TypographyVariant;
  children: React.ReactNode;
}

export function AppText({ variant = 'body', style, ...props }: AppTextProps) {
  const { colors } = useTheme();
  
  return (
    <Text
      {...props}
      style={[
        { color: colors.textPrimary },
        typography[variant],
        style,
      ]}
    />
  );
}
