import { CloudService } from '../../domain/entities/CloudService';
import { ServiceStatus } from '../../domain/enums/ServiceStatus';
import { HealthStatus } from '../../domain/enums/HealthStatus';
import { ServiceUrl } from '../../domain/value-objects/ServiceUrl';
import { ResponseTime } from '../../domain/value-objects/ResponseTime';
import { RetryPolicy } from '../../domain/value-objects/RetryPolicy';

export interface CloudServiceStorageModel {
  id: string;
  name: string;
  url: string;
  status: ServiceStatus;
  healthStatus: HealthStatus;
  lastCheckedAt: string | null;
  responseTimeMs: number | null;
  retryCount: number;
  maxRetries: number;
  retryDelayMs: number;
  createdAt: string;
  updatedAt: string;
}

export class CloudServiceMapper {
  static toStorage(entity: CloudService): CloudServiceStorageModel {
    return {
      id: entity.getId(),
      name: entity.getName(),
      url: entity.getUrl().getValue(),
      status: entity.getStatus(),
      healthStatus: entity.getHealthStatus(),
      lastCheckedAt: entity.getLastCheckedAt()?.toISOString() ?? null,
      responseTimeMs: entity.getResponseTime()?.getMs() ?? null,
      retryCount: entity.getRetryPolicy().getCount(),
      maxRetries: entity.getRetryPolicy().getMaxRetries(),
      retryDelayMs: entity.getRetryPolicy().getDelayMs(),
      createdAt: entity.getCreatedAt().toISOString(),
      updatedAt: entity.getUpdatedAt().toISOString(),
    };
  }

  static fromStorage(model: CloudServiceStorageModel): CloudService {
    const serviceUrl = new ServiceUrl(model.url);
    const responseTime = model.responseTimeMs !== null 
      ? new ResponseTime(model.responseTimeMs) 
      : undefined;
    const retryPolicy = new RetryPolicy(
      model.retryCount,
      model.maxRetries,
      model.retryDelayMs
    );

    return new CloudService(
      model.id,
      model.name,
      serviceUrl,
      model.status,
      model.healthStatus,
      model.lastCheckedAt ? new Date(model.lastCheckedAt) : undefined,
      responseTime,
      retryPolicy,
      new Date(model.createdAt),
      new Date(model.updatedAt)
    );
  }
}
