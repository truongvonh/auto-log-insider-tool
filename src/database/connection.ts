import mongoose from 'mongoose';
import logger from '@shared/Logger';
import { COMMON_MESSAGE } from '@constant/info';
import { MESSAGE_ERROR } from '@constant/errors';

const mongodbConnection = (db: string) => {
  const connect = () => {
    mongoose
      .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => logger.info(`${COMMON_MESSAGE.SUCCESS_CONNECT_DB} ${db}`))
      .catch((error) => {
        logger.error(`${MESSAGE_ERROR.CONNECT_DB_FAILED} ${error}`);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};

export default mongodbConnection;
