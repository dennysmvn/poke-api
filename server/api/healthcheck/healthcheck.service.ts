import { HealthIndicator } from './healthcheck.model';

class HealthCheckService {
  static async readinessCheck(): Promise<HealthIndicator> {
    const healthIndicator = new HealthIndicator(
      process.env.APP_ID || 'poke-api',
      process.env.VERSION || '1.0.0',
      new Date(),
      [],
    );

    healthIndicator.checkOverallStatus();

    return Promise.resolve(healthIndicator);
  }
}

export default HealthCheckService;
