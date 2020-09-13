import mongoose, { Schema, Document } from 'mongoose';
import { MODEL_NAME } from '@constant/model-names';

export interface IUserModel extends Document {
  client_id: string;
  sub: string;
  fullName: string;
  token: string;
  email: string;
}

const UserSchema: Schema = new Schema({
  client_id: { type: String, required: true },
  sub: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  token: { type: String },
});

const UserModel = mongoose.model<IUserModel>(MODEL_NAME.USER, UserSchema);

export default UserModel;
