import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getUser } from '../services/users';
import { ValidationRequest } from '../types/ValidationRequest';
import { DecodeResponse } from '../types/Response';

export async function protect (request: ValidationRequest, response: Response, next: NextFunction) {
  const token = request.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!)as DecodeResponse;
      request.user = await getUser(response, decoded.userId);
      next();
    } catch (error) {
      console.error(error);
      response.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    response.status(401);
    throw new Error('Not authorized, no token');
  }
};
