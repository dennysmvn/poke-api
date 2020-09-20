import { Request, Response } from 'express';
import { OK, SERVICE_UNAVAILABLE } from 'http-status-codes';
import HealthCheckService from './healthcheck.service';

class HealthCheckController {
  // eslint-disable-next-line @typescript-eslint/require-await
  public liveness = async (req: Request, res: Response): Promise<Response> => res.status(OK)
    .json({ success: 'OK' });

  public readiness = async (req: Request, res: Response): Promise<Response> => {
    const readinessResponse = await HealthCheckService.readinessCheck();

    return readinessResponse.status
      ? res.status(OK).json(readinessResponse)
      : res.status(SERVICE_UNAVAILABLE).json(readinessResponse);
  }
}

export default HealthCheckController;
