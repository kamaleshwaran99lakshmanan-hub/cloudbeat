import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@rneui/themed';

interface AboutCardProps {
  version: string;
  buildNumber: string;
  onLicensePress?: () => void;
  onRepositoryPress?: () => void;
}

const AboutCard: React.FC<AboutCardProps> = ({
  version,
  buildNumber,
  onLicensePress,
  onRepositoryPress,
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.white }]}>
      <Text style={[styles.title, { color: theme.colors.black }]}>CloudBeat</Text>
      <Text style={[styles.version, { color: theme.colors.grey4 }]}>
        Version {version} ({buildNumber})
      </Text>
      <Text style={[styles.description, { color: theme.colors.grey3 }]}>
        A modern service monitoring application built with React Native and Expo.
      </Text>
      <View style={styles.links}>
        {/* Links would be implemented as touchable items */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  version: {
    fontSize: 14,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  links: {
    marginTop: 16,
    flexDirection: 'row',
  },
});

export default AboutCard;
