import AppScreen from '@/components/ui/AppScreen';
import AppText from '@/components/ui/AppText';
import { View } from 'react-native';

export default function SettingsScreen() {
  return (
    <AppScreen>
      <View style={{ padding: 24 }}>
        <AppText variant="headline">Settings</AppText>
        <AppText variant="body" style={{ marginTop: 8, opacity: 0.7 }}>
          Configure application preferences and notifications.
        </AppText>
      </View>
    </AppScreen>
  );
}
