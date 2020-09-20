import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { Stopwatch } from 'ts-stopwatch';
import Logger from '../logger';

export interface HttpRequestOptions extends AxiosRequestConfig {
  readonly data?: object;
  readonly params?: object;
  readonly headers?: object;
  readonly method: Method;
  readonly timeout?: number;
  readonly url: string;
  readonly shouldLog: boolean;
}

type Method =
| 'get' | 'GET'
| 'delete' | 'DELETE'
| 'head' | 'HEAD'
| 'options' | 'OPTIONS'
| 'post' | 'POST'
| 'put' | 'PUT'
| 'patch' | 'PATCH'

class HttpClient {
  public static async request(options: HttpRequestOptions): Promise<AxiosResponse> {
    this.logRequest(options);

    const requestOptions = this.buildAxiosRequestConfig(options);
    const stopwatch = new Stopwatch();
    stopwatch.start();

    try {
      const response = await axios(requestOptions);

      stopwatch.stop();
      this.logResponse(options, response, stopwatch.getTime() || 0);

      return response;
    } catch (e) {
      stopwatch.stop();
      this.logResponseError(options, e, stopwatch.getTime() || 0);

      throw e;
    }
  }

  private static logRequest(requestOptions: HttpRequestOptions): void {
    if (requestOptions.shouldLog) {
      Logger.info('HttpClient Request', [
        { key: 'data', value: requestOptions.data },
        { key: 'headers', value: requestOptions.headers },
        { key: 'method', value: requestOptions.method },
        { key: 'url', value: requestOptions.url },
        { key: 'baseUrl', value: requestOptions.baseURL },
      ]);
    }
  }

  private static logResponse(requestOptions: HttpRequestOptions, response: AxiosResponse, elapsedTimeInMs: number): void {
    if (requestOptions.shouldLog) {
      Logger.info('HttpClient Response', [
        { key: 'status', value: response.status },
        { key: 'data', value: response.data },
        { key: 'headers', value: response.headers },
        { key: 'elapsedTimeInMs', value: elapsedTimeInMs },
      ]);
    }
  }

  private static logResponseError(requestOptions: HttpRequestOptions, error: Error, elapsedTimeInMs: number): void {
    if (requestOptions.shouldLog) {
      Logger.info('HttpClient Response Error', [
        { key: 'errorMessage', value: error.message },
        { key: 'errorName', value: error.name },
        { key: 'errorStack', value: error.stack },
        { key: 'elapsedTimeInMs', value: elapsedTimeInMs },
      ]);
    }
  }

  private static buildAxiosRequestConfig(options: HttpRequestOptions): AxiosRequestConfig {
    return {
      url: options.url,
      baseURL: options.baseURL,
      params: options.params || undefined,
      method: options.method,
      headers: options.headers || undefined,
      data: options.data || undefined,
      timeout: options.timeout || 5000,
    };
  }
}

export default HttpClient;
