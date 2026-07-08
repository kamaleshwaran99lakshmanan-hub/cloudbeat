import AsyncStorage from '@react-native-async-storage/async-storage';

export class StorageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'StorageError';
  }
}

export class AsyncStorageClient {
  async save<T>(key: string, value: T): Promise<void> {
    try {
      const serialized = JSON.stringify(value);
      await AsyncStorage.setItem(key, serialized);
    } catch (error) {
      throw new StorageError(
        `Failed to save data for key "${key}": ${this.getErrorMessage(error)}`
      );
    }
  }

  async load<T>(key: string): Promise<T | null> {
    try {
      const data = await AsyncStorage.getItem(key);
      if (data === null) {
        return null;
      }
      return JSON.parse(data) as T;
    } catch (error) {
      throw new StorageError(
        `Failed to load data for key "${key}": ${this.getErrorMessage(error)}`
      );
    }
  }

  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      throw new StorageError(
        `Failed to remove data for key "${key}": ${this.getErrorMessage(error)}`
      );
    }
  }

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      throw new StorageError(`Failed to clear storage: ${this.getErrorMessage(error)}`);
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      const data = await AsyncStorage.getItem(key);
      return data !== null;
    } catch (error) {
      throw new StorageError(
        `Failed to check existence for key "${key}": ${this.getErrorMessage(error)}`
      );
    }
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return String(error);
  }
}
