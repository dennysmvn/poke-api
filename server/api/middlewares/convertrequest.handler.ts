import camelcaseKeys from 'camelcase-keys';

export default function convertRequestCamelCase(req, res, next): void {
  req.body = camelcaseKeys(req.body, { deep: true });
  req.params = camelcaseKeys(req.params);
  req.query = camelcaseKeys(req.query);
  return next();
}
