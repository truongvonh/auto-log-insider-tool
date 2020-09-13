import { NextFunction, Request, Response } from 'express';
import { AUTHENTICATE } from '@constant/common';
import { IToken } from '@entities/commonData';
import jwt from 'jsonwebtoken';
import { MESSAGE_ERROR } from '@constant/errors';

export const checkPublicRouteMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userToken = req.cookies[AUTHENTICATE.USER_TOKEN];

  if (!userToken) {
    req.error = MESSAGE_ERROR.USER_NOT_FOUND;
    return next();
  }

  const decodeToken = jwt.decode(userToken, {
    complete: true,
  }) as IToken;

  if (!decodeToken) {
    req.error = MESSAGE_ERROR.USER_NOT_FOUND;
    return res.redirect('/user-info');
  }

  const { payload } = decodeToken;

  if (!payload) {
    req.error = MESSAGE_ERROR.USER_NOT_FOUND;
    return next();
  }

  return res.redirect('/user-info');
};
