import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';

import express, { NextFunction, Request, Response } from 'express';
import { BAD_REQUEST } from 'http-status-codes';
import 'express-async-errors';

import APIRouter from './routes';
import logger from '@shared/Logger';
import appPage from './views';
import mongodbConnection from '@database/connection';

// Init express
const app = express();

// Connect Database
const connectionUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zezwf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongodbConnection(connectionUri);

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));
const cssPath = __dirname + '/public' + '/stylesheets';
app.use(express.static(cssPath));

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
}

// Add APIs
app.use('/api', APIRouter);

// Print API errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message, err);
  return res.status(BAD_REQUEST).json({
    error: err.message,
  });
});

app.use(appPage);

/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

// Export express instance
export default app;
