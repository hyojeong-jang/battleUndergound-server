import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  nickname: string;
  station: string;
  train: string;
}

const UserSchema: Schema = new Schema({
  nickname: { type: String, required: true },
  station: { type: String, required: true },
  train: { type: String, required: true }
});

export default mongoose.model('User', UserSchema);
