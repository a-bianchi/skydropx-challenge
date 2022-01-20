import { NextFunction, Request, Response } from 'express';
import { DecodedAccessToken } from '../types';

import jwt from 'jsonwebtoken';
import { logger } from '../services/logger.service';
import { Config } from '../config/config';
import { HttpUnauthorized } from '../libraries/httpErrors';

function extractTokenFromHeader(req: Request): DecodedAccessToken {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, Config.security.secretKeyJwt) as DecodedAccessToken;
  return decodedToken;
}

export const decodeAndValidateAccessToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const decodedToken = extractTokenFromHeader(req) as DecodedAccessToken;
    req.headers.userId = decodedToken.userId;
    if (!decodedToken.userId) {
      throw new Error('Access Token contains and invalid payload');
    }
    next();
  } catch (error) {
    logger.error(`decodeJwt.middleware.decodeAndValidateAccessToken`, error);
    throw new HttpUnauthorized('INVALID_TOKEN');
  }
};
