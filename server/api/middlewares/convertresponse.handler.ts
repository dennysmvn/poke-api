import snakeCaseKeys from 'snakecase-keys';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function convertResponseSnakeCase(body): any {
  if (body) {
    // eslint-disable-next-line no-param-reassign
    body = snakeCaseKeys(body, { deep: true });
  }

  return body;
}
