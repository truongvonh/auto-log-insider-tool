import { IUserModel } from '@database/models/User';

declare global {
  namespace Express {
    interface Request {
      currentUser: IUserModel;
      error: string;
    }
  }
}
