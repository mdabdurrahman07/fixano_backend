import { NextFunction, Request, Response } from 'express';
import { Role } from '../../generated/prisma/enums';
import { catchAsync } from '../util/catchAsync';
import { jwtUtils } from '../util/jwtUtils';
import config from '../config/config.dotenv';
import { JwtPayload } from 'jsonwebtoken';
import { prisma } from '../lib/prisma';

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

    const { id, email, name, role } = verifiedToken.data as JwtPayload;

    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new Error("Forbidden. You don't have permission to access this resource");
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
        email,
        name,
        role
      }
    });

    if (!user) {
      throw new Error('User not found. Please log in again');
    }

    if (user.status === 'BANNED') {
      throw new Error('Your account has been banned. Please contact support');
    }

    req.user = {
      id,
      email,
      name,
      role
    };

    next();
  });
};
