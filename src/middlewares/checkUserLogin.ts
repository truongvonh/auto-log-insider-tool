import { NextFunction, Response, Request } from 'express';
import { AUTHENTICATE } from '@constant/common';
import { COMMON_PAGE } from '@constant/pages';
import { MESSAGE_ERROR } from '@constant/errors';
import jwt from 'jsonwebtoken';
import { IToken } from '@entities/commonData';
import UserModel, { IUserModel } from '@database/models/User';
import logger from '@shared/Logger';

export const checkUserLoginMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userToken = req.cookies[AUTHENTICATE.USER_TOKEN];

  if (!userToken) {
    return res.render(COMMON_PAGE.ABOUT_PAGE, {
      error: MESSAGE_ERROR.USER_NOT_LOGIN,
    });
  }

  const decodeToken = jwt.decode(userToken, {
    complete: true,
  }) as IToken;

  if (!decodeToken) {
    return res.render(COMMON_PAGE.ABOUT_PAGE, {
      error: MESSAGE_ERROR.USER_NOT_LOGIN,
    });
  }

  const { payload } = decodeToken;

  req.currentUser = (await UserModel.findOne({
    email: payload.email,
  })) as IUserModel;

  next();
};
