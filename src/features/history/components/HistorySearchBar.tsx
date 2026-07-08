import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { AppText } from '../../../components';

interface HistorySearchBarProps {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
}

export function HistorySearchBar({
  value,
  onChange,
  placeholder = 'Search by service name...',
}: HistorySearchBarProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#9E9E9E"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
});
