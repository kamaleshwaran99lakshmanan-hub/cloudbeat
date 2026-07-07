import AppScreen from '@/components/ui/AppScreen';
import AppText from '@/components/ui/AppText';
import { View } from 'react-native';

export default function ServicesScreen() {
  return (
    <AppScreen>
      <View style={{ padding: 24 }}>
        <AppText variant="headline">Services</AppText>
        <AppText variant="body" style={{ marginTop: 8, opacity: 0.7 }}>
          View and manage your monitored services.
        </AppText>
      </View>
    </AppScreen>
  );
}
