import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import { useTheme } from '@rneui/themed';
import { Header } from '@rneui/base';
import { AboutCard } from '../components';

const AboutScreen: React.FC = () => {
  const { theme } = useTheme();

  const handleOpenRepository = async () => {
    await Linking.openURL('https://github.com/kamaleshwaran99lakshmanan-hub/cloudbeat');
  };

  const handleOpenLicense = () => {
    // License info would be shown here
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header
        leftComponent={{ icon: 'arrow-back', color: theme.colors.white }}
        centerComponent={{ text: 'About', style: { color: theme.colors.white, fontSize: 20 } }}
        containerStyle={{ backgroundColor: theme.colors.primary }}
      />
      <ScrollView>
        <AboutCard
          version="1.0.0"
          buildNumber="1"
          onLicensePress={handleOpenLicense}
          onRepositoryPress={handleOpenRepository}
        />
        <View style={[styles.section, { backgroundColor: theme.colors.white }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.black }]}>
            Open Source Acknowledgements
          </Text>
          <Text style={[styles.sectionText, { color: theme.colors.grey4 }]}>
            CloudBeat is built using the following open source libraries:
          </Text>
          <Text style={[styles.library, { color: theme.colors.grey3 }]}>• React Native</Text>
          <Text style={[styles.library, { color: theme.colors.grey3 }]}>• Expo</Text>
          <Text style={[styles.library, { color: theme.colors.grey3 }]}>• TypeScript</Text>
          <Text style={[styles.library, { color: theme.colors.grey3 }]}>• RNE UI</Text>
          <Text style={[styles.library, { color: theme.colors.grey3 }]}>• AsyncStorage</Text>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.white }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.black }]}>License</Text>
          <Text style={[styles.sectionText, { color: theme.colors.grey4 }]}>
            MIT License - See LICENSE file for details
          </Text>
        </View>
        <View style={styles.footer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  library: {
    fontSize: 14,
    marginLeft: 8,
  },
  footer: {
    height: 32,
  },
});

export default AboutScreen;
