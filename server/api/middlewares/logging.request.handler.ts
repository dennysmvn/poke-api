import Logger from '../../common/logger';

export default function loggingRequestHandler(req, res, next): void {
  if (req) {
    Logger.info('API Request', [
      { key: 'method', value: req.method },
      { key: 'data', value: req.body },
      { key: 'headers', value: req.headers },
      { key: 'url', value: req.originalUrl },
    ]);
  }

  return next();
}
