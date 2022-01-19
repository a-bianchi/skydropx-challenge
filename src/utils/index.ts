import jwt from 'jsonwebtoken';
import { Config } from '../config/config';
import { SignParamsWithJWT } from '../types';

export const signParamsWithJWT = (params: SignParamsWithJWT): string => {
  return jwt.sign(params, Config.security.secretKeyJwt, { expiresIn: Config.security.tokenExpiry });
};
