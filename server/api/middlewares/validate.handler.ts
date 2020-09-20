import { validationResult } from 'express-validator';
import ServerErrors from '../../common/models/server.error.models';
import Logger from '../../common/logger';

export default function ValidationRequest(req, res, next): void {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const model = ServerErrors.UnprocessableEntity.data.errors[0];
    ServerErrors.UnprocessableEntity.data.errors.pop();

    errors.array().forEach((e) => {
      const error = {
        code: model.code,
        message: `${e.param} ${e.msg}`,
      };
      ServerErrors.UnprocessableEntity.data.errors.push(error);
    });

    const validationResponse = res
      .status(ServerErrors.UnprocessableEntity.statusCode)
      .json(ServerErrors.UnprocessableEntity.data);

    Logger.info('API Response', [
      { key: 'status', value: res.statusCode },
      { key: 'data', value: ServerErrors.UnprocessableEntity.data },
      { key: 'headers', value: validationResponse.getHeaders() },
    ]);

    return validationResponse;
  }

  return next();
}
