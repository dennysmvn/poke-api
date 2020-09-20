import { Router } from 'express';
import HealthCheckController from '../healthcheck.controller';

const routes = Router();
const healthCheckController = new HealthCheckController();

routes.get('/liveness', healthCheckController.liveness);
routes.get('/readiness', healthCheckController.readiness);

export default routes;
