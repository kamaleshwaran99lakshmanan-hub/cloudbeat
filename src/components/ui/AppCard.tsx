import React from 'react';
import {
  View,
  type ViewProps,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../hooks/use-theme';
import { radius } from '../../theme/radius';
import { shadows, type ShadowLevel } from '../../theme/shadows';

export interface AppCardProps extends ViewProps {
  elevation?: ShadowLevel;
  onPress?: () => void;
}

export function AppCard({
  elevation = 'md',
  onPress,
  style,
  children,
  ...props
}: AppCardProps) {
  const { colors } = useTheme();

  const shadowStyle = shadows[elevation];

  const cardStyles = [
    styles.card,
    { backgroundColor: colors.surface, borderRadius: radius.lg },
    shadowStyle,
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        {...props}
        onPress={onPress}
        activeOpacity={0.7}
        style={cardStyles}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View {...props} style={cardStyles}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
  },
});
