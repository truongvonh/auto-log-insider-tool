import { IToken } from '@entities/commonData';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { MESSAGE_ERROR } from 'src/constant/errors';
import logger from '@shared/Logger';
import UserModel, { IUserModel } from '@database/models/User';
import { AUTHENTICATE } from '@constant/common';
import { ENVIRONMENT } from '@constant/enviroment';
import { ROUTE } from '@constant/routes';
import CronJobModel from '@database/models/CronJob';
import { CRON_TYPE } from '@constant/enum/cron-type';

export const getUserInfo = async (req: Request, res: Response) => {
  try {
    const { userToken } = req.body;
    const decodeToken = jwt.decode(userToken, {
      complete: true,
    }) as IToken;

    if (!decodeToken) {
      req.error = MESSAGE_ERROR.USER_NOT_FOUND;
      return res.redirect(ROUTE.LOGIN);
    }

    const { payload } = decodeToken;

    let userExist = await UserModel.findOne({ email: payload.email });
    if (!userExist) {
      userExist = await UserModel.create({ ...payload, token: userToken });

      await CronJobModel.create({
        ownerId: userExist._id,
        status: CRON_TYPE.STOP,
      });
    }

    // If user logout, user's token will be removed. When User login again, we must update user token
    if (!userExist.token) {
      userExist = (await UserModel.updateOne(
        { email: userExist.email },
        { token: userToken }
      )) as IUserModel;

      const cronJobOfUser = await CronJobModel.findOne({
        ownerId: userExist._id,
      });

      if (!cronJobOfUser) {
        await CronJobModel.create({
          ownerId: userExist._id,
          status: CRON_TYPE.STOP,
        });
      }
    }

    res.cookie(AUTHENTICATE.USER_TOKEN, userToken, {
      maxAge: 900000,
      httpOnly: process.env.NODE_ENV === ENVIRONMENT.PRODUCTION,
    });
    req.currentUser = userExist;
    return res.redirect(ROUTE.LOGIN);
  } catch (e) {
    logger.error(e);
  }
};
