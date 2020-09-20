import pino from 'pino';
import correlator from 'express-correlation-id';

interface LogEntry {
  key: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}

export const pinoLogger = pino({
  name: process.env.APP_ID,
  level: process.env.LOG_LEVEL,
  useLevelLabels: true,
  enabled: !process.env.NOLOG,
});

export default class Logger {
  private static extractKeyValue(acc: object, current: Array<LogEntry>): object {
    if (current.length === 0) {
      return acc;
    }

    const [head, ...tail] = current;
    const newItem = {};
    newItem[head.key] = head.value;

    const mergedAcc = Object.keys(acc).length === 0 ? newItem : { ...acc, ...newItem };
    return Logger.extractKeyValue(mergedAcc, tail);
  }

  private static createLogObj(message: string, args: LogEntry[]): object {
    const mergedArgsObj = this.extractKeyValue({}, args);
    const messageObj = { message };
    const correlationObj = { correlationId: correlator.getId() };
    return { ...messageObj, ...mergedArgsObj, ...correlationObj };
  }

  static info(message: string, args: LogEntry[] = []): void {
    const logObj = this.createLogObj(message, args);
    pinoLogger.info(logObj);
  }

  static debug(message: string, args: LogEntry[] = []): void {
    const logObj = this.createLogObj(message, args);
    pinoLogger.debug(logObj);
  }

  static warn(message: string, args: LogEntry[] = []): void {
    const logObj = this.createLogObj(message, args);
    pinoLogger.warn(logObj);
  }

  static error(message: string, args: LogEntry[] = []): void {
    const logObj = this.createLogObj(message, args);
    pinoLogger.error(logObj);
  }
}
