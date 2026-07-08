import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '../../../components/ui/AppText';
import { AppButton } from '../../../components/ui/AppButton';
import { RetryPolicy } from '../../../domain/value-objects/RetryPolicy';
import { spacing } from '../../../theme/spacing';

export interface RetryPolicySelectorProps {
  value: RetryPolicy;
  onChange: (value: RetryPolicy) => void;
  disabled?: boolean;
}

const maxRetriesOptions = [0, 1, 2, 3, 5];
const delayOptions = [500, 1000, 2000, 3000, 5000];
const multiplierOptions = [1, 1.5, 2];

export function RetryPolicySelector({
  value,
  onChange,
  disabled = false,
}: RetryPolicySelectorProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleMaxRetriesChange = (maxRetries: number) => {
    onChange(new RetryPolicy(maxRetries, value.delayMs, value.backoffMultiplier));
  };

  const handleDelayChange = (delayMs: number) => {
    onChange(new RetryPolicy(value.maxRetries, delayMs, value.backoffMultiplier));
  };

  const handleMultiplierChange = (backoffMultiplier: number) => {
    onChange(new RetryPolicy(value.maxRetries, value.delayMs, backoffMultiplier));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText variant="subtitle" style={styles.label}>
          Retry Policy
        </AppText>
        <AppButton
          variant="ghost"
          title={showAdvanced ? 'Hide Advanced' : 'Advanced'}
          onPress={() => setShowAdvanced(!showAdvanced)}
          disabled={disabled}
          style={styles.advancedButton}
        />
      </View>

      <View style={styles.optionsContainer}>
        {maxRetriesOptions.map((maxRetries) => (
          <AppButton
            key={maxRetries}
            variant={value.maxRetries === maxRetries ? 'secondary' : 'outline'}
            title={maxRetries === 0 ? 'No Retry' : `${maxRetries} Retries`}
            onPress={() => handleMaxRetriesChange(maxRetries)}
            disabled={disabled}
            style={styles.optionButton}
          />
        ))}
      </View>

      {showAdvanced && (
        <>
          <View style={styles.advancedSection}>
            <AppText variant="caption" style={styles.advancedLabel}>
              Initial Delay
            </AppText>
            <View style={styles.optionsContainer}>
              {delayOptions.map((delay) => (
                <AppButton
                  key={delay}
                  variant={value.delayMs === delay ? 'secondary' : 'outline'}
                  title={`${delay}ms`}
                  onPress={() => handleDelayChange(delay)}
                  disabled={disabled}
                  style={styles.smallOptionButton}
                />
              ))}
            </View>
          </View>

          <View style={styles.advancedSection}>
            <AppText variant="caption" style={styles.advancedLabel}>
              Backoff Multiplier
            </AppText>
            <View style={styles.optionsContainer}>
              {multiplierOptions.map((multiplier) => (
                <AppButton
                  key={multiplier}
                  variant={value.backoffMultiplier === multiplier ? 'secondary' : 'outline'}
                  title={`${multiplier}x`}
                  onPress={() => handleMultiplierChange(multiplier)}
                  disabled={disabled}
                  style={styles.smallOptionButton}
                />
              ))}
            </View>
          </View>
        </>
      )}

      <AppText variant="caption" style={styles.summary}>
        Max: {value.maxRetries} retries, Delay: {value.delayMs}ms{value.backoffMultiplier > 1 ? `, Backoff: ${value.backoffMultiplier}x` : ''}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing[16],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[8],
  },
  label: {
    flex: 1,
  },
  advancedButton: {
    paddingVertical: 4,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[8],
    marginBottom: spacing[8],
  },
  optionButton: {
    minWidth: 80,
  },
  smallOptionButton: {
    minWidth: 70,
    paddingVertical: 8,
  },
  advancedSection: {
    marginTop: spacing[12],
    marginBottom: spacing[8],
  },
  advancedLabel: {
    marginBottom: spacing[8],
    color: '#8E8E93',
  },
  summary: {
    marginTop: spacing[4],
    color: '#8E8E93',
  },
});
