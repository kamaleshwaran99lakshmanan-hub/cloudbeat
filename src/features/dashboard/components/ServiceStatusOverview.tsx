import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { AppCard } from '../../../shared/components/AppCard';
import { AppText } from '../../../shared/components/AppText';
import { Service } from '../../../domain/models/Service';
import { ServiceStatusChip } from '../../services/components/ServiceStatusChip';

interface ServiceStatusOverviewProps {
  services: Service[];
}

export function ServiceStatusOverview({ services }: ServiceStatusOverviewProps) {
  const renderService = ({ item }: { item: Service }) => (
    <View style={styles.serviceItem}>
      <AppText variant="body2" weight="medium" numberOfLines={1} style={styles.serviceName}>
        {item.name}
      </AppText>
      <ServiceStatusChip isEnabled={item.isEnabled} />
    </View>
  );

  if (services.length === 0) {
    return (
      <AppCard style={styles.container}>
        <AppText variant="body1" color="muted">No services configured</AppText>
      </AppCard>
    );
  }

  return (
    <AppCard style={styles.container}>
      <AppText variant="h4" weight="semibold" style={styles.title}>Services Overview</AppText>
      <FlatList
        data={services}
        renderItem={renderService}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </AppCard>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    marginTop: 0,
  },
  title: {
    marginBottom: 12,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  serviceName: {
    flex: 1,
    marginRight: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
  },
});
