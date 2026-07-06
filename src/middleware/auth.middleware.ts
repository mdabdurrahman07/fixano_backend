import { NextFunction, Request, Response } from 'express';
import { Role } from '../../generated/prisma/enums';
import { catchAsync } from '../util/catchAsync';
import { jwtUtils } from '../util/jwtUtils';
import config from '../config/config.dotenv';

export const auth = (...requiredRoles: Role[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken
      ? req.cookies.accessToken
      : req.headers.authorization?.startsWith('Bearer ')
        ? req.headers.authorization?.split(' ')[1]
        : req.headers.authorization;

    if (!token) {
      throw new Error("You're not logged in. Please login to access resources");
    }

    const verifiedToken = jwtUtils.verifyToken(token, config.jwt_access_secret);

    if (!verifiedToken?.success) {
      throw new Error(verifiedToken?.error);
    }
    next()
  });
};
