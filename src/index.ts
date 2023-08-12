import * as bodyParser from 'body-parser';
import express, { Express, Request, Response } from 'express';
import responseTime from 'response-time';
import log from 'pino-http';
import helmet from 'helmet';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend'
import i18middelware from 'i18next-http-middleware'

import { errorHandler, notAvailableRouteErrorHandler } from './errorhandler/handler.error';
import { restResponseTimeHistogram, startMetricsServer } from './metrics/metrics';
import serviceRouter from './routers/users_routers/service.routes'
// import swaggerDocs from './swagger/swagger';




// Creates and configures an ExpressJS web server.
class App {
  // ref to Express instance
  express: Express;
  // Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    i18next.use(Backend).use(i18middelware.LanguageDetector).init({
      fallbackLng: 'en',
      backend: {
        loadPath: './locales/{{lng}}.json'
      }
    });
    this.middleware();

    this.routes();

    // startMetricsServer();

    // swaggerDocs(this.express, 8000);

    this.express.use(errorHandler);

    this.express.use(notAvailableRouteErrorHandler);

  }

  // Configure Express middleware.
  private middleware(): void {
    // Initialize i18n

    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(log());
    this.express.use(helmet());
    this.express.use(i18middelware.handle(i18next));

    this.express.use(responseTime((req: Request, res: Response, time: number) => {
      if (req?.route?.path) {
        restResponseTimeHistogram.observe(
          {
            method: req.method,
            route: req.route.path,
            status_code: res.statusCode
          },
          time * 1000
        );
      }
    }));

  }
  
  // Configure API endpoints.
  private routes(): void {
    /* API endpoints */
    this.express.use('/api/v0', serviceRouter);

  }

}

export default new App().express;
