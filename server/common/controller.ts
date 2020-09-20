import { Response } from 'express';
import ServiceResult from './models/service.result.models';
import Logger from './logger';

export default class Controller {
  public static response<T>(statusCode: number, res: Response, serviceResult: ServiceResult<T>): Response {
    const data = serviceResult.success ? serviceResult.result : serviceResult.error.data;

    const result = serviceResult.success
      ? res.status(statusCode).json(data)
      : res.status(serviceResult.error.statusCode).send(data);

    this.logginResponse(result, data);

    return result;
  }

  static logginResponse<T>(result: Response, data: T | Error): void {
    Logger.info('API Response', [
      { key: 'status', value: result.statusCode },
      { key: 'data', value: data },
      { key: 'headers', value: result.getHeaders() },
    ]);
  }
}
