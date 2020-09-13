import express, { Request, Response } from 'express';
import path from 'path';
import { COMMON_PAGE } from 'src/constant/pages';
import { getUserInfo } from '@controllers/user';
import { checkUserLoginMiddleWare } from '@middlewares/checkUserLogin';
import { checkPublicRouteMiddleware } from '@middlewares/publicRoute';
import { ROUTE } from '@constant/routes';

const app = express();
const pageConfig = app;

pageConfig.set('view engine', 'ejs');

const viewsDir = path.join(__dirname, '../views');
app.set('views', viewsDir);

app.get(
  ROUTE.LOGIN,
  checkPublicRouteMiddleware,
  (req: Request, res: Response) =>
    res.render(COMMON_PAGE.ABOUT_PAGE, { error: req.error || '' })
);

app.get(
  ROUTE.USER_INFO,
  checkUserLoginMiddleWare,
  (req: Request, res: Response) =>
    res.render(COMMON_PAGE.USER_INFO_PAGE, { user: req.currentUser })
);

app.post(ROUTE.USER_CONFIRM, getUserInfo);

export default pageConfig;
