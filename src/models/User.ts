import mongoose from 'mongoose';

export interface User extends mongoose.Document {
  nickname: string;
  station: string;
  train: string;
  game_score: number;
}

const schema = new mongoose.Schema({
  nickname: { type: String, required: true },
  station: { type: String, required: true },
  train: { type: String, required: true },
  game_score: { type: Number, required: false }
});

export const UserModel = mongoose.model<User>('User', schema);
