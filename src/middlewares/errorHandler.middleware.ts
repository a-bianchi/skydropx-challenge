import { ErrorRequestHandler } from 'express';
import { HttpError } from '../libraries/httpErrors';
import { logger } from '../services/logger.service';
import { Config } from '../config/config';

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json(err);
  } else {
    const errorResponse = {
      name: 'error',
      code: 'error',
      status: err.status || 500,
      message: err.message,
      error: Config.api.nodeEnv !== 'production' ? err : {},
      fields: [''],
    };

    // Sequelize fields
    if (err.fields) {
      errorResponse.fields = err.fields;
    }

    // check if it's a Sequelize error
    if (err.name && err.name === 'SequelizeUniqueConstraintError') {
      if (err.parent && err.parent.code && err.parent.code === 'ER_DUP_ENTRY') {
        errorResponse.message = 'Duplicate entry.';
        errorResponse.status = 409; // conflict
      }
    }

    if (errorResponse.status >= 500 || errorResponse.status === 409) {
      logger.error('Error', err);
    }
    res.status(errorResponse.status).json(errorResponse);
  }
};
