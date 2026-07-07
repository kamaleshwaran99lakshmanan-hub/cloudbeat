import AppScreen from '@/components/ui/AppScreen';
import AppText from '@/components/ui/AppText';
import { View } from 'react-native';

export default function DashboardScreen() {
  return (
    <AppScreen>
      <View style={{ padding: 24 }}>
        <AppText variant="headline">Dashboard</AppText>
        <AppText variant="body" style={{ marginTop: 8, opacity: 0.7 }}>
          Monitor your services and system health at a glance.
        </AppText>
      </View>
    </AppScreen>
  );
}
