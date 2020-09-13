import { CRON_TYPE } from '@constant/enum/cron-type';
import mongoose, { Document, Schema } from 'mongoose';
import { MODEL_NAME } from '@constant/model-names';

export interface ICronJobModel extends Document {
  ownerId: string;
  status: CRON_TYPE;
}

const CronJobSchema: Schema = new Schema({
  ownerId: { type: Schema.Types.ObjectId, ref: MODEL_NAME.USER },
  status: { type: Schema.Types.String, default: CRON_TYPE.STOP },
});

const CronJobModel = mongoose.model<ICronJobModel>(
  MODEL_NAME.CRON_JOB,
  CronJobSchema
);

export default CronJobModel;
