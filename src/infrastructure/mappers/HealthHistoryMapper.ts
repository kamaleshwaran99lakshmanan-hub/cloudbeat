import { HealthCheck } from '../../domain/entities/HealthCheck';
import { HealthStatus } from '../../domain/enums/HealthStatus';
import { ResponseTime } from '../../domain/value-objects/ResponseTime';

export interface HealthCheckStorageModel {
  id: string;
  serviceId: string;
  status: HealthStatus;
  responseTimeMs: number | null;
  statusCode: number | null;
  errorMessage: string | null;
  checkedAt: string;
}

export class HealthCheckMapper {
  static toStorage(entity: HealthCheck): HealthCheckStorageModel {
    return {
      id: entity.getId(),
      serviceId: entity.getServiceId(),
      status: entity.getStatus(),
      responseTimeMs: entity.getResponseTime()?.getMs() ?? null,
      statusCode: entity.getStatusCode(),
      errorMessage: entity.getErrorMessage(),
      checkedAt: entity.getCheckedAt().toISOString(),
    };
  }

  static fromStorage(model: HealthCheckStorageModel): HealthCheck {
    const responseTime = model.responseTimeMs !== null
      ? new ResponseTime(model.responseTimeMs)
      : undefined;

    return new HealthCheck(
      model.id,
      model.serviceId,
      model.status,
      model.checkedAt ? new Date(model.checkedAt) : undefined,
      responseTime,
      model.statusCode,
      model.errorMessage
    );
  }
}
