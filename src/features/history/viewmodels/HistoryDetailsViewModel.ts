import { MonitoringResult } from '../../../domain/models';

export class HistoryDetailsViewModel {
  private listeners: Set<() => void> = new Set();
  private selectedResult: MonitoringResult | null = null;

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify(): void {
    this.listeners.forEach(listener => listener());
  }

  getState(): {
    selectedResult: MonitoringResult | null;
  } {
    return {
      selectedResult: this.selectedResult,
    };
  }

  selectResult(result: MonitoringResult): void {
    this.selectedResult = result;
    this.notify();
  }

  clearSelection(): void {
    this.selectedResult = null;
    this.notify();
  }
}
