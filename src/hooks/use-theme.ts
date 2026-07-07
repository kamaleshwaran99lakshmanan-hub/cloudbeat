import { useColorScheme } from 'react-native';
import { lightColors, darkColors, type ThemeColors } from '../theme/colors';

export function useTheme(): { colors: ThemeColors; isDark: boolean } {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? darkColors : lightColors;
  
  return { colors, isDark };
}
