import { Request, Response, NextFunction } from 'express';
import ServerErrors from './models/server.error.models';

export default function notFound(req: Request, res: Response, next: NextFunction): void {
  res.status(ServerErrors.NotFound.statusCode).send(ServerErrors.NotFound.data);
  next();
}
