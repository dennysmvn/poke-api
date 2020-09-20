import { ServiceError } from './service.error.models';

export default class ServiceResult<T> {
    result: T;

    error: ServiceError;

    get success(): boolean {
      return this.error === null || this.error === undefined;
    }
}
