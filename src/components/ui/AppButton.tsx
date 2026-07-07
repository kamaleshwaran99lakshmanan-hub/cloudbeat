import React from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  type TouchableOpacityProps,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../../hooks/use-theme';
import { AppText } from './AppText';
import { radius } from '../../theme/radius';
import { spacing } from '../../theme/spacing';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

export interface AppButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  title: string;
  loading?: boolean;
  disabled?: boolean;
}

export function AppButton({
  variant = 'primary',
  title,
  loading = false,
  disabled = false,
  style,
  ...props
}: AppButtonProps) {
  const { colors, isDark } = useTheme();

  const getButtonStyles = () => {
    const baseStyles = [
      styles.button,
      { borderRadius: radius.md },
    ];

    switch (variant) {
      case 'primary':
        return [...baseStyles, { backgroundColor: colors.primary }];
      case 'secondary':
        return [...baseStyles, { backgroundColor: colors.secondary }];
      case 'outline':
        return [
          ...baseStyles,
          { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.border },
        ];
      case 'ghost':
        return [...baseStyles, { backgroundColor: 'transparent' }];
      case 'danger':
        return [...baseStyles, { backgroundColor: colors.error }];
      default:
        return baseStyles;
    }
  };

  const getTextColors = () => {
    if (disabled) {
      return colors.disabled;
    }
    if (variant === 'outline' || variant === 'ghost') {
      return colors.textPrimary;
    }
    return '#FFFFFF';
  };

  return (
    <TouchableOpacity
      {...props}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[getButtonStyles(), style]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColors()} />
      ) : (
        <AppText
          variant="button"
          style={{ color: getTextColors(), textAlign: 'center' }}
        >
          {title}
        </AppText>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing[12],
    paddingHorizontal: spacing[24],
    alignItems: 'center',
    justifyContent: 'center',
  },
});
