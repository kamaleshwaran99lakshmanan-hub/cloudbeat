import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { colors } from '@/theme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? colors.dark.background : colors.light.background,
        },
        headerTitleStyle: {
          color: isDark ? colors.light.textPrimary : colors.dark.textPrimary,
        },
        contentStyle: {
          backgroundColor: isDark ? colors.dark.background : colors.light.background,
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
