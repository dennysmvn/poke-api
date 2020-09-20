export enum HealthStatus {
  Healthy,
  Unhealthy
}

export enum HealthServiceKind {
  InternalService = 'INTERNALSERVICE',
  Database = 'DATABASE',
  Messaging = 'MESSAGING'
}

export interface HealthCheckServiceIndicator {
  readonly name: string;
  readonly kind: HealthServiceKind;
  readonly status: boolean;
  readonly time?: number;
  readonly optional: boolean;
  readonly url: string;
  readonly details: Map<string, string>;

  checkHealth(): Promise<void>;
}

export class HealthIndicator {
  constructor(public readonly name: string, public readonly version: string,
    public readonly date: Date, readonly checks: Array<HealthCheckServiceIndicator>,
    public status?: boolean) {
    this.name = name;
    this.status = false;
    this.version = version;
    this.date = date;
    this.checks = checks;
  }

  static returnStatus = (healthStatus: HealthStatus): boolean => healthStatus !== HealthStatus.Unhealthy;

  static getExecutionTimeDelta = (startTime: Date, endTime: Date): number => (
    endTime.getMilliseconds() - startTime.getMilliseconds()
  ) / 1000;

  checkOverallStatus = (): void => {
    Promise.all(this.checks.map((service) => service.checkHealth()));
    const hasUnhealthChecks = this.checks.some(
      (service) => service.status === false && !service.optional,
    );
    this.status = HealthIndicator.returnStatus(hasUnhealthChecks ? HealthStatus.Unhealthy : HealthStatus.Healthy);
  }
}
