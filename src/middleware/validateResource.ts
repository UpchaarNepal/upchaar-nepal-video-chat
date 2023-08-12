import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

import { v4 as uuidv4 } from 'uuid';
import { formatErrorResponse } from '../errorhandler/handler.error';



const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {



    const parsedSchema = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
      file: req.file
    });

    req.body = parsedSchema.body

    next();
  } catch (e: any) {
    const error: any = {};
    error.errorList = [];
    for (const err of e.errors) {
      const errorObject = {
        field: err.validation || err.path[1] || 'input',
        message: err.message,
        code: err.code
      };
      error.errorList.push(errorObject);
    }

    error.message = 'Validation Error'


    return res.status(400).send(formatErrorResponse(error, req));
  }
};

export default validate;
