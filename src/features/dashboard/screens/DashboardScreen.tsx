import React from 'react';
import { ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { AppScreen } from '../../../shared/components/AppScreen';
import { useDashboard } from '../hooks/useDashboard';
import { 
  DashboardHeader,
  OverallHealthCard,
  StatisticsCards,
  RecentChecksList,
  ServiceStatusOverview,
  EmptyDashboard,
  LoadingDashboard,
  ErrorDashboard,
} from '../components';
import { useNavigation } from '@react-navigation/native';

export function DashboardScreen() {
  const navigation = useNavigation();
  const { isLoading, isRefreshing, error, data, refresh } = useDashboard();

  const handleAddService = () => {
    navigation.navigate('AddService' as never);
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingDashboard />;
    }

    if (error) {
      return <ErrorDashboard error={error} onRetry={refresh} />;
    }

    if (!data || data.stats.totalServices === 0) {
      return <EmptyDashboard onAddService={handleAddService} />;
    }

    return (
      <>
        <DashboardHeader stats={data.stats} onRefresh={refresh} />
        <OverallHealthCard stats={data.stats} />
        <StatisticsCards stats={data.stats} />
        <RecentChecksList checks={data.recentChecks} />
        <ServiceStatusOverview services={data.services} />
      </>
    );
  };

  return (
    <AppScreen>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refresh}
            tintColor="#1976D2"
          />
        }
      >
        {renderContent()}
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
