import express, { Request, Response } from 'express';
import client from 'prom-client';

import logger from '../logger/default';

const app = express();

export const restResponseTimeHistogram: client.Histogram<'route' | 'method' | 'status_code'> = new client.Histogram({
  name: 'rest_response_time_duration_seconds',
  help: 'REST API response time in seconds',
  labelNames: ['method', 'route', 'status_code']
});

export const databaseResponseTimeHistogram: client.Histogram<'operation' | 'success'> = new client.Histogram({
  name: 'db_response_time_duration_seconds',
  help: 'Database response time in seconds',
  labelNames: ['operation', 'success']
});

export function startMetricsServer(): void {
  const collectDefaultMetrics = client.collectDefaultMetrics;

  collectDefaultMetrics();

  app.get('/metrics', async (_req: Request, res: Response) => {
    res.set('Content-Type', client.register.contentType);

    return res.send(await client.register.metrics());
  });

  app.listen(9100, () => {
    logger.info('Metrics server started at http://localhost:9100');
  });
}
