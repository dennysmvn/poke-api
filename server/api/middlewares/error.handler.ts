import ServerErrors from '../../common/models/server.error.models';
import Logger from '../../common/logger';

export default function errorHandler(err, req, res, next): void {
  if (!res.headersSent) {
    if (err instanceof Error) {
      res.err = {
        message: err.message,
        stackTrace: err.stack,
      };
    }

    Logger.error('API Error', [
      { key: 'method', value: req.method },
      { key: 'url', value: req.originalUrl },
      { key: 'error_message', value: err.message },
      { key: 'error_stack', value: err.stack },
    ]);

    return res
      .status(ServerErrors.InternalServerError.statusCode)
      .json(ServerErrors.InternalServerError.data);
  }
  return next();
}
