import bcrypt from 'bcryptjs';
import { prisma } from '../../lib/prisma';
import { IUserLogin, IUserPayload } from './auth.interface';
import config from '../../config/config.dotenv';
import { Prisma } from '../../../generated/prisma/client';
import { jwtUtils } from '../../util/jwtUtils';
import { SignOptions } from 'jsonwebtoken';

const createUserIntoDB = async (payload: IUserPayload) => {
  const { name, email, password, phone, avatarUrl, role, bio, yearsExperience, hourlyRate } = payload;
  const isUserExist = await prisma.user.findUnique({
    where: { email }
  });
  if (isUserExist) {
    throw new Error('User with this email already exists');
  }

  const hashPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));

  if (role.includes('ADMIN')) {
    throw new Error('Invalid Role for self-registration');
  }

  const baseCustomerData: Prisma.UserCreateInput = {
    name,
    email,
    password: hashPassword,
    role,
    phone,
    avatarUrl
  };

  if (role === 'TECHNICIAN') {
    baseCustomerData.technician = {
      create: {
        bio: bio,
        yearsExperience: yearsExperience,
        hourlyRate: hourlyRate
      }
    };
  }
  const createdUser = await prisma.user.create({
    data: baseCustomerData
  });

  const user = await prisma.user.findUnique({
    where: {
      id: createdUser.id,
      email: createdUser.email
    },
    omit: {
      password: true
    },
    include: {
      technician: true
    }
  });
  return user;
};

const logUser = async (payload: IUserLogin) => {
  const { email, password } = payload;

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email
    }
  });

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new Error('password is incorrect');
  }

  if (user.status === 'BANNED') {
    throw new Error('Your account has been banned. Please contact support');
  }

  // jwt payload
  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
  // accessToken
  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in as SignOptions
  );
  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in as SignOptions
  );
  return {
    accessToken,
    refreshToken
  };
};

export const authService = {
  createUserIntoDB,
  logUser
};
