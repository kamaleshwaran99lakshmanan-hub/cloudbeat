import { ServiceStatus } from '../enums';
import { ServiceUrl } from '../value-objects';

export class CloudService {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _url: ServiceUrl;
  private readonly _status: ServiceStatus;

  constructor(
    id: string,
    name: string,
    url: ServiceUrl,
    status: ServiceStatus
  ) {
    this._id = id;
    this._name = name;
    this._url = url;
    this._status = status;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get url(): ServiceUrl {
    return this._url;
  }

  get status(): ServiceStatus {
    return this._status;
  }

  withStatus(status: ServiceStatus): CloudService {
    return new CloudService(this._id, this._name, this._url, status);
  }
}
