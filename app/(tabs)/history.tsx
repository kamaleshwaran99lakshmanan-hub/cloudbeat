import AppScreen from '@/components/ui/AppScreen';
import AppText from '@/components/ui/AppText';
import { View } from 'react-native';

export default function HistoryScreen() {
  return (
    <AppScreen>
      <View style={{ padding: 24 }}>
        <AppText variant="headline">History</AppText>
        <AppText variant="body" style={{ marginTop: 8, opacity: 0.7 }}>
          Review historical data and past incidents.
        </AppText>
      </View>
    </AppScreen>
  );
}
