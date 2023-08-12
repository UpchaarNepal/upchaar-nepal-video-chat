import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    next(error);
  } else {
    res.status(500).json({
      ...formatErrorResponse(error, req),

    });
  }
};

export const notAvailableRouteErrorHandler = (_req: Request, res: Response) => {
  res.status(404);
  res.json({
    success: true,
    message: 'Please check your route path and make sure it exist..'
  });
};


export const formatErrorResponse = (error: any, req: Request) => {
  const errorResponse = {
    message: error.message || 'Server Failure',
    code: error.statusCode || 500,
    requestId: uuidv4(),
    url: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
    errors: (process.env.NODE_ENV?.trim() === 'production' ? null : { ...error })
  };

  return errorResponse
}


export default class CustomError extends Error {
  statusCode: any;
  constructor(message: string, statusCode: any) {
    super(message);
    this.name = 'CustomError';
    this.statusCode = statusCode;
  }
}

