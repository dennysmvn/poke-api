import path from 'path';
import express from 'express';

export default function openapi(app, routes): void {
  const apiSpecPath = path.join(__dirname, 'api.yml');
  app.use(process.env.OPENAPI_SPEC || '/spec', express.static(apiSpecPath));

  routes(app);
}
