import { Application } from 'express';
import mung from 'express-mung';
import convertRequestCamelCase from '../api/middlewares/convertrequest.handler';
import healthCheckRouter from '../api/healthcheck/routes/healthcheck.routes';
import pokemonRouter from '../api/pokemon/routes/pokemon.routes';
import convertResponseSnakeCase from '../api/middlewares/convertresponse.handler';

export default function routes(app: Application): void {
  app.use(convertRequestCamelCase);
  app.use(mung.json(convertResponseSnakeCase));

  app.use('/health-check', healthCheckRouter);
  app.use('/api/v1/pokemon',pokemonRouter);
}
